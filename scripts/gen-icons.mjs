// Generates the PWA + favicon assets from an inline SVG using sharp.
// Run with: npm run gen:icons
import sharp from 'sharp'
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const pub = resolve(dirname(fileURLToPath(import.meta.url)), '../public')

// A floodlit-pitch badge with a simple soccer ball. `pad` adds a safe margin
// for the maskable variant so nothing important gets clipped by round masks.
function icon({ pad = 0 } = {}) {
  const s = 512
  const ballR = 150 - pad
  const cx = 256
  const cy = 256
  // Five seam lines radiating from a central pentagon.
  const seams = Array.from({ length: 5 }, (_, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5
    const x1 = cx + Math.cos(a) * ballR * 0.34
    const y1 = cy + Math.sin(a) * ballR * 0.34
    const x2 = cx + Math.cos(a) * ballR
    const y2 = cy + Math.sin(a) * ballR
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#0b1210" stroke-width="16" stroke-linecap="round"/>`
  }).join('')
  const pent = Array.from({ length: 5 }, (_, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5
    return `${cx + Math.cos(a) * ballR * 0.34},${cy + Math.sin(a) * ballR * 0.34}`
  }).join(' ')

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#16d191"/>
      <stop offset="1" stop-color="#0b8f5f"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.15" r="0.9">
      <stop offset="0" stop-color="#37ffb4" stop-opacity="0.55"/>
      <stop offset="1" stop-color="#0b8f5f" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${s}" height="${s}" rx="112" fill="#0b1210"/>
  <rect x="24" y="24" width="464" height="464" rx="92" fill="url(#bg)"/>
  <rect x="24" y="24" width="464" height="464" rx="92" fill="url(#glow)"/>
  <circle cx="${cx}" cy="${cy}" r="${ballR + 10}" fill="#0b1210" opacity="0.18"/>
  <circle cx="${cx}" cy="${cy}" r="${ballR}" fill="#ffffff"/>
  <polygon points="${pent}" fill="#0b1210"/>
  ${seams}
</svg>`
}

const main = Buffer.from(icon())
const maskable = Buffer.from(icon({ pad: 40 }))

async function png(svg, size, name) {
  await sharp(svg).resize(size, size).png().toFile(resolve(pub, name))
  console.log('wrote', name)
}

await png(main, 192, 'pwa-192x192.png')
await png(main, 512, 'pwa-512x512.png')
await png(maskable, 512, 'pwa-maskable-512x512.png')
await png(main, 180, 'apple-touch-icon.png')
writeFileSync(resolve(pub, 'favicon.svg'), icon())
console.log('wrote favicon.svg')
