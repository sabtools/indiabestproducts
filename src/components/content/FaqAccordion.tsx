'use client';

import { useState } from 'react';
import type { FAQ } from '@/lib/types';
import JsonLd from '@/components/seo/JsonLd';

interface FaqAccordionProps {
  items: FAQ[];
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section>
      <JsonLd data={faqSchema} />
      <div className="divide-y divide-slate-200 rounded-xl border border-slate-200">
        {items.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} className="group">
              <button
                type="button"
                onClick={() => toggle(i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-slate-50"
                aria-expanded={isOpen}
              >
                <span className="text-base font-semibold text-slate-800">{item.question}</span>
                <span
                  className={`shrink-0 text-xl leading-none text-slate-400 transition-transform duration-200 ${
                    isOpen ? 'rotate-45' : ''
                  }`}
                >
                  +
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-200 ${
                  isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-5 pb-4 text-sm leading-relaxed text-slate-600">
                  {item.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
