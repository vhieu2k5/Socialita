import React from 'react';
import { Logo } from '../ui/Logo';

export const AuthBanner = () => {
  return (
    <div className="auth-right">
      <div className="auth-right-content">
        {/* Vòng tròn logo lớn */}
        <div className="auth-logo-large">
          <img src="/logo.png" alt="Socialita Logo" style={{ width: '96px', height: '96px', objectFit: 'contain' }} />
          <span style={{ fontSize: '18px', fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#0f0f11', marginTop: '6px' }}>
            Socialita
          </span>
        </div>

        <div className="auth-right-tag">CỘNG ĐỒNG TRẺ, NĂNG ĐỘNG</div>
        <h2 className="auth-right-title">
          Kết nối thật.<br />
          Chia sẻ là chính bạn.
        </h2>
        <p className="auth-right-desc">
          Tham gia Socialita để theo dõi bạn bè, khám phá hội nhóm và chia sẻ những khoảnh khắc của riêng bạn — mọi lúc, mọi nơi.
        </p>
      </div>

      {/* Thẻ đếm số lượng người dùng dưới chân banner */}
      <div className="auth-right-footer">
        <div className="count">+128.000 người dùng</div>
        <div className="desc">đã tham gia cộng đồng Socialita trong năm nay</div>
      </div>
    </div>
  );
};
