import type { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { PhilosophySection } from '@/components/sections/PhilosophySection';
import { WorkSection } from '@/components/sections/WorkSection';
import { CapabilitiesSection } from '@/components/sections/CapabilitiesSection';
import { ProofSection } from '@/components/sections/ProofSection';
import { CtaSection } from '@/components/sections/CtaSection';

export const metadata: Metadata = {
  title: 'Webcraft Studio — Global Digital Experience Agency',
  description: 'We engineer premium digital experiences that drive real business outcomes. Web design agency for startups, enterprises, and global brands.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PhilosophySection />
      <WorkSection />
      <CapabilitiesSection />
      <ProofSection />
      <CtaSection />
    </>
  );
}
