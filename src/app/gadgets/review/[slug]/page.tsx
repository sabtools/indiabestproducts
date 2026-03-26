import type { Metadata } from 'next';
import Link from 'next/link';
import { gadgets } from '@/lib/data/gadgets';
import type { Gadget, FAQ } from '@/lib/types';
import { formatCurrency, getRelatedProducts } from '@/lib/utils';
import Breadcrumb from '@/components/layout/Breadcrumb';
import StarRating from '@/components/product/StarRating';
import ApplyButton from '@/components/product/ApplyButton';
import ProsCons from '@/components/product/ProsCons';
import FaqAccordion from '@/components/content/FaqAccordion';
import RelatedProducts from '@/components/content/RelatedProducts';
import ProductSchema from '@/components/seo/ProductSchema';

// ── Subcategory label map ───────────────────────────────────
const subcategoryLabels: Record<string, string> = {
  laptop: 'Laptop',
  smartphone: 'Smartphone',
  tablet: 'Tablet',
  smartwatch: 'Smartwatch',
  earbuds: 'Earbuds',
  powerbank: 'Power Bank',
};

// ── Static params ───────────────────────────────────────────
export function generateStaticParams() {
  return gadgets.map((g) => ({ slug: g.slug }));
}

// ── Metadata ────────────────────────────────────────────────
export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const gadget = gadgets.find((g) => g.slug === params.slug);
  if (!gadget) {
    return { title: 'Gadget Not Found | IndiaBestProducts' };
  }
  return {
    title: `${gadget.name} Review 2026 - Price, Specs & Buy | IndiaBestProducts`,
    description: gadget.metaDescription,
    keywords: gadget.keywords,
    alternates: {
      canonical: `https://indiabestproducts.com/gadgets/review/${gadget.slug}`,
    },
    openGraph: {
      title: `${gadget.name} Review 2026 - Price, Specs & Buy in India`,
      description: gadget.metaDescription,
      url: `https://indiabestproducts.com/gadgets/review/${gadget.slug}`,
      type: 'article',
      images: gadget.image ? [{ url: gadget.image }] : [],
    },
  };
}

// ── Generate FAQs per gadget ────────────────────────────────
function generateFaqs(gadget: Gadget): FAQ[] {
  const isLaptop = gadget.subcategory === 'laptop';
  return [
    {
      question: `What is the price of ${gadget.name} in India?`,
      answer: `The ${gadget.name} is priced at ${formatCurrency(gadget.price)} in India. The MRP is ${formatCurrency(gadget.mrp)}, giving you a discount of ${gadget.discount}. Prices may vary slightly between Amazon and Flipkart.`,
    },
    {
      question: `Is ${gadget.name} worth buying in 2026?`,
      answer: `Yes, the ${gadget.name} is worth buying if you need ${gadget.bestFor.toLowerCase()}. It has a rating of ${gadget.rating}/5 on our review. Key strengths include ${gadget.pros[0].toLowerCase()} and ${gadget.pros[1].toLowerCase()}.`,
    },
    {
      question: `What are the key specifications of ${gadget.name}?`,
      answer: `The ${gadget.name} features ${gadget.specifications['Processor']} processor, ${gadget.specifications['RAM']} RAM, ${gadget.specifications['Storage']} storage, and ${gadget.specifications['Display']} display. It runs ${gadget.specifications['OS']}.`,
    },
    {
      question: isLaptop
        ? `What is the battery life of ${gadget.name}?`
        : `What camera does ${gadget.name} have?`,
      answer: isLaptop
        ? `The ${gadget.name} offers ${gadget.specifications['Battery']} of battery life, which is ${gadget.rating >= 4.5 ? 'excellent' : 'good'} for its category.`
        : `The ${gadget.name} has a ${gadget.specifications['Camera'] || 'multi-lens camera setup'}. ${gadget.pros.find((p) => p.toLowerCase().includes('camera')) || 'It captures detailed photos in most lighting conditions.'}`,
    },
    {
      question: `Where can I buy ${gadget.name} online in India?`,
      answer: `You can buy the ${gadget.name} from Amazon India and Flipkart. We recommend comparing prices on both platforms as they may vary by Rs 500-2000. During sales like Amazon Great Indian Festival or Flipkart Big Billion Days, you can get additional discounts.`,
    },
  ];
}

// ── Page component ──────────────────────────────────────────
export default function GadgetReviewPage({
  params,
}: {
  params: { slug: string };
}) {
  const gadget = gadgets.find((g) => g.slug === params.slug);

  if (!gadget) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Gadget Not Found</h1>
        <p className="mt-2 text-slate-600">
          The gadget you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link href="/gadgets" className="mt-4 inline-block text-blue-600 hover:underline">
          Browse all gadgets &rarr;
        </Link>
      </div>
    );
  }

  const subcatLabel = subcategoryLabels[gadget.subcategory] || gadget.subcategory;
  const isLaptop = gadget.subcategory === 'laptop';
  const categoryHref = isLaptop ? '/gadgets/laptops' : '/gadgets/phones';
  const faqs = generateFaqs(gadget);
  const related = getRelatedProducts(gadget.id, 4);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Gadgets', href: '/gadgets' },
    { label: isLaptop ? 'Laptops' : 'Phones', href: categoryHref },
    { label: gadget.name },
  ];

  const specEntries = Object.entries(gadget.specifications);

  return (
    <>
      {/* JSON-LD */}
      <ProductSchema
        name={gadget.name}
        brand={gadget.brand}
        description={gadget.metaDescription}
        image={gadget.image}
        rating={gadget.rating}
        reviewCount={200}
        price={gadget.price.toString()}
        url={`https://indiabestproducts.com/gadgets/review/${gadget.slug}`}
        reviewBody={`${gadget.name} review: ${gadget.bestFor}. ${gadget.pros[0]}.`}
      />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Hero Section */}
        <section className="mb-10 mt-6 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-sm sm:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            {/* Left: Gadget info */}
            <div className="flex-1">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                  {subcatLabel}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  {gadget.brand}
                </span>
                {gadget.featured && (
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                    Editor&apos;s Choice
                  </span>
                )}
                {gadget.discount && (
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                    {gadget.discount}
                  </span>
                )}
              </div>

              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                {gadget.name}
              </h1>
              <p className="mt-1 text-base text-slate-500">{gadget.brand}</p>

              <div className="mt-3 flex items-center gap-3">
                <StarRating rating={gadget.rating} size="lg" showValue />
                <span className="text-sm text-slate-500">({gadget.rating.toFixed(1)}/5 rating)</span>
              </div>

              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-slate-900">
                  {formatCurrency(gadget.price)}
                </span>
                {gadget.mrp > gadget.price && (
                  <span className="text-lg text-slate-400 line-through">
                    {formatCurrency(gadget.mrp)}
                  </span>
                )}
              </div>

              <p className="mt-3 max-w-xl text-base text-slate-600">
                Best for: <strong className="text-slate-800">{gadget.bestFor}</strong>
              </p>

              {/* Buy Buttons */}
              <div className="mt-6 flex flex-wrap gap-3">
                {gadget.buyLinks.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className={`inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-bold shadow-md transition-transform hover:scale-105 ${
                      link.platform === 'Amazon'
                        ? 'bg-amber-500 text-white hover:bg-amber-600'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    Buy on {link.platform} &mdash; {formatCurrency(link.price)}
                  </a>
                ))}
              </div>
            </div>

            {/* Right: Gadget image placeholder */}
            <div className="flex shrink-0 items-center justify-center">
              <div className="flex h-48 w-48 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-5xl font-bold text-white shadow-lg sm:h-56 sm:w-56">
                {gadget.name
                  .split(' ')
                  .slice(0, 2)
                  .map((w) => w[0])
                  .join('')}
              </div>
            </div>
          </div>
        </section>

        {/* Quick Info Cards */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-bold text-slate-900">Quick Overview</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                label: 'Price',
                value: formatCurrency(gadget.price),
                highlight: true,
              },
              {
                label: 'Processor',
                value: gadget.specifications['Processor']?.split('(')[0]?.trim() || 'N/A',
                highlight: false,
              },
              {
                label: isLaptop ? 'RAM / Storage' : 'Camera',
                value: isLaptop
                  ? `${gadget.specifications['RAM']} / ${gadget.specifications['Storage']}`
                  : gadget.specifications['Camera']?.split(',')[0] || 'N/A',
                highlight: false,
              },
              {
                label: 'Rating',
                value: `${gadget.rating.toFixed(1)}/5`,
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

        {/* Full Specifications Table */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-bold text-slate-900">
            {gadget.name} Full Specifications
          </h2>
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-sm">
              <tbody>
                {specEntries.map(([key, value], i) => (
                  <tr
                    key={key}
                    className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
                  >
                    <td className="px-5 py-3 font-semibold text-slate-700 sm:w-1/3">
                      {key}
                    </td>
                    <td className="px-5 py-3 text-slate-600">{value}</td>
                  </tr>
                ))}
                <tr className={specEntries.length % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  <td className="px-5 py-3 font-semibold text-slate-700">Colors</td>
                  <td className="px-5 py-3 text-slate-600">{gadget.colors.join(', ')}</td>
                </tr>
                <tr className={(specEntries.length + 1) % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  <td className="px-5 py-3 font-semibold text-slate-700">Warranty</td>
                  <td className="px-5 py-3 text-slate-600">{gadget.warranty}</td>
                </tr>
                <tr className={(specEntries.length + 2) % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  <td className="px-5 py-3 font-semibold text-slate-700">In the Box</td>
                  <td className="px-5 py-3 text-slate-600">{gadget.inTheBox.join(', ')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Key Features */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-bold text-slate-900">Key Features</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {gadget.keyFeatures.map((feature, i) => (
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

        {/* Pros & Cons */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-bold text-slate-900">Pros &amp; Cons</h2>
          <ProsCons pros={gadget.pros} cons={gadget.cons} />
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
              const score = gadget.ratingBreakdown[item.key];
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

        {/* Who Should Buy */}
        <section className="mb-10 rounded-xl bg-blue-50 p-6 sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-slate-900">
            Who Should Buy the {gadget.name}?
          </h2>
          <p className="mb-4 text-sm text-slate-600">
            This {subcatLabel.toLowerCase()} is best suited for{' '}
            <strong>{gadget.bestFor.toLowerCase()}</strong>. Ideal buyer profiles:
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {isLaptop ? (
              <>
                {gadget.price < 40000 && (
                  <div className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="mt-0.5 text-emerald-500">&#10003;</span>
                    <span>Students looking for an affordable everyday laptop</span>
                  </div>
                )}
                {gadget.specifications['GPU'] && (
                  <div className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="mt-0.5 text-emerald-500">&#10003;</span>
                    <span>Gamers who want smooth performance in AAA titles</span>
                  </div>
                )}
                {gadget.price >= 60000 && !gadget.specifications['GPU'] && (
                  <div className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="mt-0.5 text-emerald-500">&#10003;</span>
                    <span>Professionals who need premium build and performance</span>
                  </div>
                )}
                <div className="flex items-start gap-2 text-sm text-slate-700">
                  <span className="mt-0.5 text-emerald-500">&#10003;</span>
                  <span>Users who need reliable performance for daily tasks and multitasking</span>
                </div>
              </>
            ) : (
              <>
                {gadget.price < 40000 && (
                  <div className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="mt-0.5 text-emerald-500">&#10003;</span>
                    <span>Budget-conscious buyers who want flagship features</span>
                  </div>
                )}
                {gadget.price >= 60000 && (
                  <div className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="mt-0.5 text-emerald-500">&#10003;</span>
                    <span>Premium users who want the best camera and display</span>
                  </div>
                )}
                <div className="flex items-start gap-2 text-sm text-slate-700">
                  <span className="mt-0.5 text-emerald-500">&#10003;</span>
                  <span>Photography enthusiasts who prioritize camera quality</span>
                </div>
              </>
            )}
            <div className="flex items-start gap-2 text-sm text-slate-700">
              <span className="mt-0.5 text-emerald-500">&#10003;</span>
              <span>{gadget.brand} fans who trust the brand ecosystem</span>
            </div>
            <div className="flex items-start gap-2 text-sm text-slate-700">
              <span className="mt-0.5 text-emerald-500">&#10003;</span>
              <span>
                Buyers with a budget around {formatCurrency(gadget.price)}
              </span>
            </div>
          </div>
        </section>

        {/* Where to Buy */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-bold text-slate-900">
            Where to Buy {gadget.name} Online
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {gadget.buyLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div>
                  <h3 className="font-bold text-slate-900">Buy on {link.platform}</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Price: {formatCurrency(link.price)} &mdash; Free delivery available
                  </p>
                </div>
                <span className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-bold text-white shadow">
                  Buy Now
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-bold text-slate-900">
            {gadget.name} FAQs
          </h2>
          <FaqAccordion items={faqs} />
        </section>

        {/* Related Gadgets */}
        {related.length > 0 && (
          <section className="mb-10">
            <RelatedProducts
              products={related}
              title={`Similar ${isLaptop ? 'Laptops' : 'Smartphones'}`}
              viewAllHref={categoryHref}
            />
          </section>
        )}
      </div>

      {/* Sticky Buy Bar */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 shadow-lg backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="hidden sm:block">
            <p className="text-sm font-bold text-slate-900">{gadget.name}</p>
            <p className="text-xs text-slate-500">
              {formatCurrency(gadget.price)}
              {gadget.mrp > gadget.price && (
                <span className="ml-2 text-emerald-600">{gadget.discount}</span>
              )}
              {' | '}
              Rating: {gadget.rating.toFixed(1)}/5
            </p>
          </div>
          <div className="flex gap-2">
            {gadget.buyLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className={`rounded-lg px-5 py-2.5 text-sm font-bold shadow transition-transform hover:scale-105 ${
                  link.platform === 'Amazon'
                    ? 'bg-amber-500 text-white'
                    : 'bg-blue-600 text-white'
                }`}
              >
                {link.platform}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
