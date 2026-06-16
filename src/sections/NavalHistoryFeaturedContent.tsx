import billboardImg from '@/assets/images/naval-history-billboard.jpg'
import featureImg   from '@/assets/images/naval-history-feature.png'
import modalImg     from '@/assets/images/naval-history-modal-banner.jpg'

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
          <h3 className="font-headline text-3xl text-navy-bolder leading-tight">{title}</h3>
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

export default function NavalHistoryFeaturedContent() {
  return (
    <section className="bg-surface-subtle py-16">
      <div className="container-site">
        <div className="flex gap-8 items-stretch">
          <FeatureCard
            image={billboardImg}
            imageAlt="The Naval History Podcast"
            title="The Naval History Podcast"
            body="Every week, the Naval History Podcast brings stories of the sea to life — from pivotal battles to forgotten figures who shaped the course of naval history."
            ctaLabel="Hear the latest episodes"
            ctaHref="/naval-history/podcast"
          />
          <FeatureCard
            image={featureImg}
            imageAlt="Naval History Digital Archive"
            title="The Digital Archive"
            body="Access more than 35 years of Naval History Magazine — fully searchable, beautifully rendered, and available to subscribers on any device."
            ctaLabel="Explore the archive"
            ctaHref="/naval-history/archive"
          />
          <FeatureCard
            image={modalImg}
            imageAlt="Submit to Naval History Magazine"
            title="Submit to Naval History"
            body="Naval History publishes rigorously researched articles from historians, veterans, and enthusiasts. Review our submission guidelines and pitch your story."
            ctaLabel="See submission guidelines"
            ctaHref="/naval-history/submissions"
          />
        </div>
      </div>
    </section>
  )
}
