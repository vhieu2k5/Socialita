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

export const App = () => {
  const { currentUser, tab } = useSocial();

  // 1. Nếu chưa đăng nhập: Hiện trang Đăng nhập / Đăng ký
  if (!currentUser) {
    return (
      <>
        <AuthPage />
        <ToastContainer />
      </>
    );
  }

  // 2. Nếu đăng nhập tài khoản vai trò Admin: Hiện Admin Dashboard
  if (currentUser.role === 'admin') {
    return (
      <>
        <AdminDashboard />
        <ToastContainer />
      </>
    );
  }

  // 3. Nếu là người dùng thường: Hiện Giao diện Mạng xã hội User
  return (
    <>
      <div className="socialita-app">
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
      </div>
      <ToastContainer />
    </>
  );
};

export default App;
