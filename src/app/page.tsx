import React from 'react';
import HeroSection from './components/HeroSection';
import StorySection from './components/StorySection';
import DedicationsSection from './components/DedicationsSection';
import LoveLetterSection from './components/LoveLetterSection';
import PetalCanvas from './components/PetalCanvas';
import Footer from '@/components/Footer';
import FloatingMusicPlayer from './components/FloatingMusicPlayer';

export default function Page() {
  return (
    <main className="relative min-h-screen gradient-warm-bg overflow-x-hidden">
      <PetalCanvas />
      <HeroSection />
      <StorySection />
      <DedicationsSection />
      <LoveLetterSection />
      <Footer />
      <FloatingMusicPlayer />
    </main>
  );
}