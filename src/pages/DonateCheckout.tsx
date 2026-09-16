import { useState, useEffect, useId, useRef, type ReactNode } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useCart } from '@/context/CartContext'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import CreditCardModal from '@/components/ui/CreditCardModal'
import { AcceptedCards } from '@/components/ui/CardBrandIcons'
import { PRIORITY_LABELS, TRIBUTE_LABELS, makeOrderNumber } from '@/data/transactions'
import {
  appendCommemorativeParams,
  commemorativeLineLabel,
  readCommemorativeLines,
} from '@/data/commemorativeGifts'
import { countries, militaryStatuses, ranksForService, services, suffixes, usStates } from '@/data/essaySubmission'
import { GradYearHelpTooltip, ServiceHelpTooltip } from '@/components/ui/FieldHelp'
import { ACCOUNT_ADDRESS, ACCOUNT_CARD, isTestLogin } from '@/data/testAccount'
import { ChoiceOption, SignedInAs, addressLines } from '@/components/ui/SavedOnFile'
import Alert from '@/components/ui/Alert'

// ─── Field components ──────────────────────────────────────────────────────────

function FormInput({
  label, placeholder, value, onChange, type = 'text', className = '', required = false, error = false, tooltip,
}: {
  label: string; placeholder: string; value: string; onChange: (v: string) => void
  type?: string; className?: string; required?: boolean; error?: boolean
  tooltip?: ReactNode
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

function InlineSelect({
  placeholder, options, value, onChange, className = '', error = false, id, ariaLabel,
  disabled = false,
}: {
  placeholder: string; options: string[]; value: string; onChange: (v: string) => void
  className?: string; error?: boolean; id?: string; ariaLabel?: string
  /** For a select whose options depend on another field, e.g. rank on service. */
  disabled?: boolean
}) {
  return (
    <div className={`relative ${className}`}>
      <select
        id={id}
        aria-label={ariaLabel}
        value={value}
        onChange={e => onChange(e.target.value)}
        aria-invalid={error || undefined}
        disabled={disabled}
        className={`select-field w-full bg-white border px-3 py-3 font-body text-[16px] text-[#4e576a] focus:outline-none focus:ring-2 min-h-[44px] rounded-none ${
          error
            ? 'border-red-600 focus:ring-red-600/30 focus:border-red-600'
            : 'border-[#4e576a] focus:ring-[#023e7d]/30 focus:border-[#023e7d]'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  )
}

/** Street / City / State / ZIP / Country — matches the membership checkout. */
function AddressFields({
  street, setStreet, city, setCity, state, setState, zip, setZip, country, setCountry,
  fieldError, showErrors,
}: {
  street: string; setStreet: (v: string) => void
  city: string;   setCity:   (v: string) => void
  state: string;  setState:  (v: string) => void
  zip: string;    setZip:    (v: string) => void
  country: string; setCountry: (v: string) => void
  fieldError: (v: string) => boolean
  showErrors: boolean
}) {
  return (
    <>
      <FormInput label="Street Address" placeholder="123 Main Street" value={street} onChange={setStreet} required error={fieldError(street)} />
      <div className="flex flex-col sm:flex-row gap-4">
        <FormInput label="City" placeholder="Enter city" value={city} onChange={setCity} className="flex-1" required error={fieldError(city)} />
        <LabelledSelect label="State" placeholder="Select State" options={usStates} value={state} onChange={setState} className="sm:w-44" required error={showErrors && !state} />
        <FormInput label="ZIP" placeholder="Enter zip code" value={zip} onChange={setZip} className="sm:w-36" required error={fieldError(zip)} />
      </div>
      <LabelledSelect label="Country" placeholder="Select Country" options={countries} value={country} onChange={setCountry} required error={showErrors && !country} />
    </>
  )
}

/** Label + select bound by a generated id. */
function LabelledSelect({
  label, placeholder, options, value, onChange, className = '', required = false, error = false, tooltip,
  disabled = false,
}: {
  label: string; placeholder: string; options: string[]
  value: string; onChange: (v: string) => void
  className?: string; required?: boolean; error?: boolean
  tooltip?: ReactNode
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
      <InlineSelect id={id} placeholder={placeholder} options={options} value={value} onChange={onChange} error={error} disabled={disabled} />
    </div>
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

export default function DonateCheckout() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { setCartCount } = useCart()

  const amount      = searchParams.get('amount')    ?? '100'
  const frequency   = searchParams.get('frequency') ?? 'one-time'
  const isAnonymous = searchParams.get('anonymous') === 'true'
  const tributeType = searchParams.get('tribute')
  const tributeName = searchParams.get('tributeName')?.trim() ?? ''
  const priorityIds = searchParams.get('priorities')?.split(',').filter(Boolean) ?? []

  const amountNum      = Number(amount)
  const frequencyLabel = frequency === 'monthly' ? 'Monthly' : 'One-Time'
  const priorityLabels = priorityIds.map(id => PRIORITY_LABELS[id] ?? id)

  /** A commemorative gift itemises what was bought in place of the priority list. */
  const commemorativeLines = readCommemorativeLines(searchParams)

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
  const [service, setService]           = useState('')
  const [militaryStatus, setMilitary]   = useState('')
  const [rank, setRank]                 = useState('')
  const [suffix, setSuffix]             = useState('')
  const [gradYear, setGradYear]         = useState('')

  // ── Payment
  const [cardModalOpen, setCardModalOpen]                 = useState(false)
  const [savedCardLast4, setSavedCardLast4]               = useState<string | null>(null)
  const [billStreet, setBillStreet]   = useState('')
  const [billCity, setBillCity]       = useState('')
  const [billState, setBillState]     = useState('')
  const [billZip, setBillZip]         = useState('')
  const [billCountry, setBillCountry] = useState('United States')

  /**
   * Signing in applies what the account already knows: the address on file
   * prefills billing, and the card on file is selected. Either can still be
   * replaced — `editingBilling` and the card modal are the escape hatches.
   */
  const [signedInAs, setSignedInAs] = useState<string | null>(null)
  const [signInError, setSignInError] = useState(false)
  const [billingChoice, setBillingChoice] = useState<'file' | 'new'>('file')
  const [paymentChoice, setPaymentChoice] = useState<'file' | 'new'>('file')

  const applySignIn = () => {
    if (!isTestLogin(email, password)) { setSignInError(true); return }
    setSignInError(false)
    setSignedInAs(ACCOUNT_ADDRESS.name)
    setBillStreet(ACCOUNT_ADDRESS.lines[0])
    setBillCity(ACCOUNT_ADDRESS.city)
    setBillState(ACCOUNT_ADDRESS.state)
    setBillZip(ACCOUNT_ADDRESS.zip)
    setBillCountry(ACCOUNT_ADDRESS.country)
    setSavedCardLast4(ACCOUNT_CARD.last4)
    setBillingChoice('file'); setPaymentChoice('file')
  }

  const signOut = () => {
    setSignedInAs(null)
    setBillStreet(''); setBillCity(''); setBillState(''); setBillZip('')
    setBillCountry('United States')
    setSavedCardLast4(null)
    setBillingChoice('file'); setPaymentChoice('file')
  }

  // ── Required-field validation
  const [showErrors, setShowErrors] = useState(false)
  const errorAlertRef = useRef<HTMLDivElement>(null)

  const missingFields: string[] = []
  const signedIn = signedInAs !== null
  /*
   * On the Sign in tab, until the member actually signs in, the only thing on
   * screen that matters is the credentials form. Billing and payment come from
   * the account once they are in, so showing empty versions of those cards
   * first asks for details we are about to look up.
   */
  const awaitingSignIn = activeTab === 'signin' && !signedIn
  if (!signedIn && (activeTab === 'guest' || activeTab === 'create')) {
    if (!firstName.trim())    missingFields.push('First Name')
    if (!lastName.trim())     missingFields.push('Last Name')
    if (!email.trim())        missingFields.push('Email Address')
    if (!confirmEmail.trim()) missingFields.push('Confirm Email Address')
  }
  if (!signedIn && activeTab === 'create') {
    if (!password.trim())   missingFields.push('Password')
    if (!service)           missingFields.push('Service')
    if (!militaryStatus)    missingFields.push('Military Status')
    if (!rank.trim())       missingFields.push('Rank / Title')
  }
  if (activeTab === 'signin' && !signedIn) {
    if (!email.trim())    missingFields.push('Email Address')
    if (!password.trim()) missingFields.push('Password')
    missingFields.push('Sign in')
  }
  // Nothing ever ships on a donation, so there is no delivery address to reuse:
  // the billing address is the only address on the order, and the card cannot be
  // authorized without it.
  if (!billStreet.trim()) missingFields.push('Billing Street Address')
  if (!billCity.trim())   missingFields.push('Billing City')
  if (!billState)         missingFields.push('Billing State')
  if (!billZip.trim())    missingFields.push('Billing ZIP')
  if (!billCountry)       missingFields.push('Billing Country')
  if (!savedCardLast4) missingFields.push('Credit Card Payment')

  const fieldError = (value: string) => showErrors && !value.trim()

  /** Mirrors MembershipCheckout: mint a receipt number, hand the gift over. */
  const handleCompleteDonation = () => {
    if (missingFields.length > 0) {
      setShowErrors(true)
      setTimeout(() => errorAlertRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
      return
    }
    setShowErrors(false)

    const params = new URLSearchParams({
      amount,
      frequency,
      order: makeOrderNumber('NIF'),
    })
    if (priorityIds.length > 0) params.set('priorities', priorityIds.join(','))
    appendCommemorativeParams(params, commemorativeLines)
    if (isAnonymous) params.set('anonymous', 'true')
    if (tributeName) {
      params.set('tribute', tributeType ?? 'honor')
      params.set('tributeName', tributeName)
    }
    if (email.trim()) params.set('email', email.trim())
    if (firstName.trim()) params.set('name', firstName.trim())
    if (savedCardLast4) params.set('card', savedCardLast4)

    navigate(`/giving/donate/confirmation?${params.toString()}`)
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
                        <FormInput label="Phone" placeholder="(555) 555-1234" value={phone} onChange={setPhone} type="tel" />
                        {/* The anonymous choice was offered here as well as in
                            the cart, in two different wordings, with the cart's
                            answer silently overwritten by whatever this one was
                            left at. It is the cart's question now; the order
                            summary on the right reports the answer. */}
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
                        <FormInput label="Phone" placeholder="(555) 555-1234" value={phone} onChange={setPhone} type="tel" />
                        <FormInput label="Password" placeholder="Create a password" value={password} onChange={setPassword} type="password" required error={fieldError(password)} />

                        <div className="border-t border-[#c4c9d4] pt-5">
                          <p className="font-body font-bold text-[12px] uppercase tracking-[0.08em] text-[#4e576a] mb-4">Service Information</p>
                          <div className="flex flex-col gap-5">
                            <div className="flex gap-5">
                              <LabelledSelect label="Service" placeholder="— Select —" options={services} value={service} onChange={setService} className="flex-1" required error={showErrors && !service} tooltip={<ServiceHelpTooltip />} />
                              <LabelledSelect label="Military Status" placeholder="— Select —" options={militaryStatuses} value={militaryStatus} onChange={setMilitary} className="flex-1" required error={showErrors && !militaryStatus} />
                            </div>
                            <div className="flex gap-5">
                              <LabelledSelect label="Rank / Title" placeholder={service ? '\u2014 Select \u2014' : 'Choose a service first'} options={ranksForService(service)} value={rank} onChange={setRank} className="flex-1" required error={showErrors && !rank} disabled={!service} />
                              <LabelledSelect label="Suffix" placeholder="— None —" options={suffixes} value={suffix} onChange={setSuffix} className="flex-1" />
                              <FormInput label="Graduation Year" placeholder="YYYY" value={gradYear} onChange={setGradYear} className="w-36" tooltip={<GradYearHelpTooltip align="right" />} />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {activeTab === 'signin' && (
                      signedIn ? (
                        <SignedInAs email={email.trim()} onSignOut={signOut} />
                      ) : (
                        <div className="flex flex-col gap-5">
                          <FormInput label="Email Address" placeholder="your@email.com" value={email} onChange={setEmail} type="email" required error={fieldError(email)} />
                          <FormInput label="Password" placeholder="Your password" value={password} onChange={setPassword} type="password" required error={fieldError(password)} />
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
                      )
                    )}
                  </div>
                </div>

                {!awaitingSignIn && (
                  <>
                  {/* Card: Billing Address — required to authorize the card */}
                  <div className="border border-[#c4c9d4]">
                    <div className="p-6 flex flex-col gap-6">
                      <div className="flex flex-col gap-1">
                        <h2 className="font-headline text-[28px] text-[#1d2535] leading-[1.2]">Billing Address</h2>
                        <p className="font-body text-[15px] text-[#4e576a] leading-[1.5]">
                          The address on file with your card issuer. Required to verify your payment and to
                          issue your tax receipt — nothing is mailed to it.
                        </p>
                      </div>
                      {signedIn ? (
                        <div className="flex flex-col gap-3">
                          <ChoiceOption
                            name="dc-billing" value="file"
                            checked={billingChoice === 'file'}
                            onSelect={() => setBillingChoice('file')}
                            title="Use the address on file"
                            detail={addressLines(ACCOUNT_ADDRESS)}
                          />
                          <ChoiceOption
                            name="dc-billing" value="new"
                            checked={billingChoice === 'new'}
                            onSelect={() => setBillingChoice('new')}
                            title="Use a different address"
                          >
                            <AddressFields
                              street={billStreet} setStreet={setBillStreet}
                              city={billCity} setCity={setBillCity}
                              state={billState} setState={setBillState}
                              zip={billZip} setZip={setBillZip}
                              country={billCountry} setCountry={setBillCountry}
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
                              country={billCountry} setCountry={setBillCountry}
                              fieldError={fieldError} showErrors={showErrors}
                            />
                      )}
                    </div>
                  </div>

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
                            name="dc-payment" value="file"
                            checked={paymentChoice === 'file'}
                            onSelect={() => { setPaymentChoice('file'); setSavedCardLast4(ACCOUNT_CARD.last4) }}
                            title={`${ACCOUNT_CARD.brand} ····\u00a0${ACCOUNT_CARD.last4}`}
                            detail={`Card on file · expires ${ACCOUNT_CARD.expires}`}
                          />
                          <ChoiceOption
                            name="dc-payment" value="new"
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

                        <p className="font-body text-[14px] text-[#4e576a]">
                          Your card is charged once this order is completed. The billing address above is
                          used to verify it.
                        </p>
                      </div>
                    </div>
                  </div>
                  </>
                )}

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

                    {/* What the gift buys: the bricks and chairs where there
                        are any, otherwise the priorities or the default fund. */}
                    <div className="flex flex-col gap-2">
                      {commemorativeLines.length > 0 ? (
                        <>
                          <span className="font-body font-bold text-[15px] text-[#1d2535]">Commemorative gift</span>
                          <div className="flex flex-col gap-1.5 mt-1">
                            {commemorativeLines.map(line => (
                              <span
                                key={line.gift.id}
                                className="font-body text-[14px] text-[#4e576a] flex justify-between gap-3"
                              >
                                <span className="capitalize">{commemorativeLineLabel(line)}</span>
                                <span>${line.subtotal.toLocaleString()}</span>
                              </span>
                            ))}
                          </div>
                          <span className="font-body text-[13px] text-[#4e576a] mt-1 italic">
                            Jack C. Taylor Conference Center Maintenance &amp; Technology Fund
                          </span>
                        </>
                      ) : priorityLabels.length > 0 ? (
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
                      {/* The two choices made back in the cart, reported here
                          rather than asked again. */}
                      {tributeName && (
                        <span className="font-body text-[13px] text-[#4e576a] mt-1 italic">
                          {TRIBUTE_LABELS[tributeType ?? 'honor'] ?? TRIBUTE_LABELS.honor}{' '}
                          {tributeName}
                        </span>
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
