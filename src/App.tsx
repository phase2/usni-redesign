import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '@/pages/Home'
import Membership from '@/pages/Membership'
import MembershipJoin from '@/pages/MembershipJoin'
import Proceedings from '@/pages/Proceedings'
import Giving from '@/pages/Giving'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/membership/join" element={<MembershipJoin />} />
        <Route path="/proceedings" element={<Proceedings />} />
        <Route path="/giving" element={<Giving />} />
      </Routes>
    </BrowserRouter>
  )
}
