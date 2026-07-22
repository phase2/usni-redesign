import audioDemoImg from '@/assets/images/usni-audio-flat-demo.png'

// Static screenshot of the real Instaread player's members-only (locked) state — the live iframe
// embed doesn't render on this prototype's domain, so this replaces it everywhere it's used.
export default function ArticleAudioPlayer() {
  return (
    <div className="border-l-4 border-[#023e7d]">
      <div className="bg-white border border-[#023e7d] border-l-0 p-4">
        <img src={audioDemoImg} alt="Members-only audio feature — sign in to listen" className="w-full h-auto" />
      </div>
    </div>
  )
}
