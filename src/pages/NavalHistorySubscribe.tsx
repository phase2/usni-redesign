import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import crossSellImg from '@/assets/images/sunset-ship-view-extend.png'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import NavalHistorySubNav from '@/sections/NavalHistorySubNav'
import PageHero from '@/sections/PageHero'
import SentenceSelect, { SentenceText } from '@/components/ui/SentenceSelect'
import {
  FEATURES,
  FORMAT_BLURBS,
  FORMAT_LABELS,
  offerFor,
  type Format,
  type Region,
  type Term,
} from '@/data/navalHistorySubscription'

/**
 * Naval History subscription selection — step 1 of the subscribe flow.
 *
 * Mirrors the membership page: one sentence-style selector for region and term,
 * then side-by-side product cards. Replaces the previous layout, which listed
 * Domestic and International pricing as two separate sections (four cards for
 * what is really two choices) and led with a Scribd preview embed.
 *
 * Digital Only is a real catalog product (NH-NH_*_ONL) that the page never
 * offered. Subscribing goes straight to checkout rather than /membership/join,
 * which sells memberships and cannot take a Naval History subscription.
 */

function CheckIcon() {
  return (
    <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#0466c8]" viewBox="0 0 16 16" fill="none">
      <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function NavalHistorySubscribe() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [region, setRegion] = useState<Region>('us')
  const [term, setTerm] = useState<Term>('1')

  const unit = term === '1' ? '/ yr' : '/ 3 yrs'

  /*
   * Step 2 is the membership cross-promotion, which self-skips for a signed-in
   * member. The flag rides the URL because the prototype has no shared auth —
   * append ?member=true here to see a member's path straight to the cart.
   */
  const subscribe = (format: Format) => {
    const { price } = offerFor(format, region, term)
    const member = searchParams.get('member') === 'true' ? '&member=true' : ''
    navigate(
      `/naval-history/subscribe/membership-upsell?term=${term}&region=${region}` +
        `&format=${format}&price=${price}${member}`,
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <NavalHistorySubNav />

        {/* ── Hero ── */}
        <PageHero
          align="center"
          title="Subscribe to Naval History"
          description="The award-winning bimonthly magazine dedicated to the preservation and promotion of naval history — battle accounts, enduring mysteries, essays, and book reviews, six times a year."
        />

        {/* ── Selection ── */}
        <section className="bg-white pt-12 lg:pt-16 pb-16 lg:pb-20">
          <div className="container-site">
            <h2 className="font-headline text-4xl lg:text-[52px] text-navy-bolder leading-[1.1] mb-10 text-center">
              Choose your subscription
            </h2>

            {/* Sentence-style selectors, matching the membership page */}
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-4 pb-8 border-b border-[#c4c9d4]">
              <SentenceText>I live</SentenceText>
              <SentenceSelect
                aria-label="Where you live"
                value={region}
                onChange={v => setRegion(v as Region)}
                options={[
                  { value: 'us', label: 'in the U.S.' },
                  { value: 'international', label: 'outside the U.S.' },
                ]}
              />
              <SentenceText>and want to buy a</SentenceText>
              <SentenceSelect
                aria-label="Subscription term"
                value={term}
                onChange={v => setTerm(v as Term)}
                options={[
                  { value: '1', label: '1-year' },
                  { value: '3', label: '3-year' },
                ]}
              />
              <SentenceText>subscription.</SentenceText>
            </div>

            <p className="font-body text-[15px] text-neutral-subtle text-center mt-5">
              Digital is the same price wherever you live — where you live affects print delivery only.
            </p>

            {/* ── Format cards ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8 items-stretch max-w-[980px] mx-auto">
              {(['print', 'digital'] as const).map(format => {
                const { price, memberPrice, originalPrice } = offerFor(format, region, term)
                const isPrint = format === 'print'
                return (
                  <div
                    key={format}
                    className={`bg-white border flex flex-col ${isPrint ? 'border-navy-bolder' : 'border-[#c4c9d4]'}`}
                  >
                    {isPrint && (
                      <p className="bg-navy-bolder text-white font-body font-bold text-[12px] uppercase tracking-[0.1em] text-center py-2">
                        Most popular
                      </p>
                    )}

                    <div className="p-8 flex flex-col gap-5 flex-1">
                      <div>
                        <h3 className="font-headline text-[32px] text-navy-bolder leading-[1.1]">
                          {FORMAT_LABELS[format]}
                        </h3>
                        <div className="flex items-baseline gap-2 mt-3">
                          {originalPrice && (
                            <span className="font-body text-[16px] text-neutral-subtle">
                              ${originalPrice}
                            </span>
                          )}
                          <span className="font-headline text-[46px] text-navy-bolder leading-none">
                            ${price}
                          </span>
                          <span className="font-body text-sm text-neutral-subtle">{unit}</span>
                        </div>
                        <p className="font-body text-sm text-neutral-subtle mt-1.5">
                          Naval Institute members pay{' '}
                          <strong className="text-navy-bolder">${memberPrice}</strong>
                        </p>
                      </div>

                      <p className="font-body text-base text-neutral-subtle leading-relaxed">
                        {FORMAT_BLURBS[format]}
                      </p>

                      <div className="h-px bg-[#e2e8f0]" />

                      <ul className="flex flex-col gap-2.5">
                        {FEATURES[format].map(f => (
                          <li
                            key={f}
                            className="flex items-start gap-2.5 font-body text-[15px] text-neutral-subtle leading-snug"
                          >
                            <CheckIcon />
                            {f}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-auto pt-2 flex flex-col gap-3">
                        <button
                          type="button"
                          onClick={() => subscribe(format)}
                          className={`flex items-center justify-center gap-2 font-body font-bold text-base tracking-[-0.3px] px-6 py-4 border transition-colors ${
                            isPrint
                              ? 'bg-navy-bolder text-white border-navy-bolder hover:bg-navy-bright hover:border-navy-bright'
                              : 'bg-white text-navy-bolder border-navy-bolder hover:bg-navy-bright hover:text-white hover:border-navy-bright'
                          }`}
                        >
                          Subscribe — {FORMAT_LABELS[format]}
                        </button>
                        <a
                          href="/login"
                          className="mx-auto font-body text-sm text-link"
                        >
                          Already a member? Sign in for member pricing
                        </a>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── Membership cross-sell ── */}
        <section
          className="relative w-full bg-cover bg-center overflow-hidden"
          style={{ backgroundImage: `url(${crossSellImg})`, minHeight: '480px' }}
        >
          <div className="absolute inset-0 bg-navy-boldest/20" aria-hidden="true" />

          <div className="relative container-site h-full flex items-center justify-end min-h-[480px]">
            <div className="bg-white p-8 lg:p-12 w-full max-w-full md:max-w-[480px] lg:max-w-[560px] my-20">
              <h2 className="font-headline text-4xl lg:text-5xl text-navy-bolder leading-[1.1] mb-4">
                Naval History comes with membership
              </h2>
              <p className="font-body text-base text-neutral-subtle leading-relaxed mb-6">
                A Naval Institute membership includes Proceedings and the complete digital archive, and
                lets you add Naval History at the member rate. If you are joining anyway, that is the
                cheaper route.
              </p>
              <a
                href="/membership/join"
                className="inline-flex items-center justify-center gap-2 bg-white text-navy-bolder font-body font-bold text-sm tracking-[-0.3px] px-6 py-3.5 border border-navy-bolder hover:bg-navy-bright hover:text-white hover:border-navy-bright transition-colors"
              >
                Compare memberships
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
