import React, { useState, useEffect, useCallback } from "react";
import { useLanguage } from "../context/LanguageContext";
import { FiX, FiChevronLeft, FiChevronRight, FiCamera, FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { getPhotoCollections } from "../services/photos";
import SEO from "../components/SEO";
import GallerySkeleton from "../components/GallerySkeleton";
import ErrorMessage from "../components/ErrorMessage";
import { seoData, getBreadcrumbSchema } from "../utils/seoData";

const SacredMoments = () => {
  const { language } = useLanguage();
  const isUrdu = language === "urdu";
  const seo = seoData.gallery[isUrdu ? "ur" : "en"];
  
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: isUrdu ? "سرورق" : "Home", url: "/" },
    { name: isUrdu ? "تصاویر" : "Photos", url: "/gallery" },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // 🛡️ Data States
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // --- Fetch Logic ---
  useEffect(() => {
    let isMounted = true;
    
    const fetchCollections = async () => {
      try {
        setLoading(true);
        const data = await getPhotoCollections();

        // Only update state if component is still mounted
        if (isMounted) {
          if (Array.isArray(data)) {
            setCollections(data);
          } else {
            setCollections([]); 
          }
          setError(null);
        }
      } catch (err) {
        console.error("Error fetching collections:", err);
        if (isMounted) {
          // Handle rate limiting error message
          const errorMessage = err.message === 'Too many requests - please slow down'
            ? (isUrdu ? "بہت زیادہ درخواستیں، براہ کرم انتظار کریں۔" : "Too many requests. Please wait a moment.")
            : (err.message || "Failed to fetch data");
          setError(errorMessage);
          setCollections([]); 
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCollections();
    
    // Cleanup function to prevent state updates if component unmounts
    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array - fetch only once on mount

  // 🔹 Sort
  const sortedCollections = Array.isArray(collections) 
    ? [...collections].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    : [];

  const totalPages = Math.ceil(sortedCollections.length / itemsPerPage);
  const paginatedCollections = sortedCollections.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --- Modal Logic ---
  const openModal = useCallback((collection) => {
    setSelectedCollection(collection);
    setCurrentIndex(0);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setSelectedCollection(null);
    setCurrentIndex(0);
  }, []);

  const nextImage = useCallback((e) => {
    if(e) e.stopPropagation();
    setCurrentIndex((prev) =>
      selectedCollection && prev === selectedCollection.images.length - 1 ? 0 : prev + 1
    );
  }, [selectedCollection]);

  const prevImage = useCallback((e) => {
    if(e) e.stopPropagation();
    setCurrentIndex((prev) =>
      selectedCollection && prev === 0 ? selectedCollection.images.length - 1 : prev - 1
    );
  }, [selectedCollection]);

  // Keyboard navigation
  useEffect(() => {
    if (!modalOpen || !selectedCollection) return;
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") nextImage(e);
      if (e.key === "ArrowLeft") prevImage(e);
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalOpen, selectedCollection, nextImage, prevImage, closeModal]);

  // Lock Scroll
  useEffect(() => {
    const body = document.body;
    if (modalOpen) body.style.overflow = "hidden";
    else body.style.overflow = "";
    return () => { body.style.overflow = ""; };
  }, [modalOpen]);

  return (
    <div dir={language === "urdu" ? "rtl" : "ltr"}>
      <SEO 
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        structuredData={breadcrumbSchema}
      />

      <section
        id="sacred-moments"
        className={`relative py-24 px-6 md:px-12 lg:px-24 bg-[#faf9f6] text-[#0C0C0C] font-sans min-h-screen ${isUrdu ? "font-urdu" : ""}`}
      >
        {/* Watermark Background Logo */}
      <div className="fixed top-1/2 left-1/2 z-0 pointer-events-none transform -translate-x-1/2 -translate-y-1/2">
<img
  src="/images/khanqah logo.png"
  alt={isUrdu ? "خانقاہ یٰسین زئی کا لوگو" : "Khanqah Yaseen Zai Logo"}
  aria-hidden="true"
  className="w-full max-w-5xl opacity-10 grayscale filter transform-gpu will-change-transform translate-y-12"
/>
</div>
        {/* --- Header Section (Matches MediaGallery) --- */}
        <div className="relative z-10 max-w-7xl mx-auto mb-20 border-b border-gray-200 pb-8">
            <span className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-4">
                {isUrdu ? "تصاویر" : "Photography"}
            </span>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-[#0C0C0C] leading-none">
                {language === "urdu" ? "مقدس لمحات" : "Sacred Moments"}
            </h2>
            <p className="mt-6 text-gray-500 max-w-2xl text-lg font-light leading-relaxed">
              {language === "urdu"
                ? "بیانات، تقریبات اور محافل کی جھلکیاں۔"
                : "A visual journey through bayaans, gatherings, and spiritual moments."}
            </p>
        </div>

        {/* --- Content Grid --- */}
        <div className="relative z-10 max-w-7xl mx-auto min-h-[500px]">
          
          {/* 🛡️ Loading State */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <GallerySkeleton key={i} />
              ))}
            </div>
          )}

          {/* 🛡️ Error State */}
          {!loading && error && (
            <ErrorMessage 
              message={error} 
              onRetry={() => {
                setError(null);
                // Refetch logic would go here if using hooks
              }}
            />
          )}

          {/* 🛡️ Content State */}
          {!loading && !error && paginatedCollections.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {paginatedCollections.map((collection, index) => (
                <motion.div
                    key={collection.id}
                    onClick={() => openModal(collection)}
                    className="group cursor-pointer"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                    {/* Image Wrapper */}
                    <div className="relative aspect-[4/3] bg-gray-200 overflow-hidden mb-5 shadow-sm transition-shadow group-hover:shadow-md">
                        {collection.images[0]?.image ? (
                            <img
                                src={collection.images[0]?.image}
                                alt={collection.name_en}
                                loading="lazy"
                                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 grayscale group-hover:grayscale-0"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300">
                                <FiCamera className="w-8 h-8" />
                            </div>
                        )}
                        
                        {/* Count Badge */}
                        <div className={`absolute top-0 p-4 ${isUrdu ? "right-0" : "left-0"}`}>
                            <div className="bg-white/90 backdrop-blur-sm px-2 py-1 text-[10px] uppercase tracking-widest text-black flex items-center gap-2 font-medium">
                                <FiCamera className="w-3 h-3" />
                                <span>{collection.images.length}</span>
                            </div>
                        </div>
                    </div>

                    {/* Minimal Text Info */}
                    <div className="pr-2 border-l-2 border-transparent group-hover:border-black pl-4 transition-all duration-300">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 group-hover:text-black transition-colors">
                                {language === "urdu" ? "البم" : "Album"}
                            </span>
                            <span className="text-[10px] text-gray-300">•</span>
                            <span className="text-[10px] uppercase tracking-[0.1em] text-gray-400">
                                {new Date(collection.created_at).toLocaleDateString(
                                    language === "urdu" ? "ur-PK" : "en-US",
                                    { month: "short", year: "numeric" }
                                )}
                            </span>
                        </div>
                        <h3 className="text-xl font-medium text-[#0C0C0C] leading-tight group-hover:underline underline-offset-4 decoration-1 decoration-gray-300">
                            {language === "urdu" ? collection.name_ur : collection.name_en}
                        </h3>
                    </div>
                </motion.div>
                ))}
            </div>
          )}

          {/* 🔹 Minimal Pagination */}
          {!loading && !error && totalPages > 1 && (
            <div className="flex justify-between items-center mt-24 pt-8 border-t border-gray-200">
                <button
                    onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="group flex items-center gap-3 text-sm uppercase tracking-widest text-black disabled:opacity-20 disabled:cursor-not-allowed"
                >
                    {isUrdu ? <FiArrowRight /> : <FiArrowLeft />}
                    <span className="group-hover:underline underline-offset-4 decoration-1">{isUrdu ? "پچھلا" : "Previous"}</span>
                </button>
                
                <span className="text-xs font-mono text-gray-400">
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="group flex items-center gap-3 text-sm uppercase tracking-widest text-black disabled:opacity-20 disabled:cursor-not-allowed"
                >
                    <span className="group-hover:underline underline-offset-4 decoration-1">{isUrdu ? "اگلا" : "Next"}</span>
                    {isUrdu ? <FiArrowLeft /> : <FiArrowRight />}
                </button>
            </div>
          )}
        </div>

        {/* --- Immersive Modal (Matches MediaGallery Video Style) --- */}
        <AnimatePresence>
          {modalOpen && selectedCollection && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            >
              
              {/* Close Button - Floating */}
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 z-50 p-2 bg-white/10 hover:bg-white text-white hover:text-black rounded-full transition-all duration-300"
              >
                <FiX className="w-6 h-6" />
              </button>

              {/* Main Slider Content */}
              <motion.div
                className="w-full max-w-6xl h-full flex flex-col items-center justify-center relative"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
              >
                
                {/* Image Display */}
                <div className="relative w-full h-[80vh] flex items-center justify-center">
                    
                    {/* Navigation Arrows */}
                    <button
                        onClick={prevImage}
                        className="absolute left-0 z-20 p-4 text-white/50 hover:text-white hover:scale-110 transition-all focus:outline-none"
                    >
                        <FiChevronLeft className="w-10 h-10" />
                    </button>

                    <AnimatePresence mode="wait">
                        <motion.img
                            key={currentIndex}
                            src={selectedCollection.images[currentIndex]?.image}
                            alt={`${selectedCollection.name_en} ${currentIndex + 1}`}
                            className="max-h-full max-w-full object-contain shadow-2xl"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        />
                    </AnimatePresence>

                    <button
                        onClick={nextImage}
                        className="absolute right-0 z-20 p-4 text-white/50 hover:text-white hover:scale-110 transition-all focus:outline-none"
                    >
                        <FiChevronRight className="w-10 h-10" />
                    </button>
                </div>

                {/* Footer Caption */}
                <div className="w-full mt-6 flex flex-col md:flex-row items-center justify-between text-white/80 px-4">
                    <div className="text-center md:text-left mb-4 md:mb-0">
                        <h3 className="text-xl font-serif text-white">
                            {language === "urdu" ? selectedCollection.name_ur : selectedCollection.name_en}
                        </h3>
                        <p className="text-xs uppercase tracking-widest text-white/40 mt-1">
                            {currentIndex + 1} / {selectedCollection.images.length}
                        </p>
                    </div>

                    {/* Progress Dots */}
                    <div className="flex gap-1.5 overflow-x-auto max-w-[200px] pb-2 custom-scrollbar">
                        {selectedCollection.images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`h-1 rounded-full transition-all duration-300 ${
                                    currentIndex === index
                                    ? "w-6 bg-white" 
                                    : "w-1.5 bg-white/20 hover:bg-white/40"
                                }`}
                            />
                        ))}
                    </div>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
};

export default SacredMoments;