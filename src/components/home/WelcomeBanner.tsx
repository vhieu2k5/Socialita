import React from 'react';
import { useSocial } from '../../context/SocialContext';

export const WelcomeBanner: React.FC = () => {
  const { user } = useSocial();

  const firstName = user.name.split(' ').pop() || user.name;

  return (
    <div className="bg-[#18181c] rounded-2xl p-5 px-6 text-white shadow-md border border-[#2a2a2e] mb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
      {/* Left Greeting */}
      <div>
        <div className="text-[11px] font-bold tracking-wider text-[#8e8e93] uppercase font-mono mb-1">
          THỨ BẢY, 22/03
        </div>
        <h2 className="text-xl md:text-2xl font-extrabold text-white flex items-center gap-2">
          <span>Chào buổi sáng, {firstName}</span>
          <span>👋</span>
        </h2>
        <p className="text-xs text-[#a1a1a6] mt-1">
          Cộng đồng của bạn vừa có <span className="text-[#e52e3d] font-bold">47 hoạt động</span> mới trong hôm nay.
        </p>
      </div>

      {/* Right Stats Block */}
      <div className="flex items-center gap-6 md:gap-8 border-t md:border-t-0 md:border-l border-[#2e2e34] pt-3 md:pt-0 md:pl-8">
        <div className="text-center">
          <div className="text-lg md:text-xl font-extrabold text-[#e52e3d] font-mono leading-none">
            {user.stats.friends}
          </div>
          <div className="text-[11px] text-[#8e8e93] mt-1 font-medium">
            Bạn bè
          </div>
        </div>

        <div className="text-center">
          <div className="text-lg md:text-xl font-extrabold text-[#e52e3d] font-mono leading-none">
            {user.stats.groups}
          </div>
          <div className="text-[11px] text-[#8e8e93] mt-1 font-medium">
            Hội nhóm
          </div>
        </div>

        <div className="text-center">
          <div className="text-lg md:text-xl font-extrabold text-[#e52e3d] font-mono leading-none">
            312
          </div>
          <div className="text-[11px] text-[#8e8e93] mt-1 font-medium">
            Lượt thích tuần này
          </div>
        </div>
      </div>
    </div>
  );
};
