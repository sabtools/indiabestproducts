interface DealBadgeProps {
  discount: number;
}

export default function DealBadge({ discount }: DealBadgeProps) {
  const isHot = discount >= 30;
  const isGood = discount >= 10 && discount < 30;

  const bgClass = isHot
    ? 'deal-hot'
    : isGood
    ? 'deal-good'
    : 'deal-normal';

  return (
    <span
      className={`${bgClass} inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold text-white shadow-sm`}
    >
      {isHot && <span aria-hidden="true">&#128293;</span>}
      {isHot ? 'Hot Deal' : `${discount}% off`}
      {isHot && <span className="ml-0.5">{discount}%</span>}
    </span>
  );
}
