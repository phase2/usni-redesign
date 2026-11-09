import IssueArchive, { type ArchiveIssue } from '@/sections/IssueArchive'

import aug26Cover from '@/assets/images/proceedings-magazine-aug26-cover.png'
import jul26Cover from '@/assets/images/proceedings-magazine-jul26-cover.png'
import jun26Cover from '@/assets/images/proceedings-magazine-jun26-cover.png'
import may26Cover from '@/assets/images/proceedings-magazine-may26-cover.png'
import apr26Cover from '@/assets/images/proceedings-magazine-april-cover.png'
import mar26Cover from '@/assets/images/proceedings-magazine-march-cover.png'
import feb26Cover from '@/assets/images/proceedings-magazine-feb-cover.png'
import jan26Cover from '@/assets/images/proceedings-magazine-jan26-cover.png'
import dec25Cover from '@/assets/images/proceedings-magazine-dec25-cover.png'
import nov25Cover from '@/assets/images/proceedings-magazine-nov25-cover.png'
import oct25Cover from '@/assets/images/proceedings-magazine-oct25-cover.png'
import sep25Cover from '@/assets/images/proceedings-magazine-sept25-cover.png'
import aug25Cover from '@/assets/images/proceedings-magazine-aug25-cover.png'
import jul25Cover from '@/assets/images/proceedings-magazine-jul25-cover.png'
import jun25Cover from '@/assets/images/proceedings-magazine-jun25-cover.png'
import may25Cover from '@/assets/images/proceedings-magazine-may25-cover.png'

const issues: ArchiveIssue[] = [
  { month: 'August', year: 2026, vol: 'Vol. 152/8/1,482', cover: aug26Cover, href: '#' },
  { month: 'July', year: 2026, vol: 'Vol. 152/7/1,481', cover: jul26Cover, href: '#' },
  { month: 'June', year: 2026, vol: 'Vol. 152/6/1,480', cover: jun26Cover, href: '#' },
  { month: 'May', year: 2026, vol: 'Vol. 152/5/1,479', cover: may26Cover, href: '#' },
  { month: 'April', year: 2026, vol: 'Vol. 152/4/1,478', cover: apr26Cover, href: '/proceedings/apr-2026' },
  { month: 'March', year: 2026, vol: 'Vol. 152/3/1,477', cover: mar26Cover, href: '#' },
  { month: 'February', year: 2026, vol: 'Vol. 152/2/1,476', cover: feb26Cover, href: '#' },
  { month: 'January', year: 2026, vol: 'Vol. 152/1/1,475', cover: jan26Cover, href: '#' },
  { month: 'December', year: 2025, vol: 'Vol. 151/12/1,474', cover: dec25Cover, href: '#' },
  { month: 'November', year: 2025, vol: 'Vol. 151/11/1,473', cover: nov25Cover, href: '#' },
  { month: 'October', year: 2025, vol: 'Vol. 151/10/1,472', cover: oct25Cover, href: '#' },
  { month: 'September', year: 2025, vol: 'Vol. 151/9/1,471', cover: sep25Cover, href: '#' },
  { month: 'August', year: 2025, vol: 'Vol. 151/8/1,470', cover: aug25Cover, href: '#' },
  { month: 'July', year: 2025, vol: 'Vol. 151/7/1,469', cover: jul25Cover, href: '#' },
  { month: 'June', year: 2025, vol: 'Vol. 151/6/1,468', cover: jun25Cover, href: '#' },
  { month: 'May', year: 2025, vol: 'Vol. 151/5/1,467', cover: may25Cover, href: '#' },
]

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export default function ProceedingsAllIssuesGrid() {
  return (
    <IssueArchive
      magazine="Proceedings"
      issues={issues}
      years={[2026, 2025]}
      months={months}
      aspect="aspect-[534/728]"
      footer={
        /* Donor credit */
        <div className="flex items-center justify-center gap-3 bg-[#EBF4FF] border border-[#C2DDFF] px-6 py-4 mt-12">
          <i className="fa-solid fa-circle-info text-navy-bolder text-[18px] flex-shrink-0" aria-hidden="true" />
          <p className="font-body font-bold text-base text-navy-bolder">
            Digital <em>Proceedings</em> content made possible by a gift from CAPT Roger Ekman, USN (Ret.)
          </p>
        </div>
      }
    />
  )
}
