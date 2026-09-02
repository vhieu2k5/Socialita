import React, { useState } from 'react';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';
import { AuthBanner } from './AuthBanner';

export const AuthPage: React.FC = () => {
  // State quản lý: true là Đăng nhập, false là Đăng ký
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      backgroundColor: '#f6f4ee',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      {/* Khung chứa chính (Bố cục 2 cột) */}
      <div style={{
        width: '100%',
        maxWidth: '1050px',
        minHeight: '640px',
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        border: '1px solid #e5e7eb'
      }}>
        {/* Cột trái: Form Đăng nhập hoặc Đăng ký */}
        {isLogin ? (
          <SignInForm onSwitchToSignUp={() => setIsLogin(false)} />
        ) : (
          <SignUpForm onSwitchToSignIn={() => setIsLogin(true)} />
        )}

        {/* Cột phải: Banner đen cố định */}
        <AuthBanner />
      </div>
    </div>
  );
};