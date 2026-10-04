// src/services/api.js
/**
 * Tầng dịch vụ giao tiếp với Backend REST API
 * Tự động đọc biến môi trường VITE_API_URL từ file .env
 */
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// Helper gọi fetch có timeout & bắt lỗi
async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const defaultHeaders = {};
  if (!(options.body instanceof FormData)) {
    defaultHeaders['Content-Type'] = 'application/json';
  }

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {})
    }
  };

  try {
    const res = await fetch(url, config);
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const errorMsg = data.message || `Lỗi HTTP: ${res.status}`;
      throw new Error(errorMsg);
    }
    return data;
  } catch (err) {
    console.warn(`[API Error] ${endpoint}:`, err.message);
    throw err;
  }
}

export const api = {
  // === AUTH ===
  login: (identifier, password) =>
    request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: identifier, password })
    }),

  register: (userData) =>
    request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    }),

  // === POSTS & FEED ===
  getPosts: (params = {}) => {
    const query = new URLSearchParams();
    if (params.filter) query.append('filter', params.filter);
    if (params.current_user_id) query.append('current_user_id', params.current_user_id);
    if (params.userId) query.append('userId', params.userId);
    const qs = query.toString() ? `?${query.toString()}` : '';
    return request(`/api/posts${qs}`);
  },

  getUserPosts: (userId, currentUserId) => {
    const qs = currentUserId ? `?current_user_id=${currentUserId}` : '';
    return request(`/api/users/${userId}/posts${qs}`);
  },

  uploadPostImage: async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    return request('/api/posts/upload-image', {
      method: 'POST',
      body: formData
    });
  },

  createPost: (userId, postData) =>
    request(`/api/users/${userId}/posts`, {
      method: 'POST',
      body: JSON.stringify(postData)
    }),

  deletePost: (postId) =>
    request(`/api/posts/${postId}`, {
      method: 'DELETE'
    }),

  reactToPost: (postId, userId, type = 'love') =>
    request(`/api/posts/${postId}/react`, {
      method: 'POST',
      body: JSON.stringify({ user_id: userId, type })
    }),

  getComments: (postId) =>
    request(`/api/posts/${postId}/comments`),

  addComment: (postId, userId, content) =>
    request(`/api/posts/${postId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ user_id: userId, content })
    }),

  deleteComment: (commentId) =>
    request(`/api/comments/${commentId}`, {
      method: 'DELETE'
    }),

  // === USER PROFILE ===
  getUser: (userId) =>
    request(`/api/users/${userId}`),

  updateUser: (userId, data) =>
    request(`/api/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),

  uploadAvatar: async (userId, file) => {
    const formData = new FormData();
    formData.append('avatar', file);
    return request(`/api/users/${userId}/avatar`, {
      method: 'POST',
      body: formData
    });
  },

  // === FRIENDS & GROUPS ===
  getFriends: (userId) =>
    request(`/api/users/${userId}/friends`),

  getFriendRequests: (userId) =>
    request(`/api/users/${userId}/friend-requests`),

  getSuggestions: (userId) =>
    request(`/api/users/${userId}/suggestions`),

  sendFriendRequest: (userId1, userId2) =>
    request('/api/friends/request', {
      method: 'POST',
      body: JSON.stringify({ user_id1: userId1, user_id2: userId2 })
    }),

  respondFriendRequest: (userId1, userId2, status) =>
    request('/api/friends/respond', {
      method: 'POST',
      body: JSON.stringify({ user_id1: userId1, user_id2: userId2, status })
    })
};
