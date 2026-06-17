import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import NavalHistorySubNav from '@/sections/NavalHistorySubNav'

const CHECK_ICON = (
  <svg className="w-4 h-4 flex-shrink-0 text-[#0466c8] mt-0.5" viewBox="0 0 16 16" fill="none">
    <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const FEATURES = [
  'Six beautifully illustrated issues per year delivered to your door',
  'In-depth original articles from leading naval historians and scholars',
  'Stunning period photography and artwork in every issue',
  'Firsthand accounts, bold scholarship, and compelling narratives',
  'Complete digital archive access included with subscription',
  'Exclusive member pricing — save up to 28%',
]

interface PricingCardProps {
  term: '1' | '3'
  region: 'domestic' | 'international'
  price: number
  memberPrice: number
  originalPrice?: number
}

function PricingCard({ term, region, price, memberPrice, originalPrice }: PricingCardProps) {
  const termLabel = term === '1' ? '1 Year' : '3 Years'
  const memberLabel = region === 'international' ? 'International Members' : 'Members'
  return (
    <div className="border border-[#c4c9d4] bg-white p-8 flex flex-col gap-5">
      <div>
        <p className="font-body font-medium text-sm uppercase tracking-[0.08em] text-[#0466c8] mb-2">
          {termLabel} Subscription
        </p>
        <div className="flex items-baseline gap-2">
          <span className="font-headline text-[42px] text-navy-bolder leading-none">${price}</span>
          {originalPrice && (
            <span className="font-body text-[18px] text-neutral-subtle line-through">${originalPrice}</span>
          )}
        </div>
        <p className="font-body text-sm text-neutral-subtle mt-1">
          {memberLabel} pay just <strong className="text-navy-bolder">${memberPrice}</strong>
        </p>
      </div>
      <div className="h-px bg-[#e2e8f0]" />
      <ul className="flex flex-col gap-2.5">
        {[
          'Six issues per year',
          'Unlimited digital access',
          'Complete digital archive',
          ...(term === '3' ? ['Best value — save more per year'] : []),
        ].map(f => (
          <li key={f} className="flex items-start gap-2.5 font-body text-[14px] text-neutral-subtle leading-snug">
            {CHECK_ICON}
            {f}
          </li>
        ))}
      </ul>
      <a
        href="/membership/join?magazine=naval-history"
        className="mt-auto flex items-center justify-center bg-navy-bolder text-white font-body font-bold text-base tracking-[-0.3px] px-6 py-4 hover:bg-navy transition-colors"
      >
        Subscribe for {term === '1' ? '1 Year' : '3 Years'} →
      </a>
      <a
        href="/membership/join"
        className="text-center font-body text-sm text-[#0466c8] hover:underline"
      >
        Already a member? Subscribe at member rate
      </a>
    </div>
  )
}

export default function NavalHistorySubscribe() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <NavalHistorySubNav />

        {/* ── Hero ── */}
        <section
          className="py-16 lg:py-24 flex flex-col items-center text-center"
          style={{ background: 'linear-gradient(to bottom, #1d2535, #0e121a)' }}
        >
          <h1 className="font-headline text-[42px] lg:text-[56px] text-white leading-[1.1] mb-5 px-6">
            Subscribe to Naval History
          </h1>
          <p className="font-body text-lg text-white/80 leading-[1.6] max-w-[680px] px-6">
            The world's most authoritative and engaging periodical for readers interested in our nautical heritage — six issues a year, packed with firsthand accounts, bold scholarship, and stunning imagery.
          </p>
        </section>

        {/* ── Magazine preview + features ── */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

              {/* SCRIBD embed */}
              <div>
                <p className="font-body font-medium text-sm uppercase tracking-[0.08em] text-[#0466c8] mb-4">
                  Preview the Magazine
                </p>
                <iframe
                  className="scribd_iframe_embed"
                  title="Naval History - Sample Content"
                  src="https://www.scribd.com/embeds/373263301/content?start_page=1&view_mode=scroll&show_recommendations=false&access_key=key-S02HJSqvYI5Ej4kRve5J"
                  data-auto-height="true"
                  data-aspect-ratio="null"
                  scrolling="no"
                  width="100%"
                  height="780"
                  frameBorder="0"
                />
              </div>

              {/* Features */}
              <div className="flex flex-col gap-8">
                <div>
                  <h2 className="font-headline text-[36px] lg:text-[40px] text-navy-bolder leading-[1.1] mb-3">
                    Experience Naval History
                  </h2>
                  <p className="font-body text-base text-neutral-subtle leading-relaxed">
                    Each issue takes you deep into the stories that shaped the U.S. Navy and the world's great maritime powers — through the eyes of those who were there.
                  </p>
                </div>
                <ul className="flex flex-col gap-3.5">
                  {FEATURES.map(f => (
                    <li key={f} className="flex items-start gap-3 font-body text-[15px] text-neutral-subtle leading-snug">
                      {CHECK_ICON}
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* ── Domestic pricing ── */}
        <section className="py-16 lg:py-20 bg-[#f4f6fb]">
          <div className="container-site">
            <h2 className="font-headline text-[32px] lg:text-[36px] text-navy-bolder leading-[1.1] mb-2">
              Domestic Subscriptions
            </h2>
            <p className="font-body text-base text-neutral-subtle mb-10">
              For subscribers in the United States and its territories.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
              <PricingCard term="1" region="domestic" price={43} memberPrice={32} />
              <PricingCard term="3" region="domestic" price={124} memberPrice={90} originalPrice={129} />
            </div>
          </div>
        </section>

        {/* ── International pricing ── */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="container-site">
            <h2 className="font-headline text-[32px] lg:text-[36px] text-navy-bolder leading-[1.1] mb-2">
              International Subscriptions
            </h2>
            <p className="font-body text-base text-neutral-subtle mb-10">
              For subscribers outside the United States. Pricing includes international shipping and handling.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
              <PricingCard term="1" region="international" price={62} memberPrice={52} />
              <PricingCard term="3" region="international" price={164} memberPrice={150} originalPrice={186} />
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
