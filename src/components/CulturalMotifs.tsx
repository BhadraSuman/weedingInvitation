import React from 'react';
import { TemplateId } from '../types/wedding';

// -------------------------------------------------------------
// 1. BENGALI MOTIFS
// -------------------------------------------------------------

export const AlponaDivider: React.FC<{ className?: string; color?: string }> = ({
  className = "w-full h-8",
  color = "#D4AF37",
}) => (
  <div className={`flex items-center justify-center gap-2 overflow-hidden ${className}`}>
    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-[#D4AF37]" />
    <svg viewBox="0 0 160 32" className="h-7 w-auto shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M80 6C74 14 68 18 64 22C72 22 76 26 80 30C84 26 88 22 96 22C92 18 86 14 80 6Z" fill={color} fillOpacity="0.85" />
      <path d="M64 22C56 16 48 18 42 22C50 24 56 26 64 22Z" fill={color} fillOpacity="0.75" />
      <path d="M96 22C104 16 112 18 118 22C110 24 104 26 96 22Z" fill={color} fillOpacity="0.75" />
      <circle cx="80" cy="18" r="2.5" fill="#8B181B" />
      <circle cx="36" cy="22" r="2" fill={color} />
      <circle cx="124" cy="22" r="2" fill={color} />
      <circle cx="24" cy="22" r="1.5" fill={color} fillOpacity="0.6" />
      <circle cx="136" cy="22" r="1.5" fill={color} fillOpacity="0.6" />
    </svg>
    <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#D4AF37]/50 to-[#D4AF37]" />
  </div>
);

export const ShankhoIcon: React.FC<{ className?: string; size?: number; color?: string }> = ({
  className = "w-6 h-6",
  size = 24,
  color = "#D4AF37",
}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M38 12C34 6 26 6 20 10C14 14 10 22 14 30C18 38 28 42 34 38C40 34 42 24 38 18C34 12 26 12 22 16C18 20 18 26 22 30C26 34 32 32 34 28"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M20 10L10 6C8 5 6 7 7 9L12 20" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="28" cy="22" r="3" fill="#8B181B" />
  </svg>
);

export const ToporMukutIcon: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g transform="translate(6, 4)">
      <path d="M24 6L8 54H40L24 6Z" fill="#FDFBF7" stroke="#D4AF37" strokeWidth="2.2" strokeLinejoin="round" />
      <circle cx="24" cy="4" r="2.5" fill="#D4AF37" />
      <path d="M16 26H32" stroke="#8B181B" strokeWidth="1.5" />
      <path d="M12 40H36" stroke="#D4AF37" strokeWidth="1.5" />
      <circle cx="24" cy="33" r="2" fill="#8B181B" />
      <path d="M8 54L6 62" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M40 54L42 62" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
    </g>
    <g transform="translate(54, 14)">
      <path d="M6 44C10 26 22 18 24 10C26 18 38 26 42 44C34 40 28 42 24 44C20 42 14 40 6 44Z" fill="#D4AF37" fillOpacity="0.2" stroke="#D4AF37" strokeWidth="2" />
      <circle cx="24" cy="8" r="2.5" fill="#8B181B" />
      <path d="M14 36C18 30 24 30 24 30C24 30 30 30 34 36" stroke="#8B181B" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="2" fill="#D4AF37" />
    </g>
    <circle cx="50" cy="46" r="3.5" fill="#8B181B" />
  </svg>
);

export const PaanPataIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M32 6C20 18 8 28 10 42C12 54 24 60 32 58C40 60 52 54 54 42C56 28 44 18 32 6Z" fill="#2E7D32" fillOpacity="0.15" stroke="#2E7D32" strokeWidth="2" />
    <path d="M32 14V54" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M32 26C24 24 18 28 16 34" stroke="#2E7D32" strokeWidth="1.2" />
    <path d="M32 26C40 24 46 28 48 34" stroke="#2E7D32" strokeWidth="1.2" />
    <circle cx="32" cy="34" r="3.5" fill="#8B181B" />
  </svg>
);

// -------------------------------------------------------------
// 2. ROYAL NORTH INDIAN (RAJPUTANA / SHUBH VIVAH) MOTIFS
// -------------------------------------------------------------

export const GaneshaIcon: React.FC<{ className?: string; color?: string }> = ({
  className = "w-10 h-10",
  color = "#D4AF37",
}) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Crown / Mukut */}
    <path d="M26 12L32 4L38 12H26Z" fill={color} />
    <circle cx="32" cy="4" r="1.5" fill="#8B181B" />
    {/* Forehead & Tilak */}
    <path d="M22 14H42C44 20 40 24 38 26C35 28 29 28 26 26C24 24 20 20 22 14Z" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.5" />
    <path d="M32 12V22" stroke="#C0262D" strokeWidth="2" strokeLinecap="round" />
    <circle cx="32" cy="20" r="1.5" fill="#D4AF37" />
    {/* Ears */}
    <path d="M20 18C12 18 10 28 16 34C18 36 22 36 22 36" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M44 18C52 18 54 28 48 34C46 36 42 36 42 36" stroke={color} strokeWidth="2" strokeLinecap="round" />
    {/* Trunk (Vakratunda) */}
    <path d="M32 26C32 32 30 40 34 46C38 52 46 48 46 42C46 38 42 38 40 40" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    {/* Modak in Hand */}
    <circle cx="43" cy="39" r="2.5" fill="#F59E0B" />
    {/* Little Mouse / Musak */}
    <ellipse cx="20" cy="48" rx="3" ry="2" fill={color} fillOpacity="0.8" />
  </svg>
);

export const RoyalElephantIcon: React.FC<{ className?: string; color?: string }> = ({
  className = "w-14 h-12",
  color = "#D4AF37",
}) => (
  <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Royal Ambari / Howdah on Back */}
    <path d="M42 20H66L68 32H40L42 20Z" fill={color} fillOpacity="0.85" stroke="#8B181B" strokeWidth="1.5" />
    <path d="M44 12C48 6 60 6 64 12V20H44V12Z" fill="#8B181B" stroke={color} strokeWidth="1.5" />
    <circle cx="54" cy="6" r="2" fill={color} />
    {/* Elephant Body */}
    <path
      d="M30 44C24 40 22 30 30 26C38 22 48 24 72 26C82 28 88 38 88 50V68H78V56C76 54 70 54 68 56V68H56V56C54 54 48 54 46 56V68H36V52L26 58C22 62 18 56 22 48L28 44"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Trunk Raised in Blessing */}
    <path d="M26 42C18 36 12 28 14 20C16 12 24 16 26 22" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    {/* Tusk */}
    <path d="M24 38L18 36" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
    {/* Ornate Blanket (Jhool) */}
    <path d="M42 34H66C66 46 62 50 54 50C46 50 42 46 42 34Z" fill="#8B181B" stroke={color} strokeWidth="1.5" />
    <circle cx="54" cy="42" r="2.5" fill={color} />
  </svg>
);

export const JharokhaDivider: React.FC<{ className?: string; color?: string }> = ({
  className = "w-full h-8",
  color = "#D4AF37",
}) => (
  <div className={`flex items-center justify-center gap-2 overflow-hidden ${className}`}>
    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-[#D4AF37]" />
    <svg viewBox="0 0 160 32" className="h-7 w-auto shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Rajasthani Scalloped Arch */}
      <path
        d="M50 26C50 16 56 10 64 10C68 6 74 4 80 4C86 4 92 6 96 10C104 10 110 16 110 26"
        stroke={color}
        strokeWidth="2"
        fill={color}
        fillOpacity="0.15"
      />
      <circle cx="80" cy="14" r="3" fill="#8B181B" />
      <circle cx="68" cy="18" r="1.5" fill={color} />
      <circle cx="92" cy="18" r="1.5" fill={color} />
      {/* Side Finials */}
      <path d="M40 26L45 20L50 26" stroke={color} strokeWidth="1.5" />
      <path d="M110 26L115 20L120 26" stroke={color} strokeWidth="1.5" />
    </svg>
    <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#D4AF37]/50 to-[#D4AF37]" />
  </div>
);

// -------------------------------------------------------------
// 3. SOUTH INDIAN (VEDIC KALYANAM / DRAVIDIAN) MOTIFS
// -------------------------------------------------------------

export const TempleLampIcon: React.FC<{ className?: string; color?: string }> = ({
  className = "w-10 h-12",
  color = "#D4AF37",
}) => (
  <svg viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Deepam Flame */}
    <path d="M30 4C26 12 24 16 26 22C28 26 32 26 34 22C36 16 34 12 30 4Z" fill="#F59E0B" />
    <circle cx="30" cy="18" r="2.5" fill="#EF4444" />
    {/* Kuthuvilakku Top Bird / Prabhavali */}
    <ellipse cx="30" cy="26" rx="14" ry="4" fill={color} />
    {/* Lamp Cup */}
    <path d="M18 28C22 36 38 36 42 28H18Z" fill={color} stroke="#997819" strokeWidth="1.5" />
    {/* Pillar Stem */}
    <path d="M28 34V62H32V34H28Z" fill={color} />
    <circle cx="30" cy="46" r="3" fill="#997819" />
    {/* Brass Pedestal */}
    <ellipse cx="30" cy="64" rx="12" ry="3" fill={color} />
    <path d="M20 64L14 74H46L40 64H20Z" fill={color} stroke="#997819" strokeWidth="1.5" />
  </svg>
);

export const KolamDivider: React.FC<{ className?: string; color?: string }> = ({
  className = "w-full h-8",
  color = "#D4AF37",
}) => (
  <div className={`flex items-center justify-center gap-2 overflow-hidden ${className}`}>
    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-[#D4AF37]" />
    <svg viewBox="0 0 160 32" className="h-7 w-auto shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* South Indian 4-Dot Kolam Knot */}
      <circle cx="80" cy="8" r="2" fill={color} />
      <circle cx="80" cy="24" r="2" fill={color} />
      <circle cx="72" cy="16" r="2" fill={color} />
      <circle cx="88" cy="16" r="2" fill={color} />
      <path
        d="M80 4C86 10 94 10 94 16C94 22 86 22 80 28C74 22 66 22 66 16C66 10 74 10 80 4Z"
        stroke={color}
        strokeWidth="1.8"
        fill="none"
      />
      <circle cx="80" cy="16" r="2.5" fill="#8B181B" />
      {/* Side Dots */}
      <circle cx="54" cy="16" r="2" fill={color} />
      <circle cx="44" cy="16" r="1.5" fill={color} fillOpacity="0.6" />
      <circle cx="106" cy="16" r="2" fill={color} />
      <circle cx="116" cy="16" r="1.5" fill={color} fillOpacity="0.6" />
    </svg>
    <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#D4AF37]/50 to-[#D4AF37]" />
  </div>
);

// -------------------------------------------------------------
// 4. MODERN MINIMALIST (CONTEMPORARY LUXE) MOTIFS
// -------------------------------------------------------------

export const WeddingRingsIcon: React.FC<{ className?: string; color?: string }> = ({
  className = "w-12 h-10",
  color = "#D4AF37",
}) => (
  <svg viewBox="0 0 64 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Left Ring */}
    <ellipse cx="26" cy="26" rx="14" ry="14" stroke={color} strokeWidth="3" />
    {/* Solitaire Diamond on Right Ring */}
    <path d="M42 6L46 10L42 14L38 10L42 6Z" fill={color} />
    <path d="M42 2L48 8L42 14L36 8L42 2Z" stroke="#4A7C59" strokeWidth="1.2" />
    {/* Right Ring Intertwined */}
    <ellipse cx="42" cy="26" rx="14" ry="14" stroke={color} strokeWidth="3" />
  </svg>
);

export const BotanicalDivider: React.FC<{ className?: string; color?: string }> = ({
  className = "w-full h-8",
  color = "#4A7C59",
}) => (
  <div className={`flex items-center justify-center gap-2 overflow-hidden ${className}`}>
    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#4A7C59]/40 to-[#4A7C59]" />
    <svg viewBox="0 0 160 32" className="h-6 w-auto shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Central Modern Leaf Sprig */}
      <path d="M80 6C82 12 86 16 92 16M80 6C78 12 74 16 68 16" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M80 6V26" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M80 14C83 18 89 20 94 20M80 14C77 18 71 20 66 20" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="80" cy="6" r="2" fill="#D4AF37" />
    </svg>
    <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#4A7C59]/40 to-[#4A7C59]" />
  </div>
);

// -------------------------------------------------------------
// 5. Shubh Vivah — North Indian MOTIFS
// -------------------------------------------------------------

export const MaurIcon: React.FC<{ className?: string; color?: string }> = ({
  className = "w-14 h-14",
  color = "#D4AF37",
}) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Traditional North Indian Groom's Maur (मौर) with conical top and dangling moti strings */}
    <path d="M40 6L24 40H56L40 6Z" fill="#8B0000" stroke={color} strokeWidth="2.2" strokeLinejoin="round" />
    <circle cx="40" cy="4" r="2.5" fill={color} />
    {/* Peacock Feather / Kalgi on Top */}
    <ellipse cx="40" cy="14" rx="4" ry="7" fill="#0D5C3A" stroke={color} strokeWidth="1" />
    <circle cx="40" cy="14" r="2" fill="#D4AF37" />
    {/* Golden Filigree Bands */}
    <path d="M28 26H52" stroke={color} strokeWidth="1.8" />
    <path d="M26 34H54" stroke={color} strokeWidth="1.8" />
    {/* Traditional Red Tilak / Swastik */}
    <circle cx="40" cy="30" r="2.5" fill="#F3A712" />
    {/* Hanging Moti / Golden Tassels (लटकन) */}
    <path d="M26 40L22 56M32 40L30 58M40 40V62M48 40L50 58M54 40L58 56" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="1 3" />
    <circle cx="22" cy="56" r="1.5" fill="#8B0000" />
    <circle cx="30" cy="58" r="1.5" fill="#8B0000" />
    <circle cx="40" cy="62" r="2" fill="#8B0000" />
    <circle cx="50" cy="58" r="1.5" fill="#8B0000" />
    <circle cx="58" cy="56" r="1.5" fill="#8B0000" />
  </svg>
);

export const MadhubaniDivider: React.FC<{ className?: string; color?: string }> = ({
  className = "w-full h-8",
  color = "#D4AF37",
}) => (
  <div className={`flex items-center justify-center gap-2 overflow-hidden ${className}`}>
    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#8B0000]/40 to-[#D4AF37]" />
    <svg viewBox="0 0 160 32" className="h-7 w-auto shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Traditional Mithila Fish & Lotus geometric pattern */}
      <circle cx="80" cy="16" r="6" stroke="#8B0000" strokeWidth="1.8" fill={color} fillOpacity="0.3" />
      <circle cx="80" cy="16" r="2.5" fill="#8B0000" />
      {/* Lotus Petals */}
      <path d="M80 4C76 10 76 12 80 16C84 12 84 10 80 4Z" fill="#8B0000" />
      <path d="M80 28C76 22 76 20 80 16C84 20 84 22 80 28Z" fill="#8B0000" />
      <path d="M68 16C74 12 76 12 80 16C76 20 74 20 68 16Z" fill="#8B0000" />
      <path d="M92 16C86 12 84 12 80 16C84 20 86 20 92 16Z" fill="#8B0000" />
      {/* Surrounding auspicious dots */}
      <circle cx="58" cy="16" r="2" fill={color} />
      <circle cx="48" cy="16" r="1.5" fill="#8B0000" />
      <circle cx="102" cy="16" r="2" fill={color} />
      <circle cx="112" cy="16" r="1.5" fill="#8B0000" />
    </svg>
    <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#8B0000]/40 to-[#D4AF37]" />
  </div>
);

export const AnnaprashanBowlIcon: React.FC<{ className?: string; color?: string }> = ({
  className = "w-16 h-14",
  color = "#F59E0B"
}) => (
  <svg viewBox="0 0 80 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Silver/Gold Rice Bowl */}
    <ellipse cx="40" cy="38" rx="28" ry="14" fill="#FEF3C7" stroke={color} strokeWidth="2.5" />
    <path d="M12 38C12 50 24 58 40 58C56 58 68 50 68 38" fill="#FDE68A" stroke={color} strokeWidth="2.5" />
    {/* Bowl Rim & Engravings */}
    <ellipse cx="40" cy="36" rx="25" ry="10" fill="#FFFBEB" stroke={color} strokeWidth="1.5" />
    {/* Holy Payesh / Kheer surface */}
    <ellipse cx="40" cy="36" rx="20" ry="7" fill="#FBBF24" fillOpacity="0.4" />
    <circle cx="36" cy="35" r="2" fill="#D97706" />
    <circle cx="44" cy="37" r="1.5" fill="#D97706" />
    {/* Sacred Silver/Gold Spoon */}
    <path d="M48 18L58 10C61 7 66 10 63 14L46 34" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <ellipse cx="60" cy="11" rx="4" ry="2.5" fill="#FEF3C7" stroke={color} strokeWidth="1.5" transform="rotate(-35 60 11)" />
    {/* Sparkle drops */}
    <circle cx="40" cy="14" r="2" fill={color} />
    <circle cx="28" cy="18" r="1.5" fill={color} />
  </svg>
);

export const BirthdayTiaraIcon: React.FC<{ className?: string; color?: string }> = ({
  className = "w-16 h-14",
  color = "#FACC15"
}) => (
  <svg viewBox="0 0 80 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Crown Base */}
    <path d="M16 46H64L60 52H20L16 46Z" fill="#FDE047" stroke={color} strokeWidth="2" />
    {/* Tiara Peaks */}
    <path d="M16 46L22 24L32 38L40 14L48 38L58 24L64 46" fill="#FEF08A" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
    {/* Jewels */}
    <circle cx="40" cy="14" r="3.5" fill="#EC4899" stroke="#FFF" strokeWidth="1" />
    <circle cx="22" cy="24" r="2.5" fill="#A855F7" stroke="#FFF" strokeWidth="1" />
    <circle cx="58" cy="24" r="2.5" fill="#0284C7" stroke="#FFF" strokeWidth="1" />
    <circle cx="40" cy="38" r="2.5" fill="#EC4899" />
    {/* Star Twinkles */}
    <path d="M40 4L41.5 8.5L46 10L41.5 11.5L40 16L38.5 11.5L34 10L38.5 8.5L40 4Z" fill="#FACC15" />
  </svg>
);

// -------------------------------------------------------------
// DYNAMIC DISPATCHER
// -------------------------------------------------------------

export const CulturalMotifBadge: React.FC<{ templateId: TemplateId; className?: string }> = ({
  templateId,
  className = "w-16 h-14",
}) => {
  switch (templateId) {
    case 'bengali':
      return <ToporMukutIcon className={className} />;
    case 'annaprashan':
      return <AnnaprashanBowlIcon className={className} />;
    case 'royal_north':
      return <RoyalElephantIcon className={className} />;
    case 'bihari_marwari':
      return <MaurIcon className={className} />;
    case 'south_indian':
      return <TempleLampIcon className={className} />;
    case 'birthday':
      return <BirthdayTiaraIcon className={className} />;
    case 'modern_minimal':
    default:
      return <WeddingRingsIcon className={className} />;
  }
};

export const CulturalDivider: React.FC<{ templateId: TemplateId; className?: string; color?: string }> = ({
  templateId,
  className = "my-4 max-w-xs mx-auto",
  color,
}) => {
  switch (templateId) {
    case 'bengali':
    case 'annaprashan':
      return <AlponaDivider className={className} color={color} />;
    case 'royal_north':
      return <JharokhaDivider className={className} color={color} />;
    case 'bihari_marwari':
      return <MadhubaniDivider className={className} color={color} />;
    case 'south_indian':
      return <KolamDivider className={className} color={color} />;
    case 'modern_minimal':
    case 'birthday':
    default:
      return <BotanicalDivider className={className} color={color} />;
  }
};
