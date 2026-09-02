import React from 'react';
import { useSocial } from '../../../context/SocialContext';
import type { NavigationTab } from '../../../types';
import { Logo } from '../../ui/Logo';

export const Sidebar: React.FC = () => {
  const { tab, setTab, openCreatePostModal, friendRequests, showToast, logout } = useSocial();

  const navItems: { id: NavigationTab; label: string; badge?: number; iconPath: string }[] = [
    {
      id: 'home',
      label: 'Trang chủ',
      iconPath: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
    },
    {
      id: 'feed',
      label: 'Feed',
      badge: 12,
      iconPath: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'
    },
    {
      id: 'profile',
      label: 'Trang cá nhân',
      iconPath: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
    },
    {
      id: 'friends',
      label: 'Bạn bè',
      badge: friendRequests.length,
      iconPath: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
    },
    {
      id: 'groups',
      label: 'Hội nhóm',
      iconPath: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
    }
  ];

  return (
    <aside className="sidebar">
      <div>
        <div className="logo-badge" onClick={() => setTab('home')}>
          <Logo size="sm" />
        </div>

        <div className="sidebar-section-title">ĐIỀU HƯỚNG</div>
        <div className="sidebar-menu">
          {navItems.map(item => {
            const isActive = tab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`sidebar-item ${isActive ? 'active' : ''}`}
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.iconPath} />
                </svg>
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="badge-count">{item.badge}</span>
                )}
              </button>
            );
          })}
        </div>

        <div className="sidebar-section-title" style={{ marginTop: '24px' }}>KHÁC</div>
        <div className="sidebar-menu">
          <button className="sidebar-item" onClick={() => showToast('Mở cài đặt tài khoản')}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span>Cài đặt</span>
          </button>

          <button className="sidebar-item" onClick={logout}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>

      <div>
        <button className="btn-create-post" onClick={openCreatePostModal}>
          <span>+</span>
          <span>Tạo bài viết</span>
        </button>
      </div>
    </aside>
  );
};
