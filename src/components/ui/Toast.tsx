import React from 'react';
import { useSocial } from '../../context/SocialContext';

export const ToastContainer: React.FC = () => {
  const { toasts } = useSocial();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[120] flex flex-col gap-2.5 items-end pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className="bg-[#18181c] text-white text-[13.5px] font-medium px-4 py-2.5 rounded-xl shadow-2xl border border-white/10 flex items-center gap-2.5 animate-slide-up"
        >
          <span className="text-base">
            {toast.type === 'error' ? '❌' : toast.type === 'info' ? 'ℹ️' : '✨'}
          </span>
          <span>{toast.msg}</span>
        </div>
      ))}
    </div>
  );
};
