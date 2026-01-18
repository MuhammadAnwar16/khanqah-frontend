# SEO Implementation Guide

This document outlines the comprehensive SEO implementation for the Khanqah Yaseen Zai website.

## Overview

The website has been fully optimized for search engines with:
- Dynamic meta tags per page
- Structured data (JSON-LD)
- Sitemap and robots.txt
- Optimized images with proper alt attributes
- Canonical URLs and Open Graph tags
- Bilingual support (English/Urdu)

## Implementation Details

### 1. SEO Component (`src/components/SEO.jsx`)

A reusable React component that dynamically updates:
- Page title
- Meta description
- Meta keywords
- Open Graph tags
- Twitter Card tags
- Canonical URLs
- Language alternates (hreflang)
- Structured data (JSON-LD)

**Usage:**
```jsx
import SEO from '../components/SEO';
import { seoData } from '../utils/seoData';

const MyPage = () => {
  const { language } = useLanguage();
  const seo = seoData.myPage[language === 'urdu' ? 'ur' : 'en'];
  
  return (
    <>
      <SEO 
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        structuredData={breadcrumbSchema}
      />
      {/* Page content */}
    </>
  );
};
```

### 2. SEO Data Configuration (`src/utils/seoData.js`)

Centralized SEO metadata for all pages:
- Homepage
- About
- Shajrah-e-Nasab
- Shajrah-e-Tasawuf
- Publications
- Gallery
- Video Gallery
- Contact

Each page has bilingual SEO data (English and Urdu).

### 3. Structured Data (JSON-LD)

The following schema types are implemented:
- **Organization**: Business information, contact details, address
- **WebSite**: Site-wide information with search action
- **BreadcrumbList**: Navigation breadcrumbs for each page

### 4. Sitemap (`public/sitemap.xml`)

XML sitemap includes:
- All main pages
- Priority levels
- Change frequency
- Last modified dates
- Language alternates (hreflang)

**Update the domain** in `public/sitemap.xml` when deploying to production.

### 5. Robots.txt (`public/robots.txt`)

Configured to:
- Allow all search engines
- Disallow admin and API endpoints
- Reference sitemap location

### 6. Image Optimization

All images have:
- Descriptive alt attributes (bilingual)
- Lazy loading where appropriate
- Proper semantic markup
- `aria-hidden="true"` for decorative images

### 7. Meta Tags in `index.html`

Base meta tags are set in `index.html` for:
- Initial page load
- Social media sharing
- Search engine indexing

## Page-Specific SEO

### Homepage (`/`)
- **Title**: "Khanqah Yaseen Zai | خانقاہ یٰسین زئی - Spiritual Training Center"
- **Description**: Overview of the spiritual center
- **Structured Data**: Organization + WebSite schemas

### About (`/about`)
- **Title**: "About Khanqah Yaseen Zai | History & Spiritual Heritage"
- **Description**: History, objectives, and training programs
- **Structured Data**: BreadcrumbList

### Shajrah-e-Nasab (`/shajra`)
- **Title**: "Shajrah-e-Nasab | Lineage of Nasab - Khanqah Yaseen Zai"
- **Description**: Genealogical lineage information
- **Structured Data**: BreadcrumbList

### Shajrah-e-Tasawuf (`/shajrahTasawuf`)
- **Title**: "Shajrah-e-Tasawuf | Spiritual Lineage - Khanqah Yaseen Zai"
- **Description**: Spiritual lineage and Sufi chain
- **Structured Data**: BreadcrumbList

### Publications (`/publications`)
- **Title**: "Publications | Books & Risalay - Khanqah Yaseen Zai"
- **Description**: Collection of spiritual publications
- **Structured Data**: BreadcrumbList

### Gallery (`/gallery`)
- **Title**: "Photo Gallery | Sacred Moments - Khanqah Yaseen Zai"
- **Description**: Photo collections from events
- **Structured Data**: BreadcrumbList

### Video Gallery (`/VideoGallery`)
- **Title**: "Media Gallery | Videos & Audios - Khanqah Yaseen Zai"
- **Description**: Video and audio content
- **Structured Data**: BreadcrumbList

### Contact (`/contact`)
- **Title**: "Contact Us | Khanqah Yaseen Zai - D.I. Khan, Pakistan"
- **Description**: Contact information and form
- **Structured Data**: BreadcrumbList

## Deployment Checklist

Before deploying to production:

1. **Update Domain URLs**:
   - Replace `https://khanqahyaseenzai.com` with your actual domain in:
     - `src/utils/seoData.js` (baseUrl)
     - `public/sitemap.xml`
     - `index.html` (canonical, og:url, twitter:url)

2. **Verify Sitemap**:
   - Submit `sitemap.xml` to Google Search Console
   - Submit to Bing Webmaster Tools

3. **Test Structured Data**:
   - Use [Google Rich Results Test](https://search.google.com/test/rich-results)
   - Use [Schema.org Validator](https://validator.schema.org/)

4. **Verify Meta Tags**:
   - Use [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
   - Use [Twitter Card Validator](https://cards-dev.twitter.com/validator)

5. **Submit to Search Engines**:
   - Google Search Console
   - Bing Webmaster Tools
   - Yandex Webmaster (if targeting Russian/CIS markets)

## Performance Considerations

- Meta tags are updated client-side (React)
- For better SEO, consider server-side rendering (SSR) with Next.js or similar
- Images are lazy-loaded to improve page speed
- Structured data is minimal and efficient

## Monitoring

After deployment, monitor:
- Search engine indexing status
- Page rankings for target keywords
- Click-through rates (CTR) from search results
- Social media sharing appearance

## Future Enhancements

Consider adding:
1. **Dynamic sitemap generation** from backend data (publications, gallery items)
2. **Article schema** for blog posts or detailed content pages
3. **Event schema** for upcoming events
4. **Video schema** for video content
5. **Review/Rating schema** if applicable
6. **FAQ schema** for frequently asked questions

## Support

For questions or issues with SEO implementation, refer to:
- [Google Search Central](https://developers.google.com/search)
- [Schema.org Documentation](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)

