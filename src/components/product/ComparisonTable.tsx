import type { Product } from '@/lib/types';
import ApplyButton from './ApplyButton';
import StarRating from './StarRating';

interface ComparisonTableProps {
  products: Product[];
  features: { key: string; label: string }[];
  highlightIndex?: number;
  highlightLabel?: string;
}

function getCellValue(product: Product, key: string): string | boolean | number | undefined {
  return (product as unknown as Record<string, string | boolean | number | undefined>)[key];
}

export default function ComparisonTable({
  products,
  features,
  highlightIndex,
  highlightLabel = 'Best Value',
}: ComparisonTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full min-w-[640px] text-sm">
        {/* Header */}
        <thead>
          <tr className="sticky top-0 z-10 bg-slate-50">
            <th className="w-40 border-b border-r border-slate-200 px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
              Feature
            </th>
            {products.map((p, i) => (
              <th
                key={p.id}
                className={`relative border-b border-slate-200 px-4 py-4 text-center ${
                  i === highlightIndex
                    ? 'bg-blue-50 ring-2 ring-inset ring-blue-400'
                    : ''
                }`}
              >
                {i === highlightIndex && (
                  <span className="absolute -top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow">
                    {highlightLabel}
                  </span>
                )}
                <div className="flex flex-col items-center gap-1">
                  <span className="font-bold text-slate-900">{p.name}</span>
                  <span className="text-xs text-slate-500">{p.brand}</span>
                  <StarRating rating={p.rating} size="sm" />
                </div>
              </th>
            ))}
          </tr>
        </thead>

        {/* Feature rows */}
        <tbody>
          {features.map((feature, rowIdx) => (
            <tr
              key={feature.key}
              className={rowIdx % 2 === 1 ? 'bg-slate-50/60' : 'bg-white'}
            >
              <td className="border-r border-slate-200 px-4 py-3 font-medium text-slate-600">
                {feature.label}
              </td>
              {products.map((p, colIdx) => {
                const raw = getCellValue(p, feature.key);
                let display: React.ReactNode;

                if (typeof raw === 'boolean') {
                  display = raw ? (
                    <span className="text-emerald-600 text-base">&#10004;</span>
                  ) : (
                    <span className="text-red-400 text-base">&#10008;</span>
                  );
                } else if (raw === undefined || raw === null || raw === '') {
                  display = <span className="text-slate-300">&mdash;</span>;
                } else {
                  display = String(raw);
                }

                return (
                  <td
                    key={p.id}
                    className={`px-4 py-3 text-center text-slate-800 ${
                      colIdx === highlightIndex ? 'bg-blue-50/50' : ''
                    }`}
                  >
                    {display}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>

        {/* CTA row */}
        <tfoot>
          <tr className="border-t border-slate-200 bg-slate-50">
            <td className="border-r border-slate-200 px-4 py-4" />
            {products.map((p, i) => (
              <td
                key={p.id}
                className={`px-4 py-4 text-center ${
                  i === highlightIndex ? 'bg-blue-50/50' : ''
                }`}
              >
                <ApplyButton
                  href={p.affiliateUrl}
                  variant={i === highlightIndex ? 'primary' : 'secondary'}
                />
              </td>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
