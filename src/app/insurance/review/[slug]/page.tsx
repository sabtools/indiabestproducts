import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { insuranceProducts } from '@/lib/data/insurance';
import type { Insurance } from '@/lib/types';
import Breadcrumb from '@/components/layout/Breadcrumb';
import StarRating from '@/components/product/StarRating';
import ProsCons from '@/components/product/ProsCons';
import FeeTable from '@/components/product/FeeTable';
import ApplyButton from '@/components/product/ApplyButton';
import FaqAccordion from '@/components/content/FaqAccordion';
import RelatedProducts from '@/components/content/RelatedProducts';
import JsonLd from '@/components/seo/JsonLd';
import { formatCurrency, formatNetworkHospitals, generateProductSchema } from '@/lib/utils';

/* ── Static params ── */

export function generateStaticParams() {
  return insuranceProducts.map((p) => ({ slug: p.slug }));
}

/* ── Metadata ── */

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = insuranceProducts.find((p) => p.slug === slug);
  if (!product) {
    return { title: 'Insurance Plan Not Found | IndiaBestProducts' };
  }
  return {
    title: product.metaTitle,
    description: product.metaDescription,
    keywords: product.keywords,
    alternates: { canonical: `https://indiabestproducts.com/insurance/review/${product.slug}` },
    openGraph: {
      title: product.metaTitle,
      description: product.metaDescription,
      url: `https://indiabestproducts.com/insurance/review/${product.slug}`,
      type: 'article',
      images: [{ url: product.image, width: 600, height: 400, alt: product.name }],
    },
  };
}

/* ── Helpers ── */

function getSubcategoryLabel(sub: string): string {
  const labels: Record<string, string> = {
    health: 'Health Insurance',
    'term-life': 'Term Life Insurance',
    motor: 'Motor Insurance',
    travel: 'Travel Insurance',
    home: 'Home Insurance',
  };
  return labels[sub] || sub;
}

function getSubcategorySlug(sub: string): string {
  return sub; // health, term-life already match the URL slugs
}

function generateInsuranceFaqs(product: Insurance) {
  const isHealth = product.subcategory === 'health';

  return [
    {
      question: `What is the claim settlement ratio of ${product.brand}?`,
      answer: `${product.brand} has a claim settlement ratio of ${product.claimSettlementRatio}. This indicates the percentage of claims that were successfully settled by the insurer out of total claims received.`,
    },
    {
      question: `What is the premium for ${product.name}?`,
      answer: `${product.name} premiums start from ${product.premiumStartsFrom}. The actual premium depends on your age, sum insured, plan variant, and number of members covered.`,
    },
    {
      question: `What is the coverage range for ${product.name}?`,
      answer: `${product.name} offers coverage from ${formatCurrency(product.coverageMin)} to ${formatCurrency(product.coverageMax)} (${product.coverageUnit}).`,
    },
    ...(isHealth
      ? [
          {
            question: `How many network hospitals does ${product.brand} have?`,
            answer: `${product.brand} has a network of ${formatNetworkHospitals(product.networkHospitals)} hospitals across India where you can avail cashless hospitalization. Check the insurer website for the updated list of network hospitals in your city.`,
          },
          {
            question: `What is the waiting period for pre-existing diseases?`,
            answer: `${product.name} has a pre-existing disease waiting period of ${product.preExistingWaiting}. The initial waiting period is ${product.waitingPeriod}. After the waiting period, pre-existing conditions are covered as per policy terms.`,
          },
        ]
      : [
          {
            question: `What payout options are available with ${product.name}?`,
            answer: `${product.name} offers multiple payout options including lump sum payment and monthly income to nominees. Check the plan options: ${product.planOptions.join(', ')}.`,
          },
          {
            question: `Who can buy ${product.name}?`,
            answer: `${product.name} is available for individuals aged ${product.entryAgeMin} to ${product.entryAgeMax} years. Coverage continues ${product.renewalAge.toLowerCase()}.`,
          },
        ]),
  ];
}

/* ── Page ── */

export default async function InsuranceReviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = insuranceProducts.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const subcategoryLabel = getSubcategoryLabel(product.subcategory);
  const subcategorySlug = getSubcategorySlug(product.subcategory);
  const isHealth = product.subcategory === 'health';

  const relatedProducts = insuranceProducts
    .filter((p) => p.id !== product.id && p.subcategory === product.subcategory)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  const faqs = generateInsuranceFaqs(product);
  const productSchema = generateProductSchema(product);

  const coverageDetails = [
    { label: 'Min Coverage', value: formatCurrency(product.coverageMin) },
    { label: 'Max Coverage', value: formatCurrency(product.coverageMax) },
    { label: 'Coverage Unit', value: product.coverageUnit },
    { label: 'Claim Settlement Ratio', value: product.claimSettlementRatio },
    { label: 'Premium Starts From', value: product.premiumStartsFrom },
    ...(isHealth
      ? [
          { label: 'Network Hospitals', value: formatNetworkHospitals(product.networkHospitals) },
          { label: 'Initial Waiting Period', value: product.waitingPeriod },
          { label: 'Pre-existing Wait', value: product.preExistingWaiting },
        ]
      : []),
    { label: 'Entry Age', value: `${product.entryAgeMin} to ${product.entryAgeMax} years` },
    { label: 'Renewal', value: product.renewalAge },
  ];

  return (
    <>
      <JsonLd data={productSchema} />

      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="container-main py-3">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Insurance', href: '/insurance' },
              { label: subcategoryLabel, href: `/insurance/${subcategorySlug}` },
              { label: product.name },
            ]}
          />
        </div>
      </div>

      {/* Main Content */}
      <article className="section-padding">
        <div className="container-main">
          <div className="lg:grid lg:grid-cols-3 lg:gap-10">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-10">
              {/* Header */}
              <header>
                <div className="flex items-center gap-3 mb-3">
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 uppercase">
                    {subcategoryLabel}
                  </span>
                  {product.featured && (
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700 uppercase">
                      Featured
                    </span>
                  )}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                  {product.name} Review 2026
                </h1>
                <p className="text-lg text-slate-600 mb-4">{product.bestFor}</p>
                <div className="flex items-center gap-4 flex-wrap">
                  <StarRating rating={product.rating} size="lg" showValue />
                  <span className="text-sm text-slate-500">
                    Last updated: {new Date(product.lastUpdated).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>
              </header>

              {/* Claim Settlement Highlight */}
              <section className="rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
                    <span className="text-lg font-bold">{product.claimSettlementRatio.split('%')[0]}%</span>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-emerald-900">Claim Settlement Ratio</h2>
                    <p className="text-sm text-emerald-700">{product.claimSettlementRatio}</p>
                    <p className="text-xs text-emerald-600 mt-1">
                      {parseFloat(product.claimSettlementRatio) >= 95
                        ? 'Excellent track record of settling claims'
                        : parseFloat(product.claimSettlementRatio) >= 80
                        ? 'Good claim settlement record'
                        : 'Review claim settlement experience before buying'}
                    </p>
                  </div>
                </div>
              </section>

              {/* Key Features */}
              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-4">Key Features</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {product.keyFeatures.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4"
                    >
                      <span className="mt-0.5 text-emerald-500 shrink-0">&#10003;</span>
                      <span className="text-sm text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Coverage Details */}
              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-4">Coverage Details</h2>
                <FeeTable fees={coverageDetails} title="Plan Details" />
              </section>

              {/* Plan Options */}
              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-4">Plan Options</h2>
                <div className="flex flex-wrap gap-3">
                  {product.planOptions.map((option, i) => (
                    <span
                      key={i}
                      className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700"
                    >
                      {option}
                    </span>
                  ))}
                </div>
              </section>

              {/* Rating Breakdown */}
              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-4">Rating Breakdown</h2>
                <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
                  {Object.entries(product.ratingBreakdown).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-4">
                      <span className="w-24 text-sm font-medium text-slate-600 capitalize">{key}</span>
                      <div className="flex-1 h-3 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-amber-400"
                          style={{ width: `${(value / 5) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-slate-900 w-10 text-right">{value}/5</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Pros & Cons */}
              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-4">Pros &amp; Cons</h2>
                <ProsCons pros={product.pros} cons={product.cons} />
              </section>

              {/* Inclusions */}
              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-4">
                  {isHealth ? 'What Is Covered (Inclusions)' : 'Benefits Included'}
                </h2>
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-6">
                  <ul className="space-y-3">
                    {product.inclusions.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-700">
                        <span className="mt-1 text-emerald-500 shrink-0">&#10004;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* Exclusions */}
              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-4">
                  {isHealth ? 'What Is Not Covered (Exclusions)' : 'Exclusions'}
                </h2>
                <div className="rounded-xl border border-red-200 bg-red-50/50 p-6">
                  <ul className="space-y-3">
                    {product.exclusions.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-700">
                        <span className="mt-1 text-red-500 shrink-0">&#10008;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* Claim Process (Health) */}
              {isHealth && (
                <section>
                  <h2 className="text-xl font-bold text-slate-900 mb-4">How to File a Claim</h2>
                  <div className="space-y-4">
                    {[
                      { step: 1, title: 'Inform the Insurer', desc: `Contact ${product.brand} helpline or use the mobile app to intimate the claim within 24 to 48 hours of hospitalization.` },
                      { step: 2, title: 'Cashless or Reimbursement', desc: 'For cashless, show your health card at a network hospital. For reimbursement, pay the hospital and collect all original bills and reports.' },
                      { step: 3, title: 'Submit Documents', desc: 'Submit the claim form along with discharge summary, hospital bills, diagnostic reports, pharmacy bills, and your health card copy.' },
                      { step: 4, title: 'Claim Processing', desc: `${product.brand} reviews the documents and processes the claim. Cashless claims are usually settled at discharge. Reimbursement claims take 15 to 30 days.` },
                      { step: 5, title: 'Settlement', desc: 'Approved claims are settled directly with the hospital (cashless) or transferred to your bank account (reimbursement). Any queries are communicated via email or phone.' },
                    ].map((item) => (
                      <div key={item.step} className="flex items-start gap-4">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
                          {item.step}
                        </span>
                        <div>
                          <h3 className="font-bold text-slate-900">{item.title}</h3>
                          <p className="text-sm text-slate-600 mt-1">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* FAQ */}
              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
                <FaqAccordion items={faqs} />
              </section>
            </div>

            {/* Right Column - Sidebar */}
            <aside className="mt-10 lg:mt-0">
              <div className="sticky top-4 space-y-6">
                {/* CTA Card */}
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="text-center mb-4">
                    <p className="text-sm text-slate-500 mb-1">Claim Settlement</p>
                    <p className="text-3xl font-bold text-emerald-700">
                      {product.claimSettlementRatio.split('%')[0]}%
                    </p>
                    <p className="text-xs text-slate-400">{product.claimSettlementRatio.split('(')[1]?.replace(')', '') || ''}</p>
                  </div>
                  <div className="space-y-3 mb-5">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Premium From</span>
                      <span className="font-semibold text-slate-900 text-right max-w-[160px] text-xs">
                        {product.premiumStartsFrom.split('(')[0].trim()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Max Coverage</span>
                      <span className="font-semibold text-slate-900">{formatCurrency(product.coverageMax)}</span>
                    </div>
                    {isHealth && (
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Hospitals</span>
                        <span className="font-semibold text-slate-900">{formatNetworkHospitals(product.networkHospitals)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Entry Age</span>
                      <span className="font-semibold text-slate-900">{product.entryAgeMin}-{product.entryAgeMax} years</span>
                    </div>
                  </div>
                  <ApplyButton
                    href={product.affiliateUrl}
                    text={isHealth ? 'Get Quote' : 'Get Quote'}
                  />
                  <p className="text-xs text-slate-400 text-center mt-3">
                    On {product.brand}&apos;s website. T&amp;C apply.
                  </p>
                </div>

                {/* Quick Info */}
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">Quick Info</h3>
                  <dl className="space-y-3 text-sm">
                    <div>
                      <dt className="text-slate-500">Brand</dt>
                      <dd className="font-semibold text-slate-900">{product.brand}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Type</dt>
                      <dd className="font-semibold text-slate-900">{subcategoryLabel}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Renewal</dt>
                      <dd className="font-semibold text-slate-900">{product.renewalAge}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Rating</dt>
                      <dd>
                        <StarRating rating={product.rating} size="sm" showValue />
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* Sticky CTA Bar (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-slate-200 bg-white p-3 shadow-lg lg:hidden">
        <div className="flex items-center justify-between gap-4 container-main">
          <div>
            <p className="text-sm font-bold text-slate-900">{product.name}</p>
            <p className="text-xs text-slate-500">CSR: {product.claimSettlementRatio.split('(')[0].trim()}</p>
          </div>
          <ApplyButton href={product.affiliateUrl} text="Get Quote" />
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="section-padding bg-slate-50">
          <div className="container-main">
            <RelatedProducts
              products={relatedProducts}
              title={`Other ${subcategoryLabel} Plans You May Like`}
              viewAllHref={`/insurance/${subcategorySlug}`}
            />
          </div>
        </section>
      )}
    </>
  );
}
