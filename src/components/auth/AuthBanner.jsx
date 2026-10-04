import React from 'react';

export const AuthBanner = () => {
  return (
    <div style={{
      flex: 1,
      backgroundColor: '#111113',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '44px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Badge Mạng xã hội */}
      <div>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          padding: '6px 14px',
          borderRadius: '9999px',
          fontSize: '12px',
          fontWeight: 700,
          color: '#ffffff'
        }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--brand-red)' }} />
          <span>Mạng xã hội thế hệ mới</span>
        </div>
      </div>

      {/* Tiêu đề & Thông điệp */}
      <div style={{ zIndex: 2 }}>
        <h2 style={{ fontSize: '32px', fontWeight: 900, lineHeight: 1.25, marginBottom: '16px' }}>
          Kết nối <span style={{ color: 'var(--brand-red)' }}>cảm xúc</span>,<br />
          chia sẻ từng <span style={{ color: 'var(--brand-red)' }}>khoảnh khắc</span>
        </h2>
        <p style={{ fontSize: '13.5px', color: '#a1a1aa', lineHeight: 1.6, maxWidth: '420px' }}>
          Tham gia cộng đồng Socialita để theo dõi bạn bè, khám phá hội nhóm và chia sẻ những khoảnh khắc tuyệt vời của riêng bạn.
        </p>
      </div>

      {/* Thống kê dưới đáy Banner */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        borderTop: '1px solid rgba(255, 255, 255, 0.12)',
        paddingTop: '20px'
      }}>
        <div>
          <div style={{ fontSize: '18px', fontWeight: 800 }}>+128K</div>
          <div style={{ fontSize: '11px', color: '#a1a1aa' }}>Thành viên</div>
        </div>
        <div>
          <div style={{ fontSize: '18px', fontWeight: 800 }}>45K+</div>
          <div style={{ fontSize: '11px', color: '#a1a1aa' }}>Bài viết mỗi ngày</div>
        </div>
        <div>
          <div style={{ fontSize: '18px', fontWeight: 800 }}>99.9%</div>
          <div style={{ fontSize: '11px', color: '#a1a1aa' }}>Tin cậy & An toàn</div>
        </div>
      </div>
    </div>
  );
};
