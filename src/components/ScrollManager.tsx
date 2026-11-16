import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Scrolls to #hash targets (including after navigating from a project page) or to the top. */
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const behavior: ScrollBehavior = reduce ? 'auto' : 'smooth'
    if (hash) {
      // Wait a frame so the destination page has rendered.
      const id = decodeURIComponent(hash.slice(1))
      const raf = requestAnimationFrame(() => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior, block: 'start' })
        }
      })
      return () => cancelAnimationFrame(raf)
    }
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname, hash, key])

  return null
}
