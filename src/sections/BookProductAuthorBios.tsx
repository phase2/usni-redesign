import { useState } from 'react'
import TabNav, { panelId, tabId } from '@/components/ui/TabNav'
import { ButtonLink } from '@/components/ui/Button'
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
            <TabNav
              label="Authors"
              tabs={authors.map((a) => ({ id: slugify(a.name), label: a.name }))}
              activeId={slugify(active.name)}
              onChange={(id) => setActiveIndex(authors.findIndex((a) => slugify(a.name) === id))}
              className="mb-8"
            />
          )}

          {/* Active author bio */}
          <div
            className="max-w-3xl"
            {...(isMulti
              ? {
                  role: 'tabpanel',
                  id: panelId(slugify(active.name)),
                  'aria-labelledby': tabId(slugify(active.name)),
                }
              : {})}
          >
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
              <ButtonLink href={`/authors/${slugify(active.name)}`} variant="navy" size="sm">
                View Biography
              </ButtonLink>
              <ButtonLink
                href={`/authors/${slugify(active.name)}#stories`}
                variant="outline-dark"
                size="sm"
              >
                More Stories From This Author
              </ButtonLink>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
