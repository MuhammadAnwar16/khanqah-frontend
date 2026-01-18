import React from 'react';

const GallerySkeleton = () => {
  return (
    <div className="group cursor-pointer animate-pulse">
      {/* Image Wrapper Skeleton */}
      <div className="relative aspect-[4/3] bg-gray-200 overflow-hidden mb-5" />
      
      {/* Text Info Skeleton */}
      <div className="pr-2 border-l-2 border-transparent pl-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-3 bg-gray-200 rounded w-16" />
          <div className="w-1 h-1 bg-gray-200 rounded-full" />
          <div className="h-3 bg-gray-200 rounded w-20" />
        </div>
        <div className="h-5 bg-gray-200 rounded w-3/4" />
      </div>
    </div>
  );
};

export default GallerySkeleton;

