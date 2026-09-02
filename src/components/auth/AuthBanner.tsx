import React from 'react';
import { Logo } from '../ui/Logo';

export const AuthBanner: React.FC = () => {
  return (
    <div style={{
      flex: 1.1,
      backgroundColor: '#0f0f11',
      padding: '48px 40px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      color: '#ffffff',
      position: 'relative'
    }}>
      {/* Logo tròn to ở góc phải trên */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{
          width: '110px',
          height: '110px',
          backgroundColor: '#ffffff',
          borderRadius: '50%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(0,0,0,0.6)'
        }}>
          <Logo size="md" showText={false} />
        </div>
      </div>

      {/* Slogan & Giới thiệu chính giữa */}
      <div style={{ margin: 'auto 0' }}>
        <div style={{
          fontSize: '11px',
          fontWeight: 800,
          color: 'var(--brand-red)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom: '10px'
        }}>
          CỘNG ĐỒNG TRẺ, NĂNG ĐỘNG
        </div>

        <h1 style={{ fontSize: '32px', fontWeight: 800, lineHeight: '1.25', marginBottom: '14px' }}>
          Kết nối thật.<br />
          Chia sẻ là chính bạn.
        </h1>

        <p style={{ fontSize: '13px', color: '#a1a1a6', lineHeight: '1.6', maxWidth: '380px' }}>
          Tham gia Socialita để theo dõi bạn bè, khám phá hội nhóm và chia sẻ những khoảnh khắc của riêng bạn — mọi lúc, mọi nơi.
        </p>
      </div>

      {/* Thẻ thống kê dưới đáy */}
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '14px',
        padding: '16px 20px',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff' }}>
          +128.000 người dùng
        </div>
        <div style={{ fontSize: '12px', color: '#8e8e93', marginTop: '2px' }}>
          đã tham gia cộng đồng Socialita trong năm nay
        </div>
      </div>
    </div>
  );
};
