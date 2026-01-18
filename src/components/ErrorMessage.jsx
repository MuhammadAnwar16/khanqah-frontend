import React from 'react';
import { FiAlertCircle, FiRefreshCw } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';

/**
 * Standardized error message component
 * Displays errors consistently across the application
 */
const ErrorMessage = ({ 
  message, 
  onRetry = null,
  className = '',
  variant = 'default' // 'default', 'inline', 'full'
}) => {
  const { language } = useLanguage();
  const isUrdu = language === 'urdu';
  
  const defaultMessage = isUrdu 
    ? 'کچھ غلط ہو گیا۔ براہ کرم دوبارہ کوشش کریں۔'
    : 'Something went wrong. Please try again.';
  
  const displayMessage = message || defaultMessage;
  
  const variants = {
    default: 'flex flex-col items-center justify-center h-64 text-red-500 opacity-80',
    inline: 'flex items-center gap-2 text-red-500 text-sm',
    full: 'min-h-screen flex flex-col items-center justify-center bg-[#faf9f6] text-red-500',
  };
  
  return (
    <div className={`${variants[variant]} ${className} ${isUrdu ? 'font-urdu' : ''}`}>
      <div className="flex flex-col items-center gap-4">
        <FiAlertCircle className="w-6 h-6" />
        <p className={`text-center ${variant === 'inline' ? 'text-sm' : 'text-base'}`}>
          {displayMessage}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors flex items-center gap-2 text-sm"
          >
            <FiRefreshCw className="w-4 h-4" />
            <span>{isUrdu ? 'دوبارہ کوشش کریں' : 'Retry'}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;

