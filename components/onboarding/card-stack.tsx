'use client'

import { useRef, useState } from 'react'
import { MapPin, AtSign, Phone, Mail, ArrowUpRight, Star } from 'lucide-react'

type Point = { x: number; y: number }

/**
 * A playful pile of sample profiles that parallax with the pointer and lift on
 * hover, illustrating the different things a deets link can be.
 */
export function CardStack() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [pointer, setPointer] = useState<Point>({ x: 0, y: 0 })
  const [hovered, setHovered] = useState<string | null>(null)

  function handleMove(e: React.MouseEvent) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    // Normalized -0.5..0.5 from the container center.
    setPointer({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    })
  }

  function reset() {
    setPointer({ x: 0, y: 0 })
    setHovered(null)
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="relative mx-auto h-[440px] w-full max-w-[420px]"
    >
      <div className="absolute inset-6 -z-10 rounded-[3rem] bg-accent/40 blur-3xl" />

      {/* Restaurant — portrait menu card */}
      <StackCard
        id="restaurant"
        pointer={pointer}
        hovered={hovered}
        setHovered={setHovered}
        depth={26}
        base={{ left: '2%', top: '12%', rotate: -8, z: 10 }}
        className="w-[210px]"
      >
        <div className="overflow-hidden rounded-2xl bg-card shadow-xl ring-1 ring-border">
          <div className="relative h-24 w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/menu/almond-croissant.png"
              alt="Signature dish"
              className="h-full w-full object-cover"
            />
            <span className="absolute left-2 top-2 rounded-full bg-[#FF5C42] px-2 py-0.5 font-display text-[10px] font-bold uppercase tracking-wide text-white">
              Open now
            </span>
          </div>
          <div className="p-3">
            <p className="font-display text-sm font-extrabold text-foreground">Olive & Ember</p>
            <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <MapPin className="h-3 w-3" /> Corner of 5th & Main
            </p>
            <div className="mt-2.5 space-y-1.5">
              {[
                ['Wood-fired margherita', '14'],
                ['Truffle tagliatelle', '19'],
              ].map(([name, price]) => (
                <div key={name} className="flex items-center justify-between gap-2">
                  <span className="truncate text-[11px] font-medium text-foreground">{name}</span>
                  <span className="rounded-md bg-[#FFD23F] px-1.5 text-[11px] font-bold text-[#1b1b1f]">
                    ${price}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-lg bg-[#FF5C42] py-1.5 text-center font-display text-[11px] font-bold text-white">
              View full menu
            </div>
          </div>
        </div>
      </StackCard>

      {/* Business card — landscape */}
      <StackCard
        id="business"
        pointer={pointer}
        hovered={hovered}
        setHovered={setHovered}
        depth={44}
        base={{ left: '14%', top: '46%', rotate: 5, z: 20 }}
        className="w-[280px]"
      >
        <div className="overflow-hidden rounded-2xl bg-[#1F2430] p-4 text-white shadow-2xl ring-1 ring-white/10">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FFB020] font-display text-base font-extrabold text-[#1F2430]">
                M
              </div>
              <p className="mt-2.5 font-display text-base font-extrabold leading-none">
                Maya Chen
              </p>
              <p className="mt-1 text-[11px] font-medium text-[#FFB020]">Founder · Northlight Studio</p>
            </div>
            <span className="rounded-full border border-white/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white/60">
              deets.pro
            </span>
          </div>
          <div className="mt-3 flex items-center gap-3 border-t border-white/10 pt-2.5 text-[10px] text-white/70">
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" /> +1 415 555 0132
            </span>
            <span className="flex items-center gap-1">
              <Mail className="h-3 w-3" /> maya@north.co
            </span>
          </div>
        </div>
      </StackCard>

      {/* Influencer — portrait profile card */}
      <StackCard
        id="influencer"
        pointer={pointer}
        hovered={hovered}
        setHovered={setHovered}
        depth={64}
        base={{ left: '44%', top: '6%', rotate: 9, z: 30 }}
        className="w-[196px]"
      >
        <div className="overflow-hidden rounded-2xl bg-card shadow-2xl ring-1 ring-border">
          <div className="relative h-28 w-full bg-gradient-to-br from-[#E23E80] to-[#7A3CFF]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/cards/influencer.png"
              alt="Creator"
              className="h-full w-full object-cover opacity-95"
            />
            <span className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-white/90 px-1.5 py-0.5 text-[9px] font-bold text-[#E23E80]">
              <Star className="h-2.5 w-2.5 fill-[#E23E80]" /> 128k
            </span>
          </div>
          <div className="p-3">
            <p className="font-display text-sm font-extrabold text-foreground">Jules Portmann</p>
            <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <AtSign className="h-3 w-3" /> jules.creates
            </p>
            <div className="mt-2.5 space-y-1.5">
              {['Latest YouTube drop', 'Shop my presets'].map((label) => (
                <div
                  key={label}
                  className="flex items-center justify-between rounded-lg bg-muted px-2 py-1.5 text-[11px] font-semibold text-foreground"
                >
                  <span className="truncate">{label}</span>
                  <ArrowUpRight className="h-3 w-3 shrink-0 text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </StackCard>
    </div>
  )
}

type Base = { left: string; top: string; rotate: number; z: number }

function StackCard({
  id,
  pointer,
  hovered,
  setHovered,
  depth,
  base,
  className,
  children,
}: {
  id: string
  pointer: Point
  hovered: string | null
  setHovered: (id: string | null) => void
  depth: number
  base: Base
  className?: string
  children: React.ReactNode
}) {
  const isHovered = hovered === id
  const dimmed = hovered !== null && !isHovered

  // Parallax: deeper cards drift further; hovered card lifts toward the pointer.
  const tx = pointer.x * depth
  const ty = pointer.y * depth
  const rotate = base.rotate + pointer.x * (isHovered ? 2 : 6)
  const scale = isHovered ? 1.06 : dimmed ? 0.97 : 1

  return (
    <div
      onMouseEnter={() => setHovered(id)}
      className={`absolute cursor-pointer transition-[transform,opacity] duration-200 ease-out ${className ?? ''}`}
      style={{
        left: base.left,
        top: base.top,
        zIndex: isHovered ? 50 : base.z,
        opacity: dimmed ? 0.85 : 1,
        transform: `translate(${tx}px, ${ty - (isHovered ? 10 : 0)}px) rotate(${rotate}deg) scale(${scale})`,
      }}
    >
      {children}
    </div>
  )
}
