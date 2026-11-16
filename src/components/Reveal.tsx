import { useEffect, useState, type ElementType, type ReactNode } from 'react'

type Tag = 'div' | 'li' | 'section' | 'article' | 'figure' | 'p'

interface Props {
  as?: Tag
  className?: string
  delay?: number
  children: ReactNode
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Fades content in once as it scrolls into view. Never hides content for reduced-motion users. */
export default function Reveal({ as = 'div', className = '', delay = 0, children }: Props) {
  const [node, setNode] = useState<HTMLElement | null>(null)
  const Tag = as as ElementType
  const [visible, setVisible] = useState(
    () => typeof IntersectionObserver === 'undefined' || prefersReducedMotion(),
  )

  useEffect(() => {
    if (visible || !node) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [visible, node])

  return (
    <Tag
      ref={setNode}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
