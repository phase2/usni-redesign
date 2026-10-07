import { useState } from 'react'
import Pagination from '@/components/ui/Pagination'
import { episodes, type Episode } from '@/data/podcastEpisodes'

function EpisodePlayer({ trackId, title }: { trackId: number; title: string }) {
  const src =
    'https://w.soundcloud.com/player/?url=' +
    encodeURIComponent(`https://api.soundcloud.com/tracks/${trackId}`) +
    '&color=%23023e7d&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true'
  return (
    <iframe
      title={`SoundCloud player: ${title}`}
      width="100%"
      height="166"
      scrolling="no"
      frameBorder="no"
      loading="lazy"
      allow="autoplay"
      src={src}
      className="mt-5"
    />
  )
}

function EpisodeCard({ episode }: { episode: Episode }) {
  return (
    <article className="py-8 lg:py-10">
      <div className="min-w-0">
        <h3 className="font-body font-bold text-[19px] lg:text-[21px] text-navy-bolder leading-snug">
          <a href="#" className="hover:text-navy-subtle transition-colors">{episode.title}</a>
        </h3>
        <p className="font-body font-semibold text-sm uppercase tracking-[0.08em] text-neutral-subtle mt-2">
          {episode.date}
        </p>
        <p className="font-body text-base text-[#1d2535] leading-relaxed mt-3">
          {episode.description}
        </p>
        <EpisodePlayer trackId={episode.trackId} title={episode.title} />
      </div>
    </article>
  )
}

export default function ProceedingsPodcastEpisodes() {
  const [year, setYear] = useState('all')

  const filtered = episodes.filter((ep) => year === 'all' || ep.year === Number(year))

  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="container-site max-w-[1000px]">

        {/* ── Intro ── */}
        <div className="font-body text-base lg:text-lg text-[#1d2535] leading-relaxed space-y-5">
          <p>
            Every week, the Proceedings Podcast covers a wide range of topics and brings the pages of{' '}
            <em>Proceedings</em> and <em>Naval History</em> to life.
          </p>
          <p>
            Join the Editor-in-Chief of Proceedings, Bill Hamblet, and Editor-in-Chief of Naval History, Emily
            Abdow, as they host a variety of <em>Proceedings</em> and <em>Naval History</em> authors and naval
            leaders &ldquo;in the know&rdquo; to discuss issues facing the Sea Services and explore the latest
            trending topics and stories from <em>USNI News</em>.
          </p>
          <p>
            Whether you're a history major at the U.S. Naval Academy, or you just want to broaden your knowledge
            base, the best <em>Naval History</em> editions are great for anyone looking to add naval history to
            their media diet. Join Naval History Editor-in-Chief Emily Abdow as she dives into{' '}
            <em>Naval History</em> articles, offers first-person accounts, and discusses well known and not so
            well known events in naval history to help inform opinions by understanding naval historical context.
          </p>
        </div>

        {/* ── Episodes heading + year filter ── */}
        <div className="flex flex-wrap items-end justify-between gap-4 mt-12">
          <h2 className="font-headline text-[32px] lg:text-[40px] text-[#060a0a] leading-[1.1]">
            Episodes
          </h2>
          <label className="flex flex-col gap-1.5">
            <span className="font-body font-semibold text-sm uppercase tracking-[0.08em] text-navy-bolder">
              Year
            </span>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="select-field font-body text-sm text-navy-bolder border border-[#94A3B8] px-3 py-2.5 pr-8 outline-none focus:border-navy-bright focus:shadow-[0_0_0_3px_rgba(4,102,200,0.15)] bg-white transition"
              aria-label="Filter episodes by year"
            >
              <option value="all">All Years</option>
              <option value="2026">2026</option>
              <option value="2025">2025</option>
            </select>
          </label>
        </div>

        {/* ── Light accent separator between the filter row and episodes ── */}
        <div className="bg-[#C2DDFF] h-px w-full mt-6" />

        {/* ── Episode list ── */}
        {filtered.length > 0 ? (
          <div className="divide-y divide-[#d5dbe3]">
            {filtered.map((episode) => (
              <EpisodeCard key={episode.title} episode={episode} />
            ))}
          </div>
        ) : (
          <p className="font-body text-lg text-neutral-subtle py-12 text-center">
            No episodes match the selected year.
          </p>
        )}

        {/* ── Pagination (demo) ── */}
        <div className="mt-10">
          <Pagination label="Episode pagination" />
        </div>

      </div>
    </section>
  )
}
