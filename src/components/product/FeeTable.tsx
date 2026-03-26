interface FeeTableProps {
  fees: { label: string; value: string }[];
  title?: string;
}

export default function FeeTable({ fees, title = 'Fees & Charges' }: FeeTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200">
      {title && (
        <div className="border-b border-slate-200 bg-slate-50 px-5 py-3">
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-600">{title}</h4>
        </div>
      )}
      <table className="w-full text-sm">
        <tbody>
          {fees.map((fee, i) => (
            <tr
              key={i}
              className={`border-b border-slate-100 last:border-b-0 ${
                i % 2 === 1 ? 'bg-slate-50/60' : 'bg-white'
              }`}
            >
              <td className="px-5 py-3 font-medium text-slate-600">{fee.label}</td>
              <td className="px-5 py-3 text-right font-semibold text-slate-900">{fee.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
