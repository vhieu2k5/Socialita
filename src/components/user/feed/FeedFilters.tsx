import React from 'react';
import { useSocial } from '../../../context/SocialContext';
import type { FeedFilterType } from '../../../types';

export const FeedFilters: React.FC = () => {
  const { feedFilter, setFeedFilter } = useSocial();

  const filters: { id: FeedFilterType; label: string }[] = [
    { id: 'all', label: 'Tất cả' },
    { id: 'following', label: 'Đang theo dõi' },
    { id: 'groups', label: 'Hội nhóm của tôi' }
  ];

  return (
    <div className="feed-filters-bar">
      {filters.map(f => (
        <button
          key={f.id}
          onClick={() => setFeedFilter(f.id)}
          className={`feed-filter-btn ${feedFilter === f.id ? 'active' : ''}`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
};
