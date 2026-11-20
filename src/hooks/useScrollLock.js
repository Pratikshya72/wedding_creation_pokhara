import { useEffect } from 'react'

/** Locks page scroll while `active` (used by menu, lightbox and film player). */
export function useScrollLock(active) {
  useEffect(() => {
    if (!active) return
    const { overflow, paddingRight } = document.body.style
    const gap = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (gap > 0) document.body.style.paddingRight = `${gap}px`
    return () => {
      document.body.style.overflow = overflow
      document.body.style.paddingRight = paddingRight
    }
  }, [active])
}
