import { Link } from 'react-router-dom'
import Photo from '../components/Photo'
import { usePageMeta } from '../hooks/usePageMeta'

export default function NotFound() {
  usePageMeta('Page not found')
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-night text-center text-white">
      <div className="absolute inset-0 opacity-40">
        <Photo name="pre-wedding-shoots-dsc01878" fill sizes="100vw" alt="" />
      </div>
      <div className="container-x relative">
        <p className="eyebrow text-white/60">404</p>
        <h1 className="display mt-6 text-6xl sm:text-8xl">
          This moment <em>slipped away</em>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-white/75">The page you were looking for doesn&rsquo;t exist or has moved.</p>
        <Link to="/" className="btn btn-light mt-10">
          Back to home
        </Link>
      </div>
    </section>
  )
}
