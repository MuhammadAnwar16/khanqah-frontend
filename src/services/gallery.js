/**
 * Gallery API Service
 * Encapsulates all API calls related to gallery collections
 */
import { api } from './api';
import { API_BASE_URL } from '../config/api';

/**
 * Get all gallery collections
 * @param {string} language - Language code ('urdu' or 'english')
 * @returns {Promise<Array>} Array of gallery collection objects with formatted data
 */
export const getGalleryCollections = async (language = 'english') => {
  try {
    const data = await api.get('/api/gallery/');
    
    // Format data for use in components
    const formatted = Array.isArray(data) ? data.map((collection) => ({
      id: collection.id,
      name: language === 'urdu' ? collection.name_ur : collection.name_en,
      name_en: collection.name_en,
      name_ur: collection.name_ur,
      images: collection.images?.map((img) => {
        const imageUrl = img.image?.startsWith('http') 
          ? img.image 
          : `${API_BASE_URL}${img.image}`;
        return imageUrl;
      }) || [],
    })) : [];
    
    return formatted;
  } catch (error) {
    console.error('Error fetching gallery collections:', error);
    throw error;
  }
};

/**
 * Get a single gallery collection by ID
 * @param {number} id - Collection ID
 * @param {string} language - Language code
 * @returns {Promise<Object>} Gallery collection object
 */
export const getGalleryCollectionById = async (id, language = 'english') => {
  try {
    const data = await api.get(`/api/gallery/${id}/`);
    
    return {
      id: data.id,
      name: language === 'urdu' ? data.name_ur : data.name_en,
      name_en: data.name_en,
      name_ur: data.name_ur,
      images: data.images?.map((img) => {
        const imageUrl = img.image?.startsWith('http') 
          ? img.image 
          : `${API_BASE_URL}${img.image}`;
        return imageUrl;
      }) || [],
    };
  } catch (error) {
    console.error(`Error fetching gallery collection ${id}:`, error);
    throw error;
  }
};

export default {
  getGalleryCollections,
  getGalleryCollectionById,
};

