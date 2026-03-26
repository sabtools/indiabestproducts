import type { Product } from '@/lib/types';
import ProductCard from '@/components/product/ProductCard';

interface RelatedProductsProps {
  products: Product[];
  title?: string;
  viewAllHref?: string;
}

export default function RelatedProducts({
  products,
  title = 'Related Products',
  viewAllHref,
}: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section>
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-900">{title}</h3>
        {viewAllHref && (
          <a
            href={viewAllHref}
            className="text-sm font-semibold text-blue-600 transition-colors hover:text-blue-800"
          >
            View All &rarr;
          </a>
        )}
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
