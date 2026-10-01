import { useState } from 'react'

/**
 * About the Naval Institute Press — the page's body copy.
 *
 * Transcribed as the live /press/about page displays it, wording and all
 * (including "references works" and the spaced "U. S."). The prose lives here
 * as JSX rather than in `src/data` because it carries inline links — the same
 * arrangement PmeIntro and AboutMissionVision use. Live `/press/...` paths are
 * mapped onto the prototype's `/books/...` section.
 *
 * The first two paragraphs show; the rest sits behind the same See more /
 * See less toggle EssayContestsAbout uses.
 */
export default function BooksAboutIntro() {
  const [expanded, setExpanded] = useState(false)

  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="container-site">
        <div className="max-w-[760px] flex flex-col gap-5 font-body text-base lg:text-[17px] text-neutral-bold leading-[1.7]">
          <p>
            Established in 1898, the Naval Institute Press is the book-publishing
            department of the U. S. Naval Institute and a member of the Association
            of University Presses since 1949. Guides and textbooks of interest to Sea
            Service professionals, including <em>The Bluejacket’s Manual</em>, which
            was first published in 1902 and is now in its 25th edition, remain the
            core of its program.
          </p>

          <p>
            After World War II and during the Cold War, and especially in response to
            the interests of the World War II and Baby Boom generations, its list
            expanded to include significant contributions in military and naval
            history, military and naval biography, references works on the world’s
            ships, aircraft and weapons, as well as reprints of the classics of naval
            literature.
          </p>

          {/* Everything past the opening two paragraphs is behind the toggle */}
          {expanded && (
            <>
              <p>
                In the 1980s,{' '}
                <a href="/books/hunt-red-october" className="text-link">
                  <em>The Hunt for Red October</em>
                </a>{' '}
                and{' '}
                <a href="/books/flight-intruder" className="text-link">
                  <em>Flight of the Intruder</em>
                </a>
                , its first two novels, became <em>New York Times</em> bestsellers and
                the basis for feature films. Recent bestsellers include{' '}
                <a href="/books/circle-treason" className="text-link">
                  <em>
                    Circle of Treason: A CIA Account of Traitor Aldrich Ames and the Men
                    He Betrayed
                  </em>
                </a>
                , which was produced as an ABC television miniseries, and{' '}
                <a href="/books/seal-honor" className="text-link">
                  <em>
                    SEAL of Honor: Operation Red Wings and the Life of Lt. Michael P.
                    Murphy, USN
                  </em>
                </a>
                . In 2013, the{' '}
                <a href="/books/oral-histories" className="text-link">
                  U.S. Naval Institute Oral History Program
                </a>{' '}
                was reestablished as a part of the Press.
              </p>

              <p>
                In 2018, its 120th year, the Press cast its net wider, appealing to
                different and younger audiences via a partnership with the video game
                producers at <em>World of Warships</em>.
              </p>

              <p>
                The Naval Institute Press publishes some eighty books and oral histories
                each year in multiple formats. The Press employs 20 staff members and may
                be found on the second deck of Beach Hall, on the grounds of the U.S.
                Naval Academy.
              </p>
            </>
          )}

          <button
            onClick={() => setExpanded((e) => !e)}
            aria-expanded={expanded}
            className="flex items-center gap-2 font-body font-semibold text-sm text-[#023E7D] group self-start"
          >
            <span className="underline group-hover:no-underline">
              {expanded ? 'See less' : 'See more'}
            </span>
            <i
              className={`fa-solid ${expanded ? 'fa-chevron-up' : 'fa-chevron-down'} text-xs`}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </section>
  )
}
