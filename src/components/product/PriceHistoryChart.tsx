'use client';

import { useMemo } from 'react';

interface PriceHistoryEntry {
  date: string;
  amazon: number | null;
  flipkart: number | null;
}

interface PriceHistoryChartProps {
  priceHistory: PriceHistoryEntry[];
}

function formatPrice(price: number): string {
  return '₹' + price.toLocaleString('en-IN');
}

export default function PriceHistoryChart({ priceHistory }: PriceHistoryChartProps) {
  const stats = useMemo(() => {
    const allPrices: number[] = [];
    const amazonPrices: number[] = [];
    const flipkartPrices: number[] = [];

    priceHistory.forEach((entry) => {
      if (entry.amazon !== null) {
        allPrices.push(entry.amazon);
        amazonPrices.push(entry.amazon);
      }
      if (entry.flipkart !== null) {
        allPrices.push(entry.flipkart);
        flipkartPrices.push(entry.flipkart);
      }
    });

    if (allPrices.length === 0) return null;

    const min = Math.min(...allPrices);
    const max = Math.max(...allPrices);
    const currentAmazon = amazonPrices.length > 0 ? amazonPrices[amazonPrices.length - 1] : null;
    const currentFlipkart = flipkartPrices.length > 0 ? flipkartPrices[flipkartPrices.length - 1] : null;

    // Calculate max price drop in last 30 days
    const highestRecent = Math.max(...allPrices);
    const lowestRecent = Math.min(...allPrices);
    const priceDrop = highestRecent - lowestRecent;

    return { min, max, currentAmazon, currentFlipkart, priceDrop };
  }, [priceHistory]);

  if (!stats || priceHistory.length < 2) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 text-center text-slate-400">
        Price history data not available yet.
      </div>
    );
  }

  const { min, max, priceDrop } = stats;
  const padding = (max - min) * 0.1 || 100;
  const chartMin = min - padding;
  const chartMax = max + padding;
  const range = chartMax - chartMin;

  // SVG dimensions
  const svgWidth = 600;
  const svgHeight = 200;
  const marginLeft = 0;
  const marginRight = 0;
  const marginTop = 10;
  const marginBottom = 10;
  const plotWidth = svgWidth - marginLeft - marginRight;
  const plotHeight = svgHeight - marginTop - marginBottom;

  const toX = (index: number) =>
    marginLeft + (index / (priceHistory.length - 1)) * plotWidth;
  const toY = (price: number) =>
    marginTop + plotHeight - ((price - chartMin) / range) * plotHeight;

  // Build path strings
  const buildPath = (key: 'amazon' | 'flipkart'): string => {
    const points: string[] = [];
    priceHistory.forEach((entry, i) => {
      const val = entry[key];
      if (val !== null) {
        const prefix = points.length === 0 ? 'M' : 'L';
        points.push(`${prefix}${toX(i).toFixed(1)},${toY(val).toFixed(1)}`);
      }
    });
    return points.join(' ');
  };

  const amazonPath = buildPath('amazon');
  const flipkartPath = buildPath('flipkart');

  // Y-axis labels (3 ticks)
  const yTicks = [chartMin, chartMin + range / 2, chartMax];

  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      <div className="border-b border-slate-100 px-5 py-4 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h4 className="text-base font-bold text-slate-900">Price History (Last 30 Days)</h4>
          <p className="text-sm text-slate-500 mt-0.5">Track price changes across platforms</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-5 rounded-full bg-[#ff9900]" />
            Amazon
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-5 rounded-full bg-[#2874f0]" />
            Flipkart
          </span>
        </div>
      </div>

      {/* Price drop alert */}
      {priceDrop >= 500 && (
        <div className="mx-5 mt-4 rounded-lg bg-green-50 border border-green-200 px-4 py-2.5 text-sm font-semibold text-green-700 flex items-center gap-2">
          <span className="text-base">&#9660;</span>
          Price dropped {formatPrice(priceDrop)} in last 30 days!
        </div>
      )}

      {/* Chart */}
      <div className="px-5 py-4">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Price history chart showing Amazon and Flipkart prices over the last 30 days"
        >
          {/* Grid lines */}
          {yTicks.map((tick, i) => (
            <line
              key={i}
              x1={marginLeft}
              y1={toY(tick)}
              x2={svgWidth - marginRight}
              y2={toY(tick)}
              stroke="#f1f5f9"
              strokeWidth="1"
            />
          ))}

          {/* Amazon line */}
          {amazonPath && (
            <path
              d={amazonPath}
              fill="none"
              stroke="#ff9900"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Flipkart line */}
          {flipkartPath && (
            <path
              d={flipkartPath}
              fill="none"
              stroke="#2874f0"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Endpoint dots — Amazon */}
          {priceHistory.length > 0 && priceHistory[priceHistory.length - 1].amazon !== null && (
            <circle
              cx={toX(priceHistory.length - 1)}
              cy={toY(priceHistory[priceHistory.length - 1].amazon!)}
              r="4"
              fill="#ff9900"
              stroke="white"
              strokeWidth="2"
            />
          )}

          {/* Endpoint dots — Flipkart */}
          {priceHistory.length > 0 && priceHistory[priceHistory.length - 1].flipkart !== null && (
            <circle
              cx={toX(priceHistory.length - 1)}
              cy={toY(priceHistory[priceHistory.length - 1].flipkart!)}
              r="4"
              fill="#2874f0"
              stroke="white"
              strokeWidth="2"
            />
          )}
        </svg>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-px border-t border-slate-200 bg-slate-200">
        <div className="bg-white px-4 py-3 text-center">
          <p className="text-xs text-slate-500 font-medium">Lowest</p>
          <p className="text-sm font-bold text-green-600">{formatPrice(stats.min)}</p>
        </div>
        <div className="bg-white px-4 py-3 text-center">
          <p className="text-xs text-slate-500 font-medium">Highest</p>
          <p className="text-sm font-bold text-red-500">{formatPrice(stats.max)}</p>
        </div>
        <div className="bg-white px-4 py-3 text-center">
          <p className="text-xs text-slate-500 font-medium">Current Best</p>
          <p className="text-sm font-bold text-slate-900">
            {formatPrice(
              Math.min(
                ...[stats.currentAmazon, stats.currentFlipkart].filter(
                  (p): p is number => p !== null
                )
              )
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
