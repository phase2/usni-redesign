import { useState } from 'react'
import { bookDetailRows, type BookProductData } from '@/data/bookProductData'

interface Props {
  book: BookProductData
}

export default function BookProductDetails({ book }: Props) {
  const [isOpen, setIsOpen] = useState(true)

  const rows = bookDetailRows(book)

  return (
    <section className="bg-white border-t border-[#e4e7ec] py-12 lg:py-16">
      <div className="container-site">

        {/* Accordion header */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="accordion-row w-full flex items-center justify-between px-4 py-4 border-b border-[#e4e7ec]"
          aria-expanded={isOpen}
        >
          <h2 className="font-headline text-2xl lg:text-3xl text-navy-bolder">
            Product Details
          </h2>
          <span className="text-neutral-subtle transition-colors text-xl font-light leading-none">
            {isOpen ? '−' : '+'}
          </span>
        </button>

        {/* Accordion body */}
        {isOpen && (
          <div className="mt-6">
            <table className="w-full border-collapse">
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={row.label}
                    className={i % 2 === 0 ? 'bg-[#f9f9f7]' : 'bg-white'}
                  >
                    <td className="py-3.5 px-4 w-[280px] lg:w-[340px]">
                      <div className="flex items-center gap-3">
                        <i
                          className={`fa-solid ${row.icon} text-[15px] text-neutral-subtle w-5 text-center flex-shrink-0`}
                          aria-hidden="true"
                        />
                        <span className="font-body font-semibold text-sm text-navy-bolder">
                          {row.label}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      {row.href ? (
                        <a
                          href={row.href}
                          className="font-body text-sm text-link"
                        >
                          {row.value}
                        </a>
                      ) : (
                        <span className="font-body text-sm text-neutral-subtle">{row.value}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </section>
  )
}
