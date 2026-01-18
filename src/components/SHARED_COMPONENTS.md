# Shared Components Guide

This document describes the reusable shared components available in the application.

## 📦 Available Components

### **1. LoadingSpinner**

Generic, reusable loading spinner with bilingual support.

**Props**:
- `size` (string): 'sm' | 'md' | 'lg' | 'xl' (default: 'md')
- `text` (string): Custom loading text (default: auto-detect from language)
- `fullScreen` (boolean): Render as full-screen overlay (default: false)
- `className` (string): Additional CSS classes

**Usage**:
```javascript
import LoadingSpinner from '../components/LoadingSpinner';

// Simple spinner
<LoadingSpinner />

// Large spinner with custom text
<LoadingSpinner size="lg" text="Fetching data..." />

// Full-screen spinner
<LoadingSpinner fullScreen />
```

---

### **2. ErrorMessage**

Standardized error message display with optional retry button.

**Props**:
- `message` (string): Error message to display
- `onRetry` (function): Optional retry callback function
- `className` (string): Additional CSS classes
- `variant` (string): 'default' | 'inline' | 'full' (default: 'default')

**Variants**:
- `default`: Centered in container (h-64)
- `inline`: Compact inline display
- `full`: Full-screen error display

**Usage**:
```javascript
import ErrorMessage from '../components/ErrorMessage';

// Simple error
<ErrorMessage message="Failed to load data" />

// Error with retry button
<ErrorMessage 
  message="Network error" 
  onRetry={() => refetch()} 
/>

// Inline error
<ErrorMessage 
  message="Error" 
  variant="inline" 
/>
```

---

### **3. PageSkeleton**

Generic page skeleton loader for consistent loading states.

**Props**:
- `showHeader` (boolean): Show header skeleton (default: true)
- `showContent` (boolean): Show content skeleton (default: true)
- `itemsCount` (number): Number of skeleton items (default: 6)
- `className` (string): Additional CSS classes

**Usage**:
```javascript
import PageSkeleton from '../components/PageSkeleton';

// Full page skeleton
<PageSkeleton />

// Custom skeleton
<PageSkeleton itemsCount={9} showHeader={false} />
```

---

### **4. EmptyState**

Reusable empty state component (already exists).

**Usage**:
```javascript
import EmptyState from '../components/EmptyState';

<EmptyState 
  type="publication"
  language={language}
/>
```

---

## 🔄 Migration Examples

### **Before** (Custom Loading):
```javascript
{loading && (
  <div className="h-24 flex items-center opacity-50">
    <p className="text-xs uppercase tracking-widest animate-pulse">
      {isUrdu ? "لوڈ ہو رہا ہے..." : "Loading..."}
    </p>
  </div>
)}
```

### **After** (LoadingSpinner):
```javascript
{loading && <LoadingSpinner size="sm" />}
```

---

### **Before** (Custom Error):
```javascript
{error && (
  <div className="flex flex-col justify-center items-center h-64 text-red-500 opacity-80">
    <FiAlertCircle className="w-6 h-6 mb-2" />
    <p className="text-sm">{error}</p>
  </div>
)}
```

### **After** (ErrorMessage):
```javascript
{error && <ErrorMessage message={error} onRetry={refetch} />}
```

---

## ✨ Benefits

1. **Consistency** - Same look and feel across all pages
2. **Bilingual Support** - Automatic language detection
3. **Less Code** - Reusable components reduce duplication
4. **Maintainability** - Update once, applies everywhere
5. **Accessibility** - Built-in ARIA support
6. **Flexibility** - Multiple variants and sizes

---

**Last Updated**: January 2025

