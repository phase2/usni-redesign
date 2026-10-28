import { ButtonLink } from '@/components/ui/Button'
import ExternalLinkIcon from '@/components/ui/ExternalLinkIcon'
import { advertisingContact } from '@/data/contact'
import { DetailBlock, EmailLink, PhoneLink } from '@/sections/ContactSections'

/**
 * Advertise With Us, at /advertise.
 *
 * The live /advertise-us is a sales page, not a contact page: the media kit,
 * the case for the audience, the sales contact, and the terms. The live page
 * embeds the media kit from Scribd; here it is a link out. The copy's figures
 * (2019 and 2020) want refreshing from the 2026 kit.
 */

function External({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-link inline-flex items-center gap-1.5">
      {children}
      <ExternalLinkIcon />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  )
}

export default function AdvertiseContent() {
  return (
    <>
      <section className="bg-white py-12 lg:py-16">
        <div className="container-site grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-10 lg:gap-14 items-start">
          <div className="max-w-[760px] flex flex-col gap-5 font-body text-base lg:text-lg text-navy-bolder leading-[1.75]">
            <h2 className="font-headline text-[30px] lg:text-[40px] leading-[1.15] mb-1">Reach the right audience by advertising with the Naval Institute</h2>
            <p>
              For a century and a half, the Naval Institute has created impact and outcomes that have underpinned
              the success of the Navy, Marine Corps, and Coast Guard. It&rsquo;s a serious mission, and end users,
              decision makers, and influencers know that when they need their ideas to make a difference, they need
              the Naval Institute.
            </p>
            <p>
              As a result of its unique forum, the Naval Institute&rsquo;s content platforms combine heritage,
              immediacy, relevance, and state-of-the-art tools to provide advertisers with the best way to reach
              their key audiences.
            </p>
            <p>
              Military readers consistently rank <em>Proceedings</em> as a &ldquo;must read&rdquo; and as the
              &ldquo;most credible,&rdquo; &ldquo;most relevant,&rdquo; and &ldquo;most important&rdquo; among all
              military journals. For this reason, Institute media command great respect. Virtually every major news
              organization has quoted or linked to the U.S. Naval Institute as an authoritative source, doing so more
              than 500,000 times in 2019 alone. With the launch of its daily news site,{' '}
              <External href="https://news.usni.org/">USNI News</External>, the Institute has expanded its reach,
              achieving more than two million page views per month during 2020. It has become a source of sources
              for the media, domestic and international.
            </p>
            <p className="text-base">
              <External href={advertisingContact.termsHref}>
                U.S. Naval Institute Standard Terms and Conditions for Advertising Services
              </External>
            </p>
          </div>

          <aside aria-label="Advertising sales" className="flex flex-col gap-6 lg:sticky lg:top-[120px]">
            <div className="bg-tan-subtlest p-1.5">
              <div className="border border-tan-subtle p-6 flex flex-col gap-4">
                <h2 className="font-headline text-[24px] text-navy-bolder leading-tight">2026 Media Planner</h2>
                <p className="font-body text-[15px] text-neutral-bold leading-[1.6]">
                  The Naval Institute&rsquo;s 2026 media kit, published on Scribd.
                </p>
                <ButtonLink href={advertisingContact.mediaKitHref} variant="navy" size="md" fullWidth
                  target="_blank" rel="noopener noreferrer">
                  View the 2026 media kit
                  <span className="sr-only"> (opens in a new tab)</span>
                  <ExternalLinkIcon size="1em" />
                </ButtonLink>
              </div>
            </div>

            <div className="border border-navy-subtle bg-white p-6 flex flex-col gap-4">
              <h2 className="font-headline text-[24px] text-navy-bolder leading-tight">Talk to our sales team</h2>
              <div>
                <p className="font-body font-bold text-base text-navy-bolder">{advertisingContact.name}</p>
                <p className="font-body text-sm text-neutral-subtle leading-snug">{advertisingContact.role}</p>
              </div>
              <DetailBlock title="Email">
                <EmailLink email={advertisingContact.email} />
              </DetailBlock>
              <DetailBlock title="Telephone">
                <PhoneLink number={advertisingContact.phone} />
              </DetailBlock>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
