import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import PrinciplesSection from '@/components/sections/PrinciplesSection';
import CaseStudyCarousel from '@/components/sections/CaseStudyCarousel';
import POVSection from '@/components/sections/POVSection';
import WhatWeDoSection from '@/components/sections/WhatWeDoSection';
import CTASection from '@/components/sections/CTASection';
import BrandWordmark from '@/components/sections/BrandWordmark';
import LatestArticles from '@/components/sections/LatestArticles';

export const metadata: Metadata = {
  title: 'BFL Design | Applied AI Architecture & Design',
  description: 'Big Freight Life helps organizations design systems that actually work — applied AI architecture, workflow design, and operational clarity for complex environments.',
};

export default function Home() {
  return (
    <>
      <Hero />
      <PrinciplesSection />
      <CaseStudyCarousel />
      <POVSection />
      <WhatWeDoSection />
      <CTASection />
      <BrandWordmark />
      <LatestArticles />
    </>
  );
}
