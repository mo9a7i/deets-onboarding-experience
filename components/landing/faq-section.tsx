'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'

const FAQS = [
  {
    q: 'What exactly is deets?',
    a: 'deets is a single link that holds everything you are — your socials, links, menu, storefront, or business card. You share one handle and people get all of you in one beautiful page.',
  },
  {
    q: 'Is it really free to start?',
    a: 'Yes. You can claim your handle, build your profile, and share it without entering a credit card. Optional premium features are available later if you want more customization.',
  },
  {
    q: 'Can restaurants and shops use it?',
    a: 'Absolutely. Businesses can add a full menu or storefront with item photos and prices. Customers browse, favorite items to show the waiter, or head to your links — no payment step required.',
  },
  {
    q: 'How is this different from a regular link-in-bio?',
    a: 'deets is designed to look like your brand, not a plain list. You get color themes, photos, menus, digital business cards, a QR code, and a public directory so people can discover you.',
  },
  {
    q: 'Who can see my information?',
    a: 'You do. Every detail is opt-in — decide what is public, what stays private, and whether you appear in the discovery directory. You can change it anytime.',
  },
  {
    q: 'Can I change my design later?',
    a: 'Of course. Switch color themes, swap your photo, reorder links, and update your menu whenever you like. Changes go live instantly on your link.',
  },
]

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="scroll-mt-24 bg-card/50 px-5 py-20">
      <div className="mx-auto w-full max-w-3xl">
        <div className="text-center">
          <span className="font-display text-xs font-bold uppercase tracking-widest text-primary">
            FAQ
          </span>
          <h2 className="mt-3 text-balance font-display text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl">
            Common questions
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Everything you might want to know before claiming your link.
          </p>
        </div>

        <div className="mt-10 space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = open === i
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-2xl border border-border bg-background"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-base font-bold text-foreground">{item.q}</span>
                  <Plus
                    className={`h-5 w-5 shrink-0 text-primary transition-transform duration-300 ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-pretty text-sm leading-relaxed text-muted-foreground">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
