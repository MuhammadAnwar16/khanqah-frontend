import React from 'react';

const MediaSkeleton = ({ isVideo = true }) => {
  return (
    <div className="group cursor-pointer animate-pulse">
      <div className="relative aspect-video bg-gray-200 overflow-hidden mb-4">
        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-gray-300 rounded-full" />
          </div>
        )}
        {!isVideo && (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#f0f0f0]">
            <div className="w-8 h-8 bg-gray-300 rounded-full mb-3" />
            <div className="w-8 h-[1px] bg-gray-300" />
          </div>
        )}
      </div>
      <div className="pr-2">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-3 bg-gray-200 rounded w-16" />
          <div className="w-1 h-1 bg-gray-200 rounded-full" />
          <div className="h-3 bg-gray-200 rounded w-20" />
        </div>
        <div className="h-5 bg-gray-200 rounded w-3/4" />
      </div>
    </div>
  );
};

export default MediaSkeleton;

