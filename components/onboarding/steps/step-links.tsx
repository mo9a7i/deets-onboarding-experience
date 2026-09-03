'use client'

import { Lock, Plus, Trash2, LinkIcon, ShieldCheck } from 'lucide-react'
import { StepShell } from '../step-shell'
import { SOCIAL_PLATFORMS, type OnboardingData, type LinkItem, type SocialItem } from '../types'

type Props = {
  data: OnboardingData
  update: (patch: Partial<OnboardingData>) => void
  goToVerify: () => void
}

function uid() {
  return Math.random().toString(36).slice(2, 9)
}

export function StepLinks({ data, update, goToVerify }: Props) {
  const locked = !data.emailVerified

  function addLink() {
    const links: LinkItem[] = [...data.links, { id: uid(), label: '', url: '' }]
    update({ links })
  }
  function updateLink(id: string, patch: Partial<LinkItem>) {
    update({ links: data.links.map((l) => (l.id === id ? { ...l, ...patch } : l)) })
  }
  function removeLink(id: string) {
    update({ links: data.links.filter((l) => l.id !== id) })
  }

  function toggleSocial(platform: string) {
    const existing = data.socials.find((s) => s.platform === platform)
    if (existing) {
      update({ socials: data.socials.filter((s) => s.platform !== platform) })
    } else {
      const socials: SocialItem[] = [...data.socials, { id: uid(), platform, handle: '' }]
      update({ socials })
    }
  }
  function updateSocial(platform: string, handle: string) {
    update({
      socials: data.socials.map((s) => (s.platform === platform ? { ...s, handle } : s)),
    })
  }

  return (
    <StepShell
      eyebrow="Step 5 · Fill it up"
      title="Add your socials and links"
      subtitle="Everything you want to share, in one place. You can add more anytime from your dashboard."
    >
      {locked ? (
        <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-primary/30 bg-primary/5 p-5 sm:flex-row sm:items-center">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Lock className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <p className="font-display font-bold text-foreground">Verify your email to edit links</p>
            <p className="text-sm text-muted-foreground">
              To keep profiles safe from spam, adding links requires a verified email.
            </p>
          </div>
          <button
            type="button"
            onClick={goToVerify}
            className="shrink-0 rounded-full bg-primary px-4 py-2.5 font-display text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Verify email
          </button>
        </div>
      ) : (
        <div className="mb-6 flex items-center gap-2 rounded-xl bg-muted px-4 py-2.5 text-sm font-medium text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-primary" />
          Email verified — you&apos;re all set to add links.
        </div>
      )}

      <fieldset disabled={locked} className={locked ? 'pointer-events-none opacity-50' : ''}>
        <p className="mb-2 text-sm font-semibold text-foreground">Social profiles</p>
        <div className="mb-6 flex flex-wrap gap-2">
          {SOCIAL_PLATFORMS.map((platform) => {
            const active = data.socials.some((s) => s.platform === platform)
            return (
              <button
                key={platform}
                type="button"
                onClick={() => toggleSocial(platform)}
                className={`rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                  active
                    ? 'border-foreground bg-foreground text-background'
                    : 'border-border bg-card text-foreground hover:border-foreground/40'
                }`}
              >
                {platform}
              </button>
            )
          })}
        </div>

        {data.socials.length > 0 ? (
          <div className="mb-6 space-y-2">
            {data.socials.map((s) => (
              <div key={s.id} className="flex items-center gap-2">
                <span className="w-24 shrink-0 text-sm font-semibold text-foreground">
                  {s.platform}
                </span>
                <input
                  type="text"
                  placeholder="@handle or URL"
                  value={s.handle}
                  onChange={(e) => updateSocial(s.platform, e.target.value)}
                  className="w-full rounded-xl border border-input bg-card px-3 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            ))}
          </div>
        ) : null}

        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-foreground">Custom links</p>
        </div>
        <div className="mt-2 space-y-2">
          {data.links.map((l) => (
            <div key={l.id} className="flex items-center gap-2 rounded-xl border border-border bg-card p-2">
              <LinkIcon className="ml-1 h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                type="text"
                placeholder="Title"
                value={l.label}
                onChange={(e) => updateLink(l.id, { label: e.target.value })}
                className="w-28 shrink-0 rounded-lg bg-transparent px-2 py-1.5 text-sm font-medium text-foreground outline-none placeholder:text-muted-foreground"
              />
              <input
                type="url"
                placeholder="https://"
                value={l.url}
                onChange={(e) => updateLink(l.id, { url: e.target.value })}
                className="w-full rounded-lg bg-transparent px-2 py-1.5 text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
              <button
                type="button"
                onClick={() => removeLink(l.id)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
                aria-label="Remove link"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addLink}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border py-3 text-sm font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <Plus className="h-4 w-4" />
          Add a link
        </button>
      </fieldset>
    </StepShell>
  )
}
