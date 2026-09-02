import React from 'react';
import { useSocial } from '../../../context/SocialContext';

export const WelcomeBanner: React.FC = () => {
  const { user } = useSocial();

  return (
    <div className="welcome-banner">
      <div>
        <div className="banner-date">HÔM NAY CÓ GÌ MỚI?</div>
        <h2 className="banner-title">
          Chào buổi sáng, {user.name} 👋
        </h2>
        <p className="banner-sub">
          Thứ bảy, 24 Tháng 8 · Khám phá những câu chuyện thú vị từ bạn bè của bạn hôm nay.
        </p>
      </div>

      <div className="banner-stats">
        <div className="stat-item">
          <div className="num">{user.stats.posts}</div>
          <div className="label">Bài viết</div>
        </div>
        <div className="stat-item">
          <div className="num">{user.stats.friends}</div>
          <div className="label">Bạn bè</div>
        </div>
        <div className="stat-item">
          <div className="num">+24</div>
          <div className="label">Lượt thích tuần này</div>
        </div>
      </div>
    </div>
  );
};
