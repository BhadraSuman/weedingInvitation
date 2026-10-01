import React from 'react';
import { CulturalTemplate, Language } from '../types/wedding';
import { CulturalDivider, CulturalMotifBadge } from './CulturalMotifs';
import { Phone, MessageSquare, HeartHandshake, Users, Mail } from 'lucide-react';

interface RsvpSectionProps {
  template: CulturalTemplate;
  lang: Language;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({ template, lang }) => {
  const { colors, rsvpContacts, groom, bride } = template;
  const isHindi = (template.id === 'bihari_marwari' || template.id === 'royal_north') && lang === 'native';

  const t = {
    badge: lang === 'en' ? 'RSVP & Coordination' : isHindi ? 'उपस्थिति की पुष्टि (RSVP)' : 'উপস্থিতি নিশ্চিতকরণ',
    title: lang === 'en' ? 'Confirm Your Presence' : isHindi ? 'सादर आमंत्रण एवं उपस्थिति' : 'সাদর প্রত্যুত্তর',
    subtitle: lang === 'en'
      ? 'To help us prepare for your gracious hosting and dining arrangements, please confirm your attendance.'
      : isHindi
      ? 'विवाह में आपके स्वागत एवं सुगम आतिथ्य सत्कार की व्यवस्था हेतु कृपया अपनी उपस्थिति अवश्य बताएं।'
      : 'অতিথিদের সুষ্ঠু অভ্যর্থনা ও আপ্যায়নের সুবিধার্থে অনুগ্রহপূর্বক আপনার শুভাগমন নিশ্চিত করুন।',
    whatsappBtn: lang === 'en' ? 'Confirm on WhatsApp' : isHindi ? 'व्हाट्सएप पर सूचित करें' : 'হোয়াটসঅ্যাপে জানান',
    awaitingTitle: lang === 'en' ? 'Awaiting Your Gracious Presence' : isHindi ? 'सस्नेह उपस्थिति की प्रतीक्षा में' : 'সানন্দ উপস্থিতি প্রতীক্ষায়',
  };

  const getWhatsAppUrl = (phone: string) => {
    let msg = `Namaskar! Delighted to confirm our attendance for ${groom.name} & ${bride.name}'s wedding celebration. Looking forward!`;
    if (lang === 'native') {
      if (isHindi) {
        msg = `सादर प्रणाम! ${groom.name} एवं ${bride.name} के मांगलिक विवाह समारोह में सपरिवार उपस्थिति की पुष्टि करते हैं। हार्दिक शुभकामनाएं!`;
      } else {
        msg = `নমস্কার! ${groom.name} ও ${bride.name}-এর শুভ বিবাহ অনুষ্ঠানে সবান্ধব উপস্থিতির আন্তরিক সম্মতি জানাচ্ছি।`;
      }
    }
    return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section className="py-16 px-4 sm:px-6 max-w-4xl mx-auto" id="rsvp">
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-2 mb-2">
          <HeartHandshake className="w-5 h-5" style={{ color: colors.primary }} />
          <span className="font-serif text-xs uppercase tracking-widest font-semibold" style={{ color: colors.primary }}>
            {t.badge}
          </span>
          <HeartHandshake className="w-5 h-5" style={{ color: colors.primary }} />
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-serif" style={{ color: colors.primary }}>
          {t.title}
        </h2>
        <CulturalDivider templateId={template.id} color={colors.accent} />
        <p className="text-xs sm:text-sm font-serif max-w-md mx-auto opacity-80" style={{ color: colors.textColor }}>
          {t.subtitle}
        </p>
      </div>

      {/* Contacts Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {rsvpContacts.map((contact, idx) => (
          <div
            key={idx}
            className="bg-white/95 rounded-2xl p-5 border shadow-md text-center flex flex-col justify-between transition-all"
            style={{ borderColor: `${colors.accent}66` }}
          >
            <div>
              <div
                className="w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-3"
                style={{
                  backgroundColor: colors.bgParchment,
                  color: colors.primary
                }}
              >
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base" style={{ color: colors.primary }}>
                {lang === 'native' ? contact.nativeName : contact.name}
              </h3>
              <p className="text-xs font-serif mb-4 opacity-80" style={{ color: colors.accent }}>
                {lang === 'native' ? contact.nativeRelation : contact.relation}
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t" style={{ borderColor: `${colors.accent}33` }}>
              <a
                href={getWhatsAppUrl(contact.whatsappNumber)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl text-xs font-semibold shadow-sm transition-colors whitespace-nowrap"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{t.whatsappBtn}</span>
              </a>

              <a
                href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-serif font-semibold border transition-colors whitespace-nowrap"
                style={{
                  backgroundColor: colors.bgParchment,
                  borderColor: `${colors.accent}66`,
                  color: colors.primary
                }}
              >
                <Phone className="w-3.5 h-3.5" style={{ color: colors.primary }} />
                <span>{contact.phone}</span>
              </a>

              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-serif font-semibold border transition-colors opacity-95 hover:opacity-100 whitespace-nowrap"
                  style={{
                    backgroundColor: colors.bgParchment,
                    borderColor: `${colors.accent}66`,
                    color: colors.primary
                  }}
                >
                  <Mail className="w-3.5 h-3.5" style={{ color: colors.primary }} />
                  <span className="truncate">{contact.email}</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Awaiting Your Presence Signoff */}
      <div
        className="mt-12 text-center p-6 rounded-3xl border max-w-lg mx-auto"
        style={{
          backgroundColor: colors.bgParchment,
          borderColor: `${colors.accent}66`
        }}
      >
        <div className="flex justify-center mb-2 opacity-80">
          <CulturalMotifBadge templateId={template.id} className="w-10 h-8" />
        </div>
        <p className="text-xs uppercase tracking-widest font-semibold font-serif" style={{ color: colors.primary }}>
          {t.awaitingTitle}
        </p>
        <p className="text-lg sm:text-xl font-bold mt-1 font-serif" style={{ color: colors.primary }}>
          {lang === 'native' ? template.quotes.nativeFamilySignoff : template.quotes.familySignoff}
        </p>
      </div>
    </section>
  );
};
