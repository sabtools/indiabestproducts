import type { Metadata } from 'next';
import Link from 'next/link';
import { insuranceProducts } from '@/lib/data/insurance';
import type { Insurance, InsuranceSubcategory } from '@/lib/types';
import Breadcrumb from '@/components/layout/Breadcrumb';
import ProductCard from '@/components/product/ProductCard';
import ComparisonTable from '@/components/product/ComparisonTable';
import FaqAccordion from '@/components/content/FaqAccordion';
import JsonLd from '@/components/seo/JsonLd';

/* ── Type configuration ── */

interface InsuranceTypeConfig {
  subcategory: InsuranceSubcategory;
  displayName: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  comparisonFeatures: { key: string; label: string }[];
  faqs: { question: string; answer: string }[];
}

const INSURANCE_TYPES: Record<string, InsuranceTypeConfig> = {
  health: {
    subcategory: 'health',
    displayName: 'Health Insurance',
    description:
      'Health insurance plans in India cover hospitalization expenses, day care procedures, pre and post hospitalization costs, and more. With medical inflation running at 10 to 14% annually, health insurance is essential for every Indian family.',
    metaTitle: 'Best Health Insurance Plans in India 2026 - Compare & Buy Online | IndiaBestProducts',
    metaDescription:
      'Compare the best health insurance plans in India 2026. Star Health, HDFC Ergo, ICICI Lombard, Niva Bupa, Care Health compared. Claim settlement ratios, premiums, and coverage.',
    comparisonFeatures: [
      { key: 'premiumStartsFrom', label: 'Premium Starts From' },
      { key: 'claimSettlementRatio', label: 'Claim Settlement Ratio' },
      { key: 'coverageMax', label: 'Max Coverage' },
      { key: 'networkHospitals', label: 'Network Hospitals' },
      { key: 'waitingPeriod', label: 'Initial Waiting Period' },
      { key: 'preExistingWaiting', label: 'Pre-existing Wait' },
      { key: 'renewalAge', label: 'Renewal Age' },
      { key: 'entryAgeMax', label: 'Max Entry Age' },
    ],
    faqs: [
      { question: 'Which health insurance company has the highest claim settlement ratio?', answer: 'Among general insurers, ICICI Lombard has one of the highest claim settlement ratios at 98.74% for FY 2023-24. Among standalone health insurers, Star Health leads with the largest market share. When choosing, consider both the CSR and the overall claims experience.' },
      { question: 'Is family floater better than individual health insurance?', answer: 'Family floater plans are more cost-effective for families as one sum insured covers all members at a single premium. However, if one member makes a large claim, the coverage for others reduces. For families with senior members, individual plans may be better to avoid age-loading on the entire family premium.' },
      { question: 'What does cashless hospitalization mean?', answer: 'With cashless hospitalization, the insurer directly settles the hospital bill with the network hospital. You only need to show your health card and fill authorization forms. No upfront cash payment is needed from your side, except for non-covered items.' },
      { question: 'Should I buy a super top-up plan?', answer: 'Yes, a super top-up plan is a cost-effective way to increase your health coverage. It kicks in after your base plan deductible is exhausted. For example, a Rs 10 lakh super top-up with Rs 5 lakh deductible costs very little but provides excellent protection for major medical events.' },
      { question: 'Can I port my health insurance to another company?', answer: 'Yes, IRDAI allows portability of health insurance. You can switch insurers while retaining waiting period credits for pre-existing conditions. Apply for portability at least 45 days before your renewal date. The new insurer may accept or modify terms based on your medical history.' },
    ],
  },
  'term-life': {
    subcategory: 'term-life',
    displayName: 'Term Life Insurance',
    description:
      'Term life insurance is the most affordable way to secure your family financially. It provides a high life cover at a low premium and pays a lump sum or monthly income to your nominee in case of your untimely death during the policy term.',
    metaTitle: 'Best Term Life Insurance Plans in India 2026 - Compare Premiums | IndiaBestProducts',
    metaDescription:
      'Compare the best term life insurance plans in India 2026. HDFC Click2Protect, ICICI iProtect, Max Life, LIC Tech Term, SBI eShield compared. Claim settlement, premiums.',
    comparisonFeatures: [
      { key: 'premiumStartsFrom', label: 'Premium Starts From' },
      { key: 'claimSettlementRatio', label: 'Claim Settlement Ratio' },
      { key: 'coverageMax', label: 'Max Life Cover' },
      { key: 'renewalAge', label: 'Coverage Up To' },
      { key: 'entryAgeMin', label: 'Min Entry Age' },
      { key: 'entryAgeMax', label: 'Max Entry Age' },
    ],
    faqs: [
      { question: 'How much term life insurance cover do I need?', answer: 'A general rule is to have life cover of 10 to 15 times your annual income. For example, if your annual income is Rs 10 lakh, you should have a term cover of Rs 1 to 1.5 crore. Also factor in outstanding loans, children education costs, and family living expenses for at least 15 to 20 years.' },
      { question: 'Which term insurance has the highest claim settlement ratio?', answer: 'Max Life Insurance has the highest claim settlement ratio in the private sector at 99.51% for FY 2023-24. Among all insurers, LIC has consistently maintained a high CSR of over 98%. HDFC Life (98.01%) and ICICI Prudential (97.82%) also have strong track records.' },
      { question: 'Is return of premium term insurance worth it?', answer: 'Return of premium (ROP) plans refund all premiums paid if you survive the policy term. However, the premium for ROP is 40 to 70% higher than a regular term plan. Financially, you are better off buying a regular term plan and investing the saved premium in mutual funds or other instruments.' },
      { question: 'Should I add riders to my term insurance?', answer: 'Critical illness and accidental death riders can add valuable protection. A critical illness rider provides a lump sum on diagnosis of specified conditions, while an accidental death rider doubles the cover for accidental deaths. Evaluate the additional premium cost versus buying standalone policies for these covers.' },
      { question: 'Can I buy term insurance after age 50?', answer: 'Yes, most insurers allow entry up to age 60 or 65. However, premiums increase significantly with age. Medical tests become mandatory, and the maximum cover available may be lower. Buying early (in your 20s or 30s) locks in the lowest premiums for the entire policy term.' },
    ],
  },
};

/* ── Static params ── */

export function generateStaticParams() {
  return Object.keys(INSURANCE_TYPES).map((type) => ({ type }));
}

/* ── Metadata ── */

export async function generateMetadata({ params }: { params: Promise<{ type: string }> }): Promise<Metadata> {
  const { type } = await params;
  const config = INSURANCE_TYPES[type];
  if (!config) {
    return { title: 'Insurance Type Not Found | IndiaBestProducts' };
  }
  return {
    title: config.metaTitle,
    description: config.metaDescription,
    alternates: { canonical: `https://indiabestproducts.com/insurance/${type}` },
    openGraph: {
      title: config.metaTitle,
      description: config.metaDescription,
      url: `https://indiabestproducts.com/insurance/${type}`,
      type: 'website',
    },
  };
}

/* ── Page ── */

export default async function InsuranceTypePage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  const config = INSURANCE_TYPES[type];

  if (!config) {
    return (
      <div className="container-main section-padding text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Insurance Type Not Found</h1>
        <p className="text-slate-600 mb-6">The insurance category you are looking for does not exist.</p>
        <a href="/insurance" className="text-emerald-600 font-semibold hover:underline">
          Browse All Insurance Plans &rarr;
        </a>
      </div>
    );
  }

  const filteredProducts = insuranceProducts
    .filter((p) => p.subcategory === config.subcategory)
    .sort((a, b) => b.rating - a.rating);

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Best ${config.displayName} Plans in India 2026`,
    description: config.metaDescription,
    url: `https://indiabestproducts.com/insurance/${type}`,
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
              { label: 'Insurance', href: '/insurance' },
              { label: config.displayName },
            ]}
          />
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-r from-emerald-700 to-teal-800 py-12 text-white">
        <div className="container-main">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Best {config.displayName} Plans in India 2026
          </h1>
          <p className="text-lg text-emerald-100 max-w-2xl">{config.description}</p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="section-padding">
        <div className="container-main">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Top {config.displayName} Plans ({filteredProducts.length} products)
          </h2>
          {filteredProducts.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
              <p className="text-slate-500 text-lg">No plans listed yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <Link key={product.id} href={`/insurance/review/${product.slug}`} className="block">
                  <ProductCard product={product} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Comparison Table with Claim Settlement Ratio prominently shown */}
      {filteredProducts.length > 1 && (
        <section className="section-padding bg-slate-50">
          <div className="container-main">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              {config.displayName} Comparison Table
            </h2>
            <p className="text-slate-600 mb-6">
              Compare claim settlement ratios, premiums, coverage, and features of all {config.displayName.toLowerCase()} plans.
            </p>
            <ComparisonTable
              products={filteredProducts}
              features={config.comparisonFeatures}
              highlightIndex={0}
              highlightLabel="Top Rated"
            />
          </div>
        </section>
      )}

      {/* Claim Settlement Ratio Highlight */}
      <section className="section-padding">
        <div className="container-main">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Claim Settlement Ratios at a Glance
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                  <span className="text-lg font-bold text-emerald-700">
                    {p.claimSettlementRatio.split('%')[0]}%
                  </span>
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{p.name}</p>
                  <p className="text-xs text-slate-500">{p.claimSettlementRatio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-slate-50">
        <div className="container-main max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            {config.displayName} FAQs
          </h2>
          <FaqAccordion items={config.faqs} />
        </div>
      </section>
    </>
  );
}
