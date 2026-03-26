import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hostingPlans } from '@/lib/data/hosting';
import type { HostingPlan, FAQ } from '@/lib/types';
import Breadcrumb from '@/components/layout/Breadcrumb';
import StarRating from '@/components/product/StarRating';
import ProsCons from '@/components/product/ProsCons';
import FeeTable from '@/components/product/FeeTable';
import ApplyButton from '@/components/product/ApplyButton';
import FaqAccordion from '@/components/content/FaqAccordion';
import ProductSchema from '@/components/seo/ProductSchema';
import RelatedProducts from '@/components/content/RelatedProducts';
import Link from 'next/link';

export function generateStaticParams() {
  return hostingPlans.map((plan) => ({
    slug: plan.slug,
  }));
}

function getPlan(slug: string): HostingPlan | undefined {
  return hostingPlans.find((p) => p.slug === slug);
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const plan = getPlan(params.slug);
  if (!plan) return {};

  return {
    title: plan.metaTitle,
    description: plan.metaDescription,
    keywords: plan.keywords,
    alternates: {
      canonical: `https://indiabestproducts.com/hosting/${plan.slug}`,
    },
    openGraph: {
      title: plan.metaTitle,
      description: plan.metaDescription,
      url: `https://indiabestproducts.com/hosting/${plan.slug}`,
      type: 'article',
    },
  };
}

function buildFaqs(plan: HostingPlan): FAQ[] {
  return [
    {
      question: `How much does ${plan.brand} hosting cost in India?`,
      answer: `${plan.brand} hosting plans start from Rs ${plan.monthlyPriceMin}/month and go up to Rs ${plan.monthlyPriceMax}/month. ${plan.freeDomain ? 'A free domain is included for the first year.' : 'A domain name is not included and needs to be purchased separately.'} All plans include ${plan.freeSSL ? 'free SSL certificate' : 'SSL'} and ${plan.uptime} uptime guarantee.`,
    },
    {
      question: `Is ${plan.brand} good for WordPress?`,
      answer: `${plan.wordpressOptimized ? `Yes, ${plan.brand} offers WordPress-optimized hosting with one-click installation and performance tuning.` : `${plan.brand} supports WordPress but is not specifically optimized for it.`} ${plan.brand} offers ${plan.storage} storage and ${plan.bandwidth} bandwidth. Support is available via ${plan.supportType.join(', ')}.`,
    },
    {
      question: `What is the uptime guarantee of ${plan.brand}?`,
      answer: `${plan.brand} offers ${plan.uptime}. Server locations include ${plan.serverLocation.join(', ')}. ${plan.backupFrequency} backups are included to protect your data.`,
    },
    {
      question: `Does ${plan.brand} use cPanel?`,
      answer: `${plan.cpanel ? `Yes, ${plan.brand} uses the standard cPanel control panel for website management, which is familiar to most users.` : `No, ${plan.brand} uses a custom control panel instead of cPanel. Their custom panel is designed to be user-friendly and includes all essential hosting management features.`}`,
    },
    {
      question: `Which ${plan.brand} plan should I choose?`,
      answer: `${plan.bestFor}. If you have a single website, the entry-level plan at Rs ${plan.plans[0]?.monthlyPrice}/month is sufficient. For multiple websites or more resources, consider the ${plan.plans.length > 1 ? plan.plans[1].name : 'higher'} plan. Business or high-traffic sites should look at the premium plans for better performance.`,
    },
  ];
}

export default function HostingDetailPage({ params }: { params: { slug: string } }) {
  const plan = getPlan(params.slug);
  if (!plan) notFound();

  const faqs = buildFaqs(plan);
  const relatedPlans = hostingPlans.filter((p) => p.id !== plan.id).slice(0, 4);

  const overviewFees = [
    { label: 'Starting Price', value: `Rs ${plan.monthlyPriceMin}/month` },
    { label: 'Max Plan Price', value: `Rs ${plan.monthlyPriceMax}/month` },
    { label: 'Free Domain', value: plan.freeDomain ? 'Yes (1st year)' : 'No' },
    { label: 'Free SSL', value: plan.freeSSL ? 'Yes' : 'No' },
    { label: 'Uptime Guarantee', value: plan.uptime },
    { label: 'Backup Frequency', value: plan.backupFrequency },
    { label: 'Server Locations', value: plan.serverLocation.join(', ') },
    { label: 'Support', value: plan.supportType.join(', ') },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <ProductSchema
        name={plan.name}
        brand={plan.brand}
        description={plan.metaDescription}
        image={plan.image}
        rating={plan.rating}
        reviewCount={200}
        price={plan.monthlyPriceMin.toString()}
        url={`https://indiabestproducts.com/hosting/${plan.slug}`}
      />

      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Web Hosting', href: '/hosting' },
          { label: plan.brand },
        ]}
      />

      {/* Header */}
      <header className="mb-8 mt-6">
        <div className="flex flex-wrap items-start gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 text-2xl font-bold text-white shadow">
            {plan.brand.charAt(0)}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              {plan.name} Review 2026
            </h1>
            <p className="mt-1 text-lg text-slate-500">
              {plan.brand} &mdash; {plan.subcategory.charAt(0).toUpperCase() + plan.subcategory.slice(1)} Hosting
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-4">
              <StarRating rating={plan.rating} size="lg" showValue />
              <span className="rounded-md bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700 ring-1 ring-emerald-200">
                From Rs {plan.monthlyPriceMin}/mo
              </span>
            </div>
          </div>
        </div>

        <p className="mt-5 text-lg leading-relaxed text-slate-700">
          {plan.bestFor}. In this review, we cover {plan.brand}&apos;s hosting plans, pricing, performance,
          uptime, support quality, and whether it is the right choice for your website in 2026.
        </p>

        <div className="mt-6">
          <ApplyButton href={plan.affiliateUrl} text={`Get ${plan.brand} Hosting`} />
        </div>
      </header>

      {/* Overview */}
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-slate-900">
          {plan.brand} Hosting Overview
        </h2>
        <FeeTable fees={overviewFees} title="Hosting Details" />
      </section>

      {/* Plans Comparison */}
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-slate-900">
          {plan.brand} Hosting Plans
        </h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[600px] text-sm">
            <thead>
              <tr className="bg-slate-50">
                <th className="border-b border-slate-200 px-4 py-3 text-left font-bold text-slate-600">Plan</th>
                <th className="border-b border-slate-200 px-4 py-3 text-center font-bold text-slate-600">Price/mo</th>
                <th className="border-b border-slate-200 px-4 py-3 text-center font-bold text-slate-600">Websites</th>
                <th className="border-b border-slate-200 px-4 py-3 text-center font-bold text-slate-600">Storage</th>
                <th className="border-b border-slate-200 px-4 py-3 text-center font-bold text-slate-600">Bandwidth</th>
                <th className="border-b border-slate-200 px-4 py-3 text-center font-bold text-slate-600">RAM</th>
              </tr>
            </thead>
            <tbody>
              {plan.plans.map((tier, i) => (
                <tr key={tier.name} className={i % 2 === 1 ? 'bg-slate-50/60' : 'bg-white'}>
                  <td className="border-b border-slate-100 px-4 py-3 font-semibold text-slate-900">
                    {tier.name}
                  </td>
                  <td className="border-b border-slate-100 px-4 py-3 text-center font-bold text-emerald-700">
                    Rs {tier.monthlyPrice}
                  </td>
                  <td className="border-b border-slate-100 px-4 py-3 text-center text-slate-700">
                    {tier.websites}
                  </td>
                  <td className="border-b border-slate-100 px-4 py-3 text-center text-slate-700">
                    {tier.storage}
                  </td>
                  <td className="border-b border-slate-100 px-4 py-3 text-center text-slate-700">
                    {tier.bandwidth}
                  </td>
                  <td className="border-b border-slate-100 px-4 py-3 text-center text-slate-700">
                    {tier.ram}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Key Features */}
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-slate-900">Key Features</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {plan.keyFeatures.map((feature, i) => (
            <div key={i} className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-100 text-xs font-bold text-purple-700">
                {i + 1}
              </span>
              <span className="text-sm text-slate-700">{feature}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-slate-900">Features at a Glance</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: 'Free Domain', value: plan.freeDomain },
            { label: 'Free SSL', value: plan.freeSSL },
            { label: 'cPanel', value: plan.cpanel },
            { label: 'WordPress Optimized', value: plan.wordpressOptimized },
          ].map((item) => (
            <div
              key={item.label}
              className={`rounded-lg border p-3 text-center ${
                item.value ? 'border-emerald-200 bg-emerald-50' : 'border-red-200 bg-red-50'
              }`}
            >
              <span className={`text-lg ${item.value ? 'text-emerald-600' : 'text-red-500'}`}>
                {item.value ? '\u2713' : '\u2717'}
              </span>
              <p className="mt-1 text-xs font-medium text-slate-700">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pros & Cons */}
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-slate-900">Pros & Cons</h2>
        <ProsCons pros={plan.pros} cons={plan.cons} />
      </section>

      {/* CTA */}
      <section className="mb-10 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-center text-white sm:p-8">
        <h2 className="mb-2 text-2xl font-bold">Launch Your Website Today</h2>
        <p className="mb-5 text-purple-100">
          Get {plan.brand} hosting starting from just Rs {plan.monthlyPriceMin}/month with {plan.uptime} uptime.
        </p>
        <a
          href={plan.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3 font-bold text-purple-700 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
        >
          Get {plan.brand} Hosting &rarr;
        </a>
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
        <FaqAccordion items={faqs} />
      </section>

      {/* Related */}
      <section className="mb-10">
        <RelatedProducts
          products={relatedPlans}
          title="Compare Other Hosting Providers"
          viewAllHref="/hosting"
        />
      </section>
    </div>
  );
}
