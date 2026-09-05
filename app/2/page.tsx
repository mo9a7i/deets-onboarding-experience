'use client'

import { useEffect, useState } from 'react'
import { LandingPage } from '@/components/landing/landing-page'

export default function GreenLandingPage() {
  const [dark, setDark] = useState(false)

  // Remember the visitor's choice for this variant across reloads.
  useEffect(() => {
    const saved = localStorage.getItem('deets2-theme')
    if (saved === 'dark') setDark(true)
    else if (saved === 'light') setDark(false)
    else setDark(window.matchMedia('(prefers-color-scheme: dark)').matches)
  }, [])

  useEffect(() => {
    localStorage.setItem('deets2-theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <div className={`theme-green ${dark ? 'dark' : ''} min-h-[100dvh] bg-background`}>
      <LandingPage isDark={dark} onToggleDark={() => setDark((v) => !v)} />
    </div>
  )
}
