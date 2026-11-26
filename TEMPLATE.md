# Using this site as a template for another clinic

Everything specific to a clinic lives in **one file, `site.config.js`**, plus the photos in `public/images/`.
You don't need to touch any code.

## 1. Make a copy

**On GitHub (one-time setup):** open this repository → **Settings** → tick **Template repository**.

**For each new clinic:** click **Use this template** → **Create a new repository**, then clone it:

```bash
git clone https://github.com/<you>/<new-clinic-repo>.git
cd <new-clinic-repo>
npm install
```

## 2. Edit `site.config.js`

| Section | What to change |
|---|---|
| `siteUrl` | The live web address, e.g. `https://sunrisedental.in` (no `/` at the end) |
| `clinic` | Name, doctor, phone, WhatsApp number, city, address, map search text, **opening hours** |
| `brand` | Logo text and colours (`primary` is the main button colour) |
| `seo` | Google title/description, keywords, link-preview text |
| `text` | Headings and paragraphs for every section of the page |
| `services`, `journeys`, `steps`, `tips` | Cards on the page (title, text, photo file name, icon) |
| `faqs` | Questions and answers (also used by the chat assistant and Google) |
| `testimonials` | **Real** patient reviews only, with their permission |
| `doctorFocus` | The doctor's areas of care |

Icons are names from [lucide.dev](https://lucide.dev). The ones available are listed at the top of `src/components/ui.jsx`; to use a new icon, add it there.

## 3. Replace the photos

Put the clinic's photos in `public/images/` using **exactly these names** (`.webp` or `.jpg`; if you use `.jpg`, update the name in `site.config.js`):

| File | Where it appears | Good size / shape |
|---|---|---|
| `hero.webp` | Top of the page | Portrait on a white background, ~900 px wide |
| `about-1.webp` | About, big tooth | Portrait on a white background |
| `about-2.webp` | About, small tooth | Close-up smile |
| `doctor.webp` | Meet Your Dentist | Portrait, 4:5 |
| `before.webp`, `after.webp` | Before/After slider | Same size and framing, so they line up |
| `service-*.webp` (9) | Service cards | Landscape, ~800 px wide |
| `journey-*.webp` (2) | Treatment journeys | Square or landscape |
| `tip-*.webp` (3) | Dental care tips | Landscape |

Use photos you own or have a licence for. Don't use a stock photo as if it were the real doctor.

## 4. Make the link-preview image

```bash
npm run share-image
```

This creates `public/og-image.jpg` (the image shown when the link is shared on WhatsApp or Facebook) and `public/apple-touch-icon.png` from the config and `hero.webp`.
The first time, it may ask you to install Playwright: `npm i -D playwright && npx playwright install chromium`.
The favicon is generated automatically in the brand colour.

## 5. Preview and publish

```bash
npm run dev       # preview at http://localhost:5173
npm run build     # production build (prerendered for SEO) in dist/
```

Import the new repository in [Vercel](https://vercel.com/new); it detects Vite and deploys on every push.
Then submit `https://<site>/sitemap.xml` in Google Search Console and link the site from the clinic's Google Business Profile.

## Checklist before going live

- [ ] Real opening hours in `clinic.hours`
- [ ] Real testimonials (or remove them)
- [ ] All photos replaced and licensed
- [ ] `siteUrl` set to the real address
- [ ] `npm run share-image` run after changing the name, colours or hero photo
- [ ] Vercel → Settings → Deployment Protection is **off** for production, so the public and Google can see the site
