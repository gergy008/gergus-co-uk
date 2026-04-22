import {
  consumeChallenge,
  countPasskeys,
  upsertPasskey,
} from "@/lib/auth-db"
import { readSession, setSession } from "@/lib/auth-session"
import { getRpInfo } from "@/lib/auth-webauthn"
import { verifyRegistrationResponse } from "@simplewebauthn/server"

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const { challengeId, response } = req.body || {}
    if (!challengeId || !response) {
      return res.status(400).json({ error: "challengeId and response are required" })
    }

    const [challenge, passkeyCount, session] = await Promise.all([
      consumeChallenge({ id: challengeId, expectedType: "register" }),
      countPasskeys(),
      readSession(req),
    ])

    if (!challenge) {
      return res.status(400).json({ error: "Challenge expired or invalid" })
    }

    const bootstrapping = passkeyCount === 0
    if (!bootstrapping && session?.scope !== "passkey") {
      return res.status(403).json({ error: "Passkey auth required to add more passkeys" })
    }

    const { rpID, origin } = getRpInfo(req)
    const verification = await verifyRegistrationResponse({
      response,
      expectedChallenge: challenge.challenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
      requireUserVerification: true,
    })

    if (!verification.verified || !verification.registrationInfo) {
      return res.status(400).json({ error: "Registration verification failed" })
    }

    const { credential } = verification.registrationInfo
    await upsertPasskey({
      id: credential.id,
      publicKey: Buffer.from(credential.publicKey).toString("base64"),
      counter: credential.counter,
      transports: Array.isArray(response.response?.transports)
        ? response.response.transports.join(",")
        : null,
    })

    await setSession(
      res,
      { scope: "passkey", credentialId: credential.id },
      60 * 60 * 24 * 30
    )

    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error("register verify error", error)
    return res.status(500).json({ error: "Failed to verify passkey registration" })
  }
}
