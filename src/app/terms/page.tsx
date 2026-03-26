import type { Metadata } from 'next';
import Breadcrumb from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: 'Terms of Service — IndiaBestProducts.com',
  description:
    'Terms of Service for IndiaBestProducts.com. Read the terms and conditions governing the use of our website.',
  alternates: {
    canonical: 'https://indiabestproducts.com/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Terms of Service' },
        ]}
      />

      <article className="prose prose-slate mt-6 max-w-none">
        <h1>Terms of Service</h1>
        <p className="text-sm text-slate-500">Last updated: March 26, 2026</p>

        <p>
          Welcome to IndiaBestProducts.com. By accessing or using our website, you agree to be bound
          by these Terms of Service. If you do not agree with any part of these terms, please do not
          use our website.
        </p>

        <h2>1. About Our Website</h2>
        <p>
          IndiaBestProducts.com is a product comparison and review website. We provide information,
          reviews, and comparisons of financial products (credit cards, loans, insurance, demat
          accounts), web hosting services, and gadgets available in India. Our content is for
          informational and educational purposes only.
        </p>

        <h2>2. Not Financial Advice</h2>
        <p>
          <strong>Important:</strong> The information on this website does not constitute financial,
          investment, tax, or legal advice. Our reviews and comparisons are based on publicly
          available information and our editorial assessment. You should always:
        </p>
        <ul>
          <li>Consult a qualified financial advisor before making financial decisions</li>
          <li>Read the official terms and conditions of any product before applying</li>
          <li>Verify current rates, fees, and features directly with the product provider</li>
          <li>Consider your own financial situation and needs before choosing any product</li>
        </ul>

        <h2>3. Accuracy of Information</h2>
        <p>
          We make every effort to ensure the accuracy of information on our website. However, product
          details, fees, interest rates, and features change frequently. We cannot guarantee that all
          information is current or error-free at all times. If you notice any incorrect information,
          please contact us at corrections@indiabestproducts.com.
        </p>

        <h2>4. Affiliate Relationships</h2>
        <p>
          IndiaBestProducts.com participates in affiliate marketing programs. When you click on
          certain links and apply for or purchase a product, we may earn a commission from the
          product provider. This does not affect the price you pay or the terms you receive. For full
          details, see our{' '}
          <a href="/disclaimer">Affiliate Disclaimer</a>.
        </p>

        <h2>5. Intellectual Property</h2>
        <p>
          All content on this website, including text, graphics, logos, icons, and design, is the
          property of IndiaBestProducts.com or its content suppliers and is protected by Indian and
          international copyright laws. You may not:
        </p>
        <ul>
          <li>Copy, reproduce, or distribute our content without written permission</li>
          <li>Use our content for commercial purposes without authorization</li>
          <li>Modify or create derivative works based on our content</li>
          <li>Remove any copyright or proprietary notices from our content</li>
        </ul>

        <h2>6. User Conduct</h2>
        <p>When using our website, you agree not to:</p>
        <ul>
          <li>Use the website for any unlawful purpose</li>
          <li>Attempt to gain unauthorized access to our systems</li>
          <li>Interfere with the proper functioning of the website</li>
          <li>Transmit any viruses, malware, or harmful code</li>
          <li>Scrape, crawl, or extract data from our website without permission</li>
          <li>Impersonate any person or entity</li>
        </ul>

        <h2>7. Third-Party Links</h2>
        <p>
          Our website contains links to third-party websites. We are not responsible for the content,
          accuracy, or practices of these external sites. Linking to a third-party website does not
          imply endorsement of that site or its products. You visit third-party websites at your own
          risk.
        </p>

        <h2>8. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by Indian law, IndiaBestProducts.com shall not be liable
          for any direct, indirect, incidental, consequential, or special damages arising from:
        </p>
        <ul>
          <li>Your use of or inability to use our website</li>
          <li>Any decision made based on information on our website</li>
          <li>Any product or service purchased through links on our website</li>
          <li>Unauthorized access to your data</li>
          <li>Errors or omissions in our content</li>
        </ul>

        <h2>9. Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless IndiaBestProducts.com, its team members, and
          affiliates from any claims, damages, losses, or expenses arising from your use of the
          website or violation of these terms.
        </p>

        <h2>10. Modifications</h2>
        <p>
          We reserve the right to modify these Terms of Service at any time. Changes will be
          effective immediately upon posting on this page. Your continued use of the website after
          changes constitutes acceptance of the modified terms.
        </p>

        <h2>11. Governing Law</h2>
        <p>
          These Terms of Service are governed by and construed in accordance with the laws of India.
          Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the
          courts in India.
        </p>

        <h2>12. Severability</h2>
        <p>
          If any provision of these terms is found to be unenforceable or invalid, that provision
          shall be limited or eliminated to the minimum extent necessary, and the remaining
          provisions shall continue in full force and effect.
        </p>

        <h2>13. Contact</h2>
        <p>
          For questions about these Terms of Service, please contact us at:
        </p>
        <ul>
          <li>
            Email: <a href="mailto:contact@indiabestproducts.com">contact@indiabestproducts.com</a>
          </li>
        </ul>
      </article>
    </div>
  );
}
