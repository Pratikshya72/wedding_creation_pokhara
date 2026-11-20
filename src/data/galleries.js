/**
 * Portfolio galleries -one per folder in /photos.
 * Every photo here is the studio's own work. Couples are not named because
 * their names and permission were not supplied; to turn a gallery into a named
 * couple story, add `couple: 'Name & Name'` and `place: '…'`.
 *
 * `cover` is the gallery's lead image; `gallery` is the display order.
 */
export const galleries = [
  {
    slug: 'weddings',
    title: 'Weddings',
    excerpt: 'Garlands, vows and the colour of a Nepali wedding day.',
    cover: 'weddings-dsc07117',
    gallery: [
      'weddings-dsc07117',
      'weddings-dsc06848',
      'weddings-dsc06816',
      'weddings-dsc00604',
      'weddings-dsc00836',
      'rituals-and-ceremony-dsc07947',
      'weddings-dsc07123',
      'weddings-dsc07314',
      'weddings-dsc07536',
      'weddings-dsc00180',
      'weddings-dsc00028',
    ],
  },
  {
    slug: 'pre-wedding',
    title: 'Pre-Wedding',
    excerpt: 'Misty hillsides, stone lodges and evening light, before the big day.',
    cover: 'pre-wedding-shoots-1c7a2272',
    gallery: [
      'pre-wedding-shoots-1c7a2272',
      'pre-wedding-shoots-dsc03441',
      'pre-wedding-shoots-1c7a2202',
      'pre-wedding-shoots-dsc02574',
      'pre-wedding-shoots-dsc01878',
      'pre-wedding-shoots-dsc01852',
      'pre-wedding-shoots-dsc01868',
      'pre-wedding-shoots-dsc01900',
      'pre-wedding-shoots-dsc02585',
      'pre-wedding-shoots-1c7a9349',
    ],
  },
  {
    slug: 'post-wedding',
    title: 'Post-Wedding',
    excerpt: 'Back in wedding clothes, with time to spare, by the lake.',
    cover: 'post-wedding-postwed-27',
    gallery: [
      'post-wedding-postwed-27',
      'post-wedding-dsc08405',
      'post-wedding-dsc08414',
      'post-wedding-pokhara-dorje-resort-47-of-57',
      'post-wedding-dsc01296',
      'post-wedding-dsc01348',
      'post-wedding-postwedd-88-of-224',
      'post-wedding-dsc01371',
    ],
  },
  {
    slug: 'rituals-and-ceremonies',
    title: 'Rituals & Ceremonies',
    excerpt: 'Family, blessings and the traditions that hold a celebration together.',
    cover: 'rituals-and-ceremony-dsc05554',
    gallery: [
      'rituals-and-ceremony-dsc05547',
      'rituals-and-ceremony-dsc05554',
      'rituals-and-ceremony-dsc05582',
      'rituals-and-ceremony-dsc05564',
      'rituals-and-ceremony-dsc05635',
    ],
  },
  {
    slug: 'haldi-and-mehendi',
    title: 'Haldi & Mehendi',
    excerpt: 'Yellow drapes, fresh henna and the laughter before the wedding.',
    cover: 'haldi-mehendi-1c7a0514',
    gallery: ['haldi-mehendi-1c7a0514', 'haldi-mehendi-dsc00427', 'haldi-mehendi-dsc00438', 'dsc00010'],
  },
  {
    slug: 'engagement-and-reception',
    title: 'Engagement & Reception',
    excerpt: 'Portraits from engagements and receptions.',
    cover: 'engagement-img-8300',
    gallery: ['engagement-img-8300', 'reception-dsc03209', 'reception-dsc03268'],
  },
  {
    slug: 'family-portraits',
    title: 'Family Portraits',
    excerpt: 'A young family, a white horse and the lakeshore.',
    cover: 'dsc01555',
    gallery: ['dsc01555', 'dsc01538', 'dsc01558', 'dsc01565', 'dsc01568', 'dsc01578'],
  },
]

export const getGallery = (slug) => galleries.find((g) => g.slug === slug)
