import React, { useState } from 'react';
import { useSocial } from '../../context/SocialContext';
import { Logo } from '../ui/Logo';

export const GroupsView: React.FC = () => {
  const { groups, toggleJoinGroup, showToast } = useSocial();
  const [filter, setFilter] = useState<'all' | 'joined'>('all');

  const displayedGroups = filter === 'joined' ? groups.filter(g => g.joined) : groups;

  return (
    <div className="max-w-[1100px] mx-auto w-full space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 min-w-0 space-y-4">
          {/* Header & Filter */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-extrabold text-[17px] text-[#18181c]">
                Hội nhóm cộng đồng
              </h3>
              <p className="text-xs text-[#8e8e93] mt-0.5">
                Khám phá và tham gia các nhóm cùng sở thích với bạn
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer border ${
                  filter === 'all'
                    ? 'bg-[#18181c] text-white border-[#18181c]'
                    : 'bg-white text-gray-600 border-gray-200'
                }`}
              >
                Khám phá
              </button>
              <button
                onClick={() => setFilter('joined')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer border ${
                  filter === 'joined'
                    ? 'bg-[#18181c] text-white border-[#18181c]'
                    : 'bg-white text-gray-600 border-gray-200'
                }`}
              >
                Nhóm của tôi
              </button>
            </div>
          </div>

          {/* Groups Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {displayedGroups.map(group => (
              <div
                key={group.id}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-red-50 text-[#e52e3d]">
                      {group.category}
                    </span>
                    <span className="text-xs text-gray-400 font-mono font-medium">
                      {(group.memberCount / 1000).toFixed(1)}k thành viên
                    </span>
                  </div>

                  <h4 className="font-bold text-[15px] text-[#18181c] mb-1.5">
                    {group.name}
                  </h4>
                  <p className="text-xs text-[#636366] leading-relaxed mb-4">
                    {group.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => toggleJoinGroup(group.id)}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      group.joined
                        ? 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-red-50 hover:text-[#e52e3d] hover:border-[#e52e3d]'
                        : 'bg-[#e52e3d] text-white border-[#e52e3d] hover:bg-[#d32735]'
                    }`}
                  >
                    {group.joined ? 'Đã tham gia' : '+ Tham gia nhóm'}
                  </button>

                  <button
                    onClick={() => showToast(`Xem bài viết trong nhóm ${group.name}`)}
                    className="py-2 px-3 rounded-xl text-xs font-bold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 cursor-pointer"
                  >
                    Xem nhóm
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column Logo */}
        <div className="w-full lg:w-[220px] flex justify-center items-start pt-4 flex-shrink-0 select-none">
          <Logo size="hero" showText={false} />
        </div>
      </div>
    </div>
  );
};
