import crypto from "node:crypto"
import { neon } from "@neondatabase/serverless"

const connectionString =
  process.env.DATABASE_URL ||
  process.env.GERGUS_CO_UK_DATABASE_URL ||
  process.env.GERGUS_CO_UK_POSTGRES_URL
const sql = connectionString ? neon(connectionString) : null

export function isAuthConfigured() {
  return Boolean(sql)
}

export async function getAuthHealth() {
  if (!sql) {
    return {
      configured: false,
      ok: false,
      message: "DATABASE_URL is missing",
      tables: {},
    }
  }

  await ensureAuthTables()
  const tableCounts = await Promise.all([
    sql`SELECT COUNT(*)::int AS count FROM gergus_co_uk_passkey_credentials`,
    sql`SELECT COUNT(*)::int AS count FROM gergus_co_uk_temp_passwords`,
    sql`SELECT COUNT(*)::int AS count FROM gergus_co_uk_auth_challenges`,
  ])

  return {
    configured: true,
    ok: true,
    message: "Auth storage is ready",
    tables: {
      passkeyCredentials: tableCounts[0][0]?.count ?? 0,
      tempPasswords: tableCounts[1][0]?.count ?? 0,
      activeChallenges: tableCounts[2][0]?.count ?? 0,
    },
  }
}

export async function ensureAuthTables() {
  if (!sql) {
    throw new Error("DATABASE_URL is required for authentication features")
  }

  await sql`
    CREATE TABLE IF NOT EXISTS gergus_co_uk_passkey_credentials (
      id TEXT PRIMARY KEY,
      public_key TEXT NOT NULL,
      counter BIGINT NOT NULL DEFAULT 0,
      transports TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      last_used_at TIMESTAMPTZ
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS gergus_co_uk_auth_challenges (
      id TEXT PRIMARY KEY,
      challenge TEXT NOT NULL,
      challenge_type TEXT NOT NULL,
      expires_at TIMESTAMPTZ NOT NULL,
      metadata JSONB,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS gergus_co_uk_temp_passwords (
      id TEXT PRIMARY KEY,
      password_hash TEXT NOT NULL,
      expires_at TIMESTAMPTZ NOT NULL,
      created_by_credential_id TEXT REFERENCES gergus_co_uk_passkey_credentials(id),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      last_used_at TIMESTAMPTZ
    )
  `

  await sql`
    CREATE INDEX IF NOT EXISTS idx_gergus_co_uk_auth_challenges_expires_at
      ON gergus_co_uk_auth_challenges (expires_at)
  `
}

export async function countPasskeys() {
  await ensureAuthTables()
  const rows = await sql`SELECT COUNT(*)::int AS count FROM gergus_co_uk_passkey_credentials`
  return rows[0]?.count ?? 0
}

export async function getAllPasskeys() {
  await ensureAuthTables()
  return sql`
    SELECT id, public_key, counter, transports
    FROM gergus_co_uk_passkey_credentials
    ORDER BY created_at ASC
  `
}

export async function getPasskeyById(id) {
  await ensureAuthTables()
  const rows = await sql`
    SELECT id, public_key, counter, transports
    FROM gergus_co_uk_passkey_credentials
    WHERE id = ${id}
    LIMIT 1
  `
  return rows[0] ?? null
}

export async function upsertPasskey({ id, publicKey, counter, transports }) {
  await ensureAuthTables()
  await sql`
    INSERT INTO gergus_co_uk_passkey_credentials (id, public_key, counter, transports)
    VALUES (${id}, ${publicKey}, ${counter}, ${transports ?? null})
    ON CONFLICT (id)
    DO UPDATE SET
      public_key = EXCLUDED.public_key,
      counter = EXCLUDED.counter,
      transports = EXCLUDED.transports
  `
}

export async function updatePasskeyCounter(id, counter) {
  await ensureAuthTables()
  await sql`
    UPDATE gergus_co_uk_passkey_credentials
    SET counter = ${counter}, last_used_at = NOW()
    WHERE id = ${id}
  `
}

export async function createChallenge({ challenge, challengeType, metadata, ttlMs = 5 * 60 * 1000 }) {
  await ensureAuthTables()
  const id = crypto.randomUUID()
  const expiresAt = new Date(Date.now() + ttlMs).toISOString()
  await sql`
    INSERT INTO gergus_co_uk_auth_challenges (id, challenge, challenge_type, expires_at, metadata)
    VALUES (${id}, ${challenge}, ${challengeType}, ${expiresAt}, ${metadata ?? null})
  `
  return id
}

export async function consumeChallenge({ id, expectedType }) {
  await ensureAuthTables()
  const rows = await sql`
    DELETE FROM gergus_co_uk_auth_challenges
    WHERE id = ${id}
      AND challenge_type = ${expectedType}
      AND expires_at > NOW()
    RETURNING challenge, metadata
  `
  return rows[0] ?? null
}

export function generateTemporaryPassword() {
  return crypto.randomBytes(18).toString("base64url")
}

function hashPassword(password, salt) {
  return crypto.scryptSync(password, salt, 64).toString("base64")
}

export function createPasswordHash(password) {
  const salt = crypto.randomBytes(16).toString("base64")
  const digest = hashPassword(password, salt)
  return `${salt}:${digest}`
}

export function verifyPasswordHash(password, hashValue) {
  const [salt, expected] = String(hashValue || "").split(":")
  if (!salt || !expected) return false
  const actual = hashPassword(password, salt)
  return crypto.timingSafeEqual(Buffer.from(actual), Buffer.from(expected))
}

export async function createTempPassword({ passwordHash, expiresAt, createdByCredentialId }) {
  await ensureAuthTables()
  const id = crypto.randomUUID()
  await sql`
    INSERT INTO gergus_co_uk_temp_passwords (id, password_hash, expires_at, created_by_credential_id)
    VALUES (${id}, ${passwordHash}, ${expiresAt}, ${createdByCredentialId ?? null})
  `
  return id
}

export async function validateTempPassword(password) {
  await ensureAuthTables()
  const rows = await sql`
    SELECT id, password_hash, expires_at
    FROM gergus_co_uk_temp_passwords
    WHERE expires_at > NOW()
    ORDER BY created_at DESC
    LIMIT 50
  `

  const match = rows.find((row) => verifyPasswordHash(password, row.password_hash))
  if (!match) return null

  await sql`
    UPDATE gergus_co_uk_temp_passwords
    SET last_used_at = NOW()
    WHERE id = ${match.id}
  `
  return match
}
