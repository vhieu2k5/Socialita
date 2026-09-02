import React, { useState } from 'react';
import { MY_JOINED_GROUPS, DISCOVER_GROUPS } from '../../../data/initialData';
import { useSocial } from '../../../context/SocialContext';
import { Logo } from '../../ui/Logo';

export const GroupsView: React.FC = () => {
  const { showToast } = useSocial();
  
  // State quản lý xem đang chọn lọc theo thể loại nào
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  const categories = ['Tất cả', 'Công nghệ', 'Du lịch', 'Nghệ thuật', 'Thể thao', 'Học tập'];

  // Lọc danh sách nhóm khám phá theo thể loại người dùng bấm
  const filteredDiscoverGroups = selectedCategory === 'Tất cả'
    ? DISCOVER_GROUPS
    : DISCOVER_GROUPS.filter((g: any) => g.category === selectedCategory);

  return (
    <div style={{ display: 'flex', gap: '24px', width: '100%' }}>
      {/* CỘT CHÍNH BÊN TRÁI */}
      <div style={{ flex: 1, minWidth: 0 }}>
        
        {/* 1. HEADER & DẢI NÚT LỌC THỂ LOẠI */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-dark)' }}>Hội nhóm</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-gray)', marginTop: '4px', marginBottom: '14px' }}>
            Tham gia cộng đồng cùng sở thích với bạn
          </p>

          {/* Dải nút thể loại hình viên thuốc */}
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
                  transition: 'all 0.15s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 2. KHU VỰC: NHÓM CỦA TÔI (9) */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-dark)' }}>
              Nhóm của tôi (9)
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button style={{ fontSize: '12px', fontWeight: 700, color: 'var(--brand-red)' }} onClick={() => showToast('Xem tất cả nhóm đã tham gia')}>
                Xem tất cả
              </button>
              <Logo size="sm" />
            </div>
          </div>

          {/* Grid 4 cột hàng ngang */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
            {MY_JOINED_GROUPS.map((group: any) => (
              <div key={group.id} className="widget-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                {/* Banner đỏ đen */}
                <div style={{ height: '90px', background: group.banner, position: 'relative', padding: '10px' }}>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    color: '#ffffff',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    padding: '3px 8px',
                    borderRadius: '4px'
                  }}>
                    Đã tham gia
                  </span>
                </div>

                {/* Nội dung thông tin */}
                <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <h4 style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '4px' }}>
                      {group.name}
                    </h4>
                    <p style={{ fontSize: '11.5px', color: 'var(--text-light-gray)' }}>
                      {group.members}
                    </p>
                  </div>

                  <button
                    onClick={() => showToast(`Mở nhóm ${group.name}`)}
                    style={{
                      marginTop: '12px',
                      width: '100%',
                      padding: '7px',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb',
                      backgroundColor: '#ffffff',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: 'var(--text-dark)',
                      cursor: 'pointer'
                    }}
                  >
                    Xem nhóm
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. KHU VỰC: KHÁM PHÁ NHÓM MỚI */}
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '14px' }}>
            Khám phá nhóm mới
          </h3>

          {/* Grid 3 cột x 2 hàng */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {filteredDiscoverGroups.map((group: any) => (
              <div key={group.id} className="widget-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                {/* Banner có nhãn thể loại ở góc trái */}
                <div style={{ height: '110px', background: group.banner, position: 'relative', padding: '12px' }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: 'var(--text-dark)',
                    backgroundColor: '#ffffff',
                    padding: '4px 10px',
                    borderRadius: '20px'
                  }}>
                    {group.category}
                  </span>
                </div>

                {/* Chi tiết nhóm */}
                <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <h4 style={{ fontSize: '14.5px', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '6px' }}>
                      {group.name}
                    </h4>
                    <p style={{ fontSize: '12px', color: 'var(--text-gray)', lineHeight: '1.4', marginBottom: '10px', minHeight: '34px' }}>
                      {group.desc}
                    </p>
                    <span style={{ fontSize: '11.5px', color: 'var(--text-light-gray)' }}>
                      {group.members}
                    </span>
                  </div>

                  {/* Nút Tham gia viền đỏ */}
                  <button
                    onClick={() => showToast(`Đã tham gia nhóm ${group.name}!`)}
                    style={{
                      marginTop: '14px',
                      width: '100%',
                      padding: '8px',
                      borderRadius: '8px',
                      border: '1.5px solid var(--brand-red)',
                      backgroundColor: '#ffffff',
                      fontSize: '12.5px',
                      fontWeight: 700,
                      color: 'var(--brand-red)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    Tham gia
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};