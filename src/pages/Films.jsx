import { useCallback, useState } from 'react'
import FilmCard from '../components/FilmCard'
import FilmPlayer from '../components/FilmPlayer'
import { Reveal } from '../components/Reveal'
import ContactBand from '../components/ContactBand'
import FilmPoster from '../components/FilmPoster'
import { Play, YouTube } from '../components/Icons'
import { usePageMeta } from '../hooks/usePageMeta'
import { filmCategories, films, youtubeChannel } from '../data/films'
import { site } from '../data/site'

export default function Films() {
  usePageMeta('Wedding Films', 'Cinematic wedding films, highlight films and pre-wedding films by Wedding Creation Pokhara.')
  const [film, setFilm] = useState(null)
  const close = useCallback(() => setFilm(null), [])
  const [filter, setFilter] = useState('All')
  const featured = films[0]
  const shown = filter === 'All' ? films : films.filter((x) => x.category === filter)

  return (
    <div className="bg-night text-ivory">
      {/* Cinematic hero -the featured film fills the screen */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden" aria-labelledby="films-title">
        <div className="absolute inset-0">
          <FilmPoster film={featured} fill priority sizes="100vw" position="center 40%" imgClassName="kenburns" />
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
        <div className="flex flex-col gap-8 border-b border-white/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <h2 className="display text-5xl lg:text-6xl">
              The <em>collection</em>
            </h2>
            <p className="mt-4 text-sm text-white/55">{films.length} films from real weddings and shoots</p>
          </Reveal>
          <div className="no-scrollbar -mx-5 flex gap-2.5 overflow-x-auto px-5 sm:mx-0 sm:px-0" role="group" aria-label="Filter films">
            {filmCategories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                aria-pressed={filter === c}
                className={`shrink-0 rounded-full border px-5 py-2.5 text-sm transition-all duration-300 ${
                  filter === c
                    ? 'border-pink bg-pink text-white shadow-[0_8px_20px_-8px_rgb(228_0_124/0.8)]'
                    : 'border-white/20 text-white/70 hover:border-pink-soft hover:text-white'
                }`}
              >
                {c}
                <span className="ml-2 text-xs opacity-70">{c === 'All' ? films.length : films.filter((x) => x.category === c).length}</span>
              </button>
            ))}
          </div>
        </div>
        <div key={filter} className="fade-in mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {shown.map((x, i) => (
            <FilmCard key={x.id} film={x} onPlay={setFilm} delay={(i % 3) * 100} sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" />
          ))}
        </div>
        <div className="mt-16 text-center">
          <a href={youtubeChannel} target="_blank" rel="noopener noreferrer" className="btn btn-light group rounded-full">
            <YouTube className="h-5 w-5" />
            More films on YouTube
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </section>

      <FilmPlayer film={film} onClose={close} />
      <ContactBand image="pre-wedding-shoots-dsc01868" title="Let’s make your film." />
    </div>
  )
}
