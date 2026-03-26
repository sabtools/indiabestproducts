import type { Metadata } from 'next';
import Link from 'next/link';
import { gadgets } from '@/lib/data/gadgets';
import type { Gadget, FAQ } from '@/lib/types';
import Breadcrumb from '@/components/layout/Breadcrumb';
import ProductCard from '@/components/product/ProductCard';
import FaqAccordion from '@/components/content/FaqAccordion';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Best Smartphones in India 2026 - Reviews, Prices & Comparison | IndiaBestProducts',
  description:
    'Compare the best smartphones in India for 2026. Samsung Galaxy S24, iPhone 15, OnePlus 12, Xiaomi 14, Realme GT 5 Pro & more. Real prices and expert reviews.',
  keywords: [
    'best smartphones india 2026',
    'best phone under 50000 india',
    'samsung vs iphone india',
    'flagship phone comparison india',
    'best camera phone india',
  ],
  alternates: { canonical: 'https://indiabestproducts.com/gadgets/phones' },
  openGraph: {
    title: 'Best Smartphones in India 2026 - Reviews, Prices & Comparison',
    description:
      'Find the best smartphones in India with honest reviews and real prices. From budget to flagship.',
    url: 'https://indiabestproducts.com/gadgets/phones',
    type: 'website',
  },
};

const priceRanges = [
  { label: 'All Phones', min: 0, max: Infinity },
  { label: 'Under Rs 30,000', min: 0, max: 30000 },
  { label: 'Rs 30,000 - 50,000', min: 30000, max: 50000 },
  { label: 'Rs 50,000 - 80,000', min: 50000, max: 80000 },
  { label: 'Above Rs 80,000', min: 80000, max: Infinity },
] as const;

const faqs: FAQ[] = [
  {
    question: 'Which is the best phone under Rs 30,000 in India?',
    answer:
      'The Samsung Galaxy A55 5G at Rs 29,999 is the best phone under Rs 30,000. It offers a Super AMOLED 120Hz display, 50MP OIS camera, IP67 water resistance, and 4 years of guaranteed OS updates — a winning combination at this price.',
  },
  {
    question: 'iPhone 15 or Samsung Galaxy S24 — which is better in India?',
    answer:
      'Both are excellent flagships. The iPhone 15 (Rs 69,900) excels in video recording, ecosystem integration, and longevity. The Samsung Galaxy S24 (Rs 74,999) offers Galaxy AI features, a brighter display, and more customization. Choose iPhone for simplicity and ecosystem, Samsung for AI features and flexibility.',
  },
  {
    question: 'Which phone has the best camera under Rs 50,000?',
    answer:
      'The Xiaomi 14 (Rs 49,999) has the best camera under Rs 50,000 with its Leica Summilux triple 50MP system. The OnePlus 12 (Rs 59,999) with Hasselblad tuning is also excellent if you can stretch your budget slightly.',
  },
  {
    question: 'Which phone charges the fastest in India?',
    answer:
      'The iQOO 12 and Realme GT 5 Pro both support 120W and 100W fast charging respectively, going from 0 to 100% in about 25 minutes. The OnePlus 12 with 100W SUPERVOOC takes about 26 minutes. These are the fastest-charging phones available in India.',
  },
  {
    question: 'Are Chinese smartphones safe to use in India?',
    answer:
      'Yes, brands like OnePlus, Xiaomi, Realme, and iQOO sell phones officially in India with local warranty, service centers, and compliance with Indian government regulations. They use Android with Google services. However, some may include bloatware which can be disabled in settings.',
  },
];

export default function PhonesPage() {
  const phones = gadgets
    .filter((g) => g.subcategory === 'smartphone')
    .sort((a, b) => {
      if (a.featured === b.featured) return b.rating - a.rating;
      return a.featured ? -1 : 1;
    });

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Gadgets', href: '/gadgets' },
    { label: 'Phones' },
  ];

  const listSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Best Smartphones in India 2026',
    numberOfItems: phones.length,
    itemListElement: phones.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.name,
      url: `https://indiabestproducts.com/gadgets/review/${p.slug}`,
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
            Best Smartphones in India 2026
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Compare {phones.length} top smartphones with real specs, camera samples, and
            best prices. Find your perfect phone from Samsung, Apple, OnePlus &amp; more.
          </p>
        </section>

        {/* Price Range Sub-Navigation */}
        <section className="mb-8">
          <h2 className="mb-3 text-center text-sm font-semibold uppercase tracking-wider text-slate-500">
            Browse by Price Range
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {priceRanges.map((range) => {
              const count = phones.filter(
                (p) => p.price >= range.min && p.price < range.max
              ).length;
              if (range.label !== 'All Phones' && count === 0) return null;
              return (
                <span
                  key={range.label}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm"
                >
                  {range.label}{' '}
                  <span className="text-slate-400">
                    ({range.label === 'All Phones' ? phones.length : count})
                  </span>
                </span>
              );
            })}
          </div>
        </section>

        {/* Phone Grid */}
        <section className="mb-14">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {phones.map((phone) => (
              <Link key={phone.id} href={`/gadgets/review/${phone.slug}`} className="block">
                <ProductCard product={phone} />
              </Link>
            ))}
          </div>
        </section>

        {/* Quick Picks */}
        <section className="mb-14">
          <h2 className="mb-6 text-center text-2xl font-bold text-slate-900">
            Quick Picks by Budget
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Best Under 30K',
                pick: 'Samsung Galaxy A55 5G',
                price: 'Rs 29,999',
                reason: 'IP67, AMOLED 120Hz, 4yr updates',
              },
              {
                title: 'Best Under 40K',
                pick: 'Realme GT 5 Pro',
                price: 'Rs 35,999',
                reason: 'SD 8 Gen 3, flagship performance',
              },
              {
                title: 'Best Under 50K',
                pick: 'Xiaomi 14',
                price: 'Rs 49,999',
                reason: 'Leica camera, compact, IP68',
              },
              {
                title: 'Best for Gaming',
                pick: 'iQOO 12',
                price: 'Rs 42,999',
                reason: '2K 144Hz, SD 8 Gen 3, 120W',
              },
              {
                title: 'Best Camera',
                pick: 'Samsung Galaxy S24',
                price: 'Rs 74,999',
                reason: 'Galaxy AI, 50MP, pro video',
              },
              {
                title: 'Best iOS',
                pick: 'Apple iPhone 15',
                price: 'Rs 69,900',
                reason: '48MP, A16 Bionic, USB-C',
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
            href="/gadgets/laptops"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-8 py-3.5 text-base font-bold text-white shadow-md transition-transform hover:scale-105"
          >
            Also Browse: Best Laptops in India &rarr;
          </Link>
        </section>

        {/* FAQ */}
        <section className="mb-14">
          <h2 className="mb-6 text-center text-2xl font-bold text-slate-900">
            Smartphone Buying Guide - FAQs
          </h2>
          <div className="mx-auto max-w-3xl">
            <FaqAccordion items={faqs} />
          </div>
        </section>
      </div>
    </>
  );
}
