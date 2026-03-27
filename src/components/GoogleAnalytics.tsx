"use client";

import Script from "next/script";

// TODO: Replace with your IndiaBestProducts GA4 Measurement ID
const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";

export default function GoogleAnalytics() {
  if (GA_MEASUREMENT_ID === "G-XXXXXXXXXX") return null; // Skip until configured

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_title: document.title,
            send_page_view: true,
          });
        `}
      </Script>
    </>
  );
}
