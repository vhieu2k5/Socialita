import React from 'react';

export interface PostReportDetail {
  reason: string;
  count: number;
}

export interface AdminPostDetailData {
  id: string;
  content: string;
  authorName: string;
  authorHandle: string;
  postedTime: string;
  reportsCount: number;
  reportsBreakdown?: PostReportDetail[];
  status: 'Chờ xử lý' | 'Đang hiển thị' | 'Đã ẩn';
}

interface PostDetailModalProps {
  post: AdminPostDetailData | null;
  onClose: () => void;
  onToggleHide: (postId: string) => void;
  onDeletePost: (postId: string) => void;
}

export const PostDetailModal: React.FC<PostDetailModalProps> = ({
  post,
  onClose,
  onToggleHide,
  onDeletePost
}) => {
  if (!post) return null;

  const reportsList: PostReportDetail[] = post.reportsBreakdown || (
    post.reportsCount > 0
      ? [
          { reason: 'Spam / quảng cáo trái phép', count: Math.ceil(post.reportsCount * 0.6) },
          { reason: 'Nội dung lừa đảo', count: Math.floor(post.reportsCount * 0.4) }
        ]
      : []
  );

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.55)',
      backdropFilter: 'blur(4px)',
      zIndex: 120,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      animation: 'fadeIn 0.15s ease'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        width: '500px',
        maxWidth: '95vw',
        padding: '24px 28px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
        animation: 'slideUp 0.2s ease'
      }}>
        {/* Header với Icon Bài viết */}
        <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '18px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            backgroundColor: '#18181c',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            fontWeight: 800,
            flexShrink: 0
          }}>
            ≡
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-dark)', margin: '0 0 4px' }}>
              Chi tiết bài viết
            </h3>
            <p style={{ fontSize: '12px', color: '#8e8e93', margin: 0 }}>
              Đăng bởi <span style={{ fontWeight: 700, color: 'var(--text-dark)' }}>{post.authorName}</span> · {post.postedTime}
            </p>
          </div>
        </div>

        {/* Nội dung bài viết */}
        <div style={{
          fontSize: '13.5px',
          fontWeight: 600,
          color: 'var(--text-dark)',
          lineHeight: 1.5,
          marginBottom: '18px'
        }}>
          {post.content}
        </div>

        {/* Khung cảnh báo báo cáo vi phạm (Màu hồng / Đỏ nhạt) */}
        {post.reportsCount > 0 && (
          <div style={{
            backgroundColor: '#fef2f2',
            border: '1px solid #fee2e2',
            borderRadius: '12px',
            padding: '14px 16px',
            marginBottom: '24px'
          }}>
            <div style={{ fontSize: '12.5px', fontWeight: 800, color: 'var(--brand-red)', marginBottom: '6px' }}>
              {post.reportsCount} người đã báo cáo bài viết này
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px', color: '#7f1d1d' }}>
              {reportsList.map((rep, idx) => (
                <div key={idx}>
                  • {rep.reason} ({rep.count})
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3 Nút Hành động */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '10px',
              border: '1px solid #e5e7eb',
              backgroundColor: '#ffffff',
              color: 'var(--text-dark)',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Đóng
          </button>

          <button
            type="button"
            onClick={() => {
              onToggleHide(post.id);
            }}
            style={{
              flex: 1.2,
              padding: '10px',
              borderRadius: '10px',
              border: '1px solid #e5e7eb',
              backgroundColor: '#ffffff',
              color: 'var(--text-dark)',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            {post.status === 'Đã ẩn' ? 'Bỏ ẩn bài viết' : 'Ẩn bài viết'}
          </button>

          <button
            type="button"
            onClick={() => {
              onDeletePost(post.id);
              onClose();
            }}
            style={{
              flex: 1.2,
              padding: '10px',
              borderRadius: '10px',
              backgroundColor: 'var(--brand-red)',
              color: '#ffffff',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(229,46,61,0.3)'
            }}
          >
            Xóa bài viết
          </button>
        </div>
      </div>
    </div>
  );
};
