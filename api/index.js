import { handleApiRequest } from '../server/api.js'

/**
 * Vercel serverless entry point for every /api/* request (see vercel.json).
 * Vercel's Node runtime supplies standard req/res objects, which the shared
 * router already handles for local dev and the standalone production server.
 */
export default async function handler(req, res) {
  await handleApiRequest(req, res)
}
