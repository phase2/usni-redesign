import heroImage from '@/assets/images/archive-feature-US-MdAnUSNI-108046019+4.webp'
import { ButtonLink } from '@/components/ui/Button'

export default function ArchivesHero() {
  return (
    <section className="flex flex-col lg:flex-row lg:min-h-[420px]">
      {/* Photo — stacks above on mobile, left half on desktop */}
      <div className="w-full aspect-[4/3] lg:aspect-auto lg:w-1/2 overflow-hidden">
        <img
          src={heroImage}
          alt="U.S. Naval Institute Archives"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Navy panel */}
      <div className="w-full lg:w-1/2 bg-navy-boldest flex items-center">
        <div className="px-5 sm:px-10 lg:px-16 xl:px-20 py-10 lg:py-16 max-w-[660px] flex flex-col gap-6 lg:gap-8">
          <div className="flex flex-col gap-4 lg:gap-6">
            <p className="eyebrow text-light-blue">Archives</p>
            <div className="flex flex-col gap-4 lg:gap-5">
              <h1 className="font-headline text-[32px] lg:text-4xl xl:text-[54px] text-white leading-[1.1]">
                About the Archives
              </h1>
              <p className="font-body text-[18px] lg:text-lg text-white/80 leading-relaxed">
                The Naval Institute Archives preserves the institutional memory of the
                U.S. Naval Institute and the sea services — oral histories, photographic
                collections, unpublished memoirs, manuscripts, and records spanning 150
                years of naval history.
              </p>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-3 lg:gap-4">
            <ButtonLink href="/archives/oral-histories" variant="primary" size="md">
              Browse Collections
            </ButtonLink>
            <ButtonLink href="/archives/contact" variant="outline" size="md">
              Contact the Archives
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  )
}
