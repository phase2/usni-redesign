import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CartItems from '@/sections/CartItems'
import MembershipFAQ from '@/sections/MembershipFAQ'

export default function MembershipCart() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Cart page hero */}
        <section className="bg-[#ebf4ff] py-20">
          <div className="container-site">
            <h1 className="font-headline text-[64px] text-[#1d2535] leading-[1.1] text-center">
              Cart
            </h1>
          </div>
        </section>

        <CartItems />
        <MembershipFAQ />
      </main>
      <Footer />
    </div>
  )
}
