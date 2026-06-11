import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'

const PLAN_LABELS: Record<string, string> = {
  digital: 'Digital Membership',
  full: 'Full Membership',
  student: 'Student Membership',
  life: 'Life Membership',
}

const TERM_LABELS: Record<string, string> = {
  '1': '1 year',
  '3': '3 years',
  life: 'Lifetime',
}

function TextInput({ label, placeholder, className = '' }: { label: string; placeholder: string; className?: string }) {
  return (
    <div className={`flex flex-col ${className}`}>
      <label className="font-body font-bold text-[16px] text-[#1d2535] leading-none block mb-2">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full bg-white border border-[#4e576a] px-4 py-3 font-body text-[16px] text-[#4e576a] placeholder:text-[#4e576a] focus:outline-none focus:ring-2 focus:ring-[#023e7d]/30 focus:border-[#023e7d] min-h-[44px] rounded-none"
      />
    </div>
  )
}

function SelectInput({ label, placeholder, options, className = '' }: {
  label: string
  placeholder: string
  options: string[]
  className?: string
}) {
  return (
    <div className={`flex flex-col ${className}`}>
      <label className="font-body font-bold text-[16px] text-[#1d2535] leading-none block mb-2">{label}</label>
      <div className="relative">
        <select
          defaultValue=""
          className="w-full appearance-none bg-white border border-[#4e576a] px-4 py-3 font-body text-[16px] text-[#4e576a] focus:outline-none focus:ring-2 focus:ring-[#023e7d]/30 focus:border-[#023e7d] min-h-[44px] pr-10 rounded-none"
        >
          <option value="" disabled>{placeholder}</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
          <svg className="w-3 h-3 text-[#33415c]" viewBox="0 0 12 10" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 3l5 5 5-5" />
          </svg>
        </div>
      </div>
    </div>
  )
}

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
  'VA','WA','WV','WI','WY',
]

const COUNTRIES = [
  'United States','Canada','United Kingdom','Australia','Germany',
  'Japan','South Korea','France','Italy','Spain','Brazil','Mexico',
]

const MILITARY_STATUSES = [
  'Active Duty','Reserve','National Guard','Veteran','Retired Military','Civilian','Government',
]

export default function CartItems() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [isGift, setIsGift] = useState(false)

  const plan  = searchParams.get('plan')  ?? 'full'
  const term  = searchParams.get('term')  ?? '1'
  const price = searchParams.get('price') ?? '75'

  const planLabel  = PLAN_LABELS[plan]  ?? 'Full Membership'
  const termLabel  = TERM_LABELS[term]  ?? '1 year'
  const priceLabel = plan === 'life'
    ? `$${price} one-time`
    : term === '1'
    ? `$${price}/yr`
    : `$${price} for 3 years`

  return (
    <section className="bg-white py-16">
      <div className="container-site flex flex-col gap-8">

        {/* Alert banner */}
        <div className="bg-[#fff8d6] border-l-4 border-[#ffaa00] px-8 py-6 flex flex-col gap-4">
          <h2 className="font-headline text-[36px] text-[#1d2535] leading-[1.2]">
            Finalize your USNI membership
          </h2>
          <p className="font-body text-[20px] text-black leading-[1.4]">
            Let's finalize checkout – we are excited to welcome you to USNI! If you have any questions with the process, please{' '}
            <a href="/membership/contact" className="text-[#023e7d] underline underline-offset-2 hover:text-[#001845] transition-colors">
              contact membership services
            </a>.
          </p>
        </div>

        {/* "Cart items" heading */}
        <div className="border-b border-[#0466c8] pb-6">
          <h2 className="font-headline text-[56px] text-[#1d2535] leading-[1.1]">Cart items</h2>
        </div>

        {/* Selected item row */}
        <div className="flex flex-col gap-2">
          <h3 className="font-headline text-[36px] text-[#023e7d] leading-[1.2]">{planLabel}</h3>
          <div className="flex items-center gap-6">
            <p className="font-body text-[20px] text-[#4e576a]">
              <span className="font-bold">Term:</span> {termLabel}
            </p>
            <div className="w-px h-7 bg-[#d9d9d9]" aria-hidden />
            <p className="font-body text-[20px] text-[#4e576a]">
              <span className="font-bold">Price:</span> {priceLabel}
            </p>
          </div>
        </div>

        {/* Gift checkbox */}
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={isGift}
            onChange={(e) => setIsGift(e.target.checked)}
            className="w-5 h-5 accent-[#023e7d] cursor-pointer flex-shrink-0"
          />
          <span className="font-body font-bold text-[16px] text-[#1d2535]">
            I would like to purchase this membership as a gift
          </span>
        </label>

        {/* Gift recipient form — shown when checkbox is checked */}
        {isGift && (
          <div className="border border-[#999fad]">
            <div className="p-6 flex flex-col gap-5">

              <div className="flex flex-col gap-3">
                <h3 className="font-headline text-[36px] text-[#1d2535] leading-[1.2]">
                  Gift Recipient Information
                </h3>
                <p className="font-body text-[20px] text-[#4e576a] leading-[1.4]">
                  Complete the gift account information below.
                </p>
              </div>

              <div className="flex gap-8 pt-4">
                <TextInput label="First Name" placeholder="Enter first name" className="flex-1" />
                <TextInput label="Last Name" placeholder="Enter last name" className="flex-1" />
                <TextInput label="Email Address" placeholder="Enter email address" className="flex-1" />
              </div>

              <div className="h-px bg-[#c4c9d4]" aria-hidden />

              {/* Rank Details */}
              <div className="bg-[#f4f4f6] p-6 flex flex-col gap-5">
                <h4 className="font-headline text-[24px] text-[#1d2535] leading-[1.3]">Rank Details</h4>
                <div className="flex gap-8 pt-2">
                  <SelectInput
                    label="Military Status"
                    placeholder="-- Select Military Status --"
                    options={MILITARY_STATUSES}
                    className="flex-1"
                  />
                  <TextInput label="Rank/Title" placeholder="Enter rank or title" className="flex-1" />
                  <TextInput label="Suffix" placeholder="Enter suffix" className="flex-1" />
                </div>
              </div>

              <div className="flex gap-8 pt-2">
                <TextInput label="Street Address" placeholder="Enter street address" className="flex-1" />
                <TextInput label="Street Address Line Two" placeholder="Enter street address line two" className="flex-1" />
              </div>

              <div className="flex gap-8 pt-2">
                <SelectInput label="Country" placeholder="-- Select Country --" options={COUNTRIES} className="flex-1" />
                <TextInput label="City" placeholder="Enter city" className="flex-1" />
                <SelectInput label="State" placeholder="-- Select State --" options={US_STATES} className="flex-1" />
                <TextInput label="Zip code" placeholder="Enter zip code" className="flex-none w-[193px]" />
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  className="flex items-center gap-2 bg-navy-bold text-white font-body font-bold text-[16px] tracking-[-0.5px] px-6 py-4 hover:bg-navy transition-colors"
                >
                  Add Gift Recipient Information
                  <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 6h8M6 2l4 4-4 4" />
                  </svg>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Step navigation buttons */}
        <div className="border-t border-[#999fad] pt-8 flex items-center justify-end gap-8">
          <button
            type="button"
            onClick={() => navigate('/membership/join')}
            className="flex items-center gap-2 border border-[#002b5c] text-[#001845] font-body font-extrabold text-[20px] py-8 px-8 hover:bg-[#f0f4f8] transition-colors"
          >
            <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 6H2M6 2L2 6l4 4" />
            </svg>
            Back to Membership Options
          </button>
          <button
            type="button"
            onClick={() => navigate('/membership/checkout')}
            className="flex items-center gap-2 bg-[#002b5c] text-white font-body font-extrabold text-[20px] py-8 px-8 hover:bg-[#001845] transition-colors"
          >
            Continue to Checkout
            <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 6h8M6 2l4 4-4 4" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  )
}
