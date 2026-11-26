// Reads everything from site.config.js — edit that file, not this one.
import config from '../site.config.js'

export const { siteUrl, clinic, brand, seo, text, marqueeItems, services, journeys, steps, testimonials, faqs, tips, doctorFocus } = config

export const telLink = `tel:${clinic.phoneTel}`
export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinic.mapQuery)}`
export const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(clinic.mapQuery)}&output=embed`
export const whatsappLink = (msg = '') =>
  `https://wa.me/${clinic.whatsapp}${msg ? `?text=${encodeURIComponent(msg)}` : ''}`

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Our Dentist', href: '#dentist' },
  { label: 'FAQs', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]
