import { useState } from 'react'
import type { BookAuthor } from '@/data/bookProductData'

interface Props {
  authors: BookAuthor[]
}

export default function BookProductAuthorBios({ authors }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = authors[activeIndex]
  const isMulti = authors.length > 1

  return (
    <section id="author-bios" className="bg-white py-12 lg:py-16">
      <div className="container-site">
        <div style={{ backgroundColor: '#001845' }} className="px-8 lg:px-14 py-10 lg:py-14">

          <h2 className="font-headline text-2xl lg:text-3xl text-white mb-6">
            About the {isMulti ? 'Authors' : 'Author'}
          </h2>

          {/* Author name tabs */}
          {isMulti && (
            <div className="flex flex-wrap gap-1 border-b border-white/20 mb-8">
              {authors.map((author, i) => (
                <button
                  key={author.name}
                  onClick={() => setActiveIndex(i)}
                  className={`px-5 py-3 font-body font-semibold text-sm whitespace-nowrap border-b-2 -mb-px transition-colors
                    ${activeIndex === i
                      ? 'border-gold text-white bg-white/10'
                      : 'border-transparent text-white/50 hover:text-white/80'
                    }`}
                >
                  {author.name}
                </button>
              ))}
            </div>
          )}

          {/* Active author bio */}
          <div className="max-w-3xl">
            <p className="font-headline text-xl lg:text-2xl text-white leading-snug">
              {active.name}
            </p>
            <p className="font-body text-sm font-semibold text-gold mt-1 mb-5">
              {active.role}
            </p>
            <p className="font-body text-base text-white/80 leading-[1.75]">
              {active.bio}
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
