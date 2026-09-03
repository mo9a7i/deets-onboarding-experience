'use client'

import { Globe, EyeOff, TrendingUp, Search, Users } from 'lucide-react'
import { StepShell } from '../step-shell'
import type { OnboardingData } from '../types'

type Props = {
  data: OnboardingData
  update: (patch: Partial<OnboardingData>) => void
}

export function StepDirectory({ data, update }: Props) {
  return (
    <StepShell
      eyebrow="Step 7 · Discoverability"
      title="Join the public directory?"
      subtitle="Choose whether your profile can be found in the deets public directory. You can change this anytime."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => update({ inDirectory: true })}
          aria-pressed={data.inDirectory}
          className={`rounded-2xl border-2 p-5 text-left transition-all ${
            data.inDirectory
              ? 'border-primary bg-primary/5'
              : 'border-border bg-card hover:border-foreground/30'
          }`}
        >
          <span
            className={`flex h-11 w-11 items-center justify-center rounded-full ${
              data.inDirectory ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'
            }`}
          >
            <Globe className="h-5 w-5" />
          </span>
          <span className="mt-3 block font-display text-lg font-bold text-foreground">
            Yes, list me
          </span>
          <span className="mt-1 block text-sm text-muted-foreground">
            Make my profile public and discoverable.
          </span>
        </button>

        <button
          type="button"
          onClick={() => update({ inDirectory: false })}
          aria-pressed={!data.inDirectory}
          className={`rounded-2xl border-2 p-5 text-left transition-all ${
            !data.inDirectory
              ? 'border-foreground bg-secondary'
              : 'border-border bg-card hover:border-foreground/30'
          }`}
        >
          <span
            className={`flex h-11 w-11 items-center justify-center rounded-full ${
              !data.inDirectory ? 'bg-foreground text-background' : 'bg-muted text-foreground'
            }`}
          >
            <EyeOff className="h-5 w-5" />
          </span>
          <span className="mt-3 block font-display text-lg font-bold text-foreground">
            Keep me private
          </span>
          <span className="mt-1 block text-sm text-muted-foreground">
            Only people with my link can find me. (Default)
          </span>
        </button>
      </div>

      <div className="mt-5 rounded-2xl bg-secondary p-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Why join the directory?
        </p>
        <ul className="space-y-2.5">
          {[
            { icon: Search, text: 'Search engines and crawlers index your profile faster.' },
            { icon: TrendingUp, text: 'Boost reach and discoverability from the main page.' },
            { icon: Users, text: 'Get found by people browsing creators like you.' },
          ].map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-start gap-3 text-sm text-foreground">
              <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </StepShell>
  )
}
