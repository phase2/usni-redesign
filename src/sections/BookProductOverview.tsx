import { useState } from 'react'
import type { BookProductData } from '@/data/bookProductData'

interface Props {
  overview: string[]
  book: BookProductData
}

export default function BookProductOverview({ overview, book }: Props) {
  const [expanded, setExpanded] = useState(false)

  const visible = expanded ? overview : overview.slice(0, 2)
  const hasMore = overview.length > 2

  const format = book.formats[0]

  const rows = [
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
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px] gap-12 lg:gap-16 items-start">

          {/* Left — overview */}
          <div>
            <h2 className="font-headline text-2xl lg:text-3xl text-navy-bolder mb-6">
              Overview
            </h2>
            <div className="flex flex-col gap-4">
              {visible.map((para, i) => (
                <p key={i} className="font-body text-base text-neutral-subtle leading-[1.75]">
                  {para}
                </p>
              ))}
            </div>
            {hasMore && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="mt-5 flex items-center gap-2 font-body font-semibold text-sm text-[#023E7D] group"
              >
                <span className="group-hover:underline underline">
                  {expanded ? 'Read less' : 'Read more'}
                </span>
                <i
                  className={`fa-solid ${expanded ? 'fa-chevron-up' : 'fa-chevron-down'} text-sm`}
                  aria-hidden="true"
                />
              </button>
            )}
          </div>

          {/* Right — product details */}
          <div>
            <h2 className="font-headline text-2xl text-navy-bolder mb-5">
              Product Details
            </h2>
            <table className="w-full border-collapse">
              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? 'bg-[#f9f9f7]' : 'bg-white'}>
                    <td className="py-3 px-3 w-[140px]">
                      <div className="flex items-center gap-2.5">
                        <i
                          className={`fa-solid ${row.icon} text-[13px] text-neutral-subtle w-4 text-center flex-shrink-0`}
                          aria-hidden="true"
                        />
                        <span className="font-body font-semibold text-sm text-navy-bolder">
                          {row.label}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      {row.isLink && row.href ? (
                        <a href={row.href} className="font-body text-sm text-[#023E7D] underline hover:no-underline">
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

        </div>
      </div>
    </section>
  )
}
