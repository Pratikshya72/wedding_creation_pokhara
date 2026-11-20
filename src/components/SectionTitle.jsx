import { Link } from 'react-router-dom'
import { Reveal } from './Reveal'
import { ArrowRight } from './Icons'

/** Section heading row: eyebrow + serif title, with optional link aligned right. */
export default function SectionTitle({ eyebrow, title, link, linkLabel, light = false, id, className = '' }) {
  return (
    <div className={`flex flex-col gap-8 md:flex-row md:items-end md:justify-between ${className}`}>
      <div>
        <Reveal>
          <p className={`eyebrow ${light ? 'text-white/55' : 'text-stone'}`}>{eyebrow}</p>
        </Reveal>
        <Reveal delay={100}>
          <h2 id={id} className="display mt-5 text-5xl sm:text-6xl lg:text-7xl">
            {title}
          </h2>
        </Reveal>
      </div>
      {link && (
        <Reveal delay={200}>
          <Link
            to={link}
            className={`group eyebrow inline-flex items-center gap-4 ${light ? 'text-white/80 hover:text-white' : 'text-ink/80 hover:text-ink'}`}
          >
            <span className="link-line">{linkLabel}</span>
            <ArrowRight className="w-8 transition-transform duration-500 group-hover:translate-x-1.5" />
          </Link>
        </Reveal>
      )}
    </div>
  )
}
