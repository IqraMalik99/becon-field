import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { contactApiPlugin } from './server/viteContactPlugin.js'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load all env vars (not just VITE_*) so the dev contact API can read SMTP_*.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), contactApiPlugin(env)],
  }
})
