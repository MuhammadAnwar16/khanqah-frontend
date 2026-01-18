import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { FiX, FiChevronLeft, FiChevronRight, FiCamera } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { getGalleryCollections } from "../services/gallery";
import GallerySectionSkeleton from "./GallerySectionSkeleton";

const GallerySection = () => {
  const { language } = useLanguage();
  const isUrdu = language === "urdu";

  const [collections, setCollections] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Touch Swipe Logic
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  useEffect(() => {
    const fetchCollections = async () => {
      setLoading(true);
      try {
        const data = await getGalleryCollections(language);
        setCollections(data);
      } catch (err) {
        console.error('Error fetching gallery collections:', err);
        setCollections([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };
    
    fetchCollections();
  }, [language]);

  // Modal handlers
  const openModal = (collection) => {
    setSelectedCollection(collection);
    setCurrentIndex(0);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCollection(null);
    setCurrentIndex(0);
  };

  const nextImage = (e) => {
    if(e) e.stopPropagation();
    if (!selectedCollection) return;
    setCurrentIndex((prev) =>
      prev === selectedCollection.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e) => {
    if(e) e.stopPropagation();
    if (!selectedCollection) return;
    setCurrentIndex((prev) =>
      prev === 0 ? selectedCollection.images.length - 1 : prev - 1
    );
  };

  // Swipe Handlers
  const handleTouchStart = (e) => setTouchStartX(e.targetTouches[0].clientX);
  const handleTouchMove = (e) => setTouchEndX(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const swipeDistance = touchStartX - touchEndX;
    if (swipeDistance > 50) nextImage();
    else if (swipeDistance < -50) prevImage();
    setTouchStartX(null);
    setTouchEndX(null);
  };

  // Keyboard Nav
  useEffect(() => {
    if (!modalOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalOpen]);

  // Lock Scroll
  useEffect(() => {
    if (modalOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [modalOpen]);

  return (
    <div dir={language === "urdu" ? "rtl" : "ltr"}>
      
      <section
        id="gallery"
        className={`relative py-24 px-6 md:px-12 lg:px-24 bg-[#faf9f6] text-[#0C0C0C] font-sans ${isUrdu ? "font-urdu" : ""}`}
      >

        {/* --- Header Section (Editorial Style - Left Aligned) --- */}
        <div className="relative z-10 max-w-7xl mx-auto mb-20 border-b border-gray-200 pb-8">
            <h2 className={`text-5xl md:text-5xl font-bold tracking-tighter text-[#0C0C0C] leading-none 
                ${isUrdu ? 'font- py-2 text-right' : 'text-left'}
            `}>
                {language === "urdu" ? "تصویری جھلکیاں" : "Photo Gallery"}
            </h2>
            <p className={`mt-3 text-gray-500 max-w-2xl text-lg font-light 
                ${isUrdu ? 'leading-[2.2] text-right font-urdu ml-auto' : 'leading-relaxed text-left mr-auto'}
            `}>
              {language === "urdu"
                ? "مقدس لمحات کی بصری جھلکیاں۔"
                : "Visual Reflections of Sacred Moments."}
            </p>
        </div>

        {/* --- Grid Content --- */}
        <div className="relative z-10 max-w-7xl mx-auto">
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <GallerySectionSkeleton key={i} />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {collections.map((collection, index) => (
                        <motion.div
                            key={collection.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            onClick={() => openModal(collection)}
                            className="group cursor-pointer relative aspect-[4/3] bg-gray-900 overflow-hidden rounded-sm"
                        >
                            <img
                                src={collection.images[0]}
                                alt={collection.name}
                                loading="lazy"
                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-90 group-hover:opacity-100"
                            />
                            
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 transition-opacity duration-300" />

                            {/* Content Overlay */}
                            <div className={`absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between transition-transform duration-300 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                                <div>
                                    <span className="text-[10px] uppercase tracking-widest text-white/60 mb-1 block">
                                        {isUrdu ? "البم" : "Collection"}
                                    </span>
                                    <h3 className="text-xl font-medium text-white leading-tight">
                                        {collection.name}
                                    </h3>
                                </div>
                                <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white flex items-center gap-2">
                                    <FiCamera /> <span>{collection.images.length}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>

        {/* --- Immersive Modal --- */}
        <AnimatePresence>
            {modalOpen && selectedCollection && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-8"
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

                    {/* Main Content */}
                    <motion.div
                        className="relative w-full max-w-7xl h-full flex flex-col items-center justify-center"
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.95 }}
                        onClick={(e) => e.stopPropagation()}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        {/* Image Display */}
                        <div className="relative w-full h-[80vh] flex items-center justify-center">
                            
                            {/* Navigation Arrows */}
                            {selectedCollection.images.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-0 z-20 p-4 text-white/50 hover:text-white hover:scale-110 transition-all focus:outline-none hidden md:block"
                                    >
                                        <FiChevronLeft className="w-10 h-10" />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-0 z-20 p-4 text-white/50 hover:text-white hover:scale-110 transition-all focus:outline-none hidden md:block"
                                    >
                                        <FiChevronRight className="w-10 h-10" />
                                    </button>
                                </>
                            )}

                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={currentIndex}
                                    src={selectedCollection.images[currentIndex]}
                                    alt={`${selectedCollection.name} ${currentIndex + 1}`}
                                    className="max-h-full max-w-full object-contain shadow-2xl rounded-sm"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </AnimatePresence>
                        </div>

                        {/* Footer Caption & Dots */}
                        <div className="w-full mt-6 flex flex-col md:flex-row items-center justify-between text-white/80 px-4">
                            <div className="text-center md:text-left mb-4 md:mb-0">
                                <h3 className="text-xl font-serif text-white">
                                    {selectedCollection.name}
                                </h3>
                                <p className="text-xs uppercase tracking-widest text-white/40 mt-1">
                                    {currentIndex + 1} / {selectedCollection.images.length}
                                </p>
                            </div>

                            {/* Progress Dots */}
                            <div className="flex gap-1.5 overflow-x-auto max-w-[200px] md:max-w-md pb-2 custom-scrollbar">
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

export default GallerySection;