'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Insurance, InsuranceSubcategory } from '@/lib/types';
import ProductCard from '@/components/product/ProductCard';

const INSURANCE_CATEGORIES: { label: string; value: InsuranceSubcategory | 'all' }[] = [
  { label: 'All Plans', value: 'all' },
  { label: 'Health Insurance', value: 'health' },
  { label: 'Term Life Insurance', value: 'term-life' },
];

interface InsuranceGridProps {
  products: Insurance[];
}

export default function InsuranceGrid({ products }: InsuranceGridProps) {
  const [activeCategory, setActiveCategory] = useState<InsuranceSubcategory | 'all'>('all');

  const filtered =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.subcategory === activeCategory);

  return (
    <>
      {/* Category Tabs */}
      <section className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="container-main">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
            {INSURANCE_CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                  activeCategory === cat.value
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="section-padding">
        <div className="container-main">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            {activeCategory === 'all'
              ? 'All Insurance Plans'
              : `Best ${INSURANCE_CATEGORIES.find((c) => c.value === activeCategory)?.label} Plans`}{' '}
            ({filtered.length} products)
          </h2>
          {filtered.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
              <p className="text-slate-500 text-lg">No insurance plans found in this category yet.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((product) => (
                <Link key={product.id} href={`/insurance/review/${product.slug}`} className="block">
                  <ProductCard product={product} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
