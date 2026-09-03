'use client'

import { useRef, useState } from 'react'
import { Mail, ShieldCheck, RotateCcw } from 'lucide-react'
import { StepShell } from '../step-shell'
import type { OnboardingData } from '../types'

type Props = {
  data: OnboardingData
  update: (patch: Partial<OnboardingData>) => void
}

export function StepOtp({ data, update }: Props) {
  const [sent, setSent] = useState(false)
  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', ''])
  const inputs = useRef<Array<HTMLInputElement | null>>([])

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)

  function handleSend() {
    if (emailValid) setSent(true)
  }

  function handleDigit(index: number, value: string) {
    const clean = value.replace(/\D/g, '').slice(-1)
    const next = [...digits]
    next[index] = clean
    setDigits(next)
    if (clean && index < 5) inputs.current[index + 1]?.focus()
    if (next.every((d) => d !== '')) {
      update({ emailVerified: true })
    }
  }

  function handleKey(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputs.current[index - 1]?.focus()
    }
  }

  function reset() {
    setSent(false)
    setDigits(['', '', '', '', '', ''])
    update({ emailVerified: false })
  }

  return (
    <StepShell
      eyebrow="Step 1 · Verify"
      title="Secure your profile with your email"
      subtitle="Verify now so you can edit links and recover your account later. You can always do this afterwards — this step is optional."
    >
      {data.emailVerified ? (
        <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-display font-bold text-foreground">Email verified</p>
            <p className="truncate text-sm text-muted-foreground">{data.email}</p>
          </div>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Change
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-foreground"
            >
              Email address
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={data.email}
                  onChange={(e) => update({ email: e.target.value })}
                  className="w-full rounded-xl border border-input bg-card py-3 pl-11 pr-4 text-foreground outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
                />
              </div>
              <button
                type="button"
                onClick={handleSend}
                disabled={!emailValid}
                className="rounded-xl bg-foreground px-5 py-3 font-display text-sm font-bold text-background transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
              >
                {sent ? 'Resend code' : 'Send code'}
              </button>
            </div>
          </div>

          {sent ? (
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="text-sm text-muted-foreground">
                We sent a 6-digit code to{' '}
                <span className="font-semibold text-foreground">{data.email}</span>.
                Enter it below.
              </p>
              <div className="mt-4 flex gap-2 sm:gap-3">
                {digits.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => {
                      inputs.current[i] = el
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleDigit(i, e.target.value)}
                    onKeyDown={(e) => handleKey(i, e)}
                    aria-label={`Digit ${i + 1}`}
                    className="h-14 w-full rounded-xl border border-input bg-background text-center font-display text-xl font-bold text-foreground outline-none transition-shadow focus:ring-2 focus:ring-ring"
                  />
                ))}
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Prototype tip: any 6 digits will verify.
              </p>
            </div>
          ) : null}
        </div>
      )}
    </StepShell>
  )
}
