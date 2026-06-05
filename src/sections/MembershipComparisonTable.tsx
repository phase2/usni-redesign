function CheckIcon() {
  return (
    <svg className="w-6 h-6 text-[#0466c8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}

type CellValue = boolean | string | null

interface TableRow {
  label: string
  digital: CellValue
  full: CellValue
  student: CellValue
  life: CellValue
}

interface TableGroup {
  heading: string
  rows: TableRow[]
}

const tableData: TableGroup[] = [
  {
    heading: 'Core Access',
    rows: [
      { label: 'Full USNI.org', digital: true, full: true, student: true, life: true },
      { label: 'Digital Proceedings', digital: true, full: true, student: true, life: true },
      { label: 'Interactive flippable PDF', digital: true, full: true, student: true, life: true },
      { label: 'Print edition of Proceedings', digital: false, full: true, student: true, life: true },
      { label: '150+ years of archives', digital: false, full: true, student: true, life: true },
    ],
  },
  {
    heading: 'Discounts & Perks',
    rows: [
      { label: "20% off Ship's Store", digital: true, full: true, student: true, life: true },
      { label: 'Up to 40% off NI Press', digital: true, full: true, student: true, life: true },
      { label: '28% off Naval History Mag.', digital: true, full: true, student: true, life: true },
      { label: 'Sea Scroll newsletter', digital: false, full: true, student: true, life: true },
      { label: 'Conference invitations + WEST', digital: false, full: true, student: true, life: true },
    ],
  },
  {
    heading: 'Life Member Gifts',
    rows: [
      { label: 'Fleece pullover + cap + patch + pin', digital: false, full: false, student: false, life: true },
      { label: 'No renewal notices, ever', digital: false, full: false, student: false, life: true },
    ],
  },
  {
    heading: 'Pricing',
    rows: [
      { label: '3-year option', digital: true, full: true, student: false, life: false },
      { label: 'International option', digital: false, full: true, student: true, life: false },
      { label: 'Gift membership available', digital: true, full: true, student: true, life: true },
    ],
  },
]

function Cell({ value, highlight }: { value: CellValue; highlight?: boolean }) {
  const tdClass = `px-4 py-3 text-center align-middle${highlight ? ' bg-[#ffec99]' : ''}`
  if (value === true) {
    return (
      <td className={tdClass}>
        <div className="flex items-center justify-center">
          <CheckIcon />
        </div>
      </td>
    )
  }
  return (
    <td className={`${tdClass} font-body text-base text-neutral-subtle`}>
      —
    </td>
  )
}

export default function MembershipComparisonTable() {
  return (
    <section className="bg-[#ebf4ff] py-section">
      <div className="container-site">
        <h2 className="font-headline text-4xl lg:text-[56px] text-navy-bolder leading-[1.1] mb-8">
          Compare member benefits
        </h2>

        <div className="border border-navy-bolder overflow-x-auto">
          <table className="w-full border-collapse">
            {/* Table header */}
            <thead>
              <tr className="bg-navy-boldest">
                <th className="text-left w-[52%] border-b border-navy-bolder" />
                <th className="w-[12%] border-b border-l border-navy-bolder py-3 px-2">
                  <div className="font-headline text-xl text-white text-center leading-[1.2]">Digital</div>
                  <div className="font-body font-bold text-base text-[#ffec99] text-center">$45/yr</div>
                </th>
                <th className="w-[9%] bg-[#ffec99] border-b border-l border-navy-bolder py-3 px-2">
                  <div className="font-headline text-xl text-navy-bolder text-center leading-[1.2]">Full</div>
                  <div className="font-body font-bold text-base text-navy-subtle text-center">$75/yr</div>
                </th>
                <th className="w-[14%] border-b border-l border-navy-bolder py-3 px-2">
                  <div className="font-headline text-xl text-white text-center leading-[1.2]">Student</div>
                  <div className="font-body font-bold text-base text-[#ffec99] text-center">$20/yr</div>
                </th>
                <th className="w-[13%] border-b border-l border-navy-bolder py-3 px-2">
                  <div className="font-headline text-xl text-white text-center leading-[1.2]">Life</div>
                  <div className="font-body font-bold text-base text-[#ffec99] text-center">$1,873 once</div>
                </th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {tableData.map((group) => (
                <>
                  {/* Group heading row */}
                  <tr key={group.heading} className="border-b border-[#c4c9d4]">
                    <td colSpan={5} className="bg-[#f4f4f6] px-4 py-4">
                      <span className="font-headline text-xl text-navy-bolder">{group.heading}</span>
                    </td>
                  </tr>

                  {/* Data rows */}
                  {group.rows.map((row) => (
                    <tr key={row.label} className="border-b border-[#c4c9d4] last:border-0">
                      <td className="px-3.5 py-2 font-body text-base text-navy-bolder">
                        {row.label}
                      </td>
                      <Cell value={row.digital} />
                      <Cell value={row.full} highlight />
                      <Cell value={row.student} />
                      <Cell value={row.life} />
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
