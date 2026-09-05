const PARTNERS = [
  'Northlight',
  'Zaytoun & Jamr',
  'Studio Marra',
  'Bloom Coffee',
  'Atlas Labs',
  'Verde Market',
  'Nomad Press',
  'Lumen Studio',
]

export function PartnersSection() {
  return (
    <section aria-label="Trusted by teams and creators" className="border-y border-border bg-card/50 px-5 py-10">
      <div className="mx-auto w-full max-w-6xl">
        <p className="text-center font-display text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Trusted by shops, studios, and creators everywhere
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {PARTNERS.map((name) => (
            <span
              key={name}
              className="font-display text-lg font-extrabold tracking-tight text-foreground/35 transition-colors hover:text-foreground/70"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
