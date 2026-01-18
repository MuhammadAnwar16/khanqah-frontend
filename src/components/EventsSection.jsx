import React, { useState, useMemo } from "react";
import { useLanguage } from "../context/LanguageContext";
import { FiCalendar, FiClock, FiActivity, FiGrid } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import EventCalendar from "./EventCalendar";
import { useEvents } from "../hooks/useEvents";
import ErrorMessage from "./ErrorMessage";
import LoadingSpinner from "./LoadingSpinner";
import { getPriorityBgColor, getPriorityBorderColor } from "../utils/eventColors";

const EventsSection = () => {
  const { language } = useLanguage();
  const isUrdu = language === "urdu";
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "calendar"
  
  // Fetch events from API
  const { events: apiEvents = [], loading, error } = useEvents();

  // Hardcoded events (fallback/static events)
  const hardcodedEvents = [
    {
      id: 1,
      icon: <FiCalendar className="w-5 h-5" />,
      title: { urdu: "ماہانہ محفلِ ذکر", english: "Monthly Mehfil-e-Zikr" },
      date: { urdu: "ہر مہینے کی پہلی جمعرات", english: "First Thursday of every month" },
      description: {
        urdu: "ذکرِ الٰہی، بیان تصوف، اور اجتماعی دعا کی محفل۔",
        english: "Gathering for remembrance of Allah, Sufi discourse, and collective prayer.",
      },
    },
    {
      id: 2,
      icon: <FiClock className="w-5 h-5" />,
      title: { urdu: "ہفتہ وار ختم خواجگان", english: "Weekly Khatm-e-Khwajgan" },
      date: { urdu: "ہر جمعرات کے بعد نماز عصر", english: "Every Thursday after Asr prayer" },
      description: {
        urdu: "روحانیت اور قلبی سکون کے لیے اجتماعی ذکر۔",
        english: "Collective remembrance for spirituality and inner peace.",
      },
    },
    {
      id: 3,
      icon: <FiActivity className="w-5 h-5" />,
      title: { urdu: "اجتماعی مطالعہ تصوف", english: "Collective Study of Sufism" },
      date: { urdu: "روزانہ بعد نمازِ عشاء", english: "Daily after Isha prayer" },
      description: {
        urdu: "قرآن و سنت کی روشنی میں شعوری تربیت۔",
        english: "Conscious training in the light of Quran and Sunnah.",
      },
    },
  ];

  // Merge API events with hardcoded events
  const allEvents = useMemo(() => {
    const icons = [FiCalendar, FiClock, FiActivity];
    let iconIndex = 0;
    
    // Mark hardcoded events
    const markedHardcodedEvents = hardcodedEvents.map(event => ({
      ...event,
      isApiEvent: false, 
    }));
    
    // Transform API events
    const transformedApiEvents = (apiEvents || []).map((event) => {
      const IconComponent = icons[iconIndex % icons.length];
      iconIndex++;
      
      return {
        id: `api-${event.id}`,
        icon: <IconComponent className="w-5 h-5" />,
        title: event.title || { english: '', urdu: '' },
        date: event.date || { english: '', urdu: '' },
        description: event.description || { english: '', urdu: '' },
        priority: event.priority || 'default', 
        recurringType: event.recurring_type, 
        dayOfWeek: event.day_of_week,
        weekOfMonth: event.week_of_month,
        eventDate: event.event_date,
        eventTime: event.event_time, 
        isApiEvent: true, 
      };
    });
    
    return [...markedHardcodedEvents, ...transformedApiEvents];
  }, [apiEvents]);

  // Loading State
  if (loading) {
    return (
      <section id="events" className="relative py-24 bg-[#faf9f6]">
        <LoadingSpinner size="large" />
      </section>
    );
  }

  const displayError = error && apiEvents.length === 0;

  return (
    <section
      id="events"
      className={`relative py-24 px-6 md:px-12 lg:px-24 bg-[#faf9f6] text-[#0C0C0C] font-sans ${isUrdu ? "font-urdu" : ""}`}
      dir={isUrdu ? "rtl" : "ltr"}
    >
      
      {/* --- Header Section --- */}
      <div className="relative z-10 max-w-7xl mx-auto mb-16 border-b border-gray-200 pb-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="w-full">
            <span className={`block text-xs uppercase tracking-[0.2em] text-gray-400 mb-2 ${isUrdu ? 'text-right' : 'text-left'}`}>
                {isUrdu ? "شیڈول" : "Schedule"}
            </span>
            <h2 className={`text-4xl md:text-6xl font-bold tracking-tighter text-[#0C0C0C] leading-none mb-4
                ${isUrdu ? 'font- text-right' : 'text-left'}
            `}>
              {isUrdu ? "روحانی تقریبات" : "Spiritual Events"}
            </h2>
            <p className={`text-gray-500 max-w-2xl text-lg font-light 
                ${isUrdu ? 'text-right leading-[3.5] font-urdu ml-auto' : 'text-left mr-auto'}
            `}>
              {isUrdu

? "ذکر، صحبت، اور شعوری یکجہتی"

: "Remembrance, Company, and Conscious Unity"}

</p>
          </div>
          
          {/* View Toggle */}
          <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2.5 rounded-md transition-all duration-300 ${
                viewMode === "grid"
                  ? "bg-black text-white shadow-md"
                  : "text-gray-400 hover:text-black hover:bg-gray-50"
              }`}
            >
              <FiGrid className="w-4 h-4" />
            </button>
            <div className="w-px h-4 bg-gray-200 mx-1" />
            <button
              onClick={() => setViewMode("calendar")}
              className={`p-2.5 rounded-md transition-all duration-300 ${
                viewMode === "calendar"
                  ? "bg-black text-white shadow-md"
                  : "text-gray-400 hover:text-black hover:bg-gray-50"
              }`}
            >
              <FiCalendar className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {displayError && (
        <div className="max-w-7xl mx-auto mb-8">
          <ErrorMessage 
            message={isUrdu ? "تقریبات لوڈ کرنے میں خرابی ہوئی" : "Error loading events"} 
            variant="warning"
          />
        </div>
      )}

      {/* --- Content Area --- */}
      <div className="relative z-10 max-w-7xl mx-auto min-h-[400px]">
        <AnimatePresence mode="wait">
            {viewMode === "calendar" ? (
              <motion.div
                key="calendar"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <EventCalendar events={allEvents} />
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {allEvents.map((event, index) => {
                    // Helper to get color class based on priority
                    const priorityClass = event.isApiEvent && event.priority 
                        ? (event.priority === 'high' ? 'border-l-red-500' 
                          : event.priority === 'medium' ? 'border-l-blue-500' 
                          : event.priority === 'low' ? 'border-l-green-500' 
                          : 'border-l-gray-300')
                        : 'border-l-black'; // Default/Hardcoded style

                    return (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        className={`group relative bg-white border border-gray-100 p-8 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 border-l-[4px] ${priorityClass}`}
                      >
                        {/* Header: Icon & Date */}
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-gray-50 rounded-full text-gray-500 group-hover:bg-black group-hover:text-white transition-colors">
                                {event.icon}
                            </div>
                            
                            {/* Date Badge */}
                            <span className={`text-[10px] uppercase tracking-widest px-2 py-1 bg-gray-50 rounded text-gray-500 font-medium ${isUrdu ? 'font-urdu' : 'font-sans'}`}>
                                {isUrdu ? event.date.urdu : event.date.english}
                            </span>
                        </div>

                        {/* Title */}
                        <h3 className={`text-xl font-medium text-[#0C0C0C] mb-3 group-hover:text-black transition-colors
                            ${isUrdu ? 'font-heading leading-tight' : 'font-serif'}
                        `}>
                          {isUrdu ? event.title.urdu : event.title.english}
                        </h3>

                        {/* Description */}
                        <p className={`text-sm text-gray-500 line-clamp-3 mb-6
                            ${isUrdu ? 'leading-loose font-urdu' : 'leading-relaxed'}
                        `}>
                          {isUrdu ? (event.description.urdu || "...") : (event.description.english || "...")}
                        </p>

                        {/* Footer: Time Badge (if exists) */}
                        {event.eventTime && (
                            <div className="pt-4 border-t border-gray-50 flex items-center gap-2 text-xs text-gray-400">
                                <FiClock className="w-3 h-3" />
                                <span>
                                    {typeof event.eventTime === 'object' 
                                        ? (isUrdu ? event.eventTime.urdu : event.eventTime.english)
                                        : event.eventTime
                                    }
                                </span>
                            </div>
                        )}
                      </motion.div>
                    );
                })}
              </motion.div>
            )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default EventsSection;