import { Clock, MapPin, MessageCircle, Phone } from 'lucide-react'
import { clinic, mapsEmbed, mapsLink, navLinks, services, telLink, whatsappLink, text } from '../data'
import { Logo } from './Header'

export default function Footer() {
  return (
    <footer id="contact" className="bg-navy text-white/85">
      <div className="container-x grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-5 leading-relaxed">{text.footer.about}</p>
          <a href={whatsappLink()} target="_blank" rel="noreferrer" className="mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-white/10 px-5 font-semibold text-white hover:bg-white/20">
            <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp Us
          </a>
        </div>
        <nav aria-label="Footer">
          <h2 className="text-lg font-bold text-white">Quick Links</h2>
          <ul className="mt-5 space-y-3">
            {navLinks.map((l) => <li key={l.href}><a href={l.href} className="hover:text-white hover:underline">{l.label}</a></li>)}
            <li><a href="#appointment" className="hover:text-white hover:underline">Book Appointment</a></li>
          </ul>
        </nav>
        <div>
          <h2 className="text-lg font-bold text-white">Treatments</h2>
          <ul className="mt-5 space-y-3">
            {services.slice(0, 6).map((s) => <li key={s.title}><a href="#services" className="hover:text-white hover:underline">{s.title}</a></li>)}
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Contact Info</h2>
          <ul className="mt-5 space-y-4">
            <li><a href={mapsLink} target="_blank" rel="noreferrer" className="flex gap-3 hover:text-white"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#8EA2FF]" aria-hidden="true" /><span>{clinic.addressLines[0]},<br />{clinic.addressLines[1]}</span></a></li>
            <li><a href={telLink} className="flex gap-3 hover:text-white"><Phone className="h-5 w-5 shrink-0 text-[#8EA2FF]" aria-hidden="true" />{clinic.phoneDisplay}</a></li>
            {clinic.hours.map((h) => (
              <li key={h.day} className="flex gap-3"><Clock className="h-5 w-5 shrink-0 text-[#8EA2FF]" aria-hidden="true" /><span>{h.day}: {h.time}</span></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container-x pb-12">
        <iframe title={`Map to ${clinic.name}`} src={mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-72 w-full rounded-2xl border-0" />
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-sm sm:flex-row">
          <p>© {new Date().getFullYear()} {clinic.name}. All rights reserved.</p>
          <p>{text.footer.bottom}</p>
        </div>
      </div>
    </footer>
  )
}
