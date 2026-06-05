import { useState } from 'react'

type Region = 'us' | 'international'
type Term = '1' | '3'

interface TierPricing {
  digital: number | null
  full: number
  student: number | null
}

const pricing: Record<Region, Record<Term, TierPricing>> = {
  us: {
    '1': { digital: 45, full: 75, student: 20 },
    '3': { digital: 120, full: 195, student: null },
  },
  international: {
    '1': { digital: null, full: 110, student: 30 },
    '3': { digital: null, full: 285, student: null },
  },
}

function CheckIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={`w-4 h-4 flex-shrink-0 ${className}`} viewBox="0 0 16 16" fill="none">
      <path d="M3 8l3.5 3.5L13 4.5" stroke="#0466c8" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function StarIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={`w-4 h-4 flex-shrink-0 ${className}`} viewBox="0 0 16 16" fill="none">
      <path d="M8 2l1.5 3.5L13 6l-2.5 2.5.5 3.5L8 10.5 5 12l.5-3.5L3 6l3.5-.5L8 2z" fill="#0466c8" />
    </svg>
  )
}

interface FeatureItem {
  text: string
  highlight?: boolean
}

const digitalFeatures: FeatureItem[] = [
  { text: 'Full USNI.org access' },
  { text: 'Digital Proceedings + interactive PDF' },
  { text: '150+ years of archives' },
  { text: 'Sea Scroll newsletter' },
  { text: "20% off Ship's Store" },
  { text: 'Up to 40% off NI Press books' },
  { text: '28% off Naval History Magazine' },
  { text: 'Conference invitations + WEST discount' },
]

const fullFeatures: FeatureItem[] = [
  { text: 'Print edition of Proceedings', highlight: true },
  { text: 'Digital Proceedings + interactive PDF' },
  { text: '150+ years of archives' },
  { text: 'Sea Scroll newsletter' },
  { text: "20% off Ship's Store" },
  { text: 'Up to 40% off NI Press books' },
  { text: '28% off Naval History Magazine' },
  { text: 'Conference invitations + WEST discount' },
]

const studentFeatures: FeatureItem[] = [
  { text: 'Print + digital Proceedings', highlight: true },
  { text: 'Full USNI.org access' },
  { text: 'Interactive PDF (Nov 2024+)' },
  { text: 'Digital Proceedings + interactive PDF' },
  { text: '150+ years of archives' },
  { text: 'Sea Scroll newsletter' },
  { text: "20% off Ship's Store" },
  { text: 'Up to 40% off NI Press books' },
  { text: '28% off Naval History Magazine' },
]

function TierCard({
  name,
  price,
  description,
  features,
  isMostPopular,
  disabled,
}: {
  name: string
  price: number | null
  description: string
  features: FeatureItem[]
  isMostPopular?: boolean
  disabled?: boolean
}) {
  return (
    <div className={`relative flex flex-col flex-1 min-w-0 ${isMostPopular ? 'border-4 border-[#0466c8]' : 'border border-[#999fad]'} bg-white overflow-hidden ${disabled ? 'opacity-50' : ''}`}>
      {/* Most popular badge */}
      {isMostPopular && (
        <div className="bg-[#0466c8] flex items-center justify-center py-2">
          <span className="font-body font-medium text-[18px] uppercase tracking-[0.06em] text-white">
            Most Popular
          </span>
        </div>
      )}

      {/* Spacer to align non-badged cards with badged one */}
      {!isMostPopular && <div className="h-[43px]" aria-hidden="true" />}

      <div className="flex flex-col gap-4 px-5 py-6 flex-1">
        {/* Headline + price */}
        <div className="flex items-start justify-between border-b border-[#0466c8] pb-2">
          <h3 className="font-headline text-[28px] text-navy-bolder leading-[1.2] flex-1">
            {name}
          </h3>
          {price !== null && (
            <div className="flex items-start gap-0.5 flex-shrink-0">
              <span className="font-body font-bold text-base text-navy-subtle mt-1.5">$</span>
              <span className="font-headline text-[36px] text-navy-subtle leading-[1.3]">{price}</span>
            </div>
          )}
          {price === null && (
            <span className="font-body font-bold text-sm text-neutral-subtle mt-2">Not available</span>
          )}
        </div>

        {/* Description */}
        <p className="font-body text-xl text-neutral-subtle leading-[1.4]">
          {description}
        </p>

        {/* CTA */}
        <div>
          {price !== null && !disabled ? (
            <a
              href="#"
              className="flex items-center justify-center gap-2 w-full bg-navy-bold text-white font-body font-bold text-base tracking-[-0.5px] px-6 py-4 border border-navy-bold hover:bg-navy transition-colors"
            >
              Select {name}
              <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 6h8M6 2l4 4-4 4" />
              </svg>
            </a>
          ) : (
            <div className="flex items-center justify-center w-full bg-[#c4c9d4] text-white font-body font-bold text-base px-6 py-4 cursor-not-allowed">
              Not available for this selection
            </div>
          )}
        </div>

        {/* Feature list */}
        <ul className="flex flex-col border-t border-gold pt-4 gap-1">
          {features.map((f) => (
            <li key={f.text} className="flex items-center gap-2 py-1">
              {f.highlight ? <StarIcon /> : <CheckIcon />}
              <span className={`font-body text-sm text-neutral-subtle leading-[1.5] ${f.highlight ? 'font-bold' : ''}`}>
                {f.text}
              </span>
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

export default function MembershipCustomizer() {
  const [region, setRegion] = useState<Region>('us')
  const [term, setTerm] = useState<Term>('1')

  const prices = pricing[region][term]

  return (
    <section className="bg-white py-section">
      <div className="container-site">
        <h2 className="font-headline text-4xl lg:text-[56px] text-navy-bolder leading-[1.1] mb-10">
          Find the right membership for you
        </h2>

        {/* Inline sentence-style dropdowns */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-4 pb-8 border-b border-[#c4c9d4]">
          <span className="font-headline text-[28px] lg:text-[36px] text-neutral-subtle leading-[1.2]">I live</span>
          <DropdownSelect
            value={region}
            onChange={(v) => setRegion(v as Region)}
            options={[
              { value: 'us', label: 'in the U.S.' },
              { value: 'international', label: 'outside the U.S.' },
            ]}
          />
          <span className="font-headline text-[28px] lg:text-[36px] text-neutral-subtle leading-[1.2]">and want to buy a</span>
          <DropdownSelect
            value={term}
            onChange={(v) => setTerm(v as Term)}
            options={[
              { value: '1', label: '1 year' },
              { value: '3', label: '3 year' },
            ]}
          />
          <span className="font-headline text-[28px] lg:text-[36px] text-neutral-subtle leading-[1.2]">membership.</span>
        </div>

        {/* Tier cards */}
        <div className="flex flex-col lg:flex-row gap-8 mt-8 items-stretch">
          <TierCard
            name="Digital"
            price={prices.digital}
            disabled={prices.digital === null}
            description="Full online access and the digital edition of Proceedings. No print delivery."
            features={digitalFeatures}
          />
          <TierCard
            name="Full"
            price={prices.full}
            description="Everything digital, plus the print edition of Proceedings delivered monthly."
            features={fullFeatures}
            isMostPopular
          />
          <TierCard
            name="Student"
            price={prices.student}
            disabled={prices.student === null}
            description="For full-time students, active-duty PME, and military college program participants."
            features={studentFeatures}
          />
        </div>
      </div>
    </section>
  )
}
