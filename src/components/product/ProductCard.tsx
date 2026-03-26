import type { Product } from '@/lib/types';
import StarRating from './StarRating';
import ApplyButton from './ApplyButton';

interface ProductCardProps {
  product: Product;
  showCompare?: boolean;
  onCompareToggle?: (id: string, checked: boolean) => void;
  compareChecked?: boolean;
}

export default function ProductCard({
  product,
  showCompare = false,
  onCompareToggle,
  compareChecked = false,
}: ProductCardProps) {
  const initial = product.name.charAt(0).toUpperCase();

  const highlights =
    'keyFeatures' in product
      ? (product as Product & { keyFeatures?: string[] }).keyFeatures?.slice(0, 3) ?? []
      : product.pros.slice(0, 3);

  const priceLabel = (() => {
    if ('joiningFee' in product) {
      const fee = (product as Product & { joiningFee: number }).joiningFee;
      return fee === 0 ? 'FREE' : `₹${fee.toLocaleString('en-IN')}`;
    }
    if ('price' in product && typeof (product as Record<string, unknown>).price === 'number') {
      return `₹${((product as Record<string, unknown>).price as number).toLocaleString('en-IN')}`;
    }
    if ('monthlyPriceMin' in product) {
      return `From ₹${(product as Product & { monthlyPriceMin: number }).monthlyPriceMin}/mo`;
    }
    return null;
  })();

  return (
    <div className="group relative flex w-full flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md">
      {/* Badge */}
      {product.featured && (
        <span className="absolute -top-2.5 right-4 rounded-full bg-amber-500 px-3 py-0.5 text-xs font-bold uppercase tracking-wide text-white shadow-sm">
          Featured
        </span>
      )}

      {/* Header */}
      <div className="mb-4 flex items-start gap-4">
        {/* Image placeholder */}
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-14 w-14 shrink-0 rounded-lg border border-slate-100 object-contain"
            loading="lazy"
          />
        ) : (
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 text-xl font-bold text-white shadow-inner">
            {initial}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-bold leading-tight text-slate-900">{product.name}</h3>
          <p className="mt-0.5 text-sm text-slate-500">{product.brand}</p>
          <div className="mt-1">
            <StarRating rating={product.rating} size="sm" showValue />
          </div>
        </div>

        {/* Price badge */}
        {priceLabel && (
          <span className="shrink-0 rounded-md bg-emerald-50 px-2.5 py-1 text-sm font-bold text-emerald-700 ring-1 ring-emerald-200">
            {priceLabel}
          </span>
        )}
      </div>

      {/* Highlights */}
      {highlights.length > 0 && (
        <ul className="mb-4 space-y-1.5 text-sm text-slate-600">
          {highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-0.5 text-emerald-500">&#10003;</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Footer */}
      <div className="mt-auto flex items-center gap-3 pt-2">
        <ApplyButton href={product.affiliateUrl} />

        {showCompare && (
          <label className="ml-auto flex cursor-pointer items-center gap-1.5 text-sm text-slate-500 select-none">
            <input
              type="checkbox"
              checked={compareChecked}
              onChange={(e) => onCompareToggle?.(product.id, e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            Compare
          </label>
        )}
      </div>
    </div>
  );
}
