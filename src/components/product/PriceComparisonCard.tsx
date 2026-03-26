'use client';

import { useState } from 'react';
import Link from 'next/link';
import StarRating from './StarRating';
import DealBadge from './DealBadge';

interface PriceComparisonCardProps {
  name: string;
  slug: string;
  brand: string;
  image?: string;
  amazonPrice?: number;
  amazonOriginalPrice?: number;
  amazonUrl?: string;
  amazonRating?: number;
  amazonReviewCount?: number;
  amazonInStock?: boolean;
  flipkartPrice?: number;
  flipkartOriginalPrice?: number;
  flipkartUrl?: string;
  flipkartRating?: number;
  flipkartReviewCount?: number;
  flipkartInStock?: boolean;
  category?: string;
}

function formatPrice(price: number): string {
  return '₹' + price.toLocaleString('en-IN');
}

function calcDiscount(original: number | undefined, current: number | undefined): number {
  if (!original || !current || original <= current) return 0;
  return Math.round(((original - current) / original) * 100);
}

export default function PriceComparisonCard({
  name,
  slug,
  brand,
  image,
  amazonPrice,
  amazonOriginalPrice,
  amazonUrl,
  amazonRating,
  amazonReviewCount,
  amazonInStock = true,
  flipkartPrice,
  flipkartOriginalPrice,
  flipkartUrl,
  flipkartRating,
  flipkartReviewCount,
  flipkartInStock = true,
  category,
}: PriceComparisonCardProps) {
  const initial = name.charAt(0).toUpperCase();

  // Determine best price
  const bestPlatform =
    amazonPrice && flipkartPrice
      ? amazonPrice < flipkartPrice
        ? 'amazon'
        : flipkartPrice < amazonPrice
        ? 'flipkart'
        : 'tie'
      : amazonPrice
      ? 'amazon'
      : flipkartPrice
      ? 'flipkart'
      : null;

  const savings =
    amazonPrice && flipkartPrice ? Math.abs(amazonPrice - flipkartPrice) : 0;

  const amazonDiscount = calcDiscount(amazonOriginalPrice, amazonPrice);
  const flipkartDiscount = calcDiscount(flipkartOriginalPrice, flipkartPrice);
  const maxDiscount = Math.max(amazonDiscount, flipkartDiscount);

  return (
    <div className="price-card group relative flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden">
      {/* Top gradient strip */}
      <div className="h-1 w-full bg-gradient-to-r from-[#ff9900] via-[#8b5cf6] to-[#2874f0]" />

      {/* Deal badge */}
      {maxDiscount > 0 && (
        <div className="absolute top-3 right-3 z-10">
          <DealBadge discount={maxDiscount} />
        </div>
      )}

      {/* Product Header */}
      <div className="flex items-start gap-4 p-5 pb-3">
        {image ? (
          <img
            src={image}
            alt={name}
            className="h-16 w-16 shrink-0 rounded-xl border border-slate-100 object-contain bg-slate-50 p-1"
            loading="lazy"
          />
        ) : (
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-2xl font-bold text-white shadow-inner">
            {initial}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <Link href={`/prices/${slug}`} className="hover:underline">
            <h3 className="text-lg font-bold leading-tight text-slate-900 line-clamp-2">
              {name}
            </h3>
          </Link>
          <p className="mt-0.5 text-sm text-slate-500">{brand}</p>
          {category && (
            <span className="mt-1 inline-block rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
              {category}
            </span>
          )}
        </div>
      </div>

      {/* Price Comparison Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 px-5 pb-3">
        {/* Amazon Box */}
        <div
          className={`relative rounded-xl border-2 p-4 transition-colors ${
            bestPlatform === 'amazon'
              ? 'border-[#ff9900] bg-orange-50/50'
              : 'border-slate-200 bg-slate-50/50'
          }`}
        >
          {bestPlatform === 'amazon' && (
            <span className="best-price-badge absolute -top-2.5 left-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide shadow-sm">
              Best Price
            </span>
          )}
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-sm font-bold text-[#ff9900]">Amazon</span>
          </div>
          {amazonPrice ? (
            <>
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="price-current text-xl">
                  {formatPrice(amazonPrice)}
                </span>
                {amazonOriginalPrice && amazonOriginalPrice > amazonPrice && (
                  <span className="price-original text-sm">
                    {formatPrice(amazonOriginalPrice)}
                  </span>
                )}
              </div>
              {amazonDiscount > 0 && (
                <span className="inline-block mt-1 rounded bg-green-100 px-1.5 py-0.5 text-xs font-semibold text-green-700">
                  {amazonDiscount}% off
                </span>
              )}
              {amazonRating !== undefined && (
                <div className="mt-2 flex items-center gap-1.5">
                  <StarRating rating={amazonRating} size="sm" />
                  {amazonReviewCount !== undefined && (
                    <span className="text-xs text-slate-400">
                      ({amazonReviewCount.toLocaleString('en-IN')})
                    </span>
                  )}
                </div>
              )}
              <div className="mt-1.5 text-xs text-slate-500">
                {amazonInStock ? (
                  <span className="text-green-600 font-medium">In Stock</span>
                ) : (
                  <span className="text-red-500 font-medium">Out of Stock</span>
                )}
                <span className="ml-2">Free Delivery</span>
              </div>
              <a
                href={amazonUrl || '#'}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#ff9900] px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#e88b00] hover:shadow-md active:scale-[0.98]"
              >
                Buy on Amazon
                <span aria-hidden="true">&rarr;</span>
              </a>
            </>
          ) : (
            <p className="text-sm text-slate-400 mt-2">Not available</p>
          )}
        </div>

        {/* Flipkart Box */}
        <div
          className={`relative rounded-xl border-2 p-4 transition-colors ${
            bestPlatform === 'flipkart'
              ? 'border-[#2874f0] bg-blue-50/50'
              : 'border-slate-200 bg-slate-50/50'
          }`}
        >
          {bestPlatform === 'flipkart' && (
            <span className="best-price-badge absolute -top-2.5 left-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide shadow-sm">
              Best Price
            </span>
          )}
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-sm font-bold text-[#2874f0]">Flipkart</span>
          </div>
          {flipkartPrice ? (
            <>
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="price-current text-xl">
                  {formatPrice(flipkartPrice)}
                </span>
                {flipkartOriginalPrice && flipkartOriginalPrice > flipkartPrice && (
                  <span className="price-original text-sm">
                    {formatPrice(flipkartOriginalPrice)}
                  </span>
                )}
              </div>
              {flipkartDiscount > 0 && (
                <span className="inline-block mt-1 rounded bg-green-100 px-1.5 py-0.5 text-xs font-semibold text-green-700">
                  {flipkartDiscount}% off
                </span>
              )}
              {flipkartRating !== undefined && (
                <div className="mt-2 flex items-center gap-1.5">
                  <StarRating rating={flipkartRating} size="sm" />
                  {flipkartReviewCount !== undefined && (
                    <span className="text-xs text-slate-400">
                      ({flipkartReviewCount.toLocaleString('en-IN')})
                    </span>
                  )}
                </div>
              )}
              <div className="mt-1.5 text-xs text-slate-500">
                {flipkartInStock ? (
                  <span className="text-green-600 font-medium">In Stock</span>
                ) : (
                  <span className="text-red-500 font-medium">Out of Stock</span>
                )}
              </div>
              <a
                href={flipkartUrl || '#'}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#2874f0] px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#1a5dc8] hover:shadow-md active:scale-[0.98]"
              >
                Buy on Flipkart
                <span aria-hidden="true">&rarr;</span>
              </a>
            </>
          ) : (
            <p className="text-sm text-slate-400 mt-2">Not available</p>
          )}
        </div>
      </div>

      {/* Savings Banner */}
      {savings > 0 && bestPlatform && bestPlatform !== 'tie' && (
        <div className="savings-banner mx-5 mb-3 rounded-lg px-4 py-2.5 text-center">
          <span className="text-sm font-semibold text-green-700">
            Save {formatPrice(savings)} by buying on{' '}
            {bestPlatform === 'amazon' ? 'Amazon' : 'Flipkart'}!
          </span>
        </div>
      )}

      {/* Footer: Compare Link */}
      <div className="mt-auto border-t border-slate-100 px-5 py-3 flex items-center justify-between">
        <Link
          href={`/prices/${slug}`}
          className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
        >
          View Details &rarr;
        </Link>
        <Link
          href={`/prices/${slug}`}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
        >
          Compare
        </Link>
      </div>
    </div>
  );
}
