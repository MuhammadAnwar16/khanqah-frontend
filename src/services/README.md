# Services - API Layer

This directory contains service modules that encapsulate all API calls for the application. This separation of concerns makes the codebase more maintainable, testable, and easier to refactor.

## 📁 Service Files

### **`api.js`**
Base API client with axios interceptors for authentication and error handling.

### **`publications.js`**
- `getPublications()` - Get all publications
- `getPublicationById(id)` - Get single publication

### **`gallery.js`**
- `getGalleryCollections(language)` - Get all gallery collections (formatted for language)
- `getGalleryCollectionById(id, language)` - Get single gallery collection

### **`photos.js`**
- `getPhotoCollections()` - Get all photo collections
- `getPhotoCollectionById(id)` - Get single photo collection
- `getPhotosByCollection(collectionId)` - Get photos in a collection

### **`videoAudios.js`**
- `getVideos()` - Get all videos
- `getAudios()` - Get all audios
- `getVideoById(id)` - Get single video
- `getAudioById(id)` - Get single audio

### **`about.js`**
- `getAboutSections()` - Get all about sections
- `getCurrentNasheen()` - Get current Nasheen
- `getPreviousNasheens()` - Get previous Nasheens (lineage tree)

### **`contact.js`**
- `sendContactMessage(formData)` - Send contact form message

---

## 💡 Usage Examples

### **Using Services in Components**

```javascript
import { getPublications } from '../services/publications';

// In component
useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await getPublications();
      setPublications(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  fetchData();
}, []);
```

### **Benefits**

1. **Centralized API Logic** - All API calls in one place
2. **Easier Testing** - Mock services instead of API endpoints
3. **Better Error Handling** - Consistent error handling across services
4. **Type Safety** - Can add TypeScript types later
5. **Reusability** - Services can be used in multiple components
6. **Maintainability** - Update API endpoints in one place

---

## 🔄 Migration Notes

**Before** (direct axios/fetch in components):
```javascript
axios.get('/api/publications/publications/')
  .then(res => setPublications(res.data))
```

**After** (using services):
```javascript
const data = await getPublications();
setPublications(data);
```

---

**Last Updated**: January 2025

