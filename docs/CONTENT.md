# Updating your portfolio

Everything you read on the site lives in `src/content/`. You should never need to touch
`src/components/`, `src/pages/` or `src/styles/` to change wording, add a project or swap a file.

| To change… | Edit |
| --- | --- |
| Name, role, hero text, About text, email, GitHub/LinkedIn, résumé path, page title and description | `src/content/site.ts` |
| Projects (add, remove, reorder, edit) | `src/content/projects.ts` |
| Skills | `src/content/skills.ts` |
| Certifications | `src/content/certifications.ts` |
| Education | `src/content/education.ts` |
| Experience and activities | `src/content/experience.ts` |

After any edit, commit and push to GitHub. Vercel rebuilds and publishes automatically (about a minute).
The TypeScript types in `src/content/types.ts` will flag a typo or a missing field before you commit.

To preview locally first: `npm run dev`, then open http://localhost:5173.

---

## Add your real email address

In `src/content/site.ts`:

```ts
email: 'you@example.com',
emailIsPlaceholder: false,
```

While `emailIsPlaceholder` is `true` the site shows "Address coming soon" and **no** mailto link,
so nobody can click a dead address. Setting it to `false` turns the contact row into a working `mailto:` link.

## Update your résumé

1. Export your new résumé as a PDF.
2. Replace `public/resume/Harini-Ganesan-Resume.pdf` with it, **keeping the same file name**.
3. Commit and push. Every Download résumé button now serves the new file.

(To rename the file, change `resume.file` in `site.ts` to match.)

> Your résumé PDF contains your phone number and email address, and anything on a public site can be
> downloaded by anyone. `robots.txt` asks search engines not to index `/resume/`, but that does not
> make the file private. If you prefer, upload a version without your phone number.

## Replace your photo

1. Put the new photo in `public/images/`. Use a portrait with a 3:4 ratio so nothing is cropped.
2. Export two WebP copies with any image tool: 720px wide (`harini-720.webp`) and 1086px wide (`harini-1086.webp`), keeping the aspect ratio.
3. In `site.ts`, update `photo.src`, `photo.srcLarge`, `width`, `height` and `alt`.
4. To remove the photo entirely, set `photo: null`. The About section reflows without it.

## Add a project

Open `src/content/projects.ts` and copy an existing entry to the end of the array. The fields:

| Field | Notes |
| --- | --- |
| `slug` | The URL: `/projects/<slug>`. Lowercase letters, digits and hyphens. Must be unique. |
| `title`, `shortTitle` | `shortTitle` is optional and is used in lists when the title is long. |
| `tagline` | One sentence shown in the index and used as the page description. |
| `kind` | `'Software project'` or `'Research project'`. |
| `statusLabel` | A truthful maturity label, e.g. `'Working prototype'`. |
| `overview`, `problem` | One paragraph each. |
| `approach` | A list of short paragraphs. |
| `contribution` | A list of what *you* did. Leave `[]` to hide the section. |
| `features` | Each has a `status`: `implemented`, `partial`, `planned` or `objective`. See below. |
| `stack` | Groups of technologies. |
| `metrics` + `provenance` | Optional numbers. If you add metrics you must also say where they came from. |
| `images` | Real screenshots only. See below. |
| `links.repo`, `links.demo` | Leave `''` until they exist. Empty links are never shown. |
| `limitations` | Optional list of known gaps. Recruiters respect honesty here. |

**Feature statuses.** `implemented` means built and exercised by tests or by running it. `partial` means built but
not yet verified end to end. `planned` means not built. `objective` is for research directions you are not claiming as built.
A research-only project may not contain `implemented` features (a test enforces this).

**Remove or reorder a project:** delete the entry, or move it within the array. The order in the file is the order on the site.

## Add or replace screenshots

1. Capture a real screenshot of the running application.
2. Create the web versions: `python3 scripts/make-image-variants.py shot.png public/images/projects/<slug>/<name>`
3. Add to the project's `images` list:

```ts
{
  src: '/images/projects/<slug>/<name>.webp',
  srcSmall: '/images/projects/<slug>/<name>-900.webp',
  alt: 'Describe what the screenshot shows, for screen-reader users.',
  caption: 'One or two sentences saying what the reader should notice.',
  width: 1800,
  height: <the height the script prints>,
}
```

The first image is the lead image: it appears at the top of the case study and in the work index preview.
`npm test` fails if a listed file does not exist or has no alt text or caption.

## Add a certification

Append to `src/content/certifications.ts`:

```ts
{ title: 'Name of certificate', issuer: 'Issuing organisation', year: '2026', credentialUrl: 'https://…' },
```

`year`, `credentialUrl` and `credentialId` are optional. Add them only when you have them; they are never guessed.

## Add or change skills, education, experience

Edit the arrays in `skills.ts`, `education.ts` and `experience.ts`. Only list tools you can talk about in an interview.

---

## Making the site grow

* **A new section** (for example Publications or Blog): add a data file in `src/content/`, a component in
  `src/components/`, and render it in `src/pages/Home.tsx`. Because content is separate from components, the new
  section does not touch anything that already works.
* **Blog or case-study articles:** add a `posts.ts` data file (or Markdown files with a loader) and a route in `App.tsx`,
  mirroring how `ProjectPage` works.
* **A CMS:** only `src/content/index.ts` is read by the UI. A headless CMS (Sanity, Contentful, a Git-based CMS such as
  Decap) can replace those files by fetching at build time and exporting the same shapes from `types.ts`.
  No component needs to change.
