import React from 'react';
import { useSocial } from '../../context/SocialContext';

export const ToastContainer = () => {
  const { toasts } = useSocial();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <div key={toast.id} className="toast-box">
          <span>{toast.type === 'error' ? <i class="fa-solid fa-x"></i> : toast.type === 'info' ? <i class="fa-solid fa-triangle-exclamation"></i> : <i class="fa-solid fa-check"></i>}</span>
          <span>{toast.msg}</span>
        </div>
      ))}
    </div>
  );
};
