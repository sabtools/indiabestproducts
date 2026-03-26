// ============================================================
// Amazon PA-API 5.0 Integration — India (amazon.in)
// ============================================================

import * as crypto from 'crypto';
import { AMAZON_CONFIG } from './config';
import { ProductListing, PlatformPrice, AmazonSearchResult } from './types';
import { getMockAmazonProducts, getMockAmazonProduct } from '../data/mock-products';

// ── PA-API 5.0 Request Signing ──────────────────────────────

const SERVICE = 'ProductAdvertisingAPI';
const API_PATH = '/paapi5/searchitems';
const GETITEMS_PATH = '/paapi5/getitems';

function getAmzDate(): { amzDate: string; dateStamp: string } {
  const now = new Date();
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '');
  const dateStamp = amzDate.slice(0, 8);
  return { amzDate, dateStamp };
}

function hmacSHA256(key: Buffer | string, data: string): Buffer {
  return crypto.createHmac('sha256', key).update(data, 'utf8').digest();
}

function sha256(data: string): string {
  return crypto.createHash('sha256').update(data, 'utf8').digest('hex');
}

function getSignatureKey(key: string, dateStamp: string, region: string, service: string): Buffer {
  const kDate = hmacSHA256(Buffer.from('AWS4' + key, 'utf8'), dateStamp);
  const kRegion = hmacSHA256(kDate, region);
  const kService = hmacSHA256(kRegion, service);
  const kSigning = hmacSHA256(kService, 'aws4_request');
  return kSigning;
}

function signRequest(path: string, payload: string): {
  headers: Record<string, string>;
  url: string;
} {
  const { amzDate, dateStamp } = getAmzDate();
  const { host, region, accessKey, secretKey } = AMAZON_CONFIG;

  const canonicalHeaders = `content-encoding:amz-1.0\ncontent-type:application/json; charset=utf-8\nhost:${host}\nx-amz-date:${amzDate}\nx-amz-target:com.amazon.paapi5.v1.ProductAdvertisingAPIv1.SearchItems\n`;
  const signedHeaders = 'content-encoding;content-type;host;x-amz-date;x-amz-target';

  const canonicalRequest = [
    'POST',
    path,
    '',
    canonicalHeaders,
    signedHeaders,
    sha256(payload),
  ].join('\n');

  const credentialScope = `${dateStamp}/${region}/${SERVICE}/aws4_request`;
  const stringToSign = [
    'AWS4-HMAC-SHA256',
    amzDate,
    credentialScope,
    sha256(canonicalRequest),
  ].join('\n');

  const signingKey = getSignatureKey(secretKey, dateStamp, region, SERVICE);
  const signature = hmacSHA256(signingKey, stringToSign).toString('hex');

  const authHeader = `AWS4-HMAC-SHA256 Credential=${accessKey}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

  return {
    url: `https://${host}${path}`,
    headers: {
      'content-encoding': 'amz-1.0',
      'content-type': 'application/json; charset=utf-8',
      host,
      'x-amz-date': amzDate,
      'x-amz-target': 'com.amazon.paapi5.v1.ProductAdvertisingAPIv1.SearchItems',
      Authorization: authHeader,
    },
  };
}

// ── Category Mapping ────────────────────────────────────────

const AMAZON_CATEGORY_MAP: Record<string, string> = {
  phone: 'Electronics',
  laptop: 'Computers',
  headphone: 'Electronics',
  tablet: 'Computers',
  smartwatch: 'Electronics',
  camera: 'Electronics',
  tv: 'Electronics',
  appliance: 'Appliances',
};

// ── Helper: Convert Amazon result to ProductListing ─────────

function amazonResultToListing(item: AmazonSearchResult, category: string): ProductListing {
  const platformPrice: PlatformPrice = {
    platform: 'amazon',
    price: item.price,
    originalPrice: item.listPrice,
    discount: item.listPrice ? Math.round(((item.listPrice - item.price) / item.listPrice) * 100) : undefined,
    url: item.detailPageUrl,
    inStock: item.availability === 'InStock',
    rating: item.rating,
    reviewCount: item.reviewCount,
    seller: 'Amazon.in',
    deliveryInfo: 'FREE delivery by Amazon',
    lastUpdated: new Date().toISOString().split('T')[0],
  };

  const slug = item.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 80);

  const specsFromFeatures: Record<string, string> = {};
  item.features.forEach((feat, i) => {
    specsFromFeatures[`Feature ${i + 1}`] = feat;
  });

  return {
    name: item.title,
    slug,
    brand: item.brand,
    category: (category as ProductListing['category']) || 'phone',
    image: item.imageUrl,
    description: item.features.slice(0, 3).join('. '),
    specs: specsFromFeatures,
    prices: [platformPrice],
    bestPrice: platformPrice,
    priceDifference: 0,
    amazonAsin: item.asin,
    keywords: [item.title.toLowerCase(), item.brand.toLowerCase(), category],
    metaTitle: `${item.title} — Price in India, Specs & Reviews`,
    metaDescription: `Buy ${item.title} at Rs ${item.price.toLocaleString('en-IN')}. Check specs, reviews, and best price on Amazon India.`,
  };
}

// ── Public API Functions ────────────────────────────────────

/**
 * Search Amazon India for products by keyword and category.
 * Returns mock data when API is not configured.
 */
export async function searchAmazon(
  keyword: string,
  category: string
): Promise<ProductListing[]> {
  if (!AMAZON_CONFIG.enabled) {
    return getMockAmazonProducts(keyword, category);
  }

  const searchCategory = AMAZON_CATEGORY_MAP[category] || 'All';

  const payload = JSON.stringify({
    Keywords: keyword,
    SearchIndex: searchCategory,
    ItemCount: 10,
    PartnerTag: AMAZON_CONFIG.partnerTag,
    PartnerType: 'Associates',
    Marketplace: AMAZON_CONFIG.marketplace,
    Resources: [
      'Images.Primary.Large',
      'ItemInfo.Title',
      'ItemInfo.ByLineInfo',
      'ItemInfo.Features',
      'ItemInfo.ProductInfo',
      'Offers.Listings.Price',
      'Offers.Listings.MerchantInfo',
      'Offers.Listings.DeliveryInfo.IsPrimeEligible',
      'Offers.Listings.Availability.Type',
      'CustomerReviews.StarRating',
      'CustomerReviews.Count',
    ],
  });

  try {
    const { url, headers } = signRequest(API_PATH, payload);
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: payload,
    });

    if (!response.ok) {
      console.error(`Amazon PA-API error: ${response.status} ${response.statusText}`);
      return getMockAmazonProducts(keyword, category);
    }

    const data = await response.json();
    const items: AmazonSearchResult[] = (data.SearchResult?.Items || []).map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (item: any) => ({
        asin: item.ASIN,
        title: item.ItemInfo?.Title?.DisplayValue || '',
        brand: item.ItemInfo?.ByLineInfo?.Brand?.DisplayValue || 'Unknown',
        price: item.Offers?.Listings?.[0]?.Price?.Amount || 0,
        listPrice: item.Offers?.Listings?.[0]?.Price?.Savings?.Amount
          ? (item.Offers?.Listings?.[0]?.Price?.Amount || 0) +
            (item.Offers?.Listings?.[0]?.Price?.Savings?.Amount || 0)
          : undefined,
        imageUrl: item.Images?.Primary?.Large?.URL || '',
        detailPageUrl: item.DetailPageURL || '',
        rating: item.CustomerReviews?.StarRating?.Value,
        reviewCount: item.CustomerReviews?.Count,
        availability: item.Offers?.Listings?.[0]?.Availability?.Type || 'Unknown',
        features: item.ItemInfo?.Features?.DisplayValues || [],
        category,
      })
    );

    return items.map((item) => amazonResultToListing(item, category));
  } catch (error) {
    console.error('Amazon PA-API request failed:', error);
    return getMockAmazonProducts(keyword, category);
  }
}

/**
 * Get a single Amazon product by ASIN.
 * Returns mock data when API is not configured.
 */
export async function getAmazonProduct(asin: string): Promise<ProductListing | null> {
  if (!AMAZON_CONFIG.enabled) {
    return getMockAmazonProduct(asin);
  }

  const payload = JSON.stringify({
    ItemIds: [asin],
    ItemIdType: 'ASIN',
    PartnerTag: AMAZON_CONFIG.partnerTag,
    PartnerType: 'Associates',
    Marketplace: AMAZON_CONFIG.marketplace,
    Resources: [
      'Images.Primary.Large',
      'ItemInfo.Title',
      'ItemInfo.ByLineInfo',
      'ItemInfo.Features',
      'ItemInfo.ProductInfo',
      'ItemInfo.TechnicalInfo',
      'Offers.Listings.Price',
      'Offers.Listings.MerchantInfo',
      'Offers.Listings.DeliveryInfo.IsPrimeEligible',
      'Offers.Listings.Availability.Type',
      'CustomerReviews.StarRating',
      'CustomerReviews.Count',
    ],
  });

  try {
    const { url, headers } = signRequest(GETITEMS_PATH, payload);
    // Update target header for GetItems
    headers['x-amz-target'] = 'com.amazon.paapi5.v1.ProductAdvertisingAPIv1.GetItems';

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: payload,
    });

    if (!response.ok) {
      console.error(`Amazon GetItems error: ${response.status}`);
      return getMockAmazonProduct(asin);
    }

    const data = await response.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const item = data.ItemsResult?.Items?.[0] as any;
    if (!item) return null;

    const result: AmazonSearchResult = {
      asin: item.ASIN,
      title: item.ItemInfo?.Title?.DisplayValue || '',
      brand: item.ItemInfo?.ByLineInfo?.Brand?.DisplayValue || 'Unknown',
      price: item.Offers?.Listings?.[0]?.Price?.Amount || 0,
      listPrice: item.Offers?.Listings?.[0]?.Price?.Savings?.Amount
        ? (item.Offers?.Listings?.[0]?.Price?.Amount || 0) +
          (item.Offers?.Listings?.[0]?.Price?.Savings?.Amount || 0)
        : undefined,
      imageUrl: item.Images?.Primary?.Large?.URL || '',
      detailPageUrl: item.DetailPageURL || '',
      rating: item.CustomerReviews?.StarRating?.Value,
      reviewCount: item.CustomerReviews?.Count,
      availability: item.Offers?.Listings?.[0]?.Availability?.Type || 'Unknown',
      features: item.ItemInfo?.Features?.DisplayValues || [],
      category: 'phone',
    };

    return amazonResultToListing(result, result.category);
  } catch (error) {
    console.error('Amazon GetItems request failed:', error);
    return getMockAmazonProduct(asin);
  }
}

/**
 * Get Amazon India best sellers for a category.
 * Returns mock data when API is not configured.
 */
export async function getAmazonBestSellers(category: string): Promise<ProductListing[]> {
  if (!AMAZON_CONFIG.enabled) {
    return getMockAmazonProducts('best seller', category);
  }

  // PA-API 5.0 uses BrowseNode or keyword-based search for "best sellers"
  return searchAmazon('best seller', category);
}
