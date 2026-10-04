import React, { useState } from 'react';
import { SignInForm } from '../components/auth/SignInForm';
import { SignUpForm } from '../components/auth/SignUpForm';
import { AuthBanner } from '../components/auth/AuthBanner';

export const AuthPage = () => {
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
        {isLogin ? (
          <SignInForm onSwitchToSignUp={() => setIsLogin(false)} />
        ) : (
          <SignUpForm onSwitchToSignIn={() => setIsLogin(true)} />
        )}
        <AuthBanner />
      </div>
    </div>
  );
};
