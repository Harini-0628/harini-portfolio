import { skills } from '../content'
import Reveal from './Reveal'
import Section from './Section'

export default function Skills() {
  return (
    <Section
      id="skills"
      index="§ 3"
      title="Technical skills"
      intro="Tools I have used in projects or coursework, grouped by area."
    >
      <dl className="skills">
        {skills.map((g, i) => (
          <Reveal key={g.category} delay={i * 40} className="skills__row">
            <dt className="mono">{g.category}</dt>
            <dd>
              <ul>
                {g.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </dd>
          </Reveal>
        ))}
      </dl>
    </Section>
  )
}
