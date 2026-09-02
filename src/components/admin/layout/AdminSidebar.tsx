import React from 'react';
import { Logo } from '../../ui/Logo';
import { useSocial } from '../../../context/SocialContext';

export type AdminTabType = 'overview' | 'users' | 'posts';

interface AdminSidebarProps {
  currentTab: AdminTabType;
  onSelectTab: (tab: AdminTabType) => void;
  usersCountBadge?: number | string;
  postsCountBadge?: number | string;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
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
            backgroundColor: '#241416',
            border: '1px solid #4a1d24',
            padding: '4px 14px',
            borderRadius: '9999px',
            fontSize: '10.5px',
            fontWeight: 800,
            color: 'var(--brand-red)',
            letterSpacing: '0.08em'
          }}>
            <span style={{ width: '6px', height: '6px', backgroundColor: 'var(--brand-red)', borderRadius: '50%' }}></span>
            <span>ADMIN PANEL</span>
          </div>
        </div>

        {/* 2. Menu Điều hướng */}
        <div style={{ fontSize: '11px', fontWeight: 700, color: '#636366', letterSpacing: '0.08em', padding: '0 12px', marginBottom: '8px' }}>
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
              padding: '12px 14px',
              borderRadius: '12px',
              backgroundColor: currentTab === 'overview' ? 'var(--brand-red)' : 'transparent',
              color: currentTab === 'overview' ? '#ffffff' : '#a1a1a6',
              fontSize: '13.5px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: currentTab === 'overview' ? '0 4px 14px rgba(229,46,61,0.35)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <span style={{ fontSize: '16px' }}>⊞</span>
            <span>Tổng quan</span>
          </button>

          {/* Tab 2: Quản lý người dùng */}
          <button
            onClick={() => onSelectTab('users')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 14px',
              borderRadius: '12px',
              backgroundColor: currentTab === 'users' ? 'var(--brand-red)' : 'transparent',
              color: currentTab === 'users' ? '#ffffff' : '#a1a1a6',
              fontSize: '13.5px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: currentTab === 'users' ? '0 4px 14px rgba(229,46,61,0.35)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <span style={{ fontSize: '16px' }}>👥</span>
            <span style={{ flex: 1, textAlign: 'left' }}>Quản lý người dùng</span>
            <span style={{
              fontSize: '11px',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '9999px',
              backgroundColor: currentTab === 'users' ? '#ffffff' : '#242428',
              color: currentTab === 'users' ? 'var(--brand-red)' : '#8e8e93'
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
              padding: '12px 14px',
              borderRadius: '12px',
              backgroundColor: currentTab === 'posts' ? 'var(--brand-red)' : 'transparent',
              color: currentTab === 'posts' ? '#ffffff' : '#a1a1a6',
              fontSize: '13.5px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: currentTab === 'posts' ? '0 4px 14px rgba(229,46,61,0.35)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <span style={{ fontSize: '16px' }}>≡</span>
            <span style={{ flex: 1, textAlign: 'left' }}>Quản lý bài viết</span>
            <span style={{
              fontSize: '11px',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '9999px',
              backgroundColor: currentTab === 'posts' ? '#ffffff' : '#242428',
              color: currentTab === 'posts' ? 'var(--brand-red)' : '#8e8e93'
            }}>
              {postsCountBadge}
            </span>
          </button>
        </div>
      </div>

      {/* 3. Footer Admin: Thiện & Nút Đăng xuất */}
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
            T
          </div>
          <div>
            <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#ffffff' }}>Admin — Thiện</div>
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
