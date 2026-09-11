import CardCta from '@/components/ui/CardCta'
import { givingImage, type GivingPromo } from '@/data/givingSocieties'

interface GivingPromoCardsProps {
  promos: GivingPromo[]
  heading?: string
  intro?: string
}

/**
 * The run of banner blocks that makes up a Giving sub-page — one per society,
 * or per corporate programme.
 *
 * The source art is a 1200x400 banner, so the image sits across the top of the
 * card at its own 3:1 proportion rather than being cropped into a square
 * thumbnail. Two across keeps a five-society page to three rows; the reading
 * order still runs down the gift tiers.
 *
 * A card is a link only when the live block carries a button. The corporate
 * programmes have no destination — they are descriptions of what a sponsorship
 * funds — so those render as plain cards with no hover and nothing to click.
 */
function PromoCard({ promo }: { promo: GivingPromo }) {
  const body = (
    <>
      <div className="aspect-[3/1] overflow-hidden bg-neutral-subtlest">
        <img
          src={givingImage(promo.image)}
          alt={promo.imageAlt}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-3 p-6 lg:p-7 flex-1">
        {/* Static, per the card convention documented on CardCta: the stylized
            link is the only thing that animates on hover. A headline sweeping
            its own underline alongside the CTA reads as two things moving. */}
        <h3 className="font-headline text-[22px] lg:text-[26px] text-navy-bolder leading-[1.15]">
          {promo.title}
        </h3>

        <p className="font-body text-[15px] text-neutral-bold leading-[1.65] flex-1">
          {promo.body}
        </p>

        {promo.ctaLabel && (
          <div className="pt-1">
            {/* A card that jumps further down the same page points its arrow
                that way, rather than implying it leads somewhere else. */}
            <CardCta direction={promo.ctaHref?.startsWith('#') ? 'down' : 'right'}>
              {promo.ctaLabel}
            </CardCta>
          </div>
        )}
      </div>
    </>
  )

  const shell = 'flex flex-col bg-white border border-navy-subtle h-full'

  if (!promo.ctaHref) return <div className={shell}>{body}</div>

  return (
    <a href={promo.ctaHref} className={`group ${shell} hover:shadow-md transition-shadow`}>
      {body}
    </a>
  )
}

export default function GivingPromoCards({
  promos,
  heading,
  intro,
}: GivingPromoCardsProps) {
  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="container-site">
        {heading && (
          <h2 className="font-headline text-[26px] lg:text-[32px] text-navy-bolder leading-[1.15] pb-4 border-b-2 border-[#0466C8]">
            {heading}
          </h2>
        )}

        {intro && (
          <p className="font-body text-base lg:text-[17px] text-neutral-bold leading-[1.7] max-w-[780px] mt-6">
            {intro}
          </p>
        )}

        <div
          className={`grid grid-cols-1 ${
            promos.length > 1 ? 'lg:grid-cols-2' : 'max-w-[640px]'
          } gap-8 ${heading || intro ? 'mt-8' : ''}`}
        >
          {promos.map((promo) => (
            <PromoCard key={promo.title} promo={promo} />
          ))}
        </div>

      </div>
    </section>
  )
}
