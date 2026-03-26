// ============================================================
// API Configuration — Amazon PA-API 5.0 & Flipkart Affiliate
// ============================================================

export const AMAZON_CONFIG = {
  accessKey: process.env.AMAZON_ACCESS_KEY || '',
  secretKey: process.env.AMAZON_SECRET_KEY || '',
  partnerTag: process.env.AMAZON_PARTNER_TAG || 'indiabestpr02-21',
  host: 'webservices.amazon.in',
  region: 'eu-west-1',
  marketplace: 'www.amazon.in',
  enabled: !!process.env.AMAZON_ACCESS_KEY,
} as const;

export const FLIPKART_CONFIG = {
  affiliateId: process.env.FLIPKART_AFFILIATE_ID || '',
  affiliateToken: process.env.FLIPKART_AFFILIATE_TOKEN || '',
  baseUrl: 'https://affiliate-api.flipkart.net/affiliate/1.0',
  enabled: !!process.env.FLIPKART_AFFILIATE_ID,
} as const;

export const SITE_CONFIG = {
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://indiabestproducts.com',
  gaId: process.env.NEXT_PUBLIC_GA_ID || '',
} as const;
