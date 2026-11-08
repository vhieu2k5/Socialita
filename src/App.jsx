import React, { useState } from 'react';
import { useSocial } from './context/SocialContext';
import { ToastContainer } from './components/ui/Toast';
import './App.css';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { CustomCursor } from './components/ui/CustomCursor';
import { LandingPage } from './pages/LandingPage';
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
import { AnimatePresence, motion } from 'framer-motion';

// Reusable transition wrapper for all main UI pages
const PageTransition = ({ children, pageKey }) => (
  <motion.div
    key={pageKey}
    initial={{ opacity: 0, y: 15, scale: 0.99 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -15, scale: 0.99 }}
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    style={{ height: '100%', display: 'flex', flexDirection: 'column', flex: 1 }}
  >
    {children}
  </motion.div>
);

export const App = () => {
  const { currentUser, tab, closeDrawers } = useSocial();
  const [loading, setLoading] = useState(true);
  const [enteredSite, setEnteredSite] = useState(false);

  // Loading screen on startup
  if (loading) {
    return (
      <>
        <CustomCursor />
        <LoadingScreen onDone={() => setLoading(false)} />
      </>
    );
  }

  // Landing page before auth
  if (!currentUser && !enteredSite) {
    return (
      <>
        <CustomCursor />
        <AnimatePresence mode="wait">
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <LandingPage
              onEnter={() => setEnteredSite(true)}
              onAbout={() => {}}
            />
          </motion.div>
        </AnimatePresence>
        <ToastContainer />
      </>
    );
  }

  // 1. Not logged in: Auth screen
  if (!currentUser) {
    return (
      <>
        <CustomCursor />
        <AnimatePresence mode="wait">
          <PageTransition pageKey="auth">
            <AuthPage />
          </PageTransition>
        </AnimatePresence>
        <ToastContainer />
      </>
    );
  }

  // 2. Admin role (No page transition animations requested for Admin)
  if (currentUser.role === 'admin') {
    return (
      <>
        <CustomCursor />
        <AdminDashboard />
        <ToastContainer />
      </>
    );
  }

  // 3. Normal user dashboard
  return (
    <>
      <CustomCursor />
      <div className="socialita-app" onClick={closeDrawers}>
        <Sidebar />
        <div className="main-wrapper" id="main-wrapper">
          <Topbar />
          <main className="content-container">
            <AnimatePresence mode="wait">
              {tab === 'home'    && <PageTransition pageKey="home"><HomeView /></PageTransition>}
              {tab === 'feed'    && <PageTransition pageKey="feed"><FeedView /></PageTransition>}
              {tab === 'profile' && <PageTransition pageKey="profile"><ProfileView /></PageTransition>}
              {tab === 'friends' && <PageTransition pageKey="friends"><FriendsView /></PageTransition>}
              {tab === 'groups'  && <PageTransition pageKey="groups"><GroupsView /></PageTransition>}
            </AnimatePresence>
          </main>
        </div>

        <CreatePostModal />
        <EditProfileModal />

        {/* Floating chat box */}
        <ChatBox />
      </div>
      <ToastContainer />
    </>
  );
};

export default App;
