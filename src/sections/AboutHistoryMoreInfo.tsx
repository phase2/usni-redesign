import { Prose } from '@/sections/AboutHistoryActivities'

/**
 * "For more information" — the closing section of the current history page,
 * with its inline links repointed at prototype routes.
 */
export default function AboutHistoryMoreInfo() {
  return (
    <section className="py-16 lg:py-20 bg-white" aria-labelledby="more-information-heading">
      <div className="container-site">
        <div className="max-w-[860px] flex flex-col gap-6">
          <h2
            id="more-information-heading"
            className="font-headline text-4xl lg:text-5xl text-navy-bolder leading-[1.1]"
          >
            For more information
          </h2>
          <Prose
            className="font-body text-base lg:text-[17px] text-neutral-subtle leading-[1.75]"
            segments={[
              'The most immediate source of information is right here on ',
              { text: 'usni.org', href: '/' },
              '. The entire ',
              { text: 'book list', href: '/press' },
              ' is easily searchable. The index to and contents of ',
              { text: 'Proceedings', href: '/proceedings' },
              ' since 1874 are available electronically, as well as selected articles from ',
              { text: 'Naval History', href: '/naval-history' },
              ' and information about ',
              { text: 'conferences', href: '/events' },
              ', future and past. Opportunities for electronic discussions, or purchase of photos and other products, also are available.',
            ]}
          />
        </div>
      </div>
    </section>
  )
}
