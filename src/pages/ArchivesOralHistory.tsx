import { useParams } from 'react-router-dom'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ArchivesSubNav from '@/sections/ArchivesSubNav'
import OralHistoryDetail from '@/sections/OralHistoryDetail'
import NotFound from '@/pages/NotFound'
import { oralHistories } from '@/data/oralHistories'
import { oralHistoryDetail } from '@/data/oralHistoryDetails'

/**
 * A single oral history. Only the entries in `oralHistoryDetails.ts` have a
 * page so far; any other slug falls through to the 404, as the cards linking
 * to them always have.
 */
export default function ArchivesOralHistory() {
  const { slug = '' } = useParams()
  const entry = oralHistories.find((h) => h.slug === slug)
  const detail = oralHistoryDetail(slug)
  if (!entry || !detail) return <NotFound />

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <ArchivesSubNav />
        <OralHistoryDetail key={slug} entry={entry} detail={detail} />
      </main>
      <Footer />
    </div>
  )
}
