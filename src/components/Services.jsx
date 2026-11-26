import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { journeys, services, steps, text } from '../data'
import { Icon, Photo, Reveal, SectionHeading } from './ui'

export function Services() {
  return (
    <section id="services" className="bg-soft py-20 lg:py-28">
      <div className="container-x">
        <SectionHeading eyebrow={text.services.eyebrow} title={text.services.title} highlight={text.services.highlight} />

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.08}>
              <article className="group h-full rounded-2xl bg-white p-3 shadow-card transition-shadow duration-200 hover:shadow-xl">
                <div className="relative">
                  <Photo src={s.image} alt={s.title} label={s.title} className="aspect-[16/10] w-full rounded-xl" />
                  <span className="absolute -bottom-7 left-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white ring-4 ring-white">
                    <Icon name={s.icon} className="h-6 w-6" />
                  </span>
                </div>
                <div className="px-3 pb-4 pt-10">
                  <h3 className="text-xl font-bold text-navy">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{s.text}</p>
                  <a href="#appointment" className="mt-4 inline-flex items-center gap-2 font-semibold text-primary hover:underline">
                    Book this treatment <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Journeys() {
  return (
    <section className="bg-navy py-20 lg:py-28">
      <div className="container-x">
        <SectionHeading eyebrow={text.journeys.eyebrow} title={text.journeys.title} highlight={text.journeys.highlight} light />
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {journeys.map((j, i) => (
            <Reveal key={j.title} delay={i * 0.1}>
              <article className="group relative overflow-hidden rounded-2xl">
                <Photo src={j.image} alt={j.title} label={j.title} className="aspect-[4/3] w-full object-bottom transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy via-navy/80 to-transparent p-6 pt-24">
                  <div className="flex flex-wrap gap-2">
                    {j.tags.map((t) => <span key={t} className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">{t}</span>)}
                  </div>
                  <div className="mt-3 flex items-end justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white">{j.title}</h3>
                      <p className="mt-1 max-w-md text-white/85">{j.text}</p>
                    </div>
                    <a href="#appointment" aria-label={`Book: ${j.title}`} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-white hover:text-primary">
                      <ArrowUpRight className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 text-center"><a href="#appointment" className="btn-primary">{text.journeys.button}</a></Reveal>
      </div>
    </section>
  )
}

export function Steps() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-x">
        <SectionHeading eyebrow={text.steps.eyebrow} title={text.steps.title} highlight={text.steps.highlight} />
        <div className="relative mt-16">
        <div className="absolute left-[12.5%] right-[12.5%] top-12 hidden border-t-2 border-dashed border-primary/30 lg:block" aria-hidden="true" />
        <ol className="relative grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {steps.map((s, i) => (
            <li key={s.title} className="relative text-center">
              <Reveal delay={i * 0.12}>
                <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary text-white ring-8 ring-primary-light">
                  <Icon name={s.icon} className="h-9 w-9" />
                  <span className="absolute -right-2 -top-1 flex h-9 w-9 items-center justify-center rounded-full bg-navy text-sm font-bold text-white ring-4 ring-white">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-6 text-lg font-bold text-navy">{s.title}</h3>
                <p className="mx-auto mt-2 max-w-xs leading-relaxed text-muted">{s.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
        </div>
      </div>
    </section>
  )
}
