import Photo from './Photo'

/** A film's poster: its own video thumbnail (`posterUrl`) or one of the studio's photos. */
export default function FilmPoster({ film, aspect, fill = false, className = '', imgClassName = '', sizes, priority, position = 'center' }) {
  if (!film.posterUrl) {
    return <Photo name={film.poster} aspect={aspect} fill={fill} className={className} imgClassName={imgClassName} sizes={sizes} priority={priority} position={position} alt="" />
  }
  return (
    <div className={`relative overflow-hidden bg-night ${fill ? 'h-full w-full' : ''} ${className}`} style={{ aspectRatio: fill ? undefined : aspect }}>
      <img
        src={`${import.meta.env.BASE_URL}${film.posterUrl}`}
        alt=""
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        draggable="false"
        style={{ objectPosition: position }}
        className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`}
      />
    </div>
  )
}
