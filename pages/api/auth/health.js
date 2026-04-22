import * as authDb from "@/lib/auth-db"

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const health = await authDb.getAuthHealth()
    return res.status(200).json(health)
  } catch (error) {
    console.error("auth health error", error)
    return res.status(500).json({
      configured: true,
      ok: false,
      message: "Auth storage check failed",
    })
  }
}
