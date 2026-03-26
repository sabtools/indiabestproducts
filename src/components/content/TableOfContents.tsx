'use client';

import { useEffect, useState } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: Heading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0.1 }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  const minLevel = Math.min(...headings.map((h) => h.level));

  return (
    <nav aria-label="Table of contents">
      {/* Mobile toggle */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 md:hidden"
      >
        Table of Contents
        <span className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          &#9660;
        </span>
      </button>

      {/* List */}
      <div
        className={`mt-2 md:sticky md:top-20 md:mt-0 ${
          isOpen ? 'block' : 'hidden md:block'
        }`}
      >
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h4 className="mb-3 hidden text-xs font-bold uppercase tracking-wider text-slate-400 md:block">
            On this page
          </h4>
          <ul className="space-y-1">
            {headings.map((h) => {
              const indent = (h.level - minLevel) * 12;
              const isActive = activeId === h.id;
              return (
                <li key={h.id} style={{ paddingLeft: `${indent}px` }}>
                  <a
                    href={`#${h.id}`}
                    onClick={() => setIsOpen(false)}
                    className={`block rounded px-2 py-1 text-sm transition-colors ${
                      isActive
                        ? 'bg-blue-50 font-semibold text-blue-700'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    {h.text}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
