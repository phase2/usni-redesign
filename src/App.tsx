import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

function ScrollToTop() {
  const { pathname } = useLocation()
  // 'instant' overrides the global scroll-behavior: smooth so route changes
  // land at the top immediately instead of animating up the old page.
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [pathname])
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
import ProceedingsArticleGrubb from '@/pages/ProceedingsArticleGrubb'
import NewsletterJoin from '@/pages/NewsletterJoin'
import DesignSystemHome from '@/pages/design-system/DesignSystemHome'
import StyleGuide from '@/pages/design-system/StyleGuide'
import DesignSystemButtons from '@/pages/design-system/Buttons'
import DesignSystemCards from '@/pages/design-system/Cards'
import DesignSystemForms from '@/pages/design-system/Forms'
import DesignSystemNavigation from '@/pages/design-system/Navigation'
import DesignSystemIconography from '@/pages/design-system/Iconography'
import HeaderPreview from '@/pages/design-system/preview/HeaderPreview'
import FooterPreview from '@/pages/design-system/preview/FooterPreview'

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
        <Route path="/proceedings/naval-aviation-got-better" element={<ProceedingsArticleGrubb />} />
        <Route path="/books/ai-warfighting" element={<BookProduct />} />
        <Route path="/archives" element={<Archives />} />
        <Route path="/naval-history/mitscher-at-midway" element={<NavalHistoryArticle />} />
        <Route path="/newsletter" element={<NewsletterJoin />} />
        <Route path="/design-system" element={<DesignSystemHome />} />
        <Route path="/design-system/style-guide" element={<StyleGuide />} />
        <Route path="/design-system/buttons" element={<DesignSystemButtons />} />
        <Route path="/design-system/cards" element={<DesignSystemCards />} />
        <Route path="/design-system/forms" element={<DesignSystemForms />} />
        <Route path="/design-system/navigation" element={<DesignSystemNavigation />} />
        <Route path="/design-system/iconography" element={<DesignSystemIconography />} />
        <Route path="/design-system/preview/header" element={<HeaderPreview />} />
        <Route path="/design-system/preview/footer" element={<FooterPreview />} />
      </Routes>
    </BrowserRouter>
    </CartProvider>
  )
}
