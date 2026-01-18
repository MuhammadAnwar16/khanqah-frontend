import { api } from './api';

/**
 * Events Service
 * Handles API calls for events
 */

/**
 * Get all active events
 * @returns {Promise<Array>} List of events
 */
export const getEvents = async () => {
  try {
    const data = await api.get('/api/events/events/');
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

/**
 * Get a single event by ID
 * @param {number} id - Event ID
 * @returns {Promise<Object>} Event object
 */
export const getEvent = async (id) => {
  try {
    const data = await api.get(`/api/events/events/${id}/`);
    return data;
  } catch (error) {
    console.error(`Error fetching event ${id}:`, error);
    throw error;
  }
};

