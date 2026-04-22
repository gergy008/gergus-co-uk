import {
  createPasswordHash,
  createTempPassword,
  generateTemporaryPassword,
} from "@/lib/auth-db"
import { readSession } from "@/lib/auth-session"

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const session = await readSession(req)
    if (session?.scope !== "passkey") {
      return res.status(403).json({ error: "Passkey authentication required" })
    }

    const ttlMinutes = Math.min(Math.max(Number(req.body?.ttlMinutes || 30), 5), 720)
    const plainPassword = generateTemporaryPassword()
    const passwordHash = createPasswordHash(plainPassword)
    const expiresAt = new Date(Date.now() + ttlMinutes * 60 * 1000).toISOString()

    await createTempPassword({
      passwordHash,
      expiresAt,
      createdByCredentialId: session.credentialId || null,
    })

    return res.status(200).json({ password: plainPassword, expiresAt, ttlMinutes })
  } catch (error) {
    console.error("create temp password error", error)
    return res.status(500).json({ error: "Failed to generate temporary password" })
  }
}
