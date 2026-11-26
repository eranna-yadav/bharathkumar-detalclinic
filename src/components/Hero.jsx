import { motion } from 'framer-motion'
import { ArrowRight, Calendar, Clock, Phone, ShieldCheck, Star, User } from 'lucide-react'
import { clinic, telLink, text } from '../data'
import { Sparkle } from './ui'

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-soft">
      <div className="container-x grid items-center gap-10 pb-28 pt-12 lg:grid-cols-2 lg:pb-36 lg:pt-16">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-navy shadow-card">
            <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" /> {text.hero.badge}
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] text-navy sm:text-5xl lg:text-6xl">
            {text.hero.titleStart} <span className="text-primary">{text.hero.titleHighlight}</span>
            <br /> {text.hero.titleEnd}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            {text.hero.intro}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#appointment" className="btn-primary">Book an Appointment <ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
            <a href={telLink} className="btn-ghost"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary shadow-card"><Phone className="h-4 w-4" aria-hidden="true" /></span> {clinic.phoneDisplay}</a>
          </div>
        </motion.div>

        <motion.div className="relative mx-auto w-full max-w-md lg:max-w-none" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.15 }}>
          <Sparkle className="absolute left-2 top-6 z-10 h-8 w-8 text-primary" />
          <Sparkle className="absolute right-4 top-12 z-10 h-5 w-5 text-primary/60" />
          <div className="relative isolate mx-auto w-[92%] bg-soft">
            <img
              src="/images/hero.webp"
              alt={text.hero.imageAlt}
              width="900"
              height="980"
              fetchpriority="high"
              className="w-full mix-blend-multiply"
              style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, #000 6%, #000 94%, transparent), linear-gradient(to bottom, transparent, #000 6%)', WebkitMaskComposite: 'source-in', maskImage: 'linear-gradient(to right, transparent, #000 6%, #000 94%, transparent), linear-gradient(to bottom, transparent, #000 6%)', maskComposite: 'intersect' }}
            />
          </div>
          <motion.div className="absolute -left-2 bottom-16 z-10 flex items-center gap-3 rounded-2xl bg-white p-3 pr-5 shadow-card sm:left-0" animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity }}>
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-light text-primary"><Star className="h-5 w-5 fill-current" aria-hidden="true" /></span>
            <span className="text-sm"><strong className="block text-navy">{text.hero.cards[0].title}</strong><span className="text-muted">{text.hero.cards[0].text}</span></span>
          </motion.div>
          <motion.div className="absolute -right-2 top-24 z-10 hidden rounded-2xl bg-white p-4 shadow-card sm:right-0 sm:block" animate={{ y: [0, 8, 0] }} transition={{ duration: 5, repeat: Infinity }}>
            <strong className="block text-navy">{text.hero.cards[1].title}</strong>
            <span className="text-sm text-muted">{text.hero.cards[1].text}</span>
          </motion.div>
        </motion.div>
      </div>

      <QuickBooking />
    </section>
  )
}

function QuickBooking() {
  return (
    <div className="container-x relative -mt-20 pb-12 lg:-mt-24">
      <motion.form
        action="#appointment"
        onSubmit={(e) => {
          e.preventDefault()
          const f = new FormData(e.currentTarget)
          window.dispatchEvent(new CustomEvent('prefill-booking', { detail: Object.fromEntries(f) }))
          document.getElementById('appointment')?.scrollIntoView({ behavior: 'smooth' })
        }}
        className="grid gap-4 rounded-2xl bg-white p-5 shadow-card sm:grid-cols-2 lg:grid-cols-[repeat(4,1fr)_auto] lg:items-end lg:p-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <QuickField icon={User} id="q-name" label="Name"><input id="q-name" name="name" className="field" placeholder="Your name" autoComplete="name" /></QuickField>
        <QuickField icon={Phone} id="q-phone" label="Phone Number"><input id="q-phone" name="phone" type="tel" className="field" placeholder="Your phone" autoComplete="tel" /></QuickField>
        <QuickField icon={Calendar} id="q-date" label="Preferred Date"><input id="q-date" name="date" type="date" className="field" /></QuickField>
        <QuickField icon={Clock} id="q-time" label="Preferred Time"><input id="q-time" name="time" type="time" className="field" /></QuickField>
        <button type="submit" className="btn-primary h-12 sm:col-span-2 lg:col-span-1">Book Appointment</button>
      </motion.form>
    </div>
  )
}

function QuickField({ icon: I, id, label, children }) {
  return (
    <div>
      <label htmlFor={id} className="label flex items-center gap-2"><I className="h-4 w-4 text-primary" aria-hidden="true" />{label}</label>
      {children}
    </div>
  )
}
