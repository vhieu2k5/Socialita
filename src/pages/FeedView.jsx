import React from 'react';
import { useSocial } from '../context/SocialContext';
import { FeedFilters } from '../components/feed/FeedFilters';
import { PostCard } from '../components/feed/PostCard';
import { LogoSvg } from '../components/ui/Logo';

export const FeedView = () => {
  const { posts, feedFilter, searchQuery, trends } = useSocial();

  const filteredPosts = posts.filter(p => {
    const matchesSearch =
      (p.content || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.authorName || '').toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (feedFilter === 'all') return true;
    return p.category === feedFilter;
  });

  return (
    <div className="two-col-layout">
      <div className="main-column">
        <FeedFilters />

        <div id="feed-posts-list">
          {filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}

          {filteredPosts.length === 0 && (
            <div className="widget-card" style={{ textAlign: 'center', color: 'var(--text-gray)', padding: '32px' }}>
              Chưa có bài viết nào trong danh mục này. Hãy là người đầu tiên đăng bài!
            </div>
          )}
        </div>
      </div>

      {/* Cột phải của FeedView theo mockup Figma */}
      <div className="right-widgets">
        <div className="widget-card">
          <h3 className="widget-card-title">Xu hướng</h3>
          {trends.map(t => (
            <div key={t.id} className="trending-item">
              <span className="rank">{t.rank}</span>
              <div>
                <div className="tag">{t.tag}</div>
                <div className="count">{t.postCount}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <LogoSvg size={84} shadow={true} />
        </div>
      </div>
    </div>
  );
};
