import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showText = false }) => {
  const pixelDimensions = size === 'hero' ? 96 : size === 'lg' ? 80 : size === 'md' ? 60 : size === 'sm' ? 44 : 56;

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <img
        src="/logo.png"
        alt="Socialita Logo"
        style={{
          width: `${pixelDimensions}px`,
          height: `${pixelDimensions}px`,
          objectFit: 'contain',
          display: 'block',
          transform: 'scale(1.5)',
        }}
      />
      {showText && (
        <span style={{
          fontSize: size === 'sm' ? '11px' : size === 'hero' ? '18px' : '13px',
          fontWeight: 800,
          fontFamily: 'var(--font-mono)',
          color: 'inherit',
          marginTop: '4px',
          letterSpacing: '-0.02em'
        }}>
          Socialita
        </span>
      )}
    </div>
  );
};
