import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compare Prices — Amazon vs Flipkart | IndiaBestProducts',
  description:
    'Compare product prices between Amazon and Flipkart. Find the best deals, biggest discounts, and lowest prices on phones, laptops, headphones, smartwatches, and more. Updated daily.',
  keywords: [
    'price comparison',
    'Amazon vs Flipkart',
    'best price India',
    'lowest price',
    'phone price comparison',
    'laptop deals',
    'online shopping India',
  ],
  openGraph: {
    title: 'Compare Prices — Amazon vs Flipkart',
    description:
      'Find the best deals across Amazon and Flipkart. Compare prices, read reviews, and save money on your favourite products.',
    type: 'website',
  },
};

export default function PricesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
