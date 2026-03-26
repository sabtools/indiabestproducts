"use client";

import { useState } from "react";
import Link from "next/link";

/* ─── Data ─── */

const trustBadges = [
  { value: "500+", label: "Products Reviewed" },
  { value: "100%", label: "Free to Use" },
  { value: "Mar 2026", label: "Last Updated" },
  { value: "4.8/5", label: "Expert Ratings" },
];

interface CategoryItem {
  icon: string;
  bgColor: string;
  title: string;
  description: string;
  href: string;
}

const categories: CategoryItem[] = [
  {
    icon: "\uD83D\uDCB3",
    bgColor: "#eff6ff",
    title: "Credit Cards",
    description:
      "Compare cashback, travel, fuel & rewards cards from top banks in India.",
    href: "/credit-cards",
  },
  {
    icon: "\uD83C\uDFE6",
    bgColor: "#f0fdf4",
    title: "Personal Loans",
    description:
      "Find the lowest interest rates and fastest approval personal loans.",
    href: "/loans/personal",
  },
  {
    icon: "\uD83C\uDFE5",
    bgColor: "#fef2f2",
    title: "Health Insurance",
    description:
      "Compare family and individual health plans from top insurers.",
    href: "/insurance/health",
  },
  {
    icon: "\uD83D\uDCC8",
    bgColor: "#fefce8",
    title: "Demat Accounts",
    description:
      "Open the best demat account with low brokerage and top features.",
    href: "/demat-accounts",
  },
  {
    icon: "\uD83C\uDF10",
    bgColor: "#f5f3ff",
    title: "Web Hosting",
    description:
      "Best shared, VPS & cloud hosting providers for Indian websites.",
    href: "/web-hosting",
  },
  {
    icon: "\uD83D\uDCBB",
    bgColor: "#fdf4ff",
    title: "Laptops",
    description:
      "Top-rated laptops for students, professionals & gamers in India.",
    href: "/gadgets/laptops",
  },
];

interface TopPick {
  name: string;
  bank: string;
  rating: number;
  features: string[];
  badge?: string;
  href: string;
}

const topPicks: TopPick[] = [
  {
    name: "HDFC Regalia Gold",
    bank: "HDFC Bank",
    rating: 4.8,
    features: [
      "Airport lounge access worldwide",
      "4X reward points on travel & dining",
      "Complimentary golf games",
      "Fuel surcharge waiver",
    ],
    badge: "Editor's Choice",
    href: "/credit-cards/hdfc-regalia-gold",
  },
  {
    name: "SBI SimplyCLICK",
    bank: "SBI Card",
    rating: 4.5,
    features: [
      "10X rewards on partner brands",
      "Welcome gift worth Rs 500",
      "Low annual fee of Rs 499",
      "Amazon & Flipkart cashback",
    ],
    href: "/credit-cards/sbi-simplyclick",
  },
  {
    name: "Axis Ace Credit Card",
    bank: "Axis Bank",
    rating: 4.6,
    features: [
      "5% cashback on bill payments",
      "Lifetime free card",
      "Google Pay & Swiggy rewards",
      "No minimum spend requirement",
    ],
    badge: "Best Value",
    href: "/credit-cards/axis-ace",
  },
];

const steps = [
  {
    number: 1,
    title: "Browse & Compare",
    description:
      "Explore our curated categories and compare products side-by-side with detailed feature breakdowns.",
  },
  {
    number: 2,
    title: "Read Expert Reviews",
    description:
      "Get insights from our in-depth reviews, ratings, pros & cons to make an informed decision.",
  },
  {
    number: 3,
    title: "Apply & Save",
    description:
      "Apply through our links for exclusive offers. We earn a commission at no extra cost to you.",
  },
];

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  href: string;
  icon: string;
}

const blogPosts: BlogPost[] = [
  {
    title: "Best Credit Cards for Online Shopping in 2026",
    excerpt:
      "Maximize your online shopping rewards with these top-rated credit cards offering cashback and discounts.",
    date: "March 20, 2026",
    category: "Credit Cards",
    href: "/blog/best-credit-cards-online-shopping-2026",
    icon: "\uD83D\uDED2",
  },
  {
    title: "How to Choose the Right Health Insurance Plan",
    excerpt:
      "A step-by-step guide to selecting the best health insurance plan for you and your family in India.",
    date: "March 15, 2026",
    category: "Insurance",
    href: "/blog/choose-right-health-insurance",
    icon: "\uD83D\uDCC4",
  },
  {
    title: "Zerodha vs Groww: Which Demat Account is Better?",
    excerpt:
      "Detailed comparison of India's two most popular discount brokers across fees, features, and usability.",
    date: "March 10, 2026",
    category: "Demat",
    href: "/blog/zerodha-vs-groww-comparison",
    icon: "\uD83D\uDCC8",
  },
];

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "Is IndiaBestProducts.com free to use?",
    answer:
      "Yes, our platform is completely free for users. We earn through affiliate commissions when you apply for products through our links. This does not affect the price you pay or the products we recommend.",
  },
  {
    question: "How do you rate and review products?",
    answer:
      "Our expert team evaluates products based on multiple factors including features, pricing, customer reviews, brand reputation, and value for money. We maintain editorial independence and our ratings are not influenced by affiliate partnerships.",
  },
  {
    question: "Are your recommendations unbiased?",
    answer:
      "Absolutely. While we earn commissions from some product providers, our editorial team operates independently. We recommend products based on merit, not commission rates. Products that don't meet our quality standards are not listed, regardless of potential earnings.",
  },
  {
    question: "How often is the information updated?",
    answer:
      "We update our product listings, reviews, and comparisons regularly. Financial product details like interest rates and fees are checked monthly. Our team monitors changes from banks, insurers, and product providers to ensure accuracy.",
  },
];

/* ─── Stars helper ─── */

function RatingStars({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.3;
  return (
    <span className="rating-badge">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="rating-badge-star">
          {i < fullStars ? "\u2605" : i === fullStars && hasHalf ? "\u2605" : "\u2606"}
        </span>
      ))}
      <span className="rating-badge-score">{rating}</span>
      <span className="rating-badge-max">/5</span>
    </span>
  );
}

/* ─── FAQ Accordion ─── */

function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="faq-accordion">
      {items.map((item, index) => (
        <div
          key={index}
          className={`faq-item ${openIndex === index ? "open" : ""}`}
        >
          <button
            className="faq-question"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            aria-expanded={openIndex === index}
          >
            <span>{item.question}</span>
            <svg
              className="faq-question-icon"
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
          </button>
          <div className="faq-answer">
            <div className="faq-answer-inner">{item.answer}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Page ─── */

export default function HomePage() {
  return (
    <>
      {/* ══════ Hero Section ══════ */}
      <section className="hero-section">
        <div className="container-main relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-white mb-4" style={{ lineHeight: 1.2 }}>
              Find the Best Financial Products in India
            </h1>
            <p
              className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
              style={{ color: "rgba(255,255,255,0.85)" }}
            >
              Compare credit cards, loans, insurance &amp; more. Expert reviews,
              honest ratings, zero bias.
            </p>
            <Link href="/credit-cards" className="cta-button cta-button-lg" style={{ backgroundColor: "white", color: "var(--color-primary)" }}>
              Explore Credit Cards &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ══════ Trust Badges ══════ */}
      <section
        className="py-6 border-b"
        style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-alt)" }}
      >
        <div className="container-main">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges.map((badge) => (
              <div key={badge.label} className="trust-badge">
                <span className="trust-badge-value">{badge.value}</span>
                <span className="trust-badge-label">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ Featured Categories ══════ */}
      <section className="section-padding">
        <div className="container-main">
          <div className="section-header">
            <h2>Browse by Category</h2>
            <p>
              Explore our expert-reviewed categories to find the perfect product
              for your needs.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link key={cat.title} href={cat.href} className="category-card block">
                <div
                  className="category-card-icon"
                  style={{ backgroundColor: cat.bgColor }}
                >
                  {cat.icon}
                </div>
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ color: "var(--color-text)" }}
                >
                  {cat.title}
                </h3>
                <p
                  className="text-sm mb-4"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {cat.description}
                </p>
                <span
                  className="text-sm font-semibold"
                  style={{ color: "var(--color-primary)" }}
                >
                  View Best &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ Top Picks ══════ */}
      <section
        className="section-padding"
        style={{ backgroundColor: "var(--color-bg-alt)" }}
      >
        <div className="container-main">
          <div className="section-header">
            <h2>Top Picks for March 2026</h2>
            <p>
              Our experts&apos; favourite credit cards this month based on
              features, rewards, and value.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topPicks.map((pick) => (
              <div
                key={pick.name}
                className={`product-card ${pick.badge ? "product-card-featured" : ""}`}
              >
                {pick.badge && (
                  <span className="product-card-badge">{pick.badge}</span>
                )}
                <div className="mb-1">
                  <span
                    className="text-xs font-medium uppercase tracking-wider"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {pick.bank}
                  </span>
                </div>
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ color: "var(--color-text)" }}
                >
                  {pick.name}
                </h3>
                <div className="mb-4">
                  <RatingStars rating={pick.rating} />
                </div>
                <ul className="space-y-2 mb-6">
                  {pick.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      <span style={{ color: "var(--color-cta)" }}>&#10003;</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={pick.href}
                  className="cta-button cta-button-green w-full text-center"
                >
                  Apply Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ How It Works ══════ */}
      <section className="section-padding">
        <div className="container-main">
          <div className="section-header">
            <h2>How It Works</h2>
            <p>
              Finding the right financial product is simple with our
              three-step process.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step) => (
              <div key={step.number} className="step-card">
                <div className="step-number">{step.number}</div>
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ color: "var(--color-text)" }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-sm"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ Latest from Blog ══════ */}
      <section
        className="section-padding"
        style={{ backgroundColor: "var(--color-bg-alt)" }}
      >
        <div className="container-main">
          <div className="section-header">
            <h2>Latest from Our Blog</h2>
            <p>
              Stay informed with expert guides, tips, and product updates.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Link key={post.title} href={post.href} className="blog-card block">
                <div className="blog-card-image">{post.icon}</div>
                <div className="blog-card-body">
                  <span
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {post.category}
                  </span>
                  <h3
                    className="text-base font-bold mt-1 mb-2"
                    style={{ color: "var(--color-text)" }}
                  >
                    {post.title}
                  </h3>
                  <p
                    className="text-sm mb-3"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {post.excerpt}
                  </p>
                  <span
                    className="text-xs"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {post.date}
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/blog"
              className="cta-button cta-button-outline"
            >
              View All Articles &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ══════ SEO Content ══════ */}
      <section className="section-padding">
        <div className="container-main max-w-4xl">
          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: "var(--color-text)" }}
          >
            Your Trusted Guide to the Best Products in India
          </h2>
          <div
            className="space-y-4 text-base"
            style={{ color: "var(--color-text-secondary)", lineHeight: 1.8 }}
          >
            <p>
              IndiaBestProducts.com is India&apos;s comprehensive comparison and
              review platform designed to help you make smarter financial and
              purchasing decisions. Whether you are looking for a new credit card
              with the best rewards program, a personal loan with the lowest
              interest rate, or a health insurance plan that covers your entire
              family, we have you covered with detailed reviews, side-by-side
              comparisons, and expert ratings across hundreds of products.
            </p>
            <p>
              Our team of financial experts and product analysts thoroughly
              evaluates each product listed on our platform. We assess features,
              fees, customer support, user experience, and overall value for
              money to provide you with trustworthy and actionable insights. Our
              mission is to simplify the decision-making process so you can
              choose with confidence, save money, and get the most out of every
              product you select.
            </p>
          </div>
        </div>
      </section>

      {/* ══════ FAQ Section ══════ */}
      <section
        className="section-padding"
        style={{ backgroundColor: "var(--color-bg-alt)" }}
      >
        <div className="container-main max-w-3xl">
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
          </div>
          <FaqAccordion items={faqs} />
        </div>
      </section>
    </>
  );
}
