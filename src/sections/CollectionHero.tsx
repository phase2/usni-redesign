import type { BookCollection } from '@/data/bookCollections'
import SiteBreadcrumb from '@/components/ui/Breadcrumb'

/** Books & Press trail, with an optional page between the section and this one. */
function Breadcrumb({
  label,
  parent,
  dark,
}: {
  label: string
  /** The page above this one, between Books & Press and the current page. */
  parent?: { label: string; href: string }
  dark?: boolean
}) {
  return (
    <SiteBreadcrumb
      trail={[
        { label: 'Home', href: '/' },
        { label: 'Books & Press', href: '/press' },
        ...(parent ? [parent] : []),
      ]}
      current={label}
      tone={dark ? 'dark' : 'light'}
      className={`pb-4 border-b ${dark ? 'border-white/25' : 'border-[#C2DDFF]'}`}
    />
  )
}

export interface CollectionHeroProps {
  title: string
  /** Series editor credit, or another single secondary line. */
  deck?: string
  description?: string
  eyebrow?: string
  breadcrumbLabel: string
  breadcrumbParent?: { label: string; href: string }
  hero: BookCollection['hero']
  /** Series brand lockup. Rendered in a white plate right of the copy. */
  mark?: BookCollection['mark']
  /** Count line under the title, e.g. "17 titles". */
  meta?: string
}

/**
 * Page header for a Books & Press collection.
 *
 * The light-blue variant is the default and the one nearly every collection
 * uses — it matches the interior headers already in place across Proceedings,
 * Naval History, and the rest of Books & Press.
 *
 * The image variant is the site's existing photo hero with the dark-blue panel,
 * as used by GivingHero, BooksHero, and EssayContestsHero's photo treatment —
 * same background image, same half-width navy-boldest panel, same clamped edge
 * padding. It deliberately introduces no new hero pattern of its own; a
 * collection that owns real photography just gets the treatment the rest of the
 * site already uses for a section front.
 */
export default function CollectionHero({
  title,
  deck,
  description,
  eyebrow,
  breadcrumbLabel,
  breadcrumbParent,
  hero,
  mark,
  meta,
}: CollectionHeroProps) {
  if (hero.variant === 'image' && hero.image) {
    return (
      <section
        className="relative w-full bg-cover lg:py-20"
        style={{
          backgroundImage: `url(${hero.image})`,
          // Default centre, but a collection can steer the crop: the panel
          // covers half the frame, so a subject sitting under it needs the
          // background pulled the other way.
          backgroundPosition: hero.imagePosition ?? 'center',
        }}
      >
        {/* Mobile-only: the photo stacks above the panel rather than sitting
            behind it — the same arrangement GivingHero and BooksHero use. */}
        <img
          src={hero.image}
          alt=""
          aria-hidden="true"
          className="lg:hidden w-full aspect-[4/3] object-cover"
          style={{ objectPosition: hero.imagePosition ?? 'center' }}
        />

        {/* Navy content panel — pushed to the right */}
        <div className="relative z-10 flex lg:justify-end">
          <div
            className="bg-navy-boldest flex flex-col justify-center gap-6 lg:gap-8
                       w-full lg:w-1/2 xl:w-[49%] max-w-[900px]
                       py-10 lg:py-16 xl:py-20
                       pl-5 lg:pl-14"
            style={{ paddingRight: 'clamp(1.25rem, 6.5vw, 7rem)' }}
          >
            <Breadcrumb label={breadcrumbLabel} parent={breadcrumbParent} dark />

            <div className="eyebrow-headline">
              {eyebrow && <p className="eyebrow text-light-blue">{eyebrow}</p>}
              <div className="flex flex-col gap-4 lg:gap-6">
                <h1 className="font-headline text-[32px] lg:text-5xl xl:text-[54px] text-white leading-[1.1]">
                  {title}
                </h1>
                {deck && (
                  <p className="font-body font-bold text-[18px] lg:text-[22px] text-light-blue leading-[1.4]">
                    {deck}
                  </p>
                )}
                {description && (
                  <p className="font-body text-[18px] lg:text-xl text-neutral-subtlest leading-relaxed">
                    {description}
                  </p>
                )}
                {meta && (
                  <p className="font-body text-sm text-light-blue/80">{meta}</p>
                )}
              </div>
            </div>

            {/* Label and size match the article captions (ArticleBody,
                ArticleFullBleedImage, ArticleImagePair). Full white rather than
                a tint: on navy-boldest, white/50 lands near 2:1 and fails
                contrast, while solid white clears AA comfortably. */}
            {hero.credit && (
              <p className="font-body text-sm text-white leading-relaxed">
                Photo Credit: {hero.credit}
              </p>
            )}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-[#ebf4ff] pt-10 lg:pt-12 pb-12 lg:pb-16">
      <div className="container-site">
        {/*
          Two columns when the collection has a brand lockup — copy on the left,
          the mark in a white plate on the right — following
          ProceedingsPodcastHero, where the cover art takes the same slot with
          the same shadow and no border. Branding always goes in a white block on the right
          rather than inline above the copy, so a supplied logo sits on a ground
          its own designers intended and never competes with the headline.
        */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-10 xl:gap-16">

          <div className="flex-1 min-w-0 flex flex-col gap-4">
            <Breadcrumb label={breadcrumbLabel} parent={breadcrumbParent} />

            {eyebrow && (
              <p className="font-body font-medium text-sm uppercase tracking-[0.08em] text-navy-subtle">
                {eyebrow}
              </p>
            )}

            {/* 54px rather than the 64px used elsewhere on interior headers:
                these are long names — "Studies in Marine Corps History and
                Amphibious Warfare" runs to three lines at 64px. */}
            <h1 className="font-headline text-[32px] lg:text-[54px] text-navy-bolder leading-[1.1]">
              {title}
            </h1>

            {deck && (
              <p className="font-body font-bold text-[18px] lg:text-[22px] text-navy-subtle leading-[1.4]">
                {deck}
              </p>
            )}

            {description && (
              <p className="font-body text-base lg:text-lg text-neutral-subtle leading-[1.6] max-w-[760px]">
                {description}
              </p>
            )}

            {meta && <p className="font-body text-sm text-neutral-subtle">{meta}</p>}
          </div>

          {mark && (
            <div className="w-full max-w-[320px] lg:max-w-none lg:w-[300px] xl:w-[340px] lg:flex-shrink-0 lg:self-center">
              <div className="bg-white shadow-lg p-6 lg:p-8 flex items-center justify-center">
                <img
                  src={mark.image}
                  alt={mark.alt}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  )
}
