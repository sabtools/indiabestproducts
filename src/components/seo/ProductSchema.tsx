import JsonLd from './JsonLd';

interface ProductSchemaProps {
  name: string;
  brand: string;
  description: string;
  image?: string;
  rating: number;
  reviewCount: number;
  price?: string;
  priceCurrency?: string;
  url?: string;
  reviewAuthor?: string;
  reviewBody?: string;
}

export default function ProductSchema({
  name,
  brand,
  description,
  image,
  rating,
  reviewCount,
  price,
  priceCurrency = 'INR',
  url,
  reviewAuthor = 'IndiaBestProducts Editorial',
  reviewBody,
}: ProductSchemaProps) {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    brand: {
      '@type': 'Brand',
      name: brand,
    },
    description,
    ...(image && { image }),
    ...(url && { url }),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rating.toString(),
      bestRating: '5',
      worstRating: '1',
      ratingCount: reviewCount.toString(),
    },
    review: {
      '@type': 'Review',
      author: {
        '@type': 'Organization',
        name: reviewAuthor,
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: rating.toString(),
        bestRating: '5',
        worstRating: '1',
      },
      ...(reviewBody && { reviewBody }),
    },
  };

  if (price) {
    data.offers = {
      '@type': 'Offer',
      price,
      priceCurrency,
      availability: 'https://schema.org/InStock',
    };
  }

  return <JsonLd data={data} />;
}
