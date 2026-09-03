'use client'

import { ArrowRight } from 'lucide-react'
import { ProfilePreview } from '../profile-preview'
import { Typewriter } from '../typewriter'
import { DEFAULT_THEME } from '../types'

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
  return (
    <div className="mx-auto grid w-full max-w-5xl items-center gap-10 md:grid-cols-2">
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

      <div className="relative mx-auto w-full max-w-[280px]">
        <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-accent/40 blur-2xl" />
        <div className="rotate-2 rounded-[2rem] bg-card p-3 shadow-xl ring-1 ring-border transition-transform hover:rotate-0">
          <ProfilePreview
            main={DEFAULT_THEME.main}
            accent={DEFAULT_THEME.accent}
            name="Alex Rivera"
            title="Designer & maker"
            links={['My portfolio', 'Latest drop', 'Say hello']}
            size="lg"
          />
        </div>
      </div>
    </div>
  )
}
