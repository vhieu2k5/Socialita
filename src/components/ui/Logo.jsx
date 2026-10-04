import React from 'react';

export const LogoSvg = ({ size = 48, shadow = false }) => (
  <svg
    viewBox="0 0 80 80"
    width={size}
    height={size}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={shadow ? { filter: 'drop-shadow(0 8px 16px rgba(229,46,61,0.3))' } : {}}
  >
    <rect x="24" y="8" width="46" height="14" rx="2" fill="#0f0f11" />
    <rect x="10" y="8" width="16" height="14" rx="2" fill="#18181c" />
    <rect x="10" y="22" width="14" height="14" rx="1.5" fill="#18181c" />
    <rect x="22" y="34" width="40" height="13" rx="2" fill="#0f0f11" />
    <rect x="10" y="34" width="22" height="13" rx="2" fill="#e52e3d" />
    <rect x="10" y="47" width="42" height="13" rx="2" fill="#e52e3d" />
    <rect x="52" y="47" width="18" height="13" rx="2" fill="#b91c28" />
    <rect x="10" y="60" width="50" height="13" rx="2" fill="#e52e3d" />
    <path d="M70 8 L76 14 L76 22 L70 22 Z" fill="#050507" opacity="0.6" />
    <path d="M62 34 L68 40 L68 47 L62 47 Z" fill="#050507" opacity="0.6" />
    <path d="M60 60 L66 66 L66 73 L60 73 Z" fill="#991b1b" opacity="0.7" />
  </svg>
);

export const Logo = ({ size = 'md', showText = false, shadow = false }) => {
  const pixelDimensions = size === 'hero' ? 84 : size === 'lg' ? 80 : size === 'md' ? 60 : size === 'sm' ? 44 : 48;

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <LogoSvg size={pixelDimensions} shadow={shadow} />
      {showText && (
        <span style={{
          fontSize: size === 'sm' ? '13px' : size === 'hero' ? '18px' : '15px',
          fontWeight: 800,
          fontFamily: 'var(--font-mono)',
          color: '#0f0f11',
          marginTop: '6px',
          letterSpacing: '-0.02em'
        }}>
          Socialita
        </span>
      )}
    </div>
  );
};
