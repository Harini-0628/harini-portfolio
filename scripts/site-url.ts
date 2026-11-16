/** Work out the public site URL from environment variables (no trailing slash). */
export function resolveSiteUrl(env: Record<string, string | undefined>): string {
  const explicit = env.VITE_SITE_URL?.trim()
  if (explicit) return explicit.replace(/\/+$/, '')
  // Vercel exposes the stable production hostname at build time; Netlify exposes URL.
  if (env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`
  if (env.URL?.startsWith('http')) return env.URL.replace(/\/+$/, '')
  return 'http://localhost:4173'
}
