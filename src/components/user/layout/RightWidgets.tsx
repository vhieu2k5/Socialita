import React from 'react';
import { useSocial } from '../../../context/SocialContext';
import { Logo } from '../../ui/Logo';

export const RightWidgets: React.FC = () => {
  const { trends, friendSuggestions, sendRequest } = useSocial();

  return (
    <aside className="right-widgets">
      {/* 3D Pixel Logo Visual Card */}
      <div className="logo-card-container">
        <Logo size="lg" />
      </div>

      {/* Trending Topics Widget */}
      <div className="widget-card">
        <h3 className="widget-card-title">Chủ đề thịnh hành</h3>
        <div className="trending-list">
          {trends.map(t => (
            <div key={t.id} className="trending-item">
              <span className="trending-rank">{t.rank}</span>
              <div>
                <div className="trending-tag">{t.tag}</div>
                <div className="trending-posts-count">{t.postCount}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Friend Suggestions Widget */}
      <div className="widget-card">
        <h3 className="widget-card-title">Gợi ý kết bạn</h3>
        <div className="suggestion-list">
          {friendSuggestions.map(s => (
            <div key={s.id} className="suggestion-item">
              <div className="suggestion-user-info">
                <div className="avatar-circle-sm" style={{ backgroundColor: s.avatarBg }}>
                  {s.name[0]}
                </div>
                <div>
                  <div className="suggestion-name">{s.name}</div>
                  <div className="mutual-count">{s.mutualFriends} bạn chung</div>
                </div>
              </div>

              <button
                className={`btn-add-friend ${s.requested ? 'requested' : ''}`}
                onClick={() => sendRequest(s.id)}
                disabled={s.requested}
              >
                {s.requested ? 'Đã gửi' : 'Kết bạn'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
