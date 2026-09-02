import React, { useState } from 'react';
import { useSocial } from '../../../context/SocialContext';
import { PostDetailModal, type AdminPostDetailData } from '../modals/PostDetailModal';

export const PostsTab: React.FC = () => {
  const { showToast } = useSocial();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState<AdminPostDetailData | null>(null);

  const [posts, setPosts] = useState<AdminPostDetailData[]>([
    {
      id: 'ap-1',
      content: 'Bán tài khoản game giá rẻ, ib zalo... liên hệ ngay kẻo hết ưu đãi!!',
      authorName: 'fake_account_02',
      authorHandle: '@fakeacc02',
      postedTime: '2 giờ trước',
      reportsCount: 6,
      reportsBreakdown: [
        { reason: 'Spam / quảng cáo trái phép', count: 4 },
        { reason: 'Nội dung lừa đảo', count: 2 }
      ],
      status: 'Chờ xử lý'
    },
    {
      id: 'ap-2',
      content: 'Tin đồn: trường sắp đóng cửa vì lý do XYZ (chưa xác thực nguồn)',
      authorName: 'Thu Trang',
      authorHandle: '@thutrang',
      postedTime: '5 giờ trước',
      reportsCount: 3,
      reportsBreakdown: [
        { reason: 'Tin giả / Tin chưa kiểm chứng', count: 3 }
      ],
      status: 'Chờ xử lý'
    },
    {
      id: 'ap-3',
      content: 'Cuối tuần này lớp mình tổ chức đi Đà Lạt, ai muốn tham gia...',
      authorName: 'Quang Huy',
      authorHandle: '@quanghuy',
      postedTime: '1 ngày trước',
      reportsCount: 0,
      status: 'Đang hiển thị'
    },
    {
      id: 'ap-4',
      content: 'Bộ ảnh chụp Sài Gòn lúc hoàng hôn hôm qua, mọi người góp ý giúp mình...',
      authorName: 'Hải Yến',
      authorHandle: '@haiyen',
      postedTime: '2 ngày trước',
      reportsCount: 0,
      status: 'Đã ẩn'
    }
  ]);

  const handleToggleHide = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const nextStatus = p.status === 'Đã ẩn' ? 'Đang hiển thị' : 'Đã ẩn';
        showToast(`Đã ${nextStatus === 'Đã ẩn' ? 'ẩn' : 'bỏ ẩn'} bài viết`);
        const updated = { ...p, status: nextStatus as 'Đang hiển thị' | 'Đã ẩn' };
        if (selectedPost?.id === postId) setSelectedPost(updated);
        return updated;
      }
      return p;
    }));
  };

  const handleDeletePost = (postId: string) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
    showToast('Đã xóa vĩnh viễn bài viết khỏi hệ thống!', 'error');
    if (selectedPost?.id === postId) setSelectedPost(null);
  };

  const filteredPosts = posts.filter(p => {
    const matchesSearch =
      p.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.authorName.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (filterStatus === 'reported') return p.reportsCount > 0;
    if (filterStatus === 'hidden') return p.status === 'Đã ẩn';
    return true;
  });

  return (
    <div>
      {/* 1. Header: Tiêu đề + Chuông + Avatar xanh */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 900, color: 'var(--text-dark)', letterSpacing: '0.04em' }}>
          QUẢN LÝ BÀI VIẾT
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
          <span>1</span> Lọc bài viết bị báo cáo
        </span>
        <span>➔</span>
        <span>2. Mở xem chi tiết</span>
        <span>➔</span>
        <span>3. Ẩn hoặc xóa bài viết</span>
        <span>➔</span>
        <span>4. Chọn lý do vi phạm</span>
        <span>➔</span>
        <span>5. Xác nhận & thông báo</span>
      </div>

      {/* 3. Thanh Tìm kiếm & Bộ Lọc Tab */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          
          {/* Ô Tìm kiếm */}
          <div className="search-box" style={{ width: '280px' }}>
            <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm theo nội dung hoặc tác giả"
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
              Tất cả (4.930)
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
              Bị báo cáo (7)
            </button>

            <button
              onClick={() => setFilterStatus('hidden')}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '12.5px',
                fontWeight: 700,
                backgroundColor: filterStatus === 'hidden' ? '#18181c' : '#ffffff',
                color: filterStatus === 'hidden' ? '#ffffff' : '#6b7280',
                border: '1px solid #e5e7eb',
                cursor: 'pointer'
              }}
            >
              Đã ẩn (3)
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
          <option>Nhiều báo cáo nhất</option>
          <option>Cũ nhất</option>
        </select>
      </div>

      {/* 4. Bảng Dữ liệu Bài viết */}
      <div className="widget-card" style={{ padding: 0, overflow: 'hidden', marginBottom: '18px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb', color: '#6b7280', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <th style={{ padding: '14px 20px', width: '38%' }}>NỘI DUNG</th>
              <th style={{ padding: '14px 20px' }}>TÁC GIẢ</th>
              <th style={{ padding: '14px 20px' }}>NGÀY ĐĂNG</th>
              <th style={{ padding: '14px 20px' }}>BÁO CÁO</th>
              <th style={{ padding: '14px 20px' }}>TRẠNG THÁI</th>
              <th style={{ padding: '14px 20px', textAlign: 'right' }}>THAO TÁC</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.map(post => (
              <tr
                key={post.id}
                style={{ borderBottom: '1px solid #f3f4f6', cursor: 'pointer' }}
                onClick={() => setSelectedPost(post)}
              >
                {/* Cột 1: Nội dung */}
                <td style={{ padding: '14px 20px', color: '#1f2937', fontWeight: 600, lineHeight: 1.4 }}>
                  "{post.content}"
                </td>

                {/* Cột 2: Tác giả */}
                <td style={{ padding: '14px 20px' }}>
                  <div style={{ fontWeight: 800, color: 'var(--text-dark)' }}>{post.authorName}</div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-light-gray)' }}>{post.authorHandle}</div>
                </td>

                {/* Cột 3: Ngày đăng */}
                <td style={{ padding: '14px 20px', color: '#6b7280', fontWeight: 600, fontSize: '12px' }}>
                  {post.postedTime}
                </td>

                {/* Cột 4: Số báo cáo */}
                <td style={{ padding: '14px 20px' }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '3px 8px',
                    borderRadius: '9999px',
                    fontSize: '11px',
                    fontWeight: 700,
                    backgroundColor: post.reportsCount > 0 ? '#fee2e2' : '#dcfce7',
                    color: post.reportsCount > 0 ? 'var(--brand-red)' : '#16a34a'
                  }}>
                    <span>•</span> {post.reportsCount} báo cáo
                  </span>
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
                    backgroundColor: post.status === 'Đang hiển thị' ? '#dcfce7' : post.status === 'Đã ẩn' ? '#fef3c7' : '#fee2e2',
                    color: post.status === 'Đang hiển thị' ? '#16a34a' : post.status === 'Đã ẩn' ? '#d97706' : 'var(--brand-red)'
                  }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: post.status === 'Đang hiển thị' ? '#16a34a' : post.status === 'Đã ẩn' ? '#d97706' : 'var(--brand-red)' }} />
                    <span>{post.status}</span>
                  </span>
                </td>

                {/* Cột 6: Thao tác (3 icon 👁️ 👁️‍🗨️ 🗑️) */}
                <td style={{ padding: '14px 20px', textAlign: 'right' }} onClick={(e) => e.stopPropagation()}>
                  <div style={{ display: 'inline-flex', gap: '8px' }}>
                    <button
                      onClick={() => setSelectedPost(post)}
                      title="Xem bài viết"
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
                      onClick={() => handleToggleHide(post.id)}
                      title={post.status === 'Đã ẩn' ? 'Bỏ ẩn bài viết' : 'Ẩn bài viết'}
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
                      👁️‍🗨️
                    </button>

                    <button
                      onClick={() => handleDeletePost(post.id)}
                      title="Xóa bài viết"
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
        <div>Hiển thị 1-4 trên 4.930 bài viết</div>

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
            onClick={() => setCurrentPage(1233)}
            style={{
              width: '40px',
              height: '28px',
              borderRadius: '6px',
              backgroundColor: currentPage === 1233 ? '#18181c' : '#ffffff',
              color: currentPage === 1233 ? '#ffffff' : '#374151',
              border: '1px solid #e5e7eb',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            1233
          </button>
        </div>
      </div>

      {/* 6. Pop-up Chi Tiết Bài Viết chuẩn Figma */}
      <PostDetailModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
        onToggleHide={handleToggleHide}
        onDeletePost={handleDeletePost}
      />
    </div>
  );
};
