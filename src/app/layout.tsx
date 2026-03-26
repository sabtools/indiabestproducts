import type { Metadata } from "next";

import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "IndiaBestProducts.com - Best Credit Cards, Loans & Products in India",
  description:
    "Compare and find the best credit cards, personal loans, health insurance, demat accounts, web hosting, and gadgets in India. Expert reviews, honest ratings, and zero bias. Updated for 2026.",
  keywords: [
    "best credit cards India",
    "personal loan comparison",
    "health insurance India",
    "demat account comparison",
    "best web hosting India",
    "product reviews India",
    "credit card comparison",
    "loan comparison India",
    "best financial products India",
    "IndiaBestProducts",
  ],
  authors: [{ name: "IndiaBestProducts.com" }],
  creator: "IndiaBestProducts.com",
  publisher: "IndiaBestProducts.com",
  metadataBase: new URL("https://indiabestproducts.com"),
  alternates: {
    canonical: "https://indiabestproducts.com",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://indiabestproducts.com",
    siteName: "IndiaBestProducts.com",
    title: "IndiaBestProducts.com - Best Credit Cards, Loans & Products in India",
    description:
      "Compare and find the best credit cards, personal loans, health insurance, demat accounts, and more in India. Expert reviews and honest ratings.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "IndiaBestProducts.com - Best Products in India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IndiaBestProducts.com - Best Credit Cards, Loans & Products in India",
    description:
      "Compare and find the best credit cards, personal loans, health insurance, demat accounts, and more in India.",
    images: ["/og-image.png"],
  },
  verification: {
    google: "qYK2hDTTb9FMIhVr7Afp_Xa_sHM6RARfnouiCWe4Doc",
  },
  other: {
    "verify-admitad": "31653f6703",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "IndiaBestProducts.com",
  url: "https://indiabestproducts.com",
  logo: "https://indiabestproducts.com/logo.png",
  description:
    "India's trusted comparison platform for credit cards, loans, insurance, and financial products.",
  sameAs: [
    "https://twitter.com/indiabestprod",
    "https://facebook.com/indiabestproducts",
    "https://youtube.com/@indiabestproducts",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "contact@indiabestproducts.com",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "IndiaBestProducts.com",
  url: "https://indiabestproducts.com",
  description:
    "Compare and find the best credit cards, loans, insurance, and products in India.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate:
        "https://indiabestproducts.com/search?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        {/* WebSite Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
