import type { ReactNode } from 'react'
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
import Alert, { type AlertVariant } from '@/components/ui/Alert'
import { membership } from '@/data/account'
import { essayContestsIntro } from '@/data/essayContests'

const VARIANTS: { variant: AlertVariant; accent: string; bg: string; title: string; body: string; use: string }[] = [
  {
    variant: 'success',
    accent: '#0A5C2E',
    bg: '#E6F7ED',
    title: 'You’ve been logged out',
    body: 'Don’t worry, you can log back in below.',
    use: 'An action completed — saved preferences, a submitted form, a signed-out session.',
  },
  {
    variant: 'warning',
    accent: '#FFAA00',
    bg: '#FFF8D6',
    title: 'Membership information is temporarily unavailable',
    body: 'Please contact Member Services at 410-268-6110 with any membership questions.',
    use: 'Something needs attention but nothing has failed — a degraded service, an expiring term.',
  },
  {
    variant: 'info',
    accent: '#0466C8',
    bg: '#EBF4FF',
    title: 'Response times',
    body: 'Simple requests are typically fulfilled within one week.',
    use: 'Context the reader benefits from, with no action implied.',
  },
  {
    variant: 'danger',
    accent: '#C1121F',
    bg: '#FEF6F6',
    title: 'Please complete the required fields',
    body: 'The following items are required: Email address, Rank/Title.',
    use: 'A failure or a block — validation errors, a declined payment.',
  },
]

/** Inline code, matching the other sheets. */
function C({ children }: { children: ReactNode }) {
  return <code className="font-mono text-[13px] bg-neutral-subtlest px-1.5 py-0.5 [overflow-wrap:anywhere]">{children}</code>
}

/** Sheet prose — one width and size for every intro paragraph. */
function Lead({ children }: { children: ReactNode }) {
  return <p className="font-body text-base text-neutral-subtle leading-relaxed max-w-[760px]">{children}</p>
}

/* ─── Reproductions of hand-rolled notice boxes ──────────────────────────────
   Inline in their pages, so the classes are copied verbatim here to show the
   drift beside the component. */

/** AccountDashboard.tsx — the Salesforce-unavailable fallback. */
function DashboardUnavailableCopy() {
  return (
    <div className="border border-l-4 border-[#f0d98a] bg-[#fff8d6] px-6 py-5">
      <p className="font-body font-bold text-[16px] text-navy-bolder mb-1">
        Membership information is temporarily unavailable
      </p>
      <p className="font-body text-[15px] text-neutral-subtle leading-relaxed">
        Your member number is {membership.memberNumber}. Please contact Member Services at{' '}
        <a href="tel:4102686110" className="text-link">410-268-6110</a>{' '}
        with any membership questions.
      </p>
    </div>
  )
}

/** EssayContestsAbout.tsx — the seasonal / promo note (gold rule, no icon). */
function SeasonalNoteCopy() {
  return (
    <div className="bg-[#FFF9EB] border border-l-4 border-gold px-5 py-3 mt-1">
      <p className="font-body text-base text-navy-bolder">
        {essayContestsIntro.note}
      </p>
    </div>
  )
}

export default function Alerts() {
  return (
    <DesignSystemLayout>
      <div className="max-w-container mx-auto px-6 lg:px-8 pt-12 pb-24">
        <DocPageHeader title="Alerts">
          <p>
            Status messages. One component, four variants — a tinted panel with a 4px accent bar on
            the leading edge, an icon, an optional bold title, and body copy. Hard edges, matching
            every other surface in the system.
          </p>
          <p>
            <C>Alert.tsx</C> is the spec. A dozen pages still hand-build the same tinted panel; they are listed at
            the bottom so the Drupal build has one alert template (which also renders Drupal&rsquo;s own status
            messages).
          </p>
        </DocPageHeader>

        {/* ─────────────────────────────────────────────────────────────── */}
        <DocSection title="The four variants">
          <div className="flex flex-col gap-8">
            {VARIANTS.map(v => (
              <div key={v.variant} className="flex flex-col gap-3">
                <LiveMarkup label={`${v.variant} — accent ${v.accent} on ${v.bg}`}>
                  <Alert variant={v.variant} title={v.title}>
                    {v.body}
                  </Alert>
                </LiveMarkup>
                <p className="font-body text-sm text-neutral-subtle leading-relaxed">
                  <span className="font-bold text-navy-bolder">When to use: </span>
                  {v.use}
                </p>
              </div>
            ))}

            <ClassTable
              rows={[
                {
                  part: 'Wrapper',
                  classes: 'flex flex-wrap gap-3 border border-l-4 px-5 py-4 items-start',
                  note: (
                    <>
                      A <C>{'<div>'}</C> with <C>role</C> (below). 1px border on three sides, 4px on the leading edge, all
                      in the accent color. <C>items-start</C> keeps the icon on the first line of copy; with an action it
                      switches to <C>items-center</C>. <C>flex-wrap</C> lets the action drop below the copy on narrow
                      screens. Spacing and max-width come from the caller via <C>className</C>.
                    </>
                  ),
                },
                {
                  part: 'Colors (inline style)',
                  classes: 'style="background-color: {bg}; border-color: {accent}"',
                  note: 'Not classes: the component sets the two colors from its variant map as an inline style. See the Tokens note for the class equivalents.',
                },
                { part: 'success', classes: 'accent #0a5c2e  ·  bg #e6f7ed  ·  fa-solid fa-circle-check' },
                { part: 'warning', classes: 'accent #ffaa00  ·  bg #fff8d6  ·  fa-solid fa-triangle-exclamation' },
                { part: 'info', classes: 'accent #0466c8  ·  bg #ebf4ff  ·  fa-solid fa-circle-info' },
                { part: 'danger', classes: 'accent #c1121f  ·  bg #fef6f6  ·  fa-solid fa-circle-exclamation' },
                {
                  part: 'Icon',
                  classes: 'fa-solid {icon} text-[18px] leading-[1.45] flex-shrink-0  ›  style="color: {accent}"',
                  note: 'aria-hidden. leading-[1.45] makes the 18px glyph’s line box match the title’s first line, so the two align without a margin hack.',
                },
                { part: 'Copy column', classes: 'min-w-0 flex-1 flex flex-col gap-1', note: 'min-w-0 lets long words or URLs wrap instead of pushing the action off the panel. 4px between title and body.' },
                { part: 'Title', classes: 'font-body font-bold text-[16px] text-[#1d2535] leading-snug', note: 'A <p>, not a heading, so alerts do not add to the page outline.' },
                { part: 'Body', classes: 'font-body text-[15px] text-[#1d2535] leading-relaxed', note: 'A <div>, so it can hold links (.text-link) or a list.' },
              ]}
            />

            <DevNote title="Tokens">
              <p>
                <C>#1d2535</C> is <C>text-primary</C>. <C>#0466c8</C> (the info accent) is <C>navy-bright</C>. The other
                seven values have no token: <C>#0a5c2e</C>, <C>#e6f7ed</C>, <C>#ffaa00</C>, <C>#fff8d6</C>,{' '}
                <C>#ebf4ff</C> (the light-blue band color), <C>#c1121f</C> (also the form error red) and{' '}
                <C>#fef6f6</C>. Add them to the Drupal theme&rsquo;s Tailwind config as <C>success</C> /{' '}
                <C>success-subtle</C>, <C>warning</C> / <C>warning-subtle</C>, <C>info-subtle</C>, <C>danger</C> /{' '}
                <C>danger-subtle</C>, and write the variant as classes (<C>bg-success-subtle border-success</C>,{' '}
                <C>text-success</C> on the icon) instead of an inline style.
              </p>
            </DevNote>
          </div>
        </DocSection>

        {/* ─────────────────────────────────────────────────────────────── */}
        <DocSection title="Without a title">
          <div className="flex flex-col gap-8">
            <p className="font-body text-base text-neutral-subtle leading-relaxed max-w-[720px]">
              Omit <code className="font-mono text-sm">title</code> for a single-line alert. The icon
              stays aligned to the first line of copy.
            </p>
            <LiveMarkup label="No title">
              <Alert variant="info">
                Saved reading doesn’t count against the free-article meter.
              </Alert>
            </LiveMarkup>
            <LiveMarkup label="No title, icon={false}">
              <Alert variant="warning" icon={false}>
                Set <code className="font-mono text-sm">icon={'{false}'}</code> to drop the leading icon.
              </Alert>
            </LiveMarkup>
            <ClassTable
              rows={[
                { part: 'No title', classes: '(title <p> omitted)', note: 'The body is the only child of the copy column, so the gap-1 has no effect.' },
                { part: 'No icon', classes: '(icon <i> omitted)', note: 'The copy column starts at the 20px padding. Use sparingly: the icon is the second signal (after the color) of what kind of message it is.' },
              ]}
            />
          </div>
        </DocSection>

        {/* ─────────────────────────────────────────────────────────────── */}
        <DocSection title="With an action">
          <div className="flex flex-col gap-8">
            <p className="font-body text-sm text-neutral-subtle leading-relaxed max-w-2xl">
              Pass <code className="font-mono text-sm">action</code> to put a control on the trailing
              edge. Used on the wishlist, where removing a book happens without a confirm, so the
              acknowledgement carries the way back.
            </p>
            <LiveMarkup label="success with an Undo action (Account → Wishlist)">
              <Alert
                variant="success"
                title="Removed The Bluejacket&rsquo;s Manual from your wishlist"
                action={
                  <button
                    type="button"
                    className="bg-white border border-navy-bolder text-navy-bolder font-body font-bold text-[15px] px-5 py-2.5 hover:bg-navy-bright hover:text-white hover:border-navy-bright transition-colors"
                  >
                    Undo
                  </button>
                }
              />
            </LiveMarkup>
            <ClassTable
              rows={[
                { part: 'Wrapper', classes: 'flex flex-wrap gap-3 border border-l-4 px-5 py-4 items-center', note: 'items-center instead of items-start once there is an action, so the row reads as a control bar.' },
                { part: 'Action slot', classes: 'flex-shrink-0', note: 'Never squeezed. When the copy and the action do not fit on one line, flex-wrap drops the action below.' },
                {
                  part: 'Undo button',
                  classes: 'bg-white border border-navy-bolder text-navy-bolder font-body font-bold text-[15px] px-5 py-2.5 hover:bg-navy-bright hover:text-white hover:border-navy-bright transition-colors',
                  note: (
                    <>
                      Hand-rolled in AccountWishlist. It is the outline-dark button at its own size; in Drupal use the{' '}
                      <Link to="/design-system/buttons" className="text-link">button template</Link> (outline-dark, sm) with a
                      white fill so it stands off the tint.
                    </>
                  ),
                },
              ]}
            />
            <CodeBlock code={`<Alert
  variant="success"
  title="Removed The Bluejacket's Manual from your wishlist"
  action={<button onClick={undoRemove}>Undo</button>}
/>`} />
          </div>
        </DocSection>

        {/* ─────────────────────────────────────────────────────────────── */}
        <DocSection title="Dismissing">
          <div className="flex flex-col gap-6">
            <Lead>
              The component has no close button, and no alert in the prototype is dismissible. Alerts appear in
              response to something the reader just did (saved, submitted, removed) and are replaced on the next
              action or page load, so there is nothing to dismiss. The only control an alert carries is a recovery
              action, such as Undo.
            </Lead>
            <DevNote>
              <p>
                If a persistent, sitewide message is ever needed (a maintenance notice, say), put a close control in the{' '}
                <C>action</C> slot as a <C>{'<button type="button" aria-label="Dismiss">'}</C> with the bare ✕ glyph from{' '}
                <Link to="/design-system/buttons" className="text-link">Icon buttons</Link>, remember the dismissal in{' '}
                <C>localStorage</C> keyed by the message, and move focus to the next landmark when it closes. That needs
                a Drupal behavior; ordinary status messages do not.
              </p>
            </DevNote>
          </div>
        </DocSection>

        {/* ─────────────────────────────────────────────────────────────── */}
        <DocSection title="Error summary (danger)">
          <div className="flex flex-col gap-8">
            <Lead>
              The danger variant is also the form error summary. On a failed submit it appears above the form, names
              the fields or counts them, and is scrolled into view. The full validation pattern (field errors, focus,
              message copy) is on{' '}
              <Link to="/design-system/forms" className="text-link">Forms &amp; Inputs → Validation</Link>.
            </Lead>
            <LiveMarkup label="Named fields (checkouts) and counted fields (essay and newsletter forms)">
              <div className="flex flex-col gap-6 max-w-[760px]">
                <Alert variant="danger" title="Please complete the required fields" className="scroll-mt-28">
                  The following items are required: Email address, Rank/Title.
                </Alert>
                <Alert variant="danger" title="2 fields need attention" className="mb-8">
                  Scroll down to the highlighted fields to fix them, then submit again.
                </Alert>
              </div>
            </LiveMarkup>
            <ClassTable
              rows={[
                { part: 'Summary', classes: 'scroll-mt-28', note: 'Added by the caller. 112px of scroll margin keeps the summary clear of the sticky header when it is scrolled to.' },
                { part: 'Role', classes: 'role="alert"', note: 'From the danger default. The summary is mounted only when there are errors, so the insertion is what gets announced.' },
              ]}
            />
            <SourceList
              title="Canonical"
              items={[
                { path: 'src/pages/BooksCheckout.tsx', note: 'named fields' },
                { path: 'src/sections/EssaySubmitForm.tsx', note: 'counted fields' },
                { path: 'src/pages/NewsletterJoin.tsx', note: 'counted fields' },
                { path: 'src/sections/ContactSections.tsx', note: 'named fields, no scroll-mt' },
              ]}
            />
          </div>
        </DocSection>

        {/* ─────────────────────────────────────────────────────────────── */}
        <DocSection title="Usage">
          <CodeBlock
            code={`import Alert from '@/components/ui/Alert'

<Alert variant="success" title="Changes saved">
  Prototype only — nothing is persisted between page loads.
</Alert>

// Single line, no title
<Alert variant="danger">Your card was declined.</Alert>`}
          />
        </DocSection>

        {/* ─────────────────────────────────────────────────────────────── */}
        <DocSection title="Accessibility">
          <div className="flex flex-col gap-8">
            <p className="font-body text-base text-neutral-subtle leading-relaxed max-w-[760px]">
              The <code className="font-mono text-sm">role</code> is chosen by variant so alerts are
              announced correctly without the caller having to think about it:{' '}
              <code className="font-mono text-sm">danger</code> gets{' '}
              <code className="font-mono text-sm">role="alert"</code>, which interrupts a screen reader,
              and the other three get <code className="font-mono text-sm">role="status"</code>, which is
              announced politely. Pass <code className="font-mono text-sm">role</code> to override.
              Icons are <code className="font-mono text-sm">aria-hidden</code> — colour and icon never
              carry meaning on their own, so the copy always states the status.
            </p>
            <PropsTable
              rows={[
                { name: 'variant', type: "'success' | 'warning' | 'info' | 'danger'", default: "'info'", description: 'Palette and icon.' },
                { name: 'title', type: 'ReactNode', description: 'Bold first line. Omit for a single-line alert.' },
                { name: 'children', type: 'ReactNode', description: 'Body copy.' },
                { name: 'icon', type: 'boolean', default: 'true', description: 'Set false to drop the leading icon.' },
                { name: 'action', type: 'ReactNode', description: 'Control on the trailing edge — an Undo for a destructive action taken without a confirm, for instance. Wraps below the copy on narrow screens.' },
                { name: 'role', type: "'alert' | 'status'", default: 'by variant', description: 'Override the announced role.' },
                { name: 'className', type: 'string', description: 'Extra classes — spacing and max-width live here.' },
                { name: 'id', type: 'string', description: 'For aria-describedby wiring.' },
              ]}
            />

            <DevNote title={'role="status" vs role="alert"'}>
              <p>
                Both are live regions: they announce content that is <em>inserted or changed</em> after the page loads.{' '}
                <C>status</C> is polite (read when the screen reader is idle); <C>alert</C> is assertive (interrupts).
                Use <C>alert</C> only for danger, where the reader cannot continue until they act.
              </p>
              <p>
                A message that is already in the HTML when the page loads (the usual Drupal case, after a form POST and
                redirect) is not announced by most screen readers, whatever its role. Render messages at the top of the
                main content region, so they are the first thing a reader reaches; for an error
                summary, also move focus to it (<C>tabindex="-1"</C>). Messages added by JavaScript (AJAX forms, the
                Undo) are announced by the role.
              </p>
            </DevNote>

            <DevNote>
              <p>
                Override <C>status-messages.html.twig</C> in the theme so Drupal&rsquo;s messages render through the
                alert template. It receives <C>message_list</C> keyed by type and <C>status_headings</C>. Map{' '}
                <C>status</C> → success, <C>warning</C> → warning, <C>error</C> → danger, and <C>info</C> (used by some
                contrib modules) → info. Render one alert per type; when a type has several messages, put them in a{' '}
                <C>{'<ul>'}</C> in the body. Keep core&rsquo;s visually hidden heading as the accessible label. Keep the{' '}
                <C>data-drupal-messages</C> wrapper so <C>Drupal.Message</C> (core&rsquo;s JS messages API) can add alerts
                client-side with the same markup.
              </p>
              <CodeBlock
                code={`{# themes/usni/templates/misc/status-messages.html.twig — sketch #}
{% set map = { status: 'success', warning: 'warning', error: 'danger', info: 'info' } %}
<div data-drupal-messages class="flex flex-col gap-4">
  {% for type, messages in message_list %}
    {% include '@usni/alert/alert.twig' with {
      variant: map[type]|default('info'),
      role: type == 'error' ? 'alert' : 'status',
      label: status_headings[type],
      body: messages|length > 1 ? messages : messages|first,
    } only %}
  {% endfor %}
</div>`}
              />
              <p>
                The alert template itself takes <C>{'{{ variant }}'}</C>, <C>{'{{ title }}'}</C> (optional),{' '}
                <C>{'{{ body }}'}</C>, <C>{'{{ icon }}'}</C> (default true), <C>{'{{ action }}'}</C> (optional render
                array) and <C>{'{{ attributes }}'}</C>. Editorial callouts inside body copy are a different component (see{' '}
                <Link to="/design-system/media" className="text-link">Media → Callout</Link>).
              </p>
            </DevNote>

            <SourceList title="Canonical" items={[{ path: 'src/components/ui/Alert.tsx' }]} />
          </div>
        </DocSection>

        {/* ─────────────────────────────────────────────────────────────── */}
        <DocSection title="Drift: hand-rolled notice boxes">
          <div className="flex flex-col gap-8">
            <Lead>
              The tinted, left-ruled panel predates the component, and these copies were never converted. Most use the
              warning palette with no icon and no <C>role</C>, so they are silent to screen readers and look like an
              Alert without behaving like one. Two are reproduced below beside the component.
            </Lead>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <LiveMarkup label="AccountDashboard fallback (hand-rolled)">
                <DashboardUnavailableCopy />
              </LiveMarkup>
              <LiveMarkup label="The same message as an Alert">
                <Alert variant="warning" title="Membership information is temporarily unavailable">
                  Your member number is {membership.memberNumber}. Please contact Member Services at{' '}
                  <a href="tel:4102686110" className="text-link">410-268-6110</a>{' '}
                  with any membership questions.
                </Alert>
              </LiveMarkup>
            </div>

            <LiveMarkup label="Seasonal / promo note (EssayContestsAbout, FromThePress): gold rule, no icon">
              <SeasonalNoteCopy />
            </LiveMarkup>

            <DocLabel>Found by searching for border-l-4</DocLabel>

            <SourceList
              title="Should be an Alert"
              tone="drift"
              items={[
                { path: 'src/pages/account/AccountDashboard.tsx', note: 'Salesforce-unavailable fallback: border-[#f0d98a] (a softer amber than #ffaa00), px-6 py-5, title text-[16px] navy-bolder, body neutral-subtle. No icon, no role. Should be Alert warning.' },
                { path: 'src/pages/account/AccountDashboardNextGen.tsx', note: 'the same fallback, copied' },
                { path: 'src/pages/account/AccountPayment.tsx', note: '“Removing a card on auto-renew”: info palette but a pale border-[#bcd8f7] instead of #0466c8; 14px neutral-subtle body. No icon, no role. Should be Alert info.' },
                { path: 'src/sections/ContactSections.tsx', note: '“Before you travel” (visiting section): exact warning palette, neutral-subtle body, no icon or role. The same file uses Alert for its form summary and response-times note.' },
                { path: 'src/sections/ArticleAuthorBio.tsx', note: 'Disclaimer: warning palette with an fa-circle-info icon in #1D2535, an 11px uppercase “Disclaimer” label and 12px body. A standing legal note rather than a status, so Alert info, or a small-print block if design wants it quieter.' },
              ]}
            />

            <SourceList
              title="Promo note: needs a design decision"
              tone="drift"
              items={[
                { path: 'src/sections/EssayContestsAbout.tsx', note: 'bg-[#FFF9EB] border border-l-4 border-gold px-5 py-3, 16px navy-bolder copy, no icon. Its comment calls it the “seasonal-alert treatment used on the homepage”.' },
                { path: 'src/sections/FromThePress.tsx', note: 'the same panel with flex flex-wrap items-center gap-3 mb-6, carrying the Summer Reading Sale coupon chip (font-mono font-bold border border-dashed border-gold-dark bg-white px-2 py-0.5)' },
                { path: 'src/components/ui/AccountNotifications.tsx', note: 'PromoCode: bg-tan-subtlest border-l-4 border-gold (no outer border) px-5 py-4, with a 20px code. A third version of the same idea.' },
              ]}
            />

            <SourceList
              title="Page banners in the warning palette (headline-sized, not alerts)"
              tone="drift"
              items={[
                { path: 'src/sections/CartItems.tsx', note: 'cart review banner: bg-[#fff8d6] border border-l-4 border-[#ffaa00] px-8 py-6 with a 36px headline. Documented on Commerce.' },
                { path: 'src/sections/DonateCartItems.tsx', note: 'the same banner on bg-[#fefde8] (a paler yellow) with a 28px headline' },
                { path: 'src/sections/NavalHistoryCartItems.tsx', note: 'same as DonateCartItems' },
                { path: 'src/pages/Login.tsx', note: '“Need additional assistance?”: px-8 py-6, 22px headline, 18px body' },
                { path: 'src/sections/ProceedingsContactContent.tsx', note: 'Submission Guidelines: a warning-palette billboard with a 36px headline and a full-width bg-navy-bold button, lg:flex-row' },
              ]}
            />

            <SourceList
              title="Same left rule, different job (leave as is)"
              tone="drift"
              items={[
                { path: 'src/sections/EssaySubmitForm.tsx', note: 'bg-surface-subtle border-l-4 border-[#0466c8] around the screening checkbox, and border-l-4 pl-5 on the co-author fieldset. Grouping, not status.' },
                { path: 'src/sections/ReadingListSection.tsx', note: 'attribution block, border-light-blue' },
                { path: 'src/sections/AboutStrategicPlanForeword.tsx', note: 'blockquote, border-gold' },
                { path: 'src/sections/ArticleAudioPlayer.tsx', note: 'player frame, border-[#023e7d]' },
              ]}
            />

            <DevNote>
              <p>
                Build the first group as the alert template. For the promo note, decide with design whether it is a
                fifth, non-status variant (&ldquo;promo&rdquo;: gold rule on <C>#FFF9EB</C>, no icon, no role, optional code
                chip) or Alert info; it should not be the warning variant, since nothing is wrong. <C>#FFF9EB</C> and{' '}
                <C>#fefde8</C> have no token. The page banners belong to their own pages&rsquo; templates (see{' '}
                <Link to="/design-system/commerce" className="text-link">Commerce</Link>); if they keep the warning palette,
                take the colors from the same tokens as the alert.
              </p>
            </DevNote>
          </div>
        </DocSection>
      </div>
    </DesignSystemLayout>
  )
}
