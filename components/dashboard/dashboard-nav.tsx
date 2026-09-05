'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { BarChart3, Check, ChevronDown, Home, Plus, Store } from 'lucide-react'
import { initialsOf, useProfiles } from './store'

export function DashboardNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { profiles, active, activeId, setActiveId, addProfile } = useProfiles()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const nav = [
    { href: '/home', label: 'Home', icon: Home },
    { href: '/analytics', label: 'Analytics', icon: BarChart3 },
    { href: '/shop', label: 'Shop', icon: Store },
  ]

  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-5 py-3">
        <Link href="/home" className="font-display text-lg font-extrabold tracking-tight text-foreground">
          deets<span className="text-primary">.pro</span>
        </Link>

        {/* Profile switcher */}
        <div className="relative ml-1" ref={ref}>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2 rounded-full border border-border bg-card py-1.5 pl-1.5 pr-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            aria-haspopup="menu"
            aria-expanded={open}
          >
            <span
              className="flex h-7 w-7 items-center justify-center rounded-full font-display text-xs font-bold text-white"
              style={{ background: active.mainColor }}
            >
              {initialsOf(active.name)}
            </span>
            <span className="max-w-[9rem] truncate">{active.name}</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>

          {open ? (
            <div
              role="menu"
              className="absolute left-0 top-full z-40 mt-2 w-72 origin-top-left overflow-hidden rounded-2xl border border-border bg-popover p-1.5 shadow-xl animate-in fade-in slide-in-from-top-1 duration-150"
            >
              <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Your profiles
              </p>
              {profiles.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  role="menuitemradio"
                  aria-checked={p.id === activeId}
                  onClick={() => {
                    setActiveId(p.id)
                    setOpen(false)
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition-colors hover:bg-muted"
                >
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-display text-xs font-bold text-white"
                    style={{ background: p.mainColor }}
                  >
                    {initialsOf(p.name)}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-foreground">{p.name}</span>
                    <span className="block truncate text-xs text-muted-foreground">deets.pro/{p.username}</span>
                  </span>
                  {p.type === 'shop' ? (
                    <Store className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  ) : null}
                  {p.id === activeId ? <Check className="h-4 w-4 shrink-0 text-primary" /> : null}
                </button>
              ))}
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  addProfile()
                  setOpen(false)
                  router.push('/edit')
                }}
                className="mt-1 flex w-full items-center gap-2 rounded-xl border border-dashed border-border px-3 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                <Plus className="h-4 w-4 text-primary" />
                Create a new profile
              </button>
            </div>
          ) : null}
        </div>

        <nav className="ml-auto flex items-center gap-1">
          {nav.map((item) => {
            const activeRoute = pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
                  activeRoute
                    ? 'bg-foreground text-background'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
