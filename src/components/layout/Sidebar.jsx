import React from 'react';
import { useSocial } from '../../context/SocialContext';
import { Logo } from '../ui/Logo';

export const Sidebar = () => {
  const { tab, setTab, openCreatePostModal, friendRequests, showToast, openLogoutModal } = useSocial();

  const navItems = [
    {
      id: 'home',
      label: 'Trang chủ',
      icon: 'fa-solid fa-house'
    },
    {
      id: 'feed',
      label: 'Feed',
      badge: 12,
      icon: 'fa-solid fa-newspaper'
    },
    {
      id: 'profile',
      label: 'Trang cá nhân',
      icon: 'fa-solid fa-user'
    },
    {
      id: 'friends',
      label: 'Bạn bè',
      badge: friendRequests?.length || 0,
      icon: 'fa-solid fa-user-group'
    },
    {
      id: 'groups',
      label: 'Hội nhóm',
      icon: 'fa-solid fa-users'
    }
  ];

  return (
    <aside className="sidebar">
      <div>
        <div className="logo-badge" onClick={() => setTab('home')} title="Trang chủ Socialita">
          <img src="/logo.png" alt="Socialita Logo" style={{ width: '52px', height: '52px', objectFit: 'contain' }} />
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
                {/* ĐOẠN MỚI: */}
                <i className={item.icon} style={{ fontSize: '18px' }}></i>
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
            <i class="fa-solid fa-gear"></i>
            <span>Cài đặt</span>
          </button>

          <button className="sidebar-item" onClick={openLogoutModal}>
            <i class="fa-solid fa-right-from-bracket"></i>
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
