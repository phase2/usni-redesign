import { useState } from 'react'
import type { BookProductData } from '@/data/bookProductData'

interface Row {
  icon: string
  label: string
  value: string
  isLink?: boolean
  href?: string
}

interface Props {
  book: BookProductData
}

export default function BookProductDetails({ book }: Props) {
  const [isOpen, setIsOpen] = useState(true)

  const format = book.formats[0]

  const rows: Row[] = [
    { icon: 'fa-barcode', label: 'ISBN-13', value: format.isbn },
    { icon: 'fa-building', label: 'Publisher', value: book.publisher, isLink: true, href: '/books/naval-institute-press' },
    { icon: 'fa-calendar-days', label: 'Publication Date', value: book.publishDate },
    ...(book.series
      ? [{ icon: 'fa-layer-group', label: 'Series', value: book.series.seriesName, isLink: true, href: book.series.href }]
      : []),
    { icon: 'fa-file-lines', label: 'Page Count', value: `${book.pageCount} pages` },
    { icon: 'fa-ruler-combined', label: 'Dimensions', value: book.dimensions },
  ]

  return (
    <section className="bg-white border-t border-[#e4e7ec] py-12 lg:py-16">
      <div className="container-site">

        {/* Accordion header */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between pb-5 border-b border-[#e4e7ec] group"
          aria-expanded={isOpen}
        >
          <h2 className="font-headline text-2xl lg:text-3xl text-navy-bolder">
            Product Details
          </h2>
          <span className="text-neutral-subtle group-hover:text-navy-bolder transition-colors text-xl font-light leading-none">
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
                      {row.isLink && row.href ? (
                        <a
                          href={row.href}
                          className="font-body text-sm text-[#023E7D] underline hover:no-underline"
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
