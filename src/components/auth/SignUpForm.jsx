import React, { useState } from 'react';
import { useSocial } from '../../context/SocialContext';
import { GoogleAuthModal } from './GoogleAuthModal';

export const SignUpForm = ({ onSwitchToSignIn }) => {
  const { register, showToast } = useSocial();
  const [lastName, setLastName] = useState('Lê');
  const [firstName, setFirstName] = useState('Minh Anh');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);

  // 4 tiêu chí kiểm tra mật khẩu
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password);

  const passwordRequirements = [
    { id: 'length', label: 'Tối thiểu 8 ký tự', met: hasMinLength },
    { id: 'uppercase', label: 'Có chữ viết hoa (A-Z)', met: hasUpperCase },
    { id: 'number', label: 'Có chữ số (0-9)', met: hasNumber },
    { id: 'special', label: 'Có ký tự đặc biệt (!@#$...)', met: hasSpecialChar },
  ];

  const passedCount = passwordRequirements.filter((r) => r.met).length;
  const isPasswordValid = hasMinLength && hasUpperCase && hasNumber && hasSpecialChar;

  const getStrengthInfo = () => {
    if (!password) return { text: 'Chưa nhập', color: '#9ca3af', level: 0 };
    if (passedCount <= 1) return { text: 'Yếu', color: '#ef4444', level: 1 };
    if (passedCount === 2) return { text: 'Trung bình', color: '#f97316', level: 2 };
    if (passedCount === 3) return { text: 'Khá', color: '#eab308', level: 3 };
    return { text: 'Mạnh & Đạt chuẩn', color: '#10b981', level: 4 };
  };

  const strength = getStrengthInfo();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!isPasswordValid) {
      const msg = 'Mật khẩu phải có tối thiểu 8 ký tự, bao gồm ít nhất 1 chữ hoa, 1 chữ số và 1 ký tự đặc biệt!';
      setErrorMessage(msg);
      if (showToast) showToast(msg, 'error');
      return;
    }

    if (password !== confirmPassword) {
      const msg = 'Mật khẩu xác nhận không khớp!';
      setErrorMessage(msg);
      if (showToast) showToast(msg, 'error');
      return;
    }

    if (!agreeTerms) {
      const msg = 'Vui lòng đồng ý với Điều khoản dịch vụ và Chính sách bảo mật!';
      setErrorMessage(msg);
      if (showToast) showToast(msg, 'error');
      return;
    }

    setLoading(true);
    try {
      const fullName = (lastName + ' ' + firstName).trim();
      const success = await register(fullName, email, password, email.split('@')[0]);
      if (success) {
        onSwitchToSignIn();
      }
    } catch (err) {
      setErrorMessage(err.message || 'Lỗi khi đăng ký tài khoản');
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
        onClick={() => setIsGoogleModalOpen(true)}
      >
        <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
        <span>Đăng ký nhanh với Google</span>
      </button>

      <div className="auth-divider">
        <span>HOẶC ĐIỀN THÔNG TIN</span>
      </div>

      {errorMessage && (
        <div style={{
          backgroundColor: '#fef2f2',
          color: '#b91c1c',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          padding: '10px 14px',
          fontSize: '13px',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          lineHeight: '1.4'
        }}>
          <span style={{ fontSize: '16px' }}>⚠️</span>
          <span>{errorMessage}</span>
        </div>
      )}

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
              onChange={(e) => {
                setPassword(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>

          {/* Thanh đo độ mạnh mật khẩu */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
            <span style={{ fontSize: '11px', color: '#8e8e93' }}>Độ mạnh mật khẩu</span>
            <span style={{ fontSize: '11px', fontWeight: '600', color: strength.color }}>
              {strength.text}
            </span>
          </div>

          <div className="password-strength-bar" style={{ display: 'flex', gap: '4px', marginTop: '4px', marginBottom: '8px' }}>
            {[0, 1, 2, 3].map((index) => {
              let segmentColor = '#e5e7eb';
              if (index < passedCount) {
                if (passedCount <= 1) segmentColor = '#ef4444';
                else if (passedCount === 2) segmentColor = '#f97316';
                else if (passedCount === 3) segmentColor = '#eab308';
                else segmentColor = '#10b981';
              }
              return (
                <div
                  key={index}
                  style={{
                    flex: 1,
                    height: '4px',
                    borderRadius: '2px',
                    backgroundColor: segmentColor,
                    transition: 'background-color 0.25s ease'
                  }}
                />
              );
            })}
          </div>

          {/* Checklist 4 điều kiện mật khẩu */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '6px 10px',
            padding: '8px 12px',
            backgroundColor: '#f8fafc',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            marginBottom: '10px',
            fontSize: '11px'
          }}>
            {passwordRequirements.map((req) => (
              <div
                key={req.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: req.met ? '#059669' : '#64748b',
                  fontWeight: req.met ? '600' : '400',
                  transition: 'all 0.2s ease'
                }}
              >
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  fontSize: '9px',
                  fontWeight: '700',
                  backgroundColor: req.met ? '#d1fae5' : '#e2e8f0',
                  color: req.met ? '#059669' : '#94a3b8'
                }}>
                  {req.met ? '✓' : '•'}
                </span>
                <span>{req.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Xác nhận mật khẩu</label>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>✓</span>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              className="form-control"
              style={{
                paddingLeft: '40px',
                paddingRight: '40px',
                borderColor: confirmPassword && confirmPassword !== password ? '#ef4444' : undefined
              }}
              placeholder="Nhập lại mật khẩu"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {showConfirmPassword ? '🙈' : '👁️'}
            </button>
          </div>
          {confirmPassword && confirmPassword !== password && (
            <div style={{ fontSize: '11px', color: '#ef4444', marginTop: '4px' }}>
              Mật khẩu xác nhận chưa khớp!
            </div>
          )}
          {confirmPassword && confirmPassword === password && (
            <div style={{ fontSize: '11px', color: '#10b981', marginTop: '4px' }}>
              ✓ Mật khẩu khớp!
            </div>
          )}
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

      <GoogleAuthModal
        isOpen={isGoogleModalOpen}
        onClose={() => setIsGoogleModalOpen(false)}
      />
    </div>
  );
};
