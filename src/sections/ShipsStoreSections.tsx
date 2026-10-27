import { ButtonLink } from '@/components/ui/Button'
import ExternalLinkIcon from '@/components/ui/ExternalLinkIcon'
import categoriesImage from '@/assets/images/ships-store/ships-store-categories.png'

/**
 * The Ship's Store landing, below its hero. Copy from the live page
 * (/us-naval-institutes-ships-store); the store itself is run by Marco
 * Promotion on its own site, so every "shop" link leaves usni.org.
 */

export const STORE_URL = 'https://yourmpstore.com/us-naval-institute'
const STORE_CONTACT_URL = 'https://yourmpstore.com/us-naval-institute/contact-us'

/** An off-site link in running text, with the external-link icon and its announcement. */
function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-link inline-flex items-center gap-1">
      {children}
      <ExternalLinkIcon size="0.9em" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  )
}

/* ── Shop ───────────────────────────────────────────────────────────────── */

/**
 * What the store sells and the member discount, side by side under the
 * category image. The image is the live page's category strip — its labels are
 * part of the artwork — and, as there, the whole strip links to the store.
 */
export function ShipsStoreShop() {
  return (
    <section className="py-12 lg:py-16 bg-white" aria-labelledby="ships-store-shop-heading">
      <div className="container-site flex flex-col gap-10 lg:gap-12">
        <div className="max-w-[860px]">
          <h2
            id="ships-store-shop-heading"
            className="font-headline text-4xl lg:text-5xl text-navy-bolder leading-[1.1]"
          >
            Shop Our Ship&rsquo;s Store
          </h2>
          <p className="font-body text-base lg:text-lg text-neutral-subtle leading-relaxed mt-4">
            Show your U.S. Naval Institute pride wherever you go with a selection of t-shirts, hoodies, hats,
            notebooks, and more in our Ship&rsquo;s Store.
          </p>
        </div>

        <a
          href={STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block max-w-[1125px] w-full mx-auto hover:opacity-90 transition-opacity"
        >
          <img
            src={categoriesImage}
            alt="Shop apparel, sweatshirts and fleece, and accessories at the Ship's Store: a Naval Institute black t-shirt, white hoodie, and white notebook."
            width={1125}
            height={241}
            className="w-full h-auto"
          />
          <span className="sr-only">(opens in a new tab)</span>
        </a>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Member discount — the tan card the site uses for a member offer */}
          <div className="bg-tan-subtlest p-1.5">
            <div className="border border-tan-subtle p-6 lg:p-8 flex flex-col items-start gap-4">
              <p className="eyebrow text-navy-subtle">Member benefit</p>
              <h3 className="font-headline text-[28px] lg:text-[32px] text-navy-bolder leading-[1.15]">
                Members get 20% off all orders year-round
              </h3>
              <p className="font-body text-base text-neutral-subtle leading-relaxed">
                Already a member? Just watch your email and Member Dashboard for the discount code.
              </p>
              <ButtonLink href="/membership/join" variant="navy" size="md">
                Join today
              </ButtonLink>
            </div>
          </div>

          <div className="flex flex-col gap-4 font-body text-base lg:text-lg text-neutral-subtle leading-relaxed">
            <p>
              The Naval Institute is a registered 501(c)(3) educational nonprofit. All proceeds from the Ship&rsquo;s
              Store will go toward funding the Naval Institute&rsquo;s mission to advance the professional, literary,
              and scientific understanding of sea power and the critical issues shaping global security.
            </p>
            <p>Thank you for your continued support!</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Tips ───────────────────────────────────────────────────────────────── */

const tips: { icon: string; title: string; body: React.ReactNode }[] = [
  {
    icon: 'fa-user',
    title: 'Create a store account',
    body: (
      <p>
        You will need to make an account on the store site to make a purchase, as it is managed outside of
        usni.org.
      </p>
    ),
  },
  {
    icon: 'fa-location-dot',
    title: 'Enter your shipping address',
    body: (
      <ul className="list-disc ml-5 flex flex-col gap-1.5">
        <li>Use the autofill dropdown when it appears.</li>
        <li>Use the dropdown menu to select the state instead of typing it in.</li>
        <li>State cannot be abbreviated.</li>
      </ul>
    ),
  },
  {
    icon: 'fa-clock',
    title: 'Made to order',
    body: <p>All items are made to order and will ship in about four weeks.</p>,
  },
  {
    icon: 'fa-truck',
    title: 'U.S. addresses only',
    body: (
      <p>
        We are currently unable to fulfill international shipping requests. We hope to add this in the near future,
        but for now we recommend sending to a family member or friend with a U.S.-based address.
      </p>
    ),
  },
]

/** The live page's "Tips For Using Our Store", one card per tip. */
export function ShipsStoreTips() {
  return (
    <section className="py-12 lg:py-16 bg-surface-subtle" aria-labelledby="ships-store-tips-heading">
      <div className="container-site">
        <h2
          id="ships-store-tips-heading"
          className="font-headline text-[26px] lg:text-[32px] text-navy-bolder leading-[1.15] pb-4 border-b-2 border-[#0466C8] mb-8"
        >
          Tips for Using Our Store
        </h2>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tips.map((tip) => (
            <li key={tip.title} className="flex flex-col gap-4 bg-white border border-border-light p-6">
              <span
                className="flex items-center justify-center w-10 h-10 bg-navy-bolder text-white"
                aria-hidden="true"
              >
                <i className={`fa-solid ${tip.icon} text-base`} />
              </span>
              <h3 className="font-headline text-[22px] text-navy-bolder leading-[1.2]">{tip.title}</h3>
              <div className="font-body text-[15px] text-neutral-bold leading-[1.7]">{tip.body}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ── Help ───────────────────────────────────────────────────────────────── */

/**
 * Where to go with a question. The live page runs these together in one
 * paragraph; split by who answers them, since orders go to the store's
 * operator and discount codes to Member Services.
 */
export function ShipsStoreHelp() {
  return (
    <section className="py-12 lg:py-16 bg-white" aria-labelledby="ships-store-help-heading">
      <div className="container-site">
        <h2
          id="ships-store-help-heading"
          className="font-headline text-[26px] lg:text-[32px] text-navy-bolder leading-[1.15] pb-4 border-b-2 border-[#0466C8] mb-8"
        >
          Have Other Questions?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 font-body text-base text-neutral-subtle leading-relaxed">
          <div className="flex flex-col gap-2">
            <h3 className="font-body font-bold text-[17px] text-navy-bolder">Orders and shipping</h3>
            <p>
              Contact our partner Marco Promotion directly at{' '}
              <a href="mailto:stores@marcopromos.com" className="text-link">stores@marcopromos.com</a> or via
              their <ExternalLink href={STORE_CONTACT_URL}>webform</ExternalLink>.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-body font-bold text-[17px] text-navy-bolder">Your member discount code</h3>
            <p>
              If you&rsquo;re an active member and can&rsquo;t find the discount code in your email or usni.org
              account, please contact{' '}
              <a href="mailto:memberservices@usni.org" className="text-link">memberservices@usni.org</a>.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-body font-bold text-[17px] text-navy-bolder">Frequently asked questions</h3>
            <p>
              Discount tiers, delivery times, checkout errors, and more are answered in the{' '}
              <a href="/faq#ships-store" className="text-link">Ship&rsquo;s Store FAQs</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
