'use client'

import { useEffect, useRef, useState } from 'react'
import { MapPin, AtSign, Phone, Mail, ArrowUpRight, Star } from 'lucide-react'

type Point = { x: number; y: number }

/**
 * A playful pile of sample profiles that gently float on their own, parallax
 * with the pointer anywhere in the section, and lift on hover — illustrating
 * the different things a deets link can be.
 *
 * `trackRef` is the region whose pointer position drives the parallax. When
 * omitted, movement is tracked across the whole window.
 */
export function CardStack({ trackRef }: { trackRef?: React.RefObject<HTMLElement | null> }) {
  const [pointer, setPointer] = useState<Point>({ x: 0, y: 0 })
  const [hovered, setHovered] = useState<string | null>(null)

  useEffect(() => {
    const el = trackRef?.current ?? null

    function handleMove(e: MouseEvent) {
      const rect = el
        ? el.getBoundingClientRect()
        : { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight }
      // Normalized -0.5..0.5 relative to the tracked region's center, clamped
      // so the pointer can leave the region without over-driving the parallax.
      const x = Math.max(-0.5, Math.min(0.5, (e.clientX - rect.left) / rect.width - 0.5))
      const y = Math.max(-0.5, Math.min(0.5, (e.clientY - rect.top) / rect.height - 0.5))
      setPointer({ x, y })
    }

    function reset() {
      setPointer({ x: 0, y: 0 })
    }

    const target: HTMLElement | Window = el ?? window
    target.addEventListener('mousemove', handleMove as EventListener)
    el?.addEventListener('mouseleave', reset)
    return () => {
      target.removeEventListener('mousemove', handleMove as EventListener)
      el?.removeEventListener('mouseleave', reset)
    }
  }, [trackRef])

  return (
    <div
      onMouseLeave={() => setHovered(null)}
      className="relative mx-auto h-[550px] w-full max-w-[525px]"
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
        float="stackFloatA 7s ease-in-out infinite"
        className="w-[210px]"
      >
        <div dir="rtl" className="font-arabic overflow-hidden rounded-2xl bg-card shadow-xl ring-1 ring-border">
          <div className="relative h-24 w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/menu/arabic-mixed-grill.png"
              alt="طبق مميز"
              className="h-full w-full object-cover"
            />
            <span className="absolute right-2 top-2 rounded-full bg-[#FF5C42] px-2 py-0.5 font-arabic text-[10px] font-bold text-white">
              مفتوح الآن
            </span>
          </div>
          <div className="p-3 text-right">
            <p className="font-arabic text-sm font-extrabold text-foreground">زيتون وجمر</p>
            <p className="flex items-center justify-start gap-1 text-[11px] text-muted-foreground">
              <MapPin className="h-3 w-3" /> شارع الملك فهد، الرياض
            </p>
            <div className="mt-2.5 space-y-1.5">
              {[
                ['مشاوي مشكلة', '45'],
                ['مندي لحم', '60'],
              ].map(([name, price]) => (
                <div key={name} className="flex items-center justify-between gap-2">
                  <span className="truncate text-[11px] font-medium text-foreground">{name}</span>
                  <span className="rounded-md bg-[#FFD23F] px-1.5 text-[11px] font-bold text-[#1b1b1f]">
                    {price} ر.س
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-lg bg-[#FF5C42] py-1.5 text-center font-arabic text-[11px] font-bold text-white">
              عرض القائمة كاملة
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
        float="stackFloatB 9s ease-in-out -2s infinite"
        className="w-[280px]"
      >
        <div dir="rtl" className="font-arabic overflow-hidden rounded-2xl bg-[#1F2430] p-4 text-right text-white shadow-2xl ring-1 ring-white/10">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FFB020] font-arabic text-base font-extrabold text-[#1F2430]">
                ل
              </div>
              <p className="mt-2.5 font-arabic text-base font-extrabold leading-none">
                ليان الحمادي
              </p>
              <p className="mt-1 text-[11px] font-medium text-[#FFB020]">مؤسِّسة · استوديو نورث لايت</p>
            </div>
            <span className="rounded-full border border-white/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white/60">
              deets.pro
            </span>
          </div>
          <div className="mt-3 flex items-center gap-3 border-t border-white/10 pt-2.5 text-[10px] text-white/70">
            <span dir="ltr" className="flex items-center gap-1">
              <Phone className="h-3 w-3" /> +966 55 012 3456
            </span>
            <span dir="ltr" className="flex items-center gap-1">
              <Mail className="h-3 w-3" /> layan@north.sa
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
        float="stackFloatC 6.5s ease-in-out -1s infinite"
        className="w-[196px]"
      >
        <div dir="rtl" className="font-arabic overflow-hidden rounded-2xl bg-card shadow-2xl ring-1 ring-border">
          <div className="relative h-28 w-full bg-gradient-to-br from-[#E23E80] to-[#7A3CFF]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/cards/influencer-ar.png"
              alt="صانعة محتوى"
              className="h-full w-full object-cover opacity-95"
            />
            <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-white/90 px-1.5 py-0.5 text-[9px] font-bold text-[#E23E80]">
              <Star className="h-2.5 w-2.5 fill-[#E23E80]" /> ١٢٨ ألف
            </span>
          </div>
          <div className="p-3 text-right">
            <p className="font-arabic text-sm font-extrabold text-foreground">نور العبدالله</p>
            <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <AtSign className="h-3 w-3" /> noor.creates
            </p>
            <div className="mt-2.5 space-y-1.5">
              {['أحدث فيديو على يوتيوب', 'تسوّقي إعداداتي'].map((label) => (
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
  float,
  className,
  children,
}: {
  id: string
  pointer: Point
  hovered: string | null
  setHovered: (id: string | null) => void
  depth: number
  base: Base
  float: string
  className?: string
  children: React.ReactNode
}) {
  const isHovered = hovered === id
  const dimmed = hovered !== null && !isHovered

  // All cards sit 25% larger; hover/dim nudges that baseline.
  const SCALE = 1.25

  // Parallax: deeper cards drift further; hovered card lifts toward the pointer.
  const tx = pointer.x * depth
  const ty = pointer.y * depth
  const rotate = base.rotate + pointer.x * (isHovered ? 2 : 6)
  const scale = (isHovered ? 1.06 : dimmed ? 0.97 : 1) * SCALE

  return (
    <div
      onMouseEnter={() => setHovered(id)}
      className={`absolute cursor-pointer transition-[transform,opacity] duration-[650ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${className ?? ''}`}
      style={{
        left: base.left,
        top: base.top,
        zIndex: isHovered ? 50 : base.z,
        opacity: dimmed ? 0.85 : 1,
        transform: `translate(${tx}px, ${ty - (isHovered ? 10 : 0)}px) rotate(${rotate}deg) scale(${scale})`,
      }}
    >
      {/* Inner wrapper carries the perpetual idle float so it composes with the
          pointer parallax on the parent. Paused while hovered for a clean lift. */}
      <div
        className="stack-float"
        style={{ animation: float, animationPlayState: isHovered ? 'paused' : 'running' }}
      >
        {children}
      </div>
    </div>
  )
}
