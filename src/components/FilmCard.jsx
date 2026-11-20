import FilmPoster from './FilmPoster'
import { RevealImage } from './Reveal'
import { Play } from './Icons'

/** Film poster with play affordance. `size="feature"` for the large hero film. */
export default function FilmCard({ film, onPlay, size = 'card', delay = 0, sizes, dark = true }) {
  const feature = size === 'feature'
  return (
    <button
      type="button"
      onClick={() => onPlay(film)}
      className="group block w-full text-left"
      aria-label={`Play ${film.title}, ${film.kind}`}
    >
      <RevealImage delay={delay}>
        <div className="zoom-frame relative">
          <FilmPoster
            film={film}
            aspect={feature ? '21 / 9' : '2.35 / 1'}
            sizes={sizes ?? (feature ? '100vw' : '(min-width:1024px) 33vw, 90vw')}
            className={feature ? 'max-sm:!aspect-[4/5]' : ''}
            imgClassName="brightness-[.82] group-hover:brightness-[.68]"
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span
              className={`flex items-center justify-center rounded-full border border-white/70 text-white backdrop-blur-[2px] transition-all duration-700 ease-[var(--ease-silk)] group-hover:scale-110 group-hover:border-white group-hover:bg-white group-hover:text-ink ${
                feature ? 'h-24 w-24 sm:h-28 sm:w-28' : 'h-16 w-16'
              }`}
            >
              <Play className={feature ? 'ml-1 h-6 w-6' : 'ml-0.5 h-4 w-4'} />
            </span>
          </span>
          {feature && (
            <span className="absolute inset-x-0 bottom-0 flex flex-col gap-2 bg-gradient-to-t from-black/60 to-transparent p-6 pt-24 text-white sm:p-10">
              <span className="eyebrow text-white/70">{film.kind}</span>
              <span className="display text-4xl italic sm:text-6xl">{film.title}</span>
            </span>
          )}
        </div>
      </RevealImage>
      {!feature && (
        <span className="mt-5 block">
          <span className={`block font-serif text-2xl font-light transition-colors duration-300 group-hover:text-pink-soft ${dark ? 'text-ivory' : 'text-ink'}`}>
            {film.title}
          </span>
          <span className={`eyebrow mt-2 block !text-[0.62rem] ${dark ? 'text-white/50' : 'text-stone'}`}>{film.kind}</span>
        </span>
      )}
    </button>
  )
}
