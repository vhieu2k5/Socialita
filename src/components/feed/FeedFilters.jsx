import React from 'react';
import { useSocial } from '../../context/SocialContext';

export const FeedFilters = () => {
  const { feedFilter, setFeedFilter } = useSocial();

  const filterTabs = [
    { id: 'all', label: 'Tất cả bài viết' },
    { id: 'following', label: 'Đang theo dõi' },
    { id: 'groups', label: 'Hội nhóm' }
  ];

  return (
    <div className="feed-filters-bar">
      {filterTabs.map(tab => (
        <button
          key={tab.id}
          className={`feed-filter-btn ${feedFilter === tab.id ? 'active' : ''}`}
          onClick={() => setFeedFilter(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
