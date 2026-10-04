import React, { useState } from 'react';
import { useSocial } from '../../context/SocialContext';
import { PostDetailModal } from '../../components/modals/PostDetailModal';

export const PostsTab = () => {
  const { showToast } = useSocial();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);

  const [posts, setPosts] = useState([
    { id: 'ap-1', content: 'Bán tài khoản game giá rẻ, ib zalo...', authorName: 'fake_account_02', authorHandle: '@fakeacc02', postedTime: '2 giờ trước', status: 'Chờ xử lý' },
    { id: 'ap-2', content: 'Tin đồn chưa xác thực...', authorName: 'Thu Trang', authorHandle: '@thutrang', postedTime: '5 giờ trước', status: 'Chờ xử lý' },
    { id: 'ap-3', content: 'Cuối tuần này lớp mình tổ chức đi Đà Lạt...', authorName: 'Quang Huy', authorHandle: '@quanghuy', postedTime: '1 ngày trước', status: 'Đang hiển thị' }
  ]);

  const handleToggleHide = (postId) => {
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, status: p.status === 'Đã ẩn' ? 'Đang hiển thị' : 'Đã ẩn' } : p));
    showToast('Đã cập nhật trạng thái hiển thị');
  };

  const handleDeletePost = (postId) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
    showToast('Đã xóa bài viết vĩnh viễn', 'error');
    setSelectedPost(null);
  };

  const filteredPosts = posts.filter(p =>
    p.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.authorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 style={{ fontSize: '28px', fontWeight: 900, color: 'var(--text-dark)', marginBottom: '20px' }}>
        QUẢN LÝ BÀI VIẾT
      </h1>

      <div style={{ marginBottom: '18px' }}>
        <input
          type="text"
          className="search-input"
          style={{ width: '320px', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e5e7eb' }}
          placeholder="Tìm theo nội dung hoặc tác giả..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="widget-card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb', color: '#6b7280', fontSize: '11px', textTransform: 'uppercase' }}>
              <th style={{ padding: '14px 20px', width: '40%' }}>NỘI DUNG</th>
              <th style={{ padding: '14px 20px' }}>TÁC GIẢ</th>
              <th style={{ padding: '14px 20px' }}>TRẠNG THÁI</th>
              <th style={{ padding: '14px 20px', textAlign: 'right' }}>THAO TÁC</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.map(post => (
              <tr key={post.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '14px 20px', fontWeight: 600 }}>"{post.content}"</td>
                <td style={{ padding: '14px 20px' }}>{post.authorName}</td>
                <td style={{ padding: '14px 20px' }}>
                  <span style={{
                    padding: '3px 10px',
                    borderRadius: '9999px',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    backgroundColor: post.status === 'Đang hiển thị' ? '#dcfce7' : '#fee2e2',
                    color: post.status === 'Đang hiển thị' ? '#16a34a' : 'var(--brand-red)'
                  }}>
                    {post.status}
                  </span>
                </td>
                <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: '8px' }}>
                    <button onClick={() => setSelectedPost(post)} style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer' }}>👁️</button>
                    <button onClick={() => handleToggleHide(post.id)} style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer' }}>👁️‍🗨️</button>
                    <button onClick={() => handleDeletePost(post.id)} style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #fee2e2', background: '#fff1f2', color: 'red', cursor: 'pointer' }}>🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PostDetailModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
        onToggleHide={handleToggleHide}
        onDeletePost={handleDeletePost}
      />
    </div>
  );
};
