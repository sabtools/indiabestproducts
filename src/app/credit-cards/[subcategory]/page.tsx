import type { Metadata } from 'next';
import Link from 'next/link';
import { creditCards } from '@/lib/data/credit-cards';
import type { CreditCard, CreditCardSubcategory, FAQ } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import Breadcrumb from '@/components/layout/Breadcrumb';
import ProductCard from '@/components/product/ProductCard';
import ComparisonTable from '@/components/product/ComparisonTable';
import FaqAccordion from '@/components/content/FaqAccordion';
import JsonLd from '@/components/seo/JsonLd';

// ── Static subcategory definitions ──────────────────────────
interface SubcategoryMeta {
  slug: CreditCardSubcategory;
  label: string;
  heading: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  faqs: FAQ[];
}

const subcategories: SubcategoryMeta[] = [
  {
    slug: 'cashback',
    label: 'Cashback',
    heading: 'Best Cashback Credit Cards in India 2026',
    intro:
      'Cashback credit cards return a percentage of your spending directly as statement credit or reward points. They are ideal for online shoppers, grocery buyers, and anyone who wants simple, no-fuss savings on daily transactions.',
    metaTitle: 'Best Cashback Credit Cards in India 2026 - Compare & Apply | IndiaBestProducts',
    metaDescription:
      'Compare the best cashback credit cards in India for 2026. Get up to 5% cashback on online shopping, groceries, bills. Check features, fees & apply online.',
    faqs: [
      { question: 'Which credit card gives the highest cashback in India?', answer: 'The HDFC Millennia offers 5% cashback on select online platforms and 2.5% on other spends. The Amazon Pay ICICI card gives 5% back on Amazon purchases for Prime members. Actual cashback rates vary by category and card.' },
      { question: 'Is cashback credited automatically?', answer: 'Most cashback cards credit rewards as points that convert to statement credit. Some, like the Amazon Pay ICICI, credit cashback directly as Amazon Pay balance. Always check the redemption mechanism before applying.' },
      { question: 'Are cashback credit cards worth it for low spenders?', answer: 'Yes, especially lifetime free cashback cards with no annual fee. Even modest monthly spending of Rs 10,000-15,000 can earn meaningful cashback over a year without any fee burden.' },
      { question: 'What is the monthly cashback cap on most cards?', answer: 'Most cashback cards cap monthly rewards between Rs 500 and Rs 1,500. Premium cashback cards may offer higher limits. Check the specific card terms to understand the cap for each spending category.' },
    ],
  },
  {
    slug: 'rewards',
    label: 'Rewards',
    heading: 'Best Rewards Credit Cards in India 2026',
    intro:
      'Rewards credit cards earn points on every purchase that can be redeemed for travel, merchandise, gift vouchers, or statement credit. They offer higher value per rupee spent compared to cashback cards, especially for frequent spenders.',
    metaTitle: 'Best Rewards Credit Cards in India 2026 - Compare & Apply | IndiaBestProducts',
    metaDescription:
      'Find the best rewards credit cards in India for 2026. Earn reward points on every spend, redeem for travel, shopping & more. Compare and apply online.',
    faqs: [
      { question: 'How do reward points work on credit cards?', answer: 'You earn a fixed number of reward points per Rs 100 or Rs 150 spent. Points accumulate over time and can be redeemed through the bank portal for flights, hotel stays, Amazon vouchers, or statement credit. Point value varies by redemption method.' },
      { question: 'Which rewards card has the best point value?', answer: 'The HDFC Infinia offers the best point value at Rs 1 per point when transferred to airline/hotel partners. The HDFC Diners Club Black offers similar value. Standard cards typically offer Rs 0.25 to Rs 0.50 per point.' },
      { question: 'Do reward points expire?', answer: 'Most banks expire reward points after 2 to 3 years. Some premium cards like the HDFC Infinia offer points that never expire. Always check the card terms for point expiry policies.' },
      { question: 'Can I transfer reward points to airline miles?', answer: 'Premium rewards cards often allow 1:1 transfer to airline partners like Vistara, Singapore Airlines, and hotel programs like Marriott. This typically offers the best value per point but is limited to higher-tier cards.' },
    ],
  },
  {
    slug: 'travel',
    label: 'Travel',
    heading: 'Best Travel Credit Cards in India 2026',
    intro:
      'Travel credit cards are designed for frequent flyers and travelers. They offer airport lounge access, air miles, low forex markups, comprehensive travel insurance, and accelerated rewards on flights and hotel bookings.',
    metaTitle: 'Best Travel Credit Cards in India 2026 - Lounge Access & Miles | IndiaBestProducts',
    metaDescription:
      'Compare the best travel credit cards in India for 2026. Get airport lounge access, air miles, travel insurance, low forex fees. Apply online now.',
    faqs: [
      { question: 'Which travel credit card has the best lounge access?', answer: 'The HDFC Infinia offers unlimited domestic and international lounge visits via Priority Pass. The SBI Card ELITE provides 6 international and unlimited domestic lounge visits. Axis Magnus also offers excellent lounge benefits.' },
      { question: 'Do travel credit cards cover travel insurance?', answer: 'Yes, most travel credit cards include complimentary travel insurance covering flight delays, lost baggage, medical emergencies abroad, and trip cancellation. Coverage amounts range from Rs 25 lakh to Rs 2 crore depending on the card tier.' },
      { question: 'What is the best card for international spending?', answer: 'Look for cards with low foreign transaction fees (2% or less). The HDFC Infinia (2%), Axis Atlas, and SBI Card ELITE offer competitive forex markups. Niyo or forex-specific cards may offer even lower rates for pure international spending.' },
      { question: 'Can I earn air miles with credit cards?', answer: 'Yes, several cards earn air miles directly or allow transfer of reward points to airline partners. The HDFC Infinia, Axis Magnus, and Amex Platinum Travel offer 1:1 mile transfer to airline and hotel loyalty programs.' },
    ],
  },
  {
    slug: 'fuel',
    label: 'Fuel',
    heading: 'Best Fuel Credit Cards in India 2026',
    intro:
      'Fuel credit cards offer surcharge waivers and accelerated rewards at petrol stations. With fuel prices continually rising, a good fuel card can save Rs 2,000-5,000+ annually for regular commuters.',
    metaTitle: 'Best Fuel Credit Cards in India 2026 - Save on Petrol & Diesel | IndiaBestProducts',
    metaDescription:
      'Compare the best fuel credit cards in India for 2026. Get fuel surcharge waivers, cashback on petrol/diesel. Save money on every fuel purchase.',
    faqs: [
      { question: 'How much can I save with a fuel credit card?', answer: 'A typical fuel surcharge waiver saves 1% on transactions between Rs 400 and Rs 5,000. If you spend Rs 5,000 monthly on fuel, you save approximately Rs 600-1,200 per year. Accelerated rewards at fuel stations can add Rs 1,000-3,000 more in annual savings.' },
      { question: 'Do fuel cards work at all petrol pumps?', answer: 'Fuel surcharge waivers typically apply at all petrol pumps across India. However, co-branded cards like the BPCL SBI Card offer extra rewards specifically at BPCL stations while standard surcharge waivers apply at any pump.' },
      { question: 'Is the fuel surcharge waiver automatic?', answer: 'Yes, the fuel surcharge waiver is typically applied automatically on eligible transactions. No registration or special activation is needed. The waiver amount is adjusted in your monthly statement.' },
      { question: 'Can I get a fuel card with no annual fee?', answer: 'Some fuel cards like the IndianOil Axis Bank Card have low joining fees. However, most premium fuel cards carry annual fees that can be waived by meeting spending targets. Check whether the fuel savings outweigh the annual fee for your usage pattern.' },
    ],
  },
  {
    slug: 'lifetime-free',
    label: 'Lifetime Free',
    heading: 'Best Lifetime Free Credit Cards in India 2026',
    intro:
      'Lifetime free credit cards have zero joining and annual fees forever. They are ideal for beginners, low spenders, or anyone who wants credit card benefits without worrying about meeting spending thresholds to get fee waivers.',
    metaTitle: 'Best Lifetime Free Credit Cards in India 2026 - No Annual Fee | IndiaBestProducts',
    metaDescription:
      'Compare the best lifetime free credit cards in India for 2026. Zero joining fee, zero annual fee. Get cashback, rewards without any charges.',
    faqs: [
      { question: 'Are lifetime free credit cards truly free?', answer: 'Yes, they have no joining fee and no annual fee for the life of the card. However, standard charges like interest on unpaid balances, late payment fees, over-limit charges, and foreign transaction fees still apply as with any credit card.' },
      { question: 'What are the best lifetime free credit cards?', answer: 'The Amazon Pay ICICI Credit Card, Flipkart Axis Bank Credit Card, and AU Small Finance Bank LIT Credit Card are among the best lifetime free options offering competitive cashback and rewards with zero fees.' },
      { question: 'Do lifetime free cards have lower rewards?', answer: 'Not necessarily. The Amazon Pay ICICI card offers up to 5% cashback which is comparable to or better than many paid cards. However, premium perks like lounge access, concierge, and travel insurance are typically limited on free cards.' },
      { question: 'Can I upgrade from a lifetime free card to a premium card?', answer: 'Yes, most banks allow upgrades based on your spending history and credit score improvement. After 6-12 months of responsible usage, you can request an upgrade to a higher-tier card from the same bank.' },
    ],
  },
  {
    slug: 'premium',
    label: 'Premium',
    heading: 'Best Premium Credit Cards in India 2026',
    intro:
      'Premium credit cards offer top-tier rewards, unlimited lounge access, personal concierge services, comprehensive insurance, and elite lifestyle privileges. They come with higher fees but deliver exceptional value for high spenders.',
    metaTitle: 'Best Premium Credit Cards in India 2026 - Top Luxury Cards | IndiaBestProducts',
    metaDescription:
      'Compare the best premium credit cards in India for 2026. Get unlimited lounge access, concierge, top rewards. HDFC Infinia, Axis Magnus & more.',
    faqs: [
      { question: 'Is it worth paying a high annual fee for a premium card?', answer: 'If you spend Rs 5-10 lakh or more annually, the rewards, lounge access, insurance, and milestone benefits easily outweigh the annual fee. Most premium cards waive fees on annual spends of Rs 3-10 lakh, so you may not even end up paying the fee.' },
      { question: 'What income is needed for a premium credit card?', answer: 'Most premium cards require an annual income of Rs 12 lakh or above. Ultra-premium cards like the HDFC Infinia or Amex Centurion require Rs 30 lakh+ and are often invite-only based on existing bank relationships.' },
      { question: 'Do premium cards offer better insurance coverage?', answer: 'Yes, premium cards typically offer comprehensive coverage including travel insurance (Rs 1-2 crore), purchase protection, extended warranty, air accident insurance, and sometimes even health insurance benefits. Standard cards usually have minimal or no insurance.' },
      { question: 'How do I get invited for invite-only premium cards?', answer: 'Maintain a strong relationship with the bank through savings, FD, or existing card spending. Banks typically upgrade customers with annual spends of Rs 8-15 lakh on existing cards. Some banks also consider salary accounts and total portfolio value.' },
    ],
  },
  {
    slug: 'student',
    label: 'Student',
    heading: 'Best Student Credit Cards in India 2026',
    intro:
      'Student credit cards are designed for college students and young adults with limited or no income. They come with low credit limits, minimal fees, and help build a credit history early.',
    metaTitle: 'Best Student Credit Cards in India 2026 - For College Students | IndiaBestProducts',
    metaDescription:
      'Find the best student credit cards in India for 2026. Low fees, easy approval for students. Build credit history early. Compare and apply.',
    faqs: [
      { question: 'Can students get a credit card in India?', answer: 'Yes, several banks offer credit cards specifically for students aged 18 and above. Some require a fixed deposit as collateral (secured cards), while others issue cards against a parent guarantor or proof of scholarship/stipend.' },
      { question: 'What is the credit limit on student cards?', answer: 'Student credit cards typically have lower credit limits ranging from Rs 15,000 to Rs 50,000. This helps manage spending while building credit history responsibly.' },
      { question: 'Do student cards help build credit score?', answer: 'Yes, responsible usage of a student credit card is one of the best ways to start building a CIBIL score. Paying the full bill on time every month will help establish an excellent credit history by graduation.' },
      { question: 'What documents do students need to apply?', answer: 'Typically required: college ID card, admission letter or fee receipt, address proof, PAN card, and Aadhaar card. Some banks also require a parent or guardian as a co-applicant or a fixed deposit.' },
    ],
  },
  {
    slug: 'secured',
    label: 'Secured',
    heading: 'Best Secured Credit Cards in India 2026',
    intro:
      'Secured credit cards are backed by a fixed deposit and are ideal for people with low or no credit score. They help build credit history while offering the convenience and rewards of a regular credit card.',
    metaTitle: 'Best Secured Credit Cards in India 2026 - Build Your Credit Score | IndiaBestProducts',
    metaDescription:
      'Compare the best secured credit cards in India for 2026. Get a credit card against FD, build credit score. Easy approval, minimal requirements.',
    faqs: [
      { question: 'How does a secured credit card work?', answer: 'You place a fixed deposit with the bank, and they issue a credit card with a limit of 75-90% of the FD amount. You continue earning interest on the FD while using the card normally. Timely payments build your credit score.' },
      { question: 'Who should get a secured credit card?', answer: 'Secured cards are ideal for people with no credit history (new to credit), those with a low CIBIL score looking to rebuild, students, and freelancers or self-employed individuals who may not meet income requirements for regular cards.' },
      { question: 'Can I convert a secured card to a regular card?', answer: 'Yes, after 12-18 months of responsible usage, most banks offer the option to convert your secured card to a regular unsecured credit card, returning your fixed deposit.' },
      { question: 'Do I earn interest on the FD used for a secured card?', answer: 'Yes, your fixed deposit continues to earn interest at the prevailing FD rate while it serves as collateral. This makes secured cards cost-effective since your money is not idle.' },
    ],
  },
  {
    slug: 'business',
    label: 'Business',
    heading: 'Best Business Credit Cards in India 2026',
    intro:
      'Business credit cards are designed for entrepreneurs, freelancers, and small business owners. They offer higher credit limits, expense tracking, GST input credit benefits, and rewards tailored to business spending.',
    metaTitle: 'Best Business Credit Cards in India 2026 - For Entrepreneurs | IndiaBestProducts',
    metaDescription:
      'Compare the best business credit cards in India for 2026. Higher limits, GST benefits, expense management. Ideal for SMEs and freelancers.',
    faqs: [
      { question: 'Can freelancers get a business credit card?', answer: 'Yes, several banks issue business credit cards to freelancers with ITR proof and a minimum annual income of Rs 6-12 lakh. Self-employed professionals with stable income can qualify for business cards from HDFC, ICICI, and Axis.' },
      { question: 'What are the tax benefits of a business credit card?', answer: 'Business credit cards provide detailed statements that simplify GST input credit claims. Interest paid on business credit cards may be tax-deductible as a business expense. Consult your CA for specific deductions applicable to your business.' },
      { question: 'Are business card limits higher than personal cards?', answer: 'Yes, business credit cards typically offer 2-5x higher credit limits compared to personal cards. This is because business expenses tend to be larger and the assessment considers business revenue rather than just personal income.' },
      { question: 'Do business cards offer employee add-on cards?', answer: 'Yes, most business cards allow you to issue add-on cards for employees with individual spending limits. This simplifies expense management and consolidates all business spending into one account.' },
    ],
  },
  {
    slug: 'lifestyle',
    label: 'Lifestyle',
    heading: 'Best Lifestyle Credit Cards in India 2026',
    intro:
      'Lifestyle credit cards offer a well-rounded mix of dining privileges, movie discounts, shopping rewards, and entertainment benefits. They are perfect for social spenders who enjoy a premium experience across categories.',
    metaTitle: 'Best Lifestyle Credit Cards in India 2026 - Dining, Shopping & More | IndiaBestProducts',
    metaDescription:
      'Compare the best lifestyle credit cards in India for 2026. Get dining offers, movie tickets, shopping cashback. Perfect for everyday lifestyle spends.',
    faqs: [
      { question: 'What makes a lifestyle credit card different?', answer: 'Lifestyle cards balance rewards across multiple categories like dining, movies, shopping, and entertainment rather than focusing on a single category. They offer a versatile mix of cashback, discount partnerships, and lifestyle privileges.' },
      { question: 'Which lifestyle card is best for dining and movies?', answer: 'The SBI SimplyCLICK, ICICI Amazon Pay, and Axis Flipkart cards offer strong dining and entertainment benefits including BookMyShow discounts, Zomato/Swiggy cashback, and dining privileges at partner restaurants.' },
      { question: 'Do lifestyle cards offer good lounge access?', answer: 'Mid-range lifestyle cards offer 2-4 domestic lounge visits per year. For frequent lounge access, you may need to step up to a premium card. However, lifestyle cards compensate with broader everyday rewards.' },
      { question: 'Are lifestyle cards worth it for moderate spenders?', answer: 'Yes, especially those with low or no annual fees. If you regularly spend on dining, entertainment, and online shopping, a lifestyle card can return Rs 2,000-5,000 in annual value through combined rewards and offers.' },
    ],
  },
];

// ── Static params ───────────────────────────────────────────
export function generateStaticParams() {
  return subcategories.map((s) => ({ subcategory: s.slug }));
}

// ── Metadata ────────────────────────────────────────────────
export function generateMetadata({
  params,
}: {
  params: { subcategory: string };
}): Metadata {
  const meta = subcategories.find((s) => s.slug === params.subcategory);
  if (!meta) {
    return { title: 'Credit Cards | IndiaBestProducts' };
  }
  return {
    title: meta.metaTitle,
    description: meta.metaDescription,
    alternates: {
      canonical: `https://indiabestproducts.com/credit-cards/${meta.slug}`,
    },
    openGraph: {
      title: meta.metaTitle,
      description: meta.metaDescription,
      url: `https://indiabestproducts.com/credit-cards/${meta.slug}`,
      type: 'website',
    },
  };
}

// ── Comparison features for table ───────────────────────────
const comparisonFeatures = [
  { key: 'joiningFee', label: 'Joining Fee' },
  { key: 'annualFee', label: 'Annual Fee' },
  { key: 'rewardRate', label: 'Reward Rate' },
  { key: 'loungeAccess', label: 'Lounge Access' },
  { key: 'fuelSurchargeWaiver', label: 'Fuel Surcharge Waiver' },
  { key: 'minimumIncome', label: 'Min. Income Required' },
  { key: 'network', label: 'Card Network' },
  { key: 'welcomeBonus', label: 'Welcome Bonus' },
];

// ── Page component ──────────────────────────────────────────
export default function SubcategoryPage({
  params,
}: {
  params: { subcategory: string };
}) {
  const meta = subcategories.find((s) => s.slug === params.subcategory);

  if (!meta) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Category Not Found</h1>
        <p className="mt-2 text-slate-600">
          The credit card category you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link href="/credit-cards" className="mt-4 inline-block text-blue-600 hover:underline">
          Browse all credit cards &rarr;
        </Link>
      </div>
    );
  }

  const filteredCards = creditCards
    .filter((c) => c.subcategory === meta.slug)
    .sort((a, b) => {
      if (a.featured === b.featured) return b.rating - a.rating;
      return a.featured ? -1 : 1;
    });

  const top5 = filteredCards.slice(0, 5);

  const otherSubcategories = subcategories.filter((s) => s.slug !== meta.slug);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Credit Cards', href: '/credit-cards' },
    { label: `${meta.label} Cards` },
  ];

  const listSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: meta.heading,
    numberOfItems: filteredCards.length,
    itemListElement: filteredCards.map((card, i) => ({
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
        <section className="mb-8 mt-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {meta.heading}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-600">
            {meta.intro}
          </p>
        </section>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-sm font-medium text-slate-500">
            Showing {filteredCards.length} {meta.label.toLowerCase()} credit{' '}
            {filteredCards.length === 1 ? 'card' : 'cards'}
          </p>
        </div>

        {/* Card Grid */}
        {filteredCards.length > 0 ? (
          <section className="mb-14">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCards.map((card) => (
                <Link
                  key={card.id}
                  href={`/credit-cards/review/${card.slug}`}
                  className="block"
                >
                  <ProductCard product={card} />
                </Link>
              ))}
            </div>
          </section>
        ) : (
          <section className="mb-14 rounded-xl border border-slate-200 bg-slate-50 p-10 text-center">
            <p className="text-lg font-semibold text-slate-700">
              No {meta.label.toLowerCase()} credit cards available right now.
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Check back soon or browse our other categories below.
            </p>
          </section>
        )}

        {/* Comparison Table */}
        {top5.length >= 2 && (
          <section className="mb-14">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">
              Top {Math.min(top5.length, 5)} {meta.label} Cards Compared
            </h2>
            <ComparisonTable
              products={top5}
              features={comparisonFeatures}
              highlightIndex={0}
              highlightLabel="Top Pick"
            />
          </section>
        )}

        {/* FAQ */}
        <section className="mb-14">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">
            {meta.label} Credit Card FAQs
          </h2>
          <div className="mx-auto max-w-3xl">
            <FaqAccordion items={meta.faqs} />
          </div>
        </section>

        {/* Related Subcategories */}
        <section className="mb-8">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">
            Explore Other Credit Card Categories
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {otherSubcategories.map((s) => {
              const count = creditCards.filter(
                (c) => c.subcategory === s.slug
              ).length;
              return (
                <Link
                  key={s.slug}
                  href={`/credit-cards/${s.slug}`}
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div>
                    <h3 className="font-bold text-slate-900">{s.label} Cards</h3>
                    <p className="mt-0.5 text-sm text-slate-500">
                      {count} {count === 1 ? 'card' : 'cards'}
                    </p>
                  </div>
                  <span className="text-xl text-slate-400">&rarr;</span>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
