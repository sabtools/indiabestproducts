'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Product, ProductCategory } from '@/lib/types';
import { allProducts, getProductsByCategory, formatCurrency } from '@/lib/utils';
import {
  getComparableFields,
  getComparisonData,
  generateVerdict,
  formatFieldValue,
  getCategoryLabel,
  ComparisonData,
} from '@/lib/comparison';
import {
  getPopularComparisons,
  getComparisonsByCategory,
} from '@/lib/programmatic-comparisons';
import StarRating from '@/components/product/StarRating';
import ApplyButton from '@/components/product/ApplyButton';

// ============================================================
// Interactive Comparison Tool Page
// ============================================================

const CATEGORIES: { value: ProductCategory; label: string }[] = [
  { value: 'credit-card', label: 'Credit Cards' },
  { value: 'loan', label: 'Loans' },
  { value: 'insurance', label: 'Insurance' },
  { value: 'demat', label: 'Demat Accounts' },
  { value: 'hosting', label: 'Web Hosting' },
];

export default function ComparePage() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('credit-card');
  const [product1Id, setProduct1Id] = useState<string>('');
  const [product2Id, setProduct2Id] = useState<string>('');
  const [product3Id, setProduct3Id] = useState<string>('');
  const [showProduct3, setShowProduct3] = useState(false);

  const categoryProducts = useMemo(
    () => getProductsByCategory(selectedCategory).sort((a, b) => a.name.localeCompare(b.name)),
    [selectedCategory]
  );

  const product1 = useMemo(
    () => categoryProducts.find((p) => p.id === product1Id),
    [categoryProducts, product1Id]
  );
  const product2 = useMemo(
    () => categoryProducts.find((p) => p.id === product2Id),
    [categoryProducts, product2Id]
  );
  const product3 = useMemo(
    () => (showProduct3 ? categoryProducts.find((p) => p.id === product3Id) : undefined),
    [categoryProducts, product3Id, showProduct3]
  );

  const comparisonData = useMemo(() => {
    if (!product1 || !product2) return null;
    return getComparisonData(product1, product2, product3);
  }, [product1, product2, product3]);

  const verdict = useMemo(() => {
    if (!product1 || !product2) return '';
    const products = product3 ? [product1, product2, product3] : [product1, product2];
    return generateVerdict(products);
  }, [product1, product2, product3]);

  // Reset products when category changes
  const handleCategoryChange = (cat: ProductCategory) => {
    setSelectedCategory(cat);
    setProduct1Id('');
    setProduct2Id('');
    setProduct3Id('');
    setShowProduct3(false);
  };

  const popularComparisons = getPopularComparisons(20);
  const groupedPopular = CATEGORIES.map((cat) => ({
    ...cat,
    comparisons: popularComparisons.filter((c) => c.category === cat.value),
  })).filter((g) => g.comparisons.length > 0);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-slate-500" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
          </li>
          <li>/</li>
          <li className="text-slate-900 font-medium">Compare Products</li>
        </ol>
      </nav>

      {/* H1 */}
      <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl mb-3">
        Compare Products Side by Side
      </h1>
      <p className="text-lg text-slate-600 mb-8 max-w-3xl">
        Select a category and pick two or three products to see a detailed feature-by-feature
        comparison with our expert verdict.
      </p>

      {/* Step 1: Category Selection */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Step 1: Select Category
        </h2>
        <div className="flex flex-wrap gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => handleCategoryChange(cat.value)}
              className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition-all ${
                selectedCategory === cat.value
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Step 2 & 3: Product Selection */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Step 2: Select Products to Compare
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Product 1 */}
          <div>
            <label htmlFor="product1" className="mb-1.5 block text-sm font-medium text-slate-600">
              Product 1
            </label>
            <select
              id="product1"
              value={product1Id}
              onChange={(e) => setProduct1Id(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              <option value="">-- Select Product --</option>
              {categoryProducts
                .filter((p) => p.id !== product2Id && p.id !== product3Id)
                .map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.rating}/5)
                  </option>
                ))}
            </select>
          </div>

          {/* Product 2 */}
          <div>
            <label htmlFor="product2" className="mb-1.5 block text-sm font-medium text-slate-600">
              Product 2
            </label>
            <select
              id="product2"
              value={product2Id}
              onChange={(e) => setProduct2Id(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              <option value="">-- Select Product --</option>
              {categoryProducts
                .filter((p) => p.id !== product1Id && p.id !== product3Id)
                .map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.rating}/5)
                  </option>
                ))}
            </select>
          </div>

          {/* Product 3 (optional) */}
          <div>
            {!showProduct3 ? (
              <div className="flex h-full items-end">
                <button
                  onClick={() => setShowProduct3(true)}
                  className="rounded-lg border-2 border-dashed border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-500 hover:border-blue-400 hover:text-blue-600 transition-colors w-full"
                >
                  + Add Product 3 (Optional)
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="product3"
                    className="block text-sm font-medium text-slate-600"
                  >
                    Product 3 (Optional)
                  </label>
                  <button
                    onClick={() => {
                      setShowProduct3(false);
                      setProduct3Id('');
                    }}
                    className="text-xs text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
                <select
                  id="product3"
                  value={product3Id}
                  onChange={(e) => setProduct3Id(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                >
                  <option value="">-- Select Product --</option>
                  {categoryProducts
                    .filter((p) => p.id !== product1Id && p.id !== product2Id)
                    .map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.rating}/5)
                      </option>
                    ))}
                </select>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Comparison Result */}
      {comparisonData && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Comparison: {comparisonData.products.map((p) => p.name).join(' vs ')}
          </h2>

          {/* Product Headers with Ratings */}
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full min-w-[640px] text-sm">
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
                          ? 'bg-emerald-50 ring-2 ring-inset ring-emerald-400'
                          : ''
                      }`}
                    >
                      {i === comparisonData.overallWinnerIndex && (
                        <span className="mb-1 inline-block rounded-full bg-emerald-600 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                          Our Pick
                        </span>
                      )}
                      <div className="flex flex-col items-center gap-1">
                        <span className="font-bold text-slate-900 text-base">{p.name}</span>
                        <span className="text-xs text-slate-500">{p.brand}</span>
                        <StarRating rating={p.rating} size="sm" showValue />
                      </div>
                    </th>
                  ))}
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
                        } ${
                          colIdx === comparisonData.overallWinnerIndex &&
                          row.winnerIndex !== colIdx
                            ? 'bg-emerald-50/30'
                            : ''
                        }`}
                      >
                        {row.field.type === 'boolean' ? (
                          val === 'Yes' ? (
                            <span className="text-emerald-600 text-base font-bold">&#10004;</span>
                          ) : (
                            <span className="text-red-400 text-base">&#10008;</span>
                          )
                        ) : (
                          val
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-slate-200 bg-slate-50">
                  <td className="border-r border-slate-200 px-4 py-4" />
                  {comparisonData.products.map((p, i) => (
                    <td key={p.id} className="px-4 py-4 text-center">
                      <ApplyButton
                        href={p.affiliateUrl}
                        variant={i === comparisonData.overallWinnerIndex ? 'primary' : 'secondary'}
                      />
                    </td>
                  ))}
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Pros & Cons Side by Side */}
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {comparisonData.products.map((p) => (
              <div
                key={p.id}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <h3 className="text-lg font-bold text-slate-900 mb-3">{p.name}</h3>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-emerald-700 mb-2">Pros</h4>
                  <ul className="space-y-1.5">
                    {p.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="text-emerald-500 mt-0.5 flex-shrink-0">&#10004;</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-red-600 mb-2">Cons</h4>
                  <ul className="space-y-1.5">
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

          {/* Verdict */}
          {verdict && (
            <div className="mt-8 rounded-xl border-2 border-blue-200 bg-blue-50 p-6">
              <h3 className="text-xl font-bold text-blue-900 mb-3">
                Our Recommendation
              </h3>
              <p className="text-base text-blue-800 leading-relaxed">{verdict}</p>
            </div>
          )}
        </div>
      )}

      {/* No Products Selected Hint */}
      {(!product1 || !product2) && (
        <div className="mb-12 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-10 text-center">
          <div className="text-4xl mb-3">&#8644;</div>
          <h3 className="text-lg font-bold text-slate-700 mb-2">
            Select two products above to start comparing
          </h3>
          <p className="text-slate-500 text-sm max-w-md mx-auto">
            Choose a category, then pick at least two products from the dropdowns. The comparison
            table will appear automatically.
          </p>
        </div>
      )}

      {/* Popular Comparisons Section */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Popular Comparisons
        </h2>
        <div className="space-y-8">
          {groupedPopular.map((group) => (
            <div key={group.value}>
              <h3 className="text-lg font-semibold text-slate-800 mb-3 border-b border-slate-200 pb-2">
                {group.label}
              </h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.comparisons.map((comp) => (
                  <Link
                    key={comp.slug}
                    href={`/compare/${comp.slug}`}
                    className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:border-blue-300 hover:shadow-md"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-sm font-bold flex-shrink-0">
                      VS
                    </span>
                    <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700 line-clamp-2">
                      {comp.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
