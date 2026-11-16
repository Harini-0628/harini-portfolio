import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { activities, certifications, education, experience, projects, site, skills } from './index'

const pub = (p: string) => join(process.cwd(), 'public', p)
const STATUSES = ['implemented', 'partial', 'planned', 'objective']

describe('site config', () => {
  it('points to a résumé file that exists', () => {
    expect(existsSync(pub(site.resume.file))).toBe(true)
  })
  it('has an OG image and favicon on disk', () => {
    expect(existsSync(pub(site.seo.ogImage))).toBe(true)
    expect(existsSync(pub('/favicon.svg'))).toBe(true)
  })
  it('uses https for social links', () => {
    for (const l of [site.github, site.linkedin]) expect(l.url).toMatch(/^https:\/\//)
  })
  it('has photo files on disk when a photo is configured', () => {
    if (site.photo) {
      expect(existsSync(pub(site.photo.src))).toBe(true)
      expect(existsSync(pub(site.photo.srcLarge))).toBe(true)
      expect(site.photo.alt.length).toBeGreaterThan(5)
    }
  })
  it('only shows a mailto when the email is real', () => {
    if (!site.emailIsPlaceholder) expect(site.email).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)
  })
})

describe('projects', () => {
  it('have unique, URL-safe slugs', () => {
    const slugs = projects.map((p) => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const s of slugs) expect(s).toMatch(/^[a-z0-9-]+$/)
  })
  it('only reference screenshots that exist, with alt text and captions', () => {
    for (const p of projects)
      for (const img of p.images) {
        expect(existsSync(pub(img.src)), img.src).toBe(true)
        if (img.srcSmall) expect(existsSync(pub(img.srcSmall)), img.srcSmall).toBe(true)
        expect(img.alt.length, `${img.src} alt`).toBeGreaterThan(20)
        expect(img.caption.length, `${img.src} caption`).toBeGreaterThan(10)
        expect(img.width).toBeGreaterThan(0)
        expect(img.height).toBeGreaterThan(0)
      }
  })
  it('give every feature a valid status', () => {
    for (const p of projects)
      for (const f of p.features) expect(STATUSES, `${p.slug}: ${f.title}`).toContain(f.status)
  })
  it('only use https for repo and demo links when set', () => {
    for (const p of projects)
      for (const url of [p.links.repo, p.links.demo]) if (url) expect(url).toMatch(/^https:\/\//)
  })
  it('never claim a feature as implemented in a research-only project', () => {
    for (const p of projects.filter((x) => x.kind === 'Research project'))
      expect(p.features.every((f) => f.status === 'objective' || f.status === 'planned')).toBe(true)
  })
  it('make metric claims only alongside a provenance note', () => {
    for (const p of projects) if (p.metrics?.length) expect(p.provenance?.length ?? 0).toBeGreaterThan(20)
  })
})

describe('other content', () => {
  it('has non-empty skills, certifications, education and experience', () => {
    expect(skills.length).toBeGreaterThan(0)
    expect(certifications.length).toBeGreaterThan(0)
    expect(education.length).toBeGreaterThan(0)
    expect(experience.length).toBeGreaterThan(0)
    expect(activities.length).toBeGreaterThan(0)
  })
  it('only includes credential URLs that are https', () => {
    for (const c of certifications) if (c.credentialUrl) expect(c.credentialUrl).toMatch(/^https:\/\//)
  })
})
