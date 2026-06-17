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

  // ── Gift recipient
  const isGift = searchParams.get('gift') === 'true'
  const [editingGift, setEditingGift] = useState(false)
  const [giftName, setGiftName]       = useState('Matt Curtin')
  const [giftEmail, setGiftEmail]     = useState('mjcurtin1@gmail.com')
  const [giftStreet, setGiftStreet]   = useState('401 South Bouldin Street')
  const [giftCity, setGiftCity]       = useState('Baltimore')
  const [giftState, setGiftState]     = useState('MD')
  const [giftZip, setGiftZip]         = useState('21224')

  // ── Order summary
  const [autoRenew, setAutoRenew]       = useState(true)
  const [autoRenewMag, setAutoRenewMag] = useState(true)

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
                    <div className="flex">
                      {(['create', 'signin'] as const).map((tab) => (
                        <button
                          key={tab}
                          type="button"
                          onClick={() => setActiveTab(tab)}
                          className={`relative group flex-1 py-4 font-body font-bold text-[17px] transition-colors ${
                            activeTab === tab
                              ? 'bg-[#cde4f8] text-[#1d2535]'
                              : 'bg-[#ebf4ff] text-[#1d2535] hover:text-[#023e7d]'
                          }`}
                        >
                          {tab === 'create' ? 'Create an account' : 'Sign in'}
                          {/* Continuous bottom border */}
                          <span className={`absolute bottom-0 left-0 right-0 h-[3px] ${activeTab === tab ? 'bg-[#023e7d]' : 'bg-[#c4c9d4]'}`} />
                          {/* Left-to-right hover underline (inactive only) */}
                          {activeTab !== tab && (
                            <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#0466c8] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out" />
                          )}
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

                {/* Card: Gift Recipient */}
                {isGift && (
                  <div className="border border-[#c4c9d4]">
                    <div className="p-6 flex flex-col gap-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h2 className="font-headline text-[28px] text-[#1d2535] leading-[1.2]">Gift Recipient</h2>
                          <p className="font-body text-[14px] text-[#4e576a] mt-1 leading-[1.5]">Please confirm the recipient's details before completing checkout.</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setEditingGift(!editingGift)}
                          className="flex-shrink-0 border border-[#c4c9d4] p-2.5 hover:bg-[#f4f4f6] transition-colors"
                          aria-label="Edit gift recipient"
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#4e576a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11.5 2.5a1.414 1.414 0 012 2L5 13H2v-3L11.5 2.5z"/>
                          </svg>
                        </button>
                      </div>

                      {editingGift ? (
                        <div className="flex flex-col gap-4">
                          <FormInput label="Full Name" placeholder="Recipient name" value={giftName} onChange={setGiftName} />
                          <FormInput label="Email Address" placeholder="recipient@email.com" value={giftEmail} onChange={setGiftEmail} type="email" />
                          <FormInput label="Street Address" placeholder="123 Main Street" value={giftStreet} onChange={setGiftStreet} />
                          <div className="flex gap-4">
                            <FormInput label="City" placeholder="Enter city" value={giftCity} onChange={setGiftCity} className="flex-1" />
                            <FormSelect label="State" placeholder="Select State" options={US_STATES} value={giftState} onChange={setGiftState} className="w-44" />
                            <FormInput label="ZIP" placeholder="Enter zip" value={giftZip} onChange={setGiftZip} className="w-36" />
                          </div>
                          <button
                            type="button"
                            onClick={() => setEditingGift(false)}
                            className="self-start bg-[#002b5c] text-white font-body font-bold text-[14px] px-6 py-2.5 hover:bg-[#023e7d] transition-colors"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <div className="border border-[#c4c9d4]">
                          <div className="flex border-b border-[#c4c9d4]">
                            <div className="w-32 flex-shrink-0 px-4 py-3 font-body font-bold text-[15px] text-[#1d2535] border-r border-[#c4c9d4]">Name</div>
                            <div className="flex-1 px-4 py-3 font-body text-[15px] text-[#4e576a]">{giftName}</div>
                          </div>
                          <div className="flex border-b border-[#c4c9d4]">
                            <div className="w-32 flex-shrink-0 px-4 py-3 font-body font-bold text-[15px] text-[#1d2535] border-r border-[#c4c9d4]">Email</div>
                            <div className="flex-1 px-4 py-3 font-body text-[15px] text-[#4e576a]">{giftEmail}</div>
                          </div>
                          <div className="flex">
                            <div className="w-32 flex-shrink-0 px-4 py-3 font-body font-bold text-[15px] text-[#1d2535] border-r border-[#c4c9d4]">Address</div>
                            <div className="flex-1 px-4 py-3 font-body text-[15px] text-[#4e576a] leading-[1.7]">
                              {giftStreet}<br />{giftCity}, {giftState} {giftZip}<br />United States
                            </div>
                          </div>
                        </div>
                      )}
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

                    {/* Auto-renew toggles */}
                    <div className="flex flex-col gap-0 -mx-6">
                      <div className="h-[2px] bg-[#FFD000]" />
                      <button
                        type="button"
                        onClick={() => setAutoRenew(!autoRenew)}
                        className="flex items-start gap-4 text-left px-6 py-4 group"
                        aria-pressed={autoRenew}
                      >
                        <div className="relative flex-shrink-0 mt-0.5">
                          <div className={`w-11 h-6 rounded-full transition-colors ${autoRenew ? 'bg-[#1d2535]' : 'bg-[#c4c9d4]'}`} />
                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${autoRenew ? 'translate-x-6' : 'translate-x-1'}`} />
                        </div>
                        <span className="font-body text-[14px] text-[#4e576a] leading-[1.5]">
                          This membership is set to auto-renew on January 1, 2027. Cancel anytime in the account settings.
                        </span>
                      </button>
                      {magPrice && (
                        <>
                          <div className="h-[2px] bg-[#FFD000]" />
                          <button
                            type="button"
                            onClick={() => setAutoRenewMag(!autoRenewMag)}
                            className="flex items-start gap-4 text-left px-6 py-4 group"
                            aria-pressed={autoRenewMag}
                          >
                            <div className="relative flex-shrink-0 mt-0.5">
                              <div className={`w-11 h-6 rounded-full transition-colors ${autoRenewMag ? 'bg-[#1d2535]' : 'bg-[#c4c9d4]'}`} />
                              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${autoRenewMag ? 'translate-x-6' : 'translate-x-1'}`} />
                            </div>
                            <span className="font-body text-[14px] text-[#4e576a] leading-[1.5]">
                              Naval History Magazine is set to auto-renew on January 1, 2027. Cancel anytime in the account settings.
                            </span>
                          </button>
                        </>
                      )}
                    </div>

                    <button
                      type="button"
                      className="w-full bg-[#002b5c] text-white font-body font-extrabold text-[18px] py-4 px-6 hover:bg-[#023e7d] transition-colors"
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
