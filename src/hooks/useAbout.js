/**
 * Custom hook for about sections and Nasheens data fetching
 * Encapsulates about-specific API logic
 */
import { useState, useEffect } from 'react';
import { getAboutSections, getCurrentNasheen, getPreviousNasheens } from '../services/about';

/**
 * Hook to fetch all about sections
 * @param {Object} options - Hook options
 * @param {boolean} options.immediate - Fetch immediately on mount (default: true)
 * @returns {Object} { sections, loading, error, refetch }
 */
export const useAboutSections = (options = {}) => {
  const { immediate = true } = options;
  
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const fetchSections = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAboutSections();
      setSections(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching about sections:', err);
      setError(err);
      setSections([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate) {
      fetchSections();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [immediate]);

  const refetch = () => {
    fetchSections();
  };

  return {
    sections,
    loading,
    error,
    refetch,
  };
};

/**
 * Hook to fetch current Nasheen
 * @param {Object} options - Hook options
 * @param {boolean} options.immediate - Fetch immediately on mount (default: true)
 * @returns {Object} { currentNasheen, loading, error, refetch }
 */
export const useCurrentNasheen = (options = {}) => {
  const { immediate = true } = options;
  
  const [currentNasheen, setCurrentNasheen] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const fetchCurrentNasheen = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCurrentNasheen();
      setCurrentNasheen(data);
    } catch (err) {
      console.error('Error fetching current Nasheen:', err);
      setError(err);
      setCurrentNasheen(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate) {
      fetchCurrentNasheen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [immediate]);

  const refetch = () => {
    fetchCurrentNasheen();
  };

  return {
    currentNasheen,
    loading,
    error,
    refetch,
  };
};

/**
 * Hook to fetch previous Nasheens (lineage tree)
 * @param {Object} options - Hook options
 * @param {boolean} options.immediate - Fetch immediately on mount (default: true)
 * @returns {Object} { previousNasheens, loading, error, refetch }
 */
export const usePreviousNasheens = (options = {}) => {
  const { immediate = true } = options;
  
  const [previousNasheens, setPreviousNasheens] = useState([]);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const fetchPreviousNasheens = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPreviousNasheens();
      setPreviousNasheens(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching previous Nasheens:', err);
      setError(err);
      setPreviousNasheens([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate) {
      fetchPreviousNasheens();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [immediate]);

  const refetch = () => {
    fetchPreviousNasheens();
  };

  return {
    previousNasheens,
    loading,
    error,
    refetch,
  };
};

/**
 * Hook to fetch both current and previous Nasheens together
 * @param {Object} options - Hook options
 * @param {boolean} options.immediate - Fetch immediately on mount (default: true)
 * @returns {Object} { currentNasheen, previousNasheens, loading, error, refetch }
 */
export const useNasheens = (options = {}) => {
  const { immediate = true } = options;
  
  const [currentNasheen, setCurrentNasheen] = useState(null);
  const [previousNasheens, setPreviousNasheens] = useState([]);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const fetchNasheens = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch both in parallel
      const [current, previous] = await Promise.all([
        getCurrentNasheen(),
        getPreviousNasheens(),
      ]);
      
      setCurrentNasheen(current);
      setPreviousNasheens(Array.isArray(previous) ? previous : []);
    } catch (err) {
      console.error('Error fetching Nasheens:', err);
      setError(err);
      setCurrentNasheen(null);
      setPreviousNasheens([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate) {
      fetchNasheens();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [immediate]);

  const refetch = () => {
    fetchNasheens();
  };

  return {
    currentNasheen,
    previousNasheens,
    loading,
    error,
    refetch,
  };
};

export default useNasheens;

