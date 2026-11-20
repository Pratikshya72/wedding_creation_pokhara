import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Photo from '../components/Photo'
import { Reveal, RevealImage } from '../components/Reveal'
import ContactBand from '../components/ContactBand'
import { usePageMeta } from '../hooks/usePageMeta'
import { services } from '../data/services'

export default function Services() {
  usePageMeta(
    'Services',
    'Wedding photography, wedding cinematography, pre-wedding shoots, destination weddings and reception coverage in Pokhara and across Nepal.',
  )

  return (
    <>
      <PageHero
        image="pre-wedding-shoots-dsc02574"
        position="center 35%"
        eyebrow="Services"
        title={
          <>
            What we <em>create</em>
          </>
        }
        intro="Photography and film for every part of your celebration. Every wedding is different, so coverage is shaped around yours."
      />

      {/* Index of services */}
      <nav aria-label="Services on this page" className="border-b border-line">
        <ul className="container-x no-scrollbar flex gap-8 overflow-x-auto py-6 whitespace-nowrap lg:justify-center lg:gap-12">
          {services.map((s) => (
            <li key={s.slug}>
              <a href={`#${s.slug}`} className="eyebrow link-line text-taupe hover:text-ink">
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="container-x py-12 lg:py-20">
        {services.map((s, i) => {
          const flip = i % 2 === 1
          return (
            <section
              key={s.slug}
              id={s.slug}
              aria-labelledby={`${s.slug}-title`}
              className="grid scroll-mt-24 items-center gap-10 py-16 lg:grid-cols-12 lg:gap-12 lg:py-24"
            >
              <div className={`lg:col-span-6 ${flip ? 'lg:order-2 lg:col-start-7' : ''}`}>
                <RevealImage>
                  <Photo
                    name={s.image}
                    aspect={i % 3 === 1 ? '4/5' : '5/4'}
                    sizes="(min-width:1024px) 50vw, 100vw"
                    alt=""
                    position="center 35%"
                  />
                </RevealImage>
              </div>
              <div className={`lg:col-span-5 ${flip ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-8'}`}>
                <Reveal>
                  <p className="eyebrow text-pink">{String(i + 1).padStart(2, '0')}</p>
                </Reveal>
                <Reveal delay={100}>
                  <h2 id={`${s.slug}-title`} className="display mt-5 text-5xl lg:text-6xl">
                    {s.title}
                  </h2>
                </Reveal>
                <Reveal delay={180}>
                  <p className="mt-6 font-serif text-2xl leading-snug font-light text-ink italic">{s.short}</p>
                </Reveal>
                <Reveal delay={240}>
                  <p className="mt-5 leading-relaxed text-taupe">{s.body}</p>
                </Reveal>
                <Reveal delay={300}>
                  <ul className="mt-8 border-t border-line">
                    {s.covers.map((c) => (
                      <li key={c} className="flex items-center gap-4 border-b border-line py-3.5 text-[0.95rem] text-taupe">
                        <span className="h-px w-4 bg-pink" aria-hidden="true" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </Reveal>
                <Reveal delay={360}>
                  <Link
                    to={`/contact?service=${encodeURIComponent(s.title)}`}
                    className="btn btn-dark mt-10"
                  >
                    Enquire about this
                  </Link>
                </Reveal>
              </div>
            </section>
          )
        })}
      </div>

      <section className="bg-paper py-20 text-center lg:py-28">
        <div className="container-x max-w-3xl">
          <Reveal>
            <p className="eyebrow text-pink">Packages</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="display mt-6 text-4xl sm:text-5xl">
              Coverage tailored <em>to your celebration</em>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mx-auto mt-6 max-w-xl leading-relaxed text-taupe">
              Tell us about your date, venue and the events you&rsquo;re planning, and we&rsquo;ll recommend coverage and share
              pricing that fits.
            </p>
          </Reveal>
        </div>
      </section>

      <ContactBand image="engagement-img-8300" />
    </>
  )
}
