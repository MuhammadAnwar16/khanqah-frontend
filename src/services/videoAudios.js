/**
 * Video & Audio API Service
 * Encapsulates all API calls related to video and audio media
 */
import { api } from './api';

/**
 * Get all videos
 * @returns {Promise<Array>} Array of video objects
 */
export const getVideos = async () => {
  try {
    const data = await api.get('/api/video-audios/videos/');
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw error;
  }
};

/**
 * Get all audios
 * @returns {Promise<Array>} Array of audio objects
 */
export const getAudios = async () => {
  try {
    const data = await api.get('/api/video-audios/audios/');
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching audios:', error);
    throw error;
  }
};

/**
 * Get a single video by ID
 * @param {number} id - Video ID
 * @returns {Promise<Object>} Video object
 */
export const getVideoById = async (id) => {
  try {
    const data = await api.get(`/api/video-audios/videos/${id}/`);
    return data;
  } catch (error) {
    console.error(`Error fetching video ${id}:`, error);
    throw error;
  }
};

/**
 * Get a single audio by ID
 * @param {number} id - Audio ID
 * @returns {Promise<Object>} Audio object
 */
export const getAudioById = async (id) => {
  try {
    const data = await api.get(`/api/video-audios/audios/${id}/`);
    return data;
  } catch (error) {
    console.error(`Error fetching audio ${id}:`, error);
    throw error;
  }
};

export default {
  getVideos,
  getAudios,
  getVideoById,
  getAudioById,
};

