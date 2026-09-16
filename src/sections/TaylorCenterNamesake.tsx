import portrait from '@/assets/images/taylor-center/jack-c-taylor-portrait.jpg'

/**
 * Who the building is named for.
 *
 * On the live page this sits five paragraphs deep, after the dedication recap,
 * and is the part of that page with the longest shelf life — so it is lifted
 * out and given a portrait rather than left buried.
 */
export default function TaylorCenterNamesake() {
  return (
    <section id="namesake" className="bg-white py-12 lg:py-16 scroll-mt-32">
      <div className="container-site">
        <h2 className="font-headline text-[26px] lg:text-[32px] text-navy-bolder leading-[1.15] pb-4 border-b-2 border-[#0466C8]">
          The Center&rsquo;s namesake
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-8 lg:gap-12 items-start mt-8">
          <figure className="flex flex-col gap-3">
            <img
              src={portrait}
              alt="Jack C. Taylor, founder of Enterprise Rent-A-Car and the Center's namesake"
              loading="lazy"
              className="w-full aspect-[4/5] object-cover object-top border border-navy-subtle"
            />
            <figcaption className="font-body text-[13px] italic text-neutral-subtle leading-snug">
              Jack C. Taylor — naval aviator, entrepreneur, philanthropist.
            </figcaption>
          </figure>

          <div className="flex flex-col gap-5 max-w-[780px]">
            <p className="font-body text-base lg:text-[17px] text-neutral-bold leading-[1.7]">
              The Conference Center is named for Jack C. Taylor, a decorated World War II Navy
              fighter pilot, entrepreneur, business leader, and philanthropist — an American success
              story who embodied Navy values and credited the Navy for his success.
            </p>
            <p className="font-body text-base lg:text-[17px] text-neutral-bold leading-[1.7]">
              After combat duty flying from the decks of the aircraft carriers USS <em>Essex</em>{' '}
              (CV-9) and USS <em>Enterprise</em> (CV-6) in the Pacific Theater, he returned home to
              St. Louis and founded Enterprise Rent-A-Car in 1957, naming the company for the famous
              carrier from which he had flown.
            </p>
            <p className="font-body text-base lg:text-[17px] text-neutral-bold leading-[1.7]">
              The Taylor family honors their patriarch with the naming of the Conference Center,
              carrying on his proud association with the Navy and his encouragement of education and
              learning for all.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
