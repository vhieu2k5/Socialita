import React from 'react';
import { useSocial } from '../../context/SocialContext';

export const StoryRail: React.FC = () => {
  const { stories, addStory, showToast } = useSocial();

  return (
    <div className="flex items-center gap-4 mb-5 overflow-x-auto pb-2 select-none no-scrollbar">
      {stories.map(s => {
        if (s.isUser) {
          return (
            <button
              key={s.id}
              onClick={addStory}
              className="flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer bg-transparent border-0 group"
            >
              <div className="w-14 h-14 rounded-full border-2 border-dashed border-[#e52e3d] flex items-center justify-center p-1 group-hover:scale-105 transition-transform">
                <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center text-lg text-[#e52e3d] font-bold shadow-inner">
                  +
                </div>
              </div>
              <span className="text-[11.5px] font-medium text-[#18181c] truncate max-w-[72px]">
                {s.userName}
              </span>
            </button>
          );
        }

        return (
          <button
            key={s.id}
            onClick={() => showToast(`Đang xem Story của ${s.userName}`)}
            className="flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer bg-transparent border-0 group"
          >
            <div className="w-14 h-14 rounded-full p-[2px] bg-gradient-to-tr from-[#e52e3d] to-[#ff7675] flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
              <div className="w-full h-full rounded-full border-2 border-white bg-gradient-to-br from-[#7a1d26] to-[#1c140c] flex items-center justify-center text-xs font-bold text-white shadow-inner">
                {s.userName[0]}
              </div>
            </div>
            <span className="text-[11.5px] font-medium text-[#18181c] truncate max-w-[72px]">
              {s.userName}
            </span>
          </button>
        );
      })}
    </div>
  );
};
