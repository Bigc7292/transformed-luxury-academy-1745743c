
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
  title = "Transformed Academy & Salon | Premium Advanced Aesthetics",
  description = "Premium Advanced Aesthetics Treatments, Skin Analysis Specialist, Hair Care Treatments And Fully Qualified Level 5 Educator at Transformed Academy and Salon.",
  keywords = "Premium Advanced Aesthetics Treatments, Skin Analysis Specialist, Hair Care Treatments, Level 5 Educator, beauty salon, Hereford",
  ogTitle = "Transformed Academy & Salon | Premium Advanced Aesthetics",
  ogDescription = "Premium Advanced Aesthetics Treatments, Skin Analysis Specialist, Hair Care Treatments And Fully Qualified Level 5 Educator at Transformed Academy and Salon.",
  ogImage = "https://transformedacademyhq.co.uk/logo.jpg",
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
