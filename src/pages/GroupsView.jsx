import React, { useState } from 'react';
import { MY_JOINED_GROUPS, DISCOVER_GROUPS } from '../data/initialData';

export const GroupsView = () => {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const categories = ['Tất cả', 'Công nghệ', 'Du lịch', 'Nghệ thuật', 'Thể thao', 'Học tập'];

  const filteredDiscoverGroups = selectedCategory === 'Tất cả'
    ? DISCOVER_GROUPS
    : DISCOVER_GROUPS.filter(g => g.category === selectedCategory);

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

        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '14px' }}>
            Nhóm của tôi ({MY_JOINED_GROUPS.length})
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
            {MY_JOINED_GROUPS.map(g => (
              <div key={g.id} className="widget-card" style={{ padding: '16px' }}>
                <div style={{ height: '70px', borderRadius: '8px', background: g.banner, marginBottom: '10px' }} />
                <div style={{ fontWeight: 800, fontSize: '14px' }}>{g.name}</div>
                <div style={{ fontSize: '12px', color: '#8e8e93' }}>{g.members}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '14px' }}>
            Khám phá nhóm mới
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {filteredDiscoverGroups.map(g => (
              <div key={g.id} className="widget-card" style={{ padding: '18px' }}>
                <div style={{ height: '80px', borderRadius: '8px', background: g.banner, marginBottom: '12px' }} />
                <div style={{ fontSize: '11px', color: 'var(--brand-red)', fontWeight: 700, textTransform: 'uppercase' }}>{g.category}</div>
                <div style={{ fontWeight: 800, fontSize: '15px', margin: '4px 0' }}>{g.name}</div>
                <p style={{ fontSize: '12.5px', color: '#6b7280', margin: '0 0 12px', lineHeight: 1.4 }}>{g.desc}</p>
                <div style={{ fontSize: '11.5px', color: '#8e8e93' }}>{g.members}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
