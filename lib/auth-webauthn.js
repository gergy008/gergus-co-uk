export function getRpInfo(req) {
  const hostHeader = req.headers["x-forwarded-host"] || req.headers.host || "localhost:3000"
  const host = String(hostHeader).split(",")[0].trim()
  const rpID = host.split(":")[0]
  const proto = req.headers["x-forwarded-proto"] || (process.env.NODE_ENV === "production" ? "https" : "http")
  const origin = `${proto}://${host}`
  return { rpID, origin }
}
