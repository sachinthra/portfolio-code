'use client';

import dynamic from 'next/dynamic';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ExperienceTimeline from '@/components/ExperienceTimeline';
import ProjectGrid from '@/components/ProjectGrid';
import SkillsSection from '@/components/SkillsSection';
import CredentialsSection from '@/components/CredentialsSection';
import ContactSection from '@/components/ContactSection';
import BlogPreview from '@/components/BlogPreview';

const Starfield = dynamic(() => import('@/components/three/Starfield'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 -z-10 bg-stellar dark:bg-orbit" />,
});

export default function Home() {
  return (
    <>
      <Starfield />
      <HeroSection />
      <AboutSection />
      <ExperienceTimeline />
      <SkillsSection />
      <ProjectGrid />
      <CredentialsSection />
      <BlogPreview />
      <ContactSection />
    </>
  );
}
