/**
 * Utility functions for user-friendly error messages
 * Provides consistent, bilingual error messages for API errors
 */

export const getErrorMessage = (error, language = 'urdu') => {
  const isUrdu = language === 'urdu';
  
  // If error has a message property
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  
  // If error has a status property
  if (error?.response?.status) {
    const status = error.response.status;
    
    switch (status) {
      case 400:
        return isUrdu ? 'غلط درخواست۔ براہ کرم اپنی معلومات چیک کریں۔' : 'Bad request. Please check your input.';
      case 401:
        return isUrdu ? 'آپ کو داخل ہونے کی ضرورت ہے۔' : 'You need to be logged in.';
      case 403:
        return isUrdu ? 'آپ کو اس کام کے لیے اجازت نہیں ہے۔' : 'You don\'t have permission for this action.';
      case 404:
        return isUrdu ? 'صفحہ نہیں ملا۔' : 'Page not found.';
      case 429:
        return isUrdu ? 'بہت زیادہ درخواستیں۔ براہ کرم تھوڑی دیر بعد دوبارہ کوشش کریں۔' : 'Too many requests. Please try again later.';
      case 500:
        return isUrdu ? 'سرور خرابی۔ براہ کرم بعد میں دوبارہ کوشش کریں۔' : 'Server error. Please try again later.';
      case 503:
        return isUrdu ? 'سروس عارضی طور پر دستیاب نہیں ہے۔' : 'Service temporarily unavailable.';
      default:
        return isUrdu ? 'ایک خرابی پیش آگئی۔ براہ کرم دوبارہ کوشش کریں۔' : 'An error occurred. Please try again.';
    }
  }
  
  // Network errors
  if (error?.message?.includes('Network') || !error?.response) {
    return isUrdu 
      ? 'نیٹ ورک خرابی۔ براہ کرم اپنا انٹرنیٹ کنکشن چیک کریں۔'
      : 'Network error. Please check your internet connection.';
  }
  
  // Generic error
  return isUrdu 
    ? 'ایک غیر متوقع خرابی پیش آگئی۔ براہ کرم دوبارہ کوشش کریں۔'
    : 'An unexpected error occurred. Please try again.';
};

/**
 * Extract validation errors from API response
 * Returns formatted error message with field-specific errors
 */
export const getValidationErrors = (error, language = 'urdu') => {
  const isUrdu = language === 'urdu';
  
  if (!error?.response?.data?.errors) {
    return null;
  }
  
  const errors = error.response.data.errors;
  const errorMessages = [];
  
  // Handle field-specific errors
  Object.keys(errors).forEach((field) => {
    const fieldErrors = Array.isArray(errors[field]) ? errors[field] : [errors[field]];
    fieldErrors.forEach((msg) => {
      errorMessages.push(`${field}: ${msg}`);
    });
  });
  
  if (errorMessages.length > 0) {
    return errorMessages.join('\n');
  }
  
  return null;
};

/**
 * Get a user-friendly message for contact form errors
 */
export const getContactFormError = (error, language = 'urdu') => {
  const isUrdu = language === 'urdu';
  
  // Check for specific field errors
  if (error?.response?.data?.errors) {
    const errors = error.response.data.errors;
    
    // Email errors
    if (errors.email) {
      return isUrdu 
        ? 'براہ کرم ایک درست ای میل ایڈریس درج کریں۔'
        : 'Please enter a valid email address.';
    }
    
    // Phone errors
    if (errors.phone_number) {
      return isUrdu 
        ? 'براہ کرم ایک درست فون نمبر درج کریں۔'
        : 'Please enter a valid phone number.';
    }
    
    // Name errors
    if (errors.name) {
      return isUrdu 
        ? 'براہ کرم اپنا نام درج کریں۔'
        : 'Please enter your name.';
    }
  }
  
  // Use general error message
  return getErrorMessage(error, language);
};

