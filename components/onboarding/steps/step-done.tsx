'use client'

import { Check, Copy, PartyPopper } from 'lucide-react'
import { useState } from 'react'
import { ProfilePreview } from '../profile-preview'
import type { OnboardingData } from '../types'

export function StepDone({ data, onRestart }: { data: OnboardingData; onRestart: () => void }) {
  const [copied, setCopied] = useState(false)
  const url = `direct.me/${data.username || 'yourname'}`

  function copy() {
    navigator.clipboard?.writeText(`https://${url}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  const links = data.links.length
    ? data.links.filter((l) => l.label).map((l) => l.label)
    : ['My portfolio', 'Latest drop']

  return (
    <div className="mx-auto grid w-full max-w-4xl items-center gap-10 md:grid-cols-2">
      <div>
        <span className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1 font-display text-xs font-bold uppercase tracking-wide text-primary-foreground">
          <PartyPopper className="h-3.5 w-3.5" />
          You&apos;re live
        </span>
        <h1 className="mt-5 text-balance font-display text-4xl font-extrabold leading-[1] tracking-tight text-foreground sm:text-5xl">
          Your profile is ready, {data.title || 'friend'}.
        </h1>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
          Share your link anywhere and start growing your audience.
        </p>

        <div className="mt-6 flex items-center gap-2 rounded-full border border-border bg-card p-1.5 pl-5">
          <span className="flex-1 truncate font-display font-bold text-foreground">{url}</span>
          <button
            type="button"
            onClick={copy}
            className="flex shrink-0 items-center gap-1.5 rounded-full bg-foreground px-4 py-2.5 text-sm font-bold text-background transition-opacity hover:opacity-90"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>

        <div className="mt-5 flex flex-wrap gap-2 text-sm">
          <Chip on={data.emailVerified} label={data.emailVerified ? 'Email verified' : 'Email not verified'} />
          <Chip on label={`${data.socials.length + data.links.length} links`} />
          <Chip on={data.contactExchangeEnabled} label={data.contactExchangeEnabled ? 'Contact card on' : 'Contact card off'} />
          <Chip on={data.inDirectory} label={data.inDirectory ? 'In directory' : 'Private'} />
        </div>

        <button
          type="button"
          onClick={onRestart}
          className="mt-8 text-sm font-semibold text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          Run the onboarding again
        </button>
      </div>

      <div className="relative mx-auto w-full max-w-[280px]">
        <div className="absolute -inset-6 -z-10 rounded-[2.5rem] blur-2xl" style={{ background: `${data.accentColor}66` }} />
        <div className="rounded-[2rem] bg-card p-3 shadow-xl ring-1 ring-border">
          <ProfilePreview
            main={data.mainColor}
            accent={data.accentColor}
            name={data.title || 'Alex Rivera'}
            title={data.bio || 'Designer & maker'}
            avatarDataUrl={data.avatarDataUrl}
            links={links.slice(0, 3)}
            size="lg"
          />
        </div>
      </div>
    </div>
  )
}

function Chip({ on, label }: { on: boolean; label: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-medium ${
        on ? 'bg-secondary text-foreground' : 'bg-muted text-muted-foreground'
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${on ? 'bg-primary' : 'bg-muted-foreground/50'}`} />
      {label}
    </span>
  )
}
