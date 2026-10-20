import React, { useState, useRef } from 'react';
import { useSocial } from '../context/SocialContext';
import { PostCard } from '../components/feed/PostCard';

export const ProfileView = () => {
  const { user, posts, friends, joinedGroups, openEditProfileModal, openCreatePostModal, uploadAvatar, showToast } = useSocial();
  const [activeSubTab, setActiveSubTab] = useState('posts');
  const avatarInputRef = useRef(null);

  const myPosts = posts.filter(p =>
    (p.user_id && user.id && Number(p.user_id) === Number(user.id)) ||
    (p.authorName && user.name && p.authorName.trim() === user.name.trim())
  );

  const handleAvatarFile = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadAvatar(file);
    }
  };

  return (
    <div>
      {/* 1. THẺ PROFILE LỚN Ở TRÊN CÙNG (CĂN GIỮA TOÀN BỘ) */}
      <div className="profile-card">
        {/* Nút chỉnh sửa & chia sẻ ở góc trên bên phải */}
        <div className="profile-top-actions">
          <button className="btn-profile-action" onClick={openEditProfileModal}>
            <i className="fa-solid fa-pen-to-square"></i>
            <span>Chỉnh sửa trang cá nhân</span>
          </button>
          <button className="btn-profile-action primary" onClick={openCreatePostModal}>
            <i className="fa-solid fa-share-from-square"></i>
            <span>Chia sẻ</span>
          </button>
        </div>

        {/* Avatar & Thông tin căn giữa */}
        <div className="profile-center-info">
          <div style={{ position: 'relative' }}>
            <div className="profile-large-avatar" style={{ backgroundColor: '#35c9b0' }}>
              {user.avatar_url ? (
                <img src={user.avatar_url} alt="Avt" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
              ) : (
                'Avt'
              )}
            </div>
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
              <i className="fa-solid fa-plus"></i>
            </button>
            <input
              type="file"
              ref={avatarInputRef}
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleAvatarFile}
            />
          </div>

          <h2 className="profile-user-name">{user.name}</h2>
          <p className="profile-user-bio">{user.bio || 'Chưa cập nhật tiểu sử'}</p>

          {/* 4 Thống kê căn giữa */}
          <div className="profile-stats-grid">
            <div className="profile-stat-box">
              <div className="count">{myPosts.length}</div>
              <div className="desc">Bài viết</div>
            </div>
            <div className="profile-stat-box">
              <div className="count">{friends ? friends.length : (user.stats?.friends ?? 0)}</div>
              <div className="desc">Bạn bè</div>
            </div>
            <div className="profile-stat-box">
              <div className="count">{user.stats?.followers ?? 0}</div>
              <div className="desc">Người theo dõi</div>
            </div>
            <div className="profile-stat-box">
              <div className="count">{joinedGroups ? joinedGroups.length : 0}</div>
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
              {myPosts.length > 0 ? (
                myPosts.map(post => <PostCard key={post.id} post={post} />)
              ) : (
                <div className="widget-card" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-gray)' }}>
                  Bạn chưa đăng bài viết nào. Hãy chia sẻ khoảnh khắc đầu tiên của bạn!
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
              
              {/* 1. Trường học / Công việc */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: '20px', display: 'inline-flex', justifyContent: 'center', fontSize: '15px', color: 'var(--brand-gray)' }}>
                  <i className="fa-solid fa-graduation-cap"></i>
                </span>
                <span>{user.intro?.school || user.school || 'Chưa cập nhật trường học'}</span>
              </div>

              {/* 2. Nơi sống */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: '20px', display: 'inline-flex', justifyContent: 'center', fontSize: '15px', color: 'var(--brand-gray)' }}>
                  <i className="fa-solid fa-location-dot"></i>
                </span>
                <span>{user.intro?.liveIn || user.liveIn || 'Chưa cập nhật nơi sống'}</span>
              </div>

              {/* 3. Ngày tham gia */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: '20px', display: 'inline-flex', justifyContent: 'center', fontSize: '15px', color: 'var(--brand-gray)' }}>
                  <i className="fa-regular fa-calendar-days"></i>
                </span>
                <span>{user.intro?.joinedDate || 'Tham gia gần đây'}</span>
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
