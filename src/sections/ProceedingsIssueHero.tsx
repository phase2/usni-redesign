import coverImage from '@/assets/images/proceedings-magazine-april-cover.png'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { ButtonLink } from '@/components/ui/Button'

export default function ProceedingsIssueHero() {
  return (
    <section style={{ background: 'linear-gradient(to bottom, #1d2535, #0e121a)' }}>
      <div className="container-site py-10 lg:py-16">
        <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-10 xl:gap-16">

          {/* Content column */}
          <div className="flex-1 min-w-0 flex flex-col gap-4">

            {/* Breadcrumb */}
            <div className="pb-4 border-b border-[#C2DDFF]">
              <Breadcrumb
                trail={[
                  { label: 'Home', href: '/' },
                  { label: 'Proceedings', href: '/proceedings' },
                ]}
                current="April 2026 Issue"
                tone="dark"
                homeIcon
              />
            </div>

            {/* Title */}
            <h1 className="font-headline text-[32px] lg:text-[56px] xl:text-[64px] text-white leading-[1.1]">
              Proceedings:<br />April 2026
            </h1>

            {/* Volume */}
            <p className="font-body font-bold text-[18px] lg:text-[24px] text-[#f4f4f6] leading-[1.4]">
              Volume 152/4/1,478
            </p>

            {/* CTAs — the members' PDF leads; the archive sits beside it as the
                secondary action. The note belongs to the PDF button alone, so it
                sits in that button's column and the archive button aligns to the
                buttons' top edge, not the note's. */}
            <div className="pt-1 flex flex-col lg:flex-row lg:items-start gap-4">
              <div className="flex flex-col gap-2">
                {/* No digital edition URL yet: the live issue page has no PDF
                    link. Swap in the members' PDF when there is one. */}
                <ButtonLink href="#" variant="primary" size="md" className="w-full lg:w-auto">
                  Proceedings Digital Edition (PDF)
                </ButtonLink>
                <p className="font-body text-sm text-[#f4f4f6] text-center lg:text-left">
                  (member only benefit)
                </p>
              </div>
              <ButtonLink href="/proceedings/all-issues" variant="outline" size="md" className="w-full lg:w-auto">
                See the Proceedings Archive
              </ButtonLink>
            </div>
          </div>

          {/* Cover — stacks below on mobile, right column on desktop */}
          <div className="w-full max-w-[220px] lg:max-w-none lg:w-[280px] xl:w-[316px] lg:flex-shrink-0 lg:self-center">
            <img
              src={coverImage}
              alt="Proceedings April 2026 Cover"
              className="w-full shadow-2xl"
            />
          </div>

        </div>
      </div>
    </section>
  )
}
