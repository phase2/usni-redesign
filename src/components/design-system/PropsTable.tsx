interface PropRow {
  name: string
  type: string
  default?: string
  description: string
}

interface PropsTableProps {
  rows: PropRow[]
}

export default function PropsTable({ rows }: PropsTableProps) {
  return (
    <div className="overflow-x-auto border border-border-light">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-neutral-subtlest border-b border-border-light">
            <th className="font-body font-bold text-xs uppercase tracking-[0.06em] text-navy-bolder px-4 py-3">Prop</th>
            <th className="font-body font-bold text-xs uppercase tracking-[0.06em] text-navy-bolder px-4 py-3">Type</th>
            <th className="font-body font-bold text-xs uppercase tracking-[0.06em] text-navy-bolder px-4 py-3">Default</th>
            <th className="font-body font-bold text-xs uppercase tracking-[0.06em] text-navy-bolder px-4 py-3">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name} className="border-b border-border-light last:border-b-0">
              <td className="font-mono text-sm text-navy-subtle px-4 py-3 align-top whitespace-nowrap">{row.name}</td>
              <td className="font-mono text-xs text-neutral-subtle px-4 py-3 align-top whitespace-nowrap">{row.type}</td>
              <td className="font-mono text-xs text-neutral-subtle px-4 py-3 align-top whitespace-nowrap">{row.default ?? '—'}</td>
              <td className="font-body text-sm text-neutral-subtle px-4 py-3 align-top">{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
