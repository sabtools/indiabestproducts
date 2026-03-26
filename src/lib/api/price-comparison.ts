// ============================================================
// Price Comparison Engine — Amazon vs Flipkart
// ============================================================

import { ProductListing, PlatformPrice } from './types';
import { searchAmazon, getAmazonProduct } from './amazon';
import { searchFlipkart, getFlipkartProduct } from './flipkart';
import { AMAZON_CONFIG, FLIPKART_CONFIG } from './config';
import {
  getMockProductBySlug,
  getMockProductsByCategory,
  searchMockProducts,
  ALL_MOCK_PRODUCTS,
} from '../data/mock-products';

// ── Types ───────────────────────────────────────────────────

export interface SavingsResult {
  savings: number;
  bestPlatform: string;
  percentage: number;
}

export type PriceBadge =
  | 'Cheapest on Amazon'
  | 'Cheapest on Flipkart'
  | 'Same Price';

// ── Core: Merge prices from both platforms ──────────────────

function mergePrices(
  amazonListing: ProductListing | null,
  flipkartListing: ProductListing | null
): ProductListing | null {
  if (!amazonListing && !flipkartListing) return null;

  const base = amazonListing || flipkartListing!;
  const allPrices: PlatformPrice[] = [];

  if (amazonListing) {
    const amzPrice = amazonListing.prices.find((p) => p.platform === 'amazon');
    if (amzPrice) allPrices.push(amzPrice);
  }

  if (flipkartListing) {
    const fkPrice = flipkartListing.prices.find((p) => p.platform === 'flipkart');
    if (fkPrice) allPrices.push(fkPrice);
  }

  if (allPrices.length === 0) return base;

  const bestPrice = allPrices.reduce((best, current) =>
    current.price < best.price ? current : best
  );

  const priceDifference =
    allPrices.length === 2 ? Math.abs(allPrices[0].price - allPrices[1].price) : 0;

  return {
    ...base,
    prices: allPrices,
    bestPrice,
    priceDifference,
    amazonAsin: amazonListing?.amazonAsin || base.amazonAsin,
    flipkartPid: flipkartListing?.flipkartPid || base.flipkartPid,
  };
}

// ── Fuzzy Product Matching ──────────────────────────────────

function normalizeForMatching(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function matchScore(a: string, b: string): number {
  const normA = normalizeForMatching(a);
  const normB = normalizeForMatching(b);

  if (normA === normB) return 1;

  const wordsA = normA.split(' ');
  const wordsB = normB.split(' ');
  const commonWords = wordsA.filter((w) => wordsB.includes(w));

  return commonWords.length / Math.max(wordsA.length, wordsB.length);
}

function findBestMatch(
  target: ProductListing,
  candidates: ProductListing[]
): ProductListing | null {
  let bestMatch: ProductListing | null = null;
  let bestScore = 0;

  for (const candidate of candidates) {
    const score = matchScore(target.name, candidate.name);
    if (score > bestScore && score > 0.5) {
      bestScore = score;
      bestMatch = candidate;
    }
  }

  return bestMatch;
}

// ============================================================
// Public API Functions
// ============================================================

/**
 * Search both platforms for a product, match results, and return
 * combined listing with prices from both Amazon and Flipkart.
 */
export async function comparePrice(productName: string): Promise<ProductListing | null> {
  // If APIs are not configured, use mock data
  if (!AMAZON_CONFIG.enabled && !FLIPKART_CONFIG.enabled) {
    const mockResults = searchMockProducts(productName);
    return mockResults.length > 0 ? mockResults[0] : null;
  }

  // Search both platforms in parallel
  const [amazonResults, flipkartResults] = await Promise.all([
    searchAmazon(productName, '').catch(() => [] as ProductListing[]),
    searchFlipkart(productName, '').catch(() => [] as ProductListing[]),
  ]);

  if (amazonResults.length === 0 && flipkartResults.length === 0) {
    return null;
  }

  // Take the best Amazon result
  const amazonTop = amazonResults[0] || null;

  // Find matching Flipkart product
  let flipkartMatch: ProductListing | null = null;
  if (amazonTop && flipkartResults.length > 0) {
    flipkartMatch = findBestMatch(amazonTop, flipkartResults);
  }

  // If no Amazon result, take Flipkart top
  if (!amazonTop && flipkartResults.length > 0) {
    const flipkartTop = flipkartResults[0];
    const amazonMatch = amazonResults.length > 0
      ? findBestMatch(flipkartTop, amazonResults)
      : null;
    return mergePrices(amazonMatch, flipkartTop);
  }

  return mergePrices(amazonTop, flipkartMatch || (flipkartResults[0] ?? null));
}

/**
 * Get a product from our data (by slug) with live prices from both platforms.
 * For static export, this uses mock data at build time.
 */
export function getProductWithPrices(slug: string): ProductListing | null {
  // In static export mode, always use mock data
  const mockProduct = getMockProductBySlug(slug);
  return mockProduct;
}

/**
 * Get all products in a category with prices from both platforms.
 */
export function getProductsWithPrices(category: string): ProductListing[] {
  return getMockProductsByCategory(category);
}

/**
 * Get all products sorted by best price.
 */
export function getAllProductsWithPrices(): ProductListing[] {
  return [...ALL_MOCK_PRODUCTS];
}

/**
 * Calculate savings between platforms.
 */
export function calculateSavings(prices: PlatformPrice[]): SavingsResult {
  if (prices.length < 2) {
    return { savings: 0, bestPlatform: prices[0]?.platform || 'amazon', percentage: 0 };
  }

  const sorted = [...prices].sort((a, b) => a.price - b.price);
  const cheapest = sorted[0];
  const expensive = sorted[sorted.length - 1];

  const savings = expensive.price - cheapest.price;
  const percentage = expensive.price > 0
    ? Math.round((savings / expensive.price) * 100)
    : 0;

  return {
    savings,
    bestPlatform: cheapest.platform,
    percentage,
  };
}

/**
 * Get a badge indicating which platform is cheapest.
 */
export function getPriceComparisonBadge(prices: PlatformPrice[]): PriceBadge {
  if (prices.length < 2) {
    const platform = prices[0]?.platform;
    return platform === 'amazon' ? 'Cheapest on Amazon' : 'Cheapest on Flipkart';
  }

  const amazonPrice = prices.find((p) => p.platform === 'amazon');
  const flipkartPrice = prices.find((p) => p.platform === 'flipkart');

  if (!amazonPrice) return 'Cheapest on Flipkart';
  if (!flipkartPrice) return 'Cheapest on Amazon';

  if (amazonPrice.price < flipkartPrice.price) return 'Cheapest on Amazon';
  if (flipkartPrice.price < amazonPrice.price) return 'Cheapest on Flipkart';
  return 'Same Price';
}

/**
 * Sort products by best (lowest) price.
 */
export function sortByBestPrice(products: ProductListing[]): ProductListing[] {
  return [...products].sort((a, b) => a.bestPrice.price - b.bestPrice.price);
}

/**
 * Sort products by biggest savings between platforms.
 */
export function sortByBiggestSavings(products: ProductListing[]): ProductListing[] {
  return [...products].sort((a, b) => b.priceDifference - a.priceDifference);
}

/**
 * Filter products where a specific platform is cheaper.
 */
export function filterCheapestOn(
  products: ProductListing[],
  platform: 'amazon' | 'flipkart'
): ProductListing[] {
  return products.filter((p) => {
    const badge = getPriceComparisonBadge(p.prices);
    if (platform === 'amazon') return badge === 'Cheapest on Amazon';
    return badge === 'Cheapest on Flipkart';
  });
}

/**
 * Format price in Indian Rupees.
 */
export function formatPrice(price: number): string {
  return `Rs ${price.toLocaleString('en-IN')}`;
}

/**
 * Get price comparison summary for SEO / display.
 */
export function getPriceComparisonSummary(product: ProductListing): string {
  const amazonPrice = product.prices.find((p) => p.platform === 'amazon');
  const flipkartPrice = product.prices.find((p) => p.platform === 'flipkart');

  if (amazonPrice && flipkartPrice) {
    const badge = getPriceComparisonBadge(product.prices);
    const savings = calculateSavings(product.prices);
    if (savings.savings > 0) {
      return `${product.name}: ${badge}. Save ${formatPrice(savings.savings)} (${savings.percentage}% less). Amazon: ${formatPrice(amazonPrice.price)} | Flipkart: ${formatPrice(flipkartPrice.price)}`;
    }
    return `${product.name}: Same price on both platforms at ${formatPrice(amazonPrice.price)}`;
  }

  const price = amazonPrice || flipkartPrice;
  if (price) {
    return `${product.name}: Available on ${price.platform === 'amazon' ? 'Amazon' : 'Flipkart'} at ${formatPrice(price.price)}`;
  }

  return `${product.name}: Price currently unavailable`;
}
