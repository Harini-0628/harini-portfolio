import type { Project } from './types'

/**
 * Projects. To add one, copy an entry, change the slug, and fill in the fields.
 * Order here is the order on the site. Empty `links` are hidden automatically.
 *
 * Honesty rules for this file:
 *  - Every feature carries a status: implemented | partial | planned | objective.
 *  - Screenshots must be real captures. Put files in /public/images/projects/<slug>/.
 *  - Do not add a repo or demo link until it exists.
 *
 * TODO(Harini): the "contribution" lines are drawn from your résumé and the project files.
 * Please confirm they describe your own work accurately before sharing the site widely.
 */
export const projects: Project[] = [
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'pipelineguard',
    title: 'PipelineGuard',
    tagline:
      'A self-hosted CI/CD security gate that turns scanner output into an explainable PASS, WARN or FAIL.',
    kind: 'Software project',
    statusLabel: 'Working prototype',
    overview:
      'PipelineGuard is a self-hosted DevSecOps security gate. CI jobs run Semgrep (static analysis) and Trivy (dependencies, misconfiguration, secrets and container images) and send the original reports to a FastAPI backend. The backend normalises the findings, evaluates a versioned policy, stores everything in PostgreSQL and returns a deterministic decision, which a small command-line client turns into the pipeline’s exit code. A React dashboard shows scans, findings and the reasoning behind each decision.',
    problem:
      'Teams need one place that answers: what vulnerabilities are in this build, how severe are they, does the build satisfy our policy, what evidence supports that, and how do we fix it? Scanners produce reports, not decisions, and a scanner that quietly fails can look exactly like a clean build. PipelineGuard keeps the decision centralised, explainable, auditable and deterministic, and treats a missing or failed scan as a failure rather than a pass.',
    approach: [
      'Scanners run in the CI runner and never inside the API. The client runs Semgrep and Trivy without a shell, uploads the raw JSON reports with a per-repository token and an idempotency key, and exits 0 on PASS, 1 on FAIL, 2 if the server cannot be reached (so the pipeline fails closed) and 3 on a configuration error.',
      'The backend parses each report into a common schema and fingerprints findings per repository and branch. Line numbers are left out of static-analysis fingerprints so an unrelated edit does not make an old finding look new.',
      'A pure-function policy engine evaluates findings against a versioned policy with separate thresholds for production, staging and development. It produces eight rules, PG-001 to PG-008, and each one records its threshold, its count, a plain-English explanation and the exact findings responsible. A separate heuristic risk score orders the remediation list, but the policy never reads it.',
    ],
    contribution: [
      'Built the ingest API and policy engine, the command-line client and GitHub Actions workflows, and the React dashboard.',
      'Wrote the automated test suite and the project documentation, including a threat model and a candid list of what has and has not been verified.',
    ],
    features: [
      { title: 'Ingest API with JWT authentication, role-based access control and project boundaries', detail: 'Three roles: admin, security engineer, developer. Passwords hashed with Argon2.', status: 'implemented' },
      { title: 'Semgrep and Trivy report parsing and normalisation', detail: 'Verified against real Semgrep output and real Trivy misconfiguration and secret-scan output.', status: 'implemented' },
      { title: 'Versioned policy engine', detail: 'Per-environment thresholds, expiring suppressions that require a reason, and a preview that evaluates a stored scan without enforcing anything.', status: 'implemented' },
      { title: 'Fail-closed command-line client', detail: 'A missing, crashed or timed-out mandatory scanner produces FAIL, never a silent pass.', status: 'implemented' },
      { title: 'Idempotent, concurrency-safe ingestion', detail: 'Per-repository advisory locks and a unique idempotency constraint, covered by a multi-threaded race test.', status: 'implemented' },
      { title: 'Finding lifecycle and heuristic risk prioritisation', detail: 'Per repository and branch, with an audit log of status changes and suppressions.', status: 'implemented' },
      { title: 'Dashboard', detail: 'Overview, repositories, scans, findings, policies, and integrations and audit views.', status: 'implemented' },
      { title: 'JSON and Markdown scan reports', status: 'implemented' },
      { title: 'Trivy dependency and image vulnerability parsing', detail: 'Tested only against hand-written fixtures that follow Trivy’s schema, because the vulnerability database could not be downloaded in the build environment.', status: 'partial' },
      { title: 'GitHub Actions composite action and workflows', detail: 'Written, YAML-validated and pinned to commit SHAs, but not yet run on GitHub.', status: 'partial' },
      { title: 'Pull-request comment upsert', detail: 'Unit-tested with mocked HTTP; not yet run against the GitHub API.', status: 'partial' },
      { title: 'CISA KEV enrichment', detail: 'Tested with a mock feed; the live feed has not been reached.', status: 'partial' },
      { title: 'Webhook notifications with an SSRF guard', detail: 'The guard is unit-tested; delivery is tested with a mock transport only.', status: 'partial' },
      { title: 'Docker images, Compose and Caddy HTTPS', detail: 'Written and validated, but never built or started in the build environment.', status: 'partial' },
      { title: 'EPSS enrichment', status: 'planned' },
      { title: 'SBOM generation and an OPA/Rego policy backend', status: 'planned' },
      { title: 'Queue-based scan workers, shared rate limiting and token revocation', status: 'planned' },
      { title: 'Dashboard screens for users, webhooks and suppression review', status: 'planned' },
    ],
    stack: [
      { group: 'Backend', items: ['Python 3.12', 'FastAPI', 'Pydantic v2', 'SQLAlchemy 2', 'Alembic', 'PostgreSQL 16', 'Argon2', 'PyJWT'] },
      { group: 'Frontend', items: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Recharts'] },
      { group: 'Security tooling', items: ['Semgrep', 'Trivy'] },
      { group: 'Delivery', items: ['GitHub Actions', 'Docker Compose', 'Caddy', 'gunicorn + uvicorn'] },
      { group: 'Testing', items: ['pytest', 'Vitest'] },
    ],
    metrics: [
      { value: '118', label: 'backend tests passing' },
      { value: '91%', label: 'line coverage of the API' },
      { value: '8', label: 'policy rules, PG-001 to PG-008' },
    ],
    provenance:
      'Tests re-run on 2 November 2026 against PostgreSQL 16. Screenshots were captured from the app running locally, showing scans of the bundled, deliberately vulnerable sample app. Because no KEV or EPSS feed was connected, risk scores are marked as heuristic and “intelligence not available”.',
    images: [
      {
        src: '/images/projects/pipelineguard/scan-blocked.webp',
        srcSmall: '/images/projects/pipelineguard/scan-blocked-900.webp',
        alt: 'PipelineGuard scan detail page showing a FAIL decision, eight policy rules with PG-003 and PG-006 triggered, scanner executions and the list of findings.',
        caption: 'A blocked scan on the main branch. PG-003 triggers because five high-severity findings exceed the production limit of zero, and every rule shows its threshold and the findings responsible.',
        width: 1800,
        height: 2594,
      },
      {
        src: '/images/projects/pipelineguard/overview.webp',
        srcSmall: '/images/projects/pipelineguard/overview-900.webp',
        alt: 'PipelineGuard overview dashboard with repository count, pass rate, open findings by severity, recent pipeline failures and highest-priority remediation items.',
        caption: 'The overview after three local scans: two failed builds and one pass.',
        width: 1800,
        height: 1810,
      },
      {
        src: '/images/projects/pipelineguard/policies.webp',
        srcSmall: '/images/projects/pipelineguard/policies-900.webp',
        alt: 'PipelineGuard policies page with a versioned policy document editor, a preview panel and version history.',
        caption: 'The versioned policy editor. Preview evaluates a stored scan against an edited policy without enforcing anything.',
        width: 1800,
        height: 1352,
      },
      {
        src: '/images/projects/pipelineguard/finding-detail.webp',
        srcSmall: '/images/projects/pipelineguard/finding-detail-900.webp',
        alt: 'PipelineGuard finding detail for a Dockerfile misconfiguration, with risk breakdown, remediation text and suppression controls.',
        caption: 'One finding with its risk breakdown, remediation guidance and lifecycle controls. A suppression needs a reason and an expiry, and both are recorded in the audit log.',
        width: 1800,
        height: 1342,
      },
    ],
    limitations: [
      'Rate limiting and login lockout are per worker process, so a proxy is needed for strict global limits.',
      'The access token is held in sessionStorage; there are no refresh tokens or revocation list.',
      'The default Semgrep ruleset is a small illustrative set of six rules so scans work offline.',
      'Raw reports are stored in PostgreSQL with no automatic retention pruning.',
    ],
    links: { repo: 'https://github.com/Harini-0628/PipelineGuard', demo: '' },
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'triageiq',
    title: 'TriageIQ',
    tagline:
      'Risk-based vulnerability prioritisation that ranks findings by exploitability and asset context, not CVSS alone.',
    kind: 'Software project',
    statusLabel: 'Working prototype',
    overview:
      'TriageIQ imports Nessus and OpenVAS CSV exports, enriches each CVE with data from NVD, EPSS and the CISA Known Exploited Vulnerabilities catalogue, and ranks findings with a 100-point composite risk score that also weighs asset criticality, internet exposure and age. Analysts work through the ranked queue, change finding status, assign remediation tasks with SLA due dates, and export CSV or PDF reports.',
    problem:
      'A scan can return hundreds of findings, and CVSS alone will rank a theoretical critical above a medium-severity flaw that attackers are exploiting right now. TriageIQ starts from the opposite premise: what is being exploited, and on which asset, matters more than the base score.',
    approach: [
      'A layered FastAPI backend (route, service, repository) keeps the scoring logic in pure functions with no database or framework dependency, so the part that carries the real risk logic can be unit-tested in isolation.',
      'Scan import parses Nessus and OpenVAS CSVs in a background task, deduplicates assets and findings, splits rows that list several CVEs, and reopens a finding marked remediated if a rescan still finds it.',
      'The score combines CVSS (30 points), EPSS (25), CISA KEV membership (up to 20, including a bonus for known ransomware use), asset criticality (15), internet exposure (5) and finding age (5). Every recalculation stores a history row, so a finding’s score can be followed over time.',
    ],
    contribution: [
      'Developed the FastAPI application, its REST APIs and the React dashboard for the ranked queue and remediation tracking.',
      'Integrated the NVD, EPSS and CISA KEV clients, wrote the scoring engine and the test suite, and containerised the application with Docker.',
    ],
    features: [
      { title: 'Nessus and OpenVAS CSV import', detail: 'Deduplicates assets and findings, splits multi-CVE rows, and rejects non-CSV and empty uploads.', status: 'implemented' },
      { title: 'Composite 0–100 risk scoring with score history', detail: 'A medium-CVSS, actively exploited finding on a critical internet-facing asset outranks a critical-CVSS finding with little real-world exploitation, and the tests demonstrate it with real numbers.', status: 'implemented' },
      { title: 'JWT authentication with refresh tokens and three roles', detail: 'Admin, analyst and viewer. Rate-limited login, and registration creates an organisation and its first admin together.', status: 'implemented' },
      { title: 'Asset inventory with editable criticality and exposure', detail: 'Changes feed straight into risk scores on the next recalculation.', status: 'implemented' },
      { title: 'Remediation tasks with SLA-based due dates', detail: 'Every state change is written to an audit log with before and after values.', status: 'implemented' },
      { title: 'Dashboard summary, CSV export and generated PDF report', status: 'implemented' },
      { title: 'React dashboard', detail: 'Risk posture overview, ranked risk queue with score breakdown, and asset inventory.', status: 'implemented' },
      { title: 'Nightly scheduler', detail: 'Enrichment, then risk recalculation, then SLA-breach notifications. Verified by invoking the jobs directly.', status: 'implemented' },
      { title: 'NVD, EPSS and CISA KEV enrichment', detail: 'Clients and parsers are implemented and tested against recorded API responses. They have not yet been verified end to end against the live services.', status: 'partial' },
      { title: 'GitHub Actions CI with a PostgreSQL migration check', detail: 'Written, but not yet run on GitHub.', status: 'partial' },
      { title: 'Docker and Compose deployment', detail: 'Provided, but a full container deployment has not been verified end to end.', status: 'partial' },
      { title: 'Task queue for large scan imports', detail: 'Imports currently run as in-process background tasks, which suits a single instance. Celery or RQ with Redis is the next step.', status: 'planned' },
      { title: 'Scheduler coordination across multiple instances', status: 'planned' },
      { title: 'httpOnly-cookie refresh tokens instead of localStorage', status: 'planned' },
    ],
    stack: [
      { group: 'Backend', items: ['Python', 'FastAPI', 'SQLAlchemy', 'Alembic', 'Pydantic', 'APScheduler'] },
      { group: 'Data', items: ['SQLite (development and tests)', 'PostgreSQL (Compose and CI)'] },
      { group: 'Frontend', items: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Recharts'] },
      { group: 'Threat intelligence', items: ['NVD', 'FIRST EPSS', 'CISA KEV'] },
      { group: 'Delivery and testing', items: ['Docker', 'Docker Compose', 'GitHub Actions', 'pytest'] },
    ],
    metrics: [
      { value: '58', label: 'backend tests passing' },
      { value: '92%', label: 'line coverage of the API' },
      { value: '6', label: 'factors in a 100-point score' },
    ],
    provenance:
      'Tests re-run on 2 November 2026. Screenshots were captured from the app running locally on the bundled sample Nessus and OpenVAS exports (11 findings across 6 assets). Live NVD, EPSS and KEV feeds were not reachable from the build environment, so enrichment shown here comes from the project’s recorded API-response fixtures and covers only some CVEs. Asset criticality was set by hand.',
    images: [
      {
        src: '/images/projects/triageiq/risk-queue-expanded.webp',
        srcSmall: '/images/projects/triageiq/risk-queue-expanded-900.webp',
        alt: 'TriageIQ risk queue with the top finding expanded to show its score breakdown across CVSS, EPSS, KEV, asset criticality, exposure and age.',
        caption: 'The ranked queue with the top finding’s score breakdown open. The PAN-OS finding scores 88.6: full CVSS and exposure points, a 15-of-20 KEV contribution, and maximum asset criticality.',
        width: 1800,
        height: 1125,
      },
      {
        src: '/images/projects/triageiq/dashboard.webp',
        srcSmall: '/images/projects/triageiq/dashboard-900.webp',
        alt: 'TriageIQ risk posture dashboard showing open vulnerabilities, assets tracked, actively exploited count, SLA compliance, a severity bar chart and highest-risk assets.',
        caption: 'Risk posture overview: open findings by severity and the highest-risk assets.',
        width: 1800,
        height: 1125,
      },
      {
        src: '/images/projects/triageiq/assets.webp',
        srcSmall: '/images/projects/triageiq/assets-900.webp',
        alt: 'TriageIQ asset inventory table with hostname, criticality selector, internet-facing flag and open findings count.',
        caption: 'The asset inventory. Editing criticality or internet exposure changes the risk scores of that asset’s findings on the next recalculation.',
        width: 1800,
        height: 1125,
      },
    ],
    limitations: [
      'Scan imports use in-process background tasks, which is fine for one instance but would not survive a worker crash on a very large export.',
      'The scheduler runs in-process, so jobs would double-fire if several instances ran at once.',
      'Auth tokens are kept in localStorage, which is exposed to script injection in a way an httpOnly cookie is not.',
    ],
    links: { repo: 'https://github.com/Harini-0628/TriageIQ', demo: '' },
  },

]

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
