import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Photo from '../components/Photo'
import { Reveal, RevealImage } from '../components/Reveal'
import SectionTitle from '../components/SectionTitle'
import Lightbox from '../components/Lightbox'
import FilmCard from '../components/FilmCard'
import FilmPlayer from '../components/FilmPlayer'
import ContactBand from '../components/ContactBand'
import SampleNote from '../components/SampleNote'
import { ArrowRight } from '../components/Icons'
import { usePageMeta } from '../hooks/usePageMeta'
import { useParallax } from '../hooks/useParallax'
import { site } from '../data/site'
import { galleries } from '../data/galleries'
import { alt } from '../data/photos'
import { films } from '../data/films'
import { services } from '../data/services'
import { testimonials } from '../data/testimonials'

const HERO_SLIDES = [
  { name: 'weddings-dsc07123', position: 'center 38%', mobilePosition: '25% 40%' },
  { name: 'post-wedding-pokhara-dorje-resort-47-of-57', position: 'center 35%' },
  { name: 'post-wedding-postwed-27', position: 'center 45%' },
  { name: 'pre-wedding-shoots-1c7a2272', position: '60% 40%' },
]
const SLIDE_MS = 6500

const FRAMES = [
  'weddings-dsc06816',
  'rituals-and-ceremony-dsc07947',
  'post-wedding-dsc08414',
  'pre-wedding-shoots-dsc02574',
  'weddings-dsc00836',
  'engagement-img-8300',
  'haldi-mehendi-1c7a0514',
].map((name) => ({ name, alt: alt(name) }))

// [frame index, grid classes, aspect ratio]
const FRAME_ROWS = [
  {
    align: 'items-end',
    items: [
      [0, 'col-span-2 lg:col-span-7', '3/2'],
      [1, 'col-span-2 sm:col-span-1 lg:col-span-4 lg:col-start-9', '4/5'],
    ],
  },
  {
    align: 'items-start',
    items: [
      [2, 'col-span-1 max-sm:hidden lg:col-span-4 lg:col-start-2 lg:mt-20', '4/5'],
      [3, 'col-span-2 sm:col-span-1 lg:col-span-6 lg:col-start-7', '3/2'],
    ],
  },
  {
    align: 'items-start',
    items: [
      [4, 'col-span-1 lg:col-span-3', '1/1'],
      [5, 'col-span-1 lg:col-span-5 lg:col-start-5 lg:mt-8', '4/5'],
      [6, 'col-span-2 lg:col-span-3 lg:col-start-10 lg:mt-24', '3/4'],
    ],
  },
]

export default function Home() {
  usePageMeta(
    null,
    'Wedding Creation Pokhara -wedding photography and cinematic wedding films in Pokhara, Nepal. Pre-wedding shoots, destination weddings and full wedding coverage.',
  )
  const [lightbox, setLightbox] = useState(null)
  const [film, setFilm] = useState(null)
  const closeFilm = useCallback(() => setFilm(null), [])

  return (
    <>
      <Hero />
      <Intro />

      {/* ——-Selected frames ——-*/}
      <section className="container-x py-24 lg:py-40" aria-labelledby="frames-title">
        <SectionTitle
          id="frames-title"
          eyebrow="Portfolio"
          title={
            <>
              Selected <em>frames</em>
            </>
          }
          link="/portfolio"
          linkLabel="View the portfolio"
        />
        {/* Three composed editorial rows; collapses to a 2-column grid on small screens */}
        <div className="mt-16 space-y-3 sm:space-y-5 lg:mt-24 lg:space-y-10">
          {FRAME_ROWS.map((row, r) => (
            <div key={r} className={`grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-12 lg:gap-8 ${row.align}`}>
              {row.items.map(([i, cls, aspect]) => {
                const f = FRAMES[i]
                return (
                  <figure key={f.name} className={cls}>
                    <button
                      type="button"
                      onClick={() => setLightbox(i)}
                      className="zoom-frame block w-full cursor-zoom-in"
                      aria-label={`Open image: ${f.alt}`}
                    >
                      <RevealImage delay={(i % 3) * 120}>
                        <Photo name={f.name} alt={f.alt} aspect={aspect} sizes="(min-width:1024px) 55vw, 100vw" />
                      </RevealImage>
                    </button>
                  </figure>
                )
              })}
            </div>
          ))}
        </div>
        <Lightbox items={FRAMES} index={lightbox} onClose={() => setLightbox(null)} onIndex={setLightbox} />
      </section>

      {/* ——-Films ——-*/}
      <section className="bg-night py-24 text-ivory lg:py-36" aria-labelledby="films-title">
        <div className="container-x">
          <SectionTitle
            id="films-title"
            light
            eyebrow="Wedding films"
            title={
              <>
                Stories that <em>move</em>
              </>
            }
            link="/films"
            linkLabel="All films"
          />
          <Reveal delay={150}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
              Film is at the heart of what we do. Vows, laughter, music and the people you love -shaped into a film
              you&rsquo;ll return to for decades.
            </p>
          </Reveal>
          <div className="mt-14 lg:mt-20">
            <FilmCard film={films[0]} size="feature" onPlay={setFilm} />
          </div>
          <div className="no-scrollbar -mx-5 mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:mt-10 lg:grid lg:grid-cols-3 lg:gap-8 lg:overflow-visible lg:px-0">
            {films.slice(1, 4).map((f, i) => (
              <div key={f.id} className="w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-auto">
                <FilmCard film={f} onPlay={setFilm} delay={i * 120} />
              </div>
            ))}
          </div>
          {films.some((f) => f.sample) && (
            <p className="mt-10">
              <SampleNote light /> <span className="ml-2 text-xs text-white/40">Films coming soon. Posters show our photography.</span>
            </p>
          )}
        </div>
        <FilmPlayer film={film} onClose={closeFilm} />
      </section>

      {/* ——-Featured galleries ——-*/}
      <section className="container-x py-24 lg:py-40" aria-labelledby="galleries-title">
        <SectionTitle
          id="galleries-title"
          eyebrow="Portfolio"
          title={
            <>
              Love, <em>as it happened</em>
            </>
          }
          link="/portfolio"
          linkLabel="All galleries"
        />
        <div className="mt-16 space-y-24 lg:mt-24 lg:space-y-36">
          {galleries.slice(0, 3).map((c, i) => (
            <article key={c.slug} className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
              <Link
                to={`/portfolio/${c.slug}`}
                className={`zoom-frame block lg:col-span-7 ${i % 2 ? 'lg:order-2 lg:col-start-6' : ''}`}
                aria-label={`View gallery: ${c.title}`}
                tabIndex={-1}
              >
                <RevealImage>
                  <Photo name={c.cover} aspect={i % 2 ? '4/5' : '3/2'} sizes="(min-width:1024px) 58vw, 100vw" alt={alt(c.cover)} />
                </RevealImage>
              </Link>
              <div className={`lg:col-span-4 ${i % 2 ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-9'}`}>
                <Reveal>
                  <p className="eyebrow flex items-center gap-4 text-pink">
                    <span>{String(i + 1).padStart(2, '0')}</span>
                    <span className="h-px w-10 bg-line" aria-hidden="true" />
                    <span className="text-stone">{c.gallery.length} photographs</span>
                  </p>
                </Reveal>
                <Reveal delay={100}>
                  <h3 className="display mt-6 text-5xl lg:text-6xl">
                    <Link to={`/portfolio/${c.slug}`} className="hover:italic">
                      {c.couple || c.title}
                    </Link>
                  </h3>
                </Reveal>
                <Reveal delay={200}>
                  <p className="mt-6 max-w-sm text-base leading-relaxed text-taupe">{c.excerpt}</p>
                </Reveal>
                <Reveal delay={300}>
                  <Link to={`/portfolio/${c.slug}`} className="group eyebrow mt-9 inline-flex items-center gap-4">
                    <span className="link-line">View the gallery</span>
                    <ArrowRight className="w-8 transition-transform duration-500 group-hover:translate-x-1.5" />
                  </Link>
                </Reveal>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Landscape />
      <ServicesOverview />
      <GoogleRating />
      {testimonials.length > 0 && <Testimonials />}
      <ContactBand />
    </>
  )
}

/* ———————————————————-Hero ———————————————————-*/
function Hero() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (site.heroVideo || paused) return
    const t = setTimeout(() => setActive((a) => (a + 1) % HERO_SLIDES.length), SLIDE_MS)
    return () => clearTimeout(t)
  }, [active, paused])

  return (
    <section className="relative h-[100svh] min-h-[560px] overflow-hidden bg-night text-white" aria-label="Introduction">
      {site.heroVideo ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={site.heroVideo}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
      ) : (
        HERO_SLIDES.map((s, i) => (
          <div
            key={s.name}
            aria-hidden={i !== active}
            className={`absolute inset-0 transition-opacity duration-[1800ms] ease-in-out ${i === active ? 'z-[1] opacity-100' : 'opacity-0'}`}
          >
            <Photo
              name={s.name}
              fill
              priority={i === 0}
              position={s.position}
              mobilePosition={s.mobilePosition}
              sizes="100vw"
              alt=""
              imgClassName={i === active ? 'kenburns' : ''}
            />
          </div>
        ))
      )}
      <div className="hero-scrim absolute inset-0 z-[2]" />

      <div className="text-legible container-x relative z-[3] flex h-full flex-col justify-end pb-24 sm:pb-28 lg:pb-32">
        <p className="eyebrow fade-in font-medium text-white" style={{ '--delay': '400ms' }}>
          Wedding Photography &amp; Films <span className="max-sm:hidden">&nbsp;·&nbsp;</span>
          <br className="sm:hidden" /> Pokhara, Nepal
        </p>
        <h1 className="display mt-6 text-[clamp(2.6rem,14.5vw,3.6rem)] sm:text-[6rem] lg:text-[9.5rem] xl:text-[11rem]">
          <span className="block overflow-hidden pb-1">
            <span className="rise" style={{ '--delay': '500ms' }}>
              Love, in light
            </span>
          </span>
          <span className="block overflow-hidden pb-3 lg:pl-[12vw]">
            <span className="rise italic" style={{ '--delay': '700ms' }}>
              &amp; motion.
            </span>
          </span>
        </h1>
        <div className="fade-in mt-10 flex flex-wrap items-center gap-x-10 gap-y-4" style={{ '--delay': '1100ms' }}>
          <Link to="/portfolio" className="eyebrow link-line">
            View portfolio
          </Link>
          <Link to="/films" className="eyebrow link-line">
            Watch films
          </Link>
        </div>
      </div>

      {!site.heroVideo && (
        <div className="absolute right-[5.5rem] bottom-7 z-[3] flex items-center gap-3 sm:right-28 lg:right-32 lg:bottom-11">
          {HERO_SLIDES.map((s, i) => (
            <button
              key={s.name}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show photograph ${i + 1}`}
              aria-current={i === active}
              className="group py-5"
            >
              <span className="relative block h-px w-8 overflow-hidden bg-white/30 sm:w-12">
                <span
                  key={i === active ? `on-${active}` : 'off'}
                  className="absolute inset-y-0 left-0 bg-pink-soft"
                  style={
                    i === active
                      ? { animation: `hero-progress ${SLIDE_MS}ms linear both`, animationPlayState: paused ? 'paused' : 'running' }
                      : { width: 0 }
                  }
                />
              </span>
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            className="eyebrow -my-3 ml-1 px-2 py-4 !text-[0.6rem] text-white/70 hover:text-white"
            aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
          >
            {paused ? 'Play' : 'Pause'}
          </button>
        </div>
      )}

      <div className="absolute bottom-0 left-1/2 z-[3] hidden h-16 w-px -translate-x-1/2 overflow-hidden lg:block" aria-hidden="true">
        <span className="scroll-cue block h-full w-full bg-white/70" />
      </div>
      <style>{`@keyframes hero-progress{from{width:0}to{width:100%}}`}</style>
    </section>
  )
}

/* ———————————————————-Intro ———————————————————-*/
function Intro() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-44" aria-labelledby="intro-title">
      <div className="container-x grid items-center gap-14 lg:grid-cols-12">
        <div className="hidden lg:col-span-3 lg:block">
          <RevealImage>
            <Photo name="pre-wedding-shoots-dsc03441" aspect="3/4.4" sizes="25vw" alt={alt('pre-wedding-shoots-dsc03441')} />
          </RevealImage>
        </div>
        <div className="text-center lg:col-span-6 lg:px-6">
          <Reveal>
            <p className="eyebrow text-pink">Wedding Creation · Pokhara</p>
          </Reveal>
          <Reveal delay={120}>
            <h2 id="intro-title" className="display mt-8 text-[2.35rem] leading-[1.12] sm:text-5xl lg:text-[3.6rem]">
              We photograph and film weddings the way they <em>feel</em> honest, emotional, and quietly beautiful.
            </h2>
          </Reveal>
          <Reveal delay={240}>
            <p className="mx-auto mt-9 max-w-md text-base leading-relaxed text-taupe">
              A wedding photography and cinematography studio from Pokhara, telling love stories through still images and
              film -from the first rituals to the last dance.
            </p>
          </Reveal>
          <Reveal delay={340}>
            <Link to="/our-story" className="group eyebrow mt-10 inline-flex items-center gap-4">
              <span className="link-line">Our story</span>
              <ArrowRight className="w-8 transition-transform duration-500 group-hover:translate-x-1.5" />
            </Link>
          </Reveal>
        </div>
        <div className="grid grid-cols-2 gap-3 lg:col-span-3 lg:mt-48 lg:block">
          <RevealImage delay={200}>
            <Photo name="weddings-dsc06848" aspect="4/5" sizes="(min-width:1024px) 25vw, 50vw" alt={alt('weddings-dsc06848')} />
          </RevealImage>
          <div className="lg:hidden">
            <RevealImage delay={300}>
              <Photo name="pre-wedding-shoots-dsc03441" aspect="4/5" sizes="50vw" alt={alt('pre-wedding-shoots-dsc03441')} />
            </RevealImage>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ———————————————————-Landscape band ———————————————————-*/
function Landscape() {
  const ref = useParallax(-0.12)
  return (
    <section className="relative flex min-h-[92svh] items-center overflow-hidden bg-night text-white" aria-labelledby="place-title">
      <div ref={ref} className="absolute -inset-y-[12%] inset-x-0 will-change-transform">
        <Photo name="post-wedding-postwedd-88-of-224" fill sizes="100vw" position="center 40%" alt="" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-black/10" />
      <div className="container-x relative py-28">
        <Reveal>
          <p className="eyebrow text-white/75">Pokhara · Nepal</p>
        </Reveal>
        <Reveal delay={120}>
          <h2 id="place-title" className="display mt-6 max-w-3xl text-5xl sm:text-7xl lg:text-[6.2rem]">
            From the lakeshore <em>to the mountains</em>
          </h2>
        </Reveal>
        <Reveal delay={240}>
          <p className="mt-8 max-w-md text-base leading-relaxed text-white/80 sm:text-lg">
            Lakes, terraced hills and Himalayan light -Pokhara is our home, and some of the most beautiful wedding
            backdrops in the world are right on our doorstep.
          </p>
        </Reveal>
        <Reveal delay={340}>
          <Link to="/services#destination" className="btn btn-light mt-10">
            Destination weddings
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

/* ———————————————————-Services ———————————————————-*/
function ServicesOverview() {
  const [hover, setHover] = useState(0)
  return (
    <section className="bg-paper py-24 lg:py-40" aria-labelledby="services-title">
      <div className="container-x">
        <SectionTitle
          id="services-title"
          eyebrow="What we do"
          title={
            <>
              Our <em>services</em>
            </>
          }
          link="/services"
          linkLabel="Explore services"
        />
        <div className="mt-14 grid gap-14 lg:mt-20 lg:grid-cols-12">
          <ul className="border-t border-line lg:col-span-7">
            {services.map((s, i) => (
              <li key={s.slug} className="border-b border-line">
                <Link
                  to={`/services#${s.slug}`}
                  onMouseEnter={() => setHover(i)}
                  onFocus={() => setHover(i)}
                  className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-7 sm:grid-cols-[4rem_1fr_auto] lg:py-9"
                >
                  <span className="eyebrow text-pink">{String(i + 1).padStart(2, '0')}</span>
                  <span>
                    <span
                      className={`display block text-[1.9rem] transition-all duration-700 ease-[var(--ease-silk)] sm:text-4xl lg:text-5xl ${
                        hover === i ? 'lg:translate-x-3 lg:italic' : ''
                      }`}
                    >
                      {s.title}
                    </span>
                    <span className="mt-2 block max-w-md text-sm leading-relaxed text-taupe lg:hidden">{s.short}</span>
                  </span>
                  <ArrowRight
                    className={`w-8 transition-all duration-500 ${hover === i ? 'lg:translate-x-0 lg:opacity-100' : 'lg:-translate-x-3 lg:opacity-0'}`}
                  />
                </Link>
              </li>
            ))}
          </ul>
          <div className="relative hidden lg:col-span-4 lg:col-start-9 lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] overflow-hidden">
                {services.map((s, i) => (
                  <div
                    key={s.slug}
                    className={`absolute inset-0 transition-[opacity,transform] duration-[1100ms] ease-[var(--ease-silk)] ${
                      hover === i ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
                    }`}
                  >
                    <Photo name={s.image} fill sizes="33vw" alt="" />
                  </div>
                ))}
              </div>
              <p className="mt-6 max-w-sm text-base leading-relaxed text-taupe">{services[hover].short}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ———————————————————-Testimonials (only renders with genuine content) ———————————————————-*/
function GoogleRating() {
  const g = site.google
  if (!g) return null
  return (
    <section className="container-x py-20 text-center lg:py-28" aria-labelledby="rating-title">
      <Reveal>
        <p className="eyebrow text-pink">Loved by our couples</p>
      </Reveal>
      <Reveal delay={100}>
        <div className="mt-7 flex items-center justify-center gap-1.5 text-pink" role="img" aria-label={`${g.rating} out of 5 stars`}>
          {[0, 1, 2, 3, 4].map((i) => (
            <svg key={i} viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
              <path fill="currentColor" d="M12 2.6l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.5 6.1 20.6l1.2-6.5L2.5 9.5l6.6-.9z" />
            </svg>
          ))}
        </div>
      </Reveal>
      <Reveal delay={180}>
        <h2 id="rating-title" className="display mt-6 text-5xl sm:text-6xl lg:text-7xl">
          Rated <em>{g.rating}</em> on Google
        </h2>
      </Reveal>
      <Reveal delay={260}>
        <p className="mx-auto mt-5 max-w-md leading-relaxed text-taupe">
          From {g.reviews} reviews on our Google listing, as of {g.checked}.
        </p>
      </Reveal>
      <Reveal delay={340}>
        <a href={site.mapUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark group mt-9 rounded-full">
          Read the reviews
          <ArrowRight className="w-6 transition-transform duration-500 group-hover:translate-x-1" />
          <span className="sr-only"> on Google (opens in a new tab)</span>
        </a>
      </Reveal>
    </section>
  )
}

function Testimonials() {
  const [i, setI] = useState(0)
  const t = testimonials[i]
  return (
    <section className="py-24 text-center lg:py-40" aria-labelledby="kind-words">
      <div className="container-x max-w-4xl">
        <p id="kind-words" className="eyebrow text-pink">
          Kind words
        </p>
        <blockquote key={i} className="fade-in mt-10">
          <p className="display text-3xl leading-snug italic sm:text-5xl">&ldquo;{t.quote}&rdquo;</p>
          <footer className="mt-10">
            <span className="eyebrow">{t.name}</span>
            {t.detail && <span className="mt-2 block text-sm text-stone">{t.detail}</span>}
          </footer>
        </blockquote>
        {testimonials.length > 1 && (
          <div className="mt-12 flex justify-center gap-3">
            {testimonials.map((_, n) => (
              <button
                key={n}
                type="button"
                onClick={() => setI(n)}
                aria-label={`Testimonial ${n + 1}`}
                aria-current={n === i}
                className="p-2"
              >
                <span className={`block h-1.5 w-1.5 rounded-full ${n === i ? 'bg-pink' : 'bg-line'}`} />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
