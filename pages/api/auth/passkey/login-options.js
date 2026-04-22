import { createChallenge, getAllPasskeys } from "@/lib/auth-db"
import { getRpInfo } from "@/lib/auth-webauthn"
import { generateAuthenticationOptions } from "@simplewebauthn/server"

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const credentials = await getAllPasskeys()
    if (!credentials.length) {
      return res.status(400).json({ error: "No passkeys registered yet" })
    }

    const { rpID } = getRpInfo(req)
    const options = await generateAuthenticationOptions({
      rpID,
      userVerification: "preferred",
      allowCredentials: credentials.map((credential) => ({
        id: credential.id,
        transports: credential.transports ? credential.transports.split(",") : [],
      })),
    })

    const challengeId = await createChallenge({
      challenge: options.challenge,
      challengeType: "login",
      metadata: {},
    })

    return res.status(200).json({ challengeId, options })
  } catch (error) {
    console.error("login options error", error)
    return res.status(500).json({ error: "Failed to create login options" })
  }
}
