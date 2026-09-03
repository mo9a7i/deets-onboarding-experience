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

// Placeholder hints shown per platform so the stacked fields feel guided.
const PLATFORM_HINTS: Record<string, string> = {
  Instagram: '@username',
  X: '@handle',
  TikTok: '@username',
  YouTube: 'channel URL or @handle',
  LinkedIn: 'in/your-name',
  GitHub: 'username',
  Website: 'https://yoursite.com',
}

export function StepLinks({ data, update, goToVerify }: Props) {
  const locked = !data.emailVerified

  function getHandle(platform: string) {
    return data.socials.find((s) => s.platform === platform)?.handle ?? ''
  }

  function setHandle(platform: string, handle: string) {
    const existing = data.socials.find((s) => s.platform === platform)
    if (!existing) {
      const socials: SocialItem[] = [...data.socials, { id: uid(), platform, handle }]
      update({ socials })
      return
    }
    update({
      socials: data.socials.map((s) => (s.platform === platform ? { ...s, handle } : s)),
    })
  }

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
        <p className="mb-3 text-sm font-semibold text-foreground">Social profiles</p>
        <div className="space-y-2.5">
          {SOCIAL_PLATFORMS.map((platform) => (
            <div
              key={platform}
              className="flex items-center gap-3 rounded-xl border border-border bg-card px-3 py-2.5"
            >
              <span className="w-24 shrink-0 text-sm font-semibold text-foreground">
                {platform}
              </span>
              <input
                type="text"
                placeholder={PLATFORM_HINTS[platform] ?? '@handle or URL'}
                value={getHandle(platform)}
                onChange={(e) => setHandle(platform, e.target.value)}
                className="w-full rounded-lg bg-transparent px-1 py-1 text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>
          ))}
        </div>

        <p className="mb-2 mt-6 text-sm font-semibold text-foreground">Custom links</p>
        <div className="space-y-2">
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
