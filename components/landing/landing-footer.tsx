import Link from 'next/link'

const COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Designs', href: '#designs' },
      { label: 'Discover', href: '#discover' },
      { label: 'Pricing', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Help center', href: '#' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Community', href: '#' },
      { label: 'Status', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'Cookies', href: '#' },
    ],
  },
]

const SOCIALS = ['Instagram', 'X', 'TikTok', 'YouTube']

export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto w-full max-w-6xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_2.5fr]">
          <div>
            <Link href="/" className="font-display text-lg font-extrabold tracking-tight text-foreground">
              deets<span className="text-primary">.pro</span>
            </Link>
            <p className="mt-3 max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
              Give people your deets. One playful link for everything you are — profiles, menus,
              shops, and business cards.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s}
                  href="#"
                  className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="font-display text-sm font-bold text-foreground">{col.title}</p>
                <ul className="mt-3 space-y-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} deets.pro — All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">Made for everyone with something to share.</p>
        </div>
      </div>
    </footer>
  )
}
