import React, { useEffect } from 'react';

/**
 * This component fixes scrolling issues on mobile devices
 * by ensuring the viewport is properly set and handling
 * touch events correctly.
 */
const MobileScrollFix: React.FC = () => {
  useEffect(() => {
    // Set viewport meta tag to ensure proper scaling
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
      viewportMeta.setAttribute(
        'content',
        'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, viewport-fit=cover'
      );
    }

    // Fix for iOS momentum scrolling
    const fixIOSScroll = () => {
      document.documentElement.style.height = '100%';
      document.body.style.height = '100%';
      document.body.style.overflow = 'auto';
      document.body.style.webkitOverflowScrolling = 'touch';
      document.body.style.position = 'relative';
    };

    // Fix for Android scrolling
    const fixAndroidScroll = () => {
      document.body.style.overflow = 'auto';
      document.body.style.height = 'auto';
      document.body.style.minHeight = '100%';
      document.body.style.position = 'relative';
    };

    // Apply fixes based on user agent
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf('iphone') > -1 || userAgent.indexOf('ipad') > -1) {
      fixIOSScroll();
    } else if (userAgent.indexOf('android') > -1) {
      fixAndroidScroll();
    }

    // Prevent body from being fixed position
    const checkBodyStyle = () => {
      if (document.body.style.position === 'fixed') {
        document.body.style.position = 'relative';
      }
    };

    // Run check periodically
    const intervalId = setInterval(checkBodyStyle, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return null;
};

export default MobileScrollFix;
