import React from 'react';

export const Logo = ({ size = 'md', showText = false, shadow = false, className = '' }) => {
  const pixelDimensions = size === 'hero' ? 96 : size === 'lg' ? 80 : size === 'md' ? 60 : size === 'sm' ? 44 : 56;

  return (
    <div className={`logo-wrapper ${className}`} style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <img
        src="/logo.png"
        alt="Socialita Logo"
        style={{
          width: `${pixelDimensions}px`,
          height: `${pixelDimensions}px`,
          objectFit: 'contain',
          display: 'block',
          filter: shadow ? 'drop-shadow(0 8px 16px rgba(229,46,61,0.3))' : 'none',
        }}
      />
      {showText && (
        <span style={{
          fontSize: size === 'sm' ? '12px' : size === 'hero' ? '18px' : '14px',
          fontWeight: 800,
          fontFamily: 'var(--font-mono)',
          color: 'inherit',
          marginTop: '6px',
          letterSpacing: '-0.02em'
        }}>
          Socialita
        </span>
      )}
    </div>
  );
};

export const LogoSvg = ({ size = 48, shadow = false }) => (
  <img
    src="/logo.png"
    alt="Socialita Logo"
    style={{
      width: `${size}px`,
      height: `${size}px`,
      objectFit: 'contain',
      display: 'inline-block',
      filter: shadow ? 'drop-shadow(0 8px 16px rgba(229,46,61,0.3))' : 'none',
    }}
  />
);

