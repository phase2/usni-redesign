/**
 * Memoir pages: /archives/memoirs/<slug>.
 *
 * Transcribed from the live memoir pages (test-usni3.pantheonsite.io,
 * /archives/memoirs/<slug>, captured 9 October 2026), field for field. What
 * the listing card already carries — title, engagement, timeframe — comes from
 * `memoirs.ts` by the same slug; this file holds the rest of the page.
 *
 * - `memoirPdf` points at the production copy of the live "Read Memoir" PDF
 *   (the same /sites/default/files path).
 * - `service`, `rank`, and `status` are the live Service History &
 *   Demographics panel.
 *
 * Only the first memoir in the collection has a page so far.
 */

import duncanPortrait from '@/assets/images/memoirs/detail/robert-duncan.jpg'

export interface MemoirDetail {
  slug: string
  summary: string
  memoirPdf: string
  author: string
  submitter: string
  fullName: string
  firstName: string
  lastName: string
  portrait?: string
  portraitAlt?: string
  service: string
  rank: string
  status: string
}

const FILES = 'https://www.usni.org/sites/default/files'

export const memoirDetails: MemoirDetail[] = [
  {
    slug: 'us-navypost-military-career-capt-robert-duncan',
    summary:
      "The following is a chronological review of Capt. Robert Duncan's 30+ years of active duty in the U.S. Navy and nearly 15 years of post-military service as a defense contractor.",
    memoirPdf: `${FILES}/2022-12/Navy%20Career%20Final%20%20PDF.pdf`,
    author: 'Robert N. Duncan',
    submitter: 'Robert N. Duncan',
    fullName: 'Robert N. Duncan',
    firstName: 'Robert',
    lastName: 'Duncan',
    portrait: duncanPortrait,
    portraitAlt: 'Captain Robert Duncan',
    service: 'USN',
    rank: 'Captain',
    status: 'Retired',
  },
]

export const memoirDetail = (slug: string) => memoirDetails.find((d) => d.slug === slug)
