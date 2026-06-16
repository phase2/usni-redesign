import { NavyButtonLink } from '@/components/ui/Button'

export default function MembershipBody() {
  return (
    <section className="bg-white py-section">
      <div className="container-site">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left column — headline + body + CTA */}
          <div className="flex flex-col gap-6 lg:w-[62%]">
            <h2 className="font-headline text-5xl xl:text-[56px] text-navy-bolder leading-[1.1]">
              Dare to make a difference
            </h2>
            <div className="flex flex-col gap-4">
              <p className="font-body text-[18px] text-navy-bolder leading-[1.4]">
                U.S. Naval Institute membership is for those individuals who value unbiased reporting,
                care about national defense, appreciate naval history, and want to be connected to the
                U.S. Navy, Marine Corps and Coast Guard. All ranks and all components are represented —
                including naval reserves, government civilians, retired officers, enlisted personnel,
                veterans, and concerned citizens. The U.S. Naval Institute welcomes individuals
                interested in a strong maritime defense and those that want to contribute to the
                dialogue for the advancement of the profession.
              </p>
              <p className="font-body text-[18px] text-navy-bolder leading-[1.4]">
                The U.S. Naval Institute was founded in 1873, when Rear Admiral John L. Worden gathered
                a group of 15 like-minded naval officers who met at the U.S. Naval Academy to discuss
                the future of the U.S. Navy in the aftermath of the American Civil War. Since then, the
                naval profession has benefitted from this rich legacy of consequential writing. Add your
                voice to the "intellectual heart of the Sea Services" by joining today.
              </p>
            </div>
            <div>
              <NavyButtonLink href="/membership/join">
                Become a member today
              </NavyButtonLink>
            </div>
          </div>

          {/* Right column — Engage / Inspire / Inform callouts */}
          <div className="flex flex-col gap-12 lg:flex-1 lg:pl-4">
            {[
              {
                heading: 'Engage',
                body: 'with one another in the Independent forum to support the advancement of the Sea Services.',
              },
              {
                heading: 'Inspire',
                body: 'others through intellectual debate.',
              },
              {
                heading: 'Inform',
                body: 'your community on key issues that impact the Navy, Marine Corps, and Coast Guard.',
              },
            ].map(({ heading, body }) => (
              <div key={heading} className="flex flex-col gap-6">
                <h3 className="font-headline text-[48px] text-navy-subtle leading-[1.1]">{heading}</h3>
                <div className="h-1 w-full bg-gold-subtle" />
                <p className="font-body text-[18px] text-navy-bolder leading-[1.4]">{body}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
