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
    <section className="bg-white pb-12 lg:pb-16">
      <div className="container-site">
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
                  className={`px-5 py-3 font-body font-semibold text-sm whitespace-nowrap border-b-2 -mb-px transition-colors
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
          </div>

        </div>
      </div>
    </section>
  )
}
