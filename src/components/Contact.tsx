import { ArrowUpRight, Download, Mail } from 'lucide-react'
import { site } from '../content'
import Reveal from './Reveal'
import Section from './Section'

function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  )
}

export default function Contact() {
  return (
    <Section id="contact" index="§ 6" title="Contact">
      <div className="contact">
        <Reveal as="p" className="contact__lede">
          I’m looking for internship and graduate opportunities in DevSecOps, application security and cloud security. The quickest way to reach me is below.
        </Reveal>
        <ul className="contact__list">
          <Reveal as="li">
            <span className="mono">Email</span>
            {site.emailIsPlaceholder ? (
              <span className="contact__pending">Address coming soon. Please use LinkedIn for now.</span>
            ) : (
              <a className="link-underline contact__big" href={`mailto:${site.email}`}>
                <Mail size={18} aria-hidden="true" /> {site.email}
              </a>
            )}
          </Reveal>
          <Reveal as="li" delay={40}>
            <span className="mono">LinkedIn</span>
            <a className="link-underline contact__big" href={site.linkedin.url} target="_blank" rel="noopener noreferrer">
              <LinkedInIcon /> linkedin.com/in/hariniganesan1 <ArrowUpRight size={18} aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </Reveal>
          <Reveal as="li" delay={80}>
            <span className="mono">GitHub</span>
            <a className="link-underline contact__big" href={site.github.url} target="_blank" rel="noopener noreferrer">
              <GithubIcon /> github.com/Harini-0628 <ArrowUpRight size={18} aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </Reveal>
          <Reveal as="li" delay={120}>
            <span className="mono">Résumé</span>
            <a className="link-underline contact__big" href={site.resume.file} download={site.resume.downloadName}>
              Download as PDF <Download size={18} aria-hidden="true" />
            </a>
          </Reveal>
        </ul>
      </div>
    </Section>
  )
}
