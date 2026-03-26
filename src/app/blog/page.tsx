import type { Metadata } from 'next';
import { blogPosts } from '@/lib/data/blog-posts';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog — IndiaBestProducts | Finance, Credit Cards, Loans & Investing Tips',
  description:
    'Expert articles on credit cards, personal finance, loans, investing, insurance, and web hosting in India. Updated guides and comparisons for 2026.',
  keywords: [
    'finance blog India',
    'credit card tips',
    'personal finance India',
    'investing guide India',
    'insurance tips',
  ],
  alternates: {
    canonical: 'https://indiabestproducts.com/blog',
  },
  openGraph: {
    title: 'Blog — IndiaBestProducts',
    description: 'Expert articles on personal finance, credit cards, loans, and investing in India.',
    url: 'https://indiabestproducts.com/blog',
    type: 'website',
  },
};

const categoryLabels: Record<string, string> = {
  'credit-card': 'Credit Cards',
  loan: 'Loans',
  insurance: 'Insurance',
  demat: 'Investing',
  hosting: 'Web Hosting',
  gadget: 'Gadgets',
};

const categoryColors: Record<string, string> = {
  'credit-card': 'bg-blue-100 text-blue-700',
  loan: 'bg-purple-100 text-purple-700',
  insurance: 'bg-emerald-100 text-emerald-700',
  demat: 'bg-amber-100 text-amber-700',
  hosting: 'bg-pink-100 text-pink-700',
  gadget: 'bg-orange-100 text-orange-700',
};

export default function BlogPage() {
  const sorted = [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Blog' },
        ]}
      />

      <section className="mb-10 mt-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Blog
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">
          Expert guides, comparisons, and tips on personal finance, credit cards, loans, investing,
          insurance, and web hosting in India. All articles are researched and updated for 2026.
        </p>
      </section>

      {/* Blog Grid */}
      <section className="mb-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              {/* Image placeholder */}
              <div className="flex h-48 items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                <span className="text-4xl font-bold text-slate-300">
                  {post.title.charAt(0)}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                {/* Category + Read time */}
                <div className="mb-3 flex items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      categoryColors[post.category] || 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {categoryLabels[post.category] || post.category}
                  </span>
                  <span className="text-xs text-slate-400">{post.readingTime} min read</span>
                </div>

                {/* Title */}
                <h2 className="mb-2 text-lg font-bold leading-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-600">
                  {post.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                  <span className="text-xs text-slate-400">
                    {new Date(post.publishedAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="text-xs font-semibold text-blue-600 group-hover:underline">
                    Read More &rarr;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
