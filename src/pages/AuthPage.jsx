import React, { useState } from 'react';
import { SignInForm } from '../components/auth/SignInForm';
import { SignUpForm } from '../components/auth/SignUpForm';
import { AuthBanner } from '../components/auth/AuthBanner';

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-container">
      {/* Cột trái: Form Đăng nhập hoặc Đăng ký */}
      <div className="auth-left">
        {isLogin ? (
          <SignInForm onSwitchToSignUp={() => setIsLogin(false)} />
        ) : (
          <SignUpForm onSwitchToSignIn={() => setIsLogin(true)} />
        )}
      </div>

      {/* Cột phải: Banner tối chuẩn mockup */}
      <AuthBanner />
    </div>
  );
};
