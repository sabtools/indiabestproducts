'use client';

import PriceComparisonCard from '@/components/product/PriceComparisonCard';

interface PlatformPrice {
  platform: string;
  price: number;
  originalPrice?: number;
  url?: string;
  inStock?: boolean;
  rating?: number;
  reviewCount?: number;
}

interface ProductData {
  name: string;
  slug: string;
  brand: string;
  image?: string;
  category?: string;
  prices?: PlatformPrice[];
}

interface Props {
  products: ProductData[];
}

function getPlatformData(product: ProductData, platform: string) {
  if (!product.prices) return {};
  const p = product.prices.find(
    (pr) => pr.platform.toLowerCase() === platform.toLowerCase()
  );
  if (!p) return {};
  return {
    price: p.price,
    originalPrice: p.originalPrice,
    url: p.url,
    inStock: p.inStock,
    rating: p.rating,
    reviewCount: p.reviewCount,
  };
}

export default function SimilarProducts({ products }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
      {products.map((product) => {
        const amazon = getPlatformData(product, 'Amazon');
        const flipkart = getPlatformData(product, 'Flipkart');
        return (
          <PriceComparisonCard
            key={product.slug}
            name={product.name}
            slug={product.slug}
            brand={product.brand}
            image={product.image}
            category={product.category}
            amazonPrice={amazon.price}
            amazonOriginalPrice={amazon.originalPrice}
            amazonUrl={amazon.url}
            amazonRating={amazon.rating}
            amazonReviewCount={amazon.reviewCount}
            amazonInStock={amazon.inStock}
            flipkartPrice={flipkart.price}
            flipkartOriginalPrice={flipkart.originalPrice}
            flipkartUrl={flipkart.url}
            flipkartRating={flipkart.rating}
            flipkartReviewCount={flipkart.reviewCount}
            flipkartInStock={flipkart.inStock}
          />
        );
      })}
    </div>
  );
}
