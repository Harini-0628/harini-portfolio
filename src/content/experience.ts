import type { ActivityEntry, ExperienceEntry } from './types'

export const experience: ExperienceEntry[] = [
  {
    role: 'Cyber Security Intern',
    organisation: 'Prompt InfoTech, Coimbatore',
    period: 'May 2025',
    points: [
      'Ran vulnerability assessments with Nmap and Nessus, using network reconnaissance techniques.',
      'Performed service enumeration, port scanning and basic penetration testing in Linux environments.',
      'Helped identify vulnerabilities and documented remediation recommendations.',
    ],
  },
]

/**
 * Taken verbatim from the résumé. Outcomes are deliberately not stated.
 * TODO(Harini): add a `detail` (e.g. what you built, or the result) to any entry you want to expand.
 */
export const activities: ActivityEntry[] = [
  { title: 'Design Lead', detail: 'Digital Security Association of India (DiSAI) Student Chapter' },
  { title: 'V-Medithon 24-Hour Hackathon' },
  { title: 'DevSummit’25' },
  { title: 'Designathon 2025' },
]
