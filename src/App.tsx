import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}
import { CartProvider } from '@/context/CartContext'
import Home from '@/pages/Home'
import Membership from '@/pages/Membership'
import MembershipJoin from '@/pages/MembershipJoin'
import Proceedings from '@/pages/Proceedings'
import Giving from '@/pages/Giving'
import Donate from '@/pages/Donate'
import DonateCart from '@/pages/DonateCart'
import DonateCheckout from '@/pages/DonateCheckout'
import ProceedingsCurrentIssue from '@/pages/ProceedingsCurrentIssue'
import BooksAndPress from '@/pages/BooksAndPress'
import ProceedingsArticle from '@/pages/ProceedingsArticle'
import ProceedingsContact from '@/pages/ProceedingsContact'
import MembershipCart from '@/pages/MembershipCart'
import MembershipCheckout from '@/pages/MembershipCheckout'
import MembershipMagazineUpsell from '@/pages/MembershipMagazineUpsell'
import BookProduct from '@/pages/BookProduct'
import BooksCollection from '@/pages/BooksCollection'
import BooksNewReleases from '@/pages/BooksNewReleases'
import BooksCart from '@/pages/BooksCart'
import NavalHistory from '@/pages/NavalHistory'
import NavalHistorySubscribe from '@/pages/NavalHistorySubscribe'
import Login from '@/pages/Login'
import Archives from '@/pages/Archives'
import NavalHistoryArticle from '@/pages/NavalHistoryArticle'
import ProceedingsArticleFortifying from '@/pages/ProceedingsArticleFortifying'

export default function App() {
  return (
    <CartProvider>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/membership/join" element={<MembershipJoin />} />
        <Route path="/membership/cart" element={<MembershipCart />} />
        <Route path="/membership/checkout" element={<MembershipCheckout />} />
        <Route path="/membership/magazine-upsell" element={<MembershipMagazineUpsell />} />
        <Route path="/proceedings" element={<Proceedings />} />
        <Route path="/giving" element={<Giving />} />
        <Route path="/giving/donate" element={<Donate />} />
        <Route path="/giving/donate/cart" element={<DonateCart />} />
        <Route path="/giving/donate/checkout" element={<DonateCheckout />} />
        <Route path="/proceedings/apr-2026" element={<ProceedingsCurrentIssue />} />
        <Route path="/proceedings/contact" element={<ProceedingsContact />} />
        <Route path="/books" element={<BooksAndPress />} />
        <Route path="/books/collection" element={<BooksCollection />} />
        <Route path="/books/new-releases" element={<BooksNewReleases />} />
        <Route path="/books/cart" element={<BooksCart />} />
        <Route path="/naval-history" element={<NavalHistory />} />
        <Route path="/naval-history/subscribe" element={<NavalHistorySubscribe />} />
        <Route path="/login" element={<Login />} />
        <Route path="/proceedings/three-mefs" element={<ProceedingsArticle />} />
        <Route path="/proceedings/fortifying-digital-watch" element={<ProceedingsArticleFortifying />} />
        <Route path="/books/ai-warfighting" element={<BookProduct />} />
        <Route path="/archives" element={<Archives />} />
        <Route path="/naval-history/mitscher-at-midway" element={<NavalHistoryArticle />} />
      </Routes>
    </BrowserRouter>
    </CartProvider>
  )
}
