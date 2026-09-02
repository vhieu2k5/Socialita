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
  const [coverImage, setCoverImage] = useState<string | null>(null);

  if (!isCreatePostModalOpen) return null;

  const gradientOptions = [
    { label: 'Đỏ Đen Socialita', val: 'linear-gradient(180deg, #18191a 0%, #242526 50%, #7a1d26 100%)' },
    { label: 'Xanh Đêm', val: 'linear-gradient(135deg, #2b2d3d 0%, #1c1d2b 100%)' },
    { label: 'Ngọc Lục', val: 'linear-gradient(135deg, #1b4b43 0%, #0d2924 100%)' },
    { label: 'Tím Hoàng Hôn', val: 'linear-gradient(135deg, #4a1d4b 0%, #1f0d29 100%)' },
    { label: 'Cam Rực Rỡ', val: 'linear-gradient(135deg, #ea580c 0%, #7c2d12 100%)' },
  ];

  // Xử lý khi người dùng chọn ảnh từ máy tính
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCoverImage(imageUrl);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    // Nếu có ảnh tải lên thì dùng ảnh, nếu không thì dùng màu gradient:
    const finalCover = coverImage ? `url(${coverImage}) center/cover no-repeat` : selectedGradient;
    
    createPost(content, location, finalCover, category);
    setContent('');
    setLocation('');
    setCoverImage(null);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <h3>Tạo bài viết mới</h3>
          <button type="button" className="btn-close-modal" onClick={closeCreatePostModal}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          {/* Tác giả & Quyền riêng tư */}
          <div className="modal-user-row">
            <div className="avatar-circle" style={{ backgroundColor: user.avatarBg || '#35c9b0' }}>
              {user.name ? user.name[0].toUpperCase() : 'U'}
            </div>
            <div>
              <div className="author-name">{user.name}</div>
              <div className="privacy-badge">🌐 Công khai</div>
            </div>
          </div>

          {/* Ô nhập nội dung bài viết */}
          <div className="form-group">
            <textarea
              className="post-textarea"
              placeholder={`${user.name} ơi, bạn đang nghĩ gì thế?`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          {/* Địa điểm check-in */}
          <div className="form-group">
            <label>📍 Địa điểm check-in</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ví dụ: Đà Lạt, Sài Gòn, Trường UEH..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          {/* Chọn thể loại */}
          <div className="form-group">
            <label>🏷️ Chọn thể loại bảng tin</label>
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

          {/* Tùy chọn Ảnh bìa & Phông nền */}
          <div className="form-group">
            <label>🎨 Ảnh bìa & Phông nền</label>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', marginTop: '6px' }}>
              {/* Nút bấm tải ảnh từ máy tính */}
              <label className="btn-upload-cover">
                <span>📷 Tải ảnh bìa lên</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload} 
                  style={{ display: 'none' }} 
                />
              </label>

              {/* Hoặc chọn phông màu Gradient */}
              <div className="gradient-picker">
                {gradientOptions.map(g => (
                  <div
                    key={g.val}
                    className={`gradient-option ${!coverImage && selectedGradient === g.val ? 'selected' : ''}`}
                    style={{ background: g.val }}
                    onClick={() => {
                      setSelectedGradient(g.val);
                      setCoverImage(null); // Bỏ ảnh tải lên nếu chọn gradient
                    }}
                    title={g.label}
                  />
                ))}
              </div>
            </div>

            {/* Khung xem trước ảnh tải lên nếu có */}
            {coverImage && (
              <div style={{ position: 'relative', marginTop: '10px', borderRadius: '10px', overflow: 'hidden', height: '100px' }}>
                <img src={coverImage} alt="Cover preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <button
                  type="button"
                  onClick={() => setCoverImage(null)}
                  style={{
                    position: 'absolute',
                    top: '6px',
                    right: '6px',
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    color: '#ffffff',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    fontSize: '12px'
                  }}
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          {/* Nút Hủy & Đăng bài */}
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