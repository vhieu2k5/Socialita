import React, { useState } from 'react';
import { useSocial } from '../context/SocialContext';
import { DISCOVER_GROUPS } from '../data/initialData';

export const GroupsView = () => {
  const { joinedGroups, toggleJoinGroup } = useSocial();
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const categories = ['Tất cả', 'Công nghệ', 'Du lịch', 'Nghệ thuật', 'Thể thao', 'Học tập'];

  const filteredDiscoverGroups = selectedCategory === 'Tất cả'
    ? DISCOVER_GROUPS
    : DISCOVER_GROUPS.filter(g => g.category === selectedCategory);

  const myGroupsList = joinedGroups || [];

  return (
    <div style={{ display: 'flex', gap: '24px', width: '100%' }}>
      <div style={{ flex: 1, minWidth: 0 }}>
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
                  cursor: 'pointer'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Nhóm của tôi */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '14px' }}>
            Nhóm của tôi ({myGroupsList.length})
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
            {myGroupsList.map(g => (
              <div key={g.id} className="widget-card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ height: '70px', borderRadius: '8px', background: g.banner || 'linear-gradient(135deg, #18191a 0%, #7a1d26 100%)', marginBottom: '10px' }} />
                  <div style={{ fontWeight: 800, fontSize: '14px' }}>{g.name}</div>
                  <div style={{ fontSize: '12px', color: '#8e8e93', marginTop: '2px' }}>{g.members || 'Cộng đồng'}</div>
                </div>
                <button
                  onClick={() => toggleJoinGroup(g)}
                  style={{
                    marginTop: '12px',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: '1px solid #fee2e2',
                    backgroundColor: '#fff5f5',
                    color: '#ef4444',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    alignSelf: 'flex-start'
                  }}
                  title="Rời khỏi nhóm"
                >
                  Rời nhóm
                </button>
              </div>
            ))}

            {myGroupsList.length === 0 && (
              <div style={{ gridColumn: '1 / -1', padding: '32px', textAlign: 'center', color: 'var(--text-light-gray)', background: '#fff', borderRadius: '12px', border: '1px dashed #e5e7eb' }}>
                <p style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '4px' }}>Bạn chưa tham gia hội nhóm nào</p>
                <p style={{ fontSize: '13px' }}>Hãy khám phá và bấm "Tham gia nhóm" ở danh sách bên dưới để giao lưu cùng mọi người!</p>
              </div>
            )}
          </div>
        </div>

        {/* Khám phá nhóm mới */}
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '14px' }}>
            Khám phá nhóm mới
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {filteredDiscoverGroups.map(g => {
              const isJoined = myGroupsList.some(item => item.id === g.id || item.name === g.name);
              return (
                <div key={g.id} className="widget-card" style={{ padding: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ height: '80px', borderRadius: '8px', background: g.banner || 'linear-gradient(135deg, #18191a 0%, #7a1d26 100%)', marginBottom: '12px' }} />
                    <div style={{ fontSize: '11px', color: 'var(--brand-red)', fontWeight: 700, textTransform: 'uppercase' }}>{g.category}</div>
                    <div style={{ fontWeight: 800, fontSize: '15px', margin: '4px 0' }}>{g.name}</div>
                    <p style={{ fontSize: '12.5px', color: '#6b7280', margin: '0 0 12px', lineHeight: 1.4 }}>{g.desc}</p>
                    <div style={{ fontSize: '11.5px', color: '#8e8e93' }}>{g.members}</div>
                  </div>
                  <button
                    onClick={() => toggleJoinGroup(g)}
                    style={{
                      marginTop: '14px',
                      padding: '7px 14px',
                      borderRadius: '8px',
                      border: isJoined ? '1px solid #e5e7eb' : 'none',
                      backgroundColor: isJoined ? '#f3f4f6' : 'var(--brand-red)',
                      color: isJoined ? '#6b7280' : '#ffffff',
                      fontWeight: 700,
                      fontSize: '12px',
                      cursor: 'pointer',
                      alignSelf: 'flex-start'
                    }}
                  >
                    {isJoined ? '✓ Đã tham gia' : '+ Tham gia nhóm'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
