import { navalScienceGlossary } from '@/data/navalScienceGlossary'

/**
 * The Naval Science 3 glossary as a basic page: every term in one reading
 * column, run in the way the book sets it (bold term, em dash, definition).
 *
 * The live page renders this in the article template, with a read time and a
 * drop cap that splits "aids to navigation" into "a" and "ids"; neither carries
 * over. A definition list keeps each term paired with its definition for
 * screen readers.
 */
export default function NavalScienceGlossaryContent() {
  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="container-site">
        <dl className="max-w-[860px] mx-auto flex flex-col gap-5 font-body text-base lg:text-[17px] text-neutral-bold leading-[1.7]">
          {navalScienceGlossary.map((entry) => (
            <div key={entry.term}>
              <dt className="inline font-bold text-navy-bolder">{entry.term}</dt>
              <dd className="inline">&mdash;{entry.definition}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
