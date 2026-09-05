import { Star } from 'lucide-react'

type Quote = {
  quote: string
  name: string
  role: string
  main: string
}

const QUOTES: Quote[] = [
  {
    quote:
      'We put our deets QR on every table. Guests browse the menu, heart what they want, and show the waiter. Orders got faster overnight.',
    name: 'Zaytoun & Jamr',
    role: 'Restaurant · Riyadh',
    main: '#FF5C42',
  },
  {
    quote:
      'One link in my bio for everything — videos, presets, collabs. It finally looks like my brand instead of a plain list.',
    name: 'Noor Al-Abdullah',
    role: 'Creator · 128k followers',
    main: '#E23E80',
  },
  {
    quote:
      'I hand out my deets card at every meeting. People tap once and I am saved with my role, company, and links. No more paper cards.',
    name: 'Layan Al-Hammadi',
    role: 'Founder · Northlight Studio',
    main: '#1F2430',
  },
]

function readableOn(hex: string): string {
  const c = hex.replace('#', '')
  const r = Number.parseInt(c.slice(0, 2), 16)
  const g = Number.parseInt(c.slice(2, 4), 16)
  const b = Number.parseInt(c.slice(4, 6), 16)
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.62 ? '#1b1b1f' : '#ffffff'
}

export function TestimonialsSection() {
  return (
    <section className="px-5 py-20">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-display text-xs font-bold uppercase tracking-widest text-primary">
            Loved by sharers
          </span>
          <h2 className="mt-3 text-balance font-display text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl">
            People do more with one link
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {QUOTES.map((q) => (
            <figure
              key={q.name}
              className="flex flex-col rounded-3xl border border-border bg-card p-7"
            >
              <div className="flex gap-0.5 text-primary" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-pretty text-sm leading-relaxed text-foreground">
                {q.quote}
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full font-display text-xs font-extrabold"
                  style={{ background: q.main, color: readableOn(q.main) }}
                >
                  {q.name
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')}
                </span>
                <span>
                  <span className="block font-display text-sm font-bold text-foreground">{q.name}</span>
                  <span className="block text-xs text-muted-foreground">{q.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
