import React from 'react';
import { useSocial } from '../../context/SocialContext';
import { FeedFilterType } from '../../types';

export const FeedFilters: React.FC = () => {
  const { feedFilter, setFeedFilter } = useSocial();

  const filters: { id: FeedFilterType; label: string }[] = [
    { id: 'all', label: 'Tất cả' },
    { id: 'following', label: 'Đang theo dõi' },
    { id: 'groups', label: 'Hội nhóm của tôi' }
  ];

  return (
    <div className="flex items-center justify-center gap-2 mb-5 select-none">
      {filters.map(f => {
        const isActive = feedFilter === f.id;
        return (
          <button
            key={f.id}
            onClick={() => setFeedFilter(f.id)}
            className={`px-5 py-2 rounded-full text-[13.5px] font-bold transition-all cursor-pointer border ${
              isActive
                ? 'bg-[#18181c] text-white border-[#18181c] shadow-sm'
                : 'bg-white text-[#636366] border-gray-200 hover:border-gray-400 hover:text-black'
            }`}
          >
            {f.label}
          </button>
        );
      })}
    </div>
  );
};
