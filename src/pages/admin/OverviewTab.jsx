import React from 'react';
import { useSocial } from '../../context/SocialContext';

export const OverviewTab = ({ onNavigateTab }) => {
  const { showToast } = useSocial();

  // 4 Thẻ thống kê chuẩn mockup media_1791135195488.png
  const statCards = [
    {
      id: 'stat-users',
      title: 'Tổng người dùng',
      value: '1,248',
      pillText: '+3.2%',
      pillType: 'green',
      icon: (
        <svg width="22" height="22" fill="none" stroke="#e52e3d" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      actionTab: 'users'
    },
    {
      id: 'stat-posts',
      title: 'Tổng bài viết',
      value: '4,930',
      pillText: '+18',
      pillType: 'green',
      icon: (
        <svg width="22" height="22" fill="none" stroke="#e52e3d" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      actionTab: 'posts'
    },
    {
      id: 'stat-reports',
      title: 'Báo cáo vi phạm chờ duyệt',
      value: '7',
      pillText: 'Cần xử lý',
      pillType: 'red',
      icon: (
        <svg width="22" height="22" fill="none" stroke="#e52e3d" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      actionTab: 'posts'
    },
    {
      id: 'stat-locked',
      title: 'Tài khoản bị khóa',
      value: '12',
      pillText: 'Đã khóa',
      pillType: 'red-light',
      icon: (
        <svg width="22" height="22" fill="none" stroke="#e52e3d" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      actionTab: 'users'
    }
  ];

  // 5 Hoạt động gần đây chuẩn mockup media_1791135195488.png
  const recentActivities = [
    {
      id: 1,
      dotColor: '#e52e3d',
      title: 'Bài viết bị báo cáo x3',
      sub: '"Cuối tuần này lớp mình..." — bởi Quang Huy',
      time: '08:14',
      action: () => onNavigateTab('posts')
    },
    {
      id: 2,
      dotColor: '#22c55e',
      title: 'Người dùng mới đăng ký',
      sub: 'Bảo Trân (@baotran) vừa tạo tài khoản',
      time: '07:52',
      action: () => onNavigateTab('users')
    },
    {
      id: 3,
      dotColor: '#9ca3af',
      title: '12 bài viết mới trong 1 giờ qua',
      sub: 'Chủ yếu từ hội nhóm Du lịch & Nhiếp ảnh',
      time: '07:10',
      action: () => onNavigateTab('posts')
    },
    {
      id: 4,
      dotColor: '#e52e3d',
      title: 'Tài khoản bị khóa',
      sub: '@fake_account_02 — vi phạm spam',
      time: 'Hôm qua',
      action: () => onNavigateTab('users')
    },
    {
      id: 5,
      dotColor: '#22c55e',
      title: 'Hội nhóm mới được tạo',
      sub: '"Runner Sài Gòn" bởi Hải Đăng',
      time: 'Hôm qua',
      action: () => showToast('Mở thông tin hội nhóm Runner Sài Gòn')
    }
  ];

  return (
    <div>
      {/* 1. Header: Tiêu đề TỔNG QUAN + Chuông + Avatar xanh */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '28px'
      }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 900,
          color: '#18181c',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          margin: 0
        }}>
          TỔNG QUAN
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button
            onClick={() => showToast('Không có thông báo quản trị mới')}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
              cursor: 'pointer'
            }}
            title="Thông báo hệ thống"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#4b5563' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span style={{
              position: 'absolute',
              top: '9px',
              right: '9px',
              width: '7px',
              height: '7px',
              backgroundColor: '#e52e3d',
              borderRadius: '50%'
            }} />
          </button>

          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#38bdf8',
              border: '2px solid rgba(255, 255, 255, 0.9)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}
            title="Admin Avatar"
          />
        </div>
      </div>

      {/* 2. 4 Thẻ Thống Kê Hàng Ngang */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px',
        marginBottom: '32px'
      }}>
        {statCards.map(stat => (
          <div
            key={stat.id}
            onClick={() => onNavigateTab(stat.actionTab)}
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '16px',
              padding: '20px 22px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '14px'
            }}>
              <span style={{ display: 'inline-flex' }}>{stat.icon}</span>
              <span style={{
                fontSize: '11px',
                fontWeight: 700,
                padding: '3px 8px',
                borderRadius: '9999px',
                backgroundColor: stat.pillType === 'green' ? '#dcfce7' : stat.pillType === 'red' ? '#fee2e2' : '#fef2f2',
                color: stat.pillType === 'green' ? '#166534' : '#e52e3d'
              }}>
                {stat.pillText}
              </span>
            </div>
            <div style={{
              fontSize: '28px',
              fontWeight: 900,
              color: '#18181c',
              fontFamily: 'var(--font-mono)',
              lineHeight: 1
            }}>
              {stat.value}
            </div>
            <div style={{
              fontSize: '12.5px',
              color: '#8e8e93',
              marginTop: '8px'
            }}>
              {stat.title}
            </div>
          </div>
        ))}
      </div>

      {/* 3. Bố Cục 2 Cột Phía Dưới */}
      <div style={{
        display: 'flex',
        gap: '24px',
        alignItems: 'flex-start'
      }}>
        {/* Cột Trái (~65%): Hoạt động gần đây */}
        <div style={{
          flex: '1.8',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e5e7eb',
          padding: '22px 24px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '18px'
          }}>
            <h3 style={{
              fontSize: '15px',
              fontWeight: 800,
              color: '#18181c',
              margin: 0
            }}>
              Hoạt động gần đây
            </h3>
            <button
              onClick={() => showToast('Mở toàn bộ nhật ký hệ thống')}
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#e52e3d',
                cursor: 'pointer'
              }}
            >
              Xem nhật ký
            </button>
          </div>

          <div>
            {recentActivities.map((item, idx) => (
              <div
                key={item.id}
                onClick={item.action}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 0',
                  borderBottom: idx === recentActivities.length - 1 ? 'none' : '1px solid #f3f4f6',
                  cursor: 'pointer',
                  transition: 'background 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <span style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: item.dotColor,
                    marginTop: '6px',
                    flexShrink: 0
                  }} />
                  <div>
                    <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#18181c' }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: '12px', color: '#8e8e93', marginTop: '2px' }}>
                      {item.sub}
                    </div>
                  </div>
                </div>

                <span style={{ fontSize: '12px', color: '#8e8e93', fontWeight: 600 }}>
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Cột Phải (~35%): Thao tác nhanh */}
        <div style={{ flex: '1.2' }}>
          <h3 style={{
            fontSize: '15px',
            fontWeight: 800,
            color: '#18181c',
            marginBottom: '14px'
          }}>
            Thao tác nhanh
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Action 1 */}
            <div
              onClick={() => onNavigateTab('users')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '16px',
                cursor: 'pointer',
                borderRadius: '14px',
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                border: '1.5px solid #e52e3d',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#e52e3d',
                flexShrink: 0
              }}>
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#18181c' }}>
                  Duyệt tài khoản báo cáo
                </div>
                <div style={{ fontSize: '11.5px', color: '#8e8e93', marginTop: '2px' }}>
                  3 người dùng bị tố cáo spam
                </div>
              </div>
            </div>

            {/* Action 2 */}
            <div
              onClick={() => onNavigateTab('posts')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '16px',
                cursor: 'pointer',
                borderRadius: '14px',
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                border: '1.5px solid #e52e3d',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#e52e3d',
                flexShrink: 0
              }}>
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#18181c' }}>
                  Xử lý bài viết bị báo cáo
                </div>
                <div style={{ fontSize: '11.5px', color: '#8e8e93', marginTop: '2px' }}>
                  7 bài viết đang chờ kiểm duyệt
                </div>
              </div>
            </div>

            {/* Action 3 */}
            <div
              onClick={() => showToast('Mở bảng cấp quyền quản trị viên')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '16px',
                cursor: 'pointer',
                borderRadius: '14px',
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                border: '1.5px solid #e52e3d',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#e52e3d',
                flexShrink: 0,
                fontSize: '20px',
                fontWeight: 900
              }}>
                +
              </div>
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#18181c' }}>
                  Thêm quản trị viên
                </div>
                <div style={{ fontSize: '11.5px', color: '#8e8e93', marginTop: '2px' }}>
                  Cấp quyền cho thành viên team
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
