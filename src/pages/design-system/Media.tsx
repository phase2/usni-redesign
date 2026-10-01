import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import DesignSystemLayout from '@/components/design-system/DesignSystemLayout'
import DocPageHeader from '@/components/design-system/DocPageHeader'
import DocSection from '@/components/design-system/DocSection'
import DocLabel from '@/components/design-system/DocLabel'
import CodeBlock from '@/components/design-system/CodeBlock'
import PropsTable from '@/components/design-system/PropsTable'
import LiveMarkup from '@/components/design-system/LiveMarkup'
import ClassTable from '@/components/design-system/ClassTable'
import SourceList from '@/components/design-system/SourceList'
import DevNote from '@/components/design-system/DevNote'
import ArticleVideo from '@/components/ui/ArticleVideo'
import ArticleImageGallery, { type GalleryImage } from '@/components/ui/ArticleImageGallery'
import ArticleHeader from '@/sections/ArticleHeader'
import ArticleHeroImage from '@/sections/ArticleHeroImage'
import ArticleBody from '@/sections/ArticleBody'
import ArticlePullQuote from '@/sections/ArticlePullQuote'
import ArticleCallout from '@/sections/ArticleCallout'
import ArticleMarginNote from '@/sections/ArticleMarginNote'
import ArticleInBrief from '@/sections/ArticleInBrief'
import ArticleTimeline from '@/sections/ArticleTimeline'
import ArticleImagePair from '@/sections/ArticleImagePair'
import ArticleFullBleedImage from '@/sections/ArticleFullBleedImage'
import ArticleAudioPlayer from '@/sections/ArticleAudioPlayer'
import ArticleAuthorBio from '@/sections/ArticleAuthorBio'
import ArticleRelated from '@/sections/ArticleRelated'
import ArticleComments from '@/sections/ArticleComments'
import SeaPowerVideos from '@/sections/SeaPowerVideos'
import { remarksVideos, seaPowerImage } from '@/data/seaPowerProject'
import mefsHeroImg from '@/assets/images/proceedings-articles/mefs/hero.jpg'
import crashOnboardImg from '@/assets/images/proceedings-articles/grubb/crash-onboard.jpg'
import antietamImg from '@/assets/images/proceedings-articles/grubb/uss-antietam.jpg'
import champlainImg from '@/assets/images/proceedings-articles/grubb/uss-lake-champlain.jpg'
import galleryReserve from '@/assets/images/8518400.jpg'
import galleryBriefing from '@/assets/images/6995965.jpg'
import galleryArchive from '@/assets/images/8587-09-158.jpg'
import galleryHistory from '@/assets/images/naval-history-billboard.jpg'
import galleryOrg from '@/assets/images/org-membership-billboard.jpg'
import galleryEssay from '@/assets/images/essay-contests-hero-main.jpg'

function C({ children }: { children: ReactNode }) {
  return <code className="font-mono text-sm [overflow-wrap:anywhere]">{children}</code>
}

function Lead({ children }: { children: ReactNode }) {
  return <p className="font-body text-sm text-neutral-subtle leading-relaxed max-w-2xl">{children}</p>
}

/** A plain reference table, styled like ClassTable, for content that isn't classes. */
function DocTable({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="overflow-x-auto border border-border-light bg-white">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-neutral-subtlest border-b border-border-light">
            {head.map((h) => (
              <th key={h} className="font-body font-bold text-xs uppercase tracking-[0.06em] text-navy-bolder px-4 py-3 align-bottom">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-border-light last:border-b-0">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`font-body text-sm px-4 py-3 align-top leading-relaxed ${j === 0 ? 'font-semibold text-navy-bolder' : 'text-neutral-subtle'}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ── Example content — the prototype's own article data ───────────────────── */

/** The Fortifying the Digital Watch gallery set. */
const GALLERY_IMAGES: GalleryImage[] = [
  { src: galleryReserve, alt: 'Sailors at consoles in a darkened operations space', caption: 'Watchstanders track contacts from a darkened operations space during a fleet exercise.', credit: 'U.S. Navy' },
  { src: galleryBriefing, alt: 'Officers gathered around a briefing table', caption: 'A watch team walks through the night order book before turnover.', credit: 'U.S. Naval Institute Photo Archive' },
  { src: galleryArchive, alt: 'Archival photograph of a ship at sea', caption: 'Cryptologic work has been part of the watch since long before the term cyber existed.', credit: 'Naval History and Heritage Command' },
  { src: galleryHistory, alt: 'Period illustration of ships under sail', caption: 'The forum has argued the nature of the watch in these pages since 1874.', credit: 'U.S. Naval Institute Archives' },
  { src: galleryOrg, alt: 'Sailors looking out over the horizon at sea', caption: 'Retention turns on whether the work feels like a profession rather than a billet.', credit: 'U.S. Navy' },
  { src: galleryEssay, alt: 'Naval officers in discussion', caption: 'Junior officers debate the cyber force design problem at a Naval Institute forum.', credit: 'U.S. Naval Institute' },
]

/** The three authors of Fortifying the Digital Watch. */
const FORTIFYING_AUTHORS = [
  { name: 'Lieutenant Commander Keith Nelson, U.S. Navy', role: 'U.S. Navy', bio: 'Lieutenant Commander Nelson is a career cryptologic warfare officer. He earned a master’s of science in computer science from the Naval Postgraduate School and has led cyberwarfare operations, training programs, and international-partnership initiatives.' },
  { name: 'Lieutenant Commander Andrew Forester, U.S. Navy', role: 'U.S. Navy', bio: 'Lieutenant Commander Forester is a Navy Chaplain Corps officer. He is currently a doctoral candidate at Erskine Theological Seminary. He serves at Navy Information Operations Command, Pacific.' },
  { name: 'Lieutenant Commander Yojana Garcia, U.S. Navy', role: 'U.S. Navy', bio: 'Lieutenant Commander Garcia is a licensed clinical social worker serving as the embedded mental health provider at Cyber Group One, Hawaii. She holds a master’s degree in social work from Boise State University.' },
]

const GRUBB_AUTHOR = [
  { name: 'Dr. Jefferson D. Grubb', role: 'Naval Safety Command', bio: 'Dr. Grubb is the head of the Operations Research Division at Naval Safety Command. He holds a Ph.D. in developmental cognitive neuroscience from the University of Denver. A retired Medical Service Corps officer, he spent his active-duty career addressing human factors issues in naval aviation as a naval aerospace experimental psychologist.' },
]

const sampleVideo = remarksVideos[1]

/* The four article pages and the blocks each one composes. */
const Y = '✓'
const COMPOSITION: ReactNode[][] = [
  ['Section sub-nav', 'ProceedingsSubNav', 'ProceedingsSubNav', 'ProceedingsSubNav', 'NavalHistorySubNav'],
  ['ArticleHeader', Y, Y, Y, Y],
  ['ArticleHeroImage', Y, Y, Y, <span key="h">hand-rolled in the page</span>],
  ['Body band', '1194 grid + ad rail', '1194 grid + ad rail', '1194 grid + ad rail', <span key="b">1090 flex + lg sidebar</span>],
  ['ArticleInBrief (in band)', 'not when restricted', Y, Y, Y],
  ['ArticleAudioPlayer', 'not when restricted', Y, Y, Y],
  ['Drop cap', Y, '—', '—', '—'],
  ['In-column photo', 'PhotoFigure (local)', 'PhotoFigure (local copy)', 'inline <figure>', 'inline <figure>, xs caption'],
  ['ArticleVideo', '—', Y, '—', '—'],
  ['ArticleImageGallery', '—', Y, '—', '—'],
  ['ArticlePullQuote', '—', '—', Y, Y],
  ['ArticleCallout', '—', '—', Y, '—'],
  ['ArticleImagePair', '—', '—', Y, '—'],
  ['ArticleTimeline', '—', '—', Y, '—'],
  ['Chart figure', '—', '—', 'ChartFigure (local)', '—'],
  ['Colour-block sidebar', '—', '—', 'inline <section>', '—'],
  ['In-body ads', 'AdUnit', 'AdUnit', 'AdUnit', 'hand-rolled AdPlaceholder'],
  ['References', Y, Y, Y, '—'],
  ['Topics', 'local', 'local copy', 'local copy', 'local copy'],
  ['ArticleAuthorBio', Y, '3 authors (tabs)', Y, 'no disclaimer'],
  ['ArticleComments', Y, Y, Y, Y],
  ['ArticleRelated', Y, Y, Y, '—'],
  ['ArticlePaywall', 'restricted demo', '—', '—', '—'],
  ['ArticleMeterBanner', Y, Y, Y, 'subscription CTA'],
]

export default function Media() {
  return (
    <DesignSystemLayout>
      <div className="max-w-container mx-auto px-6 lg:px-8 pt-12 pb-24">
        <DocPageHeader title="Article & Media">
          <p>
            The pieces a magazine article is built from: the header and hero, the reading column and its
            prose styles, the blocks that break up a long read (pull quotes, callouts, timelines, image pairs,
            galleries, video), and what follows the body (author bio, comments, related articles).
          </p>
          <p>
            Four article pages compose them — three Proceedings articles and one Naval History article. Each
            body is a hand-built section, so a few blocks exist only as local copies inside one article; those
            are called out as drift. In Drupal the body becomes one Paragraphs field, one paragraph type per
            block — the mapping is at the end of this sheet.
          </p>
        </DocPageHeader>

        {/* ───────────────────────────── Composition ───────────────────────────── */}
        <DocSection title="How the article pages compose">
          <div className="flex flex-col gap-8">
            <Lead>
              Every article page runs the same order: site header, section sub-nav, <C>ArticleHeader</C>, hero
              image, the body band, then author bio, comments and related articles, with the meter banner
              fixed over the page. What varies is the body. The three Proceedings bodies share one layout
              contract — a 1194px band holding an 864px reading column, a 30px gap and a 300px ads-only rail
              from <C>xl</C>, the column centred below <C>xl</C>. The Naval History body predates it.
            </Lead>
            <DocTable
              head={['Block', 'Three MEFs (Proceedings)', 'Fortifying the Digital Watch', 'How Naval Aviation Got Better', 'Mitscher at Midway (Naval History)']}
              rows={COMPOSITION}
            />
            <SourceList
              title="The pages"
              items={[
                { path: 'src/pages/ProceedingsArticle.tsx', note: <>/proceedings/three-mefs — <C>ArticleBody</C>, rendered <C>restricted</C> as the paywall demo</> },
                { path: 'src/pages/ProceedingsArticleFortifying.tsx', note: <>/proceedings/fortifying-digital-watch — <C>FortifyingArticleBody</C></> },
                { path: 'src/pages/ProceedingsArticleGrubb.tsx', note: <>/proceedings/naval-aviation-got-better — <C>GrubbArticleBody</C></> },
                { path: 'src/pages/NavalHistoryArticle.tsx', note: <>/naval-history/mitscher-at-midway — <C>MitscherArticleBody</C></> },
              ]}
            />
            <SourceList
              title="Drift — where a body hand-rolls a block instead of the shared one"
              tone="drift"
              items={[
                { path: 'src/pages/NavalHistoryArticle.tsx', note: <>hero image written inline instead of <C>ArticleHeroImage</C>: adds <C>object-top</C>, and the credit (&ldquo;Painting by Craig Kodera / U.S. Naval Institute&rdquo;) has no &ldquo;Photo Credit:&rdquo; label. Also renders an extra <C>AdUnit</C> after the body, outside any column.</> },
                { path: 'src/sections/MitscherArticleBody.tsx', note: <>its own layout (<C>max-w-[1090px]</C>, <C>flex gap-12 items-start</C>, sidebar from <C>lg</C> not <C>xl</C>); prose <C>leading-[1.75] flex flex-col gap-5</C> instead of <C>leading-[1.5] space-y-8</C>; a local <C>SectionHeading</C> (<C>text-[28px] text-[#001845]</C> with a top rule) instead of the 32px subhead; an inline figure with <C>text-xs</C> caption and unlabelled credit; ad placeholders hand-built (<C>AdFrame</C>/<C>AdPlaceholder</C>, 300×250 + 160×600) instead of <C>AdUnit</C>; no references. Imports <C>SharePopover</C> and never uses it.</> },
                { path: 'src/sections/ArticleBody.tsx, FortifyingArticleBody.tsx', note: <>each defines an identical local <C>PhotoFigure</C> and <C>ArticleTopics</C> — the in-column photo and the topic tags have no shared component.</> },
                { path: 'src/sections/GrubbArticleBody.tsx', note: <>writes the same photo figure inline (A-4 Skyhawk), plus a local <C>ChartFigure</C>, a local <C>ArticleTopics</C>, and the &ldquo;Understanding the Math&rdquo; colour-block sidebar as inline markup.</> },
                { path: 'src/sections/ArticleHeader.tsx', note: <>hand-rolls its breadcrumb instead of <C>Breadcrumb</C> (see <Link to="/design-system/navigation" className="text-link">Navigation</Link>), and its leaderboard ad as a local <C>AdFrame</C> instead of <C>AdUnit</C>.</> },
              ]}
            />
          </div>
        </DocSection>

        {/* ───────────────────────────── ArticleHeader ───────────────────────────── */}
        <DocSection title="Article header">
          <div className="flex flex-col gap-8">
            <Lead>
              Breadcrumb, a leaderboard ad, then an 864px centred column: headline, deck, the dateline
              (issue date · magazine · read time), byline, and the Share / Save / Comments toolbar. A
              light-blue-to-white gradient ground runs behind all of it.
            </Lead>
            <LiveMarkup label="How Naval Aviation Got Better" previewClassName="bg-white p-0" defaultOpen={false}>
              <ArticleHeader
                title="Get Real about How Naval Aviation Got Better"
                deck="Safety doesn't come from magic bullets, but from organizational learning."
                date="July 2026"
                magazineName="Proceedings Magazine"
                author="Dr. Jefferson D. Grubb"
                readTime="9 min read"
                breadcrumbs={[
                  { label: 'Home', href: '/' },
                  { label: 'Proceedings', href: '/proceedings' },
                  { label: 'July 2026', href: '/proceedings/apr-2026' },
                  { label: 'How Naval Aviation Got Better' },
                ]}
              />
            </LiveMarkup>
            <ClassTable
              rows={[
                { part: 'Section', classes: '', note: <>Inline <C>background: linear-gradient(to bottom, #EBF4FF 0%, #FFF 100%)</C> — #EBF4FF is the light-blue band colour, no token. Inner: <C>container-site</C>.</> },
                { part: 'Breadcrumb', classes: 'flex items-center flex-wrap gap-x-2 gap-y-1 pt-8 pb-6 border-b border-[#C2DDFF]', note: <>Hand-rolled (drift). Links <C>font-body font-bold text-sm text-navy-bolder hover:text-navy-subtle transition-colors</C>; separator <C>text-neutral-subtle/40 text-sm</C>; current <C>font-body text-sm text-neutral-subtle truncate max-w-[320px]</C>. Build it with the shared Breadcrumb (light tone) and its <C>pb-4 border-b border-[#C2DDFF]</C> wrapper instead.</> },
                { part: 'Leaderboard ad', classes: 'flex justify-center py-4', note: <>Frame <C>bg-[#F4F4F6] p-2 border border-[#C4C9D4] max-w-full</C> (neutral-subtlest / neutral-subtler) around a <C>w-[728px] max-w-full h-[90px]</C> placeholder. An ad slot in production.</> },
                { part: 'Column', classes: 'max-w-[864px] mx-auto pt-8 pb-10', note: <>Centred at every width. At <C>xl</C> the body&rsquo;s reading column is left-aligned in its band instead, so the headline sits about 130px right of the body text below it.</> },
                { part: 'Headline (h1)', classes: 'font-headline text-[48px] lg:text-[60px] xl:text-[68px] text-navy-bolder leading-[1.05] mb-6' },
                { part: 'Deck', classes: 'font-headline text-[28px] lg:text-[32px] text-neutral-subtle leading-[1.35] mb-8' },
                { part: 'Meta row', classes: 'flex flex-col gap-6 md:flex-row md:items-end md:justify-between', note: <>Byline block <C>min-w-0 md:flex-1 md:max-w-[50%]</C> — capped at half so a long author list wraps in its own column; toolbar <C>flex flex-wrap items-center gap-3 flex-shrink-0</C>.</> },
                { part: 'Dateline', classes: 'flex flex-wrap items-center gap-x-2.5 gap-y-1 mb-2', note: <>Date and magazine <C>font-body font-bold text-sm text-navy-bolder</C>; read time <C>font-body text-sm text-neutral-subtle</C>; separators are 7×7 squares <C>inline-block flex-shrink-0 bg-navy-bolder</C> (inline size), <C>aria-hidden</C>.</> },
                { part: 'Byline', classes: 'font-body text-sm text-navy-bolder', note: '“By {author}”.' },
                { part: 'Toolbar', classes: '', note: <>Share (SharePopover), Save (SaveArticleButton) and Comments (<C>Button variant="outline-dark" size="sm"</C>, smooth-scrolls to <C>#article-comments</C>). Documented on <Link to="/design-system/buttons" className="text-link">Buttons</Link>.</> },
              ]}
            />
            <DevNote>
              <p>
                Node fields: <C>{'{{ title }}'}</C>, <C>{'{{ deck }}'}</C> (plain text), the issue reference
                (gives <C>{'{{ issue_date }}'}</C>, <C>{'{{ magazine }}'}</C> and the breadcrumb&rsquo;s issue
                crumb), authors (entity references, joined for the byline), and <C>{'{{ read_time }}'}</C>,
                computed from the body word count rather than entered. The comment count comes from Disqus.
              </p>
              <p>
                The Save button is a Flag-module toggle for signed-in readers (<C>aria-pressed</C> reflects the
                flag); anonymous readers should get a sign-in prompt rather than local-only state. Share needs JS
                for the popover and copy-link (see Buttons). Note that Save hovers to a light-blue fill
                (<C>hover:bg-[#EBF4FF]</C>) while Share and Comments fill navy — three buttons in one row that
                disagree on hover.
              </p>
            </DevNote>
            <SourceList title="Where it lives" items={[{ path: 'src/sections/ArticleHeader.tsx' }, { path: 'src/components/ui/SaveArticleButton.tsx, src/components/ui/SharePopover.tsx', note: 'see Buttons' }]} />
          </div>
        </DocSection>

        {/* ───────────────────────────── Hero image ───────────────────────────── */}
        <DocSection title="Hero image">
          <div className="flex flex-col gap-8">
            <Lead>
              A wide photograph across the full container under the header, cropped to 16:7, with a caption
              and photo credit beneath.
            </Lead>
            <LiveMarkup label="Three MEFs Won't Be Enough" previewClassName="bg-white p-0">
              <ArticleHeroImage
                src={mefsHeroImg}
                alt="A mass casualty exercise with U.S. Marines and soldiers from the Australian Defence Force during Southern Jackaroo"
                caption="A mass casualty exercise with U.S. Marines and soldiers from the Australian Defence Force during Southern Jackaroo at Shoalwater Bay Training Area, Queensland, Australia."
                photoCredit="U.S. Marine Corps (Cedar Barnes)"
              />
            </LiveMarkup>
            <ClassTable
              rows={[
                { part: 'Section', classes: 'bg-white pb-0', note: <>Inner <C>container-site</C> › <C>{'<figure>'}</C>.</> },
                { part: 'Frame', classes: 'aspect-[16/7] overflow-hidden bg-neutral-subtlest', note: 'The grey shows while the image loads.' },
                { part: 'Image', classes: 'w-full h-full object-cover', note: <>Crops to fill. Choose a focal point for subjects near the top or bottom — the Naval History page had to add <C>object-top</C>.</> },
                { part: 'Caption block', classes: 'mt-3 pb-2' },
                { part: 'Caption', classes: 'font-body text-xs text-neutral-subtle leading-relaxed' },
                { part: 'Credit', classes: 'font-body text-xs text-neutral-subtle/70 mt-1', note: '“Photo Credit: {credit}”.' },
              ]}
            />
            <DevNote>
              <p>
                A media field on the article node, rendered through a 16:7 image style (with Focal Point, so the
                crop can be steered per image). The caption is a field on the article — the same photo can be
                captioned differently in two stories — while the credit belongs to the media entity, since it is
                a property of the photograph. Both are optional; omit the <C>{'<figcaption>'}</C> when both are
                empty (the component always renders one).
              </p>
            </DevNote>
            <SourceList title="Canonical" items={[{ path: 'src/sections/ArticleHeroImage.tsx' }]} />
            <SourceList title="Drift" tone="drift" items={[{ path: 'src/pages/NavalHistoryArticle.tsx', note: <>inline copy with <C>object-top</C> on the image and no &ldquo;Photo Credit:&rdquo; label.</> }]} />
          </div>
        </DocSection>

        {/* ───────────────────────── Reading column & prose ───────────────────────── */}
        <DocSection title="Reading column and prose (ArticleBody)">
          <div className="flex flex-col gap-8">
            <Lead>
              The body band and the type inside it. <C>ArticleBody</C> is the Three MEFs article itself, not a
              generic container — the example below is its <C>restricted</C> state, which shows the frame, the
              drop cap, the paragraph rhythm and the paywalled ending in a few lines. The full set of prose parts
              is in the table.
            </Lead>
            <LiveMarkup label="Opening of the body, restricted (paywall) state" previewClassName="bg-white p-0" defaultOpen={false}>
              <ArticleBody restricted />
            </LiveMarkup>

            <DocLabel className="mb-0">Anatomy — band and prose</DocLabel>
            <ClassTable
              rows={[
                { part: 'Band', classes: 'bg-white pt-10 overflow-x-clip', note: <>Plus <C>pb-0</C>, or <C>pb-16 lg:pb-20</C> when restricted. <C>overflow-x-clip</C> stops a full-bleed child from creating a horizontal scrollbar.</> },
                { part: 'Band container', classes: 'max-w-[1194px] mx-auto w-full px-4 lg:px-8', note: '1194 = 864 column + 30 gap + 300 rail.' },
                { part: 'Grid', classes: 'xl:grid xl:grid-cols-[minmax(0,1fr)_300px] xl:gap-[30px]', note: <>Two columns from <C>xl</C> only. <C>minmax(0,1fr)</C> lets wide children shrink instead of pushing the rail out.</> },
                { part: 'Reading column', classes: 'max-w-[864px] mx-auto xl:mx-0 w-full', note: 'Centred below xl, left-aligned beside the rail from xl. Everything in the body stays inside it.' },
                { part: 'Prose wrapper', classes: 'font-body text-[16px] lg:text-[18px] text-[#1d2535] leading-[1.5] space-y-8 article-body mt-6', note: <>#1d2535 = <C>text-primary</C>. <C>space-y-8</C> puts 32px between every block, paragraphs included. <C>article-body</C> is a hook only — no CSS targets it.</> },
                { part: 'Drop cap', classes: 'float-left bg-navy-bolder flex items-center justify-center mr-4 mb-1 flex-shrink-0 select-none', note: <>Inline 72×72. Letter <C>font-headline text-[52px] text-white leading-none</C>. The box is <C>aria-hidden</C> and the letter is cut from the paragraph, so a screen reader hears &ldquo;he United States…&rdquo; — see the note below. The next paragraph carries <C>clear-left</C>.</> },
                { part: 'Subhead (h2)', classes: 'font-headline text-[32px] text-[#060a0a] leading-[1.2] pt-2', note: <>#060a0a has no token (nearest <C>neutral-boldest</C> #0E121A). Same size at every breakpoint.</> },
                { part: 'Footnote marker', classes: '', note: <>A bare <C>{'<sup>1</sup>'}</C> — not linked to its reference.</> },
                { part: 'Section rule', classes: 'bg-[#c4c9d4] h-px w-full', note: <>A <C>{'<div>'}</C>; #c4c9d4 = <C>neutral-subtler</C>. Use an <C>{'<hr>'}</C>.</> },
                { part: 'End mark', classes: 'inline-flex items-baseline ml-2 text-navy-bolder', note: <>After the last word: <C>fa-solid fa-anchor text-[14px]</C>, <C>aria-hidden</C>.</> },
                { part: 'References', classes: 'pt-6', note: <>Rule, then heading <C>font-headline text-[28px] text-[#060a0a] leading-[1.2] mb-4</C> (a <C>{'<p>'}</C>), then <C>list-decimal list-inside space-y-2 font-body text-base text-neutral-subtle leading-relaxed</C>.</> },
                { part: 'Paywall fade', classes: 'absolute inset-0 bg-gradient-to-b from-white/0 via-white/60 to-white pointer-events-none', note: <>Over the last visible paragraph (its wrapper is <C>relative</C>), when restricted; <C>ArticlePaywall</C> follows.</> },
                { part: 'Topics', classes: 'pt-8 pb-8', note: <>After a rule (<C>bg-[#c4c9d4] h-px w-full mt-10</C>). Label <C>font-body font-medium text-[18px] uppercase tracking-[1px] text-[#1d2535] mb-4</C>; tags in <C>flex flex-wrap gap-3</C>, each <C>font-body font-bold text-base text-navy-bolder border border-navy-bolder px-4 py-2 hover:bg-navy-bright hover:text-white hover:border-navy-bright transition-colors</C>.</> },
                { part: 'Ad rail', classes: 'hidden xl:flex xl:flex-col', note: <><C>{'<aside aria-label="Advertisements">'}</C>: four <C>AdUnit size="rectangle"</C> separated by <C>flex-[3]</C> / <C>flex-[4]</C> spacers, so they stagger down the article&rsquo;s height and the second stays clear of the in-body leaderboard.</> },
                { part: 'In-body ads', classes: '', note: <>An <C>AdUnit size="leaderboard"</C> at the mid-article break, and an <C>AdUnit size="rectangle"</C> inside <C>xl:hidden</C> lower down, standing in for the rail below <C>xl</C>.</> },
              ]}
            />

            <DocLabel className="mb-0">Anatomy — figures inside the column (no shared component)</DocLabel>
            <ClassTable
              rows={[
                { part: 'Photo figure', classes: 'overflow-hidden bg-neutral-subtlest', note: <>The frame inside a bare <C>{'<figure>'}</C>. Image <C>w-full h-auto</C> — natural height, never cropped. The local <C>PhotoFigure</C> in ArticleBody and FortifyingArticleBody, written inline in GrubbArticleBody.</> },
                { part: 'Photo caption', classes: 'mt-3 font-body text-sm text-neutral-subtle leading-relaxed', note: <>Credit inside it: <C>{'<span class="block text-neutral-subtle/60 mt-0.5">Photo Credit: …</span>'}</C>.</> },
                { part: 'Chart figure', classes: 'border border-[#c4c9d4] bg-white p-4', note: <>Grubb&rsquo;s <C>ChartFigure</C> — a bordered print-style plate for charts. Image <C>w-full h-auto</C>; caption as the photo caption, no credit. The <C>alt</C> describes what the chart shows.</> },
                { part: 'Colour-block sidebar', classes: 'bg-[#F4F4F6]', note: <>Grubb&rsquo;s &ldquo;Understanding the Math&rdquo;: a <C>{'<section>'}</C> (#F4F4F6 = <C>neutral-subtlest</C>), inner <C>px-6 lg:px-8 py-8 lg:py-10</C>, text <C>space-y-6 font-body text-[15px] lg:text-[16px] text-[#1d2535] leading-[1.65]</C>, its own 32px h2, and a chart figure with <C>my-8</C>.</> },
              ]}
            />

            <DevNote>
              <p>
                <strong>Prose styles have to be a CSS class.</strong> In Drupal the paragraphs, subheads, links,
                emphasis and footnote markers arrive from CKEditor as plain HTML that cannot carry utilities, so
                the values in the prose-wrapper and subhead rows belong in a component class (say{' '}
                <C>.article-prose</C>) applied by descendant selector, the way <C>.rich-text</C> in{' '}
                <C>src/index.css</C> already does for the State of the Institute archive. Note the two disagree
                today: <C>.rich-text</C> is 17px / 1.7 in <C>neutral-bold</C> with 26px subheads; the article
                column is 18px / 1.5 in <C>text-primary</C> with 32px subheads and 32px block spacing. Decide
                which is the reading style rather than shipping both.
              </p>
              <p>
                <strong>Drop cap.</strong> Don&rsquo;t cut the first letter out of the text. Keep the paragraph
                whole and style its first letter (<C>::first-letter</C>, or a wrapping <C>{'<span>'}</C> that stays
                in the accessibility tree) on the first text paragraph — automatically, or by a node-level
                &ldquo;drop cap&rdquo; checkbox. Only Three MEFs uses it.
              </p>
              <p>
                <strong>Footnotes.</strong> Link each marker to its reference (<C>{'<a href="#ref-1">'}</C>) and
                give the references list ids and back-links. References are a node field (formatted text or a
                multi-value field), not part of the body.
              </p>
              <p>
                <strong>Ads.</strong> Insert in-body ad slots in preprocess (after the Nth text paragraph)
                rather than asking editors to place them; the rail&rsquo;s staggered slots are template, not
                content. Below <C>xl</C> the rail disappears and its inline stand-in takes over.
              </p>
            </DevNote>
            <SourceList title="Canonical" items={[{ path: 'src/sections/ArticleBody.tsx', note: 'band, grid, prose, drop cap, PhotoFigure, references, topics, rail — and the restricted prop' }, { path: 'src/sections/GrubbArticleBody.tsx', note: 'ChartFigure and the colour-block sidebar (the only examples)' }]} />
            <SourceList
              title="Drift"
              tone="drift"
              items={[
                { path: 'src/sections/FortifyingArticleBody.tsx', note: 'same contract and classes; carries its own copies of PhotoFigure and ArticleTopics.' },
                { path: 'src/sections/GrubbArticleBody.tsx', note: 'same contract; photo figure inline, own ArticleTopics.' },
                { path: 'src/sections/MitscherArticleBody.tsx', note: <>different band (1090px flex, lg sidebar), looser prose (<C>leading-[1.75] flex flex-col gap-5</C>), 28px navy subheads with a top rule (<C>font-headline text-[28px] text-[#001845] leading-[1.2] mt-10 mb-4 pt-8 border-t border-[#e8eaed]</C>), figure caption <C>text-xs</C>. Topics link to <C>/naval-history/series</C>.</> },
              ]}
            />
          </div>
        </DocSection>

        {/* ───────────────────────────── In Brief ───────────────────────────── */}
        <DocSection title="In Brief">
          <div className="flex flex-col gap-8">
            <Lead>
              The executive summary at the top of a feature: three or four bullet points and the read time.
              The component is unboxed; every article wraps it in the same light-blue band, shown here.
            </Lead>
            <LiveMarkup label="Mitscher at Midway — in its band" previewClassName="bg-white p-6 lg:p-8">
              <div className="bg-[#EBF4FF] p-6 lg:p-8">
                <ArticleInBrief
                  readTime="14 min read"
                  items={[
                    <>Sixty years of scholarship has produced no consensus on whether Mitscher&rsquo;s decisions aboard <em>Hornet</em> secured or nearly cost the victory at Midway.</>,
                    <><em>Hornet</em>&rsquo;s air group flew southwest rather than toward the Kido Butai &mdash; the &ldquo;flight to nowhere&rdquo; &mdash; and contributed nothing to the strikes that sank four Japanese carriers.</>,
                    <>The ship&rsquo;s after-action report contradicts the surviving flight logs, which is why the episode turns on the reliability of sources rather than a shortage of them.</>,
                  ]}
                />
              </div>
            </LiveMarkup>
            <ClassTable
              rows={[
                { part: 'Band (from the body)', classes: 'bg-[#EBF4FF] p-6 lg:p-8', note: 'Supplied by the article body, identically in all four. Move it into the template.' },
                { part: 'Aside', classes: 'h-full', note: 'Unboxed, so it can sit in a row beside a 300×250 ad if a layout wants it.' },
                { part: 'Heading row', classes: 'flex items-baseline justify-between gap-4 border-b border-navy-bold pb-4 mb-5', note: <>h2 <C>font-headline text-[28px] text-[#1d2535] leading-[1.2]</C>; read time <C>font-body font-bold text-xs text-navy-bolder flex-shrink-0 flex items-center gap-1.5</C> with <C>fa-regular fa-clock</C>.</> },
                { part: 'List', classes: 'space-y-3.5' },
                { part: 'Item', classes: 'flex gap-3', note: <>8×8 square bullet <C>inline-block flex-shrink-0 bg-[#0466c8] mt-[7px]</C> (navy-bright, inline size), text <C>font-body text-[15px] text-[#1d2535] leading-[1.55]</C>.</> },
              ]}
            />
            <DevNote>
              <p>
                A multi-value formatted-text field on the article node (<C>{'{% for item in in_brief %}'}</C>),
                with <C>{'{{ read_time }}'}</C> beside the heading; render nothing when the field is empty. It
                is article-level metadata, not a body paragraph, because it always sits in the same place.
              </p>
            </DevNote>
            <SourceList title="Where it lives" items={[{ path: 'src/sections/ArticleInBrief.tsx' }]} />
          </div>
        </DocSection>

        {/* ───────────────────────────── Audio ───────────────────────────── */}
        <DocSection title="Audio player">
          <div className="flex flex-col gap-8">
            <Lead>
              The listen-to-this-article player. The prototype shows a screenshot of the Instaread player in its
              members-only state, because the live embed won&rsquo;t run on this domain.
            </Lead>
            <LiveMarkup label="Placeholder" previewClassName="bg-white p-6 lg:p-8">
              <div className="max-w-[864px]"><ArticleAudioPlayer /></div>
            </LiveMarkup>
            <ClassTable
              rows={[
                { part: 'Accent', classes: 'border-l-4 border-[#023e7d]', note: <>#023e7d = <C>navy-subtle</C>.</> },
                { part: 'Frame', classes: 'bg-white border border-[#023e7d] border-l-0 p-4', note: <>Holds the screenshot (<C>w-full h-auto</C>). In production, holds the player.</> },
              ]}
            />
            <DevNote>
              <p>
                Replace the image with the Instaread embed (its script and container), loaded only on article
                pages. Keep the bordered frame as the wrapper so the player sits in the column like the other
                blocks. The members-only gating is Instaread&rsquo;s, driven by the reader&rsquo;s session.
              </p>
            </DevNote>
            <SourceList title="Where it lives" items={[{ path: 'src/sections/ArticleAudioPlayer.tsx' }]} />
          </div>
        </DocSection>

        {/* ───────────────────────────── Pull quote ───────────────────────────── */}
        <DocSection title="Pull quote">
          <div className="flex flex-col gap-8">
            <Lead>A typographic pause between sections: a gold rule over a large serif quote, with an optional attribution.</Lead>
            <LiveMarkup label="With attribution — Mitscher at Midway" previewClassName="bg-white p-6 lg:p-8">
              <div className="max-w-[864px]">
                <ArticlePullQuote attribution="— Jonathan Parshall and Anthony Tully, Shattered Sword (2005)">
                  The <em>Hornet</em>&rsquo;s performance at Midway remains the most vexed question in the
                  historiography of that battle &mdash; not because we lack sources, but because the sources we
                  have cannot be fully trusted.
                </ArticlePullQuote>
              </div>
            </LiveMarkup>
            <LiveMarkup label="Without attribution — a line lifted from the body (How Naval Aviation Got Better)" previewClassName="bg-white p-6 lg:p-8">
              <div className="max-w-[864px]">
                <ArticlePullQuote>
                  Classic ski slope charts indicate exactly two things: that naval aviation got better and that naval
                  aviation did stuff.
                </ArticlePullQuote>
              </div>
            </LiveMarkup>
            <ClassTable
              rows={[
                { part: 'Blockquote', classes: 'bg-neutral-subtlest p-8 lg:p-10' },
                { part: 'Rule', classes: 'block w-16 h-1 bg-gold mb-7', note: <><C>aria-hidden</C>.</> },
                { part: 'Quote', classes: 'font-headline text-[26px] lg:text-[32px] text-navy-bolder leading-[1.3]' },
                { part: 'Attribution', classes: 'font-body font-bold text-sm uppercase tracking-[0.08em] text-neutral-subtle mt-5', note: <>A <C>{'<footer>'}</C> inside the blockquote. The dash is part of the content.</> },
              ]}
            />
            <DevNote>
              <p>
                Paragraph type <C>pull_quote</C>: <C>{'{{ quote }}'}</C> (short formatted text — italics for ship
                names) and optional <C>{'{{ attribution }}'}</C>. A pull quote that repeats a sentence from the
                body, like the second example, gets read twice by a screen reader; mark those{' '}
                <C>aria-hidden="true"</C> (an editor checkbox), and leave real quotations — the first example —
                exposed.
              </p>
            </DevNote>
            <SourceList title="Where it lives" items={[{ path: 'src/sections/ArticlePullQuote.tsx', note: 'used by GrubbArticleBody and MitscherArticleBody' }]} />
          </div>
        </DocSection>

        {/* ───────────────────────────── Callout ───────────────────────────── */}
        <DocSection title="Callout">
          <div className="flex flex-col gap-8">
            <Lead>
              The print-style sidebar box — light tan with an inset tan border. From <C>lg</C> it floats right
              in the column at 400px and the text wraps around it; below <C>lg</C> it sits in the flow. It never
              hangs into the ad rail.
            </Lead>
            <LiveMarkup
              label="“Aristotle Says” — How Naval Aviation Got Better (shown with the paragraph it floats beside)"
              previewClassName="bg-white p-6 lg:p-8"
              markupFor={
                <ArticleCallout>
                  <p>
                    <strong>ARISTOTLE SAYS</strong> that to explain why something exists or changes, four
                    &ldquo;causes&rdquo; must be examined: material, formal, efficient, and final. For this article's
                    purposes, it is especially helpful to distinguish between two:
                  </p>
                  <p className="pl-6">
                    The <em>formal cause</em> of something&mdash;what Aristotle defines as the structure that makes
                    something what it is. The blueprint, not the house.
                  </p>
                  <p className="pl-6">
                    And the <em>efficient cause</em>&mdash;for Aristotle, the agent who achieves the desired outcome.
                    The carpenters.
                  </p>
                </ArticleCallout>
              }
            >
              <div className="max-w-[864px] font-body text-[16px] lg:text-[18px] text-[#1d2535] leading-[1.5] space-y-8">
                <ArticleCallout>
                  <p>
                    <strong>ARISTOTLE SAYS</strong> that to explain why something exists or changes, four
                    &ldquo;causes&rdquo; must be examined: material, formal, efficient, and final. For this article's
                    purposes, it is especially helpful to distinguish between two:
                  </p>
                  <p className="pl-6">
                    The <em>formal cause</em> of something&mdash;what Aristotle defines as the structure that makes
                    something what it is. The blueprint, not the house.
                  </p>
                  <p className="pl-6">
                    And the <em>efficient cause</em>&mdash;for Aristotle, the agent who achieves the desired outcome.
                    The carpenters.
                  </p>
                </ArticleCallout>
                <p>
                  What is noisy data becomes a straight line when a formal analysis is performed, which indicates that
                  the major mishap rate has the form of an exponential function. (The data analysis and methodology are
                  discussed in the sidebar below.) In social science terms, this exponential has the shape of what is
                  commonly called a learning curve. Here, its downward (negative) shape is &ldquo;eliminative.&rdquo;
                  That is, when smaller numbers indicate better performance (e.g., fewer errors, less time to complete
                  a task, lower cost per item produced, etc.), task experience is reducing the measured quantity
                  (accidents, for example).
                </p>
              </div>
            </LiveMarkup>
            <ClassTable
              rows={[
                { part: 'Aside', classes: 'bg-tan-subtlest p-1.5 lg:float-right lg:w-[400px] lg:ml-8 lg:mb-2', note: <>The 6px of tan outside the border is what reads as the inset frame. Accepts <C>className</C>.</> },
                { part: 'Inner', classes: 'border border-tan-subtle px-5 py-5 lg:px-6 lg:py-6 font-body text-[14px] lg:text-[15px] text-[#1d2535] leading-[1.7] space-y-3', note: <>Content is free-form; Grubb indents sub-points with <C>pl-6</C> and opens with a bold run-in head.</> },
              ]}
            />
            <DevNote>
              <p>
                Paragraph type <C>callout</C>: one formatted-text field (<C>{'{{ body }}'}</C>). Because it
                floats, the next full-width block must clear it — Grubb puts <C>clear-right</C> on the leaderboard
                ad that follows. Add <C>clear: right</C> to every full-width paragraph type&rsquo;s wrapper (ads,
                images, galleries) so editors can&rsquo;t produce an overlap.
              </p>
            </DevNote>
            <SourceList title="Where it lives" items={[{ path: 'src/sections/ArticleCallout.tsx', note: 'GrubbArticleBody' }]} />
          </div>
        </DocSection>

        {/* ───────────────────────────── Margin note ───────────────────────────── */}
        <DocSection title="Margin note">
          <div className="flex flex-col gap-8">
            <Lead>
              A Tufte-style sidenote: a term and a short gloss. Below <C>xl</C> it is a small tan aside in the
              flow; from <C>xl</C> it floats out of the column into the right gutter. No article uses it.
            </Lead>
            <LiveMarkup label="Below xl / in the flow (term from How Naval Aviation Got Better)" previewClassName="bg-white p-6 lg:p-8">
              <div className="max-w-[760px]">
                <ArticleMarginNote term="NATOPS">
                  Naval Aviation Training and Operations Standardization — the program that standardized
                  operating procedures for every aircraft type fleet-wide from 1961.
                </ArticleMarginNote>
              </div>
            </LiveMarkup>
            <ClassTable
              rows={[
                { part: 'Aside', classes: 'border-l-2 border-gold bg-tan-subtlest px-4 py-3 my-4 xl:float-right xl:clear-right xl:w-[230px] xl:-mr-[260px] xl:my-0 xl:ml-4 xl:bg-transparent xl:border-l-2 xl:border-gold xl:pl-4 xl:pr-0 xl:py-0.5', note: <>From <C>xl</C>: 230px wide, pulled 260px out of the column (<C>-mr-[260px]</C>), background dropped.</> },
                { part: 'Term', classes: 'font-body font-bold text-[12px] uppercase tracking-[0.08em] text-navy-bolder mb-1' },
                { part: 'Gloss', classes: 'font-body text-[13px] text-neutral-subtle leading-[1.6]' },
              ]}
            />
            <DevNote title="Before building it">
              <p>
                Its layout contract is stale: it assumes a centred 760px column with an empty gutter on the right.
                The article band now uses an 864px column with the 300px ad rail in that gutter from <C>xl</C>, so a
                hanging note would land on the ads. Either drop it, or keep it in-flow at every width (its
                below-<C>xl</C> styling) until a layout with a free gutter exists. As a paragraph type it would be{' '}
                <C>margin_note</C>: <C>{'{{ term }}'}</C>, <C>{'{{ note }}'}</C>.
              </p>
            </DevNote>
            <SourceList title="Where it lives" items={[{ path: 'src/sections/ArticleMarginNote.tsx', note: 'not used by any page' }]} />
          </div>
        </DocSection>

        {/* ───────────────────────────── Timeline ───────────────────────────── */}
        <DocSection title="Timeline">
          <div className="flex flex-col gap-8">
            <Lead>
              A run of dated milestones turned into a designed pause: a horizontal strip with dots on a connector
              from <C>lg</C>, a vertical rail below.
            </Lead>
            <LiveMarkup label="“The Learning Decade” — How Naval Aviation Got Better" previewClassName="bg-white p-6 lg:p-8">
              <div className="max-w-[864px]">
                <ArticleTimeline
                  eyebrow="The Learning Decade"
                  items={[
                    { year: '1953', label: 'First angled flight deck enters service (USS Antietam)' },
                    { year: '1955', label: 'Aviation Safety Center expands; safety officer billets fleet-wide' },
                    { year: '1958', label: 'Replacement air groups standardize training by aircraft type' },
                    { year: '1959', label: 'Naval Aviation Maintenance Program standardizes maintenance' },
                    { year: '1961', label: 'NATOPS standardizes operating procedures fleet-wide' },
                  ]}
                  caption="Key organizational-learning milestones. These cluster inside the two fastest-improving periods in the mishap-rate record, 1954–1965."
                />
              </div>
            </LiveMarkup>
            <ClassTable
              rows={[
                { part: 'Band', classes: 'bg-[#EBF4FF] p-6 lg:p-8', note: 'The light-blue band again (no token).' },
                { part: 'Eyebrow', classes: 'font-body font-bold text-[13px] uppercase tracking-[0.1em] text-navy-bolder mb-8', note: 'Optional. A <p>, not a heading.' },
                { part: 'Strip (lg+)', classes: 'hidden lg:flex relative', note: <>An <C>{'<ol>'}</C>. Connector <C>absolute top-[7px] left-0 right-0 h-px bg-navy-bolder/20</C>, centred on the 15px dots.</> },
                { part: 'Strip item', classes: 'flex-1 relative flex flex-col items-start pr-6', note: <>Dot <C>relative z-10 inline-block bg-[#0466c8] rounded-full flex-shrink-0</C> (15×15 inline; navy-bright); year <C>font-body font-bold text-[15px] text-navy-bolder mt-3</C>; label <C>font-body text-sm text-neutral-subtle leading-snug mt-1</C>. Equal widths — keep to about six items.</> },
                { part: 'Rail (below lg)', classes: 'lg:hidden border-l-2 border-navy-bolder/20 ml-[7px] space-y-6', note: <>Item <C>relative pl-6</C>; dot <C>absolute -left-[8.5px] top-[3px] inline-block bg-[#0466c8] rounded-full</C>, centred on the 2px rail.</> },
                { part: 'Caption', classes: 'font-body text-xs text-neutral-subtle/70 mt-7' },
              ]}
            />
            <DevNote>
              <p>
                Paragraph type <C>timeline</C> (<C>{'{{ eyebrow }}'}</C>, <C>{'{{ caption }}'}</C>) holding{' '}
                <C>timeline_item</C> paragraphs (<C>{'{{ year }}'}</C> as plain text, so &ldquo;1954–1965&rdquo; or
                &ldquo;Spring 1942&rdquo; work; <C>{'{{ label }}'}</C>). Both lists are rendered and switched with{' '}
                <C>hidden</C>/<C>lg:hidden</C>, which removes the inactive one from the accessibility tree — keep
                that rather than duplicating visible content. No JS.
              </p>
            </DevNote>
            <SourceList title="Where it lives" items={[{ path: 'src/sections/ArticleTimeline.tsx', note: 'GrubbArticleBody' }]} />
          </div>
        </DocSection>

        {/* ───────────────────────────── Image pair ───────────────────────────── */}
        <DocSection title="Image pair">
          <div className="flex flex-col gap-8">
            <Lead>Two photographs side by side at 4:3 under one shared caption — for a comparison, as here.</Lead>
            <LiveMarkup label="Antietam and Lake Champlain — How Naval Aviation Got Better" previewClassName="bg-white p-6 lg:p-8">
              <div className="max-w-[864px]">
                <ArticleImagePair
                  images={[
                    { src: antietamImg, alt: "USS Antietam, the U.S. Navy's first carrier with an angled flight deck" },
                    { src: champlainImg, alt: 'USS Lake Champlain conducting fixed-wing flight operations from an axial flight deck' },
                  ]}
                  caption={
                    <>
                      The Essex-class USS <em>Antietam</em> (CVA/CVS-36), left. In 1953, the <em>Antietam</em> became
                      the Navy's first carrier with an angled deck, and was the only one until 1955. Twelve years
                      later, the USS <em>Lake Champlain</em> (CVS-39) was the last carrier in service with only an
                      axial flight deck.
                    </>
                  }
                  photoCredit="Naval History and Heritage Command"
                />
              </div>
            </LiveMarkup>
            <ClassTable
              rows={[
                { part: 'Grid', classes: 'grid grid-cols-2 gap-3', note: 'Two columns at every width — no stacking on mobile, so each image is about 160px wide on a phone.' },
                { part: 'Frame', classes: 'aspect-[4/3] overflow-hidden bg-neutral-subtlest', note: <>Image <C>w-full h-full object-cover</C>.</> },
                { part: 'Caption', classes: 'mt-3 font-body text-sm text-neutral-subtle leading-relaxed', note: <>Credit <C>block text-neutral-subtle/60 mt-0.5</C>, &ldquo;Photo Credit: …&rdquo;, optional. Refer to position in words (&ldquo;left&rdquo;) as this caption does.</> },
              ]}
            />
            <DevNote>
              <p>
                Paragraph type <C>image_pair</C>: two media references (4:3 image style), one caption, one
                optional credit. If the pair is from different sources, the credit field needs to say so — there
                is one credit for both.
              </p>
            </DevNote>
            <SourceList title="Where it lives" items={[{ path: 'src/sections/ArticleImagePair.tsx', note: 'GrubbArticleBody' }]} />
          </div>
        </DocSection>

        {/* ───────────────────────────── Full-bleed image ───────────────────────────── */}
        <DocSection title="Full-bleed image">
          <div className="flex flex-col gap-8">
            <Lead>
              A single image wider than the reading column — either a wide container (default) or the whole
              viewport width (<C>bleed</C>). No article uses it.
            </Lead>
            <LiveMarkup label="Wide (default), 16:9" previewClassName="bg-white p-0 py-6">
              <ArticleFullBleedImage
                src={crashOnboardImg}
                alt="Crewmen scramble as a crash-landed fighter burns on a carrier flight deck during World War II"
                caption="A pilot scrambles from his crash-landed fighter as flames spread across the flight deck. In fiscal year 1953 alone, the U.S. Navy and Marine Corps lost 723 aircraft to aviation mishaps; in FY 2025, they lost 11."
                photoCredit="U.S. Navy"
              />
            </LiveMarkup>
            <LiveMarkup
              label="bleed — markup only (it spans 100vw, so it can't be shown inside this box)"
              previewClassName="bg-white p-6 font-body text-sm text-neutral-subtle"
              markupFor={
                <ArticleFullBleedImage
                  bleed
                  src={crashOnboardImg}
                  alt="Crewmen scramble as a crash-landed fighter burns on a carrier flight deck during World War II"
                  caption="A pilot scrambles from his crash-landed fighter as flames spread across the flight deck."
                  photoCredit="U.S. Navy"
                />
              }
            >
              The bleed variant is <C>relative left-1/2 -translate-x-1/2 w-screen</C>: it re-centres itself on
              the viewport from wherever its column sits.
            </LiveMarkup>
            <ClassTable
              rows={[
                { part: 'Figure — wide', classes: 'max-w-[1180px] mx-auto px-4 lg:px-8 xl:clear-right' },
                { part: 'Figure — bleed', classes: 'relative left-1/2 -translate-x-1/2 w-screen xl:clear-right', note: <><C>w-screen</C> includes the scrollbar width, which is why the article band carries <C>overflow-x-clip</C>. Caption re-contained: <C>max-w-[1090px] mx-auto px-4 lg:px-8 mt-3 font-body text-sm text-neutral-subtle leading-relaxed</C>.</> },
                { part: 'Frame', classes: 'aspect-[16/9] overflow-hidden bg-neutral-subtlest', note: <>The ratio is a prop (<C>aspect</C>, default <C>aspect-[16/9]</C>). Image <C>w-full h-full object-cover</C>.</> },
                { part: 'Caption — wide', classes: 'mt-3 font-body text-sm text-neutral-subtle leading-relaxed', note: 'Credit as the image pair. The figcaption is omitted when there is neither caption nor credit.' },
              ]}
            />
            <DevNote title="Before building it">
              <p>
                Like the margin note, its widths come from an older layout: 1180px and 1090px don&rsquo;t match
                the current 1194px band or 864px column, and inside the column a wide figure collides with the ad
                rail at <C>xl</C>. If the design wants a breakout image, it should break out of the whole band
                (end the band, place the image, start a new band) — as a display option on the <C>image</C>{' '}
                paragraph type (&ldquo;in column&rdquo; | &ldquo;full width&rdquo;), not a separate type.
              </p>
            </DevNote>
            <SourceList title="Where it lives" items={[{ path: 'src/sections/ArticleFullBleedImage.tsx', note: 'not used by any page' }]} />
          </div>
        </DocSection>

        {/* ───────────────────────────── Video ───────────────────────────── */}
        <DocSection title="Video">
          <div className="flex flex-col gap-8">
            <Lead>
              A click-to-play YouTube embed. A poster image with a play button stands in until the reader clicks;
              only then is the YouTube iframe inserted, with autoplay. That keeps YouTube&rsquo;s player script and
              its cookies off the page for anyone who never presses play.
            </Lead>
            <LiveMarkup label="In the reading column, with caption (poster state)" previewClassName="bg-white p-6 lg:p-8">
              <div className="max-w-[864px]">
                <ArticleVideo
                  youtubeId={sampleVideo.youtubeId}
                  poster={seaPowerImage(sampleVideo.poster) ?? ''}
                  posterAlt={sampleVideo.posterAlt}
                  title={sampleVideo.title}
                  caption="Remarks from the authors of “Great Responsibility Demands a Great Navy,” part of the American Sea Power Project."
                  className=""
                />
              </div>
            </LiveMarkup>
            <LiveMarkup label="In a grid — the Sea Power Project's three author videos" previewClassName="bg-white p-0" defaultOpen={false}>
              <SeaPowerVideos id="remarks-demo" heading="Remarks from the Authors" videos={remarksVideos} background="white" />
            </LiveMarkup>
            <ClassTable
              rows={[
                { part: 'Figure', classes: 'flex flex-col gap-3', note: <>Plus <C>className</C>, default <C>my-10</C> — the article body&rsquo;s rhythm. Pass <C>""</C> in a grid, where that margin fights the grid gap (SeaPowerVideos does).</> },
                { part: 'Player frame', classes: 'relative w-full aspect-video bg-navy-boldest overflow-hidden', note: '16:9 in both states, so nothing moves on play.' },
                { part: 'Play button', classes: 'group absolute inset-0 w-full h-full cursor-pointer', note: <>Covers the frame. <C>aria-label="Play video: {'{title}'}"</C>. Poster <C>absolute inset-0 w-full h-full object-cover</C>.</> },
                { part: 'Scrim', classes: 'absolute inset-0 bg-navy-boldest/25 group-hover:bg-navy-boldest/35 transition-colors duration-300', note: 'Keeps the button legible over a busy frame.' },
                { part: 'Play control', classes: 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-20 h-20 lg:w-24 lg:h-24 bg-white/95 text-navy-bolder shadow-[0_6px_24px_rgba(0,18,51,0.35)] transition-all duration-300 ease-out group-hover:scale-125 group-hover:bg-gold group-focus-visible:scale-125 group-focus-visible:bg-gold', note: <>Square, not round. Grows and turns gold on hover and on keyboard focus. Triangle <C>w-8 h-8 lg:w-9 lg:h-9 ml-1</C> — nudged right so its visual mass centres.</> },
                { part: 'Iframe (playing)', classes: 'absolute inset-0 w-full h-full border-0', note: 'Replaces the button. See the snippet below.' },
                { part: 'Caption', classes: 'font-body text-[15px] text-neutral-subtle leading-[1.55] border-l-2 border-[#0466c8] pl-4', note: <>Optional. The blue rule (navy-bright) is the media caption treatment — the gallery uses it too.</> },
              ]}
            />
            <DocLabel className="mb-0">Playing state — the iframe that replaces the button (from ArticleVideo.tsx; internal state, so not snapshotted)</DocLabel>
            <CodeBlock code={`<iframe
  src="https://www.youtube.com/embed/{{ youtube_id }}?autoplay=1&rel=0"
  title="{{ title }}"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowfullscreen
  class="absolute inset-0 w-full h-full border-0"
></iframe>`} />
            <DevNote>
              <p>
                Paragraph type <C>video</C>: a Remote video media reference (YouTube), an optional poster image
                override (default to the YouTube thumbnail or the media&rsquo;s own image), and an optional
                caption. Template variables: <C>{'{{ youtube_id }}'}</C>, <C>{'{{ poster_url }}'}</C>,{' '}
                <C>{'{{ title }}'}</C>, <C>{'{{ caption }}'}</C>. Don&rsquo;t use core&rsquo;s oEmbed formatter
                as-is — it renders the iframe up front, which is exactly what this pattern avoids.
              </p>
              <p>
                JS (Drupal behavior): on click, replace the button with the iframe. Then move focus to the
                iframe — the prototype removes the focused button and focus falls back to the document. Consider
                <C> youtube-nocookie.com</C> for the embed host.
              </p>
              <p>
                Accessibility: the button&rsquo;s <C>aria-label</C> is its name, so the poster inside it should
                be <C>alt=""</C> — the prototype gives it descriptive alt text as well, which is ignored or read
                twice depending on the reader.
              </p>
            </DevNote>
            <SourceList title="Canonical" items={[{ path: 'src/components/ui/ArticleVideo.tsx', note: 'FortifyingArticleBody (column) and SeaPowerVideos (grid)' }, { path: 'src/sections/SeaPowerVideos.tsx', note: <>grid usage: one video at <C>max-w-[880px]</C>; several at <C>grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10</C>, titles <C>flex-1</C> so players stay level</> }]} />
          </div>
        </DocSection>

        {/* ───────────────────────────── Gallery ───────────────────────────── */}
        <DocSection title="Image gallery">
          <div className="flex flex-col gap-8">
            <Lead>
              One large stage that cross-fades between images, previous/next controls, a caption with a counter,
              a scrolling thumbnail rail, and click-to-zoom into a lightbox. Optional heading and intro above.
            </Lead>
            <LiveMarkup label="Standing the Digital Watch — Fortifying the Digital Watch" previewClassName="bg-white p-6 lg:p-8" defaultOpen={false}>
              <div className="max-w-[864px]">
                <ArticleImageGallery
                  heading="Standing the Digital Watch"
                  intro="Six photographs from the watch floor and the archive."
                  images={GALLERY_IMAGES}
                />
              </div>
            </LiveMarkup>
            <ClassTable
              rows={[
                { part: 'Figure', classes: 'my-10 flex flex-col gap-4', note: <>Heading <C>font-headline text-[28px] text-[#001845] leading-[1.2]</C> (#001845 = <C>navy-bolder</C>), intro <C>font-body text-[16px] text-neutral-subtle leading-[1.6]</C>, in <C>flex flex-col gap-2</C>.</> },
                { part: 'Stage', classes: 'relative w-full aspect-[16/9] bg-[#f4f4f6] overflow-hidden group', note: <>#f4f4f6 = <C>neutral-subtlest</C>. Every image is stacked in it; portrait images are cropped to 16:9.</> },
                { part: 'Stage image', classes: 'absolute inset-0 w-full h-full object-cover transition-opacity duration-300', note: <>Active <C>opacity-100 z-10</C>; others <C>opacity-0 z-0 pointer-events-none</C> and <C>aria-hidden</C>. All but the first <C>loading="lazy"</C>.</> },
                { part: 'Zoom button', classes: 'absolute inset-0 z-20 cursor-zoom-in', note: <>Covers the stage. <C>aria-label="Zoom: {'{caption}'}"</C>. Hint chip <C>absolute top-4 right-4 z-30 bg-white text-navy-bolder font-body font-bold text-[13px] px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300</C>.</> },
                { part: 'Prev / next', classes: 'absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center bg-navy-bolder/85 text-white hover:bg-navy-bolder transition-all opacity-0 group-hover:opacity-100 focus-visible:opacity-100', note: <>Next uses <C>right-4</C>. Hidden until the stage is hovered or the button focused — on touch screens they never appear; swipe isn&rsquo;t implemented. Wrap around.</> },
                { part: 'Caption', classes: 'flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-l-2 border-[#0466c8] pl-4', note: <>Text <C>font-body text-[15px] text-[#1d2535] leading-[1.55] flex-1 min-w-0</C>, credit inline after an em dash in <C>text-neutral-subtle</C>; counter <C>font-body font-bold text-[13px] text-neutral-subtle flex-shrink-0</C>.</> },
                { part: 'Thumbnail rail', classes: 'grid grid-flow-col auto-cols-[92px] md:auto-cols-[120px] gap-2 md:gap-3 overflow-x-auto scroll-smooth snap-x scrollbar-hide py-1', note: <><C>scrollbar-hide</C> is a global class in index.css. The active thumb scrolls to centre.</> },
                { part: 'Thumbnail', classes: 'h-[70px] md:h-[86px] overflow-hidden border-4 snap-center transition-all', note: <>Active <C>border-[#0466c8]</C> + <C>aria-current="true"</C>; others <C>border-transparent opacity-60 hover:opacity-100</C>. Image <C>alt=""</C> — the button&rsquo;s label names it.</> },
                { part: 'Lightbox', classes: 'fixed inset-0 z-50 flex flex-col items-center justify-center p-6 lg:p-12', note: <><C>role="dialog" aria-modal="true"</C>. Backdrop <C>absolute inset-0 bg-navy-boldest/70 backdrop-blur-sm cursor-zoom-out</C> (click closes); image <C>relative z-10 max-h-[78vh] max-w-full w-auto object-contain</C> — uncropped; caption <C>relative z-10 font-body text-[15px] text-white leading-[1.6] max-w-[820px] text-center mt-5</C>; close <C>absolute top-6 right-6 z-20 flex items-center justify-center w-10 h-10 bg-white text-neutral-subtle hover:bg-neutral-subtlest transition-colors</C>. Opened by internal state, so not in the snapshot.</> },
              ]}
            />
            <DevNote>
              <p>
                Paragraph type <C>gallery</C>: <C>{'{{ heading }}'}</C>, <C>{'{{ intro }}'}</C>, and{' '}
                <C>gallery_item</C> paragraphs (image media + caption; credit from the media). Image styles: a
                16:9 stage crop, a ~240×172 thumbnail crop, and an uncropped large size for the lightbox. Render
                all slides server-side; JS only switches the active one.
              </p>
              <p>
                JS (Drupal behavior): prev/next with wrap-around, thumbnail click, scroll the active thumb into
                view, open/close the lightbox. Two fixes over the prototype: scope the arrow keys to the gallery
                (it listens on <C>window</C>, so ArrowLeft/Right anywhere on the page — in a text field, a tab
                list, another gallery — moves it), and manage focus in the lightbox (move focus to the close
                button on open, trap Tab, return focus to the stage on close). Add an <C>aria-live="polite"</C>{' '}
                region on the caption so the change of image is announced.
              </p>
            </DevNote>
            <SourceList title="Where it lives" items={[{ path: 'src/components/ui/ArticleImageGallery.tsx', note: 'FortifyingArticleBody' }]} />
          </div>
        </DocSection>

        {/* ───────────────────────────── Author bio ───────────────────────────── */}
        <DocSection title="Author bio">
          <div className="flex flex-col gap-8">
            <Lead>
              After the body: the open-forum disclaimer, then a tan panel with the author&rsquo;s name, role,
              bio and two links. With several authors, tabs switch between them.
            </Lead>
            <LiveMarkup label="One author, with disclaimer — How Naval Aviation Got Better" previewClassName="bg-white p-0 pt-6">
              <ArticleAuthorBio authors={GRUBB_AUTHOR} />
            </LiveMarkup>
            <LiveMarkup label="Three authors — Fortifying the Digital Watch (no disclaimer here, to keep it short)" previewClassName="bg-white p-0 pt-6" defaultOpen={false}>
              <ArticleAuthorBio authors={FORTIFYING_AUTHORS} showDisclaimer={false} />
            </LiveMarkup>
            <ClassTable
              rows={[
                { part: 'Section', classes: 'bg-white pb-12 lg:pb-16', note: <>Inner <C>container-site</C> — full container width, not the reading column.</> },
                { part: 'Disclaimer', classes: 'flex gap-3 items-start border border-l-4 border-[#FFAA00] bg-[#FFF8D6] px-5 py-3.5 mb-4', note: <>The warning-alert palette (#FFAA00 / #FFF8D6, no tokens). Label <C>font-body font-bold text-[11px] uppercase tracking-[0.08em] text-[#1D2535] mb-0.5</C>, text <C>font-body text-[12px] text-[#1D2535] leading-relaxed</C>. Proceedings only (<C>showDisclaimer</C>).</> },
                { part: 'Panel', classes: 'px-8 lg:px-14 py-10 lg:py-14', note: <>Inline <C>background-color: #F7F7F2</C> = <C>tan-subtlest</C>; use the token.</> },
                { part: 'Heading', classes: 'font-headline text-2xl lg:text-3xl text-navy-bolder leading-[1.1] mb-6', note: '“About the Author” / “About the Authors”.' },
                { part: 'Tabs (2+ authors)', classes: 'flex flex-wrap gap-1 border-b border-navy-bolder/20 mb-8', note: <>Each tab <C>px-5 py-3 font-body font-semibold text-sm text-left sm:whitespace-nowrap border-b-2 -mb-px transition-colors</C> — the <Link to="/design-system/navigation" className="text-link">TabNav</Link> classes, hand-copied without its roles or keyboard handling (drift).</> },
                { part: 'Name', classes: 'font-headline text-xl lg:text-2xl text-navy-bolder leading-snug', note: 'A <p>.' },
                { part: 'Role', classes: 'font-body text-sm font-semibold text-[#0466c8] mt-1 mb-5', note: 'navy-bright.' },
                { part: 'Bio', classes: 'font-body text-base text-neutral-subtle leading-[1.75]', note: <>In <C>max-w-3xl</C>.</> },
                { part: 'Links', classes: 'flex flex-wrap items-center gap-3 mt-6', note: <><C>ButtonLink variant="navy" size="sm"</C> &ldquo;View Biography&rdquo; and <C>variant="outline-dark"</C> &ldquo;More Stories From This Author&rdquo;, to <C>/authors/{'{slug}'}</C> and <C>…#stories</C>.</> },
              ]}
            />
            <DevNote>
              <p>
                Authors are entity references on the article (an Author content type or taxonomy term with name,
                role and bio fields); <C>{'{{ author.url }}'}</C> replaces the prototype&rsquo;s slugified name. The
                disclaimer is a per-magazine setting (on for Proceedings, off for Naval History), not a per-article
                field. For two or more authors use the shared tab template with all panels rendered (see TabNav on
                the Navigation sheet).
              </p>
            </DevNote>
            <SourceList title="Where it lives" items={[{ path: 'src/sections/ArticleAuthorBio.tsx' }]} />
            <SourceList title="Drift" tone="drift" items={[{ path: 'src/sections/ArticleAuthorBio.tsx', note: 'its tab row duplicates src/components/ui/TabNav.tsx without role="tablist"/"tab", aria-selected or arrow keys.' }]} />
          </div>
        </DocSection>

        {/* ───────────────────────────── Related ───────────────────────────── */}
        <DocSection title="Related articles">
          <div className="flex flex-col gap-8">
            <Lead>A light-blue band of three teasers at the foot of a Proceedings article.</Lead>
            <LiveMarkup label="Default" previewClassName="bg-white p-0" defaultOpen={false}>
              <ArticleRelated />
            </LiveMarkup>
            <ClassTable
              rows={[
                { part: 'Section', classes: 'pt-12 pb-20', note: <>Inline <C>background-color: #EBF4FF</C> (no token). Inner <C>container-site</C>.</> },
                { part: 'Header', classes: 'border-t border-navy-bolder pt-6 mb-8 flex items-center justify-between', note: <>h2 <C>font-headline text-3xl lg:text-4xl text-navy-bolder</C>; CardCta &ldquo;See all articles&rdquo;.</> },
                { part: 'Grid', classes: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10' },
                { part: 'Card image', classes: 'block overflow-hidden aspect-[16/10] bg-neutral-subtlest flex-shrink-0', note: <>A link. Image <C>w-full h-full object-cover hover:scale-105 transition-transform duration-300</C>; alt falls back to the headline, which then repeats beside it.</> },
                { part: 'Card text', classes: 'flex flex-col gap-2', note: <>Category <C>font-body font-semibold text-xs uppercase tracking-widest text-navy-subtle</C>; headline h3 <C>font-headline text-lg lg:text-xl text-navy-bolder leading-[1.1]</C> with <C>article-link hover:text-navy-subtle</C> link; meta <C>font-body text-xs text-neutral-subtle</C>.</> },
              ]}
            />
            <DevNote>
              <p>
                A View block: three articles sharing the most topics with the current one (exclude it), falling
                back to the latest issue. The cards are close to — but not — the Cards sheet&rsquo;s Large Feature
                (16:10 rather than 4:3, no excerpt); reuse a card template rather than adding one. Give the image
                link <C>tabindex="-1"</C> and <C>alt=""</C>, since the headline link beside it goes to the same
                place.
              </p>
            </DevNote>
            <SourceList title="Where it lives" items={[{ path: 'src/sections/ArticleRelated.tsx', note: 'hard-wired to three Proceedings articles from src/data/proceedings.ts' }]} />
          </div>
        </DocSection>

        {/* ───────────────────────────── Comments ───────────────────────────── */}
        <DocSection title="Comments">
          <div className="flex flex-col gap-8">
            <Lead>
              A static mock of the Disqus thread that closes every article: the house heading and comment-policy
              note, then Disqus&rsquo;s own UI. Only the heading and the policy note are USNI&rsquo;s design.
            </Lead>
            <LiveMarkup label="Mock" previewClassName="bg-white p-0 pt-6" defaultOpen={false}>
              <ArticleComments />
            </LiveMarkup>
            <ClassTable
              rows={[
                { part: 'Section', classes: 'bg-white pb-16 lg:pb-20', note: <><C>id="article-comments"</C> — the header&rsquo;s Comments button scrolls here. Inner <C>container-site</C>.</> },
                { part: 'Heading', classes: 'border-t-2 border-navy-bolder pt-6 mb-8', note: <>h2 <C>font-headline text-[48px] text-navy-bolder leading-[1.2]</C>.</> },
                { part: 'Policy note', classes: 'bg-[#f0f2f5] p-5 mb-8 flex items-start justify-between gap-6', note: <>No token for #f0f2f5. Title <C>font-body font-semibold text-sm text-navy-bolder mb-1</C>; text <C>font-body text-sm text-neutral-subtle leading-relaxed</C> with a <C>text-link</C>. The rounded &ldquo;Got it&rdquo; pill (<C>bg-[#2b6cb0]</C>) is Disqus-styled, not house style.</> },
                { part: 'Everything below', classes: '', note: 'Ratings, composer, login icons, sort row, footer — an imitation of Disqus. Do not build it.' },
              ]}
            />
            <DevNote>
              <p>
                Use the Disqus module (or the Disqus universal embed) with the article&rsquo;s canonical URL and
                node id as the thread identifier. Build only the heading and policy note in Twig; the rest is
                Disqus&rsquo;s iframe. Load it lazily (when the section nears the viewport) — it is heavy, and
                most readers never scroll that far.
              </p>
            </DevNote>
            <SourceList title="Where it lives" items={[{ path: 'src/sections/ArticleComments.tsx' }]} />
          </div>
        </DocSection>

        {/* ───────────────────────── Images, ratios, captions ───────────────────────── */}
        <DocSection title="Image ratios, captions and credits">
          <div className="flex flex-col gap-8">
            <Lead>
              Every article image sits in a fixed-ratio frame with <C>object-cover</C> unless it must not be
              cropped (in-column photos, charts, the lightbox). The general rules — and the card ratios — are on{' '}
              <Link to="/design-system/iconography" className="text-link">Iconography &amp; Imagery</Link>.
            </Lead>
            <DocTable
              head={['Use', 'Ratio / sizing', 'Crop', 'Suggested image style']}
              rows={[
                ['Article hero', <C key="1">aspect-[16/7]</C>, 'object-cover', '16:7, ~1312w (2x 2624w), focal point'],
                ['In-column photo', <C key="2">h-auto</C>, 'none — natural ratio', 'scale to 864w (2x 1728w)'],
                ['Chart figure', <C key="3">h-auto</C>, 'none', 'scale to 832w; PNG'],
                ['Image pair', <C key="4">aspect-[4/3]</C>, 'object-cover', '4:3, ~430w'],
                ['Full-bleed / wide', <><C>aspect-[16/9]</C> (prop)</>, 'object-cover', '16:9, 1920w'],
                ['Video poster', <C key="6">aspect-video</C>, 'object-cover', '16:9, 864w (column) / 420w (grid)'],
                ['Gallery stage / thumbs', <><C>aspect-[16/9]</C>; thumbs 92×70, 120×86 from md</>, 'object-cover', '16:9 864w; thumb ~240×172; lightbox uncropped'],
                ['Related card', <C key="8">aspect-[16/10]</C>, 'object-cover', '16:10, ~420w'],
                ['Mega-menu promo', <C key="9">aspect-[16/9]</C>, 'object-cover', '16:9, 380w'],
                ['Paywall photo', <C key="10">h-[280px] lg:h-[400px]</C>, 'object-cover', 'fixed-height crop, 864w'],
              ]}
            />
            <Lead>
              Captions come in three treatments today. The in-column one is shared by three components and is the
              recommended spec; the other two are listed so design can confirm whether they are intended.
            </Lead>
            <ClassTable
              rows={[
                { part: 'In-column (spec)', classes: 'mt-3 font-body text-sm text-neutral-subtle leading-relaxed', note: <>Credit on its own line inside the caption: <C>block text-neutral-subtle/60 mt-0.5</C>, prefixed &ldquo;Photo Credit:&rdquo;. PhotoFigure, ArticleImagePair, ArticleFullBleedImage.</> },
                { part: 'Hero', classes: 'font-body text-xs text-neutral-subtle leading-relaxed', note: <>Smaller: caption and credit are separate <C>{'<p>'}</C>s, credit <C>font-body text-xs text-neutral-subtle/70 mt-1</C>, same prefix. ArticleHeroImage.</> },
                { part: 'Media (video, gallery)', classes: 'border-l-2 border-[#0466c8] pl-4', note: <>15px with a blue rule; the gallery puts the credit inline after an em dash and uses <C>text-[#1d2535]</C> for the caption, the video uses <C>text-neutral-subtle</C> and has no credit.</> },
                { part: 'Mitscher (drift)', classes: 'font-body text-xs text-neutral-subtle leading-relaxed', note: 'Credit without the “Photo Credit:” label, both in the hero and the inline figure.' },
              ]}
            />
            <DevNote>
              <p>
                Credit is a field on the media entity (it belongs to the photograph); caption is a field on the
                paragraph or node that places it (it belongs to the story). Alt text is on the media, describes
                the image, and never repeats the caption. Output the credit label (&ldquo;Photo Credit:&rdquo;)
                from the template, not the field, so it is consistent; editors type only &ldquo;U.S. Navy&rdquo;.
                Every in-body figure is a <C>{'<figure>'}</C> with a <C>{'<figcaption>'}</C>, omitted when both
                caption and credit are empty.
              </p>
            </DevNote>
          </div>
        </DocSection>

        {/* ───────────────────────────── Drupal mapping ───────────────────────────── */}
        <DocSection title="Drupal mapping">
          <div className="flex flex-col gap-8">
            <Lead>
              One Article content type for both magazines. Fixed parts of the page are node fields rendered by
              the template; the body is a single Paragraphs field, with one paragraph type per block below, so
              each per-article body file in the prototype becomes content rather than code.
            </Lead>
            <DocTable
              head={['Block', 'Where it lives', 'Fields']}
              rows={[
                ['Headline, deck', 'node', 'title; deck (plain text)'],
                ['Dateline', 'node', 'issue (reference → date, magazine); read time computed'],
                ['Byline, author bio', 'node', 'authors (references → name, role, bio, url)'],
                ['Hero image', 'node', 'hero media; hero caption'],
                ['In Brief', 'node', 'in_brief (multi-value formatted text)'],
                ['Audio', 'template', 'Instaread embed on every article'],
                ['References', 'node', 'references (formatted text / multi-value)'],
                ['Topics', 'node', 'topics (taxonomy terms → topic listing)'],
                ['Related, comments', 'template', 'View block; Disqus'],
                ['Text', <C key="t">paragraph: text</C>, 'body (formatted text: p, h2, h3, em, strong, sup, a, ul/ol, hr). Drop cap: node checkbox styling the first letter'],
                ['Image', <C key="i">paragraph: image</C>, 'media; caption; display (in column | full width)'],
                ['Image pair', <C key="p">paragraph: image_pair</C>, 'media ×2; caption; credit'],
                ['Chart', <C key="c">paragraph: chart</C>, 'media (PNG/SVG); caption — or an image with a “bordered” display'],
                ['Gallery', <C key="g">paragraph: gallery</C>, 'heading; intro; gallery_item paragraphs (media; caption)'],
                ['Video', <C key="v">paragraph: video</C>, 'remote video media; poster override; caption'],
                ['Pull quote', <C key="q">paragraph: pull_quote</C>, 'quote; attribution; “repeats body text” (→ aria-hidden)'],
                ['Callout', <C key="co">paragraph: callout</C>, 'body (formatted text)'],
                ['Timeline', <C key="tl">paragraph: timeline</C>, 'eyebrow; caption; timeline_item paragraphs (year; label)'],
                ['Colour-block sidebar', <C key="s">paragraph: sidebar</C>, 'heading; nested text / chart / image paragraphs'],
                ['Margin note', <C key="m">paragraph: margin_note</C>, 'term; note — only if the layout gains a free gutter'],
                ['In-body ads', 'preprocess', 'inserted after the Nth text paragraph; rail slots in the template'],
                ['Paywall, meter', 'template', 'access check truncates the body; banner from the metering count'],
              ]}
            />
            <DevNote>
              <p>
                Every paragraph type renders inside the 864px reading column and inherits the prose spacing
                (32px between blocks). Full-width types (image in full-width display, sidebar band) and anything
                after a floated callout need <C>clear: right</C>. The Naval History article should use the same
                type and the same templates as Proceedings — its separate layout in the prototype is drift, not a
                second design.
              </p>
            </DevNote>
            <PropsTable
              rows={[
                { name: 'ArticleVideo', type: '{ youtubeId, poster, posterAlt, title, caption?, className? }', default: "className 'my-10'", description: 'React reference. youtubeId is the bare id, not a URL.' },
                { name: 'ArticleImageGallery', type: '{ images: GalleryImage[], heading?, intro? }', description: 'GalleryImage = { src, alt, caption, credit? }.' },
                { name: 'ArticleFullBleedImage', type: '{ src, alt, caption?, photoCredit?, aspect?, bleed? }', default: "aspect 'aspect-[16/9]'", description: 'bleed spans the viewport.' },
                { name: 'ArticleAuthorBio', type: '{ authors: ArticleAuthor[], showDisclaimer? }', default: 'showDisclaimer true', description: 'Tabs appear with 2+ authors.' },
                { name: 'ArticleBody', type: '{ restricted? }', default: 'false', description: 'The Three MEFs article; restricted shows the paywall demo.' },
              ]}
            />
          </div>
        </DocSection>
      </div>
    </DesignSystemLayout>
  )
}
