import React, { useState } from 'react';
import { useSocial } from '../../context/SocialContext';

export const SignUpForm = ({ onSwitchToSignIn }) => {
  const { register } = useSocial();
  const [lastName, setLastName] = useState('Lê');
  const [firstName, setFirstName] = useState('Minh Anh');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Mật khẩu xác nhận không khớp!');
      return;
    }
    setLoading(true);
    try {
      const fullName = (lastName + ' ' + firstName).trim();
      await register(fullName, email, password, email.split('@')[0]);
      onSwitchToSignIn();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-wrapper">
      <h1 className="auth-title">Tạo tài khoản mới</h1>
      <p className="auth-subtitle">Chỉ mất chưa đến 1 phút để tham gia Socialita.</p>

      <button
        type="button"
        className="btn-google"
        onClick={() => onSwitchToSignIn()}
      >
        <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
        <span>Đăng ký nhanh với Google</span>
      </button>

      <div className="auth-divider">
        <span>HOẶC ĐIỀN THÔNG TIN</span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Họ</label>
            <input
              type="text"
              className="form-control"
              placeholder="Lê"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Tên</label>
            <input
              type="text"
              className="form-control"
              placeholder="Minh Anh"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Email</label>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>✉️</span>
            <input
              type="email"
              className="form-control"
              style={{ paddingLeft: '40px' }}
              placeholder="ban@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Số điện thoại (không bắt buộc)</label>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>📞</span>
            <input
              type="text"
              className="form-control"
              style={{ paddingLeft: '40px' }}
              placeholder="0901 234 567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Mật khẩu</label>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>🔒</span>
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control"
              style={{ paddingLeft: '40px', paddingRight: '40px' }}
              placeholder="Tối thiểu 8 ký tự"
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

          <div style={{ fontSize: '11px', color: '#8e8e93', marginTop: '6px' }}>Độ mạnh mật khẩu</div>
          <div className="password-strength-bar">
            <div className={'strength-segment ' + (password.length > 0 ? 'active' : '')} />
            <div className={'strength-segment ' + (password.length >= 6 ? 'active' : '')} />
            <div className={'strength-segment ' + (password.length >= 8 ? 'active' : '')} />
          </div>
        </div>

        <div className="form-group">
          <label>Xác nhận mật khẩu</label>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>✓</span>
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control"
              style={{ paddingLeft: '40px', paddingRight: '40px' }}
              placeholder="Nhập lại mật khẩu"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="auth-options" style={{ marginBottom: '20px' }}>
          <label style={{ alignItems: 'flex-start' }}>
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              style={{ marginTop: '3px', accentColor: 'var(--brand-red)' }}
              required
            />
            <span style={{ lineHeight: 1.4, fontSize: '12px' }}>
              Tôi đồng ý <a href="#">Điều khoản dịch vụ</a> và <a href="#">Chính sách bảo mật</a> của Socialita.
            </span>
          </label>
        </div>

        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? 'Đang tạo...' : 'Tạo tài khoản →'}
        </button>

        <div className="auth-switch">
          Đã có tài khoản? <a onClick={onSwitchToSignIn}>Đăng nhập</a>
        </div>
      </form>
    </div>
  );
};
