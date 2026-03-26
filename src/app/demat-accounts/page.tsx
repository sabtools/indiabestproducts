import type { Metadata } from 'next';
import { dematAccounts } from '@/lib/data/demat-accounts';
import ProductCard from '@/components/product/ProductCard';
import ComparisonTable from '@/components/product/ComparisonTable';
import FaqAccordion from '@/components/content/FaqAccordion';
import Breadcrumb from '@/components/layout/Breadcrumb';
import type { FAQ } from '@/lib/types';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Best Demat Accounts in India 2026 — Compare Charges & Features',
  description:
    'Compare the best demat accounts in India for 2026. Zerodha, Groww, Upstox, Angel One & more. Zero brokerage, free account opening, and detailed reviews.',
  keywords: [
    'best demat account India',
    'demat account comparison',
    'zerodha vs groww',
    'cheapest demat account',
    'free demat account India 2026',
    'online trading account India',
  ],
  alternates: {
    canonical: 'https://indiabestproducts.com/demat-accounts',
  },
  openGraph: {
    title: 'Best Demat Accounts in India 2026 — Compare Charges & Features',
    description:
      'Compare the best demat accounts in India for 2026. Zerodha, Groww, Upstox, Angel One & more.',
    url: 'https://indiabestproducts.com/demat-accounts',
    type: 'website',
  },
};

const comparisonFeatures = [
  { key: 'accountOpeningCharge', label: 'Account Opening Charge' },
  { key: 'annualMaintenanceCharge', label: 'Annual Maintenance (AMC)' },
  { key: 'equityDeliveryBrokerage', label: 'Equity Delivery Brokerage' },
  { key: 'equityIntradayBrokerage', label: 'Equity Intraday Brokerage' },
  { key: 'optionsBrokerage', label: 'Options Brokerage' },
  { key: 'mutualFundCommission', label: 'Mutual Fund Commission' },
  { key: 'researchReports', label: 'Research Reports' },
  { key: 'marginTrading', label: 'Margin Trading' },
  { key: 'ipoAccess', label: 'IPO Access' },
];

const faqs: FAQ[] = [
  {
    question: 'What is a demat account and why do I need one?',
    answer:
      'A demat (dematerialized) account holds your shares and securities in electronic format, similar to how a bank account holds your money. In India, you need a demat account to buy and sell stocks, mutual funds, ETFs, bonds, and IPOs on stock exchanges like BSE and NSE. It is mandatory for trading in the Indian stock market.',
  },
  {
    question: 'Which is the best demat account for beginners in India?',
    answer:
      'For beginners, Groww and Zerodha are the top choices. Groww offers the simplest app interface with zero account opening charges and is ideal for first-time investors. Zerodha is best for those who want to learn trading with their free Varsity education platform and the powerful Kite trading tool.',
  },
  {
    question: 'How much does it cost to open a demat account in India?',
    answer:
      'Most discount brokers like Groww, Upstox, Angel One, and 5Paisa offer free account opening. Zerodha charges Rs 200 for account opening. Full-service brokers like ICICI Direct and HDFC Securities also offer free account opening but charge higher AMC fees ranging from Rs 600 to Rs 750 per year.',
  },
  {
    question: 'What is the difference between a discount broker and a full-service broker?',
    answer:
      'Discount brokers (Zerodha, Groww, Upstox) charge flat low brokerage (Rs 20 per trade or zero) but offer limited research and advisory. Full-service brokers (ICICI Direct, HDFC Securities) charge percentage-based brokerage (0.5% or more) but provide research reports, stock recommendations, 3-in-1 bank integration, and dedicated relationship managers.',
  },
  {
    question: 'Can I have multiple demat accounts in India?',
    answer:
      'Yes, you can open multiple demat accounts with different brokers in India. Many investors maintain one account with a discount broker for active trading and another with a full-service broker for long-term investments and research. However, each account may have its own AMC charges.',
  },
];

export default function DematAccountsPage() {
  const sorted = [...dematAccounts].sort((a, b) => b.rating - a.rating);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Demat Accounts' },
        ]}
      />

      {/* Hero */}
      <section className="mb-10 mt-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Best Demat Accounts in India 2026
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">
          Compare India&apos;s top demat and trading accounts side by side. We review brokerage charges,
          trading platforms, features, and customer support to help you pick the best broker for your
          investment journey.
        </p>
      </section>

      {/* Quick Stats */}
      <section className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-blue-600">{dematAccounts.length}</p>
          <p className="text-sm text-slate-500">Brokers Compared</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-emerald-600">Free</p>
          <p className="text-sm text-slate-500">Account Opening</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-amber-600">Zero</p>
          <p className="text-sm text-slate-500">Delivery Brokerage</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-purple-600">2026</p>
          <p className="text-sm text-slate-500">Updated Data</p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900">All Demat Accounts</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((account) => (
            <Link key={account.id} href={`/demat-accounts/${account.slug}`} className="block">
              <ProductCard product={account} />
            </Link>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900">
          Demat Account Comparison Table
        </h2>
        <ComparisonTable
          products={sorted.slice(0, 5)}
          features={comparisonFeatures}
          highlightIndex={0}
          highlightLabel="Top Rated"
        />
      </section>

      {/* How to Choose */}
      <section className="mb-12 rounded-xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
        <h2 className="mb-4 text-2xl font-bold text-slate-900">
          How to Choose the Right Demat Account
        </h2>
        <div className="space-y-3 text-slate-700">
          <p>
            Choosing the right demat account depends on your trading style, investment goals, and budget.
            Here are the key factors to consider:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Brokerage charges:</strong> If you trade frequently, look for flat-fee discount
              brokers like Zerodha or Groww that charge Rs 20 or zero per trade.
            </li>
            <li>
              <strong>Platform quality:</strong> Active traders need advanced charting and fast execution.
              Zerodha Kite and Upstox Pro are top choices here.
            </li>
            <li>
              <strong>Research and advisory:</strong> If you want stock recommendations, choose
              full-service brokers like ICICI Direct or HDFC Securities.
            </li>
            <li>
              <strong>Ease of use:</strong> Beginners should prioritize simple interfaces. Groww leads in
              this category.
            </li>
            <li>
              <strong>Annual charges:</strong> Compare AMC fees carefully. Some brokers offer zero AMC
              while others charge Rs 200 to Rs 750 per year.
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
