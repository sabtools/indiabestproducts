'use client';

import PriceHistoryChart from '@/components/product/PriceHistoryChart';

interface Props {
  priceHistory: { date: string; amazon: number | null; flipkart: number | null }[];
}

export default function PriceHistorySection({ priceHistory }: Props) {
  return <PriceHistoryChart priceHistory={priceHistory} />;
}
