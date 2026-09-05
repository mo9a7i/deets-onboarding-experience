'use client'

import { Check } from 'lucide-react'

export type Accent = 'orange' | 'green'

const OPTIONS: { id: Accent; name: string; from: string; to: string }[] = [
  { id: 'orange', name: 'Sunset', from: 'oklch(0.66 0.2 28)', to: 'oklch(0.88 0.15 90)' },
  { id: 'green', name: 'Forest', from: 'oklch(0.62 0.15 158)', to: 'oklch(0.9 0.09 160)' },
]

export function ThemePicker({
  accent,
  onChange,
}: {
  accent: Accent
  onChange: (accent: Accent) => void
}) {
  return (
    <div
      className="fixed bottom-4 right-4 z-50 rounded-2xl border border-border bg-card/95 p-2 shadow-xl backdrop-blur"
      role="group"
      aria-label="Accent color"
    >
      <p className="px-1 pb-1.5 pt-0.5 text-center font-display text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
        Accent
      </p>
      <div className="flex gap-2">
        {OPTIONS.map((opt) => {
          const active = accent === opt.id
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id)}
              aria-pressed={active}
              className={`relative flex w-20 flex-col items-center gap-1.5 rounded-xl border p-2 transition-colors ${
                active ? 'border-primary bg-muted' : 'border-border hover:bg-muted'
              }`}
            >
              <span
                className="h-10 w-full rounded-lg"
                style={{ background: `linear-gradient(135deg, ${opt.from}, ${opt.to})` }}
              />
              <span className="text-xs font-semibold text-foreground">{opt.name}</span>
              {active ? (
                <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-2.5 w-2.5" strokeWidth={3} />
                </span>
              ) : null}
            </button>
          )
        })}
      </div>
    </div>
  )
}
