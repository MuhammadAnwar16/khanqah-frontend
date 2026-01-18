import React from 'react';
import { useLanguage } from '../context/LanguageContext';

/**
 * Generic, reusable loading spinner component
 * Supports different sizes and bilingual text
 */
const LoadingSpinner = ({ 
  size = 'md', 
  text = null, 
  fullScreen = false,
  className = '' 
}) => {
  const { language } = useLanguage();
  const isUrdu = language === 'urdu';
  
  const defaultText = isUrdu ? 'لوڈ ہو رہا ہے...' : 'Loading...';
  const displayText = text || defaultText;
  
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-4',
    lg: 'w-12 h-12 border-4',
    xl: 'w-16 h-16 border-4',
  };
  
  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg',
  };
  
  const spinner = (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className={`${sizeClasses[size]} border-gray-200 border-t-black rounded-full animate-spin mb-4`}></div>
      {displayText && (
        <p className={`${textSizeClasses[size]} text-gray-500 uppercase tracking-widest ${isUrdu ? 'font-urdu' : ''}`}>
          {displayText}
        </p>
      )}
    </div>
  );
  
  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf9f6]">
        {spinner}
      </div>
    );
  }
  
  return spinner;
};

export default LoadingSpinner;

