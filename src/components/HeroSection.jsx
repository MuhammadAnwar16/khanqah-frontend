import React, { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { ChevronDownIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { FaFacebookF, FaWhatsapp, FaYoutube } from "react-icons/fa";

const HeroSection = () => {
  const { language } = useLanguage();
  const [scrollY, setScrollY] = useState(0);

  // 1. Defined Links
  const links = {
    facebook: "https://www.facebook.com/people/Khanqah-Yasin-Zai-Panyala-DIKhan-Offical/61579090561505/",
    whatsapp: "https://whatsapp.com/channel/0029VbBTJSUE50UaJtR4Y300",
    youtube: "https://www.youtube.com", 
  };

  // 2. Parallax Effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 3. Robust Scroll Handler
  const handleScrollClick = () => {
    const nextSection = document.getElementById("about");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      dir={language === "urdu" ? "rtl" : "ltr"}
      className="relative h-screen w-full overflow-hidden flex flex-col justify-end pb-24 sm:pb-32 px-6 md:px-12 lg:px-20 font-sans"
      aria-label="Khanqah Yaseen Zai Hero"
    >
      {/* --- Background Layer --- */}
      <div className="absolute inset-0 z-0 bg-black pointer-events-none">
        <div
          className="absolute inset-0 opacity-80"
          style={{
            backgroundImage: "url('/images/masjid.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: `scale(${1 + scrollY * 0.0005}) translateY(${scrollY * 0.5}px)`,
            transition: "transform 0.1s ease-out",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
      </div>

      {/* --- Top Bar --- */}
      <div className="absolute top-24 left-0 right-0 px-8 flex justify-between items-start z-30 pointer-events-none">
        
        {/* REPLACED 'Live' with 'Location Badge' */}
        <div className="hidden md:flex items-center gap-2 pointer-events-auto border border-white/20 bg-black/20 backdrop-blur-md rounded-full px-4 py-1.5 transition-colors hover:bg-black/40">
            <MapPinIcon className="w-4 h-4 text-white/90" />
            <span className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-white/90 font-medium pt-0.5">
                {language === "urdu" ? "پنیالہ، ڈی آئی خان" : "Panyala, D.I. Khan"}
            </span>
        </div>
        
        {/* Verse */}
        <div className={`max-w-xs text-white/90 leading-relaxed border-white/40 pointer-events-auto
            ${language === 'urdu' ? 'font-nastaliq text-lg border-r-2 pr-4 text-right' : 'font-light text-sm tracking-wide border-l-2 pl-4 text-left'}`}>
             {language === "urdu"
                ? "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ"
                : "Verily, in the remembrance of Allah do hearts find rest."}
        </div>
      </div>

      {/* --- Main Content --- */}
      <div className={`relative z-20 w-full max-w-7xl mx-auto border-white/20 pointer-events-auto
        ${language === 'urdu' ? 'border-r pr-6 md:pr-10' : 'border-l pl-6 md:pl-10'}`}>
        
        <div className="mb-2">
          <h1 className={`text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-bold text-white tracking-tighter leading-[0.9] animate-fade-in-up 
            ${language === 'urdu' ? 'font-heading py-2' : ''}`}>
            {language === "urdu" ? "خانقاہ" : "KHANQAH"}
          </h1>
        </div>
        
        <div className="mb-6">
           <h1 className={`text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-bold text-white/80 tracking-tighter leading-[0.9] animate-fade-in-up delay-100
             ${language === 'urdu' ? 'font-heading py-2' : ''}`}>
             {language === "urdu" ? "یٰسین زئی" : "YASEEN ZAI"}
             <span className="text-white text-4xl align-top">.</span>
           </h1>
        </div>

        <div className="mt-8">
            <p className={`text-lg md:text-xl text-gray-300 max-w-lg leading-relaxed 
                ${language === 'urdu' ? 'font-nastaliq text-right w-full md:w-auto' : 'font-light'}`}>
                {language === "urdu"
                ? "ایک روحانی تربیتی مرکز جہاں ذکرِ الٰہی کے ذریعے دلوں کو تزکیہ، اور روحانی تربیت میسر آتی ہے۔"
                : "A spiritual training center where hearts are purified and spiritual training is provided through the remembrance of Allah."}
            </p>
        </div>
      </div>

      {/* --- Glass Footer Bar --- */}
      <div className={`absolute bottom-0 z-30 w-full md:w-auto bg-white/5 backdrop-blur-md border-t border-white/10 p-6 md:p-8 flex items-center justify-between gap-12
        ${language === 'urdu' 
            ? 'left-0 rounded-tr-3xl border-r' 
            : 'right-0 rounded-tl-3xl border-l'}`}>
        
        {/* Social Icons */}
        <div className="flex gap-6 text-white/60">
            <a 
              href={links.facebook} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors cursor-pointer"
              aria-label="Facebook"
            >
              <FaFacebookF size={20} />
            </a>
            <a 
              href={links.whatsapp} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors cursor-pointer"
              aria-label="WhatsApp"
            >
              <FaWhatsapp size={20} />
            </a>
            <a 
              href={links.youtube} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors cursor-pointer"
              aria-label="YouTube"
            >
              <FaYoutube size={20} />
            </a>
        </div>

        {/* Scroll Button */}
        <button 
            type="button"
            onClick={handleScrollClick}
            className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group cursor-pointer"
            aria-label="Scroll Down"
        >
            <span className="hidden md:block text-[10px] uppercase tracking-[0.2em]">
                {language === "urdu" ? "نیچے" : "Scroll"}
            </span>
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white transition-colors">
                <ChevronDownIcon className="w-4 h-4 animate-bounce" />
            </div>
        </button>

      </div>

    </section>
  );
};

export default HeroSection;