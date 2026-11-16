import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { site } from '../content'

const links = [
  { to: '/#work', label: 'Work' },
  { to: '/#about', label: 'About' },
  { to: '/#skills', label: 'Skills' },
  { to: '/#credentials', label: 'Credentials' },
  { to: '/#contact', label: 'Contact' },
]

export default function Header() {
  // The menu is open only for the route it was opened on, so navigating away closes it.
  const { pathname } = useLocation()
  const [openAt, setOpenAt] = useState<string | null>(null)
  const open = openAt === pathname
  const setOpen = (next: boolean | ((o: boolean) => boolean)) => {
    const value = typeof next === 'function' ? next(open) : next
    setOpenAt(value ? pathname : null)
  }
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    panelRef.current?.querySelector<HTMLElement>('a')?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenAt(null)
        buttonRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header className="site-header">
      <div className="site-header__inner wrap">
        <Link to="/" className="brand" aria-label={`${site.name}, home`}>
          <span className="brand__mark" aria-hidden="true">H</span>
          <span className="brand__name">{site.name}</span>
        </Link>

        <nav className="nav" aria-label="Primary">
          <ul>
            {links.map((l) => (
              <li key={l.to}>
                <Link className="link-underline" to={l.to}>{l.label}</Link>
              </li>
            ))}
            <li>
              <a className="nav__resume" href={site.resume.file} download={site.resume.downloadName}>
                Résumé
              </a>
            </li>
          </ul>
        </nav>

        <button
          ref={buttonRef}
          type="button"
          className="menu-button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          <span>{open ? 'Close' : 'Menu'}</span>
        </button>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        className={`mobile-menu ${open ? 'is-open' : ''}`}
        hidden={!open}
      >
        <nav aria-label="Mobile">
          <ul>
            {links.map((l) => (
              <li key={l.to}>
                <Link to={l.to} onClick={() => setOpen(false)}>{l.label}</Link>
              </li>
            ))}
            <li>
              <a href={site.resume.file} download={site.resume.downloadName} onClick={() => setOpen(false)}>
                Résumé
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
