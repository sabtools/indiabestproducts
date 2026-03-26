// ============================================================
// Flipkart Affiliate API Integration
// ============================================================

import { FLIPKART_CONFIG } from './config';
import { ProductListing, PlatformPrice, FlipkartSearchResult } from './types';
import {
  getMockFlipkartProducts,
  getMockFlipkartProduct,
  getMockFlipkartDeals,
} from '../data/mock-products';

// ── Category Mapping ────────────────────────────────────────

const FLIPKART_CATEGORY_MAP: Record<string, string> = {
  phone: 'mobiles',
  laptop: 'laptops',
  headphone: 'headphones',
  tablet: 'tablets',
  smartwatch: 'smart_watches',
  camera: 'cameras',
  tv: 'televisions',
  appliance: 'home_appliances',
};

// ── Helper: Convert Flipkart result to ProductListing ───────

function flipkartResultToListing(
  item: FlipkartSearchResult,
  category: string
): ProductListing {
  const platformPrice: PlatformPrice = {
    platform: 'flipkart',
    price: item.sellingPrice,
    originalPrice: item.mrp,
    discount: item.mrp
      ? Math.round(((item.mrp - item.sellingPrice) / item.mrp) * 100)
      : undefined,
    url: item.productUrl,
    inStock: item.inStock,
    rating: item.rating,
    reviewCount: item.reviewCount,
    seller: 'Flipkart',
    deliveryInfo: 'FREE delivery by Flipkart',
    lastUpdated: new Date().toISOString().split('T')[0],
  };

  const slug = item.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 80);

  const specsFromHighlights: Record<string, string> = {};
  item.highlights.forEach((hl, i) => {
    specsFromHighlights[`Highlight ${i + 1}`] = hl;
  });

  return {
    name: item.title,
    slug,
    brand: item.brand,
    category: (category as ProductListing['category']) || 'phone',
    image: item.imageUrl,
    description: item.highlights.slice(0, 3).join('. '),
    specs: specsFromHighlights,
    prices: [platformPrice],
    bestPrice: platformPrice,
    priceDifference: 0,
    flipkartPid: item.productId,
    keywords: [item.title.toLowerCase(), item.brand.toLowerCase(), category],
    metaTitle: `${item.title} — Price in India, Specs & Reviews`,
    metaDescription: `Buy ${item.title} at Rs ${item.sellingPrice.toLocaleString('en-IN')}. Check specs, reviews, and best price on Flipkart.`,
  };
}

// ── Public API Functions ────────────────────────────────────

/**
 * Search Flipkart for products by keyword and category.
 * Returns mock data when API is not configured.
 */
export async function searchFlipkart(
  keyword: string,
  category: string
): Promise<ProductListing[]> {
  if (!FLIPKART_CONFIG.enabled) {
    return getMockFlipkartProducts(keyword, category);
  }

  const fkCategory = FLIPKART_CATEGORY_MAP[category] || 'search';
  const url = `${FLIPKART_CONFIG.baseUrl}/search/json?query=${encodeURIComponent(keyword)}&resultCount=10`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Fk-Affiliate-Id': FLIPKART_CONFIG.affiliateId,
        'Fk-Affiliate-Token': FLIPKART_CONFIG.affiliateToken,
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`Flipkart API error: ${response.status} ${response.statusText}`);
      return getMockFlipkartProducts(keyword, category);
    }

    const data = await response.json();

    // Flipkart API returns products grouped by category
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const products: FlipkartSearchResult[] = [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const listings = data.productInfoList || data.products || [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    for (const entry of listings as any[]) {
      const info = entry.productBaseInfo?.productAttributes || entry;
      products.push({
        productId: info.productId || entry.productId || '',
        title: info.title || '',
        brand: info.productBrand || 'Unknown',
        sellingPrice: info.sellingPrice?.amount || info.flipkartSellingPrice?.amount || 0,
        mrp: info.maximumRetailPrice?.amount || info.mrp?.amount,
        imageUrl: info.imageUrls?.['400x400'] || info.imageUrl || '',
        productUrl: info.productUrl || entry.productUrl || '',
        rating: info.overallRating,
        reviewCount: info.numberOfReviews,
        inStock: info.inStock !== false,
        highlights: info.productDescription ? [info.productDescription] : [],
        category: fkCategory,
      });
    }

    return products.map((p) => flipkartResultToListing(p, category));
  } catch (error) {
    console.error('Flipkart API request failed:', error);
    return getMockFlipkartProducts(keyword, category);
  }
}

/**
 * Get a single Flipkart product by product ID.
 * Returns mock data when API is not configured.
 */
export async function getFlipkartProduct(
  pid: string
): Promise<ProductListing | null> {
  if (!FLIPKART_CONFIG.enabled) {
    return getMockFlipkartProduct(pid);
  }

  const url = `${FLIPKART_CONFIG.baseUrl}/product/json?productId=${encodeURIComponent(pid)}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Fk-Affiliate-Id': FLIPKART_CONFIG.affiliateId,
        'Fk-Affiliate-Token': FLIPKART_CONFIG.affiliateToken,
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`Flipkart product API error: ${response.status}`);
      return getMockFlipkartProduct(pid);
    }

    const data = await response.json();
    const info = data.productBaseInfo?.productAttributes || data;

    const result: FlipkartSearchResult = {
      productId: pid,
      title: info.title || '',
      brand: info.productBrand || 'Unknown',
      sellingPrice: info.sellingPrice?.amount || 0,
      mrp: info.maximumRetailPrice?.amount,
      imageUrl: info.imageUrls?.['400x400'] || '',
      productUrl: info.productUrl || '',
      rating: info.overallRating,
      reviewCount: info.numberOfReviews,
      inStock: info.inStock !== false,
      highlights: info.productDescription ? [info.productDescription] : [],
      category: 'phone',
    };

    return flipkartResultToListing(result, result.category);
  } catch (error) {
    console.error('Flipkart product request failed:', error);
    return getMockFlipkartProduct(pid);
  }
}

/**
 * Get Flipkart deals of the day.
 * Returns mock data when API is not configured.
 */
export async function getFlipkartDeals(): Promise<ProductListing[]> {
  if (!FLIPKART_CONFIG.enabled) {
    return getMockFlipkartDeals();
  }

  const url = `${FLIPKART_CONFIG.baseUrl}/deals/json`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Fk-Affiliate-Id': FLIPKART_CONFIG.affiliateId,
        'Fk-Affiliate-Token': FLIPKART_CONFIG.affiliateToken,
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`Flipkart deals API error: ${response.status}`);
      return getMockFlipkartDeals();
    }

    const data = await response.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dealProducts = (data.dotdList || data.deals || []) as any[];

    const results: FlipkartSearchResult[] = dealProducts.map((deal) => ({
      productId: deal.productId || '',
      title: deal.title || '',
      brand: deal.productBrand || 'Unknown',
      sellingPrice: deal.sellingPrice?.amount || 0,
      mrp: deal.maximumRetailPrice?.amount,
      imageUrl: deal.imageUrls?.['400x400'] || deal.imageUrl || '',
      productUrl: deal.productUrl || '',
      rating: deal.overallRating,
      reviewCount: deal.numberOfReviews,
      inStock: true,
      highlights: deal.description ? [deal.description] : [],
      category: 'phone',
    }));

    return results.map((p) => flipkartResultToListing(p, 'phone'));
  } catch (error) {
    console.error('Flipkart deals request failed:', error);
    return getMockFlipkartDeals();
  }
}
