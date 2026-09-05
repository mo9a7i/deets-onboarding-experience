'use client'

import { useState } from 'react'
import { ArrowDownRight, ArrowUpRight, Info } from 'lucide-react'

type Props = {
  label: string
  value: string
  delta?: number
  hint?: string
}

export function StatCard({ label, value, delta, hint }: Props) {
  const [showHint, setShowHint] = useState(false)
  const positive = (delta ?? 0) >= 0

  return (
    <div className="relative rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-1.5">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        {hint ? (
          <span className="relative inline-flex">
            <button
              type="button"
              aria-label={`What is ${label}?`}
              onMouseEnter={() => setShowHint(true)}
              onMouseLeave={() => setShowHint(false)}
              onFocus={() => setShowHint(true)}
              onBlur={() => setShowHint(false)}
              className="flex h-4 w-4 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
            >
              <Info className="h-3.5 w-3.5" />
            </button>
            {showHint ? (
              <span className="absolute bottom-full left-1/2 z-20 mb-2 w-52 -translate-x-1/2 rounded-lg bg-foreground px-3 py-2 text-xs font-medium leading-relaxed text-background shadow-lg">
                {hint}
              </span>
            ) : null}
          </span>
        ) : null}
      </div>
      <div className="mt-2 flex items-end justify-between">
        <span className="font-display text-3xl font-extrabold tracking-tight text-foreground">{value}</span>
        {delta !== undefined ? (
          <span
            className={`inline-flex items-center gap-0.5 text-sm font-semibold ${
              positive ? 'text-emerald-600' : 'text-destructive'
            }`}
          >
            {positive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
            {Math.abs(delta)}%
          </span>
        ) : null}
      </div>
    </div>
  )
}
