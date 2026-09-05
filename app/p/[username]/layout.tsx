import { FavoritesProvider } from '@/components/live/favorites'

export default function LiveLayout({ children }: { children: React.ReactNode }) {
  return <FavoritesProvider>{children}</FavoritesProvider>
}
