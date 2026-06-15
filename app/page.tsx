import { FinalCtaSection } from '@/components/home/final-cta-section';
import { HomeFaqSection } from '@/components/home/home-faq-section';
import { Footer } from '@/components/layout/footer';
import { Navigation } from '@/components/layout/navigation';

import { HeroSection } from '@/components/home/hero-section';
import { AboutSection } from '@/components/home/about-section';
import { StatsSection } from '@/components/home/stats-section';
import { TargetAudienceSection } from '@/components/home/targetaudience-section';
import { CmoCtaSection } from '@/components/home/cmocta-section';
import { ProductsSection } from '@/components/home/products-section';
import { InfrastructureSection } from '@/components/home/infrastructure-section';
import { CaseStudiesSection } from '@/components/home/casestudies-section';
import { IndustrySolutionsSection } from '@/components/home/industrysolutions-section';
import { getPageContent } from '@/lib/content';

export default async function HomePage() {
  const content = await getPageContent('home');

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-slate-50">
        <HeroSection content={content?.hero} />
        <AboutSection content={content?.about} />
        <StatsSection content={content?.stats} />
        <TargetAudienceSection content={content?.targetAudience} />
        <CmoCtaSection content={content?.cmoCta} />
        <ProductsSection content={content?.products} />
        <InfrastructureSection content={content?.infrastructure} />
        <CaseStudiesSection content={content?.case_studies} />
        <IndustrySolutionsSection content={content?.industrySolutions} />
        <HomeFaqSection content={content?.faq} />
        <FinalCtaSection content={content?.finalCta} />
      </main>
      <div className="snap-start w-full">
        <Footer />
      </div>
    </>
  )
}
