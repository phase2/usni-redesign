import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BooksSubNav from '@/sections/BooksSubNav'
import PageHero from '@/sections/PageHero'
import Breadcrumb from '@/components/ui/Breadcrumb'
import NavalScienceGlossaryContent from '@/sections/NavalScienceGlossaryContent'

/**
 * Glossary of Naval Skills Terms, at /books/online/naval-science-3/glossary.
 *
 * The live page is chapter 12 of the Naval Science 3 online book
 * (/press/books/online/naval-science-3-3rd-edition-2023/naval-science-3-3rd-edition-2023-12),
 * shown there in the Proceedings article template. Here it is a basic page:
 * the light-blue `PageHero` band with the live breadcrumb, then the glossary.
 */
export default function BooksNavalScienceGlossary() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <BooksSubNav />

        <PageHero
          title="Glossary of Naval Skills Terms"
          breadcrumb={
            <Breadcrumb
              trail={[
                { label: 'Home', href: '/' },
                { label: 'Books & Press', href: '/books' },
              ]}
              current="Glossary of Naval Skills Terms"
              className="border-b border-[#C2DDFF] pb-4"
            />
          }
        />

        <NavalScienceGlossaryContent />
      </main>
      <Footer />
    </div>
  )
}
