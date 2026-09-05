'use client'

import type { DailyStat } from './store'

type Props = {
  data: DailyStat[]
  metric?: 'views' | 'clicks'
  height?: number
}

// Lightweight dependency-free area chart drawn as an SVG path.
export function MiniChart({ data, metric = 'views', height = 64 }: Props) {
  if (!data.length) return null
  const values = data.map((d) => d[metric])
  const max = Math.max(...values, 1)
  const w = 100
  const h = 100
  const step = w / (values.length - 1 || 1)

  const points = values.map((v, i) => [i * step, h - (v / max) * h] as const)
  const line = points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`).join(' ')
  const area = `${line} L${w},${h} L0,${h} Z`

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className="w-full"
      style={{ height }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`grad-${metric}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#grad-${metric})`} />
      <path
        d={line}
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

// Vertical bars, used on the full analytics page.
export function BarChart({ data, metric = 'views' }: Props) {
  const values = data.map((d) => d[metric])
  const max = Math.max(...values, 1)
  return (
    <div className="flex h-48 items-end gap-1" role="img" aria-label={`${metric} over time`}>
      {data.map((d) => (
        <div key={d.date} className="group relative flex h-full flex-1 items-end">
          <div
            className="w-full rounded-t bg-primary/80 transition-all group-hover:bg-primary"
            style={{ height: `${(d[metric] / max) * 100}%` }}
          />
          <span className="pointer-events-none absolute -top-8 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs font-semibold text-background opacity-0 transition-opacity group-hover:opacity-100">
            {d[metric].toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  )
}
