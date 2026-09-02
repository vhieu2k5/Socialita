import React from 'react';
import { useSocial } from '../../../context/SocialContext';
import { FeedFilters } from './FeedFilters';
import { PostCard } from './PostCard';
import { RightWidgets } from '../layout/RightWidgets';
import type { Post } from '../../../types';

export const FeedView: React.FC = () => {
  const { posts, feedFilter, searchQuery } = useSocial();

  const filteredPosts = posts.filter((p: Post) => {
    // Search query filter
    const matchesSearch =
      p.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.authorName.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    // Category filter
    if (feedFilter === 'all') return true;
    return p.category === feedFilter;
  });

  return (
    <div className="home-view-grid">
      <div className="home-main-col">
        {/* Header Tabs */}
        <div style={{ marginBottom: '16px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '8px' }}>
            Bảng tin (Feed)
          </h2>
          <FeedFilters />
        </div>

        {/* Posts Stream */}
        <div className="posts-stream">
          {filteredPosts.map((post: Post) => (
            <PostCard key={post.id} post={post} />
          ))}

          {filteredPosts.length === 0 && (
            <div className="widget-card" style={{ textAlign: 'center', color: 'var(--text-gray)', padding: '32px' }}>
              Chưa có bài viết nào trong danh mục này. Hãy là người đầu tiên đăng bài!
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Widgets */}
      <RightWidgets />
    </div>
  );
};
