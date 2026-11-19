import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto'

const DEFAULT_PASSWORD = 'stricklyadmin987'
const SESSION_TTL_MS = 12 * 60 * 60 * 1000 // 12 hours

export function adminPassword(env = {}) {
  return env.ADMIN_PASSWORD || DEFAULT_PASSWORD
}

export function checkPassword(input, env = {}) {
  const expected = Buffer.from(adminPassword(env))
  const provided = Buffer.from(String(input ?? ''))
  if (expected.length !== provided.length) return false
  return timingSafeEqual(expected, provided)
}

// Tokens are self-contained (HMAC-signed) rather than held in memory, so a
// login on one serverless instance is still valid on another. The signature
// key defaults to the admin password; set SESSION_SECRET to keep them separate.
function secretFor(env = {}) {
  return env.SESSION_SECRET || adminPassword(env)
}

function sign(value, secret) {
  return createHmac('sha256', secret).update(value).digest('base64url')
}

export function createSession(env = {}) {
  const payload = Buffer.from(
    JSON.stringify({
      exp: Date.now() + SESSION_TTL_MS,
      n: randomBytes(12).toString('hex'),
    }),
  ).toString('base64url')
  return `${payload}.${sign(payload, secretFor(env))}`
}

export function isValidSession(token, env = {}) {
  if (!token || typeof token !== 'string') return false
  const [payload, signature] = token.split('.')
  if (!payload || !signature) return false

  const expected = sign(payload, secretFor(env))
  const providedBuffer = Buffer.from(signature)
  const expectedBuffer = Buffer.from(expected)
  if (providedBuffer.length !== expectedBuffer.length) return false
  if (!timingSafeEqual(providedBuffer, expectedBuffer)) return false

  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'))
    return typeof data.exp === 'number' && data.exp > Date.now()
  } catch {
    return false
  }
}

export function destroySession() {
  // Stateless tokens expire on their own; the browser drops the token on logout.
}

export function tokenFromRequest(req) {
  const header = req.headers['authorization'] || ''
  if (header.startsWith('Bearer ')) return header.slice(7).trim()
  return null
}
