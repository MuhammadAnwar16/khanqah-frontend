import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
    
    // You can log to an error reporting service here
    // Example: logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return <ErrorFallback 
        error={this.state.error} 
        errorInfo={this.state.errorInfo}
        onReset={this.handleReset}
        language={this.props.language}
      />;
    }

    return this.props.children;
  }
}

function ErrorFallback({ error, errorInfo, onReset, language }) {
  const isUrdu = language === 'urdu';

  return (
    <div 
      dir={isUrdu ? 'rtl' : 'ltr'}
      className="min-h-screen bg-[#faf9f6] flex items-center justify-center px-6 py-24"
    >
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-black mb-4">⚠️</h1>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#0C0C0C] mb-4">
            {isUrdu ? 'کچھ غلط ہو گیا' : 'Something Went Wrong'}
          </h2>
          <p className="text-lg text-subtext mb-8">
            {isUrdu 
              ? 'معذرت، ایک غیر متوقع خرابی پیش آگئی۔ براہ کرم دوبارہ کوشش کریں۔'
              : 'Sorry, an unexpected error occurred. Please try again.'}
          </p>
        </div>

        {process.env.NODE_ENV === 'development' && error && (
          <details className="mb-8 text-left bg-mist p-4 rounded-lg border border-border">
            <summary className="cursor-pointer font-semibold mb-2">
              {isUrdu ? 'خرابی کی تفصیلات (صرف ڈیولپمنٹ)' : 'Error Details (Development Only)'}
            </summary>
            <pre className="text-xs overflow-auto mt-2">
              {error.toString()}
              {errorInfo && errorInfo.componentStack}
            </pre>
          </details>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onReset}
            className="px-6 py-3 bg-[#0C0C0C] text-white rounded-full font-semibold hover:bg-gray-800 transition"
          >
            {isUrdu ? 'گھر واپس جائیں' : 'Go Home'}
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-[#faf9f6] text-black border border-border rounded-full font-semibold hover:bg-mist transition"
          >
            {isUrdu ? 'صفحہ دوبارہ لوڈ کریں' : 'Reload Page'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Wrapper component that gets language from localStorage (works outside LanguageProvider)
export default function ErrorBoundaryWithLanguage({ children }) {
  // Get language from localStorage directly (fallback to 'urdu' if not available)
  // This allows the error boundary to work even if LanguageProvider fails
  const [language, setLanguage] = React.useState(() => {
    try {
      return localStorage.getItem('language') || 'urdu';
    } catch {
      return 'urdu';
    }
  });

  // Update language if localStorage changes (optional, for consistency)
  React.useEffect(() => {
    const handleStorageChange = () => {
      try {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
          setLanguage(savedLanguage);
        }
      } catch {
        // Ignore localStorage errors
      }
    };

    // Listen for storage events (if language changes in another tab)
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  return (
    <ErrorBoundary language={language}>
      {children}
    </ErrorBoundary>
  );
}

