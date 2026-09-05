'use client'

import { useRouter } from 'next/navigation'
import { Clock, MapPin, Sparkles, Store, UtensilsCrossed } from 'lucide-react'
import { useProfiles } from './store'

export function ShopCta() {
  const router = useRouter()
  const { active, activateShop } = useProfiles()

  if (active.type === 'shop') {
    return (
      <section className="overflow-hidden rounded-2xl border border-border bg-card p-6">
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Store className="h-5 w-5" />
          </span>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="font-display text-lg font-bold text-foreground">Shop is active</h2>
              <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent-foreground">
                Premium
              </span>
            </div>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {active.shop?.categories.reduce((n, c) => n + c.items.length, 0) ?? 0} items across{' '}
              {active.shop?.categories.length ?? 0} categories.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => router.push('/shop')}
          className="mt-4 w-full rounded-full bg-foreground py-3 font-display text-sm font-bold text-background transition-opacity hover:opacity-90"
        >
          Manage your menu
        </button>
      </section>
    )
  }

  return (
    <section className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card to-accent/10 p-6">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 font-display text-xs font-bold uppercase tracking-wide text-primary-foreground">
        <Sparkles className="h-3.5 w-3.5" />
        Premium
      </span>
      <h2 className="mt-3 text-balance font-display text-xl font-extrabold tracking-tight text-foreground">
        Turn your profile into a shop
      </h2>
      <p className="mt-1.5 text-pretty text-sm leading-relaxed text-muted-foreground">
        Unlock a menu, your location, and working hours right on your page — perfect for cafes,
        restaurants, and local businesses.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Feature icon={UtensilsCrossed} label="Menu builder" />
        <Feature icon={MapPin} label="Location" />
        <Feature icon={Clock} label="Opening hours" />
      </div>
      <button
        type="button"
        onClick={() => {
          activateShop(active.id)
          router.push('/shop')
        }}
        className="mt-5 w-full rounded-full bg-primary py-3 font-display text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.01] active:scale-[0.99]"
      >
        Activate shop
      </button>
    </section>
  )
}

function Feature({ icon: Icon, label }: { icon: typeof MapPin; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/80 px-3 py-1.5 text-xs font-semibold text-foreground">
      <Icon className="h-3.5 w-3.5 text-primary" />
      {label}
    </span>
  )
}
