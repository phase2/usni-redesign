import { useEffect, useState, type ReactNode } from 'react'
import Alert from '@/components/ui/Alert'
import { Button, ButtonLink } from '@/components/ui/Button'
import CardCta from '@/components/ui/CardCta'
import ExternalLinkIcon from '@/components/ui/ExternalLinkIcon'
import { Field, SelectInput, TextArea, TextInput } from '@/components/ui/FormField'
import {
  contactRoutes,
  contactTypes,
  generalContact,
  mediaContact,
  routedContactTypes,
  telHref,
  visiting,
  type ContactPerson,
} from '@/data/contact'

/**
 * The contact hub and the pieces the department contact pages share.
 *
 * The hub replaces a single long page that stacked every department's
 * directory. It now leads with the general form and the Institute's own
 * numbers beside it, then directions on a navy band, then cards that send the
 * reader to the department pages (each in its own section) on a tan band. The
 * department pages reuse the detail blocks and person cards below.
 */

/* ── Shared pieces ───────────────────────────────────────────────────────── */

type SectionTone = 'white' | 'navy' | 'tan'

// Text on the navy band is solid white, never a tint of it
const toneClasses: Record<SectionTone, { band: string; heading: string; lede: string }> = {
  white: { band: 'bg-white', heading: 'text-navy-bolder', lede: 'text-neutral-bold' },
  navy: { band: 'bg-navy-bolder', heading: 'text-white', lede: 'text-white' },
  tan: { band: 'bg-tan-subtlest', heading: 'text-navy-bolder', lede: 'text-neutral-bold' },
}

export function ContactSection({
  id,
  title,
  lede,
  tone = 'white',
  children,
}: {
  id: string
  title: string
  lede?: ReactNode
  tone?: SectionTone
  children: ReactNode
}) {
  const t = toneClasses[tone]
  return (
    <section
      id={id}
      /* scroll-mt clears the collapsed sticky header */
      className={`py-14 lg:py-20 scroll-mt-[100px] ${t.band}`}
      aria-labelledby={`${id}-heading`}
    >
      <div className="container-site">
        <div>
          <h2
            id={`${id}-heading`}
            className={`font-headline text-[30px] lg:text-[40px] leading-[1.15] ${t.heading}`}
          >
            {title}
          </h2>
          {lede && (
            <p className={`font-body text-base lg:text-lg leading-relaxed mt-3 max-w-[760px] ${t.lede}`}>
              {lede}
            </p>
          )}
        </div>
        <div className="mt-8 lg:mt-10">{children}</div>
      </div>
    </section>
  )
}

/** Eyebrow label over a block of contact details. */
export function DetailBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="font-body font-bold text-xs uppercase tracking-[0.08em] text-neutral-subtle">
        {title}
      </p>
      <div className="font-body text-base text-navy-bolder leading-[1.6] flex flex-col items-start">
        {children}
      </div>
    </div>
  )
}

export function PhoneLink({ number, note }: { number: string; note?: string }) {
  return (
    <span>
      <a href={telHref(number)} className="text-link">{number}</a>
      {note && <span className="text-sm text-neutral-subtle"> {note}</span>}
    </span>
  )
}

export function EmailLink({ email }: { email: string }) {
  return <a href={`mailto:${email}`} className="text-link break-all">{email}</a>
}

export function PersonCard({ person }: { person: ContactPerson }) {
  return (
    <li className="border border-navy-subtle bg-white p-5 flex flex-col gap-1">
      <h4 className="font-headline text-[20px] text-navy-bolder leading-tight">
        {person.profileHref ? (
          <a href={person.profileHref} className="article-link hover:text-navy-subtle">
            {person.name}
          </a>
        ) : (
          person.name
        )}
      </h4>
      <p className="font-body text-sm text-neutral-subtle leading-snug">{person.role}</p>
      {(person.phone || person.email) && (
        <div className="flex flex-col items-start gap-0.5 mt-2 font-body text-sm">
          {person.phone && <a href={telHref(person.phone)} className="text-link">{person.phone}</a>}
          {person.email && <EmailLink email={person.email} />}
        </div>
      )}
    </li>
  )
}

export function PeopleGrid({ people }: { people: ContactPerson[] }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
      {people.map((p) => <PersonCard key={p.name + p.role} person={p} />)}
    </ul>
  )
}

/* ── Hub: general message form ───────────────────────────────────────────── */

const allTypes = [...contactTypes, ...routedContactTypes]

function GeneralContactForm() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', type: '', subject: '', message: '' })
  const [showErrors, setShowErrors] = useState(false)

  const missing = [
    !form.name.trim() && 'Your name',
    !form.email.trim() && 'Your email',
    !form.type && 'Contact type',
    !form.message.trim() && 'Message',
  ].filter(Boolean) as string[]

  const err = (v: string) => (showErrors && !v.trim() ? 'Required.' : undefined)
  const routed = allTypes.find((t) => t.label === form.type)?.routeTo

  if (sent) {
    return (
      <Alert variant="success" title="Message sent">
        Thank you. We&rsquo;ll reply to {form.email} within two business days.
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
      <div className="flex flex-col sm:flex-row gap-4">
        <Field label="Your name" htmlFor="ct-name" required error={err(form.name)} className="flex-1">
          <TextInput id="ct-name" autoComplete="name" value={form.name} hasError={!!err(form.name)}
            onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </Field>
        <Field label="Your email" htmlFor="ct-email" required error={err(form.email)} className="flex-1">
          <TextInput id="ct-email" type="email" autoComplete="email" value={form.email} hasError={!!err(form.email)}
            onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </Field>
      </div>

      <Field label="Contact type" htmlFor="ct-type" required error={showErrors && !form.type ? 'Required.' : undefined}>
        <SelectInput id="ct-type" value={form.type} hasError={showErrors && !form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}>
          <option value="">— Select —</option>
          {contactTypes.map((t) => <option key={t.label} value={t.label}>{t.label}</option>)}
          <optgroup label="Handled by another team">
            {routedContactTypes.map((t) => <option key={t.label} value={t.label}>{t.label}</option>)}
          </optgroup>
        </SelectInput>
      </Field>

      {/* A routed type doesn't block the message; it offers the faster path */}
      {routed && (
        <Alert variant="info" title={`This usually goes to ${routed.team}`}>
          You&rsquo;ll get a faster answer from{' '}
          <a href={routed.href} className="text-link">{routed.team}</a>
          {' '}directly. You can still send your message here and we&rsquo;ll pass it along.
        </Alert>
      )}

      <Field label="Subject" htmlFor="ct-subject">
        <TextInput id="ct-subject" value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })} />
      </Field>
      <Field label="Message" htmlFor="ct-message" required error={err(form.message)}>
        <TextArea id="ct-message" rows={6} value={form.message} hasError={!!err(form.message)}
          onChange={(e) => setForm({ ...form, message: e.target.value })} />
      </Field>
      <button
        type="submit"
        className="inline-flex items-center justify-center self-start bg-navy-bolder text-white font-body font-bold text-base px-6 py-3.5 border border-navy-bolder hover:bg-navy-bright hover:border-navy-bright transition-colors"
      >
        Send message
      </button>
    </form>
  )
}

export function ContactMessage() {
  return (
    <ContactSection
      id="message"
      title="Send us a message"
      lede="For orders, book returns, website trouble, or a question you’re not sure where to send."
    >
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-10 lg:gap-16 items-start">
        {/* The form sits on the page itself rather than in a card */}
        <GeneralContactForm />

        {/* The Institute's own details in one tinted panel, with media
            inquiries (the live /media-inquiries) under a rule at its foot */}
        <aside aria-label="Other ways to reach us" className="bg-surface-subtle p-6 lg:p-7 flex flex-col gap-6">
          <DetailBlock title="Telephone">
            <PhoneLink number={generalContact.tollFree} note="toll free" />
            <PhoneLink number={generalContact.local} note="local" />
            <span className="text-sm text-neutral-subtle">{generalContact.hours}</span>
          </DetailBlock>
          <DetailBlock title="Email">
            <EmailLink email={generalContact.customerEmail} />
          </DetailBlock>
          <DetailBlock title="Mailing address">
            <address className="not-italic">
              {generalContact.address.map((l) => <span key={l} className="block">{l}</span>)}
            </address>
          </DetailBlock>

          <div id="media" className="border-t border-border-light pt-6 flex flex-col gap-3 scroll-mt-[100px]">
            <h3 className="font-headline text-[22px] text-navy-bolder leading-tight">Media inquiries</h3>
            <p className="font-body text-[15px] text-neutral-bold leading-[1.6]">{mediaContact.blurb}</p>
            <DetailBlock title={mediaContact.team}>
              <EmailLink email={mediaContact.email} />
              <PhoneLink number={mediaContact.phone} />
            </DetailBlock>
          </div>
        </aside>
      </div>
    </ContactSection>
  )
}

/* ── Visiting ────────────────────────────────────────────────────────────── */

const destination = encodeURIComponent(visiting.gps)
/** Google's keyless embed, centered on the Institute. */
const mapEmbed = `https://www.google.com/maps?q=${encodeURIComponent(`U.S. Naval Institute, ${visiting.gps}`)}&z=15&output=embed`
const mapLinks = {
  apple: { label: 'Apple Maps', href: `https://maps.apple.com/?daddr=${destination}` },
  google: { label: 'Google Maps', href: `https://www.google.com/maps/dir/?api=1&destination=${destination}` },
}

/**
 * Which map app to open. A browser can't report the reader's preferred maps
 * app, so this goes by platform: Apple devices open Apple Maps (the link hands
 * off to the app on iPhone, iPad, and Mac) and everything else opens Google
 * Maps. iPadOS identifies itself as a Mac, which this treats the same way.
 */
function usePreferredMaps() {
  const [apple, setApple] = useState(false)
  useEffect(() => {
    setApple(/iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent))
  }, [])
  return { primary: apple ? mapLinks.apple : mapLinks.google }
}

function CopyAddress() {
  const [copied, setCopied] = useState<boolean | null>(null)

  useEffect(() => {
    if (copied === null) return
    const t = setTimeout(() => setCopied(null), 2500)
    return () => clearTimeout(t)
  }, [copied])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(visiting.gps)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <>
      <Button type="button" variant="outline" size="md" onClick={copy}>
        <i className={`fa-regular ${copied ? 'fa-circle-check' : 'fa-copy'}`} aria-hidden="true" />
        {copied ? 'Address copied' : 'Copy address'}
      </Button>
      <span className="sr-only" aria-live="polite">
        {copied === true && 'Address copied to the clipboard.'}
        {copied === false && `Couldn’t copy. The address is ${visiting.gps}.`}
      </span>
    </>
  )
}

export function ContactVisiting() {
  const maps = usePreferredMaps()

  return (
    <ContactSection id="visiting" title="Visiting us" lede={visiting.intro} tone="navy">
      <div className="flex flex-col gap-10 lg:gap-12">
        {/* The alert and the address on the left, the map beside them */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        <div className="flex flex-col gap-10">
          <Alert variant="warning" title="Before you travel">
            {visiting.securityNote.split(visiting.academyPhone)[0]}
            <a href={telHref(visiting.academyPhone)} className="text-link">{visiting.academyPhone}</a>
            {visiting.securityNote.split(visiting.academyPhone)[1]}{' '}
            <a href={visiting.securityHref} target="_blank" rel="noopener noreferrer" className="text-link inline-flex items-center gap-1">
              Naval Academy security information
              <ExternalLinkIcon />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </Alert>

        {/* The address, with the two things a visitor does with it */}
        <div className="flex flex-col gap-4">
          <p className="font-body font-bold text-xs uppercase tracking-[0.08em] text-[#C2DDFF]">
            Beach Hall, for GPS navigation
          </p>
          <p className="font-headline text-[26px] lg:text-[32px] text-white leading-tight">{visiting.gps}</p>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <ButtonLink href={maps.primary.href} variant="primary" size="md" target="_blank" rel="noopener noreferrer">
              <i className="fa-solid fa-diamond-turn-right" aria-hidden="true" />
              Get directions
              <span className="sr-only"> in {maps.primary.label} (opens in a new tab)</span>
            </ButtonLink>
            <CopyAddress />
          </div>
        </div>
        </div>

        {/* Stretches to the left column's height on desktop; a fixed height
            when stacked */}
        <div className="relative min-h-[320px] lg:min-h-0 bg-white">
          <iframe
            src={mapEmbed}
            title="Map of the U.S. Naval Institute at Beach Hall, 291 Wood Road, Annapolis, Maryland"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 w-full h-full border-0"
          />
        </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 border-t border-[#C2DDFF]/30 pt-10">
          <div>
            <h3 className="font-headline text-[22px] lg:text-[26px] text-white leading-tight mb-4">
              {visiting.directionsTitle}
            </h3>
            <ol className="flex flex-col gap-2 list-decimal pl-5 marker:text-[#C2DDFF]">
              {visiting.directions.map((d) => (
                <li key={d} className="font-body text-base text-white leading-relaxed">{d}</li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="font-headline text-[22px] lg:text-[26px] text-white leading-tight mb-4">Getting on base</h3>
            <ul className="flex flex-col gap-2.5">
              {visiting.passSteps.map((s) => (
                <li key={s} className="flex gap-2.5 font-body text-base text-white leading-relaxed">
                  <span className="text-[#C2DDFF] flex-shrink-0" aria-hidden="true">—</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </ContactSection>
  )
}

/* ── Hub: find the right department ──────────────────────────────────────── */

export function ContactRouteCards() {
  return (
    <ContactSection
      id="teams"
      title="Find the right department"
      tone="tan"
    >
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
        {contactRoutes.map((r) => (
          <li key={r.title}>
            <a
              href={r.href}
              className="group flex flex-col gap-3 bg-white border border-navy-subtle p-6 lg:p-7 h-full hover:shadow-md transition-shadow"
            >
              <h3 className="font-headline text-[22px] lg:text-[26px] text-navy-bolder leading-[1.15]">
                {r.title}
              </h3>
              <p className="font-body text-[15px] text-neutral-bold leading-[1.65] flex-1">{r.summary}</p>
              <div className="pt-1">
                <CardCta>{r.cta}</CardCta>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </ContactSection>
  )
}
