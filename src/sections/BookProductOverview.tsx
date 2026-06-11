import { useState } from 'react'

interface Props {
  overview: string[]
}

export default function BookProductOverview({ overview }: Props) {
  const [expanded, setExpanded] = useState(false)

  // Show first 2 paragraphs collapsed; all on expand
  const visible = expanded ? overview : overview.slice(0, 2)
  const hasMore = overview.length > 2

  return (
    <section className="bg-white border-t border-[#e4e7ec] py-12 lg:py-16">
      <div className="container-site">
        <div className="max-w-3xl">

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
              className="mt-5 flex items-center gap-2 font-body font-semibold text-sm text-[#023E7D] transition-colors group"
            >
              <span className="group-hover:underline underline">
                {expanded ? 'Read less' : 'Read more'}
              </span>
              <i
                className={`fa-solid ${expanded ? 'fa-chevron-up' : 'fa-chevron-down'} text-xs`}
                aria-hidden="true"
              />
            </button>
          )}

        </div>
      </div>
    </section>
  )
}
