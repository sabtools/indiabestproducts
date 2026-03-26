interface ApplyButtonProps {
  href: string;
  text?: string;
  variant?: 'primary' | 'secondary';
}

export default function ApplyButton({
  href,
  text = 'Apply Now',
  variant = 'primary',
}: ApplyButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold text-base transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantClasses =
    variant === 'primary'
      ? 'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500 shadow-md hover:shadow-lg'
      : 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500';

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={`${baseClasses} ${variantClasses}`}
    >
      {text}
      <span aria-hidden="true">&rarr;</span>
    </a>
  );
}
