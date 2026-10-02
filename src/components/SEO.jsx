import { Helmet } from "react-helmet-async";

export default function SEO({
  title,
  description,
  canonicalUrl,
  keywords = "",
  ogTitle,
  ogDescription,
  ogImage,
  ogType = "website",
  twitterCard = "summary_large_image",
  schemaData = [],
}) {
  const defaultTitle = "Career Ready India Initiative";
  const defaultDesc =
    "Career Ready India Initiative  A national programme to make 10,000 schools career ready.";
  const siteUrl = "https://www.careerreadyindia.com";

  const finalTitle = title ? `${title} | Career Ready India` : defaultTitle;
  const finalDesc = description || defaultDesc;
  const finalCanonical = canonicalUrl || siteUrl;
  const finalOgTitle = ogTitle || title || defaultTitle;
  const finalOgDesc = ogDescription || description || defaultDesc;
  const finalOgImage = ogImage || `${siteUrl}/crii_logo.png`;

  // Default Organization & Website Schemas
  const defaultOrgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Career Ready India Initiative",
    url: siteUrl,
    logo: `${siteUrl}/crii_logo.png`,
    description:
      "A national initiative empowering schools with tools, assessments, and training to guide students towards fulfilling careers.",
    sameAs: [],
  };

  const defaultWebSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Career Ready India",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  // Merge default schemas with page-specific ones
  const finalSchemas = [defaultOrgSchema, defaultWebSiteSchema, ...schemaData];

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDesc} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={finalCanonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={finalOgTitle} />
      <meta property="og:description" content={finalOgDesc} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:url" content={finalCanonical} />
      <meta property="og:site_name" content="Career Ready India" />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={finalOgTitle} />
      <meta name="twitter:description" content={finalOgDesc} />
      <meta name="twitter:image" content={finalOgImage} />

      {/* Structured Schema.org data */}
      {finalSchemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
