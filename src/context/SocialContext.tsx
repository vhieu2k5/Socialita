import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  NavigationTab,
  FeedFilterType,
  UserProfile,
  Post,
  Story,
  Friend,
  FriendRequest,
  FriendSuggestion,
  TrendingTopic,
  GroupItem
} from '../types';
import {
  INITIAL_USER,
  INITIAL_POSTS,
  INITIAL_STORIES,
  INITIAL_FRIENDS,
  INITIAL_FRIEND_REQUESTS,
  INITIAL_FRIEND_SUGGESTIONS,
  INITIAL_TRENDS,
  INITIAL_GROUPS
} from '../data/initialData';

interface ToastItem {
  id: string;
  msg: string;
  type?: 'success' | 'info' | 'error';
}

interface SocialContextType {
  tab: NavigationTab;
  setTab: (t: NavigationTab) => void;
  feedFilter: FeedFilterType;
  setFeedFilter: (f: FeedFilterType) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  user: UserProfile;
  updateUser: (updated: Partial<UserProfile>) => void;

  posts: Post[];
  createPost: (content: string, location?: string, gradient?: string, category?: FeedFilterType) => void;
  toggleLikePost: (postId: string) => void;
  addCommentPost: (postId: string, text: string) => void;
  sharePost: (postId: string) => void;

  stories: Story[];
  addStory: () => void;

  friends: Friend[];
  friendRequests: FriendRequest[];
  friendSuggestions: FriendSuggestion[];
  acceptRequest: (reqId: string) => void;
  rejectRequest: (reqId: string) => void;
  sendRequest: (sugId: string) => void;

  trends: TrendingTopic[];
  groups: GroupItem[];
  toggleJoinGroup: (groupId: string) => void;

  isCreatePostModalOpen: boolean;
  openCreatePostModal: () => void;
  closeCreatePostModal: () => void;

  isEditProfileModalOpen: boolean;
  openEditProfileModal: () => void;
  closeEditProfileModal: () => void;

  toasts: ToastItem[];
  showToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

const SocialContext = createContext<SocialContextType | undefined>(undefined);

export const SocialProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tab, setTab] = useState<NavigationTab>('home');
  const [feedFilter, setFeedFilter] = useState<FeedFilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [stories, setStories] = useState<Story[]>(INITIAL_STORIES);
  const [friends, setFriends] = useState<Friend[]>(INITIAL_FRIENDS);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>(INITIAL_FRIEND_REQUESTS);
  const [friendSuggestions, setFriendSuggestions] = useState<FriendSuggestion[]>(INITIAL_FRIEND_SUGGESTIONS);
  const [trends] = useState<TrendingTopic[]>(INITIAL_TRENDS);
  const [groups, setGroups] = useState<GroupItem[]>(INITIAL_GROUPS);

  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = (msg: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts(prev => [...prev, { id, msg, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 2800);
  };

  const updateUser = (updated: Partial<UserProfile>) => {
    setUser(prev => ({
      ...prev,
      ...updated,
      intro: {
        ...prev.intro,
        ...(updated.intro || {})
      },
      stats: {
        ...prev.stats,
        ...(updated.stats || {})
      }
    }));
    showToast('Cập nhật trang cá nhân thành công!');
  };

  const createPost = (
    content: string,
    location?: string,
    gradient?: string,
    category: FeedFilterType = 'all'
  ) => {
    const newPost: Post = {
      id: `p-${Date.now()}`,
      authorName: user.name,
      time: 'Vừa xong · Công khai',
      isPublic: true,
      content,
      mediaGradient: gradient || 'linear-gradient(180deg, #18191a 0%, #242526 50%, #7a1d26 100%)',
      location: location || undefined,
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
      stats: { ...prev.stats, posts: prev.stats.posts + 1 }
    }));
    setIsCreatePostModalOpen(false);
    showToast('Đăng bài viết mới thành công!');
  };

  const toggleLikePost = (postId: string) => {
    setPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          const nextLiked = !p.liked;
          return {
            ...p,
            liked: nextLiked,
            likes: nextLiked ? p.likes + 1 : p.likes - 1
          };
        }
        return p;
      })
    );
  };

  const addCommentPost = (postId: string, text: string) => {
    if (!text.trim()) return;
    const newComment = {
      id: `c-${Date.now()}`,
      authorName: user.name,
      content: text,
      time: 'Vừa xong',
      likes: 0
    };

    setPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            commentsCount: p.commentsCount + 1,
            comments: [...p.comments, newComment]
          };
        }
        return p;
      })
    );
    showToast('Đã gửi bình luận');
  };

  const sharePost = (postId: string) => {
    setPosts(prev =>
      prev.map(p => (p.id === postId ? { ...p, sharesCount: p.sharesCount + 1 } : p))
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

  const acceptRequest = (reqId: string) => {
    const req = friendRequests.find(r => r.id === reqId);
    if (!req) return;

    const newFriend: Friend = {
      id: `fr-${Date.now()}`,
      name: req.name,
      friendSince: 'Vừa kết bạn',
      mutualFriends: req.mutualFriends,
      avatarBg: req.avatarBg
    };

    setFriends(prev => [newFriend, ...prev]);
    setFriendRequests(prev => prev.filter(r => r.id !== reqId));
    setUser(prev => ({
      ...prev,
      stats: { ...prev.stats, friends: prev.stats.friends + 1 }
    }));
    showToast(`Đã đồng ý kết bạn với ${req.name}`);
  };

  const rejectRequest = (reqId: string) => {
    const req = friendRequests.find(r => r.id === reqId);
    setFriendRequests(prev => prev.filter(r => r.id !== reqId));
    if (req) showToast(`Đã từ chối lời mời của ${req.name}`, 'info');
  };

  const sendRequest = (sugId: string) => {
    const sug = friendSuggestions.find(s => s.id === sugId);
    if (!sug) return;

    setFriendSuggestions(prev =>
      prev.map(s => (s.id === sugId ? { ...s, requested: true } : s))
    );
    showToast(`Đã gửi lời mời kết bạn đến ${sug.name}`);
  };

  const toggleJoinGroup = (groupId: string) => {
    setGroups(prev =>
      prev.map(g => {
        if (g.id === groupId) {
          const nextState = !g.joined;
          if (nextState) {
            setUser(u => ({ ...u, stats: { ...u.stats, groups: u.stats.groups + 1 } }));
            showToast(`Đã tham gia nhóm ${g.name}`);
          } else {
            setUser(u => ({ ...u, stats: { ...u.stats, groups: Math.max(0, u.stats.groups - 1) } }));
            showToast(`Đã rời khỏi nhóm ${g.name}`, 'info');
          }
          return { ...g, joined: nextState, memberCount: nextState ? g.memberCount + 1 : g.memberCount - 1 };
        }
        return g;
      })
    );
  };

  return (
    <SocialContext.Provider
      value={{
        tab,
        setTab,
        feedFilter,
        setFeedFilter,
        searchQuery,
        setSearchQuery,
        user,
        updateUser,
        posts,
        createPost,
        toggleLikePost,
        addCommentPost,
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
        toggleJoinGroup,
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
  if (!context) throw new Error('useSocial must be used within SocialProvider');
  return context;
};
