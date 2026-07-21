import { useState } from 'react'
import type { BookAuthor } from '@/data/bookProductData'

interface Props {
  authors: BookAuthor[]
}

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function BookProductAuthorBios({ authors }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = authors[activeIndex]
  const isMulti = authors.length > 1

  return (
    <section id="author-bios" className="bg-white pb-12 lg:pb-16">
      <div className="container-site">
        <div style={{ backgroundColor: '#F7F7F2' }} className="px-8 lg:px-14 py-10 lg:py-14">

          <h2 className="font-headline text-2xl lg:text-3xl text-navy-bolder mb-6">
            About the {isMulti ? 'Authors' : 'Author'}
          </h2>

          {/* Author name tabs */}
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

          {/* Active author bio */}
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
