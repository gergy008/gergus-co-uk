import { handleUpload } from "@vercel/blob/client"

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const jsonResponse = await handleUpload({
      body: req.body,
      request: req,
      onBeforeGenerateToken: async (_pathname, clientPayload) => {
        return {
          addRandomSuffix: true,
          allowedContentTypes: [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif",
            "video/mp4",
            "video/webm",
            "video/quicktime",
          ],
          tokenPayload: clientPayload ?? null,
        }
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        console.log("Blob upload completed", {
          url: blob.url,
          pathname: blob.pathname,
          tokenPayload,
        })
      },
    })

    return res.status(200).json(jsonResponse)
  } catch (error) {
    console.error("blob-upload error", error)
    return res.status(400).json({ error: "Upload failed" })
  }
}
