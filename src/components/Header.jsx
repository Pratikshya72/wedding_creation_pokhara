import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { nav, site, whatsappLink } from '../data/site'
import { useScrollLock } from '../hooks/useScrollLock'
import Logo from './Logo'
import { SocialIcon } from './Icons'

// Desktop menu: every page except Home (the logo) and Contact (the Enquire button)
const links = nav.filter((n) => !['/', '/contact'].includes(n.to))

export default function Header() {
  const [solid, setSolid] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const lastY = useRef(0)
  const toggleRef = useRef(null)
  const { pathname } = useLocation()

  useScrollLock(open)

  // Transparent over the hero, solid ivory after scrolling;
  // hides while scrolling down and returns on scroll up.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setSolid(y > 60)
      setHidden(y > 500 && y > lastY.current + 4)
      if (y < lastY.current - 4 || y < 500) setHidden(false)
      lastY.current = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const light = !solid && !open // white text over imagery; colour logo on white header / menu
  const linkCls = ({ isActive }) =>
    `eyebrow link-line transition-colors duration-500 ${light ? 'text-legible text-white hover:text-white' : 'font-medium text-ink hover:text-pink'} ${
      isActive ? (light ? '!text-white' : '!text-pink') : ''
    }`

  return (
    <>
      <a
        href="#main"
        className="eyebrow sr-only z-[80] bg-ink px-4 py-3 text-ivory focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,box-shadow] duration-700 ease-[var(--ease-silk)] ${
          hidden && !open ? '-translate-y-full' : 'translate-y-0'
        } ${solid && !open ? 'bg-white shadow-[0_1px_0_var(--color-line),0_10px_30px_-14px_rgb(23_12_18/0.22)]' : 'bg-transparent'}`}
      >
        {/* soft gradient so the white logo always reads over bright photos */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/60 via-black/25 to-transparent transition-opacity duration-700 ${
            solid || open ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <div
          className={`container-x relative flex items-center justify-between gap-6 transition-[height] duration-700 ${
            solid ? 'h-[72px] lg:h-[84px]' : 'h-[84px] lg:h-[104px]'
          }`}
        >
          {/* Logo, left */}
          <Link to="/" aria-label={`${site.fullName} - home`} className="shrink-0 transition-opacity duration-300 hover:opacity-85">
            <Logo
              light={light}
              className={`transition-[height] duration-700 ${solid ? 'h-11 sm:h-12 lg:h-[3.9rem]' : 'h-12 sm:h-14 lg:h-[4.5rem]'}`}
            />
          </Link>

          {/* Menu + button, right */}
          <div className="flex items-center gap-8 xl:gap-12">
            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-8 xl:gap-11">
                {links.map((n) => (
                  <li key={n.to}>
                    <NavLink to={n.to} className={linkCls}>
                      {n.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
            <Link
              to="/contact"
              className={`btn hidden rounded-full !px-7 !py-3 lg:inline-flex ${light ? 'btn-light' : 'btn-pink'}`}
            >
              Enquire
            </Link>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className={`group -mr-2 flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300 lg:hidden ${
                light ? 'text-white hover:bg-white/15' : 'text-ink hover:bg-paper hover:text-pink'
              }`}
            >
              <span className="relative block h-[18px] w-7" aria-hidden="true">
                <span
                  className={`absolute left-0 h-0.5 w-full rounded-full bg-current transition-all duration-500 ${
                    open ? 'top-2 rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute top-2 left-0 h-0.5 w-full rounded-full bg-current transition-all duration-300 ${
                    open ? 'scale-x-0 opacity-0' : ''
                  }`}
                />
                <span
                  className={`absolute left-0 h-0.5 rounded-full bg-current transition-all duration-500 ${
                    open ? 'top-2 w-full -rotate-45' : 'top-4 w-full'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        inert={open ? undefined : ''}
        className={`fixed inset-0 z-40 flex flex-col bg-ivory text-ink transition-[clip-path] duration-[900ms] ease-[var(--ease-silk)] lg:hidden ${
          open ? '[clip-path:inset(0_0_0_0)]' : 'pointer-events-none [clip-path:inset(0_0_100%_0)]'
        }`}
      >
        <nav aria-label="Mobile" className="container-x flex flex-1 flex-col justify-center pt-24">
          <ul className="space-y-1">
            {nav.map((n, i) => (
              <li key={n.to} className="overflow-hidden">
                <NavLink
                  to={n.to}
                  end={n.to === '/'}
                  className={({ isActive }) =>
                    `flex items-baseline gap-5 py-1.5 transition-[transform,opacity,color] duration-[900ms] ease-[var(--ease-silk)] ${
                      open ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                    } ${isActive ? 'text-pink [&_.display]:italic' : 'text-ink/85 hover:text-pink'}`
                  }
                  style={{ transitionDelay: open ? `${180 + i * 60}ms` : '0ms' }}
                >
                  <span className="eyebrow w-6 text-pink/60">{String(i + 1).padStart(2, '0')}</span>
                  <span className="display text-[2.6rem] sm:text-6xl">{n.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div
          className={`container-x flex flex-wrap items-end justify-between gap-6 border-t border-line bg-paper py-8 transition-opacity delay-500 duration-700 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="space-y-2 text-sm text-taupe">
            <a href={site.phoneHref} className="block hover:text-pink">
              {site.phoneDisplay}
            </a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="block hover:text-pink">
              WhatsApp us
            </a>
          </div>
          <div className="flex gap-5 text-pink">
            {site.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="hover:text-pink-deep">
                <SocialIcon label={s.label} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
