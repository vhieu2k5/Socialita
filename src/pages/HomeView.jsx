import React from 'react';
import { useSocial } from '../context/SocialContext';
import { WelcomeBanner } from '../components/feed/WelcomeBanner';
import { StoryRail } from '../components/feed/StoryRail';
import { PostCard } from '../components/feed/PostCard';
import { RightWidgets } from '../components/layout/RightWidgets';

export const HomeView = () => {
  const { posts, searchQuery } = useSocial();

  const filteredPosts = posts.filter(p =>
    (p.content || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.authorName || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home-view-grid">
      <div className="home-main-col">
        <WelcomeBanner />
        <StoryRail />

        <div className="posts-stream">
          {filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}

          {filteredPosts.length === 0 && (
            <div className="widget-card" style={{ textAlign: 'center', color: 'var(--text-gray)', padding: '32px' }}>
              Không tìm thấy bài viết nào phù hợp với từ khóa "{searchQuery}"
            </div>
          )}
        </div>
      </div>

      <RightWidgets />
    </div>
  );
};
