import type { Metadata } from 'next';
import Link from 'next/link';
import { creditCards } from '@/lib/data/credit-cards';
import { formatCurrency } from '@/lib/utils';
import Breadcrumb from '@/components/layout/Breadcrumb';
import ComparisonTable from '@/components/product/ComparisonTable';
import ApplyButton from '@/components/product/ApplyButton';
import StarRating from '@/components/product/StarRating';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Compare Credit Cards India 2026 - Side by Side Comparison | IndiaBestProducts',
  description:
    'Compare the best credit cards in India side by side. Compare fees, rewards, lounge access, benefits, and more. Find the perfect card for your needs.',
  keywords: [
    'compare credit cards india',
    'credit card comparison tool',
    'best credit card comparison',
    'side by side credit card comparison',
  ],
  alternates: {
    canonical: 'https://indiabestproducts.com/credit-cards/compare',
  },
  openGraph: {
    title: 'Compare Credit Cards India 2026 - Side by Side',
    description:
      'Compare the best credit cards in India side by side. Compare fees, rewards, lounge access, benefits.',
    url: 'https://indiabestproducts.com/credit-cards/compare',
    type: 'website',
  },
};

const comparisonFeatures = [
  { key: 'joiningFee', label: 'Joining Fee' },
  { key: 'annualFee', label: 'Annual Fee' },
  { key: 'rewardRate', label: 'Reward Rate' },
  { key: 'loungeAccess', label: 'Lounge Access' },
  { key: 'fuelSurchargeWaiver', label: 'Fuel Surcharge Waiver' },
  { key: 'minimumIncome', label: 'Min. Income Required' },
  { key: 'welcomeBonus', label: 'Welcome Bonus' },
  { key: 'foreignTransactionFee', label: 'Foreign Transaction Fee' },
  { key: 'network', label: 'Card Network' },
  { key: 'contactlessPayment', label: 'Contactless Payment' },
  { key: 'annualFeeWaiver', label: 'Fee Waiver Condition' },
  { key: 'interestRateAPR', label: 'Interest Rate (APR)' },
];

export default function ComparePage() {
  // Top 6 cards by rating (featured first)
  const top6 = [...creditCards]
    .sort((a, b) => {
      if (a.featured === b.featured) return b.rating - a.rating;
      return a.featured ? -1 : 1;
    })
    .slice(0, 6);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Credit Cards', href: '/credit-cards' },
    { label: 'Compare' },
  ];

  const listSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Credit Card Comparison - Top Cards in India 2026',
    numberOfItems: top6.length,
    itemListElement: top6.map((card, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: card.name,
      url: `https://indiabestproducts.com/credit-cards/review/${card.slug}`,
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
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Compare Credit Cards Side by Side
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            See how India&apos;s top credit cards stack up against each other. Compare fees, rewards,
            lounge access, and key benefits to find your perfect match.
          </p>
        </section>

        {/* Main Comparison Table */}
        <section className="mb-14">
          <h2 className="mb-6 text-xl font-bold text-slate-900">
            Top 6 Credit Cards Compared
          </h2>
          <ComparisonTable
            products={top6}
            features={comparisonFeatures}
            highlightIndex={0}
            highlightLabel="Top Rated"
          />
        </section>

        {/* Individual Card Summaries */}
        <section className="mb-14">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">
            Card Highlights
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {top6.map((card, i) => (
              <div
                key={card.id}
                className={`rounded-xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md ${
                  i === 0 ? 'border-blue-300 ring-2 ring-blue-100' : 'border-slate-200'
                }`}
              >
                {i === 0 && (
                  <span className="mb-3 inline-block rounded-full bg-blue-600 px-3 py-0.5 text-xs font-bold text-white">
                    #1 Recommended
                  </span>
                )}
                <h3 className="text-lg font-bold text-slate-900">{card.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{card.brand}</p>
                <div className="mt-2">
                  <StarRating rating={card.rating} size="sm" showValue />
                </div>

                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Joining Fee</span>
                    <span className="font-semibold text-slate-900">
                      {card.joiningFee === 0 ? 'FREE' : formatCurrency(card.joiningFee)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Annual Fee</span>
                    <span className="font-semibold text-slate-900">
                      {card.annualFee === 0 ? 'FREE' : formatCurrency(card.annualFee)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Rewards</span>
                    <span className="max-w-[160px] text-right font-semibold text-slate-900">
                      {card.rewardRate.length > 30
                        ? card.rewardRate.slice(0, 30) + '...'
                        : card.rewardRate}
                    </span>
                  </div>
                </div>

                <p className="mt-3 text-xs text-slate-500">
                  Best for: {card.bestFor}
                </p>

                <div className="mt-4 flex gap-3">
                  <ApplyButton href={card.affiliateUrl} variant="primary" />
                  <Link
                    href={`/credit-cards/review/${card.slug}`}
                    className="inline-flex items-center justify-center rounded-lg border-2 border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-blue-400 hover:text-blue-700"
                  >
                    Full Review
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Category-wise Quick Picks */}
        <section className="mb-14">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">
            Best Card by Category
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(
              [
                { subcat: 'cashback', label: 'Best Cashback Card' },
                { subcat: 'premium', label: 'Best Premium Card' },
                { subcat: 'travel', label: 'Best Travel Card' },
                { subcat: 'fuel', label: 'Best Fuel Card' },
                { subcat: 'lifetime-free', label: 'Best Lifetime Free Card' },
                { subcat: 'rewards', label: 'Best Rewards Card' },
              ] as const
            ).map(({ subcat, label }) => {
              const best = creditCards
                .filter((c) => c.subcategory === subcat)
                .sort((a, b) => b.rating - a.rating)[0];
              if (!best) return null;
              return (
                <Link
                  key={subcat}
                  href={`/credit-cards/review/${best.slug}`}
                  className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 text-lg font-bold text-white">
                    {best.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                      {label}
                    </p>
                    <p className="font-bold text-slate-900">{best.name}</p>
                    <div className="mt-0.5">
                      <StarRating rating={best.rating} size="sm" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* How to Compare Guide */}
        <section className="mb-14 mx-auto max-w-3xl rounded-xl bg-slate-50 p-8">
          <h2 className="mb-4 text-xl font-bold text-slate-900">
            How to Compare Credit Cards Effectively
          </h2>
          <div className="space-y-3 text-sm leading-relaxed text-slate-600">
            <p>
              <strong>1. Annual Fee vs Rewards:</strong> Calculate whether the rewards you earn will
              exceed the annual fee. A card with Rs 2,500 annual fee should return at least Rs 5,000
              in value to be worthwhile.
            </p>
            <p>
              <strong>2. Match to Your Spending:</strong> Look at where you spend most — online
              shopping, fuel, dining, or travel — and pick a card that offers maximum rewards in
              those categories.
            </p>
            <p>
              <strong>3. Check Fee Waivers:</strong> Many cards waive the annual fee on achieving a
              spending target. Make sure the target is achievable for your regular spending pattern.
            </p>
            <p>
              <strong>4. Lounge Access:</strong> If you travel frequently, lounge access alone can
              be worth Rs 2,000-5,000 per year in saved costs. Count the number of visits included.
            </p>
            <p>
              <strong>5. Hidden Charges:</strong> Compare foreign transaction fees, cash advance
              charges, late payment penalties, and interest rates. These can significantly impact
              the total cost of card ownership.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="mb-8 text-center">
          <p className="text-slate-600">
            Want to explore more options?
          </p>
          <Link
            href="/credit-cards"
            className="mt-3 inline-flex items-center gap-2 text-lg font-semibold text-blue-600 transition-colors hover:text-blue-800"
          >
            Browse all {creditCards.length} credit cards &rarr;
          </Link>
        </section>
      </div>
    </>
  );
}
