const STATS = [
  { value: '2.4M+', label: 'Profiles created' },
  { value: '180M+', label: 'Links shared' },
  { value: '90+', label: 'Countries' },
  { value: '4.9/5', label: 'Average rating' },
]

export function StatsBand() {
  return (
    <section className="px-5 py-8">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-4 rounded-3xl border border-border bg-card p-8 sm:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-display text-4xl font-extrabold tracking-tight text-primary">
              {stat.value}
            </p>
            <p className="mt-1 text-sm font-medium text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
