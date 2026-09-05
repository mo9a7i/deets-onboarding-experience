'use client'

import { useState } from 'react'
import { Mail, MessageCircle, MapPin, Check, Send } from 'lucide-react'

const DETAILS = [
  { icon: Mail, label: 'Email us', value: 'hello@deets.pro' },
  { icon: MessageCircle, label: 'Live chat', value: 'Mon–Fri, 9am–6pm' },
  { icon: MapPin, label: 'Studio', value: 'Riyadh · Remote-first' },
]

export function ContactSection() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const valid =
    form.name.trim().length > 0 && /.+@.+\..+/.test(form.email) && form.message.trim().length > 0

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!valid) return
    setSent(true)
  }

  return (
    <section id="contact" className="scroll-mt-24 px-5 py-20">
      <div className="mx-auto grid w-full max-w-6xl gap-12 md:grid-cols-2">
        <div>
          <span className="font-display text-xs font-bold uppercase tracking-widest text-primary">
            Contact us
          </span>
          <h2 className="mt-3 text-balance font-display text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl">
            Questions? We&apos;re listening.
          </h2>
          <p className="mt-4 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
            Whether you run a cafe, a studio, or a growing following — tell us what you want to share
            and we&apos;ll help you shape it.
          </p>

          <div className="mt-8 space-y-4">
            {DETAILS.map((d) => (
              <div key={d.label} className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                  <d.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-display text-sm font-bold text-foreground">{d.label}</p>
                  <p className="text-sm text-muted-foreground">{d.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
          {sent ? (
            <div className="flex h-full flex-col items-center justify-center py-10 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Check className="h-7 w-7" />
              </div>
              <h3 className="mt-5 font-display text-2xl font-extrabold tracking-tight text-foreground">
                Message sent!
              </h3>
              <p className="mt-2 max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
                Thanks {form.name.split(' ')[0] || 'there'} — we&apos;ll get back to you at{' '}
                {form.email} shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSent(false)
                  setForm({ name: '', email: '', message: '' })
                }}
                className="mt-6 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Field label="Your name">
                <input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Noor Al-Abdullah"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring"
                  required
                />
              </Field>
              <Field label="Email">
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring"
                  required
                />
              </Field>
              <Field label="Message">
                <textarea
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder="Tell us what you'd like to share…"
                  rows={4}
                  className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring"
                  required
                />
              </Field>
              <button
                type="submit"
                disabled={!valid}
                className="group mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-display text-sm font-bold text-primary-foreground transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Send message
                <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-display text-xs font-bold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  )
}
