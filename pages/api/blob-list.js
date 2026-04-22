import { list } from "@vercel/blob"

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const { blobs } = await list({
      limit: 200,
    })

    const isLikelyImage = (blob) => {
      if (blob.contentType?.startsWith("image/")) return true
      return /\.(png|jpe?g|webp|gif|bmp|svg|avif)$/i.test(blob.pathname || "")
    }

    const imagesOnly = blobs
      .filter(isLikelyImage)
      .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
      .map((blob) => ({
        url: blob.url,
        pathname: blob.pathname,
        size: blob.size,
        type: blob.contentType,
        uploadedAt: blob.uploadedAt,
      }))

    return res.status(200).json({ uploads: imagesOnly })
  } catch (error) {
    console.error("blob-list error", error)
    return res.status(500).json({ error: "Failed to load uploads" })
  }
}
