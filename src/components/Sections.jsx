import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, animate, motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, ChevronsLeftRight, CircleCheck, MapPin, MessageCircle, MessagesSquare, Minus, Phone, Plus, Quote, Star } from 'lucide-react'
import { clinic, doctorFocus, faqs, mapsLink, telLink, testimonials, tips, whatsappLink, text } from '../data'
import { Photo, Reveal, SectionHeading } from './ui'

export function BeforeAfter() {
  const [pos, setPos] = useState(50)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const touched = useRef(false)

  // Glide the divider once when the section comes into view, to show it can slide.
  useEffect(() => {
    if (!inView || reduce) return
    const c = animate(50, [50, 20, 80, 50], {
      duration: 3,
      ease: 'easeInOut',
      delay: 0.4,
      onUpdate: (v) => !touched.current && setPos(v),
    })
    return () => c.stop()
  }, [inView, reduce])

  return (
    <section className="py-20 lg:py-28">
      <div className="container-x">
        <SectionHeading eyebrow={text.beforeAfter.eyebrow} title={text.beforeAfter.title} highlight={text.beforeAfter.highlight} />
        <div ref={ref} className="relative mt-12 aspect-[4/3] w-full select-none overflow-hidden rounded-3xl bg-soft sm:aspect-[16/9]">
          {/* After (full, underneath) */}
          <Photo src="after.webp" alt="Bright white smile after teeth whitening" className="absolute inset-0 h-full w-full object-[50%_58%]" />
          <span className="absolute right-4 top-4 rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-white">After</span>

          {/* Before (on top, clipped to the left of the divider) — its label is clipped with it */}
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <Photo src="before.webp" alt="Stained, yellow smile before teeth whitening" className="absolute inset-0 h-full w-full object-[50%_58%]" />
            <span className="absolute left-4 top-4 rounded-full bg-navy px-4 py-1.5 text-sm font-semibold text-white">Before</span>
          </div>

          <div className="pointer-events-none absolute inset-y-0 w-1 -translate-x-1/2 bg-white" style={{ left: `${pos}%` }}>
            <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary shadow-card"><ChevronsLeftRight className="h-6 w-6" /></span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="0.5"
            value={pos}
            onPointerDown={() => (touched.current = true)}
            onKeyDown={() => (touched.current = true)}
            onChange={(e) => { touched.current = true; setPos(+e.target.value) }}
            aria-label="Drag to compare before and after"
            className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
          />
        </div>
        <p className="mt-4 text-center text-sm text-muted">Drag the slider to compare</p>
        <Reveal className="mt-8 text-center"><a href="#appointment" className="btn-primary">{text.beforeAfter.button}</a></Reveal>
      </div>
    </section>
  )
}

export function Testimonials() {
  const [i, setI] = useState(0)
  const n = testimonials.length
  if (n === 0) return null
  const pair = [testimonials[i % n], testimonials[(i + 1) % n]]
  return (
    <section className="bg-navy py-20 lg:py-28">
      <div className="container-x">
        <SectionHeading eyebrow={text.testimonials.eyebrow} title={text.testimonials.title} highlight={text.testimonials.highlight} after={text.testimonials.after} light />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {pair.map((t, k) => (
              <motion.figure key={`${i}-${k}`} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4, delay: k * 0.05 }} className={`rounded-2xl bg-white p-8 ${k === 1 ? 'hidden md:block' : ''}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1" aria-label={`${t.rating} out of 5 stars`}>
                    {Array.from({ length: 5 }).map((_, s) => <Star key={s} className={`h-5 w-5 ${s < t.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} aria-hidden="true" />)}
                    <span className="ml-2 font-semibold text-navy">{t.rating}.0</span>
                  </div>
                  <Quote className="h-10 w-10 text-primary/20" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-navy">{t.title}</h3>
                <blockquote className="mt-3 leading-relaxed text-muted">“{t.text}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-light font-bold text-primary">{t.name[0]}</span>
                  <span><strong className="block text-navy">{t.name}</strong><span className="text-sm text-muted">{t.role}</span></span>
                </figcaption>
              </motion.figure>
            ))}
          </AnimatePresence>
        </div>
        <div className="mt-10 flex items-center justify-center gap-4">
          <button type="button" onClick={() => setI((i - 1 + n) % n)} className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/30 text-white hover:bg-white/10" aria-label="Previous testimonial"><ChevronLeft className="h-5 w-5" /></button>
          <div className="flex gap-2">
            {testimonials.map((_, d) => (
              <button key={d} type="button" onClick={() => setI(d)} aria-label={`Show testimonial ${d + 1}`} aria-current={d === i} className="flex h-11 cursor-pointer items-center">
                <span className={`block h-1.5 rounded-full transition-all duration-300 ${d === i ? 'w-10 bg-primary' : 'w-6 bg-white/30'}`} />
              </button>
            ))}
          </div>
          <button type="button" onClick={() => setI((i + 1) % n)} className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/30 text-white hover:bg-white/10" aria-label="Next testimonial"><ChevronRight className="h-5 w-5" /></button>
        </div>
      </div>
    </section>
  )
}

export function Dentist() {
  return (
    <section id="dentist" className="py-20 lg:py-28">
      <div className="container-x">
      <SectionHeading eyebrow={text.dentist.eyebrow} title={text.dentist.title} highlight={text.dentist.highlight} />
      <div className="mt-14 grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
        <Reveal className="relative">
          <div className="absolute -left-4 -top-4 h-full w-full rounded-3xl bg-primary-light" aria-hidden="true" />
          <Photo src="doctor.webp" alt={`${clinic.doctor}, dentist at ${clinic.name}`} className="relative aspect-[4/5] w-full rounded-3xl object-top" />
        </Reveal>
        <Reveal delay={0.1}>
          <h3 className="text-3xl font-bold text-navy sm:text-4xl">{clinic.doctor}</h3>
          <p className="mt-1 text-lg font-semibold text-primary">{clinic.doctorRole} · {clinic.name}</p>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            {text.dentist.bio}
          </p>
          <h3 className="mt-8 text-lg font-bold text-navy">Areas of Care</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {doctorFocus.map((f) => (
              <li key={f} className="flex items-center gap-3 rounded-xl bg-soft px-4 py-3 text-ink">
                <CircleCheck className="h-5 w-5 shrink-0 fill-primary text-white" aria-hidden="true" /> {f}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#appointment" className="btn-primary">Book with {clinic.doctor}</a>
            <a href={telLink} className="btn-ghost"><Phone className="h-4 w-4" aria-hidden="true" /> {clinic.phoneDisplay}</a>
          </div>
        </Reveal>
      </div>
      </div>
    </section>
  )
}

export function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" className="bg-navy py-20 lg:py-28">
      <div className="container-x">
        <SectionHeading eyebrow={text.faq.eyebrow} title={text.faq.title} highlight={text.faq.highlight} light />
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-4">
            {faqs.map((f, i) => {
              const isOpen = open === i
              return (
                <Reveal key={f.q} delay={i * 0.04}>
                  <div className={`overflow-hidden rounded-xl transition-colors duration-200 ${isOpen ? 'bg-primary text-white' : 'bg-white text-navy'}`}>
                    <h3>
                      <button type="button" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen} aria-controls={`faq-${i}`} className="flex min-h-[56px] w-full cursor-pointer items-center justify-between gap-4 px-6 py-4 text-left text-base font-semibold sm:text-lg">
                        {f.q}
                        {isOpen ? <Minus className="h-5 w-5 shrink-0" aria-hidden="true" /> : <Plus className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />}
                      </button>
                    </h3>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div id={`faq-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                          <p className="px-6 pb-5 leading-relaxed text-white/90">{f.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              )
            })}
          </div>
          <Reveal delay={0.1} className="space-y-6">
            <div className="rounded-2xl bg-primary p-8 text-center text-white">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-primary"><MessagesSquare className="h-7 w-7" aria-hidden="true" /></span>
              <h3 className="mt-5 text-2xl font-bold">{text.faq.cardTitle}</h3>
              <p className="mt-2 text-white/85">{text.faq.cardText}</p>
              <a href={whatsappLink('Hello, I have a question about dental treatment.')} target="_blank" rel="noreferrer" className="btn-white mt-6"><MessageCircle className="h-4 w-4" aria-hidden="true" /> Chat on WhatsApp</a>
            </div>
            <a href={telLink} className="flex items-center gap-4 rounded-2xl bg-white p-6 transition-shadow hover:shadow-xl">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary"><Phone className="h-6 w-6" aria-hidden="true" /></span>
              <span><span className="block text-sm text-muted">Call the clinic</span><span className="block text-xl font-bold text-navy">{clinic.phoneDisplay}</span></span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export function Tips() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-x">
        <SectionHeading eyebrow={text.tips.eyebrow} title={text.tips.title} highlight={text.tips.highlight} />
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {tips.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.08}>
              <article className="h-full overflow-hidden rounded-2xl bg-white shadow-card">
                <div className="relative">
                  <Photo src={t.image} alt={t.title} label={t.tag} className="aspect-[16/10] w-full" />
                  <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">{t.tag}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-navy">{t.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{t.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 text-center"><a href="#appointment" className="btn-primary">{text.tips.button}</a></Reveal>
      </div>
    </section>
  )
}

export function CallToAction() {
  return (
    <section className="pb-20 lg:pb-28">
      <div className="container-x">
        <Reveal className="relative overflow-hidden rounded-3xl bg-primary px-6 py-14 text-center text-white sm:px-12">
          <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-white/10" aria-hidden="true" />
          <div className="absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-white/10" aria-hidden="true" />
          <p className="eyebrow relative text-white">{text.cta.eyebrow}</p>
          <h2 className="relative mx-auto mt-3 max-w-2xl text-3xl font-bold sm:text-4xl">{text.cta.title}</h2>
          <p className="relative mx-auto mt-4 flex max-w-xl items-start justify-center gap-2 text-white/90"><MapPin className="mt-1 h-5 w-5 shrink-0" aria-hidden="true" /> {clinic.addressLines.join(', ')}</p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-4">
            <a href={telLink} className="btn-white"><Phone className="h-4 w-4" aria-hidden="true" /> Call {clinic.phoneDisplay}</a>
            <a href="#appointment" className="btn border border-white text-white hover:bg-white/10">Book Appointment <ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
