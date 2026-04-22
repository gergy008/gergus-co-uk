import { countPasskeys, isAuthConfigured } from "@/lib/auth-db"
import { readSession } from "@/lib/auth-session"

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const isLocalDevBypass = process.env.NODE_ENV !== "production"
    if (isLocalDevBypass) {
      return res.status(200).json({
        configured: true,
        localBypass: true,
        hasPasskeys: false,
        authenticated: true,
        scope: "local-dev",
        historyAccess: true,
        canManagePasskeys: true,
        canManagePasswords: true,
      })
    }

    if (!isAuthConfigured()) {
      return res.status(200).json({
        configured: false,
        localBypass: false,
        hasPasskeys: false,
        authenticated: false,
        scope: null,
        historyAccess: false,
        canManagePasskeys: false,
        canManagePasswords: false,
      })
    }

    const [passkeyCount, session] = await Promise.all([countPasskeys(), readSession(req)])
    const hasPasskeys = passkeyCount > 0
    const scope = session?.scope || null

    return res.status(200).json({
      configured: true,
      localBypass: false,
      hasPasskeys,
      authenticated: Boolean(scope),
      scope,
      historyAccess: scope === "passkey" || scope === "password",
      canManagePasskeys: scope === "passkey",
      canManagePasswords: scope === "passkey",
    })
  } catch (error) {
    console.error("auth status error", error)
    return res.status(500).json({ error: "Failed to load auth status" })
  }
}
