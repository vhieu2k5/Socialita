import React, { useState, useEffect } from 'react';

export const PostMediaGrid = ({ images = [], mediaSource = '', isVideo = false }) => {
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);

  // Chuẩn hóa danh sách ảnh
  let allImages = [];
  if (Array.isArray(images) && images.length > 0) {
    allImages = images.filter(Boolean);
  } else if (mediaSource && !isVideo) {
    allImages = [mediaSource];
  }

  // Bắt phím ESC và ArrowLeft/ArrowRight khi lightbox mở
  useEffect(() => {
    if (activeLightboxIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveLightboxIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setActiveLightboxIndex((prev) => (prev > 0 ? prev - 1 : allImages.length - 1));
      } else if (e.key === 'ArrowRight') {
        setActiveLightboxIndex((prev) => (prev < allImages.length - 1 ? prev + 1 : 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, allImages.length]);

  if (isVideo && mediaSource) {
    return (
      <div style={{ marginTop: '12px', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#000' }}>
        <video src={mediaSource} controls style={{ width: '100%', maxHeight: '480px', display: 'block' }} />
      </div>
    );
  }

  if (allImages.length === 0) return null;

  const count = allImages.length;

  return (
    <>
      <div
        style={{
          marginTop: '12px',
          borderRadius: '12px',
          overflow: 'hidden',
          backgroundColor: '#0f172a'
        }}
      >
        {/* 1 ẢNH */}
        {count === 1 && (
          <img
            src={allImages[0]}
            alt="Media"
            onClick={() => setActiveLightboxIndex(0)}
            style={{
              width: '100%',
              maxHeight: '480px',
              objectFit: 'cover',
              display: 'block',
              cursor: 'pointer'
            }}
          />
        )}

        {/* 2 ẢNH */}
        {count === 2 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px', height: '300px' }}>
            {allImages.slice(0, 2).map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Media ${idx + 1}`}
                onClick={() => setActiveLightboxIndex(idx)}
                style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
              />
            ))}
          </div>
        )}

        {/* 3 ẢNH: 1 ảnh lớn bên trái, 2 ảnh nhỏ bên phải */}
        {count === 3 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '3px', height: '340px' }}>
            <img
              src={allImages[0]}
              alt="Media 1"
              onClick={() => setActiveLightboxIndex(0)}
              style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
            />
            <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: '3px', height: '100%' }}>
              {allImages.slice(1, 3).map((img, idx) => (
                <img
                  key={idx + 1}
                  src={img}
                  alt={`Media ${idx + 2}`}
                  onClick={() => setActiveLightboxIndex(idx + 1)}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
                />
              ))}
            </div>
          </div>
        )}

        {/* 4 ẢNH: Lưới 2x2 */}
        {count === 4 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '3px', height: '340px' }}>
            {allImages.slice(0, 4).map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Media ${idx + 1}`}
                onClick={() => setActiveLightboxIndex(idx)}
                style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
              />
            ))}
          </div>
        )}

        {/* 5+ ẢNH: Lưới 2x2 với ảnh thứ 4 có overlay +N */}
        {count >= 5 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '3px', height: '340px' }}>
            {allImages.slice(0, 3).map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Media ${idx + 1}`}
                onClick={() => setActiveLightboxIndex(idx)}
                style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
              />
            ))}
            {/* Ảnh thứ 4 có overlay */}
            <div
              style={{ position: 'relative', width: '100%', height: '100%', cursor: 'pointer', overflow: 'hidden' }}
              onClick={() => setActiveLightboxIndex(3)}
            >
              <img
                src={allImages[3]}
                alt="Media 4"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.55)',
                  backdropFilter: 'blur(2px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontSize: '28px',
                  fontWeight: '800'
                }}
              >
                +{count - 3}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* LIGHTBOX PHÓNG TO ẢNH (MODAL FULLSCREEN) */}
      {activeLightboxIndex !== null && (
        <div
          onClick={() => setActiveLightboxIndex(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(0, 0, 0, 0.92)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          {/* Header Lightbox */}
          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '24px',
              right: '24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: '#ffffff'
            }}
          >
            <span style={{ fontSize: '14px', fontWeight: '600', opacity: 0.8 }}>
              Ảnh {activeLightboxIndex + 1} / {count}
            </span>
            <button
              onClick={() => setActiveLightboxIndex(null)}
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                border: 'none',
                color: '#ffffff',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                fontSize: '18px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)')}
            >
              ✕
            </button>
          </div>

          {/* Ảnh lớn chính giữa */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '90vw',
              maxHeight: '82vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <img
              src={allImages[activeLightboxIndex]}
              alt={`Xem to ${activeLightboxIndex + 1}`}
              style={{
                maxWidth: '90vw',
                maxHeight: '82vh',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.8)'
              }}
            />
          </div>

          {/* Nút Previous */}
          {count > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveLightboxIndex((prev) => (prev > 0 ? prev - 1 : count - 1));
              }}
              style={{
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                color: '#ffffff',
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                fontSize: '22px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.4)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)')}
            >
              ❮
            </button>
          )}

          {/* Nút Next */}
          {count > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveLightboxIndex((prev) => (prev < count - 1 ? prev + 1 : 0));
              }}
              style={{
                position: 'absolute',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                color: '#ffffff',
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                fontSize: '22px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.4)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)')}
            >
              ❯
            </button>
          )}
        </div>
      )}
    </>
  );
};
