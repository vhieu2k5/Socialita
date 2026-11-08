import React, { useState, useRef, useEffect } from 'react';
import { useSocial } from '../../context/SocialContext';
import { formatDate, getInitials } from '../../utils/formatters';
import { PostMediaGrid } from './PostMediaGrid';
import { ConfirmModal } from '../ui/ConfirmModal';

export const PostCard = ({ post }) => {
  const {
    toggleLikePost,
    addCommentPost,
    getPostComments,
    deleteCommentPost,
    sharePost,
    deletePost,
    showToast,
    currentUser,
    user
  } = useSocial();

  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(post.comments || []);
  const [loadingComments, setLoadingComments] = useState(false);
  const [likedCommentIds, setLikedCommentIds] = useState([]);

  // Three-dot options menu state
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const menuRef = useRef(null);

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

  // Quản lý trả lời lồng nhau kiểu Facebook
  const [activeReplyParentId, setActiveReplyParentId] = useState(null);
  const [replyTargetName, setReplyTargetName] = useState('');
  const [replyText, setReplyText] = useState('');

  const commentInputRef = useRef(null);
  const replyInputRef = useRef(null);

  const handleToggleComments = async () => {
    const nextShow = !showComments;
    setShowComments(nextShow);
    if (nextShow) {
      setLoadingComments(true);
      try {
        const fetched = await getPostComments(post.id);
        if (fetched && Array.isArray(fetched)) {
          setComments(fetched);
        } else if (post.comments && post.comments.length > 0) {
          setComments(post.comments);
        }
      } catch (err) {
        console.warn('Lỗi khi tải bình luận:', err.message);
      } finally {
        setLoadingComments(false);
      }
    }
  };

  // Gửi bình luận gốc vào bài viết (parent_id = null)
  const handleRootCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment = await addCommentPost(post.id, commentText.trim(), null);
    if (newComment) {
      setComments((prev) => [...prev, newComment]);
    }
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

  // Mở ô trả lời lồng nhau trực tiếp dưới bình luận
  const handleOpenReply = (parentCommentId, targetAuthorName) => {
    setActiveReplyParentId(parentCommentId);
    setReplyTargetName(targetAuthorName);
    setReplyText(`@${targetAuthorName} `);
    setTimeout(() => {
      replyInputRef.current?.focus();
    }, 60);
  };

  // Gửi câu trả lời con (parent_id = rootCommentId)
  const handleReplySubmit = async (e, parentId) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const newReply = await addCommentPost(post.id, replyText.trim(), parentId);
    if (newReply) {
      setComments((prev) => [...prev, newReply]);
    }
    setActiveReplyParentId(null);
    setReplyText('');
    setReplyTargetName('');
  };

  // Thả tim bình luận
  const handleToggleLikeComment = (commentId) => {
    setLikedCommentIds((prev) =>
      prev.includes(commentId) ? prev.filter((id) => id !== commentId) : [...prev, commentId]
    );
  };

  // Xóa bình luận
  const handleDeleteComment = async (commentId) => {
    const ok = await deleteCommentPost(commentId, post.id);
    if (ok) {
      setComments((prev) => prev.filter((c) => c.id !== commentId && c.parent_id !== commentId));
    }
  };

  // Phân tách cây bình luận 2 cấp (Gốc & Phản hồi)
  const rootComments = comments.filter((c) => !c.parent_id);
  const repliesMap = comments.reduce((acc, c) => {
    if (c.parent_id) {
      if (!acc[c.parent_id]) acc[c.parent_id] = [];
      acc[c.parent_id].push(c);
    }
    return acc;
  }, {});


  // Render highlight @tên_người_được_trả_lời
  const renderCommentContent = (content) => {
    if (!content) return '';
    const parts = content.split(/(@[\p{L}0-9_\s]+?\b)/gu);
    return parts.map((part, index) => {
      if (part.startsWith('@')) {
        return (
          <span key={index} className="mention-tag" style={{ color: 'var(--brand-red)', fontWeight: 700 }}>
            {part}
          </span>
        );
      }
      return part;
    });
  };

  const isVideoUrl = (url) => typeof url === 'string' && (/\.(mp4|webm|mov|ogg)($|\?)/i.test(url) || url.includes('video/'));

  let postImages = [];
  if (Array.isArray(post.images) && post.images.length > 0) {
    postImages = post.images.filter(Boolean);
  } else if (post.image_url) {
    const raw = String(post.image_url).trim();
    if (raw.startsWith('[') && raw.endsWith(']')) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) postImages = parsed.filter(Boolean);
      } catch (e) {
        postImages = [raw];
      }
    } else if (raw.includes(',')) {
      postImages = raw.split(',').map((s) => s.trim()).filter(Boolean);
    } else {
      postImages = [raw];
    }
  } else if (post.mediaUrl) {
    postImages = [post.mediaUrl];
  }

  // Bóc tách nếu phần tử là chuỗi JSON mảng
  postImages = postImages.flatMap((item) => {
    if (typeof item === 'string' && item.trim().startsWith('[') && item.trim().endsWith(']')) {
      try {
        const parsed = JSON.parse(item.trim());
        return Array.isArray(parsed) ? parsed.filter(Boolean) : [item];
      } catch (e) {
        return [item];
      }
    }
    return [item];
  });

  const isVideo = postImages.some(isVideoUrl) || post.mediaType === 'video' || isVideoUrl(post.mediaUrl);
  const mediaSource = postImages.find(isVideoUrl) || postImages[0] || (typeof post.mediaUrl === 'string' ? post.mediaUrl : '');
  const isAuthorOrAdmin = currentUser?.role === 'admin' || (user?.name && user.name === post.authorName);

  const currentCommentCount = Math.max(post.commentsCount || 0, comments.length);


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

        {/* Three-dot options menu */}
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

      {/* 2. Nội dung văn bản bài viết */}
      {post.content && <p className="post-content">{post.content}</p>}

      {/* 3. Media: Video hoặc Hình ảnh */}
      {postImages.length > 0 || isVideo ? (
        <PostMediaGrid images={postImages} mediaSource={mediaSource} isVideo={isVideo} />
      ) : post.mediaGradient ? (  
        <div className="post-media-box" style={{ background: post.mediaGradient }}>
          {post.location && (
            <div className="location-tag">
              <i class="fa-solid fa-location-dot"></i>
              <span>{post.location}</span>
            </div>
          )}
        </div>
      ) : null}

      {/* 4. Thống kê tương tác */}
      <div className="post-stats-row">
        <span>{post.likes || 0} lượt thích</span>
        <span>{currentCommentCount} bình luận · {post.sharesCount || 0} chia sẻ</span>
      </div>

      {/* 5. Dải nút hành động: Thích, Bình luận, Chia sẻ */}
      <div className="post-actions-row">
        <button
          className={`action-btn ${post.liked ? 'liked' : ''}`}
          onClick={() => toggleLikePost(post.id)}
        >
          <i className={post.liked ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}></i>

          <span>{post.liked ? 'Đã thích' : 'Thích'}</span>
        </button>

        <button className="action-btn" onClick={handleToggleComments}>
          <i class="fa-regular fa-comment-dots"></i>
          <span>Bình luận</span>
        </button>

        <button className="action-btn" onClick={() => sharePost(post.id)}>
          <i class="fa-regular fa-share-from-square"></i>
          <span>Chia sẻ</span>
        </button>
      </div>

      {/* 6. Phần mở rộng Bình luận (Giao diện chuẩn Facebook: Cây phân nhánh & Trả lời lồng nhau) */}
      {showComments && (
        <div className="comments-container">
          {/* Ô nhập bình luận gốc chính */}
          <form onSubmit={handleRootCommentSubmit} className="comment-input-row">
            {user?.avatar_url ? (
              <img
                src={user.avatar_url}
                alt={user.name}
                style={{ width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
              />
            ) : (
              <div
                className="avatar-circle-sm"
                style={{
                  width: '34px',
                  height: '34px',
                  backgroundColor: user?.avatarBg || '#35c9b0',
                  color: '#fff',
                  borderRadius: '50%',
                  flexShrink: 0
                }}
              >
                {getInitials(user?.name)}
              </div>
            )}
            <input
              ref={commentInputRef}
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Viết bình luận công khai..."
              className="comment-input"
            />
            <button type="submit" className="btn-send-comment">
              Gửi
            </button>
          </form>

          {/* Trạng thái đang tải */}
          {loadingComments ? (
            <div style={{ fontSize: '12px', color: '#8e8e93', textAlign: 'center', padding: '12px 0' }}>
              Đang tải bình luận...
            </div>
          ) : rootComments.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '4px' }}>
              {rootComments.map((root) => {
                const replies = repliesMap[root.id] || [];
                const isReplyingThis = activeReplyParentId === root.id;

                return (
                  <div key={root.id} className="comment-thread">
                    {/* 1. BÌNH LUẬN GỐC (LEVEL 1) */}
                    <div className="comment-row">
                      {root.authorAvatar ? (
                        <img
                          src={root.authorAvatar}
                          alt={root.authorName}
                          style={{ width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div
                          className="avatar-circle-sm"
                          style={{
                            width: '34px',
                            height: '34px',
                            backgroundColor: '#35c9b0',
                            color: '#fff',
                            borderRadius: '50%',
                            flexShrink: 0
                          }}
                        >
                          {getInitials(root.authorName)}
                        </div>
                      )}

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="comment-bubble">
                          <div className="comment-author-name">{root.authorName}</div>
                          <div className="comment-text-content">{root.content}</div>
                        </div>

                        {/* Thao tác dưới bình luận gốc */}
                        <div className="comment-meta-actions">
                          <span>{root.time || formatDate(root.created_at) || 'Vừa xong'}</span>
                          <button
                            type="button"
                            className={`comment-action-btn ${likedCommentIds.includes(root.id) ? 'active' : ''}`}
                            onClick={() => handleToggleLikeComment(root.id)}
                          >
                            {likedCommentIds.includes(root.id) ? 'Đã thích' : 'Thích'}
                          </button>
                          <button
                            type="button"
                            className="comment-action-btn"
                            onClick={() => handleOpenReply(root.id, root.authorName)}
                          >
                            Trả lời
                          </button>
                          {(currentUser?.role === 'admin' ||
                            (user?.id && root.user_id && Number(user.id) === Number(root.user_id)) ||
                            (user?.name && root.authorName === user.name)) && (
                            <button
                              type="button"
                              className="comment-action-btn"
                              style={{ color: '#dc2626' }}
                              onClick={() => handleDeleteComment(root.id)}
                            >
                              Xóa
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* 2. CÁC PHẢN HỒI CON (LEVEL 2 - THỤT LỀ THEO CHUẨN FACEBOOK) */}
                    {replies.length > 0 && (
                      <div className="replies-thread-container">
                        {replies.map((reply) => (
                          <div key={reply.id} className="comment-row">
                            {reply.authorAvatar ? (
                              <img
                                src={reply.authorAvatar}
                                alt={reply.authorName}
                                style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                }}
                              />
                            ) : (
                              <div
                                className="avatar-circle-sm"
                                style={{
                                  width: '28px',
                                  height: '28px',
                                  backgroundColor: '#ff7675',
                                  color: '#fff',
                                  borderRadius: '50%',
                                  fontSize: '11px',
                                  flexShrink: 0
                                }}
                              >
                                {getInitials(reply.authorName)}
                              </div>
                            )}

                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div className="comment-bubble" style={{ padding: '7px 12px' }}>
                                <div className="comment-author-name" style={{ fontSize: '12.5px' }}>
                                  {reply.authorName}
                                </div>
                                <div className="comment-text-content" style={{ fontSize: '12.5px' }}>
                                  {renderCommentContent(reply.content)}
                                </div>
                              </div>

                              {/* Thao tác dưới phản hồi con */}
                              <div className="comment-meta-actions">
                                <span>{reply.time || formatDate(reply.created_at) || 'Vừa xong'}</span>
                                <button
                                  type="button"
                                  className={`comment-action-btn ${likedCommentIds.includes(reply.id) ? 'active' : ''}`}
                                  onClick={() => handleToggleLikeComment(reply.id)}
                                >
                                  {likedCommentIds.includes(reply.id) ? 'Đã thích' : 'Thích'}
                                </button>
                                <button
                                  type="button"
                                  className="comment-action-btn"
                                  onClick={() => handleOpenReply(root.id, reply.authorName)}
                                >
                                  Trả lời
                                </button>
                                {(currentUser?.role === 'admin' ||
                                  (user?.id && reply.user_id && Number(user.id) === Number(reply.user_id)) ||
                                  (user?.name && reply.authorName === user.name)) && (
                                  <button
                                    type="button"
                                    className="comment-action-btn"
                                    style={{ color: '#dc2626' }}
                                    onClick={() => handleDeleteComment(reply.id)}
                                  >
                                    Xóa
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* 3. Ô NHẬP PHẢN HỒI TRỰC TIẾP DƯỚI LUỒNG BÌNH LUẬN NÀY (INLINE REPLY BOX) */}
                    {isReplyingThis && (
                      <form onSubmit={(e) => handleReplySubmit(e, root.id)} className="inline-reply-box">
                        {user?.avatar_url ? (
                          <img
                            src={user.avatar_url}
                            alt={user.name}
                            style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
                          />
                        ) : (
                          <div
                            className="avatar-circle-sm"
                            style={{
                              width: '28px',
                              height: '28px',
                              backgroundColor: user?.avatarBg || '#35c9b0',
                              color: '#fff',
                              borderRadius: '50%',
                              fontSize: '11px',
                              flexShrink: 0
                            }}
                          >
                            {getInitials(user?.name)}
                          </div>
                        )}
                        <input
                          ref={replyInputRef}
                          type="text"
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder={`Trả lời ${replyTargetName}...`}
                          className="comment-input"
                          style={{ padding: '6px 12px', fontSize: '12.5px' }}
                        />
                        <button type="submit" className="btn-send-comment" style={{ padding: '6px 12px', fontSize: '11.5px' }}>
                          Gửi
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveReplyParentId(null);
                            setReplyText('');
                            setReplyTargetName('');
                          }}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#9ca3af',
                            cursor: 'pointer',
                            fontSize: '12px',
                            padding: '4px'
                          }}
                          title="Hủy"
                        >
                          ✕
                        </button>
                      </form>
                    )}
                  </div>
                );
              })}
            </div>
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
