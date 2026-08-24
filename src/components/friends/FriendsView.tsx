import React, { useState } from 'react';
import { useSocial } from '../../context/SocialContext';
import { Logo } from '../ui/Logo';

export const FriendsView: React.FC = () => {
  const {
    friends,
    friendRequests,
    acceptRequest,
    rejectRequest,
    showToast
  } = useSocial();

  const [friendSearch, setFriendSearch] = useState('');

  const filteredFriends = friends.filter(f =>
    f.name.toLowerCase().includes(friendSearch.toLowerCase())
  );

  return (
    <div className="max-w-[1100px] mx-auto w-full space-y-6">
      {/* Main Friends Column + Right 3D Logo */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 min-w-0 space-y-6">
          {/* Section 1: Tất cả bạn bè */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <h3 className="font-extrabold text-[16px] text-[#18181c]">
                Tất cả bạn bè ({friends.length})
              </h3>

              {/* Search Friends Input */}
              <div className="relative">
                <input
                  type="text"
                  value={friendSearch}
                  onChange={(e) => setFriendSearch(e.target.value)}
                  placeholder="🔍 Tìm trong bạn bè"
                  className="bg-gray-50 border border-gray-200 rounded-lg py-1.5 px-3 text-xs text-[#18181c] w-48 focus:outline-none focus:border-[#e52e3d]"
                />
              </div>
            </div>

            {/* Friends List */}
            <div className="divide-y divide-gray-100">
              {filteredFriends.map(friend => (
                <div
                  key={friend.id}
                  className="py-3 flex items-center justify-between hover:bg-gray-50/70 px-2 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-xs shadow-inner"
                      style={{ background: friend.avatarBg || '#4c8dff' }}
                    >
                      {friend.name[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-[13.5px] text-[#18181c]">
                        {friend.name}
                      </h4>
                      <p className="text-[11.5px] text-[#8e8e93]">
                        {friend.friendSince} · {friend.mutualFriends} bạn chung
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => showToast(`Mở cuộc trò chuyện với ${friend.name}`)}
                    className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#e52e3d] hover:border-[#e52e3d] transition-colors cursor-pointer bg-white"
                    title="Nhắn tin"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              ))}

              {filteredFriends.length === 0 && (
                <div className="py-6 text-center text-xs text-gray-400">
                  Không tìm thấy người bạn nào phù hợp.
                </div>
              )}
            </div>
          </div>

          {/* Section 2: Lời mời kết bạn */}
          <div>
            <div className="flex justify-between items-center mb-3.5 px-1">
              <h3 className="font-extrabold text-[16px] text-[#18181c]">
                Lời mời kết bạn ({friendRequests.length})
              </h3>
              <button
                onClick={() => showToast('Hiển thị tất cả lời mời kết bạn')}
                className="text-xs font-bold text-[#e52e3d] hover:underline cursor-pointer bg-transparent border-0"
              >
                Xem tất cả
              </button>
            </div>

            {/* Friend Requests Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
              {friendRequests.map(req => (
                <div
                  key={req.id}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col items-center text-center transition-transform hover:-translate-y-0.5"
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-white text-base shadow-md mb-2.5"
                    style={{ background: req.avatarBg || '#74b9ff' }}
                  >
                    {req.name[0]}
                  </div>

                  <h4 className="font-bold text-[13.5px] text-[#18181c] truncate w-full">
                    {req.name}
                  </h4>
                  <p className="text-[11px] text-[#8e8e93] mb-3.5">
                    {req.mutualFriends} bạn chung
                  </p>

                  <div className="flex gap-2 w-full mt-auto">
                    <button
                      onClick={() => acceptRequest(req.id)}
                      className="flex-1 py-1.5 px-2 rounded-xl text-xs font-bold text-white bg-[#e52e3d] hover:bg-[#d32735] transition-colors cursor-pointer border-0 shadow-xs"
                    >
                      Chấp nhận
                    </button>
                    <button
                      onClick={() => rejectRequest(req.id)}
                      className="flex-1 py-1.5 px-2 rounded-xl text-xs font-bold text-[#636366] bg-white border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      Từ chối
                    </button>
                  </div>
                </div>
              ))}

              {friendRequests.length === 0 && (
                <div className="col-span-full bg-white rounded-2xl p-8 text-center text-gray-400 text-xs border border-gray-100">
                  Không còn lời mời kết bạn nào.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right 3D Logo Column */}
        <div className="w-full lg:w-[220px] flex justify-center items-start pt-4 flex-shrink-0 select-none">
          <Logo size="hero" showText={false} />
        </div>
      </div>
    </div>
  );
};
