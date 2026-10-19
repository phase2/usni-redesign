import type { LeadershipBio } from '@/data/leadershipBios'

/**
 * A leadership bio: the bio text in a left-aligned reading column with the
 * headshot to its right.
 *
 * The live pages float the photo left of the text; here the text leads and the
 * photo sits in its own column from `md` up, so a long bio never wraps under
 * it and its line length holds. Below `md` the photo stacks above the text at
 * a modest width rather than squeezing beside it.
 *
 * Headshots arrive at mixed proportions (square to 2:3), so the frame is a
 * fixed 4:5 cropped from the top, which keeps every face in view.
 */
export default function LeadershipBioBody({ bio }: { bio: LeadershipBio }) {
  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="container-site">
        <div className="flex flex-col gap-8 md:grid md:grid-cols-[minmax(0,1fr)_240px] lg:grid-cols-[minmax(0,1fr)_360px] md:gap-12 lg:gap-16 md:items-start">
          <div
            className="rich-text text-left max-w-[760px] order-2 md:order-1"
            dangerouslySetInnerHTML={{ __html: bio.html }}
          />
          <figure className="order-1 md:order-2 w-full max-w-[280px] md:max-w-none">
            <img
              src={bio.photo}
              alt={bio.photoAlt}
              className="w-full aspect-[4/5] object-cover object-top bg-neutral-subtlest"
            />
          </figure>
        </div>
      </div>
    </section>
  )
}
