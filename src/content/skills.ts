import type { SkillGroup } from './types'

/**
 * Technical skills. Only list things you have used and can explain in an interview.
 * Source: résumé skills plus the tools used in PipelineGuard and TriageIQ.
 *
 * TODO(Harini): remove anything from this list you would not be comfortable being asked about
 * (for example TypeScript, PostgreSQL or Semgrep if you only touched them lightly).
 */
export const skills: SkillGroup[] = [
  { category: 'Programming languages', items: ['Python', 'Java', 'TypeScript'] },
  { category: 'Backend development', items: ['FastAPI', 'Flask', 'REST APIs', 'SQLAlchemy', 'Alembic', 'pytest'] },
  { category: 'Cybersecurity', items: ['Vulnerability assessment', 'Nmap', 'Nessus', 'Risk-based prioritisation (CVSS, EPSS, CISA KEV)', 'Static analysis with Semgrep', 'Trivy scanning'] },
  { category: 'DevSecOps', items: ['GitHub Actions', 'CI/CD security gating', 'Automated security reporting'] },
  { category: 'Cloud and infrastructure', items: ['Docker', 'Docker Compose', 'Linux command line'] },
  { category: 'Databases', items: ['MySQL', 'PostgreSQL', 'SQLite'] },
  { category: 'Development tools', items: ['Git and GitHub', 'React', 'Vite', 'Tailwind CSS'] },
]
