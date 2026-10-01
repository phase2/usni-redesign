import { useState } from 'react'
import { Link } from 'react-router-dom'
import DesignSystemLayout from '@/components/design-system/DesignSystemLayout'
import DocPageHeader from '@/components/design-system/DocPageHeader'
import DocSection from '@/components/design-system/DocSection'
import DocLabel from '@/components/design-system/DocLabel'
import CodeBlock from '@/components/design-system/CodeBlock'
import PropsTable from '@/components/design-system/PropsTable'
import LiveMarkup from '@/components/design-system/LiveMarkup'
import ClassTable from '@/components/design-system/ClassTable'
import SourceList from '@/components/design-system/SourceList'
import DevNote from '@/components/design-system/DevNote'
import { Button } from '@/components/ui/Button'
import BookSearchBar from '@/components/ui/BookSearchBar'
import CreditCardModal from '@/components/ui/CreditCardModal'
import { Field, TextInput, SelectInput, TextArea, CheckboxField, Fieldset } from '@/components/ui/FormField'
import { ServiceHelpTooltip, GradYearHelpTooltip } from '@/components/ui/FieldHelp'
import InfoTooltip from '@/components/ui/InfoTooltip'
import SentenceSelect, { SentenceText, SentenceFixed } from '@/components/ui/SentenceSelect'
import { ChoiceOption, addressLines } from '@/components/ui/SavedOnFile'
import { Toggle } from '@/components/ui/AccountCard'
import Alert from '@/components/ui/Alert'
import { services, militaryStatuses, usStates, countries, ESSAY_TITLE_MAX } from '@/data/essaySubmission'
import { ACCOUNT_ADDRESS, ACCOUNT_CARD } from '@/data/testAccount'

/* ─── Small helpers for the sheet ─────────────────────────────────────────── */

const noop = () => {}

function Code({ children }: { children: React.ReactNode }) {
  return <code className="font-mono text-xs bg-neutral-subtlest px-1.5 py-0.5 [overflow-wrap:anywhere]">{children}</code>
}

function Lede({ children }: { children: React.ReactNode }) {
  return <p className="font-body text-base text-neutral-subtle leading-relaxed max-w-[760px]">{children}</p>
}

function DsLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link to={to} className="text-link">
      {children}
    </Link>
  )
}

/* ─── Reproductions of controls that are not exported ────────────────────────
   These are private to the files they live in, so the sheet cannot import
   them. The JSX below copies their classes verbatim; the source path is listed
   under each one. */

/** From sections/DonateCartItems.tsx — the larger switch with glyphs in the knob. */
function DonateToggleCopy({ on, onToggle }: { on: boolean; onToggle: () => void }) {
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

/** From sections/BooksCartItems.tsx. */
function QtyStepperCopy() {
  const [qty, setQty] = useState(1)
  return (
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
  )
}

const ArrowIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/** From sections/DonateForm.tsx — one preset card and the custom-amount card. */
function AmountCardsCopy({ selected }: { selected: number | null }) {
  const [custom, setCustom] = useState('')
  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
      {[50, 100, 500, 1000].map(amount => (
        <div
          key={amount}
          className={`border p-5 flex flex-col gap-6 transition-colors
                ${selected === amount ? 'border-navy-bolder bg-surface-subtle' : 'border-border-light'}`}
        >
          <p className="font-headline text-4xl lg:text-5xl text-navy-subtle">${amount.toLocaleString()}</p>
          <button className="flex items-center justify-between w-full bg-navy-bolder text-white font-body font-bold text-sm px-4 py-3 hover:bg-navy-bright transition-colors">
            Select Amount
            <ArrowIcon />
          </button>
        </div>
      ))}
      <div
        className={`border p-5 flex flex-col gap-3 transition-colors col-span-2 lg:col-span-1
            ${selected === -1 ? 'border-navy-bolder bg-surface-subtle' : 'border-border-light'}`}
      >
        <div>
          <label className="font-body font-semibold text-sm text-navy-bolder block mb-1">Custom Amount</label>
          <div className="flex items-center border border-border-light bg-white px-3 py-2">
            <span className="font-body text-neutral-subtle mr-1">$</span>
            <input
              type="number"
              min="1"
              placeholder="___"
              value={custom}
              onChange={e => setCustom(e.target.value)}
              className="flex-1 font-body text-navy-bolder text-base outline-none w-full"
            />
          </div>
        </div>
        <button
          disabled={!custom}
          className="flex items-center justify-between w-full bg-navy-bolder text-white font-body font-bold text-sm px-4 py-3 hover:bg-navy-bright transition-colors mt-auto disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Select Amount
          <ArrowIcon />
        </button>
      </div>
    </div>
  )
}

/** From sections/EssaySubmitForm.tsx — the file input, in its idle state. */
function FileInputCopy({ hasError }: { hasError?: boolean }) {
  return (
    <input
      id={hasError ? 'ds-essay-file-err' : 'ds-essay-file'}
      type="file"
      accept=".docx"
      aria-invalid={hasError ? true : undefined}
      className={`w-full font-body text-base text-navy-bolder border px-3.5 py-3 bg-white
                      file:mr-4 file:py-2 file:px-4 file:border-0 file:font-body file:font-bold
                      file:text-sm file:bg-navy-bolder file:text-white file:cursor-pointer
                      hover:file:bg-navy-bright cursor-pointer outline-none
                      focus:border-navy-bright focus:shadow-[0_0_0_3px_rgba(4,102,200,0.15)]
                      ${hasError ? 'border-[#c1121f] bg-[#fef6f6]' : 'border-[#94A3B8]'}`}
    />
  )
}

/** From sections/DonateCartItems.tsx — the honor/memory radio group. */
function TributeRadiosCopy() {
  const [value, setValue] = useState<'honor' | 'memory'>('honor')
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="font-body font-bold text-[14px] text-[#1d2535] mb-1">This gift is</legend>
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        {([
          { value: 'honor', label: 'In honor of' },
          { value: 'memory', label: 'In memory of' },
        ] as const).map(option => (
          <label key={option.value} className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="radio"
              name="ds-tribute-type"
              value={option.value}
              checked={value === option.value}
              onChange={() => setValue(option.value)}
              className="w-4 h-4 accent-[#023e7d] cursor-pointer flex-shrink-0"
            />
            <span className="font-body text-[15px] text-[#1d2535]">{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

/* ─── Sheet ──────────────────────────────────────────────────────────────── */

export default function Forms() {
  const [creditCardOpen, setCreditCardOpen] = useState(false)
  const [last4, setLast4] = useState<string | null>(null)

  // Live state for the interactive examples
  const [service, setService] = useState('')
  const [title, setTitle] = useState('Distributed Maritime Operations Need a Logistics Spine')
  const [coAuthor, setCoAuthor] = useState(false)
  const [ack, setAck] = useState(false)
  const [shipChoice, setShipChoice] = useState<'file' | 'new'>('file')
  const [renew, setRenew] = useState(true)
  const [whereNeeded, setWhereNeeded] = useState(true)
  const [region, setRegion] = useState('us')
  const [term, setTerm] = useState('1')

  return (
    <DesignSystemLayout>
      <div className="max-w-container mx-auto px-6 lg:px-8 pt-12 pb-24">
        <DocPageHeader title="Forms & Inputs">
          <p>
            Every form on the site — checkout, the account profile, the essay submission, contact — is built from
            one set of field primitives in <Code>src/components/ui/FormField.tsx</Code>: a labelled field wrapper,
            text / select / textarea controls, a checkbox, and a titled fieldset. This sheet documents those as the
            spec, then the specialised controls (switches, amount cards, quantity stepper, sentence selects, search)
            and the validation pattern.
          </p>
          <p>
            Several pages still hand-build their own fields from older recipes. Each section lists those copies as
            drift: build the canonical version once as a Twig template and point every form at it.
          </p>
        </DocPageHeader>

        {/* ─── Text fields ─────────────────────────────────────────────── */}
        <DocSection title="Text field">
          <div className="flex flex-col gap-8">
            <Lede>
              A label above a full-width control, with optional guidance, a live hint, and an error message below.
              The label is sentence case, semibold, 14px. Required fields add a red asterisk that is hidden from
              screen readers and a visually hidden “(required)” that is not, so the requirement is announced as a
              word rather than “star”.
            </Lede>

            <LiveMarkup label="States — default, required, help, hint, error, disabled">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 max-w-[760px]">
                <Field label="Email address" htmlFor="ds-email" required>
                  <TextInput id="ds-email" type="email" placeholder="your@email.com" />
                </Field>
                <Field
                  label="Other email"
                  htmlFor="ds-other-email"
                  help="An alternate address we can reach you at if your primary bounces."
                >
                  <TextInput id="ds-other-email" type="email" />
                </Field>
                <Field
                  label="Essay title"
                  htmlFor="ds-title"
                  required
                  hint={`${Math.max(0, ESSAY_TITLE_MAX - title.length)} characters remaining`}
                >
                  <TextInput
                    id="ds-title"
                    maxLength={ESSAY_TITLE_MAX}
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                </Field>
                <Field label="Last name" htmlFor="ds-last" required error="Last name is required.">
                  <TextInput id="ds-last" hasError />
                </Field>
                <Field label="Rank / Title" htmlFor="ds-rank-disabled" help="Choose a service first.">
                  <SelectInput id="ds-rank-disabled" disabled className="opacity-50 cursor-not-allowed">
                    <option value="">- Select -</option>
                  </SelectInput>
                </Field>
                <Field label="Phone (optional)" htmlFor="ds-phone">
                  <TextInput id="ds-phone" type="tel" placeholder="(410) 268-6110" />
                </Field>
              </div>
            </LiveMarkup>

            <ClassTable
              rows={[
                { part: 'Field wrapper', classes: 'flex flex-col gap-1.5', note: 'Label, control, help and error stack with 6px between them. Width comes from the parent grid; pass a width class (`flex-1`, `sm:w-44`) through `className`.' },
                { part: 'Label row', classes: 'flex items-center', note: 'Holds the label and, optionally, an InfoTooltip. The tooltip is a sibling of the <label>, never inside it — a button inside a label steals the label’s click.' },
                { part: 'Label', classes: 'font-body font-semibold text-sm text-navy-bolder', note: 'Always a real <label for>. Sentence case.' },
                { part: 'Required asterisk', classes: 'text-[#c1121f] ml-1', note: 'aria-hidden. Followed by <span class="sr-only"> (required)</span>. #c1121f is the danger red from Alerts; no token.' },
                { part: 'Control (idle)', classes: 'w-full font-body text-base text-navy-bolder border px-3.5 py-3 outline-none bg-white placeholder:text-neutral-subtle transition focus:border-navy-bright focus:shadow-[0_0_0_3px_rgba(4,102,200,0.15)] border-[#94A3B8]', note: '16px text so iOS does not zoom on focus. Focus swaps the border to navy-bright and adds a 3px navy-bright ring at 15% — the outline is removed only because this ring replaces it. #94A3B8 is Tailwind’s default slate-400; no project token.' },
                { part: 'Control (error)', classes: 'border-[#c1121f] bg-[#fef6f6]', note: 'Replaces `border-[#94A3B8]`; also sets aria-invalid="true". #fef6f6 is the danger Alert’s tint.' },
                { part: 'Control (disabled)', classes: 'opacity-50 cursor-not-allowed', note: 'Not built into the primitive — callers pass it through `className` with `disabled` (EssaySubmitForm’s Rank select). Pair it with help text that says how to enable the field.' },
                { part: 'Help / hint row', classes: 'flex flex-wrap justify-between gap-x-4 gap-y-1', note: 'Help text on the left, a live hint (character count) on the right; wraps under the help on narrow widths.' },
                { part: 'Help text', classes: 'font-body text-sm text-neutral-subtle leading-relaxed flex-1 min-w-0', note: 'Can hold a list (the Service guidance).' },
                { part: 'Hint', classes: 'font-body text-sm text-neutral-subtle flex-shrink-0' },
                { part: 'Error message', classes: 'flex items-start gap-1.5 font-body text-sm text-[#c1121f]', note: 'role="alert", so it is announced when it appears. Leading icon `fa-solid fa-circle-exclamation mt-0.5 flex-shrink-0`, aria-hidden. Copy names the field: “Last name is required.”' },
              ]}
            />

            <DevNote>
              <p>
                Build one field template (e.g. <Code>form-element.html.twig</Code> / a <Code>field</Code> component)
                that takes <Code>{'{{ label }}'}</Code>, <Code>{'{{ id }}'}</Code>, <Code>{'{{ required }}'}</Code>,{' '}
                <Code>{'{{ description }}'}</Code> (help), <Code>{'{{ errors }}'}</Code> and the rendered control. Map
                Drupal’s <Code>#required</Code>, <Code>#description</Code> and form-error output to these slots so
                Form API elements pick up the styling without per-form work.
              </p>
              <p>
                Input types handled with the same classes: <Code>text</Code>, <Code>email</Code>,{' '}
                <Code>password</Code> (with <Code>autocomplete="new-password"</Code> /{' '}
                <Code>current-password</Code>), <Code>tel</Code>, and numeric text fields via{' '}
                <Code>inputmode="numeric"</Code> (ZIP, graduation year, word count — not <Code>type="number"</Code>,
                which adds spinners and mangles leading zeros).
              </p>
              <p>
                Accessibility: in production, give help and error elements ids and list them in the control’s{' '}
                <Code>aria-describedby</Code>. The prototype does not do this yet — the error is announced once via{' '}
                <Code>role="alert"</Code>, but returning to the field later does not re-read it.
              </p>
            </DevNote>

            <PropsTable
              rows={[
                { name: 'label', type: 'string', description: 'Visible label text.' },
                { name: 'htmlFor', type: 'string', description: 'Id of the control; required so the label is associated.' },
                { name: 'required', type: 'boolean', description: 'Adds the asterisk and the sr-only “(required)”. Does not set the control’s `required` attribute — forms validate themselves with `noValidate`.' },
                { name: 'help', type: 'ReactNode', description: 'Guidance under the control.' },
                { name: 'hint', type: 'string', description: 'Live counter or similar, right-aligned opposite `help`.' },
                { name: 'tooltip', type: 'ReactNode', description: 'An InfoTooltip placed beside the label.' },
                { name: 'error', type: 'string', description: 'Message; pair with `hasError` on the control.' },
                { name: 'TextInput / SelectInput / TextArea', type: 'native attrs + hasError', description: 'Controls; `hasError` swaps to the error classes and sets aria-invalid.' },
              ]}
            />

            <SourceList title="Canonical" items={[{ path: 'src/components/ui/FormField.tsx', note: 'Field, TextInput, SelectInput, TextArea, CheckboxField, Fieldset, controlClasses()' }]} />
          </div>
        </DocSection>

        {/* ─── Select ─────────────────────────────────────────────────── */}
        <DocSection title="Select">
          <div className="flex flex-col gap-8">
            <Lede>
              Native <Code>&lt;select&gt;</Code> with the same box as a text field. The chevron is not an element:
              it is a background image from the global <Code>select.select-field</Code> rule, which every select on
              the site uses — the field-sized one here, the oversized sentence select, and the filter dropdowns. The
              first option is an empty placeholder (“- Select -”).
            </Lede>

            <LiveMarkup label="Select — default, error, disabled">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[900px]">
                <Field label="Military status" htmlFor="ds-status" required>
                  <SelectInput id="ds-status" defaultValue="">
                    <option value="">- Select -</option>
                    {militaryStatuses.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </SelectInput>
                </Field>
                <Field label="State" htmlFor="ds-state" required error="State is required.">
                  <SelectInput id="ds-state" hasError defaultValue="">
                    <option value="">- Select -</option>
                    {usStates.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </SelectInput>
                </Field>
                <Field label="Rank / Title" htmlFor="ds-rank" help="Choose a service first.">
                  <SelectInput id="ds-rank" disabled className="opacity-50 cursor-not-allowed">
                    <option value="">- Select -</option>
                  </SelectInput>
                </Field>
              </div>
            </LiveMarkup>

            <DocLabel className="mb-0">The global rule (src/index.css)</DocLabel>
            <CodeBlock
              code={`select.select-field {
  appearance: none;
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' stroke='%231D2535' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 8l5 5 5-5'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1.05rem;
  padding-right: 3rem;
  cursor: pointer;
}

select.select-field:disabled {
  cursor: not-allowed;
}`}
            />

            <ClassTable
              rows={[
                { part: 'Select', classes: 'w-full font-body text-base text-navy-bolder border px-3.5 py-3 outline-none bg-white placeholder:text-neutral-subtle transition focus:border-navy-bright focus:shadow-[0_0_0_3px_rgba(4,102,200,0.15)] border-[#94A3B8] select-field', note: 'SelectInput is the text-field recipe plus `select-field`. Error and disabled states are the same as a text field.' },
                { part: 'Chevron', classes: 'select.select-field (background-image)', note: '#1D2535 (text-primary) stroke, 1rem from the right edge, 3rem of reserved right padding so long option labels never run under it. Element-qualified on purpose: it outranks Tailwind’s single-class `px-*` utilities, which would otherwise win padding-right and crowd the arrow.' },
              ]}
            />

            <DevNote>
              <p>
                Ship <Code>select.select-field</Code> in the theme’s base CSS and add the class to every Drupal{' '}
                <Code>select</Code> element (a <Code>preprocess_select</Code> or the field template). Do not add an
                overlay chevron icon — the site previously had three competing chevron treatments, and stacking one
                on top of this draws a second arrow.
              </p>
              <p>
                A select whose options depend on another field (Rank depends on Service) is disabled until the
                parent has a value, and its help text says so. Changing the parent clears the child. That needs a
                small Drupal behavior or <Code>#states</Code> plus an AJAX callback for the option list.
              </p>
            </DevNote>

            <SourceList title="Canonical" items={[{ path: 'src/components/ui/FormField.tsx', note: 'SelectInput' }, { path: 'src/index.css', note: 'select.select-field' }]} />
          </div>
        </DocSection>

        {/* ─── Textarea + file ─────────────────────────────────────────── */}
        <DocSection title="Textarea and file upload">
          <div className="flex flex-col gap-8">
            <Lede>
              A textarea is the text-field recipe with vertical resize and a 120px minimum. The file input reuses the
              same box and styles the browser’s own button as a navy solid button with <Code>file:</Code> variants,
              so it stays a native, keyboard-operable control.
            </Lede>

            <LiveMarkup label="Textarea">
              <div className="max-w-[640px]">
                <Field label="Message" htmlFor="ds-message" required>
                  <TextArea id="ds-message" rows={5} placeholder="How can we help?" />
                </Field>
              </div>
            </LiveMarkup>

            <LiveMarkup label="File input — idle and error (reproduced from EssaySubmitForm)">
              <div className="flex flex-col gap-6 max-w-[640px]">
                <Field label="Essay File" htmlFor="ds-essay-file" required help="One file only. 100 MB limit. Allowed type: .docx.">
                  <FileInputCopy />
                </Field>
                <Field label="Essay File" htmlFor="ds-essay-file-err" required error="Attach your essay as a .docx file.">
                  <FileInputCopy hasError />
                </Field>
              </div>
            </LiveMarkup>

            <ClassTable
              rows={[
                { part: 'Textarea', classes: 'w-full font-body text-base text-navy-bolder border px-3.5 py-3 outline-none bg-white placeholder:text-neutral-subtle transition focus:border-navy-bright focus:shadow-[0_0_0_3px_rgba(4,102,200,0.15)] border-[#94A3B8] resize-y min-h-[120px] leading-relaxed', note: 'Vertical resize only, so it never breaks the column.' },
                { part: 'File input', classes: 'w-full font-body text-base text-navy-bolder border px-3.5 py-3 bg-white file:mr-4 file:py-2 file:px-4 file:border-0 file:font-body file:font-bold file:text-sm file:bg-navy-bolder file:text-white file:cursor-pointer hover:file:bg-navy-bright cursor-pointer outline-none focus:border-navy-bright focus:shadow-[0_0_0_3px_rgba(4,102,200,0.15)] border-[#94A3B8]', note: 'Error swaps `border-[#94A3B8]` for `border-[#c1121f] bg-[#fef6f6]`. Chosen files are listed below the input in `font-body text-sm text-[#0a5c2e]` (success green) with a file icon and size.' },
              ]}
            />

            <DevNote>
              <p>
                For Drupal’s managed_file element, keep the native input visible and styled as above rather than
                replacing it with a custom drop zone. Allowed extensions and the size limit come from the field
                settings — print them in the help text (<Code>{'{{ description }}'}</Code>) exactly as the validator
                enforces them.
              </p>
            </DevNote>

            <SourceList title="Canonical" items={[{ path: 'src/components/ui/FormField.tsx', note: 'TextArea' }, { path: 'src/sections/EssaySubmitForm.tsx', note: 'file input (inline — the only one on the site)' }]} />
            <SourceList
              tone="drift"
              title="Hand-built copies"
              items={[
                { path: 'src/sections/DonateCartItems.tsx', note: 'gift-message textarea: `border-[#4e576a]`, `px-4`, text-[#4e576a], a 2px ring at 30% navy-subtle, `resize-none`.' },
              ]}
            />
          </div>
        </DocSection>

        {/* ─── Checkbox ───────────────────────────────────────────────── */}
        <DocSection title="Checkbox">
          <div className="flex flex-col gap-8">
            <Lede>
              A native checkbox tinted with <Code>accent-color</Code>, 20px square, top-aligned with a label that can
              run to several lines. A required checkbox (an acknowledgement) uses the same asterisk and error message
              as a field, with the error indented to line up with the label text.
            </Lede>

            <LiveMarkup label="Default, required with error, and inside the acknowledgement panel">
              <div className="flex flex-col gap-6 max-w-[640px]">
                <CheckboxField id="ds-co-author" checked={coAuthor} onChange={setCoAuthor}>
                  This essay has a co-author
                </CheckboxField>
                <CheckboxField id="ds-ack-err" checked={false} onChange={noop} required error="Please confirm you have read this.">
                  I understand the Naval Institute uses digital tools to screen submissions for plagiarism and
                  AI-generated writing.
                </CheckboxField>
                <div className="bg-surface-subtle border-l-4 border-[#0466c8] px-5 py-4">
                  <CheckboxField id="ds-ack" checked={ack} onChange={setAck} required>
                    I understand the Naval Institute uses digital tools to screen submissions for plagiarism and
                    AI-generated writing.
                  </CheckboxField>
                </div>
              </div>
            </LiveMarkup>

            <ClassTable
              rows={[
                { part: 'Wrapper', classes: 'flex flex-col gap-1.5' },
                { part: 'Row', classes: 'flex items-start gap-3', note: 'Top-aligned so a two-line label keeps the box beside its first line.' },
                { part: 'Input', classes: 'mt-0.5 w-5 h-5 flex-shrink-0 cursor-pointer accent-[#0466c8]', note: 'accent #0466c8 = navy-bright. `mt-0.5` optically centres the box on the first line of 16px text.' },
                { part: 'Input (error)', classes: 'outline outline-2 outline-[#c1121f]', note: 'Native checkboxes cannot take a border colour, so the error is a 2px outline. Also aria-invalid="true".' },
                { part: 'Label', classes: 'font-body text-base text-navy-bolder leading-relaxed cursor-pointer', note: 'Required adds `text-[#c1121f] ml-1` asterisk.' },
                { part: 'Error', classes: 'flex items-start gap-1.5 font-body text-sm text-[#c1121f] ml-8', note: '`ml-8` = 20px box + 12px gap, so the message aligns with the label.' },
                { part: 'Highlight panel (optional)', classes: 'bg-surface-subtle border-l-4 border-[#0466c8] px-5 py-4', note: 'Used for an acknowledgement the user must not skim past.' },
              ]}
            />

            <DevNote>
              <p>
                A checkbox that reveals more fields (co-author, “send a message”, tribute gift) toggles them in place
                directly below, indented or ruled to show they belong to it. Use Drupal <Code>#states</Code>{' '}
                (<Code>visible</Code>) so no custom JavaScript is needed, and don’t validate hidden fields.
              </p>
            </DevNote>

            <SourceList title="Canonical" items={[{ path: 'src/components/ui/FormField.tsx', note: 'CheckboxField' }]} />
            <SourceList
              tone="drift"
              title="Hand-built copies"
              items={[
                { path: 'src/sections/CartItems.tsx', note: 'auto-renew and gift checkboxes: `w-5 h-5 accent-[#023e7d]` (navy-subtle, not navy-bright), label wraps the input, bold 16px label, `items-center`.' },
                { path: 'src/sections/DonateCartItems.tsx', note: 'message / anonymous / tribute checkboxes: same as CartItems, regular-weight label.' },
                { path: 'src/sections/NavalHistoryCartItems.tsx', note: 'adds `mt-0.5`, otherwise as CartItems.' },
                { path: 'src/pages/MembershipCheckout.tsx', note: '`w-4 h-4 border border-[#4e576a] accent-[#023e7d]` — 16px box.' },
              ]}
            />
          </div>
        </DocSection>

        {/* ─── Radios ─────────────────────────────────────────────────── */}
        <DocSection title="Radio buttons">
          <div className="flex flex-col gap-8">
            <Lede>
              Two forms. An inline group for a short either/or inside a form, and a stacked <em>choice card</em>{' '}
              for signed-in checkout, where each option shows the saved data it would use and the selected one can
              reveal fields beneath it. Both are native radios in a shared <Code>name</Code>.
            </Lede>

            <LiveMarkup label="Inline group (reproduced from DonateCartItems)">
              <TributeRadiosCopy />
            </LiveMarkup>

            <ClassTable
              rows={[
                { part: 'Group', classes: 'flex flex-col gap-2', note: 'A real <fieldset>.' },
                { part: 'Legend', classes: 'font-body font-bold text-[14px] text-[#1d2535] mb-1', note: '#1d2535 = text-primary token.' },
                { part: 'Options row', classes: 'flex flex-wrap gap-x-6 gap-y-2' },
                { part: 'Option label', classes: 'flex items-center gap-2 cursor-pointer select-none', note: 'Wraps the input, so the whole label is the hit area.' },
                { part: 'Radio', classes: 'w-4 h-4 accent-[#023e7d] cursor-pointer flex-shrink-0', note: 'accent #023e7d = navy-subtle.' },
                { part: 'Option text', classes: 'font-body text-[15px] text-[#1d2535]' },
              ]}
            />

            <LiveMarkup label="Choice cards — signed-in checkout (SavedOnFile ChoiceOption)">
              <div className="flex flex-col gap-3 max-w-[640px]">
                <ChoiceOption
                  name="ds-ship"
                  value="file"
                  checked={shipChoice === 'file'}
                  onSelect={() => setShipChoice('file')}
                  title="Use the address on file"
                  detail={addressLines(ACCOUNT_ADDRESS)}
                />
                <ChoiceOption
                  name="ds-ship"
                  value="new"
                  checked={shipChoice === 'new'}
                  onSelect={() => setShipChoice('new')}
                  title="Ship to a different address"
                >
                  <Field label="Street address" htmlFor="ds-ship-street" required>
                    <TextInput id="ds-ship-street" placeholder="123 Main Street" />
                  </Field>
                </ChoiceOption>
              </div>
            </LiveMarkup>

            <ClassTable
              rows={[
                { part: 'Card', classes: 'border transition-colors border-[#c4c9d4] bg-white', note: 'Selected: `border-[#023e7d] bg-[#f8fafd]`. #c4c9d4 = neutral-subtler; #023e7d = navy-subtle; #f8fafd has no token.' },
                { part: 'Label (hit area)', classes: 'flex items-start gap-3 p-4 cursor-pointer', note: 'The whole top of the card selects the option.' },
                { part: 'Radio', classes: 'mt-0.5 w-4 h-4 flex-shrink-0 accent-[#023e7d] cursor-pointer' },
                { part: 'Title', classes: 'block font-body font-bold text-[15px] text-[#1d2535]' },
                { part: 'Detail', classes: 'block font-body text-[15px] text-[#4e576a] leading-[1.6] mt-1', note: '#4e576a = neutral-subtle. Address, or card brand + last four + expiry.' },
                { part: 'Revealed fields', classes: 'px-4 pb-5 pt-1 flex flex-col gap-4', note: 'Rendered only while selected, and outside the <label> so clicking an input inside does not re-trigger the radio.' },
              ]}
            />

            <DevNote>
              <p>
                Choice-card variables: <Code>{'{{ name }}'}</Code>, <Code>{'{{ value }}'}</Code>,{' '}
                <Code>{'{{ title }}'}</Code>, <Code>{'{{ detail }}'}</Code> (the formatted address, or e.g. “
                {ACCOUNT_CARD.brand} ending in {ACCOUNT_CARD.last4} · Expires {ACCOUNT_CARD.expires}”). The selected
                style and the revealed fields both key off <Code>:checked</Code>; a Drupal behavior (or{' '}
                <Code>#states</Code>) toggles the revealed block and a class on the card. The cards are also used in
                the checkout flows documented on <DsLink to="/design-system/commerce">Commerce</DsLink>.
              </p>
            </DevNote>

            <SourceList
              title="Canonical"
              items={[
                { path: 'src/components/ui/SavedOnFile.tsx', note: 'ChoiceOption (choice cards)' },
                { path: 'src/sections/DonateCartItems.tsx', note: 'inline group (fieldset + legend) — no shared component yet' },
              ]}
            />
            <SourceList
              tone="drift"
              title="Hand-built copies"
              items={[
                { path: 'src/pages/NewsletterJoin.tsx', note: 'Email Format radios: group label is a <p> (no fieldset/legend), `accent-navy-bolder`, 14px option text.' },
              ]}
            />
          </div>
        </DocSection>

        {/* ─── Toggle switch ──────────────────────────────────────────── */}
        <DocSection title="Toggle switch">
          <div className="flex flex-col gap-8">
            <Lede>
              An on/off setting that takes effect immediately — auto-renew, or a donation priority. Use a checkbox
              instead when the choice is only applied on submit.
            </Lede>

            <LiveMarkup label="Canonical — AccountCard Toggle (off and on)">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <Toggle on={renew} label="Auto-renew membership" onChange={() => setRenew(r => !r)} />
                  <span className="font-body text-[15px] text-navy-bolder">Auto-renew membership</span>
                </div>
                <div className="flex items-center gap-3">
                  <Toggle on={false} label="Paperless statements" onChange={noop} />
                  <span className="font-body text-[15px] text-navy-bolder">Paperless statements</span>
                </div>
              </div>
            </LiveMarkup>

            <ClassTable
              rows={[
                { part: 'Button', classes: 'flex-shrink-0 w-11 h-6', note: 'role="switch", aria-checked, and aria-label carrying the setting’s name.' },
                { part: 'Track wrapper', classes: 'relative block w-11 h-6' },
                { part: 'Track', classes: 'absolute inset-0 rounded-full transition-colors bg-[#c4c9d4]', note: 'On: `bg-[#023e7d]` (navy-subtle). Off: neutral-subtler. Rounded on purpose — the one place the squared-corner rule gives way.' },
                { part: 'Knob', classes: 'absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all left-1', note: 'On: `left-6`. Placed with `left` rather than a transform; with no offset it fell back to its static position, outside the track.' },
              ]}
            />

            <LiveMarkup label="Drift — donation priority switch (reproduced from DonateCartItems)">
              <div className="flex items-center gap-3">
                <DonateToggleCopy on={whereNeeded} onToggle={() => setWhereNeeded(v => !v)} />
                <span className="font-body font-bold text-[15px] text-[#1d2535]">Use my Gift where it is Most Needed</span>
              </div>
            </LiveMarkup>

            <DevNote>
              <p>
                Markup: <Code>{'<button type="button" role="switch" aria-checked="{{ on }}" aria-label="{{ label }}">'}</Code>.
                A Drupal behavior flips <Code>aria-checked</Code> and the on/off classes and saves the setting. If
                the visible text label sits next to the switch, point <Code>aria-labelledby</Code> at it instead of
                repeating the text in <Code>aria-label</Code>.
              </p>
              <p>
                Pick one size. The donate cart’s larger 52×28 switch with ✓/✕ glyphs in the knob reads better at a
                glance; if design prefers it, adopt it as the single switch — but keep the canonical one’s
                accessible name, which the donate copy lacks.
              </p>
            </DevNote>

            <SourceList title="Canonical" items={[{ path: 'src/components/ui/AccountCard.tsx', note: 'Toggle' }]} />
            <SourceList
              tone="drift"
              title="Hand-built copies"
              items={[
                { path: 'src/sections/DonateCartItems.tsx', note: 'private Toggle: 52×28 track, 22px knob moved with translate-x, ✓/✕ icons, focus ring. No accessible name — the adjacent text is a plain <span>.' },
                { path: 'src/pages/MembershipCheckout.tsx', note: 'auto-renew rows: the whole row is a button with aria-pressed (not role="switch"); on-colour `bg-[#1d2535]`; knob moved with translate-x.' },
              ]}
            />
          </div>
        </DocSection>

        {/* ─── InfoTooltip / FieldHelp ─────────────────────────────────── */}
        <DocSection title="Field help: InfoTooltip and FieldHelp">
          <div className="flex flex-col gap-8">
            <Lede>
              A small ⓘ button beside a label that opens a dark panel of guidance. Click to toggle, not hover — the
              forms are used on phones, and the Service guidance is two sentences, too long for a hover tooltip.
              Outside click and Escape close it. <Code>FieldHelp</Code> holds the two recurring messages (Service and
              Graduation year) so their wording is defined once.
            </Lede>

            <LiveMarkup label="In a field’s tooltip slot — click the ⓘ to open">
              <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_minmax(0,9rem)] gap-4 max-w-[640px] pb-24">
                <Field label="Service" htmlFor="ds-service" required tooltip={<ServiceHelpTooltip />}>
                  <SelectInput id="ds-service" value={service} onChange={e => setService(e.target.value)}>
                    <option value="">- Select -</option>
                    {services.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </SelectInput>
                </Field>
                <Field label="Graduation year" htmlFor="ds-grad" tooltip={<GradYearHelpTooltip align="right" />}>
                  <TextInput id="ds-grad" inputMode="numeric" placeholder="YYYY" />
                </Field>
              </div>
            </LiveMarkup>

            <ClassTable
              rows={[
                { part: 'Wrapper', classes: 'relative inline-flex align-middle ml-1.5', note: 'Positioning context for the panel.' },
                { part: 'Button (closed)', classes: 'flex items-center justify-center w-[18px] h-[18px] rounded-full border text-[11px] font-body font-bold transition-colors bg-white border-[#94A3B8] text-navy-subtle hover:border-navy-bright hover:text-navy-bright', note: 'aria-label names the field (“About the Service field”); aria-expanded; aria-controls only while open. The “i” glyph is aria-hidden.' },
                { part: 'Button (open)', classes: 'bg-navy-bolder border-navy-bolder text-white' },
                { part: 'Panel', classes: 'absolute top-[calc(100%+8px)] z-40 w-[min(320px,calc(100vw-3rem))] bg-navy-boldest border border-navy-bold shadow-xl px-4 py-3.5 font-body font-normal text-[14px] text-white leading-relaxed', note: 'Hangs 8px below the button from its left edge (`left-0`) or, with align="right", its right edge (`right-0`) — use right for a field near the right of a row so the panel stays on screen. Width caps at 320px and never exceeds the viewport minus the gutters. role="status".' },
                { part: 'Panel list (FieldHelp)', classes: 'flex flex-col gap-2 list-disc pl-4' },
              ]}
            />

            <DevNote>
              <p>
                The panel only exists while open, so the snippet above shows the closed state. Open markup is the
                panel row in the table, as a <Code>&lt;span id="…" role="status"&gt;</Code> after the button. A
                Drupal behavior toggles it, sets <Code>aria-expanded</Code>, and closes on Escape and outside click.
              </p>
              <p>
                The text belongs to the field definition (<Code>{'{{ help_tooltip }}'}</Code>), not the template. The
                Service rule must read identically on the profile and every checkout: “If you are a veteran, choose
                Civilian… If you are active-duty, reserve, or retired, choose your branch of service.” The lightweight
                overlay rules (z-index, dismissal) are covered on{' '}
                <DsLink to="/design-system/overlays">Modals &amp; Overlays</DsLink>.
              </p>
            </DevNote>

            <SourceList
              title="Canonical"
              items={[
                { path: 'src/components/ui/InfoTooltip.tsx' },
                { path: 'src/components/ui/FieldHelp.tsx', note: 'ServiceHelpTooltip, GradYearHelpTooltip' },
              ]}
            />
            <SourceList
              tone="drift"
              title="Same guidance, restated"
              items={[
                { path: 'src/sections/EssaySubmitForm.tsx', note: 'puts the Service guidance in the field’s help text (always visible) with its own wording, rather than ServiceHelpTooltip.' },
              ]}
            />
          </div>
        </DocSection>

        {/* ─── Layout ─────────────────────────────────────────────────── */}
        <DocSection title="Form layout: fieldsets, grid, button row">
          <div className="flex flex-col gap-8">
            <Lede>
              Long forms are split into titled fieldsets. Inside one, fields stack with 20px between them; short
              related fields share a row from <Code>sm</Code> up and stack below it. The form column is capped at
              760px. The submit row sits under a rule, with the primary action on the right.
            </Lede>

            <LiveMarkup label="Fieldset with a name row, an address row and the button row" defaultOpen={false}>
              <form noValidate onSubmit={e => e.preventDefault()} className="flex flex-col gap-10 max-w-[760px]">
                <Fieldset legend="Author Information" description="We’ll use this to contact you about your entry.">
                  <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_90px_minmax(0,1fr)] gap-4">
                    <Field label="First Name" htmlFor="ds-l-first" required>
                      <TextInput id="ds-l-first" autoComplete="given-name" />
                    </Field>
                    <Field label="M.I." htmlFor="ds-l-mi">
                      <TextInput id="ds-l-mi" maxLength={1} />
                    </Field>
                    <Field label="Last Name" htmlFor="ds-l-last" required>
                      <TextInput id="ds-l-last" autoComplete="family-name" />
                    </Field>
                  </div>
                  <Field label="Country" htmlFor="ds-l-country" required>
                    <SelectInput id="ds-l-country" defaultValue="United States">
                      {countries.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </SelectInput>
                  </Field>
                  <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,2fr)_minmax(0,2fr)_minmax(0,1fr)] gap-4">
                    <Field label="City" htmlFor="ds-l-city" required>
                      <TextInput id="ds-l-city" autoComplete="address-level2" />
                    </Field>
                    <Field label="State" htmlFor="ds-l-state" required>
                      <SelectInput id="ds-l-state" defaultValue="">
                        <option value="">- Select -</option>
                        {usStates.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </SelectInput>
                    </Field>
                    <Field label="Zip code" htmlFor="ds-l-zip" required>
                      <TextInput id="ds-l-zip" autoComplete="postal-code" inputMode="numeric" />
                    </Field>
                  </div>
                </Fieldset>
                <div className="flex justify-end border-t border-border-light pt-8">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 bg-gold text-navy-bolder font-body font-bold text-base px-8 py-4 border border-gold hover:bg-gold-dark transition-colors"
                  >
                    <i className="fa-solid fa-pen-nib" aria-hidden="true" />
                    Submit Essay
                  </button>
                </div>
              </form>
            </LiveMarkup>

            <ClassTable
              rows={[
                { part: 'Form', classes: 'flex flex-col gap-10', note: '40px between fieldsets. `noValidate` — the form validates itself (see below). Column: `max-w-[760px] mx-auto` inside `.container-site`.' },
                { part: 'Fieldset', classes: 'flex flex-col gap-5', note: '20px between fields.' },
                { part: 'Legend', classes: 'w-full mb-6', note: 'A legend is taken out of flex flow, so `gap` never applies under it — the margin does that job.' },
                { part: 'Legend title', classes: 'block font-headline text-2xl lg:text-[28px] text-navy-bolder leading-tight border-b border-navy-subtle pb-4 w-full', note: '24px → 28px at lg, ruled in navy-subtle.' },
                { part: 'Legend description', classes: 'block font-body text-sm text-neutral-subtle leading-relaxed mt-3' },
                { part: 'Name row', classes: 'grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_90px_minmax(0,1fr)] gap-4', note: 'First / M.I. / Last. `minmax(0,…)` stops long values pushing columns wider.' },
                { part: 'City / State / ZIP row', classes: 'grid grid-cols-1 sm:grid-cols-[minmax(0,2fr)_minmax(0,2fr)_minmax(0,1fr)] gap-4', note: 'The checkouts do the same with `flex flex-col sm:flex-row gap-4` and fixed `sm:w-44` / `sm:w-36` widths on State and ZIP — either is fine; pick one.' },
                { part: 'Button row (page form)', classes: 'flex justify-end border-t border-border-light pt-8', note: 'Primary (gold) action on the right.' },
                { part: 'Button row (modal form)', classes: 'flex flex-wrap gap-3 pt-1', note: 'AddressModal: Save (navy) then Cancel (outline), left-aligned. Confirm dialogs: `flex flex-col-reverse sm:flex-row sm:justify-end gap-3` so the safe choice is first on mobile.' },
              ]}
            />

            <DevNote>
              <p>
                Fieldsets map to Drupal <Code>#type =&gt; 'fieldset'</Code> with <Code>#title</Code> (legend) and{' '}
                <Code>#description</Code>. Row groupings (name, city/state/ZIP) are a <Code>container</Code> with the
                grid classes as attributes. Keep fields in DOM order matching the visual order so tabbing reads
                left-to-right, then down.
              </p>
            </DevNote>

            <SourceList
              title="Canonical"
              items={[
                { path: 'src/components/ui/FormField.tsx', note: 'Fieldset' },
                { path: 'src/sections/EssaySubmitForm.tsx', note: 'grids and the button row' },
                { path: 'src/components/ui/AddressModal.tsx', note: 'modal button row' },
              ]}
            />
          </div>
        </DocSection>

        {/* ─── Validation ─────────────────────────────────────────────── */}
        <DocSection title="Validation and the error summary">
          <div className="flex flex-col gap-8">
            <Lede>
              Forms validate on submit, not as you type (the exception is a limit the user can break mid-entry, like
              an essay over its word count). A failed submit does three things: shows a danger{' '}
              <DsLink to="/design-system/alerts">Alert</DsLink> above the form that says how many fields need
              attention or names them; puts each failing field in its error state with a message; and scrolls the
              summary into view.
            </Lede>

            <LiveMarkup label="Error summary + a field in error">
              <div className="flex flex-col gap-6 max-w-[760px]">
                <Alert variant="danger" title="Please complete the required fields" className="scroll-mt-28">
                  The following items are required: Email address, Rank/Title.
                </Alert>
                <Field label="Email address" htmlFor="ds-v-email" required error="Email address is required.">
                  <TextInput id="ds-v-email" type="email" hasError placeholder="your@email.com" />
                </Field>
                <Field label="Email address" htmlFor="ds-v-email2" required error="Enter a valid email address.">
                  <TextInput id="ds-v-email2" type="email" hasError defaultValue="member@example" />
                </Field>
              </div>
            </LiveMarkup>

            <ClassTable
              rows={[
                { part: 'Summary', classes: 'scroll-mt-28 (on the danger Alert)', note: 'The Alert’s own classes are on the Alerts sheet. role="alert" comes from the danger variant, so it is announced. `scroll-mt-28` (112px) keeps it clear of the sticky header when scrolled to. Only mounted when there are errors — an empty wrapper still takes up the column gap.' },
                { part: 'Summary copy', classes: '(content)', note: 'Checkout: “The following items are required: {{ list }}.” Essay form: “{{ n }} fields need attention” + “Scroll down to the highlighted fields to fix them, then submit again.”' },
                { part: 'Field messages', classes: 'flex items-start gap-1.5 font-body text-sm text-[#c1121f]', note: '“{{ Label }} is required.” for empty fields; a specific instruction for malformed ones (“Enter a valid email address.”).' },
              ]}
            />

            <DevNote>
              <p>
                Drupal’s inline form errors module gives the per-field messages; render its summary through the danger
                Alert template rather than the default status-messages box. After a failed submit, move focus to the
                summary (give it <Code>tabindex="-1"</Code>) as well as scrolling — the prototype only scrolls
                (<Code>scrollIntoView</Code>, smooth), which leaves keyboard focus on the submit button.
              </p>
              <p>
                Ideally, each name in the summary links to its field (<Code>{'<a href="#{{ id }}">'}</Code>). The
                prototype lists names as plain text.
              </p>
            </DevNote>

            <SourceList
              title="Canonical"
              items={[
                { path: 'src/pages/BooksCheckout.tsx', note: 'named-fields summary' },
                { path: 'src/sections/EssaySubmitForm.tsx', note: 'counted summary, field-level messages' },
                { path: 'src/components/ui/Alert.tsx' },
              ]}
            />
            <SourceList
              tone="drift"
              title="Copies"
              items={[
                { path: 'src/pages/DonateCheckout.tsx', note: 'RequiredFieldsAlert wrapper; fields show only a red border (`border-red-600`) — no message, no aria-describedby.' },
                { path: 'src/pages/MembershipCheckout.tsx', note: 'same as DonateCheckout.' },
              ]}
            />
          </div>
        </DocSection>

        {/* ─── Donation amount cards ──────────────────────────────────── */}
        <DocSection title="Donation amount cards">
          <div className="flex flex-col gap-8">
            <Lede>
              The first step of Donate: four preset amounts and a custom amount, each as a card with its own
              “Select Amount” button. Choosing a preset goes straight to the cart — there is no separate selected
              state and continue button. The custom card enables its button once a value is entered.
            </Lede>

            <LiveMarkup label="Amount grid (reproduced from DonateForm) — $100 shown selected" defaultOpen={false}>
              <AmountCardsCopy selected={100} />
            </LiveMarkup>

            <ClassTable
              rows={[
                { part: 'Grid', classes: 'grid grid-cols-2 lg:grid-cols-5 gap-4', note: 'Two columns on mobile (custom card spans both), five in a row from lg.' },
                { part: 'Card', classes: 'border p-5 flex flex-col gap-6 transition-colors border-border-light', note: 'Selected: `border-navy-bolder bg-surface-subtle`. In practice a preset navigates on click, so only the custom card shows it (while typing).' },
                { part: 'Amount', classes: 'font-headline text-4xl lg:text-5xl text-navy-subtle', note: '36px → 48px at lg.' },
                { part: 'Select button', classes: 'flex items-center justify-between w-full bg-navy-bolder text-white font-body font-bold text-sm px-4 py-3 hover:bg-navy-bright transition-colors', note: 'Arrow icon on the right. Custom card adds `mt-auto disabled:opacity-50 disabled:cursor-not-allowed`.' },
                { part: 'Custom card', classes: 'border p-5 flex flex-col gap-3 transition-colors col-span-2 lg:col-span-1' },
                { part: 'Custom label', classes: 'font-body font-semibold text-sm text-navy-bolder block mb-1' },
                { part: 'Currency box', classes: 'flex items-center border border-border-light bg-white px-3 py-2', note: '“$” prefix in `font-body text-neutral-subtle mr-1`. Lighter border than the form fields (border-light, not #94A3B8).' },
                { part: 'Custom input', classes: 'flex-1 font-body text-navy-bolder text-base outline-none w-full', note: 'type="number" min="1". No focus style — the outline is removed and nothing replaces it.' },
              ]}
            />

            <DevNote>
              <p>
                Each preset is effectively a link: <Code>{'{{ cart_url }}?amount={{ amount }}&frequency=one-time'}</Code>{' '}
                (plus <Code>&amp;priority={'{{ id }}'}</Code> when arriving from a giving opportunity). Render them as
                buttons in a GET form or as links, so they work without JavaScript. Amounts are content —{' '}
                <Code>{'{{ amounts }}'}</Code> from the donation form config, not hard-coded.
              </p>
              <p>
                Fix in production: associate the “Custom Amount” label with its input (<Code>for</Code>/
                <Code>id</Code>), and give the input a visible focus style (the currency box can take{' '}
                <Code>focus-within:</Code> the field ring).
              </p>
            </DevNote>

            <SourceList title="Canonical (only instance)" items={[{ path: 'src/sections/DonateForm.tsx' }]} />
          </div>
        </DocSection>

        {/* ─── Quantity stepper ───────────────────────────────────────── */}
        <DocSection title="Quantity stepper">
          <div className="flex flex-col gap-8">
            <Lede>
              Minus / count / plus for a cart line. The minimum is 1 — removing a line is a separate “Remove” action
              beside it, never a quantity of zero.
            </Lede>

            <LiveMarkup label="Stepper (reproduced from BooksCartItems)">
              <div className="flex items-center gap-6">
                <QtyStepperCopy />
              </div>
            </LiveMarkup>

            <ClassTable
              rows={[
                { part: 'Group', classes: 'flex items-center border border-[#c4c9d4]', note: '#c4c9d4 = neutral-subtler.' },
                { part: 'Buttons', classes: 'w-10 h-10 flex items-center justify-center text-[#1d2535] hover:bg-[#f0f4f8] transition-colors font-body text-lg font-bold', note: '40px squares. aria-label “Decrease quantity” / “Increase quantity”. #f0f4f8 hover has no token.' },
                { part: 'Count', classes: 'w-10 h-10 flex items-center justify-center font-body font-bold text-[16px] text-[#1d2535] border-x border-[#c4c9d4]' },
              ]}
            />

            <DevNote>
              <p>
                In Drupal Commerce this is the order item quantity widget. Keep a real{' '}
                <Code>&lt;input type="number" min="1"&gt;</Code> (or <Code>inputmode="numeric"</Code>) in the middle
                so the count can be typed and is submitted with the cart form; the buttons are progressive
                enhancement via a behavior. If the count stays a static element, mark it{' '}
                <Code>aria-live="polite"</Code> so the new value is announced — the prototype’s span is silent.
              </p>
            </DevNote>

            <SourceList title="Canonical (only instance)" items={[{ path: 'src/sections/BooksCartItems.tsx' }]} />
          </div>
        </DocSection>

        {/* ─── Sentence select ────────────────────────────────────────── */}
        <DocSection title="Sentence select">
          <div className="flex flex-col gap-8">
            <Lede>
              An oversized select set inside a sentence — “I live <em>in the U.S.</em> and want to buy a{' '}
              <em>1-year</em> subscription.” Used where the choice is the page’s main decision (membership, Naval
              History subscription). <Code>SentenceText</Code> is the connecting copy;{' '}
              <Code>SentenceFixed</Code> stands in for a choice an earlier step already fixed.
            </Lede>

            <LiveMarkup label="Two selects in a sentence, and a fixed choice">
              <div className="flex flex-col gap-8">
                <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-4">
                  <SentenceText>I live</SentenceText>
                  <SentenceSelect
                    aria-label="Where you live"
                    value={region}
                    onChange={setRegion}
                    options={[
                      { value: 'us', label: 'in the U.S.' },
                      { value: 'international', label: 'outside the U.S.' },
                    ]}
                  />
                  <SentenceText>and want to buy a</SentenceText>
                  <SentenceSelect
                    aria-label="Subscription term"
                    value={term}
                    onChange={setTerm}
                    options={[
                      { value: '1', label: '1-year' },
                      { value: '3', label: '3-year' },
                    ]}
                  />
                  <SentenceText>subscription.</SentenceText>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-4">
                  <SentenceText>I live</SentenceText>
                  <SentenceFixed>in the U.S.</SentenceFixed>
                  <SentenceText>and want to add a</SentenceText>
                  <SentenceFixed>1-year</SentenceFixed>
                  <SentenceText>subscription.</SentenceText>
                </div>
              </div>
            </LiveMarkup>

            <ClassTable
              rows={[
                { part: 'Sentence row', classes: 'flex flex-wrap items-center justify-center gap-x-3 gap-y-4', note: 'Wraps to multiple lines on mobile; each select stays whole.' },
                { part: 'Select', classes: 'select-field bg-white border border-navy-subtle text-navy-bolder font-headline text-[28px] lg:text-[36px] leading-[1.2] pl-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0466c8]', note: 'DM Serif, 28px → 36px at lg. Chevron and right padding from `select.select-field`. Focus is a 2px navy-bright ring (not the field shadow ring).' },
                { part: 'Wrapper', classes: 'inline-block' },
                { part: 'Connecting text', classes: 'font-headline text-[28px] lg:text-[36px] text-neutral-subtle leading-[1.2]', note: 'Grey, so the choices read as the emphasis.' },
                { part: 'Fixed choice', classes: 'font-headline text-[28px] lg:text-[36px] text-navy-bolder leading-[1.2] border border-navy-subtle px-4 py-3', note: 'Same box as the select, no chevron.' },
              ]}
            />

            <DevNote>
              <p>
                Each select needs an <Code>aria-label</Code> (“Where you live”, “Subscription term”) because the
                sentence around it is not a label. Option labels are written to complete the sentence (“in the
                U.S.”), so they are content: <Code>{'{{ options }}'}</Code> from the product configuration. Changing a
                select updates the price shown below without a page load — a Drupal behavior, or AJAX on the product
                variation form.
              </p>
            </DevNote>

            <SourceList title="Canonical" items={[{ path: 'src/components/ui/SentenceSelect.tsx', note: 'used by src/pages/NavalHistorySubscribe.tsx' }]} />
            <SourceList
              tone="drift"
              title="Copies"
              items={[
                { path: 'src/sections/MembershipCustomizer.tsx', note: 'local copy with identical classes; no aria-label passed.' },
                { path: 'src/pages/MembershipMagazineUpsell.tsx', note: 'inline <select> with identical classes inside `relative inline-block`; no aria-label.' },
              ]}
            />
          </div>
        </DocSection>

        {/* ─── Book Search Bar (existing) ─────────────────────────────── */}
        <DocSection title="Book Search Bar">
          <div className="flex flex-col gap-8">
            <Lede>
              An autocomplete search input used on Books &amp; Press pages. Type at least 2 characters (try
              “war” or “the”) to see matching titles and authors, with the query highlighted in the results, and a
              final “See all results” row.
            </Lede>

            <LiveMarkup label="Book search — idle state">
              <div className="max-w-xl min-h-[420px]">
                <BookSearchBar />
              </div>
            </LiveMarkup>

            <ClassTable
              rows={[
                { part: 'Wrapper', classes: 'relative', note: 'Positioning context for the listbox.' },
                { part: 'Field box', classes: 'flex items-center border-2 bg-white px-4 py-3.5 transition-colors border-[#94A3B8] focus-within:border-[#023E7D]', note: '2px border (heavier than form fields — this is a primary control). While results show: `border-[#023E7D]` (navy-subtle).' },
                { part: 'Search icon', classes: 'fa-solid fa-magnifying-glass text-[#0466C8] mr-3 text-lg flex-shrink-0', note: 'aria-hidden.' },
                { part: 'Input', classes: 'flex-1 font-body text-base text-navy-bolder placeholder:text-neutral-subtle outline-none bg-transparent', note: 'aria-label="Search books", aria-autocomplete="list", aria-expanded while results show. Escape closes the list.' },
                { part: 'Clear button', classes: 'ml-2 text-neutral-subtle hover:text-navy-bolder transition-colors flex-shrink-0', note: 'Only when there is a query. aria-label="Clear search", icon `fa-solid fa-xmark text-sm`.' },
                { part: 'Results list', classes: 'absolute left-0 right-0 bg-white border-2 border-t-0 border-[#023E7D] shadow-lg z-50', note: 'role="listbox"; joins the field box seamlessly (no top border).' },
                { part: 'Result link', classes: 'flex items-start gap-3 px-4 py-3 hover:bg-surface-subtle transition-colors', note: 'Title `font-body text-base text-navy-bolder leading-snug`, author `font-body text-base text-neutral-subtle mt-0.5`.' },
                { part: 'Match highlight', classes: 'bg-[#0466C8]/15 text-[#0466C8] font-semibold', note: 'A <mark> around the matched substring.' },
                { part: '“See all” row', classes: 'flex items-center gap-2 px-4 py-3 font-body font-semibold text-base text-[#0466C8] hover:bg-surface-subtle transition-colors', note: 'In an `li` with `border-t border-border-light`. Links to /books/collection?q=…' },
              ]}
            />

            <DevNote>
              <p>
                The results list is only rendered while open, so the snippet shows the idle field; the table gives the
                list’s classes. In Drupal, back this with a Search API autocomplete endpoint and wrap the input in a{' '}
                <Code>&lt;form action="/books/collection" method="get"&gt;</Code> so Enter submits a full search without
                JavaScript.
              </p>
              <p>
                For a complete combobox, add arrow-key movement through options with{' '}
                <Code>aria-activedescendant</Code>; the prototype only supports mouse / Tab. The site-wide header
                search uses a near-identical treatment — see{' '}
                <DsLink to="/design-system/overlays">Modals &amp; Overlays</DsLink>.
              </p>
            </DevNote>

            <SourceList title="Canonical" items={[{ path: 'src/components/ui/BookSearchBar.tsx' }]} />
            <SourceList
              tone="drift"
              title="Copies"
              items={[
                { path: 'src/components/layout/Header.tsx', note: 'SearchFlydown: border-2 `border-[#023e7d]` always, attached navy Search button, 17px input, results grouped with type badges.' },
              ]}
            />
            <CodeBlock code={`import BookSearchBar from '@/components/ui/BookSearchBar'

<BookSearchBar />`} />
          </div>
        </DocSection>

        {/* ─── Credit Card Modal (existing) ───────────────────────────── */}
        <DocSection title="Credit Card Modal">
          <div className="flex flex-col gap-8">
            <Lede>
              A focused payment form used in checkout flows (Books, Membership, Donate, Naval History) and on the
              account’s Payment methods page — segmented card number fields with auto-advance, expiry selects, and a
              security code. Submit stays disabled until every field is complete, then calls{' '}
              <Code>onSuccess(last4, details)</Code>. The modal shell (backdrop, close, Escape, scroll lock) is
              documented on <DsLink to="/design-system/overlays">Modals &amp; Overlays</DsLink>.
            </Lede>

            <LiveMarkup
              label="Open it live — the snippet is the open modal"
              defaultOpen={false}
              markupFor={<CreditCardModal open onClose={noop} onSuccess={noop} />}
            >
              <div className="flex items-center gap-4">
                <Button variant="primary" onClick={() => setCreditCardOpen(true)}>Open Credit Card Modal</Button>
                {last4 && (
                  <p className="font-body text-sm text-neutral-subtle">
                    Submitted — card ending in <span className="font-bold text-navy-bolder">{last4}</span>
                  </p>
                )}
              </div>
            </LiveMarkup>
            <CreditCardModal
              open={creditCardOpen}
              onClose={() => setCreditCardOpen(false)}
              onSuccess={value => { setLast4(value); setCreditCardOpen(false) }}
            />

            <ClassTable
              rows={[
                { part: 'Form', classes: 'px-8 pt-8 pb-8 flex flex-col gap-6', note: 'noValidate; the submit is disabled until valid instead of showing errors.' },
                { part: 'Group label', classes: 'font-body font-bold text-[14px] text-[#1d2535]', note: 'A <span> with an id, referenced by the group’s aria-labelledby — the card number is four inputs, so the label names a group. Asterisk `text-red-500`.' },
                { part: 'Card number row', classes: 'flex items-center gap-2', note: 'role="group". Four inputs separated by “–” spans (`font-body text-[18px] text-[#4e576a] select-none leading-none flex-shrink-0`).' },
                { part: 'Card number input', classes: 'w-full min-w-0 border border-[#4e576a] bg-white px-2 py-3 font-body text-[16px] text-[#1d2535] text-center placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#023e7d]/30 focus:border-[#023e7d] rounded-none min-h-[44px] tracking-widest', note: 'inputmode="numeric", maxlength 4, aria-label “Card number, group N of 4”. Focus advances to the next group after four digits.' },
                { part: 'Expiry selects', classes: 'select-field w-full bg-white border border-[#4e576a] px-3 py-3 font-body text-[16px] text-[#4e576a] focus:outline-none focus:ring-2 focus:ring-[#023e7d]/30 focus:border-[#023e7d] min-h-[44px] rounded-none', note: 'Month and Year, each with an aria-label, inside a role="group" labelled “Exp. Date”.' },
                { part: 'Card code', classes: 'w-full border border-[#4e576a] bg-white px-4 py-3 font-body text-[16px] text-[#1d2535] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#023e7d]/30 focus:border-[#023e7d] rounded-none min-h-[44px]', note: 'Real <label for>. 3–4 digits.' },
                { part: 'Submit', classes: 'inline-flex items-center justify-center gap-2 font-body font-bold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed bg-gold text-navy-bolder hover:bg-gold-dark border border-gold px-6 py-4 text-base tracking-[-0.5px] w-full', note: 'Button primary / lg / fullWidth; disabled until valid. `submitVariant="navy"` on the account pages, where gold reads as secondary.' },
              ]}
            />

            <DevNote>
              <p>
                In production the card fields are almost certainly the payment gateway’s hosted fields (iframes), not
                inputs the site renders — card data should not touch Drupal. Match their styling to this spec through
                the gateway’s style options, and keep the modal shell, title (<Code>{'{{ title }}'}</Code>: “Pay with
                Credit Card” / “Add a card”) and submit label (<Code>{'{{ submit_label }}'}</Code>) as site templates.
              </p>
              <p>
                The inputs use an older recipe than the form primitives (#4e576a border, 2px ring) — part of the
                drift listed under Shared Input Treatment.
              </p>
            </DevNote>

            <PropsTable
              rows={[
                { name: 'open', type: 'boolean', description: 'Controls visibility. Renders null when false.' },
                { name: 'onClose', type: '() => void', description: 'Called on Escape, backdrop click, or the close button.' },
                { name: 'onSuccess', type: '(last4: string, details: CardDetails) => void', description: 'Called once valid. `details` carries brand, last4, and expires.' },
                { name: 'title', type: 'string', default: "'Pay with Credit Card'", description: 'Heading; the account pages say “Add a card”.' },
                { name: 'submitLabel', type: 'string', default: "'Submit'", description: 'Submit button text.' },
                { name: 'submitVariant', type: 'ButtonVariant', default: "'primary'", description: 'Gold at checkout, navy on account pages.' },
              ]}
            />
            <SourceList title="Canonical" items={[{ path: 'src/components/ui/CreditCardModal.tsx' }]} />
            <CodeBlock code={`import CreditCardModal from '@/components/ui/CreditCardModal'

const [open, setOpen] = useState(false)

<CreditCardModal
  open={open}
  onClose={() => setOpen(false)}
  onSuccess={(last4) => { /* charge card, close modal */ }}
/>`} />
          </div>
        </DocSection>

        {/* ─── Shared Input Treatment (existing, now legacy) ─────────── */}
        <DocSection title="Shared Input Treatment (legacy recipe) and drift">
          <div className="flex flex-col gap-8">
            <Lede>
              Before <Code>FormField.tsx</Code> existed, every form built its fields from the class recipe below — 14px
              text, a 10px vertical pad, and small uppercase labels. FormField kept its focus ring and border colour
              but moved to 16px text and sentence-case labels. The recipe is still used as-is on the newsletter
              sign-up page; do not build new forms from it.
            </Lede>

            <LiveMarkup label="Legacy recipe (still on /newsletter)">
              <div className="max-w-sm flex flex-col gap-4">
                <div>
                  <label htmlFor="ds-legacy-email" className="block font-body font-semibold text-xs text-navy-bolder uppercase tracking-[0.06em] mb-1.5">
                    Text input
                  </label>
                  <input
                    id="ds-legacy-email"
                    type="text"
                    placeholder="your@email.com"
                    className="w-full font-body text-sm text-navy-bolder border border-[#94A3B8] px-3 py-2.5 outline-none focus:border-navy-bright focus:shadow-[0_0_0_3px_rgba(4,102,200,0.15)] bg-white placeholder:text-neutral-subtle transition"
                  />
                </div>
                <div>
                  <label htmlFor="ds-legacy-select" className="block font-body font-semibold text-xs text-navy-bolder uppercase tracking-[0.06em] mb-1.5">
                    Select
                  </label>
                  <select id="ds-legacy-select" className="select-field w-full font-body text-sm text-navy-bolder border border-[#94A3B8] px-3 py-2.5 outline-none focus:border-navy-bright focus:shadow-[0_0_0_3px_rgba(4,102,200,0.15)] bg-white transition">
                    <option>Select…</option>
                  </select>
                </div>
              </div>
            </LiveMarkup>

            <CodeBlock code={`const inputCls = 'w-full font-body text-sm text-navy-bolder border border-[#94A3B8] px-3 py-2.5 outline-none focus:border-navy-bright focus:shadow-[0_0_0_3px_rgba(4,102,200,0.15)] bg-white placeholder:text-neutral-subtle transition'
const labelCls = 'block font-body font-semibold text-xs text-navy-bolder uppercase tracking-[0.06em] mb-1.5'`} />

            <DevNote title="About the footer newsletter">
              <p>
                The footer has no newsletter field. Its “Get the Latest News” card is a gold “Join The List” link to
                Mailchimp’s hosted form (opening in a new tab), so there is no input to style there. The on-site{' '}
                <Code>/newsletter</Code> page is the full form, and it uses this legacy recipe — move it to the field
                primitives when it is built.
              </p>
            </DevNote>

            <SourceList title="Build from" items={[{ path: 'src/components/ui/FormField.tsx', note: 'the canonical field — see Text field above' }]} />
            <SourceList
              tone="drift"
              title="Hand-built fields still in the prototype"
              items={[
                { path: 'src/pages/NewsletterJoin.tsx', note: 'legacy recipe (inputCls / labelCls / errorCls); error colours already match FormField.' },
                { path: 'src/pages/DonateCheckout.tsx', note: 'local FormInput / InlineSelect / LabelledSelect: bold 14px labels in #1d2535, `border-[#4e576a]`, `px-4`, 16px text in #4e576a, 2px `focus:ring-[#023e7d]/30`, `min-h-[44px]`; error is `border-red-600` only (boolean, no message); asterisk `text-red-500` with no sr-only text.' },
                { path: 'src/pages/MembershipCheckout.tsx', note: 'local FormInput / FormSelect — same as DonateCheckout.' },
                { path: 'src/sections/CartItems.tsx', note: 'local TextInput / SelectInput for the gift recipient: bold 16px label with no htmlFor (the label is not associated with its input), placeholder in #4e576a, `border-red-500` error, plain red message.' },
                { path: 'src/components/ui/CreditCardModal.tsx', note: 'card fields and InlineSelect — same older recipe as DonateCheckout.' },
                { path: 'src/sections/DonateCartItems.tsx', note: 'tribute name input and message textarea — older recipe.' },
                { path: 'src/pages/Login.tsx', note: '`border-[#c4c9d4]`, 14px text, `focus:ring-2 focus:ring-[#0466c8] focus:border-transparent`.' },
                { path: 'src/sections/DonateForm.tsx', note: 'custom amount input — see Donation amount cards.' },
              ]}
            />
          </div>
        </DocSection>
      </div>
    </DesignSystemLayout>
  )
}
