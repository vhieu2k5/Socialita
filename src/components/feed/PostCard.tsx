import React, { useState } from 'react';
import { Post } from '../../types';
import { useSocial } from '../../context/SocialContext';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { toggleLikePost, addCommentPost, sharePost } = useSocial();
  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState('');

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    addCommentPost(post.id, commentInput);
    setCommentInput('');
  };

  return (
    <article className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 mb-4 transition-shadow hover:shadow-md">
      {/* Post Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#18181c] text-white flex items-center justify-center font-bold text-sm shadow-inner">
            {post.authorAvatar || post.authorName[0]}
          </div>
          <div>
            <h4 className="font-bold text-[14.5px] text-[#18181c] leading-tight">
              {post.authorName}
            </h4>
            <div className="text-xs text-[#8e8e93] mt-0.5">
              {post.time}
            </div>
          </div>
        </div>

        <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full cursor-pointer bg-transparent border-0">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 10a2 2 0 110 4 2 2 0 010-4zm6 0a2 2 0 110 4 2 2 0 010-4zm6 0a2 2 0 110 4 2 2 0 010-4z" />
          </svg>
        </button>
      </div>

      {/* Post Content */}
      <p className="text-[14px] text-[#18181c] leading-relaxed mb-3.5 whitespace-pre-line">
        {post.content}
      </p>

      {/* Post Media Container with Location Tag */}
      {post.mediaGradient && (
        <div
          className="w-full h-56 sm:h-72 rounded-xl relative overflow-hidden flex items-end p-4 mb-3.5 shadow-inner"
          style={{ background: post.mediaGradient }}
        >
          {post.location && (
            <div className="bg-black/65 backdrop-blur-sm text-white text-[11.5px] font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
              <span>📍</span>
              <span>{post.location}</span>
            </div>
          )}
        </div>
      )}

      {/* Post Stats */}
      <div className="flex items-center justify-between text-xs text-[#8e8e93] pb-2.5 border-b border-gray-100 mb-1">
        <span className="flex items-center gap-1">
          <span className="text-[#e52e3d]">❤️</span>
          <span className="font-medium">{post.likes} lượt thích</span>
        </span>
        <span>
          {post.commentsCount} bình luận · {post.sharesCount} chia sẻ
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-1">
        {/* Like */}
        <button
          onClick={() => toggleLikePost(post.id)}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[13.5px] font-semibold transition-colors cursor-pointer border-0 bg-transparent hover:bg-gray-50 ${
            post.liked ? 'text-[#e52e3d]' : 'text-[#636366]'
          }`}
        >
          <span className="text-base">{post.liked ? '❤️' : '🤍'}</span>
          <span>Thích</span>
        </button>

        {/* Comment */}
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[13.5px] font-semibold text-[#636366] hover:bg-gray-50 transition-colors cursor-pointer border-0 bg-transparent"
        >
          <span className="text-base">💬</span>
          <span>Bình luận</span>
        </button>

        {/* Share */}
        <button
          onClick={() => sharePost(post.id)}
          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[13.5px] font-semibold text-[#636366] hover:bg-gray-50 transition-colors cursor-pointer border-0 bg-transparent"
        >
          <span className="text-base">↗</span>
          <span>Chia sẻ</span>
        </button>
      </div>

      {/* Comment Section (Collapsible) */}
      {showComments && (
        <div className="mt-3 pt-3 border-t border-gray-100 space-y-3 animate-fade-in">
          {/* Add Comment Form */}
          <form onSubmit={handleCommentSubmit} className="flex gap-2">
            <input
              type="text"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Viết bình luận..."
              className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-[13px] text-[#18181c] focus:outline-none focus:border-[#e52e3d] focus:ring-1 focus:ring-[#e52e3d]"
            />
            <button
              type="submit"
              className="bg-[#e52e3d] text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-[#d32735] transition-colors cursor-pointer border-0"
            >
              Gửi
            </button>
          </form>

          {/* Comments List */}
          {post.comments.length > 0 ? (
            <div className="space-y-2 pt-1">
              {post.comments.map(c => (
                <div key={c.id} className="flex items-start gap-2.5 bg-gray-50 p-2.5 rounded-xl text-xs">
                  <div className="w-6 h-6 rounded-full bg-[#18181c] text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0">
                    {c.authorName[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <b className="text-[#18181c] text-xs font-bold">{c.authorName}</b>
                      <span className="text-[10.5px] text-[#8e8e93]">{c.time}</span>
                    </div>
                    <p className="text-[#3a3a3c] mt-0.5 leading-relaxed">{c.content}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-2 text-xs text-gray-400">
              Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
            </div>
          )}
        </div>
      )}
    </article>
  );
};
