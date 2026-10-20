import React, { useState } from 'react';
import { useSocial } from '../context/SocialContext';
import { Logo } from '../components/ui/Logo';

export const FriendsView = () => {
  const { friends, friendRequests, acceptRequest, rejectRequest, unfriend, openFriendProfile } = useSocial();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFriends = (friends || []).filter(f =>
    (f.name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-dark)' }}>Bạn bè</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-gray)', marginTop: '4px' }}>
            Quản lý danh sách bạn bè và kết nối với những người xung quanh
          </p>
        </div>

        <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
          <div className="search-box" style={{ width: '260px' }}>
            <i className="search-icon fa-solid fa-magnifying-glass" style={{ display: 'flex', alignItems: 'center', fontSize: '13px' }}></i>
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

      {friendRequests && friendRequests.length > 0 && (
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '16px' }}>
            Lời mời kết bạn ({friendRequests.length})
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {friendRequests.map(req => (
              <div key={req.id} className="widget-card friend-card-hover" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px' }}>
                <div
                  className="friend-info-clickable" style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}
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
                    <div className="friend-name-text" style={{ fontWeight: 700, fontSize: '13px' }}>{req.name}</div>
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

      <div>
        <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '16px' }}>
          Tất cả bạn bè ({filteredFriends.length})
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {filteredFriends.map(friend => (
            <div key={friend.id} className="widget-card friend-card-hover" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px' }}>
              <div
                className="friend-info-clickable" style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}
                onClick={() => openFriendProfile(friend)}
                title="Bấm để xem trang cá nhân"
              >
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
                <div>
                  <div className="friend-name-text" style={{ fontWeight: 800, fontSize: '14px' }}>{friend.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-light-gray)' }}>{friend.friendSince}</div>
                  {friend.school && (
                    <div style={{ fontSize: '11px', color: 'var(--text-light-gray)', marginTop: '2px' }}>
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
                    whiteSpace: 'nowrap'
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
              <p style={{ fontSize: '13px' }}>Hãy kết nối với bạn bè qua mục Gợi ý kết bạn trên Socialita!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
