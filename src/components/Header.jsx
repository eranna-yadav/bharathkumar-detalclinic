import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Clock, MapPin, Menu, MessageCircle, Phone, X } from 'lucide-react'
import { clinic, navLinks, telLink, whatsappLink, mapsLink, brand } from '../data'
import { ToothIcon } from './ui'

export function Logo({ light = false }) {
  return (
    <a href="#home" className="flex items-center gap-2.5" aria-label={`${clinic.name} home`}>
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
        <ToothIcon className="h-6 w-6" />
      </span>
      <span className="leading-tight">
        <span className={`block text-lg font-extrabold tracking-tight ${light ? 'text-white' : 'text-navy'}`}>{brand.logoTop}</span>
        <span className={`block text-[11px] font-semibold uppercase tracking-[0.2em] ${light ? 'text-white/70' : 'text-primary'}`}>{brand.logoBottom}</span>
      </span>
    </a>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <>
      <div className="hidden bg-primary text-white md:block">
        <div className="container-x flex h-11 items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <a href={telLink} className="flex items-center gap-2 hover:underline"><Phone className="h-4 w-4" aria-hidden="true" /> {clinic.phoneDisplay}</a>
            <a href={mapsLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:underline"><MapPin className="h-4 w-4" aria-hidden="true" /> {clinic.shortArea}</a>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2"><Clock className="h-4 w-4" aria-hidden="true" /> {clinic.hours[0].day}: {clinic.hours[0].time}</span>
            <a href={whatsappLink()} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:underline"><MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp</a>
          </div>
        </div>
      </div>

      <header className={`sticky top-0 z-40 bg-white/95 backdrop-blur transition-shadow duration-200 ${scrolled ? 'shadow-card' : ''}`}>
        <div className="container-x flex h-20 items-center justify-between">
          <Logo />
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-[15px] font-medium text-navy transition-colors duration-200 hover:text-primary">{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <a href="#appointment" className="btn-primary hidden sm:inline-flex">Book Appointment</a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-navy hover:bg-soft lg:hidden"
              aria-label="Open menu"
              aria-expanded={open}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-50 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-navy/60" onClick={() => setOpen(false)} />
            <motion.nav
              aria-label="Mobile"
              className="absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col bg-white p-6"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button type="button" onClick={() => setOpen(false)} className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full hover:bg-soft" aria-label="Close menu">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <ul className="mt-8 flex flex-col">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} onClick={() => setOpen(false)} className="block border-b border-slate-100 py-4 text-lg font-semibold text-navy hover:text-primary">{l.label}</a>
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-col gap-3">
                <a href={telLink} className="btn-primary"><Phone className="h-4 w-4" aria-hidden="true" /> Call {clinic.phoneDisplay}</a>
                <a href="#appointment" onClick={() => setOpen(false)} className="btn border border-primary text-primary hover:bg-primary-light">Book Appointment</a>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
