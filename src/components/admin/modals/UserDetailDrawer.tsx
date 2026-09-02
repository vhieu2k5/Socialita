import React, { useState } from 'react';

export interface UserPostItem {
  id: string;
  title: string;
  stats: string;
}

export interface UserViolationItem {
  id: string;
  reason: string;
  dateAndAdmin: string;
}

export interface UserDetailData {
  id: string;
  name: string;
  email: string;
  joinedDate: string;
  postsCount: number;
  friendsCount?: number;
  violationsCount: number;
  status: 'Hoạt động' | 'Đã khóa' | 'Bị báo cáo';
  location?: string;
  emailVerified?: boolean;
  lastLogin?: string;
  avatarBg?: string;
  postsList?: UserPostItem[];
  violationsList?: UserViolationItem[];
}

interface UserDetailDrawerProps {
  user: UserDetailData | null;
  onClose: () => void;
  onToggleLock: (userId: string) => void;
  onDeleteUser: (userId: string) => void;
}

export const UserDetailDrawer: React.FC<UserDetailDrawerProps> = ({
  user,
  onClose,
  onToggleLock,
  onDeleteUser
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'posts' | 'violations'>('info');

  if (!user) return null;

  // Dữ liệu bài viết mẫu của người dùng nếu chưa có
  const userPosts: UserPostItem[] = user.postsList || [
    {
      id: 'p-1',
      title: 'Vừa hoàn thành đồ án môn học...',
      stats: '152 lượt thích · 24 bình luận'
    },
    {
      id: 'p-2',
      title: 'Cà phê sáng thứ 7 cùng hội bạn thân',
      stats: '88 lượt thích · 9 bình luận'
    }
  ];

  // Dữ liệu lịch sử vi phạm mẫu nếu có
  const userViolations: UserViolationItem[] = user.violationsList || (
    user.violationsCount > 0
      ? [
          {
            id: 'v-1',
            reason: 'Bài viết bị gỡ do spam',
            dateAndAdmin: '12/08/2026 — bởi Admin Thiện'
          }
        ]
      : []
  );

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.45)',
      backdropFilter: 'blur(3px)',
      zIndex: 100,
      display: 'flex',
      justifyContent: 'flex-end',
      animation: 'fadeIn 0.15s ease'
    }}>
      {/* Khung Drawer Trượt từ Phải sang */}
      <div style={{
        width: '420px',
        maxWidth: '90vw',
        height: '100%',
        backgroundColor: '#ffffff',
        boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.15)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '24px 28px',
        overflowY: 'auto'
      }}>
        <div>
          {/* Header Drawer */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-dark)', margin: 0 }}>
              Chi tiết tài khoản
            </h3>
            <button
              onClick={onClose}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                backgroundColor: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: 700,
                color: '#6b7280',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>
          </div>

          {/* Avatar, Tên & Trạng thái */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '24px' }}>
            <div style={{
              width: '76px',
              height: '76px',
              borderRadius: '50%',
              backgroundColor: user.avatarBg || '#35c9b0',
              color: '#ffffff',
              fontSize: '26px',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '12px',
              boxShadow: '0 4px 14px rgba(0,0,0,0.1)'
            }}>
              {user.name[0]}
            </div>

            <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-dark)', margin: '0 0 4px' }}>
              {user.name}
            </h2>

            <div style={{ fontSize: '12.5px', color: '#8e8e93', marginBottom: '10px' }}>
              {user.email}
            </div>

            {/* Badge Trạng thái */}
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '3px 12px',
              borderRadius: '9999px',
              fontSize: '12px',
              fontWeight: 700,
              backgroundColor: user.status === 'Hoạt động' ? '#dcfce7' : user.status === 'Đã khóa' ? '#f3f4f6' : '#fee2e2',
              color: user.status === 'Hoạt động' ? '#16a34a' : user.status === 'Đã khóa' ? '#6b7280' : 'var(--brand-red)'
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: user.status === 'Hoạt động' ? '#16a34a' : user.status === 'Đã khóa' ? '#6b7280' : 'var(--brand-red)' }} />
              <span>{user.status}</span>
            </span>
          </div>

          {/* 3 Chỉ số Đo lường (Bài viết | Bạn bè | Vi phạm) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            textAlign: 'center',
            backgroundColor: '#ffffff',
            border: '1px solid #f3f4f6',
            borderRadius: '12px',
            padding: '12px 6px',
            marginBottom: '20px'
          }}>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--text-dark)' }}>
                {user.postsCount}
              </div>
              <div style={{ fontSize: '10.5px', fontWeight: 700, color: '#8e8e93', textTransform: 'uppercase', marginTop: '2px' }}>
                BÀI VIẾT
              </div>
            </div>

            <div style={{ borderLeft: '1px solid #e5e7eb', borderRight: '1px solid #e5e7eb' }}>
              <div style={{ fontSize: '18px', fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--text-dark)' }}>
                {user.friendsCount ?? 128}
              </div>
              <div style={{ fontSize: '10.5px', fontWeight: 700, color: '#8e8e93', textTransform: 'uppercase', marginTop: '2px' }}>
                BẠN BÈ
              </div>
            </div>

            <div>
              <div style={{ fontSize: '18px', fontWeight: 900, fontFamily: 'var(--font-mono)', color: user.violationsCount > 0 ? 'var(--brand-red)' : 'var(--text-dark)' }}>
                {user.violationsCount}
              </div>
              <div style={{ fontSize: '10.5px', fontWeight: 700, color: '#8e8e93', textTransform: 'uppercase', marginTop: '2px' }}>
                VI PHẠM
              </div>
            </div>
          </div>

          {/* 3 Subtabs: Thông tin | Bài viết | Lịch sử vi phạm (Có vạch đỏ active chuẩn Figma) */}
          <div style={{
            display: 'flex',
            gap: '24px',
            borderBottom: '1px solid #f3f4f6',
            marginBottom: '20px'
          }}>
            <button
              onClick={() => setActiveTab('info')}
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: activeTab === 'info' ? 'var(--text-dark)' : '#8e8e93',
                borderBottom: activeTab === 'info' ? '2.5px solid var(--brand-red)' : '2.5px solid transparent',
                paddingBottom: '8px',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              Thông tin
            </button>

            <button
              onClick={() => setActiveTab('posts')}
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: activeTab === 'posts' ? 'var(--text-dark)' : '#8e8e93',
                borderBottom: activeTab === 'posts' ? '2.5px solid var(--brand-red)' : '2.5px solid transparent',
                paddingBottom: '8px',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              Bài viết
            </button>

            <button
              onClick={() => setActiveTab('violations')}
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: activeTab === 'violations' ? 'var(--text-dark)' : '#8e8e93',
                borderBottom: activeTab === 'violations' ? '2.5px solid var(--brand-red)' : '2.5px solid transparent',
                paddingBottom: '8px',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              Lịch sử vi phạm
            </button>
          </div>

          {/* TAB 1: THÔNG TIN TÀI KHOẢN */}
          {activeTab === 'info' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px', color: 'var(--text-dark)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span>📅</span>
                <span>Tham gia từ tháng {user.joinedDate}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span>📍</span>
                <span>{user.location || 'Sài Gòn, Việt Nam'}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span>✉️</span>
                <span>Email đã xác thực</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span>🕒</span>
                <span>{user.lastLogin || 'Đăng nhập gần nhất: 2 giờ trước'}</span>
              </div>
            </div>
          )}

          {/* TAB 2: BÀI VIẾT CỦA NGƯỜI DÙNG (Chuẩn Figma Image 1) */}
          {activeTab === 'posts' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {userPosts.map(post => (
                <div key={post.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#9ca3af',
                    marginTop: '6px',
                    flexShrink: 0
                  }} />
                  <div>
                    <div style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--text-dark)', lineHeight: '1.4' }}>
                      {post.title}
                    </div>
                    <div style={{ fontSize: '12px', color: '#8e8e93', marginTop: '2px' }}>
                      {post.stats}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: LỊCH SỬ VI PHẠM (Chuẩn Figma Image 2) */}
          {activeTab === 'violations' && (
            <div>
              {userViolations.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {userViolations.map(viol => (
                    <div key={viol.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <span style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--brand-red)',
                        marginTop: '6px',
                        flexShrink: 0
                      }} />
                      <div>
                        <div style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--text-dark)', lineHeight: '1.4' }}>
                          {viol.reason}
                        </div>
                        <div style={{ fontSize: '12px', color: '#8e8e93', marginTop: '2px' }}>
                          {viol.dateAndAdmin}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ fontSize: '13px', color: '#16a34a', backgroundColor: '#dcfce7', padding: '12px', borderRadius: '8px', textAlign: 'center', fontWeight: 600 }}>
                  ✓ Tài khoản sạch, chưa có lịch sử vi phạm nào.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom Action Buttons (Khóa tài khoản & Xóa) */}
        <div style={{ display: 'flex', gap: '12px', paddingTop: '20px', borderTop: '1px solid #f3f4f6' }}>
          <button
            onClick={() => {
              onToggleLock(user.id);
            }}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '10px',
              border: '1px solid #e5e7eb',
              backgroundColor: '#ffffff',
              fontSize: '13px',
              fontWeight: 700,
              color: 'var(--text-dark)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
          >
            <span>🔒</span>
            <span>{user.status === 'Đã khóa' ? 'Mở khóa tài khoản' : 'Khóa tài khoản'}</span>
          </button>

          <button
            onClick={() => {
              onDeleteUser(user.id);
              onClose();
            }}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '10px',
              backgroundColor: 'var(--brand-red)',
              color: '#ffffff',
              fontSize: '13px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(229,46,61,0.3)'
            }}
          >
            <span>🗑️</span>
            <span>Xóa</span>
          </button>
        </div>
      </div>
    </div>
  );
};
