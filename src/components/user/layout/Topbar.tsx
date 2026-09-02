import React from 'react';
import { useSocial } from '../../../context/SocialContext';

export const Topbar: React.FC = () => {
  const { searchQuery, setSearchQuery, user, setTab, showToast } = useSocial();

  return (
    <header className="topbar">
      {/* Ô tìm kiếm */}
      <div className="search-box">
        <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Tìm bạn bè, hội nhóm, bài viết..."
        />
      </div>

      {/* Các nút hành động bên phải */}
      <div className="topbar-actions">
        {/* Nút Hộp thư */}
        <button className="icon-btn-white" onClick={() => showToast('Mở hộp thư tin nhắn')} title="Tin nhắn">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="red-dot" />
        </button>

        {/* Nút Chuông thông báo */}
        <button className="icon-btn-white" onClick={() => showToast('Bạn có 3 thông báo mới')} title="Thông báo">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="red-dot" />
        </button>

        {/* Avatar người dùng */}
        <div
          className="topbar-avatar"
          onClick={() => setTab('profile')}
          title="Xem trang cá nhân"
          style={{ backgroundColor: user.avatarBg, cursor: 'pointer' }}
        >
          {user.name.split(' ').map(n => n[0]).join('') || 'MA'}
        </div>
      </div>
    </header>
  );
};
