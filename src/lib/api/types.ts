// ============================================================
// API Response Types — Price Comparison & Product Listings
// ============================================================

/** Price data from a single e-commerce platform */
export interface PlatformPrice {
  platform: 'amazon' | 'flipkart';
  price: number;
  originalPrice?: number;
  discount?: number;
  url: string;
  inStock: boolean;
  rating?: number;
  reviewCount?: number;
  seller?: string;
  deliveryInfo?: string;
  lastUpdated: string;
}

/** Gadget category for API product listings */
export type ApiProductCategory =
  | 'laptop'
  | 'phone'
  | 'headphone'
  | 'tablet'
  | 'smartwatch'
  | 'camera'
  | 'tv'
  | 'appliance';

/** Combined product listing with prices from all platforms */
export interface ProductListing {
  name: string;
  slug: string;
  brand: string;
  category: ApiProductCategory;
  image: string;
  description: string;
  specs: Record<string, string>;
  prices: PlatformPrice[];
  bestPrice: PlatformPrice;
  priceDifference: number;
  amazonAsin?: string;
  flipkartPid?: string;
  keywords: string[];
  metaTitle: string;
  metaDescription: string;
}

/** Historical price data point */
export interface PriceHistory {
  date: string;
  amazonPrice: number | null;
  flipkartPrice: number | null;
}

/** User price alert subscription */
export interface PriceAlert {
  productSlug: string;
  targetPrice: number;
  email: string;
}

/** Result of Amazon PA-API search */
export interface AmazonSearchResult {
  asin: string;
  title: string;
  brand: string;
  price: number;
  listPrice?: number;
  imageUrl: string;
  detailPageUrl: string;
  rating?: number;
  reviewCount?: number;
  availability: string;
  features: string[];
  category: string;
}

/** Result of Flipkart Affiliate API search */
export interface FlipkartSearchResult {
  productId: string;
  title: string;
  brand: string;
  sellingPrice: number;
  mrp?: number;
  imageUrl: string;
  productUrl: string;
  rating?: number;
  reviewCount?: number;
  inStock: boolean;
  highlights: string[];
  category: string;
}
