'use client'

import { useEffect, useRef, useState } from 'react'
import { Mail, ShieldCheck, RotateCcw, ArrowLeft, KeyRound, Eye, EyeOff, Check } from 'lucide-react'
import { StepShell } from '../step-shell'
import type { OnboardingData } from '../types'

type Props = {
  data: OnboardingData
  update: (patch: Partial<OnboardingData>) => void
}

type Phase = 'email' | 'code' | 'password' | 'done'

export function StepOtp({ data, update }: Props) {
  const [phase, setPhase] = useState<Phase>(data.emailVerified ? 'done' : 'email')
  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', ''])
  const [showPassword, setShowPassword] = useState(false)
  const inputs = useRef<Array<HTMLInputElement | null>>([])

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
  const codeComplete = digits.every((d) => d !== '')
  const passwordValid = data.password.length >= 8

  // Auto-advance to the code phase once all digits are filled.
  useEffect(() => {
    if (phase === 'code' && codeComplete) {
      const t = setTimeout(() => setPhase('password'), 350)
      return () => clearTimeout(t)
    }
  }, [phase, codeComplete])

  function sendCode() {
    if (emailValid) setPhase('code')
  }

  function handleDigit(index: number, value: string) {
    const clean = value.replace(/\D/g, '').slice(-1)
    const next = [...digits]
    next[index] = clean
    setDigits(next)
    if (clean && index < 5) inputs.current[index + 1]?.focus()
  }

  function handleKey(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputs.current[index - 1]?.focus()
    }
  }

  function finishPassword() {
    update({ emailVerified: true })
    setPhase('done')
  }

  function skipPassword() {
    update({ emailVerified: true })
    setPhase('done')
  }

  function reset() {
    setDigits(['', '', '', '', '', ''])
    update({ emailVerified: false, password: '' })
    setPhase('email')
  }

  // ---- Verified summary ----------------------------------------------------
  if (phase === 'done') {
    return (
      <StepShell
        eyebrow="Step 1 · Verify"
        title="Your email is verified"
        subtitle="You're all set. This lets you edit links and recover your account later."
      >
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
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-muted px-4 py-2.5 text-sm font-medium text-muted-foreground">
          <KeyRound className="h-4 w-4 text-primary" />
          {data.password ? 'Backup password set.' : 'No password set — you can still log in with email or social.'}
        </div>
      </StepShell>
    )
  }

  // ---- Email phase ---------------------------------------------------------
  if (phase === 'email') {
    return (
      <StepShell
        eyebrow="Step 1 · Verify"
        title="What's your email?"
        subtitle="Verify now so you can edit links and recover your account later. This step is optional — you can skip it and do it anytime."
      >
        <label htmlFor="email" className="mb-2 block text-sm font-semibold text-foreground">
          Email address
        </label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={data.email}
            onChange={(e) => update({ email: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.nativeEvent.isComposing && e.keyCode !== 229) sendCode()
            }}
            className="w-full rounded-xl border border-input bg-card py-3.5 pl-11 pr-4 text-foreground outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
          />
        </div>
        <button
          type="button"
          onClick={sendCode}
          disabled={!emailValid}
          className="mt-4 w-full rounded-xl bg-foreground px-5 py-3.5 font-display text-sm font-bold text-background transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
        >
          Send verification code
        </button>
      </StepShell>
    )
  }

  // ---- Code phase ----------------------------------------------------------
  if (phase === 'code') {
    return (
      <StepShell
        eyebrow="Step 1 · Verify"
        title="Enter your code"
        subtitle=""
      >
        <button
          type="button"
          onClick={() => setPhase('email')}
          className="mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Change email
        </button>
        <p className="text-sm text-muted-foreground">
          We sent a 6-digit code to{' '}
          <span className="font-semibold text-foreground">{data.email}</span>.
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
              autoFocus={i === 0}
              value={digit}
              onChange={(e) => handleDigit(i, e.target.value)}
              onKeyDown={(e) => handleKey(i, e)}
              aria-label={`Digit ${i + 1}`}
              className="h-14 w-full rounded-xl border border-input bg-card text-center font-display text-xl font-bold text-foreground outline-none transition-shadow focus:ring-2 focus:ring-ring"
            />
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <button
            type="button"
            onClick={sendCode}
            className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            Resend code
          </button>
          <p className="text-xs text-muted-foreground">Tip: any 6 digits work here.</p>
        </div>
      </StepShell>
    )
  }

  // ---- Password phase ------------------------------------------------------
  return (
    <StepShell
      eyebrow="Step 1 · Verify"
      title="Set a password as a backup"
      subtitle="This is just for backup — you can always log in with your email or a social account later."
    >
      <label htmlFor="password" className="mb-2 block text-sm font-semibold text-foreground">
        Password
      </label>
      <div className="relative">
        <KeyRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          id="password"
          type={showPassword ? 'text' : 'password'}
          autoComplete="new-password"
          placeholder="At least 8 characters"
          value={data.password}
          onChange={(e) => update({ password: e.target.value })}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && passwordValid && !e.nativeEvent.isComposing && e.keyCode !== 229)
              finishPassword()
          }}
          className="w-full rounded-xl border border-input bg-card py-3.5 pl-11 pr-12 text-foreground outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
        />
        <button
          type="button"
          onClick={() => setShowPassword((s) => !s)}
          className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        {passwordValid ? (
          <span className="inline-flex items-center gap-1 text-primary">
            <Check className="h-3.5 w-3.5" />
            Looks good
          </span>
        ) : (
          'Use at least 8 characters.'
        )}
      </p>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row-reverse">
        <button
          type="button"
          onClick={finishPassword}
          disabled={!passwordValid}
          className="rounded-xl bg-foreground px-5 py-3.5 font-display text-sm font-bold text-background transition-opacity disabled:cursor-not-allowed disabled:opacity-40 sm:flex-1"
        >
          Save password &amp; continue
        </button>
        <button
          type="button"
          onClick={skipPassword}
          className="rounded-xl px-5 py-3.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          Skip — I&apos;ll use email or social
        </button>
      </div>
    </StepShell>
  )
}
