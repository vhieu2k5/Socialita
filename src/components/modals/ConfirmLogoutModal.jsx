import React from 'react';
import { useSocial } from '../../context/SocialContext';

export const ConfirmLogoutModal = () => {
  const { isLogoutModalOpen, closeLogoutModal, confirmLogout, currentUser } = useSocial();

  if (!isLogoutModalOpen) return null;

  const isAdmin = currentUser?.role === 'admin';

  return (
    <div
      onClick={closeLogoutModal}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          width: '400px',
          maxWidth: '92vw',
          padding: '24px 24px 20px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)',
          textAlign: 'center'
        }}
      >
        {/* Icon cảnh báo tròn màu đỏ nhúng Font Awesome */}
        <div
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            backgroundColor: '#fee2e2',
            color: '#e52e3d',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '22px',
            margin: '0 auto 16px'
          }}
        >
          <i className="fa-solid fa-right-from-bracket"></i>
        </div>

        <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#18181c', margin: '0 0 8px' }}>
          {isAdmin ? 'Đăng xuất khỏi Quản trị?' : 'Xác nhận đăng xuất?'}
        </h3>

        <p style={{ fontSize: '13.5px', color: '#6b7280', margin: '0 0 24px', lineHeight: 1.5 }}>
          {isAdmin
            ? 'Bạn có chắc chắn muốn kết thúc phiên quản trị viên và đăng xuất khỏi hệ thống không?'
            : 'Bạn có chắc chắn muốn đăng xuất khỏi tài khoản Socialita không?'}
        </p>

        {/* 2 Nút Hủy và Xác nhận Đăng xuất */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            type="button"
            onClick={closeLogoutModal}
            style={{
              flex: 1,
              padding: '11px 16px',
              borderRadius: '10px',
              border: '1px solid #e5e7eb',
              backgroundColor: '#f9fafb',
              color: '#374151',
              fontSize: '13.5px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'background-color 0.15s ease'
            }}
          >
            Hủy
          </button>

          <button
            type="button"
            onClick={confirmLogout}
            style={{
              flex: 1,
              padding: '11px 16px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: '#e52e3d',
              color: '#ffffff',
              fontSize: '13.5px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(229, 46, 61, 0.3)',
              transition: 'background-color 0.15s ease'
            }}
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
};
