import React from 'react';
import { useSocial } from '../../context/SocialContext';

export const StoryRail = () => {
  const { stories, addStory, showToast } = useSocial();

  return (
    <div className="story-rail">
      <div className="story-item" onClick={addStory}>
        <div className="story-circle-add">
          <div className="story-circle-add-inner">+</div>
        </div>
        <span className="story-name">Story của bạn</span>
      </div>

      {stories.filter(s => !s.isUser).map(story => (
        <div
          key={story.id}
          className="story-item"
          onClick={() => showToast('Đang xem story của ' + story.userName)}
        >
          <div className="story-circle-ring">
            <div className="story-circle-avatar">
              {story.userName[0]}
            </div>
          </div>
          <span className="story-name">{story.userName}</span>
        </div>
      ))}
    </div>
  );
};
