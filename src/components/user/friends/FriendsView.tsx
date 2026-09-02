import React, { useState } from 'react';
import { useSocial } from '../../../context/SocialContext';
import { Logo } from '../../ui/Logo';
import type { Friend, FriendRequest } from '../../../types';

export const FriendsView: React.FC = () => {
  const { friends, friendRequests, acceptRequest, rejectRequest, showToast } = useSocial();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFriends = friends.filter((f: Friend) =>
    f.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', width: '100%' }}>
      {/* Header & Thanh Tìm kiếm */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-dark)' }}>Bạn bè</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-gray)', marginTop: '4px' }}>
            Quản lý danh sách bạn bè và kết nối với những người xung quanh
          </p>
        </div>

        <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
          {/* Ô tìm kiếm chuẩn mực */}
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

      {/* Danh sách Tất cả bạn bè */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '16px' }}>
          Tất cả bạn bè ({friends.length})
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {filteredFriends.map((friend: Friend) => (
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
                {friend.name[0]}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-dark)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {friend.name}
                </h4>
                <div style={{ fontSize: '12px', color: 'var(--text-light-gray)', marginTop: '3px' }}>
                  {friend.friendSince} · {friend.mutualFriends} bạn chung
                </div>
              </div>

              <button
                onClick={() => showToast(`Mở chat với ${friend.name}`)}
                style={{
                  padding: '7px 14px',
                  borderRadius: '8px',
                  backgroundColor: '#f3f4f6',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  color: 'var(--text-dark)',
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'background 0.15s ease'
                }}
              >
                Nhắn tin
              </button>
            </div>
          ))}

          {filteredFriends.length === 0 && (
            <div className="widget-card" style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-gray)', padding: '32px' }}>
              Không tìm thấy bạn bè nào khớp với "{searchTerm}".
            </div>
          )}
        </div>
      </div>

      {/* Lời mời kết bạn */}
      {friendRequests.length > 0 && (
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '16px' }}>
            Lời mời kết bạn ({friendRequests.length})
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {friendRequests.map((req: FriendRequest) => (
              <div key={req.id} className="widget-card" style={{ padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                  <div
                    className="avatar-circle"
                    style={{ backgroundColor: req.avatarBg || '#74b9ff', color: '#fff', width: '44px', height: '44px', fontSize: '15px', flexShrink: 0 }}
                  >
                    {req.name[0]}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-dark)', margin: 0 }}>
                      {req.name}
                    </h4>
                    <div style={{ fontSize: '12px', color: 'var(--text-light-gray)', marginTop: '2px' }}>
                      {req.mutualFriends} bạn chung
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => acceptRequest(req.id)}
                    style={{
                      flex: 1,
                      padding: '8px',
                      borderRadius: '8px',
                      backgroundColor: 'var(--brand-red)',
                      color: '#ffffff',
                      fontSize: '12.5px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Đồng ý
                  </button>
                  <button
                    onClick={() => rejectRequest(req.id)}
                    style={{
                      flex: 1,
                      padding: '8px',
                      borderRadius: '8px',
                      backgroundColor: '#f3f4f6',
                      color: 'var(--text-dark)',
                      fontSize: '12.5px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
