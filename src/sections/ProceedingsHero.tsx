import proceedingsLogo from '@/assets/images/Proceedings_logo_white.png'

const secondaryNav = [
  { label: 'Current Issue', href: '/proceedings/current' },
  { label: 'All Issues', href: '/proceedings/all-issues' },
  { label: 'Proceedings Podcast', href: '/proceedings/podcast' },
  { label: 'Essay Contests', href: '/essay-contests' },
  { label: 'American Sea Power Project', href: '/proceedings/sea-power-project' },
  { label: 'Submission Guidelines', href: '/proceedings/submissions' },
  { label: 'Contact Proceedings', href: '/proceedings/contact' },
]

export default function ProceedingsHero() {
  return (
    <>
      {/* Secondary navigation */}
      <div className="border-b-4 border-navy-boldest" style={{ backgroundColor: '#E0E0CC' }}>
        <div className="container-site">
          <div className="flex items-center justify-center h-[62px] gap-0">
            <a href="/proceedings" className="font-headline text-lg text-navy-bolder pr-6 mr-6 border-r border-navy-bolder/30 shrink-0 h-full flex items-center whitespace-nowrap">
              Proceedings
            </a>
            <nav className="flex items-center gap-6 flex-wrap">
              {secondaryNav.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="font-body font-semibold text-sm text-navy-bolder hover:text-navy-subtle transition-colors whitespace-nowrap"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="/membership/join"
                className="font-body font-bold text-sm text-navy-bold hover:text-navy transition-colors whitespace-nowrap underline underline-offset-2"
              >
                Subscribe
              </a>
            </nav>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section
        className="flex flex-col items-center justify-center py-20"
        style={{ background: 'linear-gradient(to bottom, #1d2535, #0e121a)' }}
      >
        <img
          src={proceedingsLogo}
          alt="Proceedings — U.S. Naval Institute"
          className="h-[58px] w-auto object-contain mb-8"
        />
        <p className="font-body text-white text-center text-lg leading-[1.4] max-w-[764px] px-6">
          Our flagship publication since 1874, Proceedings is the independent forum where military professionals, scholars, and strategists debate the most consequential issues facing naval and maritime defense. Every issue delivers peer-reviewed analysis, firsthand perspective, and bold argument.
        </p>
      </section>
    </>
  )
}
