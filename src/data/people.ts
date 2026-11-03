import { newReleases, type Book } from '@/data/books'

/**
 * Person pages, at /people/:slug — the site's author bios.
 *
 * Transcribed from the live test site (test-usni3.pantheonsite.io/people/<slug>),
 * where each page is a title, the bio, and a "Books by …" grid. Only the AI
 * Warfighting authors exist so far; any other slug falls through to the 404.
 */
export interface Person {
  slug: string
  name: string
  /** Paragraphs. */
  bio: string[]
  books: Book[]
}

const aiWarfighting = newReleases.find((b) => b.id === 'new-ai-warfighting')!

export const people: Record<string, Person> = {
  'matthew-moellering': {
    slug: 'matthew-moellering',
    name: 'Matthew Moellering',
    bio: [
      `Major Matthew Moellering currently serves as the AI Director for U.S. Army Special Operations Command where he is responsible for integrating AI products for the warfighter. His service includes deployments to the Middle East and Afghanistan as an Infantry Platoon Leader and as a Special Forces Operational Detachment Alpha Commander. Matt earned his master’s degree from Carnegie Mellon University as a member of the second cohort of Army AI Scholars.`,
    ],
    books: [aiWarfighting],
  },
  'genna-moellering': {
    slug: 'genna-moellering',
    name: 'Genna Moellering',
    bio: [
      `Genna Moellering graduated from the United States Military Academy in 2016 and served for five years as a Military Intelligence Officer. Her service includes a deployment to Afghanistan in support of Operation Freedom’s Sentinel. She holds a master’s degree in Public Policy Management—Data Analytics from Carnegie Mellon University.`,
    ],
    books: [aiWarfighting],
  },
}

export function person(slug: string): Person | undefined {
  return people[slug]
}

/** Where a person's bio page lives. */
export function personHref(slug: string): string {
  return `/people/${slug}`
}
