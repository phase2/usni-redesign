import { Fragment, useState, type ReactNode } from 'react'
import DesignSystemLayout from '@/components/design-system/DesignSystemLayout'
import DocPageHeader from '@/components/design-system/DocPageHeader'
import DocSection from '@/components/design-system/DocSection'
import DocLabel from '@/components/design-system/DocLabel'
import LiveMarkup from '@/components/design-system/LiveMarkup'
import ClassTable from '@/components/design-system/ClassTable'
import SourceList from '@/components/design-system/SourceList'
import DevNote from '@/components/design-system/DevNote'
import CodeBlock from '@/components/design-system/CodeBlock'
import PropsTable from '@/components/design-system/PropsTable'
import BookPrice from '@/components/ui/BookPrice'
import { AcceptedCards, CardBrandIcon } from '@/components/ui/CardBrandIcons'
import { ChoiceOption, SignedInAs, addressLines } from '@/components/ui/SavedOnFile'
import {
  ConfirmationActions,
  ConfirmationBanner,
  ConfirmationSupport,
  NextSteps,
  PrintReceiptButton,
  ReceiptCard,
  ReceiptMeta,
  ReceiptRow,
  ReceiptTotal,
} from '@/components/ui/Confirmation'
import Alert from '@/components/ui/Alert'
import { Button } from '@/components/ui/Button'
import { Field, TextInput, CheckboxField } from '@/components/ui/FormField'
import { Toggle } from '@/components/ui/AccountCard'
import { ACCOUNT_ADDRESS, ACCOUNT_CARD } from '@/data/testAccount'
import { SHIPPING_METHODS, money, orderTotals } from '@/data/booksOrder'
import { aiWarfightingBook } from '@/data/bookProductData'
import { offerFor } from '@/data/navalHistorySubscription'
import { MEMBER_SERVICES_EMAIL, MEMBER_SERVICES_PHONE } from '@/data/transactions'
import proceedingsCovers from '@/assets/images/proceedings-magazine-april-cover.png'

/* ─── Doc helpers ──────────────────────────────────────────────────────────── */

function C({ children }: { children: ReactNode }) {
  return <code className="font-mono text-[13px] text-navy-subtle [overflow-wrap:anywhere]">{children}</code>
}

function Prose({ children }: { children: ReactNode }) {
  return <p className="font-body text-base text-neutral-subtle leading-relaxed max-w-[760px]">{children}</p>
}

/* Real figures, so every example shows numbers the prototype actually sells at. */
const nhOffer = offerFor('print', 'us', '1') // $43 list, $32 member
const bookTotals = orderTotals(38.95, 1, 'standard')

/* ─── Extracted inline patterns ────────────────────────────────────────────────
   Most commerce markup lives inline in the cart and checkout pages rather than
   in shared components. Each block below re-renders the canonical page's markup
   with its classes copied verbatim, so the generated snippet is what that page
   ships. The source path is named in each section's SourceList. */

function EditIcon() {
  return (
    <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 1l12 12M13 1L1 13" />
    </svg>
  )
}

function ArrowLeft() {
  return (
    <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 6H2M6 2L2 6l4 4" />
    </svg>
  )
}

function ArrowRight() {
  return (
    <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 6h8M6 2l4 4-4 4" />
    </svg>
  )
}

/** Page heading band shared by every cart and checkout page. */
function CommercePageHeading({ title }: { title: string }) {
  return (
    <section className="bg-[#ebf4ff] py-20">
      <div className="container-site">
        <h1 className="font-headline text-[64px] text-[#1d2535] leading-[1.1] text-center">{title}</h1>
      </div>
    </section>
  )
}

/** Cart review banner — DonateCartItems / NavalHistoryCartItems. */
function CartReviewBanner() {
  return (
    <div className="bg-[#fefde8] border border-l-4 border-[#ffaa00] px-8 py-6 flex flex-col gap-3">
      <h2 className="font-headline text-[28px] text-[#1d2535] leading-[1.2]">Review your subscription</h2>
      <p className="font-body text-[16px] text-[#1d2535] leading-[1.5]">
        Thank you for subscribing to Naval History! Check the format and term below before
        proceeding to checkout. If you have any questions, please{' '}
        <a href="/contact#general" className="transition-colors text-link">
          contact us
        </a>.
      </p>
    </div>
  )
}

function CartItemsHeading() {
  return (
    <div className="border-b border-[#c4c9d4] pb-6">
      <h2 className="font-headline text-[40px] text-[#1d2535] leading-[1.1]">Cart items</h2>
    </div>
  )
}

/** One non-shipping line item — NavalHistoryCartItems is canonical. */
function CartLineItem({
  title,
  meta,
  qualifier,
  divided,
}: {
  title: string
  meta: { label: string; value: string }[]
  qualifier?: string
  divided?: boolean
}) {
  return (
    <div className={`flex flex-wrap items-start justify-between gap-4${divided ? ' border-t border-[#c4c9d4] pt-6' : ''}`}>
      <div className="flex flex-col gap-1">
        <h3 className="font-headline text-[26px] text-[#023e7d] leading-[1.2]">{title}</h3>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          {meta.map((m, i) => (
            <Fragment key={m.label}>
              {i > 0 && <div className="w-px h-5 bg-[#c4c9d4]" aria-hidden />}
              <p className="font-body text-[17px] text-[#1d2535]">
                <span className="font-bold">{m.label}:</span> {m.value}
                {qualifier && i === meta.length - 1 && <span className="text-[#4e576a]"> {qualifier}</span>}
              </p>
            </Fragment>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0 pt-1">
        <button
          type="button"
          className="flex items-center gap-1.5 border border-[#002b5c] text-[#002b5c] font-body font-bold text-[13px] px-4 py-2 hover:bg-navy-bright hover:text-white hover:border-navy-bright transition-colors"
        >
          <EditIcon />
          Edit
        </button>
        <button
          type="button"
          className="flex items-center gap-1.5 border border-[#c1121f] text-[#c1121f] font-body font-bold text-[13px] px-4 py-2 hover:bg-[#c1121f] hover:text-white transition-colors"
        >
          <CloseIcon />
          Remove
        </button>
      </div>
    </div>
  )
}

/** Product line item with quantity stepper — BooksCartItems. */
function BookLineItem() {
  const [qty, setQty] = useState(1)
  const book = aiWarfightingBook
  const priceNum = 38.95
  return (
    <div className="border border-[#c4c9d4] p-6 flex gap-6 items-start">
      <a href="/books/ai-warfighting" className="flex-shrink-0 w-24">
        <img src={book.coverImage} alt={`${book.title} cover`} className="w-24 shadow-md object-cover" />
      </a>
      <div className="flex-1 min-w-0 flex flex-col gap-2">
        <a href="/books/ai-warfighting" className="font-headline text-[22px] leading-[1.2] text-link">
          {book.title}
        </a>
        <p className="font-body text-[14px] text-[#4e576a] leading-[1.4]">{book.subtitle}</p>
        <p className="font-body text-[14px] text-[#4e576a]">By {book.authors.map(a => a.name).join(', ')}</p>
        <p className="font-body text-[14px] text-[#4e576a]">
          Format: <span className="font-bold text-[#1d2535]">Hardcover</span>
        </p>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="font-headline text-[22px] text-[#1d2535]">${priceNum.toFixed(2)}</span>
          <span className="font-body text-[13px] text-[#4e576a]">each</span>
        </div>
        <div className="flex items-center gap-6 mt-3">
          <div className="flex items-center border border-[#c4c9d4]">
            <button
              type="button"
              onClick={() => setQty(q => Math.max(1, q - 1))}
              className="w-10 h-10 flex items-center justify-center text-[#1d2535] hover:bg-[#f0f4f8] transition-colors font-body text-lg font-bold"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="w-10 h-10 flex items-center justify-center font-body font-bold text-[16px] text-[#1d2535] border-x border-[#c4c9d4]">
              {qty}
            </span>
            <button
              type="button"
              onClick={() => setQty(q => q + 1)}
              className="w-10 h-10 flex items-center justify-center text-[#1d2535] hover:bg-[#f0f4f8] transition-colors font-body text-lg font-bold"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <button
            type="button"
            className="flex items-center gap-1.5 font-body text-[14px] text-[#c0392b] hover:text-[#922b21] transition-colors"
          >
            <CloseIcon />
            Remove
          </button>
        </div>
      </div>
      <div className="flex-shrink-0 text-right flex flex-col gap-1">
        <p className="font-body text-[13px] text-[#4e576a] uppercase tracking-wide">Subtotal</p>
        <p className="font-headline text-[28px] text-[#1d2535]">${(priceNum * qty).toFixed(2)}</p>
      </div>
    </div>
  )
}

function CartTotal() {
  return (
    <div className="border-t border-[#c4c9d4] pt-6 flex flex-wrap items-baseline justify-between gap-4">
      <span className="font-headline text-[28px] text-[#1d2535] leading-[1.2]">Order total</span>
      <div className="text-right">
        <span className="font-headline text-[36px] text-[#023e7d] leading-none">${nhOffer.price}</span>
        <p className="font-body text-[14px] text-[#4e576a] mt-1">
          Members pay ${nhOffer.memberPrice} — sign in at checkout to apply member pricing.
        </p>
      </div>
    </div>
  )
}

function CartOptions() {
  const [gift, setGift] = useState(false)
  const [renew, setRenew] = useState(true)
  return (
    <div className="flex flex-col gap-4 border-t border-[#c4c9d4] pt-6">
      <label className="flex items-start gap-3 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={gift}
          onChange={e => setGift(e.target.checked)}
          className="w-5 h-5 mt-0.5 accent-[#023e7d] cursor-pointer flex-shrink-0"
        />
        <span className="font-body text-[16px] text-[#1d2535]">This subscription is a gift for another person</span>
      </label>
      <label className="flex items-start gap-3 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={renew}
          onChange={e => setRenew(e.target.checked)}
          className="w-5 h-5 mt-0.5 accent-[#023e7d] cursor-pointer flex-shrink-0"
        />
        <span className="font-body text-[16px] text-[#1d2535]">Automatically renew at the end of my 1 year term</span>
      </label>
    </div>
  )
}

function CartStepNav({ back, blocked }: { back: string; blocked?: boolean }) {
  return (
    <div className="border-t border-[#999fad] pt-8 flex flex-wrap items-center justify-between gap-4 sm:gap-8">
      <button
        type="button"
        className="flex items-center gap-2 border border-[#002b5c] text-[#001845] font-body font-extrabold text-[20px] py-4 px-8 hover:bg-navy-bright hover:text-white hover:border-navy-bright transition-colors"
      >
        <ArrowLeft />
        {back}
      </button>
      {blocked ? (
        <button
          type="button"
          disabled
          className="flex items-center gap-2 font-body font-extrabold text-[17px] sm:text-[20px] py-4 px-5 sm:px-8 transition-colors bg-[#c4c9d4] text-white cursor-not-allowed"
        >
          Continue to Checkout
          <ArrowRight />
        </button>
      ) : (
        <button
          type="button"
          className="flex items-center gap-2 bg-[#002b5c] text-white font-body font-extrabold text-[20px] py-4 px-8 hover:bg-navy-bright transition-colors"
        >
          Continue to Checkout
          <ArrowRight />
        </button>
      )}
    </div>
  )
}

function EmptyCart() {
  return (
    <section className="bg-white py-16">
      <div className="container-site flex flex-col gap-8">
        <div className="border-b border-[#0466c8] pb-6">
          <h2 className="font-headline text-[56px] text-[#1d2535] leading-[1.1]">Cart items</h2>
        </div>
        <p className="font-body text-[20px] text-[#4e576a]">Your cart is empty.</p>
        <div className="border-t border-[#999fad] pt-8">
          <button
            type="button"
            className="flex items-center gap-2 border border-[#002b5c] text-[#001845] font-body font-extrabold text-[20px] py-4 px-8 hover:bg-navy-bright hover:text-white hover:border-navy-bright transition-colors"
          >
            <ArrowLeft />
            Continue Shopping
          </button>
        </div>
      </div>
    </section>
  )
}

/** Checkout section card — the `Card` helper in BooksCheckout / NavalHistorySubscribeCheckout. */
function CheckoutCard({
  title,
  lede,
  invalid,
  children,
}: {
  title: string
  lede?: string
  invalid?: boolean
  children: ReactNode
}) {
  return (
    <div className={`border ${invalid ? 'border-red-600' : 'border-[#c4c9d4]'}`}>
      <div className="p-6 flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="font-headline text-[28px] text-[#1d2535] leading-[1.2]">{title}</h2>
          {lede && <p className="font-body text-[15px] text-[#4e576a] leading-[1.5]">{lede}</p>}
        </div>
        {children}
      </div>
    </div>
  )
}

type AccountTab = 'guest' | 'create' | 'signin'

/** Account step tabs — MembershipCheckout / DonateCheckout version (with the hover sweep). */
function AccountTabs({ tabs, initial }: { tabs: AccountTab[]; initial: AccountTab }) {
  const [active, setActive] = useState<AccountTab>(initial)
  const label = (t: AccountTab) =>
    t === 'guest' ? 'Checkout as guest' : t === 'create' ? 'Create an account' : 'Sign in'
  return (
    <div className="flex">
      {tabs.map(tab => (
        <button
          key={tab}
          type="button"
          onClick={() => setActive(tab)}
          className={`relative group flex-1 py-4 font-body font-bold text-[17px] transition-colors ${
            active === tab ? 'bg-[#cde4f8] text-[#1d2535]' : 'bg-[#ebf4ff] text-[#1d2535] hover:text-[#023e7d]'
          }`}
        >
          {label(tab)}
          <span className={`absolute bottom-0 left-0 right-0 h-[3px] ${active === tab ? 'bg-[#023e7d]' : 'bg-[#c4c9d4]'}`} />
          {active !== tab && (
            <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#0466c8] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out" />
          )}
        </button>
      ))}
    </div>
  )
}

function SignInForm({ error }: { error?: boolean }) {
  return (
    <div className="flex flex-col gap-5">
      <Field label="Email address" htmlFor={`ds-si-email${error ? '-err' : ''}`} required>
        <TextInput id={`ds-si-email${error ? '-err' : ''}`} type="email" placeholder="your@email.com" defaultValue={error ? 'member@example.com' : undefined} />
      </Field>
      <Field label="Password" htmlFor={`ds-si-pass${error ? '-err' : ''}`} required>
        <TextInput id={`ds-si-pass${error ? '-err' : ''}`} type="password" autoComplete="current-password" />
      </Field>
      {error && (
        <p role="alert" className="font-body text-[14px] text-[#c1121f]">
          That email and password don&rsquo;t match an account.
        </p>
      )}
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
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
}

function ShippingMethodChoices() {
  const [shipping, setShipping] = useState(SHIPPING_METHODS[0].id)
  return (
    <div className="flex flex-col gap-3">
      {SHIPPING_METHODS.map(m => (
        <ChoiceOption
          key={m.id}
          name="ds-shipmethod"
          value={m.id}
          checked={shipping === m.id}
          onSelect={() => setShipping(m.id)}
          title={`${m.label} — ${money(m.cost)}`}
          detail={m.detail}
        />
      ))}
    </div>
  )
}

function AddressOnFileChoices({ initial }: { initial: 'file' | 'new' }) {
  const [choice, setChoice] = useState<'file' | 'new'>(initial)
  return (
    <div className="flex flex-col gap-3">
      <ChoiceOption
        name={`ds-ship-${initial}`}
        value="file"
        checked={choice === 'file'}
        onSelect={() => setChoice('file')}
        title="Use the address on file"
        detail={addressLines(ACCOUNT_ADDRESS)}
      />
      <ChoiceOption
        name={`ds-ship-${initial}`}
        value="new"
        checked={choice === 'new'}
        onSelect={() => setChoice('new')}
        title="Ship to a different address"
      >
        <Field label="Street address" htmlFor={`ds-street-${initial}`} required>
          <TextInput id={`ds-street-${initial}`} placeholder="123 Main Street" />
        </Field>
        <div className="flex flex-col sm:flex-row gap-4">
          <Field label="City" htmlFor={`ds-city-${initial}`} required className="flex-1">
            <TextInput id={`ds-city-${initial}`} placeholder="Enter city" />
          </Field>
          <Field label="ZIP / Postal code" htmlFor={`ds-zip-${initial}`} required className="sm:w-44">
            <TextInput id={`ds-zip-${initial}`} placeholder="21402" />
          </Field>
        </div>
      </ChoiceOption>
    </div>
  )
}

/** Payment Details card, in its three states. */
function PaymentDetails({ state }: { state: 'guest' | 'added' | 'signed-in' }) {
  const [choice, setChoice] = useState<'file' | 'new'>('file')
  const [billSame, setBillSame] = useState(true)
  return (
    <div className="border border-[#c4c9d4]">
      <div className="p-6 flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-headline text-[28px] text-[#1d2535] leading-[1.2]">Payment Details</h2>
          <AcceptedCards />
        </div>

        {state === 'signed-in' ? (
          <div className="flex flex-col gap-3">
            <ChoiceOption
              name="ds-payment"
              value="file"
              checked={choice === 'file'}
              onSelect={() => setChoice('file')}
              title={`${ACCOUNT_CARD.brand} ···· ${ACCOUNT_CARD.last4}`}
              detail={`Card on file · expires ${ACCOUNT_CARD.expires}`}
            />
            <ChoiceOption
              name="ds-payment"
              value="new"
              checked={choice === 'new'}
              onSelect={() => setChoice('new')}
              title="Use a new card"
            >
              <Button type="button" variant="primary" size="lg" className="self-start">
                Add new credit card
              </Button>
            </ChoiceOption>
          </div>
        ) : state === 'added' ? (
          <p className="font-body text-[15px] text-[#1d2535]">
            The credit card ending in <span className="font-bold">4242</span> was successfully added.
          </p>
        ) : null}

        <div className="flex flex-col items-start gap-4">
          {state !== 'signed-in' && (
            <Button type="button" variant="primary" size="lg">
              {state === 'added' ? 'Change credit card' : 'Add new credit card'}
            </Button>
          )}
          <CheckboxField id={`ds-billsame-${state}`} checked={billSame} onChange={setBillSame}>
            My billing address is the same as my shipping address.
          </CheckboxField>
        </div>
      </div>
    </div>
  )
}

/** Order summary — BooksCheckout is canonical. */
function OrderSummary() {
  const [coupon, setCoupon] = useState('')
  return (
    <div className="border border-[#c4c9d4]">
      <div className="p-6 flex flex-col gap-6">
        <h2 className="font-headline text-[24px] text-[#1d2535] leading-[1.2]">Order summary</h2>

        <div className="flex gap-4 items-start pb-5 border-b border-[#e8eaed]">
          <img src={aiWarfightingBook.coverImage} alt="" aria-hidden="true" className="w-16 flex-shrink-0 shadow-sm object-cover" />
          <div className="min-w-0 flex flex-col gap-1">
            <p className="font-body font-bold text-[15px] text-[#1d2535] leading-snug">{aiWarfightingBook.title}</p>
            <p className="font-body text-[13px] text-[#4e576a]">Hardcover · Qty 1</p>
            <p className="font-body text-[13px] text-[#4e576a]">{money(38.95)} each</p>
          </div>
        </div>

        <div className="flex flex-col">
          {[
            ['Subtotal', money(bookTotals.subtotal)],
            ['Shipping', money(bookTotals.shipping)],
            ['Estimated tax', money(bookTotals.tax)],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between items-baseline gap-4 py-3 border-b border-[#e8eaed]">
              <span className="font-body font-bold text-[15px] text-[#1d2535]">{label}</span>
              <span className="font-body text-[15px] text-[#4e576a] text-right">{value}</span>
            </div>
          ))}
          <div className="flex justify-between items-baseline gap-4 pt-4 mt-1">
            <span className="font-body font-bold text-[17px] text-[#1d2535]">Total</span>
            <span className="font-headline text-[30px] text-[#023e7d]">{money(bookTotals.total)}</span>
          </div>
        </div>

        <div className="h-px bg-[#c4c9d4]" />

        <Field label="Coupon code" htmlFor="ds-coupon">
          <TextInput id="ds-coupon" value={coupon} onChange={e => setCoupon(e.target.value)} placeholder="Optional" />
        </Field>

        <button
          type="button"
          className="w-full bg-[#002b5c] text-white font-body font-extrabold text-[18px] py-4 px-6 hover:bg-navy-bright transition-colors"
        >
          Checkout
        </button>

        <p className="font-body text-[13px] text-neutral-subtle leading-[1.5]">
          Tax is estimated at checkout and finalised when your order ships.
        </p>
      </div>
    </div>
  )
}

/** Subscription summary — NavalHistorySubscribeCheckout: member note, gift, auto-renew. */
function SubscriptionSummary() {
  const [gift, setGift] = useState(false)
  const [renew, setRenew] = useState(true)
  return (
    <div className="border border-[#c4c9d4]">
      <div className="p-6 flex flex-col gap-6">
        <h2 className="font-headline text-[24px] text-[#1d2535] leading-[1.2]">Order summary</h2>
        <div className="flex flex-col">
          {[
            ['Publication', 'Naval History'],
            ['Format', 'Print & Digital'],
            ['Term', '1 year'],
            ['Region', 'United States'],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between items-baseline gap-4 py-3 border-b border-[#e8eaed]">
              <span className="font-body font-bold text-[15px] text-[#1d2535]">{label}</span>
              <span className="font-body text-[15px] text-[#4e576a] text-right">{value}</span>
            </div>
          ))}
          <div className="flex justify-between items-baseline gap-4 pt-4 mt-1">
            <span className="font-body font-bold text-[17px] text-[#1d2535]">Total</span>
            <span className="font-headline text-[30px] text-[#023e7d]">${nhOffer.price}</span>
          </div>
          <p className="font-body text-[13px] text-neutral-subtle leading-[1.5] mt-2">
            Members pay ${nhOffer.memberPrice}. Sign in above to apply member pricing.
          </p>
        </div>

        <div className="h-px bg-[#c4c9d4]" />

        <Field label="Coupon code" htmlFor="ds-nhs-coupon">
          <TextInput id="ds-nhs-coupon" placeholder="Optional" />
        </Field>

        <CheckboxField id="ds-nhs-gift" checked={gift} onChange={setGift}>
          This subscription is a gift for another person
        </CheckboxField>

        <div className="flex items-start gap-3">
          <Toggle on={renew} label="Automatically renew subscription" onChange={() => setRenew(!renew)} />
          <p className="font-body text-[14px] text-[#4e576a] leading-[1.5]">
            {renew ? 'Automatically renews at the end of your 1 year term.' : 'We’ll email you before your subscription ends.'}
          </p>
        </div>

        <button
          type="button"
          className="w-full bg-[#002b5c] text-white font-body font-extrabold text-[18px] py-4 px-6 hover:bg-navy-bright transition-colors"
        >
          Checkout
        </button>
      </div>
    </div>
  )
}

/** Membership summary auto-renew rows — MembershipCheckout (drift; shown for reference). */
function MembershipAutoRenewRows() {
  const [on, setOn] = useState(true)
  return (
    <div className="border border-[#c4c9d4] max-w-[360px]">
      <div className="p-6 flex flex-col gap-6">
        <div className="flex flex-col gap-0 -mx-6">
          <div className="h-[2px] bg-[#FFD000]" />
          <button
            type="button"
            onClick={() => setOn(!on)}
            className="flex items-start gap-4 text-left px-6 py-4 group"
            aria-pressed={on}
          >
            <div className="relative flex-shrink-0 mt-0.5">
              <div className={`w-11 h-6 rounded-full transition-colors ${on ? 'bg-[#1d2535]' : 'bg-[#c4c9d4]'}`} />
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${on ? 'translate-x-6' : 'translate-x-1'}`} />
            </div>
            <span className="font-body text-[14px] text-[#4e576a] leading-[1.5]">
              This membership is set to auto-renew on January 1, 2027. Cancel anytime in the account settings.
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#0466c8]" viewBox="0 0 16 16" fill="none">
      <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Upsell "added to cart" strip — NavalHistoryMembershipUpsell. */
function UpsellStrip() {
  return (
    <div className="bg-[#fff8d6] border-b border-[#ffaa00]">
      <div className="container-site py-5">
        <p className="font-body text-[18px] text-[#1d2535] leading-[1.4]">
          <span className="font-bold">Your Naval History subscription has been added to the cart.</span>{' '}
          Members pay less for it — add a membership below, or{' '}
          <button type="button" className="transition-colors font-bold text-link">
            continue to cart
          </button>
          .
        </p>
      </div>
    </div>
  )
}

function UpsellBillboard() {
  return (
    <div className="bg-[#F7F7F2] border border-[#D9D7BF] px-8 lg:px-16 py-10 lg:py-14 flex flex-col lg:flex-row lg:items-center gap-10">
      <div className="flex-1 min-w-0 flex flex-col gap-4">
        <p className="eyebrow">Before you check out</p>
        <h1 className="font-headline text-[32px] lg:text-[46px] text-navy-bolder leading-[1.1]">
          Members pay ${nhOffer.memberPrice} for this subscription
        </h1>
        <p className="font-body text-[18px] text-neutral-subtle leading-[1.5]">
          A Naval Institute membership takes your 1 year Print &amp; Digital subscription from ${nhOffer.price} to $
          {nhOffer.memberPrice}, and brings Proceedings and 150 years of archives with it.
        </p>
        <dl className="flex flex-wrap items-end gap-x-10 gap-y-4 border-t border-[#D9D7BF] pt-5 mt-1">
          <div className="flex flex-col gap-1">
            <dt className="font-body text-[13px] font-semibold uppercase tracking-[0.08em] text-neutral-subtle">
              Subscription alone
            </dt>
            <dd className="font-headline text-[30px] text-neutral-subtle leading-none">${nhOffer.price}</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="font-body text-[13px] font-semibold uppercase tracking-[0.08em] text-navy-subtle">
              With a membership
            </dt>
            <dd className="font-headline text-[30px] text-navy-bolder leading-none">
              ${nhOffer.memberPrice}
              <span className="font-body text-[15px] text-neutral-subtle ml-2">+ membership</span>
            </dd>
          </div>
        </dl>
      </div>
      <img
        src={proceedingsCovers}
        alt="Proceedings magazine, included with membership"
        className="hidden lg:block w-[210px] flex-shrink-0 shadow-lg"
      />
    </div>
  )
}

const UPSELL_PLANS = [
  {
    id: 'digital',
    name: 'Digital',
    price: 45,
    description: 'Full online access to USNI.org and the digital edition of Proceedings.',
    features: [
      'Digital edition of Proceedings + full access to USNI.org',
      '28% off Naval History Magazine',
      'Up to 40% off Naval Institute Press titles',
      '150+ years of archives — oral histories, photographs, every Proceedings article since 1874',
    ],
  },
  {
    id: 'full',
    name: 'Full',
    price: 75,
    description: 'Everything in Digital plus the print edition of Proceedings mailed monthly.',
    features: [
      'Print Proceedings delivered monthly + digital edition',
      '28% off Naval History Magazine',
      'Up to 40% off Naval Institute Press titles',
      'Free invitations to the USNI conference series',
    ],
  },
]

function UpsellOfferCards() {
  return (
    <div className="w-full max-w-[980px] grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
      {UPSELL_PLANS.map(plan => (
        <div key={plan.id} className="bg-white border border-[#c4c9d4] flex flex-col">
          <div className="flex flex-col flex-1 px-8 py-8 gap-6">
            <div className="flex items-start justify-between gap-4">
              <h2 className="font-headline text-[30px] text-navy-bolder leading-[1.1]">{plan.name}</h2>
              <div className="flex flex-col items-end flex-shrink-0">
                <div className="flex items-start">
                  <span className="font-body font-bold text-base text-navy-bolder mt-[4px]">$</span>
                  <span className="font-headline text-[44px] text-navy-bolder leading-[1.0]">{plan.price}</span>
                </div>
                <span className="font-body text-sm text-neutral-subtle">/ yr</span>
              </div>
            </div>
            <p className="font-body text-[17px] text-neutral-subtle leading-[1.5]">{plan.description}</p>
            <Button variant={plan.id === 'full' ? 'navy' : 'outline-dark'} size="lg" fullWidth>
              Add {plan.name} Membership
            </Button>
            <ul className="flex flex-col border-t border-[#e4e7ec] pt-5 gap-1 mt-auto">
              {plan.features.map(f => (
                <li key={f} className="flex items-start gap-2 py-0.5">
                  <CheckIcon />
                  <span className="font-body text-[15px] text-neutral-subtle leading-[1.5]">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ─── Sheet ───────────────────────────────────────────────────────────────── */

const FLOWS: { name: string; steps: string[]; note: string }[] = [
  {
    name: 'Membership',
    steps: ['/membership/join', '/membership/magazine-upsell', '/membership/cart', '/membership/checkout', '/membership/confirmation'],
    note: 'Upsell offers a Naval History add-on. The cart also takes a gift recipient and an optional donation.',
  },
  {
    name: 'Naval History',
    steps: ['/naval-history/subscribe', '/naval-history/subscribe/membership-upsell', '/naval-history/subscribe/cart', '/naval-history/subscribe/checkout', '/naval-history/subscribe/confirmation'],
    note: 'Upsell offers a membership, which moves the subscription to the member rate. Signed-in members skip it.',
  },
  {
    name: 'Books',
    steps: ['/books/ai-warfighting', '/books/cart', '/books/checkout', '/books/confirmation'],
    note: 'The only physical good: quantity, shipping method, shipping address, and estimated tax.',
  },
  {
    name: 'Donate',
    steps: ['/giving/donate', '/giving/donate/cart', '/giving/donate/checkout', '/giving/donate/confirmation'],
    note: 'Designation, tribute, and anonymity are chosen in the cart. Checkout adds a guest option.',
  },
]

export default function Commerce() {
  return (
    <DesignSystemLayout>
      <div className="max-w-container mx-auto px-6 lg:px-8 pt-12 pb-24">
        <DocPageHeader title="Commerce & Checkout">
          <p>
            The purchase path: price display, cart, checkout, and receipt. Four flows run on it (membership, a
            Naval History subscription, a book, and a donation), and they share one shape. The buyer chooses
            something, may be offered an add-on, reviews it in a cart, pays on a two-column checkout, and lands on a
            printable receipt.
          </p>
          <p>
            Most of this markup sits inline in the cart and checkout pages rather than in shared components, and
            the four flows copied it from one another. Each pattern below documents one copy as the spec and lists
            the others as drift. For an inline pattern, the example re-renders the canonical page&rsquo;s markup
            with its classes copied verbatim, so the generated snippet matches what that page ships.
          </p>
        </DocPageHeader>

        {/* ── Flows ─────────────────────────────────────────────────────── */}
        <DocSection title="The four flows">
          <div className="flex flex-col gap-8">
            <div className="overflow-x-auto border border-border-light bg-white">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-neutral-subtlest border-b border-border-light">
                    <th className="font-body font-bold text-xs uppercase tracking-[0.06em] text-navy-bolder px-4 py-3 w-[140px]">Flow</th>
                    <th className="font-body font-bold text-xs uppercase tracking-[0.06em] text-navy-bolder px-4 py-3">Steps</th>
                    <th className="font-body font-bold text-xs uppercase tracking-[0.06em] text-navy-bolder px-4 py-3 w-[34%]">What is different</th>
                  </tr>
                </thead>
                <tbody>
                  {FLOWS.map(f => (
                    <tr key={f.name} className="border-b border-border-light last:border-b-0">
                      <td className="font-body font-semibold text-sm text-navy-bolder px-4 py-3 align-top">{f.name}</td>
                      <td className="px-4 py-3 align-top">
                        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          {f.steps.map((s, i) => (
                            <li key={s} className="flex items-center gap-2">
                              {i > 0 && <i className="fa-solid fa-arrow-right text-[10px] text-neutral-subtler" aria-hidden="true" />}
                              <a href={s} className="font-mono text-xs text-navy-subtle hover:underline">{s}</a>
                            </li>
                          ))}
                        </ol>
                      </td>
                      <td className="font-body text-sm text-neutral-subtle px-4 py-3 align-top leading-relaxed">{f.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <DevNote>
              <p>
                The prototype has no backend, so every step hands the order to the next one in the query string
                (<C>?plan=full&amp;term=1&amp;price=75</C>). That is a prototype convenience, not a spec. In Drupal
                Commerce the order is the state: each step reads and writes the current cart order, and prices are
                resolved server-side. Never trust a price from the URL.
              </p>
              <p>
                Each flow maps to an order type with its own checkout flow (a <C>commerce_checkout_flow</C> config
                entity), so they can share panes and still differ where they need to. Books needs shipping, and
                Donate needs a guest pane and no account requirement. The full mapping is at the end of this page.
              </p>
            </DevNote>
          </div>
        </DocSection>

        {/* ── Book price ────────────────────────────────────────────────── */}
        <DocSection title="Book price">
          <div className="flex flex-col gap-8">
            <Prose>
              The price block on every book teaser: grid cards, carousels, collection pages, and the wishlist. One
              rule applies everywhere. <strong className="text-navy-bolder">The member price leads</strong>, at a
              size you can read across a grid, with a blue MEMBER PRICE tag. The list price sits plain on the line
              beneath it, with no strikethrough. A rule through the list price read as a clearance sale rather than
              a member discount, and the tag already says which number is which. Member pricing used to be set at
              12px under a bolder list price, which buried the one number a member is meant to notice.
            </Prose>

            <LiveMarkup label="Member discount, with binding (the wishlist and collection cards)">
              <BookPrice listPrice={48.95} memberPrice={38.95} format="Hardcover" />
            </LiveMarkup>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <LiveMarkup label="Member discount only">
                <BookPrice listPrice={48.95} memberPrice={38.95} />
              </LiveMarkup>
              <LiveMarkup label="size=&quot;sm&quot; (six-across carousel)">
                <BookPrice listPrice={32.95} memberPrice={24.95} size="sm" />
              </LiveMarkup>
              <LiveMarkup label="No member discount">
                <BookPrice listPrice={24.95} format="Paperback" />
              </LiveMarkup>
            </div>

            <ClassTable
              rows={[
                { part: 'Wrapper', classes: 'flex flex-col gap-1', note: 'Two lines, 4px apart.' },
                {
                  part: 'Lead row',
                  classes: 'flex items-center gap-2 flex-wrap',
                  note: 'Centred, not baseline-aligned. With a 20px price, the small-caps tag sits visibly low when it shares the number’s baseline. Wraps under the price in a narrow card.',
                },
                {
                  part: 'Lead price',
                  classes: 'font-body font-bold text-[20px] text-navy-bolder leading-none',
                  note: <>The member price when there is a discount, otherwise the list price. <C>size="sm"</C> swaps <C>text-[20px]</C> for <C>text-[18px]</C>.</>,
                },
                {
                  part: 'MEMBER PRICE tag',
                  classes: 'font-body font-bold text-[10px] uppercase tracking-[0.09em] text-[#0466C8] leading-none',
                  note: <>Only when <C>memberPrice &lt; listPrice</C>. <C>#0466C8</C> is <C>navy-bright</C>.</>,
                },
                {
                  part: 'Second line',
                  classes: 'font-body text-[16px] text-neutral-subtle leading-none flex items-baseline gap-2',
                  note: 'The list price, then the binding, separated by an aria-hidden middle dot. Rendered only if there is a discount or a format to show.',
                },
              ]}
            />

            <DevNote>
              <p>
                In Drupal Commerce, the list price is the product variation&rsquo;s built-in <C>list_price</C> field,
                and the member price is the variation&rsquo;s resolved price for a member (a price list keyed to the
                member role, or a custom price resolver). Render the block from those two values, as{' '}
                <C>{'{{ member_price|commerce_price_format }}'}</C> and <C>{'{{ list_price|commerce_price_format }}'}</C>,
                with <C>{'{{ format }}'}</C> from the variation&rsquo;s binding attribute.
              </p>
              <p>
                <strong>Map by meaning, not by field name.</strong> The prototype&rsquo;s two book data sources
                store the same pair in opposite directions. <C>books.ts</C> stores the member price as{' '}
                <C>price</C> and the list price as <C>originalPrice</C>, while <C>bookCollections.ts</C> stores the
                list price as <C>price</C> and adds <C>memberPrice</C>. That is why the component&rsquo;s props are
                named <C>listPrice</C> and <C>memberPrice</C>. Map at the call site so the tag can never end up on
                the wrong number.
              </p>
              <p>
                Show the member price to everyone, signed in or not, since it is the reason to join. The cart and
                checkout then charge whichever price applies to the buyer.
              </p>
            </DevNote>

            <PropsTable
              rows={[
                { name: 'listPrice', type: 'number', description: 'What a non-member pays.' },
                { name: 'memberPrice', type: 'number', description: 'What a member pays. Omit, or pass a value not below listPrice, for a title with no discount.' },
                { name: 'format', type: 'string', description: 'Binding, shown on the second line. Leave unset when the card gives format its own line.' },
                { name: 'size', type: "'md' | 'sm'", default: "'md'", description: 'sm tightens the lead price to 18px for six-across carousels.' },
              ]}
            />

            <SourceList
              title="Canonical"
              items={[
                { path: 'src/components/ui/BookPrice.tsx' },
                { path: 'src/sections/BooksCollectionLayout.tsx', note: 'call site (books.ts mapping)' },
                { path: 'src/sections/BooksProductSection.tsx', note: 'call site, size="sm"' },
                { path: 'src/components/cards/CollectionTitleCard.tsx', note: 'call site (bookCollections.ts mapping)' },
                { path: 'src/pages/account/AccountWishlist.tsx', note: 'call site, with format' },
              ]}
            />
            <SourceList
              tone="drift"
              title="Hand-rolled price blocks"
              items={[
                {
                  path: 'src/sections/FromThePress.tsx',
                  note: 'small cards set the member price at 14px bold (text-sm) beside a 16px list price, the very inversion BookPrice exists to prevent. No MEMBER PRICE tag. Should use BookPrice size="sm".',
                },
                {
                  path: 'src/sections/BookProductHero.tsx',
                  note: 'product page: 40px headline price, plain list price, and a green “Members save N%” chip. A deliberate product-page variant, but it labels the saving rather than the price.',
                },
                {
                  path: 'src/pages/MembershipMagazineUpsell.tsx',
                  note: 'gold “Member Price” pill above a 44px price, with the comparison price to its left. See Upsell step.',
                },
              ]}
            />
          </div>
        </DocSection>

        {/* ── Card brand marks ──────────────────────────────────────────── */}
        <DocSection title="Card brand marks">
          <div className="flex flex-col gap-8">
            <Prose>
              The cards the Institute accepts: Visa, Mastercard, and American Express. Discover is deliberately
              absent. The row sits beside every Payment Details heading, so buyers know before they open the card
              form. Each mark is a 32×32 canvas with the card body in the inner 28×18, so the rendered box is
              square and the card reads at about 56% of its height.
            </Prose>

            <LiveMarkup label="AcceptedCards — the row beside a Payment Details heading" defaultOpen={false}>
              <AcceptedCards />
            </LiveMarkup>

            <LiveMarkup label="CardBrandIcon — one mark, sized by className" defaultOpen={false}>
              <div className="flex items-end gap-6">
                <CardBrandIcon brand="visa" />
                <CardBrandIcon brand="mastercard" className="h-8 w-8" />
                <CardBrandIcon brand="amex" className="h-6 w-6" />
              </div>
            </LiveMarkup>

            <ClassTable
              rows={[
                { part: 'Row', classes: 'flex items-center gap-2', note: 'Each canvas already carries about 2.75px of transparent margin per side, so the visible gap between cards is about 13.5px.' },
                { part: 'Item', classes: 'flex', note: 'Removes the inline-SVG baseline gap.' },
                { part: 'Mark', classes: 'h-11 w-11', note: 'Default size (44px canvas). Pass another h-/w- pair to resize. The class sizes the square canvas, not the card body.' },
              ]}
            />

            <DevNote>
              <p>
                Ship the three marks as inline SVG in a Twig include (for example{' '}
                <C>{'{% include "@usni/card-brand.html.twig" with { brand: "visa" } %}'}</C>), not as image
                requests. They are tiny, and the prototype inlines them for the same reason. Brand colors are
                hard-coded inside the artwork (<C>#1434cb</C>, <C>#141413</C>, <C>#0f70ce</C>) and are not
                system tokens.
              </p>
              <p>
                Each <C>&lt;svg&gt;</C> carries <C>role="img"</C> and an <C>aria-label</C> with the brand name. Keep
                both. The row is a <C>&lt;ul&gt;</C>, so a screen reader announces &ldquo;list, 3 items&rdquo; and
                then the brands. Drive the list from the payment gateway&rsquo;s allowed card types so it can never
                advertise a card the gateway rejects.
              </p>
            </DevNote>

            <SourceList title="Canonical" items={[{ path: 'src/components/ui/CardBrandIcons.tsx', note: 'CardBrandIcon, AcceptedCards, ACCEPTED_CARDS' }]} />
          </div>
        </DocSection>

        {/* ── Cart: page heading and review banner ──────────────────────── */}
        <DocSection title="Cart: page heading and review banner">
          <div className="flex flex-col gap-8">
            <Prose>
              Every cart and checkout page opens with the same pale-blue band and a centred 64px title (Cart or
              Checkout), with no breadcrumb or eyebrow, so the buyer always knows which step they are on. Below it,
              a cart opens with an amber review banner that thanks the buyer, says what to check, and links to
              the right contact, then a ruled &ldquo;Cart items&rdquo; heading.
            </Prose>

            <LiveMarkup label="Page heading band (all eight cart and checkout pages)" previewClassName="p-0 bg-white">
              <CommercePageHeading title="Cart" />
            </LiveMarkup>

            <LiveMarkup label="Review banner and Cart items heading">
              <div className="flex flex-col gap-8">
                <CartReviewBanner />
                <CartItemsHeading />
              </div>
            </LiveMarkup>

            <ClassTable
              rows={[
                { part: 'Heading band', classes: 'bg-[#ebf4ff] py-20', note: <>Shared by all eight pages. <C>#ebf4ff</C> has no token (it is the recurring light-blue band).</> },
                { part: 'Page title', classes: 'font-headline text-[64px] text-[#1d2535] leading-[1.1] text-center', note: <>No responsive step. It stays 64px on a phone. <C>#1d2535</C> = <C>text-primary</C>.</> },
                { part: 'Cart section', classes: 'bg-white py-16', note: <>Inner wrapper <C>container-site flex flex-col gap-8</C>. Every block in the cart is a direct child, so the 32px rhythm is the section’s.</> },
                { part: 'Review banner', classes: 'bg-[#fefde8] border border-l-4 border-[#ffaa00] px-8 py-6 flex flex-col gap-3', note: <>1px amber border all round, 4px on the leading edge. <C>#fefde8</C> and <C>#ffaa00</C> have no tokens. <C>#ffaa00</C> is the Alert warning accent, but the fill is paler than Alert’s <C>#FFF8D6</C>.</> },
                { part: 'Banner title', classes: 'font-headline text-[28px] text-[#1d2535] leading-[1.2]' },
                { part: 'Banner body', classes: 'font-body text-[16px] text-[#1d2535] leading-[1.5]', note: <>The contact link uses <C>.text-link</C> and points at the flow’s own desk (<C>#general</C>, <C>#foundation</C>, <C>#membership</C>).</> },
                { part: 'Cart items rule', classes: 'border-b border-[#c4c9d4] pb-6', note: <><C>#c4c9d4</C> = <C>neutral-subtler</C>.</> },
                { part: 'Cart items title', classes: 'font-headline text-[40px] text-[#1d2535] leading-[1.1]' },
              ]}
            />

            <DevNote>
              <p>
                Template variables: the band&rsquo;s <C>{'{{ title }}'}</C>, and the banner&rsquo;s{' '}
                <C>{'{{ heading }}'}</C>, <C>{'{{ message }}'}</C>, and <C>{'{{ contact_url }}'}</C>. The banner text
                differs per order type, so store it as checkout-flow or order-type configuration rather than
                hard-coding it.
              </p>
              <p>
                The banner is static guidance, not a status, so it needs no live-region role. If production chooses
                to build it on the Alert component&rsquo;s warning variant instead, the fill becomes{' '}
                <C>#FFF8D6</C>. Decide once, for every flow.
              </p>
            </DevNote>

            <SourceList
              title="Canonical"
              items={[
                { path: 'src/sections/NavalHistoryCartItems.tsx', note: 'review banner and 40px Cart items heading' },
                { path: 'src/sections/DonateCartItems.tsx', note: 'identical classes' },
                { path: 'src/pages/BooksCart.tsx', note: 'heading band (repeated in every cart and checkout page)' },
              ]}
            />
            <SourceList
              tone="drift"
              title="Drift"
              items={[
                { path: 'src/sections/CartItems.tsx', note: 'membership banner is bg-[#fff8d6], 36px title, and 20px text-black body. Cart items heading is 56px over a border-[#0466c8] blue rule.' },
                { path: 'src/sections/BooksCartItems.tsx', note: 'no review banner. Cart items heading is 56px over the blue border-[#0466c8] rule.' },
              ]}
            />
          </div>
        </DocSection>

        {/* ── Cart line item ────────────────────────────────────────────── */}
        <DocSection title="Cart line item">
          <div className="flex flex-col gap-8">
            <Prose>
              One row per thing being bought that does not ship as a product: a membership, a subscription, or a
              gift. A blue headline names it, a row of label/value pairs separated by thin rules gives its
              terms, and two small buttons on the trailing edge go back to change it (Edit) or drop it (Remove).
              A second item sits below a rule. Rows wrap, so on a phone the buttons drop beneath the terms.
            </Prose>

            <LiveMarkup label="Subscription, then an add-on membership below a rule">
              <div className="flex flex-col gap-8">
                <CartLineItem
                  title="Naval History Magazine — Print & Digital"
                  meta={[
                    { label: 'Term', value: '1 year' },
                    { label: 'Delivery', value: 'United States' },
                    { label: 'Price', value: `$${nhOffer.memberPrice}` },
                  ]}
                  qualifier="(member rate)"
                />
                <CartLineItem
                  title="Naval Institute Membership — Full"
                  meta={[
                    { label: 'Term', value: '1 year' },
                    { label: 'Price', value: '$75' },
                  ]}
                  divided
                />
              </div>
            </LiveMarkup>

            <ClassTable
              rows={[
                { part: 'Row', classes: 'flex flex-wrap items-start justify-between gap-4', note: <>A follow-on item adds <C>border-t border-[#c4c9d4] pt-6</C>.</> },
                { part: 'Item title', classes: 'font-headline text-[26px] text-[#023e7d] leading-[1.2]', note: <><C>#023e7d</C> = <C>navy-subtle</C>. Not a link. Edit is the way back.</> },
                { part: 'Terms row', classes: 'flex flex-wrap items-center gap-x-4 gap-y-1' },
                { part: 'Term pair', classes: 'font-body text-[17px] text-[#1d2535]', note: <>Label in <C>&lt;span className="font-bold"&gt;</C>. A qualifier such as “(member rate)” trails the price in <C>text-[#4e576a]</C> (<C>neutral-subtle</C>).</> },
                { part: 'Rule between pairs', classes: 'w-px h-5 bg-[#c4c9d4]', note: 'aria-hidden. Purely visual.' },
                { part: 'Actions', classes: 'flex items-center gap-2 flex-shrink-0 pt-1', note: 'pt-1 drops the buttons onto the title’s cap height.' },
                { part: 'Edit button', classes: 'flex items-center gap-1.5 border border-[#002b5c] text-[#002b5c] font-body font-bold text-[13px] px-4 py-2 hover:bg-navy-bright hover:text-white hover:border-navy-bright transition-colors', note: <>Outline, fills to <C>navy-bright</C> on hover like every outline button. <C>#002b5c</C> = <C>navy-bold</C>.</> },
                { part: 'Remove button', classes: 'flex items-center gap-1.5 border border-[#c1121f] text-[#c1121f] font-body font-bold text-[13px] px-4 py-2 hover:bg-[#c1121f] hover:text-white transition-colors', note: <>Fills solid red on hover, matching the account section’s destructive buttons. <C>#c1121f</C> is the system danger red (no token).</> },
                { part: 'Button icons', classes: 'w-3.5 h-3.5 flex-shrink-0', note: 'Inline SVG pencil and cross, stroke="currentColor".' },
              ]}
            />

            <DevNote>
              <p>
                This is one order item. Variables: <C>{'{{ order_item.title }}'}</C> for the headline (the
                purchased entity&rsquo;s label plus its format attribute), then a loop over the item&rsquo;s
                displayed attributes for the term pairs (<C>{'{{ label }}: {{ value }}'}</C>), and{' '}
                <C>{'{{ order_item.unit_price|commerce_price_format }}'}</C> for Price. Edit links back to the
                product or configurator with the item&rsquo;s options. Remove is the cart View&rsquo;s remove button.
              </p>
              <p>
                <strong>Accessibility:</strong> with two items in the cart, a screen reader hears two identical
                &ldquo;Edit&rdquo; and &ldquo;Remove&rdquo; buttons. Give each an <C>aria-label</C> that names its
                item (&ldquo;Remove Naval History Magazine&rdquo;). After a removal, move focus to the next item, or
                to the Cart items heading if the cart is now empty.
              </p>
            </DevNote>

            <SourceList title="Canonical" items={[{ path: 'src/sections/NavalHistoryCartItems.tsx', note: 'subscription and add-on membership lines' }]} />
            <SourceList
              tone="drift"
              title="Drift"
              items={[
                { path: 'src/sections/DonateCartItems.tsx', note: 'same row, but Remove hovers to a pale hover:bg-[#fff5f5] tint instead of filling red. A commemorative gift adds a priced list of bricks and chairs under the title.' },
                { path: 'src/sections/CartItems.tsx', note: 'membership and magazine lines: no flex-wrap on the row or terms (gap-4 only), term text in text-[#4e576a] instead of #1d2535, rule bg-[#d9d9d9], and the pale Remove hover.' },
                { path: 'src/sections/NavalHistoryCartItems.tsx', note: 'its own add-on membership line labels Edit as “Change” and drops both icons.' },
              ]}
            />
          </div>
        </DocSection>

        {/* ── Product line item ─────────────────────────────────────────── */}
        <DocSection title="Product line item">
          <div className="flex flex-col gap-8">
            <Prose>
              A book is the one physical good, so its row is a bordered product card: cover, linked title,
              subtitle, author, binding, unit price, a quantity stepper, and Remove, with the line subtotal on the
              trailing edge. The stepper floors at 1, so a buyer removes an item with Remove rather than by
              stepping down to zero. Try it below. The subtotal updates. The stepper&rsquo;s own anatomy and
              accessibility requirements are under Quantity stepper on{' '}
              <a href="/design-system/forms" className="text-link">Forms</a>.
            </Prose>

            <LiveMarkup label="Book line item">
              <BookLineItem />
            </LiveMarkup>

            <ClassTable
              rows={[
                { part: 'Row', classes: 'border border-[#c4c9d4] p-6 flex gap-6 items-start', note: 'Does not wrap. On a phone the three columns squeeze, and production should stack the subtotal under the details below sm.' },
                { part: 'Cover link', classes: 'flex-shrink-0 w-24', note: <>Image <C>w-24 shadow-md object-cover</C>. 96px wide, natural height.</> },
                { part: 'Details column', classes: 'flex-1 min-w-0 flex flex-col gap-2' },
                { part: 'Title link', classes: 'font-headline text-[22px] leading-[1.2] text-link', note: <><C>.text-link</C> gives the blue link color and hover underline.</> },
                { part: 'Subtitle, author, format', classes: 'font-body text-[14px] text-[#4e576a]', note: <>Subtitle adds <C>leading-[1.4]</C>. Format value in <C>font-bold text-[#1d2535]</C>.</> },
                { part: 'Unit price', classes: 'font-headline text-[22px] text-[#1d2535]', note: <>Followed by “each” in <C>font-body text-[13px] text-[#4e576a]</C>, inside <C>flex items-baseline gap-2 mt-1</C>.</> },
                { part: 'Stepper row', classes: 'flex items-center gap-6 mt-3', note: <>The quantity stepper and Remove, side by side. Stepper markup: <a href="/design-system/forms" className="text-link">Forms</a>.</> },
                { part: 'Remove link', classes: 'flex items-center gap-1.5 font-body text-[14px] text-[#c0392b] hover:text-[#922b21] transition-colors', note: <>A text button, not the outlined Remove of the line item above, and a different red (<C>#c0392b</C>, not <C>#c1121f</C>).</> },
                { part: 'Subtotal', classes: 'flex-shrink-0 text-right flex flex-col gap-1', note: <>Label <C>font-body text-[13px] text-[#4e576a] uppercase tracking-wide</C>. Amount <C>font-headline text-[28px] text-[#1d2535]</C>.</> },
              ]}
            />

            <DevNote>
              <p>
                Commerce&rsquo;s cart View already renders a quantity field per row (the{' '}
                <C>commerce_order_item_edit_quantity</C> field handler) and a remove button. Theme those rather than
rebuilding them, with the stepper built as Forms describes. When the quantity changes, update the
                line subtotal and announce it through a polite live region.
              </p>
              <p>
                Variables: <C>{'{{ cover }}'}</C>, <C>{'{{ url }}'}</C>, <C>{'{{ title }}'}</C>,{' '}
                <C>{'{{ subtitle }}'}</C>, <C>{'{{ authors }}'}</C>, <C>{'{{ format }}'}</C>,{' '}
                <C>{'{{ unit_price }}'}</C>, <C>{'{{ total_price }}'}</C>.
              </p>
            </DevNote>

            <SourceList title="Canonical" items={[{ path: 'src/sections/BooksCartItems.tsx', note: 'the only product line item' }]} />
          </div>
        </DocSection>

        {/* ── Cart total, options, navigation ──────────────────────────── */}
        <DocSection title="Cart total, options, and step navigation">
          <div className="flex flex-col gap-8">
            <Prose>
              Below the items, a cart closes with three things: the order total (with the member price stated
              when the buyer is not on it), the options that can still change here, and the step navigation, Back
              and Continue to Checkout. Back names where it goes (&ldquo;Back to Subscriptions&rdquo;, &ldquo;Back
              to Donate&rdquo;) rather than a bare &ldquo;Back&rdquo;.
            </Prose>

            <LiveMarkup label="Order total, options, navigation">
              <div className="flex flex-col gap-8">
                <CartTotal />
                <CartOptions />
                <CartStepNav back="Back to Subscriptions" />
              </div>
            </LiveMarkup>

            <LiveMarkup label="Continue blocked: a gift recipient has not been saved (membership cart)">
              <CartStepNav back="Back to Membership Options" blocked />
            </LiveMarkup>

            <LiveMarkup label="Empty cart, after Remove (books and donate)" previewClassName="p-0 bg-white">
              <EmptyCart />
            </LiveMarkup>

            <ClassTable
              rows={[
                { part: 'Total row', classes: 'border-t border-[#c4c9d4] pt-6 flex flex-wrap items-baseline justify-between gap-4' },
                { part: 'Total label', classes: 'font-headline text-[28px] text-[#1d2535] leading-[1.2]' },
                { part: 'Total amount', classes: 'font-headline text-[36px] text-[#023e7d] leading-none', note: <>In a <C>text-right</C> wrapper. Under it, the member-pricing note in <C>font-body text-[14px] text-[#4e576a] mt-1</C>.</> },
                { part: 'Options group', classes: 'flex flex-col gap-4 border-t border-[#c4c9d4] pt-6' },
                { part: 'Option label', classes: 'flex items-start gap-3 cursor-pointer select-none', note: 'The whole line is the label, so the text is a click target too.' },
                { part: 'Option checkbox', classes: 'w-5 h-5 mt-0.5 accent-[#023e7d] cursor-pointer flex-shrink-0', note: <>Native checkbox tinted <C>navy-subtle</C>. Text <C>font-body text-[16px] text-[#1d2535]</C>. See <a href="/design-system/forms" className="text-link">Forms</a> for the shared CheckboxField.</> },
                { part: 'Navigation', classes: 'border-t border-[#999fad] pt-8 flex flex-wrap items-center justify-between gap-4 sm:gap-8', note: <>A darker rule than the others. <C>#999fad</C> has no token.</> },
                { part: 'Back button', classes: 'flex items-center gap-2 border border-[#002b5c] text-[#001845] font-body font-extrabold text-[20px] py-4 px-8 hover:bg-navy-bright hover:text-white hover:border-navy-bright transition-colors', note: <><C>#001845</C> = <C>navy-bolder</C>. Leading arrow SVG <C>w-3 h-3 flex-shrink-0</C>.</> },
                { part: 'Continue button', classes: 'flex items-center gap-2 bg-[#002b5c] text-white font-body font-extrabold text-[20px] py-4 px-8 hover:bg-navy-bright transition-colors', note: 'Trailing arrow. Navy, not gold. Gold is for entering a flow, and navy carries the buyer through it.' },
                { part: 'Continue, blocked', classes: 'bg-[#c4c9d4] text-white cursor-not-allowed', note: <>Membership cart only, with the <C>disabled</C> attribute. White on <C>#c4c9d4</C> fails contrast (about 1.7:1), so production should say why it is blocked in text next to it.</> },
                { part: 'Empty message', classes: 'font-body text-[20px] text-[#4e576a]', note: '“Your cart is empty.” The navigation keeps only the Back button.' },
              ]}
            />

            <DevNote>
              <p>
                Variables: <C>{'{{ order.total_price }}'}</C> and, for a non-member, the member total. That is a
                second price calculation, so expose it from the price resolver rather than doing the arithmetic in
                Twig. Options map to order item fields (gift, auto-renew). Save them on change through the cart
                form, or they are lost on Continue.
              </p>
              <p>
                Continue to Checkout is the cart form&rsquo;s checkout submit. Render it as a{' '}
                <C>&lt;button type="submit"&gt;</C> in the form, not a JavaScript navigation. Back is a link. The
                empty state is the cart View&rsquo;s &ldquo;No results&rdquo; area.
              </p>
            </DevNote>

            <SourceList
              title="Canonical"
              items={[
                { path: 'src/sections/NavalHistoryCartItems.tsx', note: 'total, options, navigation' },
                { path: 'src/sections/BooksCartItems.tsx', note: 'empty cart (DonateCartItems is identical)' },
              ]}
            />
            <SourceList
              tone="drift"
              title="Drift"
              items={[
                { path: 'src/sections/CartItems.tsx', note: 'no order total. Options are font-bold labels in flex items-center gap-2 with no mt-0.5. Navigation is justify-end with 17px→20px text and px-5→px-8 at sm, plus the blocked state.' },
                { path: 'src/sections/DonateCartItems.tsx', note: 'no order total (the amount is in the line item). Option labels use flex items-center gap-2.' },
                { path: 'src/sections/BooksCartItems.tsx', note: 'no order total. The line subtotal stands in for one. Navigation has no sm:gap-8.' },
              ]}
            />
          </div>
        </DocSection>

        {/* ── Cart add-ons ─────────────────────────────────────────────── */}
        <DocSection title="Cart add-ons: gift recipient and donation">
          <div className="flex flex-col gap-6">
            <Prose>
              The membership cart lets the buyer make the purchase a gift and add a donation without leaving the
              cart. Both are checkbox-revealed panels. The gift panel is a form that collapses to a read-only
              summary with an Edit button once it is saved. The donation panel is a row of preset amounts
              plus an &ldquo;Other amount&rdquo; input. Neither is a shared component, and each exists in only
              one place. Treat them as the membership flow&rsquo;s own requirements rather than system patterns.
            </Prose>
            <DevNote>
              <p>
                Build the donation amount picker from the Donate form&rsquo;s controls (preset amounts and the
                custom amount), documented on <a href="/design-system/forms" className="text-link">Forms</a>, so
                there is one amount picker, not two. The membership cart&rsquo;s version (border-2 preset buttons
                that fill <C>#023e7d</C> when chosen, and a <C>$</C> prefix on a <C>w-64</C> input) is drift from
                it. In Commerce, the donation is a second order item of a donation type with a buyer-entered unit
                price.
              </p>
              <p>
                The gift recipient belongs on the order item (or a recipient profile), not on the buyer&rsquo;s
                account. While the gift panel is open and unsaved, Continue to Checkout is disabled. See the blocked
                state above.
              </p>
            </DevNote>
            <SourceList
              tone="drift"
              title="Where the gift recipient lives today (three different shapes)"
              items={[
                { path: 'src/sections/CartItems.tsx', note: 'full form (name, email, rank, address) and a GiftSummary label/value card with an outlined Edit button. Also the membership cart’s donation picker.' },
                { path: 'src/pages/MembershipCheckout.tsx', note: 'a second “Gift Recipient” card on checkout with a pencil icon button and a bordered label/value table. Seeded with demo values.' },
                { path: 'src/sections/NavalHistoryCartItems.tsx', note: 'a single checkbox and no recipient details at all.' },
              ]}
            />
          </div>
        </DocSection>

        {/* ── Checkout layout ───────────────────────────────────────────── */}
        <DocSection title="Checkout layout">
          <div className="flex flex-col gap-8">
            <Prose>
              Checkout is two columns from <C>lg</C> (1024px) up: the forms on the left as a stack of bordered
              section cards, and a 360px order summary on the right that sticks as the forms scroll. Below
              <C> lg</C> the summary drops under the forms at full width. The two columns&rsquo; first cards
              must start on the same line. The validation alert is mounted only when there is something to say.
              An empty wrapper is zero-height but still takes the column&rsquo;s 32px gap, and it pushed the first
              card 32px below the summary beside it.
            </Prose>

            <LiveMarkup label="Two-column checkout (Books), reduced to one form card" defaultOpen={false}>
              <div className="flex flex-col lg:flex-row gap-12 lg:items-start">
                <div className="flex-1 min-w-0 flex flex-col gap-8">
                  <CheckoutCard title="Shipping Method">
                    <ShippingMethodChoices />
                  </CheckoutCard>
                </div>
                <div className="w-full lg:w-[360px] lg:flex-shrink-0 lg:sticky top-8">
                  <OrderSummary />
                </div>
              </div>
            </LiveMarkup>

            <LiveMarkup label="Left column with the required-fields alert mounted">
              <div className="flex-1 min-w-0 flex flex-col gap-8">
                <div>
                  <Alert variant="danger" title="Please complete the required fields" className="scroll-mt-28">
                    The following items are required: Shipping street address, Shipping city, Credit card payment.
                  </Alert>
                </div>
                <CheckoutCard title="Shipping Address" lede="Where your order should be delivered." invalid>
                  <Field label="Street address" htmlFor="ds-err-street" required error="Required.">
                    <TextInput id="ds-err-street" placeholder="123 Main Street" hasError />
                  </Field>
                </CheckoutCard>
              </div>
            </LiveMarkup>

            <ClassTable
              rows={[
                { part: 'Body section', classes: 'bg-white py-14', note: <>Inner <C>container-site</C>.</> },
                { part: 'Columns', classes: 'flex flex-col lg:flex-row gap-12 lg:items-start', note: <><C>lg:items-start</C> keeps the summary its own height, which sticky needs. A stretched column cannot stick.</> },
                { part: 'Forms column', classes: 'flex-1 min-w-0 flex flex-col gap-8', note: <><C>min-w-0</C> lets long field rows shrink instead of pushing the summary off-screen.</> },
                { part: 'Summary column', classes: 'w-full lg:w-[360px] lg:flex-shrink-0 lg:sticky top-8', note: <>Fixed 360px from lg. <C>top-8</C> is unprefixed but only takes effect with <C>lg:sticky</C>.</> },
                { part: 'Alert wrapper', classes: '(ref target, no classes)', note: <>Mounted only when <C>showErrors &amp;&amp; missing.length &gt; 0</C>. The Alert carries <C>scroll-mt-28</C>, so scrolling to it clears the sticky header.</> },
              ]}
            />

            <DevNote>
              <p>
                Commerce&rsquo;s <C>commerce-checkout-form.html.twig</C> already splits the form into a main region
                and a sidebar (<C>form.sidebar</C>), and the order summary pane goes in the sidebar. Map the left
                column to the main region and the right column to the sidebar. The panes (login, contact, shipping,
                payment) become the section cards, in that order.
              </p>
              <p>
                On submit with missing fields, render the danger Alert at the top of the main column and move focus
                to it (<C>tabindex="-1"</C> and <C>focus()</C>), not just scroll. List every missing field by
                its visible label, and mark each field <C>aria-invalid</C> with its own message. Alert markup is on{' '}
                <a href="/design-system/alerts" className="text-link">Alerts</a>, and field error states are on{' '}
                <a href="/design-system/forms" className="text-link">Forms</a>.
              </p>
            </DevNote>

            <SourceList title="Canonical" items={[{ path: 'src/pages/BooksCheckout.tsx', note: 'layout and conditional alert (“Align the checkout columns”)' }]} />
            <SourceList
              tone="drift"
              title="Drift"
              items={[
                { path: 'src/pages/NavalHistorySubscribeCheckout.tsx', note: 'identical layout.' },
                { path: 'src/pages/MembershipCheckout.tsx', note: 'body section py-16. The alert is mounted conditionally through a local RequiredFieldsAlert that puts scroll-mt-28 on the wrapper.' },
                { path: 'src/pages/DonateCheckout.tsx', note: 'as Membership (py-16, RequiredFieldsAlert).' },
              ]}
            />
          </div>
        </DocSection>

        {/* ── Checkout section card ─────────────────────────────────────── */}
        <DocSection title="Checkout section card">
          <div className="flex flex-col gap-8">
            <Prose>
              Each checkout step is a bordered card with a 28px headline, an optional one-line lede that says why
              the step is there (&ldquo;Required for your print edition of Naval History.&rdquo;), and its
              fields. Cards that do not apply are not rendered. An all-digital order has no Delivery Address card,
              and a card that has a missing required item turns its border red.
            </Prose>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LiveMarkup label="Default, with lede">
                <CheckoutCard title="Billing Address" lede="The address on file with your card issuer.">
                  <Field label="Street address" htmlFor="ds-bill-street" required>
                    <TextInput id="ds-bill-street" placeholder="123 Main Street" />
                  </Field>
                </CheckoutCard>
              </LiveMarkup>
              <LiveMarkup label="Invalid">
                <CheckoutCard title="Billing Address" lede="The address on file with your card issuer." invalid>
                  <Field label="Street address" htmlFor="ds-bill-street-err" required error="Required.">
                    <TextInput id="ds-bill-street-err" placeholder="123 Main Street" hasError />
                  </Field>
                </CheckoutCard>
              </LiveMarkup>
            </div>

            <ClassTable
              rows={[
                { part: 'Card', classes: 'border border-[#c4c9d4]', note: <>Invalid swaps to <C>border-red-600</C>. That is Tailwind’s default red (#dc2626), not the system danger red <C>#c1121f</C> that the fields and Alert use.</> },
                { part: 'Body', classes: 'p-6 flex flex-col gap-6' },
                { part: 'Heading group', classes: 'flex flex-col gap-1' },
                { part: 'Headline', classes: 'font-headline text-[28px] text-[#1d2535] leading-[1.2]', note: <>An <C>&lt;h2&gt;</C>. The page title is the h1.</> },
                { part: 'Lede', classes: 'font-body text-[15px] text-[#4e576a] leading-[1.5]', note: 'Optional. Explains why the step is asked, which matters most on the billing card of an all-digital order (“nothing is mailed to it”).' },
              ]}
            />

            <DevNote>
              <p>
                One template for every pane wrapper: <C>{'{{ title }}'}</C>, <C>{'{{ lede }}'}</C>, and{' '}
                <C>{'{{ content }}'}</C>. Use a <C>&lt;fieldset&gt;</C> with the headline as its{' '}
                <C>&lt;legend&gt;</C> (styled as above), or keep the <C>&lt;h2&gt;</C> and add{' '}
                <C>aria-labelledby</C> on a wrapping <C>&lt;section&gt;</C>. Either way the fields are grouped under
                their step&rsquo;s name. Pick the invalid border color once, and prefer <C>#c1121f</C>.
              </p>
            </DevNote>

            <SourceList title="Canonical" items={[{ path: 'src/pages/BooksCheckout.tsx', note: 'the Card helper (title, lede, invalid)' }]} />
            <SourceList
              tone="drift"
              title="Drift"
              items={[
                { path: 'src/pages/NavalHistorySubscribeCheckout.tsx', note: 'an identical Card helper, duplicated.' },
                { path: 'src/pages/MembershipCheckout.tsx', note: 'the same classes written inline per card. Payment Details header lacks gap-4.' },
                { path: 'src/pages/DonateCheckout.tsx', note: 'inline, as Membership.' },
              ]}
            />
          </div>
        </DocSection>

        {/* ── Account step ──────────────────────────────────────────────── */}
        <DocSection title="Account step: create, sign in, or guest">
          <div className="flex flex-col gap-8">
            <Prose>
              The first checkout card asks who is buying. A segmented pair of tabs offers{' '}
              <em>Create an account</em> or <em>Sign in</em>, and the donation checkout adds a third,{' '}
              <em>Checkout as guest</em>, as the only flow that does not need an account. Signing in applies the
              account&rsquo;s address and card, which then appear as radio choices in the later cards (see next
              section). Once signed in, the card collapses to one line of plain text with a Sign out link. It is
              deliberately not an alert, because nothing has gone wrong.
            </Prose>

            <LiveMarkup label="Two tabs (membership, books, Naval History)">
              <AccountTabs tabs={['create', 'signin']} initial="create" />
            </LiveMarkup>
            <LiveMarkup label="Three tabs, guest first (donate)">
              <AccountTabs tabs={['guest', 'create', 'signin']} initial="guest" />
            </LiveMarkup>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LiveMarkup label="Sign in panel">
                <SignInForm />
              </LiveMarkup>
              <LiveMarkup label="Sign in, credentials rejected">
                <SignInForm error />
              </LiveMarkup>
            </div>

            <LiveMarkup label="Signed in (SignedInAs)">
              <SignedInAs email="member@example.com" onSignOut={() => {}} />
            </LiveMarkup>

            <ClassTable
              rows={[
                { part: 'Tab row', classes: 'flex', note: 'Tabs share the width equally.' },
                { part: 'Tab', classes: 'relative group flex-1 py-4 font-body font-bold text-[17px] transition-colors', note: <>Active <C>bg-[#cde4f8] text-[#1d2535]</C>. Inactive <C>bg-[#ebf4ff] text-[#1d2535] hover:text-[#023e7d]</C>. Neither fill has a token.</> },
                { part: 'Tab rule', classes: 'absolute bottom-0 left-0 right-0 h-[3px]', note: <>Active <C>bg-[#023e7d]</C>, inactive <C>bg-[#c4c9d4]</C>. One continuous 3px line under the row.</> },
                { part: 'Hover sweep', classes: 'absolute bottom-0 left-0 right-0 h-[3px] bg-[#0466c8] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out', note: 'Inactive tabs only. The navy-bright rule draws in from the left on hover, the same left-to-right motion as the site’s link underlines.' },
                { part: 'Service subsection', classes: 'border-t border-[#c4c9d4] pt-5 flex flex-col gap-5', note: <>Create-an-account only. Caption <C>font-body font-bold text-[12px] uppercase tracking-[0.08em] text-[#4e576a]</C> “Service Information”, then Service, Military status, Rank / title (driven by Service), Suffix.</> },
                { part: 'Sign in button', classes: 'bg-[#002b5c] text-white font-body font-bold text-[16px] px-6 py-3 border border-[#002b5c] hover:bg-navy-bright hover:border-navy-bright transition-colors', note: <>In <C>flex flex-wrap items-center gap-4</C> with the forgot-password link (<C>font-body text-[15px] w-fit text-link</C>).</> },
                { part: 'Sign-in error', classes: 'font-body text-[14px] text-[#c1121f]', note: <><C>role="alert"</C>, so it is announced when it appears. It doesn’t say which credential was wrong.</> },
                { part: 'Signed in line', classes: 'font-body text-[16px] text-[#1d2535]', note: <>Email in <C>font-bold</C>. Sign out is a button: <C>font-body font-semibold text-[15px] text-link</C>.</> },
              ]}
            />

            <DevNote>
              <p>
                This is Commerce&rsquo;s <C>login</C> checkout pane (&ldquo;Login or continue as guest&rdquo;). Enable
                guest checkout on the donation flow only, and registration (&ldquo;Create an account&rdquo;) on all
                four. Service fields are user-entity fields attached to the registration form, documented on{' '}
                <a href="/design-system/forms" className="text-link">Forms</a>.
              </p>
              <p>
                <strong>Accessibility:</strong> in the prototype the tabs are plain buttons with no selected state
                exposed. Build them as a real tab set (<C>role="tablist"</C>, <C>role="tab"</C> with{' '}
                <C>aria-selected</C> and <C>aria-controls</C>, and <C>role="tabpanel"</C>, with arrow-key movement) in
                a Drupal behavior. Alternatively, build them as a radio group styled as segments, which needs no
                JavaScript to choose. Without JavaScript, all panels should be reachable.
              </p>
              <p>
                After a successful sign-in, the page should move focus to the &ldquo;Signed in as&rdquo; line and
                refresh the later panes with the account&rsquo;s saved address and card.
              </p>
            </DevNote>

            <SourceList title="Canonical" items={[{ path: 'src/pages/MembershipCheckout.tsx', note: 'two-tab set with hover sweep. Account fields.' }, { path: 'src/pages/DonateCheckout.tsx', note: 'three-tab set (guest)' }, { path: 'src/components/ui/SavedOnFile.tsx', note: 'SignedInAs' }]} />
            <SourceList
              tone="drift"
              title="Drift"
              items={[
                { path: 'src/pages/BooksCheckout.tsx', note: 'tabs drop group and the hover sweep. Fields use the shared Field/TextInput, and Rank / title is a free-text input rather than the service-driven select. No graduation year.' },
                { path: 'src/pages/NavalHistorySubscribeCheckout.tsx', note: 'as Books. Adds a “Members get the member rate…” note under Sign in.' },
                { path: 'src/pages/MembershipCheckout.tsx / DonateCheckout.tsx', note: 'local FormInput/FormSelect/LabelledSelect copies of the field recipe (14px bold labels, border-[#4e576a]) instead of the shared FormField.' },
              ]}
            />
          </div>
        </DocSection>

        {/* ── Saved on file ─────────────────────────────────────────────── */}
        <DocSection title="Saved on file: radio choices">
          <div className="flex flex-col gap-8">
            <Prose>
              For a signed-in buyer, the address and card cards offer what the account already holds as a radio
              choice beside &ldquo;use a different one&rdquo;. They are not shown as a value with a
              &ldquo;change&rdquo; link. Both options stay on screen, so what is selected is always visible and
              switching back costs nothing. The &ldquo;different&rdquo; option reveals its fields beneath it only
              while it is selected. The same control lists shipping methods.
            </Prose>

            <p className="font-body text-sm text-neutral-subtle leading-relaxed max-w-[760px]">
              The choice card itself (anatomy, checked and unchecked classes, and the revealed-fields slot) is
              documented once, under Radio buttons on{' '}
              <a href="/design-system/forms" className="text-link">Forms</a>. What checkout adds is the composition
              shown here: the address on file as the first option, its alternative revealing the address fields, and
              the same card listing shipping methods.
            </p>

            <LiveMarkup label="In context: a different shipping address selected, fields revealed" defaultOpen={false}>
              <AddressOnFileChoices initial="new" />
            </LiveMarkup>

            <DevNote>
              <p>
                In Commerce these are the profile select widgets on the shipping and payment panes (the saved
                customer profiles and stored <C>commerce_payment_method</C> entities). Theme those radios with the
                Forms choice-card template rather than building new ones. The first option&rsquo;s detail is the
                formatted saved address (<C>{'{{ profile.address }}'}</C>, name in bold) or the card&rsquo;s{' '}
                <C>{'{{ brand }} ···· {{ last4 }}'}</C> and expiry.
              </p>
              <p>
                Wrap each group in a <C>&lt;fieldset&gt;</C> whose <C>&lt;legend&gt;</C> is the card headline, so the
                radios are announced as a set. When the fields appear, do not move focus into them. Let the buyer
                tab there.
              </p>
            </DevNote>

            <SourceList title="Canonical" items={[{ path: 'src/components/ui/SavedOnFile.tsx', note: 'ChoiceOption, SignedInAs, addressLines. Shared by all four checkouts.' }]} />
          </div>
        </DocSection>

        {/* ── Payment ───────────────────────────────────────────────────── */}
        <DocSection title="Payment details">
          <div className="flex flex-col gap-8">
            <Prose>
              The last form card. The accepted-card row sits opposite the headline. A guest opens the card form
              in a modal (&ldquo;Add new credit card&rdquo;, the gold primary button). Once it succeeds, a plain
              confirmation line appears above the button, which becomes &ldquo;Change credit card&rdquo;. A signed-in
              buyer gets the card on file as a radio choice. The billing-same-as-shipping checkbox lives here and
              appears only when something ships, because an all-digital order has no shipping address to copy.
            </Prose>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <LiveMarkup label="Guest, no card yet" defaultOpen={false}>
                <PaymentDetails state="guest" />
              </LiveMarkup>
              <LiveMarkup label="Guest, card added" defaultOpen={false}>
                <PaymentDetails state="added" />
              </LiveMarkup>
              <LiveMarkup label="Signed in, card on file" defaultOpen={false}>
                <PaymentDetails state="signed-in" />
              </LiveMarkup>
            </div>

            <ClassTable
              rows={[
                { part: 'Header', classes: 'flex items-center justify-between gap-4', note: 'Headline left, AcceptedCards right. The marks are vertically centred on the headline.' },
                { part: 'Card added line', classes: 'font-body text-[15px] text-[#1d2535]', note: <>“The credit card ending in <strong>4242</strong> was successfully added.” Last four in <C>font-bold</C>.</> },
                { part: 'Action stack', classes: 'flex flex-col items-start gap-4', note: <>Button is the shared <C>Button variant="primary" size="lg"</C>, gold. See <a href="/design-system/buttons" className="text-link">Buttons</a>.</> },
                { part: 'Billing same', classes: 'CheckboxField', note: <>Shared component. Unchecking it mounts a Billing Address card above Payment. See <a href="/design-system/forms" className="text-link">Forms</a>.</> },
              ]}
            />

            <DevNote>
              <p>
                This is Commerce&rsquo;s <C>payment_information</C> pane. The card form itself is the modal
                documented on <a href="/design-system/overlays" className="text-link">Modals &amp; Overlays</a>{' '}
                (CreditCardModal). In production it should host the gateway&rsquo;s hosted fields or iframe, so card
                numbers never touch Drupal. Only the brand, last four, and expiry come back to render the
                &ldquo;added&rdquo; line and the stored-card option.
              </p>
              <p>
                When the modal closes after success, return focus to &ldquo;Change credit card&rdquo; and announce
                the added line (render it in a polite live region). If the card step is the missing item on
                submit, the whole card takes the invalid border and the required-fields alert names it
                &ldquo;Credit card payment&rdquo;.
              </p>
            </DevNote>

            <SourceList title="Canonical" items={[{ path: 'src/pages/BooksCheckout.tsx', note: 'Payment Details card' }, { path: 'src/components/ui/CreditCardModal.tsx', note: 'the card form (documented on Overlays)' }]} />
            <SourceList
              tone="drift"
              title="Drift"
              items={[
                { path: 'src/pages/NavalHistorySubscribeCheckout.tsx', note: 'same, checkbox wording “…same as my delivery address.”' },
                { path: 'src/pages/MembershipCheckout.tsx', note: 'header without gap-4. The checkbox is a raw label/input (w-4 h-4, accent-[#023e7d]) reading “…same as my shipping information.”' },
                { path: 'src/pages/DonateCheckout.tsx', note: 'payment and billing hidden entirely until a Sign in tab user has signed in.' },
              ]}
            />
          </div>
        </DocSection>

        {/* ── Order summary ─────────────────────────────────────────────── */}
        <DocSection title="Order summary">
          <div className="flex flex-col gap-8">
            <Prose>
              The checkout&rsquo;s right column: what is being bought, the arithmetic, and the one Checkout button.
              Rows are bold label on the left and value on the right, divided by hairlines, and the total closes
              them in a 30px headline figure. The receipt reuses the same row rhythm, so the order reads the same
              before and after payment. The summary also carries the order-level controls that belong next to
              the price: the coupon code, and for subscriptions the gift and auto-renew settings.
            </Prose>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <LiveMarkup label="Product order (books): line item, subtotal, shipping, tax">
                <div className="max-w-[360px]">
                  <OrderSummary />
                </div>
              </LiveMarkup>
              <LiveMarkup label="Subscription order (Naval History): member note, gift, auto-renew">
                <div className="max-w-[360px]">
                  <SubscriptionSummary />
                </div>
              </LiveMarkup>
            </div>

            <ClassTable
              rows={[
                { part: 'Panel', classes: 'border border-[#c4c9d4]', note: <>Body <C>p-6 flex flex-col gap-6</C>.</> },
                { part: 'Heading', classes: 'font-headline text-[24px] text-[#1d2535] leading-[1.2]', note: 'Smaller than the 28px form cards, because the summary is secondary.' },
                { part: 'Product line', classes: 'flex gap-4 items-start pb-5 border-b border-[#e8eaed]', note: <>Cover <C>w-16 flex-shrink-0 shadow-sm object-cover</C> (decorative, <C>alt=""</C>). Title <C>font-body font-bold text-[15px] text-[#1d2535] leading-snug</C>. Meta lines <C>font-body text-[13px] text-[#4e576a]</C>.</> },
                { part: 'Row', classes: 'flex justify-between items-baseline gap-4 py-3 border-b border-[#e8eaed]', note: <>Label <C>font-body font-bold text-[15px] text-[#1d2535]</C>. Value <C>font-body text-[15px] text-[#4e576a] text-right</C>. <C>#e8eaed</C> has no token (lighter than <C>border-light</C>). Identical to ReceiptRow.</> },
                { part: 'Total row', classes: 'flex justify-between items-baseline gap-4 pt-4 mt-1', note: <>Label <C>font-body font-bold text-[17px] text-[#1d2535]</C>. Amount <C>font-headline text-[30px] text-[#023e7d]</C>.</> },
                { part: 'Member note', classes: 'font-body text-[13px] text-neutral-subtle leading-[1.5] mt-2', note: '“Members pay $32. Sign in above to apply member pricing.” Or, once a membership is in the order, which prices were applied.' },
                { part: 'Rule', classes: 'h-px bg-[#c4c9d4]', note: 'Separates the arithmetic from the controls.' },
                { part: 'Auto-renew', classes: 'flex items-start gap-3', note: <>Shared Toggle (see Toggle switch on <a href="/design-system/forms" className="text-link">Forms</a>) plus <C>font-body text-[14px] text-[#4e576a] leading-[1.5]</C>. The text restates the current state.</> },
                { part: 'Checkout button', classes: 'w-full bg-[#002b5c] text-white font-body font-extrabold text-[18px] py-4 px-6 hover:bg-navy-bright transition-colors', note: <>The only submit. It sits in the summary so it stays in view as the forms scroll. <C>#002b5c</C> = <C>navy-bold</C>.</> },
                { part: 'Footnote', classes: 'font-body text-[13px] text-neutral-subtle leading-[1.5]', note: 'Books only: tax is an estimate.' },
              ]}
            />

            <LiveMarkup label="Drift, for reference: the membership summary’s auto-renew rows">
              <MembershipAutoRenewRows />
            </LiveMarkup>

            <DevNote>
              <p>
                This is Commerce&rsquo;s <C>order_summary</C> pane (the <C>commerce_checkout_order_summary</C> View
                plus <C>commerce-checkout-order-summary.html.twig</C>). The subtotal, adjustments, and total rows come
                from <C>commerce-order-total-summary.html.twig</C>. Theme that one template with the row classes
                above and it serves the cart, the summary, and the receipt. Variables:{' '}
                <C>{'{{ order_entity.order_items }}'}</C>, <C>{'{{ totals.subtotal }}'}</C>,{' '}
                <C>{'{{ totals.adjustments }}'}</C> (shipping, tax, promotions, each with a label), and{' '}
                <C>{'{{ totals.total }}'}</C>.
              </p>
              <p>
                The Checkout button submits the whole checkout form, but it sits in the sidebar. Make it a{' '}
                <C>type="submit"</C> button inside the form (Commerce&rsquo;s actions element), and do not wire it up
                with JavaScript. Use the shared Toggle switch from{' '}
                <a href="/design-system/forms" className="text-link">Forms</a>, not the membership summary&rsquo;s{' '}
                <C>aria-pressed</C> copy.
              </p>
            </DevNote>

            <SourceList title="Canonical" items={[{ path: 'src/pages/BooksCheckout.tsx', note: 'product summary' }, { path: 'src/pages/NavalHistorySubscribeCheckout.tsx', note: 'subscription summary (member note, gift, auto-renew)' }]} />
            <SourceList
              tone="drift"
              title="Drift"
              items={[
                { path: 'src/pages/MembershipCheckout.tsx', note: 'total is text-[28px] text-[#1d2535] (not 30px navy-subtle). Rows read Plan, Term, “NH Format”, “NH Term”. No coupon. The auto-renew rows above are hand-rolled aria-pressed buttons between 2px gold rules, with a #1d2535 “on” track instead of Toggle’s #023e7d, and they state a fixed date (“January 1, 2027”).' },
                { path: 'src/pages/DonateCheckout.tsx', note: 'total is text-[32px]. Frequency row only, then a designation block (commemorative lines, priorities, or “Fund: Most Needed”) with italic tribute and anonymity notes. No coupon.' },
              ]}
            />
          </div>
        </DocSection>

        {/* ── Promo code ────────────────────────────────────────────────── */}
        <DocSection title="Promo and coupon codes">
          <div className="flex flex-col gap-6">
            <Prose>
              A code is entered in the order summary as an optional &ldquo;Coupon code&rdquo; field below the
              total, and only the books and Naval History checkouts have one. It has no Apply button,
              validation, or applied state, so it is a placeholder for the real control. Members find
              codes in Member Updates on their account, where each code is shown in a gold-ruled tan strip.
            </Prose>
            <LiveMarkup label="Coupon field, as it stands">
              <div className="max-w-[312px]">
                <Field label="Coupon code" htmlFor="ds-coupon-alone">
                  <TextInput id="ds-coupon-alone" placeholder="Optional" />
                </Field>
              </div>
            </LiveMarkup>
            <DevNote>
              <p>
                Use Commerce Promotion&rsquo;s <C>coupon_redemption</C> pane (or its inline form in the order summary
                sidebar). It supplies the Apply button, the error (&ldquo;The provided coupon code is
                invalid&rdquo;), and the applied state with a Remove link. Style the error and applied message
                like the field error and help text on <a href="/design-system/forms" className="text-link">Forms</a>,
                and show the discount as an adjustment row in the summary (&ldquo;USA250 −$25.00&rdquo;) so the total
                visibly changes.
              </p>
              <p>
                The membership and donation checkouts need the field too, since the live promotions (USA250,
                CELEBRATE250) are membership codes. The code display in Member Updates is documented on{' '}
                <a href="/design-system/account" className="text-link">Account</a>.
              </p>
            </DevNote>
            <SourceList title="Canonical" items={[{ path: 'src/pages/BooksCheckout.tsx', note: 'Coupon code field' }, { path: 'src/pages/NavalHistorySubscribeCheckout.tsx', note: 'same' }]} />
          </div>
        </DocSection>

        {/* ── Upsell ────────────────────────────────────────────────────── */}
        <DocSection title="Upsell step">
          <div className="flex flex-col gap-8">
            <Prose>
              An optional step between choosing and the cart that offers one related product. Membership buyers
              are offered a Naval History subscription, and Naval History subscribers are offered a membership.
              It opens with an amber strip that confirms the first item is in the cart and offers a text link
              straight on. A tan billboard makes the case with plain arithmetic rather than a claim, two offer
              cards follow, and a &ldquo;No thanks, continue to cart&rdquo; button closes the step. A member who is
              already signed in never sees the membership offer.
            </Prose>

            <LiveMarkup label="Added-to-cart strip" previewClassName="p-0 bg-white">
              <UpsellStrip />
            </LiveMarkup>

            <LiveMarkup label="Billboard with the arithmetic" defaultOpen={false}>
              <UpsellBillboard />
            </LiveMarkup>

            <LiveMarkup label="Offer cards and skip" defaultOpen={false}>
              <div className="flex flex-col items-center gap-8">
                <UpsellOfferCards />
                <Button variant="outline-dark" size="lg">
                  No thanks, continue to cart
                </Button>
              </div>
            </LiveMarkup>

            <ClassTable
              rows={[
                { part: 'Strip', classes: 'bg-[#fff8d6] border-b border-[#ffaa00]', note: <>Full width under the header. Inner <C>container-site py-5</C>. Text <C>font-body text-[18px] text-[#1d2535] leading-[1.4]</C>, first sentence <C>font-bold</C>. Skip is a <C>&lt;button&gt;</C> styled <C>transition-colors font-bold text-link</C>. <C>#fff8d6</C> is the Alert warning fill.</> },
                { part: 'Billboard', classes: 'bg-[#F7F7F2] border border-[#D9D7BF] px-8 lg:px-16 py-10 lg:py-14 flex flex-col lg:flex-row lg:items-center gap-10', note: <><C>#F7F7F2</C> = <C>tan-subtlest</C>, <C>#D9D7BF</C> = <C>tan-subtle</C>. Image (<C>hidden lg:block w-[210px] flex-shrink-0 shadow-lg</C>) shows from lg.</> },
                { part: 'Billboard headline', classes: 'font-headline text-[32px] lg:text-[46px] text-navy-bolder leading-[1.1]', note: <>States the member price outright. <C>.eyebrow</C> above it.</> },
                { part: 'Arithmetic', classes: 'flex flex-wrap items-end gap-x-10 gap-y-4 border-t border-[#D9D7BF] pt-5 mt-1', note: <>A <C>&lt;dl&gt;</C>. The terms are <C>font-body text-[13px] font-semibold uppercase tracking-[0.08em]</C>, grey for the price alone and <C>text-navy-subtle</C> for the member price. The figures are <C>font-headline text-[30px] leading-none</C>, with the member figure in <C>text-navy-bolder</C>.</> },
                { part: 'Offer grid', classes: 'w-full max-w-[980px] grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch', note: 'Equal-height cards. The features list is pushed to the bottom with mt-auto.' },
                { part: 'Offer card', classes: 'bg-white border border-[#c4c9d4] flex flex-col', note: <>Body <C>flex flex-col flex-1 px-8 py-8 gap-6</C>. Name <C>font-headline text-[30px] text-navy-bolder leading-[1.1]</C>.</> },
                { part: 'Offer price', classes: 'font-headline text-[44px] text-navy-bolder leading-[1.0]', note: <>Raised dollar sign <C>font-body font-bold text-base text-navy-bolder mt-[4px]</C>, unit <C>font-body text-sm text-neutral-subtle</C>.</> },
                { part: 'Offer CTA', classes: 'Button size="lg" fullWidth', note: <>The recommended offer is <C>navy</C> and the other is <C>outline-dark</C>. Skip is <C>outline-dark</C>.</> },
                { part: 'Features', classes: 'flex flex-col border-t border-[#e4e7ec] pt-5 gap-1 mt-auto', note: <>Items <C>flex items-start gap-2 py-0.5</C>. Check SVG <C>w-4 h-4 flex-shrink-0 mt-0.5 text-[#0466c8]</C>. Text <C>font-body text-[15px] text-neutral-subtle leading-[1.5]</C>. <C>#e4e7ec</C> has no token.</> },
              ]}
            />

            <DevNote>
              <p>
                There is no core Commerce pane for this. Build it as a page (or a custom checkout pane placed
                before the cart) that adds the second product variation to the current cart order and redirects.
                Skip it server-side when the user already holds the offered entitlement: a member never sees the
                membership offer. The prototype fakes that with <C>?member=true</C>.
              </p>
              <p>
                Variables: <C>{'{{ member_price }}'}</C> and <C>{'{{ list_price }}'}</C> for the billboard (from the
                same resolver as the cart), and a loop over offered variations for <C>{'{{ name }}'}</C>,{' '}
                <C>{'{{ price }}'}</C>, <C>{'{{ unit }}'}</C>, <C>{'{{ description }}'}</C>, and{' '}
                <C>{'{{ features }}'}</C>. Each CTA is an add-to-cart form submit. The billboard follows the tan
                billboard family on <a href="/design-system/billboards" className="text-link">Billboards &amp; Promos</a>.
              </p>
            </DevNote>

            <SourceList title="Canonical" items={[{ path: 'src/pages/NavalHistoryMembershipUpsell.tsx' }]} />
            <SourceList
              tone="drift"
              title="Drift"
              items={[
                { path: 'src/pages/MembershipMagazineUpsell.tsx', note: 'billboard sized with inline style clamp() padding and margins, with the cover grid absolutely positioned to overflow it (inside a max-w-[1312px] px-4 wrapper, not container-site). It adds sentence-style region and term selects, a gold “Member Price” pill over each price with the comparison price to its left, and a check icon with a hard-coded #023e7d stroke.' },
              ]}
            />
          </div>
        </DocSection>

        {/* ── Confirmation ──────────────────────────────────────────────── */}
        <DocSection title="Confirmation and receipt">
          <div className="flex flex-col gap-8">
            <Prose>
              The page after payment, and the one commerce pattern built from shared components. It opens with
              the same pale-blue band as checkout, now with a green check and a headline in the buyer&rsquo;s
              terms (&ldquo;Welcome to the Naval Institute, Matt&rdquo;). A three-cell strip gives the order
              number, date, and receipt email. Bordered receipt cards follow, reusing the order-summary row
              rhythm, then numbered next steps, a row of onward links, and a support line naming the order
              number. All four flows use it.
            </Prose>

            <LiveMarkup label="Confirmation banner" previewClassName="p-0 bg-white">
              <ConfirmationBanner eyebrow="Order confirmed" title="Welcome to the Naval Institute, Matt">
                Your membership is active. Thank you for joining the independent forum for those who dare to think
                seriously about sea power.
              </ConfirmationBanner>
            </LiveMarkup>

            <LiveMarkup label="Receipt body (wrap the page in .print-receipt)" defaultOpen={false}>
              <div className="print-receipt">
                <div className="max-w-[860px] mx-auto flex flex-col gap-8">
                  <ReceiptMeta
                    items={[
                      { label: 'Order number', value: 'USNI-2026-408215' },
                      { label: 'Date', value: 'March 14, 2026' },
                      { label: 'Receipt sent to', value: 'member@example.com' },
                    ]}
                  />
                  <ReceiptCard title="What you purchased" action={<PrintReceiptButton />}>
                    <div className="flex flex-col gap-0">
                      <ReceiptRow label="Plan" value="Full Membership" />
                      <ReceiptRow label="Term" value="1 year" />
                      <ReceiptRow label="Membership dues" value="$75" />
                      <ReceiptRow label="Naval History Magazine" value="$32" />
                      <ReceiptRow label="Payment method" value="Credit card ending in 4242" />
                      <ReceiptTotal value="$107" />
                    </div>
                    <p className="font-body text-[14px] text-neutral-subtle leading-relaxed border-t border-[#e8eaed] pt-4">
                      Auto-renew is <span className="font-bold text-[#1d2535]">on</span>. Your membership renews on
                      March 14, 2027 at the then-current rate. You can turn it off any time in your account settings.
                    </p>
                  </ReceiptCard>
                  <ReceiptCard title="What happens next">
                    <NextSteps
                      steps={[
                        {
                          title: 'Your receipt is on its way',
                          body: (
                            <>
                              A confirmation with this order number has been emailed to{' '}
                              <a href="mailto:member@example.com" className="text-link">member@example.com</a>. Keep it
                              for your records.
                            </>
                          ),
                        },
                        { title: 'Digital access is live now', body: 'Sign in with the email above to read Proceedings and Naval History in full, plus the complete digital archive back to 1874.' },
                        { title: 'Watch for your magazines in the mail', body: 'Print issues begin with the next published number, typically four to six weeks out.' },
                      ]}
                    />
                  </ReceiptCard>
                  <ConfirmationActions
                    links={[
                      { label: 'Start reading Proceedings', href: '/proceedings' },
                      { label: 'Explore the archives', href: '/archives' },
                      { label: 'Back to home', href: '/' },
                    ]}
                  />
                  <ConfirmationSupport>
                    Questions about this order? Call member services at{' '}
                    <a href={`tel:${MEMBER_SERVICES_PHONE.replace(/[^0-9]/g, '')}`} className="text-link">{MEMBER_SERVICES_PHONE}</a>{' '}
                    or email <a href={`mailto:${MEMBER_SERVICES_EMAIL}`} className="text-link">{MEMBER_SERVICES_EMAIL}</a>{' '}
                    and reference order USNI-2026-408215.
                  </ConfirmationSupport>
                </div>
              </div>
            </LiveMarkup>

            <ClassTable
              rows={[
                { part: 'Banner', classes: 'bg-[#ebf4ff] py-14 lg:py-20', note: <>Inner <C>container-site flex flex-col items-center text-center gap-5</C>.</> },
                { part: 'Check badge', classes: 'w-16 h-16 rounded-full bg-white flex items-center justify-center flex-shrink-0', note: <>Icon <C>fa-solid fa-check text-[26px] text-[#0a5c2e]</C> (the Alert success green). Decorative, so <C>aria-hidden</C>. One of the few intentionally round shapes.</> },
                { part: 'Eyebrow', classes: 'font-body font-medium text-sm uppercase tracking-[0.08em] text-[#023e7d]' },
                { part: 'Headline', classes: 'font-headline text-[36px] lg:text-[52px] text-[#1d2535] leading-[1.1] max-w-[820px]', note: 'The page’s h1. 36px below lg.' },
                { part: 'Banner body', classes: 'font-body text-base lg:text-lg text-neutral-subtle leading-relaxed max-w-[640px]' },
                { part: 'Receipt column', classes: 'max-w-[860px] mx-auto flex flex-col gap-8', note: <>Inside <C>bg-white py-12 lg:py-16</C> and <C>container-site</C>. One column, narrower than checkout, since a receipt is read top to bottom.</> },
                { part: 'Meta strip', classes: 'grid grid-cols-1 sm:grid-cols-3 border border-[#c4c9d4] divide-y divide-[#c4c9d4] sm:divide-y-0 sm:divide-x', note: <>A <C>&lt;dl&gt;</C>. Cells <C>px-5 py-4 flex flex-col gap-1 min-w-0</C>. dt <C>font-body font-semibold text-[12px] uppercase tracking-[0.06em] text-[#4e576a]</C>. dd <C>font-body font-bold text-[16px] text-[#1d2535] break-words</C> (a long email breaks rather than overflowing). Stacks below sm.</> },
                { part: 'Receipt card', classes: 'border border-[#c4c9d4]', note: <>Body <C>p-6 lg:p-8 flex flex-col gap-5</C>. Header <C>flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2</C>. Title <C>font-headline text-[26px] lg:text-[28px] text-[#1d2535] leading-[1.2]</C>.</> },
                { part: 'Receipt row', classes: 'flex justify-between items-baseline gap-4 py-3 border-b border-[#e8eaed]', note: 'Same classes as the order summary row.' },
                { part: 'Receipt total', classes: 'flex justify-between items-baseline gap-4 pt-4 mt-1', note: <>Label <C>font-body font-bold text-[17px] text-[#1d2535]</C> (default “Total charged”). Amount <C>font-headline text-[32px] text-[#023e7d]</C>.</> },
                { part: 'Print button', classes: 'print-hide inline-flex items-center gap-2 font-body font-semibold text-[15px] text-link', note: <>Just “Print”, because the card title already names what prints. Calls <C>window.print()</C>.</> },
                { part: 'Next step', classes: 'flex gap-4 lg:gap-5 py-5 border-b border-[#e8eaed] last:border-b-0 last:pb-0', note: <>An <C>&lt;ol&gt;</C>. Number tile <C>flex-shrink-0 w-9 h-9 bg-[#ebf4ff] text-[#023e7d] font-body font-bold text-[15px] flex items-center justify-center</C> (aria-hidden, since the list already numbers). Title <C>font-body font-bold text-[16px] text-[#1d2535]</C>. Body <C>font-body text-[15px] text-neutral-subtle leading-relaxed</C>.</> },
                { part: 'Actions', classes: 'print-hide flex flex-col sm:flex-row flex-wrap gap-3', note: <>First link solid navy (<C>bg-navy-bolder … hover:bg-navy-bright</C>), the rest outline. All <C>px-6 py-4 text-base font-bold</C>. Full width stacked below sm.</> },
                { part: 'Support line', classes: 'font-body text-[15px] text-neutral-subtle leading-relaxed', note: 'Phone and email as .text-link, plus the order number to quote.' },
              ]}
            />

            <DocLabel>Print rules (src/index.css)</DocLabel>
            <CodeBlock
              code={`/* Printed receipts: a confirmation page should print as a document, so the site
   chrome and the on-page controls drop out. Opt-in via \`.print-receipt\` on the
   page root — see \`components/ui/Confirmation.tsx\`. */
@media print {
  .print-receipt header,
  .print-receipt footer,
  .print-receipt .print-hide {
    display: none !important;
  }
}`}
            />

            <DevNote>
              <p>
                This is Commerce&rsquo;s <C>completion_message</C> pane (
                <C>commerce-checkout-completion-message.html.twig</C>). The email receipt is{' '}
                <C>commerce-order-receipt.html.twig</C>. Variables: <C>{'{{ order_entity.order_number }}'}</C>,{' '}
                <C>{'{{ order_entity.placed }}'}</C>, <C>{'{{ order_entity.mail }}'}</C>, the order items and{' '}
                <C>{'{{ totals }}'}</C> (the same total-summary template as checkout), the payment method&rsquo;s
                label, and per-order-type next steps and onward links (configuration, not code).
              </p>
              <p>
                Put <C>print-receipt</C> on the page root and <C>print-hide</C> on anything interactive. The rule
                hides every <C>&lt;header&gt;</C> and <C>&lt;footer&gt;</C> element inside the receipt, not just the
                site chrome, so do not use those elements for receipt content.
              </p>
              <p>
                The receipt must also be reachable later from Orders &amp; receipts in the account (the user order
                view, <C>commerce-order--user.html.twig</C>), and that page should render this same body. Move focus
                to the h1 on load so screen-reader users hear the confirmation first.
              </p>
            </DevNote>

            <PropsTable
              rows={[
                { name: 'ConfirmationBanner', type: '{ eyebrow, title, children? }', description: 'Pale-blue band with the check, eyebrow, h1, and an optional paragraph.' },
                { name: 'ReceiptMeta', type: '{ items: { label, value }[] }', description: 'Three-cell order number / date / email strip.' },
                { name: 'ReceiptCard', type: '{ title, action?, children }', description: 'Bordered card. action sits opposite the title (PrintReceiptButton).' },
                { name: 'ReceiptRow / ReceiptTotal', type: '{ label, value } / { label?, value }', description: 'Summary-rhythm rows. Total label defaults to “Total charged”.' },
                { name: 'NextSteps', type: '{ steps: { title, body }[] }', description: 'Numbered list.' },
                { name: 'ConfirmationActions', type: '{ links: { label, href }[] }', description: 'Onward links. The first is the solid CTA.' },
              ]}
            />

            <SourceList
              title="Canonical"
              items={[
                { path: 'src/components/ui/Confirmation.tsx', note: 'every piece. Its docblock still says “membership and donation”, but all four flows use it.' },
                { path: 'src/pages/MembershipConfirmation.tsx', note: 'reference composition' },
                { path: 'src/pages/BooksConfirmation.tsx', note: 'adds shipping, tax, quantity rows' },
                { path: 'src/pages/DonateConfirmation.tsx', note: 'ReceiptTotal label “Total gift” / “Charged today”' },
                { path: 'src/pages/NavalHistorySubscribeConfirmation.tsx' },
                { path: 'src/index.css', note: '@media print rule' },
              ]}
            />
          </div>
        </DocSection>

        {/* ── Drupal Commerce mapping ───────────────────────────────────── */}
        <DocSection title="Drupal Commerce mapping">
          <div className="flex flex-col gap-6">
            <Prose>
              A summary of where each piece on this page lands in Drupal Commerce 2.x, so the build themes
              Commerce&rsquo;s own templates and panes instead of rebuilding the prototype&rsquo;s React.
            </Prose>
            <ClassTable
              rows={[
                { part: 'Product types', classes: 'membership · subscription · book · donation', note: <>Book variations carry <C>list_price</C> (BookPrice’s list) and a binding attribute. Member pricing comes from a price list or resolver keyed to the member role.</> },
                { part: 'Order types', classes: 'one per flow', note: 'Each with its own checkout flow, so Donate can allow guests and Books can require shipping.' },
                { part: 'Cart page', classes: 'commerce_cart_form View', note: 'Line items as rows, the quantity field handler (stepper), the remove button, and the checkout submit (Continue to Checkout). Review banner and total are header/footer areas.' },
                { part: 'Upsell step', classes: 'custom page or pane', note: 'Adds a second variation to the cart order. Skipped server-side for existing members.' },
                { part: 'Account step', classes: 'login pane', note: '“Login or continue as guest”: guest allowed on Donate only, registration on all.' },
                { part: 'Address cards', classes: 'shipping_information · payment_information (billing)', note: 'Commerce Shipping supplies shipping methods (ChoiceOption list). Saved customer profiles are the address on file.' },
                { part: 'Payment card', classes: 'payment_information pane', note: 'Stored commerce_payment_method entities are the card on file. The gateway’s hosted fields go inside the card modal.' },
                { part: 'Coupon', classes: 'coupon_redemption pane', note: 'Commerce Promotion. The discount shows as an adjustment row.' },
                { part: 'Order summary', classes: 'order_summary pane', note: <><C>commerce-checkout-order-summary.html.twig</C> and <C>commerce-order-total-summary.html.twig</C>.</> },
                { part: 'Auto-renew', classes: 'Commerce Recurring', note: 'Billing schedule per subscription and membership. The toggle sets the order item’s auto-renew field.' },
                { part: 'Confirmation', classes: 'completion_message pane', note: <><C>commerce-checkout-completion-message.html.twig</C>. Email: <C>commerce-order-receipt.html.twig</C>.</> },
                { part: 'Layout', classes: 'commerce-checkout-form.html.twig', note: 'Main region = forms column, sidebar = summary column.' },
              ]}
            />
          </div>
        </DocSection>
      </div>
    </DesignSystemLayout>
  )
}
