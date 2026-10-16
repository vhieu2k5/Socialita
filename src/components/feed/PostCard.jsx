import React, { useState, useRef, useEffect } from 'react';
import { useSocial } from '../../context/SocialContext';
import { formatDate, getInitials } from '../../utils/formatters';
import { PostMediaGrid } from './PostMediaGrid';
import { ConfirmModal } from '../ui/ConfirmModal';

export const PostCard = ({ post }) => {
  const { toggleLikePost, addCommentPost, sharePost, deletePost, showToast, currentUser, user } = useSocial();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const menuRef = useRef(null);

  const isAuthorOrAdmin = currentUser?.role === 'admin' || (user?.name && user.name === post.authorName);

  // Close menu on outside click
  useEffect(() => {
    const handle = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addCommentPost(post.id, commentText);
    setCommentText('');
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}/post/${post.id}`;
    navigator.clipboard.writeText(url).then(() => {
      showToast('Đã sao chép liên kết bài viết!');
    }).catch(() => {
      showToast('Không thể sao chép liên kết', 'error');
    });
    setMenuOpen(false);
  };

  const handleDeleteClick = () => {
    setMenuOpen(false);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    deletePost(post.id);
    setShowDeleteConfirm(false);
  };

  const mediaSource = post.image_url || post.mediaUrl || '';
  const isVideo = mediaSource.match(/\.(mp4|webm|mov|ogg)$/i) || post.mediaType === 'video';

  let postImages = [];
  if (Array.isArray(post.images) && post.images.length > 0) {
    postImages = post.images.filter(Boolean);
  } else if (post.image_url) {
    const raw = String(post.image_url).trim();
    if (raw.startsWith('[') && raw.endsWith(']')) {
      try { postImages = JSON.parse(raw); } catch (e) { postImages = [raw]; }
    } else if (raw.includes(',')) {
      postImages = raw.split(',').map((s) => s.trim()).filter(Boolean);
    } else {
      postImages = [raw];
    }
  } else if (post.mediaUrl && !isVideo) {
    postImages = [post.mediaUrl];
  }

  return (
    <article className="post-card">
      {/* 1. Header */}
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

        {/* Three-dot menu */}
        <div style={{ position: 'relative' }} ref={menuRef}>
          <button
            className="post-menu-btn"
            onClick={(e) => { e.stopPropagation(); setMenuOpen(prev => !prev); }}
            title="Tùy chọn bài viết"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/>
            </svg>
          </button>

          {menuOpen && (
            <div className="post-menu-dropdown">
              <button className="post-menu-item" onClick={handleCopyLink}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
                  <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
                </svg>
                Copy link bài viết
              </button>
              {isAuthorOrAdmin && (
                <button className="post-menu-item danger" onClick={handleDeleteClick}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
                  </svg>
                  Xoá bài viết
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 2. Content */}
      {post.content && <p className="post-content">{post.content}</p>}

      {/* 3. Media */}
      {postImages.length > 0 || isVideo ? (
        <PostMediaGrid images={postImages} mediaSource={mediaSource} isVideo={isVideo} />
      ) : post.mediaGradient ? (
        <div className="post-media-box" style={{ background: post.mediaGradient }}>
          {post.location && (
            <div className="location-tag">
              <span>📍</span>
              <span>{post.location}</span>
            </div>
          )}
        </div>
      ) : null}

      {/* 4. Stats */}
      <div className="post-stats-row">
        <span>{post.likes || 0} lượt thích</span>
        <span>{post.commentsCount || (post.comments?.length || 0)} bình luận · {post.sharesCount || 0} chia sẻ</span>
      </div>

      {/* 5. Actions */}
      <div className="post-actions-row">
        <button className={`action-btn ${post.liked ? 'liked' : ''}`} onClick={() => toggleLikePost(post.id)}>
          <span>{post.liked ? '❤️' : '🤍'}</span>
          <span>{post.liked ? 'Đã thích' : 'Thích'}</span>
        </button>
        <button className="action-btn" onClick={() => setShowComments(!showComments)}>
          <span>💬</span><span>Bình luận</span>
        </button>
        <button className="action-btn" onClick={() => sharePost(post.id)}>
          <span>↗</span><span>Chia sẻ</span>
        </button>
      </div>

      {/* 6. Comments */}
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

      {/* Delete Confirm Modal */}
      <ConfirmModal
        isOpen={showDeleteConfirm}
        icon={<span style={{ fontSize: '36px' }}>🗑️</span>}
        title="Xoá bài viết?"
        body="Hành động này không thể hoàn tác, bài viết của bạn sẽ bị xoá và biến mất vĩnh viễn."
        confirmLabel="Xoá bài viết"
        confirmDanger
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </article>
  );
};
