import type { Metadata } from 'next';
import Link from 'next/link';
import { gadgets } from '@/lib/data/gadgets';
import type { Gadget, FAQ } from '@/lib/types';
import Breadcrumb from '@/components/layout/Breadcrumb';
import ProductCard from '@/components/product/ProductCard';
import FaqAccordion from '@/components/content/FaqAccordion';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Best Laptops & Phones in India 2026 - Reviews & Prices | IndiaBestProducts',
  description:
    'Find the best laptops and smartphones in India for 2026. Compare specs, prices, and ratings. Expert reviews of MacBook Air, Samsung Galaxy, iPhone, OnePlus & more.',
  keywords: [
    'best laptops india 2026',
    'best phones india 2026',
    'laptop price india',
    'smartphone comparison india',
    'gadget reviews india',
  ],
  alternates: { canonical: 'https://indiabestproducts.com/gadgets' },
  openGraph: {
    title: 'Best Laptops & Phones in India 2026 - Reviews & Prices',
    description:
      'Compare the best laptops and smartphones in India. Expert reviews, real prices, and buying guides.',
    url: 'https://indiabestproducts.com/gadgets',
    type: 'website',
  },
};

const categoryTabs = [
  { label: 'All Gadgets', value: 'all', href: '/gadgets' },
  { label: 'Laptops', value: 'laptop', href: '/gadgets/laptops' },
  { label: 'Phones', value: 'smartphone', href: '/gadgets/phones' },
] as const;

const priceRanges = [
  { label: 'Under 30K', min: 0, max: 30000 },
  { label: '30K - 50K', min: 30000, max: 50000 },
  { label: '50K - 80K', min: 50000, max: 80000 },
  { label: 'Above 80K', min: 80000, max: Infinity },
] as const;

const faqs: FAQ[] = [
  {
    question: 'Which is the best laptop to buy in India in 2026?',
    answer:
      'The best laptop depends on your budget and needs. For premium users, the Apple MacBook Air M3 (Rs 1,14,900) offers unmatched performance and battery life. For budget buyers, the Lenovo IdeaPad Slim 3 (Rs 35,990) gives excellent value. For gaming, the HP Victus with RTX 4050 (Rs 62,990) is ideal. For business, the Lenovo ThinkPad E14 (Rs 68,990) is the top pick.',
  },
  {
    question: 'Which is the best smartphone under Rs 50,000 in India?',
    answer:
      'Top smartphones under Rs 50,000 include the Xiaomi 14 (Rs 49,999) with Leica cameras and Snapdragon 8 Gen 3, the iQOO 12 (Rs 42,999) with 120W charging and 2K 144Hz display, and the Realme GT 5 Pro (Rs 35,999) offering flagship Snapdragon 8 Gen 3 at an aggressive price.',
  },
  {
    question: 'Is it better to buy a laptop from Amazon or Flipkart?',
    answer:
      'Both platforms offer genuine products with manufacturer warranty. Compare prices on both before buying as prices can differ by Rs 500-2000. Amazon often has better deals on premium laptops, while Flipkart tends to have better prices during Big Billion Days for mid-range devices. Always check seller ratings and choose fulfilled-by-platform options.',
  },
  {
    question: 'How do I choose between a laptop and a tablet in 2026?',
    answer:
      'Choose a laptop if you need to run desktop software, do heavy multitasking, code, or game. Choose a tablet for media consumption, light browsing, note-taking, and portability. For students, a laptop under Rs 40,000 like the Lenovo IdeaPad Slim 3 is usually the better investment.',
  },
  {
    question: 'Which brand offers the best after-sales service for laptops in India?',
    answer:
      'Dell and Lenovo (ThinkPad series) are widely regarded as having the best after-sales service networks in India with extensive service center coverage. Apple provides premium support through authorized centers. HP also has good service coverage in most cities.',
  },
];

export default function GadgetsPage() {
  const sortedGadgets = [...gadgets].sort((a, b) => {
    if (a.featured === b.featured) return b.rating - a.rating;
    return a.featured ? -1 : 1;
  });

  const laptops = gadgets.filter((g) => g.subcategory === 'laptop');
  const phones = gadgets.filter((g) => g.subcategory === 'smartphone');

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Gadgets' },
  ];

  const listSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Best Laptops & Phones in India 2026',
    numberOfItems: gadgets.length,
    itemListElement: sortedGadgets.slice(0, 10).map((g, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: g.name,
      url: `https://indiabestproducts.com/gadgets/review/${g.slug}`,
    })),
  };

  return (
    <>
      <JsonLd data={listSchema} />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Hero */}
        <section className="mb-10 mt-6 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Best Laptops &amp; Phones in India 2026
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Compare {gadgets.length} top gadgets with real specs, honest reviews, and the
            best prices. Find your perfect laptop or smartphone.
          </p>
        </section>

        {/* Category Tabs */}
        <section className="mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categoryTabs.map((tab) => (
              <Link
                key={tab.value}
                href={tab.href}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                  tab.value === 'all'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'border border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700'
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </div>
        </section>

        {/* Price Range Filter */}
        <section className="mb-8">
          <h2 className="mb-3 text-center text-sm font-semibold uppercase tracking-wider text-slate-500">
            Filter by Price
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {priceRanges.map((range) => {
              const count = gadgets.filter(
                (g) => g.price >= range.min && g.price < range.max
              ).length;
              return (
                <span
                  key={range.label}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600"
                >
                  {range.label} ({count})
                </span>
              );
            })}
          </div>
        </section>

        {/* All Gadgets Grid */}
        <section className="mb-14">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sortedGadgets.map((gadget) => (
              <Link key={gadget.id} href={`/gadgets/review/${gadget.slug}`} className="block">
                <ProductCard product={gadget} />
              </Link>
            ))}
          </div>
        </section>

        {/* Comparison Section */}
        <section className="mb-14 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-center text-white shadow-lg sm:p-12">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Quick Comparison: Laptops vs Phones
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-blue-100">
            Browse by category to find the perfect device. We cover {laptops.length} laptops
            and {phones.length} smartphones with real Indian prices.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/gadgets/laptops"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3.5 text-base font-bold text-blue-700 shadow-md transition-transform hover:scale-105"
            >
              Browse Laptops &rarr;
            </Link>
            <Link
              href="/gadgets/phones"
              className="inline-flex items-center gap-2 rounded-lg bg-white/20 px-8 py-3.5 text-base font-bold text-white shadow-md backdrop-blur-sm transition-transform hover:scale-105 hover:bg-white/30"
            >
              Browse Phones &rarr;
            </Link>
          </div>
        </section>

        {/* Category Quick Links */}
        <section className="mb-14">
          <h2 className="mb-6 text-center text-2xl font-bold text-slate-900">
            Browse by Category
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/gadgets/laptops"
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div>
                <h3 className="text-lg font-bold text-slate-900">Laptops</h3>
                <p className="mt-1 text-sm text-slate-500">
                  {laptops.length} laptops reviewed &mdash; From Rs{' '}
                  {Math.min(...laptops.map((l) => l.price)).toLocaleString('en-IN')} to Rs{' '}
                  {Math.max(...laptops.map((l) => l.price)).toLocaleString('en-IN')}
                </p>
              </div>
              <span className="text-xl text-slate-400">&rarr;</span>
            </Link>
            <Link
              href="/gadgets/phones"
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div>
                <h3 className="text-lg font-bold text-slate-900">Smartphones</h3>
                <p className="mt-1 text-sm text-slate-500">
                  {phones.length} phones reviewed &mdash; From Rs{' '}
                  {Math.min(...phones.map((p) => p.price)).toLocaleString('en-IN')} to Rs{' '}
                  {Math.max(...phones.map((p) => p.price)).toLocaleString('en-IN')}
                </p>
              </div>
              <span className="text-xl text-slate-400">&rarr;</span>
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-14">
          <h2 className="mb-6 text-center text-2xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
          <div className="mx-auto max-w-3xl">
            <FaqAccordion items={faqs} />
          </div>
        </section>

        {/* SEO Content */}
        <section className="mx-auto max-w-4xl rounded-xl bg-slate-50 p-8">
          <h2 className="mb-4 text-xl font-bold text-slate-900">
            How to Choose the Best Laptop or Phone in India
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-slate-600">
            <p>
              India&apos;s gadget market offers incredible variety, from budget devices under Rs 30,000
              to premium flagships above Rs 1 lakh. Whether you need a laptop for work, gaming, or
              studies, or a smartphone for photography, social media, or daily communication, making
              the right choice can save you money and improve your experience.
            </p>
            <p>
              <strong>For laptops:</strong> Consider your primary use case. Students and office
              workers do well with Intel Core i5 or AMD Ryzen 5 processors, 16GB RAM, and 512GB SSD
              storage. Gamers should look for dedicated GPUs like NVIDIA RTX 4050 or better. Creative
              professionals benefit from Apple&apos;s M-series chips or high-end Intel/AMD processors.
            </p>
            <p>
              <strong>For smartphones:</strong> Camera quality, battery life, and software updates
              matter most for the average Indian user. Flagships from Samsung, Apple, and OnePlus
              offer the best cameras and longest software support. Budget flagships from Realme and
              iQOO deliver top specs at aggressive prices.
            </p>
            <p>
              Always compare prices across Amazon and Flipkart, wait for major sales like Great
              Indian Festival or Big Billion Days, and check for bank card offers that can save you
              an additional 5-10% on your purchase.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
