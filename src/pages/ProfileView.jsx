import React, { useState, useRef } from 'react';
import { useSocial } from '../context/SocialContext';
import { PostCard } from '../components/feed/PostCard';

export const ProfileView = () => {
  const {
    user,
    viewingProfileUser,
    closeUserProfile,
    posts,
    friends,
    joinedGroups,
    openEditProfileModal,
    openCreatePostModal,
    uploadAvatar,
    unfriend,
    openChat,
    setTab,
    showToast
  } = useSocial();
  const [activeSubTab, setActiveSubTab] = useState('posts');
  const avatarInputRef = useRef(null);

  // If viewingProfileUser is set and different from logged in user, show that user's profile
  const isViewingOther = Boolean(viewingProfileUser && viewingProfileUser.id && String(viewingProfileUser.id) !== String(user?.id));
  const displayUser = isViewingOther ? viewingProfileUser : user;

  const isFriend = isViewingOther && (friends || []).some(f => String(f.id) === String(displayUser.id));

  const displayPosts = (posts || []).filter(p =>
    (p.user_id && displayUser.id && Number(p.user_id) === Number(displayUser.id)) ||
    (p.authorName && displayUser.name && p.authorName.trim() === displayUser.name.trim())
  );

  const handleAvatarFile = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadAvatar(file);
    }
  };

  const handleUnfriendFromProfile = () => {
    if (confirm(`Bạn có chắc chắn muốn huỷ kết bạn với ${displayUser.name}?`)) {
      unfriend(displayUser.id);
    }
  };

  return (
    <div>
      {/* Nút quay lại nếu đang xem trang cá nhân người khác */}
      {isViewingOther && (
        <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            onClick={() => {
              closeUserProfile();
              setTab('friends');
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              background: '#fff',
              color: 'var(--text-dark)',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
            }}
          >
            <span>←</span>
            <span>Quay lại Bạn bè</span>
          </button>
          <span style={{ fontSize: '13px', color: 'var(--text-gray)' }}>
            Đang xem trang cá nhân của <b>{displayUser.name}</b>
          </span>
        </div>
      )}

      {/* 1. THẺ PROFILE LỚN Ở TRÊN CÙNG (CĂN GIỮA TOÀN BỘ) */}
      <div className="profile-card">
        {/* Nút thao tác ở góc trên bên phải */}
        <div className="profile-top-actions">
          {isViewingOther ? (
            <>
              {isFriend ? (
                <button
                  className="btn-profile-action"
                  style={{ borderColor: '#fee2e2', color: '#ef4444', background: '#fff5f5' }}
                  onClick={handleUnfriendFromProfile}
                >
                  <span>✕</span>
                  <span>Huỷ kết bạn</span>
                </button>
              ) : (
                <div style={{ fontSize: '13px', color: 'var(--text-gray)', fontWeight: 600, alignSelf: 'center', marginRight: '8px' }}>
                  {displayUser.mutualFriends ? `${displayUser.mutualFriends} bạn chung` : ''}
                </div>
              )}
              <button
                className="btn-profile-action primary"
                onClick={() => openChat && openChat(displayUser)}
              >
                <span>💬</span>
                <span>Nhắn tin</span>
              </button>
            </>
          ) : (
            <>
              <button className="btn-profile-action" onClick={openEditProfileModal}>
                <span>✏️</span>
                <span>Chỉnh sửa trang cá nhân</span>
              </button>
              <button className="btn-profile-action primary" onClick={openCreatePostModal}>
                <span>↗</span>
                <span>Chia sẻ</span>
              </button>
            </>
          )}
        </div>

        {/* Avatar & Thông tin căn giữa */}
        <div className="profile-center-info">
          <div style={{ position: 'relative' }}>
            <div className="profile-large-avatar" style={{ backgroundColor: displayUser.avatarBg || '#35c9b0' }}>
              {displayUser.avatar_url ? (
                <img src={displayUser.avatar_url} alt={displayUser.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
              ) : (
                displayUser.name?.[0] || 'Avt'
              )}
            </div>
            {!isViewingOther && (
              <>
                <button
                  onClick={() => avatarInputRef.current?.click()}
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '4px',
                    width: '24px',
                    height: '24px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                    cursor: 'pointer'
                  }}
                  title="Đổi ảnh đại diện"
                >
                  +
                </button>
                <input
                  type="file"
                  ref={avatarInputRef}
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleAvatarFile}
                />
              </>
            )}
          </div>

          <h2 className="profile-user-name">{displayUser.name}</h2>
          <p className="profile-user-bio">{displayUser.bio || (isViewingOther ? 'Thành viên cộng đồng Socialita' : 'Chưa cập nhật tiểu sử')}</p>

          {/* 4 Thống kê căn giữa */}
          <div className="profile-stats-grid">
            <div className="profile-stat-box">
              <div className="count">{displayPosts.length}</div>
              <div className="desc">Bài viết</div>
            </div>
            <div className="profile-stat-box">
              <div className="count">
                {isViewingOther
                  ? (displayUser.mutualFriends ? `${displayUser.mutualFriends} chung` : (displayUser.stats?.friends ?? (isFriend ? 1 : 0)))
                  : (friends ? friends.length : (user.stats?.friends ?? 0))}
              </div>
              <div className="desc">Bạn bè</div>
            </div>
            <div className="profile-stat-box">
              <div className="count">{displayUser.stats?.followers ?? 0}</div>
              <div className="desc">Người theo dõi</div>
            </div>
            <div className="profile-stat-box">
              <div className="count">{isViewingOther ? 0 : (joinedGroups ? joinedGroups.length : 0)}</div>
              <div className="desc">Hội nhóm</div>
            </div>
          </div>
        </div>

        {/* Thanh chuyển tab: Bài viết / Ảnh / Video */}
        <div className="profile-tabs-bar">
          <button
            className={'profile-tab-btn ' + (activeSubTab === 'posts' ? 'active' : '')}
            onClick={() => setActiveSubTab('posts')}
          >
            Bài viết
          </button>
          <button
            className={'profile-tab-btn ' + (activeSubTab === 'photos' ? 'active' : '')}
            onClick={() => setActiveSubTab('photos')}
          >
            Ảnh
          </button>
          <button
            className={'profile-tab-btn ' + (activeSubTab === 'videos' ? 'active' : '')}
            onClick={() => setActiveSubTab('videos')}
          >
            Video
          </button>
        </div>
      </div>

      {/* 2. BỐ CỤC 2 CỘT BÊN DƯỚI PROFILE */}
      <div className="two-col-layout">
        {/* CỘT TRÁI: DÒNG BÀI VIẾT */}
        <div className="main-column">
          {activeSubTab === 'posts' && (
            <div id="profile-posts-list">
              {displayPosts.length > 0 ? (
                displayPosts.map(post => <PostCard key={post.id} post={post} />)
              ) : (
                <div className="widget-card" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-gray)' }}>
                  {isViewingOther ? `${displayUser.name} chưa đăng bài viết nào.` : 'Bạn chưa đăng bài viết nào. Hãy chia sẻ khoảnh khắc đầu tiên của bạn!'}
                </div>
              )}
            </div>
          )}

          {activeSubTab === 'photos' && (
            <div className="widget-card">
              <h3 className="widget-card-title">Bộ sưu tập ảnh</h3>
              <div className="photo-grid-6">
                <div className="photo-square" style={{ background: '#3a3b3c' }}></div>
                <div className="photo-square" style={{ background: '#4e4f50' }}></div>
                <div className="photo-square" style={{ background: '#5c4419' }}></div>
                <div className="photo-square" style={{ background: '#274a82' }}></div>
                <div className="photo-square" style={{ background: '#5c2323' }}></div>
                <div className="photo-square" style={{ background: '#1b5b50' }}></div>
              </div>
            </div>
          )}

          {activeSubTab === 'videos' && (
            <div className="widget-card" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-gray)' }}>
              Chưa có video nào được đăng tải.
            </div>
          )}
        </div>

        {/* CỘT PHẢI: LOGO 3D + GIỚI THIỆU + ẢNH */}
        <div className="right-widgets">
          {/* Logo 3D trôi nổi */}
          <div style={{ textAlign: 'center' }}>
            <img
              src="/logo.png"
              alt="Socialita Logo"
              style={{
                width: '84px',
                height: '84px',
                objectFit: 'contain',
                filter: 'drop-shadow(0 8px 16px rgba(229,46,61,0.3))'
              }}
            />
          </div>

          {/* Card Giới thiệu */}
          <div className="widget-card">
            <h3 className="widget-card-title">Giới thiệu</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12.5px', color: 'var(--text-gray)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '16px', color: 'var(--brand-red)' }}>💼</span>
                <span>{displayUser.intro?.school || displayUser.school || 'Chưa cập nhật trường học'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '16px', color: 'var(--brand-red)' }}>📍</span>
                <span>{displayUser.intro?.liveIn || displayUser.liveIn || 'Chưa cập nhật nơi sống'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '16px', color: 'var(--brand-red)' }}>📅</span>
                <span>{displayUser.intro?.joinedDate || (isViewingOther ? 'Thành viên Socialita' : 'Tham gia gần đây')}</span>
              </div>
            </div>
          </div>

          {/* Card Ảnh */}
          <div className="widget-card">
            <h3 className="widget-card-title">Ảnh</h3>
            <div className="photo-grid-6">
              <div className="photo-square" style={{ background: '#3a3b3c' }}></div>
              <div className="photo-square" style={{ background: '#4e4f50' }}></div>
              <div className="photo-square" style={{ background: '#5c4419' }}></div>
              <div className="photo-square" style={{ background: '#274a82' }}></div>
              <div className="photo-square" style={{ background: '#5c2323' }}></div>
              <div className="photo-square" style={{ background: '#1b5b50' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
