import React, { useState, useEffect } from "react";
import { FiX, FiBookOpen, FiSearch, FiEye, FiDownload, FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";
import { getPublications } from "../services/publications";
import SEO from "../components/SEO";
import PublicationSkeleton from "../components/PublicationSkeleton";
import EmptyState from "../components/EmptyState";
import SocialShare from "../components/SocialShare";
import { motion, AnimatePresence } from "framer-motion";
import { seoData, getBreadcrumbSchema } from "../utils/seoData";

const Publications = () => {
  const { language } = useLanguage();
  const isUrdu = language === "urdu";
  const seo = seoData.publications[isUrdu ? "ur" : "en"];
  
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: isUrdu ? "سرورق" : "Home", url: "/" },
    { name: isUrdu ? "مطبوعات" : "Publications", url: "/publications" },
  ]);

  const [previewFile, setPreviewFile] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 6;

  // Fetch Logic
  useEffect(() => {
    const fetchPublications = async () => {
      setLoading(true);
      try {
        const data = await getPublications();
        setPublications(data);
      } catch (err) {
        console.error("Error fetching publications:", err);
        setPublications([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };
    
    fetchPublications();
  }, []);

  // Disable scroll on modal
  useEffect(() => {
    if (previewFile) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [previewFile]);

  const categories = [
    { key: "all", ur: "تمام", en: "All" },
    { key: "book", ur: "کتب", en: "Books" },
    { key: "risala", ur: "رسالے", en: "Risalay" },
    { key: "other", ur: "دیگر", en: "Others" },
  ];

  const filteredPublications = publications.filter((pub) => {
    const matchesCategory = selectedCategory === "all" || pub.category === selectedCategory;
    const matchesSearch =
      (language === "urdu" ? pub.title_ur.toLowerCase() : pub.title_en.toLowerCase()).includes(searchTerm.toLowerCase()) ||
      (language === "urdu" ? pub.description_ur.toLowerCase() : pub.description_en.toLowerCase()).includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedPublications = [...filteredPublications].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const totalPages = Math.ceil(sortedPublications.length / itemsPerPage);
  const paginatedPublications = sortedPublications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div dir={language === "urdu" ? "rtl" : "ltr"}>
      <SEO 
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        structuredData={breadcrumbSchema}
      />

      <section
        id="publications"
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

        {/* --- Header Section --- */}
        <div className="relative z-10 max-w-7xl mx-auto mb-16">
            <span className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-4">
                {isUrdu ? "لائبریری" : "Library"}
            </span>
            
            {/* Main Heading - Matched Font Style */}
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-[#0C0C0C]">
                {language === "urdu" ? "مطبوعات" : "Publications"}
            </h2>
            
            {/* Description - Reduced Top Margin (mt-3) */}
            <p className={`mt-3 text-gray-500 max-w-2xl text-lg font-light ${isUrdu ? 'leading-[2.2]' : 'leading-relaxed'}`}>
              {language === "urdu"
                ? "خانقاہ کی روحانی تعلیمات پر مبنی طباعت شدہ کتب و رسائل کا مطالعہ کریں۔"
                : "Explore timeless printed works reflecting the spiritual teachings of the Khanqah."}
            </p>
        </div>

        {/* --- Controls Bar --- */}
        <div className="relative z-10 max-w-7xl mx-auto mb-16 flex flex-col lg:flex-row justify-between items-end gap-8 border-b border-gray-200 pb-6">
            
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                    <button
                        key={cat.key}
                        onClick={() => { setSelectedCategory(cat.key); setCurrentPage(1); }}
                        className={`px-4 py-2 text-xs uppercase tracking-widest border rounded-full transition-all duration-300
                            ${selectedCategory === cat.key 
                                ? "border-black bg-black text-white" 
                                : "border-gray-200 text-gray-500 hover:border-black hover:text-black bg-transparent"}
                        `}
                    >
                        {isUrdu ? cat.ur : cat.en}
                    </button>
                ))}
            </div>

            {/* Search */}
            <div className="relative group w-full sm:w-64">
                <input
                    type="text"
                    placeholder={isUrdu ? "تلاش کریں..." : "Search title..."}
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                    className="w-full bg-transparent border-b border-gray-300 py-2 pl-0 pr-8 text-sm focus:outline-none focus:border-black transition-colors"
                />
                <FiSearch className={`absolute bottom-3 text-gray-400 w-4 h-4 pointer-events-none ${isUrdu ? "left-0" : "right-0"}`} />
            </div>
        </div>

        {/* --- Content Grid --- */}
        <div className="relative z-10 max-w-7xl mx-auto min-h-[500px]">
            {loading ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-16">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <PublicationSkeleton key={i} />
                    ))}
                </div>
            ) : paginatedPublications.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-16">
                    {paginatedPublications.map((pub, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group flex flex-col sm:flex-row gap-6 items-start"
                        >
                            {/* Book Cover */}
                            <div className="w-full sm:w-32 h-48 flex-shrink-0 bg-gray-200 shadow-md group-hover:shadow-xl transition-all duration-500 overflow-hidden relative rounded-md">
                                <img
                                    src={pub.cover}
                                    alt={language === "urdu" ? pub.title_ur : pub.title_en}
                                    loading="lazy"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>

                            {/* Info */}
                            <div className="flex-1 pt-1 min-w-0">
                                <span className="text-[10px] uppercase tracking-widest text-gray-400 mb-2 block">
                                    {pub.category.toUpperCase()}
                                </span>
                                
                                {/* Title - Matched Font Style */}
                                <h3 className={`text-xl md:text-2xl font-serif text-[#0C0C0C] mb-3 group-hover:underline decoration-1 underline-offset-4 decoration-gray-300
                                    ${isUrdu ? 'leading-[1.6] py-1' : 'leading-tight'}`}>
                                    {language === "urdu" ? pub.title_ur : pub.title_en}
                                </h3>
                                
                                {/* Description */}
                                <p className={`text-sm text-gray-500 mb-6 line-clamp-2 
                                    ${isUrdu ? 'leading-[2.2] py-1' : 'leading-relaxed'}`}>
                                    {language === "urdu" ? pub.description_ur : pub.description_en}
                                </p>

                                {/* Buttons */}
                                <div className="flex flex-wrap items-center gap-3">
                                    <button
                                        onClick={() => {
                                            const isMobile = window.innerWidth < 768;
                                            isMobile ? window.open(pub.file, "_blank") : setPreviewFile(pub.file);
                                        }}
                                        className="flex items-center gap-2 px-5 py-2 text-xs uppercase tracking-widest border border-gray-300 rounded-full hover:border-black hover:bg-black hover:text-white transition-all duration-300"
                                    >
                                        <FiEye className="w-3.5 h-3.5" />
                                        <span>{language === "urdu" ? "پڑھیں" : "Read"}</span>
                                    </button>

                                    <a
                                        href={pub.file}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-5 py-2 text-xs uppercase tracking-widest bg-black text-white border border-black rounded-full hover:bg-white hover:text-black transition-all duration-300"
                                    >
                                        <FiDownload className="w-3.5 h-3.5" />
                                        <span>{language === "urdu" ? "ڈاؤن لوڈ" : "Download"}</span>
                                    </a>
                                    
                                    {/* Social Share */}
                                    <div className="ml-auto">
                                        <SocialShare
                                            url={typeof window !== 'undefined' ? `${window.location.origin}/publications` : ''}
                                            title={language === "urdu" ? pub.title_ur : pub.title_en}
                                            description={language === "urdu" ? pub.description_ur : pub.description_en}
                                            variant="dropdown"
                                            size="small"
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <EmptyState 
                    type="publication"
                    language={language}
                />
            )}

            {/* Pagination */}
            {totalPages > 1 && (
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

        {/* --- PDF Modal (Immersive) --- */}
        <AnimatePresence>
            {previewFile && (
                <motion.div
                    className="fixed inset-0 bg-[#0C0C0C]/90 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setPreviewFile(null)}
                >
                    <motion.div
                        className="relative w-full max-w-6xl h-[85vh] bg-white rounded-xl shadow-2xl overflow-hidden"
                        initial={{ scale: 0.95, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.95, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setPreviewFile(null)}
                            className="absolute top-4 right-6 z-20 text-black/50 hover:text-black transition-colors flex items-center gap-2 text-xs uppercase tracking-widest bg-white/80 px-3 py-1 rounded-full backdrop-blur-sm shadow-sm"
                        >
                            <span>{language === "urdu" ? "بند کریں" : "Close"}</span>
                            <FiX className="w-4 h-4" />
                        </button>

                        <iframe
                            src={previewFile}
                            title="PDF Preview"
                            className="w-full h-full border-none"
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

      </section>
    </div>
  );
};

export default Publications;