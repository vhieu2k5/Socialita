import React from 'react';
import { useSocial } from '../../context/SocialContext';

export const ToastContainer: React.FC = () => {
  const { toasts } = useSocial();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <div key={toast.id} className="toast-box">
          <span>{toast.type === 'error' ? '❌' : toast.type === 'info' ? 'ℹ️' : '✨'}</span>
          <span>{toast.msg}</span>
        </div>
      ))}
    </div>
  );
};
