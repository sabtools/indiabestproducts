import type { Metadata } from 'next';
import { hostingPlans } from '@/lib/data/hosting';
import ProductCard from '@/components/product/ProductCard';
import ComparisonTable from '@/components/product/ComparisonTable';
import FaqAccordion from '@/components/content/FaqAccordion';
import Breadcrumb from '@/components/layout/Breadcrumb';
import type { FAQ } from '@/lib/types';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Best Web Hosting in India 2026 — Compare Plans, Pricing & Uptime',
  description:
    'Compare the best web hosting providers in India for 2026. Hostinger, Bluehost, HostGator, A2 Hosting & SiteGround. Plans starting from Rs 69/month.',
  keywords: [
    'best web hosting India',
    'cheap hosting India',
    'hostinger vs bluehost',
    'wordpress hosting India',
    'web hosting comparison India 2026',
  ],
  alternates: {
    canonical: 'https://indiabestproducts.com/hosting',
  },
  openGraph: {
    title: 'Best Web Hosting in India 2026 — Compare Plans, Pricing & Uptime',
    description:
      'Compare the best web hosting providers in India for 2026. Plans starting from Rs 69/month.',
    url: 'https://indiabestproducts.com/hosting',
    type: 'website',
  },
};

const comparisonFeatures = [
  { key: 'monthlyPriceMin', label: 'Starting Price (per month)' },
  { key: 'uptime', label: 'Uptime Guarantee' },
  { key: 'storage', label: 'Storage' },
  { key: 'bandwidth', label: 'Bandwidth' },
  { key: 'freeDomain', label: 'Free Domain' },
  { key: 'freeSSL', label: 'Free SSL' },
  { key: 'cpanel', label: 'cPanel' },
  { key: 'wordpressOptimized', label: 'WordPress Optimized' },
];

const faqs: FAQ[] = [
  {
    question: 'Which is the cheapest web hosting in India?',
    answer:
      'Hostinger is the cheapest web hosting in India with plans starting at just Rs 69 per month. It offers free domain, SSL, and 99.9% uptime guarantee. HostGator India starts at Rs 99/month and is another affordable option with a local data center.',
  },
  {
    question: 'Which hosting is best for WordPress in India?',
    answer:
      'Both Bluehost and SiteGround are officially recommended by WordPress.org. Bluehost is more affordable (from Rs 169/month) with one-click WordPress install. SiteGround offers superior performance and support but at a higher price (from Rs 299/month). Hostinger also offers excellent WordPress-optimized hosting at the lowest price.',
  },
  {
    question: 'Do I need web hosting if I use a website builder?',
    answer:
      'Website builders like Wix and Squarespace include hosting in their plans. However, if you use WordPress, you need separate hosting. Self-hosted WordPress gives you more control, better SEO, and lower long-term costs compared to website builders.',
  },
  {
    question: 'What is the difference between shared hosting and cloud hosting?',
    answer:
      'Shared hosting means your website shares server resources with other websites, making it cheaper but sometimes slower. Cloud hosting uses multiple servers for better reliability and performance, and can scale resources as needed. Shared hosting starts from Rs 69/month while cloud hosting typically starts from Rs 699/month.',
  },
  {
    question: 'Should I choose hosting with an Indian server?',
    answer:
      'If your target audience is primarily in India, choosing a host with Indian server locations (like Hostinger or HostGator India) can improve loading speeds for your visitors. However, using a CDN with any hosting provider can also solve latency issues effectively.',
  },
];

export default function HostingPage() {
  const sorted = [...hostingPlans].sort((a, b) => b.rating - a.rating);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Web Hosting' },
        ]}
      />

      {/* Hero */}
      <section className="mb-10 mt-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Best Web Hosting in India 2026
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">
          Compare India&apos;s top web hosting providers side by side. We test uptime, speed, support,
          and pricing to help you find the perfect hosting for your website, blog, or online store.
        </p>
      </section>

      {/* Quick Stats */}
      <section className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-blue-600">{hostingPlans.length}</p>
          <p className="text-sm text-slate-500">Hosts Compared</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-emerald-600">Rs 69</p>
          <p className="text-sm text-slate-500">Starting From</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-amber-600">99.9%</p>
          <p className="text-sm text-slate-500">Uptime Guaranteed</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-purple-600">Free</p>
          <p className="text-sm text-slate-500">SSL on All Plans</p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900">All Hosting Providers</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((plan) => (
            <Link key={plan.id} href={`/hosting/${plan.slug}`} className="block">
              <ProductCard product={plan} />
            </Link>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900">
          Hosting Comparison Table
        </h2>
        <ComparisonTable
          products={sorted}
          features={comparisonFeatures}
          highlightIndex={0}
          highlightLabel="Top Rated"
        />
      </section>

      {/* How to Choose */}
      <section className="mb-12 rounded-xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
        <h2 className="mb-4 text-2xl font-bold text-slate-900">
          How to Choose the Right Web Hosting
        </h2>
        <div className="space-y-3 text-slate-700">
          <p>
            The best hosting for you depends on your website type, traffic, and technical expertise.
            Here is what to consider:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Budget:</strong> Shared hosting (Rs 69-299/month) is enough for most new websites.
              Cloud hosting is better for high-traffic sites.
            </li>
            <li>
              <strong>WordPress:</strong> If building with WordPress, choose a WordPress-optimized host
              like Bluehost, SiteGround, or Hostinger for best performance.
            </li>
            <li>
              <strong>Uptime:</strong> Look for 99.9% or better uptime guarantees. Every minute of
              downtime costs you visitors and revenue.
            </li>
            <li>
              <strong>Support:</strong> 24/7 support is essential. SiteGround leads in support quality,
              followed by Bluehost with phone support.
            </li>
            <li>
              <strong>Server location:</strong> For Indian audiences, choose Hostinger or HostGator
              which offer Indian server locations for faster loading.
            </li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900">
          Frequently Asked Questions
        </h2>
        <FaqAccordion items={faqs} />
      </section>
    </div>
  );
}
