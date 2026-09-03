'use client'

import { useEffect, useState } from 'react'
import { Check, Loader2, X } from 'lucide-react'
import { StepShell } from '../step-shell'
import { TAKEN_USERNAMES, type OnboardingData } from '../types'

type Props = {
  data: OnboardingData
  update: (patch: Partial<OnboardingData>) => void
}

type Status = 'idle' | 'checking' | 'available' | 'taken' | 'invalid'

const SUGGESTIONS = ['aria.studio', 'the.maker', 'good.vibes']

export function StepUsername({ data, update }: Props) {
  const [status, setStatus] = useState<Status>('idle')

  useEffect(() => {
    const value = data.username.trim().toLowerCase()
    if (!value) {
      setStatus('idle')
      return
    }
    if (!/^[a-z0-9._]{3,20}$/.test(value)) {
      setStatus('invalid')
      return
    }
    setStatus('checking')
    const t = setTimeout(() => {
      setStatus(TAKEN_USERNAMES.has(value) ? 'taken' : 'available')
    }, 550)
    return () => clearTimeout(t)
  }, [data.username])

  return (
    <StepShell
      eyebrow="Step 2 · Claim it"
      title="Pick your deets link"
      subtitle="This is the link you'll hand out everywhere. Choose something short and memorable — you can't change it as easily later."
    >
      <div>
        <div
          className={`flex items-center overflow-hidden rounded-2xl border-2 bg-card transition-colors ${
            status === 'taken' || status === 'invalid'
              ? 'border-destructive'
              : status === 'available'
                ? 'border-primary'
                : 'border-input focus-within:border-primary'
          }`}
        >
          <span className="select-none py-4 pl-4 pr-1 font-display text-lg font-bold text-muted-foreground">
            deets.pro/
          </span>
          <input
            type="text"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            placeholder="yourname"
            value={data.username}
            onChange={(e) =>
              update({ username: e.target.value.replace(/[^a-zA-Z0-9._]/g, '').toLowerCase() })
            }
            className="w-full bg-transparent py-4 pr-4 font-display text-lg font-bold text-foreground outline-none placeholder:text-muted-foreground/60"
          />
          <div className="pr-4">
            {status === 'checking' && (
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            )}
            {status === 'available' && (
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Check className="h-4 w-4" />
              </span>
            )}
            {(status === 'taken' || status === 'invalid') && (
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground">
                <X className="h-4 w-4" />
              </span>
            )}
          </div>
        </div>

        <div className="mt-3 min-h-5 text-sm">
          {status === 'available' && (
            <p className="font-medium text-primary">Nice — that one&apos;s all yours.</p>
          )}
          {status === 'taken' && (
            <p className="font-medium text-destructive">That name is taken. Try another.</p>
          )}
          {status === 'invalid' && (
            <p className="font-medium text-destructive">
              Use 3–20 letters, numbers, dots or underscores.
            </p>
          )}
          {(status === 'idle' || status === 'checking') && (
            <p className="text-muted-foreground">Letters, numbers, dots and underscores.</p>
          )}
        </div>

        {status === 'taken' || status === 'idle' ? (
          <div className="mt-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Need ideas?
            </p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => update({ username: s })}
                  className="rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </StepShell>
  )
}
