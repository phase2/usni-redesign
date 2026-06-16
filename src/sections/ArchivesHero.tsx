import heroImage from '@/assets/images/archive-feature-US-MdAnUSNI-108046019+4.webp'
import { ButtonLink } from '@/components/ui/Button'

export default function ArchivesHero() {
  return (
    <section className="flex min-h-[380px] lg:min-h-[420px]">
      {/* Left — photo */}
      <div className="hidden lg:block w-1/2 overflow-hidden">
        <img
          src={heroImage}
          alt="U.S. Naval Institute Archives"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Right — navy panel */}
      <div className="w-full lg:w-1/2 bg-navy-boldest flex items-center">
        <div className="px-10 lg:px-16 xl:px-20 py-16 max-w-[660px] flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <p className="eyebrow text-light-blue">Archives</p>
            <div className="flex flex-col gap-5">
              <h1 className="font-headline text-4xl lg:text-5xl xl:text-[54px] text-white leading-[1.1]">
                About the Archives
              </h1>
              <p className="font-body text-base lg:text-lg text-white/80 leading-relaxed">
                The Naval Institute Archives preserves the institutional memory of the
                U.S. Naval Institute and the sea services — oral histories, photographic
                collections, unpublished memoirs, manuscripts, and records spanning 150
                years of naval history.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
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
