import React from 'react';
import { useSocial } from '../../context/SocialContext';

export const WelcomeBanner = () => {
  const { user } = useSocial();

  return (
    <div className="welcome-banner">
      <div>
        <div className="banner-date">HÔM NAY CÓ GÌ MỚI?</div>
        <h2 className="banner-title">
          Chào buổi sáng, {user.name} 👋
        </h2>
        <p className="banner-sub">
          Khám phá những câu chuyện thú vị từ bạn bè và hội nhóm của bạn hôm nay.
        </p>
      </div>

      <div className="banner-stats">
        <div className="stat-item">
          <div className="num">{user.stats?.posts || 0}</div>
          <div className="label">Bài viết</div>
        </div>
        <div className="stat-item">
          <div className="num">{user.stats?.friends || 0}</div>
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
