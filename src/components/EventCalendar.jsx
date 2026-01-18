import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FiChevronLeft, FiChevronRight, FiClock, FiCalendar } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { getPriorityBgColor } from '../utils/eventColors';

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 20 : -20,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? -20 : 20,
    opacity: 0,
  }),
};

const EventCalendar = ({ events = [] }) => {
  const { language } = useLanguage();
  const isUrdu = language === 'urdu';
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [direction, setDirection] = useState(0);
  
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  // --- Date Calculation Logic (Preserved) ---
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  const monthNames = isUrdu 
    ? ['جنوری', 'فروری', 'مارچ', 'اپریل', 'مئی', 'جون', 'جولائی', 'اگست', 'ستمبر', 'اکتوبر', 'نومبر', 'دسمبر']
    : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  const dayNames = isUrdu
    ? ['اتوار', 'پیر', 'منگل', 'بدھ', 'جمعرات', 'جمعہ', 'ہفتہ']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Logic to filter events
  const getEventsForDate = (day) => {
    if (!day) return [];
    const date = new Date(currentYear, currentMonth, day);
    const dayOfWeek = date.getDay(); 
    
    return events.filter(event => {
      if (event.isApiEvent === false) return false;
      
      // Check Recurrence
      if (event.recurringType) {
        if (event.recurringType === 'daily') return true;
        if (event.recurringType === 'weekly' && event.dayOfWeek === dayOfWeek) return true;
        if (event.recurringType === 'monthly') {
          if (event.weekOfMonth === 1) return dayOfWeek === event.dayOfWeek && day >= 1 && day <= 7;
          return dayOfWeek === event.dayOfWeek;
        }
        if (event.recurringType === 'one_time' && event.eventDate) {
          const eventDate = new Date(event.eventDate);
          return eventDate.getDate() === day && eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
        }
      }
      
      // Fallback String Pattern Matching
      const datePattern = isUrdu ? event.date?.urdu : event.date?.english;
      if (datePattern) {
        const p = datePattern.toLowerCase();
        if ((p.includes('first thursday') || p.includes('پہلی جمعرات')) && dayOfWeek === 4) return day >= 1 && day <= 7;
        if ((p.includes('thursday') || p.includes('جمعرات')) && !p.includes('first') && !p.includes('پہلی') && dayOfWeek === 4) return true;
        if (p.includes('daily') || p.includes('روزانہ')) return true;
      }
      return false;
    });
  };
  
  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) calendarDays.push(null);
  for (let day = 1; day <= daysInMonth; day++) calendarDays.push(day);
  
  const today = new Date();
  const isToday = (day) => {
    return day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
  };

  const changeMonth = (dir) => {
    setDirection(dir);
    setSelectedDay(null);
    setCurrentDate(new Date(currentYear, currentMonth + dir, 1));
  };

  const handleDayClick = (day) => {
    if (day) setSelectedDay(day === selectedDay ? null : day);
  };

  // Helper to format and get time safely (handles Django time format HH:MM:SS)
  const getEventTime = (event) => {
    // Check for event_time field (from API)
    const timeStr = event.eventTime || event.event_time;
    if (!timeStr) return null;
    
    // Handle Django time format (HH:MM:SS or HH:MM)
    if (typeof timeStr === 'string') {
      // Parse time string (e.g., "14:30:00" or "14:30")
      const timeParts = timeStr.split(':');
      if (timeParts.length >= 2) {
        const hours = parseInt(timeParts[0], 10);
        const minutes = timeParts[1];
        const period = hours >= 12 ? (isUrdu ? 'PM' : 'PM') : (isUrdu ? 'AM' : 'AM');
        const displayHours = hours > 12 ? hours - 12 : (hours === 0 ? 12 : hours);
        return `${displayHours}:${minutes} ${period}`;
      }
      return timeStr;
    }
    
    // Handle object format if needed
    if (typeof timeStr === 'object') {
      return isUrdu ? timeStr.urdu : timeStr.english;
    }
    
    return timeStr;
  };

  const activeEvents = selectedDay 
    ? getEventsForDate(selectedDay) 
    : events.filter(e => e.isApiEvent === true).slice(0, 3);

  return (
    <div className={`w-full max-w-md mx-auto ${isUrdu ? 'font-urdu' : 'font-sans'}`}>
      
      {/* --- Header --- */}
      <div className="flex items-center justify-between mb-8 px-2 relative z-10">
        <button onClick={() => changeMonth(-1)} className="group p-2 rounded-full hover:bg-gray-100 transition-all">
          <FiChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
        </button>
        
        <div className="text-center">
          <motion.h3 
            key={currentMonth}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-xl md:text-2xl text-[#0C0C0C] ${isUrdu ? 'font-bold' : 'font-serif'}`}
          >
            {monthNames[currentMonth]} <span className="text-gray-400 font-sans font-light text-lg">{currentYear}</span>
          </motion.h3>
          <button onClick={() => { setCurrentDate(new Date()); setSelectedDay(null); }} className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors mt-1">
            {isUrdu ? 'آج' : 'Current'}
          </button>
        </div>
        
        <button onClick={() => changeMonth(1)} className="group p-2 rounded-full hover:bg-gray-100 transition-all">
          <FiChevronRight className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
        </button>
      </div>
      
      {/* --- Weekday Header --- */}
      <div className="grid grid-cols-7 mb-2 border-b border-gray-100 pb-2">
        {dayNames.map((day, index) => (
          <div key={index} className="text-center text-[10px] uppercase tracking-widest text-gray-400 font-medium">
            {day.slice(0, 3)}
          </div>
        ))}
      </div>
      
      {/* --- Calendar Grid --- */}
      <div className="relative overflow-hidden min-h-[280px]">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentMonth}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="grid grid-cols-7 gap-y-2 gap-x-1 absolute w-full"
          >
            {calendarDays.map((day, index) => {
              if (day === null) return <div key={`empty-${index}`} />;
              
              const dayEvents = getEventsForDate(day);
              const isCurrent = isToday(day);
              const isSelected = day === selectedDay;
              
              return (
                <div key={day} onClick={() => handleDayClick(day)} className="flex flex-col items-center justify-start h-10 relative group cursor-pointer">
                  <div className={`
                    w-8 h-8 flex items-center justify-center rounded-full text-sm transition-all duration-300 relative
                    ${isCurrent ? 'bg-black text-white font-bold' : ''}
                    ${isSelected ? 'ring-1 ring-black bg-gray-50 text-black' : ''}
                    ${!isCurrent && !isSelected ? 'text-gray-600 hover:bg-gray-100' : ''}
                  `}>
                    {day}
                    
                    {/* Event Dots (Color Indication) */}
                    {dayEvents.length > 0 && (
                        <div className="absolute bottom-1 flex gap-0.5 justify-center">
                            {dayEvents.slice(0, 3).map((ev, i) => (
                                <span 
                                    key={i}
                                    className={`w-1 h-1 rounded-full ${isCurrent ? 'bg-white' : (ev.priority ? getPriorityBgColor(ev.priority) : 'bg-gray-400')}`} 
                                />
                            ))}
                        </div>
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* --- Dynamic Event List (Footer) --- */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        
        <div className="flex justify-between items-end mb-4">
            <p className={`text-xs uppercase tracking-widest text-gray-400 ${isUrdu ? 'text-right font-urdu' : 'text-left'}`}>
                {selectedDay 
                    ? (isUrdu ? `${selectedDay} ${monthNames[currentMonth]} کی تقریبات` : `Events on ${monthNames[currentMonth]} ${selectedDay}`)
                    : (isUrdu ? 'آنے والی تقریبات' : 'Upcoming Events')
                }
            </p>
            {selectedDay && (
                <button onClick={() => setSelectedDay(null)} className="text-[10px] text-gray-400 hover:text-black transition-colors">
                    {isUrdu ? 'واپس' : 'Clear'}
                </button>
            )}
        </div>

        <div className="space-y-3 min-h-[100px]">
            {activeEvents.length > 0 ? (
                activeEvents.map((event, idx) => {
                    const eventTime = getEventTime(event);
                    const priorityColor = event.priority ? getPriorityBgColor(event.priority) : 'bg-gray-800';

                    return (
                        <motion.div 
                            key={`${event.id}-${idx}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-start gap-3 group p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
                        >
                            {/* Color Indication Line */}
                            <div className={`w-1 h-full min-h-[32px] rounded-full mt-1 ${priorityColor}`} />
                            
                            <div className="flex-1">
                                <p className={`text-sm text-gray-900 font-medium ${isUrdu ? 'font-urdu leading-snug' : ''}`}>
                                    {isUrdu ? event.title?.urdu : event.title?.english}
                                </p>
                                
                                {/* Info Pills (Date & Time) */}
                                <div className="flex flex-wrap items-center gap-2 mt-2">
                                    {/* Date Pill */}
                                    <div className="flex items-center gap-1.5 bg-gray-100/50 px-2 py-1 rounded text-[10px] text-gray-500">
                                        <FiCalendar className="w-3 h-3" />
                                        <span className={`uppercase tracking-wider ${isUrdu ? 'font-urdu pt-0.5' : ''}`}>
                                            {isUrdu ? event.date?.urdu : event.date?.english}
                                        </span>
                                    </div>

                                    {/* Time Pill (If available) */}
                                    {eventTime && (
                                        <div className="flex items-center gap-1.5 bg-gray-100/50 px-2 py-1 rounded text-[10px] text-gray-500">
                                            <FiClock className="w-3 h-3" />
                                            <span className={`uppercase tracking-wider ${isUrdu ? 'font-urdu pt-0.5' : ''}`}>
                                                {eventTime}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    );
                })
            ) : (
                <div className="text-center py-8 opacity-50">
                    <FiCalendar className="w-6 h-6 mx-auto mb-2 text-gray-300" />
                    <p className="text-xs text-gray-400 italic">
                        {isUrdu ? "اس تاریخ کو کوئی تقریب نہیں" : "No events scheduled for this day"}
                    </p>
                </div>
            )}
        </div>
      </div>

    </div>
  );
};

export default EventCalendar;