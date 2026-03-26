import type { Metadata } from 'next';
import Breadcrumb from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: 'Contact Us — IndiaBestProducts.com',
  description:
    'Get in touch with the IndiaBestProducts team. Questions, feedback, partnership inquiries, or corrections — we are here to help.',
  alternates: {
    canonical: 'https://indiabestproducts.com/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Contact Us' },
        ]}
      />

      <div className="mt-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Contact Us
        </h1>
        <p className="mt-3 text-lg text-slate-600">
          Have a question, feedback, or partnership inquiry? We would love to hear from you.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-5">
        {/* Contact Info */}
        <div className="lg:col-span-2">
          <div className="space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="mb-2 text-base font-bold text-slate-900">Email</h3>
              <a
                href="mailto:contact@indiabestproducts.com"
                className="text-blue-600 hover:underline"
              >
                contact@indiabestproducts.com
              </a>
              <p className="mt-1 text-xs text-slate-500">
                We respond within 24-48 hours on business days.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="mb-2 text-base font-bold text-slate-900">For Partnerships</h3>
              <a
                href="mailto:partners@indiabestproducts.com"
                className="text-blue-600 hover:underline"
              >
                partners@indiabestproducts.com
              </a>
              <p className="mt-1 text-xs text-slate-500">
                Affiliate programs, sponsored content, and business collaborations.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="mb-2 text-base font-bold text-slate-900">Data Corrections</h3>
              <p className="text-sm text-slate-700">
                If you notice any incorrect information on our website, please email us at{' '}
                <a
                  href="mailto:corrections@indiabestproducts.com"
                  className="text-blue-600 hover:underline"
                >
                  corrections@indiabestproducts.com
                </a>{' '}
                with the page URL and the correction needed. We take accuracy seriously.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="mb-2 text-base font-bold text-slate-900">Follow Us</h3>
              <div className="flex gap-4">
                <a href="https://twitter.com/indiabestprod" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                  Twitter
                </a>
                <a href="https://facebook.com/indiabestproducts" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                  Facebook
                </a>
                <a href="https://youtube.com/@indiabestproducts" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                  YouTube
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form (UI only) */}
        <div className="lg:col-span-3">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-bold text-slate-900">Send Us a Message</h2>
            <form className="space-y-5" action="#" method="POST">
              <div>
                <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="mb-1 block text-sm font-medium text-slate-700">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                  <option value="general">General Inquiry</option>
                  <option value="feedback">Feedback</option>
                  <option value="correction">Data Correction</option>
                  <option value="partnership">Partnership / Business</option>
                  <option value="complaint">Complaint</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="mb-1 block text-sm font-medium text-slate-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="Write your message here..."
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Send Message
              </button>

              <p className="text-center text-xs text-slate-400">
                This form is for demonstration purposes. Please email us directly for a faster response.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
