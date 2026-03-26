import type { Metadata } from 'next';
import { insuranceProducts } from '@/lib/data/insurance';
import Breadcrumb from '@/components/layout/Breadcrumb';
import ComparisonTable from '@/components/product/ComparisonTable';
import FaqAccordion from '@/components/content/FaqAccordion';
import JsonLd from '@/components/seo/JsonLd';
import InsuranceGrid from './InsuranceGrid';

export const metadata: Metadata = {
  title: 'Best Insurance Plans in India 2026 - Health & Life Insurance | IndiaBestProducts',
  description:
    'Compare the best health insurance and term life insurance plans in India 2026. Claim settlement ratios, premiums, coverage details, and expert reviews.',
  keywords: [
    'best insurance india 2026',
    'health insurance comparison',
    'term life insurance',
    'best health insurance plan',
    'highest claim settlement ratio',
    'family health insurance india',
    'cheapest term insurance',
  ],
  alternates: { canonical: 'https://indiabestproducts.com/insurance' },
  openGraph: {
    title: 'Best Insurance Plans in India 2026 - Health & Life Insurance',
    description: 'Compare health insurance and term life insurance plans from top insurers in India.',
    url: 'https://indiabestproducts.com/insurance',
    type: 'website',
  },
};

const faqs = [
  {
    question: 'What types of insurance are essential in India?',
    answer:
      'Every Indian should have at least two types of insurance: health insurance to cover medical expenses and hospitalization costs, and term life insurance to financially protect their family in case of an unfortunate event. The ideal coverage depends on your age, income, and family size.',
  },
  {
    question: 'How much health insurance coverage do I need?',
    answer:
      'For a young individual, Rs 5 to 10 lakh coverage is a good starting point. For families, Rs 10 to 25 lakh is recommended. Those in metro cities should consider Rs 15 to 50 lakh due to higher medical costs. The coverage should be enough to handle a major hospitalization event comfortably.',
  },
  {
    question: 'What is the claim settlement ratio and why does it matter?',
    answer:
      'Claim settlement ratio (CSR) indicates the percentage of claims an insurer settled out of total claims received. A higher CSR means the insurer is more likely to pay your claim. Look for insurers with CSR above 90% for health insurance and above 95% for term life insurance.',
  },
  {
    question: 'Can I buy insurance online in India?',
    answer:
      'Yes, all major insurers offer online purchase options. Buying online is often cheaper (5% to 15% discount) as it eliminates agent commissions. You can compare plans, calculate premiums, and buy policies directly from insurer websites or aggregator platforms.',
  },
  {
    question: 'What is the waiting period in health insurance?',
    answer:
      'Health insurance has multiple waiting periods: an initial waiting period of 30 days (no claims except accidents), a 2-year waiting for specific illnesses like hernias, and a 24 to 48-month waiting for pre-existing diseases. Some insurers offer options to reduce pre-existing disease waiting periods with add-on riders.',
  },
];

const comparisonFeatures = [
  { key: 'premiumStartsFrom', label: 'Premium Starts From' },
  { key: 'claimSettlementRatio', label: 'Claim Settlement Ratio' },
  { key: 'coverageMax', label: 'Max Coverage' },
  { key: 'networkHospitals', label: 'Network Hospitals' },
  { key: 'waitingPeriod', label: 'Waiting Period' },
  { key: 'preExistingWaiting', label: 'Pre-existing Wait' },
  { key: 'renewalAge', label: 'Renewal Age' },
];

export default function InsuranceHubPage() {
  const topPlans = [...insuranceProducts].sort((a, b) => b.rating - a.rating).slice(0, 5);

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Best Insurance Plans in India 2026',
    description:
      'Compare the best health insurance and term life insurance plans in India. Expert reviews, claim settlement ratios, and premium details.',
    url: 'https://indiabestproducts.com/insurance',
    datePublished: '2026-03-26',
    dateModified: '2026-03-26',
  };

  return (
    <>
      <JsonLd data={pageSchema} />

      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="container-main py-3">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Insurance' },
            ]}
          />
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-r from-emerald-700 to-teal-800 py-12 text-white">
        <div className="container-main">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Best Insurance Plans in India 2026</h1>
          <p className="text-lg text-emerald-100 max-w-2xl">
            Compare health insurance and term life insurance plans from India&apos;s top insurers.
            Make an informed choice to protect yourself and your family.
          </p>
        </div>
      </section>

      {/* Client-side filterable grid */}
      <InsuranceGrid products={insuranceProducts} />

      {/* Comparison Section */}
      <section className="section-padding bg-slate-50">
        <div className="container-main">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Quick Comparison - Top Rated Plans</h2>
          <p className="text-slate-600 mb-6">
            Side-by-side comparison of the top 5 highest-rated insurance plans across all categories.
          </p>
          <ComparisonTable
            products={topPlans}
            features={comparisonFeatures}
            highlightIndex={0}
            highlightLabel="Top Rated"
          />
        </div>
      </section>

      {/* Why You Need Insurance */}
      <section className="section-padding">
        <div className="container-main">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Why You Need Insurance</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Medical Cost Protection',
                desc: 'A single hospitalization in India can cost Rs 2 to 10 lakh or more. Health insurance ensures you get the best treatment without financial stress.',
                icon: '🏥',
              },
              {
                title: 'Family Financial Security',
                desc: 'Term life insurance provides your family with a lump sum or monthly income if something happens to you, ensuring their lifestyle and goals are protected.',
                icon: '👨‍👩‍👧‍👦',
              },
              {
                title: 'Tax Benefits',
                desc: 'Insurance premiums qualify for tax deductions under Section 80C (life insurance) and Section 80D (health insurance), saving you Rs 15,000 to 75,000 in taxes annually.',
                icon: '💰',
              },
              {
                title: 'Rising Healthcare Costs',
                desc: 'Medical inflation in India is 10 to 14% per year, much higher than general inflation. What costs Rs 5 lakh today may cost Rs 20 lakh in 15 years.',
                icon: '📈',
              },
              {
                title: 'Cashless Treatment',
                desc: 'With health insurance, you can get cashless treatment at network hospitals. The insurer settles the bill directly, so you do not need to arrange funds during emergencies.',
                icon: '💳',
              },
              {
                title: 'Peace of Mind',
                desc: 'Knowing that you and your family are financially protected against medical emergencies and life risks gives you peace of mind to focus on living your life fully.',
                icon: '🛡️',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span className="text-3xl mb-3 block">{item.icon}</span>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Categories */}
      <section className="section-padding bg-slate-50">
        <div className="container-main">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Explore Insurance Categories</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <a
              href="/insurance/health"
              className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="text-4xl">🏥</span>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Health Insurance</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Compare family floater and individual health plans with cashless hospitalization from top insurers.
                </p>
                <span className="text-sm font-semibold text-emerald-600 mt-2 inline-block">
                  View Best Plans &rarr;
                </span>
              </div>
            </a>
            <a
              href="/insurance/term-life"
              className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="text-4xl">🛡️</span>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Term Life Insurance</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Protect your family with affordable term plans offering high coverage at low premiums.
                </p>
                <span className="text-sm font-semibold text-emerald-600 mt-2 inline-block">
                  View Best Plans &rarr;
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="section-padding">
        <div className="container-main max-w-4xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Complete Guide to Insurance in India 2026
          </h2>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              Insurance is one of the most important financial products every Indian should have. With rising medical costs and increasing uncertainties, having adequate health and life insurance coverage is no longer optional but essential. India&apos;s insurance sector offers plans from trusted companies like Star Health, HDFC Ergo, ICICI Lombard, HDFC Life, Max Life, and LIC, each with unique features and benefits.
            </p>
            <p>
              At IndiaBestProducts.com, we help you navigate the complex insurance landscape by comparing plans across key parameters like claim settlement ratio, premium affordability, coverage extent, network hospitals, and waiting periods. Our goal is to help you find the right insurance plan that offers maximum protection at a price you can afford.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-slate-50">
        <div className="container-main max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Frequently Asked Questions About Insurance
          </h2>
          <FaqAccordion items={faqs} />
        </div>
      </section>
    </>
  );
}
