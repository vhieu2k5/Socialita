import React, { useState } from 'react';

export const LockUserModal = ({
  isOpen,
  userName,
  onClose,
  onConfirm
}) => {
  const [reason, setReason] = useState('Spam / quảng cáo trái phép');
  const [note, setNote] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(reason, note);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.55)',
      backdropFilter: 'blur(4px)',
      zIndex: 120,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        width: '460px',
        maxWidth: '95vw',
        padding: '24px 28px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)'
      }}>
        <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            backgroundColor: '#fee2e2',
            color: 'var(--brand-red)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            flexShrink: 0
          }}>
            🔒
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-dark)', margin: '0 0 4px' }}>
              Khóa tài khoản người dùng
            </h3>
            <p style={{ fontSize: '12.5px', color: '#6b7280', margin: 0, lineHeight: 1.4 }}>
              Bạn đang thực hiện khóa tài khoản của <strong>{userName}</strong>. Người dùng sẽ không thể đăng nhập hoặc tương tác.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '6px' }}>
              Lý do khóa tài khoản
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="form-control"
            >
              <option value="Spam / quảng cáo trái phép">Spam / quảng cáo trái phép</option>
              <option value="Nội dung quấy rối / đe dọa">Nội dung quấy rối / đe dọa</option>
              <option value="Giả mạo danh tính">Giả mạo danh tính</option>
              <option value="Vi phạm bản quyền nội dung">Vi phạm bản quyền nội dung</option>
              <option value="Khác">Lý do khác...</option>
            </select>
          </div>

          <div style={{ marginBottom: '22px' }}>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '6px' }}>
              Ghi chú nội bộ cho Admin
            </label>
            <textarea
              className="post-textarea"
              style={{ minHeight: '70px', fontSize: '12.5px' }}
              placeholder="Nhập chi tiết bằng chứng hoặc lưu ý thêm..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: '11px',
                borderRadius: '10px',
                border: '1px solid #e5e7eb',
                backgroundColor: '#ffffff',
                color: 'var(--text-dark)',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Hủy
            </button>

            <button
              type="submit"
              style={{
                flex: 1,
                padding: '11px',
                borderRadius: '10px',
                backgroundColor: 'var(--brand-red)',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(229,46,61,0.3)',
                border: 'none'
              }}
            >
              Xác nhận khóa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
