import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CircleCheck, Clock, MessageCircle, Phone } from 'lucide-react'
import { clinic, services, telLink, whatsappLink, text } from '../data'
import { Reveal, SectionHeading } from './ui'

const empty = { name: '', phone: '', treatment: '', date: '', time: '', notes: '' }

export default function Booking() {
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const onPrefill = (e) => setForm((f) => ({ ...f, ...Object.fromEntries(Object.entries(e.detail).filter(([, v]) => v)) }))
    window.addEventListener('prefill-booking', onPrefill)
    return () => window.removeEventListener('prefill-booking', onPrefill)
  }, [])

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!form.name.trim()) errs.name = 'Please enter your name.'
    if (!/^[0-9+\s-]{10,15}$/.test(form.phone.trim())) errs.phone = 'Please enter a valid 10-digit phone number.'
    setErrors(errs)
    if (Object.keys(errs).length) return
    const msg = [
      `Hello ${clinic.name}, I would like to book an appointment.`,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      form.treatment && `Treatment: ${form.treatment}`,
      form.date && `Preferred date: ${form.date}`,
      form.time && `Preferred time: ${form.time}`,
      form.notes && `Notes: ${form.notes}`,
    ].filter(Boolean).join('\n')
    window.open(whatsappLink(msg), '_blank', 'noopener')
    setSent(true)
  }

  return (
    <section id="appointment" className="bg-soft py-20 lg:py-28">
      <div className="container-x">
      <SectionHeading eyebrow={text.booking.eyebrow} title={text.booking.title} highlight={text.booking.highlight} />
      <p className="mx-auto mt-4 max-w-xl text-center text-muted">{text.booking.intro}</p>
      <div className="mt-12 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <form onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2">
            <Field id="b-name" label="Your Name *" error={errors.name}>
              <input id="b-name" className="field" value={form.name} onChange={set('name')} placeholder="Full name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'b-name-err' : undefined} />
            </Field>
            <Field id="b-phone" label="Phone Number *" error={errors.phone}>
              <input id="b-phone" type="tel" inputMode="tel" className="field" value={form.phone} onChange={set('phone')} placeholder="10-digit mobile number" autoComplete="tel" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'b-phone-err' : undefined} />
            </Field>
            <Field id="b-treatment" label="Type of Treatment">
              <select id="b-treatment" className="field cursor-pointer" value={form.treatment} onChange={set('treatment')}>
                <option value="">Select (optional)</option>
                {services.map((s) => <option key={s.title}>{s.title}</option>)}
                <option>Not sure / Check-up</option>
              </select>
            </Field>
            <Field id="b-date" label="Preferred Date">
              <input id="b-date" type="date" className="field" value={form.date} onChange={set('date')} min={new Date().toISOString().slice(0, 10)} />
            </Field>
            <Field id="b-time" label="Preferred Time">
              <input id="b-time" type="time" className="field" value={form.time} onChange={set('time')} />
            </Field>
            <div className="hidden sm:block" />
            <Field id="b-notes" label="Special Requests or Notes" className="sm:col-span-2">
              <textarea id="b-notes" rows={4} className="field" value={form.notes} onChange={set('notes')} placeholder="Tell us about your concern (optional)" />
            </Field>
            <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
              <button type="submit" className="btn-primary"><MessageCircle className="h-4 w-4" aria-hidden="true" /> Send via WhatsApp</button>
              <a href={telLink} className="btn border border-primary text-primary hover:bg-primary-light"><Phone className="h-4 w-4" aria-hidden="true" /> Or call {clinic.phoneDisplay}</a>
            </div>
            {sent && (
              <motion.p role="status" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 font-medium text-green-700 sm:col-span-2">
                <CircleCheck className="h-5 w-5" aria-hidden="true" /> WhatsApp opened with your details — just tap send. If it didn’t open, please call us.
              </motion.p>
            )}
          </form>
        </Reveal>

        <Reveal delay={0.1} className="space-y-6">
          <div className="rounded-2xl bg-primary p-8 text-white">
            <h3 className="flex items-center gap-2 text-xl font-bold"><Clock className="h-5 w-5" aria-hidden="true" /> Clinic Hours</h3>
            <dl className="mt-6 divide-y divide-white/20">
              {clinic.hours.map((h) => (
                <div key={h.day} className="flex justify-between gap-4 py-3">
                  <dt className="text-white/85">{h.day}</dt>
                  <dd className="font-semibold">{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>
          <a href={telLink} className="flex items-center gap-4 rounded-2xl bg-white p-6 shadow-card transition-shadow hover:shadow-xl">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary"><Phone className="h-6 w-6" aria-hidden="true" /></span>
            <span>
              <span className="block text-sm text-muted">Dental emergency? Call now</span>
              <span className="block text-xl font-bold text-navy">{clinic.phoneDisplay}</span>
            </span>
          </a>
        </Reveal>
      </div>
      </div>
    </section>
  )
}

function Field({ id, label, error, children, className = '' }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="label">{label}</label>
      {children}
      {error && <p id={`${id}-err`} className="mt-1.5 text-sm font-medium text-red-700">{error}</p>}
    </div>
  )
}
