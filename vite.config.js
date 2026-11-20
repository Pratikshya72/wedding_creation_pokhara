import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// `vite build --mode preview-page` makes a self-contained copy with relative
// paths and in-memory routing, for hosting inside a single page (e.g. claude.ai).
export default defineConfig(({ mode }) => ({
  base: mode === 'preview-page' ? './' : '/',
  plugins: [react(), tailwindcss()],
  server: {
    // Original photos are processed by `npm run images`, not by the dev server.
    // Watching them crashes the server when a large file is still being copied.
    watch: { ignored: ['**/photos/**', '**/dist/**', '**/dist-preview-page/**'] },
  },
}))
