/**
 * Custom hook for photo collections data fetching
 * Encapsulates photos-specific API logic
 */
import { useState, useEffect } from 'react';
import { getPhotoCollections, getPhotoCollectionById, getPhotosByCollection } from '../services/photos';

/**
 * Hook to fetch all photo collections
 * @param {Object} options - Hook options
 * @param {boolean} options.immediate - Fetch immediately on mount (default: true)
 * @param {Function} options.onSuccess - Success callback
 * @param {Function} options.onError - Error callback
 * @returns {Object} { collections, loading, error, refetch }
 */
export const usePhotoCollections = (options = {}) => {
  const { immediate = true, onSuccess = null, onError = null } = options;
  
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const fetchCollections = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPhotoCollections();
      setCollections(Array.isArray(data) ? data : []);
      if (onSuccess) onSuccess(data);
    } catch (err) {
      console.error('Error fetching photo collections:', err);
      setError(err);
      setCollections([]);
      if (onError) onError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate) {
      fetchCollections();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [immediate]);

  const refetch = () => {
    fetchCollections();
  };

  return {
    collections,
    loading,
    error,
    refetch,
  };
};

/**
 * Hook to fetch a single photo collection by ID
 * @param {number} id - Collection ID
 * @param {Object} options - Hook options
 * @param {boolean} options.immediate - Fetch immediately (default: true)
 * @param {Function} options.onSuccess - Success callback
 * @param {Function} options.onError - Error callback
 * @returns {Object} { collection, loading, error, refetch }
 */
export const usePhotoCollection = (id, options = {}) => {
  const { immediate = true, onSuccess = null, onError = null } = options;
  
  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const fetchCollection = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await getPhotoCollectionById(id);
      setCollection(data);
      if (onSuccess) onSuccess(data);
    } catch (err) {
      console.error(`Error fetching photo collection ${id}:`, err);
      setError(err);
      setCollection(null);
      if (onError) onError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate && id) {
      fetchCollection();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, immediate]);

  const refetch = () => {
    fetchCollection();
  };

  return {
    collection,
    loading,
    error,
    refetch,
  };
};

/**
 * Hook to fetch photos in a collection
 * @param {number} collectionId - Collection ID
 * @param {Object} options - Hook options
 * @param {boolean} options.immediate - Fetch immediately (default: true)
 * @param {Function} options.onSuccess - Success callback
 * @param {Function} options.onError - Error callback
 * @returns {Object} { photos, loading, error, refetch }
 */
export const usePhotos = (collectionId, options = {}) => {
  const { immediate = true, onSuccess = null, onError = null } = options;
  
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const fetchPhotos = async () => {
    if (!collectionId) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await getPhotosByCollection(collectionId);
      setPhotos(Array.isArray(data) ? data : []);
      if (onSuccess) onSuccess(data);
    } catch (err) {
      console.error(`Error fetching photos for collection ${collectionId}:`, err);
      setError(err);
      setPhotos([]);
      if (onError) onError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate && collectionId) {
      fetchPhotos();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionId, immediate]);

  const refetch = () => {
    fetchPhotos();
  };

  return {
    photos,
    loading,
    error,
    refetch,
  };
};

export default usePhotoCollections;

