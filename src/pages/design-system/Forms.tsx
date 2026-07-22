import { useState } from 'react'
import DesignSystemLayout from '@/components/design-system/DesignSystemLayout'
import DocSection from '@/components/design-system/DocSection'
import DocLabel from '@/components/design-system/DocLabel'
import CodeBlock from '@/components/design-system/CodeBlock'
import PropsTable from '@/components/design-system/PropsTable'
import { Button } from '@/components/ui/Button'
import BookSearchBar from '@/components/ui/BookSearchBar'
import CreditCardModal from '@/components/ui/CreditCardModal'

export default function Forms() {
  const [creditCardOpen, setCreditCardOpen] = useState(false)
  const [last4, setLast4] = useState<string | null>(null)

  return (
    <DesignSystemLayout breadcrumb="Forms & Inputs">
      <div className="max-w-container mx-auto px-6 lg:px-8 pt-12 pb-8">
        <p className="font-body font-medium text-sm uppercase tracking-[0.08em] text-navy-subtle mb-3">
          Components
        </p>
        <h1 className="font-headline text-5xl text-navy-bolder leading-[1.1] mb-4">Forms &amp; Inputs</h1>
        <p className="font-body text-base text-neutral-subtle leading-relaxed max-w-2xl">
          Search, modal-based data collection, and the shared input field treatment they're both built from.
          Try each component live below.
        </p>
      </div>

      <div className="max-w-container mx-auto px-6 lg:px-8 pb-24">
        <DocSection title="Book Search Bar">
          <p className="font-body text-sm text-neutral-subtle leading-relaxed mb-6 max-w-2xl">
            An autocomplete search input used on Books &amp; Press pages. Type at least 2 characters (try
            &ldquo;war&rdquo; or &ldquo;the&rdquo;) to see matching titles and authors, with the query highlighted
            in the results.
          </p>
          <div className="border border-border-light bg-white p-8 mb-6 max-w-xl">
            <BookSearchBar />
          </div>
          <CodeBlock code={`import BookSearchBar from '@/components/ui/BookSearchBar'

<BookSearchBar />`} />
        </DocSection>

        <DocSection title="Credit Card Modal">
          <p className="font-body text-sm text-neutral-subtle leading-relaxed mb-6 max-w-2xl">
            A focused payment form used in checkout flows (Books, Membership, Donate carts) — segmented card
            number fields with auto-advance, expiry selects, and a security code field. Calls{' '}
            <code className="font-mono text-xs bg-neutral-subtlest px-1.5 py-0.5">onSuccess(last4)</code> once
            all fields are valid and the form is submitted.
          </p>
          <div className="border border-border-light bg-white p-8 mb-6 flex items-center gap-4">
            <Button variant="primary" onClick={() => setCreditCardOpen(true)}>Open Credit Card Modal</Button>
            {last4 && (
              <p className="font-body text-sm text-neutral-subtle">
                Submitted — card ending in <span className="font-bold text-navy-bolder">{last4}</span>
              </p>
            )}
          </div>
          <CreditCardModal
            open={creditCardOpen}
            onClose={() => setCreditCardOpen(false)}
            onSuccess={(value) => { setLast4(value); setCreditCardOpen(false) }}
          />
          <CodeBlock code={`import CreditCardModal from '@/components/ui/CreditCardModal'

const [open, setOpen] = useState(false)

<CreditCardModal
  open={open}
  onClose={() => setOpen(false)}
  onSuccess={(last4) => { /* charge card, close modal */ }}
/>`} />
          <div className="mt-6">
            <PropsTable
              rows={[
                { name: 'open', type: 'boolean', description: 'Controls visibility. Both modals render null when false.' },
                { name: 'onClose', type: '() => void', description: 'Called on Escape, backdrop click, or the close button.' },
                { name: 'onSuccess', type: '(last4: string) => void', description: 'CreditCardModal only — called with the last 4 digits once valid.' },
              ]}
            />
          </div>
        </DocSection>

        <DocSection title="Shared Input Treatment">
          <p className="font-body text-sm text-neutral-subtle leading-relaxed mb-6 max-w-2xl">
            There's no shared <code className="font-mono text-xs bg-neutral-subtlest px-1.5 py-0.5">Input</code> component
            yet — every form builds its own fields from this same class recipe. Documented here so new forms
            stay consistent until it's extracted.
          </p>
          <div className="border border-border-light bg-white p-8 mb-6 max-w-sm flex flex-col gap-4">
            <div>
              <label className="block font-body font-semibold text-xs text-navy-bolder uppercase tracking-[0.06em] mb-1.5">
                Text input
              </label>
              <input
                type="text"
                placeholder="your@email.com"
                className="w-full font-body text-sm text-navy-bolder border border-[#94A3B8] px-3 py-2.5 outline-none focus:border-navy-bright focus:shadow-[0_0_0_3px_rgba(4,102,200,0.15)] bg-white placeholder:text-neutral-subtle transition"
              />
            </div>
            <div>
              <label className="block font-body font-semibold text-xs text-navy-bolder uppercase tracking-[0.06em] mb-1.5">
                Select
              </label>
              <select className="w-full font-body text-sm text-navy-bolder border border-[#94A3B8] px-3 py-2.5 outline-none focus:border-navy-bright focus:shadow-[0_0_0_3px_rgba(4,102,200,0.15)] bg-white transition">
                <option>Select…</option>
              </select>
            </div>
          </div>
          <CodeBlock code={`const inputCls = 'w-full font-body text-sm text-navy-bolder border border-[#94A3B8] px-3 py-2.5 outline-none focus:border-navy-bright focus:shadow-[0_0_0_3px_rgba(4,102,200,0.15)] bg-white placeholder:text-neutral-subtle transition'
const labelCls = 'block font-body font-semibold text-xs text-navy-bolder uppercase tracking-[0.06em] mb-1.5'`} />
        </DocSection>
      </div>
    </DesignSystemLayout>
  )
}
