/**
 * Custom hook for gallery data fetching
 * Encapsulates gallery-specific API logic
 */
import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getGalleryCollections, getGalleryCollectionById } from '../services/gallery';

/**
 * Hook to fetch all gallery collections
 * @param {Object} options - Hook options
 * @param {boolean} options.immediate - Fetch immediately on mount (default: true)
 * @param {Function} options.onSuccess - Success callback
 * @param {Function} options.onError - Error callback
 * @returns {Object} { collections, loading, error, refetch }
 */
export const useGalleryCollections = (options = {}) => {
  const { immediate = true, onSuccess = null, onError = null } = options;
  const { language } = useLanguage();
  
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const fetchCollections = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getGalleryCollections(language);
      setCollections(Array.isArray(data) ? data : []);
      if (onSuccess) onSuccess(data);
    } catch (err) {
      console.error('Error fetching gallery collections:', err);
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
  }, [language, immediate]);

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
 * Hook to fetch a single gallery collection by ID
 * @param {number} id - Collection ID
 * @param {Object} options - Hook options
 * @param {boolean} options.immediate - Fetch immediately (default: true)
 * @param {Function} options.onSuccess - Success callback
 * @param {Function} options.onError - Error callback
 * @returns {Object} { collection, loading, error, refetch }
 */
export const useGalleryCollection = (id, options = {}) => {
  const { immediate = true, onSuccess = null, onError = null } = options;
  const { language } = useLanguage();
  
  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const fetchCollection = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await getGalleryCollectionById(id, language);
      setCollection(data);
      if (onSuccess) onSuccess(data);
    } catch (err) {
      console.error(`Error fetching gallery collection ${id}:`, err);
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
  }, [id, language, immediate]);

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

export default useGalleryCollections;

