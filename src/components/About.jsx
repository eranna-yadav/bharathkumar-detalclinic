import { ArrowUpRight, CircleCheck } from 'lucide-react'
import { clinic, marqueeItems, text } from '../data'
import { Photo, Reveal, SectionHeading, Sparkle, ToothIcon } from './ui'

export function About() {
  const points = text.about.points
  return (
    <section id="about" className="py-20 lg:py-28">
      <div className="container-x">
      <SectionHeading eyebrow={text.about.eyebrow} title={text.about.title} highlight={text.about.highlight} />
      <div className="mt-14 grid items-center gap-14 lg:grid-cols-2">
        <Reveal className="relative mx-auto w-full max-w-lg">
          <Sparkle className="absolute -left-2 top-4 h-8 w-8 text-primary" />
          <Sparkle className="absolute left-12 top-14 h-14 w-14 text-primary" />
          <Sparkle className="absolute left-2 top-28 h-4 w-4 text-primary" />
          <div className="tooth-mask isolate ml-auto aspect-[1/1.05] w-[78%] bg-primary-light">
            <Photo src="about-1.webp" alt={text.about.imageAlt} className="h-full w-full !object-contain object-bottom pt-[15%] mix-blend-multiply" />
          </div>
          <div className="absolute bottom-0 left-0 w-[44%] rounded-[40%] bg-white p-2">
            <div className="tooth-mask isolate aspect-[1/1.05] w-full bg-primary-light">
              <Photo src="about-2.webp" alt={text.about.smallImageAlt} className="h-full w-full object-[35%_50%] mix-blend-multiply" />
            </div>
          </div>
          <a href="#contact" aria-label="Contact us" className="absolute bottom-2 left-[46%] flex h-28 w-28 cursor-pointer items-center justify-center rounded-full bg-navy ring-8 ring-white transition-transform duration-200 hover:scale-105">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-spin-slow" aria-hidden="true">
              <defs><path id="circle-text" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" /></defs>
              <text className="fill-white text-[10px] font-bold uppercase"><textPath href="#circle-text" textLength="224" lengthAdjust="spacing">Contact • Contact • Contact •</textPath></text>
            </svg>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white"><ArrowUpRight className="h-5 w-5" /></span>
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-lg leading-relaxed text-muted">
            {text.about.body}
          </p>
          <ul className="mt-6 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-base text-ink">
                <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 fill-primary text-white" aria-hidden="true" /> {p}
              </li>
            ))}
          </ul>
          <a href="#dentist" className="btn-primary mt-8">Meet the Dentist</a>
        </Reveal>
      </div>
      </div>
    </section>
  )
}

export function Marquee({ className = '' }) {
  const items = [...marqueeItems, ...marqueeItems]
  return (
    <div className={`overflow-hidden bg-primary py-5 text-white ${className}`} aria-label="Our treatments">
      <ul className="flex w-max animate-marquee items-center gap-10 hover:[animation-play-state:paused]">
        {items.map((t, i) => (
          <li key={i} className="flex items-center gap-10 whitespace-nowrap text-xl font-semibold sm:text-2xl" aria-hidden={i >= marqueeItems.length}>
            <ToothIcon className="h-7 w-7" /> {t}
          </li>
        ))}
      </ul>
    </div>
  )
}
