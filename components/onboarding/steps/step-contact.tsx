'use client'

import { Contact } from 'lucide-react'
import { StepShell } from '../step-shell'
import type { ContactCard, OnboardingData } from '../types'

type Props = {
  data: OnboardingData
  update: (patch: Partial<OnboardingData>) => void
}

const FIELDS: { key: keyof ContactCard; label: string; placeholder: string; type?: string; span?: boolean }[] = [
  { key: 'fullName', label: 'Full name', placeholder: 'Alex Rivera', span: true },
  { key: 'jobTitle', label: 'Job title', placeholder: 'Product Designer' },
  { key: 'company', label: 'Company', placeholder: 'Studio Rivera' },
  { key: 'email', label: 'Contact email', placeholder: 'alex@studio.com', type: 'email' },
  { key: 'phone', label: 'Phone', placeholder: '+1 555 123 4567', type: 'tel' },
]

export function StepContact({ data, update }: Props) {
  const enabled = data.contactExchangeEnabled

  function setCard(key: keyof ContactCard, value: string) {
    update({ contactCard: { ...data.contactCard, [key]: value } })
  }

  return (
    <StepShell
      eyebrow="Step 6 · Business card"
      title="Exchange contacts with your visitors"
      subtitle="Turn your profile into a digital business card. Visitors can save your details and share theirs back with you."
    >
      <label className="flex cursor-pointer items-center gap-4 rounded-2xl border border-border bg-card p-5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
          <Contact className="h-5 w-5" />
        </span>
        <span className="flex-1">
          <span className="block font-display font-bold text-foreground">
            Ask visitors to exchange contacts
          </span>
          <span className="block text-sm text-muted-foreground">
            Show a &ldquo;Save contact&rdquo; button and a form to collect theirs.
          </span>
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          onClick={() => update({ contactExchangeEnabled: !enabled })}
          className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
            enabled ? 'bg-primary' : 'bg-muted-foreground/30'
          }`}
        >
          <span
            className={`absolute top-0.5 h-6 w-6 rounded-full bg-card shadow-sm transition-transform ${
              enabled ? 'translate-x-[22px]' : 'translate-x-0.5'
            }`}
          />
        </button>
      </label>

      {enabled ? (
        <div className="mt-5 rounded-2xl border border-border bg-card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">Your business card details</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {FIELDS.map((f) => (
              <div key={f.key} className={f.span ? 'sm:col-span-2' : ''}>
                <label
                  htmlFor={f.key}
                  className="mb-1.5 block text-xs font-semibold text-muted-foreground"
                >
                  {f.label}
                </label>
                <input
                  id={f.key}
                  type={f.type ?? 'text'}
                  placeholder={f.placeholder}
                  value={data.contactCard[f.key]}
                  onChange={(e) => setCard(f.key, e.target.value)}
                  className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            This will be saved as your primary card. You can add more cards later.
          </p>
        </div>
      ) : null}
    </StepShell>
  )
}
