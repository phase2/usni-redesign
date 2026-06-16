import { useState } from 'react'

export interface ArticleAuthor {
  name: string
  role: string
  bio: string
}

interface Props {
  authors: ArticleAuthor[]
}

export default function ArticleAuthorBio({ authors }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = authors[activeIndex]
  const isMulti = authors.length > 1

  return (
    <section className="bg-[#f7f7f2] py-10">
      <div className="container-site">
        <div className="border border-[#d9d7bf] p-8 lg:p-10">

          {/* Header row */}
          <p className="font-body font-medium text-[14px] uppercase tracking-[0.5px] text-[#0466c8] leading-[1.5] mb-4">
            About the {isMulti ? 'Authors' : 'Author'}
          </p>

          {/* Tabs — only shown for multiple authors */}
          {isMulti && (
            <div className="flex flex-wrap gap-1 border-b border-[#d9d7bf] mb-7">
              {authors.map((author, i) => (
                <button
                  key={author.name}
                  onClick={() => setActiveIndex(i)}
                  className={`px-5 py-3 font-body font-semibold text-sm whitespace-nowrap border-b-2 -mb-px transition-colors
                    ${activeIndex === i
                      ? 'border-[#023E7D] text-[#1d2535] bg-white/50'
                      : 'border-transparent text-neutral-subtle hover:text-[#1d2535]'
                    }`}
                >
                  {author.name}
                </button>
              ))}
            </div>
          )}

          {/* Active author */}
          <div className="max-w-3xl">
            <h3 className="font-headline text-[36px] text-[#1d2535] leading-[1.2]">
              {active.name}
            </h3>
            <p className="font-body font-semibold text-sm text-[#0466c8] uppercase tracking-[0.04em] mt-1 mb-5">
              {active.role}
            </p>
            <p className="font-body text-[20px] text-neutral-subtle leading-[1.4]">
              {active.bio}
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-6">
              <a
                href={`/author/${active.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="inline-flex items-center justify-center bg-navy-bolder text-white font-body font-bold text-base tracking-[-0.5px] px-6 py-4 hover:bg-navy-bold transition-colors"
              >
                More stories from this author
              </a>
              <a
                href={`/author/${active.name.toLowerCase().replace(/\s+/g, '-')}/biography`}
                className="inline-flex items-center justify-center border border-navy-bolder text-navy-bolder font-body font-bold text-base tracking-[-0.5px] px-6 py-4 hover:bg-white transition-colors"
              >
                View Biography
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
