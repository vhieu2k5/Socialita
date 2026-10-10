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
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef(null);

  if (!isCreatePostModalOpen) return null;

  const gradientOptions = [
    { label: 'Đỏ Đen Socialita', val: 'linear-gradient(180deg, #18191a 0%, #242526 50%, #7a1d26 100%)' },
    { label: 'Xanh Đêm', val: 'linear-gradient(135deg, #2b2d3d 0%, #1c1d2b 100%)' },
    { label: 'Ngọc Lục', val: 'linear-gradient(135deg, #1b4b43 0%, #0d2924 100%)' },
    { label: 'Tím Hoàng Hôn', val: 'linear-gradient(135deg, #4a1d4b 0%, #1f0d29 100%)' },
  ];

  const handleFilesChange = (e) => {
    const chosenFiles = Array.from(e.target.files || []);
    if (chosenFiles.length === 0) return;

    // Giới hạn tối đa 10 file
    const combinedFiles = [...selectedFiles, ...chosenFiles].slice(0, 10);
    setSelectedFiles(combinedFiles);

    // Thu hồi các URL preview cũ
    previews.forEach((p) => URL.revokeObjectURL(p.url));

    const newPreviews = combinedFiles.map((file, idx) => ({
      id: `${file.name}-${file.lastModified}-${idx}`,
      file,
      url: URL.createObjectURL(file),
      isVideo: file.type?.startsWith('video')
    }));
    setPreviews(newPreviews);

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemoveOneFile = (index) => {
    const target = previews[index];
    if (target) URL.revokeObjectURL(target.url);

    const updatedFiles = selectedFiles.filter((_, idx) => idx !== index);
    const updatedPreviews = previews.filter((_, idx) => idx !== index);
    setSelectedFiles(updatedFiles);
    setPreviews(updatedPreviews);
  };

  const handleClearAllFiles = () => {
    previews.forEach((p) => URL.revokeObjectURL(p.url));
    setSelectedFiles([]);
    setPreviews([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() && selectedFiles.length === 0) return;

    setIsSubmitting(true);
    try {
      await createPost({
        content,
        location,
        gradient: selectedGradient,
        category,
        files: selectedFiles
      });
      setContent('');
      setLocation('');
      handleClearAllFiles();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay open">
      <div className="modal-card" style={{ maxWidth: '520px' }}>
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
              required={selectedFiles.length === 0}
            />
          </div>

          {/* Khung tải lên và xem trước Media (Nhiều ảnh hoặc video) */}
          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '13px', fontWeight: '600' }}>
                Thêm ảnh hoặc video {selectedFiles.length > 0 && `(${selectedFiles.length}/10 ảnh)`}
              </span>
              {selectedFiles.length > 0 && (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}
                  >
                    + Thêm ảnh
                  </button>
                  <button
                    type="button"
                    onClick={handleClearAllFiles}
                    style={{ background: 'none', border: 'none', color: 'var(--brand-red)', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}
                  >
                    Gỡ tất cả
                  </button>
                </div>
              )}
            </div>

            {previews.length > 0 ? (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: previews.length === 1 ? '1fr' : 'repeat(auto-fill, minmax(110px, 1fr))',
                  gap: '8px',
                  maxHeight: '280px',
                  overflowY: 'auto',
                  padding: '8px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0'
                }}
              >
                {previews.map((p, idx) => (
                  <div
                    key={p.id}
                    style={{
                      position: 'relative',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      height: previews.length === 1 ? '220px' : '110px',
                      backgroundColor: '#000',
                      border: '1px solid #cbd5e1'
                    }}
                  >
                    {p.isVideo ? (
                      <video src={p.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <img src={p.url} alt={`Ảnh ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    )}

                    {/* Số thứ tự ảnh */}
                    <span
                      style={{
                        position: 'absolute',
                        left: '6px',
                        bottom: '6px',
                        backgroundColor: 'rgba(0, 0, 0, 0.65)',
                        color: '#fff',
                        fontSize: '10px',
                        fontWeight: '700',
                        padding: '2px 6px',
                        borderRadius: '4px'
                      }}
                    >
                      {idx + 1}
                    </span>

                    {/* Nút xóa ảnh này */}
                    <button
                      type="button"
                      onClick={() => handleRemoveOneFile(idx)}
                      title="Gỡ ảnh này"
                      style={{
                        position: 'absolute',
                        top: '5px',
                        right: '5px',
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(0, 0, 0, 0.65)',
                        border: 'none',
                        color: '#ffffff',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background-color 0.15s ease'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#ef4444')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.65)')}
                    >
                      ✕
                    </button>
                  </div>
                ))}

                {/* Thẻ thêm ảnh nhanh trong lưới */}
                {previews.length < 10 && (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      borderRadius: '8px',
                      border: '2px dashed #cbd5e1',
                      height: previews.length === 1 ? '70px' : '110px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      backgroundColor: '#ffffff',
                      color: '#64748b',
                      fontSize: '12px',
                      fontWeight: '500',
                      gap: '4px',
                      transition: 'border-color 0.2s'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#3b82f6')}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#cbd5e1')}
                  >
                    <span style={{ fontSize: '18px' }}>+</span>
                    <span>Thêm ảnh</span>
                  </div>
                )}
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                style={{
                  border: '2px dashed #cbd5e1',
                  borderRadius: '10px',
                  padding: '20px 16px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  backgroundColor: '#f8fafc',
                  color: '#64748b',
                  fontSize: '13px',
                  transition: 'border-color 0.2s'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#3b82f6')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#cbd5e1')}
              >
                <div style={{ fontSize: '24px', marginBottom: '6px' }}>📸</div>
                <span style={{ fontWeight: '600', color: '#1e293b' }}>Bấm để chọn nhiều ảnh hoặc video</span>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>
                  Có thể giữ phím Ctrl/Shift để chọn nhiều ảnh cùng lúc (tối đa 10 ảnh)
                </div>
              </div>
            )}

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*,video/*"
              multiple
              style={{ display: 'none' }}
              onChange={handleFilesChange}
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

          {selectedFiles.length === 0 && (
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
            <button
              type="submit"
              className="btn-submit"
              disabled={isSubmitting || (!content.trim() && selectedFiles.length === 0)}
            >
              {isSubmitting ? 'Đang đăng bài...' : 'Đăng bài'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
