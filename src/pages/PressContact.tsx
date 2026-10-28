import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import BooksSubNav from '@/sections/BooksSubNav'
import PageHero from '@/sections/PageHero'
import PressContactContent from '@/sections/PressContactContent'

/**
 * Contact the Press, at /books/contact. See PressContactContent.
 */
export default function PressContact() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <BooksSubNav />
        <PageHero
          title="Contact the Naval Institute Press"
          description="Review copies, author events, trade and wholesale orders, manuscripts, and rights and permissions."
          breadcrumb={
            <Breadcrumb
              trail={[
                { label: 'Home', href: '/' },
                { label: 'Books & Press', href: '/books' },
              ]}
              current="Contact the Press"
              className="border-b border-[#C2DDFF] pb-4"
            />
          }
        />
        <PressContactContent />
      </main>
      <Footer />
    </div>
  )
}
