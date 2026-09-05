'use client'

import { useEffect, useState } from 'react'
import { LandingPage } from '@/components/landing/landing-page'
import { ThemePicker, type Accent } from '@/components/landing/theme-picker'

export default function GreenLandingPage() {
  const [dark, setDark] = useState(false)
  const [accent, setAccent] = useState<Accent>('green')

  // Remember the visitor's choices for this variant across reloads.
  useEffect(() => {
    const savedTheme = localStorage.getItem('deets2-theme')
    if (savedTheme === 'dark') setDark(true)
    else if (savedTheme === 'light') setDark(false)
    else setDark(window.matchMedia('(prefers-color-scheme: dark)').matches)

    const savedAccent = localStorage.getItem('deets2-accent')
    if (savedAccent === 'orange' || savedAccent === 'green') setAccent(savedAccent)
  }, [])

  useEffect(() => {
    localStorage.setItem('deets2-theme', dark ? 'dark' : 'light')
  }, [dark])

  useEffect(() => {
    localStorage.setItem('deets2-accent', accent)
  }, [accent])

  return (
    <div className={`theme-${accent} ${dark ? 'dark' : ''} min-h-[100dvh] bg-background`}>
      <LandingPage isDark={dark} onToggleDark={() => setDark((v) => !v)} />
      <ThemePicker accent={accent} onChange={setAccent} />
    </div>
  )
}
