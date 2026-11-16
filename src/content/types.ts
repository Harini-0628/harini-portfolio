/** Shapes of every piece of editable content. The UI only ever reads these. */

export interface SocialLink {
  label: string
  url: string
}

export interface SiteConfig {
  name: string
  role: string
  /** Short line shown in the hero beside the name. */
  intro: string[]
  /** Small facts shown as a "colophon" next to the hero. */
  facts: { label: string; value: string }[]
  /**
   * Email address. While `emailIsPlaceholder` is true the site does NOT render a mailto link
   * (a dead address would be worse than none) and points visitors to LinkedIn instead.
   * To go live: set `email` to your address and `emailIsPlaceholder` to false.
   */
  email: string
  emailIsPlaceholder: boolean
  github: SocialLink
  linkedin: SocialLink
  resume: { file: string; downloadName: string; label: string }
  seo: { title: string; description: string; ogImage: string }
  photo: { src: string; srcLarge: string; alt: string; width: number; height: number } | null
  /** Optional second photo shown in the hero (casual / environment shot). */
  photo2?: { src: string; alt: string; width: number; height: number } | null
  about: string[]
  /** Short list of what recruiters can expect to find on the site. */
  lookingFor: string
}

/** `objective` is for research directions that are not claimed as built. */
export type FeatureStatus = 'implemented' | 'partial' | 'planned' | 'objective'

export interface Feature {
  title: string
  detail?: string
  status: FeatureStatus
}

export interface ProjectImage {
  src: string
  /** Optional 900px-wide copy served to phones (same name with -900 before the extension). */
  srcSmall?: string
  alt: string
  caption: string
  width: number
  height: number
}

export interface Project {
  slug: string
  title: string
  /** Optional shorter title for the index and navigation. */
  shortTitle?: string
  /** One line shown in the project index. */
  tagline: string
  kind: 'Software project' | 'Research project'
  /** Honest, human-readable maturity label, e.g. "Working prototype". */
  statusLabel: string
  period?: string
  overview: string
  problem: string
  approach: string[]
  contribution: string[]
  /** Only things that are actually implemented, partially implemented, or planned. */
  features: Feature[]
  stack: { group: string; items: string[] }[]
  metrics?: { value: string; label: string }[]
  /** A caption explaining where the metrics / screenshots come from. */
  provenance?: string
  images: ProjectImage[]
  /** Optional typographic "concept" strip for projects without screenshots. */
  concept?: { caption: string; steps: { label: string; detail: string }[] }
  limitations?: string[]
  /** Leave empty strings until a repository / demo exists. Empty links are never rendered. */
  links: { repo: string; demo: string }
  /** Shown at the top of the case study when the page is a direction rather than a finished build. */
  notice?: string
}

export interface SkillGroup {
  category: string
  items: string[]
}

export interface Certification {
  title: string
  issuer: string
  /** Fill in only when you have them. Never guessed. */
  year?: string
  credentialUrl?: string
  credentialId?: string
}

export interface EducationEntry {
  degree: string
  institution: string
  period: string
  detail?: string
}

export interface ExperienceEntry {
  role: string
  organisation: string
  period: string
  points: string[]
}

export interface ActivityEntry {
  title: string
  detail?: string
}
