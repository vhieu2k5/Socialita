import React, { useState } from 'react';

export const UserDetailDrawer = ({
  user,
  onClose,
  onToggleLock,
  onDeleteUser
}) => {
  const [activeTab, setActiveTab] = useState('info');

  if (!user) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.45)',
      zIndex: 110,
      display: 'flex',
      justifyContent: 'flex-end'
    }}>
      <div style={{
        width: '480px',
        maxWidth: '90vw',
        height: '100%',
        backgroundColor: '#ffffff',
        boxShadow: '-4px 0 20px rgba(0,0,0,0.15)',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        padding: '24px 28px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--text-dark)' }}>Hồ sơ người dùng</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#8e8e93' }}>✕</button>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            backgroundColor: user.avatarBg || '#35c9b0',
            color: '#fff',
            fontSize: '24px',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px'
          }}>
            {user.name?.[0] || 'U'}
          </div>
          <h4 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 4px' }}>{user.name}</h4>
          <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>{user.email}</p>
        </div>

        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #e5e7eb', paddingBottom: '10px', marginBottom: '20px' }}>
          <button
            onClick={() => setActiveTab('info')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: activeTab === 'info' ? 'var(--brand-red)' : '#f3f4f6',
              color: activeTab === 'info' ? '#fff' : '#4b5563',
              fontSize: '12.5px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Thông tin
          </button>
        </div>

        {activeTab === 'info' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
            <div><strong>Trạng thái:</strong> {user.status}</div>
            <div><strong>Ngày tham gia:</strong> {user.joinedDate}</div>
            <div><strong>Số bài viết:</strong> {user.postsCount}</div>
            <div><strong>Nơi ở:</strong> {user.location || 'Chưa cập nhật'}</div>
          </div>
        )}

        <div style={{ marginTop: 'auto', paddingTop: '24px', display: 'flex', gap: '10px' }}>
          <button
            onClick={() => onToggleLock(user.id)}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              backgroundColor: '#ffffff',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer'
            }}
          >
            {user.status === 'Đã khóa' ? 'Mở khóa' : 'Khóa tài khoản'}
          </button>

          <button
            onClick={() => onDeleteUser(user.id)}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: 'var(--brand-red)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer'
            }}
          >
            Xóa người dùng
          </button>
        </div>
      </div>
    </div>
  );
};
