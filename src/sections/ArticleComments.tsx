export default function ArticleComments() {
  return (
    <section id="article-comments" className="bg-white pt-14 pb-16 lg:pb-20">
      <div className="container-site">

        {/* Accent line + headline */}
        <div className="border-t-2 border-navy-bolder pt-6 mb-8">
          <h2 className="font-headline text-[48px] text-navy-bolder leading-[1.2]">Comments</h2>
        </div>

        {/* Comment policy */}
        <div className="bg-[#f0f2f5] p-5 mb-8 flex items-start justify-between gap-6">
          <div>
            <p className="font-body font-semibold text-sm text-navy-bolder mb-1">U.S. Naval Institute Comment Policy</p>
            <p className="font-body text-sm text-neutral-subtle leading-relaxed">
              We encourage open conversation. Comments that violate our standards may be removed.
              <br />
              Please read our{' '}
              <a href="/comment-policy" className="text-[#2b6cb0] underline hover:no-underline">Comment Policy</a>{' '}
              before commenting.
            </p>
          </div>
          <button
            type="button"
            className="flex-shrink-0 bg-[#2b6cb0] text-white font-body font-semibold text-sm px-8 py-2.5 rounded-full hover:bg-[#2558a0] transition-colors whitespace-nowrap"
          >
            Got it
          </button>
        </div>

        {/* Star rating */}
        <div className="flex flex-col items-center gap-1 py-4 mb-4">
          <p className="font-body text-sm text-neutral-subtle">0 Ratings</p>
          <div className="flex items-center gap-1.5">
            {[1,2,3,4,5].map(n => (
              <i key={n} className="fa-regular fa-star text-[22px] text-neutral-subtle/30" aria-hidden="true" />
            ))}
            <span className="font-body text-sm text-neutral-subtle ml-1">0.0</span>
          </div>
        </div>

        {/* Comment count + login row */}
        <div className="flex items-center justify-between pb-3 border-b border-[#d8dde6]">
          <span className="font-body font-semibold text-sm text-[#1d2535]">0 Comments</span>
          <button
            type="button"
            className="flex items-center gap-1.5 font-body text-sm text-[#1d2535] hover:text-navy-subtle transition-colors"
          >
            <span className="w-5 h-5 rounded-full bg-[#e85d04] flex items-center justify-center flex-shrink-0 text-white text-[10px] font-bold leading-none">1</span>
            Login
            <i className="fa-solid fa-caret-down text-xs" aria-hidden="true" />
          </button>
        </div>

        {/* Composer */}
        <div className="pt-5 pb-4">
          <div className="flex items-start gap-4">

            {/* Avatar */}
            <div className="w-10 h-10 rounded bg-[#2b6cb0] flex items-center justify-center flex-shrink-0">
              <span className="font-body font-bold text-white text-[15px] leading-none">G</span>
            </div>

            {/* Input area */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-body text-xs font-semibold text-neutral-subtle uppercase tracking-wider">Rate and comment</span>
                <div className="flex items-center gap-0.5">
                  {[1,2,3,4,5].map(n => (
                    <i key={n} className="fa-regular fa-star text-base text-neutral-subtle/30 cursor-pointer hover:text-[#f6ad55]" aria-hidden="true" />
                  ))}
                </div>
              </div>

              <input
                type="text"
                readOnly
                placeholder="Start the discussion..."
                className="w-full border border-[#d8dde6] rounded-sm font-body text-sm text-neutral-subtle px-4 py-3 focus:outline-none bg-white cursor-pointer"
              />

              {/* Auth row */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-3">
                <div className="flex items-center gap-2">
                  <span className="font-body text-[10px] font-bold uppercase tracking-widest text-neutral-subtle">Log in with</span>
                  <div className="flex items-center gap-1.5">
                    {/* Disqus */}
                    <span className="w-7 h-7 rounded-full bg-[#2E9FFF] flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
                      <i className="fa-brands fa-disqus text-white text-sm" aria-hidden="true" />
                    </span>
                    {/* Facebook */}
                    <span className="w-7 h-7 rounded-full bg-[#1877F2] flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
                      <i className="fa-brands fa-facebook-f text-white text-xs" aria-hidden="true" />
                    </span>
                    {/* X */}
                    <span className="w-7 h-7 rounded-full bg-[#1d2535] flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
                      <i className="fa-brands fa-x-twitter text-white text-xs" aria-hidden="true" />
                    </span>
                    {/* Google */}
                    <span className="w-7 h-7 rounded-full bg-white border border-[#d8dde6] flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
                      <i className="fa-brands fa-google text-[#EA4335] text-xs" aria-hidden="true" />
                    </span>
                    {/* Apple */}
                    <span className="w-7 h-7 rounded-full bg-white border border-[#d8dde6] flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
                      <i className="fa-brands fa-apple text-[#1d2535] text-sm" aria-hidden="true" />
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="font-body text-[10px] font-bold uppercase tracking-widest text-neutral-subtle">or sign up with Disqus</span>
                    <span className="w-4 h-4 rounded-full border border-neutral-subtle/40 flex items-center justify-center cursor-pointer">
                      <i className="fa-solid fa-question text-[9px] text-neutral-subtle" aria-hidden="true" />
                    </span>
                  </div>
                  <input
                    type="text"
                    readOnly
                    placeholder="Name"
                    className="border border-[#d8dde6] rounded-sm font-body text-sm text-neutral-subtle px-3 py-2 w-40 focus:outline-none bg-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sort row */}
        <div className="flex items-center justify-between py-3 border-t border-[#d8dde6]">
          <div className="flex items-center gap-3 font-body text-sm text-neutral-subtle">
            <button type="button" className="flex items-center gap-1 hover:text-navy-bolder transition-colors">
              <i className="fa-regular fa-heart text-xs" aria-hidden="true" />
            </button>
            <span>•</span>
            <button type="button" className="hover:text-navy-bolder transition-colors">Share</button>
          </div>
          <div className="flex items-center gap-4 font-body text-sm">
            <button type="button" className="text-[#2b6cb0] font-bold border-b border-[#2b6cb0] leading-tight">Best</button>
            <button type="button" className="text-neutral-subtle hover:text-navy-bolder transition-colors">Newest</button>
            <button type="button" className="text-neutral-subtle hover:text-navy-bolder transition-colors">Oldest</button>
          </div>
        </div>

        {/* Empty state */}
        <div className="py-12 text-center">
          <p className="font-body text-sm text-neutral-subtle">Be the first to comment.</p>
        </div>

        {/* Disqus footer bar */}
        <div className="flex items-center justify-between py-4 border-t border-[#d8dde6] mt-4">
          <div className="flex items-center gap-5">
            <button type="button" className="flex items-center gap-1.5 font-body text-xs text-neutral-subtle hover:text-navy-bolder transition-colors">
              <i className="fa-regular fa-envelope text-xs" aria-hidden="true" />
              Subscribe
            </button>
            <button type="button" className="flex items-center gap-1.5 font-body text-xs text-neutral-subtle hover:text-navy-bolder transition-colors">
              <i className="fa-solid fa-shield-halved text-xs" aria-hidden="true" />
              Privacy
            </button>
            <button type="button" className="flex items-center gap-1.5 font-body text-xs text-neutral-subtle hover:text-navy-bolder transition-colors">
              <i className="fa-solid fa-circle-exclamation text-xs" aria-hidden="true" />
              Do Not Sell My Data
            </button>
          </div>
          <span className="font-body font-black text-[15px] tracking-tight text-[#2E9FFF] uppercase">DISQUS</span>
        </div>

      </div>
    </section>
  )
}
