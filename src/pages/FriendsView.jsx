import React, { useState } from 'react';
import { useSocial } from '../context/SocialContext';
import { Logo } from '../components/ui/Logo';

export const FriendsView = () => {
  const { friends, friendRequests, acceptRequest, rejectRequest } = useSocial();
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

      {friendRequests && friendRequests.length > 0 && (
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '16px' }}>
            Lời mời kết bạn ({friendRequests.length})
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {friendRequests.map(req => (
              <div key={req.id} className="widget-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div className="avatar-circle-sm" style={{ backgroundColor: req.avatarBg || '#e52e3d', color: '#fff' }}>
                    {req.name?.[0]}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '13px' }}>{req.name}</div>
                    <div style={{ fontSize: '11px', color: '#8e8e93' }}>{req.mutualFriends || 0} bạn chung</div>
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
            <div key={friend.id} className="widget-card" style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 18px' }}>
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
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: '14px' }}>{friend.name}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-light-gray)' }}>{friend.friendSince}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
