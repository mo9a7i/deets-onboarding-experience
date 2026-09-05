import { Link2, Palette, UtensilsCrossed, CreditCard, QrCode, ShieldCheck } from 'lucide-react'

const FEATURES = [
  {
    icon: Link2,
    title: 'One link for it all',
    body: 'Bundle your socials, links, menus, and contact details into a single handle you can share anywhere.',
  },
  {
    icon: Palette,
    title: 'Make it unmistakably you',
    body: 'Pick a color vibe, add your photo, and set the tone. Your page looks designed, never generic.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Menus & storefronts',
    body: 'Restaurants and shops can show items with photos and prices — customers browse and favorite before they order.',
  },
  {
    icon: CreditCard,
    title: 'Digital business card',
    body: 'Share a tap-ready card with your role, company, and contact info. People save you in one tap.',
  },
  {
    icon: QrCode,
    title: 'QR & instant share',
    body: 'Every profile gets a QR code and share sheet, so a phone camera is all anyone needs to connect.',
  },
  {
    icon: ShieldCheck,
    title: 'You control your deets',
    body: 'Decide what is public, what is private, and whether you appear in the discovery directory.',
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="scroll-mt-24 px-5 py-20">
      <div className="mx-auto w-full max-w-6xl">
        <div className="max-w-2xl">
          <span className="font-display text-xs font-bold uppercase tracking-widest text-primary">
            Features
          </span>
          <h2 className="mt-3 text-balance font-display text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl">
            Everything you are, beautifully in one place
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            deets adapts to whoever you are — a creator, a cafe, a founder, or all three at once.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-3xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-xl font-extrabold tracking-tight text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                {feature.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
