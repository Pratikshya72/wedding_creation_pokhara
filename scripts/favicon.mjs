import sharp from 'sharp'
const src = 'public/brand/logo-color.png'
// camera-shutter mark sits above "Creation" in the logo
const mark = await sharp(src).extract({ left: 650, top: 40, width: 112, height: 112 }).toBuffer()
await sharp({ create: { width: 180, height: 180, channels: 4, background: '#ffffff' } })
  .composite([{ input: await sharp(mark).resize(130, 130).toBuffer(), gravity: 'center' }]).png().toFile('public/brand/favicon.png')
console.log('favicon ok')
