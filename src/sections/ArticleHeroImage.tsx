import type { ReactNode } from 'react'
import defaultHeroImg from '@/assets/images/Nelson-PRO-4-26-Hero.jpg'

interface ArticleHeroImageProps {
  src?: string
  alt?: string
  caption?: string
  photoCredit?: string
  /**
   * Laid over the image, outside its crop so it can run past the edge (the
   * sponsored article's ArticleSponsorCredit ribbon).
   */
  overlay?: ReactNode
}

export default function ArticleHeroImage({
  src,
  alt = 'Article hero image',
  caption = 'Marines from 2nd Battalion, 4th Marines conduct amphibious assault training during Exercise Iron Fist. Growing Marine Corps expeditionary capacity is central to Pacific deterrence strategy.',
  photoCredit = 'U.S. Marine Corps / Lance Corporal David Intriago',
  overlay,
}: ArticleHeroImageProps) {
  return (
    <section className="bg-white pb-0 overflow-x-clip">
      <div className="container-site">
        <figure>
          <div className="relative">
            <div className="aspect-[16/7] overflow-hidden bg-neutral-subtlest">
              <img
                src={src ?? defaultHeroImg}
                alt={alt}
                className="w-full h-full object-cover"
              />
            </div>
            {overlay}
          </div>
          <figcaption className="mt-3 pb-2">
            <p className="font-body text-xs text-neutral-subtle leading-relaxed">{caption}</p>
            <p className="font-body text-xs text-neutral-subtle/70 mt-1">Photo Credit: {photoCredit}</p>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
