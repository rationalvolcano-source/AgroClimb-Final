import Nav from "@/components/Nav";
import { Newspaper, Bell, Clock } from "lucide-react";

export default function DailyNews() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Nav />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-cyan-500/10 text-cyan-400 mb-6">
            <Newspaper className="h-10 w-10" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-daily-news-title">
            Daily News Update
          </h1>
          <p className="text-slate-300 text-lg mb-8 max-w-lg mx-auto" data-testid="text-daily-news-subtitle">
            Stay informed with curated agricultural news, current affairs, and exam-relevant updates
          </p>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 text-amber-400 font-medium mb-10">
            <Clock className="w-4 h-4" />
            Coming Soon
          </div>
          
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 max-w-md mx-auto">
            <Bell className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-3">Get Notified</h2>
            <p className="text-slate-400 text-sm mb-6">
              We're working on bringing you daily news updates. Contact us on WhatsApp to get notified when we launch.
            </p>
            <a
              href="https://wa.me/918250904021?text=Hi%2C%20please%20notify%20me%20when%20Daily%20News%20Update%20is%20available"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold transition-colors"
              data-testid="button-notify-whatsapp"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Notify Me on WhatsApp
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
