'use client'

type ProfilePreviewProps = {
  main: string
  accent: string
  name?: string
  title?: string
  avatarDataUrl?: string | null
  links?: string[]
  size?: 'sm' | 'md' | 'lg'
}

// Decide readable text color for a given hex background.
function readableOn(hex: string): string {
  const c = hex.replace('#', '')
  const full =
    c.length === 3
      ? c
          .split('')
          .map((x) => x + x)
          .join('')
      : c
  const r = Number.parseInt(full.slice(0, 2), 16)
  const g = Number.parseInt(full.slice(2, 4), 16)
  const b = Number.parseInt(full.slice(4, 6), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.62 ? '#1b1b1f' : '#ffffff'
}

export function ProfilePreview({
  main,
  accent,
  name = 'Alex Rivera',
  title = 'Designer & maker',
  avatarDataUrl,
  links = ['My portfolio', 'Latest drop'],
  size = 'md',
}: ProfilePreviewProps) {
  const onMain = readableOn(main)
  const onAccent = readableOn(accent)

  const scale = {
    sm: { pad: 'p-3', avatar: 'h-9 w-9', name: 'text-[11px]', title: 'text-[9px]', link: 'text-[9px] py-1.5', gap: 'gap-1.5' },
    md: { pad: 'p-4', avatar: 'h-12 w-12', name: 'text-sm', title: 'text-[11px]', link: 'text-[11px] py-2', gap: 'gap-2' },
    lg: { pad: 'p-6', avatar: 'h-16 w-16', name: 'text-base', title: 'text-xs', link: 'text-xs py-2.5', gap: 'gap-2.5' },
  }[size]

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')

  return (
    <div
      className={`flex w-full flex-col items-center rounded-2xl ${scale.pad}`}
      style={{
        background: `linear-gradient(160deg, ${main} 0%, ${main} 42%, color-mix(in srgb, ${main} 78%, ${accent}) 100%)`,
      }}
    >
      <div
        className={`flex ${scale.avatar} items-center justify-center rounded-full font-display font-semibold`}
        style={{
          background: accent,
          color: onAccent,
          boxShadow: `0 0 0 3px color-mix(in srgb, ${onMain} 22%, transparent)`,
        }}
      >
        {avatarDataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatarDataUrl || '/placeholder.svg'}
            alt=""
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          <span className={scale.name}>{initials}</span>
        )}
      </div>

      <p
        className={`mt-2 font-display font-bold leading-tight ${scale.name}`}
        style={{ color: onMain }}
      >
        {name}
      </p>
      <p
        className={`${scale.title} font-medium`}
        style={{ color: `color-mix(in srgb, ${onMain} 78%, transparent)` }}
      >
        {title}
      </p>

      <div className={`mt-3 flex w-full flex-col ${scale.gap}`}>
        {links.map((label, i) => (
          <div
            key={label + i}
            className={`w-full rounded-full text-center font-semibold ${scale.link}`}
            style={
              i === 0
                ? { background: accent, color: onAccent }
                : {
                    background: `color-mix(in srgb, ${onMain} 12%, transparent)`,
                    color: onMain,
                    border: `1px solid color-mix(in srgb, ${onMain} 22%, transparent)`,
                  }
            }
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}
