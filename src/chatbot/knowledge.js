// Rule-based assistant that answers only from the website's own content (src/data.js).
// No external AI service is used, so it is free and never makes things up.
import { clinic, doctorFocus, faqs, services, steps, telLink, whatsappLink, mapsLink } from '../data.js'

const A = {
  call: { label: `Call ${clinic.phoneDisplay}`, href: telLink },
  whatsapp: { label: 'WhatsApp us', href: whatsappLink('Hello, I have a question.'), external: true },
  book: { label: 'Book appointment', href: '#appointment' },
  map: { label: 'Get directions', href: mapsLink, external: true },
  services: { label: 'See all services', href: '#services' },
}

const hoursText = clinic.hours.map((h) => `• ${h.day}: ${h.time}`).join('\n')

// Extra words people use for each service (English + common Indian usage).
const serviceSynonyms = {
  'General Dentistry': ['checkup', 'check', 'cleaning', 'scaling', 'filling', 'cavity', 'cavities', 'decay', 'polish', 'gum', 'gums', 'bleeding'],
  'Dental Implants': ['implant', 'implants', 'missing', 'replace', 'replacement', 'screw'],
  'Teeth Whitening': ['whitening', 'whiten', 'white', 'yellow', 'stain', 'stains', 'bleach', 'bright'],
  'Root Canal Treatment': ['root', 'canal', 'rct', 'nerve', 'infection', 'abscess', 'toothache', 'pain'],
  'Braces & Aligners': ['braces', 'brace', 'aligner', 'aligners', 'crooked', 'straighten', 'orthodontic', 'ortho', 'gap', 'gaps', 'invisalign'],
  'Tooth Extraction': ['extraction', 'extract', 'remove', 'removal', 'pull', 'wisdom'],
  'Crowns & Bridges': ['crown', 'crowns', 'bridge', 'bridges', 'cap', 'broken', 'cracked', 'chipped', 'denture', 'dentures'],
  'Smile Makeover': ['makeover', 'veneer', 'veneers', 'smile', 'design', 'cosmetic', 'bonding'],
  'Kids Dentistry': ['kid', 'kids', 'child', 'children', 'baby', 'son', 'daughter', 'pediatric', 'paediatric', 'sealant', 'fluoride'],
}

const intents = [
  {
    id: 'greet',
    words: ['hi', 'hello', 'hey', 'namaste', 'namaskara', 'good morning', 'good evening'],
    reply: () => ({ text: `Hello! 👋 Welcome to ${clinic.name}. How can I help you today?`, actions: [A.book] }),
  },
  {
    id: 'thanks',
    words: ['thanks', 'thank', 'thankyou', 'ok', 'okay', 'great', 'bye'],
    reply: () => ({ text: 'You’re welcome! If you need anything else, just ask. Wishing you a healthy smile 😊' }),
  },
  {
    id: 'hours',
    words: ['time', 'timing', 'timings', 'hours', 'open', 'opening', 'close', 'closing', 'when', 'sunday', 'saturday', 'today', 'schedule'],
    reply: () => ({ text: `Our clinic hours:\n${hoursText}`, actions: [A.book, A.call] }),
  },
  {
    id: 'location',
    words: ['where', 'address', 'location', 'located', 'directions', 'direction', 'map', 'reach', 'route', 'landmark', 'near', ...tokenize(clinic.shortArea)],
    reply: () => ({ text: `We are at:\n${clinic.addressLines.join(',\n')}`, actions: [A.map, A.call] }),
  },
  {
    id: 'contact',
    words: ['phone', 'number', 'contact', 'call', 'mobile', 'whatsapp', 'reach'],
    reply: () => ({ text: `You can call or WhatsApp us on ${clinic.phoneDisplay}.`, actions: [A.call, A.whatsapp] }),
  },
  {
    id: 'book',
    words: ['book', 'booking', 'appointment', 'appoint', 'slot', 'visit', 'consult', 'consultation', 'schedule'],
    reply: () => ({
      text: 'Booking is easy! Fill the appointment form on this page and send it on WhatsApp, or call us. We will confirm your time.',
      actions: [A.book, A.call, A.whatsapp],
    }),
  },
  {
    id: 'doctor',
    words: ['doctor', 'dentist', 'dr', ...tokenize(clinic.doctor), 'who', 'qualification', 'experience', 'surgeon'],
    reply: () => ({
      text: `${clinic.doctor} is the dental surgeon at ${clinic.name}. Areas of care:\n${doctorFocus.map((f) => `• ${f}`).join('\n')}`,
      actions: [{ label: 'Meet the dentist', href: '#dentist' }, A.book],
    }),
  },
  {
    id: 'services',
    words: ['services', 'service', 'treatments', 'treatment', 'offer', 'provide', 'do you do', 'available'],
    reply: () => ({
      text: `We offer:\n${services.map((s) => `• ${s.title}`).join('\n')}\n\nAsk me about any of these!`,
      actions: [A.services, A.book],
    }),
  },
  {
    id: 'price',
    words: ['cost', 'price', 'fee', 'fees', 'charge', 'charges', 'rate', 'rates', 'expensive', 'cheap', 'how much', 'rupees', 'rs', 'emi', 'insurance'],
    reply: () => ({
      text: 'Treatment cost depends on your exact need, which the doctor checks during the consultation. We explain all options and costs clearly before starting anything. Please call or WhatsApp us for an estimate.',
      actions: [A.call, A.whatsapp],
    }),
  },
  {
    id: 'emergency',
    words: ['emergency', 'urgent', 'severe', 'swelling', 'swollen', 'bleeding', 'accident', 'injury', 'broke', 'unbearable'],
    reply: () => ({
      text: `For severe pain, swelling, a broken tooth or an injury, please call us right away on ${clinic.phoneDisplay}. We’ll try to see you the same day.`,
      actions: [A.call],
    }),
  },
  {
    id: 'process',
    words: ['process', 'steps', 'how it works', 'procedure', 'first visit', 'what happens'],
    reply: () => ({ text: `Here’s how it works:\n${steps.map((s, i) => `${i + 1}. ${s.title}: ${s.text}`).join('\n')}`, actions: [A.book] }),
  },
]

const STOP = new Set('a an the is are am do does i you we my me your our for to of in on at and or can could would will be it this that with have has please about what which any there tooth teeth dental treatment dentist'.split(' '))

export function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
}

function scoreWords(text, tokens, words) {
  let score = 0
  for (const w of words) {
    if (w.includes(' ')) { if (text.includes(w)) score += 2 }
    else if (tokens.includes(w)) score += 1
  }
  return score
}

function overlap(tokens, other) {
  const set = new Set(tokenize(other).filter((t) => !STOP.has(t)))
  return tokens.filter((t) => !STOP.has(t) && set.has(t)).length
}

export function answer(input) {
  const text = ` ${input.toLowerCase()} `
  const tokens = tokenize(input)
  if (!tokens.length) return fallback()

  // 1. A specific service?
  let bestService = null
  let bestServiceScore = 0
  for (const s of services) {
    const sc = scoreWords(text, tokens, serviceSynonyms[s.title] || []) + overlap(tokens, s.title) * 2
    if (sc > bestServiceScore) { bestService = s; bestServiceScore = sc }
  }

  // 2. A FAQ?
  let bestFaq = null
  let bestFaqScore = 0
  for (const f of faqs) {
    const sc = overlap(tokens, f.q) * 2 + overlap(tokens, f.a) * 0.3
    if (sc > bestFaqScore) { bestFaq = f; bestFaqScore = sc }
  }

  // 3. A general intent?
  let bestIntent = null
  let bestIntentScore = 0
  for (const it of intents) {
    const sc = scoreWords(text, tokens, it.words)
    if (sc > bestIntentScore) { bestIntent = it; bestIntentScore = sc }
  }

  // Urgent situations always win.
  if (bestIntent?.id === 'emergency') return bestIntent.reply()
  // Cost questions about a service.
  if (bestIntent?.id === 'price') return bestIntent.reply()
  // Strong FAQ match (e.g. "is root canal painful").
  if (bestFaqScore >= 4 && bestFaqScore >= bestServiceScore) {
    return { text: bestFaq.a, actions: [A.book, A.call] }
  }
  if (bestServiceScore >= 1 && bestServiceScore >= bestIntentScore && !['hours', 'location', 'contact', 'book'].includes(bestIntent?.id)) {
    return {
      text: `${bestService.title}: ${bestService.text}\n\nWould you like to book a consultation?`,
      actions: [A.book, A.call],
    }
  }
  if (bestIntentScore >= 1) return bestIntent.reply()
  if (bestFaqScore >= 2) return { text: bestFaq.a, actions: [A.book, A.call] }
  if (bestServiceScore >= 1) return { text: `${bestService.title}: ${bestService.text}`, actions: [A.book] }
  return fallback()
}

function fallback() {
  return {
    text: `Sorry, I couldn’t find that on our website. Please call or WhatsApp us on ${clinic.phoneDisplay} and our team will help you.`,
    actions: [A.call, A.whatsapp],
  }
}

export const quickReplies = ['Clinic timings', 'Services', 'Location', 'Book appointment', 'Is root canal painful?', 'Emergency']

export const welcome = {
  text: `Hi! 👋 I’m the ${clinic.shortName} Dental assistant. Ask me about our treatments, timings, location or booking.`,
}
