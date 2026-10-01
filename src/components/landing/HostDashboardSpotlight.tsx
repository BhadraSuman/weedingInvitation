import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, CheckCircle2, Eye, Send, ArrowRight, 
  Utensils, Sparkles, MessageCircle, BarChart3, ShieldCheck 
} from 'lucide-react';

export const HostDashboardSpotlight: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 max-w-5xl mx-auto" id="host-portal">
      <div className="rounded-3xl p-6 sm:p-12 bg-gradient-to-br from-[#1C1917] via-[#292524] to-[#1C1917] text-white shadow-2xl border-2 border-[#D4AF37] relative overflow-hidden">
        
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#8B181B]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#D4AF37]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Text Column (6 cols) */}
          <div className="lg:col-span-6 space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#F3E5AB] text-xs font-serif font-bold uppercase tracking-wider">
              <BarChart3 className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Host Management Portal</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white leading-tight">
              This is what separates UtsavPatra from a pretty graphic card.
            </h2>

            <p className="text-xs sm:text-sm font-serif text-stone-300 leading-relaxed">
              Managing 300+ wedding guests over messy WhatsApp groups is chaotic. UtsavPatra equips hosts with an executive event dashboard to manage everything in one organized hub.
            </p>

            <ul className="space-y-2.5 text-xs font-serif text-stone-200 text-left pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Real-time RSVP Count:</strong> Track exact heads (Adults + Kids) for venue planning.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Who Opened The Link:</strong> See which relatives viewed their card and when.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>1-Click WhatsApp Reminder Blast:</strong> Politely nudge pending guests without awkward phone calls.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Catering Diet Breakdown:</strong> Exact Veg vs. Non-Veg counts to prevent food waste.</span>
              </li>
            </ul>

            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <Link
                to="/host-dashboard"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#D4AF37] hover:bg-[#B89628] text-stone-950 font-serif font-bold text-xs sm:text-sm shadow-xl transition-transform hover:scale-105"
              >
                <span>Launch Host Dashboard Demo</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Interactive UI Mockup Column (6 cols) */}
          <div className="lg:col-span-6 bg-stone-900/90 rounded-2xl p-5 border border-stone-700 shadow-2xl backdrop-blur-md">
            
            {/* Dashboard Header Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-stone-800 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-stone-300 font-bold">Host Portal • Sandeep &amp; Priya</span>
              </div>
              <span className="text-[10px] font-mono text-stone-400 bg-stone-800 px-2 py-0.5 rounded">Live Sync</span>
            </div>

            {/* Mini Metrics 3-Col */}
            <div className="grid grid-cols-3 gap-2 my-4">
              <div className="bg-stone-800/80 p-2.5 rounded-xl text-center border border-stone-700">
                <span className="text-[10px] text-stone-400 uppercase font-mono block">Invited</span>
                <span className="text-lg font-bold text-white font-mono">260</span>
              </div>
              <div className="bg-emerald-950/40 p-2.5 rounded-xl text-center border border-emerald-800/50">
                <span className="text-[10px] text-emerald-400 uppercase font-mono block">Opened</span>
                <span className="text-lg font-bold text-emerald-400 font-mono">214 (82%)</span>
              </div>
              <div className="bg-blue-950/40 p-2.5 rounded-xl text-center border border-blue-800/50">
                <span className="text-[10px] text-blue-400 uppercase font-mono block">Attending</span>
                <span className="text-lg font-bold text-blue-400 font-mono">182 Heads</span>
              </div>
            </div>

            {/* Mock Guest List Rows */}
            <div className="space-y-2 text-xs font-serif">
              <div className="p-2.5 rounded-xl bg-stone-800/60 flex items-center justify-between border border-stone-700">
                <div>
                  <div className="font-bold text-stone-200">Sharma Ji &amp; Family</div>
                  <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <Eye className="w-3 h-3" /> Opened 2h ago • 4 Adults
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-blue-900/60 text-blue-300 text-[10px] font-bold border border-blue-700">
                  Confirmed
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-stone-800/60 flex items-center justify-between border border-stone-700">
                <div>
                  <div className="font-bold text-stone-200">Rajeev &amp; Sunita Agarwal</div>
                  <div className="text-[10px] text-amber-400 flex items-center gap-1">
                    <Send className="w-3 h-3" /> Awaiting RSVP
                  </div>
                </div>
                <button
                  type="button"
                  className="px-2 py-1 rounded-lg bg-emerald-600 text-white text-[10px] font-bold flex items-center gap-1"
                >
                  <MessageCircle className="w-3 h-3" /> WhatsApp Blast
                </button>
              </div>

              <div className="p-2.5 rounded-xl bg-stone-800/60 flex items-center justify-between border border-stone-700">
                <div>
                  <div className="font-bold text-stone-200">Dr. Debabrata Roy</div>
                  <div className="text-[10px] text-stone-400">
                    Opened yesterday • 2 Adults, 1 Child
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-amber-900/60 text-amber-300 text-[10px] font-bold border border-amber-700">
                  Pending Diet
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-800 text-center">
              <span className="text-[11px] font-serif text-[#D4AF37]">
                ✨ Included complimentary with all Premium &amp; Royal Packages
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
