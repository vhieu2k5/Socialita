import React from 'react';
import { useSocial } from '../../context/SocialContext';
import { NavigationTab } from '../../types';
import { Logo } from '../ui/Logo';

export const Sidebar: React.FC = () => {
  const { tab, setTab, openCreatePostModal, friendRequests, showToast } = useSocial();

  const navItems: { id: NavigationTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    {
      id: 'home',
      label: 'Trang chủ',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      id: 'feed',
      label: 'Feed',
      badge: 12,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      )
    },
    {
      id: 'profile',
      label: 'Trang cá nhân',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      id: 'friends',
      label: 'Bạn bè',
      badge: friendRequests.length,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      id: 'groups',
      label: 'Hội nhóm',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    }
  ];

  return (
    <aside className="w-[230px] lg:w-[250px] bg-[#111113] h-screen sticky top-0 flex flex-col justify-between p-4 flex-shrink-0 z-30 select-none border-r border-[#1f1f23]">
      {/* Top Logo Container */}
      <div>
        <div className="flex justify-center pt-2 pb-6">
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform" onClick={() => setTab('home')}>
            <Logo size="md" showText={false} />
          </div>
        </div>

        {/* Section: ĐIỀU HƯỚNG */}
        <div className="space-y-1">
          <div className="text-[11px] font-bold tracking-wider text-[#636366] uppercase px-3 mb-2">
            ĐIỀU HƯỚNG
          </div>

          {navItems.map(item => {
            const isActive = tab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-[14px] transition-all cursor-pointer border-0 text-left ${
                  isActive
                    ? 'bg-[#e52e3d] text-white shadow-[0_4px_12px_rgba(229,46,61,0.35)]'
                    : 'text-[#a1a1a6] hover:bg-[#1a1a1e] hover:text-white'
                }`}
              >
                <span>{item.icon}</span>
                <span className="flex-1">{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-white text-[#e52e3d]'
                        : 'bg-[#242428] text-[#8e8e93]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Section: KHÁC */}
        <div className="mt-6 space-y-1">
          <div className="text-[11px] font-bold tracking-wider text-[#636366] uppercase px-3 mb-2">
            KHÁC
          </div>

          <button
            onClick={() => showToast('Mở cài đặt tài khoản')}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-[14px] text-[#a1a1a6] hover:bg-[#1a1a1e] hover:text-white transition-colors cursor-pointer border-0 text-left"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span>Cài đặt</span>
          </button>

          <button
            onClick={() => showToast('Đã đăng xuất tài khoản', 'info')}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-[14px] text-[#a1a1a6] hover:bg-[#1a1a1e] hover:text-[#e52e3d] transition-colors cursor-pointer border-0 text-left"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>

      {/* Bottom CTA Button: + Tạo bài viết */}
      <div className="pt-4 pb-2">
        <button
          onClick={openCreatePostModal}
          className="w-full bg-[#e52e3d] hover:bg-[#d32735] text-white py-3 px-4 rounded-xl font-bold text-sm shadow-[0_4px_16px_rgba(229,46,61,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span className="text-base font-bold">+</span>
          <span>Tạo bài viết</span>
        </button>
      </div>
    </aside>
  );
};
