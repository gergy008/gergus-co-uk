import {
  consumeChallenge,
  getPasskeyById,
  updatePasskeyCounter,
} from "@/lib/auth-db"
import { setSession } from "@/lib/auth-session"
import { getRpInfo } from "@/lib/auth-webauthn"
import { verifyAuthenticationResponse } from "@simplewebauthn/server"

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const { challengeId, response } = req.body || {}
    if (!challengeId || !response) {
      return res.status(400).json({ error: "challengeId and response are required" })
    }

    const challenge = await consumeChallenge({ id: challengeId, expectedType: "login" })
    if (!challenge) {
      return res.status(400).json({ error: "Challenge expired or invalid" })
    }

    const credentialId = response.id
    const stored = await getPasskeyById(credentialId)
    if (!stored) {
      return res.status(404).json({ error: "Passkey not recognized" })
    }

    const { rpID, origin } = getRpInfo(req)
    const verification = await verifyAuthenticationResponse({
      response,
      expectedChallenge: challenge.challenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
      requireUserVerification: true,
      credential: {
        id: stored.id,
        publicKey: Buffer.from(stored.public_key, "base64"),
        counter: Number(stored.counter || 0),
        transports: stored.transports ? stored.transports.split(",") : [],
      },
    })

    if (!verification.verified) {
      return res.status(400).json({ error: "Authentication verification failed" })
    }

    await updatePasskeyCounter(stored.id, verification.authenticationInfo.newCounter)
    await setSession(
      res,
      { scope: "passkey", credentialId: stored.id },
      60 * 60 * 24 * 30
    )

    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error("login verify error", error)
    return res.status(500).json({ error: "Failed to verify passkey login" })
  }
}
