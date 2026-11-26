import { useState } from 'react'
import { motion } from 'framer-motion'
import { Activity, Award, Baby, CalendarCheck, Circle, ClipboardList, HeartPulse, ShieldCheck, Smile, Sparkles, Stethoscope, Syringe } from 'lucide-react'

const Icons = { Activity, Award, Baby, CalendarCheck, ClipboardList, HeartPulse, ShieldCheck, Smile, Sparkles, Stethoscope, Syringe }

export const TOOTH_PATH =
  'M0.5,0.12 C0.38,0.02 0.12,0.0 0.05,0.2 C-0.02,0.4 0.08,0.6 0.15,0.8 C0.2,0.95 0.3,1.02 0.35,0.9 C0.4,0.78 0.43,0.68 0.5,0.68 C0.57,0.68 0.6,0.78 0.65,0.9 C0.7,1.02 0.8,0.95 0.85,0.8 C0.92,0.6 1.02,0.4 0.95,0.2 C0.88,0.0 0.62,0.02 0.5,0.12 Z'

export function ToothClipDef() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true">
      <defs>
        <clipPath id="tooth-clip" clipPathUnits="objectBoundingBox">
          <path d={TOOTH_PATH} />
        </clipPath>
      </defs>
    </svg>
  )
}

export function ToothIcon({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 5.5c-1.4-1-4-1.7-5.5.2-1.4 1.8-.6 4.5.2 6.6.8 2.2 1.1 5.7 2.4 5.7 1.1 0 1.1-3.8 2.9-3.8s1.8 3.8 2.9 3.8c1.3 0 1.6-3.5 2.4-5.7.8-2.1 1.6-4.8.2-6.6-1.5-1.9-4.1-1.2-5.5-.2z" />
    </svg>
  )
}

export function Icon({ name, className = 'h-6 w-6' }) {
  const C = Icons[name] || Circle
  return <C className={className} aria-hidden="true" />
}

/**
 * Shows /images/<src> if the file exists, otherwise a soft branded placeholder.
 * Drop real clinic photos into public/images to replace placeholders.
 */
export function Photo({ src, alt, className = '', label }) {
  const [failed, setFailed] = useState(!src)
  if (failed) {
    return (
      <div role="img" aria-label={alt} className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-light via-[#dfe6ff] to-[#c9d4ff] ${className}`}>
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/40" />
        <div className="absolute -bottom-10 -left-6 h-40 w-40 rounded-full bg-primary/10" />
        <div className="relative flex flex-col items-center gap-2 text-primary/70">
          <ToothIcon className="h-12 w-12" />
          {label && <span className="px-3 text-center text-xs font-semibold uppercase tracking-wider">{label}</span>}
        </div>
      </div>
    )
  }
  return <img src={`/images/${src}`} alt={alt} loading="lazy" onError={() => setFailed(true)} className={`object-cover ${className}`} />
}

export function Reveal({ children, delay = 0, className = '', y = 24 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeading({ eyebrow, title, highlight, after = '', light = false, className = '' }) {
  return (
    <Reveal className={`mx-auto max-w-3xl text-center ${className}`}>
      <p className={light ? 'eyebrow-light' : 'eyebrow'}>{eyebrow}</p>
      <h2 className={`mt-3 text-balance text-3xl font-bold leading-tight sm:text-4xl lg:text-[44px] ${light ? 'text-white' : 'text-navy'}`}>
        {title} <span className={light ? 'text-[#8EA2FF]' : 'text-primary'}>{highlight}</span>
        {after && <> {after}</>}
      </h2>
    </Reveal>
  )
}

export function Sparkle({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 0c.6 5.6 3.4 9.6 12 12-8.6 2.4-11.4 6.4-12 12-.6-5.6-3.4-9.6-12-12 8.6-2.4 11.4-6.4 12-12z" />
    </svg>
  )
}
