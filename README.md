# Srilakshmi Dental Clinic — Website

React + Vite + Tailwind CSS + Framer Motion. Live at https://srilakshmi-dental-clinic.vercel.app

```bash
npm install
npm run dev           # local preview
npm run build         # production build in dist/ (prerendered for SEO)
npm run share-image   # regenerate the link-preview image and app icon
```

## Editing content
All clinic details, page text, services, FAQs, colours and SEO text are in **`site.config.js`**.
Photos are in `public/images/`.

**Reusing this site for another clinic:** see [TEMPLATE.md](TEMPLATE.md).

## Before going live
- **Clinic hours** in `site.config.js` are placeholders — confirm the real timings.
- **Testimonials** in `site.config.js` are placeholders — replace with real patient reviews.

## Features
- Booking form that sends details to the clinic's WhatsApp
- Floating WhatsApp button and a chat assistant that answers from the site's own content (`src/chatbot/`)
- SEO: prerendered HTML, meta and social tags, Dentist and FAQ structured data, sitemap and robots.txt
