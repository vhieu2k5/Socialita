import React, { useState } from 'react';
import { useSocial } from '../../../context/SocialContext';

export const EditProfileModal: React.FC = () => {
  const { isEditProfileModalOpen, closeEditProfileModal, user, updateUser } = useSocial();

  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);
  const [school, setSchool] = useState(user.intro.school);
  const [liveIn, setLiveIn] = useState(user.intro.liveIn);

  if (!isEditProfileModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name,
      bio,
      intro: {
        ...user.intro,
        school,
        liveIn
      }
    });
    closeEditProfileModal();
  };

  return (
    <div className="modal-overlay open">
      <div className="modal-card">
        <div className="modal-header">
          <h3>Chỉnh sửa trang cá nhân</h3>
          <button className="btn-close-modal" onClick={closeEditProfileModal}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group">
            <label>Họ và tên</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Tiểu sử (Bio)</label>
            <textarea
              className="post-textarea"
              style={{ minHeight: '80px' }}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Trường học / Học vấn</label>
            <input
              type="text"
              className="form-control"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Nơi sống / Tỉnh thành</label>
            <input
              type="text"
              className="form-control"
              value={liveIn}
              onChange={(e) => setLiveIn(e.target.value)}
            />
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={closeEditProfileModal}>
              Hủy
            </button>
            <button type="submit" className="btn-submit">
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
