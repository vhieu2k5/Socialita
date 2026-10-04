import React from 'react';
import { useSocial } from '../../context/SocialContext';

export const StoryRail = () => {
  const { stories, addStory, showToast } = useSocial();

  return (
    <div className="story-rail">
      {stories.map(story => {
        if (story.isUser) {
          return (
            <div key={story.id} className="story-item" onClick={addStory}>
              <div className="story-avatar-box user-add">
                <span style={{ fontSize: '20px' }}>+</span>
              </div>
              <span className="story-name">Tạo tin</span>
            </div>
          );
        }

        return (
          <div
            key={story.id}
            className="story-item"
            onClick={() => showToast(`Xem tin của ${story.userName}`)}
          >
            <div
              className="story-avatar-box"
              style={{ borderColor: story.seen ? '#636366' : 'var(--brand-red)' }}
            >
              <div
                className="avatar-circle-sm"
                style={{ backgroundColor: story.avatarBg || '#e52e3d', color: '#fff' }}
              >
                {story.userName[0]}
              </div>
            </div>
            <span className="story-name">{story.userName}</span>
          </div>
        );
      })}
    </div>
  );
};
