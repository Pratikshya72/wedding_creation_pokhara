/**
 * Studio details -the single source of truth for contact info.
 * Everything here comes from details supplied by the studio or its public
 * Instagram profile. Edit this file to update the whole site.
 */
const phoneDigits = '9779806601817'

export const site = {
  name: 'Wedding Creation',
  fullName: 'Wedding Creation Pokhara',
  // From the studio's Instagram bio
  bio: "Pokhara's favourite wedding filmer",

  phoneDisplay: '+977 980 660 1817',
  phoneHref: `tel:+${phoneDigits}`,
  whatsappNumber: phoneDigits,

  // ⚠ The supplied email read "pokharaweddingandevents.com" (no "@").
  // Please confirm the correct address. Until then it is left empty and
  // the site hides every email link automatically.
  email: 'weddingcreationpokhara@gmail.com',

  address: 'Zero Km-05, Pokhara, Nepal',
  // Google Maps pin supplied by the studio
  mapUrl: 'https://maps.app.goo.gl/HUELP8us3VX7UTyz8',
  mapLabel: 'Sugam Marg, Pokhara',
  mapEmbed: 'https://www.google.com/maps?q=Wedding+Creation+Pokhara,+Sugam+Marg,+Pokhara&ll=28.2119023,83.9745411&z=17&output=embed',

  // Rating shown on the studio's Google listing. Update when it changes.
  google: { rating: '4.9', reviews: 186, checked: 'November 2026' },

  socials: [
    { label: 'Instagram', handle: '@wedding_creation_pokhara', href: 'https://www.instagram.com/wedding_creation_pokhara/' },
    { label: 'Facebook', handle: 'weddingcreationpokhara', href: 'https://www.facebook.com/weddingcreationpokhara' },
    { label: 'YouTube', handle: '@weddingcreationpokhara', href: 'https://www.youtube.com/@weddingcreationpokhara' },
    { label: 'TikTok', handle: '@wedding_creation_pokhara', href: 'https://www.tiktok.com/@wedding_creation_pokhara' },
  ],

  /**
   * Optional form backend (e.g. a Formspree / Getform endpoint URL).
   * When empty, enquiries are handed over to WhatsApp, pre-filled.
   */
  // FormSubmit forwards each enquiry to this inbox (activated once by email).
  formEndpoint: 'https://formsubmit.co/ajax/weddingcreationpokhara@gmail.com',

  /** Optional hero showreel (an .mp4 in /public). Leave empty to use the photo slideshow. */
  heroVideo: '',
}

export const whatsappLink = (text = '') =>
  `https://wa.me/${site.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ''}`

export const nav = [
  { to: '/', label: 'Home' },
  { to: '/our-story', label: 'Our Story' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/films', label: 'Films' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
]
