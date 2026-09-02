import React, { useState } from 'react';

interface LockUserModalProps {
  isOpen: boolean;
  userName: string;
  onClose: () => void;
  onConfirm: (reason: string, note: string) => void;
}

export const LockUserModal: React.FC<LockUserModalProps> = ({
  isOpen,
  userName,
  onClose,
  onConfirm
}) => {
  const [reason, setReason] = useState('Spam / quảng cáo trái phép');
  const [note, setNote] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
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
      padding: '16px',
      animation: 'fadeIn 0.15s ease'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        width: '460px',
        maxWidth: '95vw',
        padding: '24px 28px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
        animation: 'slideUp 0.2s ease'
      }}>
        {/* Header với Icon Khóa Đỏ */}
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
              Khóa tài khoản người dùng?
            </h3>
            <p style={{ fontSize: '12.5px', color: '#6b7280', margin: 0, lineHeight: 1.4 }}>
              {userName ? `${userName} ` : 'Người dùng '}sẽ không thể đăng nhập cho đến khi được mở khóa lại.
            </p>
          </div>
        </div>

        {/* Form chọn lý do & ghi chú */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '6px' }}>
              Lý do khóa tài khoản
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid #e5e7eb',
                backgroundColor: '#ffffff',
                fontSize: '13px',
                color: 'var(--text-dark)',
                outline: 'none'
              }}
            >
              <option value="Spam / quảng cáo trái phép">Spam / quảng cáo trái phép</option>
              <option value="Ngôn từ gây thù ghét / xúc phạm">Ngôn từ gây thù ghét / xúc phạm</option>
              <option value="Giả mạo danh tính">Giả mạo danh tính</option>
              <option value="Nội dung độc hại / vi phạm pháp luật">Nội dung độc hại / vi phạm pháp luật</option>
              <option value="Khác">Khác</option>
            </select>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '6px' }}>
              Ghi chú nội bộ (tùy chọn)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Mô tả chi tiết vi phạm để lưu vào lịch sử tài khoản..."
              rows={3}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid #e5e7eb',
                fontSize: '13px',
                color: 'var(--text-dark)',
                outline: 'none',
                resize: 'none',
                fontFamily: 'inherit'
              }}
            />
          </div>

          {/* 2 Nút Hành động */}
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
                boxShadow: '0 4px 12px rgba(229,46,61,0.3)'
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
