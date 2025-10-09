export default function WCStreamHeader() {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-4 md:p-6 mb-6" data-testid="section-wellness-header">
      <div className="grid md:grid-cols-2 gap-4 md:gap-6 items-center">
        <div>
          <h1 className="text-3xl md:text-5xl font-semibold" data-testid="text-wellness-title">Wellness Centre</h1>
          <p className="text-slate-300 mt-2" data-testid="text-wellness-description">
            Micro-sessions for stress, focus & rest — built for agri aspirants.
            Free guided videos and tools to support your study journey.
          </p>
          <div className="mt-4 flex gap-3">
            <a className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500" href="#quick-calm" data-testid="link-quick-calm">
              Try Quick Calm
            </a>
            <a className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700" href="#yoga-videos" data-testid="link-yoga-videos">
              Watch Yoga Videos
            </a>
          </div>
        </div>
        <div className="aspect-video w-full rounded-xl overflow-hidden border border-slate-800 bg-black">
          <iframe
            title="TAV Wellness Livestream"
            className="w-full h-full"
            src="https://www.youtube.com/embed/live_stream?channel=YOUR_CHANNEL_ID&autoplay=1&mute=1"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            data-testid="iframe-wellness-livestream"
          />
        </div>
      </div>
    </section>
  );
}
