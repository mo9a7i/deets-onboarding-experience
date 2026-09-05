'use client'

import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Heart, Check } from 'lucide-react'
import { flattenMenu, useProfiles } from '@/components/dashboard/store'
import { useFavorites } from '@/components/live/favorites'
import { WaiterTray } from '@/components/live/waiter-tray'

export default function ItemDetailPage() {
  const params = useParams<{ username: string; itemId: string }>()
  const router = useRouter()
  const { profiles } = useProfiles()
  const { isFavorite, toggle } = useFavorites()

  const profile = profiles.find((p) => p.username === params.username)
  const resolved = profile ? flattenMenu(profile.shop).find((r) => r.item.id === params.itemId) : undefined

  if (!profile || !resolved) {
    return (
      <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-3 bg-neutral-50 px-6 text-center">
        <p className="font-display text-2xl font-extrabold text-neutral-900">Item not found</p>
        <button
          type="button"
          onClick={() => router.push(`/p/${params.username}`)}
          className="mt-2 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-bold text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to menu
        </button>
      </div>
    )
  }

  const { item, categoryName } = resolved
  const main = profile.mainColor
  const accent = profile.accentColor
  const liked = isFavorite(item.id)

  return (
    <div className="min-h-[100dvh]" style={{ background: '#f4f4f5' }}>
      <div className="relative mx-auto min-h-[100dvh] w-full max-w-md bg-white shadow-sm">
        {/* Image */}
        <div className="relative">
          {item.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.image || '/placeholder.svg'}
              alt={item.name || 'Menu item'}
              className="h-72 w-full object-cover"
            />
          ) : (
            <div className="flex h-72 w-full items-center justify-center bg-neutral-100 text-neutral-300">
              <span className="font-display font-bold">No photo</span>
            </div>
          )}
          <button
            type="button"
            onClick={() => router.push(`/p/${profile.username}`)}
            className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-md backdrop-blur transition-transform hover:scale-105"
            aria-label="Back to menu"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        </div>

        {/* Details */}
        <div className="px-6 py-6">
          <span
            className="font-display text-xs font-extrabold uppercase tracking-wide"
            style={{ color: main }}
          >
            {categoryName}
          </span>
          <div className="mt-1 flex items-start justify-between gap-3">
            <h1 className="font-display text-2xl font-extrabold text-neutral-900">
              {item.name || 'Untitled item'}
            </h1>
            {item.price ? (
              <span
                className="shrink-0 rounded-lg px-2.5 py-1 font-display text-lg font-extrabold"
                style={{ background: accent, color: '#1b1b1f' }}
              >
                ${item.price}
              </span>
            ) : null}
          </div>
          {item.description ? (
            <p className="mt-3 leading-relaxed text-neutral-600">{item.description}</p>
          ) : null}

          <button
            type="button"
            onClick={() => toggle(item.id)}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full py-4 font-display text-base font-bold text-white transition-transform hover:scale-[1.01]"
            style={{ background: liked ? '#16a34a' : main }}
          >
            {liked ? (
              <>
                <Check className="h-5 w-5" />
                Added to your list
              </>
            ) : (
              <>
                <Heart className="h-5 w-5" />
                Add to my list
              </>
            )}
          </button>
          <p className="mt-3 text-center text-xs text-neutral-400">
            Save the items you like and show the list to your waiter. No payment needed.
          </p>
        </div>
      </div>

      <WaiterTray profile={profile} />
    </div>
  )
}
