import { activities, experience } from '../content'
import Reveal from './Reveal'
import Section from './Section'

export default function Experience() {
  return (
    <Section id="experience" index="§ 4" title="Experience and activities">
      <div className="exp">
        <div>
          <h3 className="label mono">Experience</h3>
          {experience.map((e) => (
            <Reveal as="article" key={`${e.role}-${e.organisation}`} className="exp__item">
              <header>
                <h4>{e.role}</h4>
                <p>{e.organisation}</p>
                <p className="mono">{e.period}</p>
              </header>
              <ul>
                {e.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
        <div>
          <h3 className="label mono">Activities</h3>
          <ul className="activities">
            {activities.map((a) => (
              <Reveal as="li" key={a.title}>
                <strong>{a.title}</strong>
                {a.detail && <span>{a.detail}</span>}
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
