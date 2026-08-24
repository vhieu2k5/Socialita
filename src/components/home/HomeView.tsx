import React from 'react';
import { useSocial } from '../../context/SocialContext';
import { WelcomeBanner } from './WelcomeBanner';
import { StoryRail } from './StoryRail';
import { PostCard } from '../feed/PostCard';
import { RightWidgets } from '../layout/RightWidgets';

export const HomeView: React.FC = () => {
  const { posts, searchQuery } = useSocial();

  const filteredPosts = posts.filter(p =>
    searchQuery ? p.content.toLowerCase().includes(searchQuery.toLowerCase()) || p.authorName.toLowerCase().includes(searchQuery.toLowerCase()) : true
  );

  return (
    <div className="flex gap-6 max-w-[1100px] mx-auto w-full">
      {/* Central Main Column */}
      <div className="flex-1 min-w-0">
        <WelcomeBanner />
        <StoryRail />

        {/* Feed Posts */}
        <div className="space-y-4">
          {filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}

          {filteredPosts.length === 0 && (
            <div className="bg-white rounded-2xl p-8 text-center text-gray-400 text-sm border border-gray-100">
              Không tìm thấy bài viết nào phù hợp.
            </div>
          )}
        </div>
      </div>

      {/* Right Column Widgets */}
      <RightWidgets />
    </div>
  );
};
