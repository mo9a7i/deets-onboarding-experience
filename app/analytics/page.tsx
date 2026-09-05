'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { DashboardNav } from '@/components/dashboard/dashboard-nav'
import { StatCard } from '@/components/dashboard/stat-card'
import { BarChart } from '@/components/dashboard/mini-chart'
import { TopLinks } from '@/components/dashboard/top-links'
import { summarize, useProfiles } from '@/components/dashboard/store'

const RANGES = [
  { key: 7, label: '7 days' },
  { key: 14, label: '14 days' },
  { key: 30, label: '30 days' },
] as const

export default function AnalyticsPage() {
  const { active } = useProfiles()
  const [range, setRange] = useState<number>(30)
  const [metric, setMetric] = useState<'views' | 'clicks'>('views')

  const data = active.daily.slice(-range)
  const stats = summarize(data)
  const avgPerDay = Math.round(stats.views / (data.length || 1))

  return (
    <div className="min-h-[100dvh] bg-background">
      <DashboardNav />

      <main className="mx-auto w-full max-w-6xl px-5 py-8">
        <Link
          href="/home"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground">
              Analytics
            </h1>
            <p className="mt-1 text-muted-foreground">
              Performance for <span className="font-semibold text-foreground">{active.name}</span>
            </p>
          </div>
          <div className="flex gap-1 rounded-full border border-border bg-card p-1">
            {RANGES.map((r) => (
              <button
                key={r.key}
                type="button"
                onClick={() => setRange(r.key)}
                className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                  range === r.key
                    ? 'bg-foreground text-background'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Page Views" value={stats.views.toLocaleString()} />
          <StatCard label="Page Clicks" value={stats.clicks.toLocaleString()} />
          <StatCard
            label="CTR"
            value={`${stats.ctr.toFixed(1)}%`}
            hint="Click-through rate — the share of visitors who tapped one of your links. Higher means your links resonate."
          />
          <StatCard label="Avg. views / day" value={avgPerDay.toLocaleString()} />
        </div>

        <section className="mt-5 rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-foreground">Traffic over time</h2>
            <div className="flex gap-1 rounded-full bg-muted p-1">
              {(['views', 'clicks'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMetric(m)}
                  className={`rounded-full px-3 py-1 text-xs font-bold capitalize transition-colors ${
                    metric === m ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <BarChart data={data} metric={metric} />
          </div>
        </section>

        <section className="mt-5 rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-lg font-bold text-foreground">All links by clicks</h2>
          <div className="mt-4">
            <TopLinks links={active.links} />
          </div>
        </section>
      </main>
    </div>
  )
}
