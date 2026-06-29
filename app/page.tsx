
import { CtaSection } from '@/components/agent-factory/cta-section'
import { FaqSection } from '@/components/agent-factory/faq-section'
import { FeaturesSection } from '@/components/agent-factory/features-section'
import { Hero } from '@/components/agent-factory/hero'
import { LearnMoreSection } from '@/components/agent-factory/learn-more-section'
import { AgentFactoryPipeline } from '@/components/agent-factory/pipeline'
import { ProductSection } from '@/components/agent-factory/product-section'
import { StatsSection } from '@/components/agent-factory/stats-section'
import { UseCasesSection } from '@/components/agent-factory/use-cases-section'
import { Footer } from '@/components/layout/footer'
import { Navigation } from '@/components/layout/navigation'
import { getPageContent } from '@/lib/content'


export const metadata = {
  title: 'Enterprise Brain ',
  description: 'Enterprise Brain — An AI-powered analytics agent at your fingertips. Instant answers, automated insights, and enterprise-grade security.',
}

export default async function HomePage() {
  const content = await getPageContent<any>('home')

  return (
    <>
      <Navigation />
      <main className="w-full">
        <Hero content={content?.hero} />
        <UseCasesSection content={content?.useCases} />
        <ProductSection content={content?.product} />
        <StatsSection content={content?.stats} />
        <FeaturesSection content={content?.features} />
        <AgentFactoryPipeline content={content?.pipeline} />
        <LearnMoreSection content={content?.learnMore} />
        <CtaSection content={content?.cta} />
        <FaqSection content={content?.faq} />
      </main>
      <Footer />
    </>
  )
}