import { site } from '../content'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <div className="wrap site-footer__inner">
        <p>© {year} {site.name}</p>
        <p className="mono">Set in Newsreader, Instrument Sans and IBM Plex Mono</p>
        <p>
          <a className="link-underline" href="#main" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
            Back to top ↑
          </a>
        </p>
      </div>
    </footer>
  )
}
