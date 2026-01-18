import React from 'react';
import { FiInbox, FiSearch, FiBookOpen, FiImage, FiVideo, FiHeadphones } from 'react-icons/fi';

/**
 * Reusable EmptyState component for better UX
 * Provides consistent empty states across the application
 */
const EmptyState = ({ 
  type = 'default',
  title,
  message,
  icon,
  action = null,
  language = 'urdu'
}) => {
  const isUrdu = language === 'urdu';

  const defaultIcons = {
    default: <FiInbox className="w-12 h-12" />,
    search: <FiSearch className="w-12 h-12" />,
    publication: <FiBookOpen className="w-12 h-12" />,
    gallery: <FiImage className="w-12 h-12" />,
    video: <FiVideo className="w-12 h-12" />,
    audio: <FiHeadphones className="w-12 h-12" />,
  };

  const defaultTitles = {
    default: isUrdu ? 'کوئی مواد نہیں ملا' : 'No content found',
    search: isUrdu ? 'کوئی نتیجہ نہیں ملا' : 'No results found',
    publication: isUrdu ? 'کوئی کتاب نہیں ملی' : 'No publications found',
    gallery: isUrdu ? 'کوئی تصاویر نہیں ملیں' : 'No images found',
    video: isUrdu ? 'کوئی ویڈیو نہیں ملی' : 'No videos found',
    audio: isUrdu ? 'کوئی آڈیو نہیں ملا' : 'No audio found',
  };

  const defaultMessages = {
    default: isUrdu 
      ? 'اس وقت کوئی مواد دستیاب نہیں ہے۔'
      : 'No content is available at the moment.',
    search: isUrdu
      ? 'آپ کی تلاش کے مطابق کوئی نتیجہ نہیں ملا۔ براہ کرم مختلف الفاظ سے کوشش کریں۔'
      : 'No results found for your search. Please try different keywords.',
    publication: isUrdu
      ? 'فی الوقت کوئی مطبوعات دستیاب نہیں ہیں۔'
      : 'No publications are available at the moment.',
    gallery: isUrdu
      ? 'فی الوقت کوئی تصاویر دستیاب نہیں ہیں۔'
      : 'No images are available at the moment.',
    video: isUrdu
      ? 'فی الوقت کوئی ویڈیوز دستیاب نہیں ہیں۔'
      : 'No videos are available at the moment.',
    audio: isUrdu
      ? 'فی الوقت کوئی آڈیوز دستیاب نہیں ہیں۔'
      : 'No audio files are available at the moment.',
  };

  const displayIcon = icon || defaultIcons[type] || defaultIcons.default;
  const displayTitle = title || defaultTitles[type] || defaultTitles.default;
  const displayMessage = message || defaultMessages[type] || defaultMessages.default;

  return (
    <div className={`flex flex-col items-center justify-center h-64 text-gray-400 border border-dashed border-gray-300 rounded-lg p-8 ${isUrdu ? 'font-urdu' : ''}`}>
      <div className="mb-4 opacity-50">
        {displayIcon}
      </div>
      <h3 className={`text-lg font-medium text-gray-600 mb-2 ${isUrdu ? 'leading-[2.2]' : ''}`}>
        {displayTitle}
      </h3>
      <p className={`text-sm text-gray-500 text-center max-w-md mb-4 ${isUrdu ? 'leading-[2.2]' : 'leading-relaxed'}`}>
        {displayMessage}
      </p>
      {action && (
        <div className="mt-2">
          {action}
        </div>
      )}
    </div>
  );
};

export default EmptyState;

