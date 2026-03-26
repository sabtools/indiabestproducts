'use client';

import { useState } from 'react';

interface SpecsTableProps {
  specs: Record<string, string>;
  title?: string;
  defaultVisibleCount?: number;
}

export default function SpecsTable({
  specs,
  title = 'Specifications',
  defaultVisibleCount = 6,
}: SpecsTableProps) {
  const [expanded, setExpanded] = useState(false);
  const entries = Object.entries(specs);
  const visibleEntries = expanded ? entries : entries.slice(0, defaultVisibleCount);
  const hasMore = entries.length > defaultVisibleCount;

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      {title && (
        <div className="border-b border-slate-200 bg-slate-50 px-5 py-3">
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-600">
            {title}
          </h4>
        </div>
      )}
      <table className="w-full text-sm">
        <tbody>
          {visibleEntries.map(([key, value], i) => (
            <tr
              key={key}
              className={`border-b border-slate-100 last:border-b-0 ${
                i % 2 === 1 ? 'bg-slate-50/60' : 'bg-white'
              }`}
            >
              <td className="w-2/5 px-5 py-3 font-medium text-slate-600">{key}</td>
              <td className="px-5 py-3 text-slate-900">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {hasMore && (
        <div className="border-t border-slate-100 px-5 py-3 text-center">
          <button
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 transition-colors"
          >
            {expanded ? 'Show Less' : `Show All ${entries.length} Specs`}
            <span
              className={`inline-block transition-transform duration-200 ${
                expanded ? 'rotate-180' : ''
              }`}
              aria-hidden="true"
            >
              &#9660;
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
