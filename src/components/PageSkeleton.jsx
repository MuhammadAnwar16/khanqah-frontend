import React from 'react';
import { motion } from 'framer-motion';

/**
 * Generic page skeleton loader
 * Provides a consistent loading state for pages
 */
const PageSkeleton = ({ 
  showHeader = true,
  showContent = true,
  itemsCount = 6,
  className = '' 
}) => {
  return (
    <div className={`py-24 px-6 md:px-12 lg:px-24 bg-[#faf9f6] ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        {showHeader && (
          <div className="mb-20 border-b border-gray-200 pb-8">
            <div className="h-4 w-24 bg-gray-200 rounded mb-4 animate-pulse"></div>
            <div className="h-12 w-64 bg-gray-200 rounded mb-3 animate-pulse"></div>
            <div className="h-6 w-96 bg-gray-200 rounded animate-pulse"></div>
          </div>
        )}
        
        {/* Content Skeleton */}
        {showContent && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {Array.from({ length: itemsCount }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-4"
              >
                {/* Image skeleton */}
                <div className="aspect-[4/3] bg-gray-200 rounded-sm animate-pulse"></div>
                {/* Title skeleton */}
                <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                {/* Description skeleton */}
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageSkeleton;

