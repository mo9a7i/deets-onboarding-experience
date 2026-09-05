'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'

type FavoritesStore = {
  ids: string[]
  isFavorite: (id: string) => boolean
  toggle: (id: string) => void
  remove: (id: string) => void
  clear: () => void
  count: number
}

const FavoritesContext = createContext<FavoritesStore | null>(null)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([])

  const toggle = useCallback((id: string) => {
    setIds((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]))
  }, [])

  const remove = useCallback((id: string) => {
    setIds((list) => list.filter((x) => x !== id))
  }, [])

  const clear = useCallback(() => setIds([]), [])

  const value = useMemo<FavoritesStore>(
    () => ({
      ids,
      isFavorite: (id: string) => ids.includes(id),
      toggle,
      remove,
      clear,
      count: ids.length,
    }),
    [ids, toggle, remove, clear],
  )

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider')
  return ctx
}
