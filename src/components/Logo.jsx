const BRAND = `${import.meta.env.BASE_URL}brand/`

/** Studio logo -white version over imagery, original colours on light backgrounds. */
export default function Logo({ light = false, className = 'h-12' }) {
  return (
    <span className={`relative block aspect-[1173/452] ${className}`}>
      <img
        src={`${BRAND}logo-white.png`}
        alt=""
        width="1173"
        height="452"
        className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${light ? 'opacity-100' : 'opacity-0'}`}
      />
      <img
        src={`${BRAND}logo-color.png`}
        alt=""
        width="1173"
        height="452"
        className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${light ? 'opacity-0' : 'opacity-100'}`}
      />
      <span className="sr-only">Wedding Creation Pokhara</span>
    </span>
  )
}
