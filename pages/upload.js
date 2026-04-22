import { useEffect, useMemo, useRef, useState } from "react"
import Head from "next/head"
import { upload } from "@vercel/blob/client"
import { startAuthentication, startRegistration } from "@simplewebauthn/browser"
import Nav from "@/components/Nav"

const ACCEPTED_TYPES = "image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime"

const isVideoItem = (item) => {
  if (item.type?.startsWith("video/")) return true
  return /\.(mp4|webm|mov)$/i.test(item.pathname || "")
}

export default function UploadPage() {
  const mobileUploadInputRef = useRef(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isLoadingUploads, setIsLoadingUploads] = useState(true)
  const [deletingUrl, setDeletingUrl] = useState("")
  const [isAuthBusy, setIsAuthBusy] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [error, setError] = useState("")
  const [authError, setAuthError] = useState("")
  const [uploads, setUploads] = useState([])
  const [copiedUrl, setCopiedUrl] = useState("")
  const [passwordInput, setPasswordInput] = useState("")
  const [tempPasswordTtl, setTempPasswordTtl] = useState(30)
  const [generatedPassword, setGeneratedPassword] = useState(null)
  const [authStatus, setAuthStatus] = useState({
    configured: true,
    localBypass: false,
    hasPasskeys: false,
    authenticated: false,
    scope: null,
    historyAccess: false,
    canManagePasskeys: false,
    canManagePasswords: false,
  })

  const lastUpload = useMemo(() => uploads[0], [uploads])

  const refreshAuthStatus = async () => {
    const response = await fetch("/api/auth/status")
    if (!response.ok) throw new Error("Failed to load auth status")
    const data = await response.json()
    setAuthStatus(data)
    return data
  }

  const loadUploads = async () => {
    try {
      setIsLoadingUploads(true)
      const response = await fetch("/api/blob-list")
      if (!response.ok) throw new Error("Failed to fetch uploads")
      const data = await response.json()
      setUploads(Array.isArray(data.uploads) ? data.uploads : [])
    } catch (loadError) {
      console.error(loadError)
      setError("Could not load previous uploads.")
    } finally {
      setIsLoadingUploads(false)
    }
  }

  useEffect(() => {
    const init = async () => {
      try {
        const status = await refreshAuthStatus()
        if (status.historyAccess) {
          await loadUploads()
        } else {
          setIsLoadingUploads(false)
        }
      } catch (initError) {
        console.error(initError)
        setIsLoadingUploads(false)
      }
    }

    init()
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
    const files = Array.from(event.clipboardData?.files || []).filter((file) => file.type.startsWith("image/"))
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

  const deleteUpload = async (url) => {
    const confirmed = window.confirm(
      "Delete this media permanently?\n\nThis WILL break any existing embeds and is unrecoverable."
    )
    if (!confirmed) return

    try {
      setDeletingUrl(url)
      setError("")
      const response = await fetch("/api/blob-delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) throw new Error("Failed to delete upload")
      setUploads((prev) => prev.filter((item) => item.url !== url))
      if (copiedUrl === url) setCopiedUrl("")
    } catch (deleteError) {
      console.error(deleteError)
      setError("Failed to delete media. Please try again.")
    } finally {
      setDeletingUrl("")
    }
  }

  const loginWithPasskey = async () => {
    try {
      setIsAuthBusy(true)
      setAuthError("")
      const optionsResponse = await fetch("/api/auth/passkey/login-options", { method: "POST" })
      const optionsData = await optionsResponse.json()
      if (!optionsResponse.ok) throw new Error(optionsData.error || "Could not start passkey login")

      const response = await startAuthentication({ optionsJSON: optionsData.options })
      const verifyResponse = await fetch("/api/auth/passkey/login-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challengeId: optionsData.challengeId, response }),
      })
      const verifyData = await verifyResponse.json()
      if (!verifyResponse.ok) throw new Error(verifyData.error || "Passkey login failed")

      const status = await refreshAuthStatus()
      if (status.historyAccess) await loadUploads()
      setIsAuthModalOpen(false)
    } catch (authActionError) {
      console.error(authActionError)
      setAuthError(authActionError.message || "Passkey login failed")
    } finally {
      setIsAuthBusy(false)
    }
  }

  const registerPasskey = async () => {
    try {
      setIsAuthBusy(true)
      setAuthError("")
      const optionsResponse = await fetch("/api/auth/passkey/register-options", { method: "POST" })
      const optionsData = await optionsResponse.json()
      if (!optionsResponse.ok) throw new Error(optionsData.error || "Could not start passkey registration")

      const response = await startRegistration({ optionsJSON: optionsData.options })
      const verifyResponse = await fetch("/api/auth/passkey/register-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challengeId: optionsData.challengeId, response }),
      })
      const verifyData = await verifyResponse.json()
      if (!verifyResponse.ok) throw new Error(verifyData.error || "Passkey registration failed")

      const status = await refreshAuthStatus()
      if (status.historyAccess) await loadUploads()
    } catch (authActionError) {
      console.error(authActionError)
      setAuthError(authActionError.message || "Passkey registration failed")
    } finally {
      setIsAuthBusy(false)
    }
  }

  const loginWithPassword = async () => {
    try {
      setIsAuthBusy(true)
      setAuthError("")
      const response = await fetch("/api/auth/password/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwordInput }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || "Password login failed")

      const status = await refreshAuthStatus()
      if (status.historyAccess) await loadUploads()
      setPasswordInput("")
      setIsAuthModalOpen(false)
    } catch (authActionError) {
      console.error(authActionError)
      setAuthError(authActionError.message || "Password login failed")
    } finally {
      setIsAuthBusy(false)
    }
  }

  const generateTempPassword = async () => {
    try {
      setIsAuthBusy(true)
      setAuthError("")
      const response = await fetch("/api/auth/password/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ttlMinutes: tempPasswordTtl }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || "Could not generate password")
      setGeneratedPassword(data)
    } catch (authActionError) {
      console.error(authActionError)
      setAuthError(authActionError.message || "Could not generate password")
    } finally {
      setIsAuthBusy(false)
    }
  }

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    const status = await refreshAuthStatus()
    if (!status.historyAccess) setUploads([])
  }

  return (
    <>
      <Head>
        <title>Upload Media | gergus.co.uk</title>
        <meta name="description" content="Upload media to Vercel Blob and generate embeddable links." />
      </Head>

      <Nav />

      <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 pt-24">
        <div className="w-full container-70 mx-auto">
          <h1 className="text-4xl font-extrabold pb-2 mb-4 gradient-red-yellow">Media Upload</h1>
          <p className="text-default-500 mb-8">Upload images/videos with file picker, or paste images from your clipboard.</p>

          <section className="rounded-lg border border-black/10 dark:border-white/10 p-5 mb-6">
            <div className="flex flex-wrap items-center gap-3">
              {!authStatus.localBypass && (
                <button
                  type="button"
                  onClick={() => setIsAuthModalOpen(true)}
                  className="rounded border border-black/20 dark:border-white/20 px-4 py-2 text-sm"
                >
                  {authStatus.historyAccess ? "History access unlocked" : "Unlock history"}
                </button>
              )}
              {authStatus.authenticated && !authStatus.localBypass && (
                <button
                  type="button"
                  onClick={logout}
                  className="rounded border border-black/20 dark:border-white/20 px-4 py-2 text-sm"
                >
                  Logout
                </button>
              )}
            </div>
            <p className="text-xs text-default-500 mt-3">
              {authStatus.localBypass
                ? "Local development mode: history auth bypass is enabled."
                : "History is protected. Use passkey or temporary password to view it."}
            </p>
            {!authStatus.configured && (
              <p className="text-xs text-red-500 mt-2">
                Authentication storage is not configured. Set `DATABASE_URL` to enable passkeys and history access.
              </p>
            )}
          </section>

          <section className="rounded-lg border border-black/10 dark:border-white/10 p-5 mb-6">
            <div className="flex flex-col gap-4">
              <label className="inline-flex items-center gap-3">
                <input type="file" multiple accept={ACCEPTED_TYPES} onChange={onFileInput} disabled={isUploading} />
              </label>
              <p className="text-xs text-default-500">Supported file uploads: JPG, PNG, WEBP, GIF, MP4, WEBM, MOV.</p>

              <div
                className="hidden sm:block rounded-md border border-dashed border-black/20 dark:border-white/20 p-6 text-sm text-default-500"
                onPaste={onPaste}
                tabIndex={0}
              >
                Click this box and press <b>Ctrl+V</b> to paste an image.
              </div>

              <div className="sm:hidden">
                <input
                  ref={mobileUploadInputRef}
                  type="file"
                  multiple
                  accept={ACCEPTED_TYPES}
                  onChange={onFileInput}
                  disabled={isUploading}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => mobileUploadInputRef.current?.click()}
                  disabled={isUploading}
                  className="w-full rounded-md border border-black/20 dark:border-white/20 p-4 text-sm"
                >
                  Upload from phone
                </button>
              </div>

              {isUploading && <p className="text-sm text-default-500">Uploading media...</p>}
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
          </section>

          {authStatus.historyAccess && lastUpload && (
            <section className="rounded-lg border border-black/10 dark:border-white/10 p-5 mb-6">
              <h2 className="text-xl font-semibold mb-3">Latest upload</h2>
              {isVideoItem(lastUpload) ? (
                <video
                  src={lastUpload.url}
                  controls
                  className="w-full max-w-full max-h-[55vh] sm:max-h-[60vh] object-contain rounded-md mb-4 bg-black/5 dark:bg-white/5"
                />
              ) : (
                <img
                  src={lastUpload.url}
                  alt="Latest uploaded media preview"
                  className="w-full max-w-full max-h-[55vh] sm:max-h-[60vh] object-contain rounded-md mb-4 bg-black/5 dark:bg-white/5"
                />
              )}
              <div className="flex flex-col gap-2 text-sm">
                <button onClick={() => copyToClipboard(lastUpload.url)}>Copy direct URL (Discord-friendly)</button>
                <button onClick={() => copyToClipboard(`![media](${lastUpload.url})`)}>Copy Markdown</button>
                <button onClick={() => copyToClipboard(`<img src="${lastUpload.url}" alt="media" />`)}>Copy HTML embed</button>
              </div>
            </section>
          )}

          {authStatus.historyAccess && uploads.length > 0 && (
            <section className="rounded-lg border border-black/10 dark:border-white/10 p-5">
              <h2 className="text-xl font-semibold mb-3">All uploaded media</h2>
              <p className="text-sm text-default-500 mb-4">Click any tile to copy its direct link.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {uploads.map((item) => (
                  <div
                    key={item.url}
                    className="group rounded-md border border-black/10 dark:border-white/10 p-2 text-left transition hover:border-black/30 dark:hover:border-white/30"
                    title="Click to copy media link"
                  >
                    <button type="button" onClick={() => copyToClipboard(item.url)} className="w-full text-left">
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
                    {(authStatus.scope === "passkey" || authStatus.localBypass) && (
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation()
                          deleteUpload(item.url)
                        }}
                        disabled={deletingUrl === item.url}
                        className="mt-2 w-full rounded border border-red-500/40 text-red-600 dark:text-red-400 text-xs py-1 hover:bg-red-500/10 disabled:opacity-60"
                      >
                        {deletingUrl === item.url ? "Deleting..." : "Delete"}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {authStatus.historyAccess && !isLoadingUploads && uploads.length === 0 && (
            <section className="rounded-lg border border-black/10 dark:border-white/10 p-5">
              <p className="text-sm text-default-500">No uploads found yet.</p>
            </section>
          )}

          {isAuthModalOpen && authStatus.configured && !authStatus.localBypass && (
            <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
              <div className="w-full max-w-lg rounded-lg bg-white dark:bg-black border border-black/10 dark:border-white/10 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">History Access</h2>
                  <button type="button" onClick={() => setIsAuthModalOpen(false)}>
                    Close
                  </button>
                </div>

                {!authStatus.hasPasskeys && (
                  <div className="rounded border border-yellow-500/40 bg-yellow-500/10 p-3 text-sm mb-4">
                    No passkey exists yet. The first device to register becomes the trusted manager.
                  </div>
                )}

                <div className="flex flex-col gap-3">
                  <button
                    type="button"
                    disabled={isAuthBusy}
                    onClick={loginWithPasskey}
                    className="rounded border border-black/20 dark:border-white/20 px-4 py-2 text-sm"
                  >
                    Login with passkey
                  </button>
                  {(!authStatus.hasPasskeys || authStatus.canManagePasskeys) && (
                    <button
                      type="button"
                      disabled={isAuthBusy}
                      onClick={registerPasskey}
                      className="rounded border border-black/20 dark:border-white/20 px-4 py-2 text-sm"
                    >
                      {authStatus.hasPasskeys ? "Register another passkey" : "Register first passkey"}
                    </button>
                  )}
                </div>

                <div className="mt-5">
                  <p className="text-sm mb-2">Temporary password access</p>
                  <div className="flex gap-2">
                    <input
                      value={passwordInput}
                      onChange={(event) => setPasswordInput(event.target.value)}
                      placeholder="Enter temporary password"
                      className="flex-1 rounded border border-black/20 dark:border-white/20 px-3 py-2 bg-transparent"
                    />
                    <button
                      type="button"
                      onClick={loginWithPassword}
                      disabled={isAuthBusy}
                      className="rounded border border-black/20 dark:border-white/20 px-4 py-2 text-sm"
                    >
                      Unlock
                    </button>
                  </div>
                </div>

                {authStatus.canManagePasswords && (
                  <div className="mt-5 rounded border border-black/10 dark:border-white/10 p-3">
                    <p className="text-sm mb-3">Generate time-limited temporary password</p>
                    <div className="flex items-center gap-2 mb-3">
                      <label htmlFor="ttl" className="text-sm">TTL (minutes)</label>
                      <input
                        id="ttl"
                        type="number"
                        min={5}
                        max={720}
                        value={tempPasswordTtl}
                        onChange={(event) => setTempPasswordTtl(Number(event.target.value))}
                        className="w-28 rounded border border-black/20 dark:border-white/20 px-2 py-1 bg-transparent"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={generateTempPassword}
                      disabled={isAuthBusy}
                      className="rounded border border-black/20 dark:border-white/20 px-4 py-2 text-sm"
                    >
                      Generate password
                    </button>
                    {generatedPassword && (
                      <div className="mt-3 rounded border border-black/10 dark:border-white/10 p-2 text-xs break-all">
                        <p>Password: {generatedPassword.password}</p>
                        <p>Expires: {new Date(generatedPassword.expiresAt).toLocaleString()}</p>
                      </div>
                    )}
                  </div>
                )}

                {authError && <p className="text-sm text-red-500 mt-4">{authError}</p>}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
