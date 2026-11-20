import { useCallback, useState } from 'react'
import FilmCard from '../components/FilmCard'
import FilmPlayer from '../components/FilmPlayer'
import { Reveal } from '../components/Reveal'
import SampleNote from '../components/SampleNote'
import ContactBand from '../components/ContactBand'
import Photo from '../components/Photo'
import { Play } from '../components/Icons'
import { usePageMeta } from '../hooks/usePageMeta'
import { films } from '../data/films'
import { site } from '../data/site'

export default function Films() {
  usePageMeta('Wedding Films', 'Cinematic wedding films, highlight films and pre-wedding films by Wedding Creation Pokhara.')
  const [film, setFilm] = useState(null)
  const close = useCallback(() => setFilm(null), [])
  const [featured, ...rest] = films

  return (
    <div className="bg-night text-ivory">
      {/* Cinematic hero -the featured film fills the screen */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden" aria-labelledby="films-title">
        <div className="absolute inset-0">
          <Photo name={featured.poster} fill priority sizes="100vw" position="center 40%" imgClassName="kenburns" alt="" />
          <div className="hero-scrim absolute inset-0" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-night to-transparent" />
        </div>
        <div className="text-legible container-x relative pt-40 pb-20 lg:pb-28">
          <p className="eyebrow fade-in font-medium text-white" style={{ '--delay': '200ms' }}>
            Wedding films
          </p>
          <h1 id="films-title" className="display mt-5 overflow-hidden pb-2 text-[3.4rem] sm:text-7xl lg:text-[8rem]">
            <span className="rise" style={{ '--delay': '300ms' }}>
              Cinema <em>of the heart</em>
            </span>
          </h1>
          <p className="fade-in mt-6 max-w-lg text-base leading-relaxed text-white/75 sm:text-lg" style={{ '--delay': '600ms' }}>
            {site.bio} -films with sound, pace and feeling, made to be watched again and again.
          </p>
          <button
            type="button"
            onClick={() => setFilm(featured)}
            className="group fade-in mt-10 inline-flex items-center gap-5"
            style={{ '--delay': '900ms' }}
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/70 transition-all duration-700 group-hover:scale-110 group-hover:bg-white group-hover:text-ink">
              <Play className="ml-0.5" />
            </span>
            <span className="text-left">
              <span className="eyebrow block text-white/60">Featured · {featured.kind}</span>
              <span className="mt-1 block font-serif text-2xl font-light italic">{featured.title}</span>
            </span>
          </button>
        </div>
      </section>

      <section className="container-x py-24 lg:py-36" aria-label="All films">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-white/10 pb-8">
          <Reveal>
            <h2 className="display text-5xl lg:text-6xl">
              The <em>collection</em>
            </h2>
          </Reveal>
          {films.some((f) => f.sample) && (
            <p className="flex items-center gap-3 text-xs text-white/45">
              <SampleNote light /> Films coming soon. Posters show our photography.
            </p>
          )}
        </div>
        <div className="mt-14 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:mt-20">
          {rest.map((f, i) => (
            <div key={f.id} className={i % 2 ? 'md:mt-28' : ''}>
              <FilmCard film={f} onPlay={setFilm} delay={(i % 2) * 120} sizes="(min-width:768px) 50vw, 100vw" />
            </div>
          ))}
        </div>
      </section>

      <FilmPlayer film={film} onClose={close} />
      <ContactBand image="pre-wedding-shoots-dsc01868" title="Let’s make your film." />
    </div>
  )
}
