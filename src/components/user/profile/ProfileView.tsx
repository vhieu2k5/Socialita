import React, { useState } from 'react';
import { useSocial } from '../../../context/SocialContext';
import { PostCard } from '../feed/PostCard';
import { Logo } from '../../ui/Logo';
import type { Post } from '../../../types';

export const ProfileView: React.FC = () => {
  const { user, posts, openEditProfileModal, openCreatePostModal, showToast } = useSocial();
  const [activeSubTab, setActiveSubTab] = useState<'posts' | 'photos' | 'videos'>('posts');

  const myPosts = posts.filter((p: Post) => p.authorName === user.name);

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', width: '100%' }}>
      {/* 1. THẺ HEADER PROFILE CHÍNH */}
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
                boxShadow: '0 4px 14px rgba(0,0,0,0.12)'
              }}
            >
              {user.name.split(' ').map(n => n[0]).join('') || 'MA'}
            </div>
            <button
              onClick={() => showToast('Chức năng đổi ảnh đại diện')}
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
              {user.bio}
            </p>

            {/* 4 Chỉ số Thống kê Nằm Ngang */}
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
                  {user.stats.posts}
                </span>{' '}
                <span style={{ fontSize: '13px', color: 'var(--text-light-gray)' }}>Bài viết</span>
              </div>

              <div>
                <span style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-dark)', fontFamily: 'var(--font-mono)' }}>
                  {user.stats.friends}
                </span>{' '}
                <span style={{ fontSize: '13px', color: 'var(--text-light-gray)' }}>Bạn bè</span>
              </div>

              <div>
                <span style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-dark)', fontFamily: 'var(--font-mono)' }}>
                  {user.stats.followers}
                </span>{' '}
                <span style={{ fontSize: '13px', color: 'var(--text-light-gray)' }}>Người theo dõi</span>
              </div>

              <div>
                <span style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-dark)', fontFamily: 'var(--font-mono)' }}>
                  {user.stats.groups}
                </span>{' '}
                <span style={{ fontSize: '13px', color: 'var(--text-light-gray)' }}>Nhóm</span>
              </div>
            </div>

            {/* 2 Nút Hành động */}
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
                  boxShadow: '0 4px 12px rgba(229,46,61,0.3)'
                }}
              >
                <span>+</span>
                <span>Đăng bài mới</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3 Tab con (Bài viết / Ảnh / Video) */}
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
              color: activeSubTab === 'posts' ? 'var(--brand-red)' : 'var(--text-light-gray)',
              borderBottom: activeSubTab === 'posts' ? '2.5px solid var(--brand-red)' : '2.5px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
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
              color: activeSubTab === 'photos' ? 'var(--brand-red)' : 'var(--text-light-gray)',
              borderBottom: activeSubTab === 'photos' ? '2.5px solid var(--brand-red)' : '2.5px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
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
              color: activeSubTab === 'videos' ? 'var(--brand-red)' : 'var(--text-light-gray)',
              borderBottom: activeSubTab === 'videos' ? '2.5px solid var(--brand-red)' : '2.5px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            Video
          </button>
        </div>
      </div>

      {/* 2. NỘI DUNG TƯƠNG ỨNG CỦA SUBTAB */}
      {activeSubTab === 'posts' && (
        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
          
          {/* CỘT TRÁI: GIỚI THIỆU & ẢNH PREVIEW */}
          <div style={{ width: '320px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Thẻ Giới thiệu */}
            <div className="widget-card">
              <h3 className="widget-card-title">Giới thiệu</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: 'var(--text-dark)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span>🎓</span>
                  <span>{user.intro.school}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span>📍</span>
                  <span>{user.intro.liveIn}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span>📅</span>
                  <span>{user.intro.joinedDate}</span>
                </div>
              </div>
            </div>

            {/* Thẻ Lưới Ảnh (6 ảnh) */}
            <div className="widget-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 className="widget-card-title" style={{ margin: 0 }}>Ảnh ({user.photos.length})</h3>
                <button
                  onClick={() => setActiveSubTab('photos')}
                  style={{ fontSize: '12px', color: 'var(--brand-red)', fontWeight: 700 }}
                >
                  Xem tất cả
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                {user.photos.map((color: string, idx: number) => (
                  <div
                    key={idx}
                    style={{
                      height: '76px',
                      borderRadius: '8px',
                      backgroundColor: color,
                      cursor: 'pointer'
                    }}
                    onClick={() => showToast(`Xem ảnh #${idx + 1}`)}
                  />
                ))}
              </div>
            </div>

            {/* Logo Card */}
            <div className="logo-card-container">
              <Logo size="md" />
            </div>
          </div>

          {/* CỘT PHẢI: BÀI VIẾT CỦA BẠN */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {myPosts.length > 0 ? (
              myPosts.map((post: Post) => <PostCard key={post.id} post={post} />)
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
          <h3 className="widget-card-title">Bộ sưu tập ảnh của bạn</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '16px' }}>
            {user.photos.map((color: string, idx: number) => (
              <div
                key={idx}
                style={{
                  height: '160px',
                  borderRadius: '12px',
                  backgroundColor: color,
                  cursor: 'pointer'
                }}
                onClick={() => showToast(`Xem chi tiết ảnh #${idx + 1}`)}
              />
            ))}
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
