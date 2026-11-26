import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bot, MessageCircleMore, Send, X } from 'lucide-react'
import { siWhatsapp } from 'simple-icons'
import { clinic, whatsappLink } from '../data'
import { answer, quickReplies, welcome } from './knowledge'

function WhatsAppIcon({ className = 'h-7 w-7' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d={siWhatsapp.path} />
    </svg>
  )
}

export default function FloatingActions() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([{ from: 'bot', ...welcome }])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const listRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing])

  useEffect(() => {
    if (!open) return
    inputRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const ask = (text) => {
    const q = text.trim()
    if (!q || typing) return
    setMessages((m) => [...m, { from: 'user', text: q }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setMessages((m) => [...m, { from: 'bot', ...answer(q) }])
      setTyping(false)
    }, 500)
  }

  return (
    <>
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
        <a
          href={whatsappLink(`Hello ${clinic.name}, I have an enquiry.`)}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="group flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-card transition-transform duration-200 hover:scale-105"
        >
          <WhatsAppIcon />
          <span className="pointer-events-none absolute right-16 hidden whitespace-nowrap rounded-lg bg-navy px-3 py-1.5 text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 md:block">WhatsApp us</span>
        </a>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close chat assistant' : 'Open chat assistant'}
          aria-expanded={open}
          aria-controls="chat-panel"
          className="relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-card transition-colors duration-200 hover:bg-primary-dark"
        >
          {!open && <span className="absolute inset-0 animate-ping rounded-full bg-primary/40 motion-reduce:hidden" aria-hidden="true" />}
          {open ? <X className="relative h-6 w-6" /> : <MessageCircleMore className="relative h-7 w-7" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.section
            id="chat-panel"
            role="dialog"
            aria-label={`${clinic.name} chat assistant`}
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-[9.5rem] right-4 z-50 flex h-[min(560px,calc(100dvh-11rem))] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200 sm:right-5"
          >
            <header className="flex items-center gap-3 bg-primary px-4 py-3 text-white">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15"><Bot className="h-5 w-5" aria-hidden="true" /></span>
              <div className="min-w-0 flex-1">
                <h2 className="truncate font-bold">{clinic.shortName} Dental Assistant</h2>
                <p className="text-xs text-white/80">Instant answers from our website</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full hover:bg-white/15">
                <X className="h-5 w-5" />
              </button>
            </header>

            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto bg-soft p-4" aria-live="polite">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed ${m.from === 'user' ? 'rounded-br-sm bg-primary text-white' : 'rounded-bl-sm bg-white text-ink shadow-sm'}`}>
                    <p className="whitespace-pre-line">{m.text}</p>
                    {m.actions?.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {m.actions.map((a) => (
                          <a
                            key={a.label}
                            href={a.href}
                            {...(a.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                            onClick={() => a.href.startsWith('#') && setOpen(false)}
                            className="inline-flex min-h-[36px] items-center rounded-full border border-primary px-3 text-sm font-semibold text-primary hover:bg-primary-light"
                          >
                            {a.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start" aria-label="Assistant is typing">
                  <div className="flex gap-1 rounded-2xl rounded-bl-sm bg-white px-4 py-3 shadow-sm">
                    {[0, 1, 2].map((d) => <span key={d} className="h-2 w-2 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: `${d * 0.15}s` }} />)}
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2 overflow-x-auto border-t border-slate-100 px-3 py-2">
              {quickReplies.map((q) => (
                <button key={q} type="button" onClick={() => ask(q)} className="shrink-0 cursor-pointer rounded-full bg-primary-light px-3 py-1.5 text-sm font-medium text-primary hover:bg-[#dbe1ff]">
                  {q}
                </button>
              ))}
            </div>

            <form onSubmit={(e) => { e.preventDefault(); ask(input) }} className="flex items-center gap-2 border-t border-slate-100 p-3">
              <label htmlFor="chat-input" className="sr-only">Type your question</label>
              <input
                id="chat-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question…"
                autoComplete="off"
                className="min-h-[44px] flex-1 rounded-full border border-slate-300 px-4 text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button type="submit" disabled={!input.trim() || typing} aria-label="Send" className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50">
                <Send className="h-5 w-5" />
              </button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  )
}
