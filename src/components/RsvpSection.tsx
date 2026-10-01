import React from 'react';
import { rsvpContacts } from '../data/weddingData';
import { Language } from '../types/wedding';
import { AlponaDivider, ShankhoIcon, ToporMukutIcon } from './AlponaMotifs';
import { Phone, MessageSquare, HeartHandshake, Users } from 'lucide-react';

interface RsvpSectionProps {
  lang: Language;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({ lang }) => {
  const getWhatsAppUrl = (phone: string) => {
    const text = encodeURIComponent(
      lang === 'bn'
        ? "নমস্কার! অনির্বাণ ও দেবলীনার শুভ বিবাহে সপরিবারে উপস্থিত থাকব বলে নিশ্চিত করছি। অনেক শুভেচ্ছা ও ভালোবাসা রইল।"
        : "Namaskar! Delighted to confirm our attendance for Anirban & Deboleena's wedding. Looking forward to celebrating together!"
    );
    return `https://wa.me/${phone}?text=${text}`;
  };

  return (
    <section className="py-16 px-4 sm:px-6 max-w-4xl mx-auto" id="rsvp">
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-2 mb-2">
          <HeartHandshake className="w-5 h-5 text-[#8B181B]" />
          <span className="font-royal text-xs uppercase tracking-widest text-[#8B181B] font-semibold">
            {lang === 'bn' ? 'উপস্থিতি নিশ্চিতকরণ' : 'RSVP & Coordination'}
          </span>
          <HeartHandshake className="w-5 h-5 text-[#8B181B]" />
        </div>
        <h2 className="font-bengali text-3xl sm:text-4xl text-[#8B181B] font-bold">
          {lang === 'bn' ? 'সাদর প্রত্যুত্তর' : 'Confirm Your Presence'}
        </h2>
        <AlponaDivider className="my-3 max-w-xs mx-auto" />
        <p className="text-xs sm:text-sm text-[#6B5A55] font-bengali max-w-md mx-auto">
          {lang === 'bn'
            ? 'অতিথিদের সুষ্ঠু অভ্যর্থনা ও আপ্যায়নের সুবিধার্থে অনুগ্রহপূর্বক আপনার শুভাগমন নিশ্চিত করুন।'
            : 'To help us prepare for your gracious hosting and dining arrangements, please confirm your attendance.'}
        </p>
      </div>

      {/* Contacts Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rsvpContacts.map((contact, idx) => (
          <div
            key={idx}
            className="bg-white/90 rounded-2xl p-5 border border-[#D4AF37]/50 shadow-md text-center flex flex-col justify-between hover:border-[#8B181B] transition-all"
          >
            <div>
              <div className="w-10 h-10 mx-auto rounded-full bg-[#F4ECD8] flex items-center justify-center text-[#8B181B] mb-3">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bengali font-bold text-base text-[#8B181B]">
                {lang === 'bn' ? contact.bengaliName : contact.name}
              </h3>
              <p className="text-xs text-[#997819] font-serif mb-4">
                {lang === 'bn' ? contact.bengaliRelation : contact.relation}
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#D4AF37]/20">
              <a
                href={getWhatsAppUrl(contact.whatsappNumber)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl text-xs font-semibold shadow-sm transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'হোয়াটসঅ্যাপে জানান' : 'Confirm on WhatsApp'}</span>
              </a>

              <a
                href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 bg-[#F4ECD8] hover:bg-[#EBDDC0] text-[#5C0C0F] rounded-xl text-xs font-serif font-semibold border border-[#D4AF37]/40 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#8B181B]" />
                <span>{contact.phone}</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Awaiting Your Presence Signoff */}
      <div className="mt-12 text-center p-6 bg-[#F4ECD8]/60 rounded-3xl border border-[#D4AF37]/40 max-w-lg mx-auto">
        <ToporMukutIcon className="w-12 h-10 mx-auto mb-2 opacity-80" />
        <p className="font-royal text-xs text-[#8B181B] uppercase tracking-widest font-semibold">
          {lang === 'bn' ? 'সানন্দ উপস্থিতি প্রতীক্ষায়' : 'Awaiting Your Gracious Presence'}
        </p>
        <p className="font-bengali text-lg sm:text-xl text-[#8B181B] font-bold mt-1">
          {lang === 'bn' ? 'মুখোপাধ্যায় ও বন্দ্যোপাধ্যায় পরিবার' : 'The Mukherjee & Banerjee Families'}
        </p>
        <p className="text-xs text-[#6B5A55] font-serif italic mt-1">
          Kolkata, West Bengal
        </p>
      </div>
    </section>
  );
};
