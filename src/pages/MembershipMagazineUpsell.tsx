import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import nhMagazineGrid from '@/assets/images/nh-magazine-covers/nh-magazine-grid.png'

type Region = 'us' | 'international'
type Term = '1' | '3'

const PRICING: Record<Region, Record<Term, { price: number; originalPrice: number | null; unit: string }>> = {
  us: {
    '1': { price: 32, originalPrice: null, unit: '/ yr' },
    '3': { price: 90, originalPrice: 96, unit: '/ 3 yrs' },
  },
  international: {
    '1': { price: 52, originalPrice: null, unit: '/ yr' },
    '3': { price: 150, originalPrice: 156, unit: '/ 3 yrs' },
  },
}

const FEATURES = [
  'Six issues per year delivered to your door',
  'Unlimited digital access on all devices',
  'Complete digital archive included',
  'Member discount pricing — save 28%',
]

function CheckIcon() {
  return (
    <svg className="w-4 h-4 flex-shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none">
      <path d="M3 8l3.5 3.5L13 4.5" stroke="#023e7d" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function MembershipMagazineUpsell() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const plan   = searchParams.get('plan')   ?? 'full'
  const term   = searchParams.get('term')   ?? '1'
  const region = searchParams.get('region') ?? 'us'
  const price  = searchParams.get('price')  ?? '75'

  const defaultMagTerm: Term = (term === '3' ? '3' : '1') as Term
  const defaultMagRegion: Region = (region === 'international' ? 'international' : 'us') as Region

  const [magRegion, setMagRegion] = useState<Region>(defaultMagRegion)
  const [magTerm, setMagTerm] = useState<Term>(defaultMagTerm)

  const { price: magPrice, originalPrice, unit } = PRICING[magRegion][magTerm]

  const cartBase = `/membership/cart?plan=${plan}&term=${term}&region=${region}&price=${price}`

  const handleAdd = () => {
    navigate(`${cartBase}&magTerm=${magTerm}&magRegion=${magRegion}&magPrice=${magPrice}`)
  }

  const handleSkip = () => {
    navigate(cartBase)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-white">

        {/* Alert banner */}
        <div className="bg-[#fff8d6] border-b border-[#ffaa00]">
          <div className="container-site py-5">
            <p className="font-body text-[18px] text-[#1d2535] leading-[1.4]">
              <span className="font-bold">Your membership has been added to the cart.</span>{' '}
              Enhance your experience with a Naval History Magazine subscription, or{' '}
              <button
                type="button"
                onClick={handleSkip}
                className="text-[#023e7d] underline underline-offset-2 hover:text-[#001845] transition-colors font-bold"
              >
                continue to cart
              </button>.
            </p>
          </div>
        </div>

          {/* ── Billboard ── */}
        <div className="py-10 lg:py-16">
          <div className="max-w-[1312px] mx-auto px-4 lg:px-8">
            {/*
              The magazine grid (31.3% wide, aspect ≈ 411/525) overflows the
              billboard box by ~4.8% of container width (≈ 63px at 1312px) top
              and bottom, achieved by setting equal top/bottom margins on the
              billboard within this relative wrapper.
            */}
            <div className="relative">

              {/* Billboard box: #F7F7F2 bg + #D9D7BF border */}
              <div
                className="bg-[#F7F7F2] border border-[#D9D7BF] px-10 lg:px-16 flex items-center relative overflow-visible"
                style={{
                  paddingTop:    'clamp(40px, 6.5%, 84px)',
                  paddingBottom: 'clamp(40px, 6.5%, 84px)',
                  marginTop:    'clamp(32px, 4.8%, 63px)',
                  marginBottom: 'clamp(32px, 4.8%, 63px)',
                }}
              >
                {/* Text content — left 57% */}
                <div className="w-full lg:w-[57%] flex flex-col gap-4 relative z-10">
                  <p className="eyebrow">Enhance Your Membership</p>
                  <h2 className="font-headline text-[36px] lg:text-[48px] xl:text-[52px] text-navy-bolder leading-[1.1]">
                    Add a Naval History Magazine Subscription
                  </h2>
                  <p className="font-body text-[18px] text-neutral-subtle leading-[1.5]">
                    The world's most authoritative and engaging periodical for readers interested in our nautical heritage.
                  </p>
                </div>

              </div>

              {/* Magazine covers — absolute, overflows billboard top & bottom, z-20 above inner frame */}
              <img
                src={nhMagazineGrid}
                alt="Naval History Magazine covers"
                aria-hidden="true"
                className="absolute top-0 hidden lg:block pointer-events-none select-none z-20"
                style={{
                  width: '31.3%',
                  right: '7.3%',
                  top: '-15%',
                  filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.20))',
                }}
              />

            </div>
          </div>
        </div>

        <div className="container-site py-8 flex flex-col items-center gap-10">

          {/* Sentence selector */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-4">
            <span className="font-headline text-[28px] lg:text-[36px] text-neutral-subtle leading-[1.2]">I live</span>

            <div className="relative inline-block">
              <select
                value={magRegion}
                onChange={e => setMagRegion(e.target.value as Region)}
                className="appearance-none bg-white border border-navy-subtle text-navy-bolder font-headline text-[28px] lg:text-[36px] leading-[1.2] pl-4 pr-10 py-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0466c8]"
              >
                <option value="us">in the U.S.</option>
                <option value="international">outside the U.S.</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <svg className="w-5 h-5 text-navy-subtle" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 8l5 5 5-5" />
                </svg>
              </div>
            </div>

            <span className="font-headline text-[28px] lg:text-[36px] text-neutral-subtle leading-[1.2]">and want to add a</span>

            <div className="relative inline-block">
              <select
                value={magTerm}
                onChange={e => setMagTerm(e.target.value as Term)}
                className="appearance-none bg-white border border-navy-subtle text-navy-bolder font-headline text-[28px] lg:text-[36px] leading-[1.2] pl-4 pr-10 py-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0466c8]"
              >
                <option value="1">1-year</option>
                <option value="3">3-year</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <svg className="w-5 h-5 text-navy-subtle" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 8l5 5 5-5" />
                </svg>
              </div>
            </div>

            <span className="font-headline text-[28px] lg:text-[36px] text-neutral-subtle leading-[1.2]">subscription to Naval History magazine.</span>
          </div>

          {/* Magazine card */}
          <div className="w-full max-w-[860px] bg-white border border-[#c4c9d4]">
            <div className="flex flex-col flex-1 px-8 py-8 gap-6">

              {/* Title + price */}
              <div className="flex items-start justify-between gap-4">
                <h2 className="font-headline text-[32px] text-navy-bolder leading-[1.1]">Print &amp; Digital</h2>

                <div className="flex flex-col items-end flex-shrink-0">
                  <span className="bg-gold font-body font-bold text-[11px] uppercase tracking-[0.12em] text-navy-bolder px-2 py-1 mb-2">
                    Member Price
                  </span>
                  <div className="flex items-baseline gap-2">
                    {originalPrice && (
                      <span className="font-body text-base text-neutral-subtle line-through">
                        ${originalPrice}
                      </span>
                    )}
                    <div className="flex items-start">
                      <span className="font-body font-bold text-base text-navy-bolder mt-[4px]">$</span>
                      <span className="font-headline text-[48px] text-navy-bolder leading-[1.0]">{magPrice}</span>
                    </div>
                  </div>
                  <span className="font-body text-sm text-neutral-subtle">{unit}</span>
                </div>
              </div>

              {/* Description */}
              <p className="font-body text-[18px] text-neutral-subtle leading-[1.5]">
                Receive Naval History Magazine in print plus full digital access to every issue.
              </p>

              {/* CTA */}
              <button
                type="button"
                onClick={handleAdd}
                className="flex items-center justify-center w-full bg-navy-bolder text-white font-body font-bold text-base px-6 py-4 hover:bg-navy transition-colors"
              >
                Add to Cart
              </button>

              {/* Features */}
              <ul className="flex flex-col border-t border-[#e4e7ec] pt-5 gap-1">
                {FEATURES.map(f => (
                  <li key={f} className="flex items-start gap-2 py-0.5">
                    <CheckIcon />
                    <span className="font-body text-[15px] text-neutral-subtle leading-[1.5]">{f}</span>
                  </li>
                ))}
              </ul>

            </div>
          </div>

          {/* Skip */}
          <button
            type="button"
            onClick={handleSkip}
            className="font-body font-bold text-[16px] text-[#023e7d] border border-[#023e7d] px-8 py-4 hover:bg-[#f0f4ff] transition-colors"
          >
            No thanks, continue to cart
          </button>

        </div>
      </main>
      <Footer />
    </div>
  )
}
