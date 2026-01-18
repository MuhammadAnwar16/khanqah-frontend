import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

/**
 * SEO Component - Dynamically updates meta tags, title, and structured data
 * Usage: <SEO title="Page Title" description="Page description" />
 */
const SEO = ({
  title,
  description,
  keywords,
  image = '/images/khanqahlogo.png',
  type = 'website',
  noindex = false,
  structuredData = null,
}) => {
  const location = useLocation();
  const { language } = useLanguage();
  const isUrdu = language === 'urdu';

  // Base URL - update this to your production domain
  const baseUrl = typeof window !== 'undefined' 
    ? window.location.origin 
    : 'https://khanqahyaseenzai.com';
  
  const canonicalUrl = `${baseUrl}${location.pathname}`;
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;

  useEffect(() => {
    // Update document title
    document.title = title || 'Khanqah Yaseen Zai | خانقاہ یٰسین زئی';

    // Update or create meta tags
    const updateMetaTag = (name, content, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Primary meta tags
    updateMetaTag('title', title);
    updateMetaTag('description', description);
    if (keywords) updateMetaTag('keywords', keywords);
    
    // Robots
    updateMetaTag('robots', noindex ? 'noindex, nofollow' : 'index, follow');

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', fullImageUrl, true);
    updateMetaTag('og:url', canonicalUrl, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:locale', isUrdu ? 'ur_PK' : 'en_US', true);
    updateMetaTag('og:site_name', 'Khanqah Yaseen Zai', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image', true);
    updateMetaTag('twitter:title', title, true);
    updateMetaTag('twitter:description', description, true);
    updateMetaTag('twitter:image', fullImageUrl, true);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // Language alternates
    const currentPath = location.pathname;
    let langEn = document.querySelector('link[rel="alternate"][hreflang="en"]');
    let langUr = document.querySelector('link[rel="alternate"][hreflang="ur"]');
    
    if (!langEn) {
      langEn = document.createElement('link');
      langEn.setAttribute('rel', 'alternate');
      langEn.setAttribute('hreflang', 'en');
      document.head.appendChild(langEn);
    }
    langEn.setAttribute('href', `${baseUrl}${currentPath}`);

    if (!langUr) {
      langUr = document.createElement('link');
      langUr.setAttribute('rel', 'alternate');
      langUr.setAttribute('hreflang', 'ur');
      document.head.appendChild(langUr);
    }
    langUr.setAttribute('href', `${baseUrl}${currentPath}`);

    // Add structured data (JSON-LD)
    // Remove existing structured data scripts
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(script => script.remove());
    
    // Add new structured data (supports both single objects and arrays)
    if (structuredData) {
      const dataArray = Array.isArray(structuredData) ? structuredData : [structuredData];
      dataArray.forEach((data) => {
        if (data) {
          const script = document.createElement('script');
          script.type = 'application/ld+json';
          script.textContent = JSON.stringify(data);
          document.head.appendChild(script);
        }
      });
    }
  }, [title, description, keywords, image, type, canonicalUrl, fullImageUrl, isUrdu, location.pathname, structuredData, noindex]);

  return null; // This component doesn't render anything
};

export default SEO;

