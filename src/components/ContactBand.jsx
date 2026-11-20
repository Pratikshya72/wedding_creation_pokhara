import { Link } from 'react-router-dom'
import Photo from './Photo'
import { Reveal } from './Reveal'
import { whatsappLink } from '../data/site'

/** Full-bleed booking call-to-action. */
export default function ContactBand({ image = 'pre-wedding-shoots-dsc01900', title = 'Your story, beautifully told.' }) {
  return (
    <section className="relative isolate overflow-hidden bg-night text-white" aria-labelledby="cta-title">
      <div className="absolute inset-0 -z-10">
        <Photo name={image} fill sizes="100vw" position="center 30%" />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="container-x flex min-h-[80svh] flex-col items-center justify-center py-28 text-center">
        <Reveal>
          <p className="eyebrow text-white/75">Enquiries</p>
        </Reveal>
        <Reveal delay={120}>
          <h2 id="cta-title" className="display mt-6 max-w-4xl text-5xl sm:text-7xl lg:text-[6.5rem]">
            {title}
          </h2>
        </Reveal>
        <Reveal delay={240}>
          <p className="mx-auto mt-7 max-w-lg text-base leading-relaxed text-white/80 sm:text-lg">
            Share your date and plans with us -we&rsquo;ll reply personally with availability and how we can capture your day.
          </p>
        </Reveal>
        <Reveal delay={360} className="mt-11 flex flex-col gap-4 sm:flex-row">
          <Link to="/contact" className="btn btn-pink">
            Check your date
          </Link>
          <a href={whatsappLink("Hello Wedding Creation! I'd like to ask about our wedding.")} target="_blank" rel="noopener noreferrer" className="btn btn-light !border-white/30">
            Chat on WhatsApp
          </a>
        </Reveal>
      </div>
    </section>
  )
}
