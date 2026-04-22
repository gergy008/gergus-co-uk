import { list } from "@vercel/blob"
import { readSession } from "@/lib/auth-session"

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const isLocalDevBypass = process.env.NODE_ENV !== "production"
    const session = await readSession(req)
    if (!isLocalDevBypass && session?.scope !== "passkey" && session?.scope !== "password") {
      return res.status(403).json({ error: "Authentication required to view history" })
    }

    const { blobs } = await list({
      limit: 200,
    })

    const isLikelyMedia = (blob) => {
      if (blob.contentType?.startsWith("image/") || blob.contentType?.startsWith("video/")) {
        return true
      }
      return /\.(png|jpe?g|webp|gif|bmp|svg|avif|mp4|webm|mov)$/i.test(blob.pathname || "")
    }

    const mediaOnly = blobs
      .filter(isLikelyMedia)
      .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
      .map((blob) => ({
        url: blob.url,
        pathname: blob.pathname,
        size: blob.size,
        type: blob.contentType,
        uploadedAt: blob.uploadedAt,
      }))

    return res.status(200).json({ uploads: mediaOnly })
  } catch (error) {
    console.error("blob-list error", error)
    return res.status(500).json({ error: "Failed to load uploads" })
  }
}
