/**
 * Retry utility for API calls
 * Automatically retries failed requests with exponential backoff
 */

const DEFAULT_MAX_RETRIES = 3;
const DEFAULT_RETRY_DELAY = 1000; // 1 second
const DEFAULT_RETRYABLE_STATUS_CODES = [408, 429, 500, 502, 503, 504];

/**
 * Check if an error is retryable
 * Network errors and certain HTTP status codes are retryable
 */
export const isRetryableError = (error) => {
  // Network errors (no response from server) are retryable
  if (!error.response) {
    return true;
  }

  // Certain HTTP status codes are retryable
  const status = error.response?.status;
  return status && DEFAULT_RETRYABLE_STATUS_CODES.includes(status);
};

/**
 * Calculate delay before retry using exponential backoff
 * @param {number} attemptNumber - Current attempt (0-indexed)
 * @param {number} baseDelay - Base delay in milliseconds
 * @returns {number} Delay in milliseconds
 */
export const calculateRetryDelay = (attemptNumber, baseDelay = DEFAULT_RETRY_DELAY) => {
  // Exponential backoff: delay = baseDelay * 2^attemptNumber
  // Add jitter to prevent thundering herd problem
  const exponentialDelay = baseDelay * Math.pow(2, attemptNumber);
  const jitter = Math.random() * 0.3 * exponentialDelay; // Up to 30% jitter
  return exponentialDelay + jitter;
};

/**
 * Wait for specified time
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise}
 */
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Retry a function with exponential backoff
 * @param {Function} fn - Function to retry (should return a Promise)
 * @param {Object} options - Retry options
 * @param {number} options.maxRetries - Maximum number of retries
 * @param {number} options.retryDelay - Base delay between retries
 * @param {Function} options.shouldRetry - Function to determine if error is retryable
 * @returns {Promise} Result of the function
 */
export const retryWithBackoff = async (fn, options = {}) => {
  const {
    maxRetries = DEFAULT_MAX_RETRIES,
    retryDelay = DEFAULT_RETRY_DELAY,
    shouldRetry = isRetryableError,
  } = options;

  let lastError;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      // Don't retry if we've reached max retries
      if (attempt >= maxRetries) {
        break;
      }

      // Don't retry if error is not retryable
      if (!shouldRetry(error)) {
        break;
      }

      // Calculate delay and wait before retry
      const delay = calculateRetryDelay(attempt, retryDelay);
      await wait(delay);
    }
  }

  // If we get here, all retries failed
  throw lastError;
};

