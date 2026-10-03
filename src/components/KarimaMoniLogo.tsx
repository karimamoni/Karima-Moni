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
      <img
        src="/Karima-Moni/images/karima-moni-logo.webp"
        alt="Karima Moni"
        className={`shrink-0 object-contain drop-shadow-sm transition-transform hover:scale-105 duration-300 ${variant === 'icon' ? 'w-10 h-10' : 'w-12 h-12'}`}
      />

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
