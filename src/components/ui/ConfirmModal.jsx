import React from 'react';

export const ConfirmModal = ({ isOpen, icon, title, body, confirmLabel, confirmDanger, onConfirm, onCancel, children }) => {
  if (!isOpen) return null;
  return (
    <div className="confirm-overlay" onClick={onCancel}>
      <div className="confirm-modal" onClick={e => e.stopPropagation()}>
        {icon && <div className="confirm-icon">{icon}</div>}
        <h3 className="confirm-title">{title}</h3>
        <p className="confirm-body">{body}</p>
        {children}
        <div className="confirm-actions">
          <button className="confirm-btn-cancel" onClick={onCancel}>Quay lại</button>
          <button
            className={`confirm-btn-ok ${confirmDanger ? 'danger' : ''}`}
            onClick={onConfirm}
          >
            {confirmLabel || 'Xác nhận'}
          </button>
        </div>
      </div>
    </div>
  );
};
