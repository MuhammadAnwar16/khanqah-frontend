import React from 'react';

const GallerySectionSkeleton = () => {
  return (
    <div className="group cursor-pointer relative aspect-[4/3] bg-gray-900 overflow-hidden rounded-sm animate-pulse">
      <div className="w-full h-full bg-gray-200" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
      <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
        <div className="flex-1">
          <div className="h-3 bg-gray-300 rounded w-20 mb-2" />
          <div className="h-5 bg-gray-300 rounded w-32" />
        </div>
        <div className="bg-gray-300 rounded-full px-3 py-1 w-16 h-6" />
      </div>
    </div>
  );
};

export default GallerySectionSkeleton;

