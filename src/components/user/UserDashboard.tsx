import React from 'react';
import { useSocial } from '../../context/SocialContext';
import { Sidebar } from './layout/Sidebar';
import { Topbar } from './layout/Topbar';
import { HomeView } from './home/HomeView';
import { FeedView } from './feed/FeedView';
import { ProfileView } from './profile/ProfileView';
import { FriendsView } from './friends/FriendsView';
import { GroupsView } from './groups/GroupsView';
import { CreatePostModal } from './modals/CreatePostModal';
import { EditProfileModal } from './modals/EditProfileModal';

export const UserDashboard: React.FC = () => {
  const { tab } = useSocial();

  return (
    <div className="socialita-app">
      {/* Sidebar của User */}
      <Sidebar />

      {/* Khung nội dung chính */}
      <div className="main-wrapper" id="main-wrapper">
        <Topbar />

        <main className="content-container">
          {tab === 'home' && <HomeView />}
          {tab === 'feed' && <FeedView />}
          {tab === 'profile' && <ProfileView />}
          {tab === 'friends' && <FriendsView />}
          {tab === 'groups' && <GroupsView />}
        </main>
      </div>

      {/* Các Modals của User */}
      <CreatePostModal />
      <EditProfileModal />
    </div>
  );
};
