import type { Metadata } from 'next';
import Link from 'next/link';
import { gadgets } from '@/lib/data/gadgets';
import type { Gadget, FAQ } from '@/lib/types';
import Breadcrumb from '@/components/layout/Breadcrumb';
import ProductCard from '@/components/product/ProductCard';
import FaqAccordion from '@/components/content/FaqAccordion';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Best Laptops in India 2026 - Reviews, Prices & Comparison | IndiaBestProducts',
  description:
    'Compare the best laptops in India for 2026. MacBook Air M3, HP Pavilion, Lenovo IdeaPad, ASUS VivoBook, Dell Inspiron & more. Real prices, specs & expert reviews.',
  keywords: [
    'best laptops india 2026',
    'laptop price comparison india',
    'best laptop under 50000',
    'gaming laptop india',
    'business laptop india',
  ],
  alternates: { canonical: 'https://indiabestproducts.com/gadgets/laptops' },
  openGraph: {
    title: 'Best Laptops in India 2026 - Reviews, Prices & Comparison',
    description:
      'Find the best laptops in India with honest reviews and real prices. From budget to premium.',
    url: 'https://indiabestproducts.com/gadgets/laptops',
    type: 'website',
  },
};

const priceRanges = [
  { label: 'All Laptops', min: 0, max: Infinity },
  { label: 'Under Rs 40,000', min: 0, max: 40000 },
  { label: 'Rs 40,000 - 60,000', min: 40000, max: 60000 },
  { label: 'Rs 60,000 - 80,000', min: 60000, max: 80000 },
  { label: 'Above Rs 80,000', min: 80000, max: Infinity },
] as const;

const faqs: FAQ[] = [
  {
    question: 'Which is the best laptop under Rs 40,000 in India?',
    answer:
      'The Lenovo IdeaPad Slim 3 at Rs 35,990 is the best laptop under Rs 40,000. It features AMD Ryzen 5 7520U, 8GB RAM, and 512GB SSD — great for students and everyday tasks.',
  },
  {
    question: 'Is MacBook Air M3 worth buying in India?',
    answer:
      'Yes, the MacBook Air M3 at Rs 1,14,900 is worth it for professionals and creatives. It delivers class-leading performance with 18 hours battery life, silent fanless design, and excellent build quality. However, if your budget is under Rs 70,000, Windows alternatives offer better value.',
  },
  {
    question: 'Which is the best gaming laptop under Rs 70,000?',
    answer:
      'The HP Victus Gaming Laptop at Rs 62,990 with NVIDIA RTX 4050, Intel Core i5-12450H, and 144Hz display is the best gaming laptop under Rs 70,000 in India.',
  },
  {
    question: 'How much RAM do I need in a laptop in 2026?',
    answer:
      '16GB RAM is the sweet spot for most users in 2026. It handles multitasking, web browsing with many tabs, office work, and light photo editing smoothly. 8GB is sufficient for basic tasks only. Go for 32GB if you do video editing or run virtual machines.',
  },
];

export default function LaptopsPage() {
  const laptops = gadgets
    .filter((g) => g.subcategory === 'laptop')
    .sort((a, b) => {
      if (a.featured === b.featured) return b.rating - a.rating;
      return a.featured ? -1 : 1;
    });

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Gadgets', href: '/gadgets' },
    { label: 'Laptops' },
  ];

  const listSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Best Laptops in India 2026',
    numberOfItems: laptops.length,
    itemListElement: laptops.map((l, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: l.name,
      url: `https://indiabestproducts.com/gadgets/review/${l.slug}`,
    })),
  };

  return (
    <>
      <JsonLd data={listSchema} />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumb items={breadcrumbItems} />

        {/* Hero */}
        <section className="mb-10 mt-6 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Best Laptops in India 2026
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Compare {laptops.length} top laptops with real specs, honest reviews, and best
            prices. From budget workhorses to premium ultrabooks.
          </p>
        </section>

        {/* Price Range Sub-Navigation */}
        <section className="mb-8">
          <h2 className="mb-3 text-center text-sm font-semibold uppercase tracking-wider text-slate-500">
            Browse by Price Range
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {priceRanges.map((range) => {
              const count = laptops.filter(
                (l) => l.price >= range.min && l.price < range.max
              ).length;
              if (range.label !== 'All Laptops' && count === 0) return null;
              return (
                <span
                  key={range.label}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm"
                >
                  {range.label}{' '}
                  <span className="text-slate-400">
                    ({range.label === 'All Laptops' ? laptops.length : count})
                  </span>
                </span>
              );
            })}
          </div>
        </section>

        {/* Laptop Grid */}
        <section className="mb-14">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {laptops.map((laptop) => (
              <Link key={laptop.id} href={`/gadgets/review/${laptop.slug}`} className="block">
                <ProductCard product={laptop} />
              </Link>
            ))}
          </div>
        </section>

        {/* Quick Picks */}
        <section className="mb-14">
          <h2 className="mb-6 text-center text-2xl font-bold text-slate-900">
            Quick Picks by Use Case
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Best for Students',
                pick: 'Lenovo IdeaPad Slim 3',
                price: 'Rs 35,990',
                reason: 'Affordable, lightweight, good battery',
              },
              {
                title: 'Best for Office',
                pick: 'Dell Inspiron 15',
                price: 'Rs 49,990',
                reason: 'Reliable build, great support',
              },
              {
                title: 'Best for Gaming',
                pick: 'HP Victus RTX 4050',
                price: 'Rs 62,990',
                reason: 'Dedicated GPU, 144Hz display',
              },
              {
                title: 'Best for Business',
                pick: 'Lenovo ThinkPad E14',
                price: 'Rs 68,990',
                reason: 'MIL-STD durability, best keyboard',
              },
              {
                title: 'Best Premium',
                pick: 'MacBook Air M3',
                price: 'Rs 1,14,900',
                reason: 'M3 chip, 18hr battery, silent',
              },
              {
                title: 'Best Value',
                pick: 'Acer Aspire 5',
                price: 'Rs 44,990',
                reason: 'DDR5, Thunderbolt 4, bright display',
              },
            ].map((pick) => (
              <div
                key={pick.title}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                  {pick.title}
                </p>
                <h3 className="mt-1 text-lg font-bold text-slate-900">{pick.pick}</h3>
                <p className="text-sm font-semibold text-emerald-600">{pick.price}</p>
                <p className="mt-1 text-sm text-slate-500">{pick.reason}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Also Browse */}
        <section className="mb-14 text-center">
          <Link
            href="/gadgets/phones"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-8 py-3.5 text-base font-bold text-white shadow-md transition-transform hover:scale-105"
          >
            Also Browse: Best Phones in India &rarr;
          </Link>
        </section>

        {/* FAQ */}
        <section className="mb-14">
          <h2 className="mb-6 text-center text-2xl font-bold text-slate-900">
            Laptop Buying Guide - FAQs
          </h2>
          <div className="mx-auto max-w-3xl">
            <FaqAccordion items={faqs} />
          </div>
        </section>
      </div>
    </>
  );
}
