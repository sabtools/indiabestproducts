'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Loan, LoanSubcategory } from '@/lib/types';
import ProductCard from '@/components/product/ProductCard';

const LOAN_CATEGORIES: { label: string; value: LoanSubcategory | 'all' }[] = [
  { label: 'All Loans', value: 'all' },
  { label: 'Personal Loan', value: 'personal' },
  { label: 'Home Loan', value: 'home' },
  { label: 'Car Loan', value: 'car' },
  { label: 'Education Loan', value: 'education' },
  { label: 'Business Loan', value: 'business' },
  { label: 'Gold Loan', value: 'gold' },
];

interface LoansGridProps {
  loans: Loan[];
}

export default function LoansGrid({ loans }: LoansGridProps) {
  const [activeCategory, setActiveCategory] = useState<LoanSubcategory | 'all'>('all');

  const filteredLoans =
    activeCategory === 'all'
      ? loans
      : loans.filter((l) => l.subcategory === activeCategory);

  return (
    <>
      {/* Category Tabs */}
      <section className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="container-main">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
            {LOAN_CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                  activeCategory === cat.value
                    ? 'bg-blue-600 text-white shadow-md'
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
              ? 'All Loans'
              : `Best ${LOAN_CATEGORIES.find((c) => c.value === activeCategory)?.label}s`}{' '}
            ({filteredLoans.length} products)
          </h2>
          {filteredLoans.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
              <p className="text-slate-500 text-lg">No loans found in this category yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredLoans.map((loan) => (
                <Link key={loan.id} href={`/loans/review/${loan.slug}`} className="block">
                  <ProductCard product={loan} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
