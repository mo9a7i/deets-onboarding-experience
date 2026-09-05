import { OnboardingFlow } from '@/components/onboarding/onboarding-flow'

export default function StartPage() {
  return (
    <main className="min-h-[100dvh] bg-background">
      <OnboardingFlow initialStep={0} />
    </main>
  )
}
