import React, { useState } from 'react';
import { CulturalTemplate, Language } from '../types/wedding';
import {
  Coins,
  Send,
  Check,
  Copy,
  QrCode,
  Smartphone,
  Sparkles,
  Heart,
  Share2,
  Gift,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface DigitalShagunSectionProps {
  template: CulturalTemplate;
  lang: Language;
}

export const DigitalShagunSection: React.FC<DigitalShagunSectionProps> = ({
  template,
  lang,
}) => {
  const config = template.shagunConfig;
  if (!config || !config.enabled) return null;

  const isBengali = lang === 'native' && template.id !== 'bihari_marwari';
  const isHindi = lang === 'native' && template.id === 'bihari_marwari';

  const defaultAmounts = config.defaultAmounts || [501, 1001, 2101, 5001];
  const [selectedAmount, setSelectedAmount] = useState<number>(defaultAmounts[1] || 1001);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [senderName, setSenderName] = useState<string>('');
  const [blessingNote, setBlessingNote] = useState<string>('');
  const [showQrCode, setShowQrCode] = useState<boolean>(false);
  const [copiedUpi, setCopiedUpi] = useState<boolean>(false);
  const [hasSentConfirmation, setHasSentConfirmation] = useState<boolean>(false);

  const activeAmount = customAmount ? parseInt(customAmount, 10) || 0 : selectedAmount;

  // Build standard NPCI UPI Deep Link
  const upiNote = blessingNote.trim()
    ? `${template.quotes.weddingTitle} Shagun from ${senderName || 'Family Guest'}: ${blessingNote.slice(0, 40)}`
    : `${template.quotes.weddingTitle} Shagun from ${senderName || 'Family Guest'}`;

  const upiIntentUrl = `upi://pay?pa=${config.upiId}&pn=${encodeURIComponent(config.recipientName)}&am=${activeAmount}&cu=INR&tn=${encodeURIComponent(upiNote)}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(upiIntentUrl)}`;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(config.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleAddAuspiciousOne = () => {
    const current = activeAmount;
    if (current % 10 === 0) {
      const next = current + 1;
      setCustomAmount(next.toString());
    } else {
      const next = Math.ceil(current / 100) * 100 + 1;
      setCustomAmount(next.toString());
    }
  };

  const handleConfirmSent = () => {
    setHasSentConfirmation(true);
    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.7 },
        colors: [template.colors.primary, template.colors.accent, '#F59E0B', '#10B981']
      });
    } catch {}
  };

  return (
    <section className="relative my-12" id="shagun">
      <div
        className="rounded-3xl p-6 sm:p-10 border-2 shadow-2xl relative overflow-hidden transition-all"
        style={{
          backgroundColor: '#FFFFFF',
          borderColor: template.colors.border || template.colors.accent
        }}
      >
        {/* Subtle Ambient Background Watermark */}
        <div
          className="absolute -top-12 -right-12 w-48 h-48 rounded-full pointer-events-none opacity-10 blur-2xl"
          style={{ backgroundColor: template.colors.primary }}
        />

        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-2 mb-8">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border shadow-sm"
            style={{
              backgroundColor: `${template.colors.primary}15`,
              borderColor: `${template.colors.primary}40`,
              color: template.colors.primary
            }}
          >
            <Coins className="w-4 h-4" />
            <span>
              {isBengali
                ? 'ডিজিটাল আশীর্বাদী লেফাফা'
                : isHindi
                ? 'पावन शगुन ई-लिफाफा'
                : 'Auspicious Digital Shagun Lifafa'}
            </span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>

          <h2
            className="text-2xl sm:text-4xl font-extrabold font-serif tracking-tight"
            style={{ color: template.colors.primary }}
          >
            {isBengali
              ? config.nativeTitle
              : isHindi
              ? config.nativeTitle
              : config.title}
          </h2>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-serif">
            {isBengali
              ? config.nativeDescription
              : isHindi
              ? config.nativeDescription
              : config.description}
          </p>
        </div>

        {/* Confirmation Success State */}
        {hasSentConfirmation ? (
          <div className="max-w-lg mx-auto bg-amber-50/90 rounded-2xl p-6 sm:p-8 border-2 border-amber-300 text-center space-y-4 shadow-lg animate-fadeIn">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 border-2 border-emerald-400 flex items-center justify-center text-emerald-600">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-amber-950">
                {isBengali
                  ? '🙏 আন্তরিক কৃতজ্ঞতা ও প্রণাম!'
                  : isHindi
                  ? '🙏 आपका हार्दिक आभार एवं धन्यवाद!'
                  : '🙏 Heartfelt Gratitude & Blessings!'}
              </h3>
              <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-serif">
                {isBengali
                  ? `আপনার প্রেরিত ₹${activeAmount} মাঙ্গলিক শগুন ও প্রাণঢালা আশীর্বাদ পরম স্নেহের সাথে গৃহীত হলো।`
                  : isHindi
                  ? `आपका भेजा गया ₹${activeAmount} का पावन शगुन एवं आशीर्वाद सप्रेम प्राप्त हुआ।`
                  : `Your auspicious token of ₹${activeAmount} and warm blessings have been lovingly recorded.`}
              </p>
            </div>

            <div className="p-3 bg-white rounded-xl border border-amber-200 text-xs text-stone-700 italic space-y-1">
              <p className="font-bold text-amber-900">
                {isBengali ? 'আশীর্বাদের বার্তা:' : 'Blessing Note:'}
              </p>
              <p>"{blessingNote || (isBengali ? 'অনেক অনেক স্নেহ ও শুভকামনা!' : 'Warmest love and blessings!')}"</p>
              <p className="text-[11px] text-stone-500 text-right">— {senderName || (isBengali ? 'শুভাকাঙ্ক্ষী' : 'Well-Wisher')}</p>
            </div>

            <button
              onClick={() => {
                setHasSentConfirmation(false);
                setBlessingNote('');
                setSenderName('');
              }}
              className="text-xs text-amber-800 underline font-semibold hover:text-amber-950 pt-2 cursor-pointer"
            >
              {isBengali ? 'অন্য আশীর্বাদ পাঠান' : 'Send Another Shagun'}
            </button>
          </div>
        ) : (
          /* Main Interactive Shagun Form */
          <div className="max-w-2xl mx-auto space-y-6">
            
            {/* The Virtual Auspicious Envelope Card */}
            <div
              className="p-5 sm:p-7 rounded-2xl border shadow-inner space-y-4"
              style={{
                backgroundColor: `${template.colors.primary}08`,
                borderColor: `${template.colors.primary}30`
              }}
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b pb-3 border-stone-200">
                <div className="text-center sm:text-left">
                  <span className="text-[11px] uppercase tracking-wider font-serif font-bold text-stone-500 block">
                    {isBengali ? 'প্রাপক (Recipient)' : isHindi ? 'प्राप्तकर्ता' : 'Recipient'}
                  </span>
                  <p
                    className="text-lg sm:text-xl font-bold font-serif"
                    style={{ color: template.colors.primary }}
                  >
                    {isBengali && config.nativeRecipientName
                      ? config.nativeRecipientName
                      : isHindi && config.nativeRecipientName
                      ? config.nativeRecipientName
                      : config.recipientName}
                  </p>
                </div>

                {/* Direct UPI ID Pill with 1-Tap Copy */}
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-stone-300 shadow-sm text-xs">
                  <span className="font-mono text-stone-700">{config.upiId}</span>
                  <button
                    onClick={handleCopyUpi}
                    className="text-stone-500 hover:text-stone-900 transition-colors p-1 cursor-pointer"
                    title="Copy UPI ID"
                  >
                    {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Auspicious Shagun Amounts Pill Grid */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-2 font-serif">
                  {isBengali
                    ? 'মাঙ্গলিক শগুন মুদ্রা নির্বাচন করুন:'
                    : isHindi
                    ? 'पावन शगुन राशि चुनें:'
                    : 'Select Auspicious Shagun Amount:'}
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {defaultAmounts.map(amt => {
                    const isSelected = !customAmount && selectedAmount === amt;
                    return (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => {
                          setSelectedAmount(amt);
                          setCustomAmount('');
                        }}
                        className={`py-2.5 px-3 rounded-xl border-2 font-serif font-extrabold text-sm sm:text-base transition-all cursor-pointer flex flex-col items-center justify-center ${
                          isSelected
                            ? 'shadow-md scale-102'
                            : 'bg-white text-stone-700 border-stone-200 hover:border-amber-400'
                        }`}
                        style={{
                          backgroundColor: isSelected ? template.colors.primary : undefined,
                          borderColor: isSelected ? template.colors.primary : undefined,
                          color: isSelected ? '#FFFFFF' : undefined
                        }}
                      >
                        <span>₹{amt}</span>
                        <span className="text-[10px] font-normal opacity-90">
                          {amt === 501
                            ? (isBengali ? 'স্নেহাশিস' : 'Blessings')
                            : amt === 1001 || amt === 1101
                            ? (isBengali ? 'শুভকামনা' : 'Best Wishes')
                            : amt === 2101
                            ? (isBengali ? 'বিশেষ আশীর্বাদ' : 'Special Blessings')
                            : (isBengali ? 'রাজকীয় শগুন' : 'Royal Shagun')}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Amount with Auspicious +₹1 Button */}
              <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
                <div className="relative flex-1 w-full">
                  <span className="absolute left-3 top-2.5 text-stone-500 font-bold text-sm">₹</span>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={e => setCustomAmount(e.target.value)}
                    placeholder={isBengali ? 'অন্য কোনো পরিমাণ লিখুন' : 'Or enter custom amount'}
                    className="w-full pl-7 pr-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleAddAuspiciousOne}
                  className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 text-xs font-bold transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
                  title="Add traditional ₹1 coin"
                >
                  <span>🪙</span>
                  <span>{isBengali ? '+১ টাকা শুভ মুদ্রা' : '+₹1 Shagun Coin'}</span>
                </button>
              </div>

              {/* Sender Name & Blessing Note */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1 font-serif">
                    {isBengali ? 'আপনার নাম:' : isHindi ? 'आपका नाम:' : 'Your Name:'}
                  </label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={e => setSenderName(e.target.value)}
                    placeholder={isBengali ? 'উদা: রাহুল কাকু ও পরিবার' : 'e.g., Uncle Rajesh & Family'}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1 font-serif">
                    {isBengali ? 'আশীর্বাদী চিরকুট (ঐচ্ছিক):' : isHindi ? 'शुभकामना संदेश:' : 'Blessing Note (Optional):'}
                  </label>
                  <input
                    type="text"
                    value={blessingNote}
                    onChange={e => setBlessingNote(e.target.value)}
                    placeholder={isBengali ? 'নতুন জীবনের অনেক অনেক শুভেচ্ছা...' : 'Heartfelt blessings for your journey...'}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* Payment Actions Grid (Mobile 1-Tap UPI Intent & Desktop QR Code) */}
            <div className="space-y-3">
              
              {/* Primary Mobile Direct UPI Pay Button */}
              <a
                href={upiIntentUrl}
                className="w-full py-3.5 px-6 rounded-2xl text-white font-serif font-extrabold text-base sm:text-lg shadow-xl hover:opacity-95 active:scale-98 transition-all flex items-center justify-center gap-3 cursor-pointer text-center"
                style={{
                  backgroundColor: template.colors.primary,
                  backgroundImage: `linear-gradient(to right, ${template.colors.primary}, ${template.colors.primaryDark})`
                }}
              >
                <Smartphone className="w-5 h-5 animate-pulse" />
                <span>
                  {isBengali
                    ? `গুগলপে / ফোনপে দিয়ে ₹${activeAmount} পাঠান`
                    : isHindi
                    ? `GPay / PhonePe से ₹${activeAmount} शगुन भेजें`
                    : `Pay ₹${activeAmount} via GPay / PhonePe / Paytm`}
                </span>
                <ArrowRight className="w-5 h-5" />
              </a>

              {/* Desktop / Alternate QR Code Toggle */}
              <div className="flex items-center justify-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setShowQrCode(!showQrCode)}
                  className="text-xs text-stone-600 hover:text-stone-900 font-semibold flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-300 bg-stone-50 cursor-pointer"
                >
                  <QrCode className="w-3.5 h-3.5 text-amber-700" />
                  <span>
                    {showQrCode
                      ? (isBengali ? 'কিউআর কোড বন্ধ করুন' : 'Hide QR Code')
                      : (isBengali ? 'স্ক্যান করতে কিউআর কোড দেখুন' : 'Scan via QR Code on Phone')}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleConfirmSent}
                  className="text-xs text-emerald-800 hover:text-emerald-950 font-semibold flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-emerald-300 bg-emerald-50 cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>
                    {isBengali ? 'শগুন পাঠানো সম্পন্ন করেছি' : 'I have sent the Shagun'}
                  </span>
                </button>
              </div>

              {/* Dynamic QR Code Modal Box */}
              {showQrCode && (
                <div className="p-5 bg-white rounded-2xl border-2 border-stone-300 shadow-xl max-w-xs mx-auto text-center space-y-3 animate-fadeIn">
                  <div className="p-2 bg-stone-50 rounded-xl inline-block border border-stone-200">
                    <img
                      src={qrCodeUrl}
                      alt="UPI Payment QR Code"
                      className="w-48 h-48 mx-auto"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-xs font-bold text-stone-800">
                    {isBengali
                      ? `ক্যামেরা বা যেকোনো ইউপিআই অ্যাপ দিয়ে স্ক্যান করে ₹${activeAmount} পাঠান`
                      : `Scan with Google Pay, PhonePe, or Paytm to send ₹${activeAmount}`}
                  </p>
                  <p className="text-[11px] text-stone-500">
                    UPI ID: <span className="font-mono font-bold text-stone-700">{config.upiId}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Zero Commission Trust Badge */}
            <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>
                {isBengali
                  ? '১০০% সরাসরি ব্যাংক-টু-ব্যাংক ইউপিআই স্থানান্তর • কোনো প্ল্যাটফর্ম ফি নেই'
                  : '100% Direct Bank-to-Bank UPI transfer • Zero platform fee'}
              </span>
            </div>

          </div>
        )}
      </div>
    </section>
  );
};
