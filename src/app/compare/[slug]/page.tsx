import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getAllComparisons,
  getComparisonBySlug,
  getRelatedComparisons,
} from '@/lib/programmatic-comparisons';
import { getProductBySlug } from '@/lib/utils';
import {
  getComparisonData,
  generateVerdict,
  generateComparisonFAQs,
  getCategoryLabel,
} from '@/lib/comparison';
import { generateProductSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/utils';
import StarRating from '@/components/product/StarRating';
import ApplyButton from '@/components/product/ApplyButton';

// ============================================================
// Static Params — generates all comparison pages at build time
// ============================================================

export function generateStaticParams() {
  return getAllComparisons().map((c) => ({
    slug: c.slug,
  }));
}

// ============================================================
// Metadata
// ============================================================

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const compDef = getComparisonBySlug(slug);
  if (!compDef) return { title: 'Comparison Not Found' };

  return {
    title: compDef.metaTitle,
    description: compDef.metaDescription,
    alternates: {
      canonical: `https://indiabestproducts.com/compare/${slug}`,
    },
    openGraph: {
      title: compDef.metaTitle,
      description: compDef.metaDescription,
      url: `https://indiabestproducts.com/compare/${slug}`,
      type: 'article',
    },
  };
}

// ============================================================
// Page Component
// ============================================================

export default async function ComparisonSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const compDef = getComparisonBySlug(slug);
  if (!compDef) return notFound();

  const product1 = getProductBySlug(compDef.product1Slug);
  const product2 = getProductBySlug(compDef.product2Slug);
  if (!product1 || !product2) return notFound();

  const comparisonData = getComparisonData(product1, product2);
  const verdict = generateVerdict([product1, product2]);
  const faqs = generateComparisonFAQs(product1, product2);
  const relatedComparisons = getRelatedComparisons(slug, 6);
  const catLabel = getCategoryLabel(product1.category);

  // Determine overall winner
  const winner = product1.rating >= product2.rating ? product1 : product2;

  // Schema.org structured data
  const productSchemas = [generateProductSchema(product1), generateProductSchema(product2)];
  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://indiabestproducts.com' },
    { name: 'Compare', url: 'https://indiabestproducts.com/compare' },
    { name: compDef.title, url: `https://indiabestproducts.com/compare/${slug}` },
  ]);

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchemas[0]) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchemas[1]) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-slate-500" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/compare" className="hover:text-blue-600">
                Compare
              </Link>
            </li>
            <li>/</li>
            <li className="text-slate-900 font-medium line-clamp-1">
              {product1.name} vs {product2.name}
            </li>
          </ol>
        </nav>

        {/* H1 */}
        <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl lg:text-4xl mb-4">
          {product1.name} vs {product2.name} &mdash; Detailed Comparison 2026
        </h1>

        {/* Intro */}
        <p className="text-base text-slate-600 leading-relaxed mb-8 max-w-4xl">
          {compDef.intro}
        </p>

        {/* Quick Summary Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-8">
          {[product1, product2].map((p) => (
            <div
              key={p.id}
              className={`rounded-xl border-2 p-5 ${
                p.id === winner.id
                  ? 'border-emerald-400 bg-emerald-50'
                  : 'border-slate-200 bg-white'
              }`}
            >
              {p.id === winner.id && (
                <span className="inline-block rounded-full bg-emerald-600 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white mb-2">
                  Our Pick
                </span>
              )}
              <h2 className="text-lg font-bold text-slate-900">{p.name}</h2>
              <p className="text-sm text-slate-500 mb-2">{p.brand}</p>
              <StarRating rating={p.rating} size="md" showValue />
              <p className="mt-2 text-sm text-slate-600">
                {(p as unknown as Record<string, unknown>)['bestFor'] as string || ''}
              </p>
              <div className="mt-3">
                <ApplyButton
                  href={p.affiliateUrl}
                  variant={p.id === winner.id ? 'primary' : 'secondary'}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Feature-by-Feature Comparison Table */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Feature-by-Feature Comparison
          </h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full min-w-[540px] text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="w-48 border-b border-r border-slate-200 px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Feature
                  </th>
                  {comparisonData.products.map((p, i) => (
                    <th
                      key={p.id}
                      className={`border-b border-slate-200 px-4 py-4 text-center ${
                        i === comparisonData.overallWinnerIndex
                          ? 'bg-emerald-50'
                          : ''
                      }`}
                    >
                      <span className="font-bold text-slate-900">{p.name}</span>
                    </th>
                  ))}
                  <th className="w-24 border-b border-l border-slate-200 px-3 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500">
                    Winner
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.rows.map((row, idx) => (
                  <tr
                    key={row.field.key}
                    className={idx % 2 === 1 ? 'bg-slate-50/60' : 'bg-white'}
                  >
                    <td className="border-r border-slate-200 px-4 py-3 font-medium text-slate-600">
                      {row.field.label}
                    </td>
                    {row.formattedValues.map((val, colIdx) => (
                      <td
                        key={colIdx}
                        className={`px-4 py-3 text-center text-slate-800 ${
                          row.winnerIndex === colIdx
                            ? 'bg-emerald-50 font-semibold text-emerald-700'
                            : ''
                        }`}
                      >
                        {row.field.type === 'boolean' ? (
                          val === 'Yes' ? (
                            <span className="text-emerald-600 font-bold">&#10004;</span>
                          ) : (
                            <span className="text-red-400">&#10008;</span>
                          )
                        ) : (
                          val
                        )}
                      </td>
                    ))}
                    <td className="border-l border-slate-200 px-3 py-3 text-center">
                      {row.winnerIndex >= 0 ? (
                        <span className="inline-block rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                          {comparisonData.products[row.winnerIndex].brand}
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400">Tie</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-slate-200 bg-slate-50">
                  <td className="border-r border-slate-200 px-4 py-4 font-semibold text-slate-700">
                    Overall Rating
                  </td>
                  {comparisonData.products.map((p, i) => (
                    <td
                      key={p.id}
                      className={`px-4 py-4 text-center ${
                        i === comparisonData.overallWinnerIndex ? 'bg-emerald-50' : ''
                      }`}
                    >
                      <StarRating rating={p.rating} size="sm" showValue />
                    </td>
                  ))}
                  <td className="border-l border-slate-200 px-3 py-4 text-center">
                    <span className="inline-block rounded-full bg-emerald-600 px-2.5 py-0.5 text-xs font-bold text-white">
                      {winner.brand}
                    </span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>

        {/* Pros & Cons Side by Side */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Pros & Cons</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[product1, product2].map((p) => (
              <div
                key={p.id}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <h3 className="text-lg font-bold text-slate-900 mb-4">{p.name}</h3>
                <div className="mb-5">
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-emerald-700 mb-2">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-xs">
                      +
                    </span>
                    Advantages
                  </h4>
                  <ul className="space-y-2">
                    {p.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="text-emerald-500 mt-0.5 flex-shrink-0">&#10004;</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-red-600 mb-2">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-100 text-red-600 text-xs">
                      &minus;
                    </span>
                    Disadvantages
                  </h4>
                  <ul className="space-y-2">
                    {p.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="text-red-400 mt-0.5 flex-shrink-0">&#10008;</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Verdict */}
        <section className="mb-10">
          <div className="rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
            <h2 className="text-xl font-bold text-blue-900 mb-3">
              Our Verdict: {product1.name} vs {product2.name}
            </h2>
            <p className="text-base text-blue-800 leading-relaxed">{verdict}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <ApplyButton href={product1.affiliateUrl} text={`Apply for ${product1.name}`} variant={product1.id === winner.id ? 'primary' : 'secondary'} />
              <ApplyButton href={product2.affiliateUrl} text={`Apply for ${product2.name}`} variant={product2.id === winner.id ? 'primary' : 'secondary'} />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group rounded-xl border border-slate-200 bg-white shadow-sm"
                open={i === 0}
              >
                <summary className="flex cursor-pointer items-center justify-between px-5 py-4 font-semibold text-slate-800 hover:text-blue-700">
                  <span>{faq.question}</span>
                  <span className="ml-4 flex-shrink-0 text-slate-400 transition-transform group-open:rotate-180">
                    &#9662;
                  </span>
                </summary>
                <div className="border-t border-slate-100 px-5 py-4 text-sm text-slate-600 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Internal Links to Review Pages */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Read Full Reviews
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[product1, product2].map((p) => (
              <Link
                key={p.id}
                href={`/${p.category === 'credit-card' ? 'credit-cards' : p.category === 'demat' ? 'demat-accounts' : p.category}/${p.slug}`}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-300 hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-sm font-bold flex-shrink-0">
                  &#9733;
                </div>
                <div>
                  <p className="font-semibold text-slate-800">{p.name}</p>
                  <p className="text-xs text-slate-500">
                    Full review with detailed analysis &rarr;
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Related Comparisons */}
        {relatedComparisons.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Related Comparisons
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {relatedComparisons.map((comp) => (
                <Link
                  key={comp.slug}
                  href={`/compare/${comp.slug}`}
                  className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:border-blue-300 hover:shadow-md"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xs font-bold flex-shrink-0">
                    VS
                  </span>
                  <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700 line-clamp-2">
                    {comp.title}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back to Compare Tool */}
        <div className="text-center">
          <Link
            href="/compare"
            className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-200 transition"
          >
            &larr; Back to Compare Tool
          </Link>
        </div>
      </main>
    </>
  );
}
