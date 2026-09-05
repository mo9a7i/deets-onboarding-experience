const STEPS = [
  {
    step: 'Step 1',
    title: 'Claim your link',
    body: 'Sign up and grab your unique deets.pro handle before someone else does.',
  },
  {
    step: 'Step 2',
    title: 'Make it yours',
    body: 'Choose a color vibe, add your photo, links, menu, or contact card in a few quick taps.',
  },
  {
    step: 'Step 3',
    title: 'Share everywhere',
    body: 'Drop your link in a bio, print the QR, or tap phones. People get all of you at once.',
  },
]

export function HowItWorks() {
  return (
    <section className="bg-card/50 px-5 py-20">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-display text-xs font-bold uppercase tracking-widest text-primary">
            How it works
          </span>
          <h2 className="mt-3 text-balance font-display text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl">
            Live in minutes, not afternoons
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {STEPS.map((item, i) => (
            <div key={item.title} className="relative rounded-3xl border border-border bg-background p-7">
              <span className="font-display text-6xl font-extrabold leading-none text-accent">
                {i + 1}
              </span>
              <p className="mt-4 font-display text-xs font-bold uppercase tracking-widest text-muted-foreground">
                {item.step}
              </p>
              <h3 className="mt-1 font-display text-xl font-extrabold tracking-tight text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
