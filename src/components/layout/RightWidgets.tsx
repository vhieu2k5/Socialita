import React from 'react';
import { useSocial } from '../../context/SocialContext';
import { Logo } from '../ui/Logo';

export const RightWidgets: React.FC = () => {
  const { trends, friendSuggestions, sendRequest, setTab } = useSocial();

  return (
    <div className="w-[300px] xl:w-[320px] flex-shrink-0 space-y-4 py-2 hidden lg:block select-none">
      {/* 3D Pixel Logo Decorative Banner */}
      <div className="flex justify-center items-center py-2">
        <div className="transform hover:scale-105 transition-transform cursor-pointer" onClick={() => setTab('home')}>
          <Logo size="hero" showText={false} />
        </div>
      </div>

      {/* Xu hướng (Trending) Card */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <h3 className="font-extrabold text-[15px] text-[#18181c] mb-3">
          Xu hướng
        </h3>

        <div className="space-y-3">
          {trends.map(t => (
            <div
              key={t.id}
              className="flex items-start gap-3 p-1.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
            >
              <span className="font-mono font-bold text-xs text-[#8e8e93] pt-0.5">
                {t.rank}
              </span>
              <div>
                <div className="font-bold text-[13.5px] text-[#18181c] group-hover:text-[#e52e3d] transition-colors">
                  {t.tag}
                </div>
                <div className="text-[11.5px] text-[#8e8e93]">
                  {t.postCount}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gợi ý kết bạn Card */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-extrabold text-[15px] text-[#18181c]">
            Gợi ý kết bạn
          </h3>
          <button
            onClick={() => setTab('friends')}
            className="text-[12px] font-bold text-[#e52e3d] hover:underline cursor-pointer bg-transparent border-0"
          >
            Xem tất cả
          </button>
        </div>

        <div className="space-y-3">
          {friendSuggestions.map(s => (
            <div key={s.id} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ background: s.avatarBg || '#74b9ff' }}
                >
                  {s.name[0]}
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-[13px] text-[#18181c] truncate">
                    {s.name}
                  </div>
                  <div className="text-[11px] text-[#8e8e93] truncate">
                    {s.mutualFriends} bạn chung
                  </div>
                </div>
              </div>

              <button
                onClick={() => sendRequest(s.id)}
                disabled={s.requested}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border cursor-pointer flex-shrink-0 ${
                  s.requested
                    ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                    : 'bg-white text-[#e52e3d] border-[#e52e3d] hover:bg-[#e52e3d] hover:text-white'
                }`}
              >
                {s.requested ? 'Đã gửi' : 'Kết bạn'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
