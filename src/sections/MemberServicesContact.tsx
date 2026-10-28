import { useState } from 'react'
import Alert from '@/components/ui/Alert'
import { Field, SelectInput, TextArea, TextInput } from '@/components/ui/FormField'
import {
  memberSelfService,
  memberServices,
  memberTopics,
  prospectTopics,
} from '@/data/contact'
import { DetailBlock, EmailLink, PhoneLink } from '@/sections/ContactSections'

/**
 * Contact Member Services: a form of its own, in place of the live site's
 * deep links into the general contact page.
 *
 * The first question is whether the reader is already a member. It changes the
 * topic list, asks members for their member number, and tags the message, so
 * a prospective member's question (a lead for membership sales) and a member's
 * support request can go to different queues.
 */

type Status = '' | 'member' | 'prospect'

const statusOptions: { value: Exclude<Status, ''>; label: string }[] = [
  { value: 'member', label: 'Yes, I’m a member' },
  { value: 'prospect', label: 'Not yet, I’m thinking of joining' },
]

function MemberServicesForm() {
  const [sent, setSent] = useState(false)
  const [showErrors, setShowErrors] = useState(false)
  const [form, setForm] = useState({
    status: '' as Status,
    topic: '',
    memberNumber: '',
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const topics = form.status === 'prospect' ? prospectTopics : memberTopics
  const missing = [
    !form.status && 'Membership status',
    !form.topic && 'Topic',
    !form.name.trim() && 'Your name',
    !form.email.trim() && 'Your email',
    !form.message.trim() && 'Message',
  ].filter(Boolean) as string[]
  const err = (v: string) => (showErrors && !v.trim() ? 'Required.' : undefined)

  if (sent) {
    return (
      <Alert variant="success" title="Message sent">
        {form.status === 'prospect'
          ? `Thank you for your interest in the Naval Institute. A membership specialist will reply to ${form.email} within one business day.`
          : `Thank you. Member Services will reply to ${form.email} within one business day.`}
      </Alert>
    )
  }

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault()
        if (missing.length) { setShowErrors(true); return }
        setSent(true)
      }}
      className="flex flex-col gap-5"
    >
      {showErrors && missing.length > 0 && (
        <Alert variant="danger" title="Please complete the required fields">
          {missing.join(', ')}.
        </Alert>
      )}

      <fieldset className="flex flex-col gap-2">
        <legend className="font-body font-bold text-sm text-navy-bolder mb-2">
          Are you a current member?
          <span className="text-[#c1121f] ml-1" aria-hidden="true">*</span>
        </legend>
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-x-6 gap-y-2">
          {statusOptions.map((o) => (
            <label key={o.value} className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="radio"
                name="ms-status"
                value={o.value}
                checked={form.status === o.value}
                // The topic lists differ, so a change of status clears the topic
                onChange={() => setForm({ ...form, status: o.value, topic: '' })}
                className="w-4 h-4 accent-navy-bolder cursor-pointer flex-shrink-0"
              />
              <span className="font-body text-base text-navy-bolder">{o.label}</span>
            </label>
          ))}
        </div>
        {showErrors && !form.status && (
          <p role="alert" className="flex items-start gap-1.5 font-body text-sm text-[#c1121f]">
            <i className="fa-solid fa-circle-exclamation mt-0.5 flex-shrink-0" aria-hidden="true" />
            Required.
          </p>
        )}
      </fieldset>

      <div className="flex flex-col sm:flex-row gap-4">
        <Field label="How can we help?" htmlFor="ms-topic" required className="flex-1"
          error={showErrors && !form.topic ? 'Required.' : undefined}>
          <SelectInput id="ms-topic" value={form.topic} hasError={showErrors && !form.topic}
            disabled={!form.status}
            onChange={(e) => setForm({ ...form, topic: e.target.value })}>
            <option value="">{form.status ? '— Select —' : 'Answer the question above first'}</option>
            {form.status && topics.map((t) => <option key={t} value={t}>{t}</option>)}
          </SelectInput>
        </Field>
        {form.status === 'member' && (
          <Field label="Member number" htmlFor="ms-number" className="flex-1"
            help="On your membership card or magazine mailing label. Optional, but it speeds things up.">
            <TextInput id="ms-number" inputMode="numeric" value={form.memberNumber}
              onChange={(e) => setForm({ ...form, memberNumber: e.target.value })} />
          </Field>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Field label="Your name" htmlFor="ms-name" required error={err(form.name)} className="flex-1">
          <TextInput id="ms-name" autoComplete="name" value={form.name} hasError={!!err(form.name)}
            onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </Field>
        <Field label="Your email" htmlFor="ms-email" required error={err(form.email)} className="flex-1">
          <TextInput id="ms-email" type="email" autoComplete="email" value={form.email} hasError={!!err(form.email)}
            onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </Field>
      </div>

      <Field label="Phone" htmlFor="ms-phone" help="Optional. Leave a number if you’d rather we call.">
        <TextInput id="ms-phone" type="tel" autoComplete="tel" value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      </Field>

      <Field label="Message" htmlFor="ms-message" required error={err(form.message)}>
        <TextArea id="ms-message" rows={6} value={form.message} hasError={!!err(form.message)}
          onChange={(e) => setForm({ ...form, message: e.target.value })} />
      </Field>

      <button
        type="submit"
        className="inline-flex items-center justify-center self-start bg-navy-bolder text-white font-body font-bold text-base px-6 py-3.5 border border-navy-bolder hover:bg-navy-bright hover:border-navy-bright transition-colors"
      >
        Send to Member Services
      </button>
    </form>
  )
}

export default function MemberServicesContact() {
  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-8 lg:gap-12 items-start">
          <div className="flex flex-col gap-6">
            <h2 className="font-headline text-[30px] lg:text-[40px] text-navy-bolder leading-[1.15]">
              Send us a message
            </h2>
            <MemberServicesForm />
          </div>

          <aside aria-label="Other ways to reach Member Services" className="flex flex-col gap-6">
            <div className="border border-navy-subtle bg-white p-6 flex flex-col gap-5">
              <DetailBlock title="Call Member Services">
                <PhoneLink number={memberServices.tollFree} note="toll free" />
                <PhoneLink number={memberServices.local} note="local" />
                <span className="text-sm text-neutral-subtle">{memberServices.hours}</span>
              </DetailBlock>
              <DetailBlock title="Email">
                <EmailLink email={memberServices.email} />
              </DetailBlock>
            </div>

            <nav aria-labelledby="ms-quick-links" className="bg-tan-subtlest p-1.5">
              <div className="border border-tan-subtle p-6 flex flex-col gap-4">
                <h2 id="ms-quick-links" className="font-headline text-[22px] text-navy-bolder leading-tight">
                  Quick links
                </h2>
                <ul className="flex flex-col gap-2.5 font-body text-base">
                  {memberSelfService.map((l) => (
                    <li key={l.href}>
                      <a href={l.href} className="text-link">{l.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </aside>
        </div>
      </div>
    </section>
  )
}
