import React from 'react';
import { useSocial } from '../../../context/SocialContext';
import { WelcomeBanner } from './WelcomeBanner';
import { StoryRail } from './StoryRail';
import { PostCard } from '../feed/PostCard';
import { RightWidgets } from '../layout/RightWidgets';

export const HomeView: React.FC = () => {
  const { posts, searchQuery } = useSocial();

  const filteredPosts = posts.filter(p =>
    p.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.authorName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home-view-grid">
      <div className="home-main-col">
        {/* Top Welcome Card */}
        <WelcomeBanner />

        {/* Stories Rail */}
        <StoryRail />

        {/* Posts Feed */}
        <div className="posts-stream">
          {filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}

          {filteredPosts.length === 0 && (
            <div className="widget-card" style={{ textAlign: 'center', color: 'var(--text-gray)' }}>
              Không tìm thấy bài viết nào phù hợp với từ khóa "{searchQuery}"
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Widgets */}
      <RightWidgets />
    </div>
  );
};
