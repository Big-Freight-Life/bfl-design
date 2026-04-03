import Hero from '@/components/sections/Hero';
import PrinciplesSection from '@/components/sections/PrinciplesSection';
import CaseStudyCarousel from '@/components/sections/CaseStudyCarousel';
import POVSection from '@/components/sections/POVSection';
import WhatWeDoSection from '@/components/sections/WhatWeDoSection';
import CTASection from '@/components/sections/CTASection';
import BrandWordmark from '@/components/sections/BrandWordmark';
import LatestArticles from '@/components/sections/LatestArticles';

export default function Home() {
  return (
    <main>
      <Hero />
      <PrinciplesSection />
      <CaseStudyCarousel />
      <POVSection />
      <WhatWeDoSection />
      <CTASection />
      <BrandWordmark />
      <LatestArticles />
    </main>
  );
}
