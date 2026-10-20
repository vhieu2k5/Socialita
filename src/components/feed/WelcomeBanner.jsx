import React from 'react';
import { useSocial } from '../../context/SocialContext';

export const WelcomeBanner = () => {
  const { user, friends, joinedGroups } = useSocial();

  return (
    <div className="welcome-banner">
      <div>
        <div className="banner-date">THỨ BẢY, 22/08</div>
        <h2 className="banner-title">Chào buổi sáng, {user.name} <i class="fa-solid fa-hand"></i></h2>
      </div>

      <div className="banner-stats">
        <div className="stat-item">
          <div className="num user-friends-stat">{friends ? friends.length : (user.stats?.friends ?? 0)}</div>
          <div className="label">Bạn bè</div>
        </div>
        <div className="stat-item">
          <div className="num">{joinedGroups ? joinedGroups.length : 0}</div>
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
