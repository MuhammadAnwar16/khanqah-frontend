/**
 * Photos API Service
 * Encapsulates all API calls related to photo collections
 */
import { api } from './api';

/**
 * Get all photo collections
 * @returns {Promise<Array>} Array of photo collection objects
 */
export const getPhotoCollections = async () => {
  try {
    const data = await api.get('/api/photos/collections/');
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching photo collections:', error);
    throw error;
  }
};

/**
 * Get a single photo collection by ID
 * @param {number} id - Collection ID
 * @returns {Promise<Object>} Photo collection object
 */
export const getPhotoCollectionById = async (id) => {
  try {
    const data = await api.get(`/api/photos/collections/${id}/`);
    return data;
  } catch (error) {
    console.error(`Error fetching photo collection ${id}:`, error);
    throw error;
  }
};

/**
 * Get all photos in a collection
 * @param {number} collectionId - Collection ID
 * @returns {Promise<Array>} Array of photo objects
 */
export const getPhotosByCollection = async (collectionId) => {
  try {
    const data = await api.get(`/api/photos/collections/${collectionId}/photos/`);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error(`Error fetching photos for collection ${collectionId}:`, error);
    throw error;
  }
};

export default {
  getPhotoCollections,
  getPhotoCollectionById,
  getPhotosByCollection,
};

