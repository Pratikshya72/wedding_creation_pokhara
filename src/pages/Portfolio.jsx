import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Photo from '../components/Photo'
import { Reveal, RevealImage } from '../components/Reveal'
import ContactBand from '../components/ContactBand'
import { usePageMeta } from '../hooks/usePageMeta'
import { galleries } from '../data/galleries'
import { alt } from '../data/photos'

// Editorial rhythm: sizes and offsets cycle so the index never reads as a template grid.
const LAYOUT = [
  { col: 'lg:col-span-7', aspect: '4/3' },
  { col: 'lg:col-span-4 lg:col-start-9 lg:mt-48', aspect: '4/5' },
  { col: 'lg:col-span-5 lg:col-start-2', aspect: '4/5' },
  { col: 'lg:col-span-6 lg:col-start-7 lg:mt-32', aspect: '3/2' },
]

export default function Portfolio() {
  usePageMeta(
    'Portfolio',
    'Wedding, pre-wedding, post-wedding, ritual, haldi and family photography by Wedding Creation Pokhara.',
  )

  return (
    <>
      <PageHero
        image="post-wedding-pokhara-dorje-resort-47-of-57"
        position="center 35%"
        eyebrow="Portfolio"
        title={
          <>
            Love <em>stories</em>
          </>
        }
        intro="Weddings, rituals and the celebrations around them -a selection of our recent photography."
      />

      <section className="container-x py-24 lg:py-36" aria-label="Galleries">
        <div className="grid gap-x-10 gap-y-20 sm:grid-cols-2 lg:grid-cols-12 lg:gap-y-28">
          {galleries.map((g, i) => {
            const l = LAYOUT[i % LAYOUT.length]
            return (
              <article key={g.slug} className={l.col}>
                <Link to={`/portfolio/${g.slug}`} className="group block">
                  <div className="zoom-frame relative">
                    <RevealImage delay={(i % 2) * 120}>
                      <Photo
                        name={g.cover}
                        aspect={l.aspect}
                        sizes="(min-width:1024px) 55vw, (min-width:640px) 50vw, 100vw"
                        alt={alt(g.cover)}
                      />
                    </RevealImage>
                    <span className="eyebrow absolute top-5 left-5 text-white mix-blend-difference">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <Reveal className="mt-7 flex items-start justify-between gap-6">
                    <div>
                      <h2 className="display text-4xl transition-all duration-500 group-hover:italic lg:text-5xl">
                        {g.couple || g.title}
                      </h2>
                      <p className="mt-3 max-w-md leading-relaxed text-taupe">{g.excerpt}</p>
                    </div>
                    <span className="eyebrow shrink-0 pt-3 text-pink">{g.gallery.length} photos</span>
                  </Reveal>
                </Link>
              </article>
            )
          })}
        </div>
      </section>

      <ContactBand image="post-wedding-dsc08405" title="Your story could be next." />
    </>
  )
}
