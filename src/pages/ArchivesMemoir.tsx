import { useParams } from 'react-router-dom'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ArchivesSubNav from '@/sections/ArchivesSubNav'
import MemoirDetail from '@/sections/MemoirDetail'
import NotFound from '@/pages/NotFound'
import { memoirs } from '@/data/memoirs'
import { memoirDetail } from '@/data/memoirDetails'

/**
 * A single memoir. Only the entries in `memoirDetails.ts` have a page so far;
 * any other slug falls through to the 404, as the cards linking to them always
 * have.
 */
export default function ArchivesMemoir() {
  const { slug = '' } = useParams()
  const memoir = memoirs.find((m) => m.slug === slug)
  const detail = memoirDetail(slug)
  if (!memoir || !detail) return <NotFound />

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <ArchivesSubNav />
        <MemoirDetail key={slug} memoir={memoir} detail={detail} />
      </main>
      <Footer />
    </div>
  )
}
