import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Photo from '../components/Photo'
import { Reveal, RevealImage } from '../components/Reveal'
import ContactBand from '../components/ContactBand'
import { usePageMeta } from '../hooks/usePageMeta'
import { site } from '../data/site'
import { team } from '../data/team'

const PRINCIPLES = [
  {
    title: 'Real moments first',
    body: 'We step back and let your day unfold. The best images happen when nobody is performing for the camera.',
  },
  {
    title: 'Composed with care',
    body: 'Light, frame and timing matter. We look for the quiet beauty in every scene, from ritual to reception.',
  },
  {
    title: 'Made to last',
    body: 'We edit for the long view -natural colour and honest skin tones that will still feel right years from now.',
  },
]

const PROCESS = [
  { step: 'Enquire', body: 'Tell us your date, venue and what you have in mind.' },
  { step: 'Meet', body: 'We talk through your plans, traditions and the moments that matter most.' },
  { step: 'Plan', body: 'Timelines, locations and coverage are shaped around your day.' },
  { step: 'Celebrate', body: 'We work quietly alongside you, from the first ritual to the last dance.' },
  { step: 'Relive', body: 'Your photographs and films are carefully edited and delivered to keep forever.' },
]

export default function OurStory() {
  usePageMeta(
    'Our Story',
    'Meet Wedding Creation Pokhara -a wedding photography and film studio from Pokhara, Nepal. Our philosophy, our team and how we work.',
  )

  return (
    <>
      <PageHero
        image="pre-wedding-shoots-1c7a2272"
        position="center 35%"
        eyebrow="Our story"
        title={
          <>
            Made in <em>Pokhara</em>
          </>
        }
      />

      {/* Introduction */}
      <section className="container-x grid gap-14 py-24 lg:grid-cols-12 lg:py-40" aria-labelledby="who-title">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow text-pink">Who we are</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 id="who-title" className="display mt-6 text-5xl lg:text-7xl">
              A studio for <em>photographs &amp; films</em>
            </h2>
          </Reveal>
        </div>
        <div className="space-y-6 text-lg leading-relaxed text-taupe lg:col-span-6 lg:col-start-7 lg:pt-14">
          <Reveal>
            <p className="font-serif text-[1.7rem] leading-snug font-light text-ink">
              Wedding Creation is a wedding photography and cinematography studio based in Pokhara, Nepal.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <p>
              We document weddings from the first preparations to the farewell -the rituals, the portraits, the families
              and the celebrations around them -in photographs and in film.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p>
              On Instagram we call ourselves <em className="text-ink">&ldquo;{site.bio}&rdquo;</em> -cinematography is
              at the heart of our work, alongside photography that is calm, considered and true to the day.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Editorial photo pair */}
      <section className="container-x grid grid-cols-12 gap-3 sm:gap-6" aria-hidden="true">
        <div className="col-span-7 lg:col-span-6">
          <RevealImage>
            <Photo name="weddings-dsc07123" aspect="4/3" sizes="(min-width:1024px) 50vw, 60vw" />
          </RevealImage>
        </div>
        <div className="col-span-5 mt-16 lg:col-span-4 lg:col-start-8 lg:mt-40">
          <RevealImage delay={150}>
            <Photo name="pre-wedding-shoots-dsc01852" aspect="3/4" sizes="(min-width:1024px) 33vw, 40vw" />
          </RevealImage>
        </div>
      </section>

      {/* Philosophy */}
      <section className="container-x py-24 lg:py-40" aria-labelledby="philosophy-title">
        <div className="max-w-3xl">
          <Reveal>
            <p className="eyebrow text-pink">Philosophy</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 id="philosophy-title" className="display mt-6 text-5xl lg:text-7xl">
              Feel first, <em>then frame</em>
            </h2>
          </Reveal>
        </div>
        <div className="mt-16 grid gap-12 border-t border-line pt-12 md:grid-cols-3 lg:mt-20 lg:gap-16">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.title} delay={i * 120}>
              <p className="eyebrow text-pink">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-5 font-serif text-3xl font-light italic">{p.title}</h3>
              <p className="mt-4 leading-relaxed text-taupe">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="bg-paper py-24 lg:py-40" aria-labelledby="team-title">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Reveal>
                <p className="eyebrow text-pink">The team</p>
              </Reveal>
              <Reveal delay={100}>
                <h2 id="team-title" className="display mt-6 text-5xl lg:text-7xl">
                  The people <em>behind the lens</em>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={200} className="lg:col-span-5 lg:col-start-8 lg:pt-16">
              <p className="text-lg leading-relaxed text-taupe">
                Photographers, cinematographers and editors working together, so that every part of your day is covered —
                and every frame is finished with care.
              </p>
            </Reveal>
          </div>
          <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
            {team.map((m, i) => (
              <Reveal key={m.role} delay={i * 120}>
                <figure>
                  <div className="relative overflow-hidden">
                    <Photo name={m.photo} aspect="4/5" sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" alt={m.name ? `Portrait of ${m.name}` : ''} />
                  </div>
                  <figcaption className="mt-6">
                    {m.name && <p className="font-serif text-3xl font-light">{m.name}</p>}
                    <p className={`eyebrow ${m.name ? 'mt-2 text-stone' : 'font-serif !text-3xl !tracking-normal !normal-case italic'}`}>
                      {m.role}
                    </p>
                    <p className="mt-3 leading-relaxed text-taupe">{m.body}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Approach / process */}
      <section className="container-x py-24 lg:py-40" aria-labelledby="approach-title">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <p className="eyebrow text-pink">Creative approach</p>
              </Reveal>
              <Reveal delay={100}>
                <h2 id="approach-title" className="display mt-6 text-5xl lg:text-6xl">
                  How we <em>work together</em>
                </h2>
              </Reveal>
              <Reveal delay={200}>
                <p className="mt-6 leading-relaxed text-taupe">
                  From weddings to receptions, pre-wedding, post-wedding and indoor shoots -every celebration is planned with
                  the same attention.
                </p>
              </Reveal>
              <Reveal delay={300}>
                <Link to="/services" className="btn btn-dark mt-10">
                  Our services
                </Link>
              </Reveal>
            </div>
          </div>
          <ol className="lg:col-span-7 lg:col-start-6">
            {PROCESS.map((p, i) => (
              <Reveal as="li" key={p.step} delay={i * 80} className="grid grid-cols-[3.5rem_1fr] gap-4 border-b border-line py-9 first:border-t sm:grid-cols-[5rem_1fr]">
                <span className="display text-4xl text-stone/70 italic">{i + 1}</span>
                <div>
                  <h3 className="display text-4xl">{p.step}</h3>
                  <p className="mt-3 max-w-md leading-relaxed text-taupe">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <ContactBand image="pre-wedding-shoots-dsc02585" title="We’d love to hear your story." />
    </>
  )
}
