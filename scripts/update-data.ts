/**
 * Data Validation & Management Script
 * ====================================
 * Run with: npx ts-node scripts/update-data.ts
 *
 * Validates all product data files, checks for:
 * - Missing required fields
 * - Duplicate slugs and IDs
 * - Outdated lastUpdated dates (> 30 days)
 * - Product counts per category
 */

// ── Imports ─────────────────────────────────────────────────

import { creditCards } from '../src/lib/data/credit-cards';
import { loans } from '../src/lib/data/loans';
import { insuranceProducts } from '../src/lib/data/insurance';
import { dematAccounts } from '../src/lib/data/demat-accounts';
import { hostingPlans } from '../src/lib/data/hosting';
import { gadgets } from '../src/lib/data/gadgets';

// ── Types ───────────────────────────────────────────────────

interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  subcategory: string;
  brand: string;
  rating: number;
  pros: string[];
  cons: string[];
  affiliateUrl: string;
  featured: boolean;
  lastUpdated: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

interface ValidationError {
  productId: string;
  productName: string;
  field: string;
  issue: string;
}

// ── Combine all products ────────────────────────────────────

const allProducts: Product[] = [
  ...creditCards,
  ...loans,
  ...insuranceProducts,
  ...dematAccounts,
  ...hostingPlans,
  ...gadgets,
] as Product[];

// ── Validation Functions ────────────────────────────────────

function validateRequiredFields(products: Product[]): ValidationError[] {
  const errors: ValidationError[] = [];
  const requiredFields: (keyof Product)[] = [
    'id',
    'slug',
    'name',
    'category',
    'subcategory',
    'brand',
    'rating',
    'pros',
    'cons',
    'affiliateUrl',
    'lastUpdated',
    'metaTitle',
    'metaDescription',
    'keywords',
  ];

  for (const product of products) {
    for (const field of requiredFields) {
      const value = product[field];
      if (value === undefined || value === null || value === '') {
        errors.push({
          productId: product.id || 'UNKNOWN',
          productName: product.name || 'UNKNOWN',
          field,
          issue: 'Missing or empty',
        });
      }
    }

    // Validate arrays are not empty
    if (product.pros && product.pros.length === 0) {
      errors.push({
        productId: product.id,
        productName: product.name,
        field: 'pros',
        issue: 'Empty array — needs at least 1 pro',
      });
    }
    if (product.cons && product.cons.length === 0) {
      errors.push({
        productId: product.id,
        productName: product.name,
        field: 'cons',
        issue: 'Empty array — needs at least 1 con',
      });
    }
    if (product.keywords && product.keywords.length === 0) {
      errors.push({
        productId: product.id,
        productName: product.name,
        field: 'keywords',
        issue: 'Empty array — needs at least 1 keyword',
      });
    }

    // Validate rating range
    if (product.rating < 1 || product.rating > 5) {
      errors.push({
        productId: product.id,
        productName: product.name,
        field: 'rating',
        issue: `Rating ${product.rating} is outside valid range (1-5)`,
      });
    }

    // Validate lastUpdated is a valid date
    if (product.lastUpdated && isNaN(new Date(product.lastUpdated).getTime())) {
      errors.push({
        productId: product.id,
        productName: product.name,
        field: 'lastUpdated',
        issue: `Invalid date format: "${product.lastUpdated}"`,
      });
    }

    // Validate meta lengths
    if (product.metaTitle && product.metaTitle.length > 70) {
      errors.push({
        productId: product.id,
        productName: product.name,
        field: 'metaTitle',
        issue: `Meta title too long (${product.metaTitle.length} chars, max 70)`,
      });
    }
    if (product.metaDescription && product.metaDescription.length > 160) {
      errors.push({
        productId: product.id,
        productName: product.name,
        field: 'metaDescription',
        issue: `Meta description too long (${product.metaDescription.length} chars, max 160)`,
      });
    }
  }

  return errors;
}

function findDuplicateSlugs(products: Product[]): string[] {
  const slugCounts = new Map<string, number>();
  for (const p of products) {
    slugCounts.set(p.slug, (slugCounts.get(p.slug) || 0) + 1);
  }
  return Array.from(slugCounts.entries())
    .filter(([, count]) => count > 1)
    .map(([slug]) => slug);
}

function findDuplicateIds(products: Product[]): string[] {
  const idCounts = new Map<string, number>();
  for (const p of products) {
    idCounts.set(p.id, (idCounts.get(p.id) || 0) + 1);
  }
  return Array.from(idCounts.entries())
    .filter(([, count]) => count > 1)
    .map(([id]) => id);
}

function findOutdatedProducts(products: Product[], daysThreshold: number = 30): Product[] {
  const now = new Date();
  const threshold = new Date(now.getTime() - daysThreshold * 24 * 60 * 60 * 1000);

  return products.filter((p) => {
    const updated = new Date(p.lastUpdated);
    return updated < threshold;
  });
}

function getProductCountsByCategory(products: Product[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const p of products) {
    counts.set(p.category, (counts.get(p.category) || 0) + 1);
  }
  return counts;
}

function getProductCountsBySubcategory(products: Product[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const p of products) {
    const key = `${p.category} > ${p.subcategory}`;
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  return counts;
}

// ── Run Validation ──────────────────────────────────────────

console.log('');
console.log('='.repeat(60));
console.log('  IndiaBestProducts — Data Validation Report');
console.log('  Generated:', new Date().toLocaleString('en-IN'));
console.log('='.repeat(60));
console.log('');

// 1. Product counts
console.log('--- Product Counts by Category ---');
const categoryCounts = getProductCountsByCategory(allProducts);
for (const [category, count] of categoryCounts) {
  console.log(`  ${category.padEnd(20)} ${count} products`);
}
console.log(`  ${'TOTAL'.padEnd(20)} ${allProducts.length} products`);
console.log('');

console.log('--- Product Counts by Subcategory ---');
const subcategoryCounts = getProductCountsBySubcategory(allProducts);
for (const [subcat, count] of subcategoryCounts) {
  console.log(`  ${subcat.padEnd(35)} ${count} products`);
}
console.log('');

// 2. Duplicate checks
console.log('--- Duplicate Slugs ---');
const dupSlugs = findDuplicateSlugs(allProducts);
if (dupSlugs.length === 0) {
  console.log('  No duplicate slugs found.');
} else {
  console.log(`  WARNING: ${dupSlugs.length} duplicate slug(s) found:`);
  for (const slug of dupSlugs) {
    console.log(`    - "${slug}"`);
  }
}
console.log('');

console.log('--- Duplicate IDs ---');
const dupIds = findDuplicateIds(allProducts);
if (dupIds.length === 0) {
  console.log('  No duplicate IDs found.');
} else {
  console.log(`  WARNING: ${dupIds.length} duplicate ID(s) found:`);
  for (const id of dupIds) {
    console.log(`    - "${id}"`);
  }
}
console.log('');

// 3. Required field validation
console.log('--- Required Field Validation ---');
const validationErrors = validateRequiredFields(allProducts);
if (validationErrors.length === 0) {
  console.log('  All products pass required field checks.');
} else {
  console.log(`  WARNING: ${validationErrors.length} issue(s) found:`);
  for (const err of validationErrors) {
    console.log(`    [${err.productId}] ${err.productName} — ${err.field}: ${err.issue}`);
  }
}
console.log('');

// 4. Outdated products
console.log('--- Outdated Products (> 30 days since last update) ---');
const outdated = findOutdatedProducts(allProducts, 30);
if (outdated.length === 0) {
  console.log('  All products have been updated within the last 30 days.');
} else {
  console.log(`  ${outdated.length} product(s) need updating:`);
  for (const p of outdated) {
    const daysSince = Math.floor(
      (new Date().getTime() - new Date(p.lastUpdated).getTime()) / (1000 * 60 * 60 * 24)
    );
    console.log(
      `    [${p.id}] ${p.name} — last updated ${p.lastUpdated} (${daysSince} days ago)`
    );
  }
}
console.log('');

// 5. Featured products summary
console.log('--- Featured Products ---');
const featured = allProducts.filter((p) => p.featured);
console.log(`  ${featured.length} featured products:`);
for (const p of featured) {
  console.log(`    [${p.category}] ${p.name} (${p.rating}/5)`);
}
console.log('');

// 6. Summary
console.log('='.repeat(60));
const hasIssues = validationErrors.length > 0 || dupSlugs.length > 0 || dupIds.length > 0;
if (hasIssues) {
  console.log('  STATUS: Issues found — please review above warnings');
} else if (outdated.length > 0) {
  console.log('  STATUS: Data is valid but some products need updating');
} else {
  console.log('  STATUS: All data is valid and up to date!');
}
console.log('='.repeat(60));
console.log('');
