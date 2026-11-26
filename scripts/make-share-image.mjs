// Generates public/og-image.jpg (1200x630 link-preview image) and
// public/apple-touch-icon.png from site.config.js and public/images/hero.webp.
//
//   npm run share-image
//
// Needs Playwright's Chromium once:  npx playwright install chromium
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import config from '../site.config.js'

let chromium
try {
  ;({ chromium } = createRequire(import.meta.url)('playwright'))
} catch {
  console.error('Playwright is not installed. Run:  npm i -D playwright && npx playwright install chromium')
  process.exit(1)
}

const { clinic, brand } = config
const c = brand.colors
const hero = `data:image/webp;base64,${readFileSync('public/images/hero.webp').toString('base64')}`
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')

const card = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Figtree:wght@500;700;800&display=swap" rel="stylesheet">
<style>
  *{margin:0;box-sizing:border-box} body{width:1200px;height:630px;background:#F4F6FB;font-family:Figtree,system-ui,sans-serif;position:relative;overflow:hidden}
  .bar{position:absolute;top:0;left:0;right:0;height:10px;background:${c.primary}}
  .left{position:absolute;left:70px;top:90px;width:560px}
  .logo{display:flex;align-items:center;gap:18px}
  .mark{width:70px;height:70px;border-radius:16px;background:${c.primary};display:grid;place-items:center}
  .top{font-size:34px;font-weight:800;color:${c.navy};letter-spacing:-.5px}
  .bottom{font-size:17px;font-weight:700;color:${c.primary};letter-spacing:4px;text-transform:uppercase}
  h1{margin-top:56px;font-size:58px;line-height:1.1;font-weight:800;color:${c.navy}} h1 span{color:${c.primary}}
  p{margin-top:24px;font-size:26px;color:#475569}
  .btn{display:inline-block;margin-top:40px;padding:18px 38px;border-radius:40px;background:${c.primary};color:#fff;font-size:28px;font-weight:700}
  img{position:absolute;right:20px;bottom:0;height:620px;mix-blend-mode:multiply}
</style></head><body>
<div class="bar"></div>
<img src="${hero}">
<div class="left">
  <div class="logo"><div class="mark"><svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5.5c-1.4-1-4-1.7-5.5.2-1.4 1.8-.6 4.5.2 6.6.8 2.2 1.1 5.7 2.4 5.7 1.1 0 1.1-3.8 2.9-3.8s1.8 3.8 2.9 3.8c1.3 0 1.6-3.5 2.4-5.7.8-2.1 1.6-4.8.2-6.6-1.5-1.9-4.1-1.2-5.5-.2z"/></svg></div>
    <div><div class="top">${esc(brand.logoTop)}</div><div class="bottom">${esc(brand.logoBottom)}</div></div></div>
  <h1>Your Best Dental<br><span>Care in ${esc(clinic.city)}</span></h1>
  <p>${esc(config.seo.shareTagline)}</p>
  <div class="btn">Call ${esc(clinic.phoneDisplay)}</div>
</div></body></html>`

const icon = `<!doctype html><html><body style="margin:0;width:180px;height:180px;background:${c.primary};display:grid;place-items:center">
<svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5.5c-1.4-1-4-1.7-5.5.2-1.4 1.8-.6 4.5.2 6.6.8 2.2 1.1 5.7 2.4 5.7 1.1 0 1.1-3.8 2.9-3.8s1.8 3.8 2.9 3.8c1.3 0 1.6-3.5 2.4-5.7.8-2.1 1.6-4.8.2-6.6-1.5-1.9-4.1-1.2-5.5-.2z"/></svg></body></html>`

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
await page.setContent(card, { waitUntil: 'networkidle' })
await page.screenshot({ path: 'public/og-image.jpg', type: 'jpeg', quality: 88 })
await page.setViewportSize({ width: 180, height: 180 })
await page.setContent(icon)
await page.screenshot({ path: 'public/apple-touch-icon.png' })
await browser.close()
console.log('wrote public/og-image.jpg and public/apple-touch-icon.png')
