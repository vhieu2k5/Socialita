import React from 'react';
import { Logo } from '../ui/Logo';
import { useSocial } from '../../context/SocialContext';

export const AdminSidebar = ({
  currentTab,
  onSelectTab,
  usersCountBadge = '1.2K',
  postsCountBadge = 18
}) => {
  const { logout } = useSocial();

  return (
    <aside style={{
      width: '260px',
      backgroundColor: '#111113',
      color: '#ffffff',
      height: '100vh',
      position: 'sticky',
      top: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '24px 16px',
      flexShrink: 0,
      borderRight: '1px solid #1f1f23',
      userSelect: 'none'
    }}>
      <div>
        {/* 1. Logo Tròn Socialita & Badge Admin Panel */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '76px',
            height: '76px',
            backgroundColor: '#ffffff',
            borderRadius: '50%',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
          }}>
            <Logo size="sm" showText={false} />
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'rgba(229, 46, 61, 0.15)',
            border: '1px solid rgba(229, 46, 61, 0.4)',
            padding: '3px 10px',
            borderRadius: '9999px',
            fontSize: '11px',
            fontWeight: 800,
            color: 'var(--brand-red)',
            letterSpacing: '0.08em'
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--brand-red)' }} />
            <span>ADMIN PANEL</span>
          </div>
        </div>

        {/* 2. Menu Điều Hướng Admin */}
        <div style={{ fontSize: '11px', fontWeight: 800, color: '#636366', padding: '0 12px', marginBottom: '8px', letterSpacing: '0.06em' }}>
          QUẢN TRỊ VIÊN
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <button
            onClick={() => onSelectTab('overview')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              padding: '10px 14px',
              borderRadius: '10px',
              backgroundColor: currentTab === 'overview' ? '#e52e3d' : 'transparent',
              color: currentTab === 'overview' ? '#ffffff' : '#a1a1aa',
              fontSize: '13.5px',
              fontWeight: 700,
              cursor: 'pointer',
              border: 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '16px' }}>📊</span>
              <span>Tổng quan</span>
            </div>
          </button>

          <button
            onClick={() => onSelectTab('users')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              padding: '10px 14px',
              borderRadius: '10px',
              backgroundColor: currentTab === 'users' ? '#e52e3d' : 'transparent',
              color: currentTab === 'users' ? '#ffffff' : '#a1a1aa',
              fontSize: '13.5px',
              fontWeight: 700,
              cursor: 'pointer',
              border: 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '16px' }}>👥</span>
              <span>Người dùng</span>
            </div>
            {usersCountBadge && (
              <span style={{
                backgroundColor: currentTab === 'users' ? 'rgba(0,0,0,0.2)' : '#27272a',
                padding: '2px 8px',
                borderRadius: '9999px',
                fontSize: '11px',
                fontWeight: 700,
                color: '#ffffff'
              }}>
                {usersCountBadge}
              </span>
            )}
          </button>

          <button
            onClick={() => onSelectTab('posts')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              padding: '10px 14px',
              borderRadius: '10px',
              backgroundColor: currentTab === 'posts' ? '#e52e3d' : 'transparent',
              color: currentTab === 'posts' ? '#ffffff' : '#a1a1aa',
              fontSize: '13.5px',
              fontWeight: 700,
              cursor: 'pointer',
              border: 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '16px' }}>📄</span>
              <span>Bài viết</span>
            </div>
            {postsCountBadge && (
              <span style={{
                backgroundColor: currentTab === 'posts' ? 'rgba(0,0,0,0.2)' : '#27272a',
                padding: '2px 8px',
                borderRadius: '9999px',
                fontSize: '11px',
                fontWeight: 700,
                color: '#ffffff'
              }}>
                {postsCountBadge}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* 3. Nút Đăng Xuất */}
      <div>
        <button
          onClick={logout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            width: '100%',
            padding: '11px 14px',
            borderRadius: '10px',
            backgroundColor: '#1f1f23',
            color: '#ef4444',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            border: '1px solid #27272a',
            transition: 'all 0.15s ease'
          }}
        >
          <span>🚪</span>
          <span>Đăng xuất Admin</span>
        </button>
      </div>
    </aside>
  );
};
