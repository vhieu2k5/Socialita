import React from 'react';
import { useSocial } from '../context/SocialContext';
import { WelcomeBanner } from '../components/feed/WelcomeBanner';
import { StoryRail } from '../components/feed/StoryRail';
import { PostCard } from '../components/feed/PostCard';
import { RightWidgets } from '../components/layout/RightWidgets';
import { canViewPost } from '../utils/privacy';

export const HomeView = () => {
  const { posts, searchQuery, user, friends } = useSocial();

  const filteredPosts = posts.filter(p => {
    // 1. Kiểm tra quyền xem bài viết (Công khai, Bạn bè, Chỉ mình tôi)
    if (!canViewPost(p, user, friends)) return false;

    // 2. Tìm kiếm theo từ khóa
    return (
      (p.content || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.authorName || '').toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="two-col-layout">
      <div className="main-column">
        <WelcomeBanner />
        <StoryRail />

        <div id="home-posts-list">
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

      <RightWidgets showLogo={true} />
    </div>
  );
};
