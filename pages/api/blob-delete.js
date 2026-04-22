import { del } from "@vercel/blob"
import { readSession } from "@/lib/auth-session"

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const isLocalDevBypass = process.env.NODE_ENV !== "production"
    const session = await readSession(req)
    if (!isLocalDevBypass && session?.scope !== "passkey") {
      return res.status(403).json({ error: "Passkey authentication required to delete media" })
    }

    const { url } = req.body || {}

    if (!url || typeof url !== "string") {
      return res.status(400).json({ error: "A valid blob url is required" })
    }

    await del(url)
    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error("blob-delete error", error)
    return res.status(500).json({ error: "Failed to delete upload" })
  }
}
