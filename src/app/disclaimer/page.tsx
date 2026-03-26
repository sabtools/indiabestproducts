import type { Metadata } from 'next';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Affiliate Disclaimer — IndiaBestProducts.com',
  description:
    'Affiliate disclosure for IndiaBestProducts.com. Understand how we earn money through affiliate partnerships and how this affects our reviews.',
  alternates: {
    canonical: 'https://indiabestproducts.com/disclaimer',
  },
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Affiliate Disclaimer' },
        ]}
      />

      <article className="mt-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Affiliate Disclaimer
        </h1>
        <p className="mt-2 text-sm text-slate-500">Last updated: March 26, 2026</p>

        {/* Important notice box */}
        <div className="mt-6 rounded-xl border-2 border-amber-300 bg-amber-50 p-6">
          <h2 className="mb-3 text-xl font-bold text-amber-900">
            Important Disclosure
          </h2>
          <p className="text-amber-800">
            IndiaBestProducts.com is an affiliate and advertising-supported website. We earn
            commissions when you click on certain links on our website and apply for or purchase
            products or services from our partner companies. This is how we keep our website free for
            all users.
          </p>
        </div>

        <div className="prose prose-slate mt-8 max-w-none">
          <h2>How We Earn Money</h2>
          <p>
            IndiaBestProducts.com earns revenue through the following channels:
          </p>
          <ul>
            <li>
              <strong>Affiliate commissions:</strong> When you click on &quot;Apply Now,&quot;
              &quot;Get Started,&quot; &quot;Open Account,&quot; or similar call-to-action links on
              our website and complete an application, sign-up, or purchase on the partner&apos;s
              website, we may receive a commission from the partner company. This commission is paid
              by the company, not by you. The price you pay is the same whether or not you use our
              link.
            </li>
            <li>
              <strong>Display advertising:</strong> We display advertisements on our website through
              Google AdSense and other advertising networks. We earn revenue based on ad impressions
              and clicks.
            </li>
            <li>
              <strong>Sponsored content:</strong> Occasionally, we may publish content sponsored by
              partner companies. All sponsored content is clearly labeled as such.
            </li>
          </ul>

          <h2>Our Editorial Independence</h2>
          <p>
            <strong>
              Our affiliate relationships do NOT influence our reviews, ratings, or recommendations.
            </strong>
          </p>
          <p>Our editorial process is as follows:</p>
          <ul>
            <li>
              We review and compare products based on features, pricing, user feedback, and value for
              the consumer
            </li>
            <li>
              Products are rated on a consistent framework regardless of affiliate relationships
            </li>
            <li>
              We include products that do not have affiliate partnerships if they deserve
              recommendation
            </li>
            <li>
              We will rate a product poorly if it deserves a poor rating, even if we have an affiliate
              relationship with the provider
            </li>
            <li>
              Our rankings are determined by product quality, not by commission rates
            </li>
          </ul>

          <h2>Not Financial or Professional Advice</h2>
          <div className="rounded-xl border border-red-200 bg-red-50 p-5 not-prose">
            <p className="font-semibold text-red-900">
              The content on IndiaBestProducts.com is for informational purposes only and should NOT
              be considered as:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-red-800">
              <li>Financial advice or investment recommendations</li>
              <li>Tax advice or tax planning guidance</li>
              <li>Legal advice of any kind</li>
              <li>Professional consultation or counseling</li>
              <li>A guarantee of product availability, pricing, or terms</li>
            </ul>
          </div>
          <p>
            Always consult with a qualified financial advisor, tax consultant, or legal professional
            before making financial decisions. Product terms, rates, and features change frequently
            and may differ from what is displayed on our website.
          </p>

          <h2>Product Information May Change</h2>
          <p>
            We make our best effort to keep all product information accurate and up-to-date. However:
          </p>
          <ul>
            <li>
              Interest rates, fees, and charges are subject to change by the product provider at any
              time without notice
            </li>
            <li>
              Product features and benefits may be modified by the provider
            </li>
            <li>
              Eligibility criteria may change based on the provider&apos;s policies
            </li>
            <li>
              Promotional offers and welcome bonuses may expire or be modified
            </li>
            <li>
              We update our content regularly, but there may be a delay between when a provider
              changes their terms and when we update our website
            </li>
          </ul>
          <p>
            <strong>
              Always verify the current terms, conditions, and pricing directly with the product
              provider before applying or purchasing.
            </strong>
          </p>

          <h2>No Guarantee of Approval</h2>
          <p>
            Clicking on our affiliate links and applying for a product does not guarantee approval.
            Credit cards, loans, insurance, and demat accounts are subject to the provider&apos;s
            eligibility criteria, credit checks, KYC verification, and internal policies. We do not
            have any influence over approval decisions.
          </p>

          <h2>Third-Party Websites</h2>
          <p>
            When you click on affiliate links, you will be redirected to the product provider&apos;s
            website. These third-party websites have their own privacy policies, terms of service,
            and data practices. We are not responsible for the content, accuracy, or practices of
            these external websites.
          </p>

          <h2>Testimonials and Reviews</h2>
          <p>
            Product ratings and reviews on our website represent the opinions of our editorial team
            based on our research and analysis. Individual experiences with products may vary.
            User-submitted reviews (if any) represent the opinions of those individuals and not of
            IndiaBestProducts.com.
          </p>

          <h2>Amazon Affiliate Disclosure</h2>
          <p>
            IndiaBestProducts.com is a participant in the Amazon Services LLC Associates Program and
            Amazon.in Associates Program, affiliate advertising programs designed to provide a means
            for sites to earn advertising fees by advertising and linking to Amazon.in and Amazon.com.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about our affiliate relationships or this disclaimer, please
            contact us at{' '}
            <a href="mailto:contact@indiabestproducts.com">contact@indiabestproducts.com</a>.
          </p>
        </div>

        {/* Links to other policies */}
        <div className="mt-10 rounded-xl border border-slate-200 bg-slate-50 p-6">
          <h3 className="mb-3 text-base font-bold text-slate-900">Related Policies</h3>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/privacy"
              className="text-sm font-semibold text-blue-600 hover:underline"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm font-semibold text-blue-600 hover:underline"
            >
              Terms of Service
            </Link>
            <Link
              href="/about"
              className="text-sm font-semibold text-blue-600 hover:underline"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-sm font-semibold text-blue-600 hover:underline"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
