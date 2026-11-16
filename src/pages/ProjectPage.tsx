import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { getProject, projects } from '../content'
import type { Feature, FeatureStatus, Project, ProjectImage } from '../content'
import { FIGURE_SIZES, figureSrcSet } from '../content/images'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import Reveal from '../components/Reveal'
import NotFound from './NotFound'

const STATUS: Record<FeatureStatus, { label: string; description: string }> = {
  implemented: { label: 'Implemented', description: 'Built and exercised by tests or by running it.' },
  partial: { label: 'Partly verified', description: 'Built, but not yet exercised end to end.' },
  planned: { label: 'Planned', description: 'Not built yet.' },
  objective: { label: 'Research objective', description: 'A direction the research is pursuing, not claimed as built.' },
}
const ORDER: FeatureStatus[] = ['implemented', 'partial', 'planned', 'objective']

function StatusMark({ status }: { status: FeatureStatus }) {
  return <span className={`mark mark--${status}`} aria-hidden="true" />
}

function Figure({ image, index }: { image: ProjectImage; index: number }) {
  const tall = image.height / image.width > 1.3
  // The lead figure is above the fold: render it immediately instead of fading it in.
  const Wrapper = index === 0 ? 'figure' : Reveal
  const wrapperProps = index === 0 ? { className: 'figure' } : { as: 'figure' as const, className: 'figure' }
  return (
    <Wrapper {...wrapperProps}>
      <div
        className={`figure__frame ${tall ? 'figure__frame--scroll' : ''}`}
        tabIndex={0}
        role="region"
        aria-label={`Screenshot ${index + 1}, scrollable`}
      >
        <a href={image.src} target="_blank" rel="noopener noreferrer" aria-label={`Open screenshot ${index + 1} at full size, opens in a new tab`}>
          <img
            src={image.src}
            srcSet={figureSrcSet(image)}
            sizes={FIGURE_SIZES}
            alt={image.alt}
            width={image.width}
            height={image.height}
            loading={index === 0 ? 'eager' : 'lazy'}
            fetchPriority={index === 0 ? 'high' : 'auto'}
            decoding="async"
          />
        </a>
      </div>
      <figcaption>
        <span className="mono">Fig. {index + 1}</span>
        {image.caption}
      </figcaption>
    </Wrapper>
  )
}

function Ledger({ features }: { features: Feature[] }) {
  const present = ORDER.filter((s) => features.some((f) => f.status === s))
  return (
    <div className="ledger">
      <ul className="ledger__legend" aria-label="Status key">
        {present.map((s) => (
          <li key={s}>
            <StatusMark status={s} />
            <span><strong>{STATUS[s].label}.</strong> {STATUS[s].description}</span>
          </li>
        ))}
      </ul>
      {present.map((s) => (
        <div key={s} className="ledger__group">
          <h3 className="label mono">{STATUS[s].label}</h3>
          <ul>
            {features
              .filter((f) => f.status === s)
              .map((f) => (
                <li key={f.title}>
                  <StatusMark status={s} />
                  <div>
                    <p className="ledger__title">
                      {f.title}
                      <span className="sr-only"> — {STATUS[s].label}</span>
                    </p>
                    {f.detail && <p className="ledger__detail">{f.detail}</p>}
                  </div>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

function ProjectBody({ project, index }: { project: Project; index: number }) {
  useDocumentMeta({
    title: `${project.shortTitle ?? project.title} — Harini Ganesan`,
    description: project.tagline,
    path: `/projects/${project.slug}`,
  })

  const next = projects[(index + 1) % projects.length]
  const hasLinks = Boolean(project.links.repo || project.links.demo)

  return (
    <article className="project wrap" aria-labelledby="project-title">
      <Link to="/#work" className="back link-underline">
        <ArrowLeft size={16} aria-hidden="true" /> All work
      </Link>

      <header className="project__head">
        <p className="eyebrow mono">
          Project {String(index + 1).padStart(2, '0')} · {project.kind} · {project.statusLabel}
        </p>
        <h1 id="project-title" className={`project__title ${project.title.length > 40 ? 'project__title--long' : ''}`}>
          {project.title}
        </h1>
        <p className="project__tagline">{project.tagline}</p>
        {hasLinks && (
          <ul className="project__links">
            {project.links.repo && (
              <li>
                <a className="button button--line" href={project.links.repo} target="_blank" rel="noopener noreferrer">
                  Source on GitHub <ArrowUpRight size={16} aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            )}
            {project.links.demo && (
              <li>
                <a className="button button--solid" href={project.links.demo} target="_blank" rel="noopener noreferrer">
                  Live demo <ArrowUpRight size={16} aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            )}
          </ul>
        )}
        {project.notice && <p className="notice">{project.notice}</p>}
      </header>

      {project.images[0] && <Figure image={project.images[0]} index={0} />}

      {project.concept && (
        <Reveal as="figure" className="concept">
          <ol>
            {project.concept.steps.map((s, i) => (
              <li key={s.label}>
                <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                <strong>{s.label}</strong>
                <span>{s.detail}</span>
              </li>
            ))}
          </ol>
          <figcaption className="mono">{project.concept.caption}</figcaption>
        </Reveal>
      )}

      {project.metrics && (
        <Reveal as="div" className="metrics">
          <ul>
            {project.metrics.map((m) => (
              <li key={m.label}>
                <strong>{m.value}</strong>
                <span>{m.label}</span>
              </li>
            ))}
          </ul>
          {project.provenance && <p className="provenance">{project.provenance}</p>}
        </Reveal>
      )}

      <div className="project__cols">
        <Reveal as="section" className="block" >
          <h2 className="label mono">Overview</h2>
          <p>{project.overview}</p>
        </Reveal>
        <Reveal as="section" className="block">
          <h2 className="label mono">Problem</h2>
          <p>{project.problem}</p>
        </Reveal>
      </div>

      <section className="block block--wide" aria-labelledby="approach-title">
        <h2 id="approach-title" className="label mono">{project.kind === 'Research project' ? 'Research direction' : 'Technical approach'}</h2>
        <ol className="approach">
          {project.approach.map((a, i) => (
            <Reveal as="li" key={i}>
              <span className="mono" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <p>{a}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      {project.images.length > 1 && (
        <section className="block block--wide" aria-labelledby="shots-title">
          <h2 id="shots-title" className="label mono">In the running application</h2>
          <div className="figures">
            {project.images.slice(1).map((img, i) => (
              <Figure key={img.src} image={img} index={i + 1} />
            ))}
          </div>
        </section>
      )}

      {project.contribution.length > 0 && (
        <section className="block block--wide" aria-labelledby="contrib-title">
          <h2 id="contrib-title" className="label mono">My contribution</h2>
          <ul className="plain">
            {project.contribution.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="block block--wide" aria-labelledby="ledger-title">
        <h2 id="ledger-title" className="label mono">
          {project.kind === 'Research project' ? 'Scope' : 'Implementation status'}
        </h2>
        <Ledger features={project.features} />
      </section>

      <section className="block block--wide" aria-labelledby="stack-title">
        <h2 id="stack-title" className="label mono">{project.kind === 'Research project' ? 'Topics' : 'Technology stack'}</h2>
        <dl className="stack">
          {project.stack.map((g) => (
            <div key={g.group}>
              <dt className="mono">{g.group}</dt>
              <dd>{g.items.join(' · ')}</dd>
            </div>
          ))}
        </dl>
      </section>

      {project.limitations && project.limitations.length > 0 && (
        <section className="block block--wide" aria-labelledby="limits-title">
          <h2 id="limits-title" className="label mono">Known limitations</h2>
          <ul className="plain">
            {project.limitations.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </section>
      )}

      <nav className="project__next" aria-label="Next project">
        <Link to={`/projects/${next.slug}`}>
          <span className="mono">Next project</span>
          <strong>{next.shortTitle ?? next.title}</strong>
          <ArrowRight size={22} aria-hidden="true" />
        </Link>
      </nav>
    </article>
  )
}

export default function ProjectPage() {
  const { slug } = useParams()
  const project = slug ? getProject(slug) : undefined
  if (!project) return <NotFound />
  return <ProjectBody project={project} index={projects.indexOf(project)} />
}
