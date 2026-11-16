import { site } from '../content'
import Reveal from './Reveal'
import Section from './Section'

export default function About() {
  const photo = site.photo
  return (
    <Section id="about" index="§ 2" title="About">
      <div className={`about ${photo ? 'about--with-photo' : ''}`}>
        {photo && (
          <Reveal as="figure" className="about__photo">
            <img
              src={photo.src}
              srcSet={`${photo.src} ${photo.width}w, ${photo.srcLarge} 1086w`}
              sizes="(min-width: 900px) 340px, 70vw"
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              loading="lazy"
              decoding="async"
            />
          </Reveal>
        )}
        <div className="about__text">
          {site.about.map((p, i) => (
            <Reveal as="p" key={i} delay={i * 70}>{p}</Reveal>
          ))}
          <Reveal as="p" className="about__looking mono">{site.lookingFor}</Reveal>
        </div>
      </div>
    </Section>
  )
}
