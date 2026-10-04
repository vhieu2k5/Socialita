import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import {
  INITIAL_USER,
  INITIAL_POSTS,
  INITIAL_STORIES,
  INITIAL_FRIENDS,
  INITIAL_FRIEND_REQUESTS,
  INITIAL_FRIEND_SUGGESTIONS,
  INITIAL_TRENDS,
  INITIAL_GROUPS,
  MOCK_ACCOUNT
} from '../data/initialData';

const SocialContext = createContext(undefined);

export const SocialProvider = ({ children }) => {
  // 1. Quản lý phiên người dùng đăng nhập
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('currentUser');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [tab, setTab] = useState('home');
  const [feedFilter, setFeedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('currentUser');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_USER,
          id: parsed.id || INITIAL_USER.id,
          name: parsed.full_name || parsed.name || INITIAL_USER.name,
          username: parsed.username || INITIAL_USER.username,
          avatar_url: parsed.avatar_url || ''
        };
      }
    } catch {}
    return INITIAL_USER;
  });

  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [stories, setStories] = useState(INITIAL_STORIES);
  const [friends, setFriends] = useState(INITIAL_FRIENDS);
  const [friendRequests, setFriendRequests] = useState(INITIAL_FRIEND_REQUESTS);
  const [friendSuggestions, setFriendSuggestions] = useState(INITIAL_FRIEND_SUGGESTIONS);
  const [trends] = useState(INITIAL_TRENDS);
  const [groups, setGroups] = useState(INITIAL_GROUPS);

  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  const showToast = (msg, type = 'success') => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts(prev => [...prev, { id, msg, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 2800);
  };

  // 2. Tải danh sách bài viết từ Backend MySQL khi khởi động
  useEffect(() => {
    const loadPostsFromBackend = async () => {
      try {
        const res = await api.getPosts({ current_user_id: user.id });
        if (res && res.posts && Array.isArray(res.posts) && res.posts.length > 0) {
          const formatted = res.posts.map(p => ({
            id: String(p.id),
            authorName: p.full_name || p.username || 'Người dùng Socialita',
            authorAvatar: p.avatar_url || '',
            authorAvatarBg: '#e52e3d',
            time: p.created_at || 'Vừa xong',
            content: p.content || '',
            location: p.location || '',
            mediaGradient: p.gradient || '',
            image_url: p.image_url || '',
            mediaUrl: p.image_url || '',
            likes: Number(p.reaction_count) || 0,
            liked: Boolean(p.user_has_reacted),
            commentsCount: Number(p.comment_count) || 0,
            sharesCount: 0,
            category: 'all',
            comments: []
          }));
          setPosts(formatted);
        }
      } catch (err) {
        console.warn('Backend chưa sẵn sàng hoặc rỗng, dùng dữ liệu mẫu tĩnh:', err.message);
      }
    };

    loadPostsFromBackend();
  }, [user.id]);

  // 3. Đăng nhập
  const login = async (email, password) => {
    try {
      const data = await api.login(email, password);
      if (data && data.user) {
        const authUser = {
          id: data.user.id,
          name: data.user.full_name || data.user.username,
          email: data.user.email,
          role: data.role || data.user.roles || 'user',
          avatarBg: '#35c9b0',
          avatar_url: data.user.avatar_url
        };
        setCurrentUser(authUser);
        setUser(prev => ({ ...prev, ...authUser }));
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        showToast(`Đăng nhập thành công với vai trò: ${authUser.role}`);
        return true;
      }
    } catch (apiErr) {
      // Fallback kiểm tra Mock Account nếu Backend chưa chạy
      const foundUser = MOCK_ACCOUNT.find(
        acc => acc.email === email && acc.password === password
      );
      if (foundUser) {
        setCurrentUser(foundUser);
        setUser(prev => ({ ...prev, name: foundUser.name }));
        localStorage.setItem('currentUser', JSON.stringify(foundUser));
        showToast(`Đăng nhập thành công với vai trò: ${foundUser.role}`);
        return true;
      }
      showToast(apiErr.message || 'Email hoặc mật khẩu không đúng', 'error');
      return false;
    }
  };

  // 4. Đăng ký
  const register = async (name, email, password, username) => {
    try {
      const data = await api.register({
        full_name: name,
        email,
        password,
        username: username || email.split('@')[0]
      });
      showToast('Đăng ký thành công! Hãy đăng nhập');
      return true;
    } catch (err) {
      showToast(err.message || 'Lỗi đăng ký tài khoản', 'error');
      return false;
    }
  };

  // 5. Đăng xuất
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setTab('home');
    showToast('Đã đăng xuất khỏi hệ thống', 'info');
  };

  // 6. Cập nhật hồ sơ cá nhân
  const updateUser = async (updated) => {
    setUser(prev => ({
      ...prev,
      ...updated,
      intro: { ...prev.intro, ...(updated.intro || {}) }
    }));
    try {
      await api.updateUser(user.id, updated);
      showToast('Cập nhật thông tin thành công!');
    } catch {
      showToast('Đã lưu thông tin trên trình duyệt');
    }
  };

  // 7. Tải lên Avatar cá nhân
  const uploadAvatar = async (file) => {
    try {
      const res = await api.uploadAvatar(user.id, file);
      if (res && res.avatar_url) {
        setUser(prev => ({ ...prev, avatar_url: res.avatar_url }));
        showToast('Cập nhật ảnh đại diện thành công!');
      }
    } catch (err) {
      showToast('Lỗi khi tải ảnh đại diện lên máy chủ', 'error');
    }
  };

  // 8. ĐĂNG BÀI VIẾT MỚI (Hỗ trợ File Ảnh/Video và lưu Database MySQL)
  const createPost = async ({ content, location, gradient, category = 'all', file = null }) => {
    let uploadedImageUrl = '';

    // Nếu người dùng chọn file ảnh/video, upload lên backend trước
    if (file) {
      try {
        const uploadRes = await api.uploadPostImage(file);
        if (uploadRes && uploadRes.image_url) {
          uploadedImageUrl = uploadRes.image_url;
        }
      } catch (err) {
        console.warn('Lỗi upload file ảnh lên máy chủ, tạo preview tạm:', err.message);
        uploadedImageUrl = URL.createObjectURL(file);
      }
    }

    const postPayload = {
      content,
      location: location || null,
      gradient: uploadedImageUrl ? null : (gradient || null),
      image_url: uploadedImageUrl || null
    };

    let serverPostId = `p-${Date.now()}`;

    try {
      const res = await api.createPost(user.id || 1, postPayload);
      if (res && res.postId) {
        serverPostId = String(res.postId);
      }
      showToast('Đăng bài thành công và đã lưu vào CSDL!');
    } catch (err) {
      console.warn('Không thể gửi bài lên database, thêm bài viết cục bộ:', err.message);
      showToast('Đã đăng bài viết mới!');
    }

    const newPost = {
      id: serverPostId,
      authorName: user.name,
      authorAvatar: user.avatar_url || '',
      authorAvatarBg: user.avatarBg || '#35c9b0',
      time: 'Vừa xong · Công khai',
      isPublic: true,
      content,
      location,
      mediaGradient: uploadedImageUrl ? null : gradient,
      image_url: uploadedImageUrl,
      mediaUrl: uploadedImageUrl,
      likes: 0,
      liked: false,
      commentsCount: 0,
      sharesCount: 0,
      comments: [],
      category
    };

    setPosts(prev => [newPost, ...prev]);
    setUser(prev => ({
      ...prev,
      stats: { ...prev.stats, posts: (prev.stats?.posts || 0) + 1 }
    }));
    setIsCreatePostModalOpen(false);
  };

  // 9. Thả tim / Like bài viết
  const toggleLikePost = async (postId) => {
    setPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          const nextLiked = !p.liked;
          return {
            ...p,
            liked: nextLiked,
            likes: nextLiked ? p.likes + 1 : Math.max(0, p.likes - 1)
          };
        }
        return p;
      })
    );

    try {
      await api.reactToPost(postId, user.id);
    } catch (err) {
      console.warn('Lỗi gửi reaction tới máy chủ:', err.message);
    }
  };

  // 10. Bình luận bài viết
  const addCommentPost = async (postId, text) => {
    if (!text.trim()) return;

    const newComment = {
      id: `c-${Date.now()}`,
      authorName: user.name,
      content: text,
      time: 'Vừa xong'
    };

    setPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            commentsCount: (p.commentsCount || 0) + 1,
            comments: [...(p.comments || []), newComment]
          };
        }
        return p;
      })
    );

    showToast('Đã gửi bình luận');

    try {
      await api.addComment(postId, user.id, text);
    } catch (err) {
      console.warn('Lỗi lưu bình luận lên máy chủ:', err.message);
    }
  };

  // 11. Xóa bài viết
  const deletePost = async (postId) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
    showToast('Đã xóa bài viết khỏi bảng tin!', 'info');

    try {
      await api.deletePost(postId);
    } catch (err) {
      console.warn('Lỗi xóa bài trên máy chủ:', err.message);
    }
  };

  const sharePost = (postId) => {
    setPosts(prev =>
      prev.map(p => (p.id === postId ? { ...p, sharesCount: (p.sharesCount || 0) + 1 } : p))
    );
    showToast('Đã sao chép liên kết chia sẻ!');
  };

  const addStory = () => {
    const newStory = {
      id: `s-${Date.now()}`,
      userName: user.name,
      avatarBg: '#35c9b0',
      seen: false
    };
    setStories(prev => [prev[0], newStory, ...prev.slice(1)]);
    showToast('Đã thêm Story mới của bạn!');
  };

  const acceptRequest = (reqId) => {
    const req = friendRequests.find(r => r.id === reqId);
    if (!req) return;

    const newFriend = {
      id: `fr-${Date.now()}`,
      name: req.name,
      friendSince: 'Vừa kết bạn',
      mutualFriends: req.mutualFriends,
      avatarBg: req.avatarBg
    };

    setFriends(prev => [newFriend, ...prev]);
    setFriendRequests(prev => prev.filter(r => r.id !== reqId));
    showToast(`Đã đồng ý kết bạn với ${req.name}`);
  };

  const rejectRequest = (reqId) => {
    const req = friendRequests.find(r => r.id === reqId);
    setFriendRequests(prev => prev.filter(r => r.id !== reqId));
    if (req) showToast(`Đã từ chối lời mời của ${req.name}`, 'info');
  };

  const sendRequest = (sugId) => {
    setFriendSuggestions(prev =>
      prev.map(s => (s.id === sugId ? { ...s, requested: true } : s))
    );
    const sug = friendSuggestions.find(s => s.id === sugId);
    if (sug) showToast(`Đã gửi lời mời kết bạn đến ${sug.name}`);
  };

  return (
    <SocialContext.Provider
      value={{
        currentUser,
        login,
        register,
        logout,
        tab,
        setTab,
        feedFilter,
        setFeedFilter,
        searchQuery,
        setSearchQuery,
        user,
        updateUser,
        uploadAvatar,
        posts,
        createPost,
        toggleLikePost,
        addCommentPost,
        deletePost,
        sharePost,
        stories,
        addStory,
        friends,
        friendRequests,
        friendSuggestions,
        acceptRequest,
        rejectRequest,
        sendRequest,
        trends,
        groups,
        isCreatePostModalOpen,
        openCreatePostModal: () => setIsCreatePostModalOpen(true),
        closeCreatePostModal: () => setIsCreatePostModalOpen(false),
        isEditProfileModalOpen,
        openEditProfileModal: () => setIsEditProfileModalOpen(true),
        closeEditProfileModal: () => setIsEditProfileModalOpen(false),
        toasts,
        showToast
      }}
    >
      {children}
    </SocialContext.Provider>
  );
};

export const useSocial = () => {
  const context = useContext(SocialContext);
  if (!context) throw new Error('useSocial phải được sử dụng bên trong SocialProvider');
  return context;
};
