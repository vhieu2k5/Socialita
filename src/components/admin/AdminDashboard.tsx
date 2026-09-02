import React, { useState } from 'react';
import { AdminSidebar, type AdminTabType } from './layout/AdminSidebar';
import { OverviewTab } from './views/OverviewTab';
import { UsersTab } from './views/UsersTab';
import { PostsTab } from './views/PostsTab';

export const AdminDashboard: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<AdminTabType>('overview');

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f6f4ee' }}>
      {/* 1. Sidebar Đen Admin */}
      <AdminSidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        usersCountBadge="1.2K"
        postsCountBadge={18}
      />

      {/* 2. Khung Nội dung Chính Admin */}
      <main style={{
        flex: 1,
        padding: '36px 44px',
        overflowY: 'auto',
        height: '100vh',
        maxWidth: '1280px'
      }}>
        {currentTab === 'overview' && <OverviewTab onNavigateTab={setCurrentTab} />}
        {currentTab === 'users' && <UsersTab />}
        {currentTab === 'posts' && <PostsTab />}
      </main>
    </div>
  );
};
