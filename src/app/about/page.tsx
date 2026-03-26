import type { Metadata } from 'next';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us — IndiaBestProducts.com',
  description:
    'Learn about IndiaBestProducts.com — India\'s trusted comparison platform for credit cards, loans, insurance, demat accounts, and more. Our mission, team, and how we work.',
  alternates: {
    canonical: 'https://indiabestproducts.com/about',
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'About Us' },
        ]}
      />

      <article className="mt-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          About IndiaBestProducts.com
        </h1>

        <p className="mt-5 text-lg leading-relaxed text-slate-700">
          IndiaBestProducts.com is India&apos;s trusted comparison platform that helps millions of Indians
          make smarter financial and product decisions. We research, review, and compare credit cards,
          personal loans, health insurance, demat accounts, web hosting, and gadgets so you do not
          have to.
        </p>

        {/* Mission */}
        <section className="mt-10">
          <h2 className="mb-4 text-2xl font-bold text-slate-900">Our Mission</h2>
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
            <p className="text-lg font-medium text-blue-900">
              To empower every Indian with unbiased, accurate, and easy-to-understand product
              comparisons so they can save money and make confident financial decisions.
            </p>
          </div>
        </section>

        {/* What We Do */}
        <section className="mt-10">
          <h2 className="mb-4 text-2xl font-bold text-slate-900">What We Do</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              {
                title: 'Expert Reviews',
                desc: 'Our team researches every product thoroughly, analyzing fees, features, benefits, and fine print that most people miss.',
              },
              {
                title: 'Side-by-Side Comparisons',
                desc: 'We present products in easy comparison tables so you can see exactly how they stack up against competitors.',
              },
              {
                title: 'Updated Information',
                desc: 'Financial products change frequently. We update our data regularly to ensure you always see the latest charges and features.',
              },
              {
                title: 'Educational Content',
                desc: 'Our blog publishes guides and tips on personal finance, investing, insurance, and technology to help you learn and grow.',
              },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="mb-2 text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How We Make Money */}
        <section className="mt-10">
          <h2 className="mb-4 text-2xl font-bold text-slate-900">
            How We Make Money (Transparency)
          </h2>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
            <p className="text-slate-700">
              IndiaBestProducts.com earns money through affiliate partnerships. When you click on an
              &quot;Apply Now&quot; or &quot;Get Started&quot; link and complete an application or
              purchase, we may earn a commission from the product provider at no extra cost to you.
            </p>
            <p className="mt-3 text-slate-700">
              <strong>Important:</strong> Our reviews and rankings are based purely on product quality,
              features, and value for the consumer. We never let affiliate relationships influence our
              ratings or recommendations. If a product is not good, we will say so regardless of
              whether we earn a commission from it.
            </p>
            <p className="mt-3 text-sm text-slate-500">
              For full details, please read our{' '}
              <Link href="/disclaimer" className="font-semibold text-blue-600 hover:underline">
                Affiliate Disclaimer
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Our Team */}
        <section className="mt-10">
          <h2 className="mb-4 text-2xl font-bold text-slate-900">Our Team</h2>
          <p className="mb-6 text-slate-700">
            IndiaBestProducts is built by a small but passionate team of financial researchers,
            content writers, and technology enthusiasts based in India. Our editorial team collectively
            has over 20 years of experience in personal finance, fintech, and digital marketing.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { role: 'Editorial Team', desc: 'Researches products, writes reviews, and maintains data accuracy.' },
              { role: 'Technical Team', desc: 'Builds and maintains the platform for the best user experience.' },
              { role: 'Content Team', desc: 'Creates educational guides, blog posts, and comparison articles.' },
            ].map((member) => (
              <div key={member.role} className="rounded-xl border border-slate-200 bg-white p-5 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-lg font-bold text-white">
                  {member.role.charAt(0)}
                </div>
                <h3 className="text-base font-bold text-slate-900">{member.role}</h3>
                <p className="mt-1 text-xs text-slate-500">{member.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="mt-10 rounded-xl bg-slate-900 p-6 text-center text-white sm:p-8">
          <h2 className="mb-2 text-2xl font-bold">Have Questions?</h2>
          <p className="mb-5 text-slate-300">
            We would love to hear from you. Reach out to our team for feedback, partnerships, or
            corrections.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-bold text-slate-900 shadow-lg transition-all hover:scale-105"
          >
            Contact Us &rarr;
          </Link>
        </section>
      </article>
    </div>
  );
}
