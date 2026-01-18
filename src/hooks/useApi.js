import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import { retryWithBackoff } from '../utils/apiRetry';

/**
 * Custom hook for API data fetching with loading and error states
 * Includes automatic retry logic for failed requests
 * @param {string} url - API endpoint URL
 * @param {Object} options - Fetch options (method, body, dependencies, etc.)
 * @param {boolean} options.retry - Enable retry logic (default: true)
 * @param {number} options.maxRetries - Maximum retry attempts (default: 3)
 * @returns {Object} { data, loading, error, refetch }
 */
export function useApi(url, options = {}) {
  const {
    method = 'GET',
    body = null,
    dependencies = [],
    immediate = true,
    onSuccess = null,
    onError = null,
    retry = true,
    maxRetries = 3,
  } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const apiCall = async () => {
        switch (method.toUpperCase()) {
          case 'GET':
            return await api.get(url);
          case 'POST':
            return await api.post(url, body);
          case 'PUT':
            return await api.put(url, body);
          case 'DELETE':
            return await api.delete(url);
          default:
            throw new Error(`Unsupported HTTP method: ${method}`);
        }
      };

      // Use retry logic if enabled (for GET requests by default)
      const result = retry && method.toUpperCase() === 'GET'
        ? await retryWithBackoff(apiCall, { maxRetries })
        : await apiCall();

      setData(result);
      if (onSuccess) onSuccess(result);
    } catch (err) {
      setError(err);
      if (onError) onError(err);
    } finally {
      setLoading(false);
    }
  }, [url, method, body, onSuccess, onError, retry, maxRetries]);

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, [immediate, ...dependencies]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch,
  };
}

