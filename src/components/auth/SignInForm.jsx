import React, { useState } from 'react';
import { useSocial } from '../../context/SocialContext';
import { Logo } from '../ui/Logo';

export const SignInForm = ({ onSwitchToSignUp }) => {
  const { login, showToast } = useSocial();
  const [email, setEmail] = useState('minhanh.le@gmail.com');
  const [password, setPassword] = useState('123456');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-wrapper">
      {/* Dải chuyển tab Đăng nhập / Đăng ký */}
      <div className="auth-tabs">
        <div className="auth-tab active">Đăng nhập</div>
        <div className="auth-tab" onClick={onSwitchToSignUp}>Đăng ký</div>
      </div>

      <h1 className="auth-title">Chào mừng trở lại 👋</h1>
      <p className="auth-subtitle">Đăng nhập để tiếp tục với Socialita.</p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>
              ✉️
            </span>
            <input
              type="text"
              className="form-control"
              style={{ paddingLeft: '40px' }}
              placeholder="minhanh.le@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Mật khẩu</label>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>
              🔒
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control"
              style={{ paddingLeft: '40px', paddingRight: '40px' }}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              👁️
            </button>
          </div>
        </div>

        <div className="auth-options">
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              style={{ accentColor: 'var(--brand-red)' }}
            />
            <span>Ghi nhớ đăng nhập</span>
          </label>
          <a href="#" onClick={(e) => { e.preventDefault(); showToast('Chức năng quên mật khẩu đang hoàn thiện', 'info'); }}>
            Quên mật khẩu?
          </a>
        </div>

        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? 'Đang đăng nhập...' : 'Đăng nhập →'}
        </button>

        <div className="auth-divider">
          <span>HOẶC</span>
        </div>

        <button
          type="button"
          className="btn-google"
          onClick={() => login('user@gmail.com', '123')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          <span>Đăng nhập với Google</span>
        </button>

        <div className="auth-switch">
          Chưa có tài khoản? <a onClick={onSwitchToSignUp}>Đăng ký ngay</a>
        </div>
      </form>

      {/* Mini logo ở dưới chân form */}
      <div className="mini-logo">
        <Logo size="sm" showText={true} />
      </div>
    </div>
  );
};
