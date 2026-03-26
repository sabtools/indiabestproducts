import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="container-main text-center py-20">
        <h1
          className="text-7xl font-extrabold mb-4"
          style={{ color: "var(--color-primary)" }}
        >
          404
        </h1>
        <h2
          className="text-2xl font-bold mb-3"
          style={{ color: "var(--color-text)" }}
        >
          Page Not Found
        </h2>
        <p
          className="text-base mb-8 max-w-md mx-auto"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Sorry, the page you are looking for doesn&apos;t exist or has been
          moved. Let us help you find what you need.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/" className="cta-button cta-button-primary">
            Go to Homepage
          </Link>
          <Link href="/credit-cards" className="cta-button cta-button-outline">
            Browse Credit Cards
          </Link>
        </div>
      </div>
    </div>
  );
}
