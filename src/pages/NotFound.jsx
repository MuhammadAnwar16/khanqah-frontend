import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

const NotFound = () => {
  const { language } = useLanguage();
  const isUrdu = language === 'urdu';
  
  const seo = {
    title: isUrdu ? '404 - صفحہ نہیں ملا | خانقاہ یٰسین زئی' : '404 - Page Not Found | Khanqah Yaseen Zai',
    description: isUrdu ? 'صفحہ نہیں ملا' : 'The page you are looking for does not exist.',
  };
  
  return (
    <div dir={isUrdu ? 'rtl' : 'ltr'}>
      <SEO 
        title={seo.title}
        description={seo.description}
      />
      
      <div className={`min-h-screen flex items-center justify-center bg-[#faf9f6] ${isUrdu ? 'font-urdu' : ''}`}>
        <div className="text-center px-6">
          {/* Watermark Background Logo */}
          <div className="fixed top-1/2 left-1/2 z-0 pointer-events-none transform -translate-x-1/2 -translate-y-1/2">
            <img
              src="/images/khanqah logo.png"
              alt={isUrdu ? "خانقاہ یٰسین زئی کا لوگو" : "Khanqah Yaseen Zai Logo"}
              aria-hidden="true"
              className="w-full max-w-5xl opacity-5 grayscale filter"
            />
          </div>
          
          <div className="relative z-10">
            <h1 className="text-9xl md:text-[12rem] font-bold text-[#0C0C0C] mb-6 opacity-20">404</h1>
            
            <h2 className="text-3xl md:text-5xl font-bold text-[#0C0C0C] mb-6">
              {isUrdu ? 'صفحہ نہیں ملا' : 'Page Not Found'}
            </h2>
            
            <p className={`text-lg text-gray-600 mb-12 max-w-md mx-auto ${isUrdu ? 'leading-[2.2]' : 'leading-relaxed'}`}>
              {isUrdu
                ? 'معذرت، آپ جو صفحہ تلاش کر رہے ہیں وہ موجود نہیں ہے۔'
                : 'Sorry, the page you are looking for does not exist.'}
            </p>
            
            <Link
              to="/"
              className="inline-flex items-center gap-3 px-8 py-4 text-sm uppercase tracking-widest bg-[#0C0C0C] text-white hover:bg-gray-800 transition-colors duration-300"
            >
              <span>{isUrdu ? 'گھر واپس جائیں' : 'Go Home'}</span>
              <svg
                className={`w-5 h-5 ${isUrdu ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

