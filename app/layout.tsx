import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Bricolage_Grotesque, IBM_Plex_Sans_Arabic } from 'next/font/google'
import { ProfilesProvider } from '@/components/dashboard/store'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
})

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plex-arabic',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'deets.pro — All of you, in one link',
  description:
    'deets.pro is one playful link for everything you are — profiles, menus, storefronts, and digital business cards. Pick your vibe, add your links, and share in minutes.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#FF5C42',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`light scroll-smooth ${inter.variable} ${bricolage.variable} ${plexArabic.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <ProfilesProvider>{children}</ProfilesProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
