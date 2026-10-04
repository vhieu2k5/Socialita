import React, { useState } from 'react';
import { useSocial } from '../../context/SocialContext';
import { formatDate, getInitials } from '../../utils/formatters';

export const PostCard = ({ post }) => {
  const { toggleLikePost, addCommentPost, sharePost, deletePost, currentUser, user } = useSocial();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addCommentPost(post.id, commentText);
    setCommentText('');
  };

  const mediaSource = post.image_url || post.mediaUrl || '';
  const isVideo = mediaSource.match(/\.(mp4|webm|mov|ogg)$/i) || post.mediaType === 'video';
  const isAuthorOrAdmin = currentUser?.role === 'admin' || (user?.name && user.name === post.authorName);

  return (
    <article className="post-card">
      {/* 1. Header Tác giả */}
      <div className="post-head">
        <div className="post-author">
          <div className="avatar-circle" style={{ backgroundColor: post.authorAvatarBg || '#e52e3d' }}>
            {post.authorAvatar ? (
              <img src={post.authorAvatar} alt={post.authorName} style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
            ) : (
              getInitials(post.authorName)
            )}
          </div>
          <div>
            <h4 className="author-name">{post.authorName}</h4>
            <div className="post-time">{formatDate(post.time || post.created_at)}</div>
          </div>
        </div>

        {/* Nút tùy chọn xóa nếu là tác giả hoặc admin */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {isAuthorOrAdmin && (
            <button
              onClick={() => deletePost(post.id)}
              title="Xóa bài viết"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#9ca3af',
                fontSize: '14px',
                padding: '4px'
              }}
            >
              🗑️
            </button>
          )}
          <button style={{ color: 'var(--text-light-gray)', fontSize: '18px', background: 'none', border: 'none', cursor: 'pointer' }}>•••</button>
        </div>
      </div>

      {/* 2. Nội dung văn bản bài viết */}
      {post.content && <p className="post-content">{post.content}</p>}

      {/* 3. Media: Video hoặc Hình ảnh */}
      {mediaSource ? (
        <div style={{ marginTop: '12px', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#000' }}>
          {isVideo ? (
            <video
              src={mediaSource}
              controls
              style={{ width: '100%', maxHeight: '480px', display: 'block' }}
            />
          ) : (
            <img
              src={mediaSource}
              alt="Bài viết"
              style={{ width: '100%', maxHeight: '480px', objectFit: 'cover', display: 'block' }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          )}
        </div>
      ) : post.mediaGradient ? (
        /* 4. Phông nền Gradient nếu không có ảnh/video */
        <div className="post-media-box" style={{ background: post.mediaGradient }}>
          {post.location && (
            <div className="location-tag">
              <span>📍</span>
              <span>{post.location}</span>
            </div>
          )}
        </div>
      ) : null}

      {/* 5. Thống kê tương tác */}
      <div className="post-stats-row">
        <span>{post.likes || 0} lượt thích</span>
        <span>{post.commentsCount || (post.comments?.length || 0)} bình luận · {post.sharesCount || 0} chia sẻ</span>
      </div>

      {/* 6. Dải nút hành động: Thích, Bình luận, Chia sẻ */}
      <div className="post-actions-row">
        <button
          className={`action-btn ${post.liked ? 'liked' : ''}`}
          onClick={() => toggleLikePost(post.id)}
        >
          <span>{post.liked ? '❤️' : '🤍'}</span>
          <span>{post.liked ? 'Đã thích' : 'Thích'}</span>
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

      {/* 7. Phần mở rộng Bình luận */}
      {showComments && (
        <div className="comments-container">
          <form onSubmit={handleCommentSubmit} className="comment-input-row">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Viết bình luận công khai..."
              className="comment-input"
            />
            <button type="submit" className="btn-send-comment">Gửi</button>
          </form>

          {post.comments && post.comments.length > 0 ? (
            post.comments.map(c => (
              <div key={c.id} className="comment-item">
                <div className="comment-author">{c.authorName}</div>
                <div className="comment-text">{c.content}</div>
                {c.time && <div style={{ fontSize: '11px', color: '#8e8e93', marginTop: '2px' }}>{formatDate(c.time)}</div>}
              </div>
            ))
          ) : (
            <div style={{ fontSize: '12px', color: '#9ca3af', textAlign: 'center', padding: '12px 0' }}>
              Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
            </div>
          )}
        </div>
      )}
    </article>
  );
};
