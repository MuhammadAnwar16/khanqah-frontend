# Custom Hooks

This directory contains domain-specific custom hooks that encapsulate data fetching logic for different parts of the application.

## 📁 Hook Files

### **`useApi.js`**
Generic API hook with retry logic (base hook for all API calls).

### **`usePublications.js`**
- `usePublications(options)` - Fetch all publications
- `usePublication(id, options)` - Fetch single publication

### **`useGallery.js`**
- `useGalleryCollections(options)` - Fetch all gallery collections (language-aware)
- `useGalleryCollection(id, options)` - Fetch single gallery collection

### **`usePhotos.js`**
- `usePhotoCollections(options)` - Fetch all photo collections
- `usePhotoCollection(id, options)` - Fetch single photo collection
- `usePhotos(collectionId, options)` - Fetch photos in a collection

### **`useMedia.js`**
- `useVideos(options)` - Fetch all videos
- `useAudios(options)` - Fetch all audios
- `useVideo(id, options)` - Fetch single video
- `useAudio(id, options)` - Fetch single audio

### **`useAbout.js`**
- `useAboutSections(options)` - Fetch all about sections
- `useCurrentNasheen(options)` - Fetch current Nasheen
- `usePreviousNasheens(options)` - Fetch previous Nasheens
- `useNasheens(options)` - Fetch both current and previous Nasheens together

---

## 💡 Usage Examples

### **Using Publications Hook**

```javascript
import { usePublications } from '../hooks/usePublications';

function PublicationsPage() {
  const { publications, loading, error, refetch } = usePublications();
  
  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;
  
  return (
    <div>
      {publications.map(pub => (
        <PublicationCard key={pub.id} {...pub} />
      ))}
    </div>
  );
}
```

### **Using Gallery Hook (Language-Aware)**

```javascript
import { useGalleryCollections } from '../hooks/useGallery';

function GallerySection() {
  const { collections, loading, error } = useGalleryCollections();
  
  // collections are automatically formatted for current language
  // ...
}
```

### **Using Media Hook**

```javascript
import { useVideos, useAudios } from '../hooks/useMedia';

function VideoGallery() {
  const { videos, loading: videosLoading } = useVideos();
  const { audios, loading: audiosLoading } = useAudios();
  
  // ...
}
```

### **Using Nasheens Hook**

```javascript
import { useNasheens } from '../hooks/useAbout';

function CurrentNasheenSection() {
  const { currentNasheen, previousNasheens, loading } = useNasheens();
  
  // Both current and previous Nasheens loaded in parallel
  // ...
}
```

---

## ✨ Benefits

1. **Domain-Specific Logic** - Each hook encapsulates domain-specific data fetching
2. **Automatic Language Support** - Gallery hooks automatically use current language
3. **Consistent API** - All hooks return `{ data, loading, error, refetch }`
4. **Reusability** - Use hooks in multiple components
5. **Type Safety** - Ready for TypeScript migration
6. **Error Handling** - Built-in error handling
7. **Loading States** - Automatic loading state management

---

## 🔄 Migration from Direct Service Calls

**Before** (direct service calls in useEffect):
```javascript
useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getPublications();
      setPublications(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, []);
```

**After** (using custom hook):
```javascript
const { publications, loading, error } = usePublications();
```

**Much cleaner!** ✨

---

**Last Updated**: January 2025

