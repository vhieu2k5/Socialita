import React from 'react';
import { useSocial } from '../../context/SocialContext';

export const Topbar = () => {
  const { searchQuery, setSearchQuery, setTab, showToast, user } = useSocial();

  return (
    <header className="topbar">
      <div className="search-box">
        <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          className="search-input"
          placeholder="Tìm bạn bè, hội nhóm, bài viết..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="topbar-actions">
        <button className="icon-btn-white" onClick={() => showToast('Mở hộp thư tin nhắn')} title="Tin nhắn">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="red-dot"></span>
        </button>

        <button className="icon-btn-white" onClick={() => showToast('Bạn có thông báo mới!')} title="Thông báo">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="red-dot"></span>
        </button>

        <button
          className="topbar-avatar"
          style={{ backgroundColor: '#38bdf8' }}
          onClick={() => setTab('profile')}
          title="Trang cá nhân"
        >
          {user.avatar_url ? (
            <img src={user.avatar_url} alt="Avt" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
          ) : (
            'Avt'
          )}
        </button>
      </div>
    </header>
  );
};
