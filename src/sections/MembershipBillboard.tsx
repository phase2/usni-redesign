import navalHistoryImg from '@/assets/images/naval-history-billboard.jpg'
import orgMembershipImg from '@/assets/images/org-membership-billboard.jpg'

function CheckIcon() {
  return (
    <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 6h8M6 2l4 4-4 4" />
    </svg>
  )
}

export function NavalHistoryBillboard() {
  return (
    <div className="bg-navy-bolder flex flex-col lg:flex-row w-full">
      {/* Content — left */}
      <div className="flex-1 flex items-center p-12">
        <div className="border border-navy-bold flex flex-col gap-4 px-12 py-16 w-full">
          <div className="flex flex-col gap-2">
            <p className="font-body font-medium text-sm uppercase tracking-[0.05em] text-[#e0e0cc]">
              Naval History
            </p>
            <h3 className="font-headline text-[48px] text-white leading-[1.1]">
              Subscribe to Naval History
            </h3>
          </div>
          <p className="font-body text-xl text-white/90 leading-[1.4]">
            The world's most authoritative and engaging periodical for readers
            interested in our nautical heritage. Available as an add-on with
            your membership.
          </p>
          <div className="pt-3">
            <a
              href="/naval-history/subscribe"
              className="inline-flex items-center gap-2 bg-gold text-navy-bolder font-body font-bold text-base tracking-[-0.5px] px-6 py-4 hover:bg-gold-dark transition-colors"
            >
              Learn more about Naval History
              <CheckIcon />
            </a>
          </div>
        </div>
      </div>

      {/* Image — right */}
      <div className="flex-1 min-h-[320px] lg:min-h-0 relative overflow-hidden">
        <img
          src={navalHistoryImg}
          alt="Naval History magazine cover"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  )
}

export function OrgMembershipBillboard() {
  return (
    <div className="bg-tan-subtlest flex flex-col lg:flex-row w-full">
      {/* Image — left */}
      <div className="flex-1 min-h-[320px] lg:min-h-0 relative overflow-hidden">
        <img
          src={orgMembershipImg}
          alt="Sailors watching the horizon at sea"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Content — right */}
      <div className="flex-1 flex items-center p-12">
        <div className="border border-tan-subtle flex flex-col gap-4 px-12 py-16 w-full">
          <div className="flex flex-col gap-2">
            <p className="font-body font-medium text-sm uppercase tracking-[0.05em] text-[#0466c8]">
              More Ways to Join
            </p>
            <h3 className="font-headline text-[48px] text-navy-bolder leading-[1.1]">
              Organizational Membership
            </h3>
          </div>
          <p className="font-body text-xl text-neutral-subtle leading-[1.4]">
            Libraries and offices can receive Proceedings magazine.
            Other membership benefits do not apply.
          </p>
          <div className="pt-3">
            <a
              href="/membership/contact"
              className="inline-flex items-center gap-2 bg-navy-bold text-white font-body font-bold text-base tracking-[-0.5px] px-6 py-4 border border-navy-bold hover:bg-navy transition-colors"
            >
              Contact member services
              <CheckIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
