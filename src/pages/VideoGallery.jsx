import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { FiX, FiPlay, FiHeadphones, FiSearch, FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { getVideos, getAudios } from "../services/videoAudios";
import SEO from "../components/SEO";
import MediaSkeleton from "../components/MediaSkeleton";
import EmptyState from "../components/EmptyState";
import SocialShare from "../components/SocialShare";
import { seoData, getBreadcrumbSchema } from "../utils/seoData";

const categories = ["All", "Bayaan", "Dhikr", "Event"];

// Helper function to extract YouTube video ID from any URL format
const extractYouTubeVideoId = (url) => {
  if (!url) return null;
  
  // Handle different YouTube URL formats:
  // https://www.youtube.com/watch?v=VIDEO_ID
  // https://youtube.com/watch?v=VIDEO_ID
  // https://m.youtube.com/watch?v=VIDEO_ID
  // https://youtu.be/VIDEO_ID
  // https://www.youtube.com/embed/VIDEO_ID
  // VIDEO_ID (if already just the ID)
  
  // If it's already just the ID (no URL structure)
  if (/^[a-zA-Z0-9_-]{11}$/.test(url.trim())) {
    return url.trim();
  }
  
  // Extract from various URL patterns
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|m\.youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/.*[?&]v=([a-zA-Z0-9_-]{11})/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return null;
};

// Helper function to get YouTube embed URL
const getYouTubeEmbedUrl = (videoUrl) => {
  const videoId = extractYouTubeVideoId(videoUrl);
  if (!videoId) return null;
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`;
};

// Helper function to get YouTube thumbnail URL
const getYouTubeThumbnailUrl = (videoUrl) => {
  const videoId = extractYouTubeVideoId(videoUrl);
  if (!videoId) return null;
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
};

const MediaGallery = () => {
  const { language } = useLanguage();
  const isUrdu = language === "urdu";
  const seo = seoData.videoGallery[isUrdu ? "ur" : "en"];
  
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: isUrdu ? "سرورق" : "Home", url: "/" },
    { name: isUrdu ? "میڈیا" : "Media", url: "/VideoGallery" },
  ]);

  const [activeTab, setActiveTab] = useState("Videos");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalVideo, setModalVideo] = useState(null);
  const [modalAudio, setModalAudio] = useState(null);
  const [allVideos, setAllVideos] = useState([]);
  const [allAudios, setAllAudios] = useState([]);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 6;

  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      try {
        setLoading(true);
        if (activeTab === "Videos") {
          const data = await getVideos();
          if (isMounted) {
            setAllVideos(Array.isArray(data) ? data : []);
          }
        } else {
          const data = await getAudios();
          if (isMounted) {
            setAllAudios(Array.isArray(data) ? data : []);
          }
        }
      } catch (err) {
        console.error("Error fetching media:", err);
        if (isMounted) {
          // Set empty arrays on error to prevent undefined states
          if (activeTab === "Videos") {
            setAllVideos([]);
          } else {
            setAllAudios([]);
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    fetchData();
    
    // Cleanup function to prevent state updates if component unmounts or tab changes
    return () => {
      isMounted = false;
    };
  }, [activeTab]);

  const mediaItems = activeTab === "Videos" ? allVideos : allAudios;

  const filteredItems = mediaItems.filter((item) => {
    const title = isUrdu ? item.urdu_title : item.english_title;
    if (!title) return false;
    return (
      title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (activeCategory === "All" || item.category === activeCategory)
    );
  });

  const sortedItems = [...filteredItems].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);
  const paginatedItems = sortedItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const body = document.body;
    const hasModalOpen = modalVideo || modalAudio;
    if (hasModalOpen) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "";
    }
    return () => {
      body.style.overflow = "";
    };
  }, [modalVideo, modalAudio]);

  return (
    <div dir={isUrdu ? "rtl" : "ltr"}>
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
        {/* --- Header Section --- */}
        <div className="relative z-10 max-w-7xl mx-auto mb-16">
            <span className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-4">
                {isUrdu ? "آرکائیو" : "Archive"}
            </span>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-[#0C0C0C]">
                {isUrdu ? "میڈیا گیلری" : "Media Gallery"}
            </h2>
        </div>

        {/* --- Minimal Controls --- */}
        <div className="relative z-10 max-w-7xl mx-auto mb-12 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 border-b border-gray-200 pb-6">
            <div className="flex gap-10">
                {["Videos", "Audios"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => {
                            setActiveTab(tab);
                            setCurrentPage(1);
                            setSearchTerm("");
                            setActiveCategory("All");
                        }}
                        className={`relative text-xl md:text-2xl font-light transition-all pb-2
                            ${activeTab === tab ? "text-black font-normal" : "text-gray-300 hover:text-gray-500"}
                        `}
                    >
                        {isUrdu ? (tab === "Videos" ? "ویڈیوز" : "آڈیوز") : tab}
                        {activeTab === tab && (
                            <motion.span
                                layoutId="activeTabDot"
                                className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-black rounded-full"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                    </button>
                ))}
            </div>

            <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-6 items-center">
                <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-3 py-1 text-xs uppercase tracking-widest border rounded-full transition-all
                                ${activeCategory === cat 
                                    ? "border-black bg-black text-white" 
                                    : "border-gray-200 text-gray-500 hover:border-gray-400"}
                            `}
                        >
                            {isUrdu ? cat === "All" ? "تمام" : cat === "Bayaan" ? "بیان" : cat === "Dhikr" ? "ذکر" : "تقریب" : cat}
                        </button>
                    ))}
                </div>
                <div className="relative group w-full sm:w-56">
                    <input
                        type="text"
                        placeholder={isUrdu ? "تلاش کریں..." : "Search..."}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-transparent border-b border-gray-300 py-1 pl-0 pr-6 text-sm focus:outline-none focus:border-black transition-colors"
                    />
                    <FiSearch className={`absolute bottom-2 text-gray-400 w-4 h-4 ${isUrdu ? "left-0" : "right-0"}`} />
                </div>
            </div>
        </div>

        {/* --- Grid Content --- */}
        <div className="relative z-10 max-w-7xl mx-auto min-h-[400px]">
            {loading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <MediaSkeleton key={i} isVideo={activeTab === "Videos"} />
                    ))}
                </div>
            ) : paginatedItems.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {paginatedItems.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="group cursor-pointer"
                            onClick={() => activeTab === "Videos" ? setModalVideo(item) : setModalAudio(item)}
                        >
                            <div className="relative aspect-video bg-gray-100 overflow-hidden mb-4">
                                {activeTab === "Videos" ? (
                                    <>
                                        {getYouTubeThumbnailUrl(item.youtubeUrl) ? (
                                            <img 
                                                src={getYouTubeThumbnailUrl(item.youtubeUrl)} 
                                                alt={isUrdu ? item.urdu_title : item.english_title}
                                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 grayscale group-hover:grayscale-0"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                                                <p className="text-xs text-gray-500">{isUrdu ? "تصویر دستیاب نہیں" : "Thumbnail unavailable"}</p>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="w-12 h-12 bg-white flex items-center justify-center rounded-full shadow-lg">
                                                <FiPlay className="w-4 h-4 text-black ml-1" />
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center bg-[#f0f0f0] group-hover:bg-[#e5e5e5] transition-colors">
                                        <FiHeadphones className="w-8 h-8 text-gray-400 mb-3" />
                                        <div className="w-8 h-[1px] bg-gray-300"></div>
                                    </div>
                                )}
                            </div>
                            <div className="pr-2">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-[10px] uppercase tracking-widest text-gray-400">
                                        {isUrdu ? (item.category === "Bayaan" ? "بیان" : item.category === "Dhikr" ? "ذکر" : "تقریب") : item.category}
                                    </span>
                                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                    <span className="text-[10px] uppercase tracking-widest text-gray-400">
                                        {isUrdu
                                            ? new Date(item.date).toLocaleDateString("ur-PK", { year: "numeric", month: "short" })
                                            : new Date(item.date).toLocaleDateString("en-US", { year: "numeric", month: "short" })
                                        }
                                    </span>
                                </div>
                                <h3 className="text-xl font-medium text-[#0C0C0C] leading-snug group-hover:underline underline-offset-4 decoration-1 decoration-gray-300 mb-3">
                                    {isUrdu ? item.urdu_title : item.english_title}
                                </h3>
                                
                                {/* Social Share Button */}
                                <div className="flex justify-end mt-3" onClick={(e) => e.stopPropagation()}>
                                    <SocialShare
                                        url={activeTab === "Videos" ? item.youtubeUrl : item.audioUrl || (typeof window !== 'undefined' ? window.location.href : '')}
                                        title={isUrdu ? item.urdu_title : item.english_title}
                                        description={isUrdu ? (item.category === "Bayaan" ? "بیان" : item.category === "Dhikr" ? "ذکر" : "تقریب") : item.category}
                                        variant="dropdown"
                                        size="small"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <EmptyState 
                    type={activeTab === "Videos" ? "video" : "audio"}
                    language={language}
                />
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center mt-20 gap-8">
                    <button onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="text-2xl text-black hover:opacity-50 disabled:opacity-10 transition-opacity"><FiArrowLeft /></button>
                    <span className="text-sm font-medium tracking-widest">{currentPage} <span className="text-gray-300 mx-2">/</span> {totalPages}</span>
                    <button onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="text-2xl text-black hover:opacity-50 disabled:opacity-10 transition-opacity"><FiArrowRight /></button>
                </div>
            )}
        </div>

        {/* --- BETTER MINIMAL MODAL --- */}
        <AnimatePresence>
            {(modalVideo || modalAudio) && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* Dark Blurred Backdrop */}
                    <div 
                        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity" 
                        onClick={() => { setModalVideo(null); setModalAudio(null); }}
                    />

                    {/* Modal Card */}
                    <motion.div
                        className={`relative w-full shadow-2xl overflow-hidden z-10
                            ${modalVideo ? 'max-w-5xl bg-black rounded-xl' : 'max-w-xl bg-white rounded-3xl'}
                        `}
                        initial={{ scale: 0.95, y: 20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.95, y: 20, opacity: 0 }}
                        transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => { setModalVideo(null); setModalAudio(null); }}
                            className={`absolute top-4 right-4 z-20 p-2 rounded-full transition-all duration-300
                                ${modalVideo 
                                    ? 'bg-white/10 text-white hover:bg-white hover:text-black' 
                                    : 'bg-gray-100 text-black hover:bg-black hover:text-white'}
                            `}
                        >
                            <FiX className="w-5 h-5" />
                        </button>

                        {/* Content */}
                        {modalVideo ? (
                            <div className="aspect-video w-full bg-black">
                                {getYouTubeEmbedUrl(modalVideo.youtubeUrl) ? (
                                    <iframe
                                        className="w-full h-full"
                                        src={getYouTubeEmbedUrl(modalVideo.youtubeUrl)}
                                        title={isUrdu ? modalVideo.urdu_title : modalVideo.english_title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        frameBorder="0"
                                    ></iframe>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-white">
                                        <p className="text-sm">{isUrdu ? "ویڈیو URL غلط ہے" : "Invalid video URL"}</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-12 px-8 text-center">
                                {/* Elegant Audio UI */}
                                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                                    <FiHeadphones className="w-10 h-10 text-gray-400" />
                                </div>
                                
                                <div className="space-y-2 mb-8">
                                    <h3 className="text-2xl md:text-3xl font-serif text-[#0C0C0C] leading-tight">
                                        {isUrdu ? modalAudio.urdu_title : modalAudio.english_title}
                                    </h3>
                                    <p className="text-xs uppercase tracking-widest text-gray-400">
                                        {isUrdu ? (modalAudio.category === "Bayaan" ? "بیان" : "ذکر") : modalAudio.category}
                                    </p>
                                </div>
                                
                                {/* Custom Player Wrapper */}
                                <div className="w-full bg-gray-50 rounded-full p-1.5 border border-gray-200">
                                    <audio controls className="w-full h-10 custom-audio-player-minimal focus:outline-none">
                                        <source src={modalAudio.audioUrl} type="audio/mpeg" />
                                    </audio>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

      </section>
    </div>
  );
};

export default MediaGallery;