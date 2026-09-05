'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CardStack } from '@/components/onboarding/card-stack'
import { Typewriter } from '@/components/onboarding/typewriter'

const TYPEWRITER_WORDS = [
  'everything',
  'restaurants',
  'coffee shops',
  'online stores',
  'influencers',
  'business cards',
  'employees',
  'creators',
  'artists',
  'podcasts',
  'side projects',
  'portfolios',
  'events',
]

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-5 pb-16 pt-10 sm:pt-16"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-2">
        <div>
          <span className="inline-flex items-center rounded-full bg-accent px-3 py-1 font-display text-xs font-bold uppercase tracking-wide text-accent-foreground">
            One link · Everything you are
          </span>
          <h1 className="mt-5 text-balance font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            All of you,
            <br />
            in one link for <Typewriter words={TYPEWRITER_WORDS} className="text-primary" />
          </h1>
          <p className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
            You give people your deets, they give you theirs. Claim your link, pick your colors, add
            everything you are, and start sharing in minutes.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/start"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 font-display text-base font-bold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-95"
            >
              Build your profile
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="#features"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-4 font-display text-base font-bold text-foreground transition-colors hover:bg-muted"
            >
              See how it works
            </a>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Takes about 2 minutes · No credit card
          </p>
        </div>

        <CardStack trackRef={sectionRef} />
      </div>
    </section>
  )
}
