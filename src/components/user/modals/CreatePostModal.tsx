import React, { useState } from 'react';
import { useSocial } from '../../../context/SocialContext';
import type { FeedFilterType } from '../../../types';

export const CreatePostModal: React.FC = () => {
  const {
    isCreatePostModalOpen,
    closeCreatePostModal,
    createPost,
    user
  } = useSocial();

  const [content, setContent] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState<FeedFilterType>('all');
  const [selectedGradient, setSelectedGradient] = useState('linear-gradient(180deg, #18191a 0%, #242526 50%, #7a1d26 100%)');

  if (!isCreatePostModalOpen) return null;

  const gradientOptions = [
    { label: 'Đỏ Đen Socialita', val: 'linear-gradient(180deg, #18191a 0%, #242526 50%, #7a1d26 100%)' },
    { label: 'Xanh Đêm', val: 'linear-gradient(135deg, #2b2d3d 0%, #1c1d2b 100%)' },
    { label: 'Ngọc Lục', val: 'linear-gradient(135deg, #1b4b43 0%, #0d2924 100%)' },
    { label: 'Tím Hoàng Hôn', val: 'linear-gradient(135deg, #4a1d4b 0%, #1f0d29 100%)' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    createPost(content, location, selectedGradient, category);
    setContent('');
    setLocation('');
  };

  return (
    <div className="modal-overlay open">
      <div className="modal-card">
        <div className="modal-header">
          <h3>Tạo bài viết</h3>
          <button className="btn-close-modal" onClick={closeCreatePostModal}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div className="modal-user-row">
            <div className="avatar-circle" style={{ backgroundColor: user.avatarBg }}>
              {user.name[0]}
            </div>
            <div>
              <div className="author-name">{user.name}</div>
              <div className="privacy-badge">🌐 Công khai</div>
            </div>
          </div>

          <div className="form-group">
            <textarea
              className="post-textarea"
              placeholder={`${user.name} ơi, bạn đang nghĩ gì thế?`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Địa điểm check-in</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ví dụ: Đà Lạt, Sài Gòn, Trường UEH..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Chọn thể loại bảng tin</label>
            <select
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value as FeedFilterType)}
            >
              <option value="all">Tất cả mọi người</option>
              <option value="following">Chỉ người đang theo dõi</option>
              <option value="groups">Hội nhóm của tôi</option>
            </select>
          </div>

          <div className="form-group">
            <label>Phông nền ảnh bìa</label>
            <div className="gradient-picker">
              {gradientOptions.map(g => (
                <div
                  key={g.val}
                  className={`gradient-option ${selectedGradient === g.val ? 'selected' : ''}`}
                  style={{ background: g.val }}
                  onClick={() => setSelectedGradient(g.val)}
                  title={g.label}
                />
              ))}
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={closeCreatePostModal}>
              Hủy
            </button>
            <button type="submit" className="btn-submit">
              Đăng bài
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
