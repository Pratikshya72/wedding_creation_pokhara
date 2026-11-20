import Photo from './Photo'

/** Large photographic page header used on inner pages. */
export default function PageHero({ image, eyebrow, title, intro, position = 'center', height = 'tall' }) {
  return (
    <section
      className={`relative flex items-end overflow-hidden bg-night text-white ${
        height === 'tall' ? 'min-h-[78svh]' : 'min-h-[62svh]'
      }`}
    >
      <div className="absolute inset-0">
        <Photo name={image} fill priority position={position} sizes="100vw" imgClassName="kenburns" />
        <div className="hero-scrim absolute inset-0" />
      </div>
      <div className="text-legible container-x relative pt-40 pb-16 lg:pb-24">
        <p className="eyebrow fade-in font-medium text-white" style={{ '--delay': '200ms' }}>
          {eyebrow}
        </p>
        <h1 className="display mt-5 max-w-5xl overflow-hidden pb-2 text-[3.3rem] sm:text-7xl lg:text-[7.5rem]">
          <span className="rise" style={{ '--delay': '300ms' }}>
            {title}
          </span>
        </h1>
        {intro && (
          <p className="fade-in mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg" style={{ '--delay': '700ms' }}>
            {intro}
          </p>
        )}
      </div>
    </section>
  )
}
