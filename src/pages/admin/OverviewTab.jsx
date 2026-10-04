import React, { useState } from 'react';
import { useSocial } from '../../context/SocialContext';
import { PostDetailModal } from '../../components/modals/PostDetailModal';

export const OverviewTab = ({ onNavigateTab }) => {
  const { showToast } = useSocial();
  const [selectedPost, setSelectedPost] = useState(null);

  const statCards = [
    { id: 'stat-1', title: 'Tổng người dùng', value: '1,248', badge: '+3.2%', icon: '👥' },
    { id: 'stat-2', title: 'Tổng bài viết', value: '4,930', badge: '+18', icon: '📄' },
    { id: 'stat-3', title: 'Báo cáo vi phạm chờ duyệt', value: '7', badge: 'Cần xử lý', icon: '⚠️' },
    { id: 'stat-4', title: 'Tài khoản bị khóa', value: '12', badge: 'Đã khóa', icon: '🔒' }
  ];

  return (
    <div>
      <h1 style={{ fontSize: '28px', fontWeight: 900, color: 'var(--text-dark)', marginBottom: '24px' }}>
        TỔNG QUAN HỆ THỐNG
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        {statCards.map(stat => (
          <div key={stat.id} className="widget-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '24px' }}>{stat.icon}</span>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--brand-red)', backgroundColor: '#fee2e2', padding: '2px 8px', borderRadius: '9999px' }}>
                {stat.badge}
              </span>
            </div>
            <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px' }}>{stat.title}</div>
            <div style={{ fontSize: '26px', fontWeight: 900, color: 'var(--text-dark)' }}>{stat.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '16px' }}>
        <button
          onClick={() => onNavigateTab('users')}
          style={{ padding: '12px 24px', borderRadius: '10px', backgroundColor: '#18181c', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer' }}
        >
          Quản lý người dùng →
        </button>
        <button
          onClick={() => onNavigateTab('posts')}
          style={{ padding: '12px 24px', borderRadius: '10px', backgroundColor: 'var(--brand-red)', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer' }}
        >
          Duyệt bài viết vi phạm →
        </button>
      </div>

      <PostDetailModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
        onToggleHide={() => showToast('Đã đổi trạng thái')}
        onDeletePost={() => { showToast('Đã xóa bài viết'); setSelectedPost(null); }}
      />
    </div>
  );
};
