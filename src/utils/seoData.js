/**
 * SEO data configuration for all pages
 * Centralized SEO metadata for easy management
 */

const baseUrl = typeof window !== 'undefined' 
  ? window.location.origin 
  : 'https://khanqahyaseenzai.com';

export const seoData = {
  home: {
    en: {
      title: 'Khanqah Yaseen Zai | خانقاہ یٰسین زئی - Spiritual Training Center',
      description: 'A spiritual training center in D.I. Khan, Pakistan, where hearts are purified through the remembrance of Allah. Explore our lineage, publications, media, and spiritual teachings.',
      keywords: 'Khanqah Yaseen Zai, Spiritual Center, Sufism, Tasawwuf, D.I. Khan, Pakistan, Islamic Education, Dhikr, Zikr, Spiritual Training, Sufi Khanqah',
    },
    ur: {
      title: 'خانقاہ یٰسین زئی | Khanqah Yaseen Zai - روحانی تربیتی مرکز',
      description: 'ڈیرہ اسماعیل خان، پاکستان میں ایک روحانی تربیتی مرکز جہاں ذکرِ الٰہی کے ذریعے دلوں کو تزکیہ میسر آتا ہے۔ ہمارا شجرہ، مطبوعات، میڈیا اور روحانی تعلیمات دریافت کریں۔',
      keywords: 'خانقاہ یٰسین زئی, روحانی مرکز, تصوف, ڈیرہ اسماعیل خان, پاکستان, اسلامی تعلیم, ذکر, روحانی تربیت',
    },
  },
  about: {
    en: {
      title: 'About Khanqah Yaseen Zai | History & Spiritual Heritage',
      description: 'Learn about the rich history and spiritual heritage of Khanqah Yaseen Zai, its establishment, objectives, training programs, and the lineage of Yaseen Zai Sadaat.',
      keywords: 'Khanqah Yaseen Zai history, Yaseen Zai Sadaat, spiritual heritage, Sufi lineage, D.I. Khan, Panyala',
    },
    ur: {
      title: 'خانقاہ یٰسین زئی کا تعارف | تاریخ اور روحانی وراثت',
      description: 'خانقاہ یٰسین زئی کی بھرپور تاریخ اور روحانی وراثت، اس کے قیام، مقاصد، تربیتی پروگرام، اور یٰسین زئی سادات کے شجرہ کے بارے میں جانیں۔',
      keywords: 'خانقاہ یٰسین زئی کی تاریخ, یٰسین زئی سادات, روحانی وراثت, صوفی شجرہ, ڈیرہ اسماعیل خان, پنیالہ',
    },
  },
  shajra: {
    en: {
      title: 'Shajrah-e-Nasab | Lineage of Nasab - Khanqah Yaseen Zai',
      description: 'Explore the sacred lineage (Shajrah-e-Nasab) of Khanqah Yaseen Zai, tracing back through generations of spiritual leaders and scholars.',
      keywords: 'Shajrah-e-Nasab, Lineage, Genealogy, Yaseen Zai Sadaat, Family Tree, Spiritual Lineage',
    },
    ur: {
      title: 'شجرہ نسب | خانقاہ یٰسین زئی',
      description: 'خانقاہ یٰسین زئی کا مقدس شجرہ نسب دریافت کریں، جو روحانی رہنماؤں اور علماء کی نسلوں سے واپس جاتا ہے۔',
      keywords: 'شجرہ نسب, نسب نامہ, یٰسین زئی سادات, خاندانی شجرہ, روحانی شجرہ',
    },
  },
  shajrahTasawuf: {
    en: {
      title: 'Shajrah-e-Tasawuf | Spiritual Lineage - Khanqah Yaseen Zai',
      description: 'Discover the spiritual lineage (Shajrah-e-Tasawuf) of Khanqah Yaseen Zai, connecting to the great Sufi masters and spiritual chains.',
      keywords: 'Shajrah-e-Tasawuf, Spiritual Lineage, Sufi Chain, Silsila, Tasawwuf, Sufi Masters',
    },
    ur: {
      title: 'شجرہ تصوف | روحانی سلسلہ - خانقاہ یٰسین زئی',
      description: 'خانقاہ یٰسین زئی کا روحانی شجرہ تصوف دریافت کریں، جو عظیم صوفیاء اور روحانی سلسلوں سے جڑتا ہے۔',
      keywords: 'شجرہ تصوف, روحانی سلسلہ, صوفی سلسلہ, سلسلہ, تصوف, صوفیاء',
    },
  },
  publications: {
    en: {
      title: 'Publications | Books & Risalay - Khanqah Yaseen Zai',
      description: 'Browse our collection of spiritual publications including books, risalay, and other works reflecting the teachings of Khanqah Yaseen Zai. Download PDFs and read online.',
      keywords: 'Islamic Books, Risalay, Publications, PDF Downloads, Spiritual Literature, Khanqah Publications',
    },
    ur: {
      title: 'مطبوعات | کتب و رسائل - خانقاہ یٰسین زئی',
      description: 'خانقاہ یٰسین زئی کی تعلیمات کی عکاسی کرنے والی کتب، رسائل اور دیگر کاموں کے مجموعہ کو براؤز کریں۔ PDFs ڈاؤن لوڈ کریں اور آن لائن پڑھیں۔',
      keywords: 'اسلامی کتب, رسائل, مطبوعات, PDF ڈاؤن لوڈ, روحانی ادب, خانقاہ مطبوعات',
    },
  },
  gallery: {
    en: {
      title: 'Photo Gallery | Sacred Moments - Khanqah Yaseen Zai',
      description: 'View our photo gallery showcasing sacred moments from bayaans, takreeb, and spiritual gatherings at Khanqah Yaseen Zai.',
      keywords: 'Photo Gallery, Spiritual Gatherings, Bayaans, Takreeb, Khanqah Events, Sacred Moments',
    },
    ur: {
      title: 'تصویری گیلری | مقدس لمحات - خانقاہ یٰسین زئی',
      description: 'ہماری تصویری گیلری دیکھیں جو خانقاہ یٰسین زئی میں بیانات، تقریبات اور روحانی محافل کے مقدس لمحات پیش کرتی ہے۔',
      keywords: 'تصویری گیلری, روحانی محافل, بیانات, تقریبات, خانقاہ تقریبات, مقدس لمحات',
    },
  },
  videoGallery: {
    en: {
      title: 'Media Gallery | Videos & Audios - Khanqah Yaseen Zai',
      description: 'Watch videos and listen to audio recordings of bayaans, dhikr sessions, and spiritual events from Khanqah Yaseen Zai.',
      keywords: 'Videos, Audios, Bayaans, Dhikr, Spiritual Events, Islamic Lectures, Sufi Discourses',
    },
    ur: {
      title: 'میڈیا گیلری | ویڈیوز و آڈیوز - خانقاہ یٰسین زئی',
      description: 'خانقاہ یٰسین زئی کے بیانات، ذکر کی محافل اور روحانی تقریبات کی ویڈیوز دیکھیں اور آڈیوز سنیں۔',
      keywords: 'ویڈیوز, آڈیوز, بیانات, ذکر, روحانی تقریبات, اسلامی خطابات, صوفی بیانات',
    },
  },
  contact: {
    en: {
      title: 'Contact Us | Khanqah Yaseen Zai - D.I. Khan, Pakistan',
      description: 'Get in touch with Khanqah Yaseen Zai for ziyarat, spiritual guidance, or inquiries. Find our address, phone, WhatsApp, and contact form.',
      keywords: 'Contact Khanqah Yaseen Zai, D.I. Khan, Panyala, Ziyarat, Spiritual Guidance, Contact Information',
    },
    ur: {
      title: 'رابطہ کریں | خانقاہ یٰسین زئی - ڈیرہ اسماعیل خان، پاکستان',
      description: 'زیارت، روحانی رہنمائی یا استفسارات کے لیے خانقاہ یٰسین زئی سے رابطہ کریں۔ ہمارا پتہ، فون، واٹس ایپ اور رابطہ فارم تلاش کریں۔',
      keywords: 'خانقاہ یٰسین زئی سے رابطہ, ڈیرہ اسماعیل خان, پنیالہ, زیارت, روحانی رہنمائی, رابطہ کی معلومات',
    },
  },
};

/**
 * Generate structured data (JSON-LD) for Organization
 */
export const getOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Khanqah Yaseen Zai',
  alternateName: 'خانقاہ یٰسین زئی',
  url: baseUrl,
  logo: `${baseUrl}/images/khanqahlogo.png`,
  description: 'A spiritual training center where hearts are purified and spiritual training is provided through the remembrance of Allah.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Panyala',
    addressLocality: 'Dera Ismail Khan',
    addressRegion: 'Khyber Pakhtunkhwa',
    postalCode: '29110',
    addressCountry: 'PK',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+92-300-1234567',
    contactType: 'Spiritual Guidance',
    areaServed: 'PK',
    availableLanguage: ['en', 'ur'],
  },
  sameAs: [
    // Add social media links if available
  ],
});

/**
 * Generate structured data for WebSite
 */
export const getWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Khanqah Yaseen Zai',
  url: baseUrl,
  description: 'Official website of Khanqah Yaseen Zai - A spiritual training center',
  inLanguage: ['en-US', 'ur-PK'],
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${baseUrl}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
});

/**
 * Generate BreadcrumbList schema
 */
export const getBreadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${baseUrl}${item.url}`,
  })),
});

