import { LandingHeader } from './landing-header'
import { HeroSection } from './hero-section'
import { PartnersSection } from './partners-section'
import { StatsBand } from './stats-band'
import { FeaturesSection } from './features-section'
import { HowItWorks } from './how-it-works'
import { DiscoverSection } from './discover-section'
import { DesignsSection } from './designs-section'
import { TestimonialsSection } from './testimonials-section'
import { FaqSection } from './faq-section'
import { ContactSection } from './contact-section'
import { CtaBand } from './cta-band'
import { LandingFooter } from './landing-footer'

export function LandingPage() {
  return (
    <div className="min-h-[100dvh] bg-background">
      <LandingHeader />
      <main>
        <HeroSection />
        <PartnersSection />
        <FeaturesSection />
        <HowItWorks />
        <DiscoverSection />
        <DesignsSection />
        <StatsBand />
        <TestimonialsSection />
        <FaqSection />
        <ContactSection />
        <CtaBand />
      </main>
      <LandingFooter />
    </div>
  )
}
