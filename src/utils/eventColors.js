/**
 * Event Color Utility
 * Maps event priorities to colors for visual distinction
 */

/**
 * Get color class based on priority
 * @param {string} priority - Event priority (high, medium, low, default)
 * @returns {string} Tailwind CSS color class
 */
export const getPriorityColor = (priority) => {
  const colorMap = {
    high: 'red-500',      // Red for high priority
    medium: 'blue-500',   // Blue for medium priority
    low: 'green-500',     // Green for low priority
    default: 'blue-400',  // Default blue
  };
  
  return colorMap[priority] || colorMap.default;
};

/**
 * Get border color class based on priority
 * @param {string} priority - Event priority
 * @returns {string} Tailwind CSS border color class
 */
export const getPriorityBorderColor = (priority) => {
  const colorMap = {
    high: 'border-red-400',
    medium: 'border-blue-400',
    low: 'border-green-400',
    default: 'border-blue-400',
  };
  
  return colorMap[priority] || colorMap.default;
};

/**
 * Get background color class based on priority
 * @param {string} priority - Event priority
 * @returns {string} Tailwind CSS background color class
 */
export const getPriorityBgColor = (priority) => {
  const colorMap = {
    high: 'bg-red-500',
    medium: 'bg-blue-500',
    low: 'bg-green-500',
    default: 'bg-blue-500',
  };
  
  return colorMap[priority] || colorMap.default;
};

