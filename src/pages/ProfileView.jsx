import React, { useState, useRef } from 'react';
import { useSocial } from '../context/SocialContext';
import { PostCard } from '../components/feed/PostCard';
import { Logo } from '../components/ui/Logo';
import { getInitials } from '../utils/formatters';

export const ProfileView = () => {
  const { user, posts, openEditProfileModal, openCreatePostModal, uploadAvatar, showToast } = useSocial();
  const [activeSubTab, setActiveSubTab] = useState('posts');
  const avatarInputRef = useRef(null);

  const myPosts = posts.filter(p => p.authorName === user.name);

  const handleAvatarFile = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadAvatar(file);
    }
  };

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', width: '100%' }}>
      {/* 1. Thẻ Header Profile */}
      <div className="widget-card" style={{ padding: '28px 32px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '28px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {/* Avatar Lớn & Nút Đổi Avatar */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div
              style={{
                width: '88px',
                height: '88px',
                borderRadius: '50%',
                backgroundColor: user.avatarBg || '#35c9b0',
                color: '#ffffff',
                fontSize: '28px',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
                overflow: 'hidden'
              }}
            >
              {user.avatar_url ? (
                <img src={user.avatar_url} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                getInitials(user.name)
              )}
            </div>
            <button
              onClick={() => avatarInputRef.current?.click()}
              style={{
                position: 'absolute',
                bottom: '0',
                right: '0',
                width: '28px',
                height: '28px',
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '13px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                cursor: 'pointer'
              }}
              title="Đổi ảnh đại diện"
            >
              📷
            </button>
            <input
              type="file"
              ref={avatarInputRef}
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleAvatarFile}
            />
          </div>

          {/* Thông tin cá nhân & Thống kê */}
          <div style={{ flex: 1, minWidth: '280px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-dark)' }}>
                {user.name}
              </h2>
              <span style={{
                fontSize: '11.5px',
                fontWeight: 700,
                color: '#16a34a',
                backgroundColor: '#dcfce7',
                padding: '2px 8px',
                borderRadius: '9999px'
              }}>
                ✓ Đã xác minh
              </span>
            </div>

            <p style={{ fontSize: '13.5px', color: 'var(--text-gray)', marginBottom: '18px' }}>
              {user.bio || 'Chưa cập nhật tiểu sử'}
            </p>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '32px',
              padding: '14px 0',
              borderTop: '1px solid #f3f4f6',
              borderBottom: '1px solid #f3f4f6',
              marginBottom: '18px'
            }}>
              <div>
                <span style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-dark)', fontFamily: 'var(--font-mono)' }}>
                  {myPosts.length || user.stats?.posts || 0}
                </span>{' '}
                <span style={{ fontSize: '13px', color: 'var(--text-light-gray)' }}>Bài viết</span>
              </div>

              <div>
                <span style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-dark)', fontFamily: 'var(--font-mono)' }}>
                  {user.stats?.friends || 0}
                </span>{' '}
                <span style={{ fontSize: '13px', color: 'var(--text-light-gray)' }}>Bạn bè</span>
              </div>

              <div>
                <span style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-dark)', fontFamily: 'var(--font-mono)' }}>
                  {user.stats?.followers || '1.4K'}
                </span>{' '}
                <span style={{ fontSize: '13px', color: 'var(--text-light-gray)' }}>Người theo dõi</span>
              </div>

              <div>
                <span style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-dark)', fontFamily: 'var(--font-mono)' }}>
                  {user.stats?.groups || 9}
                </span>{' '}
                <span style={{ fontSize: '13px', color: 'var(--text-light-gray)' }}>Nhóm</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={openEditProfileModal}
                style={{
                  padding: '8px 18px',
                  borderRadius: '10px',
                  border: '1px solid #e5e7eb',
                  backgroundColor: '#ffffff',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: 'var(--text-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer'
                }}
              >
                <span>✏️</span>
                <span>Chỉnh sửa trang cá nhân</span>
              </button>

              <button
                onClick={openCreatePostModal}
                style={{
                  padding: '8px 18px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--brand-red)',
                  color: '#ffffff',
                  fontSize: '13px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(229,46,61,0.3)'
                }}
              >
                <span>+</span>
                <span>Đăng bài mới</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3 Subtabs */}
        <div style={{
          display: 'flex',
          gap: '28px',
          marginTop: '24px',
          borderTop: '1px solid #f3f4f6',
          paddingTop: '14px'
        }}>
          <button
            onClick={() => setActiveSubTab('posts')}
            style={{
              paddingBottom: '8px',
              fontSize: '14px',
              fontWeight: 700,
              background: 'none',
              border: 'none',
              color: activeSubTab === 'posts' ? 'var(--brand-red)' : 'var(--text-light-gray)',
              borderBottom: activeSubTab === 'posts' ? '2.5px solid var(--brand-red)' : '2.5px solid transparent',
              cursor: 'pointer'
            }}
          >
            Bài viết
          </button>

          <button
            onClick={() => setActiveSubTab('photos')}
            style={{
              paddingBottom: '8px',
              fontSize: '14px',
              fontWeight: 700,
              background: 'none',
              border: 'none',
              color: activeSubTab === 'photos' ? 'var(--brand-red)' : 'var(--text-light-gray)',
              borderBottom: activeSubTab === 'photos' ? '2.5px solid var(--brand-red)' : '2.5px solid transparent',
              cursor: 'pointer'
            }}
          >
            Ảnh
          </button>

          <button
            onClick={() => setActiveSubTab('videos')}
            style={{
              paddingBottom: '8px',
              fontSize: '14px',
              fontWeight: 700,
              background: 'none',
              border: 'none',
              color: activeSubTab === 'videos' ? 'var(--brand-red)' : 'var(--text-light-gray)',
              borderBottom: activeSubTab === 'videos' ? '2.5px solid var(--brand-red)' : '2.5px solid transparent',
              cursor: 'pointer'
            }}
          >
            Video
          </button>
        </div>
      </div>

      {/* 2. Nội dung Subtab */}
      {activeSubTab === 'posts' && (
        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
          <div style={{ width: '320px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="widget-card">
              <h3 className="widget-card-title">Giới thiệu</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: 'var(--text-dark)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span>🎓</span>
                  <span>{user.intro?.school || 'Chưa cập nhật'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span>📍</span>
                  <span>{user.intro?.liveIn || 'Chưa cập nhật'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span>📅</span>
                  <span>{user.intro?.joinedDate || 'Thành viên mới'}</span>
                </div>
              </div>
            </div>

            <div className="logo-card-container">
              <Logo size="md" />
            </div>
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            {myPosts.length > 0 ? (
              myPosts.map(post => <PostCard key={post.id} post={post} />)
            ) : (
              <div className="widget-card" style={{ textAlign: 'center', padding: '40px 20px' }}>
                <p style={{ color: 'var(--text-gray)', marginBottom: '16px', fontSize: '14px' }}>
                  Bạn chưa đăng bài viết nào. Hãy chia sẻ khoảnh khắc đầu tiên của bạn!
                </p>
                <button
                  className="btn-create-post"
                  onClick={openCreatePostModal}
                  style={{ width: 'auto', padding: '10px 24px', margin: '0 auto' }}
                >
                  + Tạo bài viết ngay
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {activeSubTab === 'photos' && (
        <div className="widget-card">
          <h3 className="widget-card-title">Bộ sưu tập ảnh</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '16px' }}>
            {myPosts.filter(p => p.image_url).map((p, idx) => (
              <img
                key={idx}
                src={p.image_url}
                alt="Photo"
                style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '12px', cursor: 'pointer' }}
                onClick={() => showToast(`Xem ảnh #${idx + 1}`)}
              />
            ))}
            {myPosts.filter(p => p.image_url).length === 0 && (
              <div style={{ gridColumn: 'span 3', textAlign: 'center', padding: '32px', color: '#9ca3af' }}>
                Chưa có ảnh nào được đăng tải.
              </div>
            )}
          </div>
        </div>
      )}

      {activeSubTab === 'videos' && (
        <div className="widget-card" style={{ textAlign: 'center', padding: '48px', color: 'var(--text-gray)' }}>
          🎬 Chưa có video nào được đăng tải.
        </div>
      )}
    </div>
  );
};
