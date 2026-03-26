import type { Metadata } from 'next';
import Link from 'next/link';
import { creditCards } from '@/lib/data/credit-cards';
import type { CreditCard, FAQ } from '@/lib/types';
import { formatCurrency, getRelatedProducts } from '@/lib/utils';
import Breadcrumb from '@/components/layout/Breadcrumb';
import StarRating from '@/components/product/StarRating';
import ApplyButton from '@/components/product/ApplyButton';
import ProsCons from '@/components/product/ProsCons';
import FeeTable from '@/components/product/FeeTable';
import FaqAccordion from '@/components/content/FaqAccordion';
import RelatedProducts from '@/components/content/RelatedProducts';
import ProductSchema from '@/components/seo/ProductSchema';

// ── Subcategory label map ───────────────────────────────────
const subcategoryLabels: Record<string, string> = {
  cashback: 'Cashback',
  rewards: 'Rewards',
  travel: 'Travel',
  fuel: 'Fuel',
  'lifetime-free': 'Lifetime Free',
  premium: 'Premium',
  student: 'Student',
  secured: 'Secured',
  business: 'Business',
  lifestyle: 'Lifestyle',
};

// ── Static params ───────────────────────────────────────────
export function generateStaticParams() {
  return creditCards.map((card) => ({ slug: card.slug }));
}

// ── Metadata ────────────────────────────────────────────────
export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const card = creditCards.find((c) => c.slug === params.slug);
  if (!card) {
    return { title: 'Credit Card Not Found | IndiaBestProducts' };
  }
  return {
    title: `${card.name} Review 2026 - Features, Benefits & Apply | IndiaBestProducts`,
    description: card.metaDescription,
    keywords: card.keywords,
    alternates: {
      canonical: `https://indiabestproducts.com/credit-cards/review/${card.slug}`,
    },
    openGraph: {
      title: `${card.name} Review 2026 - Features, Benefits & Apply`,
      description: card.metaDescription,
      url: `https://indiabestproducts.com/credit-cards/review/${card.slug}`,
      type: 'article',
      images: card.image ? [{ url: card.image }] : [],
    },
  };
}

// ── Generate FAQs per card ──────────────────────────────────
function generateFaqs(card: CreditCard): FAQ[] {
  return [
    {
      question: `What is the joining fee for ${card.name}?`,
      answer:
        card.joiningFee === 0
          ? `The ${card.name} has zero joining fee — it is completely free to apply and get the card.`
          : `The joining fee for ${card.name} is ${formatCurrency(card.joiningFee)}. ${card.annualFeeWaiver}`,
    },
    {
      question: `What is the annual fee and how to get it waived?`,
      answer:
        card.annualFee === 0
          ? `The ${card.name} has no annual fee. It is a lifetime free credit card with zero recurring charges.`
          : `The annual fee is ${formatCurrency(card.annualFee)}. ${card.annualFeeWaiver}`,
    },
    {
      question: `What rewards does the ${card.name} offer?`,
      answer: `The card offers ${card.rewardRate}. Point value: ${card.rewardPointValue}. Welcome bonus: ${card.welcomeBonus}.`,
    },
    {
      question: `What is the minimum income required for ${card.name}?`,
      answer: `You need a minimum annual income of ${formatCurrency(card.minimumIncome)} to be eligible for the ${card.name}. Additional eligibility criteria include a good credit score and valid identity/address documents.`,
    },
    {
      question: `Does the ${card.name} offer airport lounge access?`,
      answer: card.loungeAccess
        ? `Yes. Lounge access details: ${card.loungeAccess}.`
        : `The ${card.name} does not include complimentary airport lounge access. Consider upgrading to a premium card for lounge benefits.`,
    },
  ];
}

// ── Build fees array ────────────────────────────────────────
function buildFees(card: CreditCard) {
  return [
    { label: 'Joining Fee', value: card.joiningFee === 0 ? 'FREE' : formatCurrency(card.joiningFee) },
    { label: 'Annual Fee', value: card.annualFee === 0 ? 'FREE' : formatCurrency(card.annualFee) },
    { label: 'Annual Fee Waiver', value: card.annualFeeWaiver || 'N/A' },
    { label: 'Interest Rate (APR)', value: card.interestRateAPR },
    { label: 'Foreign Transaction Fee', value: card.foreignTransactionFee },
    { label: 'Fuel Surcharge Waiver', value: card.fuelSurchargeWaiver || 'N/A' },
    { label: 'Add-on Card', value: card.addOnCard ? 'Available (Free)' : 'Not Available' },
    { label: 'Card Network', value: card.network },
  ];
}

// ── Page component ──────────────────────────────────────────
export default function CreditCardReviewPage({
  params,
}: {
  params: { slug: string };
}) {
  const card = creditCards.find((c) => c.slug === params.slug);

  if (!card) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Card Not Found</h1>
        <p className="mt-2 text-slate-600">
          The credit card you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link href="/credit-cards" className="mt-4 inline-block text-blue-600 hover:underline">
          Browse all credit cards &rarr;
        </Link>
      </div>
    );
  }

  const subcatLabel = subcategoryLabels[card.subcategory] || card.subcategory;
  const faqs = generateFaqs(card);
  const fees = buildFees(card);
  const related = getRelatedProducts(card.id, 4);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Credit Cards', href: '/credit-cards' },
    { label: `${subcatLabel} Cards`, href: `/credit-cards/${card.subcategory}` },
    { label: card.name },
  ];

  return (
    <>
      {/* JSON-LD */}
      <ProductSchema
        name={card.name}
        brand={card.brand}
        description={card.metaDescription}
        image={card.image}
        rating={card.rating}
        reviewCount={150}
        price={card.joiningFee.toString()}
        url={`https://indiabestproducts.com/credit-cards/review/${card.slug}`}
        reviewBody={`${card.name} review: ${card.bestFor}. ${card.pros[0]}.`}
      />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Hero Section */}
        <section className="mb-10 mt-6 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-sm sm:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            {/* Left: Card info */}
            <div className="flex-1">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                  {subcatLabel}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  {card.network}
                </span>
                {card.featured && (
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                    Editor&apos;s Choice
                  </span>
                )}
              </div>

              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                {card.name}
              </h1>
              <p className="mt-1 text-base text-slate-500">{card.brand}</p>

              <div className="mt-3 flex items-center gap-3">
                <StarRating rating={card.rating} size="lg" showValue />
                <span className="text-sm text-slate-500">({card.rating.toFixed(1)}/5 rating)</span>
              </div>

              <p className="mt-4 max-w-xl text-base text-slate-600">
                Best for: <strong className="text-slate-800">{card.bestFor}</strong>
              </p>

              <div className="mt-6">
                <ApplyButton href={card.affiliateUrl} text="Apply Now - Free" />
              </div>
            </div>

            {/* Right: Card image placeholder */}
            <div className="flex shrink-0 items-center justify-center">
              <div className="flex h-44 w-72 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-4xl font-bold text-white shadow-lg">
                {card.name.split(' ').slice(0, 2).map((w) => w[0]).join('')}
              </div>
            </div>
          </div>
        </section>

        {/* Quick Info Table */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-bold text-slate-900">Quick Overview</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                label: 'Joining Fee',
                value: card.joiningFee === 0 ? 'FREE' : formatCurrency(card.joiningFee),
                highlight: card.joiningFee === 0,
              },
              {
                label: 'Annual Fee',
                value: card.annualFee === 0 ? 'FREE' : formatCurrency(card.annualFee),
                highlight: card.annualFee === 0,
              },
              {
                label: 'Min. Income Required',
                value: formatCurrency(card.minimumIncome) + '/year',
                highlight: false,
              },
              {
                label: 'Card Type',
                value: `${subcatLabel} - ${card.network}`,
                highlight: false,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {item.label}
                </p>
                <p
                  className={`mt-1 text-lg font-bold ${
                    item.highlight ? 'text-emerald-600' : 'text-slate-900'
                  }`}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Key Features */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-bold text-slate-900">Key Features</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {card.keyFeatures.map((feature, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-lg border border-slate-100 bg-white p-4 shadow-sm"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                  {i + 1}
                </span>
                <span className="text-sm text-slate-700">{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Fees & Charges */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-bold text-slate-900">Fees & Charges</h2>
          <FeeTable fees={fees} />
        </section>

        {/* Pros & Cons */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-bold text-slate-900">Pros & Cons</h2>
          <ProsCons pros={card.pros} cons={card.cons} />
        </section>

        {/* Who Should Get This Card */}
        <section className="mb-10 rounded-xl bg-blue-50 p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-slate-900">
            Who Should Get the {card.name}?
          </h2>
          <p className="mb-4 text-sm text-slate-600">
            This card is best suited for <strong>{card.bestFor.toLowerCase()}</strong>. Here are the ideal profiles:
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {card.joiningFee === 0 && (
              <div className="flex items-start gap-2 text-sm text-slate-700">
                <span className="mt-0.5 text-emerald-500">&#10003;</span>
                <span>People looking for a no-cost entry into credit cards</span>
              </div>
            )}
            {card.subcategory === 'cashback' && (
              <div className="flex items-start gap-2 text-sm text-slate-700">
                <span className="mt-0.5 text-emerald-500">&#10003;</span>
                <span>Online shoppers who want instant cashback on every purchase</span>
              </div>
            )}
            {card.subcategory === 'premium' && (
              <div className="flex items-start gap-2 text-sm text-slate-700">
                <span className="mt-0.5 text-emerald-500">&#10003;</span>
                <span>High-income individuals with annual spends above Rs 3 lakh</span>
              </div>
            )}
            {card.subcategory === 'travel' && (
              <div className="flex items-start gap-2 text-sm text-slate-700">
                <span className="mt-0.5 text-emerald-500">&#10003;</span>
                <span>Frequent domestic and international travelers</span>
              </div>
            )}
            {card.subcategory === 'fuel' && (
              <div className="flex items-start gap-2 text-sm text-slate-700">
                <span className="mt-0.5 text-emerald-500">&#10003;</span>
                <span>Daily commuters who spend Rs 3,000+ per month on fuel</span>
              </div>
            )}
            {card.loungeAccess && card.loungeAccess !== 'None' && (
              <div className="flex items-start gap-2 text-sm text-slate-700">
                <span className="mt-0.5 text-emerald-500">&#10003;</span>
                <span>Travelers who value complimentary airport lounge access</span>
              </div>
            )}
            <div className="flex items-start gap-2 text-sm text-slate-700">
              <span className="mt-0.5 text-emerald-500">&#10003;</span>
              <span>
                Individuals with annual income of {formatCurrency(card.minimumIncome)} or above
              </span>
            </div>
            <div className="flex items-start gap-2 text-sm text-slate-700">
              <span className="mt-0.5 text-emerald-500">&#10003;</span>
              <span>{card.brand} account holders (faster approval)</span>
            </div>
          </div>
        </section>

        {/* How to Apply */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-bold text-slate-900">
            How to Apply for {card.name}
          </h2>
          <div className="space-y-4">
            {[
              {
                step: 1,
                title: 'Check Eligibility',
                description: `Ensure you meet the minimum income requirement of ${formatCurrency(card.minimumIncome)}/year and have a credit score of 700+.`,
              },
              {
                step: 2,
                title: 'Gather Documents',
                description:
                  'Keep your PAN card, Aadhaar card, income proof (salary slips or ITR), and address proof ready.',
              },
              {
                step: 3,
                title: 'Apply Online',
                description: `Click the "Apply Now" button on this page to visit the official ${card.brand} application page. Fill in your personal and employment details.`,
              },
              {
                step: 4,
                title: 'Verification',
                description:
                  'The bank will verify your documents and credit score. This typically takes 2-5 working days.',
              },
              {
                step: 5,
                title: 'Card Delivery',
                description:
                  'Once approved, your card will be delivered to your registered address within 7-15 working days. Activate it via the bank app or customer care.',
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <ApplyButton href={card.affiliateUrl} />
          </div>
        </section>

        {/* Eligibility Criteria */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-bold text-slate-900">Eligibility Criteria</h2>
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <ul className="space-y-3">
              {card.eligibilityCriteria.map((criteria, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs text-emerald-700">
                    &#10003;
                  </span>
                  <span>{criteria}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Documents Required */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-bold text-slate-900">Documents Required</h2>
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                'PAN Card',
                'Aadhaar Card / Passport',
                'Latest 3 months salary slips (salaried)',
                'ITR for last 2 years (self-employed)',
                'Bank statements (last 6 months)',
                'Address proof (utility bill / rent agreement)',
                'Passport-size photographs',
                'Employment proof / business registration',
              ].map((doc, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-slate-700">
                  <span className="mt-0.5 text-blue-500">&#9679;</span>
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Rating Breakdown */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-bold text-slate-900">Our Rating Breakdown</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {(
              [
                { key: 'features', label: 'Features' },
                { key: 'value', label: 'Value for Money' },
                { key: 'support', label: 'Customer Support' },
                { key: 'benefits', label: 'Benefits' },
              ] as const
            ).map((item) => {
              const score = card.ratingBreakdown[item.key];
              const percentage = (score / 5) * 100;
              return (
                <div
                  key={item.key}
                  className="rounded-xl border border-slate-200 bg-white p-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-600">{item.label}</span>
                    <span className="text-sm font-bold text-slate-900">
                      {score.toFixed(1)}/5
                    </span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-blue-600 transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-bold text-slate-900">
            {card.name} FAQs
          </h2>
          <FaqAccordion items={faqs} />
        </section>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mb-10">
            <RelatedProducts
              products={related}
              title="Similar Credit Cards"
              viewAllHref={`/credit-cards/${card.subcategory}`}
            />
          </section>
        )}
      </div>

      {/* Sticky Apply Bar */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 shadow-lg backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="hidden sm:block">
            <p className="text-sm font-bold text-slate-900">{card.name}</p>
            <p className="text-xs text-slate-500">
              {card.joiningFee === 0 ? 'FREE joining' : `Joining fee: ${formatCurrency(card.joiningFee)}`}
              {' | '}
              Rating: {card.rating.toFixed(1)}/5
            </p>
          </div>
          <ApplyButton href={card.affiliateUrl} text="Apply Now - Check Eligibility" />
        </div>
      </div>
    </>
  );
}
