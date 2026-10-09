import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { NavyButtonLink } from '@/components/ui/Button'
import ArchivesSubNav from '@/sections/ArchivesSubNav'
import PageHero from '@/sections/PageHero'
import OralHistoriesSubPageContent, {
  type OralHistoriesSubPageSlug,
} from '@/sections/OralHistoriesSubPageContent'
import imgProgramHero from '@/assets/images/oral-history-program-hero.jpg'

/**
 * The two pages the Oral Histories hero links to — /archives/oral-histories/
 * about and /place-order. Titles and hero copy are the live pages'. The About
 * hero carries two paragraphs on the live site; it keeps the first here, with
 * the second opening the body, and adds a link to Order Oral Histories. It
 * also carries the live page's banner (a reel-to-reel recorder), as the photo
 * hero with a white panel on the left; Order keeps the light-blue header.
 */
const PAGES: Record<
  OralHistoriesSubPageSlug,
  { title: string; crumb: string; description: string; image?: string }
> = {
  about: {
    title: 'The U.S. Naval Institute Oral History Program',
    crumb: 'About the Program',
    image: imgProgramHero,
    description:
      'Used in combination with documentary sources, oral histories offer a richer understanding of naval history through candid recollections and explanations rarely entered into contemporary records. In addition, they help depict the atmosphere of a particular event or era in a manner not available in official documents.',
  },
  'place-order': {
    title: 'Order Oral Histories',
    crumb: 'Order Oral Histories',
    description:
      "The library of bound volumes of transcripts are available for research or review at Beach Hall in the U.S. Naval Institute's Reference Library. Each Oral History in the collection has been indexed by subject so that researchers may obtain individual pages of transcripts dealing with their specific topic. Bound volumes of Oral Histories are available direct from Amazon.",
  },
}

export default function ArchivesOralHistoriesSubPage({ slug }: { slug: OralHistoriesSubPageSlug }) {
  const page = PAGES[slug]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <ArchivesSubNav />

        <PageHero
          title={page.title}
          description={page.description}
          image={page.image}
          panelTone="light"
          panelSide="left"
          breadcrumb={
            <Breadcrumb
              trail={[
                { label: 'Home', href: '/' },
                { label: 'Archives', href: '/archives' },
                { label: 'Oral Histories', href: '/archives/oral-histories' },
              ]}
              current={page.crumb}
              className="pb-4 border-b border-[#C2DDFF]"
            />
          }
        >
          {slug === 'about' && (
            <div className="mt-2">
              <NavyButtonLink href="/archives/oral-histories/place-order">Order Oral Histories</NavyButtonLink>
            </div>
          )}
        </PageHero>

        <OralHistoriesSubPageContent slug={slug} />
      </main>
      <Footer />
    </div>
  )
}
