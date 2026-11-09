import IssueArchive, { type ArchiveIssue } from '@/sections/IssueArchive'

import aug26Cover from '@/assets/images/naval-history-magazine-aug26-cover.jpg'
import jun26Cover from '@/assets/images/naval-history-magazine-jun26-cover.jpg'
import apr26Cover from '@/assets/images/naval-history-magazine-apr26-cover.jpg'
import feb26Cover from '@/assets/images/naval-history-magazine-feb26-cover.jpg'
import dec25Cover from '@/assets/images/naval-history-magazine-dec25-cover.jpg'
import oct25Cover from '@/assets/images/naval-history-magazine-oct25-cover.jpg'
import aug25Cover from '@/assets/images/naval-history-magazine-aug25-cover.jpg'
import jun25Cover from '@/assets/images/naval-history-magazine-jun25-cover.jpg'
import apr25Cover from '@/assets/images/naval-history-magazine-apr25-cover.jpg'
import feb25Cover from '@/assets/images/naval-history-magazine-feb25-cover.jpg'
import dec24Cover from '@/assets/images/naval-history-magazine-dec24-cover.jpg'
import oct24Cover from '@/assets/images/naval-history-magazine-oct24-cover.jpg'
import aug24Cover from '@/assets/images/naval-history-magazine-aug24-cover.jpg'
import jun24Cover from '@/assets/images/naval-history-magazine-jun24-cover.jpg'
import apr24Cover from '@/assets/images/naval-history-magazine-apr24-cover.jpg'
import feb24Cover from '@/assets/images/naval-history-magazine-feb24-cover.jpg'

const issues: ArchiveIssue[] = [
  { month: 'August', year: 2026, vol: 'Volume 40, Number 4', cover: aug26Cover, href: '/naval-history/aug-2026' },
  { month: 'June', year: 2026, vol: 'Volume 40, Number 3', cover: jun26Cover, href: '#' },
  { month: 'April', year: 2026, vol: 'Volume 40, Number 2', cover: apr26Cover, href: '#' },
  { month: 'February', year: 2026, vol: 'Volume 40, Number 1', cover: feb26Cover, href: '#' },
  { month: 'December', year: 2025, vol: 'Volume 39, Number 6', cover: dec25Cover, href: '#' },
  { month: 'October', year: 2025, vol: 'Volume 39, Number 5', cover: oct25Cover, href: '#' },
  { month: 'August', year: 2025, vol: 'Volume 39, Number 4', cover: aug25Cover, href: '#' },
  { month: 'June', year: 2025, vol: 'Volume 39, Number 3', cover: jun25Cover, href: '#' },
  { month: 'April', year: 2025, vol: 'Volume 39, Number 2', cover: apr25Cover, href: '#' },
  { month: 'February', year: 2025, vol: 'Volume 39, Number 1', cover: feb25Cover, href: '#' },
  { month: 'December', year: 2024, vol: 'Volume 38, Number 6', cover: dec24Cover, href: '#' },
  { month: 'October', year: 2024, vol: 'Volume 38, Number 5', cover: oct24Cover, href: '#' },
  { month: 'August', year: 2024, vol: 'Volume 38, Number 4', cover: aug24Cover, href: '#' },
  { month: 'June', year: 2024, vol: 'Volume 38, Number 3', cover: jun24Cover, href: '#' },
  { month: 'April', year: 2024, vol: 'Volume 38, Number 2', cover: apr24Cover, href: '#' },
  { month: 'February', year: 2024, vol: 'Volume 38, Number 1', cover: feb24Cover, href: '#' },
]

// Naval History publishes six times a year, so the month filter offers only the
// months an issue can fall in — unlike the live site's shared 12-month list,
// where half the options can never return a result.
const months = ['February', 'April', 'June', 'August', 'October', 'December']

export default function NavalHistoryAllIssuesGrid() {
  return (
    <IssueArchive
      magazine="Naval History"
      issues={issues}
      years={[2026, 2025, 2024]}
      months={months}
      aspect="aspect-[2400/3175]"
    />
  )
}
