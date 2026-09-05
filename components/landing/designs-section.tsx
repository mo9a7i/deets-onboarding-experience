import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ProfilePreview } from '@/components/onboarding/profile-preview'
import { COLOR_THEMES } from '@/components/onboarding/types'

const SAMPLES = [
  { themeId: 'sunset', name: 'Zaytoun & Jamr', title: 'Grill · Riyadh', links: ['View menu', 'Book a table'] },
  { themeId: 'rose', name: 'Noor Al-Abdullah', title: 'Creator', links: ['Latest drop', 'Shop presets'] },
  { themeId: 'midnight', name: 'Layan Al-Hammadi', title: 'Founder · Northlight', links: ['Save contact', 'Portfolio'] },
  { themeId: 'cobalt', name: 'Yousef Karim', title: 'Product designer', links: ['Case studies', 'Say hello'] },
  { themeId: 'forest', name: 'Verde Market', title: 'Online store', links: ['Shop now', 'Track order'] },
  { themeId: 'grape', name: 'Studio Marra', title: 'Design studio', links: ['Our work', 'Start a project'] },
]

export function DesignsSection() {
  const themeById = (id: string) => COLOR_THEMES.find((t) => t.id === id) ?? COLOR_THEMES[1]

  return (
    <section id="designs" className="scroll-mt-24 bg-card/50 px-5 py-20">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="font-display text-xs font-bold uppercase tracking-widest text-primary">
              Designs
            </span>
            <h2 className="mt-3 text-balance font-display text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl">
              Pick a vibe. Own the look.
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              Every profile starts from a handcrafted color theme, then bends to your brand. Here are
              a few of the looks you can ship today.
            </p>
          </div>
          <Link
            href="/start"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-6 py-3 font-display text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.03] active:scale-95"
          >
            Try the designer
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SAMPLES.map((s) => {
            const theme = themeById(s.themeId)
            return (
              <div key={s.name} className="flex flex-col gap-3">
                <div className="rounded-[1.75rem] bg-card p-3 shadow-sm ring-1 ring-border">
                  <ProfilePreview
                    main={theme.main}
                    accent={theme.accent}
                    name={s.name}
                    title={s.title}
                    links={s.links}
                    size="lg"
                  />
                </div>
                <p className="pl-1 font-display text-sm font-bold text-foreground">
                  {theme.name}
                  <span className="ml-2 font-sans text-xs font-medium text-muted-foreground">
                    theme
                  </span>
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
