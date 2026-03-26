// ============================================================
// Type Definitions for IndiaBestProducts.in
// ============================================================

// ---------- Enums & Shared Types ----------

export type ProductCategory =
  | 'credit-card'
  | 'loan'
  | 'insurance'
  | 'demat'
  | 'hosting'
  | 'gadget';

export type CreditCardSubcategory =
  | 'cashback'
  | 'rewards'
  | 'travel'
  | 'fuel'
  | 'student'
  | 'business'
  | 'premium'
  | 'lifestyle'
  | 'secured'
  | 'lifetime-free';

export type LoanSubcategory = 'personal' | 'home' | 'car' | 'education' | 'business' | 'gold';

export type InsuranceSubcategory = 'health' | 'term-life' | 'motor' | 'travel' | 'home';

export type DematSubcategory = 'discount-broker' | 'full-service' | 'bank-based';

export type HostingSubcategory = 'shared' | 'vps' | 'cloud' | 'wordpress' | 'dedicated';

export type GadgetSubcategory =
  | 'smartphone'
  | 'laptop'
  | 'tablet'
  | 'smartwatch'
  | 'earbuds'
  | 'powerbank';

export interface RatingBreakdown {
  features: number;
  value: number;
  support: number;
  benefits: number;
}

// ---------- Base Product ----------

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  subcategory: string;
  brand: string;
  brandSlug: string;
  image: string;
  rating: number;
  ratingBreakdown: RatingBreakdown;
  pros: string[];
  cons: string[];
  affiliateUrl: string;
  featured: boolean;
  lastUpdated: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

// ---------- Credit Card ----------

export interface CreditCard extends Product {
  category: 'credit-card';
  subcategory: CreditCardSubcategory;
  joiningFee: number;
  annualFee: number;
  annualFeeWaiver: string;
  interestRateAPR: string;
  minimumIncome: number;
  rewardRate: string;
  rewardPointValue: string;
  welcomeBonus: string;
  loungeAccess: string;
  fuelSurchargeWaiver: string;
  foreignTransactionFee: string;
  contactlessPayment: boolean;
  addOnCard: boolean;
  network: 'Visa' | 'Mastercard' | 'RuPay' | 'Amex' | 'Diners Club';
  cardType: 'credit';
  keyFeatures: string[];
  bestFor: string;
  eligibilityCriteria: string[];
}

// ---------- Loan ----------

export interface Loan extends Product {
  category: 'loan';
  subcategory: LoanSubcategory;
  interestRateMin: number;
  interestRateMax: number;
  interestRateType: 'fixed' | 'floating' | 'both';
  processingFee: string;
  minAmount: number;
  maxAmount: number;
  minTenure: number;
  maxTenure: number;
  tenureUnit: 'months' | 'years';
  prepaymentCharges: string;
  foreclosureCharges: string;
  eligibilityCriteria: string[];
  documentsRequired: string[];
  disbursalTime: string;
  keyFeatures: string[];
  bestFor: string;
  emiPerLakh: string;
}

// ---------- Insurance ----------

export interface Insurance extends Product {
  category: 'insurance';
  subcategory: InsuranceSubcategory;
  premiumStartsFrom: string;
  coverageMin: number;
  coverageMax: number;
  coverageUnit: string;
  claimSettlementRatio: string;
  networkHospitals: number;
  waitingPeriod: string;
  preExistingWaiting: string;
  renewalAge: string;
  entryAgeMin: number;
  entryAgeMax: number;
  keyFeatures: string[];
  inclusions: string[];
  exclusions: string[];
  bestFor: string;
  planOptions: string[];
}

// ---------- Demat Account ----------

export interface DematAccount extends Product {
  category: 'demat';
  subcategory: DematSubcategory;
  accountOpeningCharge: number;
  annualMaintenanceCharge: number;
  equityDeliveryBrokerage: string;
  equityIntradayBrokerage: string;
  futuresBrokerage: string;
  optionsBrokerage: string;
  mutualFundCommission: string;
  tradingPlatforms: string[];
  mobilePlatforms: string[];
  researchReports: boolean;
  marginTrading: boolean;
  ipoAccess: boolean;
  mutualFunds: boolean;
  nfoAccess: boolean;
  keyFeatures: string[];
  bestFor: string;
  accountTypes: string[];
}

// ---------- Hosting Plan ----------

export interface HostingPlan extends Product {
  category: 'hosting';
  subcategory: HostingSubcategory;
  monthlyPriceMin: number;
  monthlyPriceMax: number;
  currency: string;
  websites: string;
  storage: string;
  bandwidth: string;
  freeDomain: boolean;
  freeSSL: boolean;
  uptime: string;
  supportType: string[];
  backupFrequency: string;
  serverLocation: string[];
  cpanel: boolean;
  wordpressOptimized: boolean;
  keyFeatures: string[];
  bestFor: string;
  plans: HostingTier[];
}

export interface HostingTier {
  name: string;
  monthlyPrice: number;
  websites: string;
  storage: string;
  bandwidth: string;
  ram: string;
  cpu: string;
}

// ---------- Gadget ----------

export interface Gadget extends Product {
  category: 'gadget';
  subcategory: GadgetSubcategory;
  price: number;
  mrp: number;
  discount: string;
  specifications: Record<string, string>;
  colors: string[];
  warranty: string;
  inTheBox: string[];
  keyFeatures: string[];
  bestFor: string;
  buyLinks: { platform: string; url: string; price: number }[];
}

// ---------- Roundup / Comparison Pages ----------

export interface RoundupPage {
  id: string;
  slug: string;
  title: string;
  category: ProductCategory;
  description: string;
  productIds: string[];
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  lastUpdated: string;
  author: string;
  featuredImage: string;
  faqs: FAQ[];
}

export interface ComparisonPage {
  id: string;
  slug: string;
  title: string;
  category: ProductCategory;
  productAId: string;
  productBId: string;
  verdict: string;
  comparisonPoints: ComparisonPoint[];
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  lastUpdated: string;
}

export interface ComparisonPoint {
  label: string;
  productAValue: string;
  productBValue: string;
  winner: 'A' | 'B' | 'tie';
}

// ---------- Blog ----------

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: ProductCategory;
  tags: string[];
  author: string;
  authorImage: string;
  featuredImage: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  faqs: FAQ[];
  relatedPostIds: string[];
}

// ---------- FAQ ----------

export interface FAQ {
  question: string;
  answer: string;
}

// ---------- Navigation & UI ----------

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface Breadcrumb {
  label: string;
  href: string;
}

export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// ---------- SEO ----------

export interface SEOMeta {
  title: string;
  description: string;
  canonical: string;
  ogImage: string;
  keywords: string[];
  structuredData?: Record<string, unknown>;
}
