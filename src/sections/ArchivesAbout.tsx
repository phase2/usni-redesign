import imgArchive from '@/assets/images/archive-feature-US-MdAnUSNI-108046019+4.webp'
import imgOralHistory from '@/assets/images/oral-history-50-feature.png'

export default function ArchivesAbout() {
  return (
    <section id="about-the-archives" className="py-16 lg:py-20 bg-white">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px] gap-10 lg:gap-16">

          {/* Left — text */}
          <div className="flex flex-col gap-6">
            <h2 className="font-headline text-4xl lg:text-5xl text-navy-bolder leading-tight">
              Preserving 150 Years of Naval History
            </h2>
            <p className="font-body text-base lg:text-lg text-neutral-subtle leading-relaxed">
              The Naval Institute Archives is located at the Naval Institute headquarters
              in Annapolis, Maryland. It contains the institutional records, oral histories,
              photographs, manuscripts, and documents of the U.S. Naval Institute dating
              from its founding in 1873 to the present.
            </p>
            <p className="font-body text-base lg:text-lg text-neutral-subtle leading-relaxed">
              The Archives is home to one of the most significant collections of naval oral
              history in the world — more than 800 recorded interviews with admirals, flag
              officers, sailors, Marines, and civilians who shaped the course of American
              sea power. Alongside these oral histories, the Archives holds thousands of
              unpublished memoirs, personal papers, and photographs donated by naval
              officers and their families.
            </p>
            <p className="font-body text-base lg:text-lg text-neutral-subtle leading-relaxed">
              Researchers, historians, veterans, and members of the public are welcome to
              access the collections. Many materials have been digitized and are available
              online or by request.
            </p>
            <div className="pt-2">
              <a
                href="/archives/contact"
                className="inline-flex items-center gap-2 font-body font-bold text-base text-[#0466c8] hover:text-navy-bolder transition-colors"
              >
                Contact the Archives for access
                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right — stacked photos */}
          <div className="hidden lg:grid grid-cols-2 gap-3 h-[560px]">
            <div className="overflow-hidden row-span-2">
              <img
                src={imgArchive}
                alt="Naval Institute Archives collection"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="overflow-hidden">
              <img
                src={imgOralHistory}
                alt="Oral history interview"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="overflow-hidden bg-navy-boldest flex items-center justify-center p-8">
              <p className="font-headline text-white text-[28px] leading-[1.2] text-center">
                Over 800 oral history interviews
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
