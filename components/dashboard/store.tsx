'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'

export type SocialItem = { id: string; platform: string; handle: string }
export type LinkItem = { id: string; label: string; url: string; clicks: number }

export type MenuItem = {
  id: string
  name: string
  description: string
  price: string
  image: string | null
}
export type MenuCategory = { id: string; name: string; items: MenuItem[] }
export type HourRow = { day: string; open: string; close: string; closed: boolean }
export type ShopData = {
  location: string
  phone: string
  hours: HourRow[]
  categories: MenuCategory[]
}

export type DailyStat = { date: string; views: number; clicks: number }

export type Profile = {
  id: string
  username: string
  name: string
  bio: string
  avatarDataUrl: string | null
  mainColor: string
  accentColor: string
  socials: SocialItem[]
  links: LinkItem[]
  type: 'link' | 'shop'
  shop: ShopData | null
  daily: DailyStat[]
}

export type Account = {
  name: string
  phone: string
  email: string
  emailVerified: boolean
  plan: 'free' | 'premium'
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function uid(prefix = 'id') {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`
}

// Deterministic pseudo-random so mock analytics stay stable between renders.
function seeded(seed: number) {
  let s = seed % 2147483647
  if (s <= 0) s += 2147483646
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

function makeDaily(seed: number, base: number, days = 30): DailyStat[] {
  const rand = seeded(seed)
  const out: DailyStat[] = []
  const today = new Date()
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    const weekend = d.getDay() === 0 || d.getDay() === 6
    const wave = 1 + 0.35 * Math.sin((days - i) / 3.2)
    const views = Math.round(base * wave * (weekend ? 1.25 : 1) * (0.7 + rand() * 0.6))
    const clicks = Math.round(views * (0.28 + rand() * 0.22))
    out.push({ date: d.toISOString().slice(0, 10), views, clicks })
  }
  return out
}

function defaultHours(): HourRow[] {
  return [
    { day: 'Monday', open: '08:00', close: '18:00', closed: false },
    { day: 'Tuesday', open: '08:00', close: '18:00', closed: false },
    { day: 'Wednesday', open: '08:00', close: '18:00', closed: false },
    { day: 'Thursday', open: '08:00', close: '18:00', closed: false },
    { day: 'Friday', open: '08:00', close: '20:00', closed: false },
    { day: 'Saturday', open: '09:00', close: '20:00', closed: false },
    { day: 'Sunday', open: '10:00', close: '16:00', closed: true },
  ]
}

export function starterShop(): ShopData {
  return {
    location: '',
    phone: '',
    hours: defaultHours(),
    categories: [
      {
        id: uid('cat'),
        name: 'Coffee',
        items: [
          {
            id: uid('item'),
            name: 'Flat White',
            description: 'Double shot, silky microfoam',
            price: '4.50',
            image: '/menu/flat-white.png',
          },
          {
            id: uid('item'),
            name: 'Cold Brew',
            description: '18-hour steep, over ice',
            price: '5.00',
            image: '/menu/cold-brew.png',
          },
        ],
      },
      {
        id: uid('cat'),
        name: 'Bakery',
        items: [
          {
            id: uid('item'),
            name: 'Almond Croissant',
            description: 'Baked fresh each morning',
            price: '3.75',
            image: '/menu/almond-croissant.png',
          },
        ],
      },
    ],
  }
}

function seedProfiles(): Profile[] {
  return [
    {
      id: 'p_alex',
      username: 'alexrivera',
      name: 'Alex Rivera',
      bio: 'Designer & maker · building in public',
      avatarDataUrl: null,
      mainColor: '#FF5C42',
      accentColor: '#FFD23F',
      type: 'shop',
      shop: starterShop(),
      socials: [
        { id: uid('s'), platform: 'Instagram', handle: 'alex.makes' },
        { id: uid('s'), platform: 'X', handle: 'alexrivera' },
        { id: uid('s'), platform: 'GitHub', handle: 'arivera' },
      ],
      links: [
        { id: uid('l'), label: 'My portfolio', url: 'https://alex.design', clicks: 1284 },
        { id: uid('l'), label: 'Latest drop', url: 'https://alex.design/shop', clicks: 902 },
        { id: uid('l'), label: 'Newsletter', url: 'https://alex.design/news', clicks: 613 },
        { id: uid('l'), label: 'Book a call', url: 'https://cal.com/alex', clicks: 341 },
      ],
      daily: makeDaily(11, 240),
    },
    {
      id: 'p_studio',
      username: 'studionine',
      name: 'Studio Nine',
      bio: 'Independent creative studio',
      avatarDataUrl: null,
      mainColor: '#2D5BFF',
      accentColor: '#7CC6FF',
      type: 'link',
      shop: null,
      socials: [{ id: uid('s'), platform: 'Instagram', handle: 'studio.nine' }],
      links: [
        { id: uid('l'), label: 'Our work', url: 'https://studionine.co', clicks: 421 },
        { id: uid('l'), label: 'Get in touch', url: 'https://studionine.co/contact', clicks: 208 },
      ],
      daily: makeDaily(29, 90),
    },
  ]
}

type Store = {
  account: Account
  profiles: Profile[]
  activeId: string
  active: Profile
  setActiveId: (id: string) => void
  updateAccount: (patch: Partial<Account>) => void
  updateProfile: (id: string, patch: Partial<Profile>) => void
  addProfile: () => string
  activateShop: (id: string) => void
}

const StoreContext = createContext<Store | null>(null)

export function ProfilesProvider({ children }: { children: React.ReactNode }) {
  const [account, setAccount] = useState<Account>({
    name: 'Alex Rivera',
    phone: '',
    email: 'alex@studio.com',
    emailVerified: true,
    plan: 'premium',
  })
  const [profiles, setProfiles] = useState<Profile[]>(seedProfiles)
  const [activeId, setActiveId] = useState('p_alex')

  const active = useMemo(
    () => profiles.find((p) => p.id === activeId) ?? profiles[0],
    [profiles, activeId],
  )

  const updateAccount = useCallback(
    (patch: Partial<Account>) => setAccount((a) => ({ ...a, ...patch })),
    [],
  )

  const updateProfile = useCallback(
    (id: string, patch: Partial<Profile>) =>
      setProfiles((list) => list.map((p) => (p.id === id ? { ...p, ...patch } : p))),
    [],
  )

  const addProfile = useCallback(() => {
    const id = uid('p')
    const n = profiles.length + 1
    const fresh: Profile = {
      id,
      username: `profile${n}`,
      name: 'New profile',
      bio: '',
      avatarDataUrl: null,
      mainColor: '#7A3CFF',
      accentColor: '#C9A7FF',
      type: 'link',
      shop: null,
      socials: [],
      links: [],
      daily: makeDaily(Math.floor(Math.random() * 9999), 20),
    }
    setProfiles((list) => [...list, fresh])
    setActiveId(id)
    return id
  }, [profiles.length])

  const activateShop = useCallback(
    (id: string) => {
      setAccount((a) => ({ ...a, plan: 'premium' }))
      setProfiles((list) =>
        list.map((p) => (p.id === id ? { ...p, type: 'shop', shop: p.shop ?? starterShop() } : p)),
      )
    },
    [],
  )

  const value: Store = {
    account,
    profiles,
    activeId,
    active,
    setActiveId,
    updateAccount,
    updateProfile,
    addProfile,
    activateShop,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useProfiles() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useProfiles must be used within ProfilesProvider')
  return ctx
}

// Derived analytics helpers.
export function summarize(daily: DailyStat[]) {
  const views = daily.reduce((s, d) => s + d.views, 0)
  const clicks = daily.reduce((s, d) => s + d.clicks, 0)
  const ctr = views ? (clicks / views) * 100 : 0
  return { views, clicks, ctr }
}

export type ResolvedMenuItem = { item: MenuItem; categoryName: string }

export function flattenMenu(shop: ShopData | null): ResolvedMenuItem[] {
  if (!shop) return []
  return shop.categories.flatMap((c) => c.items.map((item) => ({ item, categoryName: c.name })))
}

export function initialsOf(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export { DAYS, uid }
