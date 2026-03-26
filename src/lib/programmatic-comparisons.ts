import { Product, ProductCategory } from './types';
import { allProducts, getProductsByCategory, generateSlug } from './utils';
import { getCategoryLabel, getShortName } from './comparison';

// ============================================================
// Programmatic Comparison Definitions for SEO
// ============================================================

export interface ComparisonPairDef {
  slug: string;
  product1Slug: string;
  product2Slug: string;
  category: ProductCategory;
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
}

/**
 * Generates a URL-safe comparison slug from two product names
 */
function makeComparisonSlug(p1: Product, p2: Product): string {
  const clean = (name: string) =>
    name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

  const name1 = clean(getShortName(p1));
  const name2 = clean(getShortName(p2));
  return `${name1}-vs-${name2}`;
}

/**
 * Generates an intro paragraph for a comparison page
 */
function generateIntro(p1: Product, p2: Product, catLabel: string): string {
  const year = 2026;
  const intros = [
    `Choosing between ${p1.name} and ${p2.name}? Both are popular options in the ${catLabel.toLowerCase()} space in India, but they differ in pricing, features, and target audience. In this ${year} comparison, we break down every detail side by side — from fees and benefits to user ratings — so you can make an informed decision.`,
    `${p1.name} and ${p2.name} are two of the most searched ${catLabel.toLowerCase()} options in India. While ${p1.name} is rated ${p1.rating}/5, ${p2.name} carries a ${p2.rating}/5 rating on our platform. Let us walk you through a detailed feature-by-feature comparison to help you pick the right one for ${year}.`,
    `If you are deciding between ${p1.name} and ${p2.name}, you are not alone — this is one of the most popular ${catLabel.toLowerCase()} comparisons in India. We have analyzed both products across all key parameters so you can see exactly how they stack up against each other.`,
  ];
  // Use a deterministic "random" based on slug hash
  const hash = (p1.slug + p2.slug).split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  return intros[hash % intros.length];
}

/**
 * Creates a ComparisonPairDef from two products
 */
function createPairDef(p1: Product, p2: Product): ComparisonPairDef {
  const catLabel = getCategoryLabel(p1.category);
  const slug = makeComparisonSlug(p1, p2);
  const short1 = getShortName(p1);
  const short2 = getShortName(p2);

  return {
    slug,
    product1Slug: p1.slug,
    product2Slug: p2.slug,
    category: p1.category,
    title: `${p1.name} vs ${p2.name} — Which is Better?`,
    metaTitle: `${short1} vs ${short2} ${catLabel} Comparison 2026 | IndiaBestProducts`,
    metaDescription: `${p1.name} vs ${p2.name}: detailed side-by-side comparison of fees, features, ratings, pros & cons. Find out which ${catLabel.toLowerCase()} is better for you in 2026.`,
    intro: generateIntro(p1, p2, catLabel),
  };
}

// ============================================================
// Credit Card Comparison Pairs (50 most popular matchups)
// ============================================================

function generateCreditCardPairs(): ComparisonPairDef[] {
  const cards = getProductsByCategory('credit-card');
  // Sort by rating descending then by featured, pick top cards for popular pairs
  const sorted = [...cards].sort((a, b) => b.rating - a.rating);
  const pairs: ComparisonPairDef[] = [];
  const seen = new Set<string>();

  // Generate all pairs from top 15 cards
  const topCards = sorted.slice(0, 15);
  for (let i = 0; i < topCards.length; i++) {
    for (let j = i + 1; j < topCards.length; j++) {
      if (pairs.length >= 50) break;
      const slug = makeComparisonSlug(topCards[i], topCards[j]);
      if (!seen.has(slug)) {
        seen.add(slug);
        pairs.push(createPairDef(topCards[i], topCards[j]));
      }
    }
    if (pairs.length >= 50) break;
  }

  return pairs.slice(0, 50);
}

// ============================================================
// Loan Comparison Pairs
// ============================================================

function generateLoanPairs(): ComparisonPairDef[] {
  const loanProducts = getProductsByCategory('loan');
  const pairs: ComparisonPairDef[] = [];
  const seen = new Set<string>();

  // Group by subcategory for meaningful comparisons
  const subcats = [...new Set(loanProducts.map((p) => p.subcategory))];

  for (const sub of subcats) {
    const subLoans = loanProducts.filter((p) => p.subcategory === sub);
    for (let i = 0; i < subLoans.length; i++) {
      for (let j = i + 1; j < subLoans.length; j++) {
        const slug = makeComparisonSlug(subLoans[i], subLoans[j]);
        if (!seen.has(slug)) {
          seen.add(slug);
          pairs.push(createPairDef(subLoans[i], subLoans[j]));
        }
      }
    }
  }

  return pairs;
}

// ============================================================
// Demat Account Comparison Pairs
// ============================================================

function generateDematPairs(): ComparisonPairDef[] {
  const accounts = getProductsByCategory('demat');
  const pairs: ComparisonPairDef[] = [];
  const seen = new Set<string>();

  for (let i = 0; i < accounts.length; i++) {
    for (let j = i + 1; j < accounts.length; j++) {
      const slug = makeComparisonSlug(accounts[i], accounts[j]);
      if (!seen.has(slug)) {
        seen.add(slug);
        pairs.push(createPairDef(accounts[i], accounts[j]));
      }
    }
  }

  return pairs;
}

// ============================================================
// Insurance Comparison Pairs
// ============================================================

function generateInsurancePairs(): ComparisonPairDef[] {
  const products = getProductsByCategory('insurance');
  const pairs: ComparisonPairDef[] = [];
  const seen = new Set<string>();

  // Group by subcategory
  const subcats = [...new Set(products.map((p) => p.subcategory))];

  for (const sub of subcats) {
    const subProducts = products.filter((p) => p.subcategory === sub);
    for (let i = 0; i < subProducts.length; i++) {
      for (let j = i + 1; j < subProducts.length; j++) {
        const slug = makeComparisonSlug(subProducts[i], subProducts[j]);
        if (!seen.has(slug)) {
          seen.add(slug);
          pairs.push(createPairDef(subProducts[i], subProducts[j]));
        }
      }
    }
  }

  return pairs;
}

// ============================================================
// Hosting Comparison Pairs
// ============================================================

function generateHostingPairs(): ComparisonPairDef[] {
  const plans = getProductsByCategory('hosting');
  const pairs: ComparisonPairDef[] = [];
  const seen = new Set<string>();

  for (let i = 0; i < plans.length; i++) {
    for (let j = i + 1; j < plans.length; j++) {
      const slug = makeComparisonSlug(plans[i], plans[j]);
      if (!seen.has(slug)) {
        seen.add(slug);
        pairs.push(createPairDef(plans[i], plans[j]));
      }
    }
  }

  return pairs;
}

// ============================================================
// Aggregated Comparison Definitions
// ============================================================

let _allComparisons: ComparisonPairDef[] | null = null;

/**
 * Returns all programmatic comparison definitions (cached)
 */
export function getAllComparisons(): ComparisonPairDef[] {
  if (_allComparisons) return _allComparisons;

  _allComparisons = [
    ...generateCreditCardPairs(),
    ...generateLoanPairs(),
    ...generateDematPairs(),
    ...generateInsurancePairs(),
    ...generateHostingPairs(),
  ];

  return _allComparisons;
}

/**
 * Returns a comparison definition by slug
 */
export function getComparisonBySlug(slug: string): ComparisonPairDef | undefined {
  return getAllComparisons().find((c) => c.slug === slug);
}

/**
 * Returns comparisons filtered by category
 */
export function getComparisonsByCategory(category: ProductCategory): ComparisonPairDef[] {
  return getAllComparisons().filter((c) => c.category === category);
}

/**
 * Returns related comparisons (ones that share a product with the given slug)
 */
export function getRelatedComparisons(
  slug: string,
  limit: number = 6
): ComparisonPairDef[] {
  const comparison = getComparisonBySlug(slug);
  if (!comparison) return [];

  return getAllComparisons()
    .filter(
      (c) =>
        c.slug !== slug &&
        c.category === comparison.category &&
        (c.product1Slug === comparison.product1Slug ||
          c.product1Slug === comparison.product2Slug ||
          c.product2Slug === comparison.product1Slug ||
          c.product2Slug === comparison.product2Slug)
    )
    .slice(0, limit);
}

/**
 * Returns top comparisons for the Popular Comparisons section
 */
export function getPopularComparisons(limit: number = 20): ComparisonPairDef[] {
  const all = getAllComparisons();
  // Pick a mix from each category
  const categories: ProductCategory[] = ['credit-card', 'loan', 'demat', 'insurance', 'hosting'];
  const perCategory = Math.ceil(limit / categories.length);
  const result: ComparisonPairDef[] = [];

  for (const cat of categories) {
    const catComps = all.filter((c) => c.category === cat);
    result.push(...catComps.slice(0, perCategory));
  }

  return result.slice(0, limit);
}
