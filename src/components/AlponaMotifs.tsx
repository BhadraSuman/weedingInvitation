import React from 'react';

// Traditional Bengali Alpona Horizontal Divider
export const AlponaDivider: React.FC<{ className?: string; color?: string }> = ({
  className = "w-full h-8",
  color = "#D4AF37",
}) => (
  <div className={`flex items-center justify-center gap-2 overflow-hidden ${className}`}>
    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-[#D4AF37]" />
    <svg
      viewBox="0 0 160 32"
      className="h-7 w-auto shrink-0"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Central Lotus Motif */}
      <path
        d="M80 6C74 14 68 18 64 22C72 22 76 26 80 30C84 26 88 22 96 22C92 18 86 14 80 6Z"
        fill={color}
        fillOpacity="0.85"
      />
      {/* Side Petals */}
      <path
        d="M64 22C56 16 48 18 42 22C50 24 56 26 64 22Z"
        fill={color}
        fillOpacity="0.75"
      />
      <path
        d="M96 22C104 16 112 18 118 22C110 24 104 26 96 22Z"
        fill={color}
        fillOpacity="0.75"
      />
      {/* Alpona Swirls */}
      <circle cx="80" cy="18" r="2.5" fill="#8B181B" />
      <circle cx="36" cy="22" r="2" fill={color} />
      <circle cx="124" cy="22" r="2" fill={color} />
      <circle cx="24" cy="22" r="1.5" fill={color} fillOpacity="0.6" />
      <circle cx="136" cy="22" r="1.5" fill={color} fillOpacity="0.6" />
    </svg>
    <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#D4AF37]/50 to-[#D4AF37]" />
  </div>
);

// Bengali Sacred Conch Shell (শঙ্খ - Shankho)
export const ShankhoIcon: React.FC<{ className?: string; size?: number; color?: string }> = ({
  className = "w-6 h-6",
  size = 24,
  color = "#D4AF37",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M38 12C34 6 26 6 20 10C14 14 10 22 14 30C18 38 28 42 34 38C40 34 42 24 38 18C34 12 26 12 22 16C18 20 18 26 22 30C26 34 32 32 34 28"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20 10L10 6C8 5 6 7 7 9L12 20"
      stroke="#D4AF37"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <circle cx="28" cy="22" r="3" fill="#8B181B" />
  </svg>
);

// Traditional Bengali Topor (Groom) and Mukut (Bride)
export const ToporMukutIcon: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
  <svg
    viewBox="0 0 100 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Groom Topor (Conical white shola pith crown) */}
    <g transform="translate(6, 4)">
      <path
        d="M24 6L8 54H40L24 6Z"
        fill="#FDFBF7"
        stroke="#D4AF37"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      {/* Top finial / Kalash */}
      <circle cx="24" cy="4" r="2.5" fill="#D4AF37" />
      <path d="M16 26H32" stroke="#8B181B" strokeWidth="1.5" />
      <path d="M12 40H36" stroke="#D4AF37" strokeWidth="1.5" />
      <circle cx="24" cy="33" r="2" fill="#8B181B" />
      {/* Traditional dangling beads */}
      <path d="M8 54L6 62" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M40 54L42 62" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
    </g>

    {/* Bride Mukut (Ornate Gold Crown with Kalka) */}
    <g transform="translate(54, 14)">
      <path
        d="M6 44C10 26 22 18 24 10C26 18 38 26 42 44C34 40 28 42 24 44C20 42 14 40 6 44Z"
        fill="#D4AF37"
        fillOpacity="0.2"
        stroke="#D4AF37"
        strokeWidth="2"
      />
      <circle cx="24" cy="8" r="2.5" fill="#8B181B" />
      <path
        d="M14 36C18 30 24 30 24 30C24 30 30 30 34 36"
        stroke="#8B181B"
        strokeWidth="1.5"
      />
      <circle cx="24" cy="24" r="2" fill="#D4AF37" />
    </g>

    {/* Center Red Vermilion Bindu */}
    <circle cx="50" cy="46" r="3.5" fill="#8B181B" />
  </svg>
);

// Auspicious Bengali Paan Pata (Betel leaf with Kalka art - Shubho Drishti)
export const PaanPataIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Paan Leaf */}
    <path
      d="M32 6C20 18 8 28 10 42C12 54 24 60 32 58C40 60 52 54 54 42C56 28 44 18 32 6Z"
      fill="#2E7D32"
      fillOpacity="0.15"
      stroke="#2E7D32"
      strokeWidth="2"
    />
    {/* Leaf Veins */}
    <path d="M32 14V54" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M32 26C24 24 18 28 16 34" stroke="#2E7D32" strokeWidth="1.2" />
    <path d="M32 26C40 24 46 28 48 34" stroke="#2E7D32" strokeWidth="1.2" />
    <path d="M32 38C26 38 20 42 19 46" stroke="#2E7D32" strokeWidth="1.2" />
    <path d="M32 38C38 38 44 42 45 46" stroke="#2E7D32" strokeWidth="1.2" />
    {/* Alta / Sindoor dot in center */}
    <circle cx="32" cy="34" r="3.5" fill="#8B181B" />
  </svg>
);

// Mangal Ghot (The Sacred Pot with Coconut & Mango leaves)
export const MangalGhotIcon: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Coconut */}
    <circle cx="32" cy="18" r="9" fill="#8D5B4C" />
    {/* Mango Leaves */}
    <path d="M24 18C18 12 16 6 16 6C16 6 22 8 28 14" fill="#2E7D32" />
    <path d="M40 18C46 12 48 6 48 6C48 6 42 8 36 14" fill="#2E7D32" />
    <path d="M32 12V4" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" />
    {/* Brass Pot */}
    <path
      d="M22 24H42L44 32C46 44 38 52 32 52C26 52 18 44 20 32L22 24Z"
      fill="#D4AF37"
      fillOpacity="0.8"
      stroke="#997819"
      strokeWidth="2"
    />
    {/* Swastika or Vermilion Mark on Pot */}
    <circle cx="32" cy="36" r="3" fill="#8B181B" />
  </svg>
);

// Bengali Corner Alpona
export const CornerAlpona: React.FC<{ className?: string; position?: 'tl' | 'tr' | 'bl' | 'br' }> = ({
  className = "w-14 h-14",
  position = 'tl',
}) => {
  const rotation = {
    tl: 'rotate-0',
    tr: 'rotate-90',
    br: 'rotate-180',
    bl: '-rotate-90',
  }[position];

  return (
    <div className={`${rotation} ${className} pointer-events-none opacity-60`}>
      <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path
          d="M4 4C18 4 32 10 40 22C46 30 50 44 50 56"
          stroke="#D4AF37"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M4 14C14 14 24 18 30 26C34 32 36 42 36 52"
          stroke="#D4AF37"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <circle cx="8" cy="8" r="3" fill="#8B181B" />
        <circle cx="22" cy="16" r="2" fill="#D4AF37" />
        <circle cx="36" cy="30" r="2" fill="#D4AF37" />
      </svg>
    </div>
  );
};
