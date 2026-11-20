import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useScrollLock } from '../hooks/useScrollLock'
import { hasVideo } from '../data/films'
import { site } from '../data/site'
import Photo from './Photo'
import { Close } from './Icons'

/** Cinematic full-screen player for YouTube, Vimeo or self-hosted MP4 films. */
export default function FilmPlayer({ film, onClose }) {
  const closeRef = useRef(null)
  useScrollLock(Boolean(film))

  useEffect(() => {
    if (!film) return
    const prev = document.activeElement
    closeRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab') {
        const f = [...document.querySelectorAll('#film-player a, #film-player button, #film-player video, #film-player iframe')]
        const i = f.indexOf(document.activeElement)
        e.preventDefault()
        f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length]?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      prev?.focus?.()
    }
  }, [film, onClose])

  if (!film) return null
  const instagram = site.socials.find((s) => s.label === 'Instagram')

  return createPortal(
    <div
      id="film-player"
      role="dialog"
      aria-modal="true"
      aria-label={`${film.title} -${film.kind}`}
      className="fade-in fixed inset-0 z-[90] flex flex-col bg-black text-white"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="flex items-center justify-between px-5 py-5 sm:px-8">
        <div>
          <p className="eyebrow text-white/50">{film.kind}</p>
          <p className="mt-1 font-serif text-2xl font-light italic">{film.title}</p>
        </div>
        <button ref={closeRef} type="button" onClick={onClose} className="flex items-center gap-3 text-white/80 hover:text-white">
          <span className="eyebrow">Close</span>
          <Close />
        </button>
      </div>

      <div className="flex min-h-0 flex-1 items-center justify-center px-4 pb-8 sm:px-10" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className="relative aspect-video w-full max-w-[min(1400px,calc((100vh-160px)*16/9))] bg-night">
          {film.youtube && (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${film.youtube}?autoplay=1&rel=0&modestbranding=1`}
              title={film.title}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          )}
          {!film.youtube && film.vimeo && (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://player.vimeo.com/video/${film.vimeo}?autoplay=1&title=0&byline=0&portrait=0`}
              title={film.title}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          )}
          {!film.youtube && !film.vimeo && film.src && (
            <video className="absolute inset-0 h-full w-full" src={film.src} controls autoPlay playsInline />
          )}
          {!hasVideo(film) && (
            <>
              <Photo name={film.poster} fill className="!absolute inset-0 opacity-40" sizes="90vw" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <p className="eyebrow text-white/60">Film coming soon</p>
                <p className="display mt-4 max-w-xl text-3xl italic sm:text-5xl">This film is being prepared for the website.</p>
                {instagram && (
                  <a
                    href={instagram.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-light mt-8"
                  >
                    Watch our latest reels on Instagram
                  </a>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body,
  )
}
