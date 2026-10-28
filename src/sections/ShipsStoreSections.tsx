import type { ReactNode } from 'react'
import { ButtonLink } from '@/components/ui/Button'
import ExternalLinkIcon from '@/components/ui/ExternalLinkIcon'
import apparelImage from '@/assets/images/ships-store/ships-store-apparel.jpg'
import sweatshirtsImage from '@/assets/images/ships-store/ships-store-sweatshirts.jpg'
import accessoriesImage from '@/assets/images/ships-store/ships-store-accessories.jpg'

/**
 * The Ship's Store landing, below its hero. Copy from the live page
 * (/us-naval-institutes-ships-store), kept in its order and form: one reading
 * column of prose, the shop and the member discount, a rule, then the tips
 * and where to ask. The store itself is run by Marco Promotion on its own
 * site, so every "shop" link leaves usni.org.
 */

export const STORE_URL = 'https://yourmpstore.com/us-naval-institute'
const STORE_CONTACT_URL = 'https://yourmpstore.com/us-naval-institute/contact-us'

/**
 * The store's three departments, each opening that department's page on the
 * store site. The photos are decorative (empty alt); the department name is
 * the card's heading.
 */
const categories = [
  {
    label: 'Apparel',
    href: `${STORE_URL}/shop?groupby=APPAREL`,
    image: apparelImage,
  },
  {
    label: 'Sweatshirts & Fleece',
    href: `${STORE_URL}/shop?groupby=SWEATSHIRTS--&--FLEECE`,
    image: sweatshirtsImage,
  },
  {
    label: 'Accessories',
    href: `${STORE_URL}/shop?groupby=ACCESSORIES`,
    image: accessoriesImage,
  },
]

function SectionTitle({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="font-headline text-[30px] lg:text-[40px] text-navy-bolder leading-[1.15]">
      {children}
    </h2>
  )
}

function Body({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`font-body text-base text-navy-bolder leading-[1.75] ${className}`}>{children}</p>
}

/** An off-site link in running text, with the external-link icon and its announcement. */
function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-link inline-flex items-center gap-1">
      {children}
      <ExternalLinkIcon size="0.9em" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  )
}

export function ShipsStoreContent() {
  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="container-site">
        <div className="max-w-[860px] mx-auto flex flex-col">

          {/* ── Shop ──────────────────────────────────────────────────── */}
          <div className="flex flex-col gap-6">
            {/* The live page's category strip, as a card per department in the
                site's core card: full-bleed photo, headline,
                and a full-width button. Only the button links. */}
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
              {categories.map((cat) => (
                <li key={cat.label} className="flex flex-col bg-white border border-navy-subtle">
                  <div className="aspect-[16/9] overflow-hidden bg-neutral-subtlest flex-shrink-0">
                    <img src={cat.image} alt="" width={600} height={400} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col gap-4 flex-1 p-5">
                    <h3 className="font-headline text-[26px] text-navy-bolder leading-[1.2] flex-1">
                      {cat.label}
                    </h3>
                    <ButtonLink
                      href={cat.href}
                      variant="navy"
                      size="md"
                      fullWidth
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Shop now
                      <span className="sr-only">: {cat.label} (opens in a new tab)</span>
                      <ExternalLinkIcon size="1em" />
                    </ButtonLink>
                  </div>
                </li>
              ))}
            </ul>

            <SectionTitle id="ships-store-shop-heading">Shop Our Ship&rsquo;s Store</SectionTitle>

            <Body>
              Show your U.S. Naval Institute pride wherever you go with a selection of t-shirts, hoodies, hats,
              notebooks, and more in our Ship&rsquo;s Store.
            </Body>

            <div>
              <ButtonLink href={STORE_URL} variant="navy" size="md" target="_blank" rel="noopener noreferrer">
                Shop the store
                <ExternalLinkIcon size="1.1em" />
                <span className="sr-only">(opens in a new tab)</span>
              </ButtonLink>
            </div>

            {/* Member discount — the live page's bold line and Join today link,
                in the tan card the site uses for a member offer */}
            <div className="bg-tan-subtlest p-1.5">
              <div className="border border-tan-subtle px-6 py-6 lg:px-8 flex flex-col items-start gap-4">
                <Body>
                  <strong>Members get 20% off all orders year-round.</strong> Already a member? Just watch your
                  email and Member Dashboard for the discount code.
                </Body>
                <ButtonLink href="/membership/join" variant="outline-dark" size="sm">
                  Join today
                </ButtonLink>
              </div>
            </div>

            <Body>
              The Naval Institute is a registered 501(c)(3) educational nonprofit. All proceeds from the Ship&rsquo;s
              Store will go toward funding the Naval Institute&rsquo;s mission to advance the professional, literary,
              and scientific understanding of sea power and the critical issues shaping global security.
            </Body>
            <Body>Thank you for your continued support!</Body>
          </div>

          {/* The live page's rule, in the FAQ page's 2px blue */}
          <hr className="my-12 lg:my-14 border-0 border-t-2 border-navy-bold" />

          {/* ── Tips ──────────────────────────────────────────────────── */}
          <div className="flex flex-col gap-6">
            <SectionTitle id="ships-store-tips-heading">Tips for Using Our Store</SectionTitle>

            <Body>
              <strong>You will need to make an account on the store site to make a purchase</strong>, as it is
              managed outside of usni.org.
            </Body>

            <div className="flex flex-col gap-2">
              <Body>When filling out your shipping address:</Body>
              <ul className="list-disc ml-6 flex flex-col gap-1.5 font-body text-base text-navy-bolder leading-[1.75]">
                <li>Use the autofill dropdown when it appears.</li>
                <li>Use the dropdown menu to select the state instead of typing it in.</li>
                <li>State cannot be abbreviated.</li>
              </ul>
            </div>

            <Body>
              <strong>All items are made to order</strong> and will ship in about four weeks.
            </Body>

            <Body>
              Note that we are <strong>currently unable to fulfill international shipping requests</strong>. We hope
              to add this in the near future, but for now we recommend sending to a family member or friend with a
              U.S.-based address.
            </Body>

            <Body>
              <strong>Have other questions?</strong> Contact our partner Marco Promotion directly at{' '}
              <a href="mailto:stores@marcopromos.com" className="text-link">stores@marcopromos.com</a> or via their{' '}
              <ExternalLink href={STORE_CONTACT_URL}>webform</ExternalLink>, or check our{' '}
              <a href="/faq#ships-store" className="text-link">Frequently Asked Questions</a>.
            </Body>

            <Body className="italic">
              If you&rsquo;re an active member and can&rsquo;t find the discount code in your email or usni.org
              account, please contact{' '}
              <a href="mailto:memberservices@usni.org" className="text-link">memberservices@usni.org</a>.
            </Body>
          </div>

        </div>
      </div>
    </section>
  )
}
