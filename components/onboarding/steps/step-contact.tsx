'use client'

import { Contact, Users, Sparkles } from 'lucide-react'
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

function Toggle({ on, onToggle, label }: { on: boolean; onToggle: () => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onToggle}
      className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
        on ? 'bg-primary' : 'bg-muted-foreground/30'
      }`}
    >
      <span
        className={`absolute top-0.5 h-6 w-6 rounded-full bg-card shadow-sm transition-transform ${
          on ? 'translate-x-[22px]' : 'translate-x-0.5'
        }`}
      />
    </button>
  )
}

export function StepContact({ data, update }: Props) {
  function setCard(key: keyof ContactCard, value: string) {
    update({ contactCard: { ...data.contactCard, [key]: value } })
  }

  return (
    <StepShell
      eyebrow="Step 6 · Business card"
      title="Turn your profile into a digital business card"
      subtitle="Share your details in a tap and, if you like, collect theirs back."
    >
      {/* 1. Share your own contact */}
      <label className="flex cursor-pointer items-center gap-4 rounded-2xl border border-border bg-card p-5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
          <Contact className="h-5 w-5" />
        </span>
        <span className="flex-1">
          <span className="block font-display font-bold text-foreground">
            Want to share your contact?
          </span>
          <span className="block text-sm text-muted-foreground">
            Add a &ldquo;Save contact&rdquo; button so visitors can save you instantly.
          </span>
        </span>
        <Toggle
          on={data.shareContact}
          onToggle={() => update({ shareContact: !data.shareContact })}
          label="Share your contact"
        />
      </label>

      {data.shareContact ? (
        <div className="mt-3 rounded-2xl border border-border bg-card p-5">
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
          <p className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
            <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
            More details can be added to your business card later in our profile design studio.
          </p>
        </div>
      ) : null}

      {/* 2. Ask visitors to exchange contact */}
      <label className="mt-3 flex cursor-pointer items-center gap-4 rounded-2xl border border-border bg-card p-5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary text-foreground">
          <Users className="h-5 w-5" />
        </span>
        <span className="flex-1">
          <span className="block font-display font-bold text-foreground">
            Ask visitors to exchange contact?
          </span>
          <span className="block text-sm text-muted-foreground">
            Show a short form so visitors can share their details back with you.
          </span>
        </span>
        <Toggle
          on={data.askVisitors}
          onToggle={() => update({ askVisitors: !data.askVisitors })}
          label="Ask visitors to exchange contact"
        />
      </label>
    </StepShell>
  )
}
