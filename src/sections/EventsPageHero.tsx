import Breadcrumb, { type Crumb } from '@/components/ui/Breadcrumb'

interface EventsPageHeroProps {
  title: string
  /** Secondary line under the title, where the source page carries one. */
  subtitle?: string
  description?: string
  /** Trailing breadcrumb label. */
  breadcrumbLabel: string
  /** A crumb between Events and this page, e.g. Past Events above an event. */
  parent?: Crumb
}

/**
 * Light blue interior header for pages under /events — the same treatment the
 * essay contest archive and the About sub-pages use.
 */
export default function EventsPageHero({
  title,
  subtitle,
  description,
  breadcrumbLabel,
  parent,
}: EventsPageHeroProps) {
  return (
    <section className="bg-[#ebf4ff] pt-10 lg:pt-12 pb-12 lg:pb-16">
      <div className="container-site flex flex-col gap-4">
        <Breadcrumb
          trail={[
            { label: 'Home', href: '/' },
            { label: 'Events', href: '/events' },
            ...(parent ? [parent] : []),
          ]}
          current={breadcrumbLabel}
          className="pb-4 border-b border-[#C2DDFF]"
        />

        <h1 className="font-headline text-[32px] lg:text-[64px] text-navy-bolder leading-[1.1]">
          {title}
        </h1>

        {subtitle && (
          <p className="font-headline text-[22px] lg:text-[32px] text-navy-subtle leading-[1.15]">
            {subtitle}
          </p>
        )}

        {description && (
          <p className="font-body text-base lg:text-lg text-neutral-subtle leading-[1.6] max-w-[760px]">
            {description}
          </p>
        )}

      </div>
    </section>
  )
}
