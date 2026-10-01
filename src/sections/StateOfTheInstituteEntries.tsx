import { stateOfTheInstituteEntries } from '@/data/stateOfTheInstitute'

/**
 * The State of the Institute archive: every dated notice, newest first, in one
 * reading column.
 *
 * Each entry's date is its heading; the body is the live page's markup (see
 * src/data/stateOfTheInstitute.ts), styled by the `.rich-text` house styles in
 * index.css. The markup is trusted — transcribed by us, not user input — which
 * is what makes rendering it as HTML acceptable here.
 */
export default function StateOfTheInstituteEntries() {
  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="container-site">
        <div className="max-w-[760px] flex flex-col">
          {stateOfTheInstituteEntries.map((entry, i) => (
            <article
              key={`${entry.date}-${i}`}
              className={`flex flex-col gap-5 ${
                i > 0 ? 'border-t border-neutral-subtler pt-10 mt-10 lg:pt-12 lg:mt-12' : ''
              }`}
            >
              <h2 className="font-headline text-[28px] lg:text-[36px] text-navy-bolder leading-[1.15]">
                {entry.date}
              </h2>
              <div className="rich-text" dangerouslySetInnerHTML={{ __html: entry.html }} />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
