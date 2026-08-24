import React from 'react';
import { useSocial } from './context/SocialContext';
import { Sidebar } from './components/layout/Sidebar';
import { Topbar } from './components/layout/Topbar';
import { HomeView } from './components/home/HomeView';
import { FeedView } from './components/feed/FeedView';
import { ProfileView } from './components/profile/ProfileView';
import { FriendsView } from './components/friends/FriendsView';
import { GroupsView } from './components/groups/GroupsView';
import { CreatePostModal } from './components/modals/CreatePostModal';
import { EditProfileModal } from './components/modals/EditProfileModal';
import { ToastContainer } from './components/ui/Toast';

export const App: React.FC = () => {
  const { tab } = useSocial();

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-[#18181c] flex font-sans antialiased selection:bg-[#e52e3d]/20 selection:text-[#e52e3d]">
      {/* Black Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Sticky Topbar */}
        <Topbar />

        {/* Dynamic Screen View based on Tab Navigation */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {tab === 'home' && <HomeView />}
          {tab === 'feed' && <FeedView />}
          {tab === 'profile' && <ProfileView />}
          {tab === 'friends' && <FriendsView />}
          {tab === 'groups' && <GroupsView />}
        </main>
      </div>

      {/* Modals & Toasts */}
      <CreatePostModal />
      <EditProfileModal />
      <ToastContainer />
    </div>
  );
};
