import React, { useState } from 'react';
import { useSocial } from '../../context/SocialContext';
import { PostCard } from '../feed/PostCard';

export const FriendProfileModal = () => {
  const {
    selectedFriendProfile,
    friendProfilePosts,
    isLoadingFriendProfile,
    closeFriendProfile,
    openChatWithFriend,
    unfriend
  } = useSocial();

  const [activeTab, setActiveTab] = useState('info'); // 'info' | 'posts'
  const [avatarErr, setAvatarErr] = useState(false);

  if (!selectedFriendProfile) return null;

  const initialLetter = (selectedFriendProfile.name || '?').charAt(0).toUpperCase();

  const handleUnfriend = () => {
    if (window.confirm(`Bạn có chắc chắn muốn hủy kết bạn với ${selectedFriendProfile.name}?`)) {
      unfriend(selectedFriendProfile.id);
      closeFriendProfile();
    }
  };

  const formattedJoinDate = selectedFriendProfile.created_at
    ? new Date(selectedFriendProfile.created_at).toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    : null;

  return (
    <div className="modal-overlay open" onClick={closeFriendProfile}>
      <div
        className="modal-card"
        style={{
          maxWidth: '580px',
          width: '95%',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          padding: 0,
          overflow: 'hidden',
          borderRadius: '16px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div
          className="modal-header"
          style={{
            padding: '12px 18px',
            borderBottom: '1px solid #f1f5f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#ffffff',
            zIndex: 2
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--brand-red)'
              }}
            ></span>
            <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-dark)' }}>
              Trang cá nhân
            </h3>
          </div>
          <button
            className="btn-close-modal"
            onClick={closeFriendProfile}
            style={{
              background: '#f1f5f9',
              border: 'none',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '14px',
              color: '#64748b'
            }}
          >
            ✕
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div
          className="modal-body"
          style={{
            padding: 0,
            overflowY: 'auto',
            background: '#ffffff',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Cover Banner */}
          <div
            style={{
              height: '130px',
              background: 'linear-gradient(135deg, #e52e3d 0%, #ff5263 55%, #fda4af 100%)',
              position: 'relative'
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)',
                backgroundSize: '16px 16px',
                opacity: 0.6
              }}
            ></div>
          </div>

          {/* Profile Header Details (Avatar & Action Buttons) */}
          <div style={{ padding: '0 20px 16px', position: 'relative' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                marginTop: '-48px',
                marginBottom: '12px',
                flexWrap: 'wrap',
                gap: '12px'
              }}
            >
              {/* Avatar */}
              <div style={{ position: 'relative' }}>
                {selectedFriendProfile.avatar_url && !avatarErr ? (
                  <img
                    src={selectedFriendProfile.avatar_url}
                    alt={selectedFriendProfile.name}
                    style={{
                      width: '92px',
                      height: '92px',
                      borderRadius: '50%',
                      border: '4px solid #ffffff',
                      objectFit: 'cover',
                      backgroundColor: '#ffffff',
                      boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
                      display: 'block'
                    }}
                    onError={() => setAvatarErr(true)}
                  />
                ) : (
                  <div
                    style={{
                      width: '92px',
                      height: '92px',
                      borderRadius: '50%',
                      border: '4px solid #ffffff',
                      backgroundColor: selectedFriendProfile.avatarBg || 'var(--brand-red)',
                      color: '#ffffff',
                      fontSize: '34px',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 14px rgba(0,0,0,0.12)'
                    }}
                  >
                    {initialLetter}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button
                  onClick={() => openChatWithFriend(selectedFriendProfile)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '7px',
                    padding: '8px 16px',
                    backgroundColor: 'var(--brand-red)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '13px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(229, 46, 61, 0.28)',
                    transition: 'all 0.15s ease'
                  }}
                  title="Gửi tin nhắn"
                >
                  <i className="fa-solid fa-comment-dots"></i>
                  Nhắn tin
                </button>

                <button
                  onClick={handleUnfriend}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 12px',
                    backgroundColor: '#fff5f5',
                    color: '#ef4444',
                    border: '1px solid #fee2e2',
                    borderRadius: '8px',
                    fontWeight: 600,
                    fontSize: '12.5px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  title="Hủy kết bạn"
                >
                  <i className="fa-solid fa-user-xmark"></i>
                  Hủy bạn
                </button>
              </div>
            </div>

            {/* Name, Username, Friend Badge */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <h2
                  style={{
                    fontSize: '20px',
                    fontWeight: 800,
                    color: 'var(--text-dark)',
                    margin: 0
                  }}
                >
                  {selectedFriendProfile.name}
                </h2>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '11.5px',
                    color: '#059669',
                    backgroundColor: '#d1fae5',
                    padding: '3px 9px',
                    borderRadius: '9999px',
                    fontWeight: 700
                  }}
                >
                  <i className="fa-solid fa-user-check" style={{ fontSize: '10px' }}></i> Bạn bè
                </span>
              </div>

              {selectedFriendProfile.username && (
                <div style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>
                  @{selectedFriendProfile.username}
                </div>
              )}
            </div>

            {/* Bio */}
            {selectedFriendProfile.bio && (
              <div
                style={{
                  marginTop: '10px',
                  fontSize: '13.5px',
                  color: '#334155',
                  lineHeight: '1.5',
                  background: '#f8fafc',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  borderLeft: '3px solid var(--brand-red)'
                }}
              >
                "{selectedFriendProfile.bio}"
              </div>
            )}

            {/* Stats row */}
            <div
              style={{
                display: 'flex',
                gap: '16px',
                marginTop: '14px',
                padding: '10px 16px',
                backgroundColor: '#f8fafc',
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
                alignItems: 'center'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <i className="fa-solid fa-user-group" style={{ color: 'var(--brand-red)', fontSize: '13px' }}></i>
                <span style={{ fontWeight: 800, fontSize: '14px', color: 'var(--text-dark)' }}>
                  {selectedFriendProfile.friend_count ?? selectedFriendProfile.mutualFriends ?? 0}
                </span>
                <span style={{ fontSize: '12.5px', color: '#64748b' }}>Bạn bè</span>
              </div>

              <div style={{ width: '1px', height: '16px', backgroundColor: '#cbd5e1' }}></div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <i className="fa-solid fa-newspaper" style={{ color: '#3b82f6', fontSize: '13px' }}></i>
                <span style={{ fontWeight: 800, fontSize: '14px', color: 'var(--text-dark)' }}>
                  {selectedFriendProfile.post_count ?? friendProfilePosts.length ?? 0}
                </span>
                <span style={{ fontSize: '12.5px', color: '#64748b' }}>Bài viết</span>
              </div>
            </div>

            {/* Nav Tabs */}
            <div
              style={{
                display: 'flex',
                gap: '8px',
                marginTop: '16px',
                borderBottom: '1px solid #e2e8f0',
                paddingBottom: '8px'
              }}
            >
              <button
                onClick={() => setActiveTab('info')}
                style={{
                  padding: '7px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: activeTab === 'info' ? 'var(--brand-red)' : '#f1f5f9',
                  color: activeTab === 'info' ? '#ffffff' : '#475569',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.15s ease'
                }}
              >
                <i className="fa-solid fa-circle-info"></i>
                Giới thiệu
              </button>

              <button
                onClick={() => setActiveTab('posts')}
                style={{
                  padding: '7px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: activeTab === 'posts' ? 'var(--brand-red)' : '#f1f5f9',
                  color: activeTab === 'posts' ? '#ffffff' : '#475569',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.15s ease'
                }}
              >
                <i className="fa-solid fa-signs-post"></i>
                Bài viết ({friendProfilePosts.length})
              </button>
            </div>

            {/* Tab 1: Info */}
            {activeTab === 'info' && (
              <div
                style={{
                  marginTop: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  fontSize: '13px',
                  color: '#334155'
                }}
              >
                {selectedFriendProfile.school && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        backgroundColor: '#ede9fe',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#7c3aed'
                      }}
                    >
                      <i className="fa-solid fa-graduation-cap"></i>
                    </div>
                    <div>
                      <div style={{ fontSize: '11.5px', color: '#64748b' }}>Học vấn</div>
                      <div style={{ fontWeight: 600 }}>{selectedFriendProfile.school}</div>
                    </div>
                  </div>
                )}

                {selectedFriendProfile.liveIn && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        backgroundColor: '#fee2e2',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ef4444'
                      }}
                    >
                      <i className="fa-solid fa-location-dot"></i>
                    </div>
                    <div>
                      <div style={{ fontSize: '11.5px', color: '#64748b' }}>Sống tại</div>
                      <div style={{ fontWeight: 600 }}>{selectedFriendProfile.liveIn}</div>
                    </div>
                  </div>
                )}

                {selectedFriendProfile.friendSince && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        backgroundColor: '#dcfce7',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#16a34a'
                      }}
                    >
                      <i className="fa-solid fa-handshake"></i>
                    </div>
                    <div>
                      <div style={{ fontSize: '11.5px', color: '#64748b' }}>Mối quan hệ</div>
                      <div style={{ fontWeight: 600 }}>{selectedFriendProfile.friendSince}</div>
                    </div>
                  </div>
                )}

                {formattedJoinDate && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        backgroundColor: '#e0f2fe',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#0284c7'
                      }}
                    >
                      <i className="fa-regular fa-calendar-days"></i>
                    </div>
                    <div>
                      <div style={{ fontSize: '11.5px', color: '#64748b' }}>Ngày gia nhập Socialita</div>
                      <div style={{ fontWeight: 600 }}>{formattedJoinDate}</div>
                    </div>
                  </div>
                )}

                {!selectedFriendProfile.school && !selectedFriendProfile.liveIn && (
                  <div style={{ color: '#94a3b8', fontStyle: 'italic', padding: '8px 0' }}>
                    Người dùng này chưa cập nhật thêm thông tin cá nhân.
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Posts */}
            {activeTab === 'posts' && (
              <div style={{ marginTop: '16px' }}>
                {isLoadingFriendProfile ? (
                  <div
                    style={{
                      textAlign: 'center',
                      padding: '30px 0',
                      color: '#64748b',
                      fontSize: '13px'
                    }}
                  >
                    <i className="fa-solid fa-circle-notch fa-spin" style={{ marginRight: '8px', color: 'var(--brand-red)' }}></i>
                    Đang tải bài viết...
                  </div>
                ) : friendProfilePosts && friendProfilePosts.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {friendProfilePosts.map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                ) : (
                  <div
                    style={{
                      textAlign: 'center',
                      padding: '32px 16px',
                      background: '#f8fafc',
                      borderRadius: '12px',
                      color: '#64748b',
                      fontSize: '13px',
                      border: '1px dashed #cbd5e1'
                    }}
                  >
                    <i
                      className="fa-regular fa-newspaper"
                      style={{ fontSize: '28px', color: '#cbd5e1', marginBottom: '8px', display: 'block' }}
                    ></i>
                    <span>Chưa có bài viết nào được chia sẻ công khai.</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
