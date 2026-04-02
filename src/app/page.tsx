import Hero from '@/components/sections/Hero';
import PrinciplesSection from '@/components/sections/PrinciplesSection';
import CaseStudyCarousel from '@/components/sections/CaseStudyCarousel';
import POVSection from '@/components/sections/POVSection';
import WhatWeDoSection from '@/components/sections/WhatWeDoSection';
import EntryPointsSection from '@/components/sections/EntryPointsSection';
import CTASection from '@/components/sections/CTASection';

export default function Home() {
  return (
    <main>
      <Hero />
      <PrinciplesSection />
      <CaseStudyCarousel />
      <POVSection />
      <WhatWeDoSection />
      <EntryPointsSection />
      <CTASection />
    </main>
  );
}
