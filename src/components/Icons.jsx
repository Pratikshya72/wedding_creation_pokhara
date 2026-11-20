const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.2, strokeLinecap: 'round', strokeLinejoin: 'round' }

export const ArrowRight = (p) => (
  <svg viewBox="0 0 32 12" width="32" height="12" aria-hidden="true" {...base} {...p}>
    <path d="M0 6h31M26 1l5 5-5 5" />
  </svg>
)
export const ArrowLeft = (p) => (
  <svg viewBox="0 0 32 12" width="32" height="12" aria-hidden="true" {...base} {...p}>
    <path d="M32 6H1M6 1L1 6l5 5" />
  </svg>
)
export const Close = (p) => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" {...base} {...p}>
    <path d="M4 4l16 16M20 4L4 20" />
  </svg>
)
export const Play = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...p}>
    <path d="M7 4.5v15l12.5-7.5z" fill="currentColor" />
  </svg>
)
export const Instagram = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...base} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.3" cy="6.7" r=".6" fill="currentColor" />
  </svg>
)
export const Facebook = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...base} {...p}>
    <path d="M14.5 8H16V4.5h-2.3C11 4.5 10 6.2 10 8.6V11H8v3.3h2V21h3.4v-6.7h2.4L16.3 11h-2.9V9.2c0-.8.3-1.2 1.1-1.2z" />
  </svg>
)
export const WhatsApp = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" {...p}>
    <path
      fill="currentColor"
      d="M12 2.2a9.7 9.7 0 0 0-8.4 14.6L2.3 21.8l5.1-1.3A9.7 9.7 0 1 0 12 2.2zm0 17.7a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 19.9zm4.4-6c-.2-.1-1.4-.7-1.7-.8s-.4-.1-.5.1-.6.8-.8.9-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.2 11.2 0 0 0 4.3 3.8c1.6.7 2.2.7 3 .6a2.6 2.6 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .2-1.2c-.1-.2-.3-.2-.6-.4z"
    />
  </svg>
)
export const Phone = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...base} {...p}>
    <path d="M5 3.5h3.2l1.6 4.3-2.2 1.4a11 11 0 0 0 5.2 5.2l1.4-2.2 4.3 1.6V17a2.5 2.5 0 0 1-2.7 2.5A15.6 15.6 0 0 1 2.5 6.2 2.5 2.5 0 0 1 5 3.5z" />
  </svg>
)
export const Pin = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...base} {...p}>
    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
)
export const Mail = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="1" />
    <path d="M3.5 6l8.5 7 8.5-7" />
  </svg>
)

export const TikTok = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...p}>
    <path
      fill="currentColor"
      d="M16.6 3c.3 2.2 1.6 3.6 3.9 3.8v2.6c-1.4.1-2.6-.3-3.9-1.1v5.6c0 6.4-6.9 8.4-9.7 3.8-1.8-3-.7-8.2 5.1-8.4v2.8c-.4.1-.9.2-1.3.3-1.3.4-2 1.3-1.8 2.8.4 2.8 5.4 3.6 5-1.8V3h2.7z"
    />
  </svg>
)

export const ArrowUpRight = (p) => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" {...base} {...p}>
    <path d="M7 17L17 7M8 7h9v9" />
  </svg>
)
export const ArrowUp = (p) => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" {...base} {...p}>
    <path d="M12 20V4M6 10l6-6 6 6" />
  </svg>
)

/** Icon for a social profile by its label (Instagram, Facebook, TikTok). */
export const SocialIcon = ({ label, ...p }) =>
  label === 'Instagram' ? <Instagram {...p} /> : label === 'TikTok' ? <TikTok {...p} /> : <Facebook {...p} />

export const User = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...base} {...p}>
    <circle cx="12" cy="8" r="3.6" />
    <path d="M4.5 20c.8-3.6 3.8-5.5 7.5-5.5s6.700 1.900 7.500 5.500" />
  </svg>
)
export const Calendar = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...base} {...p}>
    <rect x="3.5" y="5" width="17" height="15" rx="2" />
    <path d="M3.500 10h17M8 3v4M16 3v4" />
  </svg>
)
export const Check = (p) => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" {...base} strokeWidth="2" {...p}>
    <path d="M5 12.500l4.500 4.500L19 7.500" />
  </svg>
)
