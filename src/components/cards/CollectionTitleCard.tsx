import type { CollectionTitle } from '@/data/bookCollections'
import { collectionCover } from '@/data/bookCollections'
import usniIcon from '@/assets/images/usni-icon-gold.svg'
import BookPrice from '@/components/ui/BookPrice'

/**
 * One title in a collection bibliography.
 *
 * Two states, because a Press collection is a bibliography before it is a
 * storefront: most titles have a product page and are bought here, but every
 * series carries some the Press lists and no longer sells. Those still belong
 * on the page — the series record is the reason the page ranks — so instead of
 * dropping them or linking them somewhere broken, they render as a reference
 * entry: the USNI mark in place of the cover, no hover lift, and the
 * availability note where the price would be.
 */
export default function CollectionTitleCard({ title }: { title: CollectionTitle }) {
  const cover = collectionCover(title.slug)
  const linked = Boolean(title.href)

  const body = (
    <>
      {/*
        The frame owns the 2:3 shape and the image is absolutely positioned
        inside it, so the image's own dimensions can never influence the box.
        Without that, a cover whose intrinsic ratio is taller than 2:3 stretches
        its cell and the row ends up with covers of three different heights.
        `object-cover object-center` then scales every cover alike and crops any
        overhang from the middle out.
      */}
      <div
        className={`relative aspect-[2/3] ${
          linked ? 'transition-transform duration-300 group-hover:-translate-y-2' : ''
        }`}
      >
        {cover ? (
          <img
            src={cover}
            alt={title.title}
            className="absolute inset-0 w-full h-full object-cover object-center
              shadow-[0_2px_8px_rgba(0,18,51,0.14)] transition-shadow duration-300
              group-hover:shadow-[0_10px_26px_rgba(0,18,51,0.24)]"
          />
        ) : (
          <CoverPlate />
        )}
      </div>

      <div className="flex flex-col gap-1">
        <h3
          className="font-headline text-[19px] leading-snug text-navy-bolder"
        >
          {linked ? (
            <span className="article-link article-link--card">{title.title}</span>
          ) : (
            title.title
          )}
        </h3>

        {title.subtitle && (
          <p className="font-body text-[13px] text-neutral-subtle leading-snug">
            {title.subtitle}
          </p>
        )}

        {title.byline && (
          <p className="font-body text-sm font-medium text-neutral-bold leading-snug mt-0.5">
            {title.byline}
          </p>
        )}

        {title.href ? (
          <div className="mt-2 flex flex-col gap-1.5">
            {title.format && (
              <span className="font-body text-sm text-neutral-subtle leading-none">
                {title.format}
              </span>
            )}
            {title.price !== undefined && (
              <BookPrice listPrice={title.price} memberPrice={title.memberPrice} />
            )}
          </div>
        ) : (
          <p className="font-body text-[12px] italic text-neutral-subtle leading-snug mt-1.5">
            {title.availability}
          </p>
        )}
      </div>
    </>
  )

  if (!linked) {
    return <div className="flex flex-col gap-3">{body}</div>
  }

  return (
    <a href={title.href} className="group flex flex-col gap-3">
      {body}
    </a>
  )
}

/**
 * Stand-in for a title whose cover art the Press does not publish: the USNI
 * quill-and-sword mark on a tan plate in a white frame.
 *
 * Uses `usni-icon-gold.svg` rather than the raster watermark the leadership
 * roster uses for a missing headshot. That one ships its own #F7F7F2 field with
 * no alpha channel, which meant knocking the field out with `mix-blend-multiply`
 * over the tan — it left a visible square and washed the mark out. The SVG is
 * transparent and needs no blending.
 */
function CoverPlate() {
  return (
    <div
      className="absolute inset-0 bg-tan-subtle border-[6px] border-white
                 flex items-center justify-center"
      aria-hidden="true"
    >
      <img src={usniIcon} alt="" className="w-[58%] h-auto" />
    </div>
  )
}
