/**
 * Runs after `vite build`:
 *  1. writes a route-specific index.html for every project (own title, description, canonical URL),
 *     so crawlers and link previews see the right metadata without running JavaScript;
 *  2. writes sitemap.xml and robots.txt for the configured site URL.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { projects } from '../src/content/projects.ts'
import { FIGURE_SIZES, figureSrcSet } from '../src/content/images.ts'
import { site } from '../src/content/site.ts'
import { resolveSiteUrl } from './site-url.ts'

const dist = join(process.cwd(), 'dist')
const siteUrl = resolveSiteUrl(process.env)
const base = readFileSync(join(dist, 'index.html'), 'utf8')

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function withMeta(html: string, o: { title: string; description: string; url: string }) {
  const t = esc(o.title)
  const d = esc(o.description)
  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${t}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${d}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${o.url}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${t}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${d}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${o.url}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${t}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${d}$2`)
}

for (const p of projects) {
  const url = `${siteUrl}/projects/${p.slug}`
  let html = withMeta(base, { title: `${p.shortTitle ?? p.title} — ${site.name}`, description: p.tagline, url })
  // The lead screenshot is the largest element on the page: let the browser fetch it before any JavaScript runs.
  const lead = p.images[0]
  if (lead) {
    const srcset = figureSrcSet(lead)
    const preload = `<link rel="preload" as="image" type="image/webp" href="${lead.src}"${srcset ? ` imagesrcset="${srcset}" imagesizes="${FIGURE_SIZES}"` : ''} fetchpriority="high" />`
    html = html.replace('</head>', `    ${preload}\n  </head>`)
  }
  const dir = join(dist, 'projects', p.slug)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), html) // /projects/slug/
  writeFileSync(`${dir}.html`, html) // /projects/slug (clean URLs on Vercel and Netlify)
}

const urls = ['/', ...projects.map((p) => `/projects/${p.slug}`)]
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${siteUrl}${u === '/' ? '/' : u}</loc></url>`).join('\n')}
</urlset>
`
writeFileSync(join(dist, 'sitemap.xml'), sitemap)

// The résumé PDF contains contact details, so keep crawlers away from it.
writeFileSync(
  join(dist, 'robots.txt'),
  `User-agent: *\nAllow: /\nDisallow: /resume/\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
)

console.log(`postbuild: ${projects.length} project pages, sitemap and robots written for ${siteUrl}`)
