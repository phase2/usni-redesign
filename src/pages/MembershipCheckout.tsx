import { useState, useEffect, useId, useRef, type ReactNode } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useCart } from '@/context/CartContext'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import CreditCardModal from '@/components/ui/CreditCardModal'
import { AcceptedCards } from '@/components/ui/CardBrandIcons'
import { PLAN_LABELS, TERM_LABELS, makeOrderNumber } from '@/data/transactions'
import { militaryStatuses, ranksForService, services, suffixes } from '@/data/essaySubmission'
import { GradYearHelpTooltip, ServiceHelpTooltip } from '@/components/ui/FieldHelp'
import { ACCOUNT_ADDRESS, ACCOUNT_CARD, isTestLogin } from '@/data/testAccount'
import { ChoiceOption, SignedInAs, addressLines } from '@/components/ui/SavedOnFile'
import Alert from '@/components/ui/Alert'

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
  'VA','WA','WV','WI','WY',
]

// ─── Field components ──────────────────────────────────────────────────────────

function FormInput({
  label, placeholder, value, onChange, type = 'text', className = '', required = false, error = false, tooltip,
}: {
  label: string; placeholder: string; value: string; onChange: (v: string) => void
  type?: string; className?: string; required?: boolean; error?: boolean
  tooltip?: ReactNode
}) {
  // Generated rather than passed in: the same field can appear twice on a page
  // (delivery and billing addresses both have a Street Address), and useId keeps
  // each label bound to its own control without callers inventing names.
  const id = useId()
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {/* Tooltip sits beside the label, not inside it: a button inside a
          <label> swallows the click that should focus the control. */}
      <div className="flex items-center">
        <label htmlFor={id} className="font-body font-bold text-[14px] text-[#1d2535]">
          {label}{required && <span className="text-red-500"> *</span>}
        </label>
        {tooltip}
      </div>
      <input
        id={id}
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

function FormSelect({
  label, placeholder, options, value, onChange, className = '', required = false, error = false, tooltip,
  disabled = false,
}: {
  label: string; placeholder: string; options: string[]
  value: string; onChange: (v: string) => void; className?: string; required?: boolean; error?: boolean
  tooltip?: ReactNode
  /** For a select whose options depend on another field, e.g. rank on service. */
  disabled?: boolean
}) {
  const id = useId()
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {/* Tooltip sits beside the label, not inside it: a button inside a
          <label> swallows the click that should focus the control. */}
      <div className="flex items-center">
        <label htmlFor={id} className="font-body font-bold text-[14px] text-[#1d2535]">
          {label}{required && <span className="text-red-500"> *</span>}
        </label>
        {tooltip}
      </div>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={e => onChange(e.target.value)}
          aria-invalid={error || undefined}
          disabled={disabled}
          className={`select-field w-full bg-white border px-4 py-3 font-body text-[16px] text-[#4e576a] focus:outline-none focus:ring-2 min-h-[44px] rounded-none ${
            error
              ? 'border-red-600 focus:ring-red-600/30 focus:border-red-600'
              : 'border-[#4e576a] focus:ring-[#023e7d]/30 focus:border-[#023e7d]'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
    </div>
  )
}

/** Street / City / State / ZIP, shared by the delivery and billing cards. */
function AddressFields({
  street, setStreet, city, setCity, state, setState, zip, setZip, fieldError, showErrors,
}: {
  street: string; setStreet: (v: string) => void
  city: string;   setCity:   (v: string) => void
  state: string;  setState:  (v: string) => void
  zip: string;    setZip:    (v: string) => void
  fieldError: (v: string) => boolean
  showErrors: boolean
}) {
  return (
    <>
      <FormInput label="Street Address" placeholder="123 Main Street" value={street} onChange={setStreet} required error={fieldError(street)} />
      <div className="flex flex-col sm:flex-row gap-4">
        <FormInput label="City" placeholder="Enter city" value={city} onChange={setCity} className="flex-1" required error={fieldError(city)} />
        <FormSelect label="State" placeholder="Select State" options={US_STATES} value={state} onChange={setState} className="sm:w-44" required error={showErrors && !state} />
        <FormInput label="ZIP" placeholder="Enter zip code" value={zip} onChange={setZip} className="sm:w-36" required error={fieldError(zip)} />
      </div>
    </>
  )
}

function RequiredFieldsAlert({
  missingFields, alertRef,
}: {
  missingFields: string[]; alertRef: React.RefObject<HTMLDivElement>
}) {
  return (
    <div ref={alertRef} className="scroll-mt-28">
      <Alert variant="danger" title="Please complete the required fields">
        The following {missingFields.length === 1 ? 'item is' : 'items are'} required: {missingFields.join(', ')}.
      </Alert>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function MembershipCheckout() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { setCartCount } = useCart()

  const plan      = searchParams.get('plan')     ?? 'full'
  // Sponsored student memberships are a donor's gift: one year, no renewal.
  const isSponsored = plan.startsWith('sponsored-')
  const term      = searchParams.get('term')     ?? '1'
  const price     = searchParams.get('price')    ?? '75'
  const magTerm   = searchParams.get('magTerm')
  const magPrice  = searchParams.get('magPrice')
  const magFormat = searchParams.get('magFormat') === 'digital' ? 'digital' : 'print'
  const donation  = searchParams.get('donation')

  const planLabel  = PLAN_LABELS[plan]  ?? 'Full Membership'
  const termLabel  = TERM_LABELS[term]  ?? '1 year'
  const magTermLabel = magTerm === '3' ? '3 years' : '1 year'
  const magFormatLabel = magFormat === 'digital' ? 'Digital Only' : 'Print & Digital'
  const isPrint    = plan !== 'digital'

  /**
   * Titles that physically ship, so the Delivery Address card can name them and
   * appear whenever *anything* is being mailed. A digital membership carrying a
   * print Naval History add-on ships one magazine and still needs an address.
   */
  const printTitles = [
    ...(isPrint ? ['Proceedings'] : []),
    ...(magPrice && magFormat === 'print' ? ['Naval History'] : []),
  ]
  const needsDelivery = printTitles.length > 0
  const printTitleList =
    printTitles.length === 2 ? `${printTitles[0]} and ${printTitles[1]}` : printTitles[0] ?? ''

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
  const [phone, setPhone]               = useState('')
  const [password, setPassword]         = useState('')

  // ── Service info, collected only when creating an account
  const [service, setService]           = useState('')
  const [militaryStatus, setMilitary]   = useState('')
  const [rank, setRank]                 = useState('')
  const [suffix, setSuffix]             = useState('')
  const [gradYear, setGradYear]         = useState('')

  // ── Address
  const [street, setStreet] = useState('')
  const [city, setCity]     = useState('')
  const [state, setState]   = useState('')
  const [zip, setZip]       = useState('')

  // ── Payment
  const [cardModalOpen, setCardModalOpen]                 = useState(false)
  const [savedCardLast4, setSavedCardLast4]               = useState<string | null>(null)
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true)
  const [billStreet, setBillStreet] = useState('')
  const [billCity, setBillCity]     = useState('')
  const [billState, setBillState]   = useState('')
  const [billZip, setBillZip]       = useState('')

  /**
   * Signing in applies the account's address and card. Delivery is filled too:
   * a signed-in member's mailing address is known, and leaving it blank beside a
   * prefilled billing address would read as a bug.
   */
  const [signedInAs, setSignedInAs] = useState<string | null>(null)
  const [signInError, setSignInError] = useState(false)
  const [billingChoice, setBillingChoice] = useState<'file' | 'new'>('file')
  const [deliveryChoice, setDeliveryChoice] = useState<'file' | 'new'>('file')
  const [paymentChoice, setPaymentChoice] = useState<'file' | 'new'>('file')

  const applySignIn = () => {
    if (!isTestLogin(email, password)) { setSignInError(true); return }
    setSignInError(false)
    setSignedInAs(ACCOUNT_ADDRESS.name)
    setStreet(ACCOUNT_ADDRESS.lines[0]); setCity(ACCOUNT_ADDRESS.city)
    setState(ACCOUNT_ADDRESS.state);     setZip(ACCOUNT_ADDRESS.zip)
    setBillStreet(ACCOUNT_ADDRESS.lines[0]); setBillCity(ACCOUNT_ADDRESS.city)
    setBillState(ACCOUNT_ADDRESS.state);     setBillZip(ACCOUNT_ADDRESS.zip)
    setSavedCardLast4(ACCOUNT_CARD.last4)
    setBillingChoice('file'); setDeliveryChoice('file'); setPaymentChoice('file')
  }

  const signOut = () => {
    setSignedInAs(null)
    setStreet(''); setCity(''); setState(''); setZip('')
    setBillStreet(''); setBillCity(''); setBillState(''); setBillZip('')
    setSavedCardLast4(null)
    setBillingChoice('file'); setDeliveryChoice('file'); setPaymentChoice('file')
  }

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

  /**
   * A card can't be authorized without an address to verify against. When
   * something ships we can reuse the delivery address, but an all-digital order
   * has no delivery address to reuse — previously that order collected no
   * address at all, and the "same as my shipping information" checkbox was
   * offering to copy an address that did not exist.
   */
  const needsBilling = !needsDelivery || !billingSameAsShipping

  // ── Required-field validation
  const [showErrors, setShowErrors] = useState(false)
  const errorAlertRef = useRef<HTMLDivElement>(null)

  const missingFields: string[] = []
  const signedIn = signedInAs !== null
  if (!signedIn && activeTab === 'create') {
    if (!firstName.trim())    missingFields.push('First Name')
    if (!lastName.trim())     missingFields.push('Last Name')
    if (!email.trim())        missingFields.push('Email Address')
    if (!confirmEmail.trim()) missingFields.push('Confirm Email Address')
    if (!password.trim())     missingFields.push('Password')
    if (!service)             missingFields.push('Service')
    if (!militaryStatus)      missingFields.push('Military Status')
    if (!rank.trim())         missingFields.push('Rank / Title')
  } else if (!signedIn) {
    if (!email.trim())    missingFields.push('Email Address')
    if (!password.trim()) missingFields.push('Password')
    missingFields.push('Sign in')
  }
  if (needsDelivery) {
    if (!street.trim()) missingFields.push('Street Address')
    if (!city.trim())   missingFields.push('City')
    if (!state)         missingFields.push('State')
    if (!zip.trim())    missingFields.push('ZIP')
  }
  if (needsBilling) {
    if (!billStreet.trim()) missingFields.push('Billing Street Address')
    if (!billCity.trim())   missingFields.push('Billing City')
    if (!billState)         missingFields.push('Billing State')
    if (!billZip.trim())    missingFields.push('Billing ZIP')
  }
  if (isGift) {
    if (!giftName.trim())   missingFields.push('Recipient Name')
    if (!giftEmail.trim())  missingFields.push('Recipient Email Address')
    if (!giftStreet.trim()) missingFields.push('Recipient Street Address')
    if (!giftCity.trim())   missingFields.push('Recipient City')
    if (!giftState)         missingFields.push('Recipient State')
    if (!giftZip.trim())    missingFields.push('Recipient ZIP')
  }
  if (!savedCardLast4) missingFields.push('Credit Card Payment')

  const fieldError = (value: string) => showErrors && !value.trim()

  /**
   * No payment backend to call, so a successful checkout mints an order number
   * and hands the whole order to the confirmation page in the query string.
   */
  const handleCompleteCheckout = () => {
    if (missingFields.length > 0) {
      setShowErrors(true)
      setTimeout(() => errorAlertRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
      return
    }
    setShowErrors(false)

    const params = new URLSearchParams({
      plan,
      term,
      price,
      order: makeOrderNumber('USNI'),
      autoRenew: String(autoRenew),
    })
    if (magTerm) params.set('magTerm', magTerm)
    if (magPrice) params.set('magPrice', magPrice)
    if (magPrice) params.set('magFormat', magFormat)
    if (donationNum > 0) params.set('donation', String(donationNum))
    if (isGift) {
      params.set('gift', 'true')
      if (giftName.trim()) params.set('giftName', giftName.trim())
    }
    if (email.trim()) params.set('email', email.trim())
    if (firstName.trim()) params.set('name', firstName.trim())
    if (savedCardLast4) params.set('card', savedCardLast4)

    navigate(`/membership/confirmation?${params.toString()}`)
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

                    {signedIn ? (
                      <SignedInAs email={email.trim()} onSignOut={signOut} />
                    ) : activeTab === 'create' ? (
                      <div className="flex flex-col gap-5">
                        <div className="flex gap-5">
                          <FormInput label="First Name" placeholder="First name" value={firstName} onChange={setFirstName} className="flex-1" required error={fieldError(firstName)} />
                          <FormInput label="Last Name" placeholder="Last name" value={lastName} onChange={setLastName} className="flex-1" required error={fieldError(lastName)} />
                        </div>
                        <FormInput label="Email Address" placeholder="your@email.com" value={email} onChange={setEmail} type="email" required error={fieldError(email)} />
                        <FormInput label="Confirm Email Address" placeholder="your@email.com" value={confirmEmail} onChange={setConfirmEmail} type="email" required error={fieldError(confirmEmail)} />
                        <FormInput label="Phone" placeholder="(555) 555-1234" value={phone} onChange={setPhone} type="tel" />
                        <FormInput label="Password" placeholder="Create a password" value={password} onChange={setPassword} type="password" required error={fieldError(password)} />

                        <div className="border-t border-[#c4c9d4] pt-5">
                          <p className="font-body font-bold text-[12px] uppercase tracking-[0.08em] text-[#4e576a] mb-4">Service Information</p>
                          <div className="flex flex-col gap-5">
                            <div className="flex flex-col sm:flex-row gap-5">
                              <FormSelect label="Service" placeholder="— Select —" options={services} value={service} onChange={setService} className="flex-1" required error={showErrors && !service} tooltip={<ServiceHelpTooltip />} />
                              <FormSelect label="Military Status" placeholder="— Select —" options={militaryStatuses} value={militaryStatus} onChange={setMilitary} className="flex-1" required error={showErrors && !militaryStatus} />
                            </div>
                            <div className="flex flex-col sm:flex-row gap-5">
                              <FormSelect label="Rank / Title" placeholder={service ? '\u2014 Select \u2014' : 'Choose a service first'} options={ranksForService(service)} value={rank} onChange={setRank} className="flex-1" required error={showErrors && !rank} disabled={!service} />
                              <FormSelect label="Suffix" placeholder="— None —" options={suffixes} value={suffix} onChange={setSuffix} className="sm:w-52" error={false} />
                              <FormInput label="Graduation Year" placeholder="YYYY" value={gradYear} onChange={setGradYear} className="sm:w-36" tooltip={<GradYearHelpTooltip align="right" />} />
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-5">
                        <FormInput label="Email Address" placeholder="your@email.com" value={email} onChange={setEmail} type="email" required error={fieldError(email)} />
                        <FormInput label="Password" placeholder="••••••••" value={password} onChange={setPassword} type="password" required error={fieldError(password)} />
                        {signInError && (
                          <p role="alert" className="font-body text-[14px] text-[#c1121f]">
                            That email and password don&rsquo;t match an account.
                          </p>
                        )}
                        <div className="flex flex-wrap items-center gap-4">
                          <button
                            type="button"
                            onClick={applySignIn}
                            className="bg-[#002b5c] text-white font-body font-bold text-[16px] px-6 py-3 border border-[#002b5c] hover:bg-navy-bright hover:border-navy-bright transition-colors"
                          >
                            Sign in
                          </button>
                          <a href="/login/forgot" className="font-body text-[15px] w-fit text-link">
                            Forgot your password?
                          </a>
                        </div>
                      </div>
                    )}

                  </div>
                </div>

                {/* Card: Delivery Address — shown whenever something is mailed */}
                {needsDelivery && (
                  <div className="border border-[#c4c9d4]">
                    <div className="p-6 flex flex-col gap-6">
                      <div className="flex flex-col gap-1">
                        <h2 className="font-headline text-[28px] text-[#1d2535] leading-[1.2]">Delivery Address</h2>
                        <p className="font-body text-[15px] text-[#4e576a] leading-[1.5]">
                          Required for your print {printTitles.length > 1 ? 'editions' : 'edition'} of{' '}
                          {printTitleList}. Address auto-populates shipping cost.
                        </p>
                      </div>
                      {signedIn ? (
                        <div className="flex flex-col gap-3">
                          <ChoiceOption
                            name="mc-delivery" value="file"
                            checked={deliveryChoice === 'file'}
                            onSelect={() => setDeliveryChoice('file')}
                            title="Use the address on file"
                            detail={addressLines(ACCOUNT_ADDRESS)}
                          />
                          <ChoiceOption
                            name="mc-delivery" value="new"
                            checked={deliveryChoice === 'new'}
                            onSelect={() => setDeliveryChoice('new')}
                            title="Use a different address"
                          >
                            <AddressFields
                              street={street} setStreet={setStreet}
                              city={city} setCity={setCity}
                              state={state} setState={setState}
                              zip={zip} setZip={setZip}
                              fieldError={fieldError} showErrors={showErrors}
                            />
                          </ChoiceOption>
                        </div>
                      ) : (
                            <AddressFields
                              street={street} setStreet={setStreet}
                              city={city} setCity={setCity}
                              state={state} setState={setState}
                              zip={zip} setZip={setZip}
                              fieldError={fieldError} showErrors={showErrors}
                            />
                      )}
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
                          <FormInput label="Full Name" placeholder="Recipient name" value={giftName} onChange={setGiftName} required error={fieldError(giftName)} />
                          <FormInput label="Email Address" placeholder="recipient@email.com" value={giftEmail} onChange={setGiftEmail} type="email" required error={fieldError(giftEmail)} />
                          <FormInput label="Street Address" placeholder="123 Main Street" value={giftStreet} onChange={setGiftStreet} required error={fieldError(giftStreet)} />
                          <div className="flex gap-4">
                            <FormInput label="City" placeholder="Enter city" value={giftCity} onChange={setGiftCity} className="flex-1" required error={fieldError(giftCity)} />
                            <FormSelect label="State" placeholder="Select State" options={US_STATES} value={giftState} onChange={setGiftState} className="w-44" required error={showErrors && !giftState} />
                            <FormInput label="ZIP" placeholder="Enter zip" value={giftZip} onChange={setGiftZip} className="w-36" required error={fieldError(giftZip)} />
                          </div>
                          <button
                            type="button"
                            onClick={() => setEditingGift(false)}
                            className="self-start bg-[#002b5c] text-white font-body font-bold text-[14px] px-6 py-2.5 hover:bg-navy-bright transition-colors"
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

                {/* Card: Billing Address — required to authorize the card */}
                {needsBilling && (
                  <div className="border border-[#c4c9d4]">
                    <div className="p-6 flex flex-col gap-6">
                      <div className="flex flex-col gap-1">
                        <h2 className="font-headline text-[28px] text-[#1d2535] leading-[1.2]">Billing Address</h2>
                        <p className="font-body text-[15px] text-[#4e576a] leading-[1.5]">
                          {needsDelivery
                            ? 'The address on file with your card issuer.'
                            : 'The address on file with your card issuer. Required to verify your payment — nothing is mailed to it.'}
                        </p>
                      </div>
                      {signedIn ? (
                        <div className="flex flex-col gap-3">
                          <ChoiceOption
                            name="mc-billing" value="file"
                            checked={billingChoice === 'file'}
                            onSelect={() => setBillingChoice('file')}
                            title="Use the address on file"
                            detail={addressLines(ACCOUNT_ADDRESS)}
                          />
                          <ChoiceOption
                            name="mc-billing" value="new"
                            checked={billingChoice === 'new'}
                            onSelect={() => setBillingChoice('new')}
                            title="Use a different address"
                          >
                            <AddressFields
                              street={billStreet} setStreet={setBillStreet}
                              city={billCity} setCity={setBillCity}
                              state={billState} setState={setBillState}
                              zip={billZip} setZip={setBillZip}
                              fieldError={fieldError} showErrors={showErrors}
                            />
                          </ChoiceOption>
                        </div>
                      ) : (
                            <AddressFields
                              street={billStreet} setStreet={setBillStreet}
                              city={billCity} setCity={setBillCity}
                              state={billState} setState={setBillState}
                              zip={billZip} setZip={setBillZip}
                              fieldError={fieldError} showErrors={showErrors}
                            />
                      )}
                    </div>
                  </div>
                )}

                {/* Card: Payment Details */}
                <div className={`border ${showErrors && !savedCardLast4 ? 'border-red-600' : 'border-[#c4c9d4]'}`}>
                  <div className="p-6 flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                      <h2 className="font-headline text-[28px] text-[#1d2535] leading-[1.2]">Payment Details</h2>
                      <AcceptedCards />
                    </div>

                    {signedIn ? (
                      <div className="flex flex-col gap-3">
                        <ChoiceOption
                          name="mc-payment" value="file"
                          checked={paymentChoice === 'file'}
                          onSelect={() => { setPaymentChoice('file'); setSavedCardLast4(ACCOUNT_CARD.last4) }}
                          title={`${ACCOUNT_CARD.brand} ····\u00a0${ACCOUNT_CARD.last4}`}
                          detail={`Card on file · expires ${ACCOUNT_CARD.expires}`}
                        />
                        <ChoiceOption
                          name="mc-payment" value="new"
                          checked={paymentChoice === 'new'}
                          onSelect={() => { setPaymentChoice('new'); setSavedCardLast4(null) }}
                          title="Use a new card"
                          detail={
                            paymentChoice === 'new' && savedCardLast4
                              ? `Card ending in ${savedCardLast4} added`
                              : undefined
                          }
                        >
                          <Button type="button" variant="primary" size="lg" className="self-start" onClick={() => setCardModalOpen(true)}>
                            {savedCardLast4 ? 'Change credit card' : 'Add new credit card'}
                          </Button>
                        </ChoiceOption>
                      </div>
                    ) : savedCardLast4 ? (
                      <p className="font-body text-[15px] text-[#1d2535]">
                        The credit card ending in <span className="font-bold">{savedCardLast4}</span> was successfully added.
                      </p>
                    ) : null}

                    <div className="flex flex-col items-start gap-4">
                      {!signedIn && (
                        <Button type="button" variant="primary" size="lg" onClick={() => setCardModalOpen(true)}>
                          {savedCardLast4 ? 'Change credit card' : 'Add new credit card'}
                        </Button>
                      )}

                      {needsDelivery && (
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={billingSameAsShipping}
                            onChange={e => setBillingSameAsShipping(e.target.checked)}
                            className="w-4 h-4 border border-[#4e576a] accent-[#023e7d] cursor-pointer"
                          />
                          <span className="font-body text-[15px] text-[#1d2535]">My billing information is the same as my shipping information.</span>
                        </label>
                      )}
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
                            <span className="font-body font-bold text-[15px] text-[#1d2535]">NH Format</span>
                            <span className="font-body text-[15px] text-[#4e576a] text-right">{magFormatLabel}</span>
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
                      {!isSponsored && (
                        <>
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
                        </>
                      )}
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
                      onClick={handleCompleteCheckout}
                      className="w-full bg-[#002b5c] text-white font-body font-extrabold text-[18px] py-4 px-6 hover:bg-navy-bright transition-colors"
                    >
                      Checkout
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
