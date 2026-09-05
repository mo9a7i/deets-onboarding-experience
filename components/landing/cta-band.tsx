import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function CtaBand() {
  return (
    <section className="px-5 py-20">
      <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-[2.5rem] bg-primary px-6 py-16 text-center sm:px-16">
        <h2 className="mx-auto max-w-2xl text-balance font-display text-4xl font-extrabold leading-tight tracking-tight text-primary-foreground sm:text-5xl">
          Your whole world deserves one beautiful link.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-pretty text-lg leading-relaxed text-primary-foreground/85">
          Claim your handle before someone else does. It only takes a couple of minutes.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/start"
            className="group inline-flex items-center gap-2 rounded-full bg-background px-7 py-4 font-display text-base font-bold text-foreground transition-transform hover:scale-[1.02] active:scale-95"
          >
            Claim your link
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <a
            href="#faq"
            className="inline-flex items-center rounded-full border border-primary-foreground/30 px-6 py-4 font-display text-base font-bold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
          >
            Read the FAQ
          </a>
        </div>
      </div>
    </section>
  )
}
