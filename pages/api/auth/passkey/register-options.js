import {
  countPasskeys,
  createChallenge,
  getAllPasskeys,
} from "@/lib/auth-db"
import { readSession } from "@/lib/auth-session"
import { getRpInfo } from "@/lib/auth-webauthn"
import { generateRegistrationOptions } from "@simplewebauthn/server"

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const [passkeyCount, session, existing] = await Promise.all([
      countPasskeys(),
      readSession(req),
      getAllPasskeys(),
    ])

    const bootstrapping = passkeyCount === 0
    if (!bootstrapping && session?.scope !== "passkey") {
      return res.status(403).json({ error: "Passkey auth required to add more passkeys" })
    }

    const { rpID } = getRpInfo(req)
    const userID = new TextEncoder().encode("upload-admin")
    const options = await generateRegistrationOptions({
      rpName: "gergus.co.uk upload",
      rpID,
      userName: "upload-admin",
      userDisplayName: "Upload Admin",
      userID,
      attestationType: "none",
      excludeCredentials: existing.map((credential) => ({
        id: credential.id,
        transports: credential.transports ? credential.transports.split(",") : [],
      })),
      authenticatorSelection: {
        residentKey: "preferred",
        userVerification: "preferred",
      },
    })

    const challengeId = await createChallenge({
      challenge: options.challenge,
      challengeType: "register",
      metadata: { bootstrapping },
    })

    return res.status(200).json({ challengeId, options })
  } catch (error) {
    console.error("register options error", error)
    return res.status(500).json({ error: "Failed to create registration options" })
  }
}
