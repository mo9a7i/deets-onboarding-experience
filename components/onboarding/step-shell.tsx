'use client'

import type { ReactNode } from 'react'

type StepShellProps = {
  eyebrow: string
  title: string
  subtitle?: string
  children: ReactNode
}

export function StepShell({ eyebrow, title, subtitle, children }: StepShellProps) {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col">
      <span className="mb-3 inline-flex w-fit items-center rounded-full bg-accent px-3 py-1 font-display text-xs font-bold uppercase tracking-wide text-accent-foreground">
        {eyebrow}
      </span>
      <h1 className="text-balance font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-4xl">
        {title}
      </h1>
      {subtitle ? (
        <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground">
          {subtitle}
        </p>
      ) : null}
      <div className="mt-8">{children}</div>
    </div>
  )
}
