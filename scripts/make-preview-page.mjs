/**
 * Prepares the self-contained preview build (dist-preview-page) for hosting
 * as a single shareable page: the host adds its own <html>/<head>/<body>,
 * so those wrapper tags are removed and the page gets a plain name as title.
 * Also writes files.json -the list of supporting files to publish with it.
 */
import { readFile, writeFile, readdir, stat } from 'node:fs/promises'
import path from 'node:path'

const dir = 'dist-preview-page'
let html = await readFile(path.join(dir, 'index.html'), 'utf8')
html = html
  .replace(/<!doctype html>/i, '')
  .replace(/<\/?html[^>]*>/gi, '')
  .replace(/<\/?head>/gi, '')
  .replace(/<\/?body>/gi, '')
  .replace(/<meta charset="UTF-8" \/>\s*/i, '')
  .replace(/<meta name="viewport"[^>]*\/>\s*/i, '')
  .replace(/<title>[^<]*<\/title>/, '<title>Wedding Creation Pokhara</title>')
  .trim()
await writeFile(path.join(dir, 'index.html'), html + '\n')

const files = {}
let total = 0
async function walk(d) {
  for (const f of await readdir(d)) {
    const full = path.join(d, f)
    const s = await stat(full)
    if (s.isDirectory()) await walk(full)
    else if (f !== 'index.html' && f !== '_redirects') {
      const rel = path.relative(dir, full).split(path.sep).join('/')
      files[rel] = `${dir}/${rel}`
      total += s.size
    }
  }
}
await walk(dir)
await writeFile(path.join(dir, 'files.json'), JSON.stringify(files, null, 1))
console.log(`${Object.keys(files).length} files, ${(total / 1e6).toFixed(1)} MB`)
