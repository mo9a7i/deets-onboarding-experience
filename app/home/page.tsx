'use client'

import Link from 'next/link'
import { ArrowRight, MousePointerClick, Eye } from 'lucide-react'
import { DashboardNav } from '@/components/dashboard/dashboard-nav'
import { ProfileCard } from '@/components/dashboard/profile-card'
import { ProfileStrength } from '@/components/dashboard/profile-strength'
import { ShopCta } from '@/components/dashboard/shop-cta'
import { StatCard } from '@/components/dashboard/stat-card'
import { MiniChart } from '@/components/dashboard/mini-chart'
import { TopLinks } from '@/components/dashboard/top-links'
import { summarize, useProfiles } from '@/components/dashboard/store'

function deltaPct(daily: { views: number; clicks: number }[], metric: 'views' | 'clicks') {
  if (daily.length < 14) return undefined
  const recent = daily.slice(-7).reduce((s, d) => s + d[metric], 0)
  const prev = daily.slice(-14, -7).reduce((s, d) => s + d[metric], 0)
  if (!prev) return undefined
  return Math.round(((recent - prev) / prev) * 100)
}

export default function HomePage() {
  const { account, active } = useProfiles()
  const stats = summarize(active.daily)

  return (
    <div className="min-h-[100dvh] bg-background">
      <DashboardNav />

      <main className="mx-auto w-full max-w-6xl px-5 py-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground">
              Welcome back, {account.name.split(' ')[0] || 'there'}
            </h1>
            <p className="mt-1 text-muted-foreground">
              Here&apos;s how <span className="font-semibold text-foreground">{active.name}</span> is doing.
            </p>
          </div>
          <Link
            href={`/p/${active.username}`}
            target="_blank"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            View live page
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {/* Main column */}
          <div className="flex flex-col gap-5 lg:col-span-2">
            {/* Analytics summary */}
            <section className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-bold text-foreground">Last 30 days</h2>
                <Link
                  href="/analytics"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                >
                  See all analytics
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <StatCard
                  label="Page Views"
                  value={stats.views.toLocaleString()}
                  delta={deltaPct(active.daily, 'views')}
                />
                <StatCard
                  label="Page Clicks"
                  value={stats.clicks.toLocaleString()}
                  delta={deltaPct(active.daily, 'clicks')}
                />
                <StatCard
                  label="CTR"
                  value={`${stats.ctr.toFixed(1)}%`}
                  hint="Click-through rate — the share of visitors who tapped one of your links. Higher means your links resonate."
                />
              </div>

              <div className="mt-5 rounded-xl border border-border bg-background p-4">
                <div className="mb-2 flex items-center gap-4 text-xs font-semibold text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Eye className="h-3.5 w-3.5 text-primary" /> Views
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MousePointerClick className="h-3.5 w-3.5" /> Clicks: {stats.clicks.toLocaleString()}
                  </span>
                </div>
                <MiniChart data={active.daily} metric="views" height={72} />
              </div>
            </section>

            {/* Top links */}
            <section className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-bold text-foreground">Top links</h2>
                <Link
                  href="/analytics"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                >
                  See all
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="mt-4">
                <TopLinks links={active.links} limit={4} />
              </div>
            </section>
          </div>

          {/* Side column */}
          <div className="flex flex-col gap-5">
            <ProfileCard />
            <ProfileStrength />
            <ShopCta />
          </div>
        </div>
      </main>
    </div>
  )
}
