/**
 * Image pipeline (read-only on your originals)
 * ---------------------------------------------
 * Reads every JPG/PNG/WebP in /photos, including category sub-folders such as
 * "photos/Weddings", and writes web-ready WebP copies to /public/media:
 *     photos/Weddings/DSC07117.jpg  ->  media/weddings-dsc07117-{width}.webp
 * Files directly in /photos keep just their own name (photos/DSC01538.jpg -> dsc01538).
 *
 * Original files are never renamed, moved or modified.
 * src/data/media-manifest.json records each photo's size, folder and a tiny
 * blurred preview, which <Photo> uses for responsive srcsets.
 *
 *     npm run images
 */
import { readdir, mkdir, writeFile, stat } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SRC = path.join(root, 'photos')
const OUT = path.join(root, 'public', 'media')
const MANIFEST = path.join(root, 'src', 'data', 'media-manifest.json')
const WIDTHS = [640, 1080, 1600, 2400]
const QUALITY = 82
// Stock image left over from the first draft; not the studio's own work.
const SKIP = new Set(['nepal.jpg'])

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

async function collect(dir, folder = '') {
  const found = []
  for (const entry of (await readdir(dir)).sort()) {
    const full = path.join(dir, entry)
    if ((await stat(full)).isDirectory()) found.push(...(await collect(full, entry)))
    else if (/\.(jpe?g|png|webp)$/i.test(entry) && !SKIP.has(entry.toLowerCase())) found.push({ full, folder, file: entry })
  }
  return found
}

await mkdir(OUT, { recursive: true })
const files = await collect(SRC)
const manifest = {}
const seen = new Map() // same file name + size in two folders = duplicate copy

for (const { full, folder, file } of files) {
  const size = (await stat(full)).size
  const key = `${file.toLowerCase()}:${size}`
  if (seen.has(key)) {
    console.log(`  = ${folder}/${file} is a copy of ${seen.get(key)} -skipped`)
    continue
  }
  const name = [folder && slug(folder), slug(path.parse(file).name)].filter(Boolean).join('-')
  seen.set(key, name)

  const meta = await sharp(full).metadata()
  const turned = (meta.orientation ?? 1) >= 5
  const w = turned ? meta.height : meta.width
  const h = turned ? meta.width : meta.height
  const sizes = [...new Set([...WIDTHS.filter((s) => s < w), Math.min(w, WIDTHS.at(-1))])]

  const srcTime = (await stat(full)).mtimeMs
  for (const width of sizes) {
    const out = path.join(OUT, `${name}-${width}.webp`)
    if (existsSync(out) && (await stat(out)).mtimeMs > srcTime) continue
    await sharp(full).rotate().resize({ width }).webp({ quality: QUALITY, smartSubsample: true }).toFile(out)
  }
  const blur = await sharp(full).rotate().resize({ width: 24 }).blur(1.2).webp({ quality: 40 }).toBuffer()
  manifest[name] = { w, h, folder: folder || null, file, sizes, blur: `data:image/webp;base64,${blur.toString('base64')}` }
  console.log(`  ✓ ${folder ? folder + '/' : ''}${file} → ${name}`)
}

await writeFile(MANIFEST, JSON.stringify(manifest, null, 2))
console.log(`\n${Object.keys(manifest).length} photos ready in public/media`)
