import React, { useState, useEffect } from 'react';
import { useSocial } from '../../context/SocialContext';

const DEFAULT_GOOGLE_ACCOUNTS = [
  {
    name: 'Lê Minh Anh',
    email: 'minhanh.le@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
  },
  {
    name: 'Quang Huy',
    email: 'quanghuy@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop'
  },
  {
    name: 'Hoàng Nam',
    email: 'hoangnam@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
  },
  {
    name: 'Quản Trị Viên',
    email: 'admin@socialita.vn',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop'
  }
];

export const GoogleAuthModal = ({ isOpen, onClose }) => {
  const { loginWithGoogle, showToast } = useSocial();
  const [loading, setLoading] = useState(false);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');

  // Tích hợp Google Identity Services (GIS) nếu có Client ID
  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!isOpen || !clientId) return;

    const handleCredentialResponse = async (response) => {
      if (!response.credential) return;
      setLoading(true);
      try {
        await loginWithGoogle({ credential: response.credential });
        onClose();
      } catch (err) {
        showToast('Đăng nhập Google thất bại: ' + err.message, 'error');
      } finally {
        setLoading(false);
      }
    };

    const initGIS = () => {
      try {
        if (window.google?.accounts?.id) {
          window.google.accounts.id.initialize({
            client_id: clientId,
            callback: handleCredentialResponse
          });
          const btnDiv = document.getElementById('google-official-btn');
          if (btnDiv) {
            window.google.accounts.id.renderButton(btnDiv, {
              theme: 'outline',
              size: 'large',
              width: 380,
              text: 'continue_with'
            });
          }
        }
      } catch (e) {
        console.warn('Không thể khởi tạo GIS:', e);
      }
    };

    if (!window.google?.accounts?.id) {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = initGIS;
      document.body.appendChild(script);
    } else {
      initGIS();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelectAccount = async (acc) => {
    setLoading(true);
    try {
      const success = await loginWithGoogle({
        name: acc.name,
        email: acc.email,
        avatar_url: acc.avatar
      });
      if (success) {
        onClose();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCustomSubmit = async (e) => {
    e.preventDefault();
    if (!customEmail) {
      showToast('Vui lòng nhập Email Google', 'warning');
      return;
    }
    setLoading(true);
    try {
      const name = customName.trim() || customEmail.split('@')[0];
      const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=4285F4&color=fff`;
      const success = await loginWithGoogle({
        name,
        email: customEmail.trim(),
        avatar_url: avatar
      });
      if (success) {
        onClose();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay open" onClick={onClose} style={{ zIndex: 1000 }}>
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '430px',
          padding: '28px 24px',
          borderRadius: '16px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)',
          animation: 'flyoutSlideDown 0.2s ease-out'
        }}
      >
        {/* Header với logo Google */}
        <div style={{ textAlign: 'center', marginBottom: '20px', position: 'relative' }}>
          <button
            onClick={onClose}
            type="button"
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              background: 'none',
              border: 'none',
              fontSize: '18px',
              cursor: 'pointer',
              color: '#9ca3af'
            }}
          >
            ✕
          </button>

          <svg width="36" height="36" viewBox="0 0 24 24" style={{ marginBottom: '8px' }}>
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>

          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937', margin: '4px 0' }}>
            Đăng nhập bằng Google
          </h2>
          <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
            Chọn tài khoản để tiếp tục tới <strong>Socialita</strong>
          </p>
        </div>

        {/* Khu vực nút Google chính thức nếu có Client ID */}
        <div id="google-official-btn" style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }} />

        {/* Trạng thái Loading */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                border: '3px solid #e5e7eb',
                borderTopColor: '#4285F4',
                borderRadius: '50%',
                margin: '0 auto 12px',
                animation: 'spin 0.8s linear infinite'
              }}
            />
            <p style={{ fontSize: '13px', color: '#4b5563' }}>Đang xác thực với Google...</p>
          </div>
        )}

        {!loading && !showCustomForm && (
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
              {DEFAULT_GOOGLE_ACCOUNTS.map((acc) => (
                <div
                  key={acc.email}
                  onClick={() => handleSelectAccount(acc)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 14px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    backgroundColor: '#ffffff'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                    e.currentTarget.style.borderColor = '#4285F4';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#ffffff';
                    e.currentTarget.style.borderColor = '#e5e7eb';
                  }}
                >
                  <img
                    src={acc.avatar}
                    alt={acc.name}
                    style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: '#111827' }}>
                      {acc.name}
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#6b7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {acc.email}
                    </div>
                  </div>
                  <span style={{ fontSize: '12px', color: '#9ca3af' }}>→</span>
                </div>
              ))}
            </div>

            {/* Sử dụng tài khoản khác */}
            <button
              type="button"
              onClick={() => setShowCustomForm(true)}
              style={{
                width: '100%',
                padding: '10px',
                background: 'none',
                border: '1px dashed #d1d5db',
                borderRadius: '10px',
                color: '#2563eb',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'background-color 0.15s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#eff6ff')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <span>+</span>
              <span>Sử dụng tài khoản Google khác</span>
            </button>
          </div>
        )}

        {/* Form nhập tài khoản Google tuỳ ý */}
        {!loading && showCustomForm && (
          <form onSubmit={handleCustomSubmit}>
            <div className="form-group" style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '12px', fontWeight: '600' }}>Tên hiển thị</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ví dụ: Nguyễn Văn A"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '12px', fontWeight: '600' }}>Email Google</label>
              <input
                type="email"
                className="form-control"
                placeholder="tenban@gmail.com"
                value={customEmail}
                onChange={(e) => setCustomEmail(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setShowCustomForm(false)}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  background: '#f3f4f6',
                  color: '#374151',
                  fontSize: '13px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Quay lại
              </button>
              <button
                type="submit"
                style={{
                  flex: 2,
                  padding: '10px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#4285F4',
                  color: '#ffffff',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Đăng nhập ngay
              </button>
            </div>
          </form>
        )}

        <div style={{ marginTop: '18px', textAlign: 'center', fontSize: '11px', color: '#9ca3af', lineHeight: 1.4 }}>
          Google sẽ chia sẻ tên, địa chỉ email và ảnh hồ sơ của bạn với Socialita. Xem Điều khoản & Chính sách bảo mật.
        </div>
      </div>
    </div>
  );
};
