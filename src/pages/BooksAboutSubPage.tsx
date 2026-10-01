import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BooksSubNav from '@/sections/BooksSubNav'
import PageHero from '@/sections/PageHero'
import Breadcrumb from '@/components/ui/Breadcrumb'
import BooksAboutSubPageContent, {
  type BooksAboutSubPageSlug,
} from '@/sections/BooksAboutSubPageContent'
import imgAiHero from '@/assets/images/AdobeStock_191892422_extended.png'

/**
 * One basic-page template for the three pages linked from About the Press.
 *
 * Routed under /books/about/<slug> so the Books sub-nav keeps "About the Press"
 * active on them. The header is `PageHero`, with About the Press as the
 * breadcrumb parent. None of the live pages has a lede; the AI page's opening
 * paragraph was lifted out of the body to serve as one. Examination
 * Requests and Writing take the light-blue header; the AI page alone carries
 * artwork, so it gets the photo hero with a white panel on the right, over the
 * image's empty dark half.
 */
const PAGES: Record<
  BooksAboutSubPageSlug,
  { title: string; crumb: string; description?: string; image?: string }
> = {
  'examination-requests': { title: 'Examination Requests', crumb: 'Examination Requests' },
  writing: { title: 'Writing for the Naval Institute Press', crumb: 'Writing for the Press' },
  ai: {
    title: 'Artificial Intelligence at Naval Institute Press',
    crumb: 'Artificial Intelligence',
    description:
      'Naval Institute Press uses artificial intelligence (AI) in a controlled, secure environment to support publishing operations and improve how our books reach readers.',
    image: imgAiHero,
  },
}

export default function BooksAboutSubPage({ slug }: { slug: BooksAboutSubPageSlug }) {
  const page = PAGES[slug]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <BooksSubNav />

        <PageHero
          title={page.title}
          description={page.description}
          image={page.image}
          panelTone="light"
          breadcrumb={
            <Breadcrumb
              trail={[
                { label: 'Home', href: '/' },
                { label: 'Books & Press', href: '/books' },
                { label: 'About the Press', href: '/books/about' },
              ]}
              current={page.crumb}
              className="border-b border-[#C2DDFF] pb-4"
            />
          }
        />

        <BooksAboutSubPageContent slug={slug} />
      </main>
      <Footer />
    </div>
  )
}
