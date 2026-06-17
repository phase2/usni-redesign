import { magazineIssues } from '@/data/proceedings'

export default function ProceedingsIssueArchive() {
  const allIssues = magazineIssues.slice(0, 8)

  return (
    <section
      className="py-16 lg:py-20"
      style={{ background: 'linear-gradient(65deg, #ebf4ff 8%, #ffffff 73%)' }}
    >
      <div className="container-site">
        <h2 className="font-headline text-4xl lg:text-[56px] text-navy-bolder text-center leading-[1.1] mb-10">
          Issue Archive
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 mb-10">
          {allIssues.map((issue, i) => (
            <a
              key={issue.month}
              href={issue.href}
              className={`flex flex-col gap-4 group${i >= 4 ? ' hidden lg:flex' : ''}`}
            >
              <div className="aspect-[2363/3225] bg-neutral-subtlest overflow-hidden">
                <img
                  src={issue.cover}
                  alt={`Proceedings ${issue.month}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-headline text-xl lg:text-2xl text-navy-bolder leading-[1.1]">{issue.month}</p>
                <p className="font-body text-sm text-neutral-subtle">{issue.vol}</p>
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <a
            href="/proceedings/archive"
            className="inline-flex items-center justify-center bg-navy-bold text-white font-body font-bold text-sm tracking-[-0.3px] px-8 py-3.5 border border-navy-bold hover:bg-navy transition-colors w-full sm:w-[350px]"
          >
            View the full archive
          </a>
        </div>
      </div>
    </section>
  )
}
