'use client'

import { useParams, useRouter } from 'next/navigation'
import { Clock, Heart, MapPin, Phone, ExternalLink, ArrowLeft } from 'lucide-react'
import { initialsOf, useProfiles, type MenuItem } from '@/components/dashboard/store'
import { useFavorites } from '@/components/live/favorites'
import { WaiterTray } from '@/components/live/waiter-tray'

export default function LiveProfilePage() {
  const params = useParams<{ username: string }>()
  const router = useRouter()
  const { profiles } = useProfiles()

  const profile = profiles.find((p) => p.username === params.username)

  if (!profile) {
    return (
      <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-3 bg-neutral-50 px-6 text-center">
        <p className="font-display text-2xl font-extrabold text-neutral-900">Profile not found</p>
        <p className="text-neutral-500">deets.pro/{params.username} isn&apos;t claimed yet.</p>
        <button
          type="button"
          onClick={() => router.push('/home')}
          className="mt-2 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-bold text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </button>
      </div>
    )
  }

  const main = profile.mainColor
  const isShop = profile.type === 'shop' && profile.shop

  return (
    <div className="min-h-[100dvh]" style={{ background: '#f4f4f5' }}>
      <div className="mx-auto min-h-[100dvh] w-full max-w-md bg-white shadow-sm">
        {/* Header */}
        <header className="relative px-6 pb-8 pt-12 text-center" style={{ background: main }}>
          <div className="mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-white/20 ring-4 ring-white/40">
            {profile.avatarDataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.avatarDataUrl || '/placeholder.svg'}
                alt={profile.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="font-display text-3xl font-extrabold text-white">
                {initialsOf(profile.name)}
              </span>
            )}
          </div>
          <h1 className="mt-4 font-display text-2xl font-extrabold text-white drop-shadow-sm">
            {profile.name}
          </h1>
          {profile.bio ? <p className="mt-1 text-sm text-white/90">{profile.bio}</p> : null}

          {profile.socials.length ? (
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              {profile.socials.map((s) => (
                <span
                  key={s.id}
                  className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white"
                >
                  {s.platform}
                </span>
              ))}
            </div>
          ) : null}
        </header>

        <main className="px-5 py-6">
          {/* Shop details */}
          {isShop ? (
            <div className="mb-6 flex flex-col gap-2 rounded-2xl border border-neutral-100 bg-neutral-50 p-4">
              {profile.shop!.location ? (
                <p className="flex items-center gap-2 text-sm text-neutral-700">
                  <MapPin className="h-4 w-4 shrink-0" style={{ color: main }} />
                  {profile.shop!.location}
                </p>
              ) : null}
              {profile.shop!.phone ? (
                <p className="flex items-center gap-2 text-sm text-neutral-700">
                  <Phone className="h-4 w-4 shrink-0" style={{ color: main }} />
                  {profile.shop!.phone}
                </p>
              ) : null}
              <TodayHours hours={profile.shop!.hours} main={main} />
            </div>
          ) : null}

          {/* Links */}
          {profile.links.filter((l) => l.label).length ? (
            <div className="mb-6 flex flex-col gap-3">
              {profile.links
                .filter((l) => l.label)
                .map((link) => (
                  <a
                    key={link.id}
                    href={link.url || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-2xl border-2 px-5 py-4 font-semibold text-neutral-900 transition-transform hover:scale-[1.01]"
                    style={{ borderColor: main }}
                  >
                    {link.label}
                    <ExternalLink className="h-4 w-4" style={{ color: main }} />
                  </a>
                ))}
            </div>
          ) : null}

          {/* Menu */}
          {isShop ? (
            <div className="flex flex-col gap-6">
              {profile.shop!.categories.map((cat) => (
                <section key={cat.id}>
                  <h2
                    className="mb-3 font-display text-sm font-extrabold uppercase tracking-wide"
                    style={{ color: main }}
                  >
                    {cat.name}
                  </h2>
                  <div className="flex flex-col gap-3">
                    {cat.items.map((item) => (
                      <ItemCard
                        key={item.id}
                        item={item}
                        main={main}
                        onOpen={() => router.push(`/p/${profile.username}/item/${item.id}`)}
                      />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : null}
        </main>

        <footer className="px-5 pb-24 pt-4 text-center">
          <span className="text-xs font-semibold text-neutral-400">
            deets<span style={{ color: main }}>.pro</span>/{profile.username}
          </span>
        </footer>
      </div>

      <WaiterTray profile={profile} />
    </div>
  )
}

function ItemCard({
  item,
  main,
  onOpen,
}: {
  item: MenuItem
  main: string
  onOpen: () => void
}) {
  const { isFavorite, toggle } = useFavorites()
  const liked = isFavorite(item.id)

  return (
    <div className="relative flex items-stretch overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-sm transition-transform hover:scale-[1.01]">
      <button
        type="button"
        onClick={onOpen}
        className="flex flex-1 items-stretch gap-3 text-left"
        aria-label={`View ${item.name || 'item'}`}
      >
        {item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.image || '/placeholder.svg'}
            alt={item.name || 'Menu item'}
            className="h-24 w-24 shrink-0 object-cover"
          />
        ) : (
          <div className="flex h-24 w-24 shrink-0 items-center justify-center bg-neutral-100 text-neutral-300">
            <span className="font-display text-xs font-bold">No photo</span>
          </div>
        )}
        <div className="flex min-w-0 flex-1 flex-col justify-center py-2 pr-12">
          <p className="truncate font-display font-bold text-neutral-900">
            {item.name || 'Untitled item'}
          </p>
          {item.description ? (
            <p className="mt-0.5 line-clamp-2 text-xs text-neutral-500">{item.description}</p>
          ) : null}
          {item.price ? (
            <span className="mt-1.5 text-sm font-extrabold" style={{ color: main }}>
              ${item.price}
            </span>
          ) : null}
        </div>
      </button>
      <button
        type="button"
        aria-label={liked ? `Remove ${item.name} from your list` : `Add ${item.name} to your list`}
        aria-pressed={liked}
        onClick={() => toggle(item.id)}
        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm transition-colors"
        style={liked ? { background: main, borderColor: main } : undefined}
      >
        <Heart
          className="h-4 w-4"
          style={{ color: liked ? '#fff' : '#9ca3af' }}
          fill={liked ? '#fff' : 'none'}
        />
      </button>
    </div>
  )
}

function TodayHours({
  hours,
  main,
}: {
  hours: { day: string; open: string; close: string; closed: boolean }[]
  main: string
}) {
  const names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const today = names[new Date().getDay()]
  const row = hours.find((h) => h.day === today)
  if (!row) return null
  return (
    <p className="flex items-center gap-2 text-sm text-neutral-700">
      <Clock className="h-4 w-4 shrink-0" style={{ color: main }} />
      {row.closed ? (
        <span>Closed today</span>
      ) : (
        <span>
          Open today {row.open} – {row.close}
        </span>
      )}
    </p>
  )
}
