import React from 'react';
import { useSocial } from '../../context/SocialContext';

export const AdminSidebar = ({
  currentTab,
  onSelectTab,
  usersCountBadge = '1.2K',
  postsCountBadge = 18
}) => {
  const { logout, user } = useSocial();

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
        {/* 1. Logo Tròn Socialita & Badge Admin Panel chuẩn Figma */}
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
            margin: '0 auto 10px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
            cursor: 'pointer'
          }}>
            <img
              src="/logo.png"
              alt="Socialita Logo"
              style={{ width: '48px', height: '48px', objectFit: 'contain' }}
            />
            <span style={{
              fontSize: '11px',
              fontWeight: 800,
              fontFamily: 'var(--font-mono)',
              color: '#0f0f11',
              marginTop: '1px',
              letterSpacing: '-0.02em'
            }}>
              Socialita
            </span>
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#241416',
            border: '1px solid #4a1d24',
            padding: '4px 14px',
            borderRadius: '9999px',
            fontSize: '10.5px',
            fontWeight: 800,
            color: 'var(--brand-red)',
            letterSpacing: '0.08em'
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--brand-red)' }} />
            <span>ADMIN PANEL</span>
          </div>
        </div>

        {/* 2. Menu Điều Hướng */}
        <div style={{
          fontSize: '11px',
          fontWeight: 700,
          color: '#636366',
          letterSpacing: '0.08em',
          padding: '0 12px',
          marginBottom: '8px'
        }}>
          ĐIỀU HƯỚNG
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {/* Tab 1: Tổng quan */}
          <button
            onClick={() => onSelectTab('overview')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              width: '100%',
              padding: '12px 14px',
              borderRadius: '12px',
              backgroundColor: currentTab === 'overview' ? '#e52e3d' : 'transparent',
              color: currentTab === 'overview' ? '#ffffff' : '#a1a1a6',
              fontSize: '13.5px',
              fontWeight: 700,
              cursor: 'pointer',
              border: 'none',
              boxShadow: currentTab === 'overview' ? '0 4px 14px rgba(229, 46, 61, 0.35)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span>Tổng quan</span>
          </button>

          {/* Tab 2: Quản lý người dùng */}
          <button
            onClick={() => onSelectTab('users')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              width: '100%',
              padding: '12px 14px',
              borderRadius: '12px',
              backgroundColor: currentTab === 'users' ? '#e52e3d' : 'transparent',
              color: currentTab === 'users' ? '#ffffff' : '#a1a1a6',
              fontSize: '13.5px',
              fontWeight: 700,
              cursor: 'pointer',
              border: 'none',
              boxShadow: currentTab === 'users' ? '0 4px 14px rgba(229, 46, 61, 0.35)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span style={{ flex: 1, textAlign: 'left' }}>Quản lý người dùng</span>
            <span style={{
              fontSize: '11px',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '9999px',
              backgroundColor: currentTab === 'users' ? '#ffffff' : '#242428',
              color: currentTab === 'users' ? '#e52e3d' : '#8e8e93'
            }}>
              {usersCountBadge}
            </span>
          </button>

          {/* Tab 3: Quản lý bài viết */}
          <button
            onClick={() => onSelectTab('posts')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              width: '100%',
              padding: '12px 14px',
              borderRadius: '12px',
              backgroundColor: currentTab === 'posts' ? '#e52e3d' : 'transparent',
              color: currentTab === 'posts' ? '#ffffff' : '#a1a1a6',
              fontSize: '13.5px',
              fontWeight: 700,
              cursor: 'pointer',
              border: 'none',
              boxShadow: currentTab === 'posts' ? '0 4px 14px rgba(229, 46, 61, 0.35)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span style={{ flex: 1, textAlign: 'left' }}>Quản lý bài viết</span>
            <span style={{
              fontSize: '11px',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '9999px',
              backgroundColor: currentTab === 'posts' ? '#ffffff' : '#242428',
              color: currentTab === 'posts' ? '#e52e3d' : '#8e8e93'
            }}>
              {postsCountBadge}
            </span>
          </button>
        </div>
      </div>

      {/* Footer: Thông tin Admin & Nút Đăng xuất */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '16px',
        borderTop: '1px solid #242428'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: '#2a2a30',
            border: '1.5px solid #3e3e46',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: 800,
            color: '#ffffff'
          }}>
            {user?.name?.[0] || 'A'}
          </div>
          <div>
            <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#ffffff' }}>
              {user?.name || 'Admin — Socialita'}
            </div>
            <div style={{ fontSize: '11px', color: '#8e8e93' }}>Quản trị viên</div>
          </div>
        </div>
        <button
          onClick={logout}
          title="Đăng xuất khỏi hệ thống"
          style={{
            color: '#8e8e93',
            fontSize: '18px',
            padding: '6px',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'color 0.15s ease'
          }}
        >
          ➔
        </button>
      </div>
    </aside>
  );
};
