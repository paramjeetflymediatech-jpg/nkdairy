export default function ProductSchema({ product }: { product: any }) {
  if (!product) return null;

  const images = [];
  if (product.images) {
    try {
      const parsed = JSON.parse(product.images);
      if (Array.isArray(parsed)) images.push(...parsed);
    } catch (e) {
      // ignore
    }
  }

  // Fallback if no image provided
  if (images.length === 0) {
    images.push('https://nkdairyequipments.com/logo.png');
  }

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": images,
    "description": product.metaDescription || product.description?.substring(0, 160) || product.name,
    "brand": {
      "@type": "Brand",
      "name": "NK Dairy Equipments"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://nkdairyequipments.com/products/${product.slug}`,
      "priceCurrency": "USD",
      "price": "0.00",
      "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "NK Dairy Equipments"
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
    />
  );
}
