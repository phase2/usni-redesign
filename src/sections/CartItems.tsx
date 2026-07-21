import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useCart } from '@/context/CartContext'

const PLAN_LABELS: Record<string, string> = {
  digital: 'Digital Membership',
  full: 'Full Membership',
  student: 'Student Membership',
  life: 'Life Membership',
  'full-life': 'Full Life Membership',
  'online-life': 'Online Life Membership',
  'senior-life': 'Senior Life Membership',
  'senior-online-life': 'Senior Online Life Membership',
}

const TERM_LABELS: Record<string, string> = {
  '1': '1 year',
  '3': '3 years',
  life: 'Lifetime',
  lifetime: 'Lifetime',
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

const EMPTY_GIFT = {
  firstName: '', lastName: '', email: '',
  militaryStatus: '', rankTitle: '', suffix: '',
  street1: '', street2: '',
  country: 'United States', city: '', state: '', zip: '',
}

type GiftRecipient = typeof EMPTY_GIFT
type GiftErrors = Partial<Record<keyof GiftRecipient, string>>

// ─── Field components ─────────────────────────────────────────────────────────

function TextInput({
  label, placeholder, value, onChange, required, error, className = '',
}: {
  label: string; placeholder: string; value: string; onChange: (v: string) => void
  required?: boolean; error?: string; className?: string
}) {
  return (
    <div className={`flex flex-col ${className}`}>
      <label className="font-body font-bold text-[16px] text-[#1d2535] leading-none block mb-2">
        {label}{required && <span className="text-red-600"> *</span>}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        className={`w-full bg-white border px-4 py-3 font-body text-[16px] text-[#4e576a] placeholder:text-[#4e576a] focus:outline-none focus:ring-2 focus:ring-[#023e7d]/30 focus:border-[#023e7d] min-h-[44px] rounded-none ${error ? 'border-red-500' : 'border-[#4e576a]'}`}
      />
      {error && <span className="font-body text-sm text-red-600 mt-1">{error}</span>}
    </div>
  )
}

function SelectInput({
  label, placeholder, options, value, onChange, required, error, className = '',
}: {
  label: string; placeholder: string; options: string[]; value: string; onChange: (v: string) => void
  required?: boolean; error?: string; className?: string
}) {
  return (
    <div className={`flex flex-col ${className}`}>
      <label className="font-body font-bold text-[16px] text-[#1d2535] leading-none block mb-2">
        {label}{required && <span className="text-red-600"> *</span>}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className={`w-full appearance-none bg-white border px-4 py-3 font-body text-[16px] text-[#4e576a] focus:outline-none focus:ring-2 focus:ring-[#023e7d]/30 focus:border-[#023e7d] min-h-[44px] pr-10 rounded-none ${error ? 'border-red-500' : 'border-[#4e576a]'}`}
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
      {error && <span className="font-body text-sm text-red-600 mt-1">{error}</span>}
    </div>
  )
}

// ─── Gift summary (read-only, post-submit) ────────────────────────────────────

function GiftSummary({ recipient, onEdit }: { recipient: GiftRecipient; onEdit: () => void }) {
  const fullName = [recipient.rankTitle, recipient.firstName, recipient.lastName, recipient.suffix]
    .filter(Boolean).join(' ')
  const stateZip = [recipient.state, recipient.zip].filter(Boolean).join(' ')
  const addressLine2 = recipient.street2 ? `, ${recipient.street2}` : ''

  return (
    <div className="border border-[#999fad]">
      <div className="p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="font-headline text-[28px] text-[#1d2535] leading-[1.2]">Gift Recipient</h3>
          <button
            type="button"
            onClick={onEdit}
            className="flex items-center gap-1.5 font-body font-bold text-[16px] text-[#023e7d] underline underline-offset-2 hover:text-[#001845] transition-colors"
          >
            <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            Edit
          </button>
        </div>
        <div className="flex flex-col gap-3 pt-1">
          {[
            { label: 'Name', value: fullName },
            { label: 'Email', value: recipient.email },
            ...(recipient.militaryStatus ? [{ label: 'Military Status', value: recipient.militaryStatus }] : []),
            {
              label: 'Address',
              value: (
                <>
                  {recipient.street1}{addressLine2}<br />
                  {recipient.city}{recipient.city && stateZip ? ', ' : ''}{stateZip}<br />
                  {recipient.country}
                </>
              ),
            },
          ].map(({ label, value }) => (
            <div key={label} className="flex gap-6">
              <span className="font-body font-bold text-[15px] text-[#1d2535] w-32 flex-shrink-0">{label}</span>
              <span className="font-body text-[15px] text-[#4e576a] leading-[1.5]">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function CartItems() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const plan      = searchParams.get('plan')      ?? 'full'
  const term      = searchParams.get('term')      ?? '1'
  const price     = searchParams.get('price')     ?? '75'
  const magTerm   = searchParams.get('magTerm')
  const magPrice  = searchParams.get('magPrice')

  const planLabel  = PLAN_LABELS[plan]  ?? 'Full Membership'
  const termLabel  = TERM_LABELS[term]  ?? '1 year'
  const isLifetime = term === 'lifetime' || term === 'life' || plan.endsWith('-life') || plan === 'life'
  const priceLabel = isLifetime
    ? `$${Number(price).toLocaleString()} one-time`
    : term === '1'
    ? `$${price}/yr`
    : `$${price} for 3 years`

  const magTermLabel = magTerm === '3' ? '3 years' : '1 year'
  const magPriceLabel = magTerm === '3' ? `$${magPrice} for 3 years` : `$${magPrice}/yr`

  const [magRemoved, setMagRemoved] = useState(false)

  const [isAutoRenew, setIsAutoRenew] = useState(true)
  const [isGift, setIsGift] = useState(false)
  const [giftSubmitted, setGiftSubmitted] = useState(false)
  const [giftRecipient, setGiftRecipient] = useState<GiftRecipient>(EMPTY_GIFT)
  const [giftErrors, setGiftErrors] = useState<GiftErrors>({})

  const [isDonating, setIsDonating] = useState(false)
  const [donationPreset, setDonationPreset] = useState<number | null>(null)
  const [donationCustom, setDonationCustom] = useState('')

  const handleDonationToggle = (checked: boolean) => {
    setIsDonating(checked)
    if (!checked) { setDonationPreset(null); setDonationCustom('') }
  }

  const handleDonationPreset = (amount: number) => {
    setDonationPreset(prev => prev === amount ? null : amount)
    setDonationCustom('')
  }

  const [isMagAutoRenew, setIsMagAutoRenew] = useState(true)
  const [isMagGift, setIsMagGift] = useState(false)
  const [magGiftSubmitted, setMagGiftSubmitted] = useState(false)
  const [magGiftRecipient, setMagGiftRecipient] = useState<GiftRecipient>(EMPTY_GIFT)
  const [magGiftErrors, setMagGiftErrors] = useState<GiftErrors>({})

  const setField = (key: keyof GiftRecipient) => (val: string) =>
    setGiftRecipient(prev => ({ ...prev, [key]: val }))

  const setMagField = (key: keyof GiftRecipient) => (val: string) =>
    setMagGiftRecipient(prev => ({ ...prev, [key]: val }))

  const handleGiftToggle = (checked: boolean) => {
    setIsGift(checked)
    if (!checked) {
      setGiftSubmitted(false)
      setGiftRecipient(EMPTY_GIFT)
      setGiftErrors({})
    }
  }

  const handleMagGiftToggle = (checked: boolean) => {
    setIsMagGift(checked)
    if (!checked) {
      setMagGiftSubmitted(false)
      setMagGiftRecipient(EMPTY_GIFT)
      setMagGiftErrors({})
    }
  }

  const validateGift = (): GiftErrors => {
    const errors: GiftErrors = {}
    if (!giftRecipient.firstName.trim()) errors.firstName = 'Required'
    if (!giftRecipient.lastName.trim()) errors.lastName = 'Required'
    if (!giftRecipient.email.trim()) errors.email = 'Required'
    else if (!/\S+@\S+\.\S+/.test(giftRecipient.email)) errors.email = 'Enter a valid email'
    if (!giftRecipient.street1.trim()) errors.street1 = 'Required'
    if (!giftRecipient.country.trim()) errors.country = 'Required'
    if (!giftRecipient.city.trim()) errors.city = 'Required'
    if (!giftRecipient.zip.trim()) errors.zip = 'Required'
    return errors
  }

  const validateMagGift = (): GiftErrors => {
    const errors: GiftErrors = {}
    if (!magGiftRecipient.firstName.trim()) errors.firstName = 'Required'
    if (!magGiftRecipient.lastName.trim()) errors.lastName = 'Required'
    if (!magGiftRecipient.email.trim()) errors.email = 'Required'
    else if (!/\S+@\S+\.\S+/.test(magGiftRecipient.email)) errors.email = 'Enter a valid email'
    if (!magGiftRecipient.street1.trim()) errors.street1 = 'Required'
    if (!magGiftRecipient.country.trim()) errors.country = 'Required'
    if (!magGiftRecipient.city.trim()) errors.city = 'Required'
    if (!magGiftRecipient.zip.trim()) errors.zip = 'Required'
    return errors
  }

  const handleGiftSubmit = () => {
    const errors = validateGift()
    if (Object.keys(errors).length > 0) { setGiftErrors(errors); return }
    setGiftErrors({})
    setGiftSubmitted(true)
  }

  const handleMagGiftSubmit = () => {
    const errors = validateMagGift()
    if (Object.keys(errors).length > 0) { setMagGiftErrors(errors); return }
    setMagGiftErrors({})
    setMagGiftSubmitted(true)
  }

  const { setCartCount } = useCart()
  useEffect(() => {
    let count = 1
    if (magPrice && !magRemoved) count++
    if (isDonating && (donationPreset !== null || donationCustom)) count++
    setCartCount(count)
  }, [magPrice, magRemoved, isDonating, donationPreset, donationCustom, setCartCount])

  const checkoutBlocked = (isGift && !giftSubmitted) || (!!magPrice && isMagGift && !magGiftSubmitted)

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

        {/* Membership item row */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="font-headline text-[26px] text-[#023e7d] leading-[1.2]">{planLabel}</h3>
            <div className="flex items-center gap-4">
              <p className="font-body text-[17px] text-[#4e576a]">
                <span className="font-bold">Term:</span> {termLabel}
              </p>
              <div className="w-px h-5 bg-[#d9d9d9]" aria-hidden />
              <p className="font-body text-[17px] text-[#4e576a]">
                <span className="font-bold">Price:</span> {priceLabel}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 pt-1">
            <button
              type="button"
              onClick={() => navigate('/membership/join')}
              className="flex items-center gap-1.5 border border-[#002b5c] text-[#002b5c] font-body font-bold text-[13px] px-4 py-2 hover:bg-[#f0f4f8] transition-colors"
            >
              <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
              Edit
            </button>
            <button
              type="button"
              onClick={() => navigate('/membership/join')}
              className="flex items-center gap-1.5 border border-[#c1121f] text-[#c1121f] font-body font-bold text-[13px] px-4 py-2 hover:bg-[#fff5f5] transition-colors"
            >
              <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 1l12 12M13 1L1 13" />
              </svg>
              Remove
            </button>
          </div>
        </div>

        {/* Membership auto-renew */}
        {!isLifetime && <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={isAutoRenew}
            onChange={e => setIsAutoRenew(e.target.checked)}
            className="w-5 h-5 accent-[#023e7d] cursor-pointer flex-shrink-0"
          />
          <span className="font-body font-bold text-[16px] text-[#1d2535]">Set to Auto-Renew</span>
        </label>}

        {/* Gift checkbox */}
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={isGift}
            onChange={e => handleGiftToggle(e.target.checked)}
            className="w-5 h-5 accent-[#023e7d] cursor-pointer flex-shrink-0"
          />
          <span className="font-body font-bold text-[16px] text-[#1d2535]">
            I would like to purchase this membership as a gift
          </span>
        </label>

        {/* Gift form or summary */}
        {isGift && (
          giftSubmitted ? (
            <GiftSummary recipient={giftRecipient} onEdit={() => setGiftSubmitted(false)} />
          ) : (
            <div className="border border-[#999fad]">
              <div className="p-6 flex flex-col gap-5">

                <div className="flex flex-col gap-3">
                  <h3 className="font-headline text-[36px] text-[#1d2535] leading-[1.2]">
                    Gift Recipient Information
                  </h3>
                  <p className="font-body text-[20px] text-[#4e576a] leading-[1.4]">
                    Complete the gift account information below. Fields marked <span className="text-red-600">*</span> are required.
                  </p>
                </div>

                <div className="flex gap-8 pt-4">
                  <TextInput label="First Name" placeholder="Enter first name" required
                    value={giftRecipient.firstName} onChange={setField('firstName')} error={giftErrors.firstName} className="flex-1" />
                  <TextInput label="Last Name" placeholder="Enter last name" required
                    value={giftRecipient.lastName} onChange={setField('lastName')} error={giftErrors.lastName} className="flex-1" />
                  <TextInput label="Email Address" placeholder="Enter email address" required
                    value={giftRecipient.email} onChange={setField('email')} error={giftErrors.email} className="flex-1" />
                </div>

                <div className="h-px bg-[#c4c9d4]" aria-hidden />

                {/* Rank Details */}
                <div className="bg-[#f4f4f6] p-6 flex flex-col gap-5">
                  <h4 className="font-headline text-[24px] text-[#1d2535] leading-[1.3]">Rank Details</h4>
                  <div className="flex gap-8 pt-2">
                    <SelectInput
                      label="Military Status" placeholder="-- Select Military Status --"
                      options={MILITARY_STATUSES} value={giftRecipient.militaryStatus}
                      onChange={setField('militaryStatus')} className="flex-1"
                    />
                    <TextInput label="Rank/Title" placeholder="Enter rank or title"
                      value={giftRecipient.rankTitle} onChange={setField('rankTitle')} className="flex-1" />
                    <TextInput label="Suffix" placeholder="Enter suffix"
                      value={giftRecipient.suffix} onChange={setField('suffix')} className="flex-1" />
                  </div>
                </div>

                <div className="flex gap-8 pt-2">
                  <TextInput label="Street Address" placeholder="Enter street address" required
                    value={giftRecipient.street1} onChange={setField('street1')} error={giftErrors.street1} className="flex-1" />
                  <TextInput label="Street Address Line Two" placeholder="Enter street address line two"
                    value={giftRecipient.street2} onChange={setField('street2')} className="flex-1" />
                </div>

                <div className="flex gap-8 pt-2">
                  <SelectInput label="Country" placeholder="-- Select Country --" required
                    options={COUNTRIES} value={giftRecipient.country}
                    onChange={setField('country')} error={giftErrors.country} className="flex-1" />
                  <TextInput label="City" placeholder="Enter city" required
                    value={giftRecipient.city} onChange={setField('city')} error={giftErrors.city} className="flex-1" />
                  <SelectInput label="State" placeholder="-- Select State --"
                    options={US_STATES} value={giftRecipient.state}
                    onChange={setField('state')} className="flex-1" />
                  <TextInput label="Zip code" placeholder="Enter zip code" required
                    value={giftRecipient.zip} onChange={setField('zip')} error={giftErrors.zip} className="flex-none w-[193px]" />
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleGiftSubmit}
                    className="flex items-center gap-2 bg-navy-bold text-white font-body font-bold text-[16px] tracking-[-0.5px] px-6 py-4 hover:bg-navy-bright transition-colors"
                  >
                    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/>
                    </svg>
                    Save Gift Recipient
                  </button>
                </div>

              </div>
            </div>
          )
        )}

        {/* Donation checkbox — full membership only */}
        {plan === 'full' && (
          <>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isDonating}
                onChange={e => handleDonationToggle(e.target.checked)}
                className="w-5 h-5 accent-[#023e7d] cursor-pointer flex-shrink-0"
              />
              <span className="font-body font-bold text-[16px] text-[#1d2535]">
                Check this box to add a donation to support USNI's mission.
              </span>
            </label>

            {isDonating && (
              <div className="bg-[#f4f4f6] p-6 flex flex-col gap-5">
                <div className="flex items-center justify-between gap-4">
                  <h4 className="font-headline text-[24px] text-[#1d2535] leading-[1.3]">Select a donation amount</h4>
                  <button
                    type="button"
                    onClick={() => handleDonationToggle(false)}
                    className="flex items-center gap-1.5 font-body text-[14px] text-[#c0392b] hover:text-[#922b21] transition-colors flex-shrink-0"
                  >
                    <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 1l12 12M13 1L1 13" />
                    </svg>
                    Remove
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {[25, 50, 100, 250, 500].map(amt => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => handleDonationPreset(amt)}
                      className={`font-headline text-[20px] leading-none px-8 py-5 border-2 transition-colors ${
                        donationPreset === amt
                          ? 'border-[#023e7d] bg-[#023e7d] text-white'
                          : 'border-[#023e7d] bg-white text-[#1d2535] hover:bg-[#eef2f7]'
                      }`}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
                <div className="flex items-stretch w-64">
                  <span className="flex items-center justify-center bg-[#c4c9d4] border border-[#c4c9d4] px-4 font-body text-[18px] text-[#4e576a] select-none">
                    $
                  </span>
                  <input
                    type="number"
                    min="1"
                    placeholder="Other amount"
                    value={donationCustom}
                    onChange={e => { setDonationCustom(e.target.value); setDonationPreset(null) }}
                    className="flex-1 border border-[#c4c9d4] border-l-0 px-4 py-3 font-body text-[16px] text-[#4e576a] placeholder:text-[#9ca3af] bg-white focus:outline-none focus:ring-2 focus:ring-[#023e7d]/30 focus:border-[#023e7d] rounded-none"
                  />
                </div>
              </div>
            )}
          </>
        )}

        {/* Naval History Magazine section */}
        {magPrice && !magRemoved && (
          <>
            <div className="flex items-start justify-between gap-4 border-t border-[#c4c9d4] pt-8">
              <div className="flex flex-col gap-1">
                <h3 className="font-headline text-[26px] text-[#023e7d] leading-[1.2]">Naval History Magazine — Print &amp; Digital</h3>
                <div className="flex items-center gap-4">
                  <p className="font-body text-[17px] text-[#4e576a]">
                    <span className="font-bold">Term:</span> {magTermLabel}
                  </p>
                  <div className="w-px h-5 bg-[#d9d9d9]" aria-hidden />
                  <p className="font-body text-[17px] text-[#4e576a]">
                    <span className="font-bold">Price:</span> {magPriceLabel}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 pt-1">
                <button
                  type="button"
                  onClick={() => navigate('/membership/magazine-upsell')}
                  className="flex items-center gap-1.5 border border-[#002b5c] text-[#002b5c] font-body font-bold text-[13px] px-4 py-2 hover:bg-[#f0f4f8] transition-colors"
                >
                  <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => { setMagRemoved(true); setIsMagGift(false); setMagGiftSubmitted(false); setMagGiftRecipient(EMPTY_GIFT) }}
                  className="flex items-center gap-1.5 border border-[#c1121f] text-[#c1121f] font-body font-bold text-[13px] px-4 py-2 hover:bg-[#fff5f5] transition-colors"
                >
                  <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 1l12 12M13 1L1 13" />
                  </svg>
                  Remove
                </button>
              </div>
            </div>

            {/* Magazine auto-renew */}
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isMagAutoRenew}
                onChange={e => setIsMagAutoRenew(e.target.checked)}
                className="w-5 h-5 accent-[#023e7d] cursor-pointer flex-shrink-0"
              />
              <span className="font-body font-bold text-[16px] text-[#1d2535]">Set to Auto-Renew</span>
            </label>

            {/* Magazine gift checkbox */}
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isMagGift}
                onChange={e => handleMagGiftToggle(e.target.checked)}
                className="w-5 h-5 accent-[#023e7d] cursor-pointer flex-shrink-0"
              />
              <span className="font-body font-bold text-[16px] text-[#1d2535]">
                I would like to purchase this subscription as a gift
              </span>
            </label>

            {/* Magazine gift form or summary */}
            {isMagGift && (
              magGiftSubmitted ? (
                <GiftSummary recipient={magGiftRecipient} onEdit={() => setMagGiftSubmitted(false)} />
              ) : (
                <div className="border border-[#999fad]">
                  <div className="p-6 flex flex-col gap-5">
                    <div className="flex flex-col gap-3">
                      <h3 className="font-headline text-[36px] text-[#1d2535] leading-[1.2]">
                        Gift Recipient Information
                      </h3>
                      <p className="font-body text-[20px] text-[#4e576a] leading-[1.4]">
                        Complete the gift account information below. Fields marked <span className="text-red-600">*</span> are required.
                      </p>
                    </div>
                    <div className="flex gap-8 pt-4">
                      <TextInput label="First Name" placeholder="Enter first name" required
                        value={magGiftRecipient.firstName} onChange={setMagField('firstName')} error={magGiftErrors.firstName} className="flex-1" />
                      <TextInput label="Last Name" placeholder="Enter last name" required
                        value={magGiftRecipient.lastName} onChange={setMagField('lastName')} error={magGiftErrors.lastName} className="flex-1" />
                      <TextInput label="Email Address" placeholder="Enter email address" required
                        value={magGiftRecipient.email} onChange={setMagField('email')} error={magGiftErrors.email} className="flex-1" />
                    </div>
                    <div className="h-px bg-[#c4c9d4]" aria-hidden />
                    <div className="bg-[#f4f4f6] p-6 flex flex-col gap-5">
                      <h4 className="font-headline text-[24px] text-[#1d2535] leading-[1.3]">Rank Details</h4>
                      <div className="flex gap-8 pt-2">
                        <SelectInput label="Military Status" placeholder="-- Select Military Status --"
                          options={MILITARY_STATUSES} value={magGiftRecipient.militaryStatus}
                          onChange={setMagField('militaryStatus')} className="flex-1" />
                        <TextInput label="Rank/Title" placeholder="Enter rank or title"
                          value={magGiftRecipient.rankTitle} onChange={setMagField('rankTitle')} className="flex-1" />
                        <TextInput label="Suffix" placeholder="Enter suffix"
                          value={magGiftRecipient.suffix} onChange={setMagField('suffix')} className="flex-1" />
                      </div>
                    </div>
                    <div className="flex gap-8 pt-2">
                      <TextInput label="Street Address" placeholder="Enter street address" required
                        value={magGiftRecipient.street1} onChange={setMagField('street1')} error={magGiftErrors.street1} className="flex-1" />
                      <TextInput label="Street Address Line Two" placeholder="Enter street address line two"
                        value={magGiftRecipient.street2} onChange={setMagField('street2')} className="flex-1" />
                    </div>
                    <div className="flex gap-8 pt-2">
                      <SelectInput label="Country" placeholder="-- Select Country --" required
                        options={COUNTRIES} value={magGiftRecipient.country}
                        onChange={setMagField('country')} error={magGiftErrors.country} className="flex-1" />
                      <TextInput label="City" placeholder="Enter city" required
                        value={magGiftRecipient.city} onChange={setMagField('city')} error={magGiftErrors.city} className="flex-1" />
                      <SelectInput label="State" placeholder="-- Select State --"
                        options={US_STATES} value={magGiftRecipient.state}
                        onChange={setMagField('state')} className="flex-1" />
                      <TextInput label="Zip code" placeholder="Enter zip code" required
                        value={magGiftRecipient.zip} onChange={setMagField('zip')} error={magGiftErrors.zip} className="flex-none w-[193px]" />
                    </div>
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleMagGiftSubmit}
                        className="flex items-center gap-2 bg-navy-bold text-white font-body font-bold text-[16px] tracking-[-0.5px] px-6 py-4 hover:bg-navy-bright transition-colors"
                      >
                        Save Gift Recipient
                        <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 6h8M6 2l4 4-4 4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}
          </>
        )}

        {/* Step navigation buttons */}
        <div className="border-t border-[#999fad] pt-8 flex flex-wrap items-center justify-end gap-4 sm:gap-8">
          <button
            type="button"
            onClick={() => navigate('/membership/join')}
            className="flex items-center gap-2 border border-[#002b5c] text-[#001845] font-body font-extrabold text-[17px] sm:text-[20px] py-4 px-5 sm:px-8 hover:bg-[#f0f4f8] transition-colors"
          >
            <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 6H2M6 2L2 6l4 4" />
            </svg>
            Back to Membership Options
          </button>
          <button
            type="button"
            disabled={checkoutBlocked}
            onClick={() => {
              const donationAmount = isDonating
                ? (donationPreset ?? (donationCustom ? Number(donationCustom) : 0))
                : 0
              const params = new URLSearchParams({ plan, term, price })
              if (magTerm && !magRemoved) params.set('magTerm', magTerm)
              if (magPrice && !magRemoved) params.set('magPrice', magPrice)
              if (donationAmount > 0) params.set('donation', String(donationAmount))
              navigate(`/membership/checkout?${params.toString()}`)
            }}
            className={`flex items-center gap-2 font-body font-extrabold text-[17px] sm:text-[20px] py-4 px-5 sm:px-8 transition-colors ${
              checkoutBlocked
                ? 'bg-[#c4c9d4] text-white cursor-not-allowed'
                : 'bg-[#002b5c] text-white hover:bg-navy-bright'
            }`}
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
