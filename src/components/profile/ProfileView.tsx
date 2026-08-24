import React, { useState } from 'react';
import { useSocial } from '../../context/SocialContext';
import { PostCard } from '../feed/PostCard';
import { Logo } from '../ui/Logo';

export const ProfileView: React.FC = () => {
  const { user, posts, openEditProfileModal, sharePost, showToast } = useSocial();
  const [activeTab, setActiveTab] = useState<'posts' | 'photos' | 'videos'>('posts');

  const userPosts = posts.filter(p => p.authorName === user.name || p.authorName === 'Minh Anh Lê' || p.authorName === 'Quang Huy');

  return (
    <div className="max-w-[1100px] mx-auto w-full">
      {/* Top Profile Header Area */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6 relative">
        {/* Action Buttons at Top Right */}
        <div className="flex justify-end gap-2.5 mb-2">
          <button
            onClick={openEditProfileModal}
            className="px-4 py-2 rounded-xl text-xs font-bold text-[#18181c] bg-white border border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
          >
            <span>✏️</span>
            <span>Chỉnh sửa trang cá nhân</span>
          </button>

          <button
            onClick={() => {
              sharePost('profile');
              showToast('Đã sao chép link trang cá nhân!');
            }}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#e52e3d] hover:bg-[#d32735] transition-colors cursor-pointer flex items-center gap-1.5 border-0 shadow-sm"
          >
            <span>↗</span>
            <span>Chia sẻ</span>
          </button>
        </div>

        {/* Center Avatar & Info */}
        <div className="flex flex-col items-center text-center -mt-6">
          <div className="w-24 h-24 rounded-full bg-[#35c9b0] text-white font-bold text-xl flex items-center justify-center border-4 border-white shadow-md mb-3">
            Avt
          </div>

          <h2 className="text-2xl font-extrabold text-[#18181c] mb-1">
            {user.name}
          </h2>
          <p className="text-[13.5px] text-[#636366] max-w-md mb-5">
            {user.bio}
          </p>

          {/* 4 Stats Counters */}
          <div className="flex items-center gap-8 sm:gap-12 pt-2 border-t border-gray-100 w-full max-w-lg justify-center">
            <div className="text-center">
              <div className="text-lg font-extrabold text-[#18181c] font-mono leading-none">
                {user.stats.posts}
              </div>
              <div className="text-xs text-[#8e8e93] mt-1 font-medium">Bài viết</div>
            </div>

            <div className="text-center">
              <div className="text-lg font-extrabold text-[#18181c] font-mono leading-none">
                {user.stats.friends}
              </div>
              <div className="text-xs text-[#8e8e93] mt-1 font-medium">Bạn bè</div>
            </div>

            <div className="text-center">
              <div className="text-lg font-extrabold text-[#18181c] font-mono leading-none">
                {user.stats.followers}
              </div>
              <div className="text-xs text-[#8e8e93] mt-1 font-medium">Người theo dõi</div>
            </div>

            <div className="text-center">
              <div className="text-lg font-extrabold text-[#18181c] font-mono leading-none">
                {user.stats.groups}
              </div>
              <div className="text-xs text-[#8e8e93] mt-1 font-medium">Hội nhóm</div>
            </div>
          </div>
        </div>

        {/* Profile Tabs */}
        <div className="flex gap-6 mt-6 border-t border-gray-100 pt-3 text-sm font-bold">
          <button
            onClick={() => setActiveTab('posts')}
            className={`pb-2 border-b-2 transition-colors cursor-pointer bg-transparent border-t-0 border-x-0 ${
              activeTab === 'posts'
                ? 'text-[#e52e3d] border-[#e52e3d]'
                : 'text-[#8e8e93] border-transparent hover:text-black'
            }`}
          >
            Bài viết
          </button>
          <button
            onClick={() => setActiveTab('photos')}
            className={`pb-2 border-b-2 transition-colors cursor-pointer bg-transparent border-t-0 border-x-0 ${
              activeTab === 'photos'
                ? 'text-[#e52e3d] border-[#e52e3d]'
                : 'text-[#8e8e93] border-transparent hover:text-black'
            }`}
          >
            Ảnh
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`pb-2 border-b-2 transition-colors cursor-pointer bg-transparent border-t-0 border-x-0 ${
              activeTab === 'videos'
                ? 'text-[#e52e3d] border-[#e52e3d]'
                : 'text-[#8e8e93] border-transparent hover:text-black'
            }`}
          >
            Video
          </button>
        </div>
      </div>

      {/* Main 2-Column Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left / Main Posts Column */}
        <div className="flex-1 min-w-0 space-y-4">
          {activeTab === 'posts' && (
            <>
              {userPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </>
          )}

          {activeTab === 'photos' && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 grid grid-cols-3 gap-3">
              {user.photos.map((p, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-xl flex items-center justify-center text-white font-bold text-xs"
                  style={{ background: p }}
                >
                  Ảnh {i + 1}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'videos' && (
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center text-gray-400 text-sm">
              Chưa có video nào được đăng tải.
            </div>
          )}
        </div>

        {/* Right Info Column (Giới thiệu + Ảnh) */}
        <div className="w-full lg:w-[320px] flex-shrink-0 space-y-4 select-none">
          {/* 3D Pixel Logo */}
          <div className="flex justify-center items-center py-1">
            <Logo size="hero" showText={false} />
          </div>

          {/* Giới thiệu Card */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="font-extrabold text-[15px] text-[#18181c] mb-3.5">
              Giới thiệu
            </h3>

            <div className="space-y-3 text-xs text-[#636366]">
              <div className="flex items-center gap-2.5">
                <span className="text-base text-[#e52e3d]">💼</span>
                <span>{user.intro.school}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-base text-[#e52e3d]">📍</span>
                <span>{user.intro.liveIn}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-base text-[#e52e3d]">📅</span>
                <span>{user.intro.joinedDate}</span>
              </div>
            </div>
          </div>

          {/* Ảnh (Photos Grid Widget) */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="font-extrabold text-[15px] text-[#18181c] mb-3.5">
              Ảnh
            </h3>

            <div className="grid grid-cols-3 gap-2">
              {user.photos.slice(0, 6).map((color, idx) => (
                <div
                  key={idx}
                  className="aspect-square rounded-xl bg-gray-200 hover:opacity-90 transition-opacity cursor-pointer"
                  style={{ background: color }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
