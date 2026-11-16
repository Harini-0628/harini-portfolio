import type { Certification } from './types'

/**
 * Certifications, taken from the résumé. Dates, credential IDs and credential URLs are left out
 * on purpose: add `year`, `credentialId` or `credentialUrl` to an entry once you have them
 * and they will appear automatically.
 */
export const certifications: Certification[] = [
  { title: 'Google Cybersecurity Professional Certificate', issuer: 'Google' },
  { title: 'IBM Generative AI for Cybersecurity Professionals', issuer: 'IBM' },
  { title: 'Database Management System', issuer: 'NPTEL, IIT Madras' },
  { title: 'Design Thinking: A Primer', issuer: 'NPTEL' },
  { title: 'Cybersecurity Job Simulation', issuer: 'Mastercard, via Forage' },
  { title: 'Cybersecurity Analyst Job Simulation', issuer: 'Tata, via Forage' },
  { title: 'Cybersecurity Job Simulation', issuer: 'Telstra, via Forage' },
]
