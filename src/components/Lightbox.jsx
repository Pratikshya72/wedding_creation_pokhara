import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { photoSrc, photoSrcSet } from './Photo'
import { useScrollLock } from '../hooks/useScrollLock'
import { ArrowLeft, ArrowRight, Close } from './Icons'

/**
 * Full-screen image viewer.
 * Keyboard: ← → to navigate, Esc to close. Touch: swipe left / right.
 * `items` is an array of { name, alt }.
 */
export default function Lightbox({ items, index, onClose, onIndex }) {
  const open = index !== null && index !== undefined
  const closeRef = useRef(null)
  const returnFocus = useRef(null)
  const touch = useRef(null)
  const [dir, setDir] = useState(0)

  useScrollLock(open)

  const go = useCallback(
    (step) => {
      setDir(step)
      onIndex((index + step + items.length) % items.length)
    },
    [index, items.length, onIndex],
  )

  useEffect(() => {
    if (!open) return
    returnFocus.current = document.activeElement
    closeRef.current?.focus()
    return () => returnFocus.current?.focus?.()
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === 'Tab') {
        // keep focus inside the dialog
        const f = [...document.querySelectorAll('#lightbox button')]
        const i = f.indexOf(document.activeElement)
        e.preventDefault()
        f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length]?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, go, onClose])

  // Preload neighbours for instant navigation
  useEffect(() => {
    if (!open) return
    ;[1, -1].forEach((s) => {
      const n = items[(index + s + items.length) % items.length]
      const img = new Image()
      img.src = photoSrc(n.name, 1600)
    })
  }, [open, index, items])

  if (!open) return null
  const item = items[index]

  return createPortal(
    <div
      id="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      className="fade-in fixed inset-0 z-[90] flex flex-col bg-night/97 text-white"
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touch.current === null) return
        const dx = e.changedTouches[0].clientX - touch.current
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
        touch.current = null
      }}
    >
      <div className="flex items-center justify-between px-5 py-5 sm:px-8">
        <p className="eyebrow text-white/60" aria-live="polite">
          {String(index + 1).padStart(2, '0')} <span className="mx-2 text-white/25">/</span>{' '}
          {String(items.length).padStart(2, '0')}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="flex items-center gap-3 text-white/80 transition-colors hover:text-white"
        >
          <span className="eyebrow">Close</span>
          <Close />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-6 sm:px-24">
        <img
          key={item.name}
          src={photoSrc(item.name, 1600)}
          srcSet={photoSrcSet(item.name)}
          sizes="(min-width: 640px) 85vw, 100vw"
          alt={item.alt}
          className="max-h-full max-w-full object-contain"
          style={{ animation: `lb-in 0.8s var(--ease-silk) both`, '--from': `${dir * 40}px` }}
        />
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous image"
          className="absolute top-1/2 left-2 hidden -translate-y-1/2 p-4 text-white/60 transition-colors hover:text-white sm:block"
        >
          <ArrowLeft className="w-9" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next image"
          className="absolute top-1/2 right-2 hidden -translate-y-1/2 p-4 text-white/60 transition-colors hover:text-white sm:block"
        >
          <ArrowRight className="w-9" />
        </button>
      </div>

      <div className="flex justify-center gap-10 pb-6 sm:hidden">
        <button type="button" onClick={() => go(-1)} aria-label="Previous image" className="p-3 text-white/70">
          <ArrowLeft className="w-9" />
        </button>
        <button type="button" onClick={() => go(1)} aria-label="Next image" className="p-3 text-white/70">
          <ArrowRight className="w-9" />
        </button>
      </div>
      <style>{`@keyframes lb-in{from{opacity:0;transform:translateX(var(--from)) scale(.985)}to{opacity:1;transform:none}}`}</style>
    </div>,
    document.body,
  )
}
