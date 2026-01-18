/**
 * Contact API Service
 * Encapsulates all API calls related to contact form
 */
import { apiUrl } from '../config/api';

/**
 * Send contact message
 * @param {Object} formData - Contact form data
 * @param {string} formData.name - Sender name
 * @param {string} formData.email - Sender email
 * @param {string} formData.phone_number - Sender phone number (optional)
 * @param {string} formData.subject - Message subject
 * @param {string} formData.message - Message content
 * @returns {Promise<Object>} Response data with status and message
 */
export const sendContactMessage = async (formData) => {
  try {
    const response = await fetch(apiUrl('/contact/send-message/'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      // Handle error responses
      if (response.status === 429) {
        throw new Error('TOO_MANY_REQUESTS');
      }
      
      const errorMessage = data.errors 
        ? Object.values(data.errors).flat().join(', ')
        : (data.message || 'Failed to send message');
      
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error('Error sending contact message:', error);
    throw error;
  }
};

export default {
  sendContactMessage,
};

