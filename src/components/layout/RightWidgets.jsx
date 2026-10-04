import React from 'react';
import { useSocial } from '../../context/SocialContext';

export const RightWidgets = ({ showLogo = true }) => {
  const { trends, friendSuggestions, sendRequest, setTab } = useSocial();

  return (
    <div className="right-widgets">
      {/* Decorative Logo with logo.png */}
      {showLogo && (
        <div style={{ textAlign: 'center', padding: '10px 0' }}>
          <img
            src="/logo.png"
            alt="Socialita Logo"
            style={{
              width: '84px',
              height: '84px',
              objectFit: 'contain',
              filter: 'drop-shadow(0 8px 16px rgba(229,46,61,0.3))'
            }}
          />
        </div>
      )}

      {/* Xu hướng Card */}
      <div className="widget-card">
        <h3 className="widget-card-title">Xu hướng</h3>
        {trends.map(t => (
          <div key={t.id} className="trending-item">
            <span className="rank">{t.rank}</span>
            <div>
              <div className="tag">{t.tag}</div>
              <div className="count">{t.postCount}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Gợi ý kết bạn Card */}
      <div className="widget-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <h3 className="widget-card-title" style={{ marginBottom: 0 }}>Gợi ý kết bạn</h3>
          <button
            style={{ fontSize: '12px', fontWeight: 700, color: 'var(--brand-red)', background: 'none', border: 'none', cursor: 'pointer' }}
            onClick={() => setTab('friends')}
          >
            Xem tất cả
          </button>
        </div>

        <div>
          {friendSuggestions.map(s => (
            <div key={s.id} className="suggestion-item">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div className="avatar-circle" style={{ background: s.avatarBg || '#ff7675', width: '36px', height: '36px', fontSize: '12px' }}>
                  {s.name[0]}
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700 }}>{s.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-light-gray)' }}>{s.mutualFriends || 0} bạn chung</div>
                </div>
              </div>
              <button
                className="btn-add-friend"
                onClick={() => sendRequest(s.id)}
                disabled={s.requested}
              >
                {s.requested ? 'Đã gửi' : 'Kết bạn'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
