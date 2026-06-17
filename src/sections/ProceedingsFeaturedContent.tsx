import podcastImg from '@/assets/images/proceedings-podcast-taller.jpg'
import seaPowerImg from '@/assets/images/america-power-project-series.png'
import essayContestsImg from '@/assets/images/essay-contests-teaser.png'

interface FeatureCardProps {
  image: string
  imageAlt: string
  title: string
  body: string
  ctaLabel: string
  ctaHref: string
}

function FeatureCard({ image, imageAlt, title, body, ctaLabel, ctaHref }: FeatureCardProps) {
  return (
    <div className="flex flex-col bg-white border border-navy/20 flex-1 min-w-0">
      <div className="aspect-[16/9] overflow-hidden bg-neutral-subtlest flex-shrink-0">
        <img src={image} alt={imageAlt} className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col gap-4 p-5 flex-1">
        <div className="border-b border-navy-subtle pb-4">
          <h3 className="font-headline text-3xl text-navy-bolder leading-[1.1]">{title}</h3>
        </div>
        <p className="font-body text-sm text-neutral-subtle leading-relaxed flex-1">{body}</p>
        <a
          href={ctaHref}
          className="flex items-center justify-center gap-2 bg-navy-bold text-white font-body font-bold text-sm tracking-[-0.3px] px-5 py-3.5 border border-navy-bold hover:bg-navy transition-colors"
        >
          {ctaLabel} →
        </a>
      </div>
    </div>
  )
}

export default function ProceedingsFeaturedContent() {
  return (
    <section className="bg-surface-subtle py-16">
      <div className="container-site">
        <div className="flex gap-8 items-stretch">
          <FeatureCard
            image={podcastImg}
            imageAlt="The Proceedings Podcast"
            title="The Proceedings Podcast"
            body="Every week, the Proceedings Podcast covers a wide range of topics and brings the pages of Proceedings and Naval History to life."
            ctaLabel="Hear the latest episodes"
            ctaHref="/proceedings/podcast"
          />
          <FeatureCard
            image={seaPowerImg}
            imageAlt="The American Sea Power Project Series"
            title="The American Sea Power Project Series"
            body="The project hopes to inform strategy, planning, and procurement within the Sea Services and the government and build public support for the continued role of maritime power for the U.S."
            ctaLabel="Access the series"
            ctaHref="/proceedings/sea-power-project"
          />
          <FeatureCard
            image={essayContestsImg}
            imageAlt="Essay Contests"
            title="Essay Contests"
            body="On 13 June 1878, with Commander Alfred Thayer Mahan as acting Chair, the Naval Institute adopted rules for the first essay contest — the General Prize Essay Contest. This contest continues to this day."
            ctaLabel="See the latest contests"
            ctaHref="/proceedings/essay-contests"
          />
        </div>
      </div>
    </section>
  )
}
