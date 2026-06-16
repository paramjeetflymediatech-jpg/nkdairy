export default function OrganizationSchema() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "NK Dairy Equipments",
    "url": "https://nkdairyequipments.com",
    "logo": "https://nkdairyequipments.com/logo.png",
    "description": "World-class industrial manufacturing for dairy processing machinery. Delivering premium quality and innovative solutions globally.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-234-567-8900",
      "contactType": "customer service",
      "email": "sales@nkdairy.com",
      "areaServed": "Worldwide",
      "availableLanguage": "English"
    },
    "sameAs": [
      "https://www.facebook.com/nkdairyequipments",
      "https://twitter.com/nkdairy",
      "https://www.linkedin.com/company/nk-dairy-equipments",
      "https://www.instagram.com/nkdairy"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "NK Dairy Equipments",
    "url": "https://nkdairyequipments.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://nkdairyequipments.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
