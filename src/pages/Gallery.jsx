import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Photo, { photoMeta } from '../components/Photo'
import { RevealImage, Reveal } from '../components/Reveal'
import Lightbox from '../components/Lightbox'
import { ArrowLeft, ArrowRight } from '../components/Icons'
import { usePageMeta } from '../hooks/usePageMeta'
import { galleries, getGallery } from '../data/galleries'
import { alt } from '../data/photos'
import NotFound from './NotFound'

const isPortrait = (n) => photoMeta(n)?.h > photoMeta(n)?.w

/**
 * Turns a flat list of photos into editorial rows: landscapes alternate
 * between full-width and paired; portraits pair up side by side; a portrait
 * next to a landscape becomes a staggered "offset" row. Full-width images keep
 * their own proportions so the photographer's framing is never cut.
 */
function buildRows(names) {
  const rows = []
  let i = 0
  let wideToggle = 0
  while (i < names.length) {
    const a = names[i]
    const b = names[i + 1]
    if (!isPortrait(a) && (wideToggle++ % 2 === 0 || !b)) {
      rows.push({ type: 'full', items: [a] })
      i += 1
    } else if (b) {
      rows.push({ type: isPortrait(a) === isPortrait(b) ? 'pair' : 'offset', items: [a, b] })
      i += 2
    } else {
      rows.push({ type: 'single', items: [a] })
      i += 1
    }
  }
  return rows
}

function GalleryTile({ name, aspect, sizes, items, onOpen }) {
  const i = items.findIndex((it) => it.name === name)
  return (
    <button
      type="button"
      onClick={() => onOpen(i)}
      className="zoom-frame block w-full cursor-zoom-in"
      aria-label={`View full screen: ${items[i].alt}`}
    >
      <RevealImage delay={(i % 2) * 120}>
        <Photo name={name} aspect={aspect} sizes={sizes} alt={items[i].alt} />
      </RevealImage>
    </button>
  )
}

export default function Gallery() {
  const { slug } = useParams()
  const g = getGallery(slug)
  const [lb, setLb] = useState(null)
  usePageMeta(g ? g.couple || g.title : 'Gallery not found', g?.excerpt)

  if (!g) return <NotFound />

  const idx = galleries.indexOf(g)
  const next = galleries[(idx + 1) % galleries.length]
  const prev = galleries[(idx - 1 + galleries.length) % galleries.length]
  const items = g.gallery.map((name) => ({ name, alt: alt(name) || g.title }))
  const rows = buildRows(g.gallery)
  const tile = { items, onOpen: setLb }

  return (
    <>
      <PageHero
        image={g.cover}
        position={isPortrait(g.cover) ? 'center 25%' : 'center 35%'}
        eyebrow={g.place || 'Portfolio'}
        title={g.couple || g.title}
        intro={g.excerpt}
      />

      <section className="container-x py-20 lg:py-32">
        <div className="mb-14 flex flex-wrap items-center justify-between gap-6 border-b border-line pb-8 lg:mb-20">
          <Link to="/portfolio" className="group eyebrow inline-flex items-center gap-4 text-ink/80 hover:text-pink">
            <ArrowLeft className="w-8 transition-transform duration-500 group-hover:-translate-x-1.5" />
            <span className="link-line">All galleries</span>
          </Link>
          <p className="eyebrow text-pink">{g.gallery.length} photographs</p>
        </div>

        <div className="space-y-4 sm:space-y-8 lg:space-y-12">
          {rows.map((row, r) => {
            if (row.type === 'full') return <GalleryTile {...tile} key={r} name={row.items[0]} sizes="100vw" />
            if (row.type === 'single')
              return (
                <div key={r} className="mx-auto max-w-2xl">
                  <GalleryTile {...tile} name={row.items[0]} sizes="(min-width:1024px) 45vw, 100vw" />
                </div>
              )
            if (row.type === 'pair')
              return (
                <div key={r} className="grid grid-cols-2 items-start gap-4 sm:gap-8 lg:gap-12">
                  {row.items.map((n) => (
                    <GalleryTile {...tile} key={n} name={n} aspect={isPortrait(n) ? '2/3' : '3/2'} sizes="50vw" />
                  ))}
                </div>
              )
            // offset: one portrait (narrow column) + one landscape (wide column),
            // vertically centred; which side the portrait sits on alternates.
            const portrait = isPortrait(row.items[0]) ? row.items[0] : row.items[1]
            const landscape = portrait === row.items[0] ? row.items[1] : row.items[0]
            const portraitLeft = r % 2 === 0
            return (
              <div key={r} className="grid grid-cols-12 items-center gap-4 sm:gap-8 lg:gap-12">
                <div className={`col-span-5 row-start-1 ${portraitLeft ? 'col-start-1' : 'col-start-8'}`}>
                  <GalleryTile {...tile} name={portrait} aspect="2/3" sizes="40vw" />
                </div>
                <div className={`col-span-7 row-start-1 ${portraitLeft ? 'col-start-6' : 'col-start-1'}`}>
                  <GalleryTile {...tile} name={landscape} aspect="3/2" sizes="60vw" />
                </div>
              </div>
            )
          })}
        </div>
        <Lightbox items={items} index={lb} onClose={() => setLb(null)} onIndex={setLb} />
      </section>

      {/* Previous / next gallery */}
      <nav aria-label="More galleries" className="grid border-t border-line md:grid-cols-2">
        {[
          { c: prev, label: 'Previous gallery', align: 'items-start text-left' },
          { c: next, label: 'Next gallery', align: 'items-end text-right' },
        ].map(({ c, label, align }) => (
          <Link key={label} to={`/portfolio/${c.slug}`} className="group relative isolate flex min-h-[46svh] overflow-hidden bg-night text-white">
            <div className="absolute inset-0 -z-10 transition-transform duration-[1600ms] ease-[var(--ease-silk)] group-hover:scale-105">
              <Photo name={c.cover} fill sizes="50vw" position={isPortrait(c.cover) ? 'center 25%' : 'center'} alt="" />
              <div className="absolute inset-0 bg-black/45 transition-colors duration-700 group-hover:bg-black/30" />
            </div>
            <Reveal className={`container-x flex w-full flex-col justify-end gap-4 py-12 ${align}`}>
              <span className="eyebrow inline-flex items-center gap-4 text-white/75">
                {label === 'Previous gallery' && <ArrowLeft className="w-8" />}
                {label}
                {label === 'Next gallery' && <ArrowRight className="w-8" />}
              </span>
              <span className="display text-4xl lg:text-6xl">{c.couple || c.title}</span>
            </Reveal>
          </Link>
        ))}
      </nav>
    </>
  )
}
