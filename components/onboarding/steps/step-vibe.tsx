'use client'

import { useState } from 'react'
import { Check, Sparkles } from 'lucide-react'
import { StepShell } from '../step-shell'
import { ProfilePreview } from '../profile-preview'
import { COLOR_THEMES, type OnboardingData } from '../types'

type Props = {
  data: OnboardingData
  update: (patch: Partial<OnboardingData>) => void
}

export function StepVibe({ data, update }: Props) {
  const [customOpen, setCustomOpen] = useState(data.themeId === null)

  const displayName = data.title || 'Alex Rivera'
  const previewLinks = data.links.length
    ? data.links.slice(0, 2).map((l) => l.label)
    : ['My portfolio', 'Latest drop']

  function selectTheme(id: string, main: string, accent: string) {
    setCustomOpen(false)
    update({ themeId: id, mainColor: main, accentColor: accent })
  }

  return (
    <StepShell
      eyebrow="Step 4 · Set the vibe"
      title="Choose the colors that feel like you"
      subtitle="Your main color paints the background, your accent lights up the buttons. Tap a look, or craft your own."
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {COLOR_THEMES.map((theme) => {
          const active = !customOpen && data.themeId === theme.id
          return (
            <button
              key={theme.id}
              type="button"
              onClick={() => selectTheme(theme.id, theme.main, theme.accent)}
              className={`relative rounded-2xl p-1 transition-all ${
                active
                  ? 'ring-2 ring-foreground ring-offset-2 ring-offset-background'
                  : 'ring-1 ring-border hover:ring-foreground/40'
              }`}
              aria-pressed={active}
              aria-label={`${theme.name} theme`}
            >
              <ProfilePreview
                main={theme.main}
                accent={theme.accent}
                name={displayName}
                title={data.bio ? '' : 'Designer & maker'}
                avatarDataUrl={data.avatarDataUrl}
                links={previewLinks}
                size="sm"
              />
              <span className="mt-1.5 block text-center text-xs font-semibold text-foreground">
                {theme.name}
              </span>
              {active ? (
                <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-background">
                  <Check className="h-3 w-3" />
                </span>
              ) : null}
            </button>
          )
        })}
      </div>

      <button
        type="button"
        onClick={() => {
          setCustomOpen(true)
          update({ themeId: null })
        }}
        className={`mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed py-3 font-display text-sm font-bold transition-colors ${
          customOpen
            ? 'border-foreground text-foreground'
            : 'border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground'
        }`}
      >
        <Sparkles className="h-4 w-4" />
        Customize my own colors
      </button>

      {customOpen ? (
        <div className="mt-4 grid gap-5 rounded-2xl border border-border bg-card p-5 sm:grid-cols-[1fr_auto]">
          <div className="space-y-4">
            <ColorField
              label="Main color"
              value={data.mainColor}
              onChange={(v) => update({ mainColor: v, themeId: null })}
            />
            <ColorField
              label="Accent color"
              value={data.accentColor}
              onChange={(v) => update({ accentColor: v, themeId: null })}
            />
          </div>
          <div className="w-full sm:w-40">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Live preview
            </p>
            <ProfilePreview
              main={data.mainColor}
              accent={data.accentColor}
              name={displayName}
              avatarDataUrl={data.avatarDataUrl}
              links={previewLinks}
              size="md"
            />
          </div>
        </div>
      ) : null}
    </StepShell>
  )
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-foreground">{label}</label>
      <div className="flex items-center gap-3">
        <label className="relative h-11 w-11 shrink-0 cursor-pointer overflow-hidden rounded-xl ring-1 ring-border">
          <span className="block h-full w-full" style={{ background: value }} />
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 cursor-pointer opacity-0"
            aria-label={label}
          />
        </label>
        <input
          type="text"
          value={value.toUpperCase()}
          onChange={(e) => {
            const v = e.target.value
            if (/^#[0-9a-fA-F]{0,6}$/.test(v)) onChange(v)
          }}
          className="w-32 rounded-xl border border-input bg-background px-3 py-2.5 font-mono text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
    </div>
  )
}
