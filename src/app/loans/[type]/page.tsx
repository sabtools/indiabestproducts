import type { Metadata } from 'next';
import Link from 'next/link';
import { loans } from '@/lib/data/loans';
import type { Loan, LoanSubcategory } from '@/lib/types';
import Breadcrumb from '@/components/layout/Breadcrumb';
import ProductCard from '@/components/product/ProductCard';
import ComparisonTable from '@/components/product/ComparisonTable';
import FaqAccordion from '@/components/content/FaqAccordion';
import JsonLd from '@/components/seo/JsonLd';

/* ── Loan type configuration ── */

interface LoanTypeConfig {
  subcategory: LoanSubcategory;
  displayName: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  howToApply: string[];
  eligibility: string[];
  documents: string[];
  faqs: { question: string; answer: string }[];
}

const LOAN_TYPES: Record<string, LoanTypeConfig> = {
  'personal-loan': {
    subcategory: 'personal',
    displayName: 'Personal Loan',
    description:
      'Personal loans are unsecured loans that can be used for any purpose — from debt consolidation and medical emergencies to weddings and vacations. They offer quick disbursal and flexible repayment tenures.',
    metaTitle: 'Best Personal Loans in India 2026 - Compare Interest Rates & Apply | IndiaBestProducts',
    metaDescription:
      'Compare the best personal loans in India 2026. Interest rates from 10.49%, instant approval, EMI calculator. HDFC, SBI, ICICI, Axis, Bajaj compared.',
    howToApply: [
      'Check your eligibility and CIBIL score (750+ recommended)',
      'Compare interest rates and processing fees across lenders',
      'Gather required documents: PAN, Aadhaar, salary slips, bank statements',
      'Apply online through the bank website or app',
      'Complete e-KYC verification and document upload',
      'Receive approval and loan disbursal (24 to 72 hours for most banks)',
    ],
    eligibility: [
      'Age: 21 to 60 years (salaried), 25 to 65 years (self-employed)',
      'Minimum monthly income: Rs 15,000 to Rs 30,000 depending on lender',
      'CIBIL score: 700+ (750+ for best rates)',
      'Minimum work experience: 1 to 3 years',
      'Salaried employees, self-employed professionals, or business owners',
    ],
    documents: [
      'PAN Card',
      'Aadhaar Card or Passport',
      'Latest 3 months salary slips',
      'Last 6 months bank statements',
      'Form 16 or Income Tax Returns',
      'Address proof (utility bill, passport, or voter ID)',
    ],
    faqs: [
      { question: 'What is the lowest personal loan interest rate in India?', answer: 'Currently, the lowest personal loan interest rates start from around 10.49% per annum offered by banks like Axis Bank and HDFC Bank. The actual rate depends on your CIBIL score, income, employer, and existing relationship with the bank.' },
      { question: 'Can I get a personal loan without income proof?', answer: 'Most banks require income proof for personal loans. However, some digital lenders may offer loans based on bank statement analysis or alternate data. The loan amount and interest rates may be less favorable without traditional income proof.' },
      { question: 'How much personal loan can I get on a salary of Rs 30,000?', answer: 'On a monthly salary of Rs 30,000, you can typically get a personal loan of Rs 3 to 7 lakh depending on your existing EMIs, CIBIL score, and the lender. Banks usually allow EMIs up to 50% of your net monthly income.' },
      { question: 'Is it better to take a personal loan from a bank or NBFC?', answer: 'Banks generally offer lower interest rates but may have stricter eligibility. NBFCs like Bajaj Finserv offer flexible features like flexi loans and faster approvals but at slightly higher rates. Choose based on your priority — lower cost or faster access.' },
    ],
  },
  'home-loan': {
    subcategory: 'home',
    displayName: 'Home Loan',
    description:
      'Home loans help you purchase, construct, or renovate residential property. These are secured loans with lower interest rates and longer tenures of up to 30 years, making homeownership affordable through manageable EMIs.',
    metaTitle: 'Best Home Loans in India 2026 - Lowest Interest Rates & EMI Calculator | IndiaBestProducts',
    metaDescription:
      'Compare the best home loans in India 2026. Interest rates from 8.40%, zero prepayment charges, up to 30-year tenure. SBI, HDFC, ICICI, LIC HFL compared.',
    howToApply: [
      'Check your eligibility and get a pre-approved offer from your bank',
      'Select the property and get a valuation done',
      'Submit application with all required documents',
      'Bank verifies documents and inspects the property',
      'Receive sanction letter with loan terms',
      'Sign the agreement and complete registration',
      'Loan amount disbursed to the seller or builder',
    ],
    eligibility: [
      'Age: 18 to 70 years (at loan maturity)',
      'Minimum monthly income: Rs 20,000 to Rs 30,000',
      'CIBIL score: 700+ (higher scores get better rates)',
      'Salaried, self-employed, or professional',
      'Property must be approved by the lending institution',
    ],
    documents: [
      'PAN Card and Aadhaar Card',
      'Last 6 months salary slips (salaried) or 3 years ITR (self-employed)',
      'Last 12 months bank statements',
      'Property documents and title deeds',
      'Builder agreement or sale deed',
      'Form 16 or Employer certificate',
      'Processing fee cheque',
    ],
    faqs: [
      { question: 'Which bank offers the lowest home loan interest rate?', answer: 'Bank of Baroda and SBI currently offer among the lowest home loan rates starting at 8.40% to 8.50% per annum. The actual rate depends on your loan amount, tenure, CIBIL score, and whether you opt for a floating or fixed rate.' },
      { question: 'Can I get a home loan with a 650 CIBIL score?', answer: 'Yes, some lenders like LIC Housing Finance offer home loans with CIBIL scores as low as 650. However, the interest rate will be higher. Improving your score to 750+ before applying can save you lakhs over the loan tenure.' },
      { question: 'Are there any tax benefits on home loans?', answer: 'Yes. Under Section 80C, you can claim up to Rs 1.5 lakh deduction on principal repayment. Under Section 24(b), you can claim up to Rs 2 lakh deduction on interest paid. For first-time buyers, an additional Rs 1.5 lakh is available under Section 80EEA.' },
      { question: 'Should I choose a fixed or floating rate home loan?', answer: 'Floating rate home loans are generally recommended as they have zero prepayment charges and rates adjust based on RBI policy. Fixed rates offer EMI certainty but are typically 1% to 2% higher and carry prepayment penalties.' },
    ],
  },
  'car-loan': {
    subcategory: 'car',
    displayName: 'Car Loan',
    description:
      'Car loans help you finance the purchase of new or used vehicles. Available from banks, NBFCs, and manufacturer-backed financiers, car loans offer competitive rates and tenures up to 7 years.',
    metaTitle: 'Best Car Loans in India 2026 - Lowest Auto Loan Rates & EMI | IndiaBestProducts',
    metaDescription:
      'Compare the best car loans in India 2026. Interest rates from 8.65%, up to 100% financing, quick approval. SBI, HDFC, ICICI car loans compared.',
    howToApply: [
      'Choose your car and get a price quotation from the dealer',
      'Check eligibility and compare car loan offers from multiple lenders',
      'Submit application with identity, income, and address proof',
      'Bank verifies documents and approves the loan',
      'Pay the margin money (down payment) to the dealer',
      'Bank disburses the loan directly to the dealer',
      'Car is registered with hypothecation in favor of the bank',
    ],
    eligibility: [
      'Age: 21 to 65 years',
      'Minimum monthly income: Rs 15,000 to Rs 25,000',
      'CIBIL score: 700+',
      'Salaried, self-employed, or professional',
      'Valid driving license (recommended)',
    ],
    documents: [
      'PAN Card and Aadhaar Card',
      'Income proof (salary slips for 3 months or ITR)',
      'Bank statements for last 3 to 6 months',
      'Vehicle quotation or proforma invoice from dealer',
      'Address proof',
      'Driving license',
    ],
    faqs: [
      { question: 'What is the lowest car loan interest rate in 2026?', answer: 'SBI currently offers the lowest car loan interest rate starting at 8.65% per annum. HDFC Bank and ICICI Bank offer rates from 8.75%. The rate depends on your profile, loan amount, and whether you choose a new or used car.' },
      { question: 'Can I get 100% financing for a new car?', answer: 'Yes, banks like SBI offer up to 100% on-road price financing for select new car models. Most other lenders finance 80% to 90% of the ex-showroom price, and you need to pay the rest as a down payment.' },
      { question: 'Is it better to pay cash or take a car loan?', answer: 'If you can invest the money at a return higher than the car loan interest rate, taking a loan may be financially better. Car loans also help build your credit history. However, paying cash saves you the total interest cost over the loan tenure.' },
      { question: 'Can I prepay my car loan early?', answer: 'Yes. For floating rate car loans, most banks charge no prepayment penalty. For fixed rate loans, expect a 2% to 5% foreclosure charge on the outstanding amount. SBI charges nil after 12 months even on floating rate car loans.' },
    ],
  },
  'education-loan': {
    subcategory: 'education',
    displayName: 'Education Loan',
    description:
      'Education loans help students fund their higher education in India or abroad. They cover tuition fees, living expenses, and other academic costs, with repayment starting after a moratorium period post course completion.',
    metaTitle: 'Best Education Loans in India 2026 - Study Abroad & Domestic | IndiaBestProducts',
    metaDescription:
      'Compare the best education loans in India 2026 for studying in India and abroad. Low interest rates, moratorium period, and tax benefits. SBI, HDFC, and more.',
    howToApply: [
      'Secure admission to a recognized educational institution',
      'Calculate total funding required (tuition + living expenses)',
      'Compare education loan offers from banks and NBFCs',
      'Submit application with admission letter and academic records',
      'Provide collateral or guarantor (for loans above Rs 7.5 lakh)',
      'Bank processes and sanctions the loan',
      'Funds disbursed directly to the institution in installments',
    ],
    eligibility: [
      'Indian national with admission to a recognized institution',
      'Age: 18 to 35 years',
      'Good academic record (60%+ in qualifying exams)',
      'Co-applicant (parent or guardian) required',
      'Collateral required for loans above Rs 7.5 lakh (varies by lender)',
    ],
    documents: [
      'Admission letter from the educational institution',
      'Academic mark sheets and certificates',
      'PAN Card and Aadhaar Card of student and co-applicant',
      'Income proof of co-applicant',
      'Cost of study breakdown from the institution',
      'Collateral documents (if applicable)',
    ],
    faqs: [
      { question: 'What is the maximum education loan amount available?', answer: 'For studying in India, banks offer up to Rs 10 to 20 lakh without collateral and up to Rs 1.5 crore with collateral. For studying abroad, loan amounts can go up to Rs 1 crore or more depending on the institution and course.' },
      { question: 'Do I need to start repaying during the course?', answer: 'No, education loans come with a moratorium period covering the course duration plus 6 to 12 months after completion or 6 months after getting a job, whichever is earlier. Some banks offer the option to pay interest during the moratorium.' },
      { question: 'Is there a tax benefit on education loans?', answer: 'Yes. Under Section 80E of the Income Tax Act, the entire interest paid on education loans is deductible with no upper limit. This deduction is available for up to 8 years from the year you start repaying.' },
      { question: 'Can I get an education loan without collateral?', answer: 'Yes, most banks offer collateral-free education loans up to Rs 7.5 lakh for studying in India and up to Rs 10 to 15 lakh for studying abroad. Government schemes like Vidyalakshmi also provide collateral-free options.' },
    ],
  },
  'business-loan': {
    subcategory: 'business',
    displayName: 'Business Loan',
    description:
      'Business loans help entrepreneurs and MSMEs fund their business operations, expansion, equipment purchase, or working capital needs. Available as term loans, overdraft facilities, and government-backed schemes like MUDRA.',
    metaTitle: 'Best Business Loans in India 2026 - MSME & Startup Loans | IndiaBestProducts',
    metaDescription:
      'Compare the best business loans in India 2026 for MSMEs, startups, and enterprises. Government schemes, lowest rates, quick approval. Complete guide.',
    howToApply: [
      'Prepare a business plan or project report',
      'Check your eligibility and required loan amount',
      'Compare offers from banks, NBFCs, and government schemes',
      'Submit application with business and financial documents',
      'Bank evaluates business viability and creditworthiness',
      'Provide collateral or guarantee as required',
      'Loan sanctioned and disbursed (7 to 15 working days)',
    ],
    eligibility: [
      'Business operational for minimum 1 to 3 years',
      'Minimum annual turnover as per lender requirements',
      'Good personal and business CIBIL score (700+)',
      'Sole proprietors, partnerships, LLPs, or private limited companies',
      'Valid GST registration and business licenses',
    ],
    documents: [
      'Business registration documents (GST, Udyam, etc.)',
      'Last 3 years business ITR and audited financials',
      'Last 12 months bank statements',
      'PAN Card and Aadhaar Card of proprietor/directors',
      'Business plan or project report',
      'Collateral documents (if applicable)',
    ],
    faqs: [
      { question: 'What government schemes are available for business loans?', answer: 'Key schemes include MUDRA loans (up to Rs 10 lakh without collateral), Stand-Up India (Rs 10 lakh to Rs 1 crore for SC/ST and women entrepreneurs), CGTMSE (collateral-free loans up to Rs 5 crore), and PMEGP for new enterprises.' },
      { question: 'Can I get a business loan without collateral?', answer: 'Yes, under the MUDRA scheme you can get up to Rs 10 lakh without collateral. Under CGTMSE, collateral-free loans up to Rs 5 crore are available. NBFCs also offer unsecured business loans up to Rs 50 lakh based on business turnover.' },
      { question: 'How quickly can I get a business loan?', answer: 'NBFCs and fintech lenders can approve business loans in 24 to 72 hours. Bank business loans typically take 7 to 15 working days. Government scheme loans may take 2 to 4 weeks due to additional verification.' },
      { question: 'What is the interest rate on business loans in India?', answer: 'Business loan interest rates range from 10% to 24% per annum depending on the lender, loan type, business vintage, and your credit profile. Government-backed schemes often offer subsidized rates of 8% to 12%.' },
    ],
  },
  'gold-loan': {
    subcategory: 'gold',
    displayName: 'Gold Loan',
    description:
      'Gold loans let you borrow money by pledging your gold jewelry or coins as collateral. They offer quick disbursal (often within minutes), lower interest rates than personal loans, and no income proof requirements.',
    metaTitle: 'Best Gold Loans in India 2026 - Lowest Interest Rates & Instant Disbursal | IndiaBestProducts',
    metaDescription:
      'Compare the best gold loans in India 2026. Interest rates from 7%, instant disbursal, no income proof needed. Muthoot, Manappuram, SBI gold loans compared.',
    howToApply: [
      'Visit a bank branch or gold loan NBFC with your gold ornaments',
      'Gold is appraised for purity and weight',
      'Loan amount offered based on gold value (up to 75% of market value)',
      'Submit KYC documents (PAN and Aadhaar)',
      'Sign the loan agreement',
      'Receive loan amount instantly (often within 30 minutes)',
    ],
    eligibility: [
      'Age: 18 to 70 years',
      'Must own gold jewelry or coins (minimum 18 karat purity)',
      'No income proof required in most cases',
      'No CIBIL score requirement for most lenders',
      'Indian resident or NRI (select lenders)',
    ],
    documents: [
      'PAN Card',
      'Aadhaar Card or Voter ID',
      'Gold jewelry or coins to be pledged',
      'Passport-size photographs',
      'No income proof required for most lenders',
    ],
    faqs: [
      { question: 'How much loan can I get against my gold?', answer: 'As per RBI guidelines, banks and NBFCs can offer up to 75% of the gold market value as a loan. For example, if your gold is worth Rs 5 lakh, you can get up to Rs 3.75 lakh as a loan.' },
      { question: 'Is my gold safe with the lender?', answer: 'Yes, banks and regulated NBFCs store pledged gold in secure vaults with insurance coverage. Your gold is returned in the same condition once you repay the loan. Always choose RBI-regulated lenders for safety.' },
      { question: 'What happens if I cannot repay the gold loan?', answer: 'If you default on a gold loan, the lender will send multiple reminders. If the loan remains unpaid, the lender can auction your pledged gold to recover the outstanding amount. Any surplus from the auction is returned to you.' },
      { question: 'Can I get a gold loan online?', answer: 'Some lenders like Muthoot Finance and SBI offer online gold loan applications where you can initiate the process online and complete the gold pledge at a nearby branch. Fully digital gold loans are available from select fintech platforms.' },
    ],
  },
};

/* ── Static params ── */

export function generateStaticParams() {
  return Object.keys(LOAN_TYPES).map((type) => ({ type }));
}

/* ── Dynamic metadata ── */

export async function generateMetadata({ params }: { params: Promise<{ type: string }> }): Promise<Metadata> {
  const { type } = await params;
  const config = LOAN_TYPES[type];
  if (!config) {
    return { title: 'Loan Type Not Found | IndiaBestProducts' };
  }
  return {
    title: config.metaTitle,
    description: config.metaDescription,
    alternates: { canonical: `https://indiabestproducts.com/loans/${type}` },
    openGraph: {
      title: config.metaTitle,
      description: config.metaDescription,
      url: `https://indiabestproducts.com/loans/${type}`,
      type: 'website',
    },
  };
}

/* ── Comparison features ── */

const comparisonFeatures = [
  { key: 'interestRateMin', label: 'Min Interest Rate (%)' },
  { key: 'interestRateMax', label: 'Max Interest Rate (%)' },
  { key: 'processingFee', label: 'Processing Fee' },
  { key: 'emiPerLakh', label: 'EMI per Lakh' },
  { key: 'maxAmount', label: 'Max Loan Amount' },
  { key: 'maxTenure', label: 'Max Tenure' },
  { key: 'prepaymentCharges', label: 'Prepayment Charges' },
  { key: 'disbursalTime', label: 'Disbursal Time' },
];

/* ── Page ── */

export default async function LoanTypePage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  const config = LOAN_TYPES[type];

  if (!config) {
    return (
      <div className="container-main section-padding text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Loan Type Not Found</h1>
        <p className="text-slate-600 mb-6">The loan category you are looking for does not exist.</p>
        <a href="/loans" className="text-blue-600 font-semibold hover:underline">
          Browse All Loans &rarr;
        </a>
      </div>
    );
  }

  const filteredLoans = loans.filter((l) => l.subcategory === config.subcategory);
  const sortedLoans = [...filteredLoans].sort((a, b) => b.rating - a.rating);

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Best ${config.displayName}s in India 2026`,
    description: config.metaDescription,
    url: `https://indiabestproducts.com/loans/${type}`,
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
              { label: 'Loans', href: '/loans' },
              { label: config.displayName },
            ]}
          />
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-800 py-12 text-white">
        <div className="container-main">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Best {config.displayName}s in India 2026
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl">{config.description}</p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="section-padding">
        <div className="container-main">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Top {config.displayName}s ({sortedLoans.length} products)
          </h2>
          {sortedLoans.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
              <p className="text-slate-500 text-lg">
                No {config.displayName.toLowerCase()}s listed yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sortedLoans.map((loan) => (
                <Link key={loan.id} href={`/loans/review/${loan.slug}`} className="block">
                  <ProductCard product={loan} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Comparison Table */}
      {sortedLoans.length > 1 && (
        <section className="section-padding bg-slate-50">
          <div className="container-main">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              {config.displayName} Comparison Table
            </h2>
            <p className="text-slate-600 mb-6">
              Compare interest rates, fees, and features of all {config.displayName.toLowerCase()}s side by side.
            </p>
            <ComparisonTable
              products={sortedLoans}
              features={comparisonFeatures}
              highlightIndex={0}
              highlightLabel="Top Rated"
            />
          </div>
        </section>
      )}

      {/* How to Apply */}
      <section className="section-padding">
        <div className="container-main max-w-4xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            How to Apply for a {config.displayName}
          </h2>
          <div className="space-y-4">
            {config.howToApply.map((step, i) => (
              <div key={i} className="flex items-start gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                  {i + 1}
                </span>
                <p className="text-slate-700 pt-1">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility Criteria */}
      <section className="section-padding bg-slate-50">
        <div className="container-main max-w-4xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            {config.displayName} Eligibility Criteria
          </h2>
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <ul className="space-y-3">
              {config.eligibility.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-700">
                  <span className="mt-1 text-emerald-500 shrink-0">&#10003;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Documents Required */}
      <section className="section-padding">
        <div className="container-main max-w-4xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Documents Required for {config.displayName}
          </h2>
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <ul className="grid gap-3 sm:grid-cols-2">
              {config.documents.map((doc, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-700">
                  <span className="mt-1 text-blue-500 shrink-0">&#128196;</span>
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
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
