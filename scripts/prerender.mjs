// Runs after `vite build`: renders the page to static HTML so search engines
// see the full content, and writes structured data, sitemap.xml and robots.txt.
import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { render } from '../dist-server/entry-server.js'
import { siteUrl, structuredData } from '../dist-server/seo.js'

const file = 'dist/index.html'
const html = readFileSync(file, 'utf8')
const ld = structuredData()
  .map((d) => `<script type="application/ld+json">${JSON.stringify(d).replace(/</g, '\\u003c')}</script>`)
  .join('\n    ')

const out = html
  .replace('<div id="root"></div>', `<div id="root">${render()}</div>`)
  .replace('</head>', `    ${ld}\n  </head>`)
if (out === html) throw new Error('prerender: nothing replaced')
writeFileSync(file, out)

const today = new Date().toISOString().slice(0, 10)
writeFileSync('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${siteUrl}/</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>1.0</priority></url>
</urlset>
`)
writeFileSync('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`)
rmSync('dist-server', { recursive: true, force: true })
console.log('prerendered dist/index.html, wrote sitemap.xml and robots.txt')
