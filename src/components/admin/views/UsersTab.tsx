import React, { useState } from 'react';
import { useSocial } from '../../../context/SocialContext';
import { UserDetailDrawer, type UserDetailData } from '../modals/UserDetailDrawer';
import { LockUserModal } from '../modals/LockUserModal';
import { DeleteUserModal } from '../modals/DeleteUserModal';

export const UsersTab: React.FC = () => {
  const { showToast } = useSocial();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<UserDetailData | null>(null);

  // Modal State
  const [userToLock, setUserToLock] = useState<UserDetailData | null>(null);
  const [userToDelete, setUserToDelete] = useState<UserDetailData | null>(null);

  const [users, setUsers] = useState<UserDetailData[]>([
    {
      id: 'u-1',
      name: 'Minh Anh Lê',
      email: 'minhanh.le@gmail.com',
      joinedDate: '03/2024',
      postsCount: 86,
      friendsCount: 128,
      violationsCount: 0,
      status: 'Hoạt động',
      location: 'Sài Gòn, Việt Nam',
      emailVerified: true,
      lastLogin: 'Đăng nhập gần nhất: 2 giờ trước',
      avatarBg: '#35c9b0'
    },
    {
      id: 'u-2',
      name: 'Quang Huy',
      email: 'quanghuy92@gmail.com',
      joinedDate: '07/2024',
      postsCount: 142,
      friendsCount: 210,
      violationsCount: 1,
      status: 'Hoạt động',
      location: 'Hà Nội, Việt Nam',
      emailVerified: true,
      lastLogin: 'Đăng nhập gần nhất: 4 giờ trước',
      avatarBg: '#3b82f6'
    },
    {
      id: 'u-3',
      name: 'fake_account_02',
      email: 'fakeacc02@mail.com',
      joinedDate: '01/2025',
      postsCount: 9,
      friendsCount: 14,
      violationsCount: 6,
      status: 'Đã khóa',
      location: 'Không xác định',
      emailVerified: false,
      lastLogin: 'Đăng nhập gần nhất: Hôm qua',
      avatarBg: '#9ca3af'
    },
    {
      id: 'u-4',
      name: 'Hải Yến',
      email: 'haiyen.photo@gmail.com',
      joinedDate: '05/2024',
      postsCount: 63,
      friendsCount: 96,
      violationsCount: 0,
      status: 'Hoạt động',
      location: 'Đà Nẵng, Việt Nam',
      emailVerified: true,
      lastLogin: 'Đăng nhập gần nhất: 1 ngày trước',
      avatarBg: '#a855f7'
    },
    {
      id: 'u-5',
      name: 'Thu Trang',
      email: 'thutrang.spam@mail.com',
      joinedDate: '02/2025',
      postsCount: 21,
      friendsCount: 45,
      violationsCount: 3,
      status: 'Bị báo cáo',
      location: 'Hải Phòng, Việt Nam',
      emailVerified: true,
      lastLogin: 'Đăng nhập gần nhất: 30 phút trước',
      avatarBg: '#ec4899'
    }
  ]);

  const handleOpenLockModal = (user: UserDetailData) => {
    if (user.status === 'Đã khóa') {
      // Mở khóa trực tiếp
      setUsers(prev => prev.map(u => {
        if (u.id === user.id) {
          const updated = { ...u, status: 'Hoạt động' as const };
          if (selectedUser?.id === user.id) setSelectedUser(updated);
          return updated;
        }
        return u;
      }));
      showToast(`Đã mở khóa tài khoản của ${user.name}`);
    } else {
      // Hiện Modal Khóa tài khoản
      setUserToLock(user);
    }
  };

  const handleConfirmLock = (reason: string, note: string) => {
    if (!userToLock) return;
    setUsers(prev => prev.map(u => {
      if (u.id === userToLock.id) {
        const updatedViolations = [
          ...(u.violationsList || []),
          {
            id: `v-${Date.now()}`,
            reason: `Tài khoản bị khóa: ${reason}${note ? ` (${note})` : ''}`,
            dateAndAdmin: `Hôm nay — bởi Admin Thiện`
          }
        ];
        const updated = {
          ...u,
          status: 'Đã khóa' as const,
          violationsCount: u.violationsCount + 1,
          violationsList: updatedViolations
        };
        if (selectedUser?.id === userToLock.id) setSelectedUser(updated);
        return updated;
      }
      return u;
    }));
    showToast(`Đã khóa tài khoản ${userToLock.name} (${reason})`, 'error');
    setUserToLock(null);
  };

  const handleConfirmDelete = () => {
    if (!userToDelete) return;
    setUsers(prev => prev.filter(u => u.id !== userToDelete.id));
    showToast(`Đã xóa vĩnh viễn tài khoản của ${userToDelete.name}`, 'error');
    if (selectedUser?.id === userToDelete.id) setSelectedUser(null);
    setUserToDelete(null);
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (filterStatus === 'active') return u.status === 'Hoạt động';
    if (filterStatus === 'locked') return u.status === 'Đã khóa';
    if (filterStatus === 'reported') return u.status === 'Bị báo cáo';
    return true;
  });

  return (
    <div>
      {/* 1. Header: Tiêu đề + Chuông + Avatar xanh */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 900, color: 'var(--text-dark)', letterSpacing: '0.04em' }}>
          QUẢN LÝ NGƯỜI DÙNG
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button className="icon-btn-white" onClick={() => showToast('Không có thông báo mới')}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '20px', height: '20px' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="red-dot" />
          </button>

          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#38bdf8',
            border: '2px solid rgba(255, 255, 255, 0.8)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }} />
        </div>
      </div>

      {/* 2. Thanh Hướng dẫn Quy trình 5 Bước chuẩn Figma */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        padding: '12px 18px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '11.5px',
        color: '#8e8e93',
        overflowX: 'auto'
      }}>
        <span style={{
          backgroundColor: 'var(--brand-red)',
          color: '#ffffff',
          fontWeight: 700,
          padding: '4px 10px',
          borderRadius: '9999px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <span>1</span> Xem danh sách
        </span>
        <span>➔</span>
        <span>2. Mở chi tiết tài khoản</span>
        <span>➔</span>
        <span>3. Chọn hành động (khóa / xóa)</span>
        <span>➔</span>
        <span>4. Xác nhận & ghi lý do</span>
        <span>➔</span>
        <span>5. Hệ thống cập nhật</span>
      </div>

      {/* 3. Thanh Tìm kiếm & Bộ Lọc Tab */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          
          {/* Ô Tìm kiếm */}
          <div className="search-box" style={{ width: '260px' }}>
            <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm theo tên hoặc email"
            />
          </div>

          {/* Dải nút lọc Tab */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setFilterStatus('all')}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '12.5px',
                fontWeight: 700,
                backgroundColor: filterStatus === 'all' ? '#18181c' : '#ffffff',
                color: filterStatus === 'all' ? '#ffffff' : '#6b7280',
                border: '1px solid #e5e7eb',
                cursor: 'pointer'
              }}
            >
              Tất cả (1.248)
            </button>

            <button
              onClick={() => setFilterStatus('active')}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '12.5px',
                fontWeight: 700,
                backgroundColor: filterStatus === 'active' ? '#18181c' : '#ffffff',
                color: filterStatus === 'active' ? '#ffffff' : '#6b7280',
                border: '1px solid #e5e7eb',
                cursor: 'pointer'
              }}
            >
              Đang hoạt động
            </button>

            <button
              onClick={() => setFilterStatus('locked')}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '12.5px',
                fontWeight: 700,
                backgroundColor: filterStatus === 'locked' ? '#18181c' : '#ffffff',
                color: filterStatus === 'locked' ? '#ffffff' : '#6b7280',
                border: '1px solid #e5e7eb',
                cursor: 'pointer'
              }}
            >
              Đã khóa (12)
            </button>

            <button
              onClick={() => setFilterStatus('reported')}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '12.5px',
                fontWeight: 700,
                backgroundColor: filterStatus === 'reported' ? '#18181c' : '#ffffff',
                color: filterStatus === 'reported' ? '#ffffff' : '#6b7280',
                border: '1px solid #e5e7eb',
                cursor: 'pointer'
              }}
            >
              Bị báo cáo (5)
            </button>
          </div>
        </div>

        {/* Dropdown Sắp xếp */}
        <select style={{
          padding: '6px 14px',
          borderRadius: '8px',
          border: '1px solid #e5e7eb',
          backgroundColor: '#ffffff',
          fontSize: '12.5px',
          fontWeight: 700,
          color: '#374151',
          outline: 'none'
        }}>
          <option>Mới nhất ▾</option>
          <option>Nhiều bài viết nhất</option>
          <option>Nhiều vi phạm nhất</option>
        </select>
      </div>

      {/* 4. Bảng Dữ liệu Người dùng */}
      <div className="widget-card" style={{ padding: 0, overflow: 'hidden', marginBottom: '18px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb', color: '#6b7280', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <th style={{ padding: '14px 20px' }}>NGƯỜI DÙNG</th>
              <th style={{ padding: '14px 20px' }}>NGÀY THAM GIA</th>
              <th style={{ padding: '14px 20px' }}>BÀI VIẾT</th>
              <th style={{ padding: '14px 20px' }}>VI PHẠM</th>
              <th style={{ padding: '14px 20px' }}>TRẠNG THÁI</th>
              <th style={{ padding: '14px 20px', textAlign: 'right' }}>THAO TÁC</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr
                key={user.id}
                style={{ borderBottom: '1px solid #f3f4f6', cursor: 'pointer' }}
                onClick={() => setSelectedUser(user)}
              >
                {/* Cột 1: Người dùng */}
                <td style={{ padding: '14px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: user.avatarBg || '#e5e7eb',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '13px',
                      flexShrink: 0
                    }}>
                      {user.name[0]}
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, color: 'var(--text-dark)' }}>{user.name}</div>
                      <div style={{ fontSize: '11.5px', color: 'var(--text-light-gray)' }}>{user.email}</div>
                    </div>
                  </div>
                </td>

                {/* Cột 2: Ngày tham gia */}
                <td style={{ padding: '14px 20px', color: '#6b7280', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                  {user.joinedDate}
                </td>

                {/* Cột 3: Số bài viết */}
                <td style={{ padding: '14px 20px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                  {user.postsCount}
                </td>

                {/* Cột 4: Số lần vi phạm */}
                <td style={{ padding: '14px 20px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: user.violationsCount > 0 ? 'var(--brand-red)' : '#6b7280' }}>
                  {user.violationsCount}
                </td>

                {/* Cột 5: Trạng thái */}
                <td style={{ padding: '14px 20px' }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '3px 10px',
                    borderRadius: '9999px',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    backgroundColor: user.status === 'Hoạt động' ? '#dcfce7' : user.status === 'Đã khóa' ? '#f3f4f6' : '#fee2e2',
                    color: user.status === 'Hoạt động' ? '#16a34a' : user.status === 'Đã khóa' ? '#6b7280' : 'var(--brand-red)'
                  }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: user.status === 'Hoạt động' ? '#16a34a' : user.status === 'Đã khóa' ? '#6b7280' : 'var(--brand-red)' }} />
                    <span>{user.status}</span>
                  </span>
                </td>

                {/* Cột 6: Thao tác (3 icon 👁️ 🔒 🗑️) */}
                <td style={{ padding: '14px 20px', textAlign: 'right' }} onClick={(e) => e.stopPropagation()}>
                  <div style={{ display: 'inline-flex', gap: '8px' }}>
                    <button
                      onClick={() => setSelectedUser(user)}
                      title="Xem chi tiết"
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '6px',
                        border: '1px solid #e5e7eb',
                        backgroundColor: '#ffffff',
                        cursor: 'pointer',
                        fontSize: '13px'
                      }}
                    >
                      👁️
                    </button>

                    <button
                      onClick={() => handleOpenLockModal(user)}
                      title={user.status === 'Đã khóa' ? 'Mở khóa' : 'Khóa tài khoản'}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '6px',
                        border: '1px solid #e5e7eb',
                        backgroundColor: '#ffffff',
                        cursor: 'pointer',
                        fontSize: '13px'
                      }}
                    >
                      🔒
                    </button>

                    <button
                      onClick={() => setUserToDelete(user)}
                      title="Xóa người dùng"
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '6px',
                        border: '1px solid #fee2e2',
                        backgroundColor: '#fff1f2',
                        color: 'var(--brand-red)',
                        cursor: 'pointer',
                        fontSize: '13px'
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 5. Phân trang Chân trang */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#8e8e93' }}>
        <div>Hiển thị 1-5 trên 1.248 người dùng</div>

        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={() => setCurrentPage(1)}
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              backgroundColor: currentPage === 1 ? '#18181c' : '#ffffff',
              color: currentPage === 1 ? '#ffffff' : '#374151',
              border: '1px solid #e5e7eb',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            1
          </button>
          <button
            onClick={() => setCurrentPage(2)}
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              backgroundColor: currentPage === 2 ? '#18181c' : '#ffffff',
              color: currentPage === 2 ? '#ffffff' : '#374151',
              border: '1px solid #e5e7eb',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            2
          </button>
          <button
            onClick={() => setCurrentPage(3)}
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              backgroundColor: currentPage === 3 ? '#18181c' : '#ffffff',
              color: currentPage === 3 ? '#ffffff' : '#374151',
              border: '1px solid #e5e7eb',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            3
          </button>
          <span style={{ padding: '4px' }}>...</span>
          <button
            onClick={() => setCurrentPage(250)}
            style={{
              width: '34px',
              height: '28px',
              borderRadius: '6px',
              backgroundColor: currentPage === 250 ? '#18181c' : '#ffffff',
              color: currentPage === 250 ? '#ffffff' : '#374151',
              border: '1px solid #e5e7eb',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            250
          </button>
        </div>
      </div>

      {/* 6. Bảng Slide-over Drawer Chi Tiết Tài Khoản */}
      <UserDetailDrawer
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
        onToggleLock={(userId) => {
          const target = users.find(u => u.id === userId);
          if (target) handleOpenLockModal(target);
        }}
        onDeleteUser={(userId) => {
          const target = users.find(u => u.id === userId);
          if (target) setUserToDelete(target);
        }}
      />

      {/* 7. Pop-up Khóa Tài Khoản chuẩn Figma */}
      <LockUserModal
        isOpen={!!userToLock}
        userName={userToLock?.name || ''}
        onClose={() => setUserToLock(null)}
        onConfirm={handleConfirmLock}
      />

      {/* 8. Pop-up Xóa Vĩnh Viễn Tài Khoản chuẩn Figma */}
      <DeleteUserModal
        isOpen={!!userToDelete}
        userName={userToDelete?.name || ''}
        onClose={() => setUserToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};
