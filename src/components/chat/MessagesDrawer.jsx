import React, { useState } from 'react';
import { useSocial } from '../../context/SocialContext';

const ConvAvatar = ({ conv }) => {
  const [imgError, setImgError] = useState(false);
  const initial = (conv.name || '?').charAt(0).toUpperCase();

  return (
    <div className="conv-avatar-col">
      {conv.avatar && !imgError ? (
        <img
          src={conv.avatar}
          alt={conv.name}
          onError={() => setImgError(true)}
        />
      ) : (
        <div
          className="conv-avatar-initial"
          style={{ backgroundColor: conv.avatarBg || '#dc2626' }}
        >
          {initial}
        </div>
      )}
      {conv.isGroup ? (
        <span className="group-badge-icon" title="Nhóm chat">👥</span>
      ) : conv.isIdle ? (
        <span className="idle-badge" title="Tạm vắng"></span>
      ) : (
        <span className="online-badge" title="Đang hoạt động"></span>
      )}
    </div>
  );
};

const ActiveUserAvatar = ({ user, onClick }) => {
  const [imgError, setImgError] = useState(false);
  const initial = (user.name || '?').charAt(0).toUpperCase();

  return (
    <div className="active-user-item" onClick={onClick}>
      <div className="avatar-wrapper-online">
        {user.avatar && !imgError ? (
          <img
            src={user.avatar}
            alt={user.name}
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="conv-avatar-initial"
            style={{ backgroundColor: user.avatarBg || '#dc2626' }}
          >
            {initial}
          </div>
        )}
        <span className="online-badge"></span>
      </div>
      <span className="active-user-name">{user.name}</span>
    </div>
  );
};

export const MessagesDrawer = ({ isOpen, onClose }) => {
  const { conversations, activeUsers, openChat } = useSocial();
  const [search, setSearch] = useState('');
  const [filterTab, setFilterTab] = useState('all'); // 'all' | 'unread' | 'groups'

  if (!isOpen) return null;

  const unreadTotal = conversations.filter(c => (c.unread || 0) > 0).length;

  const filtered = conversations.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      (c.lastMessage && c.lastMessage.toLowerCase().includes(search.toLowerCase()));
    if (!matchesSearch) return false;

    if (filterTab === 'unread') return (c.unread || 0) > 0;
    if (filterTab === 'groups') return Boolean(c.isGroup);
    return true;
  });

  return (
    <div className="messages-drawer-card" onClick={(e) => e.stopPropagation()}>
      {/* 1. Tiêu đề Trò chuyện */}
      <div className="drawer-header-row">
        <h2 className="drawer-title">Trò chuyện</h2>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button className="drawer-close-btn" onClick={onClose} title="Đóng">✕</button>
        </div>
      </div>

      {/* 2. Ô tìm kiếm trong hộp thoại */}
      <div className="drawer-search-wrap">
        <div className="drawer-search-box">
          <svg className="drawer-search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            className="drawer-search-input"
            placeholder="Tìm trong hộp thoại"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* 3. Dải tab chuyển: Tất cả | Chưa đọc • 2 | Nhóm chat */}
      <div className="drawer-filter-tabs">
        <button
          className={'drawer-pill ' + (filterTab === 'all' ? 'active' : '')}
          onClick={() => setFilterTab('all')}
        >
          Tất cả
        </button>
        <button
          className={'drawer-pill ' + (filterTab === 'unread' ? 'active' : '')}
          onClick={() => setFilterTab('unread')}
        >
          Chưa đọc • {unreadTotal}
        </button>
        <button
          className={'drawer-pill ' + (filterTab === 'groups' ? 'active' : '')}
          onClick={() => setFilterTab('groups')}
        >
          Nhóm chat
        </button>
      </div>

      {/* 4. Dải người dùng Đang hoạt động */}
      <div className="active-users-section">
        <div className="active-status-header">
          <span className="active-green-dot"></span>
          <span>• ĐANG HOẠT ĐỘNG • {activeUsers.length}</span>
        </div>
        <div className="active-users-slider">
          {activeUsers.map(user => (
            <ActiveUserAvatar
              key={user.id}
              user={user}
              onClick={() => {
                const existing = conversations.find(c => c.name === user.name);
                if (existing) {
                  openChat(existing);
                } else {
                  openChat({
                    id: 'temp-' + user.id,
                    name: user.name,
                    avatar: user.avatar,
                    isOnline: true,
                    messages: [
                      { id: 1, sender: user.name, text: 'Chào bạn! Mình có thể giúp gì cho bạn?', time: 'Vừa xong', isMe: false }
                    ]
                  });
                }
              }}
            />
          ))}
        </div>
      </div>

      {/* 5. Danh sách cuộc hội thoại */}
      <div className="conversations-scroll-list">
        {filtered.map(conv => {
          const isUnread = (conv.unread || 0) > 0;
          return (
            <div
              key={conv.id}
              className={'conversation-row ' + (isUnread ? 'unread' : '')}
              onClick={() => openChat(conv)}
            >
              {/* Cột Avatar có chấm trạng thái */}
              <ConvAvatar conv={conv} />

              {/* Cột Tên, Tin nhắn & Thời gian */}
              <div className="conv-info-col">
                <div className="conv-top-line">
                  <span className="conv-name">{conv.name}</span>
                  <span className={'conv-time ' + (isUnread ? 'unread-red' : '')}>{conv.time}</span>
                </div>
                <div className="conv-bottom-line">
                  <span className={'conv-last-msg ' + (isUnread ? 'bold-text' : '')}>
                    {conv.lastMessage}
                  </span>
                  {isUnread && (
                    <span className="conv-unread-bubble">{conv.unread}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="empty-conv-notice">
            Không tìm thấy cuộc trò chuyện nào.
          </div>
        )}
      </div>
    </div>
  );
};
