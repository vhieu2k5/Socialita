import React, { useState } from 'react';
import type { Post } from '../../../types';
import { useSocial } from '../../../context/SocialContext';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { toggleLikePost, addCommentPost, sharePost } = useSocial();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addCommentPost(post.id, commentText);
    setCommentText('');
  };

  return (
    <article className="post-card">
      <div className="post-head">
        <div className="post-author">
          <div className="avatar-circle">
            {post.authorAvatar || post.authorName[0]}
          </div>
          <div>
            <h4 className="author-name">{post.authorName}</h4>
            <div className="post-time">{post.time}</div>
          </div>
        </div>
        <button style={{ color: 'var(--text-light-gray)', fontSize: '18px' }}>•••</button>
      </div>

      <p className="post-content">{post.content}</p>

      {post.mediaGradient && (
        <div className="post-media-box" style={{ background: post.mediaGradient }}>
          {post.location && (
            <div className="location-tag">
              <span>📍</span>
              <span>{post.location}</span>
            </div>
          )}
        </div>
      )}

      <div className="post-stats-row">
        <span>{post.likes} lượt thích</span>
        <span>{post.commentsCount} bình luận · {post.sharesCount} chia sẻ</span>
      </div>

      <div className="post-actions-row">
        <button
          className={`action-btn ${post.liked ? 'liked' : ''}`}
          onClick={() => toggleLikePost(post.id)}
        >
          <span>{post.liked ? '❤️' : '🤍'}</span>
          <span>Thích</span>
        </button>

        <button className="action-btn" onClick={() => setShowComments(!showComments)}>
          <span>💬</span>
          <span>Bình luận</span>
        </button>

        <button className="action-btn" onClick={() => sharePost(post.id)}>
          <span>↗</span>
          <span>Chia sẻ</span>
        </button>
      </div>

      {showComments && (
        <div className="comments-container">
          <form onSubmit={handleCommentSubmit} className="comment-input-row">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Viết bình luận..."
              className="comment-input"
            />
            <button type="submit" className="btn-send-comment">Gửi</button>
          </form>

          {post.comments.map(c => (
            <div key={c.id} className="comment-item">
              <div className="comment-author">{c.authorName}</div>
              <div className="comment-text">{c.content}</div>
            </div>
          ))}
        </div>
      )}
    </article>
  );
};
