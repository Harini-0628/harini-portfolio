import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolveSiteUrl } from './scripts/site-url.ts'

// The public URL is used for canonical links, Open Graph tags, the sitemap and robots.txt.
// Set VITE_SITE_URL in your host's environment settings (see README). On Vercel/Netlify a
// sensible default is picked up automatically.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = resolveSiteUrl({ ...process.env, ...env })
  return {
    plugins: [
      react(),
      {
        name: 'inject-site-url',
        transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', siteUrl),
      },
    ],
    build: { target: 'es2022', sourcemap: false },
    test: { environment: 'node', include: ['src/**/*.test.ts', 'scripts/**/*.test.ts'] },
  }
})
