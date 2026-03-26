import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/lib/data/blog-posts';
import type { BlogPost } from '@/lib/types';
import Breadcrumb from '@/components/layout/Breadcrumb';
import FaqAccordion from '@/components/content/FaqAccordion';
import ArticleSchema from '@/components/seo/ArticleSchema';
import Link from 'next/link';

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    alternates: {
      canonical: `https://indiabestproducts.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `https://indiabestproducts.com/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle,
      description: post.metaDescription,
    },
  };
}

const categoryLabels: Record<string, string> = {
  'credit-card': 'Credit Cards',
  loan: 'Loans',
  insurance: 'Insurance',
  demat: 'Investing',
  hosting: 'Web Hosting',
  gadget: 'Gadgets',
};

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const relatedPosts = post.relatedPostIds
    .map((id) => blogPosts.find((p) => p.id === id))
    .filter(Boolean) as BlogPost[];

  const shareUrl = encodeURIComponent(`https://indiabestproducts.com/blog/${post.slug}`);
  const shareTitle = encodeURIComponent(post.title);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <ArticleSchema
        title={post.title}
        description={post.metaDescription}
        author={post.author}
        datePublished={post.publishedAt}
        dateModified={post.updatedAt}
        image={post.featuredImage}
        url={`https://indiabestproducts.com/blog/${post.slug}`}
      />

      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: post.title },
        ]}
      />

      <article className="mt-6">
        {/* Header */}
        <header className="mb-8">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              {categoryLabels[post.category] || post.category}
            </span>
            <span className="text-sm text-slate-400">{post.readingTime} min read</span>
          </div>

          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {post.title}
          </h1>

          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            {post.excerpt}
          </p>

          {/* Author + Date */}
          <div className="mt-6 flex items-center gap-4 border-b border-slate-200 pb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white">
              {post.author.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">{post.author}</p>
              <p className="text-xs text-slate-500">
                Published{' '}
                {new Date(post.publishedAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
                {post.updatedAt !== post.publishedAt && (
                  <>
                    {' '}
                    &middot; Updated{' '}
                    {new Date(post.updatedAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </>
                )}
              </p>
            </div>
          </div>
        </header>

        {/* Content */}
        <div
          className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-2xl prose-h3:text-xl prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-li:marker:text-slate-400"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Share Buttons */}
        <div className="mt-10 border-t border-slate-200 pt-6">
          <p className="mb-3 text-sm font-semibold text-slate-700">Share this article</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={`https://api.whatsapp.com/send?text=${shareTitle}%20${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-700"
            >
              WhatsApp
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-sky-600"
            >
              Twitter
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* FAQ */}
        {post.faqs.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              Frequently Asked Questions
            </h2>
            <FaqAccordion items={post.faqs} />
          </section>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-10 border-t border-slate-200 pt-8">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">Related Articles</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((related) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.slug}`}
                  className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <span className="mb-2 inline-block rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                    {categoryLabels[related.category] || related.category}
                  </span>
                  <h3 className="mb-2 text-base font-bold leading-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                    {related.title}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {related.readingTime} min read &middot;{' '}
                    {new Date(related.publishedAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
