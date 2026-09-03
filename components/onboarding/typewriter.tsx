'use client'

import { useEffect, useState } from 'react'

type TypewriterProps = {
  words: string[]
  className?: string
  typingSpeed?: number
  deletingSpeed?: number
  pauseMs?: number
}

export function Typewriter({
  words,
  className,
  typingSpeed = 90,
  deletingSpeed = 45,
  pauseMs = 1400,
}: TypewriterProps) {
  const [wordIndex, setWordIndex] = useState(0)
  const [text, setText] = useState('')
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing')

  useEffect(() => {
    const current = words[wordIndex % words.length]

    if (phase === 'typing') {
      if (text === current) {
        const t = setTimeout(() => setPhase('pausing'), pauseMs)
        return () => clearTimeout(t)
      }
      const t = setTimeout(
        () => setText(current.slice(0, text.length + 1)),
        typingSpeed,
      )
      return () => clearTimeout(t)
    }

    if (phase === 'pausing') {
      const t = setTimeout(() => setPhase('deleting'), pauseMs)
      return () => clearTimeout(t)
    }

    // deleting
    if (text === '') {
      setWordIndex((i) => (i + 1) % words.length)
      setPhase('typing')
      return
    }
    const t = setTimeout(
      () => setText(current.slice(0, text.length - 1)),
      deletingSpeed,
    )
    return () => clearTimeout(t)
  }, [text, phase, wordIndex, words, typingSpeed, deletingSpeed, pauseMs])

  return (
    <span className={className}>
      {/* Reserve baseline so layout doesn't jump */}
      <span aria-hidden="true">{text || '\u200b'}</span>
      <span
        className="ml-0.5 inline-block h-[0.9em] w-[3px] translate-y-[0.08em] animate-pulse rounded-full bg-current align-baseline"
        aria-hidden="true"
      />
      <span className="sr-only">{words.join(', ')}</span>
    </span>
  )
}
