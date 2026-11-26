// Structured data for Google, built from site.config.js.
import { clinic, faqs, seo, services, siteUrl } from './data.js'

export { siteUrl }

export function structuredData() {
  const a = clinic.address
  const dentist = {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    '@id': `${siteUrl}/#clinic`,
    name: clinic.name,
    url: `${siteUrl}/`,
    image: `${siteUrl}/og-image.jpg`,
    logo: `${siteUrl}/favicon.svg`,
    telephone: clinic.phoneTel,
    priceRange: seo.priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: a.street,
      addressLocality: a.city,
      addressRegion: a.region,
      postalCode: a.postalCode,
      addressCountry: a.country,
    },
    areaServed: { '@type': 'City', name: clinic.city },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinic.mapQuery)}`,
    employee: { '@type': 'Person', name: clinic.doctor, jobTitle: clinic.doctorRole },
    availableService: services.map((s) => ({ '@type': 'MedicalProcedure', name: s.title, description: s.text })),
  }
  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }
  return [dentist, faq]
}
