'use client';

import { useState, useMemo } from 'react';
import { ALL_MOCK_PRODUCTS as mockProducts } from '@/lib/data/mock-products';
import PriceComparisonCard from '@/components/product/PriceComparisonCard';

const categories = ['All', 'Phones', 'Laptops', 'Headphones', 'Smartwatches', 'TVs', 'Tablets'];
const sortOptions = [
  { value: 'best-price', label: 'Best Price' },
  { value: 'biggest-discount', label: 'Biggest Discount' },
  { value: 'highest-rated', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest' },
];

function extractPlatformData(product: (typeof mockProducts)[number], platform: string) {
  const p = product.prices?.find(
    (pr) => pr.platform.toLowerCase() === platform.toLowerCase()
  );
  if (!p) return {} as Record<string, undefined>;
  return {
    price: p.price,
    originalPrice: p.originalPrice,
    url: p.url,
    inStock: p.inStock,
    rating: p.rating,
    reviewCount: p.reviewCount,
  };
}

function getMinPrice(product: (typeof mockProducts)[number]): number {
  const prices = product.prices
    ?.map((p) => p.price)
    .filter((p) => p > 0) ?? [];
  return prices.length > 0 ? Math.min(...prices) : Infinity;
}

function getMaxDiscount(product: (typeof mockProducts)[number]): number {
  if (!product.prices) return 0;
  let max = 0;
  for (const p of product.prices) {
    if (p.originalPrice && p.price && p.originalPrice > p.price) {
      const disc = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
      if (disc > max) max = disc;
    }
  }
  return max;
}

function getMaxRating(product: (typeof mockProducts)[number]): number {
  if (!product.prices) return 0;
  let maxR = 0;
  for (const p of product.prices) {
    if (p.rating && p.rating > maxR) maxR = p.rating;
  }
  return maxR;
}

export default function PricesPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('best-price');

  const filtered = useMemo(() => {
    let result = [...mockProducts];

    // Category filter
    if (activeCategory !== 'All') {
      const cat = activeCategory.toLowerCase();
      result = result.filter(
        (p) => p.category?.toLowerCase() === cat || p.category?.toLowerCase().includes(cat.slice(0, -1))
      );
    }

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (sortBy) {
      case 'best-price':
        result.sort((a, b) => getMinPrice(a) - getMinPrice(b));
        break;
      case 'biggest-discount':
        result.sort((a, b) => getMaxDiscount(b) - getMaxDiscount(a));
        break;
      case 'highest-rated':
        result.sort((a, b) => getMaxRating(b) - getMaxRating(a));
        break;
      case 'newest':
        // Keep original order (newest first assumed)
        break;
    }

    return result;
  }, [search, activeCategory, sortBy]);

  // Top deals: top 5 by discount
  const topDeals = useMemo(() => {
    return [...mockProducts]
      .filter((p) => getMaxDiscount(p) > 0)
      .sort((a, b) => getMaxDiscount(b) - getMaxDiscount(a))
      .slice(0, 5);
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="hero-section">
        <div className="container-main relative z-10 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Compare Prices &mdash; Amazon vs Flipkart
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Find the best deals across platforms. Updated daily.
          </p>

          {/* Search bar */}
          <div className="mt-8 max-w-xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products... (e.g. iPhone, Samsung, OnePlus)"
                className="w-full rounded-xl border-0 bg-white/95 backdrop-blur px-5 py-4 pl-12 text-base text-slate-900 shadow-xl placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-white/30"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                &#128269;
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="container-main section-padding">
        {/* Today's Best Deals */}
        {topDeals.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">&#128293;</span>
              <h2 className="text-2xl font-extrabold text-slate-900">Today&apos;s Best Deals</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
              {topDeals.map((product) => {
                const amazon = extractPlatformData(product, 'Amazon');
                const flipkart = extractPlatformData(product, 'Flipkart');
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
          </section>
        )}

        {/* Category Tabs + Sort */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Product Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.slice(0, 20).map((product) => {
              const amazon = extractPlatformData(product, 'Amazon');
              const flipkart = extractPlatformData(product, 'Flipkart');
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
        ) : (
          <div className="text-center py-16">
            <p className="text-5xl mb-4">&#128270;</p>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No products found</h3>
            <p className="text-slate-500">
              Try adjusting your search or filter to find what you&apos;re looking for.
            </p>
          </div>
        )}

        {/* FAQ Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="faq-accordion">
            {[
              {
                q: 'How often are prices updated?',
                a: 'We update prices daily to ensure you get the most accurate comparison between Amazon and Flipkart. Prices shown are the latest available at the time of your visit.',
              },
              {
                q: 'Are the prices shown inclusive of all taxes?',
                a: 'Yes, all prices shown on our platform include GST and other applicable taxes, just as displayed on Amazon and Flipkart.',
              },
              {
                q: 'How do I know which platform has the best price?',
                a: 'We highlight the best price with a green "BEST PRICE" badge on the cheaper platform. The savings banner below also shows exactly how much you can save.',
              },
              {
                q: 'Do you earn commission from purchases?',
                a: 'Yes, we may earn a small affiliate commission when you buy through our links. This does not affect the price you pay — you pay the same price as buying directly on Amazon or Flipkart.',
              },
              {
                q: 'Can I set price drop alerts?',
                a: 'Price drop alert feature is coming soon! Stay tuned for updates.',
              },
            ].map((faq, i) => (
              <details key={i} className="faq-item group">
                <summary className="faq-question">
                  {faq.q}
                  <span className="faq-question-icon group-open:rotate-180 transition-transform">
                    &#9660;
                  </span>
                </summary>
                <div className="faq-answer-inner">{faq.a}</div>
              </details>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
