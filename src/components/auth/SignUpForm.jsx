import React, { useState } from 'react';
import { useSocial } from '../../context/SocialContext';
import { Logo } from '../ui/Logo';

export const SignUpForm = ({ onSwitchToSignIn }) => {
  const { register } = useSocial();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(name, email, password, username);
    } finally {
      setLoading(false);
    }
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
              cursor: 'pointer',
              border: 'none'
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
              cursor: 'pointer',
              border: 'none'
            }}
          >
            Đăng ký
          </button>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-dark)' }}>
            Tạo tài khoản mới ✨
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-light-gray)', marginTop: '4px' }}>
            Khám phá cộng đồng Socialita ngay hôm nay.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '6px' }}>
              Họ và tên
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Ví dụ: Lê Minh Anh"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '6px' }}>
              Tên đăng nhập (Username)
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="minhanh_123"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '6px' }}>
              Email
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="minhanh@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '6px' }}>
              Mật khẩu
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Tối thiểu 6 ký tự"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '13px',
              borderRadius: '12px',
              backgroundColor: 'var(--brand-red)',
              color: '#ffffff',
              fontSize: '14.5px',
              fontWeight: 800,
              cursor: loading ? 'not-allowed' : 'pointer',
              border: 'none',
              boxShadow: '0 4px 14px rgba(229, 46, 61, 0.4)'
            }}
          >
            {loading ? 'Đang tạo tài khoản...' : 'Tạo tài khoản'}
          </button>
        </form>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Logo size="sm" showText={true} />
      </div>
    </div>
  );
};
