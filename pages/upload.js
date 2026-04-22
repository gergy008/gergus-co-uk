import { useEffect, useMemo, useState } from "react"
import Head from "next/head"
import { upload } from "@vercel/blob/client"
import Nav from "../components/Nav"

const ACCEPTED_TYPES = "image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime"

const isVideoItem = (item) => {
  if (item.type?.startsWith("video/")) return true
  return /\.(mp4|webm|mov)$/i.test(item.pathname || "")
}

export default function UploadPage() {
  const [isUploading, setIsUploading] = useState(false)
  const [isLoadingUploads, setIsLoadingUploads] = useState(true)
  const [error, setError] = useState("")
  const [uploads, setUploads] = useState([])
  const [copiedUrl, setCopiedUrl] = useState("")

  const lastUpload = useMemo(() => uploads[0], [uploads])

  useEffect(() => {
    const loadUploads = async () => {
      try {
        setIsLoadingUploads(true)
        const response = await fetch("/api/blob-list")
        if (!response.ok) {
          throw new Error("Failed to fetch uploads")
        }
        const data = await response.json()
        setUploads(Array.isArray(data.uploads) ? data.uploads : [])
      } catch (loadError) {
        console.error(loadError)
        setError("Could not load previous uploads.")
      } finally {
        setIsLoadingUploads(false)
      }
    }

    loadUploads()
  }, [])

  const startUpload = async (files) => {
    if (!files.length) return

    setError("")
    setIsUploading(true)

    try {
      const uploaded = []

      for (const file of files) {
        const blob = await upload(file.name, file, {
          access: "public",
          handleUploadUrl: "/api/blob-upload",
          multipart: true,
          clientPayload: JSON.stringify({
            originalName: file.name,
            uploadedAt: new Date().toISOString(),
          }),
        })

        uploaded.push({
          url: blob.url,
          pathname: blob.pathname,
          size: file.size,
          type: file.type,
          uploadedAt: new Date().toISOString(),
        })
      }

      setUploads((prev) => [...uploaded.reverse(), ...prev])
    } catch (uploadError) {
      console.error(uploadError)
      setError("Upload failed. Check Blob env vars and try again.")
    } finally {
      setIsUploading(false)
    }
  }

  const onFileInput = async (event) => {
    const files = Array.from(event.target.files || [])
    await startUpload(files)
    event.target.value = ""
  }

  const onPaste = async (event) => {
    const files = Array.from(event.clipboardData?.files || []).filter((file) =>
      file.type.startsWith("image/")
    )
    if (!files.length) return
    event.preventDefault()
    await startUpload(files)
  }

  const copyToClipboard = async (value) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopiedUrl(value)
    } catch (copyError) {
      console.error(copyError)
    }
  }

  return (
    <>
      <Head>
        <title>Upload Media | gergus.co.uk</title>
        <meta
          name="description"
          content="Upload images and videos to Vercel Blob and generate embeddable links."
        />
      </Head>

      <Nav />

      <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 pt-24">
        <div className="w-full container-70 mx-auto">
          <h1 className="text-4xl font-extrabold pb-2 mb-4 gradient-red-yellow">Media Upload</h1>
          <p className="text-default-500 mb-8">
            Upload images/videos with file picker, or paste images from your clipboard.
          </p>

          <section className="rounded-lg border border-black/10 dark:border-white/10 p-5 mb-6">
            <div className="flex flex-col gap-4">
              <label className="inline-flex items-center gap-3">
                <input
                  type="file"
                  multiple
                  accept={ACCEPTED_TYPES}
                  onChange={onFileInput}
                  disabled={isUploading}
                />
              </label>
              <p className="text-xs text-default-500">
                Supported file uploads: JPG, PNG, WEBP, GIF, MP4, WEBM, MOV.
              </p>

              <div
                className="rounded-md border border-dashed border-black/20 dark:border-white/20 p-6 text-sm text-default-500"
                onPaste={onPaste}
                tabIndex={0}
              >
                Click this box and press <b>Ctrl+V</b> to paste an image.
              </div>

              {isUploading && (
                <p className="text-sm text-default-500">Uploading image(s)...</p>
              )}
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
          </section>

          {lastUpload && (
            <section className="rounded-lg border border-black/10 dark:border-white/10 p-5 mb-6">
              <h2 className="text-xl font-semibold mb-3">Latest upload</h2>
              {isVideoItem(lastUpload) ? (
                <video
                  src={lastUpload.url}
                  controls
                  className="max-w-full rounded-md mb-4"
                />
              ) : (
                <img
                  src={lastUpload.url}
                  alt="Latest uploaded media preview"
                  className="max-w-full rounded-md mb-4"
                />
              )}
              <div className="flex flex-col gap-2 text-sm">
                <button onClick={() => copyToClipboard(lastUpload.url)}>
                  Copy direct URL (Discord-friendly)
                </button>
                <button onClick={() => copyToClipboard(`![image](${lastUpload.url})`)}>
                  Copy Markdown
                </button>
                <button onClick={() => copyToClipboard(`<img src="${lastUpload.url}" alt="image" />`)}>
                  Copy HTML embed
                </button>
              </div>
            </section>
          )}

          {uploads.length > 0 && (
            <section className="rounded-lg border border-black/10 dark:border-white/10 p-5">
              <h2 className="text-xl font-semibold mb-3">All uploaded media</h2>
              <p className="text-sm text-default-500 mb-4">Click any tile to copy its direct link.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {uploads.map((item) => (
                  <button
                    key={item.url}
                    type="button"
                    onClick={() => copyToClipboard(item.url)}
                    className="group rounded-md border border-black/10 dark:border-white/10 p-2 text-left transition hover:border-black/30 dark:hover:border-white/30"
                    title="Click to copy image link"
                  >
                    {isVideoItem(item) ? (
                      <video
                        src={item.url}
                        muted
                        playsInline
                        className="w-full aspect-square object-contain rounded bg-black/5 dark:bg-white/5"
                      />
                    ) : (
                      <img
                        src={item.url}
                        alt="Uploaded media"
                        className="w-full aspect-square object-contain rounded bg-black/5 dark:bg-white/5"
                      />
                    )}
                    <p className="text-xs mt-2 truncate text-default-500 group-hover:text-default-700 dark:group-hover:text-default-300">
                      {copiedUrl === item.url ? "Copied!" : item.pathname}
                    </p>
                  </button>
                ))}
              </div>
            </section>
          )}

          {!isLoadingUploads && uploads.length === 0 && (
            <section className="rounded-lg border border-black/10 dark:border-white/10 p-5">
              <p className="text-sm text-default-500">No uploads found yet.</p>
            </section>
          )}
        </div>
      </main>
    </>
  )
}
