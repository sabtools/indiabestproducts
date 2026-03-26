'use client';

interface FAQ {
  q: string;
  a: string;
}

interface Props {
  faqs: FAQ[];
}

export default function FAQSection({ faqs }: Props) {
  return (
    <div className="faq-accordion">
      {faqs.map((faq, i) => (
        <details key={i} className="faq-item group">
          <summary className="faq-question">
            {faq.q}
            <span className="faq-question-icon group-open:rotate-180 transition-transform">
              &#9660;
            </span>
          </summary>
          <div className="faq-answer-inner">{faq.a}</div>
        </details>
      ))}
    </div>
  );
}
