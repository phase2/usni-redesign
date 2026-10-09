import { useId, useState } from 'react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import AdUnit from '@/components/ui/AdUnit'
import { ButtonLink } from '@/components/ui/Button'
import ExternalLinkIcon from '@/components/ui/ExternalLinkIcon'
import SharePopover from '@/components/ui/SharePopover'
import Eyebrow from '@/components/ui/Eyebrow'
import TabNav, { panelId, tabId } from '@/components/ui/TabNav'
import type { OralHistory } from '@/data/oralHistories'
import type {
  OralHistoryDetail as Detail,
  OralHistoryExcerpt,
  OralHistoryVolume,
} from '@/data/oralHistoryDetails'

/**
 * One oral history — /archives/oral-histories/<slug>.
 *
 * The live page (/press/oral-histories/<slug>) is a portrait beside the
 * biography, an "Order Oral History" button, an optional audio excerpt, and an
 * "About this Volume" accordion behind a row of jump links. The redesign keeps
 * the same parts in the same order, but:
 *
 * - the order button and share sit under the name, where the book pages put
 *   theirs, rather than after the biography;
 * - the "About this Volume" copy is kept word for word, under the live
 *   headings; a history in two or more volumes puts each behind a tab, in
 *   place of the live page's jump links;
 * - the excerpt's transcript stays behind a toggle, as on the live page.
 */

function Excerpt({ excerpt }: { excerpt: OralHistoryExcerpt }) {
  const [open, setOpen] = useState(false)
  const transcriptId = useId()
  const { image } = excerpt
  const player =
    'https://w.soundcloud.com/player/?url=' +
    encodeURIComponent(`https://api.soundcloud.com/tracks/${excerpt.soundcloudTrackId}`) +
    '&color=%23023e7d&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false'

  return (
    <section aria-labelledby="excerpt-heading" className="bg-surface-subtle py-12 lg:py-16">
      <div className="container-site">
        <div
          className={`grid grid-cols-1 gap-8 xl:gap-12 items-start ${
            image.portrait ? 'md:grid-cols-[220px_1fr] lg:grid-cols-[260px_1fr]' : 'lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]'
          }`}
        >
          <figure className={`flex flex-col gap-3 ${image.portrait ? 'max-w-[260px]' : ''}`}>
            <img src={image.src} alt={image.alt} loading="lazy" className="w-full h-auto border border-border-light bg-white" />
            {image.caption && (
              <figcaption
                className="font-body text-sm text-neutral-subtle leading-snug"
                dangerouslySetInnerHTML={{ __html: image.caption }}
              />
            )}
          </figure>

          <div className="flex flex-col gap-4 min-w-0">
            <Eyebrow>Listen to an excerpt</Eyebrow>
            <h2 id="excerpt-heading" className="font-headline text-[28px] lg:text-[36px] text-navy-bolder leading-[1.15]">
              {excerpt.title}
            </h2>
            <p className="font-body text-base lg:text-[17px] text-neutral-bold leading-[1.7]">{excerpt.intro}</p>

            <iframe
              title={`SoundCloud player: ${excerpt.title}`}
              width="100%"
              height="166"
              scrolling="no"
              frameBorder="no"
              loading="lazy"
              allow="autoplay"
              src={player}
              className="mt-2 bg-white"
            />

            <div className="border-t border-border-light pt-4">
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls={transcriptId}
                className="flex items-center gap-2 font-body font-semibold text-base text-link"
              >
                <i className={`fa-solid ${open ? 'fa-minus' : 'fa-plus'} text-sm`} aria-hidden="true" />
                {open ? 'Hide excerpt transcript' : 'Read excerpt transcript'}
              </button>

              <div id={transcriptId} hidden={!open} className="mt-5 bg-white border-l-4 border-[#0466c8] px-5 py-5 lg:px-7 lg:py-6">
                <div className="flex flex-col gap-4 font-body text-base text-neutral-bold leading-[1.7]">
                  {excerpt.transcript.map((line, i) => (
                    <p key={i}>
                      <strong className="font-semibold text-navy-bolder">{line.speaker}:</strong>{' '}
                      <span dangerouslySetInnerHTML={{ __html: line.text }} />
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function VolumeBody({ volume }: { volume: OralHistoryVolume }) {
  return (
    <>
      <p className="font-body text-base lg:text-[17px] text-neutral-bold leading-[1.7] max-w-[860px]">{volume.text}</p>
      {volume.indexPdf && (
        <ButtonLink
          href={volume.indexPdf}
          variant="navy"
          size="sm"
          target="_blank"
          rel="noopener noreferrer"
          className="self-start"
        >
          <i className="fa-regular fa-file-pdf text-base" aria-hidden="true" />
          Download Volume Index
          <span className="sr-only">(PDF, opens in a new tab)</span>
        </ButtonLink>
      )}
    </>
  )
}

/** A single-volume history: the live heading over a full-width rule. */
function Volume({ volume }: { volume: OralHistoryVolume }) {
  const headingId = useId()
  return (
    <div role="group" aria-labelledby={headingId} className="flex flex-col gap-5">
      <h2
        id={headingId}
        className="font-headline text-[28px] lg:text-[36px] text-navy-bolder leading-[1.15] pb-4 border-b border-tan"
      >
        {volume.heading}
      </h2>
      <VolumeBody volume={volume} />
    </div>
  )
}

/**
 * Two or more volumes: one tab each, labelled with the live heading ("About
 * Volume I"), in place of the live page's jump links.
 */
function VolumeTabs({ volumes }: { volumes: OralHistoryVolume[] }) {
  const tabs = volumes.map((v, i) => ({ id: `volume-${i + 1}`, label: v.heading }))
  const [activeId, setActiveId] = useState(tabs[0].id)
  const active = volumes[tabs.findIndex((t) => t.id === activeId)]

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-headline text-[28px] lg:text-[36px] text-navy-bolder leading-[1.15]">
        About the Volumes
      </h2>
      <TabNav tabs={tabs} activeId={activeId} onChange={setActiveId} label="Volumes" />
      <div
        role="tabpanel"
        id={panelId(activeId)}
        aria-labelledby={tabId(activeId)}
        tabIndex={0}
        className="flex flex-col gap-5 focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        <VolumeBody volume={active} />
      </div>
    </div>
  )
}

export default function OralHistoryDetail({ entry, detail }: { entry: OralHistory; detail: Detail }) {
  return (
    <>
      <section className="bg-white pt-8 pb-12 lg:pt-10 lg:pb-16">
        <div className="container-site">
          <Breadcrumb
            trail={[
              { label: 'Home', href: '/' },
              { label: 'Archives', href: '/archives' },
              { label: 'Oral Histories', href: '/archives/oral-histories' },
            ]}
            current={detail.displayName}
            className="pb-4 border-b border-border-light"
          />

          {/* The live page carries a top-of-page ad slot (usni-site-top). */}
          <AdUnit size="leaderboard" className="mb-2" />

          <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] lg:grid-cols-[320px_1fr] xl:grid-cols-[380px_1fr] gap-8 lg:gap-12 xl:gap-16 items-start">
            <div className="max-w-[380px] bg-surface-subtle">
              <img src={detail.portrait} alt={detail.portraitAlt} className="w-full aspect-[4/5] object-cover object-top" />
            </div>

            <div className="flex flex-col gap-6 min-w-0">
              <div className="flex flex-col gap-2">
                <Eyebrow>Oral History</Eyebrow>
                <h1 className="font-headline text-[40px] lg:text-[52px] text-navy-bolder leading-[1.05]">
                  {detail.displayName}
                </h1>
                {entry.subtitle && (
                  <p className="font-body text-lg lg:text-xl text-navy-subtle leading-snug">{entry.subtitle}</p>
                )}
                {entry.dates && <p className="font-body font-bold text-base text-navy-bolder mt-1">{entry.dates}</p>}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <ButtonLink href={detail.orderHref} size="sm" target="_blank" rel="noopener noreferrer">
                  Order Oral History
                  <ExternalLinkIcon size="1.1em" />
                  <span className="sr-only">(opens in a new tab)</span>
                </ButtonLink>
                <SharePopover title={`${detail.displayName} — U.S. Naval Institute Oral History`} />
              </div>

              <div className="flex flex-col gap-4 max-w-[760px] pt-6 border-t border-border-light">
                {detail.body.map((p, i) => (
                  <p
                    key={i}
                    className="font-body text-base lg:text-[17px] text-neutral-bold leading-[1.7]"
                    dangerouslySetInnerHTML={{ __html: p }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {detail.excerpt && <Excerpt excerpt={detail.excerpt} />}

      <section className="bg-tan-subtlest py-12 lg:py-16">
        <div className="container-site">
          {detail.volumes.length > 1 ? (
            <VolumeTabs volumes={detail.volumes} />
          ) : (
            detail.volumes.map((v) => <Volume key={v.heading} volume={v} />)
          )}
        </div>
      </section>
    </>
  )
}
