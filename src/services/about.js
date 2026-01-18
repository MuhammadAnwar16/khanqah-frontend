/**
 * About API Service
 * Encapsulates all API calls related to about sections, current/previous Nasheens
 */
import { api } from './api';

/**
 * Get all about sections
 * @returns {Promise<Array>} Array of about section objects
 */
export const getAboutSections = async () => {
  try {
    const data = await api.get('/api/about/sections/');
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching about sections:', error);
    throw error;
  }
};

/**
 * Get current Nasheen
 * @returns {Promise<Object|null>} Current Nasheen object
 */
export const getCurrentNasheen = async () => {
  try {
    const data = await api.get('/api/about/current-nasheen/');
    return data;
  } catch (error) {
    console.error('Error fetching current Nasheen:', error);
    // Return null if endpoint doesn't exist or returns 404
    if (error.response?.status === 404) {
      return null;
    }
    throw error;
  }
};

/**
 * Get previous Nasheens (lineage tree)
 * @returns {Promise<Array>} Array of previous Nasheen objects
 */
export const getPreviousNasheens = async () => {
  try {
    const data = await api.get('/api/about/previous-nasheen/');
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching previous Nasheens:', error);
    // Return empty array if endpoint doesn't exist or returns 404
    if (error.response?.status === 404) {
      return [];
    }
    throw error;
  }
};

export default {
  getAboutSections,
  getCurrentNasheen,
  getPreviousNasheens,
};

