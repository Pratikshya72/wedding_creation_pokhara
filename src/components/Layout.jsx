import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { WhatsApp } from './Icons'
import { whatsappLink } from '../data/site'

export default function Layout() {
  const { pathname, hash } = useLocation()

  // Start every page at the top, or at the #section when a hash is given
  useEffect(() => {
    if (hash) {
      const t = setTimeout(() => {
        document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 120)
      return () => clearTimeout(t)
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])

  return (
    <>
      <Header />
      <main id="main" key={pathname} className="page-enter" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />

      <a
        href={whatsappLink("Hello Wedding Creation! I'd like to ask about our wedding.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp (opens in a new tab)"
        className="group fixed right-5 bottom-5 z-30 flex h-13 w-13 items-center justify-center rounded-full bg-pink text-white shadow-[0_10px_30px_-8px_rgba(228,0,124,.55)] transition-transform duration-500 hover:scale-105 sm:right-8 sm:bottom-8"
      >
        <WhatsApp className="h-5 w-5" />
      </a>
    </>
  )
}
