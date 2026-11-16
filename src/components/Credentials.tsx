import { certifications, education } from '../content'
import Reveal from './Reveal'
import Section from './Section'

export default function Credentials() {
  return (
    <Section id="credentials" index="§ 5" title="Education and certifications">
      <div className="cred">
        <div>
          <h3 className="label mono">Education</h3>
          {education.map((e) => (
            <Reveal as="article" key={e.degree} className="cred__edu">
              <h4>{e.degree}</h4>
              <p>{e.institution}</p>
              <p className="mono">
                {e.period}
                {e.detail ? ` · ${e.detail}` : ''}
              </p>
            </Reveal>
          ))}
        </div>
        <div>
          <h3 className="label mono">Certifications</h3>
          <ul className="certs">
            {certifications.map((c, i) => (
              <Reveal as="li" key={`${c.title}-${c.issuer}`} delay={i * 30}>
                <span className="certs__title">
                  {c.credentialUrl ? (
                    <a className="link-underline" href={c.credentialUrl} target="_blank" rel="noopener noreferrer">
                      {c.title}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : (
                    c.title
                  )}
                </span>
                <span className="certs__issuer mono">
                  {c.issuer}
                  {c.year ? ` · ${c.year}` : ''}
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
