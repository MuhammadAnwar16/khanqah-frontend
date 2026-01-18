import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SEO from './components/SEO';
import LoadingSpinner from './components/LoadingSpinner';
import { seoData, getOrganizationSchema, getWebsiteSchema } from './utils/seoData';
import { useLanguage } from './context/LanguageContext';

import HeroSection from './components/HeroSection';
import EventsSection from './components/EventsSection';
import GallerySection from './components/GallerySection';
import CurrentNasheenSection from './components/CurrentNasheenSection';
import ScrollToTopButton from './components/ScrollToTopButton';

// Lazy load pages for code splitting
const AboutSection = lazy(() => import('./components/AboutSection'));
const ContactSection = lazy(() => import('./components/ContactSection'));
const FamilyTree = lazy(() => import('./pages/FamilyTree'));
const Publications = lazy(() => import('./pages/Publications'));
const ShajrahRoadmap = lazy(() => import('./pages/ShajrahTasawuf'));
const VideoGallery = lazy(() => import('./pages/VideoGallery'));
const Gallery = lazy(() => import('./pages/Gallery'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading fallback component
const PageLoader = () => (
  <LoadingSpinner fullScreen />
);
/*import DuasAndSayings from './pages/DuasAndSayings';*/

const HomePage = () => {
  const { language } = useLanguage();
  const seo = seoData.home[language === 'urdu' ? 'ur' : 'en'];
  
  return (
  <>
      <SEO 
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        structuredData={[getOrganizationSchema(), getWebsiteSchema()]}
      />
    <HeroSection />
    <CurrentNasheenSection/>
    <EventsSection />
    <GallerySection />
  </>
);
};

function App() {
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutSection />} />
        <Route path="/shajra" element={<FamilyTree />} />
        <Route path="/shajrahTasawuf" element={<ShajrahRoadmap />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/VideoGallery" element={<VideoGallery />} />
        <Route path="/contact" element={<ContactSection />} />
          <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
      <Footer />
      <ScrollToTopButton />
    </Router>
  );
}

export default App;
