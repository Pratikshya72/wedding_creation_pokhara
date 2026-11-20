import { Link } from 'react-router-dom'
import { nav, site, whatsappLink } from '../data/site'
import { alt } from '../data/photos'
import Logo from './Logo'
import Photo from './Photo'
import StudioMap from './StudioMap'
import { ArrowRight, ArrowUp, ArrowUpRight, Instagram, Mail, Phone, Pin, SocialIcon, WhatsApp } from './Icons'

// A strip of the studio's own photos that leads to Instagram.
const STRIP = [
  'post-wedding-postwed-27',
  'weddings-dsc00604',
  'pre-wedding-shoots-dsc03441',
  'haldi-mehendi-1c7a0514',
  'post-wedding-dsc08414',
  'rituals-and-ceremony-dsc07947',
]

const instagram = site.socials.find((s) => s.label === 'Instagram')

/** Small pink icon disc used for contact rows. */
const IconDot = ({ children }) => (
  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-pink shadow-[0_1px_0_var(--color-line)] transition-all duration-500 group-hover:bg-pink group-hover:text-white">
    {children}
  </span>
)

export default function Footer() {
  const contact = [
    { icon: <Pin />, label: 'Studio', value: site.address, href: site.mapUrl, external: true },
    { icon: <Phone />, label: 'Call', value: site.phoneDisplay, href: site.phoneHref },
    { icon: <WhatsApp className="h-[18px] w-[18px]" />, label: 'WhatsApp', value: 'Message us', href: whatsappLink(), external: true },
    site.email && { icon: <Mail />, label: 'Email', value: site.email, href: `mailto:${site.email}` },
  ].filter(Boolean)

  return (
    <footer className="bg-paper text-ink" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      {/* ——— Call to action ——— */}
      <div className="container-x border-b border-line py-20 text-center lg:py-28">
        <p className="eyebrow text-pink">Now booking weddings</p>
        <Link
          to="/contact"
          className="group mx-auto mt-6 inline-flex flex-col items-center gap-6 sm:flex-row sm:gap-8"
        >
          <span className="display text-5xl sm:text-7xl lg:text-8xl">
            Let&rsquo;s talk about <em>your day</em>
          </span>
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-pink text-pink transition-all duration-700 group-hover:scale-110 group-hover:bg-pink group-hover:text-white">
            <ArrowRight className="w-6 transition-transform duration-500 group-hover:translate-x-0.5" />
          </span>
        </Link>
      </div>

      {/* ——— Instagram photo strip ——— */}
      {instagram && (
        <div className="border-b border-line">
          <a
            href={instagram.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group/strip block"
            aria-label={`See more of our work on Instagram, ${instagram.handle} (opens in a new tab)`}
          >
            <div className="grid grid-cols-3 sm:grid-cols-6">
              {STRIP.map((name, i) => (
                <div key={name} className={`zoom-frame group relative overflow-hidden ${i > 2 ? 'max-sm:hidden' : ''}`}>
                  <Photo name={name} aspect="1/1" sizes="(min-width:640px) 17vw, 34vw" alt={alt(name)} position="center 30%" />
                  <span className="absolute inset-0 flex items-center justify-center bg-pink/0 text-white opacity-0 transition-all duration-500 group-hover:bg-pink/45 group-hover:opacity-100">
                    <Instagram className="h-7 w-7" />
                  </span>
                </div>
              ))}
            </div>
            <div className="container-x flex items-center justify-center gap-3 py-5 text-center">
              <Instagram className="text-pink" />
              <span className="eyebrow text-ink">
                Follow <span className="text-pink">{instagram.handle}</span>
              </span>
              <ArrowUpRight className="text-pink transition-transform duration-500 group-hover/strip:translate-x-1 group-hover/strip:-translate-y-1" />
            </div>
          </a>
        </div>
      )}

      {/* ——— Columns ——— */}
      <div className="container-x grid gap-14 py-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-10 lg:py-20">
        {/* Brand */}
        <div className="lg:col-span-3">
          <Link to="/" aria-label={`${site.fullName} — home`} className="inline-block transition-opacity hover:opacity-80">
            <Logo className="h-20" />
          </Link>
          <p className="mt-6 max-w-xs font-serif text-xl font-light text-taupe italic">{site.bio}.</p>
          <div className="mt-8 flex gap-3">
            {site.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${s.label} (opens in a new tab)`}
                title={s.label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-pink/40 text-pink transition-all duration-500 hover:-translate-y-1 hover:border-pink hover:bg-pink hover:text-white hover:shadow-[0_10px_20px_-8px_rgb(228_0_124/0.6)]"
              >
                <SocialIcon label={s.label} />
              </a>
            ))}
          </div>
        </div>

        {/* Explore */}
        <nav aria-label="Footer" className="lg:col-span-2">
          <p className="eyebrow mb-6 text-pink">Explore</p>
          <ul className="space-y-1 text-[0.95rem]">
            {nav.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="group inline-flex items-center py-2 text-taupe transition-colors duration-300 hover:text-pink">
                  <ArrowRight className="mr-0 w-0 opacity-0 transition-all duration-500 group-hover:mr-2 group-hover:w-5 group-hover:opacity-100" />
                  <span className="transition-transform duration-500">{n.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div className="lg:col-span-3">
          <p className="eyebrow mb-6 text-pink">Get in touch</p>
          <ul className="space-y-4">
            {contact.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex items-center gap-4"
                >
                  <IconDot>{c.icon}</IconDot>
                  <span className="min-w-0">
                    <span className="block text-[0.65rem] tracking-[0.25em] text-stone uppercase">{c.label}</span>
                    <span className="block break-words text-[0.95rem] text-ink transition-colors duration-300 group-hover:text-pink">
                      {c.value}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Follow */}
        <div className="lg:col-span-4">
          <p className="eyebrow mb-6 text-pink">Follow</p>
          <ul className="space-y-2">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-sm px-3 py-2.5 -mx-3 transition-all duration-500 hover:bg-white hover:shadow-[0_8px_24px_-14px_rgb(23_12_18/0.35)]"
                >
                  <IconDot>
                    <SocialIcon label={s.label} />
                  </IconDot>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[0.95rem] text-ink">{s.label}</span>
                    <span className="block truncate text-xs text-stone">{s.handle}</span>
                  </span>
                  <ArrowUpRight className="shrink-0 text-pink opacity-0 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Map */}
      <StudioMap />

      {/* ——— Bottom bar ——— */}
      <div className="border-t border-line">
        <div className="container-x flex flex-col items-start gap-4 py-6 text-xs tracking-wide text-stone sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.fullName}. All rights reserved.
          </p>
          <p className="hidden md:block">Wedding Photography &amp; Films · Pokhara, Nepal</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group eyebrow inline-flex items-center gap-3 text-ink transition-colors hover:text-pink sm:mr-20"
          >
            Back to top
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-pink/40 text-pink transition-all duration-500 group-hover:-translate-y-1 group-hover:bg-pink group-hover:text-white">
              <ArrowUp />
            </span>
          </button>
        </div>
      </div>
    </footer>
  )
}
