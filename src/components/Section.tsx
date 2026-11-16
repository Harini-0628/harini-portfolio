import type { ReactNode } from 'react'
import Reveal from './Reveal'

interface Props {
  id: string
  index: string
  title: string
  intro?: string
  children: ReactNode
}

/** A numbered, ruled section with an editorial heading. */
export default function Section({ id, index, title, intro, children }: Props) {
  return (
    <section id={id} className="section" aria-labelledby={`${id}-title`}>
      <div className="wrap">
        <Reveal className="section__head">
          <p className="section__index mono" aria-hidden="true">{index}</p>
          <h2 id={`${id}-title`} className="section__title">{title}</h2>
          {intro && <p className="section__intro">{intro}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  )
}
