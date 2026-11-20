/**
 * Wedding films: real films from the studio's YouTube channel
 * (youtube.com/@weddingcreationpokhara). Couple names are as published there.
 *
 * To add a film: copy a line, set `youtube` to the video ID (the part after
 * watch?v= or youtu.be/), and save the video's thumbnail as
 * public/films/<ID>.jpg. The first film in the list is the featured one.
 * `category` must be one of the filters below.
 */
export const filmCategories = ['All', 'Wedding', 'Pre-Wedding', 'Post-Wedding']

export const films = [
  { id: 'E-wLTHVPVyw', title: 'Amardeep & Shiwani', category: 'Pre-Wedding', kind: 'Pre & Post-Wedding Film · 2024', youtube: 'E-wLTHVPVyw', posterUrl: 'films/E-wLTHVPVyw.jpg' },
  { id: 'wuay2Uk7Qj8', title: 'Sunil & Himani', category: 'Wedding', kind: 'Wedding Highlight · 2026', youtube: 'wuay2Uk7Qj8', posterUrl: 'films/wuay2Uk7Qj8.jpg' },
  { id: '_QJU6ZSvtkQ', title: 'Anmol & Ruchi', category: 'Pre-Wedding', kind: 'Pre-Wedding Story · 2025', youtube: '_QJU6ZSvtkQ', posterUrl: 'films/_QJU6ZSvtkQ.jpg' },
  { id: 'di6NRLmyB8o', title: 'Amit & Rojina', category: 'Post-Wedding', kind: 'Post-Wedding Film · 2024', youtube: 'di6NRLmyB8o', posterUrl: 'films/di6NRLmyB8o.jpg' },
  { id: '4FqsWUNIHkw', title: 'Sagar & Anita', category: 'Post-Wedding', kind: 'Post-Wedding · Rupakot, Kaski · 2024', youtube: '4FqsWUNIHkw', posterUrl: 'films/4FqsWUNIHkw.jpg' },
  { id: 'WxInveCe6MQ', title: 'Resham & Hardik', category: 'Pre-Wedding', kind: 'Pre-Wedding Story · 2024', youtube: 'WxInveCe6MQ', posterUrl: 'films/WxInveCe6MQ.jpg' },
  { id: 'U8QgMVa_piY', title: 'Shanta & Ishwor', category: 'Wedding', kind: 'Wedding Highlights · 2024', youtube: 'U8QgMVa_piY', posterUrl: 'films/U8QgMVa_piY.jpg' },
  { id: 'TQE9GniplZ0', title: 'Abhishek & Hema', category: 'Post-Wedding', kind: 'Post-Wedding Film · 2024', youtube: 'TQE9GniplZ0', posterUrl: 'films/TQE9GniplZ0.jpg' },
  { id: 'tU1yzBlVs7M', title: 'Sumana & Arjun', category: 'Wedding', kind: 'Wedding Day Highlights · 2024', youtube: 'tU1yzBlVs7M', posterUrl: 'films/tU1yzBlVs7M.jpg' },
  { id: 'HbNpb--xTdE', title: 'Kumar & Kusmita', category: 'Post-Wedding', kind: 'Post-Wedding Film · 2024', youtube: 'HbNpb--xTdE', posterUrl: 'films/HbNpb--xTdE.jpg' },
  { id: 'mIU4SnXlvOQ', title: 'Jeevan & Sangeeta', category: 'Post-Wedding', kind: 'Post-Wedding Film · 2024', youtube: 'mIU4SnXlvOQ', posterUrl: 'films/mIU4SnXlvOQ.jpg' },
  { id: 'CUN2sL80_kk', title: 'Asha & Sanjog', category: 'Wedding', kind: 'Dhog Bhet Highlight · 2023', youtube: 'CUN2sL80_kk', posterUrl: 'films/CUN2sL80_kk.jpg' },
  { id: 'y7M9bTT51pM', title: 'Shanta & Ishwor: Kuraakaani', category: 'Post-Wedding', kind: 'A Day After the Wedding · 2024', youtube: 'y7M9bTT51pM', posterUrl: 'films/y7M9bTT51pM.jpg' },
]

export const youtubeChannel = 'https://www.youtube.com/@weddingcreationpokhara'

export const hasVideo = (f) => Boolean(f.youtube || f.vimeo || f.src)
