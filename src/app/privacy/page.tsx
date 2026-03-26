import type { Metadata } from 'next';
import Breadcrumb from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: 'Privacy Policy — IndiaBestProducts.com',
  description:
    'Privacy Policy for IndiaBestProducts.com. Learn how we collect, use, and protect your data when you visit our website.',
  alternates: {
    canonical: 'https://indiabestproducts.com/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Privacy Policy' },
        ]}
      />

      <article className="prose prose-slate mt-6 max-w-none">
        <h1>Privacy Policy</h1>
        <p className="text-sm text-slate-500">Last updated: March 26, 2026</p>

        <p>
          IndiaBestProducts.com (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to
          protecting the privacy of our visitors. This Privacy Policy explains how we collect, use,
          disclose, and safeguard your information when you visit our website at
          indiabestproducts.com.
        </p>

        <h2>1. Information We Collect</h2>

        <h3>1.1 Information You Provide</h3>
        <p>We may collect information that you voluntarily provide to us, including:</p>
        <ul>
          <li>Name and email address when you use our contact form</li>
          <li>Feedback and messages you send to us</li>
          <li>Newsletter subscription email address (if applicable)</li>
        </ul>

        <h3>1.2 Automatically Collected Information</h3>
        <p>When you visit our website, we may automatically collect:</p>
        <ul>
          <li>Browser type and version</li>
          <li>Operating system</li>
          <li>IP address (anonymized)</li>
          <li>Pages visited, time spent, and navigation patterns</li>
          <li>Referring website or source</li>
          <li>Device type (desktop, mobile, tablet)</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>We use the collected information for the following purposes:</p>
        <ul>
          <li>To improve our website content and user experience</li>
          <li>To respond to your inquiries and provide customer support</li>
          <li>To analyze website traffic and usage patterns</li>
          <li>To send newsletters or updates (only if you have opted in)</li>
          <li>To prevent fraud and ensure website security</li>
        </ul>

        <h2>3. Cookies and Tracking Technologies</h2>
        <p>Our website uses cookies and similar tracking technologies:</p>
        <ul>
          <li>
            <strong>Essential cookies:</strong> Required for the website to function properly
          </li>
          <li>
            <strong>Analytics cookies:</strong> We use Google Analytics 4 to understand how visitors
            interact with our website. Google Analytics collects anonymized data about page views,
            session duration, and traffic sources
          </li>
          <li>
            <strong>Advertising cookies:</strong> We use Google AdSense which may place cookies to
            serve personalized advertisements based on your browsing history
          </li>
          <li>
            <strong>Affiliate tracking cookies:</strong> When you click on affiliate links, the
            partner website may place cookies to track your visit and any subsequent actions
          </li>
        </ul>
        <p>
          You can control cookies through your browser settings. Disabling cookies may affect certain
          website functionality.
        </p>

        <h2>4. Affiliate Links and Third-Party Websites</h2>
        <p>
          Our website contains affiliate links to third-party product and service providers. When you
          click on these links, you will be redirected to the partner&apos;s website, which has its
          own privacy policy and data practices. We are not responsible for the privacy practices of
          these third-party websites.
        </p>
        <p>
          We recommend reading the privacy policies of any third-party website you visit through our
          links before providing any personal information.
        </p>

        <h2>5. Google AdSense</h2>
        <p>
          We use Google AdSense to display advertisements on our website. Google AdSense may use
          cookies and web beacons to collect information about your visits to this and other websites
          to provide relevant advertisements. You can opt out of personalized advertising by visiting{' '}
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
            Google Ads Settings
          </a>
          .
        </p>

        <h2>6. Data Security</h2>
        <p>
          We implement appropriate technical and organizational security measures to protect your
          information. However, no method of transmission over the Internet is 100% secure, and we
          cannot guarantee absolute security of your data.
        </p>

        <h2>7. Children&apos;s Privacy</h2>
        <p>
          Our website is not directed to children under the age of 18. We do not knowingly collect
          personal information from children. If you believe we have collected information from a
          child, please contact us immediately.
        </p>

        <h2>8. Your Rights</h2>
        <p>Under applicable Indian data protection laws, you have the right to:</p>
        <ul>
          <li>Access the personal information we hold about you</li>
          <li>Request correction of inaccurate information</li>
          <li>Request deletion of your personal information</li>
          <li>Withdraw consent for data processing</li>
          <li>Lodge a complaint with the relevant data protection authority</li>
        </ul>

        <h2>9. Data Retention</h2>
        <p>
          We retain your personal information only for as long as necessary to fulfill the purposes
          described in this policy. Analytics data is retained in anonymized form. Contact form
          submissions are retained for up to 12 months unless you request earlier deletion.
        </p>

        <h2>10. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. The updated version will be indicated
          by the &quot;Last updated&quot; date at the top of this page. We encourage you to review
          this policy periodically.
        </p>

        <h2>11. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at:
        </p>
        <ul>
          <li>
            Email:{' '}
            <a href="mailto:contact@indiabestproducts.com">contact@indiabestproducts.com</a>
          </li>
          <li>Website: indiabestproducts.com</li>
        </ul>
      </article>
    </div>
  );
}
