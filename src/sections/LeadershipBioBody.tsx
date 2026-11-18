import type { LeadershipBio } from '@/data/leadershipBios'

/**
 * A leadership bio, in the live page's content order: the name and title as
 * headings at the top of the body (the hero carries the name alone), then the
 * bio. The headshot floats right beside it all, in the centered 860px reading
 * column the site's other prose pages use. From `md` the text wraps beside the
 * photo and runs the full column width below it.
 * Below `md` the photo stacks above the text at a modest width rather than
 * squeezing beside it.
 *
 * The live pages set the title as an h3 on some bios and an h4 on others, and
 * some add an "Executive Staff" or "U.S. Naval Institute" kicker; here every
 * bio gets the same h2 name and h3 title, and no kicker.
 *
 * The text block drops `.rich-text`'s flex column for plain block flow
 * (`!block` with `space-y-4` for the same paragraph gap), because a flex
 * container sits beside a float instead of wrapping around it. `flow-root`
 * on the column contains the float when a bio is shorter than the photo.
 *
 * Headshots arrive at mixed proportions (square to 2:3), so the frame is a
 * fixed 4:5 cropped from the top, which keeps every face in view.
 */
export default function LeadershipBioBody({ bio }: { bio: LeadershipBio }) {
  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="container-site">
        <div className="flow-root max-w-[860px] mx-auto">
          <figure className="w-full max-w-[280px] mb-8 md:float-right md:w-[280px] lg:w-[360px] md:max-w-none md:ml-10 lg:ml-12 md:mb-6">
            <img
              src={bio.photo}
              alt={bio.photoAlt}
              className="w-full aspect-[4/5] object-cover object-top bg-neutral-subtlest"
            />
          </figure>
          <header className="mb-6">
            <h2 className="font-headline text-[30px] lg:text-[36px] text-navy-bolder leading-[1.15]">
              {bio.name}
            </h2>
            <h3
              className="mt-2 font-body font-bold text-base lg:text-lg text-navy-bolder leading-[1.4]"
              dangerouslySetInnerHTML={{ __html: bio.roleHtml }}
            />
          </header>
          <div
            className="rich-text !block space-y-4 text-left"
            dangerouslySetInnerHTML={{ __html: bio.html }}
          />
        </div>
      </div>
    </section>
  )
}
