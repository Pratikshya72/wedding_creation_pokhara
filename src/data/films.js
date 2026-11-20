/**
 * Wedding films.
 *
 * No videos have been supplied yet, so each film shows one of the studio's own
 * photographs as its poster and plays a "coming soon" panel.
 * To publish a film, fill in ONE of:
 *   youtube: 'VIDEO_ID'        (the part after watch?v=)
 *   vimeo:   'VIDEO_ID'
 *   src:     '/films/my-film.mp4'  (file placed in /public/films)
 * then set `sample: false` and give it a real title.
 */
export const films = [
  { id: 'film-01', sample: true, title: 'Wedding Film', kind: 'Wedding Film', poster: 'weddings-dsc07117', youtube: '', vimeo: '', src: '' },
  { id: 'film-02', sample: true, title: 'Pre-Wedding Film', kind: 'Pre-Wedding', poster: 'pre-wedding-shoots-dsc01900', youtube: '', vimeo: '', src: '' },
  { id: 'film-03', sample: true, title: 'By the Lake', kind: 'Post-Wedding', poster: 'post-wedding-postwedd-88-of-224', youtube: '', vimeo: '', src: '' },
  { id: 'film-04', sample: true, title: 'Rituals & Blessings', kind: 'Ceremony Film', poster: 'rituals-and-ceremony-dsc05547', youtube: '', vimeo: '', src: '' },
  { id: 'film-05', sample: true, title: 'Into the Hills', kind: 'Pre-Wedding', poster: 'pre-wedding-shoots-1c7a2272', youtube: '', vimeo: '', src: '' },
]

export const hasVideo = (f) => Boolean(f.youtube || f.vimeo || f.src)
