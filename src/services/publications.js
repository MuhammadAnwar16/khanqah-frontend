/**
 * Publications API Service
 * Encapsulates all API calls related to publications
 */
import { api } from './api';

/**
 * Get all publications
 * @returns {Promise<Array>} Array of publication objects
 */
export const getPublications = async () => {
  try {
    const data = await api.get('/api/publications/publications/');
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching publications:', error);
    throw error;
  }
};

/**
 * Get a single publication by ID
 * @param {number} id - Publication ID
 * @returns {Promise<Object>} Publication object
 */
export const getPublicationById = async (id) => {
  try {
    const data = await api.get(`/api/publications/publications/${id}/`);
    return data;
  } catch (error) {
    console.error(`Error fetching publication ${id}:`, error);
    throw error;
  }
};

export default {
  getPublications,
  getPublicationById,
};

