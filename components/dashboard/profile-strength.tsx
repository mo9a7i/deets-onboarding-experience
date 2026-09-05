'use client'

import Link from 'next/link'
import { Check, ChevronRight } from 'lucide-react'
import { useProfiles } from './store'

export function ProfileStrength() {
  const { account, active } = useProfiles()

  const items = [
    { key: 'name', label: 'Name your account', done: account.name.trim().length > 0, href: '/edit' },
    { key: 'phone', label: 'Add your phone number', done: account.phone.trim().length > 0, href: '/edit' },
    { key: 'email', label: 'Verify your email', done: account.emailVerified, href: '/edit' },
    { key: 'photo', label: 'Add a profile photo', done: !!active.avatarDataUrl, href: '/edit' },
    { key: 'socials', label: 'Add 3 social accounts', done: active.socials.length >= 3, href: '/edit' },
    { key: 'content', label: 'Add content to your page', done: active.links.length >= 1, href: '/edit' },
  ]

  const completed = items.filter((i) => i.done).length
  const pct = Math.round((completed / items.length) * 100)
  const radius = 26
  const circ = 2 * Math.PI * radius
  const dash = (pct / 100) * circ

  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 shrink-0">
          <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90">
            <circle cx="32" cy="32" r={radius} fill="none" stroke="var(--color-muted)" strokeWidth="7" />
            <circle
              cx="32"
              cy="32"
              r={radius}
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={`${dash} ${circ}`}
              className="transition-all duration-500"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center font-display text-sm font-extrabold text-foreground">
            {pct}%
          </span>
        </div>
        <div>
          <h2 className="font-display text-lg font-bold text-foreground">Profile strength</h2>
          <p className="text-sm text-muted-foreground">
            {completed === items.length
              ? 'All set — your profile is fully optimized.'
              : `${items.length - completed} steps left to a stronger profile.`}
          </p>
        </div>
      </div>

      <ul className="mt-5 flex flex-col gap-1.5">
        {items.map((item) => (
          <li key={item.key}>
            <Link
              href={item.href}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors ${
                item.done ? 'opacity-60' : 'hover:bg-muted'
              }`}
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
                  item.done ? 'border-primary bg-primary text-primary-foreground' : 'border-border'
                }`}
              >
                {item.done ? <Check className="h-3.5 w-3.5" /> : null}
              </span>
              <span
                className={`flex-1 text-sm font-medium ${
                  item.done ? 'text-muted-foreground line-through' : 'text-foreground'
                }`}
              >
                {item.label}
              </span>
              {!item.done ? (
                <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
