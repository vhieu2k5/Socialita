import React, { useState } from 'react';
import { useSocial } from '../../context/SocialContext';

export const NotificationsDrawer = ({ isOpen, onClose }) => {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead, showToast } = useSocial();
  const [filter, setFilter] = useState('all'); // 'all' | 'unread'

  if (!isOpen) return null;

  const unreadCount = notifications.filter(n => n.unread).length;

  const filtered = notifications.filter(n => {
    if (filter === 'unread') return n.unread;
    return true;
  });

  return (
    <div className="notifications-drawer-card" onClick={(e) => e.stopPropagation()}>
      {/* Header */}
      <div className="notif-header-row">
        <div>
          <h2 className="drawer-title" style={{ marginBottom: '2px' }}>Thông báo</h2>
          {unreadCount > 0 && (
            <span style={{ fontSize: '12px', color: 'var(--brand-red)', fontWeight: 700 }}>
              Bạn có {unreadCount} thông báo mới
            </span>
          )}
        </div>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {unreadCount > 0 && (
            <button
              className="notif-mark-read-btn"
              onClick={markAllNotificationsAsRead}
              title="Đánh dấu tất cả là đã đọc"
            >
              ✓ Đã đọc tất cả
            </button>
          )}
          <button className="drawer-close-btn" onClick={onClose} title="Đóng">✕</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="drawer-filter-tabs" style={{ padding: '8px 16px 12px' }}>
        <button
          className={'drawer-pill ' + (filter === 'all' ? 'active' : '')}
          onClick={() => setFilter('all')}
        >
          Tất cả
        </button>
        <button
          className={'drawer-pill ' + (filter === 'unread' ? 'active' : '')}
          onClick={() => setFilter('unread')}
        >
          Chưa đọc ({unreadCount})
        </button>
      </div>

      {/* Danh sách thông báo */}
      <div className="notifications-scroll-list">
        {filtered.map(item => (
          <div
            key={item.id}
            className={'notification-item ' + (item.unread ? 'unread' : '')}
            onClick={() => markNotificationAsRead(item.id)}
          >
            <div className="notif-avatar-wrapper">
              <img src={item.avatar} alt={item.user} />
              <span className="notif-type-icon" style={{ backgroundColor: item.iconBg || '#e52e3d' }}>
                {item.icon}
              </span>
            </div>

            <div className="notif-content-col">
              <p className="notif-text">
                <strong>{item.user}</strong> {item.content}
              </p>
              <span className="notif-time">{item.time}</span>

              {item.isFriendReq && item.unread && (
                <div className="notif-action-buttons">
                  <button
                    className="btn-notif-accept"
                    onClick={(e) => {
                      e.stopPropagation();
                      markNotificationAsRead(item.id);
                      showToast('Đã chấp nhận lời mời kết bạn từ ' + item.user);
                    }}
                  >
                    Chấp nhận
                  </button>
                  <button
                    className="btn-notif-reject"
                    onClick={(e) => {
                      e.stopPropagation();
                      markNotificationAsRead(item.id);
                      showToast('Đã xóa thông báo lời mời');
                    }}
                  >
                    Xóa
                  </button>
                </div>
              )}
            </div>

            {item.unread && (
              <span className="notif-unread-blue-dot" title="Chưa đọc"></span>
            )}
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="empty-conv-notice">
            Không có thông báo nào.
          </div>
        )}
      </div>
    </div>
  );
};
