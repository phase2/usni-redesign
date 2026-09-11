import type { ReactNode } from 'react'

/**
 * Interior page header, in three variants.
 *
 * The light-blue left variant is the treatment already used by EventsPageHero,
 * EssayContestsHero, and the About / Books sub-page headers — same background,
 * padding, and type scale, so a page adopting this component looks unchanged.
 * The centered variant exists for pages whose header is a standalone statement
 * rather than the top of a reading column.
 *
 * Passing `image` selects the split photo/navy-panel treatment instead: the
 * same background image, half-width `navy-boldest` panel, and clamped edge
 * padding that GivingHero, BooksHero, EssayContestsHero, and CollectionHero
 * already use for a section front. It introduces no new hero pattern — it just
 * puts the one the site has behind the shared component, so a new section front
 * does not have to hand-roll a fifth copy. A `breadcrumb` passed with it needs
 * `tone="dark"`, since it lands on the navy panel.
 *
 * Existing headers were left as they are; this is the shared piece for new ones.
 */
export default function PageHero({
  title,
  description,
  eyebrow,
  align = 'left',
  breadcrumb,
  image,
  imageAlt = '',
  panelSide = 'right',
  panelTone = 'dark',
  children,
}: {
  title: string
  description?: ReactNode
  eyebrow?: string
  align?: 'left' | 'center'
  /** Rendered above the title, under its own rule — see EventsPageHero. */
  breadcrumb?: ReactNode
  /** Banner artwork. Supplying it selects the photo/navy-panel treatment. */
  image?: string
  /**
   * Only needed when the photo carries meaning the copy does not. It stacks
   * above the panel on mobile and sits behind it on desktop, so it is decorative
   * by default.
   */
  imageAlt?: string
  /**
   * Which side the panel sits on. Defaults to the right; flip it when the
   * photo's subject would otherwise sit behind it.
   */
  panelSide?: 'left' | 'right'
  /**
   * The panel's ground. `dark` is the navy block used by the section fronts;
   * `light` is the white card `SplitFeature` sets over a photo, for a page
   * whose artwork carries enough contrast on its own.
   */
  panelTone?: 'dark' | 'light'
  /** Anything that belongs under the description, e.g. a CTA row. */
  children?: ReactNode
}) {
  if (image) {
    const onLeft = panelSide === 'left'
    const lightPanel = panelTone === 'light'
    // The panel's viewport-edge side takes the wide clamped padding, so its text
    // lines up with the site container's gutter; the inner side, facing the
    // photo, stays tighter. Both mirror with the panel.
    const edgePadding = 'clamp(1.25rem, 6.5vw, 7rem)'

    return (
      <section
        className="relative w-full bg-cover bg-center lg:py-20"
        style={{ backgroundImage: `url(${image})` }}
      >
        {/* Mobile-only: the photo stacks above the panel rather than sitting behind it */}
        <img
          src={image}
          alt={imageAlt}
          aria-hidden={imageAlt ? undefined : 'true'}
          className="lg:hidden w-full aspect-[4/3] object-cover object-center"
        />

        <div className={`relative z-10 flex ${onLeft ? 'lg:justify-start' : 'lg:justify-end'}`}>
          <div
            className={`${lightPanel ? 'bg-white' : 'bg-navy-boldest'}
                       flex flex-col justify-center gap-6 lg:gap-8
                       w-full lg:w-1/2 xl:w-[49%] max-w-[900px]
                       py-10 lg:py-16 xl:py-20
                       ${onLeft ? 'pr-5 lg:pr-14' : 'pl-5 lg:pl-14'}`}
            style={onLeft ? { paddingLeft: edgePadding } : { paddingRight: edgePadding }}
          >
            {breadcrumb}

            <div className="eyebrow-headline">
              {eyebrow && (
                <p className={`eyebrow ${lightPanel ? 'text-navy-subtle' : 'text-light-blue'}`}>
                  {eyebrow}
                </p>
              )}
              <div className="flex flex-col gap-3 lg:gap-4">
                <h1
                  className={`font-headline text-[32px] lg:text-5xl xl:text-[54px] leading-[1.1] ${
                    lightPanel ? 'text-navy-bolder' : 'text-white'
                  }`}
                >
                  {title}
                </h1>
                {description && (
                  <p
                    className={`font-body text-[18px] lg:text-xl leading-relaxed ${
                      lightPanel ? 'text-neutral-subtle' : 'text-neutral-subtlest'
                    }`}
                  >
                    {description}
                  </p>
                )}
              </div>
            </div>

            {children}
          </div>
        </div>
      </section>
    )
  }

  const centered = align === 'center'

  return (
    <section className="bg-[#ebf4ff] pt-10 lg:pt-12 pb-12 lg:pb-16">
      <div className={`container-site flex flex-col gap-4 ${centered ? 'items-center text-center' : ''}`}>
        {breadcrumb}

        {eyebrow && (
          <p className="font-body font-medium text-sm uppercase tracking-[0.08em] text-[#023e7d]">
            {eyebrow}
          </p>
        )}

        <h1
          className={`font-headline text-[32px] lg:text-[64px] text-navy-bolder leading-[1.1] ${
            centered ? 'max-w-[900px]' : ''
          }`}
        >
          {title}
        </h1>

        {description && (
          /*
           * The centered variant gets a wider measure than the left one. At the
           * left variant's 760px a two-sentence intro wrapped to three lines with
           * a two-word orphan on the last; centered text has no column to align
           * with, so it can run wider. `text-balance` then evens the lines out
           * rather than leaving a short tail.
           */
          <p
            className={`font-body text-base lg:text-lg text-neutral-subtle leading-[1.6] ${
              centered ? 'max-w-[900px] mx-auto text-balance' : 'max-w-[760px]'
            }`}
          >
            {description}
          </p>
        )}

        {children}
      </div>
    </section>
  )
}
