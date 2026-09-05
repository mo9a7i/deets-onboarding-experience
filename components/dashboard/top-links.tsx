'use client'

import { ExternalLink } from 'lucide-react'
import type { LinkItem } from './store'

export function TopLinks({ links, limit }: { links: LinkItem[]; limit?: number }) {
  const sorted = [...links].sort((a, b) => b.clicks - a.clicks)
  const shown = limit ? sorted.slice(0, limit) : sorted
  const max = Math.max(...shown.map((l) => l.clicks), 1)

  if (!shown.length) {
    return (
      <p className="rounded-xl bg-muted px-4 py-6 text-center text-sm text-muted-foreground">
        No links yet. Add content to your page to start tracking clicks.
      </p>
    )
  }

  return (
    <ul className="flex flex-col gap-2.5">
      {shown.map((link) => (
        <li key={link.id}>
          <div className="flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 truncate text-sm font-semibold text-foreground">
                  {link.label || 'Untitled link'}
                  <ExternalLink className="h-3 w-3 shrink-0 text-muted-foreground" />
                </span>
                <span className="shrink-0 text-sm font-bold tabular-nums text-foreground">
                  {link.clicks.toLocaleString()}
                </span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${(link.clicks / max) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
