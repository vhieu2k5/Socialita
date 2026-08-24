import React, { useState } from 'react';
import { useSocial } from '../../context/SocialContext';

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
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
      <div className="w-[480px] max-w-[94vw] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="p-4 px-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-extrabold text-base text-[#18181c]">
            Chỉnh sửa trang cá nhân
          </h3>
          <button
            onClick={closeEditProfileModal}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center cursor-pointer border-0 text-sm transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Họ và tên
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3.5 text-sm text-[#18181c] focus:outline-none focus:border-[#e52e3d]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Tiểu sử (Bio)
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={2}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3.5 text-sm text-[#18181c] focus:outline-none focus:border-[#e52e3d] resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Trường học / Nơi làm việc
            </label>
            <input
              type="text"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3.5 text-sm text-[#18181c] focus:outline-none focus:border-[#e52e3d]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Nơi sinh sống
            </label>
            <input
              type="text"
              value={liveIn}
              onChange={(e) => setLiveIn(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3.5 text-sm text-[#18181c] focus:outline-none focus:border-[#e52e3d]"
            />
          </div>

          <div className="pt-3 flex gap-2.5">
            <button
              type="button"
              onClick={closeEditProfileModal}
              className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors border-0 cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex-[2] py-2.5 px-4 rounded-xl text-xs font-extrabold text-white bg-[#e52e3d] hover:bg-[#d32735] transition-colors border-0 cursor-pointer shadow-md"
            >
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
