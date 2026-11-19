import { createServer } from 'node:http'
import { createReadStream, existsSync, statSync } from 'node:fs'
import { extname, join, normalize, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { handleApiRequest, isApiPath } from './api.js'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const distDir = resolve(__dirname, '..', 'dist')
const port = Number(process.env.PORT || 3001)

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' })
  res.end(JSON.stringify(data))
}

function serveFile(res, filePath) {
  const type = MIME[extname(filePath).toLowerCase()] || 'application/octet-stream'
  res.writeHead(200, { 'Content-Type': type })
  createReadStream(filePath).pipe(res)
}

function resolveStaticFile(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0])
  const safePath = normalize(decoded).replace(/^(\.\.[/\\])+/, '')
  const filePath = join(distDir, safePath)
  if (!filePath.startsWith(distDir + sep) && filePath !== distDir) return null
  if (existsSync(filePath) && statSync(filePath).isFile()) return filePath
  return null
}

const server = createServer(async (req, res) => {
  const url = req.url || '/'

  if (isApiPath(url)) {
    await handleApiRequest(req, res, process.env)
    return
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return sendJson(res, 405, { ok: false, error: 'Method not allowed.' })
  }

  const file = resolveStaticFile(url)
  if (file) return serveFile(res, file)

  const indexFile = join(distDir, 'index.html')
  if (existsSync(indexFile)) return serveFile(res, indexFile)

  return sendJson(res, 404, { ok: false, error: 'Not found.' })
})

server.listen(port, () => {
  console.log(`Contact server running on http://localhost:${port}`)
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('SMTP_USER / SMTP_PASS are not set — form submissions will fail until configured.')
  }
})
