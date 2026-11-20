import { useState } from 'react'
import { site, whatsappLink } from '../data/site'
import { ArrowUpRight, Phone, Pin, WhatsApp } from './Icons'

/**
 * Footer map: an embedded Google map beside the studio's address.
 * The map stays "asleep" until clicked, so scrolling the page on a phone or
 * with a mouse wheel never gets stuck inside it. Click once to explore it;
 * moving away puts it back to sleep.
 */
export default function StudioMap() {
  const [active, setActive] = useState(false)
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="container-x pb-16 lg:pb-20" aria-labelledby="map-title">
      <div className="grid overflow-hidden rounded-2xl border border-line bg-white shadow-[0_30px_70px_-45px_rgb(228_0_124/0.55)] lg:grid-cols-12">
        {/* Address panel */}
        <div className="flex flex-col justify-center p-7 sm:p-9 lg:col-span-4">
          <p className="eyebrow text-pink">Visit us</p>
          <h3 id="map-title" className="display mt-4 text-4xl">
            Find the <em>studio</em>
          </h3>
          <div className="mt-6 flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-pink text-white">
              <Pin />
            </span>
            <p className="leading-relaxed text-taupe">
              <span className="block font-medium text-ink">{site.fullName}</span>
              {site.mapLabel}
              <br />
              {site.address}
            </p>
          </div>

          <a href={site.mapUrl} target="_blank" rel="noopener noreferrer" className="btn btn-pink group mt-7 w-full rounded-full">
            Get directions
            <ArrowUpRight className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <span className="sr-only"> in Google Maps (opens in a new tab)</span>
          </a>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <a
              href={site.phoneHref}
              className="flex items-center justify-center gap-2 rounded-full border border-line px-3 py-3 text-sm text-ink transition-colors duration-300 hover:border-pink hover:text-pink"
            >
              <Phone className="h-4 w-4" /> Call
            </a>
            <a
              href={whatsappLink("Hello Wedding Creation! I'd like to visit the studio.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full border border-line px-3 py-3 text-sm text-ink transition-colors duration-300 hover:border-pink hover:text-pink"
            >
              <WhatsApp className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>

        {/* Map */}
        <div
          className="group relative min-h-[300px] bg-sand sm:min-h-[380px] lg:col-span-8"
          onMouseLeave={() => setActive(false)}
        >
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center text-sm text-stone" aria-hidden="true">
              Loading map…
            </div>
          )}
          <iframe
            src={site.mapEmbed}
            title={`Map showing ${site.fullName}, ${site.mapLabel}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            onLoad={() => setLoaded(true)}
            tabIndex={active ? 0 : -1}
            className={`absolute inset-0 h-full w-full border-0 transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'} ${
              active ? '' : 'pointer-events-none'
            }`}
          />
          {!active && (
            <button
              type="button"
              onClick={() => setActive(true)}
              className="absolute inset-0 flex cursor-pointer items-end justify-center bg-pink/0 pb-6 transition-colors duration-500 hover:bg-pink/10"
              aria-label="Explore the map: click to drag and zoom"
            >
              <span className="eyebrow flex items-center gap-3 rounded-full bg-white px-5 py-3 font-medium text-ink shadow-[0_12px_30px_-10px_rgb(23_12_18/0.45)] transition-transform duration-500 group-hover:-translate-y-1">
                <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-pink" />
                </span>
                Tap to explore the map
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
