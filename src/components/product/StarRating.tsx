interface StarRatingProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
}

const sizeClasses = {
  sm: 'text-sm gap-0.5',
  md: 'text-lg gap-0.5',
  lg: 'text-2xl gap-1',
} as const;

const valueSizeClasses = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
} as const;

export default function StarRating({ rating, size = 'md', showValue = false }: StarRatingProps) {
  const clamped = Math.max(0, Math.min(5, rating));
  const fullStars = Math.floor(clamped);
  const hasHalf = clamped - fullStars >= 0.25 && clamped - fullStars < 0.75;
  const adjustedFull = clamped - fullStars >= 0.75 ? fullStars + 1 : fullStars;
  const emptyStars = 5 - adjustedFull - (hasHalf ? 1 : 0);

  return (
    <div className={`inline-flex items-center ${sizeClasses[size]}`} aria-label={`Rating: ${clamped} out of 5 stars`}>
      {Array.from({ length: adjustedFull }, (_, i) => (
        <span key={`full-${i}`} className="text-amber-400">&#9733;</span>
      ))}
      {hasHalf && (
        <span key="half" className="relative text-slate-300">
          <span>&#9733;</span>
          <span
            className="absolute inset-0 overflow-hidden text-amber-400"
            style={{ width: '50%' }}
          >
            &#9733;
          </span>
        </span>
      )}
      {Array.from({ length: Math.max(0, emptyStars) }, (_, i) => (
        <span key={`empty-${i}`} className="text-slate-300">&#9733;</span>
      ))}
      {showValue && (
        <span className={`ml-1.5 font-semibold text-slate-700 ${valueSizeClasses[size]}`}>
          {clamped.toFixed(1)}
        </span>
      )}
    </div>
  );
}
