import { useMemo, useState, type ReactNode } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
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
import PreviewFrame from '@/components/design-system/PreviewFrame'
import { Button } from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import AddressModal from '@/components/ui/AddressModal'
import CreditCardModal from '@/components/ui/CreditCardModal'
import SharePopover from '@/components/ui/SharePopover'
import { ServiceHelpTooltip } from '@/components/ui/FieldHelp'
import Alert from '@/components/ui/Alert'
import { membership } from '@/data/account'

const noop = () => {}

function Code({ children }: { children: ReactNode }) {
  return <code className="font-mono text-xs bg-neutral-subtlest px-1.5 py-0.5 [overflow-wrap:anywhere]">{children}</code>
}

function Lede({ children }: { children: ReactNode }) {
  return <p className="font-body text-base text-neutral-subtle leading-relaxed max-w-[760px]">{children}</p>
}

function DsLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="text-link">
      {children}
    </Link>
  )
}

/**
 * The open state of a fixed-position overlay, shown in place.
 *
 * The real components lock body scroll and move focus when they open, so
 * mounting one open on this page would freeze the sheet. Instead the
 * component's own static render (no effects run) is injected into a box with a
 * transform — which makes the box the containing block for `position: fixed`,
 * so the backdrop and panel fill the box instead of the window. It is inert:
 * a picture of the markup, not a working control. Use the "Open live" button
 * beside each one for the behaviour.
 */
function ContainedStatic({ node, heightClass, prefix }: { node: ReactNode; heightClass: string; prefix: string }) {
  const html = useMemo(
    () =>
      // None of the overlays shown this way use the router or the cart, so
      // no providers are needed (and none means no SSR layout-effect noise).
      renderToStaticMarkup(<>{node}</>, { identifierPrefix: prefix }),
    // Static by design.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )
  const inertProps = { inert: '' } as Record<string, string>
  return (
    <div
      className={`relative [transform:translateZ(0)] overflow-hidden ${heightClass}`}
      aria-hidden="true"
      {...inertProps}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

/* The auto-renew confirmation from the account dashboard — the real content
   of the most common Modal on the site. Buttons copied verbatim from
   src/pages/account/AccountDashboard.tsx. */
function ConfirmAutoRenewBody({ onKeep, onTurnOff }: { onKeep: () => void; onTurnOff: () => void }) {
  return (
    <>
      <Alert variant="warning" title={`Your membership would end on ${membership.renewsOn}`}>
        We won’t charge your card again. On that date your {membership.plan} lapses, and access
        to <em>Proceedings</em>, <em>Naval History</em>, and the digital archive ends with it.
      </Alert>
      <p className="font-body text-[15px] text-neutral-subtle leading-relaxed">
        You can turn auto-renew back on at any time before{' '}
        <strong className="font-semibold">{membership.renewsOn}</strong> and nothing will change.
      </p>
      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
        <button
          type="button"
          onClick={onTurnOff}
          className="inline-flex items-center justify-center font-body font-bold text-[15px] text-[#c1121f] px-5 py-3 border border-[#c1121f] hover:bg-[#c1121f] hover:text-white transition-colors"
        >
          Turn off auto-renew
        </button>
        <button
          type="button"
          onClick={onKeep}
          className="inline-flex items-center justify-center bg-navy-bolder text-white font-body font-bold text-[15px] px-5 py-3 border border-navy-bolder hover:bg-navy-bright hover:border-navy-bright transition-colors"
        >
          Keep auto-renew on
        </button>
      </div>
    </>
  )
}

const CloseX = () => (
  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M3 3l10 10M13 3L3 13" />
  </svg>
)

/* The account drawer's shell, reproduced because AccountDrawer is private to
   AccountLayout. Classes verbatim from src/components/layout/AccountLayout.tsx;
   the nav links are SidebarNav's, abbreviated to three items. */
function AccountDrawerCopy() {
  const items = [
    { label: 'Dashboard', active: true },
    { label: 'Profile', active: false },
    { label: 'Addresses', active: false },
  ]
  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Account menu">
      <div className="overlay-fade-in absolute inset-0 bg-navy-boldest/70 backdrop-blur-sm" aria-hidden="true" />
      <div
        id="account-drawer"
        className="drawer-in-left absolute inset-y-0 left-0 w-[86%] max-w-[330px]
                   bg-[#f4f6fb] border-r border-[#c4c9d4] shadow-2xl
                   overflow-y-auto overscroll-contain p-6 pt-5 flex flex-col gap-7"
      >
        <div className="flex items-center justify-between">
          <p className="font-body font-bold text-[11px] uppercase tracking-[0.1em] text-neutral-subtle">Account menu</p>
          <button
            type="button"
            aria-label="Close account menu"
            className="flex items-center justify-center w-9 h-9 bg-navy-subtle text-white hover:bg-navy-bright transition-colors"
          >
            <CloseX />
          </button>
        </div>
        <nav aria-label="Account" className="flex flex-col gap-6">
          <div className="flex flex-col">
            <p className="font-body font-bold text-[11px] uppercase tracking-[0.1em] text-neutral-subtle mb-2">My account</p>
            <ul className="flex flex-col">
              {items.map(item => (
                <li key={item.label}>
                  <a
                    href="#"
                    aria-current={item.active ? 'page' : undefined}
                    className={`flex items-center justify-between gap-3 px-3 py-2.5 font-body text-[15px] border-l-2 transition-colors ${
                      item.active
                        ? 'border-[#023e7d] bg-white font-bold text-navy-bolder'
                        : 'border-transparent text-neutral-subtle hover:bg-white hover:text-navy-bolder'
                    }`}
                  >
                    {item.label}
                    <i className={`fa-solid fa-arrow-right text-[11px] ${item.active ? 'text-[#023e7d]' : 'text-[#c4c9d4]'}`} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default function Overlays() {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [addressOpen, setAddressOpen] = useState(false)
  const [cardOpen, setCardOpen] = useState(false)
  const [drawerKey, setDrawerKey] = useState(0)

  return (
    <DesignSystemLayout>
      <div className="max-w-container mx-auto px-6 lg:px-8 pt-12 pb-24">
        <DocPageHeader title="Modals & Overlays">
          <p>
            Everything that sits above the page: the modal dialog and the forms built on it, the off-canvas account
            drawer, the header’s search flydown and mobile menu, and the lightweight popovers (share, field help)
            that hang off a button.
          </p>
          <p>
            One shell, <Code>Modal</Code>, is the spec for every dialog. Several older dialogs predate it and copy its
            chrome by hand; they are listed as drift. The accessibility contract at the end of the page is what the
            Drupal build must reproduce — the prototype only gets part of the way.
          </p>
        </DocPageHeader>

        {/* ─── Modal ───────────────────────────────────────────────────── */}
        <DocSection title="Modal">
          <div className="flex flex-col gap-8">
            <Lede>
              A centred white panel over a blurred navy scrim, with a square navy close button in the top-right
              corner and a serif heading that names the dialog. Use it for a short task or a decision that has to be
              made before continuing — confirming a destructive change, adding an address, entering a card. Do not
              use it for content people will want to read at length or link to.
            </Lede>

            <LiveMarkup
              label="Confirm dialog — static render of the open state; “Open live” for behaviour"
              previewClassName="p-0 bg-white"
              markupFor={
                <Modal open onClose={noop} title="Turn off auto-renew?" maxWidth="520px">
                  <ConfirmAutoRenewBody onKeep={noop} onTurnOff={noop} />
                </Modal>
              }
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-4 px-6 py-4 border-b border-border-light">
                  <Button variant="navy" size="sm" onClick={() => setConfirmOpen(true)}>Open live</Button>
                  <p className="font-body text-sm text-neutral-subtle">The page behind locks while it is open. Escape, the scrim or ✕ closes it.</p>
                </div>
                <ContainedStatic
                  prefix="ds-confirm-"
                  heightClass="h-[480px]"
                  node={
                    <Modal open onClose={noop} title="Turn off auto-renew?" maxWidth="520px">
                      <ConfirmAutoRenewBody onKeep={noop} onTurnOff={noop} />
                    </Modal>
                  }
                />
              </div>
            </LiveMarkup>
            <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)} title="Turn off auto-renew?" maxWidth="520px">
              <ConfirmAutoRenewBody onKeep={() => setConfirmOpen(false)} onTurnOff={() => setConfirmOpen(false)} />
            </Modal>

            <ClassTable
              rows={[
                { part: 'Root', classes: 'fixed inset-0 z-[60] flex items-center justify-center p-4', note: 'role="dialog" aria-modal="true" aria-labelledby → the heading. z-[60] clears the sticky header (z-40) and every dropdown (z-50). `p-4` keeps a 16px margin round the panel on phones.' },
                { part: 'Scrim', classes: 'absolute inset-0 bg-navy-boldest/70 backdrop-blur-sm', note: 'aria-hidden. Click closes. navy-boldest at 70% with a small blur — the same scrim on every overlay on the site.' },
                { part: 'Panel', classes: 'relative z-10 bg-white w-full max-h-[88vh] overflow-y-auto shadow-2xl outline-none', note: 'Width capped by an inline `max-width` (the `maxWidth` prop, default 560px). Tall content scrolls inside the panel, never the page. tabindex="-1" so it can take focus; `outline-none` because it is a programmatic focus target, not a control.' },
                { part: 'Close button', classes: 'absolute top-4 right-4 flex items-center justify-center w-10 h-10 bg-navy-subtle text-white hover:bg-navy-bright transition-colors', note: 'aria-label="Close". 40px square, 16px ✕ drawn as an inline SVG (`w-4 h-4`, stroke 2). Inside the panel, so it scrolls away with long content.' },
                { part: 'Body', classes: 'px-7 lg:px-8 pt-8 pb-8 flex flex-col gap-6', note: '28px side padding, 32px from lg. 24px between heading and each child.' },
                { part: 'Heading', classes: 'font-headline text-[28px] text-[#1d2535] leading-[1.2] pr-12', note: 'An <h2>. `pr-12` keeps a long title clear of the close button. #1d2535 = text-primary.' },
                { part: 'Button row (confirm)', classes: 'flex flex-col-reverse sm:flex-row sm:justify-end gap-3', note: 'Safe choice is the solid button and comes first visually on desktop (right) and on top on mobile, so a stray tap never lands on the destructive action. Destructive button: `text-[#c1121f] border-[#c1121f]`, filling red on hover.' },
              ]}
            />

            <DocLabel className="mb-0">Sizes in use (the maxWidth prop)</DocLabel>
            <ClassTable
              rows={[
                { part: '520px', classes: 'maxWidth="520px"', note: 'Confirm dialogs (turn off auto-renew).' },
                { part: '560px (default)', classes: 'maxWidth="560px"', note: 'Card entry; the default for a short form.' },
                { part: '600px', classes: 'maxWidth="600px"', note: 'AddressModal — room for City / State / ZIP on one row.' },
                { part: '640px', classes: 'max-w-[640px]', note: 'Member-update reader (drift copy) — long-form text.' },
                { part: '864px', classes: 'max-w-[864px]', note: 'Membership benefit modal (drift copy) — full-bleed image header.' },
              ]}
            />

            <DevNote>
              <p>
                Template variables: <Code>{'{{ title }}'}</Code> (heading and accessible name),{' '}
                <Code>{'{{ content }}'}</Code> (body — a form, an Alert and copy, a button row), and a size modifier.
                Render the dialog markup hidden in the page (or fetch it) and open it with a Drupal behavior; Drupal
                core’s <Code>Drupal.dialog</Code> can be used if it is restyled to this markup, but the default jQuery
                UI chrome must not show.
              </p>
              <p>
                The behavior owns: opening from a trigger, Escape, scrim click, scroll lock, moving focus in, trapping
                Tab, and returning focus on close — see the accessibility contract below. A native{' '}
                <Code>&lt;dialog&gt;</Code> with <Code>showModal()</Code> gives Escape, focus trapping and an inert
                background for free and is a good base; style <Code>::backdrop</Code> as the scrim.
              </p>
            </DevNote>

            <PropsTable
              rows={[
                { name: 'open', type: 'boolean', description: 'Renders nothing when false.' },
                { name: 'onClose', type: '() => void', description: 'Escape, scrim click, and the ✕. Pass a stable function — it is an effect dependency.' },
                { name: 'title', type: 'string', description: 'Heading text and the dialog’s accessible name.' },
                { name: 'maxWidth', type: 'string', default: "'560px'", description: 'Panel width cap.' },
                { name: 'children', type: 'ReactNode', description: 'Body, stacked with a 24px gap under the heading.' },
              ]}
            />

            <SourceList title="Canonical" items={[{ path: 'src/components/ui/Modal.tsx' }]} />
            <SourceList
              tone="drift"
              title="Hand-built copies of the shell"
              items={[
                { path: 'src/components/ui/CreditCardModal.tsx', note: '`z-50` (not z-[60]); no `max-h`/scroll on the panel; focus is not moved in; heading id is a fixed string, so two instances would collide. See below.' },
                { path: 'src/sections/MembershipBenefits.tsx', note: 'BenefitModal: `z-50`, 864px, 490px image header, white close button (`bg-white text-neutral-subtle hover:bg-neutral-subtlest`), <h3> heading, `px-10 pt-8 pb-10` body; no focus handling.' },
                { path: 'src/components/ui/AccountNotifications.tsx', note: 'UpdateModal: matches Modal (z-[60], navy close) but `max-h-[86vh]`, `px-7 lg:px-9 pt-8 pb-9`, red eyebrow + 28/32px heading + date; no focus handling.' },
                { path: 'src/components/ui/ArticleImageGallery.tsx', note: 'Lightbox: `z-50`, no panel — image and caption float on the scrim; white close button at `top-6 right-6`; aria-label is the caption; no scroll lock or Escape handler of its own.' },
              ]}
            />
          </div>
        </DocSection>

        {/* ─── AddressModal ─────────────────────────────────────────────── */}
        <DocSection title="Address modal">
          <div className="flex flex-col gap-8">
            <Lede>
              The account’s “Add an address” form, and the reference for a form inside a Modal: field primitives from{' '}
              <DsLink to="/design-system/forms">Forms &amp; Inputs</DsLink>, errors only after a submit attempt, a
              Save + Cancel row, and a reset to empty whenever it closes.
            </Lede>

            <LiveMarkup
              label="Add an address — static render of the open state"
              previewClassName="p-0 bg-white"
              defaultOpen={false}
              markupFor={<AddressModal open onClose={noop} onSave={noop} />}
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-4 px-6 py-4 border-b border-border-light">
                  <Button variant="navy" size="sm" onClick={() => setAddressOpen(true)}>Open live</Button>
                  <p className="font-body text-sm text-neutral-subtle">Submit it empty to see the field errors.</p>
                </div>
                <ContainedStatic prefix="ds-address-" heightClass="h-[860px]" node={<AddressModal open onClose={noop} onSave={noop} />} />
              </div>
            </LiveMarkup>
            <AddressModal open={addressOpen} onClose={() => setAddressOpen(false)} onSave={noop} />

            <ClassTable
              rows={[
                { part: 'Shell', classes: 'fixed inset-0 z-[60] flex items-center justify-center p-4', note: 'Modal with title="Add an address" and maxWidth="600px" — everything outside the form is the Modal above.' },
                { part: 'Form', classes: 'flex flex-col gap-5', note: 'noValidate. 20px between fields — the same rhythm as a page fieldset.' },
                { part: 'City / State / ZIP', classes: 'flex flex-col sm:flex-row gap-4', note: 'City `flex-1`, State `sm:w-40`, ZIP `sm:w-36`. Stacks below sm.' },
                { part: 'Button row', classes: 'flex flex-wrap gap-3 pt-1', note: 'Save address = Button navy / lg. Cancel = `font-body font-bold text-[16px] text-navy-bolder px-6 py-3 border border-navy-bolder hover:bg-navy-bright hover:text-white hover:border-navy-bright transition-colors`.' },
              ]}
            />

            <DevNote>
              <p>
                In Drupal this is the address book’s add form (Commerce profile / Address field) rendered in the
                dialog. Fields: <Code>{'{{ label }}'}</Code> (Home / Office / Other), full name, street, line 2,
                city, state (full names, matching the checkout selects), ZIP, country, and a “make default” checkbox.
                On a validation error the dialog stays open and the errors render inside it; on success it closes and
                the new address appears in the list with a success Alert.
              </p>
            </DevNote>

            <SourceList title="Canonical" items={[{ path: 'src/components/ui/AddressModal.tsx' }]} />
          </div>
        </DocSection>

        {/* ─── CreditCardModal ──────────────────────────────────────────── */}
        <DocSection title="Credit card modal (shell)">
          <div className="flex flex-col gap-8">
            <Lede>
              The card-entry dialog used by every checkout and the account’s Payment methods page. Its fields are
              documented on <DsLink to="/design-system/forms">Forms &amp; Inputs</DsLink>; here is the shell, which
              predates <Code>Modal</Code> and repeats its chrome by hand.
            </Lede>

            <LiveMarkup
              label="Pay with Credit Card — static render of the open state"
              previewClassName="p-0 bg-white"
              defaultOpen={false}
              markupFor={<CreditCardModal open onClose={noop} onSuccess={noop} />}
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-4 px-6 py-4 border-b border-border-light">
                  <Button variant="navy" size="sm" onClick={() => setCardOpen(true)}>Open live</Button>
                  <p className="font-body text-sm text-neutral-subtle">Submit enables once all four groups, expiry and code are filled.</p>
                </div>
                <ContainedStatic prefix="ds-card-" heightClass="h-[520px]" node={<CreditCardModal open onClose={noop} onSuccess={noop} />} />
              </div>
            </LiveMarkup>
            <CreditCardModal open={cardOpen} onClose={() => setCardOpen(false)} onSuccess={() => setCardOpen(false)} />

            <ClassTable
              rows={[
                { part: 'Root', classes: 'fixed inset-0 z-50 flex items-center justify-center p-4', note: 'Drift: z-50 rather than Modal’s z-[60]. aria-labelledby="credit-card-modal-title".' },
                { part: 'Scrim', classes: 'absolute inset-0 bg-navy-boldest/70 backdrop-blur-sm', note: 'Same as Modal.' },
                { part: 'Panel', classes: 'relative bg-white w-full max-w-[560px] shadow-2xl z-10', note: 'Drift: no `max-h-[88vh] overflow-y-auto`, so on a short landscape phone the bottom of the form can fall off-screen.' },
                { part: 'Close button', classes: 'absolute top-4 right-4 flex items-center justify-center w-10 h-10 bg-navy-subtle text-white hover:bg-navy-bright transition-colors', note: 'Same as Modal, but no `type="button"` — inside the panel, not the form, so it does not submit.' },
                { part: 'Heading', classes: 'font-headline text-[28px] text-[#1d2535] leading-[1.2]', note: 'No `pr-12` — a long custom `title` could run under the close button.' },
              ]}
            />

            <DevNote>
              <p>
                Build this on the shared dialog template; only the body differs. Most of its drift (z-index, scroll,
                focus) disappears once it does.
              </p>
            </DevNote>

            <SourceList title="Source" items={[{ path: 'src/components/ui/CreditCardModal.tsx' }]} />
          </div>
        </DocSection>

        {/* ─── Drawer ──────────────────────────────────────────────────── */}
        <DocSection title="Off-canvas drawer (account menu)">
          <div className="flex flex-col gap-8">
            <Lede>
              Below <Code>lg</Code> the account sidebar becomes a drawer: an “Account menu” button sits where the
              sidebar would be, and the menu slides in from the left over the scrim. It is the only drawer on the
              site, and the only user of the <Code>drawer-in-left</Code> and <Code>overlay-fade-in</Code> animations.
              (The filter panels on the archives collapse in place on mobile; they are not drawers.)
            </Lede>

            <LiveMarkup
              label="Account drawer — reproduced from AccountLayout, contained in the box"
              previewClassName="p-0 bg-white"
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-4 px-6 py-4 border-b border-border-light">
                  <Button variant="navy" size="sm" onClick={() => setDrawerKey(k => k + 1)}>Replay animation</Button>
                  <p className="font-body text-sm text-neutral-subtle">Both animations run on mount — the drawer is unmounted when closed.</p>
                </div>
                <div key={drawerKey} className="relative [transform:translateZ(0)] h-[440px] overflow-hidden bg-white">
                  <AccountDrawerCopy />
                </div>
              </div>
            </LiveMarkup>

            <ClassTable
              rows={[
                { part: 'Root', classes: 'lg:hidden fixed inset-0 z-[60]', note: 'role="dialog" aria-modal="true" aria-label="Account menu". `lg:hidden`: from lg the persistent sidebar replaces it (the copy above drops lg:hidden so it shows on a desktop docs page).' },
                { part: 'Scrim', classes: 'overlay-fade-in absolute inset-0 bg-navy-boldest/70 backdrop-blur-sm', note: 'Fades in over 0.2s. Click closes.' },
                { part: 'Panel', classes: 'drawer-in-left absolute inset-y-0 left-0 w-[86%] max-w-[330px] bg-[#f4f6fb] border-r border-[#c4c9d4] shadow-2xl overflow-y-auto overscroll-contain p-6 pt-5 flex flex-col gap-7', note: 'Slides in over 0.28s. 86% wide so a strip of the page stays visible as a cue that it is an overlay; capped at 330px. `overscroll-contain` stops a scroll at the end of the menu from scrolling the page. #f4f6fb (sidebar tint) has no token.' },
                { part: 'Header row', classes: 'flex items-center justify-between', note: 'Eyebrow “Account menu” `font-body font-bold text-[11px] uppercase tracking-[0.1em] text-neutral-subtle`.' },
                { part: 'Close button', classes: 'flex items-center justify-center w-9 h-9 bg-navy-subtle text-white hover:bg-navy-bright transition-colors', note: 'aria-label="Close account menu". 36px — smaller than the Modal’s 40px.' },
                { part: 'Trigger', classes: 'lg:hidden flex items-center gap-3 w-full bg-white border border-[#c4c9d4] px-5 py-4 font-body font-bold text-[16px] text-navy-bolder hover:border-navy-bright hover:text-navy-bright transition-colors', note: 'aria-expanded, aria-controls="account-drawer". Hamburger SVG `w-5 h-5`.' },
              ]}
            />

            <DocLabel className="mb-0">Animations (src/index.css)</DocLabel>
            <CodeBlock
              code={`@keyframes drawer-in-left {
  from { transform: translateX(-100%); }
  to   { transform: translateX(0); }
}

@keyframes overlay-fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.drawer-in-left {
  animation: drawer-in-left 0.28s ease-out;
}

.overlay-fade-in {
  animation: overlay-fade-in 0.2s ease-out;
}

@media (prefers-reduced-motion: reduce) {
  .drawer-in-left,
  .overlay-fade-in {
    animation: none;
  }
}`}
            />

            <DevNote>
              <p>
                The drawer’s body is the same sidebar markup as desktop (avatar, grouped links, Log out — see{' '}
                <DsLink to="/design-system/account">Account</DsLink>). Render the menu once and let CSS and a behavior
                switch it between rail and drawer, rather than outputting it twice.
              </p>
              <p>
                Both animations are entry-only: closing removes the drawer immediately. If production adds an exit
                animation, keep the reduced-motion override. Navigating to another account page closes the drawer.
                The <Code>overlay-fade-in</Code> class is also the one to use if <Code>Modal</Code>’s scrim gets an
                entrance — it currently has none.
              </p>
            </DevNote>

            <SourceList title="Canonical" items={[{ path: 'src/components/layout/AccountLayout.tsx', note: 'AccountDrawer (private) and the trigger' }, { path: 'src/index.css', note: 'drawer-in-left, overlay-fade-in' }]} />
          </div>
        </DocSection>

        {/* ─── Header overlays ─────────────────────────────────────────── */}
        <DocSection title="Header overlays: search flydown and mobile menu">
          <div className="flex flex-col gap-8">
            <Lede>
              Two overlays belong to the site header. Both are documented in full on{' '}
              <DsLink to="/design-system/navigation">Navigation</DsLink>; here they are as overlays — what they cover,
              how they stack, and how they close. The previews are the real header in an iframe, opened with the
              header’s preview flags.
            </Lede>

            <div>
              <DocLabel className="mb-2">Search flydown — desktop</DocLabel>
              <PreviewFrame
                src="/design-system/preview/header?previewSearchOpen=1"
                width={1200}
                height={420}
                title="Header — search flydown open"
                className="border border-border-light bg-white"
              />
            </div>

            <ClassTable
              rows={[
                { part: 'Scrim', classes: 'absolute left-0 right-0 top-full z-40 bg-navy-boldest/30', note: 'Starts at the bottom of the header (`top-full`) and runs 100vh down (inline style), so the header stays visible and usable. Lighter (30%) than the modal scrim and not blurred — this is a flydown, not a dialog. Click closes.' },
                { part: 'Panel', classes: 'absolute left-0 right-0 top-full z-50 bg-white shadow-2xl', note: 'Full-width under the header. Enters with an inline `searchSlideIn` keyframe (opacity 0 → 1, translateY −8px → 0, 0.18s) — not one of the global animations.' },
                { part: 'Search box', classes: 'flex items-stretch border-2 border-[#023e7d] bg-white', note: 'Icon, input (`type="search"`, aria-label="Site search", focused on open), Clear, and a navy “Search” link. Results list below as role="listbox".' },
                { part: 'Header while open', classes: 'sticky top-0 z-40 bg-white transition-shadow duration-300 shadow-sm z-50', note: 'The header adds `z-50` while search is open (and swaps shadow-sm for shadow-md once scrolled).' },
              ]}
            />

            <div>
              <DocLabel className="mb-2">Mobile menu — below lg</DocLabel>
              <PreviewFrame
                src="/design-system/preview/header?previewMobileOpen=1"
                width={375}
                height={640}
                title="Header — mobile menu open"
                className="border border-border-light bg-white p-6"
              />
            </div>

            <ClassTable
              rows={[
                { part: 'Root', classes: 'fixed inset-0 z-[60] lg:hidden flex flex-col bg-white', note: 'Full-screen and opaque — no scrim. Locks body scroll while open.' },
                { part: 'Top bar', classes: 'flex items-center justify-between px-5 py-3.5 border-b border-border-light flex-shrink-0', note: 'Logo, Search (closes the menu and opens the flydown), Close menu. 44px icon buttons (`w-11 h-11`).' },
                { part: 'Body', classes: 'flex-1 overflow-y-auto', note: 'Scrolls on its own; accordion of the primary nav, then utility links.' },
              ]}
            />

            <DevNote title="Gaps to close in the Drupal build">
              <p>
                <strong>Mobile menu:</strong> the prototype’s full-screen menu has no <Code>role="dialog"</Code> /{' '}
                <Code>aria-modal</Code>, no Escape handler, and does not move focus into itself. It covers the whole
                page, so treat it as a modal dialog (<Code>aria-label="Menu"</Code>), focus its first control on open,
                trap Tab, close on Escape, and return focus to the hamburger. The hamburger needs{' '}
                <Code>aria-expanded</Code> and <Code>aria-controls</Code>.
              </p>
              <p>
                <strong>Search flydown:</strong> not modal — the header above it stays interactive — so it is a
                disclosure, not a dialog. It focuses the input on open and closes on Escape and scrim click; on close,
                return focus to the search toggle (the prototype does not). The toggle already carries{' '}
                <Code>aria-expanded</Code>.
              </p>
            </DevNote>

            <SourceList title="Canonical" items={[{ path: 'src/components/layout/Header.tsx', note: 'SearchFlydown, MobileMenu' }]} />
          </div>
        </DocSection>

        {/* ─── Popovers ────────────────────────────────────────────────── */}
        <DocSection title="Popovers: share and field help">
          <div className="flex flex-col gap-8">
            <Lede>
              Small panels anchored to the button that opened them. They are not modal: the page stays scrollable
              and interactive, there is no scrim, and focus stays where it is. They close on a second click of the
              trigger, Escape, or a press anywhere outside. The share button is documented on{' '}
              <DsLink to="/design-system/buttons">Buttons</DsLink>, the field-help ⓘ on{' '}
              <DsLink to="/design-system/forms">Forms &amp; Inputs</DsLink>.
            </Lede>

            <LiveMarkup
              label="Share popover — click Share (snippet is the closed state)"
            >
              <div className="flex justify-end items-start max-w-[480px] min-h-[400px]">
                <SharePopover title="AI Warfighting: The Next Generation of Naval Strategy" url="https://www.usni.org/press/books/ai-warfighting" />
              </div>
            </LiveMarkup>

            <ClassTable
              rows={[
                { part: 'Wrapper', classes: 'relative', note: 'Anchor for the panel; outside-click is measured against it.' },
                { part: 'Trigger', classes: 'inline-flex items-center justify-center gap-2 font-body font-bold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed bg-transparent text-navy-bolder border border-navy-bolder hover:bg-navy-bright hover:text-white hover:border-navy-bright px-5 py-3 text-sm', note: 'Button outline-dark / sm. aria-expanded, aria-haspopup="dialog". Icon `fa-solid fa-arrow-up-from-bracket text-xs`.' },
                { part: 'Panel', classes: 'absolute right-0 top-full mt-3 w-64 bg-white border border-[#c4c9d4] shadow-xl z-50', note: 'role="dialog" aria-label="Share this article" (non-modal). Hangs 12px below the trigger, right-aligned to it — place the trigger near the right of its row.' },
                { part: 'Caret', classes: 'absolute -top-[9px] right-5 w-4 h-[9px] overflow-hidden pointer-events-none', note: 'Inner square `w-3 h-3 bg-white border-l border-t border-[#c4c9d4] rotate-45 translate-y-[5px] mx-auto` — a rotated square clipped to its top half, so the border continues around the point.' },
                { part: 'Header', classes: 'flex items-center justify-between px-5 py-3.5 border-b border-[#e8eaed]', note: '“Share on:” in `font-body font-bold text-xs uppercase tracking-[0.1em] text-[#1d2535]`; ✕ close `text-neutral-subtle hover:text-navy-bolder`. #e8eaed has no token (close to border-light).' },
                { part: 'Rows', classes: 'flex items-center gap-3.5 px-5 py-3.5 font-body text-[15px] text-[#1d2535] hover:bg-[#f4f6f8] transition-colors', note: 'In a `divide-y divide-[#e8eaed]` list. Social rows are links (new tab); Copy link and Email are buttons (`w-full text-left`). Icon disc `w-8 h-8 rounded-full border border-[#c4c9d4] flex items-center justify-center flex-shrink-0`.' },
              ]}
            />

            <LiveMarkup label="Field help — click the ⓘ">
              <div className="flex items-start min-h-[180px]">
                <span className="font-body font-semibold text-sm text-navy-bolder">Service</span>
                <ServiceHelpTooltip />
              </div>
            </LiveMarkup>

            <ClassTable
              rows={[
                { part: 'Panel', classes: 'absolute top-[calc(100%+8px)] z-40 w-[min(320px,calc(100vw-3rem))] bg-navy-boldest border border-navy-bold shadow-xl px-4 py-3.5 font-body font-normal text-[14px] text-white leading-relaxed', note: 'Dark, so it reads as a layer over a white form. role="status". `left-0` or `right-0` by `align`. Full anatomy on Forms.' },
              ]}
            />

            <DevNote>
              <p>
                One small Drupal behavior can drive every popover: toggle <Code>hidden</Code> on the panel and{' '}
                <Code>aria-expanded</Code> on the trigger; close on Escape (and return focus to the trigger), on{' '}
                <Code>mousedown</Code> outside the wrapper, and when another popover opens. The panels exist only while
                open in the prototype, so the snippets above show the closed state; the tables give the open
                panel’s classes.
              </p>
              <p>
                Share URLs are built from <Code>{'{{ url }}'}</Code> (the canonical URL, not the current address bar)
                and <Code>{'{{ title }}'}</Code> for the email subject. Copy link needs the Clipboard API, which only
                works over HTTPS — fall back to selecting the URL in a read-only input.
              </p>
              <p>
                The Member updates bell in the account banner is the same pattern (a dropdown panel with outside-click
                and Escape) and opens a drift copy of the Modal; it is documented on{' '}
                <DsLink to="/design-system/account">Account</DsLink>.
              </p>
            </DevNote>

            <SourceList
              title="Canonical"
              items={[
                { path: 'src/components/ui/SharePopover.tsx' },
                { path: 'src/components/ui/InfoTooltip.tsx' },
              ]}
            />
          </div>
        </DocSection>

        {/* ─── Stacking ───────────────────────────────────────────────── */}
        <DocSection title="Stacking order">
          <div className="flex flex-col gap-8">
            <Lede>
              The z-index values in use, lowest first. Dialogs and full-screen overlays share the top layer so they
              always cover the sticky header and any dropdown left open.
            </Lede>
            <ClassTable
              rows={[
                { part: 'Sticky header', classes: 'sticky top-0 z-40', note: 'Raised to z-50 while the search flydown is open.' },
                { part: 'Field help panel', classes: 'z-40', note: 'InfoTooltip.' },
                { part: 'Dropdowns', classes: 'z-50', note: 'Header mega menu and utility dropdowns, search flydown panel (z-40 scrim), SharePopover, BookSearchBar results.' },
                { part: 'Dialogs and full-screen overlays', classes: 'z-[60]', note: 'Modal, AccountDrawer, MobileMenu, member-update reader. The standard for anything with a scrim.' },
                { part: 'Drift', classes: 'z-50', note: 'CreditCardModal, BenefitModal, ArticleImageGallery lightbox — move them to z-[60].' },
              ]}
            />
            <DevNote>
              <p>
                Define these as named layers in the theme (e.g. <Code>--z-header: 40</Code>,{' '}
                <Code>--z-dropdown: 50</Code>, <Code>--z-overlay: 60</Code>) rather than repeating numbers; and keep
                Drupal’s admin toolbar (z-index 500+ in core) above them for editors.
              </p>
            </DevNote>
          </div>
        </DocSection>

        {/* ─── Accessibility contract ─────────────────────────────────── */}
        <DocSection title="Accessibility contract">
          <div className="flex flex-col gap-8">
            <Lede>
              What every modal overlay (Modal and the forms on it, the account drawer, the mobile menu) must do in
              production. The “Prototype” column says how far the React components get, so it is clear what the
              Drupal behavior has to add rather than copy.
            </Lede>

            <div className="overflow-x-auto border border-border-light bg-white">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-neutral-subtlest border-b border-border-light">
                    <th className="font-body font-bold text-xs uppercase tracking-[0.06em] text-navy-bolder px-4 py-3 w-[200px]">Requirement</th>
                    <th className="font-body font-bold text-xs uppercase tracking-[0.06em] text-navy-bolder px-4 py-3">How</th>
                    <th className="font-body font-bold text-xs uppercase tracking-[0.06em] text-navy-bolder px-4 py-3 w-[34%]">Prototype</th>
                  </tr>
                </thead>
                <tbody className="font-body text-sm text-neutral-subtle leading-relaxed">
                  {[
                    ['Dialog role', 'role="dialog" (or <dialog>) and aria-modal="true" on the root.', 'Modal, CreditCardModal, drawer, benefit/update modals, lightbox: yes. Mobile menu: missing.'],
                    ['Accessible name', 'aria-labelledby pointing at the visible heading; aria-label only when there is no heading (drawer: “Account menu”).', 'Yes, except the mobile menu. CreditCardModal’s id is a fixed string — generate unique ids.'],
                    ['Focus moves in', 'On open, focus the first field for a form, otherwise the panel (tabindex="-1") or the heading.', 'Modal focuses the panel. CreditCardModal, drawer, mobile menu, benefit/update modals: no.'],
                    ['Focus is trapped', 'Tab and Shift+Tab cycle inside the dialog; the page behind is inert (the inert attribute, or showModal()).', 'Not implemented anywhere.'],
                    ['Escape closes', 'keydown on document while open.', 'All except the mobile menu.'],
                    ['Scrim click closes', 'Click on the scrim (not the panel).', 'Yes where there is a scrim. Do not close a form dialog with unsaved input on a stray scrim click without confirming.'],
                    ['Focus returns', 'On close, focus the element that opened it (store document.activeElement on open).', 'Not implemented anywhere.'],
                    ['Scroll lock', 'body overflow hidden while open; restore on close. Account for the scrollbar width to avoid a layout shift.', 'Yes (overflow only, no scrollbar compensation).'],
                    ['Close control', 'A real <button type="button"> with an accessible name (“Close”, “Close account menu”), at least 40×40 (36 on the drawer).', 'Yes.'],
                    ['Reduced motion', 'Entry animations disabled under prefers-reduced-motion.', 'Yes for drawer-in-left / overlay-fade-in. The search flydown’s inline animation is not covered.'],
                  ].map(([req, how, proto]) => (
                    <tr key={req} className="border-b border-border-light last:border-b-0">
                      <td className="font-semibold text-navy-bolder px-4 py-3 align-top">{req}</td>
                      <td className="px-4 py-3 align-top">{how}</td>
                      <td className="px-4 py-3 align-top">{proto}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <DevNote>
              <p>
                Popovers (share, field help) are the exception: non-modal, no trap, no scroll lock — but they still
                need <Code>aria-expanded</Code> on the trigger, Escape to close, and focus returned to the trigger when
                closed from inside.
              </p>
            </DevNote>
          </div>
        </DocSection>
      </div>
    </DesignSystemLayout>
  )
}
