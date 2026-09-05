'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Copy, Check, Pencil, Store } from 'lucide-react'
import { useState } from 'react'
import { ProfilePreview } from '../onboarding/profile-preview'
import { useProfiles } from './store'

export function ProfileCard() {
  const router = useRouter()
  const { active } = useProfiles()
  const [copied, setCopied] = useState(false)

  const url = `deets.pro/${active.username}`
  const links = active.links.length
    ? active.links.filter((l) => l.label).map((l) => l.label)
    : ['Add your first link']

  function copy() {
    navigator.clipboard?.writeText(`https://${url}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <h2 className="font-display text-lg font-bold text-foreground">Active profile</h2>
          {active.type === 'shop' ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent-foreground">
              <Store className="h-3 w-3" />
              Shop
            </span>
          ) : null}
        </div>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-muted"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? 'Copied' : url}
        </button>
      </div>

      {/* Clicking the preview opens the editor */}
      <button
        type="button"
        onClick={() => router.push('/edit')}
        className="group relative mt-4 block w-full overflow-hidden rounded-2xl ring-1 ring-border transition-transform hover:scale-[1.01] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label="Edit this profile"
      >
        <ProfilePreview
          main={active.mainColor}
          accent={active.accentColor}
          name={active.name}
          title={active.bio}
          avatarDataUrl={active.avatarDataUrl}
          links={links.slice(0, 3)}
          size="lg"
        />
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-foreground/0 opacity-0 transition-all group-hover:bg-foreground/40 group-hover:opacity-100">
          <span className="inline-flex items-center gap-2 rounded-full bg-background px-4 py-2 font-display text-sm font-bold text-foreground shadow-lg">
            <Pencil className="h-4 w-4" />
            Edit profile
          </span>
        </span>
      </button>

      <Link
        href="/edit"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-foreground py-3 font-display text-sm font-bold text-background transition-opacity hover:opacity-90"
      >
        <Pencil className="h-4 w-4" />
        Edit this profile
      </Link>
    </section>
  )
}
