import React, { useState, useEffect } from 'react';
import { useSocial } from '../context/SocialContext';
import { api } from '../services/api';
import { Logo } from '../components/ui/Logo';

// Helper chuẩn hóa đường dẫn avatar từ Backend MySQL hoặc URL ngoài
const resolveAvatarUrl = (url) => {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();
  if (!trimmed || trimmed === 'default_avatar.jpg' || trimmed === 'null' || trimmed === 'undefined') {
    return '';
  }
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('data:') || trimmed.startsWith('blob:')) {
    return trimmed;
  }
  const cleanPath = trimmed.replace(/^\/?(uploads\/)?/, '');
  return `http://localhost:8080/uploads/${cleanPath}`;
};

// Component Avatar thông minh: tự động fallback chữ cái đầu khi ảnh lỗi hoặc không có ảnh
const UserAvatar = ({ url, name, bg, size = 44 }) => {
  const [imgError, setImgError] = useState(false);
  const resolved = resolveAvatarUrl(url);

  if (resolved && !imgError) {
    return (
      <img
        src={resolved}
        alt={name || 'Avatar'}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          objectFit: 'cover',
          flexShrink: 0
        }}
        onError={() => setImgError(true)}
      />
    );
  }

  const initial = (name || 'U').charAt(0).toUpperCase();
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: bg || '#35c9b0',
        color: '#ffffff',
        borderRadius: '50%',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 800,
        fontSize: size >= 44 ? '16px' : '13px'
      }}
    >
      {initial}
    </div>
  );
};

export const FriendsView = () => {
  const {
    user,
    friends,
    friendRequests,
    friendSuggestions,
    acceptRequest,
    rejectRequest,
    sendRequest,
    unfriend,
    openFriendProfile,
    searchQuery,
    setSearchQuery
  } = useSocial();

  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Tìm kiếm người dùng trực tiếp từ Database MySQL khi nhập từ khóa
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
        console.warn('Lỗi tìm kiếm người dùng từ server:', err.message);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 280);

    return () => clearTimeout(timer);
  }, [searchQuery, user?.id]);

  const handleSendRequestInSearch = async (targetUser) => {
    // Cập nhật giao diện tức thì
    setSearchResults(prev =>
      prev.map(u => (u.id === targetUser.id ? { ...u, friendship_status: 'requested' } : u))
    );
    await sendRequest(targetUser.id, targetUser.full_name || targetUser.username);
  };

  const isSearchActive = Boolean((searchQuery || '').trim());
  const activeTerm = (searchQuery || '').trim();

  // Lọc trong danh sách bạn bè đã kết bạn
  const filteredFriends = (friends || []).filter(f => {
    const nameMatch = (f.name || '').toLowerCase().includes(activeTerm.toLowerCase());
    const usernameMatch = (f.username || '').toLowerCase().includes(activeTerm.toLowerCase());
    return nameMatch || usernameMatch;
  });

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', width: '100%', paddingBottom: '40px' }}>
      {/* 1. Tiêu đề trang & Logo */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-dark)' }}>Bạn bè</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-gray)', marginTop: '4px' }}>
            Quản lý danh sách bạn bè và tìm kiếm tài khoản để kết nối
          </p>
        </div>

        <div>
          <Logo size="sm" />
        </div>
      </div>

      {/* 2. CHẾ ĐỘ TÌM KIẾM: HIỂN THỊ KẾT QUẢ TỪ DATABASE */}
      {isSearchActive && (
        <div style={{ marginBottom: '36px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-dark)' }}>
                Kết quả tìm kiếm cho "{activeTerm}" ({isSearching ? '...' : searchResults.length})
              </h3>
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  background: '#f1f5f9',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  padding: '4px 10px',
                  fontSize: '12px',
                  color: '#64748b',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
                title="Quay lại danh sách bạn bè"
              >
                ✕ Xóa tìm kiếm
              </button>
            </div>
            {isSearching && (
              <span style={{ fontSize: '12px', color: 'var(--text-light-gray)' }}>
                <i className="fa-solid fa-spinner fa-spin"></i> Đang tìm kiếm...
              </span>
            )}
          </div>

          {!isSearching && searchResults.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', background: '#fff', borderRadius: '12px', border: '1px dashed #e2e8f0' }}>
              <i className="fa-solid fa-user-slash" style={{ fontSize: '32px', color: '#cbd5e1', marginBottom: '12px', display: 'block' }}></i>
              <p style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '6px' }}>
                Không tìm thấy tài khoản nào phù hợp
              </p>
              <p style={{ fontSize: '13px', color: 'var(--text-gray)' }}>
                Không có người dùng nào khớp với từ khóa "{activeTerm}". Hãy thử tìm bằng tên chính xác hoặc tên đăng nhập.
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
              {searchResults.map(u => {
                const isFriend = u.friendship_status === 'friend';
                const isRequested = u.friendship_status === 'requested';
                const isIncoming = u.friendship_status === 'incoming_request';

                return (
                  <div
                    key={`search-${u.id}`}
                    className="widget-card friend-card-hover"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px' }}
                  >
                    <div
                      className="friend-info-clickable"
                      style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0, cursor: 'pointer' }}
                      onClick={() => openFriendProfile({
                        id: u.id,
                        name: u.full_name || u.username,
                        username: u.username,
                        avatar_url: u.avatar_url,
                        bio: u.bio,
                        school: u.school,
                        liveIn: u.liveIn,
                        friendSince: isFriend ? 'Bạn bè' : 'Chưa kết bạn'
                      })}
                      title="Bấm để xem trang cá nhân"
                    >
                      <UserAvatar
                        url={u.avatar_url}
                        name={u.full_name || u.username}
                        bg="#35c9b0"
                        size={44}
                      />

                      <div style={{ overflow: 'hidden' }}>
                        <div className="friend-name-text" style={{ fontWeight: 800, fontSize: '13.5px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                          {u.full_name || u.username}
                        </div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>
                          @{u.username}
                        </div>
                        {u.school && (
                          <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                            <i className="fa-solid fa-graduation-cap"></i> {u.school}
                          </div>
                        )}
                      </div>
                    </div>

                    <div style={{ flexShrink: 0, marginLeft: '10px' }}>
                      {isFriend ? (
                        <span style={{ padding: '6px 12px', borderRadius: '8px', backgroundColor: '#e0f2fe', color: '#0369a1', fontSize: '12px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <i className="fa-solid fa-check"></i> Bạn bè
                        </span>
                      ) : isRequested ? (
                        <button
                          disabled
                          style={{ padding: '6px 12px', borderRadius: '8px', backgroundColor: '#f1f5f9', color: '#64748b', border: '1px solid #cbd5e1', fontSize: '12px', fontWeight: 700, cursor: 'not-allowed' }}
                        >
                          Đã gửi lời mời
                        </button>
                      ) : isIncoming ? (
                        <button
                          onClick={() => acceptRequest(u.id)}
                          style={{ padding: '6px 12px', borderRadius: '8px', backgroundColor: 'var(--brand-red)', color: '#fff', border: 'none', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
                        >
                          Đồng ý
                        </button>
                      ) : (
                        <button
                          onClick={() => handleSendRequestInSearch(u)}
                          style={{ padding: '6px 14px', borderRadius: '8px', backgroundColor: 'var(--brand-red)', color: '#fff', border: 'none', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
                        >
                          <i className="fa-solid fa-user-plus"></i> Kết bạn
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 3. LỜI MỜI KẾT BẠN (PENDING REQUESTS) */}
      {!isSearchActive && friendRequests && friendRequests.length > 0 && (
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '16px' }}>
            Lời mời kết bạn ({friendRequests.length})
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {friendRequests.map(req => (
              <div key={req.id} className="widget-card friend-card-hover" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px' }}>
                <div
                  className="friend-info-clickable" style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0, cursor: 'pointer' }}
                  onClick={() => openFriendProfile({
                    id: req.requester_id || req.id,
                    name: req.name,
                    avatar_url: req.avatar_url,
                    avatarBg: req.avatarBg,
                    mutualFriends: req.mutualFriends,
                    friendSince: 'Lời mời kết bạn'
                  })}
                  title="Bấm để xem trang cá nhân"
                >
                  <UserAvatar
                    url={req.avatar_url}
                    name={req.name}
                    bg={req.avatarBg || '#e52e3d'}
                    size={40}
                  />
                  <div style={{ overflow: 'hidden' }}>
                    <div className="friend-name-text" style={{ fontWeight: 700, fontSize: '13px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{req.name}</div>
                    <div style={{ fontSize: '11px', color: '#8e8e93' }}>
                      {req.mutualFriends ? `${req.mutualFriends} bạn chung` : (req.time || 'Lời mời kết bạn')}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                  <button onClick={() => acceptRequest(req.id)} style={{ padding: '6px 12px', borderRadius: '6px', backgroundColor: 'var(--brand-red)', color: '#fff', border: 'none', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}>
                    Đồng ý
                  </button>
                  <button onClick={() => rejectRequest(req.id)} style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #e5e7eb', background: '#fff', fontSize: '12px', cursor: 'pointer' }}>
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. DANH SÁCH TẤT CẢ BẠN BÈ */}
      {!isSearchActive && (
        <div style={{ marginBottom: '36px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '16px' }}>
            Tất cả bạn bè ({filteredFriends.length})
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {filteredFriends.map(friend => (
              <div key={friend.id} className="widget-card friend-card-hover" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px' }}>
                <div
                  className="friend-info-clickable" style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: 0, cursor: 'pointer' }}
                  onClick={() => openFriendProfile(friend)}
                  title="Bấm để xem trang cá nhân"
                >
                  <UserAvatar
                    url={friend.avatar_url}
                    name={friend.name}
                    bg={friend.avatarBg || 'var(--brand-red)'}
                    size={46}
                  />
                  <div style={{ overflow: 'hidden' }}>
                    <div className="friend-name-text" style={{ fontWeight: 800, fontSize: '14px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{friend.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-light-gray)' }}>{friend.friendSince}</div>
                    {friend.school && (
                      <div style={{ fontSize: '11px', color: 'var(--text-light-gray)', marginTop: '2px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                        <i className="fa-solid fa-graduation-cap"></i> {friend.school}
                      </div>
                    )}
                  </div>
                </div>

                {unfriend && (
                  <button
                    onClick={() => unfriend(friend.id)}
                    style={{
                      padding: '6px 10px',
                      borderRadius: '8px',
                      border: '1px solid #fee2e2',
                      background: '#fff5f5',
                      color: '#ef4444',
                      fontSize: '11px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      flexShrink: 0
                    }}
                    title="Hủy kết bạn"
                  >
                    Hủy kết bạn
                  </button>
                )}
              </div>
            ))}

            {filteredFriends.length === 0 && (
              <div style={{ gridColumn: '1 / -1', padding: '36px', textAlign: 'center', color: 'var(--text-light-gray)', background: '#fff', borderRadius: '12px', border: '1px dashed #e5e7eb' }}>
                <p style={{ fontSize: '15px', fontWeight: 600, marginBottom: '6px', color: 'var(--text-dark)' }}>Chưa có bạn bè nào</p>
                <p style={{ fontSize: '13px' }}>Hãy tìm kiếm tài khoản ở thanh tìm kiếm phía trên hoặc kết nối từ danh sách Gợi ý bên dưới!</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 5. GỢI Ý KẾT BẠN (FRIEND SUGGESTIONS) */}
      {!isSearchActive && friendSuggestions && friendSuggestions.length > 0 && (
        <div style={{ marginTop: '36px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '16px' }}>
            Gợi ý kết bạn dành cho bạn
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {friendSuggestions.map(s => (
              <div key={s.id} className="widget-card friend-card-hover" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px' }}>
                <div
                  className="friend-info-clickable"
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0, cursor: 'pointer' }}
                  onClick={() => openFriendProfile({
                    id: s.id,
                    name: s.name,
                    username: s.username,
                    avatar_url: s.avatar_url,
                    avatarBg: s.avatarBg,
                    bio: s.bio,
                    school: s.school,
                    liveIn: s.liveIn,
                    friendSince: 'Gợi ý kết bạn'
                  })}
                  title="Bấm để xem trang cá nhân"
                >
                  <UserAvatar
                    url={s.avatar_url}
                    name={s.name}
                    bg={s.avatarBg || '#4c8dff'}
                    size={42}
                  />
                  <div style={{ overflow: 'hidden' }}>
                    <div className="friend-name-text" style={{ fontWeight: 800, fontSize: '13.5px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{s.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-light-gray)' }}>
                      {s.mutualFriends ? `${s.mutualFriends} bạn chung` : (s.username ? `@${s.username}` : 'Gợi ý cho bạn')}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => sendRequest(s.id, s.name)}
                  disabled={s.requested}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '8px',
                    backgroundColor: s.requested ? '#f1f5f9' : 'var(--brand-red)',
                    color: s.requested ? '#64748b' : '#fff',
                    border: s.requested ? '1px solid #cbd5e1' : 'none',
                    fontWeight: 700,
                    fontSize: '12px',
                    cursor: s.requested ? 'not-allowed' : 'pointer',
                    flexShrink: 0
                  }}
                >
                  {s.requested ? 'Đã gửi' : 'Kết bạn'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
