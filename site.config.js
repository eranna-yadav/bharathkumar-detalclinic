// ─────────────────────────────────────────────────────────────────────────────
//  SITE CONFIG — the only file you need to edit for a new clinic.
//  Photos go in public/images/ (see TEMPLATE.md for the file names).
// ─────────────────────────────────────────────────────────────────────────────

// Live website address (no trailing slash). Used for SEO, sitemap and share links.
const siteUrl = 'https://bharathkumar-dental-clinic.vercel.app'

const clinic = {
  name: 'Bharath Kumar Dental Clinic',
  shortName: 'Bharath Kumar', // used in the chat assistant title
  doctor: 'Dr. Bharath Kumar',
  doctorRole: 'Dental Surgeon',
  phoneDisplay: '79474 32145', // how the number is shown
  phoneTel: '+917947432145', // for tap-to-call (with country code)
  whatsapp: '917947432145', // WhatsApp number: country code + number, digits only
  city: 'Hassan',
  shortArea: 'Kalabhavana Road, Hassan', // shown in the top bar
  address: {
    street: 'Kalabhavana Road, above Mahalakshmi Sweets, opp. Maharaja Park, Penshan Mohalla',
    city: 'Hassan',
    region: 'Karnataka',
    regionCode: 'IN-KA',
    postalCode: '573201',
    country: 'IN',
  },
  addressLines: [
    'Kalabhavana Road, above Mahalakshmi Sweets, opp. Maharaja Park',
    'Penshan Mohalla, Hassan, Karnataka 573201',
  ],
  // What Google Maps should search for (map embed + "Get directions").
  mapQuery: 'DR BHARAT, Kalabhavana Road, opposite Maharaja Park, Penshan Mohalla, Hassan, Karnataka 573201',
  hours: [
    { day: 'Monday – Saturday', time: '10:00 AM – 7:30 PM' },
    { day: 'Sunday', time: 'Closed' },
  ],
}

// Logo text and colours. Colours are used across the whole site.
const brand = {
  logoTop: 'BHARATH KUMAR',
  logoBottom: 'Dental Clinic',
  colors: {
    primary: '#1E3FF5',
    primaryDark: '#1430CC',
    primaryLight: '#E8ECFF',
    navy: '#0B1A4A',
    navyLight: '#13265F',
  },
}

// Search engine and social-share text.
const seo = {
  title: `${clinic.name} | Best Dentist in ${clinic.city}, ${clinic.address.region}`,
  description: `${clinic.name} on Kalabhavana Road, ${clinic.city} offers root canal treatment, dental implants, braces, teeth whitening, crowns and kids dentistry by ${clinic.doctor}. Call ${clinic.phoneDisplay} to book.`,
  keywords: `dentist in ${clinic.city}, dental clinic ${clinic.city}, ${clinic.name}, ${clinic.doctor}, root canal ${clinic.city}, dental implants ${clinic.city}, braces ${clinic.city}, teeth whitening ${clinic.city}`,
  shareTitle: `${clinic.name} | Dentist in ${clinic.city}`,
  shareDescription: `Gentle, modern dental care for the whole family on Kalabhavana Road, ${clinic.city}. Book with ${clinic.doctor}: ${clinic.phoneDisplay}.`,
  shareTagline: 'Root canal · Implants · Braces · Whitening', // line on the link-preview image
  locale: 'en_IN',
  priceRange: '₹₹',
}

// Text for each section of the page.
const text = {
  hero: {
    badge: `Trusted Dental Care in ${clinic.city}`,
    titleStart: 'Your',
    titleHighlight: 'Best Dental',
    titleEnd: 'Experience Awaits',
    intro: `Gentle, modern dentistry for the whole family at ${clinic.name}. From routine check-ups to implants and smile makeovers, ${clinic.doctor} and team take care of every smile.`,
    imageAlt: `Smiling dental professional at ${clinic.name}`,
    cards: [
      { title: 'Family Dentistry', text: 'Kids to seniors' },
      { title: 'Gentle Care', text: 'Comfortable treatment' },
    ],
  },
  about: {
    eyebrow: 'About Us',
    title: 'Expert, Gentle Care',
    highlight: 'for Every Smile',
    body: `${clinic.name} is a family dental clinic on Kalabhavana Road, ${clinic.city}, led by ${clinic.doctor}. We focus on comfortable treatment, clear explanations and results that last — so every visit leaves you smiling.`,
    points: [
      'Complete dental care under one roof',
      'Sterilised instruments and modern equipment',
      'Clear treatment plans with honest pricing',
    ],
    imageAlt: `Smiling dental professional at ${clinic.name}`,
    smallImageAlt: 'Healthy, bright smile with a dental mirror',
  },
  services: { eyebrow: 'Our Services', title: 'A Wide Range of Services', highlight: 'for Your Best Smile' },
  journeys: { eyebrow: 'Treatment Journeys', title: 'Your Path to a', highlight: 'Healthier, Happier Smile', button: 'Start Your Journey' },
  steps: { eyebrow: 'How It Works', title: 'The Path to', highlight: 'Your Perfect Smile' },
  booking: {
    eyebrow: 'Book an Appointment',
    title: 'Easy Online Booking',
    highlight: 'for Your Dental Visit',
    intro: 'Fill in your details and send them to us on WhatsApp. We will call you back to confirm your appointment time.',
  },
  beforeAfter: { eyebrow: 'Before & After', title: 'See the', highlight: 'Difference', button: 'Get Your Consultation' },
  testimonials: { eyebrow: 'Testimonials', title: 'What Our', highlight: 'Patients', after: 'Have to Say' },
  dentist: {
    eyebrow: 'Meet Your Dentist',
    title: 'Your Smile in',
    highlight: 'Caring Hands',
    bio: `${clinic.doctor} leads the clinic with a simple approach: listen carefully, explain every option clearly and treat each patient gently. Whether it is a routine check-up or a complete smile makeover, you are in caring, experienced hands.`,
  },
  faq: {
    eyebrow: 'FAQs',
    title: 'Dental Care FAQs:',
    highlight: 'Your Questions Answered',
    cardTitle: 'Have a different question?',
    cardText: 'Message us on WhatsApp and we will get back to you quickly.',
  },
  tips: { eyebrow: 'Dental Care Tips', title: 'Simple Habits for', highlight: 'Healthy Teeth', button: 'Book a Check-Up' },
  cta: { eyebrow: 'Visit Us', title: 'Ready for a healthier, brighter smile?' },
  footer: {
    about: `Complete, caring dental treatment for the whole family in ${clinic.city}, led by ${clinic.doctor}.`,
    bottom: `${clinic.doctor} · ${clinic.city}, ${clinic.address.region}`,
  },
}

const marqueeItems = ['General Dentistry', 'Teeth Whitening', 'Dental Implants', 'Root Canal Treatment', 'Braces & Aligners', 'Dental Sealants', 'Smile Makeover']

// `icon` names come from https://lucide.dev (only the ones listed in src/components/ui.jsx are bundled).
const services = [
  { title: 'General Dentistry', image: 'service-general.webp', icon: 'Stethoscope', text: 'Check-ups, cleaning, fillings and everyday care that keep your teeth and gums healthy.' },
  { title: 'Dental Implants', image: 'service-implant.webp', icon: 'ShieldCheck', text: 'Permanent, natural-looking replacements for missing teeth that restore your bite.' },
  { title: 'Teeth Whitening', image: 'service-whitening.webp', icon: 'Sparkles', text: 'Safe, professional whitening that lifts stains and brightens your smile.' },
  { title: 'Root Canal Treatment', image: 'service-rootcanal.webp', icon: 'Activity', text: 'Gentle, modern root canal therapy that relieves pain and saves the natural tooth.' },
  { title: 'Braces & Aligners', image: 'service-ortho.webp', icon: 'Smile', text: 'Straighten crooked or crowded teeth with metal, ceramic braces or clear aligners.' },
  { title: 'Tooth Extraction', image: 'service-extraction.webp', icon: 'Syringe', text: 'Comfortable extractions, including wisdom teeth, with careful after-care.' },
  { title: 'Crowns & Bridges', image: 'service-crowns.webp', icon: 'Award', text: 'Strong, tooth-coloured crowns and bridges to repair broken or weak teeth.' },
  { title: 'Smile Makeover', image: 'service-makeover.webp', icon: 'HeartPulse', text: 'Veneers, contouring and bonding planned together for the smile you want.' },
  { title: 'Kids Dentistry', image: 'service-kids.webp', icon: 'Baby', text: 'Friendly, patient care for children — from first visits to sealants and fluoride.' },
]

const journeys = [
  { title: 'A Brighter Smile', tags: ['Teeth Whitening', 'Cleaning'], image: 'journey-whitening.webp', text: 'Scaling and polishing followed by professional whitening for a noticeably brighter smile.' },
  { title: 'Straighter Teeth, More Confidence', tags: ['Braces', 'Aligners'], image: 'journey-braces.webp', text: 'A step-by-step orthodontic plan with regular reviews until the teeth are aligned.' },
]

const steps = [
  { title: 'Book Your Appointment', icon: 'CalendarCheck', text: 'Call, WhatsApp or fill the form below to pick a convenient time.' },
  { title: 'Consultation & Examination', icon: 'Stethoscope', text: 'A thorough check-up, with X-rays where needed, to understand your concerns.' },
  { title: 'Personalised Treatment Plan', icon: 'ClipboardList', text: 'Clear options, timelines and costs explained before anything begins.' },
  { title: 'Ongoing Care & Follow-Up', icon: 'HeartPulse', text: 'Follow-up visits and tips to keep your results healthy for years.' },
]

// Add real patient reviews (with permission) here, e.g.
// { name: 'Name', role: 'Root Canal Treatment', rating: 5, title: 'Painless', text: '...' }
// The Testimonials section stays hidden while this list is empty.
const testimonials = []

// Also used by the chat assistant and Google's FAQ results.
const faqs = [
  { q: 'What services do you offer?', a: 'We offer complete dental care: check-ups and cleaning, fillings, root canal treatment, extractions, crowns and bridges, dental implants, braces and aligners, teeth whitening, smile makeovers and children’s dentistry.' },
  { q: 'Do I need to make an appointment?', a: `Appointments are recommended so we can keep waiting time short. Call ${clinic.phoneDisplay} or send a WhatsApp message and we will confirm a time.` },
  { q: 'Do you accept walk-in patients?', a: 'Yes, walk-ins are welcome during clinic hours (Monday to Saturday, 10 AM – 7:30 PM; closed on Sunday). Patients with appointments are seen first, so calling ahead is best.' },
  { q: 'What should I do in a dental emergency?', a: `For severe tooth pain, swelling, a broken tooth or injury, call us immediately on ${clinic.phoneDisplay}. We will do our best to see you the same day.` },
  { q: 'Is root canal treatment painful?', a: 'Modern root canal treatment is done under local anaesthesia and feels similar to getting a filling. It actually relieves the pain caused by the infected tooth.' },
  { q: 'How often should I visit the dentist?', a: 'A check-up and cleaning every six months is recommended for most people. Some gum or orthodontic treatments need more frequent visits.' },
]

const tips = [
  { title: 'Brushing Right: The 2-Minute Rule', tag: 'Daily Care', image: 'tip-brushing.webp', text: 'Brush twice a day for two minutes with fluoride toothpaste, using gentle circles along the gum line.' },
  { title: 'Why Sensitive Teeth Hurt', tag: 'Sensitivity', image: 'tip-sensitivity.webp', text: 'Worn enamel and receding gums expose sensitive layers. A desensitising paste and a check-up can help.' },
  { title: 'Your Child’s First Dental Visit', tag: 'Kids', image: 'tip-kids.webp', text: 'Bring children in by their first birthday so the first visit is a friendly one, not an emergency.' },
]

const doctorFocus = ['Root canal treatment', 'Dental implants', 'Crowns, bridges and dentures', 'Teeth whitening and smile design', 'Braces and aligners', 'Children’s dentistry']

export default { siteUrl, clinic, brand, seo, text, marqueeItems, services, journeys, steps, testimonials, faqs, tips, doctorFocus }
