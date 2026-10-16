import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Field,
  Fieldset,
  TextInput,
  SelectInput,
  TextArea,
  CheckboxField,
  controlClasses,
} from '@/components/ui/FormField'
import Alert from '@/components/ui/Alert'
import { Button, ButtonLink } from '@/components/ui/Button'
import ContactCard from '@/components/ui/ContactCard'
import ExternalLinkIcon from '@/components/ui/ExternalLinkIcon'
import StepProgress from '@/components/ui/StepProgress'
import { services, militaryStatuses, suffixes, ranksForService } from '@/data/essaySubmission'
import {
  MEMOIR_STEPS,
  memoirIntro,
  warrantiesLead,
  warranties,
  warrantiesClose,
  LICENSE_AGREEMENT_HREF,
  engagements,
  MEMOIR_DOC_EXT,
  MEMOIR_IMAGE_EXT,
  MEMOIR_FILE_MAX_MB,
  memoirContact,
} from '@/data/memoirSubmission'

/**
 * Submit a Memoir — the four-step wizard from the live webform:
 * Introduction → Agreements → Memoir → Complete.
 *
 * The step lives in `?step=` so the browser's Back button walks back through
 * the wizard and each step can be linked to directly for review. Answers are
 * held here, above the steps, so going Previous never loses them. Submitting
 * the Memoir step re-checks the agreements and sends you back to them if they
 * were skipped by a direct link.
 */

type StepKey = 'introduction' | 'agreements' | 'memoir' | 'complete'
const STEP_KEYS: StepKey[] = ['introduction', 'agreements', 'memoir', 'complete']

interface MemoirAnswers {
  title: string
  author: string
  yourName: string
  yourEmail: string
  yourPhone: string
  fullName: string
  service: string
  militaryStatus: string
  rank: string
  suffix: string
  dateOfEvent: string
  engagements: string[]
  notes: string
}

const emptyAnswers: MemoirAnswers = {
  title: '',
  author: '',
  yourName: '',
  yourEmail: '',
  yourPhone: '',
  fullName: '',
  service: '',
  militaryStatus: '',
  rank: '',
  suffix: '',
  dateOfEvent: '',
  engagements: [],
  notes: '',
}

type Errors = Record<string, string>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function hasExt(file: File, exts: string[]) {
  const name = file.name.toLowerCase()
  return exts.some((ext) => name.endsWith(ext))
}

// ─── File field ───────────────────────────────────────────────────────────────

function FileField({
  id,
  label,
  required,
  help,
  exts,
  file,
  onChange,
  error,
}: {
  id: string
  label: string
  required?: boolean
  help: string
  exts: string[]
  file: File | null
  onChange: (file: File | null) => void
  error?: string
}) {
  return (
    <Field
      label={label}
      htmlFor={id}
      required={required}
      error={error}
      help={`${help} One file only. ${MEMOIR_FILE_MAX_MB} MB limit. Allowed types: ${exts.map((e) => e.slice(1)).join(', ')}.`}
    >
      <div className="flex flex-col gap-3">
        <input
          id={id}
          type="file"
          accept={exts.join(',')}
          aria-invalid={error ? true : undefined}
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
          className={controlClasses(
            !!error,
            'cursor-pointer file:mr-4 file:py-2 file:px-4 file:border-0 file:font-body file:font-bold file:text-sm file:bg-navy-bolder file:text-white file:cursor-pointer hover:file:bg-navy-bright',
          )}
        />
        {/* A file input can't be refilled after Previous, so the chosen file is
            listed here — that list, not the native input, is the source of truth */}
        {file && !error && (
          <p className="flex items-center gap-2 font-body text-sm text-[#0a5c2e]">
            <i className="fa-solid fa-paperclip" aria-hidden="true" />
            <span className="break-all">{file.name}</span>
            <span className="text-neutral-subtle">({(file.size / 1024 / 1024).toFixed(1)} MB)</span>
          </p>
        )}
      </div>
    </Field>
  )
}

// ─── Error summary ────────────────────────────────────────────────────────────

/** Field labels for the summary links, keyed like `errors`. */
const errorLabels: Record<string, string> = {
  title: 'Title',
  author: 'Author',
  yourName: 'Your Name',
  yourEmail: 'Your Email',
  fullName: 'Full Name',
  service: 'Service',
  militaryStatus: 'Military Status',
  rank: 'Rank/Title',
  engagements: 'Engagements',
  memoirFile: 'Memoir document',
  imageFile: 'Image',
  agreeWarranties: 'Representations and warranties',
  agreeLicense: 'Memoir License and Collection Agreement',
}

function ErrorSummary({ errors }: { errors: Errors }) {
  const keys = Object.keys(errors)
  if (keys.length === 0) return null
  return (
    <Alert
      variant="danger"
      title={`${keys.length} ${keys.length === 1 ? 'field needs' : 'fields need'} attention`}
      className="mb-8"
    >
      <ul className="flex flex-col gap-1 mt-1">
        {keys.map((key) => (
          <li key={key}>
            <a href={`#memoir-${key}`} className="underline hover:no-underline">
              {errorLabels[key] ?? key}
            </a>
            : {errors[key]}
          </li>
        ))}
      </ul>
    </Alert>
  )
}

// ─── Wizard ───────────────────────────────────────────────────────────────────

export default function MemoirSubmitForm() {
  const [searchParams, setSearchParams] = useSearchParams()
  const stepParam = searchParams.get('step') as StepKey | null
  const step: StepKey = stepParam && STEP_KEYS.includes(stepParam) ? stepParam : 'introduction'
  const stepIndex = STEP_KEYS.indexOf(step)

  const [agreeWarranties, setAgreeWarranties] = useState(false)
  const [agreeLicense, setAgreeLicense] = useState(false)
  const [answers, setAnswers] = useState<MemoirAnswers>(emptyAnswers)
  const [memoirFile, setMemoirFile] = useState<File | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [errors, setErrors] = useState<Errors>({})

  const topRef = useRef<HTMLDivElement>(null)
  const rankOptions = useMemo(() => ranksForService(answers.service), [answers.service])

  const set = (patch: Partial<MemoirAnswers>) => setAnswers((a) => ({ ...a, ...patch }))
  const err = (key: string) => errors[key]
  const id = (key: string) => `memoir-${key}`

  // Each step starts at the top of the tracker, not wherever the last one
  // ended — but not on first load, where the page title should stay in view
  const prevStep = useRef(step)
  useEffect(() => {
    if (prevStep.current === step) return
    prevStep.current = step
    topRef.current?.scrollIntoView({ block: 'start' })
  }, [step])

  function goTo(next: StepKey) {
    setErrors({})
    setSearchParams(next === 'introduction' ? {} : { step: next })
  }

  function agreementErrors(): Errors {
    const next: Errors = {}
    if (!agreeWarranties) next.agreeWarranties = 'Agree to the representations and warranties to continue.'
    if (!agreeLicense) next.agreeLicense = 'Agree to the Memoir License and Collection Agreement to continue.'
    return next
  }

  function handleAgreementsNext(e: FormEvent) {
    e.preventDefault()
    const next = agreementErrors()
    if (Object.keys(next).length > 0) {
      setErrors(next)
      topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }
    goTo('memoir')
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    // Reached the Memoir step by direct link — the agreements still apply
    const agreementsMissing = agreementErrors()
    if (Object.keys(agreementsMissing).length > 0) {
      setSearchParams({ step: 'agreements' })
      setErrors(agreementsMissing)
      return
    }

    const next: Errors = {}
    const req = (key: keyof MemoirAnswers, message: string) => {
      if (!String(answers[key]).trim()) next[key] = message
    }
    req('title', 'Enter the memoir’s title.')
    req('author', 'Enter the memoir author’s full name.')
    req('yourName', 'Enter your name.')
    req('yourEmail', 'Enter your email address.')
    if (answers.yourEmail.trim() && !EMAIL_RE.test(answers.yourEmail.trim())) {
      next.yourEmail = 'Enter a valid email address.'
    }
    req('fullName', 'Enter the full name of the person this memoir is about.')
    req('service', 'Choose a service.')
    req('militaryStatus', 'Choose a military status.')
    req('rank', 'Choose a rank or title.')
    if (answers.engagements.length === 0) next.engagements = 'Choose at least one engagement.'

    const maxBytes = MEMOIR_FILE_MAX_MB * 1024 * 1024
    if (!memoirFile) {
      next.memoirFile = 'Attach your memoir document.'
    } else if (!hasExt(memoirFile, MEMOIR_DOC_EXT)) {
      next.memoirFile = `Only ${MEMOIR_DOC_EXT.join(', ')} files are accepted.`
    } else if (memoirFile.size > maxBytes) {
      next.memoirFile = `That file is over the ${MEMOIR_FILE_MAX_MB} MB limit.`
    }
    if (imageFile && !hasExt(imageFile, MEMOIR_IMAGE_EXT)) {
      next.imageFile = `Only ${MEMOIR_IMAGE_EXT.join(', ')} files are accepted.`
    } else if (imageFile && imageFile.size > maxBytes) {
      next.imageFile = `That image is over the ${MEMOIR_FILE_MAX_MB} MB limit.`
    }

    setErrors(next)
    if (Object.keys(next).length > 0) {
      topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }
    goTo('complete')
  }

  function startOver() {
    setAgreeWarranties(false)
    setAgreeLicense(false)
    setAnswers(emptyAnswers)
    setMemoirFile(null)
    setImageFile(null)
    goTo('introduction')
  }

  function toggleEngagement(name: string, checked: boolean) {
    set({
      engagements: checked
        ? [...answers.engagements, name]
        : answers.engagements.filter((x) => x !== name),
    })
  }

  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="container-site">
        <div ref={topRef} className="max-w-[760px] mx-auto scroll-mt-6">
          <StepProgress steps={MEMOIR_STEPS} current={stepIndex} className="mb-12 lg:mb-14" />

          <ErrorSummary errors={errors} />

          {/* ── 1. Introduction ── */}
          {step === 'introduction' && (
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <h2 className="font-headline text-3xl lg:text-4xl text-navy-bolder leading-tight">
                  How it works
                </h2>
                <p className="font-body text-base lg:text-[17px] text-neutral-subtle leading-[1.75]">
                  {memoirIntro}
                </p>
              </div>
              <div className="flex justify-center border-t border-border-light pt-8">
                <Button variant="navy" onClick={() => goTo('agreements')}>
                  Start
                  <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                </Button>
              </div>
            </div>
          )}

          {/* ── 2. Agreements ── */}
          {step === 'agreements' && (
            <form onSubmit={handleAgreementsNext} noValidate className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <h2 className="font-headline text-3xl lg:text-4xl text-navy-bolder leading-tight">
                  Agree to terms
                </h2>
                <p className="font-body text-base text-neutral-subtle leading-[1.75]">{warrantiesLead}</p>
                <ol className="flex flex-col gap-2 pl-1">
                  {warranties.map((w, i) => (
                    <li key={w} className="flex gap-3 font-body text-base text-neutral-subtle leading-[1.6]">
                      <span className="flex-shrink-0 w-9 font-semibold text-navy-bolder">
                        ({['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii'][i]})
                      </span>
                      <span>{w}</span>
                    </li>
                  ))}
                </ol>
                <p className="font-body text-base text-neutral-subtle leading-[1.75]">{warrantiesClose}</p>
              </div>

              <div className="flex flex-col gap-6 bg-surface-subtle border-l-4 border-[#0466c8] px-5 py-5">
                <div id={id('agreeWarranties')}>
                  <CheckboxField
                    id="memoir-agree-warranties"
                    checked={agreeWarranties}
                    onChange={setAgreeWarranties}
                    required
                    error={err('agreeWarranties')}
                  >
                    I agree to the representations and warranties above.
                  </CheckboxField>
                </div>

                <div id={id('agreeLicense')} className="flex flex-col gap-3 border-t border-border-light pt-5">
                  <p className="font-body text-base text-neutral-subtle leading-relaxed">
                    Next, read the{' '}
                    <a
                      href={LICENSE_AGREEMENT_HREF}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link inline-flex items-center gap-1"
                    >
                      Memoir License and Collection Agreement
                      <ExternalLinkIcon />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                    . It opens in a new tab, so you can come back here when you’re done.
                  </p>
                  <CheckboxField
                    id="memoir-agree-license"
                    checked={agreeLicense}
                    onChange={setAgreeLicense}
                    required
                    error={err('agreeLicense')}
                  >
                    I have read and agree to the Memoir License and Collection Agreement.
                  </CheckboxField>
                </div>
              </div>

              <div className="flex justify-between gap-4 border-t border-border-light pt-8">
                <Button type="button" variant="outline-dark" onClick={() => goTo('introduction')}>
                  <i className="fa-solid fa-arrow-left" aria-hidden="true" />
                  Previous
                </Button>
                <Button type="submit" variant="navy">
                  Next
                  <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                </Button>
              </div>
            </form>
          )}

          {/* ── 3. Memoir ── */}
          {step === 'memoir' && (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-10">
              <p className="font-body font-bold text-base text-[#c1121f] -mb-4">* Required fields</p>

              <Fieldset legend="About the Memoir">
                <Field label="Title" htmlFor={id('title')} required error={err('title')}>
                  <TextInput
                    id={id('title')}
                    value={answers.title}
                    hasError={!!err('title')}
                    onChange={(e) => set({ title: e.target.value })}
                  />
                </Field>
                <Field
                  label="Author"
                  htmlFor={id('author')}
                  required
                  help="Full name of the memoir author."
                  error={err('author')}
                >
                  <TextInput
                    id={id('author')}
                    value={answers.author}
                    hasError={!!err('author')}
                    onChange={(e) => set({ author: e.target.value })}
                  />
                </Field>
                <Field label="Date of Event" htmlFor={id('dateOfEvent')} help="Approximate date of event.">
                  <TextInput
                    id={id('dateOfEvent')}
                    placeholder="e.g. Spring 1944"
                    value={answers.dateOfEvent}
                    onChange={(e) => set({ dateOfEvent: e.target.value })}
                  />
                </Field>
                <fieldset id={id('engagements')} className="flex flex-col gap-3">
                  <legend className="font-body font-semibold text-sm text-navy-bolder mb-1.5">
                    Engagements
                    <span className="text-[#c1121f] ml-1" aria-hidden="true">*</span>
                    <span className="sr-only"> (required)</span>
                  </legend>
                  <p className="font-body text-sm text-neutral-subtle -mt-1">Choose all that apply.</p>
                  <div
                    className={`grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 border px-4 py-4
                      ${err('engagements') ? 'border-[#c1121f] bg-[#fef6f6]' : 'border-[#94A3B8]'}`}
                  >
                    {engagements.map((name) => {
                      const boxId = `memoir-engagement-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
                      return (
                        <div key={name} className="flex items-start gap-3">
                          <input
                            id={boxId}
                            type="checkbox"
                            checked={answers.engagements.includes(name)}
                            onChange={(e) => toggleEngagement(name, e.target.checked)}
                            className="mt-0.5 w-5 h-5 flex-shrink-0 cursor-pointer accent-[#0466c8]"
                          />
                          <label htmlFor={boxId} className="font-body text-base text-navy-bolder cursor-pointer">
                            {name}
                          </label>
                        </div>
                      )
                    })}
                  </div>
                  {err('engagements') && (
                    <p role="alert" className="flex items-start gap-1.5 font-body text-sm text-[#c1121f]">
                      <i className="fa-solid fa-circle-exclamation mt-0.5 flex-shrink-0" aria-hidden="true" />
                      {err('engagements')}
                    </p>
                  )}
                </fieldset>
              </Fieldset>

              <Fieldset legend="Your Contact Information">
                <Field label="Your Name" htmlFor={id('yourName')} required error={err('yourName')}>
                  <TextInput
                    id={id('yourName')}
                    autoComplete="name"
                    value={answers.yourName}
                    hasError={!!err('yourName')}
                    onChange={(e) => set({ yourName: e.target.value })}
                  />
                </Field>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Your Email" htmlFor={id('yourEmail')} required error={err('yourEmail')}>
                    <TextInput
                      id={id('yourEmail')}
                      type="email"
                      autoComplete="email"
                      value={answers.yourEmail}
                      hasError={!!err('yourEmail')}
                      onChange={(e) => set({ yourEmail: e.target.value })}
                    />
                  </Field>
                  <Field label="Your Phone" htmlFor={id('yourPhone')}>
                    <TextInput
                      id={id('yourPhone')}
                      type="tel"
                      autoComplete="tel"
                      value={answers.yourPhone}
                      onChange={(e) => set({ yourPhone: e.target.value })}
                    />
                  </Field>
                </div>
              </Fieldset>

              <Fieldset legend="Who the Memoir Is About">
                <Field
                  label="Full Name"
                  htmlFor={id('fullName')}
                  required
                  help="Who is this memoir about?"
                  error={err('fullName')}
                >
                  <TextInput
                    id={id('fullName')}
                    value={answers.fullName}
                    hasError={!!err('fullName')}
                    onChange={(e) => set({ fullName: e.target.value })}
                  />
                </Field>
                <Field
                  label="Service"
                  htmlFor={id('service')}
                  required
                  error={err('service')}
                  help={
                    <ul className="list-disc pl-5 flex flex-col gap-1">
                      <li>
                        If you are a veteran, choose “Civilian” as your service — you will be able to identify
                        your service branch under Military Status.
                      </li>
                      <li>If you are active-duty, reserve, or retired, choose your branch of service.</li>
                    </ul>
                  }
                >
                  <SelectInput
                    id={id('service')}
                    value={answers.service}
                    hasError={!!err('service')}
                    // The rank list is keyed to the service, so a new service clears it
                    onChange={(e) => set({ service: e.target.value, rank: '' })}
                  >
                    <option value="">- Select -</option>
                    {services.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </SelectInput>
                </Field>
                <Field label="Military Status" htmlFor={id('militaryStatus')} required error={err('militaryStatus')}>
                  <SelectInput
                    id={id('militaryStatus')}
                    value={answers.militaryStatus}
                    hasError={!!err('militaryStatus')}
                    onChange={(e) => set({ militaryStatus: e.target.value })}
                  >
                    <option value="">- Select -</option>
                    {militaryStatuses.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </SelectInput>
                </Field>
                <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-5">
                  <Field
                    label="Rank/Title"
                    htmlFor={id('rank')}
                    required
                    error={err('rank')}
                    help={answers.service ? undefined : 'Choose a service first to see its ranks.'}
                  >
                    <SelectInput
                      id={id('rank')}
                      value={answers.rank}
                      hasError={!!err('rank')}
                      onChange={(e) => set({ rank: e.target.value })}
                    >
                      <option value="">- Select -</option>
                      {rankOptions.map((r) => (
                        <option key={r}>{r}</option>
                      ))}
                    </SelectInput>
                  </Field>
                  <Field label="Suffix" htmlFor={id('suffix')}>
                    <SelectInput
                      id={id('suffix')}
                      value={answers.suffix}
                      onChange={(e) => set({ suffix: e.target.value })}
                    >
                      <option value="">- Select -</option>
                      {suffixes.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </SelectInput>
                  </Field>
                </div>
                <div id={id('imageFile')}>
                  <FileField
                    id="memoir-image-input"
                    label="Image"
                    help="Add a headshot of the memoir subject."
                    exts={MEMOIR_IMAGE_EXT}
                    file={imageFile}
                    onChange={setImageFile}
                    error={err('imageFile')}
                  />
                </div>
              </Fieldset>

              <Fieldset legend="Memoir Document">
                <div id={id('memoirFile')}>
                  <FileField
                    id="memoir-doc-input"
                    label="Memoir"
                    required
                    help="Add your memoir document."
                    exts={MEMOIR_DOC_EXT}
                    file={memoirFile}
                    onChange={setMemoirFile}
                    error={err('memoirFile')}
                  />
                </div>
                <Field label="Additional Notes" htmlFor={id('notes')}>
                  <TextArea
                    id={id('notes')}
                    value={answers.notes}
                    onChange={(e) => set({ notes: e.target.value })}
                  />
                </Field>
              </Fieldset>

              <div className="flex justify-between gap-4 border-t border-border-light pt-8">
                <Button type="button" variant="outline-dark" onClick={() => goTo('agreements')}>
                  <i className="fa-solid fa-arrow-left" aria-hidden="true" />
                  Previous
                </Button>
                <Button type="submit" variant="primary">
                  Submit
                </Button>
              </div>
            </form>
          )}

          {/* ── 4. Complete ── */}
          {step === 'complete' && (
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <span className="w-14 h-14 bg-[#e6f7ed] flex items-center justify-center" aria-hidden="true">
                  <i className="fa-solid fa-check text-2xl text-[#0a5c2e]" />
                </span>
                <h2 className="font-headline text-3xl lg:text-4xl text-navy-bolder leading-tight">
                  Thank you for your submission.
                </h2>
                <p className="font-body text-base lg:text-lg text-neutral-subtle leading-relaxed">
                  Your memoir will go through an expedited editorial review within ninety days. Once it’s
                  approved, it becomes part of the U.S. Naval Institute Memoir Collection.
                </p>
              </div>

              {/* Only when the steps were actually walked — a direct link to
                  ?step=complete has nothing to summarise */}
              {answers.title && (
                <dl className="flex flex-col gap-3 border-t border-b border-border-light py-5">
                  {[
                    ['Memoir', answers.title],
                    ['About', [answers.rank, answers.fullName, answers.suffix].filter(Boolean).join(' ')],
                    ['Document', memoirFile?.name],
                    ['Confirmation sent to', answers.yourEmail],
                  ].map(([label, value]) =>
                    value ? (
                      <div key={label} className="flex flex-wrap justify-between gap-x-6 gap-y-1">
                        <dt className="font-body font-semibold text-sm text-navy-bolder">{label}</dt>
                        <dd className="font-body text-sm text-neutral-subtle text-right break-all">{value}</dd>
                      </div>
                    ) : null,
                  )}
                </dl>
              )}

              <ContactCard
                label="Questions about memoirs"
                name={memoirContact.name}
                role={memoirContact.role}
                note="For further information about memoirs at the U.S. Naval Institute, please contact:"
                inquiriesLabel="Contact"
                email={memoirContact.email}
                phone={memoirContact.phone}
              />

              <div className="flex flex-col sm:flex-row gap-3">
                <ButtonLink href="/archives/memoirs" variant="navy">
                  Browse the Memoir Collection
                </ButtonLink>
                <Button type="button" variant="outline-dark" onClick={startOver}>
                  Submit another memoir
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
