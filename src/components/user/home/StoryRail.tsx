import React from 'react';
import { useSocial } from '../../../context/SocialContext';

export const StoryRail: React.FC = () => {
  const { stories, addStory, showToast } = useSocial();

  return (
    <div className="story-rail">
      {stories.map(s => {
        if (s.isUser) {
          return (
            <div key={s.id} className="story-item" onClick={addStory}>
              <div className="story-circle-add">
                <div className="story-circle-add-inner">+</div>
              </div>
              <span className="story-name">Story của bạn</span>
            </div>
          );
        }

        return (
          <div
            key={s.id}
            className="story-item"
            onClick={() => showToast(`Xem story của ${s.userName}`)}
          >
            <div className="story-circle-ring">
              <div className="story-circle-avatar" style={{ backgroundColor: s.avatarBg || '#e52e3d' }}>
                {s.userName[0]}
              </div>
            </div>
            <span className="story-name">{s.userName}</span>
          </div>
        );
      })}
    </div>
  );
};
