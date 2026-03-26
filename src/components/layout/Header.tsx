"use client";

import { useState } from "react";
import Link from "next/link";

interface NavSubItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href: string;
  subItems: NavSubItem[];
}

const navItems: NavItem[] = [
  {
    label: "Credit Cards",
    href: "/credit-cards",
    subItems: [
      { label: "Best Credit Cards 2026", href: "/credit-cards/best" },
      { label: "Cashback Cards", href: "/credit-cards/cashback" },
      { label: "Travel Cards", href: "/credit-cards/travel" },
      { label: "Fuel Cards", href: "/credit-cards/fuel" },
      { label: "Rewards Cards", href: "/credit-cards/rewards" },
      { label: "No Annual Fee", href: "/credit-cards/no-annual-fee" },
      { label: "Credit Card Compare", href: "/credit-cards/compare" },
    ],
  },
  {
    label: "Loans",
    href: "/loans",
    subItems: [
      { label: "Personal Loans", href: "/loans/personal" },
      { label: "Home Loans", href: "/loans/home" },
      { label: "Business Loans", href: "/loans/business" },
      { label: "Education Loans", href: "/loans/education" },
      { label: "Gold Loans", href: "/loans/gold" },
      { label: "Loan EMI Calculator", href: "/loans/emi-calculator" },
    ],
  },
  {
    label: "Insurance",
    href: "/insurance",
    subItems: [
      { label: "Health Insurance", href: "/insurance/health" },
      { label: "Term Life Insurance", href: "/insurance/term-life" },
      { label: "Car Insurance", href: "/insurance/car" },
      { label: "Bike Insurance", href: "/insurance/bike" },
      { label: "Travel Insurance", href: "/insurance/travel" },
    ],
  },
  {
    label: "Demat",
    href: "/demat-accounts",
    subItems: [
      { label: "Best Demat Accounts", href: "/demat-accounts/best" },
      { label: "Zerodha Review", href: "/demat-accounts/zerodha" },
      { label: "Groww Review", href: "/demat-accounts/groww" },
      { label: "Upstox Review", href: "/demat-accounts/upstox" },
      { label: "Angel One Review", href: "/demat-accounts/angel-one" },
    ],
  },
  {
    label: "Hosting",
    href: "/web-hosting",
    subItems: [
      { label: "Best Web Hosting India", href: "/web-hosting/best" },
      { label: "WordPress Hosting", href: "/web-hosting/wordpress" },
      { label: "VPS Hosting", href: "/web-hosting/vps" },
      { label: "Cloud Hosting", href: "/web-hosting/cloud" },
      { label: "Domain Registration", href: "/web-hosting/domains" },
    ],
  },
  {
    label: "Gadgets",
    href: "/gadgets",
    subItems: [
      { label: "Best Laptops", href: "/gadgets/laptops" },
      { label: "Best Smartphones", href: "/gadgets/smartphones" },
      { label: "Best Earbuds", href: "/gadgets/earbuds" },
      { label: "Best Smartwatches", href: "/gadgets/smartwatches" },
      { label: "Best Tablets", href: "/gadgets/tablets" },
    ],
  },
  {
    label: "Blog",
    href: "/blog",
    subItems: [
      { label: "Latest Articles", href: "/blog" },
      { label: "Credit Card Tips", href: "/blog/credit-card-tips" },
      { label: "Personal Finance", href: "/blog/personal-finance" },
      { label: "Investment Guide", href: "/blog/investment-guide" },
    ],
  },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);

  const toggleMobileDropdown = (label: string) => {
    setOpenMobileDropdown(openMobileDropdown === label ? null : label);
  };

  return (
    <header className="site-header">
      <div className="container-main h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 shrink-0">
            <span className="text-xl font-extrabold tracking-tight">
              <span style={{ color: "var(--color-primary)" }}>India</span>
              <span style={{ color: "var(--color-text)" }}>Best</span>
              <span style={{ color: "var(--color-primary)" }}>Products</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div key={item.label} className="nav-dropdown">
                <Link
                  href={item.href}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors"
                  style={{ color: "var(--color-text-secondary)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--color-primary)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--color-text-secondary)")
                  }
                >
                  {item.label}
                  <svg
                    className="w-3.5 h-3.5 opacity-50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </Link>
                <div className="nav-dropdown-menu">
                  {item.subItems.map((sub) => (
                    <Link key={sub.href} href={sub.href}>
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            style={{ color: "var(--color-text)" }}
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden absolute top-full left-0 right-0 border-b max-h-[80vh] overflow-y-auto"
          style={{
            backgroundColor: "var(--color-bg)",
            borderColor: "var(--color-border)",
            boxShadow: "var(--shadow-lg)",
          }}
        >
          <div className="container-main py-4">
            {navItems.map((item) => (
              <div key={item.label} className="border-b" style={{ borderColor: "var(--color-border-light)" }}>
                <button
                  className="w-full flex items-center justify-between py-3 text-sm font-medium"
                  style={{ color: "var(--color-text)" }}
                  onClick={() => toggleMobileDropdown(item.label)}
                >
                  {item.label}
                  <svg
                    className="w-4 h-4 transition-transform"
                    style={{
                      transform: openMobileDropdown === item.label ? "rotate(180deg)" : "rotate(0deg)",
                      color: "var(--color-text-muted)",
                    }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openMobileDropdown === item.label && (
                  <div className="pb-3 pl-4">
                    {item.subItems.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="block py-2 text-sm"
                        style={{ color: "var(--color-text-secondary)" }}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
