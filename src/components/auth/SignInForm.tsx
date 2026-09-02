import React, { useState } from 'react';
import { useSocial } from '../../context/SocialContext';
import { Logo } from '../ui/Logo';

interface SignInFormProps {
  onSwitchToSignUp: () => void;
}

export const SignInForm: React.FC<SignInFormProps> = ({ onSwitchToSignUp }) => {
  const { login, showToast } = useSocial();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div style={{
      flex: 1,
      padding: '40px 48px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      overflowY: 'auto'
    }}>
      <div>
        {/* 1. Dải chuyển Tab trên cùng */}
        <div style={{
          display: 'inline-flex',
          backgroundColor: '#f3f4f6',
          padding: '4px',
          borderRadius: '9999px',
          marginBottom: '28px'
        }}>
          <button
            type="button"
            style={{
              padding: '6px 20px',
              borderRadius: '9999px',
              fontSize: '13px',
              fontWeight: 700,
              backgroundColor: '#ffffff',
              color: 'var(--text-dark)',
              boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
              cursor: 'pointer'
            }}
          >
            Đăng nhập
          </button>

          <button
            type="button"
            onClick={onSwitchToSignUp}
            style={{
              padding: '6px 20px',
              borderRadius: '9999px',
              fontSize: '13px',
              fontWeight: 700,
              backgroundColor: 'transparent',
              color: '#8e8e93',
              cursor: 'pointer'
            }}
          >
            Đăng ký
          </button>
        </div>

        {/* 2. Tiêu đề chính */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-dark)' }}>
            Chào mừng trở lại 👋
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-light-gray)', marginTop: '4px' }}>
            Đăng nhập để tiếp tục với Socialita.
          </p>
        </div>

        {/* 3. Form Đăng nhập */}
        <form onSubmit={handleSubmit}>
          {/* Ô nhập Email */}
          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '6px' }}>
              Email
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: '14px' }}>
                ✉️
              </span>
              <input
                type="text"
                className="form-control"
                style={{ paddingLeft: '36px' }}
                placeholder="Nhập email (ví dụ: admin@socialita.vn)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Ô nhập Mật khẩu */}
          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '6px' }}>
              Mật khẩu
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: '14px' }}>
                🔒
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                style={{ paddingLeft: '36px', paddingRight: '36px' }}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: '14px', cursor: 'pointer' }}
              >
                👁️
              </button>
            </div>
          </div>

          {/* Checkbox Ghi nhớ & Quên mật khẩu */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', fontSize: '12.5px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', color: 'var(--text-dark)' }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Ghi nhớ đăng nhập</span>
            </label>
            <button type="button" onClick={() => showToast('Chức năng quên mật khẩu')} style={{ color: 'var(--brand-red)', fontWeight: 700 }}>
              Quên mật khẩu?
            </button>
          </div>

          <div style={{
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            padding: '10px 14px',
            marginBottom: '16px',
            fontSize: '11.5px',
            color: '#475569',
            lineHeight: 1.5
          }}>
            <div style={{ fontWeight: 800, color: '#1e293b', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>💡</span> <span>Tài khoản mẫu để test 2 giao diện nhé!</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div>🛡️ <strong>Admin:</strong> <code style={{ backgroundColor: '#e2e8f0', padding: '1px 5px', borderRadius: '4px' }}>admin@gmail.com</code> | Mật khẩu: <code>123</code></div>
              <div>👤 <strong>User:</strong> <code style={{ backgroundColor: '#e2e8f0', padding: '1px 5px', borderRadius: '4px' }}>user@gmail.com</code> | Mật khẩu: <code>123</code></div>
            </div>
          </div>  

          {/* Nút Đăng nhập chính */}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '13px',
              borderRadius: '12px',
              backgroundColor: 'var(--brand-red)',
              color: '#ffffff',
              fontSize: '14.5px',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(229, 46, 61, 0.4)',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <span>Đăng nhập</span>
            <span>➔</span>
          </button>

          {/* Dòng phân cách Hoặc */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            margin: '18px 0',
            fontSize: '11px',
            fontWeight: 700,
            color: '#b0b0b5',
            textTransform: 'uppercase'
          }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }}></div>
            <span>HOẶC</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }}></div>
          </div>

          {/* Nút Đăng nhập với Google */}
          <button
            type="button"
            onClick={() => login('user@gmail.com', '123')}
            style={{
              width: '100%',
              padding: '10px 16px',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              backgroundColor: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              fontSize: '13.5px',
              fontWeight: 600,
              color: 'var(--text-dark)',
              cursor: 'pointer'
            }}
          >
            <span style={{ fontSize: '16px' }}>🌐</span>
            <span>Đăng nhập với Google</span>
          </button>

          {/* Link chuyển sang Đăng ký */}
          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: 'var(--text-gray)' }}>
            Chưa có tài khoản?{' '}
            <button
              type="button"
              onClick={onSwitchToSignUp}
              style={{ color: 'var(--brand-red)', fontWeight: 700 }}
            >
              Đăng ký ngay
            </button>
          </div>
        </form>
      </div>

      {/* Logo nhỏ dưới chân form */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Logo size="sm" showText={true} />
      </div>
    </div>
  );
};
