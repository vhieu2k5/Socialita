import React from 'react';
import { useSocial } from '../../context/SocialContext';

export const Topbar: React.FC = () => {
  const { searchQuery, setSearchQuery, setTab, showToast } = useSocial();

  return (
    <header className="h-16 bg-[#18181c] border-b border-[#2a2a2e] flex items-center justify-between px-6 sticky top-0 z-40">
      {/* Search Bar matching Figma */}
      <div className="relative w-full max-w-[420px]">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8e8e93] text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Tìm bạn bè, hội nhóm, bài viết..."
          className="w-full bg-[#242428] border border-[#38383e] rounded-lg py-2 pl-10 pr-4 text-[13.5px] text-white placeholder-[#8e8e93] focus:outline-none focus:border-[#e52e3d] focus:ring-1 focus:ring-[#e52e3d] transition-all"
        />
      </div>

      {/* Right Icons */}
      <div className="flex items-center gap-3.5">
        {/* Messages / Mail Icon */}
        <button
          onClick={() => showToast('Bạn có 3 tin nhắn chưa đọc!')}
          className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-gray-800 relative hover:bg-gray-100 transition-colors cursor-pointer border-0 shadow-sm"
          title="Tin nhắn"
        >
          <svg className="w-5 h-5 text-[#18181c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          {/* Red dot badge */}
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#e52e3d]" />
        </button>

        {/* Notifications / Bell Icon */}
        <button
          onClick={() => showToast('Bạn có 5 thông báo mới!')}
          className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-gray-800 relative hover:bg-gray-100 transition-colors cursor-pointer border-0 shadow-sm"
          title="Thông báo"
        >
          <svg className="w-5 h-5 text-[#18181c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          {/* Red dot badge */}
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#e52e3d]" />
        </button>

        {/* User Avatar Circle */}
        <button
          onClick={() => setTab('profile')}
          className="w-10 h-10 rounded-full bg-[#35c9b0] flex items-center justify-center font-bold text-white text-sm shadow-md hover:scale-105 transition-transform cursor-pointer border-2 border-white/20"
          title="Trang cá nhân của bạn"
        >
          Avt
        </button>
      </div>
    </header>
  );
};
