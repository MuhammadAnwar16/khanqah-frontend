import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { FiMenu, FiX, FiChevronDown, FiGlobe } from "react-icons/fi";

// --- Framer Motion Variants (Unchanged) ---
const navVariants = {
  hidden: { y: -80, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 260, damping: 20 } },
};

const logoTextVariants = {
  hidden: { width: 0, opacity: 0, x: -20 },
  visible: { width: "auto", opacity: 1, x: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
};

const dropdownVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.95, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { type: "spring", stiffness: 200, damping: 15 } },
  exit: { opacity: 0, y: 10, scale: 0.95, filter: "blur(10px)", transition: { duration: 0.2 } },
};

const mobileMenuVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3, delay: 0.2 } },
};

const linkStaggerVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 12 } },
};

// --- Desktop Dropdown Component ---
const DesktopNavDropdown = ({ link, language, isWhiteText }) => {
  const [hovered, setHovered] = useState(false);
  const timeoutRef = useRef(null);
  const isUrdu = language === "urdu";

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHovered(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setHovered(false), 200);
  };

  return (
    <div className="relative h-full flex items-center" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button 
        className={`flex items-center gap-1.5 text-[11px] uppercase tracking-[0.15em] font-medium transition-all duration-300 
          ${isWhiteText 
            ? "text-white hover:text-white/80" 
            : "text-gray-800 hover:text-black"
          }
        `}
      >
        {isUrdu ? link.label.ur : link.label.en}
        <motion.span animate={{ rotate: hovered ? 180 : 0 }}>
            <FiChevronDown className="w-3 h-3" />
        </motion.span>
      </button>

      <AnimatePresence>
        {hovered && (
          <motion.div variants={dropdownVariants} initial="hidden" animate="visible" exit="exit" className={`absolute top-full pt-8 w-60 z-50 ${isUrdu ? "right-0" : "left-1/2 -translate-x-1/2"}`}>
            <div className="bg-white/95 backdrop-blur-xl border border-white/20 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] p-2 rounded-sm overflow-hidden">
              {link.submenu.map((sublink, index) => (
                <motion.a key={index} href={sublink.path} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0, transition: { delay: index * 0.05 } }} className={`block px-5 py-3 text-[11px] uppercase tracking-widest text-gray-500 hover:text-white hover:bg-black transition-all duration-200 rounded-sm ${isUrdu ? "text-right font-urdu leading-loose" : "text-center font-sans"}`}>
                  {isUrdu ? sublink.label.ur : sublink.label.en}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Navbar = () => {
  const { language, toggleLanguage } = useLanguage();
  const location = useLocation();
  const isUrdu = language === "urdu";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(null);
  const { scrollY } = useScroll();

  // --- Logic Checks ---
  const isHome = location.pathname === "/";
  
  // 1. Text is White ONLY if: It's the Home Page AND We haven't scrolled AND Menu is closed.
  const isWhiteText = isHome && !scrolled && !menuOpen;

  // 2. Logo Filter: Invert colors to white only when text is white.
  const logoFilterClass = isWhiteText ? "brightness-0 invert" : "grayscale group-hover:grayscale-0";

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const links = [
    { path: "/", label: { en: "Home", ur: "سرورق" } },
    { path: "/about", label: { en: "About", ur: "تعارف" } },
    { label: { en: "Lineage", ur: "شجرہ" }, submenu: [{ path: "/shajra", label: { en: "Shajra-e-Nasab", ur: "شجرہ نسب" } }, { path: "/ShajrahTasawuf", label: { en: "Shajra-e-Tasawuf", ur: "شجرہ تصوف" } }] },
    { path: "/publications", label: { en: "Publications", ur: "مطبوعات" } },
    { path: "/Gallery", label: { en: "Gallery", ur: "گیلری" } },
    { path: "/VideoGallery", label: { en: "Media", ur: "میڈیا" } },
    { path: "/contact", label: { en: "Contact", ur: "رابطہ" } },
  ];

  return (
    <header dir={isUrdu ? "rtl" : "ltr"}>
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out border-b
          ${scrolled && !menuOpen 
            ? "bg-[#faf9f6]/85 backdrop-blur-md border-black/5 py-3" // Blurred only when menu CLOSED
            : "bg-transparent border-transparent py-6" // Transparent when open OR top
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* --- Logo Area --- */}
          <a href="/" className="z-50 group relative flex items-center gap-3 overflow-hidden">
            
            {/* Logo Image */}
            <motion.img 
                src="/images/khanqah logo.png" 
                alt="Khanqah Logo" 
                className={`w-10 h-10 md:w-12 md:h-12 object-contain transition-all duration-300 
                    ${logoFilterClass} 
                    ${menuOpen ? "opacity-0" : "opacity-100"}
                `}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
            />

            {/* Logo Text (Force HIDDEN when menuOpen is true) */}
            <AnimatePresence>
                {(scrolled && !menuOpen) && (
                    <motion.span
                        variants={logoTextVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="font-serif font-bold text-[#0C0C0C] tracking-tighter whitespace-nowrap text-xl md:text-2xl"
                    >
                        {isUrdu ? "خانقاہ یٰسین زئی" : "Khanqah Yaseen Zai"}
                    </motion.span>
                )}
            </AnimatePresence>
          </a>

          {/* --- Desktop Links --- */}
          <div className="hidden lg:flex items-center gap-10">
            {links.map((link, idx) => (
              <React.Fragment key={idx}>
                {link.submenu ? (
                  <DesktopNavDropdown link={link} language={language} isWhiteText={isWhiteText} />
                ) : (
                  <a 
                    href={link.path} 
                    className={`relative text-[11px] uppercase tracking-[0.15em] font-medium transition-colors duration-300 
                        ${location.pathname === link.path 
                            ? (isWhiteText ? "text-white font-bold" : "text-black font-bold") 
                            : (isWhiteText ? "text-white/80 hover:text-white" : "text-gray-500 hover:text-black")
                        }
                    `}
                  >
                    {isUrdu ? link.label.ur : link.label.en}
                    {location.pathname === link.path && (
                        <motion.span 
                            layoutId="navLine" 
                            className={`absolute -bottom-2 left-0 right-0 h-[1px] ${isWhiteText ? "bg-white" : "bg-black"}`} 
                        />
                    )}
                  </a>
                )}
              </React.Fragment>
            ))}
            
            <div className={`h-4 w-px mx-2 ${isWhiteText ? "bg-white/30" : "bg-gray-300"}`} />
            
            <button 
                onClick={toggleLanguage} 
                aria-label={isUrdu ? "Switch to English" : "انگریزی میں تبدیل کریں"}
                className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:opacity-60 transition-all
                    ${isWhiteText ? "text-white" : "text-black"}
                `}
            >
              <FiGlobe className="w-3 h-3" /> <span>{isUrdu ? "ENG" : "اردو"}</span>
            </button>
          </div>

          {/* --- Mobile Hamburger --- */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? (isUrdu ? "مینو بند کریں" : "Close menu") : (isUrdu ? "مینو کھولیں" : "Open menu")}
            aria-expanded={menuOpen}
            className={`lg:hidden z-50 p-2 -mr-2 transition-colors duration-300 relative
              ${menuOpen ? "text-white" : (isWhiteText ? "text-white" : "text-black")}
            `}
          >
            {menuOpen ? <FiX className="w-8 h-8" /> : <FiMenu className="w-8 h-8" />}
          </button>
        </div>
      </motion.nav>

      {/* --- Mobile Menu Overlay --- */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center overflow-hidden"
          >
            <motion.div 
                className="flex flex-col gap-6 text-center w-full max-w-sm px-6"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                    visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
                    exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } }
                }}
            >
              {links.map((link, idx) => (
                <motion.div key={idx} variants={linkStaggerVariants} className="relative w-full">
                  {link.submenu ? (
                    <div className="border-b border-white/10 pb-4 mb-2">
                      <button onClick={() => setMobileDropdownOpen(mobileDropdownOpen === idx ? null : idx)} className="w-full flex items-center justify-center gap-3 text-3xl font-serif text-white hover:text-gray-300 transition-colors">
                        <span className={isUrdu ? "font-" : ""}>{isUrdu ? link.label.ur : link.label.en}</span>
                        <FiChevronDown className={`w-5 h-5 transition-transform duration-300 ${mobileDropdownOpen === idx ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {mobileDropdownOpen === idx && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden flex flex-col gap-4 mt-6">
                            {link.submenu.map((sub, sIdx) => (
                              <a key={sIdx} href={sub.path} onClick={() => setMenuOpen(false)} className={`text-sm uppercase tracking-widest text-gray-400 hover:text-white transition-colors ${isUrdu ? 'font-urdu' : ''}`}>
                                {isUrdu ? sub.label.ur : sub.label.en}
                              </a>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <div className="border-b border-white/10 pb-4">
                      <a href={link.path} onClick={() => setMenuOpen(false)} className={`block text-3xl font-serif transition-colors w-full ${location.pathname === link.path ? "text-white italic" : "text-white/60 hover:text-white"} ${isUrdu ? 'font-heading' : ''}`}>
                        {isUrdu ? link.label.ur : link.label.en}
                      </a>
                    </div>
                  )}
                </motion.div>
              ))}
              <motion.button variants={linkStaggerVariants} onClick={() => { toggleLanguage(); setMenuOpen(false); }} className="mt-8 px-8 py-3 border border-white/20 rounded-full text-xs uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all mx-auto">
                {isUrdu ? "English" : "اردو"}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;