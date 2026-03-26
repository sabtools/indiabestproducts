import Link from "next/link";

interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

const footerColumns: FooterColumn[] = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "How We Rate", href: "/methodology" },
      { label: "Blog", href: "/blog" },
      { label: "Contact Us", href: "/contact" },
      { label: "Advertise With Us", href: "/advertise" },
    ],
  },
  {
    title: "Credit Cards",
    links: [
      { label: "Best Credit Cards 2026", href: "/credit-cards/best" },
      { label: "Cashback Credit Cards", href: "/credit-cards/cashback" },
      { label: "Travel Credit Cards", href: "/credit-cards/travel" },
      { label: "Fuel Credit Cards", href: "/credit-cards/fuel" },
      { label: "Rewards Credit Cards", href: "/credit-cards/rewards" },
      { label: "No Annual Fee Cards", href: "/credit-cards/no-annual-fee" },
      { label: "Credit Card Compare", href: "/credit-cards/compare" },
    ],
  },
  {
    title: "Loans & Insurance",
    links: [
      { label: "Personal Loans", href: "/loans/personal" },
      { label: "Home Loans", href: "/loans/home" },
      { label: "Business Loans", href: "/loans/business" },
      { label: "Health Insurance", href: "/insurance/health" },
      { label: "Term Life Insurance", href: "/insurance/term-life" },
      { label: "Car Insurance", href: "/insurance/car" },
      { label: "EMI Calculator", href: "/loans/emi-calculator" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Demat Accounts", href: "/demat-accounts" },
      { label: "Web Hosting", href: "/web-hosting" },
      { label: "Best Laptops", href: "/gadgets/laptops" },
      { label: "Best Smartphones", href: "/gadgets/smartphones" },
      { label: "Personal Finance Tips", href: "/blog/personal-finance" },
      { label: "Investment Guide", href: "/blog/investment-guide" },
    ],
  },
];

const bottomLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-main">
        {/* Footer Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                {column.title}
              </h3>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm leading-relaxed">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div
          className="mt-10 pt-6 text-xs leading-relaxed"
          style={{ borderTop: "1px solid #1e293b", color: "#64748b" }}
        >
          <p>
            <strong className="text-slate-400">Disclaimer:</strong>{" "}
            IndiaBestProducts.com is an independent review and comparison
            platform. We may earn affiliate commissions when you apply through
            our links. This does not influence our ratings or reviews. All
            product information is provided for general informational purposes
            only. Please verify details directly with the product provider before
            making any financial decisions.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-sm" style={{ color: "#64748b" }}>
              &copy; 2026 IndiaBestProducts.com. All rights reserved.
            </p>

            {/* Bottom Links */}
            <div className="flex items-center gap-4">
              {bottomLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs"
                  style={{ color: "#64748b" }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {/* Twitter / X */}
              <a
                href="https://twitter.com/indiabestprod"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                style={{ backgroundColor: "#1e293b", color: "#94a3b8" }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* Facebook */}
              <a
                href="https://facebook.com/indiabestproducts"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                style={{ backgroundColor: "#1e293b", color: "#94a3b8" }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              {/* YouTube */}
              <a
                href="https://youtube.com/@indiabestproducts"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                style={{ backgroundColor: "#1e293b", color: "#94a3b8" }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
