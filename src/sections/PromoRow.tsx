const membershipImage = 'https://picsum.photos/seed/usni-membership/700/450'
const donationImage = 'https://picsum.photos/seed/usni-donation/700/450'

interface PromoCardProps {
  eyebrow: string
  headline: string
  body: string
  ctaLabel: string
  ctaHref: string
  image: string
  imageAlt: string
}

function PromoCard({ eyebrow, headline, body, ctaLabel, ctaHref, image, imageAlt }: PromoCardProps) {
  return (
    <div className="flex flex-col gap-0 flex-1">
      <div className="aspect-[16/9] overflow-hidden bg-neutral-subtlest">
        <img src={image} alt={imageAlt} className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col gap-4 p-6 lg:p-8 border border-border-light border-t-0 flex-1">
        <div>
          <p className="font-body font-medium text-xs uppercase tracking-widest text-navy-subtle mb-2">
            {eyebrow}
          </p>
          <h3 className="font-headline text-2xl lg:text-3xl text-navy-bolder leading-tight">
            {headline}
          </h3>
        </div>
        <p className="font-body text-sm lg:text-base text-navy leading-relaxed flex-1">{body}</p>
        <a
          href={ctaHref}
          className="inline-flex items-center justify-center bg-navy-bolder text-white font-body font-bold text-sm tracking-[-0.3px] px-5 py-3.5 border border-navy-bolder hover:bg-navy transition-colors mt-auto"
        >
          {ctaLabel}
        </a>
      </div>
    </div>
  )
}

export default function PromoRow() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="container-site">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PromoCard
            eyebrow="Membership"
            headline="Join 50,000+ Naval Professionals Worldwide"
            body="As a member of the U.S. Naval Institute, you'll join a community of naval and maritime professionals who share your commitment to sea power. Enjoy exclusive access to Proceedings and Naval History magazines, discounts, and more."
            ctaLabel="Become a Member"
            ctaHref="/membership/join"
            image={membershipImage}
            imageAlt="Naval officers in uniform"
          />
          <PromoCard
            eyebrow="Giving"
            headline="Help Fund the Open Forum"
            body="Your donation to the Naval Institute supports the publication of Proceedings and Naval History magazines, the continuation of the oral history collection, and the preservation of naval heritage for future generations."
            ctaLabel="Donate Today"
            ctaHref="/giving/donate"
            image={donationImage}
            imageAlt="U.S. Naval vessel at sea"
          />
        </div>
      </div>
    </section>
  )
}
