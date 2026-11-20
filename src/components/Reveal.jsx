import { useReveal } from '../hooks/useReveal'

/** Fades/rises its children in when scrolled into view. */
export function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useReveal()
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ '--delay': `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  )
}

/**
 * Curtain-wipe reveal for images.
 * The observed wrapper stays unclipped (IntersectionObserver ignores fully
 * clipped targets); the clip-path lives on the inner layer.
 */
export function RevealImage({ delay = 0, className = '', children }) {
  const ref = useReveal({ threshold: 0.1 })
  return (
    <div ref={ref} className={`reveal-img ${className}`} style={{ '--delay': `${delay}ms` }}>
      <div className="reveal-img-inner">{children}</div>
    </div>
  )
}
