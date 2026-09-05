'use client'

import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { CardStack } from '../card-stack'
import { Typewriter } from '../typewriter'

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

export function StepIntro({ onStart }: { onStart: () => void }) {
  const sectionRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={sectionRef}
      className="mx-auto grid w-full max-w-5xl items-center gap-10 md:grid-cols-2"
    >
      <div>
        <span className="inline-flex items-center rounded-full bg-accent px-3 py-1 font-display text-xs font-bold uppercase tracking-wide text-accent-foreground">
          deets.pro
        </span>
        <h1 className="mt-5 text-balance font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-foreground sm:text-6xl">
          All of you,
          <br />
          in one link for <Typewriter words={TYPEWRITER_WORDS} className="text-primary" />
        </h1>
        <p className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
          You give people your deets, they give you theirs. Set up your profile in seven quick
          steps — claim your link, pick your colors, add everything you are, and start sharing in
          minutes.
        </p>
        <button
          type="button"
          onClick={onStart}
          className="group mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 font-display text-base font-bold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-95"
        >
          Let&apos;s build your profile
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
        </button>
        <p className="mt-4 text-sm text-muted-foreground">Takes about 2 minutes · No credit card</p>
      </div>

      <CardStack trackRef={sectionRef} />
    </div>
  )
}
