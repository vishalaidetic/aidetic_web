import { Navigation } from '@/components/layout/navigation'
import { Footer } from '@/components/layout/footer'
import { Hero } from '@/components/agent-factory/hero'
import { StatsSection } from '@/components/agent-factory/stats-section'
import { FeaturesSection } from '@/components/agent-factory/features-section'
import { CmoSection } from '@/components/agent-factory/cmo-section'
import { ProductSection } from '@/components/agent-factory/product-section'
import { ScaleSection } from '@/components/agent-factory/scale-section'
import { AgentFactoryPipeline } from '@/components/agent-factory/pipeline'
import { UseCasesSection } from '@/components/agent-factory/use-cases-section'
import { LearnMoreSection } from '@/components/agent-factory/learn-more-section'
import { FaqSection } from '@/components/agent-factory/faq-section'
import { CtaSection } from '@/components/agent-factory/cta-section'

export const metadata = {
  title: 'Agent Factory | Aidetic',
  description: 'Agent Factory — An AI-powered analytics agent at your fingertips. Instant answers, automated insights, and enterprise-grade security.',
}

export default function AgentFactoryPage() {
  return (
    <>
      <Navigation />
      <main className="w-full">
        <Hero />
        <UseCasesSection />
        <ProductSection />
        <StatsSection />
        <FeaturesSection />
        <CmoSection />
        <AgentFactoryPipeline />
        <LearnMoreSection />
        <CtaSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  )
}