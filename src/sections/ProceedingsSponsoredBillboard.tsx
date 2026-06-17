import sponsoredImg from '@/assets/images/booz-allen-sponsored.png'
import sponsorLogoImg from '@/assets/images/booz-allen-logo.png'

export default function ProceedingsSponsoredBillboard() {
  return (
    <section
      className="py-10 lg:py-16"
      style={{ background: 'linear-gradient(232deg, #ffffff 35%, #f4f4f6 100%)' }}
    >
      <div className="container-site">
        <div className="flex flex-col lg:flex-row items-stretch bg-tan-subtlest border border-tan-subtle overflow-hidden">
          {/* Image */}
          <div className="relative w-full lg:w-1/2 flex-none overflow-hidden" style={{ minHeight: '220px' }}>
            <img
              src={sponsoredImg}
              alt="Sponsored content"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-white px-2 py-2 flex flex-col gap-1">
              <p className="font-body font-medium text-xs text-neutral-subtle uppercase tracking-widest">
                Sponsored by
              </p>
              <img
                src={sponsorLogoImg}
                alt="Booz Allen Hamilton"
                className="w-[134px] h-auto object-contain"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 flex items-center p-6 lg:p-12">
            <div className="border border-tan-subtle p-6 lg:p-12 flex flex-col gap-4 w-full">
              <div className="flex flex-col gap-2">
                <p className="font-body font-medium text-xs text-navy-subtle uppercase tracking-widest">
                  Sponsored Content
                </p>
                <h2 className="font-headline text-2xl lg:text-3xl text-navy-bolder leading-[1.1]">
                  Extending the MOC's Reach: How Marines Can Keep the Fleet Connected—From Land to Sea
                </h2>
              </div>
              <p className="font-body text-base text-neutral-subtle leading-relaxed">
                Advanced edge networks—supported by AI agents—are 21st-century characteristics of how the Navy and Marines can campaign more closely together to close kill chains and enable seamless operations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-3">
                <a
                  href="/proceedings/sponsored/moc-reach"
                  className="inline-flex items-center justify-center bg-navy-bold text-white font-body font-bold text-sm tracking-[-0.3px] px-5 py-3.5 border border-navy-bold hover:bg-navy transition-colors"
                >
                  Read this article
                </a>
                <a
                  href="/proceedings/sponsored"
                  className="inline-flex items-center justify-center bg-transparent text-navy-bolder font-body font-bold text-sm tracking-[-0.3px] px-5 py-3.5 border border-navy-bolder hover:bg-navy-bolder hover:text-white transition-colors"
                >
                  See all sponsored content
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
