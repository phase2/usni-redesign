import { useState } from 'react'
import ContactCard from '@/components/ui/ContactCard'
import type { BookCollection } from '@/data/bookCollections'

/**
 * The custom introduction region of a collection page.
 *
 * On the live site this is one WYSIWYG blob: "About the Series", then "About the
 * Series Editor", then a bolded line with a proposals address. The template
 * keeps all three but gives them structure — narrative prose in a reading
 * column, and whoever to write to in a rail beside it, where a prospective
 * author can find them without reading to the bottom of the page.
 *
 * The rail always carries a contact. Most series have a named editor who takes
 * proposals; the Blue & Gold and Scarlet & Gold libraries are managed in-house
 * and name a Press contact instead. Either way it sits in the same place on
 * every page rather than dropping to a panel under the copy.
 */
export default function CollectionIntro({
  collection,
}: {
  collection: BookCollection
}) {
  const { about, aboutHeading = 'About the Series', editor, contact } = collection
  const hasRail = Boolean(editor || contact)

  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="container-site">
        <div
          className={
            hasRail
              ? 'grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-10 lg:gap-16'
              : ''
          }
        >
          {/* Prose column */}
          <div className={hasRail ? '' : 'max-w-[780px]'}>
            <h2 className="font-headline text-[26px] lg:text-[32px] text-navy-bolder leading-[1.15] pb-4 border-b-2 border-[#0466C8]">
              {aboutHeading}
            </h2>
            <div className="flex flex-col gap-5 mt-6 max-w-[720px]">
              {about.map((para, i) => (
                <p
                  key={i}
                  className="font-body text-base lg:text-[17px] text-neutral-bold leading-[1.7]"
                >
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* Rail */}
          {hasRail && (
            <aside className="lg:pt-14 flex flex-col gap-6">
              {editor && (
                <ContactCard
                  label="Series Editor"
                  name={editor.name}
                  role={editor.role}
                  inquiriesLabel="Send inquiries and proposals to:"
                  email={editor.email}
                >
                  <EditorBio bio={editor.bio} />
                </ContactCard>
              )}
              {contact && (
                <ContactCard
                  label="Series Contact"
                  name={contact.name}
                  note={contact.note}
                  email={contact.email}
                />
              )}
            </aside>
          )}
        </div>
      </div>
    </section>
  )
}

/**
 * Series editor bio, clamped to four lines behind a "Read more" toggle.
 *
 * These run 700–1000 characters — a full CV paragraph — which pushed the
 * proposals address, the one thing a prospective author is here for, well below
 * the fold of the rail. `line-clamp` keeps the whole bio in the DOM, so it is
 * still indexed and still findable with a browser search when collapsed.
 */
function EditorBio({ bio }: { bio: string }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="flex flex-col gap-1.5 items-start">
      <p
        className={`font-body text-sm text-neutral-subtle leading-[1.65] ${
          expanded ? '' : 'line-clamp-4'
        }`}
      >
        {bio}
      </p>
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="text-link font-body font-semibold text-sm"
      >
        {expanded ? '− Read less' : '+ Read more'}
      </button>
    </div>
  )
}
