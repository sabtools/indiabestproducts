import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ALL_MOCK_PRODUCTS as mockProducts } from '@/lib/data/mock-products';
import PriceComparisonCardLarge from './PriceComparisonCardLarge';
import PriceHistorySection from './PriceHistorySection';
import SpecsSection from './SpecsSection';
import SimilarProducts from './SimilarProducts';
import FAQSection from './FAQSection';

// ---------- Static Params ----------

export function generateStaticParams() {
  return mockProducts.map((p) => ({ slug: p.slug }));
}

// ---------- Helpers ----------

function getProduct(slug: string) {
  return mockProducts.find((p) => p.slug === slug);
}

function getPlatformData(product: ReturnType<typeof getProduct>, platform: string) {
  if (!product || !product.prices) return null;
  return product.prices.find(
    (p: { platform: string }) => p.platform.toLowerCase() === platform.toLowerCase()
  ) ?? null;
}

// ---------- Metadata ----------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: 'Product Not Found' };

  const amazon = getPlatformData(product, 'Amazon');
  const flipkart = getPlatformData(product, 'Flipkart');
  const lowestPrice = Math.min(
    ...[amazon?.price, flipkart?.price].filter((p): p is number => !!p && p > 0)
  );

  return {
    title: `${product.name} Price in India — Amazon vs Flipkart | IndiaBestProducts`,
    description: `Compare ${product.name} price across Amazon & Flipkart. Current lowest price: ₹${lowestPrice.toLocaleString('en-IN')}. Check ratings, specs, and where to buy.`,
    keywords: [
      product.name,
      `${product.name} price`,
      `${product.name} price in India`,
      `${product.name} Amazon`,
      `${product.name} Flipkart`,
      `${product.brand} ${product.category}`,
      'best price',
    ],
    openGraph: {
      title: `${product.name} — Best Price in India`,
      description: `Lowest price ₹${lowestPrice.toLocaleString('en-IN')}. Compare Amazon vs Flipkart.`,
      type: 'website',
    },
  };
}

// ---------- Page ----------

export default async function ProductPricePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const amazon = getPlatformData(product, 'Amazon');
  const flipkart = getPlatformData(product, 'Flipkart');

  const prices = [amazon?.price, flipkart?.price].filter((p): p is number => !!p && p > 0);
  const lowestPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const highestPrice = prices.length > 0 ? Math.max(...prices) : 0;
  const averagePrice = prices.length > 0 ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : 0;

  // Generate mock price history
  const priceHistory = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    const baseAmazon = amazon?.price ?? 0;
    const baseFlipkart = flipkart?.price ?? 0;
    const fluctuation = Math.sin(i * 0.5) * (baseAmazon * 0.03) + (Math.random() - 0.5) * (baseAmazon * 0.02);
    return {
      date: date.toISOString().split('T')[0],
      amazon: baseAmazon > 0 ? Math.round(baseAmazon + fluctuation) : null,
      flipkart: baseFlipkart > 0 ? Math.round(baseFlipkart + fluctuation * 0.8 + 100) : null,
    };
  });

  // Similar products: same brand or category
  const similar = mockProducts
    .filter(
      (p) =>
        p.slug !== product.slug &&
        (p.brand === product.brand || p.category === product.category)
    )
    .slice(0, 4);

  // JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    brand: { '@type': 'Brand', name: product.brand },
    category: product.category,
    ...(product.image && { image: product.image }),
    offers: [
      amazon && {
        '@type': 'Offer',
        priceCurrency: 'INR',
        price: amazon.price,
        availability: amazon.inStock
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
        seller: { '@type': 'Organization', name: 'Amazon.in' },
        url: amazon.url,
      },
      flipkart && {
        '@type': 'Offer',
        priceCurrency: 'INR',
        price: flipkart.price,
        availability: flipkart.inStock
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
        seller: { '@type': 'Organization', name: 'Flipkart' },
        url: flipkart.url,
      },
    ].filter(Boolean),
    aggregateRating: amazon?.rating
      ? {
          '@type': 'AggregateRating',
          ratingValue: amazon.rating,
          reviewCount: amazon.reviewCount || 100,
        }
      : undefined,
  };

  const formatPrice = (p: number) => '₹' + p.toLocaleString('en-IN');

  const faqs = [
    {
      q: `What is the lowest price of ${product.name}?`,
      a: `The lowest available price of ${product.name} is ${formatPrice(lowestPrice)}. We track prices across Amazon and Flipkart daily to bring you the best deal.`,
    },
    {
      q: `Is ${product.name} cheaper on Amazon or Flipkart?`,
      a: amazon && flipkart
        ? amazon.price < flipkart.price
          ? `Currently, ${product.name} is cheaper on Amazon at ${formatPrice(amazon.price)} compared to Flipkart's ${formatPrice(flipkart.price)}.`
          : flipkart.price < amazon.price
          ? `Currently, ${product.name} is cheaper on Flipkart at ${formatPrice(flipkart.price)} compared to Amazon's ${formatPrice(amazon.price)}.`
          : `${product.name} is available at the same price on both platforms: ${formatPrice(amazon.price)}.`
        : `${product.name} is currently available on ${amazon ? 'Amazon' : 'Flipkart'}.`,
    },
    {
      q: `What are the key specifications of ${product.name}?`,
      a: `Check the detailed specifications table above for a complete list of ${product.name} features including display, processor, camera, battery, and more.`,
    },
    {
      q: `Is ${product.name} available with EMI options?`,
      a: `Both Amazon and Flipkart offer EMI options on ${product.name}. Check the respective platform for available EMI plans with your bank.`,
    },
    {
      q: `When will the price of ${product.name} drop?`,
      a: `Price trends shown in the price history chart above can help you predict future drops. Prices typically drop during major sales like Big Billion Days, Great Indian Festival, and Republic Day sales.`,
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container-main section-padding">
        {/* Breadcrumb */}
        <nav className="breadcrumb mb-6">
          <a href="/">Home</a>
          <span className="breadcrumb-separator">/</span>
          <a href="/prices">Prices</a>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{product.name}</span>
        </nav>

        {/* Page Title */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-2">
          {product.name} Price in India &mdash; Amazon vs Flipkart
        </h1>
        <p className="text-slate-500 mb-8 flex items-center gap-3 text-sm">
          <span>By {product.brand}</span>
          <span className="text-slate-300">|</span>
          <span>Last updated: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
        </p>

        {/* Large Price Comparison Card */}
        <PriceComparisonCardLarge
          product={product}
          amazon={amazon}
          flipkart={flipkart}
        />

        {/* Price Summary Box */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Lowest Price', value: formatPrice(lowestPrice), color: 'text-green-600' },
            { label: 'Highest Price', value: formatPrice(highestPrice), color: 'text-red-500' },
            { label: 'Average Price', value: formatPrice(averagePrice), color: 'text-slate-900' },
            {
              label: 'You Save',
              value: highestPrice > lowestPrice ? formatPrice(highestPrice - lowestPrice) : '₹0',
              color: 'text-green-600',
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-slate-200 bg-white p-4 text-center"
            >
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                {stat.label}
              </p>
              <p className={`mt-1 text-xl font-extrabold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Price History Chart */}
        <section className="mt-10">
          <PriceHistorySection priceHistory={priceHistory} />
        </section>

        {/* Where to Buy */}
        <section className="mt-10">
          <h2 className="text-xl font-extrabold text-slate-900 mb-4">Where to Buy</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {amazon && (
              <a
                href={amazon.url || '#'}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="flex items-center justify-between rounded-xl border-2 border-[#ff9900] bg-orange-50 p-5 transition-shadow hover:shadow-lg"
              >
                <div>
                  <p className="font-bold text-[#ff9900] text-lg">Amazon.in</p>
                  <p className="text-2xl font-extrabold text-slate-900 mt-1">
                    {formatPrice(amazon.price)}
                  </p>
                  {amazon.inStock ? (
                    <p className="text-sm text-green-600 font-medium mt-1">In Stock &bull; Free Delivery</p>
                  ) : (
                    <p className="text-sm text-red-500 font-medium mt-1">Out of Stock</p>
                  )}
                </div>
                <span className="rounded-lg bg-[#ff9900] px-5 py-3 text-white font-bold text-sm">
                  Buy Now &rarr;
                </span>
              </a>
            )}
            {flipkart && (
              <a
                href={flipkart.url || '#'}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="flex items-center justify-between rounded-xl border-2 border-[#2874f0] bg-blue-50 p-5 transition-shadow hover:shadow-lg"
              >
                <div>
                  <p className="font-bold text-[#2874f0] text-lg">Flipkart</p>
                  <p className="text-2xl font-extrabold text-slate-900 mt-1">
                    {formatPrice(flipkart.price)}
                  </p>
                  {flipkart.inStock ? (
                    <p className="text-sm text-green-600 font-medium mt-1">In Stock</p>
                  ) : (
                    <p className="text-sm text-red-500 font-medium mt-1">Out of Stock</p>
                  )}
                </div>
                <span className="rounded-lg bg-[#2874f0] px-5 py-3 text-white font-bold text-sm">
                  Buy Now &rarr;
                </span>
              </a>
            )}
          </div>
        </section>

        {/* Specs Table */}
        {product.specs && Object.keys(product.specs).length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-extrabold text-slate-900 mb-4">Full Specifications</h2>
            <SpecsSection specs={product.specs} />
          </section>
        )}

        {/* Similar Products */}
        {similar.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-extrabold text-slate-900 mb-4">Similar Products</h2>
            <SimilarProducts products={similar} />
          </section>
        )}

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="text-xl font-extrabold text-slate-900 mb-4">
            Frequently Asked Questions
          </h2>
          <FAQSection faqs={faqs} />
        </section>
      </div>
    </>
  );
}
