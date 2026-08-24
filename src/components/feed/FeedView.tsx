import React from 'react';
import { useSocial } from '../../context/SocialContext';
import { FeedFilters } from './FeedFilters';
import { PostCard } from './PostCard';
import { RightWidgets } from '../layout/RightWidgets';

export const FeedView: React.FC = () => {
  const { posts, feedFilter, searchQuery } = useSocial();

  const filteredPosts = posts
    .filter(p => {
      if (feedFilter === 'all') return true;
      if (feedFilter === 'following') return p.category === 'following' || p.category === 'all';
      if (feedFilter === 'groups') return p.category === 'groups';
      return true;
    })
    .filter(p =>
      searchQuery
        ? p.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.authorName.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    );

  return (
    <div className="flex gap-6 max-w-[1100px] mx-auto w-full">
      {/* Central Column */}
      <div className="flex-1 min-w-0">
        <FeedFilters />

        <div className="space-y-4">
          {filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}

          {filteredPosts.length === 0 && (
            <div className="bg-white rounded-2xl p-8 text-center text-gray-400 text-sm border border-gray-100">
              Chưa có bài viết nào trong mục này.
            </div>
          )}
        </div>
      </div>

      {/* Right Column Widgets */}
      <RightWidgets />
    </div>
  );
};
