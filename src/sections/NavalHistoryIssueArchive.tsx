import { magazineIssues } from '@/data/naval-history'

export default function NavalHistoryIssueArchive() {
  const row1 = magazineIssues.slice(0, 4)
  const row2 = magazineIssues.slice(4, 8)

  return (
    <section
      className="py-16 lg:py-20"
      style={{ background: 'linear-gradient(65deg, #ebf4ff 8%, #ffffff 73%)' }}
    >
      <div className="container-site">
        <h2 className="font-headline text-5xl lg:text-[56px] text-navy-bolder text-center leading-[1.1] mb-10">
          Issue Archive
        </h2>

        {/* Row 1 */}
        <div className="flex gap-8 items-start mb-8">
          {row1.map((issue, i) => (
            <>
              {i > 0 && <div key={`sep-${i}`} className="w-px bg-border-light self-stretch flex-none" />}
              <a key={issue.month} href={issue.href} className="flex-1 min-w-0 flex flex-col gap-4 group">
                <div className="aspect-[2363/3225] bg-neutral-subtlest overflow-hidden">
                  <img
                    src={issue.cover}
                    alt={`Naval History ${issue.month}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-headline text-2xl text-navy-bolder leading-[1.1]">{issue.month}</p>
                  <p className="font-body text-sm text-neutral-subtle">{issue.vol}</p>
                </div>
              </a>
            </>
          ))}
        </div>

        {/* Row 2 */}
        <div className="flex gap-8 items-start mb-10">
          {row2.map((issue, i) => (
            <>
              {i > 0 && <div key={`sep2-${i}`} className="w-px bg-border-light self-stretch flex-none" />}
              <a key={issue.month} href={issue.href} className="flex-1 min-w-0 flex flex-col gap-4 group">
                <div className="aspect-[2363/3225] bg-neutral-subtlest overflow-hidden">
                  <img
                    src={issue.cover}
                    alt={`Naval History ${issue.month}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-headline text-2xl text-navy-bolder leading-[1.1]">{issue.month}</p>
                  <p className="font-body text-sm text-neutral-subtle">{issue.vol}</p>
                </div>
              </a>
            </>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <a
            href="/naval-history/archive"
            className="inline-flex items-center justify-center bg-navy-bold text-white font-body font-bold text-sm tracking-[-0.3px] px-8 py-3.5 border border-navy-bold hover:bg-navy transition-colors w-[350px]"
          >
            View the full archive
          </a>
        </div>
      </div>
    </section>
  )
}
