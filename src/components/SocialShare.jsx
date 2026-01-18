  import React, { useState } from 'react';
  import { useLanguage } from '../context/LanguageContext';
  import { 
    FiShare2, 
    FiFacebook, 
    FiTwitter, 
    FiLinkedin, 
    FiPhone,
    FiMail,
    FiLink
  } from 'react-icons/fi';
  import { motion, AnimatePresence } from 'framer-motion';

  /**
   * Social Share Component
   * Provides social media sharing buttons for content
   */
  const SocialShare = ({ 
    url, 
    title, 
    description, 
    variant = 'default',
    size = 'default' 
  }) => {
    const { language } = useLanguage();
    const isUrdu = language === 'urdu';
    const [showShareMenu, setShowShareMenu] = useState(false);
    
    // Get current page URL if not provided
    const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
    const shareTitle = title || '';
    const shareDescription = description || '';
    
    // Encode URL and text for sharing
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(shareTitle);
    const encodedText = encodeURIComponent(`${shareTitle}${shareDescription ? ` - ${shareDescription}` : ''}`);
    
    // Social sharing URLs
    const socialLinks = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
      whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      email: `mailto:?subject=${encodedTitle}&body=${encodedText}%0A%0A${encodedUrl}`,
    };
    
    // Handle native Web Share API (mobile)
    const handleNativeShare = async () => {
      if (navigator.share) {
        try {
          await navigator.share({
            title: shareTitle,
            text: shareDescription,
            url: shareUrl,
          });
        } catch (err) {
          // User cancelled or error occurred
          if (err.name !== 'AbortError') {
            console.error('Error sharing:', err);
          }
        }
      } else {
        // Fallback: copy to clipboard
        handleCopyLink();
      }
    };
    
    // Copy link to clipboard
    const handleCopyLink = async () => {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setShowShareMenu(false);
        // You can add a toast notification here if needed
      } catch (err) {
        console.error('Failed to copy:', err);
        // Fallback: show URL in alert
        alert(shareUrl);
      }
    };
    
    // Open share link in new window
    const handleShare = (platform) => {
      const link = socialLinks[platform];
      if (link) {
        window.open(link, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
        setShowShareMenu(false);
      }
    };
    
    // Size classes
    const sizeClasses = {
      small: 'p-2 text-sm',
      default: 'p-2.5 text-base',
      large: 'p-3 text-lg',
    };
    
    // Icon size classes
    const iconSizeClasses = {
      small: 'w-4 h-4',
      default: 'w-5 h-5',
      large: 'w-6 h-6',
    };
    
    const sizeClass = sizeClasses[size] || sizeClasses.default;
    const iconSizeClass = iconSizeClasses[size] || iconSizeClasses.default;
    
    if (variant === 'dropdown') {
      return (
        <div className="relative inline-block">
          <button
            onClick={() => setShowShareMenu(!showShareMenu)}
            className={`flex items-center gap-2 ${sizeClass} text-gray-600 hover:text-black transition-colors border border-gray-200 rounded-full hover:border-black`}
            aria-label={isUrdu ? 'شیئر کریں' : 'Share'}
          >
            <FiShare2 className={iconSizeClass} />
            <span className={isUrdu ? 'font-urdu' : ''}>
              {isUrdu ? 'شیئر کریں' : 'Share'}
            </span>
          </button>
          
          <AnimatePresence>
            {showShareMenu && (
              <>
                {/* Backdrop */}
                <motion.div
                  className="fixed inset-0 z-40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowShareMenu(false)}
                />
                
                {/* Dropdown Menu */}
                <motion.div
                  className={`absolute ${isUrdu ? 'left-0' : 'right-0'} top-full mt-2 z-50 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[200px]`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {/* Native Share / Copy Link */}
                  {navigator.share ? (
                    <button
                      onClick={handleNativeShare}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                    >
                      <FiShare2 className="w-4 h-4 text-gray-600" />
                      <span className={isUrdu ? 'font-urdu' : ''}>
                        {isUrdu ? 'شیئر کریں' : 'Share'}
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={handleCopyLink}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                    >
                      <FiLink className="w-4 h-4 text-gray-600" />
                      <span className={isUrdu ? 'font-urdu' : ''}>
                        {isUrdu ? 'لنک کاپی کریں' : 'Copy Link'}
                      </span>
                    </button>
                  )}
                  
                  <div className="border-t border-gray-200 my-1" />
                  
                  {/* Social Platforms */}
                  <button
                    onClick={() => handleShare('facebook')}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                  >
                    <FiFacebook className="w-4 h-4 text-blue-600" />
                    <span>Facebook</span>
                  </button>
                  
                  <button
                    onClick={() => handleShare('twitter')}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                  >
                    <FiTwitter className="w-4 h-4 text-blue-400" />
                    <span>Twitter</span>
                  </button>
                  
                  <button
                    onClick={() => handleShare('whatsapp')}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                  >
                    <FiPhone className="w-4 h-4 text-green-500" />
                    <span>WhatsApp</span>
                  </button>
                  
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                  >
                    <FiLinkedin className="w-4 h-4 text-blue-700" />
                    <span>LinkedIn</span>
                  </button>
                  
                  <button
                    onClick={() => handleShare('email')}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                  >
                    <FiMail className="w-4 h-4 text-gray-600" />
                    <span className={isUrdu ? 'font-urdu' : ''}>
                      {isUrdu ? 'ای میل' : 'Email'}
                    </span>
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      );
    }
    
    // Horizontal button layout (default)
    return (
      <div className={`flex items-center gap-2 ${isUrdu ? 'flex-row-reverse' : ''}`}>
        <button
          onClick={handleNativeShare}
          className={`flex items-center gap-2 ${sizeClass} text-gray-600 hover:text-black transition-colors border border-gray-200 rounded-full hover:border-black`}
          aria-label={isUrdu ? 'شیئر کریں' : 'Share'}
        >
          {navigator.share ? (
            <>
              <FiShare2 className={iconSizeClass} />
              <span className={isUrdu ? 'font-urdu' : ''}>
                {isUrdu ? 'شیئر کریں' : 'Share'}
              </span>
            </>
          ) : (
            <>
              <FiLink className={iconSizeClass} />
              <span className={isUrdu ? 'font-urdu' : ''}>
                {isUrdu ? 'لنک کاپی کریں' : 'Copy Link'}
              </span>
            </>
          )}
        </button>
        
        <div className="flex items-center gap-1">
          <button
            onClick={() => handleShare('facebook')}
            className={`${sizeClass} text-blue-600 hover:bg-blue-50 rounded-full transition-colors`}
            aria-label="Share on Facebook"
          >
            <FiFacebook className={iconSizeClass} />
          </button>
          
          <button
            onClick={() => handleShare('twitter')}
            className={`${sizeClass} text-blue-400 hover:bg-blue-50 rounded-full transition-colors`}
            aria-label="Share on Twitter"
          >
            <FiTwitter className={iconSizeClass} />
          </button>
          
          <button
            onClick={() => handleShare('whatsapp')}
            className={`${sizeClass} text-green-500 hover:bg-green-50 rounded-full transition-colors`}
            aria-label="Share on WhatsApp"
          >
            <FiPhone className={iconSizeClass} />
          </button>
          
          <button
            onClick={() => handleShare('linkedin')}
            className={`${sizeClass} text-blue-700 hover:bg-blue-50 rounded-full transition-colors`}
            aria-label="Share on LinkedIn"
          >
            <FiLinkedin className={iconSizeClass} />
          </button>
          
          <button
            onClick={() => handleShare('email')}
            className={`${sizeClass} text-gray-600 hover:bg-gray-50 rounded-full transition-colors`}
            aria-label={isUrdu ? 'ای میل سے شیئر کریں' : 'Share via Email'}
          >
            <FiMail className={iconSizeClass} />
          </button>
        </div>
      </div>
    );
  };

  export default SocialShare;

