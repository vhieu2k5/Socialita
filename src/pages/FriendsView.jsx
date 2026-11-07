import React, { useState } from 'react';
import { useSocial } from '../context/SocialContext';
import { Logo } from '../components/ui/Logo';
import { ConfirmModal } from '../components/ui/ConfirmModal';

export const FriendsView = () => {
  const {
    friends,
    setFriends,
    friendRequests,
    friendSuggestions,
    acceptRequest,
    rejectRequest,
    sendRequest,
    unfriend,
    openUserProfile,
    showToast
  } = useSocial();
  const [searchTerm, setSearchTerm] = useState('');

  // Unfriend flow state (2-step modal from Figma)
  const [unfriendTarget, setUnfriendTarget] = useState(null);   // step 1: info popup
  const [confirmTarget, setConfirmTarget] = useState(null);     // step 2: confirm popup

  const filteredFriends = (friends || []).filter(f =>
    (f.name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Left click on friend card -> open profile page
  const handleFriendClick = (friend) => {
    if (typeof openUserProfile === 'function') {
      openUserProfile(friend);
    }
  };

  // Right click on friend card -> trigger unfriend flow
  const handleFriendContextMenu = (e, friend) => {
    e.preventDefault();
    setUnfriendTarget(friend);
  };

  const handleUnfriendClick = (friend) => {
    setUnfriendTarget(friend);
  };

  const handleProceedToConfirm = () => {
    setConfirmTarget(unfriendTarget);
    setUnfriendTarget(null);
  };

  const handleConfirmUnfriend = () => {
    if (!confirmTarget) return;
    if (typeof unfriend === 'function') {
      unfriend(confirmTarget.id);
    } else {
      setFriends(prev => prev.filter(f => f.id !== confirmTarget.id));
      showToast(`Đã huỷ kết bạn với @${confirmTarget.name}`, 'info');
    }
    setConfirmTarget(null);
  };

  // Filter friend suggestions: strictly friends of friends (must have mutualFriends > 0)
  // and not already in friends or requests
  const friendIds = new Set((friends || []).map(f => String(f.id)));
  const requestIds = new Set((friendRequests || []).map(r => String(r.id || r.requester_id)));

  const validSuggestions = (friendSuggestions || []).filter(s => {
    const sId = String(s.id);
    if (friendIds.has(sId) || requestIds.has(sId)) return false;
    // Suggest users who are friends with existing friends (friends of friends)
    return (s.mutualFriends !== undefined && s.mutualFriends !== null) ? Number(s.mutualFriends) > 0 : false;
  });

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', width: '100%' }}>
      {/* ── HEADER ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-dark)' }}>Bạn bè</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-gray)', marginTop: '4px' }}>
            Quản lý danh sách bạn bè và kết nối với những người xung quanh
          </p>
        </div>
        <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
          <div className="search-box" style={{ width: '260px' }}>
            <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm bạn bè..."
            />
          </div>
          <Logo size="sm" />
        </div>
      </div>

      {/* ── 1. LỜI MỜI KẾT BẠN (FRIEND REQUESTS) ── */}
      {friendRequests && friendRequests.length > 0 && (
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '16px' }}>
            Lời mời kết bạn ({friendRequests.length})
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {friendRequests.map(req => (
              <div key={req.id} className="widget-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px' }}>
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                  onClick={() => openUserProfile && openUserProfile(req)}
                >
                  {req.avatar_url ? (
                    <img
                      src={req.avatar_url}
                      alt={req.name}
                      style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }}
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  ) : (
                    <div className="avatar-circle-sm" style={{ backgroundColor: req.avatarBg || '#e52e3d', color: '#fff' }}>
                      {req.name?.[0]}
                    </div>
                  )}
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '13px' }}>{req.name}</div>
                    <div style={{ fontSize: '11px', color: '#8e8e93' }}>
                      {req.mutualFriends ? `${req.mutualFriends} bạn chung` : (req.time || 'Lời mời kết bạn')}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
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

      {/* ── 2. GỢI Ý KẾT BẠN (FRIEND SUGGESTIONS - FRIENDS OF FRIENDS) ── */}
      {/* If there are no valid friend suggestions, this section is completely hidden */}
      {validSuggestions.length > 0 && (
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-dark)', margin: 0 }}>
              Gợi ý kết bạn ({validSuggestions.length})
            </h3>
            <span style={{ fontSize: '12px', color: 'var(--text-light-gray)' }}>
              Những người bạn của bạn bè có thể bạn biết
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {validSuggestions.map(sug => (
              <div
                key={sug.id}
                className="widget-card friend-card"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', position: 'relative' }}
              >
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', flex: 1, minWidth: 0 }}
                  onClick={() => openUserProfile && openUserProfile(sug)}
                  title="Nhấp để xem trang cá nhân"
                >
                  {sug.avatar_url ? (
                    <img
                      src={sug.avatar_url}
                      alt={sug.name}
                      style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  ) : (
                    <div
                      className="avatar-circle"
                      style={{
                        backgroundColor: sug.avatarBg || '#4c8dff',
                        color: '#fff',
                        width: '44px',
                        height: '44px',
                        fontSize: '15px',
                        flexShrink: 0
                      }}
                    >
                      {sug.name?.[0]}
                    </div>
                  )}
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 800, fontSize: '13.5px', color: 'var(--text-dark)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {sug.name}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--brand-red)', fontWeight: 600, marginTop: '2px' }}>
                      👥 {sug.mutualFriends} bạn chung
                    </div>
                    {sug.school && (
                      <div style={{ fontSize: '11px', color: 'var(--text-light-gray)', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        🎓 {sug.school}
                      </div>
                    )}
                  </div>
                </div>

                <button
                  className="btn-add-friend"
                  disabled={sug.requested}
                  onClick={(e) => {
                    e.stopPropagation();
                    sendRequest(sug.id);
                  }}
                  style={{ marginLeft: '10px', flexShrink: 0 }}
                >
                  {sug.requested ? 'Đã gửi lời mời' : 'Thêm bạn bè'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 3. TẤT CẢ BẠN BÈ (ALL FRIENDS) ── */}
      <div>
        <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '16px' }}>
          Tất cả bạn bè ({filteredFriends.length})
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {filteredFriends.map(friend => (
            <div
              key={friend.id}
              className="widget-card friend-card"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 18px',
                cursor: 'pointer',
                position: 'relative'
              }}
              onClick={() => handleFriendClick(friend)}
              onContextMenu={(e) => handleFriendContextMenu(e, friend)}
              title="Chuột trái: Xem trang cá nhân | Chuột phải: Hủy kết bạn"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ position: 'relative' }}>
                  {friend.avatar_url ? (
                    <img
                      src={friend.avatar_url}
                      alt={friend.name}
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        flexShrink: 0
                      }}
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  ) : (
                    <div
                      className="avatar-circle"
                      style={{
                        backgroundColor: friend.avatarBg || 'var(--brand-red)',
                        color: '#fff',
                        width: '46px',
                        height: '46px',
                        fontSize: '16px',
                        flexShrink: 0
                      }}
                    >
                      {friend.name?.[0]}
                    </div>
                  )}
                  {/* Online status indicator */}
                  {friend.isOnline && <span className="online-badge" style={{ border: '2px solid #fff' }} />}
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '14px' }}>{friend.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-light-gray)' }}>
                    {friend.mutualFriends ? `${friend.mutualFriends} bạn chung` : (friend.friendSince || 'Bạn bè')}
                  </div>
                  {friend.school && (
                    <div style={{ fontSize: '11px', color: 'var(--text-light-gray)', marginTop: '2px' }}>
                      🎓 {friend.school}
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleUnfriendClick(friend);
                }}
                style={{
                  padding: '6px 12px',
                  borderRadius: '8px',
                  border: '1px solid #fee2e2',
                  background: '#fff5f5',
                  color: '#ef4444',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
                title="Hủy kết bạn"
              >
                Hủy kết bạn
              </button>
            </div>
          ))}

          {filteredFriends.length === 0 && (
            <div style={{ gridColumn: '1 / -1', padding: '36px', textAlign: 'center', color: 'var(--text-light-gray)', background: '#fff', borderRadius: '12px', border: '1px dashed #e5e7eb' }}>
              <p style={{ fontSize: '15px', fontWeight: 600, marginBottom: '6px', color: 'var(--text-dark)' }}>Chưa có bạn bè nào</p>
              <p style={{ fontSize: '13px' }}>Hãy kết nối với bạn bè qua mục Gợi ý kết bạn trên Socialita!</p>
            </div>
          )}
        </div>
      </div>

      {/* Step 1: Info popup */}
      {unfriendTarget && (
        <div className="confirm-overlay" onClick={() => setUnfriendTarget(null)}>
          <div className="confirm-modal" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '20px' }}>
              <div className="avatar-circle" style={{ backgroundColor: '#e52e3d', color: '#fff', width: '48px', height: '48px', fontSize: '18px', flexShrink: 0 }}>
                {(unfriendTarget.name || '?')[0]}
              </div>
              <span style={{ fontSize: '24px', color: '#9ca3af' }}>✕</span>
              <div className="avatar-circle" style={{ backgroundColor: '#35c9b0', color: '#fff', width: '48px', height: '48px', fontSize: '18px', flexShrink: 0 }}>
                Bạn
              </div>
            </div>
            <h3 className="confirm-title">Huỷ kết bạn với {unfriendTarget.name}?</h3>
            <p className="confirm-body">
              {unfriendTarget.name} sẽ bị xoá khỏi danh sách bạn bè của bạn. Bạn có thể gửi lại lời mời kết bạn bất cứ lúc nào.
            </p>
            <div className="confirm-actions">
              <button className="confirm-btn-cancel" onClick={() => setUnfriendTarget(null)}>Để sau</button>
              <button className="confirm-btn-ok danger" onClick={handleProceedToConfirm}>Huỷ kết bạn</button>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Confirm popup */}
      <ConfirmModal
        isOpen={!!confirmTarget}
        icon={<span style={{ fontSize: '36px' }}>⚠️</span>}
        title="Bạn chắc chắn chứ?"
        body="Sau khi huỷ, hai bạn sẽ không còn thấy bài viết chế độ 'Bạn bè' của nhau."
        confirmLabel="Chắc chắn huỷ"
        confirmDanger
        onConfirm={handleConfirmUnfriend}
        onCancel={() => setConfirmTarget(null)}
      >
        {confirmTarget && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f9fafb', borderRadius: '10px', padding: '10px 14px', margin: '12px 0' }}>
            <div className="avatar-circle-sm" style={{ backgroundColor: confirmTarget.avatarBg || '#e52e3d', color: '#fff', flexShrink: 0 }}>
              {(confirmTarget.name || '?')[0]}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '13px' }}>{confirmTarget.name}</div>
              <div style={{ fontSize: '11px', color: '#8e8e93' }}>{confirmTarget.mutualFriends ? `${confirmTarget.mutualFriends} bạn chung` : ''}</div>
            </div>
          </div>
        )}
      </ConfirmModal>
    </div>
  );
};

export default FriendsView;
