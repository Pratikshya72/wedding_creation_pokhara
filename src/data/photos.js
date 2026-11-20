/**
 * Descriptions (alt text) for every photograph, keyed by the name the image
 * pipeline gives it (folder + file name, see scripts/optimize-images.mjs).
 * They describe what is visible only -no names, places or claims are added.
 */
export const alts = {
  // Weddings
  'weddings-dsc07117': 'Bride and groom with palms joined in namaste on the mandap',
  'weddings-dsc06848': 'A ring slipped onto the bride’s hennaed finger',
  'weddings-dsc06816': 'Bride and groom exchange garlands on a floral stage',
  'weddings-dsc00604': 'Bride in a red sari raises her mehendi-covered hand',
  'weddings-dsc00836': 'Groom fastens bangles on the bride’s hennaed wrist',
  'rituals-and-ceremony-dsc07947': 'Bride wipes away a tear, sindoor in her parting',
  'weddings-dsc07123': 'Bride and groom seated together beneath red roses',
  'weddings-dsc07314': 'Rose garlands and the couple’s joined hands',
  'weddings-dsc07536': 'A ceremonial cloth is tied as the bride bows her head',
  'weddings-dsc00180': 'Bride and groom on a flower-decked bicycle',
  'weddings-dsc00028': 'Bride holding a book, her red veil in the foreground',
  // Rituals & ceremonies
  'rituals-and-ceremony-dsc05547': 'Family procession carrying a young girl in red beneath a floral canopy',
  'rituals-and-ceremony-dsc05554': 'Parents seated with their daughter dressed in red for the ceremony',
  'rituals-and-ceremony-dsc05582': 'Hands joined over red and gold bangles during a ritual',
  'rituals-and-ceremony-dsc05564': 'Parents kiss their daughter’s cheeks during the ceremony',
  'rituals-and-ceremony-dsc05635': 'A boy pours water as the family looks on',
  // Haldi & mehendi
  'haldi-mehendi-1c7a0514': 'Couple show off the bride’s mehendi beneath yellow drapes',
  'haldi-mehendi-dsc00427': 'Three women in green and yellow seated beneath haldi decorations',
  'haldi-mehendi-dsc00438': 'A father and daughter smile together at the haldi',
  dsc00010: 'Women in colourful saris gathered beneath yellow drapes and umbrellas',
  // Pre-wedding
  'pre-wedding-shoots-1c7a2272': 'Groom offers his hand to the bride on a misty hillside',
  'pre-wedding-shoots-dsc03441': 'Couple in traditional dress at sunset',
  'pre-wedding-shoots-1c7a2202': 'Couple in traditional dress beside a stone house',
  'pre-wedding-shoots-dsc02574': 'Couple embrace beneath overhanging branches',
  'pre-wedding-shoots-dsc01878': 'Black-and-white portrait of a laughing couple',
  'pre-wedding-shoots-dsc01852': 'Couple forehead to forehead beneath warm lights',
  'pre-wedding-shoots-dsc01868': 'Couple on the lit balcony of a stone lodge at dusk',
  'pre-wedding-shoots-dsc01900': 'Couple in garlands walk hand in hand across a lawn at night',
  'pre-wedding-shoots-dsc02585': 'Couple sit back to back on an open road',
  'pre-wedding-shoots-1c7a9349': 'Couple relaxing by a poolside courtyard',
  // Post-wedding
  'post-wedding-postwed-27': 'Bride in red laughs with arms wide in a boat on the lake',
  'post-wedding-dsc08405': 'Couple embrace on the lakeshore with boats and hills behind',
  'post-wedding-dsc08414': 'Couple beneath a lone tree at the water’s edge',
  'post-wedding-pokhara-dorje-resort-47-of-57': 'Couple kiss beneath a sheer red veil',
  'post-wedding-dsc01296': 'Couple in a pink sari and ivory jacket among greenery',
  'post-wedding-dsc01348': 'Groom kisses the bride’s forehead',
  'post-wedding-postwedd-88-of-224': 'Couple embrace on the lakeshore against misty hills',
  'post-wedding-dsc01371': 'Groom kisses the bride beneath evening lights',
  // Engagement & reception
  'engagement-img-8300': 'Engagement portrait in a pink lehenga and black embroidered jacket',
  'reception-dsc03209': 'Couple in a red sari and beige suit beneath a tree',
  'reception-dsc03268': 'Couple stroll along a garden path between hedges',
  // Family
  dsc01555: 'A family with their baby beside a white horse on the lakeshore',
  dsc01538: 'A mother holds her baby as her partner leans in, by the lake',
  dsc01558: 'A family stands with a white horse by the water',
  dsc01565: 'A family laughs together beside a horse at the lake',
  dsc01568: 'A couple holding their baby share a kiss beside a grazing horse',
  dsc01578: 'A family beside a grazing horse at the water’s edge',
}

export const alt = (name) => alts[name] ?? ''
