import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { dematAccounts } from '@/lib/data/demat-accounts';
import type { DematAccount, FAQ } from '@/lib/types';
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
  return dematAccounts.map((account) => ({
    slug: account.slug,
  }));
}

function getAccount(slug: string): DematAccount | undefined {
  return dematAccounts.find((a) => a.slug === slug);
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const account = getAccount(params.slug);
  if (!account) return {};

  return {
    title: account.metaTitle,
    description: account.metaDescription,
    keywords: account.keywords,
    alternates: {
      canonical: `https://indiabestproducts.com/demat-accounts/${account.slug}`,
    },
    openGraph: {
      title: account.metaTitle,
      description: account.metaDescription,
      url: `https://indiabestproducts.com/demat-accounts/${account.slug}`,
      type: 'article',
    },
  };
}

function buildFaqs(account: DematAccount): FAQ[] {
  return [
    {
      question: `What are the brokerage charges for ${account.brand}?`,
      answer: `${account.brand} charges ${account.equityDeliveryBrokerage} for equity delivery trades and ${account.equityIntradayBrokerage} for intraday trades. Options trading is charged at ${account.optionsBrokerage}. Mutual fund investments are ${account.mutualFundCommission}.`,
    },
    {
      question: `How much does it cost to open a ${account.brand} demat account?`,
      answer: `The account opening charge for ${account.brand} is ${account.accountOpeningCharge === 0 ? 'completely free (Rs 0)' : `Rs ${account.accountOpeningCharge}`}. The annual maintenance charge (AMC) is ${account.annualMaintenanceCharge === 0 ? 'also free (Rs 0)' : `Rs ${account.annualMaintenanceCharge} per year`}.`,
    },
    {
      question: `Is ${account.brand} good for beginners?`,
      answer: `${account.bestFor}. ${account.brand} offers ${account.tradingPlatforms.join(', ')} as trading platforms and ${account.mobilePlatforms.join(', ')} for mobile trading. ${account.researchReports ? 'They also provide research reports and stock recommendations.' : 'Note that they do not provide research or advisory services.'}`,
    },
    {
      question: `Can I invest in mutual funds and IPOs through ${account.brand}?`,
      answer: `${account.mutualFunds ? `Yes, ${account.brand} offers mutual fund investments with ${account.mutualFundCommission}.` : `${account.brand} does not currently offer mutual fund investments.`} ${account.ipoAccess ? `IPO access is available through the ${account.brand} platform.` : 'IPO access is not available.'} ${account.nfoAccess ? 'NFO (New Fund Offer) access is also available.' : ''}`,
    },
    {
      question: `What trading platforms does ${account.brand} offer?`,
      answer: `${account.brand} offers the following platforms: ${account.tradingPlatforms.join(', ')} for desktop/web trading, and ${account.mobilePlatforms.join(', ')} for mobile trading. ${account.marginTrading ? 'Margin trading facility is available.' : ''} ${account.researchReports ? 'Research reports and analysis tools are included.' : ''}`,
    },
  ];
}

export default function DematAccountDetailPage({ params }: { params: { slug: string } }) {
  const account = getAccount(params.slug);
  if (!account) notFound();

  const faqs = buildFaqs(account);
  const relatedAccounts = dematAccounts.filter((a) => a.id !== account.id).slice(0, 4);

  const fees = [
    { label: 'Account Opening Charge', value: account.accountOpeningCharge === 0 ? 'Free' : `Rs ${account.accountOpeningCharge}` },
    { label: 'Annual Maintenance (AMC)', value: account.annualMaintenanceCharge === 0 ? 'Free' : `Rs ${account.annualMaintenanceCharge}/year` },
    { label: 'Equity Delivery Brokerage', value: account.equityDeliveryBrokerage },
    { label: 'Equity Intraday Brokerage', value: account.equityIntradayBrokerage },
    { label: 'Futures Brokerage', value: account.futuresBrokerage },
    { label: 'Options Brokerage', value: account.optionsBrokerage },
    { label: 'Mutual Fund Commission', value: account.mutualFundCommission },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <ProductSchema
        name={account.name}
        brand={account.brand}
        description={account.metaDescription}
        image={account.image}
        rating={account.rating}
        reviewCount={150}
        url={`https://indiabestproducts.com/demat-accounts/${account.slug}`}
      />

      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Demat Accounts', href: '/demat-accounts' },
          { label: account.brand },
        ]}
      />

      {/* Header */}
      <header className="mb-8 mt-6">
        <div className="flex flex-wrap items-start gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-2xl font-bold text-white shadow">
            {account.brand.charAt(0)}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              {account.name} Review 2026
            </h1>
            <p className="mt-1 text-lg text-slate-500">{account.brand} &mdash; {account.subcategory.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase())} Broker</p>
            <div className="mt-2 flex flex-wrap items-center gap-4">
              <StarRating rating={account.rating} size="lg" showValue />
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
                Updated: {account.lastUpdated}
              </span>
            </div>
          </div>
        </div>

        <p className="mt-5 text-lg leading-relaxed text-slate-700">
          {account.bestFor}. In this detailed review, we cover {account.brand}&apos;s brokerage charges,
          trading platforms, key features, and whether it&apos;s the right choice for your investment needs in 2026.
        </p>

        <div className="mt-6">
          <ApplyButton href={account.affiliateUrl} text={`Open ${account.brand} Account`} />
        </div>
      </header>

      {/* Fees & Charges */}
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-slate-900">
          {account.brand} Charges & Fees
        </h2>
        <FeeTable fees={fees} title="Complete Fee Structure" />
      </section>

      {/* Key Features */}
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-slate-900">Key Features</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {account.keyFeatures.map((feature, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4"
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                {i + 1}
              </span>
              <span className="text-sm text-slate-700">{feature}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Trading Platforms */}
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-slate-900">Trading Platforms</h2>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="mb-3 text-base font-semibold text-slate-800">Desktop / Web</h3>
          <ul className="mb-5 space-y-2">
            {account.tradingPlatforms.map((platform, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                <span className="text-emerald-500">&#10003;</span>
                {platform}
              </li>
            ))}
          </ul>
          <h3 className="mb-3 text-base font-semibold text-slate-800">Mobile Apps</h3>
          <ul className="space-y-2">
            {account.mobilePlatforms.map((platform, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                <span className="text-emerald-500">&#10003;</span>
                {platform}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-slate-900">Features at a Glance</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {[
            { label: 'Research Reports', value: account.researchReports },
            { label: 'Margin Trading', value: account.marginTrading },
            { label: 'IPO Access', value: account.ipoAccess },
            { label: 'Mutual Funds', value: account.mutualFunds },
            { label: 'NFO Access', value: account.nfoAccess },
          ].map((item) => (
            <div
              key={item.label}
              className={`rounded-lg border p-3 text-center ${
                item.value
                  ? 'border-emerald-200 bg-emerald-50'
                  : 'border-red-200 bg-red-50'
              }`}
            >
              <span
                className={`text-lg ${
                  item.value ? 'text-emerald-600' : 'text-red-500'
                }`}
              >
                {item.value ? '\u2713' : '\u2717'}
              </span>
              <p className="mt-1 text-xs font-medium text-slate-700">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Account Types */}
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-slate-900">Account Types Available</h2>
        <div className="flex flex-wrap gap-2">
          {account.accountTypes.map((type) => (
            <span
              key={type}
              className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-700"
            >
              {type}
            </span>
          ))}
        </div>
      </section>

      {/* Pros & Cons */}
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-slate-900">Pros & Cons</h2>
        <ProsCons pros={account.pros} cons={account.cons} />
      </section>

      {/* CTA */}
      <section className="mb-10 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-center text-white sm:p-8">
        <h2 className="mb-2 text-2xl font-bold">Ready to Start Investing?</h2>
        <p className="mb-5 text-blue-100">
          Open your {account.brand} demat account today and start building your wealth.
        </p>
        <a
          href={account.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3 font-bold text-blue-700 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
        >
          Open {account.brand} Account &rarr;
        </a>
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-slate-900">
          Frequently Asked Questions
        </h2>
        <FaqAccordion items={faqs} />
      </section>

      {/* Related */}
      <section className="mb-10">
        <RelatedProducts
          products={relatedAccounts}
          title="Compare Other Demat Accounts"
          viewAllHref="/demat-accounts"
        />
      </section>
    </div>
  );
}
