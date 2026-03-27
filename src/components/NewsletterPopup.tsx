"use client";

import { useState, useEffect } from "react";

export default function NewsletterPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if already subscribed
    if (localStorage.getItem("newsletter_subscribed") === "true") {
      setSubscribed(true);
      return;
    }

    // Check if dismissed within 7 days
    const dismissedAt = localStorage.getItem("newsletter_dismissed_at");
    if (dismissedAt) {
      const sevenDays = 7 * 24 * 60 * 60 * 1000;
      if (Date.now() - parseInt(dismissedAt, 10) < sevenDays) {
        return;
      }
    }

    // Show after 5 seconds
    const timer = setTimeout(() => setVisible(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    localStorage.setItem("newsletter_dismissed_at", Date.now().toString());
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Store email in localStorage (backend integration later)
    const emails = JSON.parse(localStorage.getItem("newsletter_emails") || "[]");
    emails.push({ email, date: new Date().toISOString() });
    localStorage.setItem("newsletter_emails", JSON.stringify(emails));
    localStorage.setItem("newsletter_subscribed", "true");
    setSubscribed(true);
  };

  if (!visible) return null;

  return (
    <div className="newsletter-popup">
      <div className="newsletter-popup-inner">
        {subscribed ? (
          <div className="newsletter-success">
            <svg className="w-6 h-6" style={{ color: "#16a34a" }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <p style={{ fontWeight: 600, fontSize: "1rem" }}>You&apos;re subscribed! We&apos;ll send you the best deals.</p>
            <button onClick={() => setVisible(false)} className="newsletter-close-btn" aria-label="Close">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <>
            <button onClick={handleDismiss} className="newsletter-close-btn" aria-label="Close newsletter popup">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="newsletter-content">
              <div className="newsletter-icon">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="newsletter-heading">Get the Best Deals in Your Inbox</h3>
                <p className="newsletter-subtext">Weekly picks on credit cards, gadgets & exclusive offers. No spam.</p>
              </div>
            </div>
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="newsletter-input"
                autoComplete="email"
              />
              <button type="submit" className="newsletter-submit-btn">Subscribe</button>
            </form>
            {error && <p className="newsletter-error">{error}</p>}
          </>
        )}
      </div>
    </div>
  );
}
