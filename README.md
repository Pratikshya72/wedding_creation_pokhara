# Wedding Creation Pokhara -website

React 18 + Vite 6 + Tailwind CSS 4 + React Router. No UI or animation libraries; motion is CSS plus a small IntersectionObserver hook.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # optimises photos, then builds to /dist
npm run preview    # serve the production build
```

> **Note for this PC:** Windows Application Control blocks Rollup's native binary, so `package.json` aliases `rollup` to its official WebAssembly build (`@rollup/wasm-node`). It gives identical output, just builds slightly slower. You can remove the `overrides` block on machines without that policy.

## Replacing the temporary content

Everything editable lives in `src/data/`:

| File | What it controls |
| --- | --- |
| `site.js` | Phone, WhatsApp, **email** (currently empty; see below), address, socials, optional form endpoint, optional hero video |
| `couples.js` | Couple stories and galleries (currently **samples** using stock photos) |
| `films.js` | Wedding films: add a YouTube ID, Vimeo ID or MP4 path per film |
| `services.js` | Services text and images |
| `team.js` | Team cards (names and portraits not yet supplied) |
| `testimonials.js` | Empty on purpose. The section appears automatically when you add genuine reviews |

### Photos
Your originals live in `/photos`, sorted into folders (`Weddings`, `pre wedding shoots`, `Post wedding`, …). They are never changed.

1. Add new originals to the right folder (or create a new folder).
2. Run `npm run images` (takes a few minutes for large files). It creates web-ready WebP copies in `/public/media`.
3. Each photo gets a name made from its folder and file name: `photos/Weddings/DSC07117.jpg` becomes `weddings-dsc07117`.
4. Add that name to a gallery in `src/data/galleries.js` and a description in `src/data/photos.js`.

Galleries follow your folders. To turn one into a named couple story, add `couple: 'Name & Name'` and `place: '…'` (with the couple's permission).
`photos/nepal.jpg` is an old stock image and is ignored by the image script.

### Enquiry form
With no backend, a valid enquiry opens WhatsApp with every detail pre-filled. To receive enquiries by email instead, create a free form endpoint (Formspree, Getform, etc.) and paste its URL into `formEndpoint` in `site.js`.

## Deploying
Works on Netlify (`public/_redirects` is included) and Vercel (`vercel.json` is included), or on any static host with an SPA fallback to `index.html`. Once the domain is known, add a canonical URL and a `sitemap.xml`.
