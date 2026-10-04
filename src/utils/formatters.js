// src/utils/formatters.js
/**
 * Định dạng thời gian theo phong cách tương đối thân thiện (VD: Vừa xong, 5 phút trước)
 * hoặc dạng ngày tháng nếu đã quá 7 ngày.
 */
export function formatDate(dateInput) {
  if (!dateInput) return 'Vừa xong';
  try {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return String(dateInput);
    const now = new Date();
    const diffSec = Math.floor((now - date) / 1000);
    if (diffSec < 60) return 'Vừa xong';
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin} phút trước`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `${diffHours} giờ trước`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays} ngày trước`;
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } catch {
    return String(dateInput);
  }
}

/**
 * Rút gọn số lượng lớn (VD: 1400 -> 1.4K, 2400000 -> 2.4M)
 */
export function formatNumber(num) {
  const n = Number(num);
  if (isNaN(n)) return num;
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  return String(n);
}

/**
 * Lấy chữ cái viết tắt đại diện tên (VD: Minh Anh -> MA)
 */
export function getInitials(name) {
  if (!name) return 'SO';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
