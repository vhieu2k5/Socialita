import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showText?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showText = true,
  className = ''
}) => {
  const isHero = size === 'hero';
  const isLg = size === 'lg';
  const isSm = size === 'sm';

  const pixelDimensions = isHero
    ? 'w-24 h-24'
    : isLg
    ? 'w-16 h-16'
    : isSm
    ? 'w-8 h-8'
    : 'w-12 h-12';

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      {/* 3D Pixelated Red & Black "S" Logo */}
      <div className={`relative ${pixelDimensions} flex items-center justify-center`}>
        <svg
          viewBox="0 0 80 80"
          className="w-full h-full drop-shadow-[0_8px_16px_rgba(229,46,61,0.25)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Top Black Bar */}
          <rect x="24" y="8" width="46" height="14" rx="2" fill="#0f0f11" />
          
          {/* Top Left Black Corner Step */}
          <rect x="10" y="8" width="16" height="14" rx="2" fill="#18181c" />
          <rect x="10" y="22" width="14" height="14" rx="1.5" fill="#18181c" />

          {/* Middle Transition Bar (Red & Black Block) */}
          <rect x="22" y="34" width="40" height="13" rx="2" fill="#0f0f11" />
          
          {/* Vibrant Red Body of the 'S' */}
          <rect x="10" y="34" width="22" height="13" rx="2" fill="#e52e3d" />
          <rect x="10" y="47" width="42" height="13" rx="2" fill="#e52e3d" />
          
          {/* Bottom Right Corner of 'S' */}
          <rect x="52" y="47" width="18" height="13" rx="2" fill="#b91c28" />
          <rect x="10" y="60" width="50" height="13" rx="2" fill="#e52e3d" />
          
          {/* Subtle Isometric 3D Shading Overlays */}
          <path d="M70 8 L76 14 L76 22 L70 22 Z" fill="#050507" opacity="0.6" />
          <path d="M62 34 L68 40 L68 47 L62 47 Z" fill="#050507" opacity="0.6" />
          <path d="M60 60 L66 66 L66 73 L60 73 Z" fill="#991b1b" opacity="0.7" />
        </svg>
      </div>

      {showText && (
        <span className="text-[12.5px] font-bold text-white tracking-wide mt-1.5 font-sans">
          Socialita
        </span>
      )}
    </div>
  );
};
