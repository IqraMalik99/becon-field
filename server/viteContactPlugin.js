import { handleApiRequest, isApiPath } from './api.js'

/**
 * Dev-only middleware that serves the whole /api surface (contact form and
 * admin endpoints) using the same handlers as the production server, so a
 * single `npm run dev` is enough.
 */
export function contactApiPlugin(env) {
  return {
    name: 'contact-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!isApiPath(req.url || '')) return next()
        handleApiRequest(req, res, env).catch((error) => {
          console.error('[api] unhandled error:', error)
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          res.end(JSON.stringify({ ok: false, error: 'Internal server error.' }))
        })
      })
    },
  }
}
