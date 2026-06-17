import { useState } from 'react'

type Region = 'us' | 'international'
type Term = '1' | '3' | 'lifetime'

// ─── Feature lists ────────────────────────────────────────────────────────────

const digitalFeatures = [
  'Digital edition of Proceedings + full access to USNI.org.',
  'NEW: Interactive flippable PDF edition of Proceedings (Nov 2024 onward).',
  "NEW: 20% off the Naval Institute Ship's Store.",
  'Up to 40% off Naval Institute Press titles.',
  '28% off Naval History Magazine.',
  'Sea Scroll — the weekly members-only USNI newsletter.',
  'Free invitations to USNI conference series + discounted access to WEST, the largest Sea Services conference.',
  '150+ years of archives — oral histories, photographs, and every Proceedings article from 1874 to today.',
  'A voice in the open forum to advance the naval profession.',
]

const fullFeatures = [
  'Print Proceedings delivered monthly + digital edition + full USNI.org access.',
  'NEW: Interactive flippable PDF edition of Proceedings (Nov 2024 onward).',
  "NEW: 20% off the Naval Institute Ship's Store.",
  'Up to 40% off Naval Institute Press titles.',
  '28% off Naval History Magazine.',
  'Sea Scroll — the weekly members-only USNI newsletter.',
  'Free invitations to USNI conference series + discounted access to WEST, the largest Sea Services conference.',
  '150+ years of archives — oral histories, photographs, and every Proceedings article from 1874 to today.',
  'A voice in the open forum to advance the naval profession.',
]

const studentFeatures = [
  'Print and digital Proceedings + full access to USNI.org.',
  'NEW: Interactive flippable PDF edition of Proceedings (Nov 2024 onward).',
  "NEW: 20% off the Naval Institute Ship's Store.",
  'Up to 40% off Naval Institute Press titles.',
  '28% off Naval History Magazine.',
  'Sea Scroll — the weekly members-only USNI newsletter.',
  'Free invitations to USNI conference series + discounted access to WEST, the largest Sea Services conference.',
  '150+ years of archives — oral histories, photographs, and every Proceedings article from 1874 to today.',
  'A voice in the open forum to advance the naval profession.',
]

const lifeExtras = [
  'A Naval Institute Fleece Pullover.',
  'An official Life Member Baseball Cap.',
  'An embroidered Naval Institute patch.',
  'A Naval Institute lapel pin.',
  'Naval Institute decals and a special Life Member certificate.',
]

// ─── Pricing data ─────────────────────────────────────────────────────────────

interface TierDef {
  plan: string
  name: string
  price: number | null
  originalPrice?: number
  description: string
  features: string[]
  isMostPopular?: boolean
}

type AnnualTerm = '1' | '3'

const pricingData: Record<Region, Record<AnnualTerm, TierDef[]>> = {
  us: {
    '1': [
      { plan: 'digital', name: 'Digital', price: 45, description: 'Full online access to USNI.org and the digital edition of Proceedings.', features: digitalFeatures },
      { plan: 'full', name: 'Full', price: 75, description: 'Everything in Digital plus the print edition of Proceedings mailed monthly.', features: fullFeatures, isMostPopular: true },
      { plan: 'student', name: 'Student', price: 20, description: 'For full-time students and active-duty personnel in professional military education.', features: studentFeatures },
    ],
    '3': [
      { plan: 'digital', name: 'Digital', price: 120, originalPrice: 135, description: 'Full online access to USNI.org and the digital edition of Proceedings.', features: digitalFeatures },
      { plan: 'full', name: 'Full', price: 195, originalPrice: 225, description: 'Everything in Digital plus the print edition of Proceedings mailed monthly.', features: fullFeatures, isMostPopular: true },
    ],
  },
  international: {
    '1': [
      { plan: 'digital', name: 'Digital', price: 60, description: 'Full online access to USNI.org and the digital edition of Proceedings.', features: digitalFeatures },
      { plan: 'full', name: 'Full', price: 95, description: 'Everything in Digital plus the print edition of Proceedings mailed monthly.', features: fullFeatures, isMostPopular: true },
      { plan: 'student', name: 'Student', price: 30, description: 'For full-time students and active-duty personnel in professional military education.', features: studentFeatures },
    ],
    '3': [
      { plan: 'digital', name: 'Digital', price: 165, originalPrice: 180, description: 'Full online access to USNI.org and the digital edition of Proceedings.', features: digitalFeatures },
      { plan: 'full', name: 'Full', price: 255, originalPrice: 285, description: 'Everything in Digital plus the print edition of Proceedings mailed monthly.', features: fullFeatures, isMostPopular: true },
    ],
  },
}

// ─── Lifetime data ────────────────────────────────────────────────────────────

interface LifetimeTierDef {
  plan: string
  name: string
  price: number
  description: string
  features: string[]
}

interface LifetimeGroupDef {
  label: string
  tiers: LifetimeTierDef[]
}

const lifetimeGroups: LifetimeGroupDef[] = [
  {
    label: 'For those under 60',
    tiers: [
      {
        plan: 'full-life',
        name: 'Full Life',
        price: 1873,
        description: 'Everything USNI for life — including print Proceedings delivered to your door.',
        features: [...fullFeatures, ...lifeExtras],
      },
      {
        plan: 'online-life',
        name: 'Online Life',
        price: 1150,
        description: 'Full digital access for life — all the content, none of the print.',
        features: [...digitalFeatures, ...lifeExtras],
      },
    ],
  },
  {
    label: '60 and older – save 34%',
    tiers: [
      {
        plan: 'senior-life',
        name: 'Senior Life',
        price: 1236.18,
        description: 'Everything USNI for life — including print Proceedings delivered to your door.',
        features: ['34% off the standard life membership rate.', ...fullFeatures, ...lifeExtras],
      },
      {
        plan: 'senior-online-life',
        name: 'Senior Online Life',
        price: 759,
        description: 'Digital-only life membership at the best available rate.',
        features: ['34% off the standard life membership rate.', ...digitalFeatures, ...lifeExtras],
      },
    ],
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function CheckIcon() {
  return (
    <svg className="w-4 h-4 flex-shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none">
      <path d="M3 8l3.5 3.5L13 4.5" stroke="#0466c8" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function TierCard({
  name,
  price,
  originalPrice,
  priceUnit,
  description,
  features,
  isMostPopular,
  showSpacer = true,
  ctaText,
  cartHref,
}: {
  name: string
  price: number | null
  originalPrice?: number
  priceUnit?: string
  description: string
  features: string[]
  isMostPopular?: boolean
  showSpacer?: boolean
  ctaText?: string
  cartHref?: string
}) {
  const disabled = price === null

  const formattedPrice = price !== null
    ? price % 1 === 0
      ? price.toLocaleString()
      : price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    : null

  const buttonLabel = ctaText ?? (price !== null ? `Join — $${formattedPrice}` : 'Not available')

  return (
    <div className={`relative flex flex-col flex-1 min-w-0 bg-white overflow-hidden
      ${isMostPopular ? 'border border-gold' : 'border border-[#c4c9d4]'}
      ${disabled ? 'opacity-50' : ''}`}
    >
      {/* Badge row */}
      {isMostPopular ? (
        <div className="bg-gold flex items-center justify-center py-2.5">
          <span className="font-body font-bold text-[11px] uppercase tracking-[0.12em] text-navy-bolder">
            Most Popular
          </span>
        </div>
      ) : showSpacer ? (
        <div className="h-[43px]" aria-hidden="true" />
      ) : null}

      <div className="flex flex-col flex-1 px-5 py-6 gap-5">
        {/* Title + price */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-headline text-[26px] text-navy-bolder leading-[1.1]">{name}</h3>

          {price !== null && (
            <div className="flex flex-col items-end flex-shrink-0">
              <div className="flex items-baseline gap-1.5">
                {originalPrice && (
                  <span className="font-body text-sm text-neutral-subtle line-through">
                    ${originalPrice.toLocaleString()}
                  </span>
                )}
                <div className="flex items-start">
                  <span className="font-body font-bold text-sm text-navy-bolder mt-[3px]">$</span>
                  <span className="font-headline text-[36px] text-navy-bolder leading-[1.0]">
                    {formattedPrice}
                  </span>
                </div>
              </div>
              {priceUnit && (
                <span className="font-body text-xs text-neutral-subtle text-right">{priceUnit}</span>
              )}
            </div>
          )}
        </div>

        {/* Description */}
        <p className="font-body text-base text-neutral-subtle leading-[1.5]">{description}</p>

        {/* CTA */}
        {!disabled ? (
          <a
            href={cartHref ?? '#'}
            className={`flex items-center justify-center w-full font-body font-bold text-base px-6 py-4 transition-colors
              ${isMostPopular
                ? 'bg-gold text-navy-bolder hover:bg-gold-dark'
                : 'bg-navy-bolder text-white hover:bg-navy-bold'
              }`}
          >
            {buttonLabel}
          </a>
        ) : (
          <div className="flex items-center justify-center w-full bg-[#c4c9d4] text-white font-body font-bold text-base px-6 py-4 cursor-not-allowed">
            Not available
          </div>
        )}

        {/* Features */}
        <ul className="flex flex-col border-t border-[#e4e7ec] pt-4 gap-0.5">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-2 py-0.5">
              <CheckIcon />
              <span className="font-body text-sm text-neutral-subtle leading-[1.5]">{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function DropdownSelect({
  value,
  onChange,
  options,
}: {
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <div className="relative inline-block">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-white border border-navy-subtle text-navy-bolder font-headline text-[28px] lg:text-[36px] leading-[1.2] pl-4 pr-10 py-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0466c8]"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
        <svg className="w-5 h-5 text-navy-subtle" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 8l5 5 5-5" />
        </svg>
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function MembershipCustomizer() {
  const [region, setRegion] = useState<Region>('us')
  const [term, setTerm] = useState<Term>('1')

  function handleTermChange(v: string) {
    const next = v as Term
    setTerm(next)
    if (next === 'lifetime') setRegion('us')
  }

  const priceUnit = term === '1' ? '/ yr' : term === '3' ? '/ 3 yrs' : ''
  const isLifetime = term === 'lifetime'

  return (
    <section className="bg-white pt-10 pb-section">
      <div className="container-site">
        <h2 className="font-headline text-4xl lg:text-[56px] text-navy-bolder leading-[1.1] mb-10 text-center">
          Find the right membership for you
        </h2>

        {/* Sentence-style selectors */}
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-4 pb-8 border-b border-[#c4c9d4]">
          <span className="font-headline text-[28px] lg:text-[36px] text-neutral-subtle leading-[1.2]">I live</span>

          {!isLifetime && (
            <DropdownSelect
              value={region}
              onChange={(v) => setRegion(v as Region)}
              options={[
                { value: 'us', label: 'in the U.S.' },
                { value: 'international', label: 'outside the U.S.' },
              ]}
            />
          )}
          {isLifetime && (
            <span className="font-headline text-[28px] lg:text-[36px] text-navy-bolder leading-[1.2] border border-navy-subtle px-4 py-3">in the U.S.</span>
          )}

          <span className="font-headline text-[28px] lg:text-[36px] text-neutral-subtle leading-[1.2]">and want to buy a</span>

          <DropdownSelect
            value={term}
            onChange={handleTermChange}
            options={[
              { value: '1', label: '1-year' },
              { value: '3', label: '3-year' },
              { value: 'lifetime', label: 'lifetime' },
            ]}
          />

          <span className="font-headline text-[28px] lg:text-[36px] text-neutral-subtle leading-[1.2]">membership.</span>
        </div>

        {/* ── Annual tier cards ── */}
        {!isLifetime && (
          <div className="flex flex-col lg:flex-row gap-8 mt-8 items-stretch">
            {pricingData[region][term as AnnualTerm].map((tier) => (
              <TierCard
                key={tier.plan}
                name={tier.name}
                price={tier.price}
                originalPrice={tier.originalPrice}
                priceUnit={priceUnit}
                description={tier.description}
                features={tier.features}
                isMostPopular={tier.isMostPopular}
                cartHref={tier.price !== null
                  ? `/membership/magazine-upsell?plan=${tier.plan}&term=${term}&region=${region}&price=${tier.price}`
                  : undefined
                }
              />
            ))}
          </div>
        )}

        {/* ── Lifetime cards ── */}
        {isLifetime && (
          <div className="flex flex-col gap-12 mt-8">
            {lifetimeGroups.map((group) => (
              <div key={group.label}>
                <h3 className="font-headline text-2xl lg:text-3xl text-navy-bolder mb-6">
                  {group.label}
                </h3>
                <div className="flex flex-col lg:flex-row gap-8 items-stretch">
                  {group.tiers.map((tier) => (
                    <TierCard
                      key={tier.plan}
                      name={tier.name}
                      price={tier.price}
                      priceUnit=""
                      description={tier.description}
                      features={tier.features}
                      showSpacer={false}
                      ctaText={`Select ${tier.name}`}
                      cartHref={`/membership/cart?plan=${tier.plan}&term=lifetime&region=us&price=${tier.price}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
