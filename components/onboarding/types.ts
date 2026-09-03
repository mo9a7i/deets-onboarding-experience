export type ColorTheme = {
  id: string
  name: string
  main: string
  accent: string
}

export const COLOR_THEMES: ColorTheme[] = [
  { id: 'sunset', name: 'Sunset', main: '#FF5C42', accent: '#FFD23F' },
  { id: 'cobalt', name: 'Cobalt', main: '#2D5BFF', accent: '#7CC6FF' },
  { id: 'grape', name: 'Grape', main: '#7A3CFF', accent: '#C9A7FF' },
  { id: 'forest', name: 'Forest', main: '#157F5A', accent: '#9CE84F' },
  { id: 'midnight', name: 'Midnight', main: '#1F2430', accent: '#FFB020' },
  { id: 'rose', name: 'Rose', main: '#E23E80', accent: '#FFC2D9' },
  { id: 'lagoon', name: 'Lagoon', main: '#0FA3A3', accent: '#7FE3D2' },
  { id: 'tangerine', name: 'Tangerine', main: '#FF7A18', accent: '#FFC48C' },
]

export const DEFAULT_THEME = COLOR_THEMES[0]

export type LinkItem = {
  id: string
  label: string
  url: string
}

export type SocialItem = {
  id: string
  platform: string
  handle: string
}

export type ContactCard = {
  fullName: string
  jobTitle: string
  company: string
  email: string
  phone: string
}

export type OnboardingData = {
  email: string
  emailVerified: boolean
  password: string
  username: string
  title: string
  bio: string
  avatarDataUrl: string | null
  mainColor: string
  accentColor: string
  themeId: string | null
  socials: SocialItem[]
  links: LinkItem[]
  shareContact: boolean
  askVisitors: boolean
  contactCard: ContactCard
  inDirectory: boolean
}

export const INITIAL_DATA: OnboardingData = {
  email: '',
  emailVerified: false,
  password: '',
  username: '',
  title: '',
  bio: '',
  avatarDataUrl: null,
  mainColor: DEFAULT_THEME.main,
  accentColor: DEFAULT_THEME.accent,
  themeId: DEFAULT_THEME.id,
  socials: [],
  links: [],
  shareContact: false,
  askVisitors: false,
  contactCard: {
    fullName: '',
    jobTitle: '',
    company: '',
    email: '',
    phone: '',
  },
  inDirectory: false,
}

// Usernames that are "taken" — used to mock availability checks in the prototype.
export const TAKEN_USERNAMES = new Set([
  'admin',
  'me',
  'you',
  'john',
  'jane',
  'app',
  'deets',
  'support',
  'hello',
  'test',
])

export const SOCIAL_PLATFORMS = [
  'Instagram',
  'X',
  'TikTok',
  'YouTube',
  'LinkedIn',
  'GitHub',
  'Website',
] as const
