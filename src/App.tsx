import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '@/pages/Home'
import Membership from '@/pages/Membership'
import MembershipJoin from '@/pages/MembershipJoin'
import Proceedings from '@/pages/Proceedings'
import Giving from '@/pages/Giving'
import Donate from '@/pages/Donate'
import ProceedingsCurrentIssue from '@/pages/ProceedingsCurrentIssue'
import BooksAndPress from '@/pages/BooksAndPress'
import ProceedingsArticle from '@/pages/ProceedingsArticle'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/membership/join" element={<MembershipJoin />} />
        <Route path="/proceedings" element={<Proceedings />} />
        <Route path="/giving" element={<Giving />} />
        <Route path="/giving/donate" element={<Donate />} />
        <Route path="/proceedings/apr-2026" element={<ProceedingsCurrentIssue />} />
        <Route path="/books" element={<BooksAndPress />} />
        <Route path="/proceedings/three-mefs" element={<ProceedingsArticle />} />
      </Routes>
    </BrowserRouter>
  )
}
