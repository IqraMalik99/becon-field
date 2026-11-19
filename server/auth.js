import { randomBytes, timingSafeEqual } from 'node:crypto'

const DEFAULT_PASSWORD = 'stricklyadmin987'
const SESSION_TTL_MS = 12 * 60 * 60 * 1000 // 12 hours

// In-memory sessions: token -> expiry timestamp. Cleared on server restart.
const sessions = new Map()

export function adminPassword(env = {}) {
  return env.ADMIN_PASSWORD || DEFAULT_PASSWORD
}

export function checkPassword(input, env = {}) {
  const expected = Buffer.from(adminPassword(env))
  const provided = Buffer.from(String(input ?? ''))
  if (expected.length !== provided.length) return false
  return timingSafeEqual(expected, provided)
}

export function createSession() {
  const token = randomBytes(32).toString('hex')
  sessions.set(token, Date.now() + SESSION_TTL_MS)
  return token
}

export function isValidSession(token) {
  if (!token) return false
  const expiry = sessions.get(token)
  if (!expiry) return false
  if (expiry < Date.now()) {
    sessions.delete(token)
    return false
  }
  return true
}

export function destroySession(token) {
  if (token) sessions.delete(token)
}

export function tokenFromRequest(req) {
  const header = req.headers['authorization'] || ''
  if (header.startsWith('Bearer ')) return header.slice(7).trim()
  return null
}
