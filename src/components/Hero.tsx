import { ArrowDown, ArrowUpRight, Download } from 'lucide-react'
import { Link } from 'react-router-dom'
import { site } from '../content'

function GithubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  )
}

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap">
        <div className="hero__grid">
          {/* ── Left column: Introduction & Call-to-actions ── */}
          <div className="hero__main">
            <p className="eyebrow mono">{site.role}</p>
            <h1 id="hero-title" className="hero__name">
              {site.name}
            </h1>
            <div className="hero__intro">
              {site.intro.map((p, i) => (
                <p key={i} className={i === 0 ? 'hero__lede' : 'hero__note'}>{p}</p>
              ))}
            </div>
            <div className="hero__actions">
              <Link className="button button--solid" to="/#work">
                View my work <ArrowDown size={16} aria-hidden="true" />
              </Link>
              <a className="button button--line" href={site.resume.file} download={site.resume.downloadName}>
                {site.resume.label} <Download size={16} aria-hidden="true" />
              </a>
            </div>
            <ul className="hero__links" aria-label="Profiles and contact">
              <li>
                <a className="link-underline" href={site.github.url} target="_blank" rel="noopener noreferrer">
                  <GithubIcon /> {site.github.label} <ArrowUpRight size={13} aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a className="link-underline" href={site.linkedin.url} target="_blank" rel="noopener noreferrer">
                  <LinkedInIcon /> {site.linkedin.label} <ArrowUpRight size={13} aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <Link className="link-underline" to="/#contact">Contact me</Link>
              </li>
            </ul>
          </div>

          {/* ── Right column: Photograph & Quick facts ── */}
          <div className="hero__aside">
            {site.photo2 && (
              <figure className="hero__photo-card">
                <div className="hero__photo-frame">
                  <img
                    src={site.photo2.src}
                    alt={site.photo2.alt}
                    width={site.photo2.width}
                    height={site.photo2.height}
                    loading="eager"
                    decoding="async"
                    className="hero__photo-img"
                  />
                </div>
              </figure>
            )}

            <aside className="hero__facts" aria-label="At a glance">
              <dl>
                {site.facts.map((f) => (
                  <div key={f.label}>
                    <dt className="mono">{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </div>
      </div>
    </section>
  )
}
