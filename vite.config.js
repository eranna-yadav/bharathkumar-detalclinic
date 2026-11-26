import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import config from './site.config.js'

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

// Fills the {{placeholders}} in index.html from site.config.js.
function siteConfigHtml() {
  const { seo, clinic, brand, siteUrl } = config
  const values = {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    shareTitle: seo.shareTitle,
    shareDescription: seo.shareDescription,
    locale: seo.locale,
    siteName: clinic.name,
    siteUrl,
    city: clinic.city,
    regionCode: clinic.address.regionCode,
    themeColor: brand.colors.primary,
  }
  return {
    name: 'site-config-html',
    transformIndexHtml(html) {
      return html.replace(/\{\{(\w+)\}\}/g, (m, k) => {
        if (!(k in values)) throw new Error(`index.html: unknown placeholder ${m}`)
        return esc(values[k])
      })
    },
  }
}

// Generates favicon.svg in the brand colour.
function brandFavicon() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="${config.brand.colors.primary}"/><path d="M16 8.5c-1.6-1.2-4.6-2-6.3.2-1.6 2.1-.7 5.2.2 7.6.9 2.5 1.3 6.6 2.8 6.6 1.3 0 1.3-4.4 3.3-4.4s2 4.4 3.3 4.4c1.5 0 1.9-4.1 2.8-6.6.9-2.4 1.8-5.5.2-7.6-1.7-2.2-4.7-1.4-6.3-.2z" fill="#fff"/></svg>`
  return {
    name: 'brand-favicon',
    configureServer(server) {
      server.middlewares.use('/favicon.svg', (req, res) => { res.setHeader('Content-Type', 'image/svg+xml'); res.end(svg) })
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'favicon.svg', source: svg })
    },
  }
}

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), siteConfigHtml(), ...(isSsrBuild ? [] : [brandFavicon()])],
}))
