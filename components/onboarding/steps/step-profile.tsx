'use client'

import { useRef } from 'react'
import { Camera, X } from 'lucide-react'
import { StepShell } from '../step-shell'
import type { OnboardingData } from '../types'

type Props = {
  data: OnboardingData
  update: (patch: Partial<OnboardingData>) => void
}

export function StepProfile({ data, update }: Props) {
  const fileRef = useRef<HTMLInputElement | null>(null)

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => update({ avatarDataUrl: reader.result as string })
    reader.readAsDataURL(file)
  }

  const initials = (data.title || data.username || 'You')
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <StepShell
      eyebrow="Step 3 · Introduce yourself"
      title="Add your name and a face"
      subtitle="Your title is how visitors know who they've landed on. A photo is optional, but profiles with one get noticed more."
    >
      <div className="space-y-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="group relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-muted text-lg font-bold text-muted-foreground ring-2 ring-border transition-all hover:ring-primary"
              style={{ fontFamily: 'var(--font-display)' }}
              aria-label="Upload avatar"
            >
              {data.avatarDataUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={data.avatarDataUrl || '/placeholder.svg'}
                  alt="Your avatar"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span>{initials}</span>
              )}
              <span className="absolute inset-0 flex items-center justify-center bg-foreground/40 opacity-0 transition-opacity group-hover:opacity-100">
                <Camera className="h-5 w-5 text-background" />
              </span>
            </button>
            {data.avatarDataUrl ? (
              <button
                type="button"
                onClick={() => update({ avatarDataUrl: null })}
                className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-background shadow-sm"
                aria-label="Remove avatar"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            ) : null}
          </div>
          <div>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {data.avatarDataUrl ? 'Change photo' : 'Upload photo'}
            </button>
            <p className="mt-1.5 text-xs text-muted-foreground">Optional · JPG or PNG</p>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
          />
        </div>

        <div>
          <label htmlFor="title" className="mb-2 block text-sm font-semibold text-foreground">
            Display title <span className="text-primary">*</span>
          </label>
          <input
            id="title"
            type="text"
            maxLength={40}
            placeholder="e.g. Alex Rivera"
            value={data.title}
            onChange={(e) => update({ title: e.target.value })}
            className="w-full rounded-xl border border-input bg-card px-4 py-3 text-foreground outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label htmlFor="bio" className="mb-2 block text-sm font-semibold text-foreground">
            Short bio <span className="font-normal text-muted-foreground">(optional)</span>
          </label>
          <textarea
            id="bio"
            rows={2}
            maxLength={120}
            placeholder="Designer & maker building playful things."
            value={data.bio}
            onChange={(e) => update({ bio: e.target.value })}
            className="w-full resize-none rounded-xl border border-input bg-card px-4 py-3 text-foreground outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
          />
          <p className="mt-1 text-right text-xs text-muted-foreground">{data.bio.length}/120</p>
        </div>
      </div>
    </StepShell>
  )
}
