import React from 'react';
import { useSocial } from '../../context/SocialContext';
import { MessagesDrawer } from '../chat/MessagesDrawer';
import { NotificationsDrawer } from '../notifications/NotificationsDrawer';

export const Topbar = () => {
  const {
    searchQuery,
    setSearchQuery,
    setTab,
    user,
    isMessagesOpen,
    isNotificationsOpen,
    toggleMessages,
    toggleNotifications,
    closeDrawers,
    unreadMessagesCount,
    unreadNotificationsCount
  } = useSocial();

  return (
    <header className="topbar">
      {/* Ô tìm kiếm chung */}
      <div className="search-box">
        <i className="fa-solid fa-magnifying-glass search-icon" style={{ fontSize: '14px', display: 'flex', alignItems: 'center' }}></i>
        <input
          type="text"
          className="search-input"
          placeholder="Tìm bạn bè, hội nhóm, bài viết..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Các nút hành động bên phải */}
      <div className="topbar-actions" style={{ position: 'relative' }} onClick={(e) => e.stopPropagation()}>
        {/* Nút Tin nhắn */}
        <button
          className={'icon-btn-white ' + (isMessagesOpen ? 'active' : '')}
          onClick={(e) => {
            e.stopPropagation();
            toggleMessages();
          }}
          title="Tin nhắn"
        >
          <i class="fa-solid fa-comment"></i>
          {unreadMessagesCount > 0 && <span className="red-dot"></span>}
        </button>

        {/* Nút Thông báo */}
        <button
          className={'icon-btn-white ' + (isNotificationsOpen ? 'active' : '')}
          onClick={(e) => {
            e.stopPropagation();
            toggleNotifications();
          }}
          title="Thông báo"
        >
          <i class="fa-solid fa-bell"></i>
          {unreadNotificationsCount > 0 && <span className="red-dot"></span>}
        </button>

        {/* Avatar người dùng */}
        <button
          className="topbar-avatar"
          style={{ backgroundColor: '#38bdf8' }}
          onClick={() => {
            closeDrawers();
            setTab('profile');
          }}
          title="Trang cá nhân"
        >
          {user.avatar_url ? (
            <img src={user.avatar_url} alt="Avt" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
          ) : (
            'Avt'
          )}
        </button>

        {/* 1. Modal / Flyout Tin nhắn chuẩn mockup */}
        <MessagesDrawer isOpen={isMessagesOpen} onClose={closeDrawers} />

        {/* 2. Modal / Flyout Thông báo chuẩn Facebook Web */}
        <NotificationsDrawer isOpen={isNotificationsOpen} onClose={closeDrawers} />
      </div>
    </header>
  );
};
