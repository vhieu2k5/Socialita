import React, { useState, useEffect, useRef } from 'react';
import { useSocial } from '../../context/SocialContext';
import { api } from '../../services/api';
import { MessagesDrawer } from '../chat/MessagesDrawer';
import { NotificationsDrawer } from '../notifications/NotificationsDrawer';

export const Topbar = () => {
  const {
    searchQuery,
    setSearchQuery,
    setTab,
    tab,
    user,
    isMessagesOpen,
    isNotificationsOpen,
    toggleMessages,
    toggleNotifications,
    closeDrawers,
    unreadMessagesCount,
    unreadNotificationsCount,
    sendRequest,
    acceptRequest,
    openFriendProfile,
    openUserProfile,
    closeUserProfile
  } = useSocial();

  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchBoxRef = useRef(null);

  // Debounced search người dùng từ Database MySQL
  useEffect(() => {
    const term = (searchQuery || '').trim();
    if (!term) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(async () => {
      try {
        const res = await api.searchUsers(term, user?.id);
        if (res && Array.isArray(res.users)) {
          setSearchResults(res.users);
        } else {
          setSearchResults([]);
        }
      } catch (err) {
        console.warn('Lỗi tìm kiếm người dùng từ Topbar:', err.message);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery, user?.id]);

  // Đóng dropdown khi click ra ngoài hoặc nhấn Esc
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSendRequestInDropdown = async (targetUser) => {
    setSearchResults(prev =>
      prev.map(u => (u.id === targetUser.id ? { ...u, friendship_status: 'requested' } : u))
    );
    await sendRequest(targetUser.id, targetUser.full_name || targetUser.username);
  };

  const handleAcceptInDropdown = async (targetUser) => {
    setSearchResults(prev =>
      prev.map(u => (u.id === targetUser.id ? { ...u, friendship_status: 'friend' } : u))
    );
    await acceptRequest(targetUser.id);
  };

  const handleSelectUser = (u) => {
    setIsDropdownOpen(false);
    openFriendProfile({
      id: u.id,
      name: u.full_name || u.username,
      username: u.username,
      avatar_url: u.avatar_url,
      bio: u.bio,
      school: u.school,
      liveIn: u.liveIn,
      friendSince: u.friendship_status === 'friend' ? 'Bạn bè' : 'Chưa kết bạn'
    });
  };

  return (
    <header className="topbar">
      {/* Ô tìm kiếm chung (Search bar màu đỏ trên Topbar) */}
      <div className="search-box" ref={searchBoxRef} style={{ position: 'relative' }}>
        <i className="fa-solid fa-magnifying-glass search-icon" style={{ fontSize: '14px', display: 'flex', alignItems: 'center' }}></i>
        <input
          type="text"
          className="search-input"
          placeholder="Tìm bạn bè, hội nhóm, bài viết..."
          value={searchQuery || ''}
          onFocus={() => {
            if ((searchQuery || '').trim()) {
              setIsDropdownOpen(true);
            }
          }}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (e.target.value.trim()) {
              setIsDropdownOpen(true);
            } else {
              setIsDropdownOpen(false);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (searchQuery || '').trim()) {
              setTab('friends');
              setIsDropdownOpen(false);
            }
          }}
          style={{ paddingRight: searchQuery ? '30px' : '14px' }}
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setIsDropdownOpen(false);
            }}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: 'var(--text-gray)',
              fontSize: '13px',
              cursor: 'pointer',
              padding: '2px'
            }}
            title="Xóa tìm kiếm"
          >
            ✕
          </button>
        )}

        {/* Dropdown gợi ý tài khoản tìm thấy trực tiếp từ Database */}
        {isDropdownOpen && Boolean((searchQuery || '').trim()) && (
          <div
            className="topbar-search-dropdown"
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              left: 0,
              width: '100%',
              minWidth: '380px',
              maxWidth: '460px',
              background: '#ffffff',
              borderRadius: '14px',
              boxShadow: '0 12px 36px rgba(0, 0, 0, 0.22)',
              border: '1px solid #e5e7eb',
              overflow: 'hidden',
              zIndex: 300
            }}
          >
            <div style={{ padding: '12px 16px 8px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Người dùng ({isSearching ? '...' : searchResults.length})
              </span>
              {isSearching && (
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                  <i className="fa-solid fa-spinner fa-spin"></i> Đang tìm...
                </span>
              )}
            </div>

            <div style={{ maxHeight: '340px', overflowY: 'auto' }}>
              {!isSearching && searchResults.length === 0 ? (
                <div style={{ padding: '28px 16px', textAlign: 'center', color: '#64748b' }}>
                  <i className="fa-solid fa-user-slash" style={{ fontSize: '24px', color: '#cbd5e1', marginBottom: '8px', display: 'block' }}></i>
                  <p style={{ fontSize: '13px', margin: 0, fontWeight: 600 }}>Không tìm thấy tài khoản nào khớp với "{(searchQuery || '').trim()}"</p>
                </div>
              ) : (
                searchResults.slice(0, 6).map(u => {
                  const isFriend = u.friendship_status === 'friend';
                  const isRequested = u.friendship_status === 'requested';
                  const isIncoming = u.friendship_status === 'incoming_request';

                  return (
                    <div
                      key={`topbar-search-${u.id}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 16px',
                        borderBottom: '1px solid #f8fafc',
                        transition: 'background 0.15s ease'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = '#f8fafc'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                    >
                      <div
                        style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0, cursor: 'pointer' }}
                        onClick={() => handleSelectUser(u)}
                        title="Bấm để xem trang cá nhân"
                      >
                        {u.avatar_url && !u.avatar_url.includes('null') && u.avatar_url !== 'default_avatar.jpg' ? (
                          <img
                            src={u.avatar_url.startsWith('http') ? u.avatar_url : `http://localhost:8080/uploads/${u.avatar_url.replace(/^\/?(uploads\/)?/, '')}`}
                            alt={u.full_name || u.username}
                            style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
                            onError={(e) => {
                              e.target.style.display = 'none';
                              if (e.target.nextElementSibling) e.target.nextElementSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div
                          style={{
                            width: '38px',
                            height: '38px',
                            backgroundColor: '#35c9b0',
                            color: '#fff',
                            borderRadius: '50%',
                            flexShrink: 0,
                            display: (u.avatar_url && !u.avatar_url.includes('null') && u.avatar_url !== 'default_avatar.jpg') ? 'none' : 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                            fontSize: '14px'
                          }}
                        >
                          {(u.full_name || u.username || 'U')[0].toUpperCase()}
                        </div>
                        <div style={{ overflow: 'hidden' }}>
                          <div style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {u.full_name || u.username}
                          </div>
                          <div style={{ fontSize: '11px', color: '#64748b' }}>
                            @{u.username}
                          </div>
                        </div>
                      </div>

                      <div style={{ marginLeft: '10px', flexShrink: 0 }}>
                        {isFriend ? (
                          <span style={{ padding: '4px 8px', borderRadius: '6px', backgroundColor: '#e0f2fe', color: '#0369a1', fontSize: '11px', fontWeight: 700 }}>
                            <i className="fa-solid fa-check"></i> Bạn bè
                          </span>
                        ) : isRequested ? (
                          <span style={{ padding: '4px 8px', borderRadius: '6px', backgroundColor: '#f1f5f9', color: '#64748b', fontSize: '11px', fontWeight: 700 }}>
                            Đã gửi
                          </span>
                        ) : isIncoming ? (
                          <button
                            onClick={() => handleAcceptInDropdown(u)}
                            style={{ padding: '5px 10px', borderRadius: '6px', backgroundColor: 'var(--brand-red)', color: '#fff', border: 'none', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
                          >
                            Đồng ý
                          </button>
                        ) : (
                          <button
                            onClick={() => handleSendRequestInDropdown(u)}
                            style={{ padding: '5px 10px', borderRadius: '6px', backgroundColor: 'var(--brand-red)', color: '#fff', border: 'none', fontSize: '11px', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                          >
                            <i className="fa-solid fa-user-plus"></i> Kết bạn
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer xem trên trang Bạn bè */}
            <div
              style={{
                padding: '10px 16px',
                background: '#f8fafc',
                borderTop: '1px solid #e2e8f0',
                textAlign: 'center',
                cursor: 'pointer'
              }}
              onClick={() => {
                setIsDropdownOpen(false);
                setTab('friends');
              }}
            >
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--brand-red)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <i className="fa-solid fa-users"></i> Xem tất cả kết quả trong mục Bạn bè →
              </span>
            </div>
          </div>
        )}
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
          <i className="fa-solid fa-comment"></i>
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
          <i className="fa-solid fa-bell"></i>
          {unreadNotificationsCount > 0 && <span className="red-dot"></span>}
        </button>

        {/* Avatar người dùng */}
        <button
          className="topbar-avatar"
          style={{ backgroundColor: '#38bdf8' }}
          onClick={() => {
            closeDrawers();
            if (typeof closeUserProfile === 'function') closeUserProfile();
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
