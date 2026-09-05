'use client'

import { useState } from 'react'
import { Heart, X, ConciergeBell, Trash2 } from 'lucide-react'
import { flattenMenu, type Profile } from '@/components/dashboard/store'
import { useFavorites } from './favorites'

export function WaiterTray({ profile }: { profile: Profile }) {
  const { ids, remove, clear, count } = useFavorites()
  const [open, setOpen] = useState(false)

  const items = flattenMenu(profile.shop).filter((r) => ids.includes(r.item.id))
  const accent = profile.accentColor
  const main = profile.mainColor

  if (count === 0) return null

  return (
    <>
      {/* Floating trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full px-5 py-3 font-display text-sm font-bold shadow-xl ring-1 ring-black/10 transition-transform hover:scale-[1.03]"
        style={{ background: main, color: '#fff' }}
      >
        <ConciergeBell className="h-4 w-4" />
        My list
        <span
          className="flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 text-xs font-bold"
          style={{ background: accent, color: '#1b1b1f' }}
        >
          {count}
        </span>
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-md overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl">
            <div className="flex items-center justify-between px-5 py-4" style={{ background: main }}>
              <div>
                <h2 className="font-display text-lg font-extrabold text-white">Show your waiter</h2>
                <p className="text-xs text-white/80">
                  {count} {count === 1 ? 'item' : 'items'} you&apos;d like to order
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[55vh] overflow-y-auto p-4">
              <ul className="flex flex-col gap-3">
                {items.map(({ item, categoryName }) => (
                  <li key={item.id} className="flex items-center gap-3">
                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-neutral-100">
                      {item.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.image || '/placeholder.svg'}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="flex h-full w-full items-center justify-center">
                          <Heart className="h-5 w-5 text-neutral-300" />
                        </span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-neutral-900">
                        {item.name || 'Untitled item'}
                      </p>
                      <p className="truncate text-xs text-neutral-500">{categoryName}</p>
                    </div>
                    {item.price ? (
                      <span
                        className="shrink-0 rounded-md px-2 py-0.5 text-sm font-bold"
                        style={{ background: accent, color: '#1b1b1f' }}
                      >
                        ${item.price}
                      </span>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => remove(item.id)}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-red-50 hover:text-red-500"
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-neutral-100 px-5 py-4">
              <button
                type="button"
                onClick={clear}
                className="text-sm font-semibold text-neutral-500 transition-colors hover:text-neutral-800"
              >
                Clear list
              </button>
              <p className="text-right text-xs text-neutral-400">
                No payment — just show this screen when ordering.
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
