import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { loans } from '@/lib/data/loans';
import type { Loan } from '@/lib/types';
import Breadcrumb from '@/components/layout/Breadcrumb';
import StarRating from '@/components/product/StarRating';
import ProsCons from '@/components/product/ProsCons';
import FeeTable from '@/components/product/FeeTable';
import ApplyButton from '@/components/product/ApplyButton';
import FaqAccordion from '@/components/content/FaqAccordion';
import RelatedProducts from '@/components/content/RelatedProducts';
import JsonLd from '@/components/seo/JsonLd';
import { formatCurrency, generateProductSchema } from '@/lib/utils';

/* ── Static params ── */

export function generateStaticParams() {
  return loans.map((loan) => ({ slug: loan.slug }));
}

/* ── Metadata ── */

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const loan = loans.find((l) => l.slug === slug);
  if (!loan) {
    return { title: 'Loan Not Found | IndiaBestProducts' };
  }
  return {
    title: loan.metaTitle,
    description: loan.metaDescription,
    keywords: loan.keywords,
    alternates: { canonical: `https://indiabestproducts.com/loans/review/${loan.slug}` },
    openGraph: {
      title: loan.metaTitle,
      description: loan.metaDescription,
      url: `https://indiabestproducts.com/loans/review/${loan.slug}`,
      type: 'article',
      images: [{ url: loan.image, width: 600, height: 400, alt: loan.name }],
    },
  };
}

/* ── Helpers ── */

function getSubcategoryLabel(sub: string): string {
  const labels: Record<string, string> = {
    personal: 'Personal Loan',
    home: 'Home Loan',
    car: 'Car Loan',
    education: 'Education Loan',
    business: 'Business Loan',
    gold: 'Gold Loan',
  };
  return labels[sub] || sub;
}

function getSubcategorySlug(sub: string): string {
  const slugs: Record<string, string> = {
    personal: 'personal-loan',
    home: 'home-loan',
    car: 'car-loan',
    education: 'education-loan',
    business: 'business-loan',
    gold: 'gold-loan',
  };
  return slugs[sub] || sub;
}

function generateLoanFaqs(loan: Loan) {
  return [
    {
      question: `What is the interest rate on ${loan.name}?`,
      answer: `${loan.name} offers interest rates ranging from ${loan.interestRateMin}% to ${loan.interestRateMax}% per annum (${loan.interestRateType} rate). The actual rate depends on your credit profile, income, and existing relationship with ${loan.brand}.`,
    },
    {
      question: `What is the processing fee for ${loan.name}?`,
      answer: `The processing fee for ${loan.name} is ${loan.processingFee}. This is a one-time fee charged at the time of loan disbursement.`,
    },
    {
      question: `What is the maximum loan amount for ${loan.name}?`,
      answer: `You can borrow up to ${formatCurrency(loan.maxAmount)} with ${loan.name}. The minimum loan amount is ${formatCurrency(loan.minAmount)}.`,
    },
    {
      question: `Can I prepay my ${loan.name} early?`,
      answer: `Prepayment charges for ${loan.name}: ${loan.prepaymentCharges}. Foreclosure charges: ${loan.foreclosureCharges}. Check with ${loan.brand} for the latest terms.`,
    },
    {
      question: `How long does ${loan.name} disbursal take?`,
      answer: `${loan.name} typically takes ${loan.disbursalTime} for disbursal after application and document verification.`,
    },
  ];
}

/* ── Page ── */

export default async function LoanReviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const loan = loans.find((l) => l.slug === slug);

  if (!loan) {
    notFound();
  }

  const subcategoryLabel = getSubcategoryLabel(loan.subcategory);
  const subcategorySlug = getSubcategorySlug(loan.subcategory);
  const relatedLoans = loans
    .filter((l) => l.id !== loan.id && l.subcategory === loan.subcategory)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);
  const faqs = generateLoanFaqs(loan);
  const productSchema = generateProductSchema(loan);

  const fees = [
    { label: 'Interest Rate (Min)', value: `${loan.interestRateMin}% p.a.` },
    { label: 'Interest Rate (Max)', value: `${loan.interestRateMax}% p.a.` },
    { label: 'Interest Rate Type', value: loan.interestRateType.charAt(0).toUpperCase() + loan.interestRateType.slice(1) },
    { label: 'Processing Fee', value: loan.processingFee },
    { label: 'Prepayment Charges', value: loan.prepaymentCharges },
    { label: 'Foreclosure Charges', value: loan.foreclosureCharges },
  ];

  const loanDetails = [
    { label: 'Minimum Loan Amount', value: formatCurrency(loan.minAmount) },
    { label: 'Maximum Loan Amount', value: formatCurrency(loan.maxAmount) },
    { label: 'Minimum Tenure', value: `${loan.minTenure} ${loan.tenureUnit}` },
    { label: 'Maximum Tenure', value: `${loan.maxTenure} ${loan.tenureUnit}` },
    { label: 'EMI per Lakh', value: loan.emiPerLakh },
    { label: 'Disbursal Time', value: loan.disbursalTime },
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
              { label: 'Loans', href: '/loans' },
              { label: subcategoryLabel, href: `/loans/${subcategorySlug}` },
              { label: loan.name },
            ]}
          />
        </div>
      </div>

      {/* Main Content */}
      <article className="section-padding">
        <div className="container-main">
          <div className="lg:grid lg:grid-cols-3 lg:gap-10">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Header */}
              <header>
                <div className="flex items-center gap-3 mb-3">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 uppercase">
                    {subcategoryLabel}
                  </span>
                  {loan.featured && (
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700 uppercase">
                      Featured
                    </span>
                  )}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                  {loan.name} Review 2026
                </h1>
                <p className="text-lg text-slate-600 mb-4">{loan.bestFor}</p>
                <div className="flex items-center gap-4 flex-wrap">
                  <StarRating rating={loan.rating} size="lg" showValue />
                  <span className="text-sm text-slate-500">
                    Last updated: {new Date(loan.lastUpdated).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>
              </header>

              {/* Key Highlights */}
              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-4">Key Highlights</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {loan.keyFeatures.map((feature, i) => (
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

              {/* Interest Rates & Fees */}
              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-4">Interest Rates &amp; Fees</h2>
                <FeeTable fees={fees} title="Rates & Charges" />
              </section>

              {/* Loan Details */}
              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-4">Loan Details</h2>
                <FeeTable fees={loanDetails} title="Loan Parameters" />
              </section>

              {/* Rating Breakdown */}
              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-4">Rating Breakdown</h2>
                <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
                  {Object.entries(loan.ratingBreakdown).map(([key, value]) => (
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
                <ProsCons pros={loan.pros} cons={loan.cons} />
              </section>

              {/* Eligibility Criteria */}
              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-4">Eligibility Criteria</h2>
                <div className="rounded-xl border border-slate-200 bg-white p-6">
                  <ul className="space-y-3">
                    {loan.eligibilityCriteria.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-700">
                        <span className="mt-1 text-blue-500 shrink-0">&#9679;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* Documents Required */}
              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-4">Documents Required</h2>
                <div className="rounded-xl border border-slate-200 bg-white p-6">
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {loan.documentsRequired.map((doc, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-700">
                        <span className="mt-1 text-slate-400 shrink-0">&#128196;</span>
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* FAQ */}
              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
                <FaqAccordion items={faqs} />
              </section>
            </div>

            {/* Right Column - Sidebar */}
            <aside className="mt-10 lg:mt-0">
              <div className="sticky top-4 space-y-6">
                {/* Apply Card */}
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="text-center mb-4">
                    <p className="text-sm text-slate-500 mb-1">Interest Rate Starting</p>
                    <p className="text-3xl font-bold text-blue-700">{loan.interestRateMin}%</p>
                    <p className="text-xs text-slate-400">per annum ({loan.interestRateType} rate)</p>
                  </div>
                  <div className="space-y-3 mb-5">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Max Amount</span>
                      <span className="font-semibold text-slate-900">{formatCurrency(loan.maxAmount)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Max Tenure</span>
                      <span className="font-semibold text-slate-900">{loan.maxTenure} {loan.tenureUnit}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">EMI/Lakh</span>
                      <span className="font-semibold text-slate-900">{loan.emiPerLakh.split(' ').slice(0, 3).join(' ')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Processing Fee</span>
                      <span className="font-semibold text-slate-900 text-right max-w-[150px]">{loan.processingFee.length > 30 ? loan.processingFee.slice(0, 30) + '...' : loan.processingFee}</span>
                    </div>
                  </div>
                  <ApplyButton href={loan.affiliateUrl} text="Apply Now" />
                  <p className="text-xs text-slate-400 text-center mt-3">
                    On {loan.brand}&apos;s website. T&amp;C apply.
                  </p>
                </div>

                {/* Quick Info */}
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">Quick Info</h3>
                  <dl className="space-y-3 text-sm">
                    <div>
                      <dt className="text-slate-500">Brand</dt>
                      <dd className="font-semibold text-slate-900">{loan.brand}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Loan Type</dt>
                      <dd className="font-semibold text-slate-900">{subcategoryLabel}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Disbursal Time</dt>
                      <dd className="font-semibold text-slate-900">{loan.disbursalTime}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Rating</dt>
                      <dd>
                        <StarRating rating={loan.rating} size="sm" showValue />
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* Sticky Apply Bar (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-slate-200 bg-white p-3 shadow-lg lg:hidden">
        <div className="flex items-center justify-between gap-4 container-main">
          <div>
            <p className="text-sm font-bold text-slate-900">{loan.name}</p>
            <p className="text-xs text-slate-500">From {loan.interestRateMin}% p.a.</p>
          </div>
          <ApplyButton href={loan.affiliateUrl} text="Apply Now" />
        </div>
      </div>

      {/* Related Loans */}
      {relatedLoans.length > 0 && (
        <section className="section-padding bg-slate-50">
          <div className="container-main">
            <RelatedProducts
              products={relatedLoans}
              title={`Other ${subcategoryLabel}s You May Like`}
              viewAllHref={`/loans/${subcategorySlug}`}
            />
          </div>
        </section>
      )}
    </>
  );
}
