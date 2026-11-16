import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { projects } from '../content'
import Reveal from './Reveal'
import Section from './Section'

function GithubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  )
}

const pad = (n: number) => String(n + 1).padStart(2, '0')

export default function WorkIndex() {
  return (
    <Section
      id="work"
      index="§ 1"
      title="Selected work"
      intro="Two core DevSecOps projects, each with an in-depth case study, verified metrics and open source repository."
    >
      <div className="work-cards">
        {projects.map((p, i) => (
          <Reveal as="article" key={p.slug} delay={i * 80} className="work-card">
            <div className="work-card__inner">
              <div className="work-card__content">
                <div className="work-card__header">
                  <span className="work-card__num mono">{pad(i)}</span>
                  <span className="work-card__badge mono">{p.statusLabel}</span>
                </div>

                <h3 className="work-card__title">
                  <Link to={`/projects/${p.slug}`} className="work-card__title-link">
                    {p.title}
                  </Link>
                </h3>

                <p className="work-card__tagline">{p.tagline}</p>

                {p.metrics && p.metrics.length > 0 && (
                  <div className="work-card__metrics">
                    {p.metrics.slice(0, 3).map((m) => (
                      <div key={m.label} className="work-card__metric">
                        <span className="work-card__metric-val">{m.value}</span>
                        <span className="work-card__metric-lbl">{m.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="work-card__actions">
                  <Link to={`/projects/${p.slug}`} className="button button--solid work-card__btn">
                    Case study <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                  {p.links.repo && (
                    <a
                      href={p.links.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button button--line work-card__btn"
                    >
                      <GithubIcon /> GitHub <ArrowUpRight size={13} aria-hidden="true" />
                      <span className="sr-only"> (opens {p.title} GitHub repository in a new tab)</span>
                    </a>
                  )}
                </div>
              </div>

              {p.images[0] && (
                <Link to={`/projects/${p.slug}`} className="work-card__preview" tabIndex={-1} aria-hidden="true">
                  <div className="work-card__preview-frame">
                    <img
                      src={p.images[0].srcSmall ?? p.images[0].src}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      width={900}
                      height={600}
                    />
                  </div>
                  <span className="work-card__preview-caption mono">
                    Screenshot from local application · View case study →
                  </span>
                </Link>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
