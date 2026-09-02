import React, { useState } from 'react';
import { useSocial } from '../../../context/SocialContext';
import type { AdminTabType } from '../layout/AdminSidebar';
import { PostDetailModal, type AdminPostDetailData } from '../modals/PostDetailModal';

interface OverviewTabProps {
  onNavigateTab: (tab: AdminTabType) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ onNavigateTab }) => {
  const { showToast } = useSocial();
  const [selectedPost, setSelectedPost] = useState<AdminPostDetailData | null>(null);

  const sampleReportedPost: AdminPostDetailData = {
    id: 'ap-1',
    content: 'Bán tài khoản game giá rẻ, ib zalo... liên hệ ngay kẻo hết ưu đãi!!',
    authorName: 'fake_account_02',
    authorHandle: '@fakeacc02',
    postedTime: '2 giờ trước',
    reportsCount: 6,
    reportsBreakdown: [
      { reason: 'Spam / quảng cáo trái phép', count: 4 },
      { reason: 'Nội dung lừa đảo', count: 2 }
    ],
    status: 'Chờ xử lý'
  };

  const statCards = [
    {
      id: 'stat-1',
      title: 'Tổng người dùng',
      value: '1,248',
      badge: '+3.2%',
      badgeType: 'green',
      icon: '👥'
    },
    {
      id: 'stat-2',
      title: 'Tổng bài viết',
      value: '4,930',
      badge: '+18',
      badgeType: 'green',
      icon: '📄'
    },
    {
      id: 'stat-3',
      title: 'Báo cáo vi phạm chờ duyệt',
      value: '7',
      badge: 'Cần xử lý',
      badgeType: 'red',
      icon: '⚠️'
    },
    {
      id: 'stat-4',
      title: 'Tài khoản bị khóa',
      value: '12',
      badge: 'Đã khóa',
      badgeType: 'red-light',
      icon: '🔒'
    }
  ];

  const recentActivities = [
    {
      id: 'act-1',
      title: 'Bài viết bị báo cáo x3',
      detail: '"Cuối tuần này lớp mình..." — bởi Quang Huy',
      time: '08:14',
      dotColor: '#e52e3d',
      actionType: 'post'
    },
    {
      id: 'act-2',
      title: 'Người dùng mới đăng ký',
      detail: 'Bảo Trân (@baotran) vừa tạo tài khoản',
      time: '07:52',
      dotColor: '#22c55e',
      actionType: 'user'
    },
    {
      id: 'act-3',
      title: '12 bài viết mới trong 1 giờ qua',
      detail: 'Chủ yếu từ hội nhóm Du lịch & Nhiếp ảnh',
      time: '07:10',
      dotColor: '#22c55e',
      actionType: 'feed'
    },
    {
      id: 'act-4',
      title: 'Tài khoản bị khóa',
      detail: '@fake_account_02 — vi phạm spam',
      time: 'Hôm qua',
      dotColor: '#e52e3d',
      actionType: 'user'
    },
    {
      id: 'act-5',
      title: 'Hội nhóm mới được tạo',
      detail: '"Runner Sài Gòn" bởi Hải Đăng',
      time: 'Hôm qua',
      dotColor: '#22c55e',
      actionType: 'group'
    }
  ];

  return (
    <div>
      {/* Header: Tiêu đề + Chuông + Avatar xanh */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 900, color: 'var(--text-dark)', letterSpacing: '0.04em' }}>
          TỔNG QUAN
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button className="icon-btn-white" onClick={() => showToast('Không có thông báo khẩn')}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '20px', height: '20px' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="red-dot" />
          </button>

          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#38bdf8',
            border: '2px solid rgba(255, 255, 255, 0.8)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }} />
        </div>
      </div>

      {/* 4 Thẻ Thống kê hàng ngang */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {statCards.map(card => (
          <div
            key={card.id}
            className="widget-card"
            style={{ padding: '20px 22px', cursor: 'pointer' }}
            onClick={() => {
              if (card.id === 'stat-1' || card.id === 'stat-4') onNavigateTab('users');
              if (card.id === 'stat-2' || card.id === 'stat-3') onNavigateTab('posts');
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
              <span style={{ fontSize: '22px' }}>{card.icon}</span>
              <span style={{
                fontSize: '11px',
                fontWeight: 700,
                padding: '3px 8px',
                borderRadius: '9999px',
                backgroundColor: card.badgeType === 'green' ? '#dcfce7' : card.badgeType === 'red' ? '#fee2e2' : '#fef2f2',
                color: card.badgeType === 'green' ? '#16a34a' : 'var(--brand-red)'
              }}>
                {card.badge}
              </span>
            </div>

            <div style={{ fontSize: '28px', fontWeight: 900, color: 'var(--text-dark)', fontFamily: 'var(--font-mono)', lineHeight: '1' }}>
              {card.value}
            </div>

            <div style={{ fontSize: '12.5px', color: 'var(--text-light-gray)', marginTop: '8px' }}>
              {card.title}
            </div>
          </div>
        ))}
      </div>

      {/* Bố cục 2 Cột phía dưới: Hoạt động gần đây + Thao tác nhanh */}
      <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
        
        {/* Cột Trái: Hoạt động gần đây */}
        <div style={{ flex: 1.8 }} className="widget-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-dark)', margin: 0 }}>
              Hoạt động gần đây
            </h3>
            <button
              onClick={() => showToast('Mở toàn bộ nhật ký hệ thống')}
              style={{ fontSize: '12px', fontWeight: 700, color: 'var(--brand-red)', cursor: 'pointer' }}
            >
              Xem nhật ký
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {recentActivities.map((act, index) => (
              <div
                key={act.id}
                onClick={() => {
                  if (act.actionType === 'post') setSelectedPost(sampleReportedPost);
                  else if (act.actionType === 'user') onNavigateTab('users');
                  else showToast(act.title);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 0',
                  borderBottom: index === recentActivities.length - 1 ? 'none' : '1px solid #f3f4f6',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <span style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: act.dotColor,
                    marginTop: '6px',
                    flexShrink: 0
                  }} />
                  <div>
                    <div style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--text-dark)' }}>
                      {act.title}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-light-gray)', marginTop: '2px' }}>
                      {act.detail}
                    </div>
                  </div>
                </div>

                <span style={{ fontSize: '12px', color: 'var(--text-light-gray)', fontWeight: 600, flexShrink: 0 }}>
                  {act.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Cột Phải: Thao tác nhanh */}
        <div style={{ flex: 1.2 }}>
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '14px' }}>
            Thao tác nhanh
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Action 1 */}
            <div
              className="widget-card"
              onClick={() => onNavigateTab('users')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '16px',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <span style={{ fontSize: '20px', color: 'var(--brand-red)' }}>👤</span>
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--text-dark)' }}>
                  Duyệt tài khoản báo cáo
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-light-gray)', marginTop: '2px' }}>
                  3 người dùng bị tố cáo spam
                </div>
              </div>
            </div>

            {/* Action 2 */}
            <div
              className="widget-card"
              onClick={() => setSelectedPost(sampleReportedPost)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '16px',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <span style={{ fontSize: '20px', color: 'var(--brand-red)' }}>📄</span>
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--text-dark)' }}>
                  Xử lý bài viết bị báo cáo
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-light-gray)', marginTop: '2px' }}>
                  7 bài viết đang chờ kiểm duyệt
                </div>
              </div>
            </div>

            {/* Action 3 */}
            <div
              className="widget-card"
              onClick={() => showToast('Mở bảng cấp quyền quản trị viên')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '16px',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <span style={{ fontSize: '20px', color: 'var(--brand-red)', fontWeight: 900 }}>+</span>
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--text-dark)' }}>
                  Thêm quản trị viên
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-light-gray)', marginTop: '2px' }}>
                  Cấp quyền cho thành viên team
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Pop-up Chi Tiết Bài Viết */}
      <PostDetailModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
        onToggleHide={(id) => {
          showToast(`Đã đổi trạng thái bài viết #${id}`);
          setSelectedPost(null);
        }}
        onDeletePost={() => {
          showToast('Đã xóa vĩnh viễn bài viết!', 'error');
          setSelectedPost(null);
        }}
      />
    </div>
  );
};
