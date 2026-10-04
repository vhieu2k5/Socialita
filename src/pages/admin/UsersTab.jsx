import React, { useState } from 'react';
import { useSocial } from '../../context/SocialContext';
import { UserDetailDrawer } from '../../components/modals/UserDetailDrawer';
import { LockUserModal } from '../../components/modals/LockUserModal';
import { DeleteUserModal } from '../../components/modals/DeleteUserModal';

export const UsersTab = () => {
  const { showToast } = useSocial();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [userToLock, setUserToLock] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);

  const [users, setUsers] = useState([
    { id: '1', name: 'Minh Anh Lê', email: 'minhanh.le@gmail.com', joinedDate: '03/2024', postsCount: 86, status: 'Hoạt động', location: 'Sài Gòn', avatarBg: '#35c9b0' },
    { id: '2', name: 'Quang Huy', email: 'quanghuy92@gmail.com', joinedDate: '07/2024', postsCount: 142, status: 'Hoạt động', location: 'Hà Nội', avatarBg: '#3b82f6' },
    { id: '3', name: 'fake_account_02', email: 'fakeacc02@mail.com', joinedDate: '01/2025', postsCount: 9, status: 'Đã khóa', location: 'Không rõ', avatarBg: '#9ca3af' }
  ]);

  const handleConfirmLock = (reason, note) => {
    if (!userToLock) return;
    setUsers(prev => prev.map(u => u.id === userToLock.id ? { ...u, status: u.status === 'Đã khóa' ? 'Hoạt động' : 'Đã khóa' } : u));
    showToast(`Đã khóa tài khoản ${userToLock.name}`, 'info');
    setUserToLock(null);
  };

  const handleConfirmDelete = () => {
    if (!userToDelete) return;
    setUsers(prev => prev.filter(u => u.id !== userToDelete.id));
    showToast(`Đã xóa tài khoản ${userToDelete.name}`, 'error');
    setUserToDelete(null);
  };

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 style={{ fontSize: '28px', fontWeight: 900, color: 'var(--text-dark)', marginBottom: '20px' }}>
        QUẢN LÝ NGƯỜI DÙNG
      </h1>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          className="search-input"
          style={{ width: '320px', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e5e7eb' }}
          placeholder="Tìm kiếm người dùng theo tên hoặc email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="widget-card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb', color: '#6b7280', fontSize: '11px', textTransform: 'uppercase' }}>
              <th style={{ padding: '14px 20px' }}>NGƯỜI DÙNG</th>
              <th style={{ padding: '14px 20px' }}>EMAIL</th>
              <th style={{ padding: '14px 20px' }}>TRẠNG THÁI</th>
              <th style={{ padding: '14px 20px', textAlign: 'right' }}>THAO TÁC</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(u => (
              <tr key={u.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '14px 20px', fontWeight: 700 }}>{u.name}</td>
                <td style={{ padding: '14px 20px', color: '#6b7280' }}>{u.email}</td>
                <td style={{ padding: '14px 20px' }}>
                  <span style={{
                    padding: '3px 10px',
                    borderRadius: '9999px',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    backgroundColor: u.status === 'Hoạt động' ? '#dcfce7' : '#fee2e2',
                    color: u.status === 'Hoạt động' ? '#16a34a' : 'var(--brand-red)'
                  }}>
                    {u.status}
                  </span>
                </td>
                <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: '8px' }}>
                    <button onClick={() => setSelectedUser(u)} style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer' }}>👁️</button>
                    <button onClick={() => setUserToLock(u)} style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer' }}>🔒</button>
                    <button onClick={() => setUserToDelete(u)} style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #fee2e2', background: '#fff1f2', color: 'red', cursor: 'pointer' }}>🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <UserDetailDrawer
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
        onToggleLock={(id) => { setUserToLock(selectedUser); setSelectedUser(null); }}
        onDeleteUser={(id) => { setUserToDelete(selectedUser); setSelectedUser(null); }}
      />
      <LockUserModal
        isOpen={!!userToLock}
        userName={userToLock?.name || ''}
        onClose={() => setUserToLock(null)}
        onConfirm={handleConfirmLock}
      />
      <DeleteUserModal
        isOpen={!!userToDelete}
        userName={userToDelete?.name || ''}
        onClose={() => setUserToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};
