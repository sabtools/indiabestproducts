interface ProsConsProps {
  pros: string[];
  cons: string[];
}

export default function ProsCons({ pros, cons }: ProsConsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Pros */}
      <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-5">
        <h4 className="mb-3 flex items-center gap-2 text-base font-bold text-emerald-800">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-xs text-white">
            &#10003;
          </span>
          Pros
        </h4>
        <ul className="space-y-2">
          {pros.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
              <span className="mt-0.5 shrink-0 text-emerald-500">&#10004;</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Cons */}
      <div className="rounded-xl border border-red-200 bg-red-50/50 p-5">
        <h4 className="mb-3 flex items-center gap-2 text-base font-bold text-red-800">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs text-white">
            &#10007;
          </span>
          Cons
        </h4>
        <ul className="space-y-2">
          {cons.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
              <span className="mt-0.5 shrink-0 text-red-500">&#10008;</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
