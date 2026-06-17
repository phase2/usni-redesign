import ButtonLinkCTA from '@/components/ui/ButtonLinkCTA'

interface SectionHeaderProps {
  eyebrow?: string
  headline: string
  description?: string
  ctaLabel?: string
  ctaHref?: string
  centered?: boolean
  className?: string
}

export default function SectionHeader({
  eyebrow,
  headline,
  description,
  ctaLabel,
  ctaHref,
  centered,
  className = '',
}: SectionHeaderProps) {
  if (centered) {
    return (
      <div className={`text-center ${className}`}>
        <div className="eyebrow-headline items-center">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h2 className="font-headline text-4xl lg:text-5xl text-navy-bolder leading-[1.1]">{headline}</h2>
        </div>
      </div>
    )
  }

  return (
    <div className={`${className}`}>
      <div className="border-t-2 border-navy-bold pt-8 flex flex-col lg:flex-row lg:items-start lg:gap-8">
        <div className="flex-1">
          <div className="eyebrow-headline">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h2 className="font-headline text-4xl lg:text-5xl text-navy-bolder leading-[1.1]">
              {headline}
            </h2>
          </div>
        </div>
        {(description || ctaLabel) && (
          <div className="flex-1 mt-6 lg:mt-0 lg:max-w-[600px] flex flex-col gap-6 justify-start">
            {description && (
              <p className="font-body text-base lg:text-lg text-neutral-subtle leading-relaxed">
                {description}
              </p>
            )}
            {ctaLabel && ctaHref && (
              <ButtonLinkCTA href={ctaHref}>{ctaLabel}</ButtonLinkCTA>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
