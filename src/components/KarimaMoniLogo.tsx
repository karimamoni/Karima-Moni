import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'icon';
  theme?: 'dark' | 'light' | 'white';
}

export const KarimaMoniLogo: React.FC<LogoProps> = ({
  className = '',
  variant = 'full',
  theme = 'dark',
}) => {
  const isWhite = theme === 'white';
  const textColor = isWhite ? 'text-white' : 'text-[#101828]';
  const subTextColor = isWhite ? 'text-blue-100' : 'text-[#003088]';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Premium Karima Moni Emblem: Royal Blue & Gold with Dynamic K-M Wave Geometry */}
      <svg
        className="w-10 h-10 shrink-0 drop-shadow-sm transition-transform hover:scale-105 duration-300"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Karima Moni Logo"
      >
        <defs>
          <linearGradient id="kmBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#003088" />
            <stop offset="100%" stopColor="#001d54" />
          </linearGradient>
          <linearGradient id="kmGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F4B820" />
            <stop offset="100%" stopColor="#d89a08" />
          </linearGradient>
          <filter id="goldGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#F4B820" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Outer Circular Base */}
        <circle cx="50" cy="50" r="48" fill="url(#kmBlueGrad)" stroke="#F4B820" strokeWidth="2.5" />

        {/* Inner Subtle Ring */}
        <circle cx="50" cy="50" r="43" stroke="#FFFFFF" strokeOpacity="0.15" strokeWidth="1" strokeDasharray="2 3" />

        {/* Golden Dynamic Growth Wave */}
        <path
          d="M16 64 C 28 80, 52 82, 84 56 C 72 68, 44 76, 26 58 Z"
          fill="url(#kmGoldGrad)"
          opacity="0.9"
        />

        {/* Dynamic Stylized 'K' & 'M' Fusion Monogram */}
        {/* K Vertical Spine */}
        <path
          d="M30 26 H37 V72 H30 Z"
          fill="#FFFFFF"
          className="drop-shadow-sm"
        />

        {/* K Upper Arm into Golden Flare */}
        <path
          d="M37 50 L52 28 H61 L43 53 Z"
          fill="url(#kmGoldGrad)"
          filter="url(#goldGlow)"
        />

        {/* Stylized M Wave Right Leg */}
        <path
          d="M44 48 L56 72 H64 L74 36 H66 L59 58 L51 45 Z"
          fill="#FFFFFF"
        />

        {/* Signature Gold Growth Accent Dot */}
        <circle cx="68" cy="28" r="4.5" fill="url(#kmGoldGrad)" stroke="#FFFFFF" strokeWidth="1.2" />
      </svg>

      {variant !== 'icon' && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span
              className={`text-lg md:text-xl font-extrabold tracking-tight ${textColor} font-display leading-none`}
            >
              KARIMA MONI
            </span>
          </div>
          {variant === 'full' && (
            <span
              className={`text-[10px] md:text-[11px] font-semibold tracking-wider uppercase ${subTextColor} mt-1 leading-none`}
            >
              Digital Marketing Specialist
            </span>
          )}
        </div>
      )}
    </div>
  );
};
