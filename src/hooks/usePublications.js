/**
 * Custom hook for publications data fetching
 * Encapsulates publications-specific API logic
 */
import { useState, useEffect } from 'react';
import { getPublications, getPublicationById } from '../services/publications';

/**
 * Hook to fetch all publications
 * @param {Object} options - Hook options
 * @param {boolean} options.immediate - Fetch immediately on mount (default: true)
 * @param {Function} options.onSuccess - Success callback
 * @param {Function} options.onError - Error callback
 * @returns {Object} { publications, loading, error, refetch }
 */
export const usePublications = (options = {}) => {
  const { immediate = true, onSuccess = null, onError = null } = options;
  
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const fetchPublications = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPublications();
      setPublications(Array.isArray(data) ? data : []);
      if (onSuccess) onSuccess(data);
    } catch (err) {
      console.error('Error fetching publications:', err);
      setError(err);
      setPublications([]);
      if (onError) onError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate) {
      fetchPublications();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [immediate]);

  const refetch = () => {
    fetchPublications();
  };

  return {
    publications,
    loading,
    error,
    refetch,
  };
};

/**
 * Hook to fetch a single publication by ID
 * @param {number} id - Publication ID
 * @param {Object} options - Hook options
 * @param {boolean} options.immediate - Fetch immediately (default: true)
 * @param {Function} options.onSuccess - Success callback
 * @param {Function} options.onError - Error callback
 * @returns {Object} { publication, loading, error, refetch }
 */
export const usePublication = (id, options = {}) => {
  const { immediate = true, onSuccess = null, onError = null } = options;
  
  const [publication, setPublication] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const fetchPublication = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await getPublicationById(id);
      setPublication(data);
      if (onSuccess) onSuccess(data);
    } catch (err) {
      console.error(`Error fetching publication ${id}:`, err);
      setError(err);
      setPublication(null);
      if (onError) onError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate && id) {
      fetchPublication();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, immediate]);

  const refetch = () => {
    fetchPublication();
  };

  return {
    publication,
    loading,
    error,
    refetch,
  };
};

export default usePublications;

