import { useEffect, useRef, useState } from 'react'
import manifest from '../data/media-manifest.json'

// '/' for normal hosting, './' for the self-contained preview build
const MEDIA = `${import.meta.env.BASE_URL}media/`

export const photoMeta = (name) => manifest[name]

export const photoSrcSet = (name) =>
  manifest[name]?.sizes.map((s) => `${MEDIA}${name}-${s}.webp ${s}w`).join(', ')

export const photoSrc = (name, min = 960) => {
  const m = manifest[name]
  if (!m) return ''
  return `${MEDIA}${name}-${m.sizes.find((s) => s >= min) ?? m.sizes.at(-1)}.webp`
}

/**
 * Responsive, lazy-loaded photograph.
 * - Serves WebP at the right width via srcset/sizes
 * - Shows a blurred preview until the full image arrives, then fades in
 * - `aspect` crops to a ratio (e.g. "4/5"); otherwise uses the photo's own
 * - `fill` stretches to the parent (parent must be positioned)
 */
export default function Photo({
  name,
  alt = '',
  sizes = '100vw',
  aspect,
  fill = false,
  priority = false,
  position = 'center',
  className = '',
  imgClassName = '',
}) {
  const m = manifest[name]
  const imgRef = useRef(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth) setLoaded(true)
  }, [name])

  if (!m) {
    if (import.meta.env.DEV) console.warn(`Photo "${name}" not found -run npm run images`)
    return null
  }

  return (
    <div
      className={`relative overflow-hidden bg-sand ${fill ? 'h-full w-full' : ''} ${className}`}
      style={{
        aspectRatio: fill ? undefined : aspect ?? `${m.w} / ${m.h}`,
        backgroundImage: `url(${m.blur})`,
        backgroundSize: 'cover',
        backgroundPosition: position,
      }}
    >
      <img
        ref={imgRef}
        src={photoSrc(name)}
        srcSet={photoSrcSet(name)}
        sizes={sizes}
        alt={alt}
        width={m.w}
        height={m.h}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        draggable="false"
        onLoad={() => setLoaded(true)}
        style={{ objectPosition: position }}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
      />
    </div>
  )
}
