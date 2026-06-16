import { useState, useRef, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useCart } from '@/context/CartContext'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

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

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
  'VA','WA','WV','WI','WY',
]

const MONTHS = ['01','02','03','04','05','06','07','08','09','10','11','12']
const YEARS = Array.from({ length: 12 }, (_, i) => String(2025 + i))

// ─── Field components ──────────────────────────────────────────────────────────

function FormInput({
  label, placeholder, value, onChange, type = 'text', className = '',
}: {
  label: string; placeholder: string; value: string; onChange: (v: string) => void
  type?: string; className?: string
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="font-body font-bold text-[14px] text-[#1d2535]">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full border border-[#4e576a] bg-white px-4 py-3 font-body text-[16px] text-[#4e576a] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#023e7d]/30 focus:border-[#023e7d] rounded-none min-h-[44px]"
      />
    </div>
  )
}

function FormSelect({
  label, placeholder, options, value, onChange, className = '',
}: {
  label: string; placeholder: string; options: string[]
  value: string; onChange: (v: string) => void; className?: string
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="font-body font-bold text-[14px] text-[#1d2535]">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full appearance-none bg-white border border-[#4e576a] px-4 py-3 pr-10 font-body text-[16px] text-[#4e576a] focus:outline-none focus:ring-2 focus:ring-[#023e7d]/30 focus:border-[#023e7d] min-h-[44px] rounded-none"
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

function InlineSelect({
  placeholder, options, value, onChange, className = '',
}: {
  placeholder: string; options: string[]; value: string; onChange: (v: string) => void; className?: string
}) {
  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full appearance-none bg-white border border-[#4e576a] px-3 py-3 pr-8 font-body text-[16px] text-[#4e576a] focus:outline-none focus:ring-2 focus:ring-[#023e7d]/30 focus:border-[#023e7d] min-h-[44px] rounded-none"
      >
        <option value="" disabled>{placeholder}</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
        <svg className="w-3 h-3 text-[#33415c]" viewBox="0 0 12 10" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 3l5 5 5-5" />
        </svg>
      </div>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function MembershipCheckout() {
  const [searchParams] = useSearchParams()
  const { setCartCount } = useCart()

  const plan      = searchParams.get('plan')     ?? 'full'
  const term      = searchParams.get('term')     ?? '1'
  const price     = searchParams.get('price')    ?? '75'
  const magTerm   = searchParams.get('magTerm')
  const magPrice  = searchParams.get('magPrice')
  const donation  = searchParams.get('donation')

  const planLabel  = PLAN_LABELS[plan]  ?? 'Full Membership'
  const termLabel  = TERM_LABELS[term]  ?? '1 year'
  const magTermLabel = magTerm === '3' ? '3 years' : '1 year'
  const isPrint    = plan !== 'digital'

  const membershipPrice = Number(price)
  const magPriceNum     = magPrice ? Number(magPrice) : 0
  const donationNum     = donation ? Number(donation) : 0
  const total           = membershipPrice + magPriceNum + donationNum

  useEffect(() => {
    let count = 1
    if (magPrice) count++
    if (donation && donationNum > 0) count++
    setCartCount(count)
  }, [magPrice, donation, donationNum, setCartCount])

  // ── Account
  const [activeTab, setActiveTab] = useState<'create' | 'signin'>('create')
  const [firstName, setFirstName]       = useState('')
  const [lastName, setLastName]         = useState('')
  const [email, setEmail]               = useState('')
  const [confirmEmail, setConfirmEmail] = useState('')
  const [password, setPassword]         = useState('')

  // ── Address
  const [street, setStreet] = useState('')
  const [city, setCity]     = useState('')
  const [state, setState]   = useState('')
  const [zip, setZip]       = useState('')

  // ── Payment — card number split into 4 groups
  const [cardGroups, setCardGroups] = useState(['', '', '', ''])
  const cardRef0 = useRef<HTMLInputElement>(null)
  const cardRef1 = useRef<HTMLInputElement>(null)
  const cardRef2 = useRef<HTMLInputElement>(null)
  const cardRef3 = useRef<HTMLInputElement>(null)
  const cardRefs = [cardRef0, cardRef1, cardRef2, cardRef3]

  const [nameOnCard, setNameOnCard]   = useState('')
  const [expiryMonth, setExpiryMonth] = useState('')
  const [expiryYear, setExpiryYear]   = useState('')
  const [cvv, setCvv]                 = useState('')

  // ── Order summary
  const [autoRenew, setAutoRenew] = useState(true)

  const handleCardGroup = (idx: number) => (raw: string) => {
    const digits = raw.replace(/\D/g, '').slice(0, 4)
    setCardGroups(prev => { const next = [...prev]; next[idx] = digits; return next })
    if (digits.length === 4 && idx < 3) cardRefs[idx + 1].current?.focus()
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">

        {/* Page heading */}
        <section className="bg-[#ebf4ff] py-20">
          <div className="container-site">
            <h1 className="font-headline text-[64px] text-[#1d2535] leading-[1.1] text-center">Checkout</h1>
          </div>
        </section>

        {/* Checkout body */}
        <section className="bg-white py-16">
          <div className="container-site">
            <div className="flex gap-12 items-start">

              {/* ── Left column – forms ───────────────────────────────── */}
              <div className="flex-1 min-w-0 flex flex-col gap-8">

                {/* Card: Account Information */}
                <div className="border border-[#c4c9d4]">
                  <div className="p-6 flex flex-col gap-6">
                    <h2 className="font-headline text-[28px] text-[#1d2535] leading-[1.2]">Account Information</h2>

                    {/* Tab group */}
                    <div className="flex border-b border-[#c4c9d4]">
                      {(['create', 'signin'] as const).map((tab) => (
                        <button
                          key={tab}
                          type="button"
                          onClick={() => setActiveTab(tab)}
                          className={`flex-1 py-4 font-body font-bold text-[17px] text-[#1d2535] transition-colors ${
                            activeTab === tab
                              ? 'bg-[#cde4f8] border-b-[3px] border-[#023e7d]'
                              : 'bg-[#ebf4ff] border-b-[3px] border-transparent hover:bg-[#d8edf9]'
                          }`}
                        >
                          {tab === 'create' ? 'Create an account' : 'Sign in'}
                        </button>
                      ))}
                    </div>

                    {activeTab === 'create' ? (
                      <div className="flex flex-col gap-5">
                        <div className="flex gap-5">
                          <FormInput label="First Name" placeholder="First name" value={firstName} onChange={setFirstName} className="flex-1" />
                          <FormInput label="Last Name" placeholder="Last name" value={lastName} onChange={setLastName} className="flex-1" />
                        </div>
                        <FormInput label="Email Address" placeholder="your@email.com" value={email} onChange={setEmail} type="email" />
                        <FormInput label="Confirm Email Address" placeholder="your@email.com" value={confirmEmail} onChange={setConfirmEmail} type="email" />
                      </div>
                    ) : (
                      <div className="flex flex-col gap-5">
                        <FormInput label="Email Address" placeholder="your@email.com" value={email} onChange={setEmail} type="email" />
                        <FormInput label="Password" placeholder="••••••••" value={password} onChange={setPassword} type="password" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Card: Delivery Address (print plans only) */}
                {isPrint && (
                  <div className="border border-[#c4c9d4]">
                    <div className="p-6 flex flex-col gap-6">
                      <div className="flex flex-col gap-1">
                        <h2 className="font-headline text-[28px] text-[#1d2535] leading-[1.2]">Delivery Address</h2>
                        <p className="font-body text-[15px] text-[#4e576a] leading-[1.5]">
                          Required for your print edition of Proceedings. Address auto-populates shipping cost.
                        </p>
                      </div>
                      <FormInput label="Street Address" placeholder="123 Main Street" value={street} onChange={setStreet} />
                      <div className="flex gap-4">
                        <FormInput label="City" placeholder="Enter city" value={city} onChange={setCity} className="flex-1" />
                        <FormSelect label="State" placeholder="Select State" options={US_STATES} value={state} onChange={setState} className="w-44" />
                        <FormInput label="ZIP" placeholder="Enter zip code" value={zip} onChange={setZip} className="w-36" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Card: Payment Details */}
                <div className="border border-[#c4c9d4]">
                  <div className="p-6 flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                      <h2 className="font-headline text-[28px] text-[#1d2535] leading-[1.2]">Payment Details</h2>
                      <div className="flex gap-1.5">
                        {['VISA', 'MC', 'AMEX', 'DISC'].map(brand => (
                          <span key={brand} className="border border-[#c4c9d4] px-2 py-1 font-body font-bold text-[11px] text-[#4e576a] tracking-wide leading-none">
                            {brand}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card number */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-body font-bold text-[14px] text-[#1d2535]">Card Number</label>
                      <div className="flex items-center gap-2">
                        {cardGroups.map((grp, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <input
                              ref={cardRefs[i]}
                              type="text"
                              inputMode="numeric"
                              placeholder="0000"
                              maxLength={4}
                              value={grp}
                              onChange={e => handleCardGroup(i)(e.target.value)}
                              className="w-16 border border-[#4e576a] bg-white px-2 py-3 font-body text-[16px] text-[#1d2535] text-center placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#023e7d]/30 focus:border-[#023e7d] rounded-none min-h-[44px] tracking-widest"
                            />
                            {i < 3 && <span className="font-body text-[18px] text-[#4e576a] select-none leading-none">–</span>}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Name, expiry, CVV */}
                    <div className="flex gap-4 items-end">
                      <FormInput
                        label="Name on Card"
                        placeholder="First and Last Name"
                        value={nameOnCard}
                        onChange={setNameOnCard}
                        className="flex-1"
                      />
                      <div className="flex flex-col gap-1.5">
                        <label className="font-body font-bold text-[14px] text-[#1d2535]">Expires</label>
                        <div className="flex gap-2">
                          <InlineSelect placeholder="Month" options={MONTHS} value={expiryMonth} onChange={setExpiryMonth} className="w-28" />
                          <InlineSelect placeholder="Year" options={YEARS} value={expiryYear} onChange={setExpiryYear} className="w-28" />
                        </div>
                      </div>
                      <FormInput label="CVV" placeholder="•••" value={cvv} onChange={setCvv} className="w-24" />
                    </div>
                  </div>
                </div>

              </div>

              {/* ── Right column – order summary ──────────────────────── */}
              <div className="w-[360px] flex-shrink-0 sticky top-8">
                <div className="border border-[#c4c9d4]">
                  <div className="p-6 flex flex-col gap-6">
                    <h2 className="font-headline text-[24px] text-[#1d2535] leading-[1.2]">Order summary</h2>

                    {/* Line items */}
                    <div className="flex flex-col gap-0">
                      {/* Plan */}
                      <div className="flex justify-between items-baseline gap-4 py-3 border-b border-[#e8eaed]">
                        <span className="font-body font-bold text-[15px] text-[#1d2535]">Plan</span>
                        <span className="font-body text-[15px] text-[#4e576a] text-right">{planLabel}</span>
                      </div>

                      {/* Term */}
                      <div className="flex justify-between items-baseline gap-4 py-3 border-b border-[#e8eaed]">
                        <span className="font-body font-bold text-[15px] text-[#1d2535]">Term</span>
                        <span className="font-body text-[15px] text-[#4e576a] text-right">{termLabel}</span>
                      </div>

                      {/* Naval History Magazine */}
                      {magPrice && (
                        <>
                          <div className="flex justify-between items-baseline gap-4 py-3 border-b border-[#e8eaed]">
                            <span className="font-body font-bold text-[15px] text-[#1d2535]">Naval History Magazine</span>
                            <span className="font-body text-[15px] text-[#4e576a] text-right">${magPriceNum}</span>
                          </div>
                          <div className="flex justify-between items-baseline gap-4 py-3 border-b border-[#e8eaed]">
                            <span className="font-body font-bold text-[15px] text-[#1d2535]">NH Term</span>
                            <span className="font-body text-[15px] text-[#4e576a] text-right">{magTermLabel}</span>
                          </div>
                        </>
                      )}

                      {/* Donation */}
                      {donation && donationNum > 0 && (
                        <div className="flex justify-between items-baseline gap-4 py-3 border-b border-[#e8eaed]">
                          <span className="font-body font-bold text-[15px] text-[#1d2535]">Donation</span>
                          <span className="font-body text-[15px] text-[#4e576a] text-right">${donationNum}</span>
                        </div>
                      )}

                      {/* Total */}
                      <div className="flex justify-between items-baseline gap-4 pt-4 mt-1">
                        <span className="font-body font-bold text-[17px] text-[#1d2535]">Total</span>
                        <span className="font-headline text-[28px] text-[#1d2535]">${total}</span>
                      </div>
                    </div>

                    {/* Auto-renew toggle */}
                    <button
                      type="button"
                      onClick={() => setAutoRenew(!autoRenew)}
                      className="flex items-start gap-3 text-left group"
                      aria-pressed={autoRenew}
                    >
                      <div className="relative flex-shrink-0 mt-0.5">
                        <div className={`w-11 h-6 rounded-full transition-colors ${autoRenew ? 'bg-[#023e7d]' : 'bg-[#c4c9d4]'}`} />
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${autoRenew ? 'translate-x-6' : 'translate-x-1'}`} />
                      </div>
                      <span className="font-body text-[13px] text-[#4e576a] leading-[1.5]">
                        This membership is set to auto-renew on Tuesday, March 12, 2027. Cancel anytime in the account settings.
                      </span>
                    </button>

                    <button
                      type="button"
                      className="w-full bg-[#002b5c] text-white font-body font-extrabold text-[18px] py-4 px-6 hover:bg-[#001845] transition-colors"
                    >
                      Complete Checkout
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
