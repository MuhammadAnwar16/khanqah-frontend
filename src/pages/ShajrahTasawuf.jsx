"use client";
import React from "react";
import { FaArrowDown } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import SEO from "../components/SEO";
import { seoData, getBreadcrumbSchema } from "../utils/seoData";

const data = [
  {
    urdu: "حضرت مرزا مظہر جان جانانؒ",
    english: "Hazrat Mirza Mazhar Jan-e-Janan (RA)",
  },
  { urdu: "حضرت غلام علی صاحبؒ", english: "Hazrat Ghulam Ali (RA)" },
  { urdu: "حضرت ابو سعید صاحبؒ", english: "Hazrat Abu Saeed (RA)" },
  { urdu: "حضرت احمد سعید صاحبؒ", english: "Hazrat Ahmad Saeed (RA)" },
  {
    urdu: "حضرت دوست محمد قندھاری صاحبؒ",
    english: "Hazrat Dost Muhammad Qandhari (RA)",
  },
  { urdu: "حضرت محترم موسیٰ صاحبؒ", english: "Hazrat Muhtaram Musa (RA)" },
  { urdu: "حضرت احمد گل صاحبؒ", english: "Hazrat Ahmad Gul (RA)" },
  { urdu: "حضرت عبدالحلیم صاحبؒ", english: "Hazrat Abdul Haleem (RA)" },
  { urdu: "حضرت عبدالعزیز صاحبؒ", english: "Hazrat Abdul Aziz (RA)" },
  { urdu: "حضرت احمد صاحبؒ", english: "Hazrat Ahmad (RA)" },
  { urdu: "حضرت محمد صاحبؒ", english: "Hazrat Muhammad (RA)" },
  { urdu: "حضرت حمید صاحبؒ", english: "Hazrat Hameed (RA)" },
  { urdu: "حضرت محمود صاحبؒ", english: "Hazrat Mahmood (RA)" },
  { urdu: "حضرت رشید احمد صاحبؒ", english: "Hazrat Rasheed Ahmad (RA)" },
];

const ShajrahRoadmap = () => {
  const { language } = useLanguage();
  const isUrdu = language === "urdu";
  const seo = seoData.shajrahTasawuf[isUrdu ? "ur" : "en"];
  
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: isUrdu ? "سرورق" : "Home", url: "/" },
    { name: isUrdu ? "شجرہ" : "Lineage", url: "/shajrahTasawuf" },
    { name: isUrdu ? "شجرہ تصوف" : "Shajrah-e-Tasawuf", url: "/shajrahTasawuf" },
  ]);

  return (
    <>
      <SEO 
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        structuredData={breadcrumbSchema}
      />
      <section className={`relative py-24 px-6 md:px-12 lg:px-24 bg-[#faf9f6] text-[#0C0C0C] font-sans min-h-screen ${isUrdu ? "font-urdu" : ""}`}>
        
        {/* Watermark Background Logo */}
      <div className="fixed top-1/2 left-1/2 z-0 pointer-events-none transform -translate-x-1/2 -translate-y-1/2">
<img
  src="/images/khanqah logo.png"
  alt={isUrdu ? "خانقاہ یٰسین زئی کا لوگو" : "Khanqah Yaseen Zai Logo"}
  aria-hidden="true"
  className="w-full max-w-5xl opacity-10 grayscale filter transform-gpu will-change-transform translate-y-12"
/>
</div>

        {/* --- Header Section (Editorial Style) --- */}
        <div className="relative z-10 max-w-7xl mx-auto mb-20 border-b border-gray-200 pb-8">
            <span className={`block text-xs uppercase tracking-[0.2em] text-gray-400 mb-4 ${isUrdu ? 'text-right' : 'text-left'}`}>
                {isUrdu ? "شجرہ" : "Lineage"}
            </span>
            <h2 className={`text-5xl md:text-7xl font-bold tracking-tighter text-[#0C0C0C] leading-none 
                ${isUrdu ? 'font- py-2 text-right' : 'text-left'}
            `}>
                {language === "urdu" ? "شجرہ تصوف" : "Shajrah-e-Tasawuf"}
            </h2>
            <p className={`mt-3 text-gray-500 max-w-2xl text-lg font-light 
                ${isUrdu ? 'leading-[3.7] text-right font-urdu ml-auto' : 'leading-relaxed text-left mr-auto'}
            `}>
                {language === "urdu" 
                    ? "یہ مقدس سلسلہ تصوف کے روحانی سلسلہ تربیت کو ظاہر کرتا ہے۔"
                    : "This sacred lineage reflects the golden chain of spiritual mentorship in the path of Tasawuf."}
            </p>
        </div>

      {/* Roadmap Flow */}
      <div
        dir={isUrdu ? "rtl" : "ltr"}
        className="relative z-10 flex flex-col items-center gap-6"
      >
        {data.map((entry, index) => (
          <React.Fragment key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-[#F5F5F5] border border-border shadow-md px-6 py-4 rounded-lg w-full max-w-xs text-center hover:scale-105 transition duration-300"
            >
              <p
                className={`text-base md:text-lg text-black ${
                  isUrdu ? "font-urdu" : "font-medium"
                }`}
              >
                {isUrdu ? entry.urdu : entry.english}
              </p>
            </motion.div>

            {/* Arrow */}
            {index < data.length - 1 && (
              <FaArrowDown className="text-black text-lg mt-2 animate-bounce-pulse" />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
    </>
  );
};

export default ShajrahRoadmap;
