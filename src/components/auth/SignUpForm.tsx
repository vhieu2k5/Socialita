import React, { useState } from 'react';
import { useSocial } from '../../context/SocialContext';

interface SignUpFormProps {
  onSwitchToSignIn: () => void;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({ onSwitchToSignIn }) => {
  const { register, showToast } = useSocial();
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreeTerms) {
      showToast('Vui lòng đồng ý với Điều khoản dịch vụ!', 'error');
      return;
    }

    if (confirmPassword && password !== confirmPassword) {
      showToast('Mật khẩu và Xác nhận mật khẩu không khớp!', 'error');
      return;
    }
    const name = `${lastName} ${firstName}`.trim();
    register(name, email, password);
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
            onClick={onSwitchToSignIn}
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
            Đăng nhập
          </button>

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
            Đăng ký
          </button>
        </div>

        {/* 2. Tiêu đề chính */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-dark)' }}>
            Tạo tài khoản mới
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-light-gray)', marginTop: '4px' }}>
            Chỉ mất chưa đến 1 phút để tham gia Socialita.
          </p>
        </div>

        {/* 3. Nút Đăng ký nhanh với Google */}
        <button
          type="button"
          onClick={() => register('Minh Anh Lê', 'minhanh.le@gmail.com', 'user')}
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
            cursor: 'pointer',
            marginBottom: '16px'
          }}
        >
          <span style={{ fontSize: '16px' }}>🌐</span>
          <span>Đăng ký nhanh với Google</span>
        </button>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          margin: '16px 0',
          fontSize: '11px',
          fontWeight: 700,
          color: '#b0b0b5',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }}></div>
          <span>HOẶC ĐIỀN THÔNG TIN</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }}></div>
        </div>

        {/* 4. Form Đăng ký */}
        <form onSubmit={handleSubmit}>
          {/* Hàng 2 ô Họ và Tên */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '14px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '6px' }}>
                Họ
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Vũ"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '6px' }}>
                Tên
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Mạnh Hiếu béo"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
          </div>

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
                type="email"
                className="form-control"
                style={{ paddingLeft: '36px' }}
                placeholder="user@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Ô nhập Số điện thoại */}
          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '6px' }}>
              Số điện thoại <span style={{ fontWeight: 400, color: '#9ca3af' }}>(Không bắt buộc)</span>
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: '14px' }}>
                📞
              </span>
              <input
                type="tel"
                className="form-control"
                style={{ paddingLeft: '36px' }}
                placeholder="0123456789"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
                placeholder="Tối thiểu 8 ký tự"
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

          {/* Ô Xác nhận Mật khẩu */}
          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '6px' }}>
              Xác nhận mật khẩu
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#22c55e', fontSize: '14px' }}>
                ✓
              </span>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                className="form-control"
                style={{ paddingLeft: '36px' }}
                placeholder="Nhập lại mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: '14px', cursor: 'pointer' }}
              >
                👁️
              </button>
            </div>
          </div>

          {/* Điều khoản Checkbox */}
          <div style={{ marginBottom: '20px', fontSize: '12px', color: 'var(--text-gray)' }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                style={{ marginTop: '2px' }}
              />
              <span>
                Tôi đồng ý với{' '}
                <span style={{ color: 'var(--brand-red)', fontWeight: 700 }}>Điều khoản dịch vụ</span> và{' '}
                <span style={{ color: 'var(--brand-red)', fontWeight: 700 }}>Chính sách bảo mật</span> của Socialita.
              </span>
            </label>
          </div>

          {/* Nút Tạo tài khoản chính */}
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
            <span>Tạo tài khoản</span>
            <span>➔</span>
          </button>

          {/* Link chuyển sang Đăng nhập */}
          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: 'var(--text-gray)' }}>
            Đã có tài khoản?{' '}
            <button
              type="button"
              onClick={onSwitchToSignIn}
              style={{ color: 'var(--brand-red)', fontWeight: 700 }}
            >
              Đăng nhập
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
