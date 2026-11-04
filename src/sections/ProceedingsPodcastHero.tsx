import podcastArt from '@/assets/images/proceedings-podcast-taller.jpg'
import Breadcrumb from '@/components/ui/Breadcrumb'
import PodcastListenBadges from '@/components/ui/PodcastListenBadges'

export default function ProceedingsPodcastHero() {
  return (
    <section className="bg-[#ebf4ff] pt-10 lg:pt-12 pb-12 lg:pb-16">
      <div className="container-site">
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
                current="The Proceedings Podcast"
                homeIcon
              />
            </div>

            {/* Title */}
            <h1 className="font-headline text-[32px] lg:text-[64px] text-navy-bolder leading-[1.1]">
              The Proceedings Podcast
            </h1>

            {/* Tagline */}
            <p className="font-body font-bold text-[18px] lg:text-[24px] text-navy-subtle leading-[1.4]">
              Victory Begins at the U.S. Naval Institute
            </p>

            {/* Ways to listen */}
            <PodcastListenBadges className="pt-2" />
          </div>

          {/* Podcast art — stacks below on mobile, right column on desktop */}
          <div className="w-full max-w-[220px] lg:max-w-none lg:w-[280px] xl:w-[316px] lg:flex-shrink-0 lg:self-center">
            <img
              src={podcastArt}
              alt="The Proceedings Podcast cover art"
              className="w-full shadow-lg"
            />
          </div>

        </div>
      </div>
    </section>
  )
}
