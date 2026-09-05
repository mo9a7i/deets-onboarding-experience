'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  BadgeCheck,
  Camera,
  Check,
  GripVertical,
  Plus,
  Trash2,
} from 'lucide-react'
import { DashboardNav } from '@/components/dashboard/dashboard-nav'
import { ProfilePreview } from '@/components/onboarding/profile-preview'
import { AvatarCropper } from '@/components/onboarding/avatar-cropper'
import { COLOR_THEMES, SOCIAL_PLATFORMS } from '@/components/onboarding/types'
import { uid, useProfiles } from '@/components/dashboard/store'

export default function EditPage() {
  const router = useRouter()
  const { account, active, updateAccount, updateProfile } = useProfiles()
  const fileRef = useRef<HTMLInputElement | null>(null)
  const [cropSrc, setCropSrc] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setCropSrc(reader.result as string)
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const links = active.links
  const socials = active.socials

  function save() {
    setSaved(true)
    setTimeout(() => setSaved(false), 1600)
  }

  const previewLinks = links.length
    ? links.filter((l) => l.label).map((l) => l.label)
    : ['Add your first link']

  return (
    <div className="min-h-[100dvh] bg-background">
      <DashboardNav />

      <main className="mx-auto w-full max-w-6xl px-5 py-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <button
              type="button"
              onClick={() => router.push('/home')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </button>
            <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-foreground">
              Edit profile
            </h1>
            <p className="mt-1 text-muted-foreground">deets.pro/{active.username}</p>
          </div>
          <button
            type="button"
            onClick={save}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-display text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.02]"
          >
            {saved ? <Check className="h-4 w-4" /> : null}
            {saved ? 'Saved' : 'Save changes'}
          </button>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* Form */}
          <div className="flex flex-col gap-5">
            {/* Account */}
            <section className="rounded-2xl border border-border bg-card p-6">
              <h2 className="font-display text-lg font-bold text-foreground">Account</h2>
              <p className="text-sm text-muted-foreground">Shared across all your profiles.</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Labeled label="Your name">
                  <input
                    value={account.name}
                    onChange={(e) => updateAccount({ name: e.target.value })}
                    placeholder="Your full name"
                    className="input"
                  />
                </Labeled>
                <Labeled label="Phone number">
                  <input
                    value={account.phone}
                    onChange={(e) => updateAccount({ phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="input"
                  />
                </Labeled>
              </div>
              <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-border bg-background px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">{account.email}</p>
                  <p className="text-xs text-muted-foreground">
                    {account.emailVerified ? 'Verified' : 'Not verified yet'}
                  </p>
                </div>
                {account.emailVerified ? (
                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary">
                    <BadgeCheck className="h-4 w-4" />
                    Verified
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => updateAccount({ emailVerified: true })}
                    className="shrink-0 rounded-full bg-foreground px-4 py-2 text-xs font-bold text-background transition-opacity hover:opacity-90"
                  >
                    Verify email
                  </button>
                )}
              </div>
            </section>

            {/* Profile basics */}
            <section className="rounded-2xl border border-border bg-card p-6">
              <h2 className="font-display text-lg font-bold text-foreground">Profile</h2>
              <div className="mt-4 flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="group relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  {active.avatarDataUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={active.avatarDataUrl || '/placeholder.svg'} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <Camera className="h-6 w-6" />
                  )}
                </button>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">Profile photo</p>
                  <p className="text-xs text-muted-foreground">
                    Square image works best. You can crop after choosing.
                  </p>
                  <div className="mt-2 flex gap-2">
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-muted"
                    >
                      Upload
                    </button>
                    {active.avatarDataUrl ? (
                      <button
                        type="button"
                        onClick={() => updateProfile(active.id, { avatarDataUrl: null })}
                        className="rounded-full px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-destructive"
                      >
                        Remove
                      </button>
                    ) : null}
                  </div>
                  <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
                </div>
              </div>

              <div className="mt-4 grid gap-4">
                <Labeled label="Display name">
                  <input
                    value={active.name}
                    onChange={(e) => updateProfile(active.id, { name: e.target.value })}
                    placeholder="Your name or brand"
                    className="input"
                  />
                </Labeled>
                <Labeled label="Username">
                  <div className="flex items-center rounded-xl border border-border bg-background px-3">
                    <span className="text-sm font-semibold text-muted-foreground">deets.pro/</span>
                    <input
                      value={active.username}
                      onChange={(e) =>
                        updateProfile(active.id, {
                          username: e.target.value.toLowerCase().replace(/[^a-z0-9._]/g, ''),
                        })
                      }
                      className="flex-1 bg-transparent py-2.5 text-sm font-semibold text-foreground outline-none"
                    />
                  </div>
                </Labeled>
                <Labeled label="Bio">
                  <input
                    value={active.bio}
                    onChange={(e) => updateProfile(active.id, { bio: e.target.value })}
                    placeholder="A short line about you"
                    className="input"
                  />
                </Labeled>
              </div>
            </section>

            {/* Vibe */}
            <section className="rounded-2xl border border-border bg-card p-6">
              <h2 className="font-display text-lg font-bold text-foreground">Colors</h2>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {COLOR_THEMES.map((t) => {
                  const selected = active.mainColor === t.main && active.accentColor === t.accent
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => updateProfile(active.id, { mainColor: t.main, accentColor: t.accent })}
                      className={`relative h-11 w-11 overflow-hidden rounded-full ring-2 ring-offset-2 ring-offset-card transition-all ${
                        selected ? 'ring-foreground' : 'ring-transparent hover:ring-border'
                      }`}
                      style={{ background: t.main }}
                      aria-label={t.name}
                    >
                      <span
                        className="absolute bottom-0 right-0 h-5 w-5 rounded-tl-lg"
                        style={{ background: t.accent }}
                      />
                    </button>
                  )
                })}
              </div>
              <div className="mt-4 flex flex-wrap gap-4">
                <SwatchInput
                  label="Main"
                  value={active.mainColor}
                  onChange={(v) => updateProfile(active.id, { mainColor: v })}
                />
                <SwatchInput
                  label="Accent"
                  value={active.accentColor}
                  onChange={(v) => updateProfile(active.id, { accentColor: v })}
                />
              </div>
            </section>

            {/* Socials */}
            <section className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-bold text-foreground">Social accounts</h2>
                <span className="text-xs font-semibold text-muted-foreground">{socials.length} added</span>
              </div>
              <div className="mt-4 flex flex-col gap-3">
                {socials.map((s) => (
                  <div key={s.id} className="flex items-center gap-2">
                    <select
                      value={s.platform}
                      onChange={(e) =>
                        updateProfile(active.id, {
                          socials: socials.map((x) => (x.id === s.id ? { ...x, platform: e.target.value } : x)),
                        })
                      }
                      className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm font-semibold text-foreground outline-none"
                    >
                      {SOCIAL_PLATFORMS.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                    <input
                      value={s.handle}
                      onChange={(e) =>
                        updateProfile(active.id, {
                          socials: socials.map((x) => (x.id === s.id ? { ...x, handle: e.target.value } : x)),
                        })
                      }
                      placeholder="your handle"
                      className="input flex-1"
                    />
                    <IconBtn
                      onClick={() =>
                        updateProfile(active.id, { socials: socials.filter((x) => x.id !== s.id) })
                      }
                      label="Remove social"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    updateProfile(active.id, {
                      socials: [...socials, { id: uid('s'), platform: 'Instagram', handle: '' }],
                    })
                  }
                  className="add-row"
                >
                  <Plus className="h-4 w-4" />
                  Add social account
                </button>
              </div>
            </section>

            {/* Links */}
            <section className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-bold text-foreground">Links</h2>
                <span className="text-xs font-semibold text-muted-foreground">{links.length} added</span>
              </div>
              <div className="mt-4 flex flex-col gap-3">
                {links.map((l) => (
                  <div key={l.id} className="flex items-center gap-2 rounded-xl border border-border bg-background p-2.5">
                    <GripVertical className="h-4 w-4 shrink-0 text-muted-foreground/50" />
                    <div className="flex flex-1 flex-col gap-2">
                      <input
                        value={l.label}
                        onChange={(e) =>
                          updateProfile(active.id, {
                            links: links.map((x) => (x.id === l.id ? { ...x, label: e.target.value } : x)),
                          })
                        }
                        placeholder="Link title"
                        className="w-full bg-transparent text-sm font-semibold text-foreground outline-none placeholder:text-muted-foreground/60"
                      />
                      <input
                        value={l.url}
                        onChange={(e) =>
                          updateProfile(active.id, {
                            links: links.map((x) => (x.id === l.id ? { ...x, url: e.target.value } : x)),
                          })
                        }
                        placeholder="https://"
                        className="w-full bg-transparent text-xs text-muted-foreground outline-none placeholder:text-muted-foreground/50"
                      />
                    </div>
                    <IconBtn
                      onClick={() =>
                        updateProfile(active.id, { links: links.filter((x) => x.id !== l.id) })
                      }
                      label="Remove link"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    updateProfile(active.id, {
                      links: [...links, { id: uid('l'), label: '', url: '', clicks: 0 }],
                    })
                  }
                  className="add-row"
                >
                  <Plus className="h-4 w-4" />
                  Add link
                </button>
              </div>
            </section>
          </div>

          {/* Live preview */}
          <div className="lg:sticky lg:top-20 lg:self-start">
            <div className="rounded-2xl border border-border bg-card p-3 shadow-lg">
              <ProfilePreview
                main={active.mainColor}
                accent={active.accentColor}
                name={active.name || 'Your name'}
                title={active.bio || 'Your bio'}
                avatarDataUrl={active.avatarDataUrl}
                links={previewLinks.slice(0, 4)}
                size="lg"
              />
            </div>
            <p className="mt-3 text-center text-xs text-muted-foreground">Live preview</p>
          </div>
        </div>
      </main>

      {cropSrc ? (
        <AvatarCropper
          image={cropSrc}
          onCancel={() => setCropSrc(null)}
          onSave={(dataUrl) => {
            updateProfile(active.id, { avatarDataUrl: dataUrl })
            setCropSrc(null)
          }}
        />
      ) : null}

      <style jsx global>{`
        .input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid var(--color-border);
          background: var(--color-background);
          padding: 0.625rem 0.75rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--color-foreground);
          outline: none;
        }
        .input::placeholder {
          color: color-mix(in srgb, var(--color-muted-foreground) 60%, transparent);
        }
        .input:focus {
          border-color: var(--color-primary);
        }
        .add-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.375rem;
          border-radius: 0.75rem;
          border: 1px dashed var(--color-border);
          padding: 0.625rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--color-muted-foreground);
          transition: all 0.15s;
        }
        .add-row:hover {
          background: var(--color-muted);
          color: var(--color-foreground);
        }
      `}</style>
    </div>
  )
}

function Labeled({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</span>
      {children}
    </label>
  )
}

function SwatchInput({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <label className="flex items-center gap-3 rounded-xl border border-border bg-background px-3 py-2">
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-8 w-8 cursor-pointer rounded-lg border-0 bg-transparent p-0"
        aria-label={`${label} color`}
      />
      <span>
        <span className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </span>
        <span className="block font-mono text-sm font-semibold text-foreground">{value}</span>
      </span>
    </label>
  )
}

function IconBtn({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
      aria-label={label}
    >
      <Trash2 className="h-4 w-4" />
    </button>
  )
}
