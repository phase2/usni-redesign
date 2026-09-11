import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import CardCta from '@/components/ui/CardCta'
import ContactCard from '@/components/ui/ContactCard'
import DonorTable from '@/components/ui/DonorTable'
import PageHero from '@/sections/PageHero'
import GivingSubNav from '@/sections/GivingSubNav'
import GivingPromoCards from '@/sections/GivingPromoCards'
import NotFound from '@/pages/NotFound'
import { givingImage, givingSubPages } from '@/data/givingSocieties'

/**
 * One template for the four Giving detail pages — the three recognition
 * societies and Corporate Partners — driven by `givingSubPages`.
 *
 * They are the same page on the live site: banner hero, optional introduction,
 * then a run of banner blocks. Four page files would have been four copies of
 * this composition, in the same way `BookSeriesPage` stands in for nine series
 * pages.
 */
export default function GivingSubPage({ slug }: { slug: string }) {
  const page = givingSubPages[slug]
  if (!page) return <NotFound />

  // Only a section front carries banner art; the rest take the light-blue
  // interior header. The breadcrumb has to follow, since one lands on a navy
  // panel and the other on the pale band.
  const onPhoto = Boolean(page.heroImage)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <GivingSubNav />

        <PageHero
          title={page.title}
          description={page.description}
          image={page.heroImage ? givingImage(page.heroImage) : undefined}
          imageAlt={page.heroImageAlt}
          breadcrumb={
            <Breadcrumb
              trail={[
                { label: 'Home', href: '/' },
                { label: 'Giving', href: '/giving' },
                ...(page.breadcrumbParent ? [page.breadcrumbParent] : []),
              ]}
              current={page.breadcrumbLabel}
              tone={onPhoto ? 'dark' : 'light'}
              className={`pb-4 border-b ${onPhoto ? 'border-white/25' : 'border-[#C2DDFF]'}`}
            />
          }
        />

        {/* The promo grid brings its own top padding, so the intro below only
            closes the white band itself when no grid follows — otherwise the
            last line would sit flush against the next section's ground. */}
        {(page.intro || page.contact) && (
          <section
            className={`bg-white pt-12 lg:pt-16 ${
              page.promos.length > 0 ? '' : 'pb-12 lg:pb-16'
            }`}
          >
            <div className="container-site">
              {/* Prose left, contact right — the arrangement the Books & Press
                  collection pages use, so someone who came only for a name to
                  write to finds it in the same place on either page. */}
              <div
                className={
                  page.contact
                    ? 'grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-10 lg:gap-16'
                    : ''
                }
              >
                {/* The heading sits in the column rather than the measure, so
                    its rule runs the full container width on a page with no
                    rail — matching every other section heading — and stops at
                    the prose column on one that has a rail. Only the reading
                    measure is constrained. */}
                <div>
                  {page.introHeading && (
                    <h2 className="font-headline text-[26px] lg:text-[32px] text-navy-bolder leading-[1.15] pb-4 border-b-2 border-[#0466C8]">
                      {page.introHeading}
                    </h2>
                  )}
                  <div
                    className={`flex flex-col gap-5 max-w-[780px] ${
                      page.introHeading ? 'mt-6' : ''
                    }`}
                  >
                    {page.intro?.map((para) => (
                      <p
                        key={para.slice(0, 40)}
                        className="font-body text-base lg:text-[17px] text-neutral-bold leading-[1.7]"
                      >
                        {para}
                      </p>
                    ))}
                    {page.introLink && (
                      <CardCta href={page.introLink.href} direction="down">
                        {page.introLink.label}
                      </CardCta>
                    )}
                  </div>
                </div>

                {page.contact && (
                  <aside>
                    <ContactCard
                      label="Contact"
                      name={page.contact.name}
                      role={page.contact.role}
                      email={page.contact.email}
                      phone={page.contact.phone}
                    />
                  </aside>
                )}
              </div>
            </div>
          </section>
        )}

        {page.promos.length > 0 && (
          <GivingPromoCards
            promos={page.promos}
            heading={page.promosHeading}
            intro={page.promosIntro}
          />
        )}

        {page.donorList && (
          <section id="donor-listing" className="bg-tan-subtlest py-12 lg:py-16 scroll-mt-32">
            <div className="container-site">
              <h2 className="font-headline text-[26px] lg:text-[32px] text-navy-bolder leading-[1.15] pb-4 border-b-2 border-[#0466C8] mb-6">
                {page.donorList.heading}
              </h2>
              <DonorTable
                donors={page.donorList.donors}
                caption={`${page.title} donors, in alphabetical order`}
              />
            </div>
          </section>
        )}
        {page.sections?.map((section) => (
          <section
            key={section.heading}
            id={section.id}
            className="bg-white py-12 lg:py-16 scroll-mt-32"
          >
            <div className="container-site">
              <h2 className="font-headline text-[26px] lg:text-[32px] text-navy-bolder leading-[1.15] pb-4 border-b-2 border-[#0466C8]">
                {section.heading}
              </h2>
              <div className="max-w-[780px] mt-6 flex flex-col gap-5">
                {section.blocks.map((block, i) =>
                  block.type === 'h3' ? (
                    /* `mt-2` on all but a leading sub-head: the gap-5 rhythm
                       reads as too tight where a clause title follows a
                       paragraph it does not belong to. */
                    <h3
                      key={i}
                      className={`font-body font-bold text-[17px] text-navy-bolder leading-snug ${
                        i > 0 ? 'mt-2' : ''
                      }`}
                    >
                      {block.text}
                    </h3>
                  ) : (
                    <p
                      key={i}
                      className="font-body text-base lg:text-[17px] text-neutral-bold leading-[1.7]"
                    >
                      {block.text}
                    </p>
                  ),
                )}
              </div>
            </div>
          </section>
        ))}

      </main>
      <Footer />
    </div>
  )
}
