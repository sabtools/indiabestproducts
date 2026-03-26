import { Product, ProductCategory } from '../types';
import { creditCards } from './credit-cards';
import { loans } from './loans';
import { insuranceProducts } from './insurance';
import { dematAccounts } from './demat-accounts';
import { hostingPlans } from './hosting';
import { gadgets } from './gadgets';

// ============================================================
// Central Data Export — All Products Unified
// ============================================================

/** Combined array of every product across all categories */
export const allProducts: Product[] = [
  ...creditCards,
  ...loans,
  ...insuranceProducts,
  ...dematAccounts,
  ...hostingPlans,
  ...gadgets,
];

// ── Re-export individual collections ────────────────────────

export { creditCards } from './credit-cards';
export { loans } from './loans';
export { insuranceProducts } from './insurance';
export { dematAccounts } from './demat-accounts';
export { hostingPlans } from './hosting';
export { gadgets } from './gadgets';

// ============================================================
// Helper Functions
// ============================================================

/**
 * Returns every product across all categories.
 */
export function getAllProducts(): Product[] {
  return allProducts;
}

/**
 * Returns products filtered by category.
 */
export function getProductsByCategory(category: ProductCategory | string): Product[] {
  return allProducts.filter((p) => p.category === category);
}

/**
 * Finds a single product by its URL slug.
 */
export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find((p) => p.slug === slug);
}

/**
 * Finds a single product by its unique ID.
 */
export function getProductById(id: string): Product | undefined {
  return allProducts.find((p) => p.id === id);
}

/**
 * Returns featured products, sorted by rating (highest first).
 * Optionally limits the result count.
 */
export function getFeaturedProducts(limit?: number): Product[] {
  const featured = allProducts
    .filter((p) => p.featured)
    .sort((a, b) => b.rating - a.rating);
  return limit ? featured.slice(0, limit) : featured;
}

/**
 * Returns products sorted by lastUpdated date (newest first).
 * Optionally limits the result count.
 */
export function getLatestProducts(limit?: number): Product[] {
  const sorted = [...allProducts].sort(
    (a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
  );
  return limit ? sorted.slice(0, limit) : sorted;
}

/**
 * Searches across all products by name, brand, and keywords.
 * Returns matches sorted by relevance (name match > brand match > keyword match).
 */
export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return [];

  // Score each product for relevance
  const scored = allProducts
    .map((p) => {
      let score = 0;
      if (p.name.toLowerCase().includes(lowerQuery)) score += 10;
      if (p.brand.toLowerCase().includes(lowerQuery)) score += 5;
      if (p.keywords.some((k) => k.toLowerCase().includes(lowerQuery))) score += 3;
      if (p.category.toLowerCase().includes(lowerQuery)) score += 1;
      if (p.subcategory.toLowerCase().includes(lowerQuery)) score += 2;
      return { product: p, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.map((item) => item.product);
}

/**
 * Returns all unique categories with their product counts.
 */
export function getCategories(): { category: string; count: number }[] {
  const categoryMap = new Map<string, number>();
  for (const p of allProducts) {
    categoryMap.set(p.category, (categoryMap.get(p.category) || 0) + 1);
  }
  return Array.from(categoryMap.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Returns all unique brands with their product counts.
 */
export function getBrands(): { brand: string; count: number }[] {
  const brandMap = new Map<string, number>();
  for (const p of allProducts) {
    brandMap.set(p.brand, (brandMap.get(p.brand) || 0) + 1);
  }
  return Array.from(brandMap.entries())
    .map(([brand, count]) => ({ brand, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Returns the total number of products across all categories.
 */
export function getProductsCount(): number {
  return allProducts.length;
}
