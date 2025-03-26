
import React, { useEffect } from 'react';

interface SeoHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

/**
 * Component to manage SEO metadata consistently across the site
 */
const SeoHead: React.FC<SeoHeadProps> = ({
  title = "Transformed Academy & Salon | Premium Advanced Aesthetics",
  description = "Premium Advanced Aesthetics Treatments, Skin Analysis Specialist, Hair Care Treatments And Fully Qualified Level 5 Educator at Transformed Academy and Salon.",
  keywords = "Premium Advanced Aesthetics Treatments, Skin Analysis Specialist, Hair Care Treatments, Level 5 Educator",
  ogTitle = "Transformed Academy & Salon | Premium Advanced Aesthetics",
  ogDescription = "Premium Advanced Aesthetics Treatments, Skin Analysis Specialist, Hair Care Treatments And Fully Qualified Level 5 Educator at Transformed Academy and Salon.",
  ogImage = "https://lovable.dev/opengraph-image-p98pqg.png",
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const metaTags = {
      description,
      keywords,
      'og:title': ogTitle,
      'og:description': ogDescription,
      'twitter:title': ogTitle,
      'twitter:description': ogDescription,
    };

    Object.entries(metaTags).forEach(([name, content]) => {
      // Check if it's an Open Graph tag
      if (name.startsWith('og:')) {
        const element = document.querySelector(`meta[property="${name}"]`);
        if (element) {
          element.setAttribute('content', content);
        } else {
          const meta = document.createElement('meta');
          meta.setAttribute('property', name);
          meta.setAttribute('content', content);
          document.head.appendChild(meta);
        }
      } else if (name.startsWith('twitter:')) {
        const element = document.querySelector(`meta[name="${name}"]`);
        if (element) {
          element.setAttribute('content', content);
        } else {
          const meta = document.createElement('meta');
          meta.setAttribute('name', name);
          meta.setAttribute('content', content);
          document.head.appendChild(meta);
        }
      } else {
        // Regular meta tag
        const element = document.querySelector(`meta[name="${name}"]`);
        if (element) {
          element.setAttribute('content', content);
        } else {
          const meta = document.createElement('meta');
          meta.setAttribute('name', name);
          meta.setAttribute('content', content);
          document.head.appendChild(meta);
        }
      }
    });

    // Update og:image
    const ogImageElement = document.querySelector('meta[property="og:image"]');
    if (ogImageElement) {
      ogImageElement.setAttribute('content', ogImage);
    }
    
    const twitterImageElement = document.querySelector('meta[name="twitter:image"]');
    if (twitterImageElement) {
      twitterImageElement.setAttribute('content', ogImage);
    }
  }, [title, description, keywords, ogTitle, ogDescription, ogImage]);

  return null; // This component doesn't render anything
};

export default SeoHead;
