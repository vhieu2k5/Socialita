import React from 'react';
import { useSocial } from './context/SocialContext';
import { ToastContainer } from './components/ui/Toast';
import './App.css';
import { AuthPage } from './pages/AuthPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { Sidebar } from './components/layout/Sidebar';
import { Topbar } from './components/layout/Topbar';
import { HomeView } from './pages/HomeView';
import { FeedView } from './pages/FeedView';
import { ProfileView } from './pages/ProfileView';
import { FriendsView } from './pages/FriendsView';
import { GroupsView } from './pages/GroupsView';
import { CreatePostModal } from './components/modals/CreatePostModal';
import { EditProfileModal } from './components/modals/EditProfileModal';
import { ChatBox } from './components/chat/ChatBox';

export const App = () => {
  const { currentUser, tab, closeDrawers } = useSocial();

  // 1. Chưa đăng nhập: Màn hình Auth
  if (!currentUser) {
    return (
      <>
        <AuthPage />
        <ToastContainer />
      </>
    );
  }

  // 2. Tài khoản vai trò Admin: Admin Dashboard
  if (currentUser.role === 'admin') {
    return (
      <>
        <AdminDashboard />
        <ToastContainer />
      </>
    );
  }

  // 3. Người dùng bình thường: User Dashboard
  return (
    <>
      <div className="socialita-app" onClick={closeDrawers}>
        <Sidebar />
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

        <CreatePostModal />
        <EditProfileModal />

        {/* Hộp chat nổi góc dưới bên phải chuẩn Facebook Messenger Web */}
        <ChatBox />
      </div>
      <ToastContainer />
    </>
  );
};

export default App;
