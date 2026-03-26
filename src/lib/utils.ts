import { Product } from './types';
import { creditCards } from './data/credit-cards';
import { loans } from './data/loans';
import { insuranceProducts } from './data/insurance';
import { dematAccounts } from './data/demat-accounts';
import { hostingPlans } from './data/hosting';
import { gadgets } from './data/gadgets';

// ============================================================
// All Products — Combined from every data source
// ============================================================

export const allProducts: Product[] = [
  ...creditCards,
  ...loans,
  ...insuranceProducts,
  ...dematAccounts,
  ...hostingPlans,
  ...gadgets,
];

// ============================================================
// Formatting Utilities
// ============================================================

/**
 * Formats a number to Indian Rupee format (e.g., 1,50,000 -> Rs 1,50,000)
 */
export function formatCurrency(amount: number): string {
  if (amount === 0) return 'Free';
  const formatted = amount.toLocaleString('en-IN');
  return `\u20B9${formatted}`;
}

/**
 * Formats rating as a string with one decimal (e.g., 4.5 -> "4.5/5")
 */
export function formatRating(rating: number): string {
  return `${rating.toFixed(1)}/5`;
}

/**
 * Generates a URL-friendly slug from a name
 */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Truncates text to a maximum length, adding ellipsis if needed
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '...';
}

// ============================================================
// Product Query Utilities
// ============================================================

/**
 * Returns all products in a given category
 */
export function getProductsByCategory(category: string): Product[] {
  return allProducts.filter((p) => p.category === category);
}

/**
 * Returns all products matching a subcategory within a category
 */
export function getProductsBySubcategory(category: string, subcategory: string): Product[] {
  return allProducts.filter((p) => p.category === category && p.subcategory === subcategory);
}

/**
 * Returns a single product by its slug, or undefined if not found
 */
export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find((p) => p.slug === slug);
}

/**
 * Returns a single product by its id, or undefined if not found
 */
export function getProductById(id: string): Product | undefined {
  return allProducts.find((p) => p.id === id);
}

/**
 * Returns all featured products, optionally filtered by category
 */
export function getFeaturedProducts(category?: string): Product[] {
  if (category) {
    return allProducts.filter((p) => p.featured && p.category === category);
  }
  return allProducts.filter((p) => p.featured);
}

/**
 * Returns related products based on the same category and brand,
 * excluding the current product. Falls back to same-category products.
 */
export function getRelatedProducts(productId: string, limit: number = 4): Product[] {
  const product = getProductById(productId);
  if (!product) return [];

  // First try: same category + same brand (excluding current)
  const sameBrandAndCategory = allProducts.filter(
    (p) => p.id !== productId && p.category === product.category && p.brand === product.brand
  );

  if (sameBrandAndCategory.length >= limit) {
    return sameBrandAndCategory.slice(0, limit);
  }

  // Fill remaining with same-category products from other brands
  const sameCategory = allProducts.filter(
    (p) =>
      p.id !== productId &&
      p.category === product.category &&
      !sameBrandAndCategory.some((r) => r.id === p.id)
  );

  return [...sameBrandAndCategory, ...sameCategory].slice(0, limit);
}

/**
 * Returns products matching a search query against name, brand, and keywords
 */
export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return [];

  return allProducts.filter((p) => {
    const nameMatch = p.name.toLowerCase().includes(lowerQuery);
    const brandMatch = p.brand.toLowerCase().includes(lowerQuery);
    const keywordMatch = p.keywords.some((k) => k.toLowerCase().includes(lowerQuery));
    const categoryMatch = p.category.toLowerCase().includes(lowerQuery);
    return nameMatch || brandMatch || keywordMatch || categoryMatch;
  });
}

/**
 * Returns all unique brands within a category
 */
export function getBrandsByCategory(category: string): string[] {
  const brands = allProducts
    .filter((p) => p.category === category)
    .map((p) => p.brand);
  return [...new Set(brands)].sort();
}

/**
 * Returns all unique subcategories within a category
 */
export function getSubcategoriesByCategory(category: string): string[] {
  const subcategories = allProducts
    .filter((p) => p.category === category)
    .map((p) => p.subcategory);
  return [...new Set(subcategories)].sort();
}

/**
 * Sorts products by a given field
 */
export function sortProducts(
  products: Product[],
  sortBy: 'rating' | 'name' | 'featured',
  order: 'asc' | 'desc' = 'desc'
): Product[] {
  const sorted = [...products].sort((a, b) => {
    if (sortBy === 'rating') return order === 'desc' ? b.rating - a.rating : a.rating - b.rating;
    if (sortBy === 'name') return order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    if (sortBy === 'featured') {
      if (a.featured === b.featured) return b.rating - a.rating;
      return a.featured ? -1 : 1;
    }
    return 0;
  });
  return sorted;
}

// ============================================================
// SEO Utilities
// ============================================================

/**
 * Generates JSON-LD structured data for a product review
 */
export function generateProductSchema(product: Product): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    image: product.image,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating.toString(),
      bestRating: '5',
      worstRating: '1',
      ratingCount: '100',
    },
    review: {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: product.rating.toString(),
        bestRating: '5',
      },
      author: {
        '@type': 'Organization',
        name: 'IndiaBestProducts',
      },
    },
  };
}

/**
 * Generates FAQ structured data from an array of FAQ items
 */
export function generateFAQSchema(faqs: { question: string; answer: string }[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generates BreadcrumbList structured data
 */
export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
