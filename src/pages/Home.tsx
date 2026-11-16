import { site } from '../content'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import Hero from '../components/Hero'
import WorkIndex from '../components/WorkIndex'
import About from '../components/About'
import Skills from '../components/Skills'
import Experience from '../components/Experience'
import Credentials from '../components/Credentials'
import Contact from '../components/Contact'

export default function Home() {
  useDocumentMeta({ title: site.seo.title, description: site.seo.description, path: '/' })
  return (
    <>
      <Hero />
      <WorkIndex />
      <About />
      <Skills />
      <Experience />
      <Credentials />
      <Contact />
    </>
  )
}
