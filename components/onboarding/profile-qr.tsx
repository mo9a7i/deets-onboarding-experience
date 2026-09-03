'use client'

import { useEffect, useMemo, useState } from 'react'
import QRCode from 'qrcode'
import { Download } from 'lucide-react'

type Props = {
  url: string
  username: string
  /** Accent color used for the center brand label. */
  color?: string
}

/** Relative luminance so we never render a QR too light to scan. */
function isLight(hex: string) {
  const m = hex.replace('#', '')
  if (m.length < 6) return false
  const r = parseInt(m.slice(0, 2), 16) / 255
  const g = parseInt(m.slice(2, 4), 16) / 255
  const b = parseInt(m.slice(4, 6), 16) / 255
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b
  return lum > 0.62
}

const MARGIN = 2 // quiet-zone modules
const DARK = '#111827'

function inFinder(r: number, c: number, size: number) {
  return (
    (r < 7 && c < 7) ||
    (r < 7 && c >= size - 7) ||
    (r >= size - 7 && c < 7)
  )
}

/** Builds a full SVG string: rounded modules, rounded finders, center brand label. */
function buildSvg(url: string, accent: string) {
  const qr = QRCode.create(url, { errorCorrectionLevel: 'H' })
  const size = qr.modules.size
  const cells = qr.modules.data
  const total = size + MARGIN * 2
  const accentSafe = isLight(accent) ? DARK : accent

  const parts: string[] = []

  // Data modules (skip finder-pattern regions).
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (!cells[r * size + c]) continue
      if (inFinder(r, c, size)) continue
      const x = (MARGIN + c + 0.05).toFixed(2)
      const y = (MARGIN + r + 0.05).toFixed(2)
      parts.push(`<rect x="${x}" y="${y}" width="0.9" height="0.9" rx="0.35" fill="${DARK}"/>`)
    }
  }

  // Three rounded finder patterns.
  const finders = [
    [0, 0],
    [0, size - 7],
    [size - 7, 0],
  ]
  for (const [fr, fc] of finders) {
    const ox = MARGIN + fc
    const oy = MARGIN + fr
    parts.push(`<rect x="${ox}" y="${oy}" width="7" height="7" rx="2.2" fill="${DARK}"/>`)
    parts.push(`<rect x="${ox + 1}" y="${oy + 1}" width="5" height="5" rx="1.6" fill="#FFFFFF"/>`)
    parts.push(`<rect x="${ox + 2}" y="${oy + 2}" width="3" height="3" rx="1" fill="${DARK}"/>`)
  }

  // Center brand label (error-correction level H tolerates the knockout).
  const cx = total / 2
  const cy = total / 2
  const bw = total * 0.44
  const bh = total * 0.17
  const fs = bh * 0.52
  parts.push(
    `<rect x="${(cx - bw / 2 - 0.6).toFixed(2)}" y="${(cy - bh / 2 - 0.6).toFixed(2)}" width="${(bw + 1.2).toFixed(2)}" height="${(bh + 1.2).toFixed(2)}" rx="${(bh / 2 + 0.6).toFixed(2)}" fill="#FFFFFF"/>`,
  )
  parts.push(
    `<rect x="${(cx - bw / 2).toFixed(2)}" y="${(cy - bh / 2).toFixed(2)}" width="${bw.toFixed(2)}" height="${bh.toFixed(2)}" rx="${(bh / 2).toFixed(2)}" fill="#FFFFFF" stroke="${accentSafe}" stroke-width="0.4"/>`,
  )
  parts.push(
    `<text x="${cx.toFixed(2)}" y="${cy.toFixed(2)}" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" font-size="${fs.toFixed(2)}" font-weight="800" text-anchor="middle" dominant-baseline="central"><tspan fill="${DARK}">deets</tspan><tspan fill="${accentSafe}">.pro</tspan></text>`,
  )

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${total} ${total}" width="${total}" height="${total}" shape-rendering="geometricPrecision"><rect width="${total}" height="${total}" fill="#FFFFFF"/>${parts.join('')}</svg>`
}

export function ProfileQr({ url, username, color = DARK }: Props) {
  const svg = useMemo(() => buildSvg(url, color), [url, color])
  const svgDataUrl = useMemo(
    () => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`,
    [svg],
  )
  const [pngUrl, setPngUrl] = useState<string | null>(null)

  // Rasterize the SVG to a high-res PNG for download.
  useEffect(() => {
    let active = true
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      if (!active) return
      const px = 1024
      const canvas = document.createElement('canvas')
      canvas.width = px
      canvas.height = px
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(0, 0, px, px)
      ctx.drawImage(img, 0, 0, px, px)
      setPngUrl(canvas.toDataURL('image/png'))
    }
    img.src = svgDataUrl
    return () => {
      active = false
    }
  }, [svgDataUrl])

  function download() {
    const href = pngUrl ?? svgDataUrl
    const a = document.createElement('a')
    a.href = href
    a.download = `deets-${username || 'profile'}-qr.png`
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-4 text-center">
      <div className="w-full max-w-[200px] overflow-hidden rounded-xl bg-white p-2 ring-1 ring-border">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={svgDataUrl || '/placeholder.svg'} alt={`QR code linking to ${url}`} className="h-full w-full" />
      </div>
      <div>
        <p className="font-display font-bold text-foreground">Your deets QR code</p>
        <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
          Print it, save it to your phone, or add it to your card — any scan lands on your profile.
        </p>
      </div>
      <button
        type="button"
        onClick={download}
        className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-bold text-background transition-opacity hover:opacity-90"
      >
        <Download className="h-4 w-4" />
        Download PNG
      </button>
    </div>
  )
}
