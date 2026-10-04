import React, { useState } from 'react';
import { AdminSidebar } from '../components/layout/AdminSidebar';
import { OverviewTab } from './admin/OverviewTab';
import { UsersTab } from './admin/UsersTab';
import { PostsTab } from './admin/PostsTab';

export const AdminDashboard = () => {
  const [currentTab, setCurrentTab] = useState('overview');

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f6f4ee' }}>
      <AdminSidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        usersCountBadge="1.2K"
        postsCountBadge={18}
      />

      <main style={{
        flex: 1,
        padding: '36px 44px',
        overflowY: 'auto',
        height: '100vh',
        maxWidth: '1320px'
      }}>
        {currentTab === 'overview' && <OverviewTab onNavigateTab={setCurrentTab} />}
        {currentTab === 'users' && <UsersTab />}
        {currentTab === 'posts' && <PostsTab />}
      </main>
    </div>
  );
};
