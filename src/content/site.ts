import type { SiteConfig } from './types'

/**
 * Personal details, hero copy, about copy, contact and SEO.
 * Edit this file to change anything in the hero, About section, contact section or page metadata.
 */
export const site: SiteConfig = {
  name: 'Harini Ganesan',
  role: 'Aspiring Cybersecurity & DevSecOps Engineer',

  intro: [
    'I’m a final-year computer science student specialising in cyber security. I build the tooling that sits between a security scanner and a decision: a CI gate that decides whether a build ships, and a triage queue that decides which vulnerability gets fixed first.',
    'Open to internships and graduate roles in DevSecOps, application security and cloud security.',
  ],

  facts: [
    { label: 'Studying', value: 'B.Tech CSE (Cyber Security)' },
    { label: 'At', value: 'SRM Institute of Science and Technology, Ramapuram' },
    { label: 'Graduating', value: 'May 2027' },
    { label: 'Focus', value: 'DevSecOps · Vulnerability management · Security automation' },
  ],

  // ── Contact ─────────────────────────────────────────────────────────────
  email: 'harini.ganesan.work@gmail.com',
  emailIsPlaceholder: false,

  github: { label: 'GitHub', url: 'https://github.com/Harini-0628' },
  linkedin: { label: 'LinkedIn', url: 'https://www.linkedin.com/in/hariniganesan1/' },

  // The file lives in /public/resume/. Replace the PDF with the same filename to update it,
  // or change `file` if you rename it. See docs/CONTENT.md.
  resume: {
    file: '/resume/Harini-Ganesan-Resume.pdf',
    downloadName: 'Harini-Ganesan-Resume.pdf',
    label: 'Download résumé',
  },

  seo: {
    title: 'Harini Ganesan — Cybersecurity & DevSecOps',
    description:
      'Portfolio of Harini Ganesan, a final-year B.Tech Computer Science (Cyber Security) student building DevSecOps and vulnerability-management tools: PipelineGuard and TriageIQ.',
    ogImage: '/og-image.png',
  },

  photo: {
    src: '/images/harini-720.webp',
    srcLarge: '/images/harini-1086.webp',
    alt: 'Portrait of Harini Ganesan',
    width: 720,
    height: 960,
  },

  photo2: {
    src: '/images/harini-casual.jpg',
    alt: 'Harini Ganesan',
    width: 765,
    height: 1024,
  },

  // ── About ───────────────────────────────────────────────────────────────
  about: [
    'I’m in the final year of a B.Tech in Computer Science and Engineering with a cyber security specialisation at SRM Institute of Science and Technology, Ramapuram. I graduate in 2027.',
    'My security work started on the assessment side. In a 2025 internship at Prompt InfoTech I ran vulnerability assessments with Nmap and Nessus, enumerated services and scanned ports in Linux environments, and documented remediation recommendations. The same thread runs through my projects: TriageIQ ranks vulnerabilities by how likely they are to be exploited rather than by CVSS alone, and PipelineGuard turns scanner output into a pass-or-fail decision inside CI.',
    'Alongside coursework I’ve completed the Google Cybersecurity Professional Certificate and cybersecurity job simulations from Mastercard, Tata and Telstra. My interests are moving toward DevSecOps, security automation and cloud security.',
  ],

  lookingFor: 'Internships and graduate roles · DevSecOps · Application security · Cloud security',
}
