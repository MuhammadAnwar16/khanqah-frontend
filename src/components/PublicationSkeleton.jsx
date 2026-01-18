import React from 'react';

const PublicationSkeleton = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-6 items-start animate-pulse">
      {/* Book Cover Skeleton */}
      <div className="w-full sm:w-32 h-48 bg-gray-200 rounded-md flex-shrink-0" />
      
      {/* Info Skeleton */}
      <div className="flex-1 pt-1 min-w-0 w-full space-y-3">
        <div className="h-3 bg-gray-200 rounded w-1/4" />
        <div className="h-6 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
        
        {/* Buttons Skeleton */}
        <div className="flex gap-3 mt-6">
          <div className="h-8 bg-gray-200 rounded-full w-24" />
          <div className="h-8 bg-gray-200 rounded-full w-28" />
        </div>
      </div>
    </div>
  );
};

export default PublicationSkeleton;

