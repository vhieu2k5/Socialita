import React, { useState } from 'react';
import { useSocial } from '../../context/SocialContext';

const GRADIENT_PRESETS = [
  'linear-gradient(180deg, #18191a 0%, #242526 50%, #7a1d26 100%)',
  'linear-gradient(135deg, #1c1d2b 0%, #2b2d3d 50%, #85222b 100%)',
  'linear-gradient(135deg, #1a2a3a 0%, #0c141c 100%)',
  'linear-gradient(135deg, #2a1a3a 0%, #140c1c 100%)',
  'linear-gradient(135deg, #1a3a2a 0%, #0c1c14 100%)'
];

export const CreatePostModal: React.FC = () => {
  const { isCreatePostModalOpen, closeCreatePostModal, createPost, user } = useSocial();

  const [content, setContent] = useState('');
  const [location, setLocation] = useState('');
  const [selectedGradient, setSelectedGradient] = useState(GRADIENT_PRESETS[0]);
  const [hasMedia, setHasMedia] = useState(true);

  if (!isCreatePostModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    createPost(content, location || undefined, hasMedia ? selectedGradient : undefined);
    setContent('');
    setLocation('');
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
      <div className="w-[500px] max-w-[94vw] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="p-4 px-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-extrabold text-base text-[#18181c]">
            Tạo bài viết mới
          </h3>
          <button
            onClick={closeCreatePostModal}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center cursor-pointer border-0 text-sm transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* User Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#35c9b0] text-white flex items-center justify-center font-bold text-sm shadow-sm">
              Avt
            </div>
            <div>
              <div className="font-bold text-sm text-[#18181c]">{user.name}</div>
              <div className="text-[11.5px] text-[#8e8e93] font-medium flex items-center gap-1">
                <span>🌐 Công khai</span>
              </div>
            </div>
          </div>

          {/* Text Area */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Bạn đang nghĩ gì thế? Hãy chia sẻ với bạn bè..."
            rows={3}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-sm text-[#18181c] placeholder-gray-400 focus:outline-none focus:border-[#e52e3d] focus:bg-white resize-none"
            autoFocus
          />

          {/* Location Input */}
          <div className="relative">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="📍 Thêm vị trí (ví dụ: Đà Lạt, Lâm Đồng)"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3.5 text-xs text-[#18181c] focus:outline-none focus:border-[#e52e3d]"
            />
          </div>

          {/* Media Gradient Selector */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-gray-700">Màu nền Banner:</span>
              <label className="flex items-center gap-1.5 text-xs text-gray-500 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasMedia}
                  onChange={(e) => setHasMedia(e.target.checked)}
                  className="rounded text-[#e52e3d] focus:ring-[#e52e3d]"
                />
                <span>Kèm hình nền</span>
              </label>
            </div>

            {hasMedia && (
              <div className="flex gap-2">
                {GRADIENT_PRESETS.map((grad, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedGradient(grad)}
                    className={`h-10 flex-1 rounded-lg cursor-pointer transition-all border-2 ${
                      selectedGradient === grad
                        ? 'border-[#e52e3d] scale-105 shadow-sm'
                        : 'border-transparent opacity-80 hover:opacity-100'
                    }`}
                    style={{ background: grad }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Post Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={!content.trim()}
              className="w-full py-3 px-4 rounded-xl font-extrabold text-sm text-white bg-[#e52e3d] hover:bg-[#d32735] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-[0_4px_14px_rgba(229,46,61,0.35)] cursor-pointer border-0"
            >
              Đăng bài viết
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
