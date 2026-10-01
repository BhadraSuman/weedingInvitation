import React, { useState } from 'react';
import { Sparkles, Copy, Check, ExternalLink, MessageCircle, Send, Heart } from 'lucide-react';

export const PersonalizedLinkSandbox: React.FC = () => {
  const [guestName, setGuestName] = useState('Uncle Sharma Ji & Family');
  const [selectedEvent, setSelectedEvent] = useState<'sandeep-weds-priya' | 'anirban-weds-deboleena'>('sandeep-weds-priya');
  const [copied, setCopied] = useState(false);

  const coupleName = selectedEvent === 'sandeep-weds-priya' ? 'Sandeep & Priya' : 'Anirban & Deboleena';
  const eventCulture = selectedEvent === 'sandeep-weds-priya' ? 'Shubh Vivah — North Indian Traditions' : 'Bengali Shubh Bibaha';
  
  const generatedUrl = `https://utsavpatra.vercel.app/${selectedEvent}?to=${encodeURIComponent(guestName.trim() || 'Respected Guest')}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getWhatsAppShareUrl = () => {
    const text = encodeURIComponent(
      `🙏 Namaste ${guestName}!\n\nWith joyful hearts and folded hands, we cordially invite you and your family to celebrate the wedding of ${coupleName}.\n\n✨ Tap to open your personalized wax-sealed invitation patrika:\n${generatedUrl}\n\nWe eagerly await your gracious presence and blessings!`
    );
    return `https://wa.me/?text=${text}`;
  };

  return (
    <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto" id="personalization-engine">
      <div className="rounded-3xl p-6 sm:p-12 border-2 border-[#D4AF37] bg-gradient-to-br from-[#FFFDF9] via-[#FAF5E8] to-[#FFFDF9] shadow-xl relative overflow-hidden">
        
        {/* Subtle decorative watermark */}
        <div className="absolute -top-6 -right-6 text-9xl opacity-5 pointer-events-none font-serif select-none">
          💌
        </div>

        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B181B] text-[#F3E5AB] text-xs font-serif font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>The VIP Guest Experience</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#8B181B]">
            Why send a mass card when you can make every relative feel like royalty?
          </h2>

          <p className="text-xs sm:text-sm font-serif text-stone-600 leading-relaxed">
            With UtsavPatra, you can generate <strong>unique, individualized invitation links</strong> for 200+ guests in seconds. Their family name is etched in gold on the wax seal, welcomed in the opening ceremony, and honored across the invitation!
          </p>
        </div>

        {/* Interactive Link Tester Sandbox */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#D4AF37]/50 shadow-md max-w-2xl mx-auto">
          
          <h3 className="text-sm font-serif font-bold text-stone-800 uppercase tracking-wider mb-4 flex items-center gap-2">
            <span>✨ Try the Guest Personalization Sandbox:</span>
          </h3>

          <div className="space-y-4">
            
            {/* Input Name */}
            <div>
              <label className="block text-xs font-serif font-bold text-stone-700 mb-1">
                Enter any relative or family name:
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {['Uncle Sharma Ji & Family', 'Joydeep Da & Debjani Bhabhi', 'Priya Di & Family', 'Dr. Narayanan'].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setGuestName(preset)}
                    className="text-[11px] font-serif px-2.5 py-1 rounded-full bg-stone-100 hover:bg-amber-100 text-stone-700 hover:text-amber-900 border border-stone-200 transition-colors"
                  >
                    + {preset}
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="e.g. Uncle Sharma Ji & Family"
                className="w-full text-sm font-serif px-4 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#8B181B] focus:border-transparent outline-none"
              />
            </div>

            {/* Select Wedding Template */}
            <div>
              <label className="block text-xs font-serif font-bold text-stone-700 mb-1">
                Select Wedding Theme:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedEvent('sandeep-weds-priya')}
                  className={`p-3 rounded-xl border text-xs font-serif font-bold text-left transition-all ${
                    selectedEvent === 'sandeep-weds-priya'
                      ? 'border-[#0D4A36] bg-[#0D4A36]/10 text-[#0D4A36] shadow-sm'
                      : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  🚩 Sandeep &amp; Priya (Shubh Vivah — North Indian)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedEvent('anirban-weds-deboleena')}
                  className={`p-3 rounded-xl border text-xs font-serif font-bold text-left transition-all ${
                    selectedEvent === 'anirban-weds-deboleena'
                      ? 'border-[#8B181B] bg-[#8B181B]/10 text-[#8B181B] shadow-sm'
                      : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  🪔 Anirban &amp; Deboleena (Bengali Lagna Patrika)
                </button>
              </div>
            </div>

            {/* Live Generated Preview Box */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 mt-4 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-serif font-bold text-amber-900">
                  🏷️ Wax Seal Preview:
                </span>
                <span className="px-2 py-0.5 rounded bg-white text-amber-800 font-serif font-bold text-[10px] border border-amber-200">
                  VIP Guest Badge
                </span>
              </div>

              {/* Mock Wax Seal */}
              <div className="p-3 bg-white rounded-lg border border-amber-300 text-center shadow-inner">
                <span className="text-[10px] text-amber-700 uppercase font-serif tracking-widest block font-bold">
                  ॥ सादर आमंत्रण • Cordially Invited ॥
                </span>
                <span className="text-base sm:text-lg font-bold font-serif text-[#8B181B] block mt-0.5">
                  {guestName || 'Your Honored Guest'}
                </span>
                <span className="text-[10px] text-stone-500 font-serif block">
                  Honored with family for {coupleName}'s wedding
                </span>
              </div>

              {/* URL String */}
              <div className="text-[11px] font-mono text-stone-600 bg-white/80 p-2 rounded border border-stone-200 break-all select-all">
                {generatedUrl}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <a
                  href={generatedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[140px] flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#8B181B] hover:bg-[#681013] text-[#F3E5AB] font-serif text-xs font-bold shadow-md transition-transform hover:scale-[1.02] whitespace-nowrap"
                >
                  <span>Preview as {guestName.split(' ')[0] || 'Guest'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 py-2.5 px-4 rounded-xl bg-white hover:bg-stone-50 text-stone-700 border border-stone-300 font-serif text-xs font-bold transition-all shadow-sm whitespace-nowrap shrink-0"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
                </button>

                <a
                  href={getWhatsAppShareUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-serif text-xs font-bold transition-transform hover:scale-[1.02] shadow-sm whitespace-nowrap shrink-0"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>Share on WhatsApp</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
