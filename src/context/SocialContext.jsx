import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { formatDate } from '../utils/formatters';
import {
  INITIAL_USER,
  INITIAL_POSTS,
  INITIAL_STORIES,
  INITIAL_FRIENDS,
  INITIAL_FRIEND_REQUESTS,
  INITIAL_FRIEND_SUGGESTIONS,
  INITIAL_TRENDS,
  INITIAL_GROUPS,
  MY_JOINED_GROUPS,
  MOCK_ACCOUNT
} from '../data/initialData';

const SocialContext = createContext(undefined);

const INITIAL_ACTIVE_USERS = [
  { id: 'u1', name: 'Hải Yến', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', isOnline: true },
  { id: 'u2', name: 'Đức Anh', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', isOnline: true },
  { id: 'u3', name: 'Thuỳ Linh', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop', isOnline: true },
  { id: 'u4', name: 'Bảo Trân', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', isOnline: true },
  { id: 'u5', name: 'Tấn Phát', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', isOnline: true }
];

const INITIAL_CONVERSATIONS = [
  {
    id: 'conv-1',
    name: 'Quang Huy',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    isOnline: true,
    isGroup: false,
    time: '2 phút',
    unread: 0,
    lastMessage: 'Ê, mai đi Đà Lạt nhớ mang theo áo k',
    messages: [
      { id: 1, sender: 'Quang Huy', text: 'Hôm nay chuẩn bị đồ đi du lịch chưa ông?', time: '14:20', isMe: false },
      { id: 2, sender: 'Bạn', text: 'Gần xong rồi ông ơi, đang soạn balo!', time: '14:22', isMe: true },
      { id: 3, sender: 'Quang Huy', text: 'Ê, mai đi Đà Lạt nhớ mang theo áo khoác ấm nhé!', time: '14:25', isMe: false }
    ]
  },
  {
    id: 'conv-2',
    name: 'Nhóm: Đồ án Web',
    avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop',
    isOnline: true,
    isGroup: true,
    time: '14 phút',
    unread: 5,
    lastMessage: 'Hải Đăng: Mình vừa đẩy code lên nh',
    messages: [
      { id: 1, sender: 'Minh Tuấn', text: 'Mọi người test phần backend chưa?', time: '10:15', isMe: false },
      { id: 2, sender: 'Hải Đăng', text: 'Mình vừa đẩy code lên nhánh mới rồi nhé!', time: '10:30', isMe: false }
    ]
  },
  {
    id: 'conv-3',
    name: 'Hải Yến',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    isOnline: true,
    isGroup: false,
    time: '1 giờ',
    unread: 0,
    lastMessage: '✓ Bạn: Ảnh đẹp lắm, gửi thêm mình xin và',
    messages: [
      { id: 1, sender: 'Hải Yến', text: 'Ảnh hôm nọ chụp ở trường nè bạn!', time: '09:12', isMe: false },
      { id: 2, sender: 'Bạn', text: 'Ảnh đẹp lắm, gửi thêm mình xin vài tấm nữa nha', time: '09:15', isMe: true }
    ]
  },
  {
    id: 'conv-4',
    name: 'Bảo Trân',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    isOnline: true,
    isGroup: false,
    time: '3 giờ',
    unread: 1,
    lastMessage: 'Video call tối nay lúc 8h nha 📹',
    messages: [
      { id: 1, sender: 'Bảo Trân', text: 'Tối nay rảnh họp nhóm online không?', time: '08:00', isMe: false },
      { id: 2, sender: 'Bảo Trân', text: 'Video call tối nay lúc 8h nha 📹', time: '08:05', isMe: false }
    ]
  },
  {
    id: 'conv-5',
    name: 'Đức Anh',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    isOnline: false,
    isIdle: true,
    isGroup: false,
    isMuted: true,
    time: '5 giờ',
    unread: 0,
    lastMessage: '⟲ Bạn: Ok để mình xem lại lịch',
    messages: [
      { id: 1, sender: 'Đức Anh', text: 'Cuối tuần này rảnh cafe không ông?', time: 'Hôm qua', isMe: false },
      { id: 2, sender: 'Bạn', text: 'Ok để mình xem lại lịch rồi báo lại nha', time: 'Hôm qua', isMe: true }
    ]
  },
  {
    id: 'conv-6',
    name: 'Lan Anh',
    avatar: '',
    avatarBg: '#dc2626',
    isOnline: true,
    isGroup: false,
    time: 'Hôm qua',
    unread: 0,
    lastMessage: 'Bạn: Test',
    messages: [
      { id: 1, sender: 'Lan Anh', text: 'Minh Anh ơi, cuối tuần này có rảnh đi cafe không?', time: '18:00', isMe: false },
      { id: 2, sender: 'Bạn', text: 'Okie bạn ơi, chiều thứ 7 hẹn ở Phố Cổ nhé!', time: '18:15', isMe: true },
      { id: 3, sender: 'Bạn', text: 'Hi', time: '10:59', isMe: true },
      { id: 4, sender: 'Bạn', text: 'Chào bạn nha', time: '11:31', isMe: true },
      { id: 5, sender: 'Bạn', text: 'Test', time: '08:04', isMe: true }
    ]
  }
];

const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    user: 'Lê Minh Anh',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
    type: 'like',
    icon: '❤️',
    iconBg: '#e52e3d',
    content: 'đã thích bài viết của bạn: "Check-in Hải Phòng cuối tuần..."',
    time: '5 phút trước',
    unread: true
  },
  {
    id: 'notif-2',
    user: 'Quang Huy',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    type: 'comment',
    icon: '💬',
    iconBg: '#3b82f6',
    content: 'đã bình luận về bài viết của bạn: "Quá đỉnh luôn bạn ơi!"',
    time: '25 phút trước',
    unread: true
  },
  {
    id: 'notif-3',
    user: 'Thuỳ Linh',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop',
    type: 'friend',
    icon: '👥',
    iconBg: '#10b981',
    content: 'đã gửi lời mời kết bạn cho bạn',
    time: '1 giờ trước',
    unread: true,
    isFriendReq: true
  },
  {
    id: 'notif-4',
    user: 'Bảo Trân',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    type: 'mention',
    icon: '🏷️',
    iconBg: '#8b5cf6',
    content: 'đã nhắc đến bạn trong một bình luận ở Hội nhóm sinh viên',
    time: '3 giờ trước',
    unread: false
  },
  {
    id: 'notif-5',
    user: 'Socialita',
    avatar: '/logo.png',
    type: 'system',
    icon: '🔔',
    iconBg: '#18181c',
    content: 'Chào mừng bạn đến với Socialita! Hãy hoàn thiện hồ sơ để kết nối cùng bạn bè.',
    time: 'Hôm qua',
    unread: false
  }
];


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
        const isDefaultDemoUser = Number(parsed.id) === 1;
        const joinedDateStr = parsed.created_at
          ? `Tham gia từ tháng ${new Date(parsed.created_at).getMonth() + 1}, ${new Date(parsed.created_at).getFullYear()}`
          : (isDefaultDemoUser ? INITIAL_USER.intro.joinedDate : 'Tham gia gần đây');

        return {
          id: parsed.id || INITIAL_USER.id,
          name: parsed.full_name || parsed.name || parsed.username || INITIAL_USER.name,
          username: parsed.username || INITIAL_USER.username,
          email: parsed.email || '',
          role: parsed.roles || parsed.role || 'user',
          avatar_url: parsed.avatar_url || '',
          avatarBg: '#35c9b0',
          bio: parsed.bio !== null && parsed.bio !== undefined ? parsed.bio : (isDefaultDemoUser ? INITIAL_USER.bio : ''),
          school: parsed.school !== null && parsed.school !== undefined ? parsed.school : (isDefaultDemoUser ? INITIAL_USER.intro.school : ''),
          liveIn: parsed.liveIn !== null && parsed.liveIn !== undefined ? parsed.liveIn : (isDefaultDemoUser ? INITIAL_USER.intro.liveIn : ''),
          intro: {
            school: parsed.school !== null && parsed.school !== undefined ? parsed.school : (isDefaultDemoUser ? INITIAL_USER.intro.school : ''),
            liveIn: parsed.liveIn !== null && parsed.liveIn !== undefined ? parsed.liveIn : (isDefaultDemoUser ? INITIAL_USER.intro.liveIn : ''),
            joinedDate: joinedDateStr
          },
          stats: {
            posts: 0,
            friends: 0,
            followers: isDefaultDemoUser ? '1.4K' : 0,
            groups: 0
          }
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

  // Quản lý hội nhóm đã tham gia (Riêng biệt cho từng tài khoản)
  const [joinedGroups, setJoinedGroups] = useState(() => {
    try {
      const saved = localStorage.getItem('currentUser');
      if (saved) {
        const u = JSON.parse(saved);
        const stored = localStorage.getItem(`socialita_groups_${u.id}`);
        if (stored) return JSON.parse(stored);
        if (Number(u.id) === 1) return MY_JOINED_GROUPS;
        return [];
      }
    } catch {}
    return MY_JOINED_GROUPS;
  });

  const toggleJoinGroup = (group) => {
    setJoinedGroups(prev => {
      const isJoined = prev.some(g => g.id === group.id || g.name === group.name);
      let next;
      if (isJoined) {
        next = prev.filter(g => g.id !== group.id && g.name !== group.name);
        showToast(`Đã rời khỏi nhóm "${group.name}"`, 'info');
      } else {
        next = [...prev, group];
        showToast(`Đã tham gia nhóm "${group.name}" thành công!`);
      }
      try {
        if (user?.id) {
          localStorage.setItem(`socialita_groups_${user.id}`, JSON.stringify(next));
        }
      } catch {}
      return next;
    });
  };

  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [selectedFriendProfile, setSelectedFriendProfile] = useState(null);
  const [friendProfilePosts, setFriendProfilePosts] = useState([]);
  const [isLoadingFriendProfile, setIsLoadingFriendProfile] = useState(false);
  const [toasts, setToasts] = useState([]);

  // State Tin nhắn & Thông báo (FE chuẩn Facebook Web)
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [activeChat, setActiveChat] = useState(null);
  const [conversations, setConversations] = useState(INITIAL_CONVERSATIONS);
  const [activeUsers, setActiveUsers] = useState(INITIAL_ACTIVE_USERS);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const unreadMessagesCount = conversations.reduce((acc, c) => acc + (c.unread || 0), 0);
  const unreadNotificationsCount = notifications.filter(n => n.unread).length;

  const toggleMessages = () => {
    setIsMessagesOpen(prev => !prev);
    setIsNotificationsOpen(false);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(prev => !prev);
    setIsMessagesOpen(false);
  };

  const closeDrawers = () => {
    setIsMessagesOpen(false);
    setIsNotificationsOpen(false);
  };

  const openChat = (conv) => {
    setConversations(prev => prev.map(c => c.id === conv.id ? { ...c, unread: 0 } : c));
    setActiveChat({ ...conv, unread: 0 });
    setIsMessagesOpen(false);
  };

  const closeChat = () => {
    setActiveChat(null);
  };

  const sendMessage = (convId, text) => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newMsg = {
      id: Date.now(),
      sender: user.name || 'Bạn',
      text,
      time: timeStr,
      isMe: true
    };

    setConversations(prev => prev.map(c => {
      if (c.id === convId) {
        return {
          ...c,
          lastMessage: 'Bạn: ' + text,
          time: timeStr,
          messages: [...(c.messages || []), newMsg]
        };
      }
      return c;
    }));

    if (activeChat && activeChat.id === convId) {
      setActiveChat(prev => ({
        ...prev,
        lastMessage: 'Bạn: ' + text,
        messages: [...(prev.messages || []), newMsg]
      }));

      // Mô phỏng người kia trả lời sau 1.2s để giao diện sống động
      setTimeout(() => {
        const replyNow = new Date();
        const replyTime = `${String(replyNow.getHours()).padStart(2, '0')}:${String(replyNow.getMinutes()).padStart(2, '0')}`;
        const replyMsg = {
          id: Date.now() + 1,
          sender: activeChat.name,
          text: 'Ok bạn nha, mình nhận được tin nhắn rồi!',
          time: replyTime,
          isMe: false
        };
        setConversations(prev => prev.map(c => {
          if (c.id === convId) {
            return {
              ...c,
              lastMessage: replyMsg.text,
              time: replyTime,
              messages: [...(c.messages || []), replyMsg]
            };
          }
          return c;
        }));
        setActiveChat(prev => {
          if (prev && prev.id === convId) {
            return {
              ...prev,
              lastMessage: replyMsg.text,
              messages: [...(prev.messages || []), replyMsg]
            };
          }
          return prev;
        });
      }, 1200);
    }
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };


  const showToast = (msg, type = 'success') => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts(prev => [...prev, { id, msg, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 2800);
  };

  // Helper chuyển đổi image_url (đơn lẻ, JSON mảng, hoặc phân tách bằng dấu phẩy) thành mảng ảnh
  const parsePostImages = (source) => {
    if (!source) return [];
    if (Array.isArray(source)) return source.filter(Boolean);
    if (typeof source === 'string') {
      const trimmed = source.trim();
      if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
        try {
          const parsed = JSON.parse(trimmed);
          if (Array.isArray(parsed)) return parsed.filter(Boolean);
        } catch (e) {}
      }
      if (trimmed.includes(',')) {
        return trimmed.split(',').map(s => s.trim()).filter(Boolean);
      }
      return [trimmed];
    }
    return [];
  };

  // 2. Tải danh sách bài viết từ Backend MySQL khi khởi động
  const loadPostsFromBackend = async (overrideUserId) => {
    try {
      const targetUserId = overrideUserId !== undefined ? overrideUserId : user.id;
      const res = await api.getPosts({ current_user_id: targetUserId });
      if (res && res.posts && Array.isArray(res.posts) && res.posts.length > 0) {
        const formatted = res.posts.map(p => {
          const imgs = parsePostImages(p.image_url);
          const privacyLabel = p.privacy === 'private' ? 'Chỉ mình tôi' : (p.privacy === 'friends' ? 'Bạn bè' : 'Công khai');
          return {
            id: String(p.id),
            user_id: p.user_id,
            authorName: p.full_name || p.username || 'Người dùng Socialita',
            authorAvatar: p.avatar_url || '',
            authorAvatarBg: '#e52e3d',
            time: p.created_at ? `${formatDate(p.created_at)} · ${privacyLabel}` : `Vừa xong · ${privacyLabel}`,
            privacy: p.privacy || 'public',
            isPublic: p.privacy === 'public' || !p.privacy,
            content: p.content || '',
            location: p.location || '',
            mediaGradient: p.gradient || '',
            image_url: p.image_url || '',
            mediaUrl: imgs[0] || p.image_url || '',
            images: imgs,
            likes: Number(p.reaction_count) || 0,
            liked: Boolean(p.user_has_reacted),
            commentsCount: Number(p.comment_count) || 0,
            sharesCount: 0,
            category: 'all',
            comments: []
          };
        });
        setPosts(formatted);
      }
    } catch (err) {
      console.warn('Backend chưa sẵn sàng hoặc rỗng, dùng dữ liệu mẫu tĩnh:', err.message);
    }
  };

  // 2b. Tải danh sách bạn bè, lời mời kết bạn và gợi ý kết bạn từ Backend MySQL
  const loadFriendsFromBackend = async (overrideUserId) => {
    try {
      const targetUserId = overrideUserId !== undefined ? overrideUserId : user.id;
      if (!targetUserId) return;

      // 1. Tải danh sách bạn bè đã kết bạn (status = 'accepted')
      try {
        const resFriends = await api.getFriends(targetUserId);
        if (resFriends && Array.isArray(resFriends.friends)) {
          const formattedFriends = resFriends.friends.map(f => {
            let friendSinceStr = 'Bạn bè';
            if (f.friendship_date) {
              const d = new Date(f.friendship_date);
              if (!isNaN(d.getTime())) {
                friendSinceStr = `Bạn từ ${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
              }
            }
            return {
              id: f.id,
              name: f.full_name || f.username || 'Người dùng Socialita',
              username: f.username,
              avatar_url: f.avatar_url || '',
              avatarBg: '#e52e3d',
              friendSince: friendSinceStr,
              mutualFriends: 0,
              bio: f.bio || '',
              school: f.school || '',
              liveIn: f.liveIn || ''
            };
          });
          setFriends(formattedFriends);
        }
      } catch (err) {
        console.warn('Không thể tải danh sách bạn bè từ server:', err.message);
      }

      // 2. Tải danh sách lời mời kết bạn (pending requests)
      try {
        const resRequests = await api.getFriendRequests(targetUserId);
        if (resRequests && Array.isArray(resRequests.requests)) {
          const formattedRequests = resRequests.requests.map(r => ({
            id: r.requester_id,
            requester_id: r.requester_id,
            name: r.full_name || r.username || 'Người dùng',
            username: r.username,
            avatar_url: r.avatar_url || '',
            avatarBg: '#ff7675',
            time: r.created_at ? formatDate(r.created_at) : 'Mới đây',
            mutualFriends: 0
          }));
          setFriendRequests(formattedRequests);
        }
      } catch (err) {
        console.warn('Không thể tải lời mời kết bạn từ server:', err.message);
      }

      // 3. Tải danh sách gợi ý kết bạn
      try {
        const resSuggestions = await api.getSuggestions(targetUserId);
        if (resSuggestions && Array.isArray(resSuggestions.suggestions) && resSuggestions.suggestions.length > 0) {
          const formattedSuggestions = resSuggestions.suggestions.map(s => ({
            id: s.id,
            name: s.full_name || s.username || 'Người dùng',
            username: s.username,
            avatar_url: s.avatar_url || '',
            avatarBg: '#4c8dff',
            mutualFriends: 0,
            requested: false
          }));
          setFriendSuggestions(formattedSuggestions);
        }
      } catch (err) {
        console.warn('Không thể tải gợi ý kết bạn từ server:', err.message);
      }
    } catch (err) {
      console.warn('Lỗi khi tải dữ liệu bạn bè từ backend:', err.message);
    }
  };

  // 2c. Tải thông tin chi tiết của người dùng từ Backend MySQL
  const loadUserProfile = async (overrideUserId) => {
    try {
      const targetUserId = overrideUserId !== undefined ? overrideUserId : user.id;
      if (!targetUserId) return;
      const res = await api.getUser(targetUserId);
      if (res && res.user) {
        const u = res.user;
        const isDefaultDemoUser = Number(u.id) === 1;
        const joinedDateStr = u.created_at
          ? `Tham gia từ tháng ${new Date(u.created_at).getMonth() + 1}, ${new Date(u.created_at).getFullYear()}`
          : (isDefaultDemoUser ? INITIAL_USER.intro.joinedDate : 'Tham gia gần đây');

        setUser(prev => ({
          ...prev,
          id: u.id,
          name: u.full_name || u.username || prev.name,
          username: u.username || prev.username,
          email: u.email || prev.email,
          role: u.roles || prev.role || 'user',
          avatar_url: u.avatar_url || '',
          bio: u.bio !== null && u.bio !== undefined ? u.bio : (isDefaultDemoUser ? INITIAL_USER.bio : ''),
          school: u.school !== null && u.school !== undefined ? u.school : (isDefaultDemoUser ? INITIAL_USER.intro.school : ''),
          liveIn: u.liveIn !== null && u.liveIn !== undefined ? u.liveIn : (isDefaultDemoUser ? INITIAL_USER.intro.liveIn : ''),
          intro: {
            school: u.school !== null && u.school !== undefined ? u.school : (isDefaultDemoUser ? INITIAL_USER.intro.school : ''),
            liveIn: u.liveIn !== null && u.liveIn !== undefined ? u.liveIn : (isDefaultDemoUser ? INITIAL_USER.intro.liveIn : ''),
            joinedDate: joinedDateStr
          },
          stats: {
            posts: u.post_count !== undefined ? Number(u.post_count) : 0,
            friends: u.friend_count !== undefined ? Number(u.friend_count) : 0,
            followers: isDefaultDemoUser ? '1.4K' : 0,
            groups: prev.stats?.groups || 0
          }
        }));
      }
    } catch (err) {
      console.warn('Không thể tải profile chi tiết:', err.message);
    }
  };

  useEffect(() => {
    loadUserProfile();
    loadPostsFromBackend();
    loadFriendsFromBackend();
  }, [user.id, user.name]);

  useEffect(() => {
    if (!user?.id) return;
    try {
      const stored = localStorage.getItem(`socialita_groups_${user.id}`);
      if (stored) {
        setJoinedGroups(JSON.parse(stored));
      } else {
        setJoinedGroups(Number(user.id) === 1 ? MY_JOINED_GROUPS : []);
      }
    } catch {
      setJoinedGroups([]);
    }
  }, [user.id]);

  // 3. Đăng nhập
  const login = async (email, password) => {
    try {
      const data = await api.login(email, password);
      if (data && data.user) {
        const authUser = {
          id: data.user.id,
          name: data.user.full_name || data.user.username,
          username: data.user.username,
          email: data.user.email,
          role: data.role || data.user.roles || 'user',
          avatarBg: '#35c9b0',
          avatar_url: data.user.avatar_url || '',
          bio: data.user.bio || '',
          school: data.user.school || '',
          liveIn: data.user.liveIn || ''
        };
        setCurrentUser(authUser);
        setUser(prev => ({ ...prev, ...authUser }));
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        loadUserProfile(authUser.id);
        loadPostsFromBackend(authUser.id);
        loadFriendsFromBackend(authUser.id);
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

  // 4b. Đăng nhập bằng Google
  const loginWithGoogle = async (googleUserData) => {
    try {
      const data = await api.googleLogin(googleUserData);
      if (data && data.user) {
        const authUser = {
          id: data.user.id,
          name: data.user.full_name || data.user.username,
          username: data.user.username,
          email: data.user.email,
          role: data.role || data.user.roles || 'user',
          avatarBg: '#4285F4',
          avatar_url: data.user.avatar_url || '',
          bio: data.user.bio || '',
          school: data.user.school || '',
          liveIn: data.user.liveIn || ''
        };
        setCurrentUser(authUser);
        setUser(prev => ({ ...prev, ...authUser }));
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        loadUserProfile(authUser.id);
        loadPostsFromBackend(authUser.id);
        loadFriendsFromBackend(authUser.id);
        showToast(`Đăng nhập Google thành công! Chào mừng ${authUser.name}`);
        return true;
      }
    } catch (apiErr) {
      console.warn('Backend Google Auth error, fallback offline:', apiErr.message);
      // Fallback khi backend chưa chạy hoặc lỗi kết nối:
      const fallbackUser = {
        id: Date.now(),
        name: googleUserData.name || googleUserData.email?.split('@')[0] || 'Google User',
        email: googleUserData.email || 'user@gmail.com',
        role: 'user',
        avatarBg: '#4285F4',
        avatar_url: googleUserData.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop'
      };
      setCurrentUser(fallbackUser);
      setUser(prev => ({ ...prev, ...fallbackUser }));
      localStorage.setItem('currentUser', JSON.stringify(fallbackUser));
      showToast(`Đăng nhập Google thành công! Chào mừng ${fallbackUser.name}`);
      return true;
    }
    return false;
  };

  // 5. Đăng xuất
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setUser(INITIAL_USER);
    loadUserProfile(INITIAL_USER.id);
    loadPostsFromBackend(INITIAL_USER.id);
    loadFriendsFromBackend(INITIAL_USER.id);
    setTab('home');
    showToast('Đã đăng xuất khỏi hệ thống', 'info');
  };

  const openLogoutModal = () => setIsLogoutModalOpen(true);
  const closeLogoutModal = () => setIsLogoutModalOpen(false);
  const confirmLogout = () => {
    setIsLogoutModalOpen(false);
    logout();
  };

  // 6. Cập nhật hồ sơ cá nhân
  const updateUser = async (updated) => {
    const nextBio = updated.bio !== undefined ? updated.bio : (user.bio || '');
    const nextSchool = updated.school || updated.intro?.school || user.intro?.school || user.school || '';
    const nextLiveIn = updated.liveIn || updated.intro?.liveIn || user.intro?.liveIn || user.liveIn || '';
    const nextName = updated.name || user.name;

    setUser(prev => ({
      ...prev,
      ...updated,
      name: nextName,
      bio: nextBio,
      school: nextSchool,
      liveIn: nextLiveIn,
      intro: {
        ...prev.intro,
        school: nextSchool,
        liveIn: nextLiveIn
      }
    }));
    try {
      await api.updateUser(user.id, {
        full_name: nextName,
        bio: nextBio,
        school: nextSchool,
        liveIn: nextLiveIn
      });
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

  // 8. ĐĂNG BÀI VIẾT MỚI (Hỗ trợ nhiều File Ảnh/Video và lưu Database MySQL)
  const createPost = async ({ content, location, gradient, category = 'all', files = [], file = null, privacy = 'public' }) => {
    let uploadedImageUrls = [];

    // Hỗ trợ cả mảng files hoặc file đơn lẻ
    const filesList = files && files.length > 0 ? Array.from(files) : (file ? [file] : []);

    // Nếu người dùng chọn file ảnh/video, upload lên backend
    if (filesList.length > 0) {
      try {
        const uploadRes = await api.uploadPostImages(filesList);
        if (uploadRes && Array.isArray(uploadRes.image_urls) && uploadRes.image_urls.length > 0) {
          uploadedImageUrls = uploadRes.image_urls;
        } else if (uploadRes && uploadRes.image_url) {
          uploadedImageUrls = [uploadRes.image_url];
        }
      } catch (err) {
        console.warn('Lỗi upload file ảnh lên máy chủ, tạo preview tạm:', err.message);
        uploadedImageUrls = filesList.map(f => URL.createObjectURL(f));
      }
    }

    const finalImageUrl = uploadedImageUrls.length > 0
      ? (uploadedImageUrls.length === 1 ? uploadedImageUrls[0] : JSON.stringify(uploadedImageUrls))
      : null;

    const postPayload = {
      content,
      location: location || null,
      gradient: uploadedImageUrls.length > 0 ? null : (gradient || null),
      image_url: finalImageUrl,
      image_urls: uploadedImageUrls,
      privacy
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

    const privacyLabel = privacy === 'private' ? 'Chỉ mình tôi' : (privacy === 'friends' ? 'Bạn bè' : 'Công khai');
    const newPost = {
      id: serverPostId,
      user_id: user.id || 1,
      authorName: user.name,
      authorAvatar: user.avatar_url || '',
      authorAvatarBg: user.avatarBg || '#35c9b0',
      time: `Vừa xong · ${privacyLabel}`,
      isPublic: privacy === 'public',
      privacy,
      content,
      location,
      mediaGradient: uploadedImageUrls.length > 0 ? null : gradient,
      image_url: finalImageUrl || '',
      mediaUrl: uploadedImageUrls[0] || '',
      images: uploadedImageUrls,
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

  // 10a. Lấy danh sách bình luận của 1 bài viết từ Backend MySQL
  const getPostComments = async (postId) => {
    try {
      const res = await api.getComments(postId);
      if (res && Array.isArray(res.comments)) {
        const formatted = res.comments.map(c => ({
          id: c.id,
          post_id: c.post_id,
          parent_id: c.parent_id || null,
          user_id: c.user_id,
          authorName: c.full_name || c.username || 'Người dùng',
          authorAvatar: c.avatar_url || '',
          content: c.content || '',
          created_at: c.created_at,
          time: c.created_at ? formatDate(c.created_at) : 'Vừa xong'
        }));

        setPosts(prev =>
          prev.map(p => (String(p.id) === String(postId) ? { ...p, comments: formatted, commentsCount: formatted.length } : p))
        );

        return formatted;
      }
    } catch (err) {
      console.warn('Lỗi lấy bình luận từ backend:', err.message);
    }
    return [];
  };

  // 10b. Gửi bình luận mới vào bài viết (hỗ trợ parentId để trả lời kiểu Facebook)
  const addCommentPost = async (postId, text, parentId = null) => {
    if (!text || !text.trim()) return null;

    let createdComment = {
      id: `c-${Date.now()}`,
      post_id: postId,
      parent_id: parentId,
      user_id: user.id,
      authorName: user.name || 'Người dùng',
      authorAvatar: user.avatar_url || '',
      content: text,
      created_at: new Date().toISOString(),
      time: 'Vừa xong'
    };

    try {
      const res = await api.addComment(postId, user.id, text, parentId);
      if (res && res.comment) {
        createdComment = {
          id: res.comment.id,
          post_id: res.comment.post_id,
          parent_id: res.comment.parent_id || parentId,
          user_id: res.comment.user_id,
          authorName: res.comment.full_name || res.comment.username || user.name,
          authorAvatar: res.comment.avatar_url || user.avatar_url || '',
          content: res.comment.content,
          created_at: res.comment.created_at,
          time: 'Vừa xong'
        };
      }
      showToast('Đã gửi bình luận');
    } catch (err) {
      console.warn('Lỗi lưu bình luận lên máy chủ, lưu cục bộ:', err.message);
      showToast('Đã gửi bình luận');
    }

    setPosts(prev =>
      prev.map(p => {
        if (String(p.id) === String(postId)) {
          const currentList = Array.isArray(p.comments) ? p.comments : [];
          return {
            ...p,
            commentsCount: (p.commentsCount || 0) + 1,
            comments: [...currentList, createdComment]
          };
        }
        return p;
      })
    );

    return createdComment;
  };

  // 10c. Xóa bình luận
  const deleteCommentPost = async (commentId, postId) => {
    try {
      await api.deleteComment(commentId);
      showToast('Đã xóa bình luận', 'info');
    } catch (err) {
      console.warn('Lỗi xóa bình luận trên server:', err.message);
    }

    setPosts(prev =>
      prev.map(p => {
        if (String(p.id) === String(postId)) {
          const nextComments = (p.comments || []).filter(c => String(c.id) !== String(commentId));
          return {
            ...p,
            commentsCount: Math.max(0, (p.commentsCount || 1) - 1),
            comments: nextComments
          };
        }
        return p;
      })
    );
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

  const acceptRequest = async (reqId) => {
    const req = friendRequests.find(r => r.id === reqId || r.requester_id === reqId);
    const requesterId = req?.requester_id || reqId;

    try {
      await api.respondFriendRequest(requesterId, user.id, 'accept');
      showToast(`Đã đồng ý kết bạn với ${req?.name || 'người dùng'}`);
      loadFriendsFromBackend(user.id);
    } catch (err) {
      console.warn('Lỗi đồng ý kết bạn trên server:', err.message);
      if (req) {
        const newFriend = {
          id: req.requester_id || req.id,
          name: req.name,
          friendSince: 'Vừa kết bạn',
          mutualFriends: req.mutualFriends,
          avatarBg: req.avatarBg || '#e52e3d',
          avatar_url: req.avatar_url || ''
        };
        setFriends(prev => [newFriend, ...prev]);
        setFriendRequests(prev => prev.filter(r => r.id !== reqId && r.requester_id !== reqId));
        showToast(`Đã đồng ý kết bạn với ${req.name}`);
      }
    }
  };

  const rejectRequest = async (reqId) => {
    const req = friendRequests.find(r => r.id === reqId || r.requester_id === reqId);
    const requesterId = req?.requester_id || reqId;

    try {
      await api.respondFriendRequest(requesterId, user.id, 'reject');
      if (req) showToast(`Đã từ chối lời mời của ${req.name}`, 'info');
      setFriendRequests(prev => prev.filter(r => r.id !== reqId && r.requester_id !== reqId));
    } catch (err) {
      console.warn('Lỗi từ chối kết bạn trên server:', err.message);
      setFriendRequests(prev => prev.filter(r => r.id !== reqId && r.requester_id !== reqId));
      if (req) showToast(`Đã từ chối lời mời của ${req.name}`, 'info');
    }
  };

  const sendRequest = async (sugId) => {
    setFriendSuggestions(prev =>
      prev.map(s => (s.id === sugId ? { ...s, requested: true } : s))
    );
    const sug = friendSuggestions.find(s => s.id === sugId);
    if (sug) showToast(`Đã gửi lời mời kết bạn đến ${sug.name}`);

    try {
      await api.sendFriendRequest(user.id, sugId);
    } catch (err) {
      console.warn('Lỗi gửi lời mời kết bạn trên server:', err.message);
    }
  };

  const unfriend = async (friendId) => {
    const target = friends.find(f => f.id === friendId);
    setFriends(prev => prev.filter(f => f.id !== friendId));
    if (target) showToast(`Đã hủy kết bạn với ${target.name}`, 'info');

    try {
      await api.unfriend(user.id, friendId);
      loadFriendsFromBackend(user.id);
    } catch (err) {
      console.warn('Lỗi hủy kết bạn trên server:', err.message);
    }
  };

  const openFriendProfile = async (friend) => {
    if (!friend) return;
    setSelectedFriendProfile(friend);
    setFriendProfilePosts([]);
    setIsLoadingFriendProfile(true);

    try {
      if (friend.id && !String(friend.id).startsWith('fr-')) {
        const userRes = await api.getUser(friend.id);
        if (userRes && userRes.user) {
          const u = userRes.user;
          setSelectedFriendProfile(prev => ({
            ...prev,
            ...u,
            name: u.full_name || u.username || prev.name,
            username: u.username || prev.username,
            avatar_url: u.avatar_url || prev.avatar_url,
            bio: u.bio || prev.bio,
            school: u.school || prev.school,
            liveIn: u.liveIn || prev.liveIn,
            post_count: u.post_count,
            friend_count: u.friend_count,
            created_at: u.created_at
          }));
        }

        const currentUserId = user?.id || 0;
        const postsRes = await api.getUserPosts(friend.id, currentUserId);
        if (postsRes && Array.isArray(postsRes.posts)) {
          setFriendProfilePosts(postsRes.posts);
        }
      } else {
        const mockPosts = posts.filter(p => p.author?.name === friend.name);
        setFriendProfilePosts(mockPosts);
      }
    } catch (err) {
      console.warn('Lỗi khi tải thông tin hồ sơ bạn bè:', err.message);
    } finally {
      setIsLoadingFriendProfile(false);
    }
  };

  const closeFriendProfile = () => {
    setSelectedFriendProfile(null);
    setFriendProfilePosts([]);
  };

  const openChatWithFriend = (friend) => {
    if (!friend) return;
    let conv = conversations.find(c => c.name === friend.name || c.id === `conv-${friend.id}`);
    if (!conv) {
      conv = {
        id: `conv-${friend.id}`,
        name: friend.name,
        avatar: friend.avatar_url || friend.avatar || '',
        avatarBg: friend.avatarBg || '#e52e3d',
        isOnline: true,
        isGroup: false,
        time: 'Vừa xong',
        unread: 0,
        lastMessage: '',
        messages: []
      };
      setConversations(prev => [conv, ...prev]);
    }
    openChat(conv);
    closeFriendProfile();
  };

  return (
    <SocialContext.Provider
      value={{
        currentUser,
        login,
        loginWithGoogle,
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
        getPostComments,
        deleteCommentPost,
        deletePost,
        sharePost,
        stories,
        addStory,
        friends,
        friendRequests,
        friendSuggestions,
        loadFriendsFromBackend,
        acceptRequest,
        rejectRequest,
        sendRequest,
        unfriend,
        selectedFriendProfile,
        friendProfilePosts,
        isLoadingFriendProfile,
        openFriendProfile,
        closeFriendProfile,
        openChatWithFriend,
        trends,
        groups,
        joinedGroups,
        toggleJoinGroup,
        loadUserProfile,
        isCreatePostModalOpen,
        openCreatePostModal: () => setIsCreatePostModalOpen(true),
        closeCreatePostModal: () => setIsCreatePostModalOpen(false),
        isEditProfileModalOpen,
        openEditProfileModal: () => setIsEditProfileModalOpen(true),
        closeEditProfileModal: () => setIsEditProfileModalOpen(false),
        isLogoutModalOpen,
        openLogoutModal,
        closeLogoutModal,
        confirmLogout,
        toasts,
        showToast,
        isMessagesOpen,
        setIsMessagesOpen,
        isNotificationsOpen,
        setIsNotificationsOpen,
        activeChat,
        conversations,
        activeUsers,
        notifications,
        unreadMessagesCount,
        unreadNotificationsCount,
        toggleMessages,
        toggleNotifications,
        closeDrawers,
        openChat,
        closeChat,
        sendMessage,
        markNotificationAsRead,
        markAllNotificationsAsRead
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
