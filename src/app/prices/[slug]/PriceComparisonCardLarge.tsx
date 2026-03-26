'use client';

import StarRating from '@/components/product/StarRating';
import DealBadge from '@/components/product/DealBadge';

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
}

interface Props {
  product: ProductData;
  amazon: PlatformPrice | null;
  flipkart: PlatformPrice | null;
}

function formatPrice(price: number): string {
  return '₹' + price.toLocaleString('en-IN');
}

function calcDiscount(original: number | undefined, current: number): number {
  if (!original || original <= current) return 0;
  return Math.round(((original - current) / original) * 100);
}

export default function PriceComparisonCardLarge({ product, amazon, flipkart }: Props) {
  const bestPlatform =
    amazon && flipkart
      ? amazon.price < flipkart.price
        ? 'amazon'
        : flipkart.price < amazon.price
        ? 'flipkart'
        : 'tie'
      : amazon
      ? 'amazon'
      : flipkart
      ? 'flipkart'
      : null;

  const savings =
    amazon && flipkart ? Math.abs(amazon.price - flipkart.price) : 0;

  const amazonDiscount = amazon ? calcDiscount(amazon.originalPrice, amazon.price) : 0;
  const flipkartDiscount = flipkart ? calcDiscount(flipkart.originalPrice, flipkart.price) : 0;
  const maxDiscount = Math.max(amazonDiscount, flipkartDiscount);

  const initial = product.name.charAt(0).toUpperCase();

  return (
    <div className="price-card relative rounded-2xl border border-slate-200 bg-white shadow-md overflow-hidden">
      <div className="h-1.5 w-full bg-gradient-to-r from-[#ff9900] via-[#8b5cf6] to-[#2874f0]" />

      {maxDiscount > 0 && (
        <div className="absolute top-4 right-4 z-10">
          <DealBadge discount={maxDiscount} />
        </div>
      )}

      <div className="p-6 md:p-8">
        {/* Product Header */}
        <div className="flex items-start gap-5 mb-6">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="h-24 w-24 shrink-0 rounded-xl border border-slate-100 object-contain bg-slate-50 p-2"
            />
          ) : (
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-3xl font-bold text-white shadow-inner">
              {initial}
            </div>
          )}
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-900">
              {product.name}
            </h2>
            <p className="text-slate-500 mt-1">{product.brand}</p>
            {product.category && (
              <span className="mt-2 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                {product.category}
              </span>
            )}
          </div>
        </div>

        {/* Price Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Amazon */}
          <div
            className={`relative rounded-xl border-2 p-5 ${
              bestPlatform === 'amazon'
                ? 'border-[#ff9900] bg-orange-50/60'
                : 'border-slate-200 bg-slate-50/40'
            }`}
          >
            {bestPlatform === 'amazon' && (
              <span className="best-price-badge absolute -top-3 left-4 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide shadow">
                Best Price
              </span>
            )}
            <p className="text-base font-bold text-[#ff9900] mb-3">Amazon.in</p>
            {amazon ? (
              <>
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="price-current text-3xl">{formatPrice(amazon.price)}</span>
                  {amazon.originalPrice && amazon.originalPrice > amazon.price && (
                    <span className="price-original text-lg">
                      {formatPrice(amazon.originalPrice)}
                    </span>
                  )}
                  {amazonDiscount > 0 && (
                    <span className="rounded bg-green-100 px-2 py-0.5 text-sm font-semibold text-green-700">
                      {amazonDiscount}% off
                    </span>
                  )}
                </div>
                {amazon.rating !== undefined && (
                  <div className="mt-3 flex items-center gap-2">
                    <StarRating rating={amazon.rating} size="md" showValue />
                    {amazon.reviewCount !== undefined && (
                      <span className="text-sm text-slate-400">
                        ({amazon.reviewCount.toLocaleString('en-IN')} reviews)
                      </span>
                    )}
                  </div>
                )}
                <div className="mt-2 text-sm text-slate-500">
                  {amazon.inStock ? (
                    <span className="text-green-600 font-medium">In Stock</span>
                  ) : (
                    <span className="text-red-500 font-medium">Out of Stock</span>
                  )}
                  <span className="ml-3">Free Delivery</span>
                </div>
                <a
                  href={amazon.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#ff9900] px-6 py-3 text-base font-bold text-white transition-all hover:bg-[#e88b00] hover:shadow-lg active:scale-[0.98]"
                >
                  Buy on Amazon &rarr;
                </a>
              </>
            ) : (
              <p className="text-slate-400 mt-2">Not available on Amazon</p>
            )}
          </div>

          {/* Flipkart */}
          <div
            className={`relative rounded-xl border-2 p-5 ${
              bestPlatform === 'flipkart'
                ? 'border-[#2874f0] bg-blue-50/60'
                : 'border-slate-200 bg-slate-50/40'
            }`}
          >
            {bestPlatform === 'flipkart' && (
              <span className="best-price-badge absolute -top-3 left-4 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide shadow">
                Best Price
              </span>
            )}
            <p className="text-base font-bold text-[#2874f0] mb-3">Flipkart</p>
            {flipkart ? (
              <>
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="price-current text-3xl">{formatPrice(flipkart.price)}</span>
                  {flipkart.originalPrice && flipkart.originalPrice > flipkart.price && (
                    <span className="price-original text-lg">
                      {formatPrice(flipkart.originalPrice)}
                    </span>
                  )}
                  {flipkartDiscount > 0 && (
                    <span className="rounded bg-green-100 px-2 py-0.5 text-sm font-semibold text-green-700">
                      {flipkartDiscount}% off
                    </span>
                  )}
                </div>
                {flipkart.rating !== undefined && (
                  <div className="mt-3 flex items-center gap-2">
                    <StarRating rating={flipkart.rating} size="md" showValue />
                    {flipkart.reviewCount !== undefined && (
                      <span className="text-sm text-slate-400">
                        ({flipkart.reviewCount.toLocaleString('en-IN')} reviews)
                      </span>
                    )}
                  </div>
                )}
                <div className="mt-2 text-sm text-slate-500">
                  {flipkart.inStock ? (
                    <span className="text-green-600 font-medium">In Stock</span>
                  ) : (
                    <span className="text-red-500 font-medium">Out of Stock</span>
                  )}
                </div>
                <a
                  href={flipkart.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#2874f0] px-6 py-3 text-base font-bold text-white transition-all hover:bg-[#1a5dc8] hover:shadow-lg active:scale-[0.98]"
                >
                  Buy on Flipkart &rarr;
                </a>
              </>
            ) : (
              <p className="text-slate-400 mt-2">Not available on Flipkart</p>
            )}
          </div>
        </div>

        {/* Savings Banner */}
        {savings > 0 && bestPlatform && bestPlatform !== 'tie' && (
          <div className="savings-banner mt-5 rounded-xl px-5 py-3 text-center">
            <span className="text-base font-bold text-green-700">
              Save {formatPrice(savings)} by buying on{' '}
              {bestPlatform === 'amazon' ? 'Amazon' : 'Flipkart'}!
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
