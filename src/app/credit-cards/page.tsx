import type { Metadata } from 'next';
import Link from 'next/link';
import { creditCards } from '@/lib/data/credit-cards';
import type { CreditCard, FAQ } from '@/lib/types';
import Breadcrumb from '@/components/layout/Breadcrumb';
import ProductCard from '@/components/product/ProductCard';
import FaqAccordion from '@/components/content/FaqAccordion';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Best Credit Cards in India 2026 - Compare & Apply | IndiaBestProducts',
  description:
    'Compare the best credit cards in India for 2026. Find top cashback, rewards, travel, fuel, and lifetime free cards. Check features, fees, and apply online.',
  keywords: [
    'best credit cards india 2026',
    'credit card comparison india',
    'top credit cards',
    'apply credit card online',
    'cashback credit card',
    'rewards credit card',
  ],
  alternates: { canonical: 'https://indiabestproducts.com/credit-cards' },
  openGraph: {
    title: 'Best Credit Cards in India 2026 - Compare & Apply',
    description:
      'Compare the best credit cards in India for 2026. Find top cashback, rewards, travel, fuel, and lifetime free cards.',
    url: 'https://indiabestproducts.com/credit-cards',
    type: 'website',
  },
};

const filterTabs = [
  { label: 'All', value: 'all' },
  { label: 'Cashback', value: 'cashback' },
  { label: 'Rewards', value: 'rewards' },
  { label: 'Travel', value: 'travel' },
  { label: 'Fuel', value: 'fuel' },
  { label: 'Lifetime Free', value: 'lifetime-free' },
  { label: 'Premium', value: 'premium' },
  { label: 'Lifestyle', value: 'lifestyle' },
] as const;

const faqs: FAQ[] = [
  {
    question: 'What is the best credit card in India in 2026?',
    answer:
      'The best credit card depends on your spending habits. For cashback, HDFC Millennia and Amazon Pay ICICI are top picks. For travel, HDFC Infinia and SBI Elite offer excellent lounge access and rewards. For lifetime free options, the Amazon Pay ICICI and Flipkart Axis cards are popular choices.',
  },
  {
    question: 'How do I choose the right credit card?',
    answer:
      'Consider your primary spending categories (online shopping, travel, fuel, dining), desired rewards type (cashback vs points), annual fee tolerance, minimum income requirements, and add-on benefits like lounge access or insurance. Match these with a card that maximizes value for your lifestyle.',
  },
  {
    question: 'What credit score is needed to get a credit card in India?',
    answer:
      'Most banks require a CIBIL score of 700 or above for standard credit cards. Premium cards typically need 750+. Some secured and entry-level cards may accept scores as low as 650. You can check your credit score for free on platforms like CIBIL, Experian, or through your bank.',
  },
  {
    question: 'Are lifetime free credit cards really free?',
    answer:
      'Yes, lifetime free credit cards have zero joining and annual fees for the lifetime of the card. However, standard charges like interest on revolving credit, late payment fees, and foreign transaction fees still apply. Cards like the Amazon Pay ICICI and AU Small Finance LIT are genuinely lifetime free.',
  },
  {
    question: 'How long does it take to get a credit card approved in India?',
    answer:
      'Most banks process credit card applications within 3 to 7 working days. Digital-first banks like Axis and HDFC can approve cards within minutes for pre-approved customers. Physical card delivery typically takes 7 to 15 days after approval.',
  },
];

export default function CreditCardsPage() {
  const sortedCards = [...creditCards].sort((a, b) => {
    if (a.featured === b.featured) return b.rating - a.rating;
    return a.featured ? -1 : 1;
  });

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Credit Cards' },
  ];

  const listSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Best Credit Cards in India 2026',
    numberOfItems: creditCards.length,
    itemListElement: sortedCards.slice(0, 10).map((card, i) => ({
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
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Best Credit Cards in India 2026
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Compare {creditCards.length}+ top credit cards side-by-side. Find the perfect card for
            cashback, travel rewards, fuel savings, or everyday spending and apply online instantly.
          </p>
        </section>

        {/* Filter Tabs */}
        <section className="mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {filterTabs.map((tab) => {
              const href =
                tab.value === 'all' ? '/credit-cards' : `/credit-cards/${tab.value}`;
              return (
                <Link
                  key={tab.value}
                  href={href}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                    tab.value === 'all'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'border border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700'
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </div>
        </section>

        {/* Card Grid */}
        <section className="mb-14">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sortedCards.map((card) => (
              <Link key={card.id} href={`/credit-cards/review/${card.slug}`} className="block">
                <ProductCard product={card} />
              </Link>
            ))}
          </div>
        </section>

        {/* Comparison CTA */}
        <section className="mb-14 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-center text-white shadow-lg sm:p-12">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Not Sure Which Card to Pick?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-blue-100">
            Use our side-by-side comparison tool to compare fees, rewards, lounge access,
            and more across India&apos;s top credit cards.
          </p>
          <Link
            href="/credit-cards/compare"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3.5 text-base font-bold text-blue-700 shadow-md transition-transform hover:scale-105"
          >
            Compare Credit Cards &rarr;
          </Link>
        </section>

        {/* Category Quick Links */}
        <section className="mb-14">
          <h2 className="mb-6 text-center text-2xl font-bold text-slate-900">
            Browse by Category
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filterTabs.filter((t) => t.value !== 'all').map((tab) => {
              const count = creditCards.filter(
                (c) => c.subcategory === tab.value
              ).length;
              return (
                <Link
                  key={tab.value}
                  href={`/credit-cards/${tab.value}`}
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div>
                    <h3 className="font-bold text-slate-900">{tab.label} Cards</h3>
                    <p className="mt-0.5 text-sm text-slate-500">
                      {count} {count === 1 ? 'card' : 'cards'} available
                    </p>
                  </div>
                  <span className="text-xl text-slate-400">&rarr;</span>
                </Link>
              );
            })}
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
            How to Choose the Best Credit Card in India
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-slate-600">
            <p>
              Choosing the right credit card can save you thousands of rupees every year through
              cashback, reward points, and exclusive benefits. India&apos;s credit card market has
              expanded significantly, with banks like HDFC, SBI, ICICI, Axis, and Kotak offering
              cards tailored to every spending pattern.
            </p>
            <p>
              <strong>For everyday spenders:</strong> Cashback credit cards like the HDFC Millennia
              or Amazon Pay ICICI card return a percentage of every purchase directly. These work
              best for online shopping, groceries, and utility bill payments.
            </p>
            <p>
              <strong>For frequent travelers:</strong> Travel credit cards provide airport lounge
              access, air miles, travel insurance, and low foreign transaction fees. The HDFC Infinia
              and SBI Card ELITE are among the best in this category.
            </p>
            <p>
              <strong>For fuel savings:</strong> Fuel credit cards like the BPCL SBI Card and IndianOil
              Axis Card offer surcharge waivers and accelerated rewards at fuel stations, making them
              ideal for daily commuters.
            </p>
            <p>
              <strong>For beginners:</strong> Lifetime free credit cards with no annual fees are the
              safest entry point. They offer decent rewards without the pressure of meeting annual
              spending targets for fee waivers.
            </p>
            <p>
              Always compare the annual fee, reward rate, welcome bonus, and additional benefits
              before applying. Check your credit score, ensure you meet the minimum income requirement,
              and read the fine print on fee waivers and reward redemption.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
