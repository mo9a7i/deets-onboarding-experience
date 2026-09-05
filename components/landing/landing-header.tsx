'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Menu, X, Sun, Moon } from 'lucide-react'

const NAV = [
  { label: 'Features', href: '#features' },
  { label: 'Discover', href: '#discover' },
  { label: 'Designs', href: '#designs' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

type LandingHeaderProps = {
  isDark?: boolean
  onToggleDark?: () => void
}

export function LandingHeader({ isDark, onToggleDark }: LandingHeaderProps) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-colors ${
        scrolled ? 'border-b border-border/60 bg-background/85 backdrop-blur' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <Link href="/" className="font-display text-lg font-extrabold tracking-tight text-foreground">
          deets<span className="text-primary">.pro</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {onToggleDark ? (
            <button
              type="button"
              onClick={onToggleDark}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-pressed={isDark}
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          ) : null}
          <Link
            href="/home"
            className="rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Log in
          </Link>
          <Link
            href="/start"
            className="group inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 font-display text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.03] active:scale-95"
          >
            Get started
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          {onToggleDark ? (
            <button
              type="button"
              onClick={onToggleDark}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-pressed={isDark}
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border/60 bg-background/95 px-5 py-4 backdrop-blur md:hidden">
          <nav className="flex flex-col gap-1">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-3 flex flex-col gap-2">
            <Link
              href="/home"
              className="rounded-full border border-border px-4 py-2.5 text-center text-sm font-semibold text-foreground"
            >
              Log in
            </Link>
            <Link
              href="/start"
              className="rounded-full bg-primary px-4 py-2.5 text-center font-display text-sm font-bold text-primary-foreground"
            >
              Get started
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  )
}
