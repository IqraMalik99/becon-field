import { handleApiRequest } from '../server/api.js'

/**
 * Vercel serverless entry point for every /api/* request.
 * The Node runtime supplies standard req/res objects, which the shared
 * router in server/api.js already handles for local dev and production.
 */
export default async function handler(req, res) {
  await handleApiRequest(req, res)
}
