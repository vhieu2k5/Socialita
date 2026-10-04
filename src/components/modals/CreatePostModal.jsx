import React, { useState, useRef } from 'react';
import { useSocial } from '../../context/SocialContext';
import { getInitials } from '../../utils/formatters';

export const CreatePostModal = () => {
  const {
    isCreatePostModalOpen,
    closeCreatePostModal,
    createPost,
    user
  } = useSocial();

  const [content, setContent] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('all');
  const [selectedGradient, setSelectedGradient] = useState('linear-gradient(180deg, #18191a 0%, #242526 50%, #7a1d26 100%)');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef(null);

  if (!isCreatePostModalOpen) return null;

  const gradientOptions = [
    { label: 'Đỏ Đen Socialita', val: 'linear-gradient(180deg, #18191a 0%, #242526 50%, #7a1d26 100%)' },
    { label: 'Xanh Đêm', val: 'linear-gradient(135deg, #2b2d3d 0%, #1c1d2b 100%)' },
    { label: 'Ngọc Lục', val: 'linear-gradient(135deg, #1b4b43 0%, #0d2924 100%)' },
    { label: 'Tím Hoàng Hôn', val: 'linear-gradient(135deg, #4a1d4b 0%, #1f0d29 100%)' },
  ];

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() && !selectedFile) return;

    setIsSubmitting(true);
    try {
      await createPost({
        content,
        location,
        gradient: selectedGradient,
        category,
        file: selectedFile
      });
      setContent('');
      setLocation('');
      handleRemoveFile();
    } finally {
      setIsSubmitting(false);
    }
  };

  const isVideo = selectedFile?.type?.startsWith('video');

  return (
    <div className="modal-overlay open">
      <div className="modal-card">
        <div className="modal-header">
          <h3>Tạo bài viết</h3>
          <button className="btn-close-modal" onClick={closeCreatePostModal}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div className="modal-user-row">
            <div className="avatar-circle" style={{ backgroundColor: user.avatarBg || '#35c9b0' }}>
              {getInitials(user.name)}
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
              required={!selectedFile}
            />
          </div>

          {/* Khung tải lên và xem trước Media (Ảnh hoặc Video) */}
          <div className="form-group">
            <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Thêm ảnh hoặc video</span>
              {selectedFile && (
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  style={{ background: 'none', border: 'none', color: 'var(--brand-red)', cursor: 'pointer', fontSize: '12px', fontWeight: 700 }}
                >
                  Gỡ bỏ
                </button>
              )}
            </label>

            {previewUrl ? (
              <div style={{ marginTop: '8px', borderRadius: '10px', overflow: 'hidden', position: 'relative', border: '1px solid #e5e7eb' }}>
                {isVideo ? (
                  <video src={previewUrl} controls style={{ width: '100%', maxHeight: '240px', display: 'block' }} />
                ) : (
                  <img src={previewUrl} alt="Preview" style={{ width: '100%', maxHeight: '240px', objectFit: 'cover', display: 'block' }} />
                )}
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                style={{
                  border: '2px dashed #e5e7eb',
                  borderRadius: '10px',
                  padding: '16px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  backgroundColor: '#f9fafb',
                  color: '#6b7280',
                  fontSize: '13px'
                }}
              >
                <span>📷 Bấm để chọn tệp Ảnh hoặc Video từ máy tính</span>
              </div>
            )}

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*,video/*"
              style={{ display: 'none' }}
              onChange={handleFileChange}
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
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">Tất cả mọi người</option>
              <option value="following">Chỉ người đang theo dõi</option>
              <option value="groups">Hội nhóm của tôi</option>
            </select>
          </div>

          {!selectedFile && (
            <div className="form-group">
              <label>Phông nền ảnh bìa (khi không tải ảnh)</label>
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
          )}

          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={closeCreatePostModal} disabled={isSubmitting}>
              Hủy
            </button>
            <button type="submit" className="btn-submit" disabled={isSubmitting}>
              {isSubmitting ? 'Đang đăng bài...' : 'Đăng bài'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
