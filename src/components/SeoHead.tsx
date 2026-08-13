
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SeoHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  schema?: object;
}

/**
 * Component to manage SEO metadata consistently across the site
 */
const SeoHead: React.FC<SeoHeadProps> = ({
  title = "Transformed Academy & Salon | Premium Advanced Aesthetics Cardiff",
  description = "Premium Advanced Aesthetics Treatments, Skin Analysis Specialist, Hair Care Treatments And Fully Qualified Level 5 Educator at Transformed Academy and Salon in Cardiff, South Wales.",
  keywords = "Premium Advanced Aesthetics Cardiff, Aesthetics Clinic Cardiff, Non-surgical treatments Cardiff, Medical Aesthetics Cardiff, Aesthetics Training Academy Cardiff, Advanced aesthetic courses UK, Botox and Filler training Cardiff, lip fillers Cardiff, dermal fillers Cardiff, beauty salon Cardiff, skin analysis Cardiff, Level 5 educator Cardiff",
  ogTitle = "Transformed Academy & Salon | Premium Advanced Aesthetics Cardiff",
  ogDescription = "Premium Advanced Aesthetics Treatments, Skin Analysis Specialist, Hair Care Treatments And Fully Qualified Level 5 Educator at Transformed Academy and Salon in Cardiff, South Wales.",
  ogImage = "https://transformedacademyhq.co.uk/logo-hq.jpg",
  schema,
}) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://transformedacademyhq.co.uk" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Transformed Academy & Salon" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDescription} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data (JSON-LD) */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SeoHead;
