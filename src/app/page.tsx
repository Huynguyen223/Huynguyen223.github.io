import React from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { HeroSection } from '../components/sections/HeroSection';
import { CategoryRow } from '../components/sections/CategoryRow';
import { FlavorSpices } from '../components/sections/FlavorSpices';
import { FeaturedProductsTabs } from '../components/sections/FeaturedProductsTabs';
import { GlobalShippingSection } from '../components/sections/GlobalShippingSection';
import { CertificationsSection } from '../components/sections/CertificationsSection';
import { FactoryGallery } from '../components/sections/FactoryGallery';
import { ArticleGrid } from '../components/sections/ArticleGrid';
import { CompanyVideoSection } from '../components/sections/CompanyVideoSection';
import { SectionSeam } from '../components/ui/SectionSeam';

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-grow">
        <CompanyVideoSection />
        <HeroSection />
        <SectionSeam from="#1a0e0a" to="#ffffff" height={140} mist="#e8a96b" />
        <CategoryRow />
        <SectionSeam from="#ffffff" to="#2b1710" height={140} mist="#396d34" />
        <FlavorSpices />
        <FeaturedProductsTabs />
        <CertificationsSection />
        <FactoryGallery />
        <GlobalShippingSection />
        <ArticleGrid />
      </main>
      <Footer />
    </div>
  );
}
