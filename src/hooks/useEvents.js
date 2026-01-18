/**
 * Custom hook for events data fetching
 * Encapsulates events-specific API logic
 */
import { useState, useEffect } from 'react';
import { getEvents, getEvent } from '../services/events';

/**
 * Hook to fetch all events
 * @param {Object} options - Hook options
 * @param {boolean} options.immediate - Fetch immediately on mount (default: true)
 * @param {Function} options.onSuccess - Success callback
 * @param {Function} options.onError - Error callback
 * @returns {Object} { events, loading, error, refetch }
 */
export const useEvents = (options = {}) => {
  const { immediate = true, onSuccess = null, onError = null } = options;
  
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getEvents();
      setEvents(Array.isArray(data) ? data : []);
      if (onSuccess) onSuccess(data);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError(err);
      setEvents([]);
      if (onError) onError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate) {
      fetchEvents();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [immediate]);

  const refetch = () => {
    fetchEvents();
  };

  return {
    events,
    loading,
    error,
    refetch,
  };
};

/**
 * Hook to fetch a single event by ID
 * @param {number} id - Event ID
 * @param {Object} options - Hook options
 * @param {boolean} options.immediate - Fetch immediately (default: true)
 * @param {Function} options.onSuccess - Success callback
 * @param {Function} options.onError - Error callback
 * @returns {Object} { event, loading, error, refetch }
 */
export const useEvent = (id, options = {}) => {
  const { immediate = true, onSuccess = null, onError = null } = options;
  
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const fetchEvent = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await getEvent(id);
      setEvent(data);
      if (onSuccess) onSuccess(data);
    } catch (err) {
      console.error(`Error fetching event ${id}:`, err);
      setError(err);
      setEvent(null);
      if (onError) onError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate && id) {
      fetchEvent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, immediate]);

  const refetch = () => {
    fetchEvent();
  };

  return {
    event,
    loading,
    error,
    refetch,
  };
};

export default useEvents;

