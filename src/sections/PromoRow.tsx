import booksImage from '@/assets/images/books/custom-bookstore-hero.png'
import donationImage from '@/assets/images/donate-home-teaser.png'

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
    <div className="flex flex-col gap-4 flex-1 bg-white border border-navy-subtle p-5">
      <div className="aspect-[16/9] overflow-hidden bg-neutral-subtlest flex-shrink-0">
        <img src={image} alt={imageAlt} className="w-full h-full object-cover" />
      </div>
      <div className="border-b border-[#0466c8] pb-4">
        <p className="font-body font-medium text-[18px] uppercase tracking-[1px] text-navy-subtle mb-1">
          {eyebrow}
        </p>
        <h3 className="font-headline text-[36px] text-navy-bolder leading-[1.2]">
          {headline}
        </h3>
      </div>
      <p className="font-body text-[16px] text-[#1d2535] leading-[1.5] flex-1">{body}</p>
      <a
        href={ctaHref}
        className="flex items-center justify-center bg-navy-bold text-white font-body font-bold text-[16px] tracking-[-0.5px] px-6 py-4 hover:bg-navy transition-colors mt-auto w-full"
      >
        {ctaLabel} →
      </a>
    </div>
  )
}

export default function PromoRow() {
  return (
    <section
      className="py-16 lg:py-20"
      style={{ background: 'linear-gradient(52.83deg, #EBF4FF 8.15%, #ffffff 72.81%)' }}
    >
      <div className="container-site">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <PromoCard
            eyebrow="Naval Institute Press"
            headline="125 Years of Stories Worth Telling"
            body="From The Hunt for Red October to oral histories of the Navy's greatest leaders, Naval Institute Press brings the sea services to life — on the page and on screen."
            ctaLabel="Discover Books & Press"
            ctaHref="/books"
            image={booksImage}
            imageAlt="Naval Institute Press bookstore"
          />
          <PromoCard
            eyebrow="Support the Mission"
            headline="Help Fund the Open Forum"
            body="As a nonprofit, the Naval Institute depends on the generosity of donors to sustain the independent forum, oral history archives, and educational programs that serve the sea services community."
            ctaLabel="Donate today"
            ctaHref="/giving/donate"
            image={donationImage}
            imageAlt="U.S. sailors and marines in dress uniform"
          />
        </div>
      </div>
    </section>
  )
}
