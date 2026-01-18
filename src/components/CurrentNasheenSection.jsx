import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { FiX, FiArrowRight, FiArrowLeft, FiArrowDown } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { getCurrentNasheen, getPreviousNasheens } from "../services/about";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

const CurrentNasheenSection = () => {
  const { language } = useLanguage();
  const isUrdu = language === "urdu";
  const [modalOpen, setModalOpen] = useState(false);
  
  // Data states
  const [currentNasheen, setCurrentNasheen] = useState(null);
  const [nasheenTree, setNasheenTree] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch current Nasheen and lineage tree from API
  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch current Nasheen and previous Nasheens in parallel
        const [currentData, treeData] = await Promise.all([
          getCurrentNasheen(),
          getPreviousNasheens(),
        ]);
        
        if (isMounted) {
          setCurrentNasheen(currentData);
          setNasheenTree(Array.isArray(treeData) ? treeData : []);
        }
      } catch (err) {
        console.error("Error fetching Nasheen data:", err);
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();
    
    return () => {
      isMounted = false;
    };
  }, []);

  // Lock scroll when modal is open
  useEffect(() => {
    if (modalOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [modalOpen]);

  // Helper Component for Modal Tree
  const SnakeModalTree = ({ data, isUrdu }) => {
    const [itemsPerRow, setItemsPerRow] = useState(4);

    useEffect(() => {
      const updateItemsPerRow = () => {
        if (window.innerWidth < 640) setItemsPerRow(1);
        else if (window.innerWidth < 1024) setItemsPerRow(2);
        else if (window.innerWidth < 1600) setItemsPerRow(3);
        else setItemsPerRow(4);
      };
      updateItemsPerRow();
      window.addEventListener("resize", updateItemsPerRow);
      return () => window.removeEventListener("resize", updateItemsPerRow);
    }, []);

    const rows = [];
    for (let i = 0; i < data.length; i += itemsPerRow) {
      rows.push(data.slice(i, i + itemsPerRow));
    }

    return (
      <div className="flex flex-col items-center gap-12 w-full" dir="ltr">
        {rows.map((row, rowIndex) => {
          const isEvenRow = rowIndex % 2 === 0;
          const isLTR = (!isUrdu && isEvenRow) || (isUrdu && !isEvenRow);
          const rowData = isLTR ? row : [...row].reverse();

          return (
            <div key={rowIndex} className="flex flex-col items-center w-full">
              <div className="w-full text-center">
                <div className="inline-flex items-center gap-6">
                  {rowData.map((entry, idx) => (
                    <React.Fragment key={idx}>
                      <div className="bg-[#faf9f6] border border-gray-200 shadow-sm px-6 py-4 rounded-lg w-40 md:w-56 text-center hover:border-[#0C0C0C] transition-all duration-300">
                        <p dir={isUrdu ? "rtl" : "ltr"} className={`text-sm md:text-base text-gray-800 ${isUrdu ? "font-urdu" : "font-sans font-medium"}`}>
                          {isUrdu ? entry.name_ur : entry.name_en}
                        </p>
                      </div>
                      {idx < rowData.length - 1 && (
                        isLTR ? <FiArrowRight className="text-gray-300 text-xl" /> : <FiArrowLeft className="text-gray-300 text-xl" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
              {rowIndex < rows.length - 1 && (
                <div className="flex w-full mt-2 px-2">
                    {itemsPerRow === 1 ? (
                        <div className="flex justify-center w-full"><FiArrowDown className="text-gray-300 text-2xl" /></div>
                    ) : isLTR ? (
                        <div className="flex justify-end w-full pr-10"><FiArrowDown className="text-gray-300 text-2xl" /></div>
                    ) : (
                        <div className="flex justify-start w-full pl-10"><FiArrowDown className="text-gray-300 text-2xl" /></div>
                    )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div dir={language === "urdu" ? "rtl" : "ltr"}>
      <section
        id="sajjada-nasheen"
        className={`relative py-24 px-6 md:px-12 lg:px-24 bg-[#faf9f6] text-[#0C0C0C] font-sans ${isUrdu ? "font-urdu" : ""}`}
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Left Content (Text) */}
            <div className={`order-2 lg:order-1 ${isUrdu ? 'text-right' : 'text-left'}`}>
                <span className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-4">
                    {isUrdu ? "موجودہ" : "Current"}
                </span>
                <h2 className={`text-5xl md:text-6xl font-bold tracking-tighter text-[#0C0C0C] leading-none mb-6 
                    ${isUrdu ? 'font-' : ''}
                `}>
                    {language === "urdu" ? "مسند نشین" : "Masnad-e-Nasheen"}
                </h2>
                
                {loading ? (
                  <div className="h-24">
                    <LoadingSpinner size="sm" />
                  </div>
                ) : error ? (
                  <ErrorMessage message={error} variant="inline" />
                ) : currentNasheen ? (
                  <p className={`text-lg text-gray-500 font-light mb-8 
                      ${isUrdu ? 'leading-[2.2]' : 'leading-relaxed'}
                  `}>
                      {isUrdu ? currentNasheen.description_ur : currentNasheen.description_en}
                  </p>
                ) : (
                  <div className="h-24 flex items-center opacity-50">
                    <p className="text-sm text-gray-400">
                      {isUrdu ? "مواد دستیاب نہیں ہے" : "Content not available"}
                    </p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                    <button
                        onClick={() => setModalOpen(true)}
                        className="px-8 py-3 bg-[#0C0C0C] text-white text-sm uppercase tracking-widest rounded-full hover:bg-gray-800 transition-colors duration-300 shadow-lg hover:shadow-xl"
                    >
                        {language === "urdu" ? "سابقہ مسند نشین" : "View Lineage"}
                    </button>
                    
                    <p className={`text-sm italic text-gray-400 ${isUrdu ? 'mt-0' : ''}`}>
                        {language === "urdu"
                            ? "اللہ تعالیٰ آپ کے فیض کو عام فرمائے۔"
                            : "May Allah spread his blessings far and wide."}
                    </p>
                </div>
            </div>

            {/* Right Content (Image) */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                <div className="relative w-full max-w-md aspect-[4/5] bg-gray-200 overflow-hidden shadow-2xl group">
                    {loading ? (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <p className="text-xs uppercase tracking-widest text-gray-400 animate-pulse">
                          {isUrdu ? "لوڈ ہو رہا ہے..." : "Loading..."}
                        </p>
                      </div>
                    ) : currentNasheen && currentNasheen.image ? (
                      <>
                        <img
                          src={currentNasheen.image}
                          alt={isUrdu ? currentNasheen.name_ur : currentNasheen.name_en}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        
                        {/* Minimal Overlay Caption */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                          <p className={`text-white text-lg font-serif leading-tight ${isUrdu ? 'text-right font-heading' : 'text-left'}`}>
                            {isUrdu ? currentNasheen.name_ur : currentNasheen.name_en}
                          </p>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <p className="text-sm text-gray-400 text-center px-4">
                          {isUrdu ? "تصویر دستیاب نہیں ہے" : "Image not available"}
                        </p>
                      </div>
                    )}
                </div>
            </div>

        </div>

        {/* --- Immersive Modal --- */}
        <AnimatePresence>
            {modalOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-[#0C0C0C]/95 backdrop-blur-xl p-4 md:p-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setModalOpen(false)}
                >
                    <motion.div
                        className="relative w-full max-w-7xl h-[90vh] bg-[#faf9f6] rounded-xl shadow-2xl overflow-hidden flex flex-col"
                        initial={{ scale: 0.95, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.95, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setModalOpen(false)}
                            className="absolute top-6 right-6 z-20 p-2 bg-[#faf9f6]/50 hover:bg-[#0C0C0C] hover:text-white text-[#0C0C0C] rounded-full transition-all duration-300"
                        >
                            <FiX className="w-6 h-6" />
                        </button>

                        {/* Modal Header */}
                        <div className="pt-12 pb-8 px-8 text-center border-b border-gray-200 bg-[#faf9f6]">
                            <h3 className={`text-3xl md:text-4xl font-bold text-[#0C0C0C] ${isUrdu ? 'font-heading' : 'font-serif'}`}>
                                {language === "urdu" ? "سابقہ مسند نشین" : "Succession Lineage"}
                            </h3>
                            <p className="text-gray-400 text-sm uppercase tracking-widest mt-2">
                                {language === "urdu" ? "تاریخی ترتیب" : "Historical Order"}
                            </p>
                        </div>

                        {/* Scrollable Tree Content */}
                        <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">
                            {loading ? (
                              <div className="flex items-center justify-center h-full">
                                <p className="text-xs uppercase tracking-widest text-gray-400 animate-pulse">
                                  {isUrdu ? "لوڈ ہو رہا ہے..." : "Loading..."}
                                </p>
                              </div>
                            ) : nasheenTree.length > 0 ? (
                              <div className="flex justify-center">
                                <SnakeModalTree
                                    data={nasheenTree}
                                    isUrdu={language === "urdu"}
                                />
                              </div>
                            ) : (
                              <div className="flex items-center justify-center h-full text-gray-400">
                                <p className="text-sm">
                                  {isUrdu ? "کوئی مواد دستیاب نہیں ہے۔" : "No lineage data available."}
                                </p>
                              </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* Quote Section (Optional - kept for completeness) */}
        <div className="mt-24 text-center max-w-2xl mx-auto opacity-60">
            <p className={`text-xl italic text-gray-500 font-serif leading-relaxed ${isUrdu ? 'font-urdu' : ''}`}>
                &ldquo;{language === "urdu"
                    ? "روحانیت وہ چراغ ہے جو اندھیروں میں بھی روشنی دیتا ہے۔"
                    : "Spirituality is a lamp that lights even in the darkest of nights."}&rdquo;
            </p>
        </div>

      </section>
    </div>
  );
};

export default CurrentNasheenSection;