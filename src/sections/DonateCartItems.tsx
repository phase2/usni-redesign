import { useState, useEffect, type ReactNode } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useCart } from '@/context/CartContext'
import { DONATION_PRIORITIES } from '@/data/givingOpportunities'
import {
  appendCommemorativeParams,
  commemorativeLineLabel,
  donateFormHref,
  money,
  readDonation,
  type CommemorativeGift,
} from '@/data/commemorativeGifts'

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onToggle}
      className={`relative flex-shrink-0 w-[52px] h-7 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#023e7d]/40 ${
        on ? 'bg-[#023e7d]' : 'bg-[#c4c9d4]'
      }`}
    >
      <span
        className={`absolute top-[3px] w-[22px] h-[22px] rounded-full bg-white shadow transition-transform duration-200 flex items-center justify-center ${
          on ? 'translate-x-[27px]' : 'translate-x-[3px]'
        }`}
      >
        {!on && (
          <svg className="w-2.5 h-2.5 text-[#999fad]" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
            <path d="M2 2l6 6M8 2L2 8" />
          </svg>
        )}
        {on && (
          <svg className="w-2.5 h-2.5 text-[#023e7d]" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1.5 5l3 3 4-4" />
          </svg>
        )}
      </span>
    </button>
  )
}


/** One line of the cart: what it is, its details, and Edit and Remove. */
function CartItem({
  title,
  children,
  onEdit,
  onRemove,
}: {
  title: string
  children: ReactNode
  onEdit: () => void
  onRemove: () => void
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-[#e0e2e7] last:border-0 last:pb-0">
      <div className="flex flex-col gap-1">
        <h3 className="font-headline text-[26px] text-[#023e7d] leading-[1.2]">{title}</h3>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">{children}</div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0 pt-1">
        <button
          type="button"
          onClick={onEdit}
          className="flex items-center gap-1.5 border border-[#002b5c] text-[#002b5c] font-body font-bold text-[13px] px-4 py-2 hover:bg-navy-bright hover:text-white hover:border-navy-bright transition-colors"
        >
          <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
          Edit
        </button>
        <button
          type="button"
          onClick={onRemove}
          className="flex items-center gap-1.5 border border-[#c1121f] text-[#c1121f] font-body font-bold text-[13px] px-4 py-2 hover:bg-[#fff5f5] transition-colors"
        >
          <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 1l12 12M13 1L1 13" />
          </svg>
          Remove
        </button>
      </div>
    </div>
  )
}

/** "Label: value", as the cart's item details print. */
function Detail({ label, children }: { label: string; children: ReactNode }) {
  return (
    <p className="font-body text-[17px] text-[#1d2535]">
      <span className="font-bold">{label}:</span> {children}
    </p>
  )
}

const Divider = () => <div className="w-px h-5 bg-[#c4c9d4]" aria-hidden />

/**
 * The donation cart. As on the live /foundation flow, a gift and any bricks or
 * chairs from the donation form arrive together and list as separate items —
 * the gift with its frequency and amount, each commemorative gift with its
 * quantity — each with its own Edit and Remove, and a total under them.
 *
 * Investment priorities apply to the cash gift, so the picker shows only while
 * there is one. Bricks and chairs are always designated to the Center's
 * Maintenance & Technology Fund, so they report their recognition instead.
 * Edit and Back return to the donation form with every choice still made.
 */
export default function DonateCartItems() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { setCartCount } = useCart()

  const frequency      = searchParams.get('frequency') ?? 'one-time'
  const frequencyLabel = frequency === 'monthly' ? 'Monthly' : 'One-Time'

  const donation = readDonation(searchParams)
  const [cashRemoved, setCashRemoved] = useState(false)
  const [removedLines, setRemovedLines] = useState<Set<CommemorativeGift['id']>>(new Set())

  const cash = cashRemoved ? 0 : donation.cash
  const commemorativeLines = donation.lines.filter(l => !removedLines.has(l.gift.id))
  const total = cash + commemorativeLines.reduce((sum, l) => sum + l.subtotal, 0)
  const itemCount = (cash > 0 ? 1 : 0) + commemorativeLines.length
  const removed = itemCount === 0

  /**
   * A gift that arrived already designated — the Donate Today buttons under
   * More Ways to Give hand over `priority=<id>` through the donation form —
   * opens with that priority selected and "where needed most" off, so the
   * donor is not asked to designate a gift they have already designated.
   * Unrecognised ids are ignored rather than trusted into the set.
   */
  const requestedPriority = searchParams.get('priority')
  const presetPriority = DONATION_PRIORITIES.some(o => o.id === requestedPriority)
    ? requestedPriority!
    : null
  const editPath = donateFormHref({ cash, lines: commemorativeLines }, presetPriority)

  const [useWhereNeeded, setUseWhereNeeded] = useState(!presetPriority)
  const [priorities, setPriorities]         = useState<Set<string>>(
    presetPriority ? new Set([presetPriority]) : new Set(),
  )
  const [isAnonymous, setIsAnonymous]       = useState(false)
  const [sendMessage, setSendMessage]       = useState(false)
  const [message, setMessage]               = useState('')
  const [isTribute, setIsTribute]           = useState(false)
  const [tributeType, setTributeType]       = useState<'honor' | 'memory'>('honor')
  const [tributeName, setTributeName]       = useState('')

  useEffect(() => {
    setCartCount(itemCount)
  }, [itemCount, setCartCount])

  const togglePriority = (id: string) => {
    setPriorities(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
        setUseWhereNeeded(false)
      }
      return next
    })
  }

  const handleCheckout = () => {
    const params = new URLSearchParams({ frequency })
    if (cash > 0) params.set('amount', String(cash))
    // Priorities designate the cash gift; bricks and chairs are already designated.
    if (cash > 0 && !useWhereNeeded && priorities.size > 0) {
      params.set('priorities', Array.from(priorities).join(','))
    }
    if (isAnonymous) params.set('anonymous', 'true')
    // A tribute only travels if it names someone — the checkbox alone says
    // nothing the order summary could print.
    if (isTribute && tributeName.trim()) {
      params.set('tribute', tributeType)
      params.set('tributeName', tributeName.trim())
    }
    appendCommemorativeParams(params, commemorativeLines)
    navigate(`/giving/donate/checkout?${params.toString()}`)
  }

  if (removed) {
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
              onClick={() => navigate('/giving/donate')}
              className="flex items-center gap-2 border border-[#002b5c] text-[#001845] font-body font-extrabold text-[20px] py-4 px-8 hover:bg-navy-bright hover:text-white hover:border-navy-bright transition-colors"
            >
              <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 6H2M6 2L2 6l4 4" />
              </svg>
              Back to Donate
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white py-16">
      <div className="container-site flex flex-col gap-8">

        {/* Alert banner */}
        <div className="bg-[#fefde8] border border-l-4 border-[#ffaa00] px-8 py-6 flex flex-col gap-3">
          <h2 className="font-headline text-[28px] text-[#1d2535] leading-[1.2]">Review your donation</h2>
          <p className="font-body text-[16px] text-[#1d2535] leading-[1.5]">
            Thank you for supporting the U.S. Naval Institute! You can adjust your donation amount or frequency
            below before proceeding to checkout. If you have any questions, please{' '}
            <a href="/contact#foundation" className="transition-colors text-link">
              contact us
            </a>.
          </p>
        </div>

        {/* Cart items heading */}
        <div className="border-b border-[#c4c9d4] pb-6">
          <h2 className="font-headline text-[40px] text-[#1d2535] leading-[1.1]">Cart items</h2>
        </div>

        {/* Items: the gift, then each commemorative gift, then the total. The
            items have their own column so the last one drops its rule (`last:`)
            and only the darker one above the total shows. */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-6">
            {cash > 0 && (
              <CartItem
                title="Gift to the U.S. Naval Institute"
                onEdit={() => navigate(editPath)}
                onRemove={() => setCashRemoved(true)}
              >
                <Detail label="Frequency">{frequencyLabel}</Detail>
                <Divider />
                <Detail label="Amount">{money(cash)}</Detail>
              </CartItem>
            )}

            {commemorativeLines.map(line => (
              <CartItem
                key={line.gift.id}
                title={`${line.gift.plural} — Jack C. Taylor Conference Center`}
                onEdit={() => navigate(editPath)}
                onRemove={() => setRemovedLines(prev => new Set(prev).add(line.gift.id))}
              >
                <Detail label="Quantity">{line.count}</Detail>
                <Divider />
                <Detail label="Amount">${line.subtotal.toLocaleString()}</Detail>
                <span className="font-body text-[15px] text-[#4e576a]">
                  (${line.gift.unitPrice.toLocaleString()} each)
                </span>
              </CartItem>
            ))}
          </div>

          {itemCount > 1 && (
            <div className="flex items-baseline justify-end gap-4 border-t border-[#c4c9d4] pt-5">
              <span className="font-body font-bold text-[17px] text-[#1d2535]">Total</span>
              <span className="font-headline text-[32px] text-[#023e7d] leading-none">{money(total)}</span>
            </div>
          )}
        </div>

        {/* Bricks and chairs are already designated, so they report their
            recognition rather than asking the donor to choose a priority. */}
        {commemorativeLines.length > 0 && (
          <div className="bg-[#f4f5f7] border border-[#e0e2e7] p-6 flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <h3 className="font-body font-bold text-[18px] text-[#1d2535]">
                Your commemorative gift
              </h3>
              <p className="font-body text-[14px] text-[#4e576a] leading-[1.5]">
                Bricks and chairs support the Jack C. Taylor Conference Center Maintenance &amp;
                Technology Fund and are recognized at the Center itself.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {commemorativeLines.map(line => (
                <div key={line.gift.id} className="flex flex-col gap-1.5">
                  <p className="font-body font-bold text-[15px] text-[#1d2535] capitalize">
                    {commemorativeLineLabel(line)}
                  </p>
                  <p className="font-body text-[14px] text-[#1d2535] leading-[1.6]">
                    {line.gift.recognition}
                  </p>
                  <p className="font-body italic text-[13px] text-[#4e576a] leading-[1.5]">
                    {line.gift.footnote}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Investment priorities, for the cash gift */}
        {cash > 0 && (
        <div className="bg-[#f4f5f7] border border-[#e0e2e7] p-6 flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <h3 className="font-body font-bold text-[18px] text-[#1d2535]">Select investment priorities</h3>
            <p className="font-body text-[14px] text-[#4e576a] leading-[1.5]">
              Select where your {commemorativeLines.length > 0 ? `${money(cash)} gift` : 'donation'} will
              be used. If more than one priority is selected, your donation will be split evenly between the selections.
            </p>
            <p className="font-body text-[14px] text-[#4e576a] leading-[1.5]">
              If you do not see your desired priority in the list,{' '}
              <a
                href="mailto:foundation@usni.org?subject=Donation%20priority%20inquiry"
                className="text-link"
              >
                contact us
              </a>
              .
            </p>
          </div>

          {/* "Use where most needed" — full-width row */}
          <div className="flex items-center gap-3">
            <Toggle on={useWhereNeeded} onToggle={() => setUseWhereNeeded(v => !v)} />
            <span className="font-body font-bold text-[15px] text-[#1d2535]">Use my Gift where it is Most Needed</span>
          </div>

          {/* Other priorities — 3-column grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
            {DONATION_PRIORITIES.map(opt => (
              <div key={opt.id} className="flex items-center gap-3">
                <Toggle on={priorities.has(opt.id)} onToggle={() => togglePriority(opt.id)} />
                <span className="font-body text-[14px] text-[#1d2535] leading-snug">{opt.label}</span>
              </div>
            ))}
          </div>
        </div>
        )}

        {/* Send a message */}
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={sendMessage}
              onChange={e => setSendMessage(e.target.checked)}
              className="w-5 h-5 accent-[#023e7d] cursor-pointer flex-shrink-0"
            />
            <span className="font-body text-[16px] text-[#1d2535]">Send a message with my donation</span>
          </label>
          {sendMessage && (
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Write a message to accompany your gift…"
              rows={4}
              className="w-full border border-[#4e576a] bg-white px-4 py-3 font-body text-[16px] text-[#4e576a] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#023e7d]/30 focus:border-[#023e7d] rounded-none resize-none"
            />
          )}
        </div>

        {/* Anonymous gift */}
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={e => setIsAnonymous(e.target.checked)}
            className="w-5 h-5 accent-[#023e7d] cursor-pointer flex-shrink-0"
          />
          <span className="font-body text-[16px] text-[#1d2535]">I wish my gift to remain anonymous</span>
        </label>

        {/* Tribute gift. The honour/memory choice sits with the name rather
            than being inferred from it: the Foundation writes to the family for
            a memorial gift and to the honoree for the other, so the wrong guess
            is the kind of mistake that reaches a bereaved household. */}
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isTribute}
              onChange={e => setIsTribute(e.target.checked)}
              className="w-5 h-5 accent-[#023e7d] cursor-pointer flex-shrink-0"
            />
            <span className="font-body text-[16px] text-[#1d2535]">
              Make this gift in honor or memory of someone
            </span>
          </label>

          {isTribute && (
            <div className="flex flex-col gap-4 border-l-2 border-[#c4c9d4] pl-5">
              <fieldset className="flex flex-col gap-2">
                <legend className="font-body font-bold text-[14px] text-[#1d2535] mb-1">
                  This gift is
                </legend>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {([
                    { value: 'honor', label: 'In honor of' },
                    { value: 'memory', label: 'In memory of' },
                  ] as const).map(option => (
                    <label
                      key={option.value}
                      className="flex items-center gap-2 cursor-pointer select-none"
                    >
                      <input
                        type="radio"
                        name="tribute-type"
                        value={option.value}
                        checked={tributeType === option.value}
                        onChange={() => setTributeType(option.value)}
                        className="w-4 h-4 accent-[#023e7d] cursor-pointer flex-shrink-0"
                      />
                      <span className="font-body text-[15px] text-[#1d2535]">{option.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="flex flex-col gap-1.5 max-w-[460px]">
                <label
                  htmlFor="tribute-name"
                  className="font-body font-bold text-[14px] text-[#1d2535]"
                >
                  Name of the person being {tributeType === 'memory' ? 'remembered' : 'honored'}
                </label>
                <input
                  id="tribute-name"
                  type="text"
                  value={tributeName}
                  onChange={e => setTributeName(e.target.value)}
                  placeholder="Full name"
                  className="w-full border border-[#4e576a] bg-white px-4 py-3 font-body text-[16px] text-[#1d2535]
                             placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#023e7d]/30
                             focus:border-[#023e7d] rounded-none"
                />
                <p className="font-body text-[13px] text-[#4e576a] leading-[1.5]">
                  The Naval Institute Foundation will be in touch about how you would like the
                  dedication acknowledged.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="border-t border-[#999fad] pt-8 flex flex-wrap items-center justify-between gap-4 sm:gap-8">
          <button
            type="button"
            onClick={() => navigate(editPath)}
            className="flex items-center gap-2 border border-[#002b5c] text-[#001845] font-body font-extrabold text-[20px] py-4 px-8 hover:bg-navy-bright hover:text-white hover:border-navy-bright transition-colors"
          >
            <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 6H2M6 2L2 6l4 4" />
            </svg>
            Back to Donate
          </button>
          <button
            type="button"
            onClick={handleCheckout}
            className="flex items-center gap-2 bg-[#002b5c] text-white font-body font-extrabold text-[20px] py-4 px-8 hover:bg-navy-bright transition-colors"
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
