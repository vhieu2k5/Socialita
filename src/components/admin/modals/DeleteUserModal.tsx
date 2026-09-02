import React, { useState } from 'react';

interface DeleteUserModalProps {
  isOpen: boolean;
  userName: string;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteUserModal: React.FC<DeleteUserModalProps> = ({
  isOpen,
  userName,
  onClose,
  onConfirm
}) => {
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!confirmed) return;
    onConfirm();
    onClose();
    setConfirmed(false);
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
        {/* Header với Icon Tam Giác Cảnh Báo Đỏ */}
        <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '18px' }}>
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
            ⚠️
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-dark)', margin: '0 0 4px' }}>
              Xóa vĩnh viễn tài khoản?
            </h3>
            <p style={{ fontSize: '12.5px', color: '#6b7280', margin: 0, lineHeight: 1.4 }}>
              Toàn bộ bài viết, bình luận và dữ liệu liên quan{userName ? ` của ${userName}` : ''} sẽ bị xóa và không thể khôi phục.
            </p>
          </div>
        </div>

        {/* Checkbox xác nhận nguy hiểm */}
        <div style={{
          backgroundColor: '#f9fafb',
          border: '1px solid #f3f4f6',
          borderRadius: '10px',
          padding: '12px 14px',
          marginBottom: '22px'
        }}>
          <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '12.5px', color: 'var(--text-dark)', cursor: 'pointer', lineHeight: 1.4 }}>
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              style={{ marginTop: '2px', cursor: 'pointer' }}
            />
            <span>Tôi hiểu hành động này không thể hoàn tác và xác nhận xóa tài khoản này.</span>
          </label>
        </div>

        {/* 2 Nút Hành động */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            type="button"
            onClick={() => {
              setConfirmed(false);
              onClose();
            }}
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
            type="button"
            onClick={handleConfirm}
            disabled={!confirmed}
            style={{
              flex: 1,
              padding: '11px',
              borderRadius: '10px',
              backgroundColor: confirmed ? 'var(--brand-red)' : '#fca5a5',
              color: '#ffffff',
              fontSize: '13px',
              fontWeight: 700,
              cursor: confirmed ? 'pointer' : 'not-allowed',
              boxShadow: confirmed ? '0 4px 12px rgba(229,46,61,0.3)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            Xóa vĩnh viễn
          </button>
        </div>
      </div>
    </div>
  );
};
