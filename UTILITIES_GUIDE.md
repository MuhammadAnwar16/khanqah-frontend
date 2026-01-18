# Frontend Utilities Guide

This guide covers the utility functions and components available for use throughout the Khanqah website.

---

## 🔄 API Retry Utility (`utils/apiRetry.js`)

Automatic retry logic for failed API requests with exponential backoff.

### Features
- Automatic retry for network errors and server errors (500, 502, 503, 504, 429)
- Exponential backoff with jitter to prevent thundering herd
- Configurable max retries and delays

### Usage

**In useApi hook (automatic)**:
```javascript
import { useApi } from '../hooks/useApi';

// Automatically retries GET requests (default)
const { data, loading, error } = useApi('/api/publications/');

// Disable retry
const { data } = useApi('/api/publications/', { retry: false });

// Custom max retries
const { data } = useApi('/api/publications/', { maxRetries: 5 });
```

**Manual retry**:
```javascript
import { retryWithBackoff, isRetryableError } from '../utils/apiRetry';

const fetchData = async () => {
  const result = await retryWithBackoff(
    async () => {
      return await api.get('/api/publications/');
    },
    {
      maxRetries: 3,
      retryDelay: 1000,
      shouldRetry: (error) => isRetryableError(error),
    }
  );
};
```

---

## 💬 Error Messages Utility (`utils/errorMessages.js`)

Centralized, bilingual error message handling for consistent user feedback.

### Features
- Bilingual error messages (Urdu/English)
- User-friendly messages for common errors
- Validation error extraction
- Network error handling

### Usage

**Basic error message**:
```javascript
import { getErrorMessage } from '../utils/errorMessages';
import { useLanguage } from '../context/LanguageContext';

const { language } = useLanguage();

try {
  await api.post('/contact/send-message/', formData);
} catch (error) {
  const message = getErrorMessage(error, language);
  // message: "Network error. Please check your internet connection."
  // or: "نیٹ ورک خرابی۔ براہ کرم اپنا انٹرنیٹ کنکشن چیک کریں۔"
}
```

**Validation errors**:
```javascript
import { getValidationErrors } from '../utils/errorMessages';

try {
  await api.post('/contact/send-message/', formData);
} catch (error) {
  const validationErrors = getValidationErrors(error, language);
  // Returns: "email: This field is required.\nname: This field is required."
}
```

**Contact form specific errors**:
```javascript
import { getContactFormError } from '../utils/errorMessages';

try {
  await api.post('/contact/send-message/', formData);
} catch (error) {
  const message = getContactFormError(error, language);
  // Provides field-specific error messages
}
```

### Error Codes Supported
- **400**: Bad Request
- **401**: Unauthorized
- **403**: Forbidden
- **404**: Not Found
- **429**: Too Many Requests
- **500**: Server Error
- **503**: Service Unavailable
- **Network Errors**: Connection issues

---

## 🖼️ LazyImage Component (`components/LazyImage.jsx`)

Image component with built-in error handling and loading states.

### Features
- Automatic lazy loading
- Error handling with fallback
- Loading state with skeleton
- Customizable fallback UI

### Usage

**Basic usage**:
```javascript
import LazyImage from '../components/LazyImage';

<LazyImage
  src="/images/photo.jpg"
  alt="Description"
  className="w-full h-64 object-cover"
/>
```

**With custom fallback**:
```javascript
<LazyImage
  src="/images/photo.jpg"
  alt="Description"
  className="w-full h-64"
  fallback={
    <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
      <span>Image not available</span>
    </div>
  }
/>
```

**With error handler**:
```javascript
<LazyImage
  src="/images/photo.jpg"
  alt="Description"
  className="w-full h-64"
  onError={(e) => {
    console.error('Image failed to load:', e);
    // Custom error handling
  }}
/>
```

---

## 🔄 useApi Hook (`hooks/useApi.js`)

Custom hook for API data fetching with loading, error states, and retry logic.

### Features
- Automatic loading state management
- Error state handling
- Automatic retry for GET requests
- Manual refetch capability
- Success/error callbacks

### Usage

**Basic GET request**:
```javascript
import { useApi } from '../hooks/useApi';

const Publications = () => {
  const { data, loading, error, refetch } = useApi('/api/publications/');
  
  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;
  
  return <PublicationsList data={data} />;
};
```

**With options**:
```javascript
const { data, loading, error } = useApi('/api/publications/', {
  method: 'GET',
  retry: true,        // Enable retry (default: true for GET)
  maxRetries: 3,      // Max retries (default: 3)
  immediate: true,    // Fetch on mount (default: true)
  onSuccess: (data) => {
    console.log('Data loaded:', data);
  },
  onError: (error) => {
    console.error('Error:', error);
  },
  dependencies: [language], // Refetch when dependencies change
});
```

**POST request (no retry by default)**:
```javascript
const { data, loading, error, refetch } = useApi('/contact/send-message/', {
  method: 'POST',
  body: formData,
  retry: false, // POST requests don't retry by default
});
```

**Manual refetch**:
```javascript
const { data, loading, error, refetch } = useApi('/api/publications/', {
  immediate: false, // Don't fetch on mount
});

// Fetch manually later
useEffect(() => {
  refetch();
}, [someCondition]);
```

---

## 🎨 Skeleton Components

Loading skeleton components for better UX during data fetching.

### Available Skeletons
- `PublicationSkeleton` - For publication cards
- `GallerySkeleton` - For gallery items
- `MediaSkeleton` - For video/audio items
- `GallerySectionSkeleton` - For gallery section on home page

### Usage

```javascript
import PublicationSkeleton from '../components/PublicationSkeleton';

{loading ? (
  <div className="grid grid-cols-2 gap-6">
    {[1, 2, 3, 4].map((i) => (
      <PublicationSkeleton key={i} />
    ))}
  </div>
) : (
  <PublicationsList data={publications} />
)}
```

---

## 📝 Best Practices

### Error Handling
1. **Always use `getErrorMessage()` for user-facing errors**
   ```javascript
   const message = getErrorMessage(error, language);
   setError(message);
   ```

2. **Handle validation errors separately**
   ```javascript
   const validationErrors = getValidationErrors(error, language);
   if (validationErrors) {
     // Show field-specific errors
   }
   ```

3. **Use error message utility with language context**
   ```javascript
   const { language } = useLanguage();
   const errorMsg = getErrorMessage(error, language);
   ```

### API Calls
1. **Use `useApi` hook for GET requests** (automatic retry)
2. **Use `api.get/post` directly for POST/PUT/DELETE** (no retry by default)
3. **Enable retry for critical GET requests**
   ```javascript
   const { data } = useApi('/api/critical-data/', { maxRetries: 5 });
   ```

### Images
1. **Use `LazyImage` for all images** (automatic lazy loading and error handling)
2. **Provide descriptive alt text**
3. **Use fallback for critical images**
   ```javascript
   <LazyImage
     src={image}
     alt="Description"
     fallback={<ImagePlaceholder />}
   />
   ```

---

## 🔧 Configuration

### Retry Settings
Default retry configuration (can be customized):
- **Max Retries**: 3
- **Base Delay**: 1000ms (1 second)
- **Exponential Backoff**: delay = baseDelay * 2^attempt
- **Jitter**: Up to 30% random variation

### Retryable Errors
Automatically retried:
- Network errors (no response)
- HTTP 408 (Request Timeout)
- HTTP 429 (Too Many Requests)
- HTTP 500 (Internal Server Error)
- HTTP 502 (Bad Gateway)
- HTTP 503 (Service Unavailable)
- HTTP 504 (Gateway Timeout)

Not retried (fail immediately):
- HTTP 400 (Bad Request) - Client error
- HTTP 401 (Unauthorized) - Auth error
- HTTP 403 (Forbidden) - Permission error
- HTTP 404 (Not Found) - Resource error

---

**End of Guide**

