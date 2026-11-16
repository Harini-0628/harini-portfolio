import { Link } from 'react-router-dom'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export default function NotFound() {
  useDocumentMeta({ title: 'Page not found — Harini Ganesan', description: 'This page does not exist.', path: '/404' })
  return (
    <section className="wrap notfound">
      <p className="eyebrow mono">404</p>
      <h1 className="notfound__title">That page <em>doesn’t exist.</em></h1>
      <p>It may have moved, or the link may be mistyped.</p>
      <Link className="button button--solid" to="/">Back to the portfolio</Link>
    </section>
  )
}
