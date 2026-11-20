/** Small honest label shown on placeholder content until real work is added. */
export default function SampleNote({ className = '', light = false }) {
  return (
    <span
      className={`eyebrow inline-flex items-center gap-2 !text-[0.6rem] ${light ? 'text-white/60' : 'text-stone'} ${className}`}
      title="Temporary sample content -to be replaced with the studio's own work"
    >
      <span className="h-1 w-1 rounded-full bg-pink" aria-hidden="true" />
      Sample
    </span>
  )
}
