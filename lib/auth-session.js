import { SignJWT, jwtVerify } from "jose"

const SESSION_COOKIE = "upload_auth"

function getSecret() {
  return process.env.AUTH_SESSION_SECRET || process.env.BLOB_READ_WRITE_TOKEN || "dev-only-secret-change-me"
}

function secretKey() {
  return new TextEncoder().encode(getSecret())
}

export function parseCookies(req) {
  const header = req.headers.cookie || ""
  const output = {}
  for (const part of header.split(";")) {
    const [key, ...rest] = part.trim().split("=")
    if (!key) continue
    output[key] = decodeURIComponent(rest.join("="))
  }
  return output
}

function serializeCookie(name, value, maxAgeSeconds = 0) {
  const secure = process.env.NODE_ENV === "production" ? "Secure; " : ""
  const maxAgePart = Number.isFinite(maxAgeSeconds) ? `Max-Age=${maxAgeSeconds}; ` : ""
  return `${name}=${encodeURIComponent(value)}; Path=/; HttpOnly; SameSite=Lax; ${secure}${maxAgePart}`.trim()
}

export async function createSessionToken(payload, ttlSeconds) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${ttlSeconds}s`)
    .sign(secretKey())
}

export async function readSession(req) {
  try {
    const cookies = parseCookies(req)
    const token = cookies[SESSION_COOKIE]
    if (!token) return null
    const { payload } = await jwtVerify(token, secretKey())
    return payload
  } catch {
    return null
  }
}

export async function setSession(res, payload, ttlSeconds) {
  const token = await createSessionToken(payload, ttlSeconds)
  res.setHeader("Set-Cookie", serializeCookie(SESSION_COOKIE, token, ttlSeconds))
}

export function clearSession(res) {
  res.setHeader("Set-Cookie", serializeCookie(SESSION_COOKIE, "", 0))
}
