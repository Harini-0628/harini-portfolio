# harini-portfolio

Personal portfolio of **Harini Ganesan**: final-year B.Tech CSE (Cyber Security), building DevSecOps and
vulnerability-management tools. Case studies cover PipelineGuard and TriageIQ.

Built with React 19, TypeScript and Vite. There is no backend, no database and no tracking. The result is a static site.

## Contents

- [Quick start](#quick-start)
- [Scripts](#scripts)
- [Project structure](#project-structure)
- [Updating content](#updating-content)
- [Deployment](#deployment)
- [Environment variables](#environment-variables)
- [Quality checks](#quality-checks)
- [Design notes](#design-notes)

## Quick start

Requires Node.js 20 or newer.

```bash
git clone https://github.com/Harini-0628/harini-portfolio.git
cd harini-portfolio
npm install
npm run dev        # http://localhost:5173
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Type-check, build to `dist/`, then generate per-project HTML, `sitemap.xml` and `robots.txt` |
| `npm run preview` | Serve the production build at http://localhost:4173 |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript only |
| `npm test` | Content integrity tests (links, files on disk, alt text, feature statuses) |

## Project structure

```
src/
  content/        ← ALL editable content (site, projects, skills, certifications, education, experience)
  components/     ← Header, Hero, WorkIndex, About, Skills, Experience, Credentials, Contact, Footer…
  pages/          ← Home, ProjectPage (case study), NotFound
  hooks/          ← useDocumentMeta (title/OG per route)
  styles/global.css  ← design tokens and all styles
public/
  images/         ← portrait and project screenshots (WebP)
  resume/         ← the résumé PDF behind every Download button
  og-image.png, favicon.svg, apple-touch-icon.png
scripts/
  postbuild.ts    ← per-project HTML for crawlers, sitemap, robots.txt
  make-image-variants.py  ← turns a screenshot into the two WebP sizes the site uses
docs/CONTENT.md   ← how to update everything
vercel.json, netlify.toml
```

## Updating content

Everything on the site is data in `src/content/`. See **[docs/CONTENT.md](docs/CONTENT.md)** for step-by-step
instructions: adding a project, replacing the résumé, photo or screenshots, adding an email address,
adding certifications and skills, and how to extend the site later.

## Deployment

The repository is set up for **Vercel** (`vercel.json`) and also works on **Netlify** (`netlify.toml`).

### Vercel (recommended)

1. Push this repository to GitHub.
2. Go to <https://vercel.com/new>, sign in with GitHub and import `harini-portfolio`.
3. Leave the detected settings (Framework: Vite, build `npm run build`, output `dist`) and click **Deploy**.
4. Every later `git push` to `main` rebuilds and updates the same URL automatically. Other branches get preview URLs.

### Netlify

Import the repository at <https://app.netlify.com/start>. `netlify.toml` supplies the build command, output
directory and SPA redirect.

### Custom domain

1. Buy a domain from any registrar.
2. Vercel: **Project → Settings → Domains → Add**, then create the DNS records Vercel shows
   (an `A` record for the apex domain, a `CNAME` for `www`). HTTPS is issued automatically.
3. Set `VITE_SITE_URL` to the new domain (below) and redeploy so canonical URLs, Open Graph tags and
   the sitemap use it.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `VITE_SITE_URL` | No, recommended with a custom domain | Public URL with no trailing slash, e.g. `https://harini.dev`. Used for canonical links, Open Graph tags, `sitemap.xml` and `robots.txt`. On Vercel and Netlify a default is detected automatically. |

It is a public value, not a secret. See `.env.example`. No secrets are needed or stored anywhere in this repository.

## Quality checks

```bash
npm run lint && npm run typecheck && npm test && npm run build
```

Dependencies: `npm audit --omit=dev` reports 0 known vulnerabilities for what ships to the browser.

## Design notes

- Typography: Newsreader (headings), Instrument Sans (body), IBM Plex Mono (labels), all self-hosted. No requests to third-party font servers.
- One accent colour, hairline rules and a paper-and-ink palette. Motion is restrained and disabled for users who prefer reduced motion.
- Every project feature is labelled implemented, partly verified, planned or research objective. Screenshots are captures of the running applications, never mock-ups.
