import React from 'react';
import { useSocial } from './context/SocialContext';
import { ToastContainer } from './components/ui/Toast';
import './App.css';
import { AuthPage } from './components/auth/AuthPage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { UserDashboard } from './components/user/UserDashboard';

export const App: React.FC = () => {
  const { currentUser } = useSocial();

  if (!currentUser) {
    return (
      <>
        <AuthPage />
        <ToastContainer />
      </>
    );
  }

  if(currentUser.role === 'admin') {
    return (
      <>
        <AdminDashboard />
        <ToastContainer />
      </>
    );
  }

  return (
    <>
      <UserDashboard />
      <ToastContainer />
    </>
  );
};

export default App;
