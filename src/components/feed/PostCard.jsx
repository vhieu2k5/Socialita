import React, { useState, useRef } from 'react';
import { useSocial } from '../../context/SocialContext';
import { formatDate, getInitials } from '../../utils/formatters';
import { PostMediaGrid } from './PostMediaGrid';

export const PostCard = ({ post }) => {
  const {
    toggleLikePost,
    addCommentPost,
    getPostComments,
    deleteCommentPost,
    sharePost,
    deletePost,
    currentUser,
    user
  } = useSocial();

  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(post.comments || []);
  const [loadingComments, setLoadingComments] = useState(false);
  const [likedCommentIds, setLikedCommentIds] = useState([]);

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

  // Mở ô trả lời lồng nhau trực tiếp dưới bình luận
  const handleOpenReply = (parentCommentId, targetAuthorName) => {
    setActiveReplyParentId(parentCommentId);
    setReplyTargetName(targetAuthorName);
    setReplyText(`@${targetAuthorName} `);
    setTimeout(() => {
      replyInputRef.current?.focus();
    }, 60);
  };

  // Gửi phản hồi lồng nhau (parent_id = parentCommentId)
  const handleReplySubmit = async (e, parentCommentId) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    let finalContent = replyText.trim();
    const newComment = await addCommentPost(post.id, finalContent, parentCommentId);
    if (newComment) {
      setComments((prev) => [...prev, newComment]);
    }
    setReplyText('');
    setActiveReplyParentId(null);
    setReplyTargetName('');
  };

  const handleDeleteComment = async (commentId) => {
    await deleteCommentPost(commentId, post.id);
    setComments((prev) => prev.filter((c) => String(c.id) !== String(commentId) && String(c.parent_id) !== String(commentId)));
  };

  const handleToggleLikeComment = (commentId) => {
    setLikedCommentIds((prev) =>
      prev.includes(commentId) ? prev.filter((id) => id !== commentId) : [...prev, commentId]
    );
  };

  // Format nội dung bình luận (Làm nổi bật @Tag tên người dùng)
  const renderCommentContent = (content) => {
    if (!content) return '';
    const matchMention = content.match(/^(@[^\s]+\s[^\s]+|@[^\s]+)(.*)/s);
    if (matchMention) {
      return (
        <>
          <span style={{ color: '#1877f2', fontWeight: 700, marginRight: '4px' }}>
            {matchMention[1]}
          </span>
          {matchMention[2]}
        </>
      );
    }
    return content;
  };

  // Tách bình luận gốc (Level 1) và phản hồi (Level 2)
  const rootComments = [];
  const repliesMap = {};

  comments.forEach((c) => {
    if (c.parent_id) {
      if (!repliesMap[c.parent_id]) repliesMap[c.parent_id] = [];
      repliesMap[c.parent_id].push(c);
    } else {
      rootComments.push(c);
    }
  });

  const mediaSource = post.image_url || post.mediaUrl || '';
  const isVideo = mediaSource.match(/\.(mp4|webm|mov|ogg)$/i) || post.mediaType === 'video';
  const isAuthorOrAdmin = currentUser?.role === 'admin' || (user?.name && user.name === post.authorName);

  let postImages = [];
  if (Array.isArray(post.images) && post.images.length > 0) {
    postImages = post.images.filter(Boolean);
  } else if (post.image_url) {
    const raw = String(post.image_url).trim();
    if (raw.startsWith('[') && raw.endsWith(']')) {
      try {
        postImages = JSON.parse(raw);
      } catch (e) {
        postImages = [raw];
      }
    } else if (raw.includes(',')) {
      postImages = raw.split(',').map((s) => s.trim()).filter(Boolean);
    } else {
      postImages = [raw];
    }
  } else if (post.mediaUrl && !isVideo) {
    postImages = [post.mediaUrl];
  }

  const currentCommentCount = Math.max(post.commentsCount || 0, comments.length);

  return (
    <article className="post-card">
      {/* 1. Header Tác giả */}
      <div className="post-head">
        <div className="post-author">
          <div className="avatar-circle" style={{ backgroundColor: post.authorAvatarBg || '#e52e3d' }}>
            {post.authorAvatar ? (
              <img src={post.authorAvatar} alt={post.authorName} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
            ) : (
              getInitials(post.authorName)
            )}
          </div>
          <div>
            <h4 className="author-name">{post.authorName}</h4>
            <div className="post-time">{formatDate(post.time || post.created_at)}</div>
          </div>
        </div>

        {/* Nút xóa bài viết nếu là tác giả hoặc admin */}
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

      {/* 5. Thống kê tương tác */}
      <div className="post-stats-row">
        <span>{post.likes || 0} lượt thích</span>
        <span>{currentCommentCount} bình luận · {post.sharesCount || 0} chia sẻ</span>
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

        <button className="action-btn" onClick={handleToggleComments}>
          <span>💬</span>
          <span>Bình luận</span>
        </button>

        <button className="action-btn" onClick={() => sharePost(post.id)}>
          <span>↗</span>
          <span>Chia sẻ</span>
        </button>
      </div>

      {/* 7. Phần mở rộng Bình luận (Giao diện chuẩn Facebook: Cây phân nhánh & Trả lời lồng nhau) */}
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
                            backgroundColor: '#e52e3d',
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
                          <div className="comment-text-content">{renderCommentContent(root.content)}</div>
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
    </article>
  );
};
