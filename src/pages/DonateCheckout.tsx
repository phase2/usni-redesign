import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useCart } from '@/context/CartContext'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import CreditCardModal from '@/components/ui/CreditCardModal'

const PRIORITY_LABELS: Record<string, string> = {
  'usni-news':         'USNI News',
  'proceedings':       'Proceedings Magazine',
  'sponsored-student': 'Sponsored Student Program',
  'naval-history':     'Naval History',
  'oral-history':      'Oral History Program',
  'photo-archives':    'Photo Archives',
  'taylor-center':     'Jack C. Taylor Conference Center',
}

// ─── Field components ──────────────────────────────────────────────────────────

function FormInput({
  label, placeholder, value, onChange, type = 'text', className = '', required = false, error = false,
}: {
  label: string; placeholder: string; value: string; onChange: (v: string) => void
  type?: string; className?: string; required?: boolean; error?: boolean
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="font-body font-bold text-[14px] text-[#1d2535]">
        {label}{required && <span className="text-red-500"> *</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        aria-invalid={error || undefined}
        className={`w-full border bg-white px-4 py-3 font-body text-[16px] text-[#4e576a] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 rounded-none min-h-[44px] ${
          error
            ? 'border-red-600 focus:ring-red-600/30 focus:border-red-600'
            : 'border-[#4e576a] focus:ring-[#023e7d]/30 focus:border-[#023e7d]'
        }`}
      />
    </div>
  )
}

function InlineSelect({
  placeholder, options, value, onChange, className = '', error = false,
}: {
  placeholder: string; options: string[]; value: string; onChange: (v: string) => void; className?: string; error?: boolean
}) {
  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        aria-invalid={error || undefined}
        className={`w-full appearance-none bg-white border px-3 py-3 pr-8 font-body text-[16px] text-[#4e576a] focus:outline-none focus:ring-2 min-h-[44px] rounded-none ${
          error
            ? 'border-red-600 focus:ring-red-600/30 focus:border-red-600'
            : 'border-[#4e576a] focus:ring-[#023e7d]/30 focus:border-[#023e7d]'
        }`}
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

function RequiredFieldsAlert({
  missingFields, alertRef,
}: {
  missingFields: string[]; alertRef: React.RefObject<HTMLDivElement>
}) {
  return (
    <div
      ref={alertRef}
      role="alert"
      className="flex gap-3 items-start border-l-4 border-red-600 bg-red-50 px-5 py-4 scroll-mt-28"
    >
      <i className="fa-solid fa-circle-exclamation text-red-600 text-[15px] mt-[3px] flex-shrink-0" aria-hidden="true" />
      <div>
        <p className="font-body font-bold text-[15px] text-[#1d2535] mb-0.5">Please complete the required fields</p>
        <p className="font-body text-[14px] text-[#1d2535] leading-relaxed">
          The following {missingFields.length === 1 ? 'item is' : 'items are'} required: {missingFields.join(', ')}.
        </p>
      </div>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function DonateCheckout() {
  const [searchParams] = useSearchParams()
  const { setCartCount } = useCart()

  const amount      = searchParams.get('amount')    ?? '100'
  const frequency   = searchParams.get('frequency') ?? 'one-time'
  const isAnonymous = searchParams.get('anonymous') === 'true'
  const priorityIds = searchParams.get('priorities')?.split(',').filter(Boolean) ?? []

  const amountNum      = Number(amount)
  const frequencyLabel = frequency === 'monthly' ? 'Monthly' : 'One-Time'
  const priorityLabels = priorityIds.map(id => PRIORITY_LABELS[id] ?? id)

  useEffect(() => {
    setCartCount(1)
  }, [setCartCount])

  // ── Account
  const [activeTab, setActiveTab]       = useState<'guest' | 'create' | 'signin'>('guest')
  const [firstName, setFirstName]       = useState('')
  const [lastName, setLastName]         = useState('')
  const [email, setEmail]               = useState('')
  const [confirmEmail, setConfirmEmail] = useState('')
  const [phone, setPhone]               = useState('')
  const [password, setPassword]         = useState('')
  const [anonymous, setAnonymous]       = useState(isAnonymous)
  const [service, setService]           = useState('')
  const [militaryStatus, setMilitary]   = useState('')
  const [rank, setRank]                 = useState('')
  const [suffix, setSuffix]             = useState('')
  const [gradYear, setGradYear]         = useState('')

  // ── Payment
  const [cardModalOpen, setCardModalOpen]                 = useState(false)
  const [savedCardLast4, setSavedCardLast4]               = useState<string | null>(null)
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true)

  // ── Required-field validation
  const [showErrors, setShowErrors] = useState(false)
  const errorAlertRef = useRef<HTMLDivElement>(null)

  const missingFields: string[] = []
  if (activeTab === 'guest' || activeTab === 'create') {
    if (!firstName.trim())    missingFields.push('First Name')
    if (!lastName.trim())     missingFields.push('Last Name')
    if (!email.trim())        missingFields.push('Email Address')
    if (!confirmEmail.trim()) missingFields.push('Confirm Email Address')
  }
  if (activeTab === 'create') {
    if (!password.trim())   missingFields.push('Password')
    if (!service)           missingFields.push('Service')
    if (!militaryStatus)    missingFields.push('Military Status')
    if (!rank.trim())       missingFields.push('Rank / Title')
  }
  if (activeTab === 'signin') {
    if (!email.trim())    missingFields.push('Email Address')
    if (!password.trim()) missingFields.push('Password')
  }
  if (!savedCardLast4) missingFields.push('Credit Card Payment')

  const fieldError = (value: string) => showErrors && !value.trim()

  const handleCompleteDonation = () => {
    if (missingFields.length > 0) {
      setShowErrors(true)
      setTimeout(() => errorAlertRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
    } else {
      setShowErrors(false)
    }
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
            <div className="flex flex-col lg:flex-row gap-12 lg:items-start">

              {/* ── Left column – forms ───────────────────────────────── */}
              <div className="flex-1 min-w-0 flex flex-col gap-8">

                {showErrors && missingFields.length > 0 && (
                  <RequiredFieldsAlert missingFields={missingFields} alertRef={errorAlertRef} />
                )}

                {/* Card: Account Information */}
                <div className="border border-[#c4c9d4]">
                  <div className="p-6 flex flex-col gap-6">
                    <h2 className="font-headline text-[28px] text-[#1d2535] leading-[1.2]">Account Information</h2>

                    <div className="flex">
                      {(['guest', 'create', 'signin'] as const).map(tab => (
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
                          {tab === 'guest' ? 'Checkout as guest' : tab === 'create' ? 'Create an account' : 'Sign in'}
                          <span className={`absolute bottom-0 left-0 right-0 h-[3px] ${activeTab === tab ? 'bg-[#023e7d]' : 'bg-[#c4c9d4]'}`} />
                          {activeTab !== tab && (
                            <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#0466c8] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out" />
                          )}
                        </button>
                      ))}
                    </div>

                    {activeTab === 'guest' && (
                      <div className="flex flex-col gap-5">
                        <div className="flex gap-5">
                          <FormInput label="First Name" placeholder="First name" value={firstName} onChange={setFirstName} className="flex-1" required error={fieldError(firstName)} />
                          <FormInput label="Last Name" placeholder="Last name" value={lastName} onChange={setLastName} className="flex-1" required error={fieldError(lastName)} />
                        </div>
                        <FormInput label="Email Address" placeholder="your@email.com" value={email} onChange={setEmail} type="email" required error={fieldError(email)} />
                        <FormInput label="Confirm Email Address" placeholder="your@email.com" value={confirmEmail} onChange={setConfirmEmail} type="email" required error={fieldError(confirmEmail)} />
                        <FormInput label="Phone Number (Optional)" placeholder="(555) 555-1234" value={phone} onChange={setPhone} type="tel" />
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={anonymous}
                            onChange={e => setAnonymous(e.target.checked)}
                            className="w-4 h-4 border border-[#4e576a] accent-[#023e7d] cursor-pointer"
                          />
                          <span className="font-body text-[15px] text-[#1d2535]">I would like this donation to be anonymous</span>
                        </label>
                      </div>
                    )}
                    {activeTab === 'create' && (
                      <div className="flex flex-col gap-5">
                        <div className="flex gap-5">
                          <FormInput label="First Name" placeholder="First name" value={firstName} onChange={setFirstName} className="flex-1" required error={fieldError(firstName)} />
                          <FormInput label="Last Name" placeholder="Last name" value={lastName} onChange={setLastName} className="flex-1" required error={fieldError(lastName)} />
                        </div>
                        <FormInput label="Email Address" placeholder="your@email.com" value={email} onChange={setEmail} type="email" required error={fieldError(email)} />
                        <FormInput label="Confirm Email Address" placeholder="your@email.com" value={confirmEmail} onChange={setConfirmEmail} type="email" required error={fieldError(confirmEmail)} />
                        <FormInput label="Phone Number (Optional)" placeholder="(555) 555-1234" value={phone} onChange={setPhone} type="tel" />
                        <FormInput label="Password" placeholder="Create a password" value={password} onChange={setPassword} type="password" required error={fieldError(password)} />

                        <div className="border-t border-[#c4c9d4] pt-5">
                          <p className="font-body font-bold text-[12px] uppercase tracking-[0.08em] text-[#4e576a] mb-4">Service Information</p>
                          <div className="flex flex-col gap-5">
                            <div className="flex gap-5">
                              <div className="flex flex-col gap-1.5 flex-1">
                                <label className="font-body font-bold text-[14px] text-[#1d2535]">Service <span className="text-red-500">*</span></label>
                                <InlineSelect placeholder="— Select —" options={['Navy', 'Marine Corps', 'Coast Guard', 'Army', 'Air Force', 'Space Force', 'Civilian']} value={service} onChange={setService} error={showErrors && !service} />
                              </div>
                              <div className="flex flex-col gap-1.5 flex-1">
                                <label className="font-body font-bold text-[14px] text-[#1d2535]">Military Status <span className="text-red-500">*</span></label>
                                <InlineSelect placeholder="— Select —" options={['Active Duty', 'Reserve', 'National Guard', 'Retired', 'Veteran', 'Civilian']} value={militaryStatus} onChange={setMilitary} error={showErrors && !militaryStatus} />
                              </div>
                            </div>
                            <div className="flex gap-5">
                              <FormInput label="Rank / Title" placeholder="Enter rank or title" value={rank} onChange={setRank} className="flex-1" required error={fieldError(rank)} />
                              <FormInput label="Suffix" placeholder="Jr., Sr., III…" value={suffix} onChange={setSuffix} className="flex-1" />
                              <FormInput label="Graduation Year" placeholder="YYYY" value={gradYear} onChange={setGradYear} className="w-36" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {activeTab === 'signin' && (
                      <div className="flex flex-col gap-5">
                        <FormInput label="Email Address" placeholder="your@email.com" value={email} onChange={setEmail} type="email" required error={fieldError(email)} />
                        <FormInput label="Password" placeholder="Your password" value={password} onChange={setPassword} type="password" required error={fieldError(password)} />
                        <a href="/login/forgot" className="font-body text-[15px] text-[#0466c8] hover:underline w-fit">
                          Forgot your password?
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card: Payment Details */}
                <div className={`border ${showErrors && !savedCardLast4 ? 'border-red-600' : 'border-[#c4c9d4]'}`}>
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

                    {savedCardLast4 && (
                      <p className="font-body text-[15px] text-[#1d2535]">
                        The credit card ending in <span className="font-bold">{savedCardLast4}</span> was successfully added.
                      </p>
                    )}

                    <div className="flex flex-col items-start gap-4">
                      <Button type="button" variant="primary" size="lg" onClick={() => setCardModalOpen(true)}>
                        {savedCardLast4 ? 'Change Your Credit Card Details' : 'Pay with Credit Card'}
                      </Button>

                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={billingSameAsShipping}
                          onChange={e => setBillingSameAsShipping(e.target.checked)}
                          className="w-4 h-4 border border-[#4e576a] accent-[#023e7d] cursor-pointer"
                        />
                        <span className="font-body text-[15px] text-[#1d2535]">My billing information is the same as my shipping information.</span>
                      </label>
                    </div>
                  </div>
                </div>

                <CreditCardModal
                  open={cardModalOpen}
                  onClose={() => setCardModalOpen(false)}
                  onSuccess={last4 => { setSavedCardLast4(last4); setCardModalOpen(false) }}
                />

              </div>

              {/* ── Right column – order summary ──────────────────────── */}
              <div className="w-full lg:w-[360px] lg:flex-shrink-0 lg:sticky top-8">
                <div className="border border-[#c4c9d4]">
                  <div className="p-6 flex flex-col gap-6">
                    <h2 className="font-headline text-[24px] text-[#1d2535] leading-[1.2]">Order summary</h2>

                    {/* Line items */}
                    <div className="flex flex-col gap-0">
                      <div className="flex justify-between items-baseline gap-4 py-3 border-b border-[#e8eaed]">
                        <span className="font-body font-bold text-[15px] text-[#1d2535]">Frequency</span>
                        <span className="font-body text-[15px] text-[#4e576a]">{frequencyLabel}</span>
                      </div>
                      <div className="flex justify-between items-baseline gap-4 pt-4 mt-1">
                        <span className="font-body font-bold text-[17px] text-[#1d2535]">Total</span>
                        <span className="font-headline text-[32px] text-[#023e7d]">${amountNum.toLocaleString()}</span>
                      </div>
                      {frequency === 'monthly' && (
                        <p className="font-body text-[13px] text-[#4e576a] leading-[1.5] mt-2">
                          Your card will be charged ${amountNum.toLocaleString()} each month. Cancel anytime in your account settings.
                        </p>
                      )}
                    </div>

                    <div className="h-px bg-[#c4c9d4]" />

                    {/* Investment priorities or default fund */}
                    <div className="flex flex-col gap-2">
                      {priorityLabels.length > 0 ? (
                        <>
                          <span className="font-body font-bold text-[15px] text-[#1d2535]">Investment Priorities</span>
                          <div className="flex flex-col gap-1.5 mt-1">
                            {priorityLabels.map(label => (
                              <span key={label} className="font-body text-[14px] text-[#4e576a]">— {label}</span>
                            ))}
                          </div>
                        </>
                      ) : (
                        <div className="flex justify-between items-baseline gap-4">
                          <span className="font-body font-bold text-[15px] text-[#1d2535]">Fund</span>
                          <span className="font-body text-[15px] text-[#4e576a]">Most Needed</span>
                        </div>
                      )}
                      {isAnonymous && (
                        <span className="font-body text-[13px] text-[#4e576a] mt-1 italic">Anonymous gift</span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={handleCompleteDonation}
                      className="w-full bg-[#002b5c] text-white font-body font-extrabold text-[18px] py-4 px-6 hover:bg-navy-bright transition-colors"
                    >
                      Complete Donation
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
