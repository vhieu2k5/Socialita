import React from 'react';

export const PostDetailModal = ({
  post,
  onClose,
  onToggleHide,
  onDeletePost
}) => {
  if (!post) return null;

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
        width: '500px',
        maxWidth: '95vw',
        padding: '24px 28px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--text-dark)' }}>
            Chi tiết bài viết
          </h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#8e8e93' }}>✕</button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--brand-red)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
            {post.authorName?.[0] || 'U'}
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '14px' }}>{post.authorName}</div>
            <div style={{ fontSize: '12px', color: '#8e8e93' }}>{post.authorHandle || '@user'} · {post.postedTime || 'Vừa xong'}</div>
          </div>
        </div>

        <div style={{
          backgroundColor: '#f8fafc',
          padding: '14px 16px',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          fontSize: '13.5px',
          lineHeight: 1.5,
          color: '#1e293b',
          marginBottom: '20px'
        }}>
          "{post.content}"
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button
            onClick={() => onToggleHide(post.id)}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              backgroundColor: '#ffffff',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            {post.status === 'Đã ẩn' ? 'Bỏ ẩn bài' : 'Ẩn bài viết'}
          </button>

          <button
            onClick={() => onDeletePost(post.id)}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              backgroundColor: 'var(--brand-red)',
              color: '#ffffff',
              border: 'none',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Xóa bài viết
          </button>
        </div>
      </div>
    </div>
  );
};
