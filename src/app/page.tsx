import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import PrinciplesSection from '@/components/sections/PrinciplesSection';
import CaseStudyCarousel from '@/components/sections/CaseStudyCarousel';
import POVSection from '@/components/sections/POVSection';
import WhatWeDoSection from '@/components/sections/WhatWeDoSection';
import CTASection from '@/components/sections/CTASection';
import BrandWordmark from '@/components/sections/BrandWordmark';
// import LatestArticles from '@/components/sections/LatestArticles';

export const metadata: Metadata = {
  title: 'BFL Design | Applied AI Architecture',
  description: 'Your AI strategy isn\'t broken — your system is. Big Freight Life helps organizations fix the systems AI is supposed to run on.',
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
      {/* <LatestArticles /> */}
    </>
  );
}
