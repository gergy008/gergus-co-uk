import { validateTempPassword } from "@/lib/auth-db"
import { setSession } from "@/lib/auth-session"

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const password = String(req.body?.password || "").trim()
    if (!password) {
      return res.status(400).json({ error: "Password is required" })
    }

    const match = await validateTempPassword(password)
    if (!match) {
      return res.status(401).json({ error: "Password invalid or expired" })
    }

    const expiresAt = new Date(match.expires_at).getTime()
    const ttlSeconds = Math.max(60, Math.floor((expiresAt - Date.now()) / 1000))

    await setSession(res, { scope: "password" }, ttlSeconds)
    return res.status(200).json({ ok: true, expiresAt: match.expires_at })
  } catch (error) {
    console.error("password login error", error)
    return res.status(500).json({ error: "Failed to login with temporary password" })
  }
}
