import { useState } from 'react'

export interface ArticleAuthor {
  name: string
  role: string
  bio: string
}

interface Props {
  authors: ArticleAuthor[]
  showDisclaimer?: boolean
}

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function ArticleAuthorBio({ authors, showDisclaimer = true }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = authors[activeIndex]
  const isMulti = authors.length > 1

  return (
    <section className="bg-white pb-12 lg:pb-16">
      <div className="container-site">

        {/* Disclaimer */}
        {showDisclaimer && (
          <div className="flex gap-3 items-start border-l-4 border-[#FFAA00] bg-[#FFF8D6] px-5 py-3.5 mb-4">
            <i className="fa-solid fa-circle-info text-[#1D2535] text-sm mt-[2px] flex-shrink-0" aria-hidden="true" />
            <div>
              <p className="font-body font-bold text-[11px] uppercase tracking-[0.08em] text-[#1D2535] mb-0.5">Disclaimer</p>
              <p className="font-body text-[12px] text-[#1D2535] leading-relaxed">
                The U.S. Naval Institute is a private, self-supporting, not-for-profit professional society that publishes Proceedings as part of the open forum it maintains for the Sea Services. The Naval Institute is not an agency of the U.S. government; the opinions expressed in these pages are the personal views of the authors.
              </p>
            </div>
          </div>
        )}

        <div style={{ backgroundColor: '#F7F7F2' }} className="px-8 lg:px-14 py-10 lg:py-14">

          <h2 className="font-headline text-2xl lg:text-3xl text-navy-bolder leading-[1.1] mb-6">
            About the {isMulti ? 'Authors' : 'Author'}
          </h2>

          {/* Tabs — only shown for multiple authors */}
          {isMulti && (
            <div className="flex flex-wrap gap-1 border-b border-navy-bolder/20 mb-8">
              {authors.map((author, i) => (
                <button
                  key={author.name}
                  onClick={() => setActiveIndex(i)}
                  className={`px-5 py-3 font-body font-semibold text-sm text-left sm:whitespace-nowrap border-b-2 -mb-px transition-colors
                    ${activeIndex === i
                      ? 'border-[#0466C8] text-navy-bolder bg-[#E0E0CC]'
                      : 'border-transparent text-navy-bolder/40 hover:text-navy-bolder/70'
                    }`}
                >
                  {author.name}
                </button>
              ))}
            </div>
          )}

          {/* Active author */}
          <div className="max-w-3xl">
            <p className="font-headline text-xl lg:text-2xl text-navy-bolder leading-snug">
              {active.name}
            </p>
            <p className="font-body text-sm font-semibold text-[#0466c8] mt-1 mb-5">
              {active.role}
            </p>
            <p className="font-body text-base text-neutral-subtle leading-[1.75]">
              {active.bio}
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-6">
              <a
                href={`/authors/${slugify(active.name)}`}
                className="inline-flex items-center gap-2 bg-navy-bolder border border-navy-bolder text-white font-body font-bold text-sm px-5 py-3 hover:bg-navy-bright hover:border-navy-bright transition-colors"
              >
                View Biography
              </a>
              <a
                href={`/authors/${slugify(active.name)}#stories`}
                className="inline-flex items-center gap-2 border border-navy-bolder text-navy-bolder font-body font-bold text-sm px-5 py-3 hover:bg-[#EBF4FF] transition-colors"
              >
                More Stories From This Author
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
