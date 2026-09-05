'use client'

import { useCallback, useState } from 'react'
import Cropper, { type Area } from 'react-easy-crop'
import { ZoomIn, ZoomOut, RotateCw, X } from 'lucide-react'

type Props = {
  image: string
  onCancel: () => void
  onSave: (dataUrl: string) => void
  aspect?: number
  cropShape?: 'round' | 'rect'
  title?: string
  outputWidth?: number
}

async function getCroppedImage(
  imageSrc: string,
  crop: Area,
  rotation: number,
  aspect: number,
  outputWidth: number,
): Promise<string> {
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = imageSrc
  })

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return imageSrc

  // Output at the requested width, keeping the crop's aspect ratio.
  const outW = Math.min(crop.width, outputWidth)
  const outH = Math.round(outW / aspect)
  canvas.width = outW
  canvas.height = outH

  const rad = (rotation * Math.PI) / 180

  // Draw the (possibly rotated) source region into the canvas.
  ctx.save()
  ctx.translate(outW / 2, outH / 2)
  ctx.rotate(rad)
  ctx.translate(-outW / 2, -outH / 2)
  ctx.drawImage(image, crop.x, crop.y, crop.width, crop.height, 0, 0, outW, outH)
  ctx.restore()

  return canvas.toDataURL('image/jpeg', 0.92)
}

export function AvatarCropper({
  image,
  onCancel,
  onSave,
  aspect = 1,
  cropShape = 'round',
  title = 'Crop your photo',
  outputWidth = 512,
}: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [pixels, setPixels] = useState<Area | null>(null)
  const [saving, setSaving] = useState(false)

  const onCropComplete = useCallback((_: Area, areaPixels: Area) => {
    setPixels(areaPixels)
  }, [])

  async function handleSave() {
    if (!pixels) return
    setSaving(true)
    const result = await getCroppedImage(image, pixels, rotation, aspect, outputWidth)
    onSave(result)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Crop your photo"
    >
      <div className="w-full max-w-md overflow-hidden rounded-3xl bg-card shadow-2xl ring-1 ring-border">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-display text-lg font-extrabold tracking-tight text-foreground">
            {title}
          </h2>
          <button
            type="button"
            onClick={onCancel}
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Cancel"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="relative h-72 w-full bg-foreground/90">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={aspect}
            cropShape={cropShape}
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onRotationChange={setRotation}
            onCropComplete={onCropComplete}
          />
        </div>

        <div className="space-y-4 px-5 py-4">
          <div className="flex items-center gap-3">
            <ZoomOut className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              type="range"
              min={1}
              max={3}
              step={0.01}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              aria-label="Zoom"
              className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary"
            />
            <ZoomIn className="h-4 w-4 shrink-0 text-muted-foreground" />
            <button
              type="button"
              onClick={() => setRotation((r) => (r + 90) % 360)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              aria-label="Rotate"
            >
              <RotateCw className="h-4 w-4" />
            </button>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 rounded-xl px-4 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving || !pixels}
              className="flex-1 rounded-xl bg-primary px-4 py-3 font-display text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {saving ? 'Saving…' : 'Save photo'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
