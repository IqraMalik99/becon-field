import { sendContactMessage } from './contact.js'
import { listLeads, updateLeadStatus, deleteLead } from './db.js'
import {
  checkPassword,
  createSession,
  destroySession,
  isValidSession,
  tokenFromRequest,
} from './auth.js'

const MAX_BODY = 100_000

function sendJson(res, statusCode, data) {
  const body = JSON.stringify(data)
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(body)
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk
      if (body.length > MAX_BODY) {
        reject(Object.assign(new Error('Request body too large.'), { statusCode: 413 }))
        req.destroy()
      }
    })
    req.on('end', () => {
      if (!body) return resolve({})
      try {
        resolve(JSON.parse(body))
      } catch {
        reject(Object.assign(new Error('Invalid JSON body.'), { statusCode: 400 }))
      }
    })
    req.on('error', reject)
  })
}

function requireAuth(req, res, env) {
  const token = tokenFromRequest(req)
  if (!isValidSession(token, env)) {
    sendJson(res, 401, { ok: false, error: 'Please sign in.' })
    return null
  }
  return token
}

/**
 * Handle any /api/* request for both the Vite dev middleware and the
 * production server. Always writes a response.
 */
export async function handleApiRequest(req, res, env = process.env) {
  const url = new URL(req.url, 'http://localhost')
  const path = url.pathname
  const method = req.method || 'GET'

  try {
    if (path === '/api/contact' && method === 'POST') {
      const payload = await readJsonBody(req)
      const result = await sendContactMessage(payload, env)
      return sendJson(res, 200, { ok: true, ...result })
    }

    if (path === '/api/admin/login' && method === 'POST') {
      const { password } = await readJsonBody(req)
      if (!checkPassword(password, env)) {
        return sendJson(res, 401, { ok: false, error: 'Incorrect password.' })
      }
      return sendJson(res, 200, { ok: true, token: createSession(env) })
    }

    if (path === '/api/admin/logout' && method === 'POST') {
      destroySession(tokenFromRequest(req))
      return sendJson(res, 200, { ok: true })
    }

    if (path === '/api/admin/leads' && method === 'GET') {
      if (!requireAuth(req, res, env)) return
      const status = url.searchParams.get('status') || 'all'
      const [leads, all, pending, reviewed] = await Promise.all([
        listLeads(env, { status }),
        listLeads(env, { status: 'all' }),
        listLeads(env, { status: 'pending' }),
        listLeads(env, { status: 'reviewed' }),
      ])
      return sendJson(res, 200, {
        ok: true,
        leads,
        counts: { all: all.length, pending: pending.length, reviewed: reviewed.length },
      })
    }

    const leadMatch = path.match(/^\/api\/admin\/leads\/([^/]+)$/)
    if (leadMatch) {
      if (!requireAuth(req, res, env)) return
      const id = decodeURIComponent(leadMatch[1])

      if (method === 'PATCH' || method === 'PUT') {
        const body = await readJsonBody(req)
        const status = body.status === 'reviewed' ? 'reviewed' : 'pending'
        const lead = await updateLeadStatus(env, id, status)
        return sendJson(res, 200, { ok: true, lead })
      }

      if (method === 'DELETE') {
        await deleteLead(env, id)
        return sendJson(res, 200, { ok: true })
      }
    }

    return sendJson(res, 404, { ok: false, error: 'Not found.' })
  } catch (error) {
    const statusCode = error.statusCode || 502
    if (statusCode >= 500) console.error('[api]', path, error.message)
    return sendJson(res, statusCode, {
      ok: false,
      error: error.message || 'Something went wrong.',
    })
  }
}

export function isApiPath(url = '') {
  return url.startsWith('/api/')
}
