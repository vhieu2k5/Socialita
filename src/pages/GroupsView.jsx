import React, { useState, useEffect } from 'react';
import { useSocial } from '../context/SocialContext';
import { MY_JOINED_GROUPS, DISCOVER_GROUPS } from '../data/initialData';

export const GroupsView = () => {
  const { currentUser } = useSocial();
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ['Tất cả', 'Công nghệ', 'Du lịch', 'Nghệ thuật', 'Thể thao', 'Học tập'];

  // Gọi API lấy dữ liệu hội nhóm theo tài khoản hiện tại từ database
  useEffect(() => {
    let isMounted = true;
    const fetchGroups = async () => {
      try {
        const userId = currentUser?.id || 1;
        const res = await fetch(`http://localhost:8080/api/groups?userId=${userId}`);
        const data = await res.json();
        if (isMounted && data.success && Array.isArray(data.groups)) {
          setGroups(data.groups);
        }
      } catch (err) {
        console.error('Lỗi kết nối database nhóm:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchGroups();
    return () => {
      isMounted = false;
    };
  }, [currentUser?.id]);

  // Phân loại nhóm đã tham gia và nhóm khám phá từ database
  const myJoinedGroups = groups.length > 0
    ? groups.filter(g => Boolean(g.is_joined))
    : MY_JOINED_GROUPS;

  const discoverGroups = groups.length > 0
    ? groups.filter(g => !g.is_joined)
    : DISCOVER_GROUPS;

  // Lọc danh sách nhóm khám phá theo danh mục
  const filteredDiscoverGroups = selectedCategory === 'Tất cả'
    ? discoverGroups
    : discoverGroups.filter(g => g.category === selectedCategory);

  const formatMembers = (count) => {
    if (typeof count === 'string') return count;
    if (!count) return '0 thành viên';
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K thành viên`;
    return `${count} thành viên`;
  };

  const getBannerStyle = (bannerUrl, defaultBanner) => {
    if (bannerUrl) {
      return bannerUrl.startsWith('http') || bannerUrl.startsWith('/')
        ? `url("${bannerUrl}") center/cover`
        : bannerUrl;
    }
    return defaultBanner || '#f3f4f6';
  };

  return (
    <div style={{ display: 'flex', gap: '24px', width: '100%' }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Tiêu đề & Bộ lọc danh mục */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-dark)' }}>Hội nhóm</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-gray)', marginTop: '4px', marginBottom: '14px' }}>
            Tham gia cộng đồng cùng sở thích với bạn
          </p>

          <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '7px 18px',
                  borderRadius: '9999px',
                  fontSize: '13px',
                  fontWeight: 600,
                  border: selectedCategory === cat ? 'none' : '1px solid #e5e7eb',
                  backgroundColor: selectedCategory === cat ? 'var(--brand-red)' : '#ffffff',
                  color: selectedCategory === cat ? '#ffffff' : 'var(--text-gray)',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s, color 0.2s'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* PHẦN 1: Nhóm của tôi (Giao diện thẻ ngang gọn gàng kèm ảnh sắc nét) */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '14px' }}>
            Nhóm của tôi ({myJoinedGroups.length})
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
            {myJoinedGroups.map(g => (
              <div key={g.id} className="widget-card" style={{ padding: '16px' }}>
                <div
                  style={{
                    height: '80px',
                    borderRadius: '8px',
                    background: getBannerStyle(g.banner_url, g.banner),
                    marginBottom: '10px'
                  }}
                />
                <div style={{ fontWeight: 800, fontSize: '14px', marginBottom: '4px' }}>{g.name}</div>
                <div style={{ fontSize: '12px', color: '#8e8e93' }}><i class="fa-solid fa-users"></i> {formatMembers(g.member_count ?? g.members)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* PHẦN 2: Khám phá nhóm mới (Thẻ lớn có thể loại, mô tả, ảnh bìa & lọc theo nút) */}
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '14px' }}>
            Khám phá nhóm mới
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {filteredDiscoverGroups.map(g => (
              <div key={g.id} className="widget-card" style={{ padding: '18px' }}>
                <div
                  style={{
                    height: '95px',
                    borderRadius: '8px',
                    background: getBannerStyle(g.banner_url, g.banner),
                    marginBottom: '12px'
                  }}
                />
                <div style={{ fontSize: '11px', color: 'var(--brand-red)', fontWeight: 700, textTransform: 'uppercase' }}>
                  {g.category}
                </div>
                <div style={{ fontWeight: 800, fontSize: '15px', margin: '4px 0' }}>
                  {g.name}
                </div>
                <p style={{ fontSize: '12.5px', color: '#6b7280', margin: '0 0 12px', lineHeight: 1.4 }}>
                  {g.description || g.desc}
                </p>
                <div style={{ fontSize: '11.5px', color: '#8e8e93', fontWeight: 600 }}>
                  <i class="fa-solid fa-users"></i> {formatMembers(g.member_count ?? g.members)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};