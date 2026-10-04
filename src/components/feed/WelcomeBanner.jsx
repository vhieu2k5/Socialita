import React from 'react';
import { useSocial } from '../../context/SocialContext';

export const WelcomeBanner = () => {
  const { user } = useSocial();

  return (
    <div className="welcome-banner">
      <div>
        <div className="banner-date">THỨ BẢY, 22/08</div>
        <h2 className="banner-title">Chào buổi sáng, {user.name} 👋</h2>
        <p className="banner-sub">
          Cộng đồng của bạn vừa có <span style={{ color: 'var(--brand-red)', fontWeight: 700 }}>47 hoạt động</span> mới trong hôm nay.
        </p>
      </div>

      <div className="banner-stats">
        <div className="stat-item">
          <div className="num user-friends-stat">{user.stats?.friends || 128}</div>
          <div className="label">Bạn bè</div>
        </div>
        <div className="stat-item">
          <div className="num">{user.stats?.groups || 9}</div>
          <div className="label">Hội nhóm</div>
        </div>
        <div className="stat-item">
          <div className="num">312</div>
          <div className="label">Lượt thích tuần này</div>
        </div>
      </div>
    </div>
  );
};
