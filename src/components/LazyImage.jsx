import React, { useState } from 'react';

/**
 * LazyImage component with error handling and fallback
 * Provides a fallback UI when images fail to load
 */
const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  fallback = null,
  onError = null,
  ...props 
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleError = (e) => {
    setImageError(true);
    setImageLoading(false);
    if (onError) {
      onError(e);
    }
  };

  const handleLoad = () => {
    setImageLoading(false);
  };

  // If error occurred and fallback is provided, show fallback
  if (imageError && fallback) {
    return fallback;
  }

  // If error occurred without fallback, show placeholder
  if (imageError) {
    return (
      <div className={`${className} bg-gray-200 flex items-center justify-center`}>
        <div className="text-gray-400 text-sm text-center px-4">
          {alt || 'Image not available'}
        </div>
      </div>
    );
  }

  return (
    <>
      {imageLoading && (
        <div className={`${className} bg-gray-200 animate-pulse`} />
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${imageLoading ? 'hidden' : ''}`}
        onError={handleError}
        onLoad={handleLoad}
        loading="lazy"
        {...props}
      />
    </>
  );
};

export default LazyImage;

