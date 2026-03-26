import {
  Product,
  ProductCategory,
  CreditCard,
  Loan,
  Insurance,
  DematAccount,
  HostingPlan,
} from './types';
import { getProductsByCategory, formatCurrency } from './utils';

// ============================================================
// Comparable Field Definitions — Auto-extracted per Category
// ============================================================

export interface ComparableField {
  key: string;
  label: string;
  type: 'text' | 'number' | 'boolean' | 'currency';
  higherIsBetter?: boolean; // for determining winner
  lowerIsBetter?: boolean;
}

const creditCardFields: ComparableField[] = [
  { key: 'joiningFee', label: 'Joining Fee', type: 'currency', lowerIsBetter: true },
  { key: 'annualFee', label: 'Annual Fee', type: 'currency', lowerIsBetter: true },
  { key: 'annualFeeWaiver', label: 'Annual Fee Waiver', type: 'text' },
  { key: 'rewardRate', label: 'Reward Rate', type: 'text' },
  { key: 'rewardPointValue', label: 'Reward Point Value', type: 'text' },
  { key: 'welcomeBonus', label: 'Welcome Bonus', type: 'text' },
  { key: 'loungeAccess', label: 'Lounge Access', type: 'text' },
  { key: 'fuelSurchargeWaiver', label: 'Fuel Surcharge Waiver', type: 'text' },
  { key: 'foreignTransactionFee', label: 'Foreign Transaction Fee', type: 'text' },
  { key: 'interestRateAPR', label: 'Interest Rate (APR)', type: 'text' },
  { key: 'minimumIncome', label: 'Minimum Income', type: 'currency', lowerIsBetter: true },
  { key: 'contactlessPayment', label: 'Contactless Payment', type: 'boolean' },
  { key: 'addOnCard', label: 'Add-On Card', type: 'boolean' },
  { key: 'network', label: 'Card Network', type: 'text' },
  { key: 'bestFor', label: 'Best For', type: 'text' },
];

const loanFields: ComparableField[] = [
  { key: 'interestRateMin', label: 'Interest Rate (Min)', type: 'number', lowerIsBetter: true },
  { key: 'interestRateMax', label: 'Interest Rate (Max)', type: 'number', lowerIsBetter: true },
  { key: 'interestRateType', label: 'Interest Rate Type', type: 'text' },
  { key: 'processingFee', label: 'Processing Fee', type: 'text' },
  { key: 'minAmount', label: 'Minimum Loan Amount', type: 'currency', lowerIsBetter: true },
  { key: 'maxAmount', label: 'Maximum Loan Amount', type: 'currency', higherIsBetter: true },
  { key: 'minTenure', label: 'Minimum Tenure', type: 'number' },
  { key: 'maxTenure', label: 'Maximum Tenure', type: 'number', higherIsBetter: true },
  { key: 'tenureUnit', label: 'Tenure Unit', type: 'text' },
  { key: 'prepaymentCharges', label: 'Prepayment Charges', type: 'text' },
  { key: 'foreclosureCharges', label: 'Foreclosure Charges', type: 'text' },
  { key: 'disbursalTime', label: 'Disbursal Time', type: 'text' },
  { key: 'emiPerLakh', label: 'EMI per Lakh', type: 'text' },
  { key: 'bestFor', label: 'Best For', type: 'text' },
];

const insuranceFields: ComparableField[] = [
  { key: 'premiumStartsFrom', label: 'Premium Starts From', type: 'text' },
  { key: 'coverageMin', label: 'Min Coverage', type: 'currency', higherIsBetter: true },
  { key: 'coverageMax', label: 'Max Coverage', type: 'currency', higherIsBetter: true },
  { key: 'claimSettlementRatio', label: 'Claim Settlement Ratio', type: 'text' },
  { key: 'networkHospitals', label: 'Network Hospitals', type: 'number', higherIsBetter: true },
  { key: 'waitingPeriod', label: 'Waiting Period', type: 'text' },
  { key: 'preExistingWaiting', label: 'Pre-Existing Disease Waiting', type: 'text' },
  { key: 'renewalAge', label: 'Renewal Age', type: 'text' },
  { key: 'entryAgeMin', label: 'Min Entry Age', type: 'number', lowerIsBetter: true },
  { key: 'entryAgeMax', label: 'Max Entry Age', type: 'number', higherIsBetter: true },
  { key: 'bestFor', label: 'Best For', type: 'text' },
];

const dematFields: ComparableField[] = [
  { key: 'accountOpeningCharge', label: 'Account Opening Charge', type: 'currency', lowerIsBetter: true },
  { key: 'annualMaintenanceCharge', label: 'Annual Maintenance (AMC)', type: 'currency', lowerIsBetter: true },
  { key: 'equityDeliveryBrokerage', label: 'Equity Delivery Brokerage', type: 'text' },
  { key: 'equityIntradayBrokerage', label: 'Equity Intraday Brokerage', type: 'text' },
  { key: 'futuresBrokerage', label: 'Futures Brokerage', type: 'text' },
  { key: 'optionsBrokerage', label: 'Options Brokerage', type: 'text' },
  { key: 'mutualFundCommission', label: 'Mutual Fund Commission', type: 'text' },
  { key: 'researchReports', label: 'Research Reports', type: 'boolean' },
  { key: 'marginTrading', label: 'Margin Trading', type: 'boolean' },
  { key: 'ipoAccess', label: 'IPO Access', type: 'boolean' },
  { key: 'mutualFunds', label: 'Mutual Funds', type: 'boolean' },
  { key: 'nfoAccess', label: 'NFO Access', type: 'boolean' },
  { key: 'bestFor', label: 'Best For', type: 'text' },
];

const hostingFields: ComparableField[] = [
  { key: 'monthlyPriceMin', label: 'Starting Price (/month)', type: 'currency', lowerIsBetter: true },
  { key: 'monthlyPriceMax', label: 'Max Plan Price (/month)', type: 'currency' },
  { key: 'websites', label: 'Websites Allowed', type: 'text' },
  { key: 'storage', label: 'Storage', type: 'text' },
  { key: 'bandwidth', label: 'Bandwidth', type: 'text' },
  { key: 'uptime', label: 'Uptime Guarantee', type: 'text' },
  { key: 'freeDomain', label: 'Free Domain', type: 'boolean' },
  { key: 'freeSSL', label: 'Free SSL', type: 'boolean' },
  { key: 'cpanel', label: 'cPanel', type: 'boolean' },
  { key: 'wordpressOptimized', label: 'WordPress Optimized', type: 'boolean' },
  { key: 'backupFrequency', label: 'Backup Frequency', type: 'text' },
  { key: 'bestFor', label: 'Best For', type: 'text' },
];

// ============================================================
// Core Comparison Functions
// ============================================================

/**
 * Returns the list of comparable fields for a given category
 */
export function getComparableFields(category: string): ComparableField[] {
  switch (category) {
    case 'credit-card':
      return creditCardFields;
    case 'loan':
      return loanFields;
    case 'insurance':
      return insuranceFields;
    case 'demat':
      return dematFields;
    case 'hosting':
      return hostingFields;
    default:
      return [];
  }
}

/**
 * Safely extracts a value from a product by key
 */
function getProductValue(product: Product, key: string): string | number | boolean | undefined {
  return (product as unknown as Record<string, string | number | boolean | undefined>)[key];
}

/**
 * Formats a cell value for display
 */
export function formatFieldValue(
  value: string | number | boolean | undefined,
  field: ComparableField
): string {
  if (value === undefined || value === null || value === '') return '—';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (field.type === 'currency' && typeof value === 'number') return formatCurrency(value);
  if (field.type === 'number' && typeof value === 'number') {
    // Format numbers like interest rates with % if appropriate
    if (field.key.toLowerCase().includes('rate')) return `${value}%`;
    return value.toLocaleString('en-IN');
  }
  return String(value);
}

export interface ComparisonRow {
  field: ComparableField;
  values: (string | number | boolean | undefined)[];
  formattedValues: string[];
  winnerIndex: number | -1; // -1 means tie
}

export interface ComparisonData {
  products: Product[];
  category: string;
  rows: ComparisonRow[];
  overallWinnerIndex: number;
}

/**
 * Determines which product wins for a given field
 * Returns the 0-based index of the winner, or -1 for tie/non-comparable
 */
function determineWinner(
  values: (string | number | boolean | undefined)[],
  field: ComparableField
): number {
  const validValues = values.map((v, i) => ({ value: v, index: i }))
    .filter((item) => item.value !== undefined && item.value !== null && item.value !== '');

  if (validValues.length < 2) return -1;

  if (field.type === 'currency' || field.type === 'number') {
    const numericValues = validValues
      .map((item) => ({ num: typeof item.value === 'number' ? item.value : NaN, index: item.index }))
      .filter((item) => !isNaN(item.num));

    if (numericValues.length < 2) return -1;

    if (field.lowerIsBetter) {
      const min = numericValues.reduce((a, b) => (a.num < b.num ? a : b));
      const allSame = numericValues.every((v) => v.num === min.num);
      return allSame ? -1 : min.index;
    }
    if (field.higherIsBetter) {
      const max = numericValues.reduce((a, b) => (a.num > b.num ? a : b));
      const allSame = numericValues.every((v) => v.num === max.num);
      return allSame ? -1 : max.index;
    }
  }

  if (field.type === 'boolean') {
    const boolValues = validValues.filter((item) => typeof item.value === 'boolean');
    if (boolValues.length < 2) return -1;
    const trueItems = boolValues.filter((item) => item.value === true);
    if (trueItems.length === boolValues.length || trueItems.length === 0) return -1;
    return trueItems.length === 1 ? trueItems[0].index : -1;
  }

  return -1; // text fields are generally non-comparable
}

/**
 * Generates structured comparison data for 2 or 3 products
 */
export function getComparisonData(
  product1: Product,
  product2: Product,
  product3?: Product
): ComparisonData {
  const products = product3 ? [product1, product2, product3] : [product1, product2];
  const category = product1.category;
  const fields = getComparableFields(category);

  const rows: ComparisonRow[] = fields.map((field) => {
    const values = products.map((p) => getProductValue(p, field.key));
    const formattedValues = values.map((v) => formatFieldValue(v, field));
    const winnerIndex = determineWinner(values, field);
    return { field, values, formattedValues, winnerIndex };
  });

  // Determine overall winner by rating
  let overallWinnerIndex = 0;
  let highestRating = products[0].rating;
  for (let i = 1; i < products.length; i++) {
    if (products[i].rating > highestRating) {
      highestRating = products[i].rating;
      overallWinnerIndex = i;
    }
  }

  return { products, category, rows, overallWinnerIndex };
}

/**
 * Generates a recommendation verdict based on ratings and features
 */
export function generateVerdict(products: Product[]): string {
  if (products.length === 0) return '';
  if (products.length === 1) return `${products[0].name} is a solid choice in its category.`;

  const sorted = [...products].sort((a, b) => b.rating - a.rating);
  const best = sorted[0];
  const runnerUp = sorted[1];

  if (best.rating === runnerUp.rating) {
    return `Both ${best.name} and ${runnerUp.name} are equally rated at ${best.rating}/5. Your choice should depend on specific features that matter most to you. Compare the individual specs above to decide which aligns better with your needs.`;
  }

  const diff = (best.rating - runnerUp.rating).toFixed(1);

  const verdictParts = [
    `Based on our analysis, ${best.name} edges ahead with a rating of ${best.rating}/5 compared to ${runnerUp.name}'s ${runnerUp.rating}/5.`,
  ];

  if (products.length === 3 && sorted[2]) {
    verdictParts.push(
      `${sorted[2].name} comes in third with ${sorted[2].rating}/5.`
    );
  }

  verdictParts.push(
    `With a difference of ${diff} points, ${best.name} offers a stronger overall package. However, ${runnerUp.name} may be better suited for specific use cases — review the feature-by-feature comparison above to decide what works best for your needs.`
  );

  return verdictParts.join(' ');
}

/**
 * Generates auto-FAQs for a comparison
 */
export function generateComparisonFAQs(
  product1: Product,
  product2: Product
): { question: string; answer: string }[] {
  const p1 = product1.name;
  const p2 = product2.name;
  const sorted = [product1, product2].sort((a, b) => b.rating - a.rating);
  const better = sorted[0];
  const other = sorted[1];

  const categoryLabel = getCategoryLabel(product1.category);

  const faqs = [
    {
      question: `Which is better — ${p1} or ${p2}?`,
      answer:
        better.rating !== other.rating
          ? `Based on our analysis, ${better.name} scores higher with ${better.rating}/5 compared to ${other.name}'s ${other.rating}/5. However, the best choice depends on your specific requirements and priorities.`
          : `Both ${p1} and ${p2} are rated equally at ${product1.rating}/5. The better choice depends on your individual needs and which specific features matter most to you.`,
    },
    {
      question: `What is the difference between ${p1} and ${p2}?`,
      answer: `${p1} and ${p2} differ in several key areas including pricing, features, and target audience. ${p1} is best for ${(product1 as unknown as Record<string, unknown>)['bestFor'] || 'specific use cases'}, while ${p2} is best for ${(product2 as unknown as Record<string, unknown>)['bestFor'] || 'different use cases'}. See the detailed comparison above for a feature-by-feature breakdown.`,
    },
    {
      question: `Is ${p1} worth it in 2026?`,
      answer: `${p1} carries a rating of ${product1.rating}/5 on IndiaBestProducts. It is considered a strong option in the ${categoryLabel} space. Review the pros and cons listed above to see if it matches your specific needs.`,
    },
    {
      question: `Is ${p2} worth it in 2026?`,
      answer: `${p2} has a rating of ${product2.rating}/5. It is recognized for its competitive features in the ${categoryLabel} category. Check the detailed specs above to determine if it suits your requirements.`,
    },
    {
      question: `Can I compare more than two ${categoryLabel.toLowerCase()} products?`,
      answer: `Yes! Use our interactive comparison tool at /compare to compare up to 3 ${categoryLabel.toLowerCase()} products side by side. Select your preferred products and get an instant feature-by-feature comparison.`,
    },
  ];

  return faqs;
}

/**
 * Returns all possible 2-product combination pairs for a category
 */
export function getAllProductPairs(
  category: string
): { product1: Product; product2: Product }[] {
  const products = getProductsByCategory(category);
  const pairs: { product1: Product; product2: Product }[] = [];

  for (let i = 0; i < products.length; i++) {
    for (let j = i + 1; j < products.length; j++) {
      pairs.push({ product1: products[i], product2: products[j] });
    }
  }

  return pairs;
}

/**
 * Returns human-readable category label
 */
export function getCategoryLabel(category: string): string {
  switch (category) {
    case 'credit-card':
      return 'Credit Card';
    case 'loan':
      return 'Loan';
    case 'insurance':
      return 'Insurance';
    case 'demat':
      return 'Demat Account';
    case 'hosting':
      return 'Web Hosting';
    default:
      return category;
  }
}

/**
 * Generates a short name from a product name (for slugs)
 */
export function getShortName(product: Product): string {
  let name = product.name
    .replace(/Credit Card$/i, '')
    .replace(/Demat & Trading Account$/i, '')
    .replace(/Demat Account$/i, '')
    .replace(/Web Hosting$/i, '')
    .replace(/Health Insurance$/i, '')
    .replace(/Insurance$/i, '')
    .replace(/Personal Loan$/i, '')
    .replace(/Home Loan$/i, '')
    .replace(/Car Loan$/i, '')
    .trim();
  return name;
}
