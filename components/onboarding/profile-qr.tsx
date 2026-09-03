'use client'

import { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import { Download } from 'lucide-react'

type Props = {
  url: string
  username: string
  /** Foreground (module) color for the QR — defaults to near-black. */
  color?: string
}

export function ProfileQr({ url, username, color = '#111827' }: Props) {
  const [dataUrl, setDataUrl] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    QRCode.toDataURL(url, {
      errorCorrectionLevel: 'H',
      margin: 2,
      width: 512,
      color: { dark: color, light: '#FFFFFF' },
    })
      .then((out) => {
        if (active) setDataUrl(out)
      })
      .catch(() => {
        if (active) setDataUrl(null)
      })
    return () => {
      active = false
    }
  }, [url, color])

  function download() {
    if (!dataUrl) return
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = `deets-${username || 'profile'}-qr.png`
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
      <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1.5 ring-1 ring-border">
        {dataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={dataUrl} alt={`QR code linking to ${url}`} className="h-full w-full" />
        ) : (
          <div className="h-full w-full animate-pulse rounded-md bg-muted" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-display font-bold text-foreground">Your deets QR code</p>
        <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
          Print it, save it to your phone, or add it to your card — any scan lands on your profile.
        </p>
        <button
          type="button"
          onClick={download}
          disabled={!dataUrl}
          className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-bold text-background transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          <Download className="h-4 w-4" />
          Download PNG
        </button>
      </div>
    </div>
  )
}
