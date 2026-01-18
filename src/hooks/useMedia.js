/**
 * Custom hook for video and audio media data fetching
 * Encapsulates media-specific API logic
 */
import { useState, useEffect } from 'react';
import { getVideos, getAudios, getVideoById, getAudioById } from '../services/videoAudios';

/**
 * Hook to fetch all videos
 * @param {Object} options - Hook options
 * @param {boolean} options.immediate - Fetch immediately on mount (default: true)
 * @param {Function} options.onSuccess - Success callback
 * @param {Function} options.onError - Error callback
 * @returns {Object} { videos, loading, error, refetch }
 */
export const useVideos = (options = {}) => {
  const { immediate = true, onSuccess = null, onError = null } = options;
  
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getVideos();
      setVideos(Array.isArray(data) ? data : []);
      if (onSuccess) onSuccess(data);
    } catch (err) {
      console.error('Error fetching videos:', err);
      setError(err);
      setVideos([]);
      if (onError) onError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate) {
      fetchVideos();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [immediate]);

  const refetch = () => {
    fetchVideos();
  };

  return {
    videos,
    loading,
    error,
    refetch,
  };
};

/**
 * Hook to fetch all audios
 * @param {Object} options - Hook options
 * @param {boolean} options.immediate - Fetch immediately on mount (default: true)
 * @param {Function} options.onSuccess - Success callback
 * @param {Function} options.onError - Error callback
 * @returns {Object} { audios, loading, error, refetch }
 */
export const useAudios = (options = {}) => {
  const { immediate = true, onSuccess = null, onError = null } = options;
  
  const [audios, setAudios] = useState([]);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const fetchAudios = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAudios();
      setAudios(Array.isArray(data) ? data : []);
      if (onSuccess) onSuccess(data);
    } catch (err) {
      console.error('Error fetching audios:', err);
      setError(err);
      setAudios([]);
      if (onError) onError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate) {
      fetchAudios();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [immediate]);

  const refetch = () => {
    fetchAudios();
  };

  return {
    audios,
    loading,
    error,
    refetch,
  };
};

/**
 * Hook to fetch a single video by ID
 * @param {number} id - Video ID
 * @param {Object} options - Hook options
 * @param {boolean} options.immediate - Fetch immediately (default: true)
 * @returns {Object} { video, loading, error, refetch }
 */
export const useVideo = (id, options = {}) => {
  const { immediate = true } = options;
  
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const fetchVideo = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await getVideoById(id);
      setVideo(data);
    } catch (err) {
      console.error(`Error fetching video ${id}:`, err);
      setError(err);
      setVideo(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate && id) {
      fetchVideo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, immediate]);

  const refetch = () => {
    fetchVideo();
  };

  return {
    video,
    loading,
    error,
    refetch,
  };
};

/**
 * Hook to fetch a single audio by ID
 * @param {number} id - Audio ID
 * @param {Object} options - Hook options
 * @param {boolean} options.immediate - Fetch immediately (default: true)
 * @returns {Object} { audio, loading, error, refetch }
 */
export const useAudio = (id, options = {}) => {
  const { immediate = true } = options;
  
  const [audio, setAudio] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const fetchAudio = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await getAudioById(id);
      setAudio(data);
    } catch (err) {
      console.error(`Error fetching audio ${id}:`, err);
      setError(err);
      setAudio(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate && id) {
      fetchAudio();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, immediate]);

  const refetch = () => {
    fetchAudio();
  };

  return {
    audio,
    loading,
    error,
    refetch,
  };
};

export default useVideos;

