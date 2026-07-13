import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// `api/` holds Vercel serverless functions, not client-side modules. In
// local `vite` dev (no Vercel involved) a fetch("/api/...") would otherwise
// get resolved by Vite's own middleware straight to the raw .ts file on
// disk and run through its browser-module transform pipeline, which fails
// (Node/Vercel-only syntax) and throws up the dev-server error overlay.
// This middleware is registered before Vite's internal ones (since it's
// added directly in configureServer, not returned as a post-hook), so it
// intercepts and short-circuits any /api/* request first.
function blockApiInDevServer(): Plugin {
  return {
    name: 'block-api-in-dev-server',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.startsWith('/api/')) {
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/plain')
          res.end('Not available in local `vite` dev — deploy to Vercel, or run `vercel dev` instead.')
          return
        }
        next()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), blockApiInDevServer()],
})
