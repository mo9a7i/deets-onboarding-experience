'use client'

import { useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { INITIAL_DATA, TAKEN_USERNAMES, type OnboardingData } from './types'
import { StepIntro } from './steps/step-intro'
import { StepOtp } from './steps/step-otp'
import { StepUsername } from './steps/step-username'
import { StepProfile } from './steps/step-profile'
import { StepVibe } from './steps/step-vibe'
import { StepLinks } from './steps/step-links'
import { StepContact } from './steps/step-contact'
import { StepDirectory } from './steps/step-directory'
import { StepDone } from './steps/step-done'

const TOTAL = 7

export function OnboardingFlow() {
  // -1 = intro, 0..6 = steps, 7 = done
  const [step, setStep] = useState(-1)
  const [data, setData] = useState<OnboardingData>(INITIAL_DATA)

  const update = (patch: Partial<OnboardingData>) =>
    setData((prev) => ({ ...prev, ...patch }))

  const skippable = useMemo(
    () => ({ 0: true, 1: false, 2: false, 3: true, 4: true, 5: true, 6: true }) as Record<
      number,
      boolean
    >,
    [],
  )

  const canContinue = useMemo(() => {
    switch (step) {
      case 1: {
        const u = data.username.trim().toLowerCase()
        return /^[a-z0-9._]{3,20}$/.test(u) && !TAKEN_USERNAMES.has(u)
      }
      case 2:
        return data.title.trim().length > 0
      default:
        return true
    }
  }, [step, data.username, data.title])

  function next() {
    setStep((s) => Math.min(s + 1, TOTAL))
  }
  function back() {
    setStep((s) => Math.max(s - 1, -1))
  }

  if (step === -1) {
    return (
      <Screen>
        <StepIntro onStart={next} />
      </Screen>
    )
  }

  if (step === TOTAL) {
    return (
      <Screen>
        <StepDone
          data={data}
          onRestart={() => {
            setData(INITIAL_DATA)
            setStep(-1)
          }}
        />
      </Screen>
    )
  }

  const isSkippable = skippable[step]
  const isLast = step === TOTAL - 1

  return (
    <div className="flex min-h-[100dvh] flex-col">
      {/* Progress header */}
      <header className="sticky top-0 z-10 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-2xl items-center gap-4 px-5 py-4">
          <span className="font-display text-sm font-extrabold tracking-tight text-foreground">
            deets<span className="text-primary">.pro</span>
          </span>
          <div className="flex flex-1 gap-1.5" role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={TOTAL}>
            {Array.from({ length: TOTAL }).map((_, i) => (
              <span
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  i <= step ? 'bg-primary' : 'bg-border'
                }`}
              />
            ))}
          </div>
          <span className="shrink-0 text-xs font-semibold tabular-nums text-muted-foreground">
            {step + 1}/{TOTAL}
          </span>
        </div>
      </header>

      {/* Step content */}
      <main className="flex flex-1 items-start justify-center overflow-y-auto px-5 py-8 sm:items-center sm:py-12">
        <div
          key={step}
          className="w-full animate-in fade-in slide-in-from-bottom-3 duration-300"
        >
          {step === 0 && <StepOtp data={data} update={update} />}
          {step === 1 && <StepUsername data={data} update={update} />}
          {step === 2 && <StepProfile data={data} update={update} />}
          {step === 3 && <StepVibe data={data} update={update} />}
          {step === 4 && <StepLinks data={data} update={update} goToVerify={() => setStep(0)} />}
          {step === 5 && <StepContact data={data} update={update} />}
          {step === 6 && <StepDirectory data={data} update={update} />}
        </div>
      </main>

      {/* Footer nav */}
      <footer className="sticky bottom-0 border-t border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-2xl items-center justify-between gap-3 px-5 py-4">
          <button
            type="button"
            onClick={back}
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          <div className="flex items-center gap-2">
            {isSkippable ? (
              <button
                type="button"
                onClick={next}
                className="rounded-full px-4 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                Skip for now
              </button>
            ) : null}
            <button
              type="button"
              onClick={next}
              disabled={!canContinue}
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 font-display text-sm font-bold text-primary-foreground transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isLast ? 'Finish' : 'Continue'}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}

function Screen({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center px-5 py-10">
      <div className="w-full animate-in fade-in slide-in-from-bottom-3 duration-500">
        {children}
      </div>
    </div>
  )
}
