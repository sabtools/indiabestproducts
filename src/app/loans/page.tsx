import type { Metadata } from 'next';
import { loans } from '@/lib/data/loans';
import Breadcrumb from '@/components/layout/Breadcrumb';
import ComparisonTable from '@/components/product/ComparisonTable';
import FaqAccordion from '@/components/content/FaqAccordion';
import JsonLd from '@/components/seo/JsonLd';
import LoansGrid from './LoansGrid';

export const metadata: Metadata = {
  title: 'Best Loans in India 2026 - Personal, Home & Car Loans | IndiaBestProducts',
  description:
    'Compare the best personal loans, home loans, car loans, education loans, and more in India 2026. Expert reviews with latest interest rates, eligibility, and processing fees.',
  keywords: [
    'best loans india 2026',
    'personal loan comparison',
    'home loan interest rate',
    'car loan india',
    'education loan',
    'business loan',
    'gold loan',
    'lowest interest rate loan india',
  ],
  alternates: { canonical: 'https://indiabestproducts.com/loans' },
  openGraph: {
    title: 'Best Loans in India 2026 - Personal, Home & Car Loans',
    description: 'Compare interest rates, processing fees, and eligibility across India\'s top banks and NBFCs.',
    url: 'https://indiabestproducts.com/loans',
    type: 'website',
  },
};

const faqs = [
  {
    question: 'What types of loans are available in India?',
    answer:
      'The most common loans in India include personal loans, home loans, car loans, education loans, business loans, and gold loans. Each type has different interest rates, eligibility criteria, and tenure options depending on the lender and your financial profile.',
  },
  {
    question: 'How do I choose the best loan for my needs?',
    answer:
      'Compare interest rates, processing fees, repayment tenure, prepayment charges, and eligibility criteria across lenders. Also consider disbursal speed and customer service quality. Use our comparison tables above to evaluate options side by side.',
  },
  {
    question: 'What CIBIL score do I need to get a loan in India?',
    answer:
      'Most banks require a minimum CIBIL score of 700 for personal and home loans. A score of 750+ gets you the best interest rates. Some lenders offer loans with scores as low as 650, but at higher interest rates.',
  },
  {
    question: 'Are there any hidden charges when taking a loan?',
    answer:
      'Watch out for processing fees (0.5% to 3%), prepayment and foreclosure charges, late payment penalties, documentation charges, and insurance premiums bundled with the loan. Always read the sanction letter carefully before signing.',
  },
  {
    question: 'How fast can I get a loan disbursed?',
    answer:
      'Personal loans from private banks can be disbursed within 24 to 48 hours for pre-approved customers. Home loans typically take 7 to 15 working days. Car loans can be processed in 1 to 3 days. Digital lenders may offer instant disbursal for eligible customers.',
  },
];

const comparisonFeatures = [
  { key: 'interestRateMin', label: 'Interest Rate (Min %)' },
  { key: 'interestRateMax', label: 'Interest Rate (Max %)' },
  { key: 'processingFee', label: 'Processing Fee' },
  { key: 'emiPerLakh', label: 'EMI per Lakh' },
  { key: 'prepaymentCharges', label: 'Prepayment Charges' },
  { key: 'disbursalTime', label: 'Disbursal Time' },
];

export default function LoansHubPage() {
  const topLoans = [...loans].sort((a, b) => b.rating - a.rating).slice(0, 5);

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Best Loans in India 2026',
    description:
      'Compare the best personal loans, home loans, car loans, education loans, and more in India. Expert reviews, latest interest rates, and eligibility details.',
    url: 'https://indiabestproducts.com/loans',
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
              { label: 'Loans' },
            ]}
          />
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-800 py-12 text-white">
        <div className="container-main">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Best Loans in India 2026</h1>
          <p className="text-lg text-blue-100 max-w-2xl">
            Compare interest rates, processing fees, and eligibility across India&apos;s top banks and NBFCs.
            Find the perfect loan for your needs.
          </p>
        </div>
      </section>

      {/* Client-side filterable grid */}
      <LoansGrid loans={loans} />

      {/* Comparison Section */}
      <section className="section-padding bg-slate-50">
        <div className="container-main">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Quick Comparison - Top Rated Loans</h2>
          <p className="text-slate-600 mb-6">
            Side-by-side comparison of the top 5 highest-rated loans across all categories.
          </p>
          <ComparisonTable
            products={topLoans}
            features={comparisonFeatures}
            highlightIndex={0}
            highlightLabel="Top Rated"
          />
        </div>
      </section>

      {/* Loan Categories Overview */}
      <section className="section-padding">
        <div className="container-main">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Explore Loan Categories</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { type: 'personal-loan', name: 'Personal Loan', desc: 'Unsecured loans for any purpose with quick disbursal', icon: '💰' },
              { type: 'home-loan', name: 'Home Loan', desc: 'Finance your dream home at the lowest interest rates', icon: '🏠' },
              { type: 'car-loan', name: 'Car Loan', desc: 'Drive your dream car with affordable EMIs', icon: '🚗' },
              { type: 'education-loan', name: 'Education Loan', desc: 'Fund your education at top universities worldwide', icon: '🎓' },
              { type: 'business-loan', name: 'Business Loan', desc: 'Grow your business with flexible financing options', icon: '💼' },
              { type: 'gold-loan', name: 'Gold Loan', desc: 'Get instant cash against your gold jewelry', icon: '🥇' },
            ].map((cat) => (
              <a
                key={cat.type}
                href={`/loans/${cat.type}`}
                className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="text-3xl">{cat.icon}</span>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{cat.name}</h3>
                  <p className="text-sm text-slate-600 mt-1">{cat.desc}</p>
                  <span className="text-sm font-semibold text-blue-600 mt-2 inline-block">
                    View Best &rarr;
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="section-padding bg-slate-50">
        <div className="container-main max-w-4xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Complete Guide to Loans in India 2026
          </h2>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              India&apos;s lending market offers a wide range of loan products from leading banks like SBI, HDFC Bank, ICICI Bank, and Axis Bank, as well as NBFCs like Bajaj Finserv and LIC Housing Finance. Whether you need funds for a new home, a car, higher education, or personal expenses, understanding the key differences in interest rates, processing fees, and repayment terms is essential to choosing the right loan.
            </p>
            <p>
              At IndiaBestProducts.com, we compare loans across multiple parameters to help you make an informed decision. Our expert team reviews eligibility criteria, documentation requirements, disbursal timelines, and hidden charges so you can borrow with confidence and save money over the loan tenure.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding">
        <div className="container-main max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions About Loans</h2>
          <FaqAccordion items={faqs} />
        </div>
      </section>
    </>
  );
}
