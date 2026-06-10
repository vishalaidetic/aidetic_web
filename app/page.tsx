'use client'
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

import { useEffect, useState } from 'react';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('prebuilt')
  const [activeIndustryTab, setActiveIndustryTab] = useState('banking')

  // Handle scroll spy for the sidebar
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleCards = entries.filter(entry => entry.isIntersecting && entry.target.hasAttribute('data-section-id'));
        if (visibleCards.length > 0) {
          visibleCards.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          const topVisible = visibleCards[0];
          const sectionId = topVisible.target.getAttribute('data-section-id');
          if (sectionId) setActiveTab(sectionId);
        }
      },
      { threshold: 0.3, rootMargin: '-10% 0px -40% 0px' }
    )

    document.querySelectorAll('[data-section-id]').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    setActiveTab(id)
    const el = document.querySelector(`[data-section-id="${id}"]`)
    if (el) {
      const offsetTop = el.getBoundingClientRect().top + window.scrollY - 150
      window.scrollTo({ top: offsetTop, behavior: 'smooth' })
    }
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-slate-50">
        <HeroSection />
        <AboutSection />
        <StatsSection />
        <TargetAudienceSection />
        <CmoCtaSection />
        <ProductsSection />
        <InfrastructureSection />
        <CaseStudiesSection activeTab={activeTab} scrollToSection={scrollToSection} />
        <IndustrySolutionsSection activeIndustryTab={activeIndustryTab} setActiveIndustryTab={setActiveIndustryTab} />
        <HomeFaqSection />
        <FinalCtaSection />
      </main>
      <div className="snap-start w-full">
        <Footer />
      </div>
    </>
  )
}
