'use client'

import { useMemo, useState } from 'react'
import { Search, BadgeCheck, ArrowUpRight } from 'lucide-react'

type Profile = {
  name: string
  handle: string
  category: string
  main: string
  accent: string
  verified?: boolean
}

// A playful sample of the public directory.
const PROFILES: Profile[] = [
  { name: 'Zaytoun & Jamr', handle: 'zaytoun', category: 'Restaurant', main: '#FF5C42', accent: '#FFD23F', verified: true },
  { name: 'Noor Al-Abdullah', handle: 'noor.creates', category: 'Creator', main: '#E23E80', accent: '#FFC2D9', verified: true },
  { name: 'Layan Al-Hammadi', handle: 'layan', category: 'Founder', main: '#1F2430', accent: '#FFB020' },
  { name: 'Bloom Coffee', handle: 'bloom', category: 'Coffee shop', main: '#157F5A', accent: '#9CE84F' },
  { name: 'Yousef Karim', handle: 'yk.design', category: 'Designer', main: '#2D5BFF', accent: '#7CC6FF', verified: true },
  { name: 'Studio Marra', handle: 'marra', category: 'Studio', main: '#7A3CFF', accent: '#C9A7FF' },
  { name: 'Lina Haddad', handle: 'lina.eats', category: 'Food blogger', main: '#0FA3A3', accent: '#7FE3D2' },
  { name: 'Verde Market', handle: 'verde', category: 'Online store', main: '#157F5A', accent: '#9CE84F' },
  { name: 'Omar Nasser', handle: 'omar.dev', category: 'Developer', main: '#1F2430', accent: '#FFB020' },
  { name: 'Rima Sultan', handle: 'rima', category: 'Photographer', main: '#E23E80', accent: '#FFC2D9', verified: true },
  { name: 'Atlas Labs', handle: 'atlas', category: 'Agency', main: '#2D5BFF', accent: '#7CC6FF' },
  { name: 'Huda Farsi', handle: 'huda.art', category: 'Artist', main: '#FF5C42', accent: '#FFD23F' },
]

function readableOn(hex: string): string {
  const c = hex.replace('#', '')
  const r = Number.parseInt(c.slice(0, 2), 16)
  const g = Number.parseInt(c.slice(2, 4), 16)
  const b = Number.parseInt(c.slice(4, 6), 16)
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.62 ? '#1b1b1f' : '#ffffff'
}

function initials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
}

export function DiscoverSection() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return PROFILES
    return PROFILES.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.handle.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q),
    )
  }, [query])

  return (
    <section id="discover" className="scroll-mt-24 px-5 py-20">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-display text-xs font-bold uppercase tracking-widest text-primary">
            Discover
          </span>
          <h2 className="mt-3 text-balance font-display text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl">
            Find people & places on deets
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Search the public directory of creators, shops, and businesses sharing their deets.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-xl">
          <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-ring">
            <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try 'restaurant', 'creator', or a name…"
              className="w-full bg-transparent text-sm font-medium text-foreground outline-none placeholder:text-muted-foreground/70"
              aria-label="Search profiles"
            />
            <span className="hidden shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs font-semibold text-muted-foreground sm:block">
              deets.pro/
            </span>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <a
              key={p.handle}
              href="#"
              className="group flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-display text-sm font-extrabold"
                style={{ background: p.main, color: readableOn(p.main) }}
              >
                {initials(p.name)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1">
                  <p className="truncate font-display text-sm font-bold text-foreground">{p.name}</p>
                  {p.verified ? (
                    <BadgeCheck className="h-4 w-4 shrink-0 text-primary" aria-label="Verified" />
                  ) : null}
                </div>
                <p className="truncate text-xs text-muted-foreground">
                  deets.pro/{p.handle} · {p.category}
                </p>
              </div>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
            </a>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="mt-10 text-center text-sm text-muted-foreground">
            No profiles match &ldquo;{query}&rdquo; yet — that handle might be all yours.
          </p>
        ) : null}
      </div>
    </section>
  )
}
